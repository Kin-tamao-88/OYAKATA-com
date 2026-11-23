# /corporate リデザイン 画像生成ディレクション

対象モック: `docs/corporate-redesign/mock.html`(写真はすべて既存素材の仮置き)。
このファイルは生成用プロンプトの設計まで。**画像生成はまだ行っていない。**

## 全素材に共通する条件

- 実写の広告写真の質感(フルサイズ一眼、自然光)。イラスト・CG・過度なHDRにしない
- 人物は日本人。作業着・ヘルメットにロゴ、社名、文字を入れない
- 安全面の正しさ: ヘルメットのあご紐を締める、足場上では墜落制止用器具(フルハーネス)を着ける、くわえ煙草や素手での危険作業を写さない
- 看板、車両、画面、書類に読める文字や実在ブランドを入れない
- 色調はページ全体でそろえる: 夕方〜朝の暖かい自然光、黒が締まったコントラスト、彩度は控えめ。黄色はサイト側で使うため、写真の中に強い黄色の物を置かない
- 文字、透かし、枠は画像に入れない(コピーはすべてHTMLで重ねる)
- 納品形式: WebP(品質80前後)。背景透過は全素材で不要

共通ネガティブプロンプト(各プロンプトの末尾に付ける):

```
text, letters, logo, watermark, signage, brand names, illustration, 3d render, cartoon, oversaturated, HDR look, plastic skin, extra fingers, deformed hands, distorted face, unfastened helmet strap, cigarette, western suburban houses, lens flare overlay, heavy vignette, frame, border
```

---

## 1. FVメインビジュアル

| 項目 | 内容 |
|---|---|
| 1. 使用セクション | FV(案A: 右41%の縦長パネル / 案B: 全面背景) |
| 2. 役割・狙い | 「建設業の可能性を、次の世代へ。」を受ける主役の1枚。街を見渡す職人の後ろ姿で、仕事の誇りと先を見る視線を伝える。顔を写さないことで、特定の誰かではなく業界全体の話にする |
| 3. 被写体と構図 | 足場の上から夕方の住宅街を見渡す職人の後ろ姿(腰から上)。人物は画面の右3分の1、視線は左奥の街へ。左上に広い空 |
| 4. 背景・色調・光・質感 | 日没前の斜光。空は青から淡いオレンジへ。作業着は使い込んだ淡いグレー、白いヘルメット。背景の街は軽くぼかす |
| 5. PC/SPの配置とトリミング | 案A PC: 幅590×高さ760pxの縦長で表示、人物が右寄りに残る位置(object-position 72% 35%)。案A SP: 幅342×高さ400px。案B PC: 1440×760の横長で、左55%に文字が載る |
| 6. 推奨サイズ・比率 | 案A用 2400×3000px(4:5)。案Bを採用する場合は別に 3200×1800px(16:9)を生成 |
| 7. 文字を重ねる余白 | 案A: 左上の空に縦書きコピー(幅約120px×高さ約320px相当)。雲や足場をここに入れない。案B: 左55%を暗く静かな面にする |
| 8. 背景透過 | 不要 |
| 9. 避ける表現 | 正面からのカメラ目線、腕組みのポーズ写真、合成したような夕焼け、欧米風の街並み、足場上でハーネス無し |
| 10. 完成プロンプト | 下記 |

```
Editorial photograph, vertical 4:5. A Japanese construction craftsman seen from behind, waist up, standing on scaffolding and looking out over a Japanese residential neighborhood at golden hour. He is positioned in the right third of the frame, one hand resting on his hip, wearing a worn light-gray work uniform, a plain white safety helmet with the chin strap fastened, a full-body safety harness and a leather tool belt. The upper-left half of the frame is open sky, soft blue fading to pale warm orange near the horizon, with only thin distant clouds, leaving clean empty space. Below, tiled-roof detached houses and low apartment buildings stretch toward distant hills, slightly out of focus. Low warm side light from the right, natural color, deep but detailed shadows, restrained saturation. Shot on a full-frame camera, 50mm lens, f/4, realistic skin and fabric texture, documentary corporate photography.
```

---

## 2. MISSION ワイド写真

| 項目 | 内容 |
|---|---|
| 1. 使用セクション | MISSION(黒地の理念コピーの下、右端まで裁ち落とす横長の帯) |
| 2. 役割・狙い | 黒地の文字だけの面のあとに、人の表情で体温を入れる。「もっと先へ」の前向きさを職人の顔で見せる |
| 3. 被写体と構図 | 建築中の木造住宅の前で、少し上を見て穏やかに笑う40代の職人(胸から上、腕組み)。人物は右寄り。左3分の1は遠景だけ |
| 4. 背景・色調・光・質感 | 朝の逆光ぎみの光。左側は暗めの山並みと住宅のシルエットにして、白い手書き文字が読める明るさに抑える |
| 5. PC/SPの配置とトリミング | PC: 幅1360×高さ480px(約17:6)。SP: 幅370×高さ300px、人物の顔が中央右に残る位置 |
| 6. 推奨サイズ・比率 | 3400×1400px(約21:9)。上下に余裕を持たせて生成し、トリミングで合わせる |
| 7. 文字を重ねる余白 | 左下に手書き風コピー3行(PCで幅約320×高さ約200px)。この範囲は暗く、細部の少ない面にする |
| 8. 背景透過 | 不要 |
| 9. 避ける表現 | 歯を見せた作り笑い、真正面のカメラ目線、左側まで明るく飛んだ空(文字が読めなくなる)、現在の仮写真と同じ「空を見上げて腕組み」の硬いポーズの強調 |
| 10. 完成プロンプト | 下記 |

