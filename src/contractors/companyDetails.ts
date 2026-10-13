import { THEMES } from "./companyTheme";
import type { ThemeKey } from "./companyTheme";
import fvMaruesu from "../assets/images/contractors/fv-maruesu.webp";
import fvTakumi from "../assets/images/contractors/fv-takumi.webp";
import fvKodensetsu from "../assets/images/contractors/fv-kodensetsu.webp";
import fvKiyomirai from "../assets/images/contractors/fv-kiyomirai.webp";
import imgWakate from "../assets/images/OC08/better08-wakate.webp";
import imgInterior from "../assets/images/contractors/category-interior.webp";
import imgElectric from "../assets/images/contractors/category-electric.webp";
import imgCleaning from "../assets/images/contractors/category-cleaning.webp";
import imgPlumbing from "../assets/images/contractors/category-plumbing.webp";
import imgWorkElectric from "../assets/images/contractors/work-electric.webp";
import imgTeam from "../assets/images/OC08/better08-genba.webp";
import imgOffice from "../assets/images/OC07/results-case01-30.webp";
import imgMeeting from "../assets/images/OC06/reason-consulting.webp";
import imgScaffold from "../assets/images/OC06/reason-industry-marketing.webp";
import imgWallPaint from "../assets/images/contractors/category-exterior.webp";
import imgKitchen from "../assets/images/contractors/category-reform.webp";
import imgRoof from "../assets/images/contractors/work-roof.webp";

/* ────────────────────────────────────────────────
 * 個別企業ページ用データ。
 * 企業を追加するときは COMPANIES(data.ts) に一覧用データを足し、
 * ここの COMPANY_DETAILS に同じ slug で詳細データを足すだけで /contractors/<slug> が増える。
 * 任意項目(?)は未登録なら該当ブロック・行ごと非表示になる。
 * ──────────────────────────────────────────────── */

export type Photo = {
  src: string;
  alt: string;
  /** 元画像のピクセルサイズ(レイアウトシフト防止用) */
  width: number;
  height: number;
};

export type CompanyService = {
  title: string;
  body: string;
  image?: Photo;
};

export type CompanyWork = {
  title: string;
  /** 施工場所 */
  place: string;
  /** 工事内容 */
  content: string;
  body?: string;
  photo: Photo;
};

export type CompanyStrength = {
  title: string;
  body: string;
};

export type CompanyAreaDetail = {
  prefecture: string;
  /** 市区町村 */
  cities: string[];
};

export type CompanyContact = {
  tel?: string;
  formUrl?: string;
  lineUrl?: string;
  websiteUrl?: string;
};

export type CompanyProfile = {
  /** 番地まで含む所在地 */
  address?: string;
  representative?: string;
  established?: string;
  hours?: string;
  holiday?: string;
};

export type CompanyDetail = {
  slug: string;
  /** 企業ページの配色。未指定は "brand"(親方ドットコムの黄・黒)。 */
  theme?: ThemeKey;
  /** "mockup": ファーストビューが企業ページのデザイン画像(画像全体を見せる)。"photo"(既定): 施工写真。 */
  heroKind?: "photo" | "mockup";
  /** false の間はページを生成せず、一覧からもリンクしない(404) */
  published: boolean;
  tagline: string;
  heroPhoto: Photo;
  /** この会社について */
  about: {
    heading?: string;
    paragraphs: string[];
    specialties?: string[];
    attitude?: { title: string; body: string };
    /** 代表者・職人写真(どちらも任意) */
    portrait?: Photo & { name: string; role: string };
    teamPhoto?: Photo;
  };
  services: CompanyService[];
  works: CompanyWork[];
  /** 2〜5項目程度 */
  strengths: CompanyStrength[];
  strengthsPhoto?: Photo;
  areaDetails: CompanyAreaDetail[];
  profile: CompanyProfile;
  contact: CompanyContact;
  seo: {
    title?: string;
    description?: string;
    /** true にし、かつ一覧側の isSample が false のときだけ index 対象になる */
    index: boolean;
  };
};

