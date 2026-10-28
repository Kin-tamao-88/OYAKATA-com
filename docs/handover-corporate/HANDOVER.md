# /corporate 引き継ぎメモ(Mac → Windows)

過去の会話を知らないClaude Codeでも作業を再開できるよう、状況をまとめたものです。

## 1. プロジェクト

- プロジェクト: 親方ドットコム(親方.com)法人公式サイト `/corporate` の新規制作
- リポジトリ: `git@github.com:Kin-tamao-88/OYAKATA-com.git`
- 作業ブランチ: `feature/corporate-site`(`main` の `9869396` から作成)
- 最新コミット: `git log -1` で確認する(件名は `feat(corporate): ...`)
- 本番ドメイン: `https://oyakata-com.jp`(`/` は広告LP、`/corporate` は今回の公式サイト)
- 技術構成: Vite 8 + React 19 + TypeScript 6 + Tailwind CSS v3、ホスティングは Vercel
- デザインの役割分担: デザインの最終決定とモック制作は ChatGPT。Claude Code は確定モックの実装と再現調整のみ。独自のデザイン判断はしない

## 2. 実装ファイル(すべて `src/seo/pages/corporate/`)

| ファイル | 役割 |
|---|---|
| `index.ts` | ページ定義(slug、title、description、`noindex: true`、`bare: true`) |
| `Content.tsx` | 全体の組み立て(Header → Fv → Mission → Service → Strength → Partners → Contact) |
| `Header.tsx` | 固定ヘッダー。ロゴは `logo-mark2.webp` をCSSで切り出して表示。SPはハンバーガー |
| `Fv.tsx` | FV(V3モック) |
| `Mission.tsx` | MISSION。`SectionLabel` もここから export |
| `Service.tsx` | SERVICE(PCは3カード、SPは横並びの行) |
| `Strength.tsx` | STRENGTH(3つの強み) |
| `Partners.tsx` | PARTNERS(`/contractors` への導線のみ) |
| `Contact.tsx` | CONTACT(黒背景の帯+既存フォーム) |
| `icons.tsx` | 矢印・再生・メール・グラフ・人物・握手のSVG(握手は仮描き) |
| `assets.ts` | **写真・装飾素材の差し替え口**(現在は仮素材) |
| `corporate.css` | Google Fonts(Montserrat、Noto Serif JP、Zen Kurenaido)の `@import` のみ |

既存ファイルの変更は `src/seo/registry.ts` への登録(2行)だけです。

## 3. 既存 `/about` から再利用している機能

- フォーム: `src/seo/pages/about/CorporateInquiryForm.tsx` を `Contact.tsx` から直接 import
  - 旧 `/about` を整理するときは、このフォームを `corporate` 配下へ移動してから行うこと
- 送信API: `api/corporate-inquiry.ts`(変更なし)。LPのリード台帳・GA4・Meta Pixel・LINEヒアリングとは別系統
- メール通知: `apps-script/CorporateInquiryMail.gs`(変更なし)。Vercel の環境変数 `CORPORATE_INQUIRY_WEBHOOK_URL` / `CORPORATE_INQUIRY_WEBHOOK_TOKEN` が必要
- プリレンダー基盤: `src/seo/`(`bare: true` のページとして出力。`dist/corporate/index.html` が生成される)
- 旧 `/about` のデザイン・構成・コピーは一切引き継いでいない

## 4. デザインの基準とモックの優先順位

参照モックは3枚(ChatGPT作成)。

1. FV: V3モック(ヘッダー付き。空と高層ビルの背景、見出し「建設業の可能性を、次の世代へ。」)
2. MISSION・SERVICE: 黄色を強めた修正版モック
3. STRENGTH・PARTNERS・CONTACT: 直近の全体モック

- モック間で違いがある場合は、各セクションの最新モックを優先する
- MISSION 以降は全セクションが入っている「直近の全体モック」を基準にした
- 1枚目にだけある英字の斜体コピー(Grow the Construction Business)は入れていない
- ブランドカラーは白・黒・黄色。正式ロゴはリポジトリ内の `src/assets/images/logos/logo-mark2.webp`(生成画像内のロゴは使わない)
- 見出し・本文・CTA・フォームはHTMLで実装し、モック画像をページ全体の画像として貼らない
- PCは1440px、SPは375pxを主基準にする
- 実績数値や保証表現は追加しない

## 5. 完了済みの作業

- `/corporate` の全セクション(PC・SP)を実装
- 第1回デザイン修正
  1. PC MISSION: 手書き装飾コピーを写真エリア右上へ移動(見出しとの重なりを解消)
  2. SP FV: 空のグラデーションと写真(高さ460px)を一体化し、コピーから写真へ自然につなげた
  3. SP の可読性: 本文行間2.0、見出しサイズ拡大、セクション間余白の拡大
  4. STRENGTH: カード上辺に黄色の太線、影を強め、タイトルとアイコンを拡大
  5. CONTACT: 見出し・説明・CTA・フォームの余白を調整(フォーム処理は無変更)
