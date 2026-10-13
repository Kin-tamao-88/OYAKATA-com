import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SEOページ（プリレンダー対象）専用のビルド設定。
// LP本体（vite.config.ts）のバンドルに影響を与えないよう、別ビルドにしている。
//   クライアント: seo.html を dist/ に追加出力する（LPの出力は消さない）
//   SSR:          プリレンダー用のレンダー関数を dist-ssr/ に出力する
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  publicDir: false,
  build: isSsrBuild
    ? {
        outDir: 'dist-ssr',
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, 'src/seo/entry-server.tsx'),
        },
      }
    : {
        outDir: 'dist',
        emptyOutDir: false,
        rollupOptions: {
          input: resolve(__dirname, 'seo.html'),
        },
      },
}))