/* ※ 以下は開発用のサンプルです。実在の企業・連絡先とは関係ありません。 */
export const COMPANY_DETAILS: Record<string, CompanyDetail> = {
  "maruesu-reform": {
    slug: "maruesu-reform",
    published: true,
    theme: "maruesu",
    heroKind: "mockup",
    tagline: "外壁・雨漏りの不安を、プロの技術で解決。",
    heroPhoto: {
      src: fvMaruesu,
      alt: "マルエスリフォームの紹介ページのファーストビュー。外壁塗装をする職人と、外壁塗装・屋根工事・雨漏り修理のメニュー",
      width: 1536,
      height: 1024,
    },
    about: {
      heading: "大切な家を、ずっと長く守る仕事。",
      paragraphs: [
        "マルエスリフォームは、大阪を拠点に、外壁塗装・屋根工事・雨漏り修理を手がけるリフォーム会社です。住まいの傷みは、放っておくほど工事が大きくなります。だからこそ、早めの点検と、状態に合わせた無理のないご提案を大切にしています。",
        "足場の手配から塗装、仕上げの確認まで、責任をもって担当。工事の前後は写真でご説明し、施工後の保証までお付き合いします。",
      ],
      specialties: ["外壁塗装", "屋根工事", "雨漏り修理", "付帯部・防水工事"],
      attitude: {
        title: "仕事への姿勢",
        body: "お客様の「大切な家をずっと安心して住み続けたい」という思いに、確かな施工でお応えします。見積りの段階から、工事の理由を分かりやすくお伝えします。",
      },
      teamPhoto: {
        src: imgTeam,
        alt: "現場の前で談笑するマルエスリフォームの職人たち",
        width: 1536,
        height: 1024,
      },
    },
    services: [
      {
        title: "外壁塗装",
        body: "劣化の状態を診断し、下地補修から塗料の選定まで。見た目だけでなく、家を守る塗装をご提案します。",
      },
      {
        title: "屋根工事",
        body: "屋根塗装・葺き替え・部分補修まで対応。点検の結果は写真でご説明します。",
      },
      {
        title: "雨漏り修理",
        body: "原因の調査から修理まで。急な雨漏りのご相談にも、最短即日で対応します。",
      },
      {
        title: "付帯部・防水工事",
        body: "雨どいや軒天、ベランダの防水など、外壁・屋根まわりの工事をまとめてご相談いただけます。",
      },
    ],
    works: [
      {
        title: "戸建て住宅の外壁塗装",
        place: "大阪府 吹田市",
        content: "外壁塗装・付帯部塗装",
        body: "経年で色あせた外壁を、下地補修のうえ再塗装。足場を組んだ現場で、一面ずつ丁寧に仕上げました。",
        photo: {
          src: imgWallPaint,
          alt: "足場の上で外壁にローラーで塗装を行う職人",
          width: 800,
          height: 428,
        },
      },
      {
        title: "スレート屋根の塗装",
        place: "兵庫県 西宮市",
        content: "屋根塗装",
        body: "高圧洗浄と下塗りを行い、遮熱性のある塗料で仕上げました。",
        photo: {
          src: imgRoof,
          alt: "足場の上で屋根を塗装する職人",
          width: 458,
          height: 458,
        },
      },
      {
        title: "集合住宅の外壁改修",
        place: "京都府 京都市",
        content: "足場工事・外壁改修",
        body: "足場の設計から安全管理まで自社で対応。居住者の方への配慮を重ねながら進めました。",
        photo: {
          src: imgScaffold,
          alt: "足場が組まれた建物の前に立つ現場責任者",
          width: 1536,
          height: 1024,
        },
      },
    ],
    strengths: [
      {
        title: "安心の施工保証",
        body: "工事の内容に応じた保証をご用意しています。施工後も、気になることがあればすぐにご連絡いただけます。",
      },
      {
        title: "地域密着の丁寧な対応",
        body: "大阪・兵庫・京都のエリアで、長く住まいを見守る立場として、一件一件丁寧に対応します。",
      },
      {
        title: "お見積り・ご相談無料",
        body: "現地調査とお見積りは無料です。工事をするかどうか迷っている段階でも、お気軽にご相談ください。",
      },
    ],
    strengthsPhoto: {
      src: imgMeeting,
      alt: "テーブルで工事の内容を打ち合わせする担当者とお客様",
      width: 1536,
      height: 1024,
    },
    areaDetails: [
      { prefecture: "大阪府", cities: ["大阪市", "堺市", "東大阪市", "吹田市", "豊中市"] },
      { prefecture: "兵庫県", cities: ["神戸市", "西宮市", "尼崎市", "伊丹市"] },
      { prefecture: "京都府", cities: ["京都市", "宇治市", "長岡京市"] },
    ],
    profile: {
      address: "大阪府大阪市",
      representative: "丸須 誠",
      established: "2009年",
      hours: "8:00〜19:00",
      holiday: "年中無休",
    },
    contact: {
      tel: "0120-987-654",
      formUrl: "https://example.com/contact",
      websiteUrl: "https://example.com/",
    },
    seo: { index: false },
  },
  "takumi-naisou": {
    slug: "takumi-naisou",
    published: true,
    theme: "takumi",
    heroKind: "mockup",
    tagline: "理想の空間を、確かな技術でカタチに。",
    heroPhoto: {
      src: fvTakumi,
      alt: "匠内装の紹介ページのファーストビュー。内装工事をする職人と、店舗・オフィス・住宅のメニュー",
      width: 1536,
      height: 1024,
    },
    about: {
      heading: "空間が変わると、暮らしも仕事も良くなる。",
      paragraphs: [
        "匠内装は、店舗・オフィス・住宅の内装工事とリフォームを、企画から施工までワンストップで手がける内装会社です。限られた予算と工期のなかで、使いやすさと居心地のよさを両立する空間をつくります。",
        "職人が現場で培ってきた技術を、そのまま設計にも活かしています。図面だけでは分からない納まりまで考えたご提案が、仕上がりの違いにつながります。",
      ],
      specialties: ["店舗の内装工事", "オフィスの内装工事", "住宅のリフォーム", "空間の企画・設計"],
      attitude: {
        title: "仕事への姿勢",
        body: "人が集まり、未来が動き出す空間をつくる。内装は完成して終わりではなく、使い始めてからが本番だと考えています。",
      },
      portrait: {
        src: imgOffice,
        alt: "施工事例の資料を並べた事務所で話す代表",
        width: 1536,
        height: 1024,
        name: "匠 慎也",
        role: "代表取締役",
      },
    },
    services: [
      {
        title: "店舗の内装工事",
        body: "飲食店・美容室・物販店など、業態に合わせた内装を。開店スケジュールから逆算した工程管理も得意です。",
      },
      {
        title: "オフィスの内装工事",
        body: "レイアウト変更や移転に伴う内装工事。業務を止めない夜間・休日の施工にも対応します。",
      },
      {
        title: "住宅のリフォーム",
        body: "床・壁・天井の張り替えから水まわりまで。暮らし方に合わせて、住まい全体を整えます。",
      },
      {
        title: "企画・設計から施工まで",
        body: "窓口を一本化し、企画から引き渡しまでワンストップで対応。打ち合わせの手間を減らします。",
      },
    ],
    works: [
      {
        title: "フローリングの施工",
        place: "大阪府 大阪市",
        content: "住宅の内装工事",
        body: "無垢材の床を、職人が一枚ずつ丁寧に施工。光の入り方まで考えて、居心地のよい空間に仕上げました。",
        photo: {
          src: imgInterior,
          alt: "室内でフローリングを施工する内装職人",
          width: 800,
          height: 428,
        },
      },
      {
        title: "キッチンのリフォーム",
        place: "兵庫県 神戸市",
        content: "住宅のリフォーム",
        body: "木目のキャビネットと白い天板で、明るく使いやすいキッチンへ。",
        photo: {
          src: imgKitchen,
          alt: "木目のキャビネットと白い天板の明るいキッチン",
          width: 800,
          height: 428,
        },
      },
    ],
    strengths: [
      {
        title: "企画から施工までワンストップ",
        body: "ご相談から設計、施工、引き渡しまで窓口は一つ。打ち合わせの回数と手間を減らします。",
      },
      {
        title: "法人・個人、幅広く対応",
        body: "店舗・オフィス・住宅まで、規模を問わずご相談いただけます。",
      },
      {
        title: "内装のプロによる高品質な施工",
        body: "経験豊富な職人が、仕上がりの細部まで責任をもって施工します。",
      },
      {
        title: "大阪・兵庫・京都、地域密着で対応",
        body: "現地へすぐに伺える距離感で、工事後のご相談にも迅速に対応します。",
      },
    ],
    areaDetails: [
      { prefecture: "大阪府", cities: ["大阪市", "堺市", "吹田市", "豊中市", "枚方市"] },
      { prefecture: "兵庫県", cities: ["神戸市", "西宮市", "芦屋市", "尼崎市"] },
      { prefecture: "京都府", cities: ["京都市", "宇治市", "向日市"] },
    ],
    profile: {
      address: "大阪府大阪市",
      representative: "匠 慎也",
      established: "2012年",
      hours: "8:00〜19:00",
      holiday: "年中無休",
    },
    contact: {
      tel: "0120-321-789",
      formUrl: "https://example.com/contact",
      websiteUrl: "https://example.com/",
    },
    seo: { index: false },
  },
  kodensetsu: {
    slug: "kodensetsu",
    published: true,
    theme: "kodensetsu",
    heroKind: "mockup",
    tagline: "安心と技術で、暮らしと仕事を支える電気工事。",
    heroPhoto: {
      src: fvKodensetsu,
      alt: "光電設の紹介ページのファーストビュー。電気工事をする職人と、住宅・店舗・工場・EV充電のメニュー",
      width: 1536,
      height: 1024,
    },
    about: {
      heading: "電気のあたりまえを、つくる仕事。",
      paragraphs: [
        "光電設は、大阪・兵庫・京都のエリアで、住宅から店舗・オフィス・工場までの電気設備工事を手がける電気工事会社です。照明やコンセントの増設といった身近な工事から、設備の更新、EV充電設備の設置まで対応します。",
        "経験豊富な職人が、安全を第一に、確かな技術で施工します。工事の前には内容と費用を分かりやすくご説明し、工事後の動作確認まで責任をもって行います。",
      ],
      specialties: ["住宅の電気工事", "店舗・オフィスの電気工事", "工場・倉庫の電気設備", "EV充電設備の設置"],
      attitude: {
        title: "仕事への姿勢",
        body: "電気は、目に見えないからこそ、安全が最優先です。基準を守った施工と、分かりやすい説明を徹底しています。",
      },
      teamPhoto: {
        src: imgWakate,
        alt: "現場の前で笑顔を見せる光電設のスタッフ",
        width: 1536,
        height: 1024,
      },
    },
    services: [
      {
        title: "住宅の電気工事",
        body: "照明・コンセント・分電盤の交換や増設など、住まいの電気まわりをまとめてご相談いただけます。",
      },
      {
        title: "店舗・オフィスの電気工事",
        body: "レイアウト変更や新規開業に伴う電気工事。営業への影響を抑えた工程をご提案します。",
      },
      {
        title: "工場・倉庫の電気設備",
        body: "動力設備や照明の更新、配線工事まで。稼働を止めない計画的な施工に対応します。",
      },
      {
        title: "EV充電設備の設置",
        body: "戸建て・マンション・事業所への設置に対応。現地調査から申請のご相談まで承ります。",
      },
    ],
    works: [
      {
        title: "シーリングライトの交換",
        place: "大阪府 豊中市",
        content: "住宅の電気工事",
        body: "古くなった照明器具を、新しいシーリングライトに交換。取り付けから点灯確認まで行いました。",
        photo: {
          src: imgWorkElectric,
          alt: "天井の照明器具を取り付ける電気工事の職人",
          width: 460,
          height: 460,
        },
      },
      {
        title: "ダウンライトの増設",
        place: "兵庫県 西宮市",
        content: "住宅の電気工事",
        body: "お部屋の明るさに合わせて、照明の位置と数をご提案。配線から仕上げまで施工しました。",
        photo: {
          src: imgElectric,
          alt: "木目の天井に取り付けられた照明",
          width: 800,
          height: 428,
        },
      },
    ],
    strengths: [
      {
        title: "安全・丁寧な高品質施工",
        body: "安全基準を守った施工を徹底。仕上げの動作確認まで、職人が責任をもって行います。",
      },
      {
        title: "法人・個人、幅広く対応",
        body: "住宅から店舗・オフィス・工場まで、規模や業種を問わずご相談いただけます。",
      },
      {
        title: "大阪・兵庫・京都、地域密着の迅速対応",
        body: "トラブル時にもすぐに駆けつけられる距離感で、工事後のご相談にも対応します。",
      },
      {
        title: "現地調査・お見積り無料",
        body: "現地調査とお見積りは無料です。しつこい営業は行いません。",
      },
    ],
    areaDetails: [
      { prefecture: "大阪府", cities: ["大阪市", "堺市", "豊中市", "吹田市", "高槻市"] },
      { prefecture: "兵庫県", cities: ["神戸市", "西宮市", "尼崎市", "宝塚市"] },
      { prefecture: "京都府", cities: ["京都市", "宇治市", "亀岡市"] },
    ],
    profile: {
      address: "大阪府大阪市",
      representative: "光田 剛",
      established: "2005年",
      hours: "8:00〜19:00",
      holiday: "年中無休",
    },
    contact: {
      tel: "0120-567-890",
      formUrl: "https://example.com/contact",
      websiteUrl: "https://example.com/",
    },
    seo: { index: false },
  },
  kiyomirai: {
    slug: "kiyomirai",
    published: true,
    theme: "kiyomirai",
    heroKind: "mockup",
    tagline: "住まいの汚れを、プロの力でリセット。",
    heroPhoto: {
      src: fvKiyomirai,
      alt: "きよみらいの紹介ページのファーストビュー。清掃をするスタッフと、キッチン・浴室・エアコンのメニュー",
      width: 1536,
      height: 1024,
    },
    about: {
      heading: "きれいな今が、家族の未来をつくる。",
      paragraphs: [
        "きよみらいは、大阪・兵庫・京都のエリアで、キッチン・浴室・エアコンなどの頑固な汚れを徹底洗浄するハウスクリーニング専門店です。ご家庭では落としきれない汚れを、プロの道具と技術できれいにします。",
        "お部屋の素材や汚れの種類に合わせて、洗剤と道具を使い分けます。作業前に状態を確認し、仕上がりをご一緒に確認することで、安心してお任せいただけます。",
      ],
      specialties: ["キッチン・浴室などの水まわり", "エアコンの分解洗浄", "お部屋まるごとクリーニング"],
      attitude: {
        title: "仕事への姿勢",
        body: "暮らしに気持ちいい毎日を。見えない部分まで丁寧に洗浄し、清潔さが長く続く仕上がりを目指します。",
      },
    },
    services: [
      {
        title: "キッチン・浴室などの水まわり",
        body: "油汚れ、水垢、カビなど、水まわりに溜まった汚れを徹底洗浄します。",
      },
      {
        title: "エアコンの分解洗浄",
        body: "内部まで分解して洗浄し、ニオイや汚れの原因を取り除きます。",
      },
      {
        title: "お部屋まるごとクリーニング",
        body: "床・窓・水まわりまで、お部屋全体をまとめてきれいに。引っ越し前後のご利用にも対応します。",
      },
    ],
    works: [
      {
        title: "フローリングの清掃",
        place: "大阪府 大阪市",
        content: "お部屋まるごとクリーニング",
        body: "専用の機材で床の汚れを取り除き、ツヤのある仕上がりに。",
        photo: {
          src: imgCleaning,
          alt: "フローリングを掃除機で清掃する様子",
          width: 800,
          height: 428,
        },
      },
      {
        title: "キッチンのクリーニング",
        place: "兵庫県 神戸市",
        content: "キッチンクリーニング",
        body: "換気扇やシンクまわりの油汚れ・水垢を洗浄し、明るく清潔なキッチンに。",
        photo: {
          src: imgKitchen,
          alt: "清潔に整ったキッチン",
          width: 800,
          height: 428,
        },
      },
      {
        title: "洗面まわりのクリーニング",
        place: "京都府 京都市",
        content: "水まわりクリーニング",
        body: "水垢やカビが気になる洗面まわりを、素材を傷めずに洗浄しました。",
        photo: {
          src: imgPlumbing,
          alt: "洗面台とキャビネットのある水まわり",
          width: 800,
          height: 428,
        },
      },
    ],
    strengths: [
      {
        title: "プロの道具と技術で徹底洗浄",
        body: "ご家庭では落としにくい汚れも、専用の洗剤と機材で丁寧に落とします。",
      },
      {
        title: "水まわりからエアコンまで一括対応",
        body: "お部屋ごとでも、まるごとでも。ご希望に合わせて必要な箇所だけご依頼いただけます。",
      },
      {
        title: "訪問・電話・LINEで相談OK",
        body: "お見積りは最短30秒。ご都合のよい方法でご相談いただけます。",
      },
    ],
    areaDetails: [
      { prefecture: "大阪府", cities: ["大阪市", "堺市", "吹田市", "豊中市", "茨木市"] },
      { prefecture: "兵庫県", cities: ["神戸市", "西宮市", "尼崎市", "芦屋市"] },
      { prefecture: "京都府", cities: ["京都市", "宇治市", "長岡京市"] },
    ],
    profile: {
      address: "大阪府大阪市",
      representative: "清水 未来",
      established: "2016年",
      hours: "8:00〜19:00",
      holiday: "年中無休",
    },
    contact: {
      tel: "0120-123-456",
      formUrl: "https://example.com/contact",
      websiteUrl: "https://example.com/",
    },
    seo: { index: false },
  },
};

export function getTheme(detail: CompanyDetail) {
  return THEMES[detail.theme ?? "brand"];
}

export function getCompanyDetail(slug: string): CompanyDetail | undefined {
  const detail = COMPANY_DETAILS[slug];
  return detail?.published ? detail : undefined;
}

export type ContactMethod = {
  kind: "tel" | "form" | "line";
  label: string;
  href: string;
  /** 表示用の補助テキスト(電話番号など) */
  note?: string;
};

/** 登録されている連絡手段だけを返す。 */
export function getContactMethods(contact: CompanyContact): ContactMethod[] {
  const methods: ContactMethod[] = [];
  if (contact.tel) {
    methods.push({
      kind: "tel",
      label: "電話で相談する",
      href: `tel:${contact.tel.replace(/[^0-9+]/g, "")}`,
      note: contact.tel,
    });
  }
  if (contact.formUrl) {
    methods.push({ kind: "form", label: "お問い合わせフォーム", href: contact.formUrl });
  }
  if (contact.lineUrl) {
    methods.push({ kind: "line", label: "LINEで相談する", href: contact.lineUrl });
  }
  return methods;
}