- `tsc`、`oxlint`、`npm run build` が通ることを確認済み
- 確認時点のスクリーンショット: `docs/handover-corporate/screenshots/`
  - `corporate-pc-1440.png`(1440×4223、ページ全体)
  - `corporate-sp-375.png`(375×5219、ページ全体)

## 6. 仮素材と差し替え予定

写真はすべて、リポジトリ内の既存素材を仮に割り当てたもの(モックの写真とは別物)。`assets.ts` の import を差し替えるだけで置き換えられる。

| 用途 | 現在の仮素材 | 必要な正式素材(推奨サイズ) |
|---|---|---|
| FV 背景 | `about/intro-sunset.webp` | 高層ビルと建設現場、作業員2名の後ろ姿。PC 2880×1440 / SP 750×700 |
| MISSION 写真 | `hero/hero-new-background.webp` | ヘルメットの男性が右上を見上げる写真。1600×1200 |
| SERVICE 01 | `OC05/hero-pc.webp` | PCで作業する男性。900×600 |
| SERVICE 02 | `about/approach-meeting.webp` | 笑顔の男性と商談する2人。900×600 |
| SERVICE 03・PARTNERS | `contractors/fv-background.webp` | 住宅街の戸建て。900×600 / 800×300 |
| STRENGTH 背景 | MISSION と同じ | 木の机とヘルメットの小物、ヘルメットの男性。1400×500 |
| CONTACT 背景 | `OC05/band-pc.webp` | 暗めのトーンで手元と図面。2880×500 |
| 黄色の筆跡 | `ui/brush-yellow.webp`(LPの素材を流用) | 透過の高解像度版。1600×700 |
| アイコン類 | `icons.tsx` の簡易SVG | グラフ・人物・握手・歯車のSVG(握手は仮描き) |
| 手書き風フォント | Zen Kurenaido で代用 | モックの書体名の確認が必要 |

## 7. 未完了の作業

- 仮写真を正式素材に差し替える(上表)
- モックの書体(手書き風コピー)の確認
- フッター(運営会社名、プライバシーポリシーへのリンク)がモックにない。追加するかユーザーの判断待ち
- ヘッダーの「導入事例」「お知らせ」「資料ダウンロード」は遷移先がないため未実装。ユーザーの判断待ち
- FV の2つのボタン(事業内容を見る、サービス紹介を見る)は、遷移先の指定がないため、どちらも `#service`
- SERVICE の01・02は遷移先がないためリンクなし(03のみ `/contractors`)
- ChatGPTとのデザイン調整(第2回以降の修正)
- 公開時の作業(承認後のみ): `noindex` 解除、sitemap への掲載、`/about` → `/corporate` の308リダイレクト、旧 `/about` の整理

## 8. 公開制御と変更禁止範囲

- `/corporate` は `noindex, follow`、sitemap非掲載。ユーザーが完成デザインを明示的に承認するまで変更しない
- LPからのリンクを追加しない
- `/about` のリダイレクト・削除・整理は、新サイト公開時まで行わない
- 次は変更禁止:
  - 広告LP `/`(`index.html`、`main.tsx`、`App.tsx`、`src/sections/*`、`index.css`、`App.css`)
  - LINE導線、UTM保持(`src/lib/*`)、GTM・GA4・Meta Pixel
  - `/contractors`(`src/contractors/*`)、営業台帳連携(`api/line/*`、`apps-script/*`)
  - `/privacy`
- `src/lib/*` を `/corporate` から import しない(LPの計測・フォームに直結するため)
- 本番デプロイ、`main` への直接 push、PRマージはユーザーの指示があるまで行わない
- 備考: Tailwind の `content` が共有のため、LPのCSSファイルのハッシュは変わる(表示は変わらない。許容済み)

## 9. Windowsでの起動・確認手順

```bash
git clone git@github.com:Kin-tamao-88/OYAKATA-com.git   # 初回のみ
cd OYAKATA-com
git fetch origin
git checkout feature/corporate-site
npm install
npm run dev
```

- 確認URL: `http://localhost:5173/corporate`
  - 開発サーバーが `/seo.html?page=corporate` へ転送する
  - うまく開かない場合は `http://localhost:5173/seo.html?page=corporate` を直接開く
- 確認コマンド: `npx tsc -b` / `npx oxlint` / `npm run build`
- ビルド後の確認:
  - `dist/corporate/index.html` に `noindex` が入っていること
  - `dist/sitemap.xml` に `corporate` が含まれていないこと
- フォームの実送信には Vercel の環境変数が必要。ローカルでは `/api/corporate-inquiry` が動かない(送信テストは Preview 環境で行う)

## 10. Windows側での最初の作業

1. 作業ブランチを取得して依存関係をインストールする
2. `/corporate` をローカル起動する
3. `screenshots/` の画像と見比べ、PC・SP の表示を確認する
4. ChatGPTとのデザイン調整を再開する
5. 仮写真を正式素材に差し替える

**Windows側で、デザイン変更・公開作業を独断で進めないこと。**
