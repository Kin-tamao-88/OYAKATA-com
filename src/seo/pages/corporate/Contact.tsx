import CorporateInquiryForm from "../about/CorporateInquiryForm";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-[64px] lg:scroll-mt-[76px] bg-[#111] text-white px-5 pt-[72px] pb-20 grid gap-9 lg:py-32 lg:px-[max(40px,calc((100vw-1280px)/2))] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:items-start" aria-labelledby="contact-title">
      <div className="lg:sticky lg:top-[120px]">
        <p className="font-['Montserrat'] font-extrabold text-[#ffd400] text-[clamp(52px,15vw,62px)] lg:text-[clamp(56px,7.2vw,108px)] leading-none tracking-[-0.01em]" aria-hidden="true">
          CONTACT
        </p>
        <h2 id="contact-title" className="mt-[14px] lg:mt-[22px] text-white font-black text-[27px] lg:text-[34px]">お問い合わせ</h2>
        <p className="mt-4 lg:mt-[22px] text-[#f1f1f1] text-[16px] lg:text-[17px] leading-[1.95] lg:leading-[2.05]">
          法人・企業の皆さまからのご相談・お問い合わせを承っております。<br />
          お気軽にご連絡ください。
        </p>
      </div>

      <div id="contact-form" className="scroll-mt-[76px] lg:scroll-mt-[96px] bg-white text-[#111] -mx-2 px-5 pt-8 pb-9 lg:mx-0 lg:px-14 lg:pt-14 lg:pb-[60px]">
        <CorporateInquiryForm tone="light" />
      </div>
    </section>
  );
}
