# 親方ドットコム LP

工事業者専門の集客支援サービス ランディングページ

## 技術スタック

- Vite + React + TypeScript
- Tailwind CSS v3
- Noto Sans JP（Google Fonts）

## 開発

```bash
npm install
npm run dev
```

## フォルダ構成

```
src/
├── sections/     # セクション単位のコンポーネント
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Section01.tsx（追加予定）
├── assets/
│   ├── images/   # 写真素材
│   └── icons/    # SVGアイコン
├── App.tsx
├── main.tsx
└── index.css
```

## 実装進捗

- [x] Header
- [x] Hero
- [ ] Section01（サービス概要）
- [ ] Section02〜09

## ルール

- 1セクションずつ実装・レビュー
- 完成モックを絶対基準とする
- PC版完成後にSP版へ

## SEOページの追加（プリレンダー）

LP本体（`/`・`/privacy`）はCSRのまま。新規SEOページだけ、ビルド時に静的HTMLへプリレンダーされる。

1. `src/seo/pages/<slug>/Content.tsx`（本文）と `index.ts`（title・description・日付などのメタ情報）を作る
2. `src/seo/registry.ts` の `SEO_PAGES` に追加する
3. `npm run build` で `dist/<slug>/index.html`、`dist/sitemap.xml`、`dist/404.html` が生成される

- 原稿が完成するまでは `noindex: true`（sitemap対象外）のままにする。公開時に `false` へ変更し、`dateModified` を実際の更新日にする
- 開発中の確認は `npm run dev` で `/seo.html?page=<slug>`
- `vercel.json` は `/` と `/privacy` 以外を404にする設定。LPに新しいパスを増やす場合は rewrites への追記が必要
