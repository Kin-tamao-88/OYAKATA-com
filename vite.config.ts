import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
