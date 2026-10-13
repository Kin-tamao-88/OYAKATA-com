// SEOページのプリレンダー。`vite build -c vite.seo.config.ts`（クライアント）と
// `--ssr`（レンダー関数）の後に実行し、dist/ にページごとの静的HTMLを書き出す。
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const template = await readFile(resolve(dist, 'seo.html'), 'utf8')
for (const marker of ['<!--seo-head-->', '<!--seo-body-->', '<div id="root">']) {
  if (!template.includes(marker)) throw new Error(`seo.html に ${marker} がありません`)
}

const { prerenderAll } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const { pages, notFound, sitemap } = prerenderAll()

// 置換は関数で渡す（本文中の "$&" などが特殊置換として解釈されるのを防ぐ）
function fill({ key, head, body }) {
  return template
    .replace('<!--seo-head-->', () => head.trim())
    .replace('<div id="root">', () => `<div id="root" data-page="${key}">`)
    .replace('<!--seo-body-->', () => body)
}

for (const page of [...pages, notFound]) {
  const out = resolve(dist, page.file)
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, fill(page))
  console.log(`prerendered: ${page.file}`)
}

await writeFile(resolve(dist, 'sitemap.xml'), sitemap)
console.log('generated: sitemap.xml')

// テンプレートそのものは公開しない
await rm(resolve(dist, 'seo.html'))
await rm(ssrDir, { recursive: true, force: true })
