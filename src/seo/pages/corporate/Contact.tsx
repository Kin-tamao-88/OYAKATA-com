import CorporateInquiryForm from "../about/CorporateInquiryForm";
import { IMG } from "./assets";
import { ArrowRight, MailIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-[64px] lg:scroll-mt-[76px] relative overflow-hidden bg-[#161616]" aria-labelledby="contact-title">
      <img src={IMG.contact} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-[#161616]/70" aria-hidden="true" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 lg:gap-10 px-5 py-12 lg:py-14 lg:px-[max(40px,calc((100vw-1320px)/2))]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-14">
          <div className="leading-[1.4]">
            <p className="font-['Montserrat'] font-bold text-[#ffd400] text-[13px] tracking-[0.12em]">CONTACT</p>
            <h2 id="contact-title" className="text-white font-black text-[30px] lg:text-[32px]">お問い合わせ</h2>
          </div>
          <p className="text-white text-[16px] leading-[1.95]">
            法人・企業の皆さまからのご相談・お問い合わせを承っております。<br />
            お気軽にご連絡ください。
          </p>
        </div>
        <a
          href="#contact-form"
          className="flex items-center justify-center gap-4 shrink-0 h-[56px] lg:h-[60px] lg:px-10 rounded-full bg-[#f5b800] text-[#111] font-black text-[16px] hover:brightness-95 transition"
        >
          <MailIcon />
          お問い合わせフォームへ
          <ArrowRight />
        </a>
      </div>

      <div id="contact-form" className="relative scroll-mt-[64px] lg:scroll-mt-[76px] px-5 pb-16 pt-2 lg:pb-[110px] lg:pt-4">
        <div className="mx-auto max-w-[720px] border-t border-[#555] pt-10 lg:pt-14">
          <CorporateInquiryForm />
        </div>
      </div>
    </section>
  );
}