```
Wide cinematic photograph, 21:9. A Japanese craftsman in his forties, chest up, standing in the right third of the frame in front of a wooden house under construction with scaffolding and blue safety netting. He looks slightly upward into the distance with a calm, confident, natural half-smile, arms loosely crossed, wearing a dark navy work jacket and a plain white helmet with the chin strap fastened. Early morning light from behind right gives a soft rim light on his helmet and shoulder. The left third of the frame is darker and quiet: a distant mountain ridge and blurred silhouettes of houses in shade, low detail, no bright sky. Natural color, restrained saturation, shallow depth of field, 85mm lens, f/2.8, authentic documentary corporate photography.
```

---

## 3. SERVICE 01 建設業特化型マーケティング支援

| 項目 | 内容 |
|---|---|
| 1. 使用セクション | SERVICEの行組み 1行目(右端のサムネイル) |
| 2. 役割・狙い | 「Webサイト・LP制作から広告運用」を、建設業の文脈が分かる机上で示す。一般的なオフィスの素材写真に見せない |
| 3. 被写体と構図 | 机の上のノートPC(グラフが並ぶ画面、文字は判読できない)、その横に図面、色見本帳、白いヘルメット。斜め上からの俯瞰 |
| 4. 背景・色調・光・質感 | 窓からの自然光。木の天板、紙の質感。全体は明るめで落ち着いた色 |
| 5. PC/SPの配置とトリミング | PC: 320×200px(16:10)。SP: 幅370×高さ190px |
| 6. 推奨サイズ・比率 | 1600×1000px(16:10) |
| 7. 文字を重ねる余白 | なし(文字は重ねない) |
| 8. 背景透過 | 不要 |
| 9. 避ける表現 | 読める文字や実在サービスの管理画面、高層ビルが見える都会のオフィス、人物の手だけが不自然に写る構図 |
| 10. 完成プロンプト | 下記 |

```
Overhead three-quarter view photograph, 16:10. A wooden desk in a small Japanese construction company office. An open laptop shows abstract analytics charts and line graphs with no readable text. Beside it lie rolled architectural drawings, a paint color sample fan, a pencil and a plain white safety helmet. Soft daylight from a window on the left, gentle shadows, natural muted colors, realistic paper and wood texture. 35mm lens, f/4, clean editorial still life.
```

---

## 4. SERVICE 02 営業・事業成長支援

| 項目 | 内容 |
|---|---|
| 1. 使用セクション | SERVICEの行組み 2行目 |
| 2. 役割・狙い | 「商談・成約までを見据えた支援」を、担当者と工事会社の打ち合わせで見せる |
| 3. 被写体と構図 | 打ち合わせ机をはさんで、ジャケット姿の担当者(30代)と作業着の工事会社代表(50代)が資料を見ながら話す。担当者の表情が見え、代表は肩越し |
| 4. 背景・色調・光・質感 | 工事会社の事務所。背景に図面の棚や施工写真のボード(文字なし)。自然光 |
| 5. PC/SPの配置とトリミング | PC: 320×200px。SP: 幅370×高さ190px、担当者の顔が切れない位置 |
| 6. 推奨サイズ・比率 | 1600×1000px(16:10) |
| 7. 文字を重ねる余白 | なし |
| 8. 背景透過 | 不要 |
| 9. 避ける表現 | 握手、ガッツポーズ、全員がカメラ目線、ガラス張りの都会的な会議室、スーツ姿だけの構成 |
| 10. 完成プロンプト | 下記 |

```
Photograph, 16:10. A business meeting in the modest office of a Japanese construction company. A Japanese consultant in his thirties wearing a dark casual blazer explains printed documents on the table, facing the camera at a three-quarter angle with an attentive, friendly expression. In the foreground, seen over the shoulder and slightly out of focus, a company owner in his fifties wearing a work uniform listens. Shelves with rolled drawings and a board of small construction photos with no readable text in the background. Soft window light, natural colors, restrained saturation, 50mm lens, f/2.8, candid documentary style.
```

---

## 5. SERVICE 03 / PARTNERS 街並み(1枚を2か所で使用)

