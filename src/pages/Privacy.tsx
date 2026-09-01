import { useEffect } from "react";
import logoHorizontal from "../assets/images/logos/logo-horizontal-trimmed.webp";

const PAGE_TITLE = "プライバシーポリシー｜親方ドットコム";
const PAGE_DESCRIPTION = "親方ドットコムにおける個人情報の取り扱いについてご案内します。";
const CANONICAL_URL = "https://oyakata-com.jp/privacy";

function useSeo() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", PAGE_DESCRIPTION);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", CANONICAL_URL);

    return () => {
      document.title = prevTitle;
    };
  }, []);
}

export default function Privacy() {
  useSeo();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── 簡易ヘッダー ── */}
      <header className="border-b border-gray-200">
        <div className="max-w-[960px] mx-auto px-5 lg:px-8 h-[64px] flex items-center">
          <a href="/" className="inline-flex items-center h-[40px] overflow-hidden">
            <img
              src={logoHorizontal}
              alt="親方ドットコム"
              className="h-[40px] w-auto"
            />
          </a>
        </div>
      </header>

      {/* ── 本文 ── */}
      <main className="flex-1">
        <div className="max-w-[840px] mx-auto px-5 lg:px-8 py-12 lg:py-16">
          <h1 className="text-[#1a1a1a] font-black text-[24px] lg:text-[30px] leading-tight mb-8 lg:mb-10">
            プライバシーポリシー
          </h1>

          <div className="text-[#333] text-[16px] leading-[1.9]">
            <p>
              アイブレ株式会社（以下「当社」といいます。）は、当社が運営する「親方ドットコム」（以下「本サービス」といいます。）における個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>

            <div className="mt-10 lg:mt-12 space-y-10 lg:space-y-12">

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  1. 取得する情報
                </h2>
                <p>
                  当社は、本サービスのお問い合わせ、無料相談、LINE公式アカウント等を通じて、以下の情報を取得する場合があります。
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1.5">
                  <li>会社名</li>
                  <li>氏名または担当者名</li>
                  <li>電話番号</li>
                  <li>メールアドレス</li>
                  <li>お住まいの地域</li>
                  <li>お問い合わせ・ご相談内容</li>
                  <li>その他、利用者が当社に提供する情報</li>
                </ul>
                <p className="mt-4">
                  また、本サイトの利用に伴い、Cookie、IPアドレス、閲覧履歴、利用端末・ブラウザ等に関する情報を取得する場合があります。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  2. 個人情報の利用目的
                </h2>
                <p>当社は、取得した個人情報を以下の目的で利用します。</p>
                <ul className="list-disc pl-5 mt-3 space-y-1.5">
                  <li>お問い合わせ、無料相談等への対応</li>
                  <li>本サービスおよび関連サービスのご案内、ご提案</li>
                  <li>利用者との連絡、商談その他必要な対応</li>
                  <li>本サービスの提供、運営および改善</li>
                  <li>広告配信および広告効果の測定</li>
                  <li>アクセス状況や利用状況の分析</li>
                  <li>不正利用等の防止および安全なサービス提供</li>
                  <li>その他、上記の利用目的に付随する業務</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  3. 個人情報の第三者提供
                </h2>
                <p>
                  当社は、法令に基づく場合を除き、あらかじめ本人の同意を得ることなく、個人情報を第三者に提供しません。
                </p>
                <p className="mt-4">
                  ただし、本サービスの提供に必要な範囲で業務を外部事業者に委託する場合があります。この場合、当社は必要かつ適切な管理を行います。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  4. Cookie等の利用について
                </h2>
                <p>
                  本サイトでは、サービスの改善、アクセス状況の分析、広告配信および広告効果の測定等を目的として、Cookieその他これに類する技術を使用する場合があります。
                </p>
                <p className="mt-4">
                  Cookieによって取得される情報には、それ単独で特定の個人を直接識別する情報が含まれない場合があります。
                </p>
                <p className="mt-4">
                  利用者は、ブラウザの設定によりCookieを無効にすることができます。ただし、その場合、本サイトの一部機能が正常に利用できない場合があります。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  5. アクセス解析および広告配信について
                </h2>
                <p>
                  本サイトでは、アクセス解析および広告効果測定のため、Google LLCが提供するGoogle Analytics、Google広告その他のGoogleサービス、およびMeta Platforms, Inc.が提供するMeta広告関連サービス等を利用する場合があります。
                </p>
                <p className="mt-4">
                  これらのサービスでは、Cookieその他の技術を利用して、本サイトの閲覧状況や広告との接触・利用状況等の情報が取得される場合があります。
                </p>
                <p className="mt-4">
                  取得された情報は、各サービス提供事業者のプライバシーポリシー等に基づいて管理されます。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  6. LINE公式アカウントについて
                </h2>
                <p>
                  当社は、お問い合わせ、ご相談、サービスのご案内等のためLINE公式アカウントを利用する場合があります。
                </p>
                <p className="mt-4">
                  LINEを通じて取得される情報については、当社が取得した情報には本プライバシーポリシーが適用されるほか、LINEヤフー株式会社が定めるプライバシーポリシー等が適用されます。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  7. 個人情報の安全管理
                </h2>
                <p>
                  当社は、取得した個人情報について、不正アクセス、紛失、漏えい、改ざん等を防止するため、必要かつ適切な安全管理措置を講じます。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  8. 個人情報の開示・訂正・削除等
                </h2>
                <p>
                  利用者本人から、当社が保有する個人情報について、開示、訂正、追加、削除、利用停止等の請求があった場合には、本人確認を行ったうえで、法令に従い適切に対応します。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  9. プライバシーポリシーの変更
                </h2>
                <p>
                  当社は、法令の改正、本サービスの内容変更その他必要に応じて、本プライバシーポリシーを変更することがあります。
                </p>
                <p className="mt-4">
                  変更後のプライバシーポリシーは、本サイト上に掲載した時点から適用されます。
                </p>
              </section>

              <section>
                <h2 className="text-[#1a1a1a] font-bold text-[18px] lg:text-[20px] mb-4">
                  10. お問い合わせ窓口
                </h2>
                <p>
                  本プライバシーポリシーおよび個人情報の取扱いに関するお問い合わせは、本サイトのお問い合わせ窓口よりご連絡ください。
                </p>
                <p className="mt-4">
                  運営会社：アイブレ株式会社<br />
                  所在地：愛知県名古屋市中村区松重町4-51 KAKOビル4C
                </p>
              </section>

            </div>

            <p className="mt-12 lg:mt-14 text-[#666]">制定日：2026年8月31日</p>
          </div>
        </div>
      </main>

      {/* ── LPへ戻る導線 ── */}
      <footer className="border-t border-gray-200">
        <div className="max-w-[960px] mx-auto px-5 lg:px-8 py-6 text-center">
          <a
            href="/"
            className="text-[#666] text-[14px] underline underline-offset-2 hover:text-[#1a1a1a] transition-colors"
          >
            ‹ 親方ドットコムLPへ戻る
          </a>
        </div>
      </footer>
    </div>
  );
}
