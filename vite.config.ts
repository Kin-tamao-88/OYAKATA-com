import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// SEOページ（/about など）をローカルでも本番と同じURLで開けるようにする。
// 本番(Vercel)は dist/<slug>/index.html を静的配信するので、ビルド結果には影響しない。
//   dev:     /<slug> → /seo.html?page=<slug> へ転送
//   preview: dist/<slug>/index.html があればそれを返す（SPAのフォールバックでLPになるのを防ぐ）
function seoPageRoutes(): Plugin {
  const slugOf = (url: string | undefined) => /^\/([a-z0-9-]+)\/?(\?.*)?$/.exec(url ?? '')?.[1]
  return {
    name: 'seo-page-routes',
    configureServer(server) {
      const pagesDir = resolve(__dirname, 'src/seo/pages')
      server.middlewares.use((req, res, next) => {
        const slug = slugOf(req.url)
        if (slug && existsSync(resolve(pagesDir, slug, 'index.ts')) && readdirSync(pagesDir).includes(slug)) {
          res.statusCode = 302
          res.setHeader('Location', `/seo.html?page=${slug}`)
          res.end()
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const slug = slugOf(req.url)
        if (slug && existsSync(resolve(__dirname, 'dist', slug, 'index.html'))) {
          req.url = `/${slug}/index.html`
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPageRoutes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // LINE友だち追加時にMeta広告のCR(クリエイティブ)情報を引き継ぐためのLIFFページ。
        // メインのReactアプリとは別のエントリーとしてビルドすることで、
        // LPの読み込みサイズに影響を与えない。
        liffCr: resolve(__dirname, 'liff-cr.html'),
      },
    },
  },
})