| 項目 | 内容 |
|---|---|
| 1. 使用セクション | SERVICE 3行目のサムネイルと、PARTNERS(黄色の面)右側の大きな写真 |
| 2. 役割・狙い | パートナーズが届く先である「お客様の暮らす街」を見せる。黄色の地と黒い面にはさまれるため、青空と緑で抜けを作る |
| 3. 被写体と構図 | 日本の戸建て住宅街を少し高い位置から。手前に道路と家並み、奥に山。画面下3分の2が街、上3分の1が空 |
| 4. 背景・色調・光・質感 | 晴れた午前の順光。空は澄んだ青、雲は少なめ。黄色い地と並ぶので暖色に寄せすぎない |
| 5. PC/SPの配置とトリミング | PARTNERS PC: 幅約620×高さ520px(右端まで裁ち落とし)。SP: 幅346×高さ260px。SERVICE: 320×200px |
| 6. 推奨サイズ・比率 | 2400×2000px(6:5)。横長トリミングでも家並みが残るよう、主役の家並みは中央の帯に置く |
| 7. 文字を重ねる余白 | なし |
| 8. 背景透過 | 不要 |
| 9. 避ける表現 | 欧米風の住宅、電線が画面を横切る構図、人物や車のナンバー、看板の文字 |
| 10. 完成プロンプト | 下記 |

```
Photograph, 6:5. A quiet Japanese suburban residential neighborhood seen from a slightly elevated viewpoint on a clear morning. Detached two-story houses with tiled roofs, trimmed hedges and a gently curving street fill the lower two thirds of the frame, with green hills in the distance. The upper third is clear blue sky with a few small clouds. Front light, crisp but natural color, cool-neutral white balance, no people, no readable signs, no vehicles in the foreground. 35mm lens, f/8, sharp throughout, clean editorial landscape.
```

補足: PARTNERSを人物入りにしたい場合の代替案(家の前で職人と施主が話す場面)も作れる。ただし「施主と職人」の写真は実在の施工例と受け取られやすいので、街並みを推奨する。

---

## 6. STRENGTH 写真の帯

| 項目 | 内容 |
|---|---|
| 1. 使用セクション | STRENGTH上部の全幅の帯(見出し「親方ドットコムの強み」を左下に重ねる) |
| 2. 役割・狙い | 「現場目線」を、足場のある現場と現場を見る人物で示す。白抜きの見出しが載る暗い面を兼ねる |
| 3. 被写体と構図 | 足場と養生シートのある現場を背景に、横を向いて現場を見る職人(胸から上)。人物は中央やや右。左40%は足場のぼけた暗い面 |
| 4. 背景・色調・光・質感 | 日中の日陰側。青みのある落ち着いた色。左は暗く、右は明るい |
| 5. PC/SPの配置とトリミング | PC: 1440×520px。SP: 390×340px、人物の顔が上半分に残る位置(見出しは下半分に載る) |
| 6. 推奨サイズ・比率 | 3200×1300px(約5:2)。SP用に上下の余白を多めに生成 |
| 7. 文字を重ねる余白 | 左下に見出し(PCで幅約720×高さ約160px)。この範囲は暗く、細い足場の線が強く出ないようにする |
| 8. 背景透過 | 不要 |
| 9. 避ける表現 | 見出しの位置に明るい空や白いシート、怒っているような険しい表情、ヘルメットのあご紐が外れた状態 |
| 10. 完成プロンプト | 下記 |

```
Wide photograph, 5:2. A Japanese site foreman in his forties, chest up, standing slightly right of center at a building construction site, face in profile looking toward the right with a focused, composed expression. He wears a dark work jacket and a plain white helmet with the chin strap fastened. Behind him, steel scaffolding and blue-gray safety sheets recede out of focus. The left forty percent of the frame is in open shade: dark, soft, low-contrast blurred scaffolding with no bright highlights. The right side is brighter with blue sky between the scaffold. Cool natural color, restrained saturation, 85mm lens, f/2.8, realistic documentary corporate photography.
```

---

## 写真を使わず HTML / CSS / SVG で作る箇所

| 箇所 | 表現 | 理由 |
|---|---|---|
| FVの見出し・黄色のマーカー・縦書きコピー | HTMLテキスト+CSS | h1を画像にしない。SPで組み直せる |
| FV下端の事業インデックス(01〜03) | HTMLのリンク+罫線 | ページ内導線として機能させる |
| スクロール表示 | CSSアニメーションの線 | 画像不要 |
| MISSIONの理念コピー・3つの価値 | 明朝のテキスト+罫線 | 文字が主役の面。現行のアイコン3つはやめる |
| MISSIONの手書きコピー | Webフォント(Zen Kurenaido) | 現行と同じ。画像にしない |
| SERVICEの「問い合わせの獲得→商談・成約→持続的な事業成長」 | CSSの矢羽根型の帯 | 既存リード文の内容を図にしたもの |
| SERVICE・STRENGTHの番号 | 欧文フォントの数字 | アイコンの代わり |
| PARTNERSの黄色の面・写真の黒いずらし枠 | CSS | 色面で区切る |
| CONTACT | 黒地+巨大な欧文+白いフォーム面 | 現行の暗い背景写真は情報を持たないので外す |

## 優先順位

1. FVメイン(第一印象を決める。現行の仮写真は縦長トリミングで人物が端に寄る)
2. MISSION ワイド(手書きコピーが読める暗い面が必要)
3. STRENGTH 帯(見出しが載る暗い面が必要)
4. SERVICE 01・02(現行の仮写真は建設業の文脈が弱い)
5. 街並み(現行の写真がそのまま使える水準。差し替えは任意)
