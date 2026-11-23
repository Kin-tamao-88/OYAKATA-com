import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { createRequestId } from "../../../lib/contactForm";

/**
 * 法人向け集客相談フォーム。
 * LPの無料相談フォーム(lib/contactForm.ts の送信・generate_lead)とは別系統で、
 * 送信先は /api/corporate-inquiry のみ。dataLayer へのイベント送信や UTM の付与は行わない。
 */

type FormState = {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  /** ボット対策のおとりフィールド。人間は入力しない */
  website: string;
};

type FieldKey = "company" | "name" | "email" | "message" | "consent";
type Errors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const INITIAL: FormState = { company: "", name: "", email: "", phone: "", message: "", consent: false, website: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_ERROR = "送信に失敗しました。通信環境をご確認のうえ、もう一度お試しください。";

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.company.trim()) errors.company = "会社名・屋号を入力してください。";
  if (!form.name.trim()) errors.name = "担当者名を入力してください。";
  if (!form.email.trim()) errors.email = "メールアドレスを入力してください。";
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "メールアドレスの形式をご確認ください。";
  if (!form.message.trim()) errors.message = "相談したい内容を入力してください。";
  if (!form.consent) errors.consent = "個人情報の取り扱いへの同意が必要です。";
  return errors;
}

/** 配色。dark=暗い背景用(既定・従来どおり)、light=白い面の上に置く用(/corporate) */
export type FormTone = "dark" | "light";

const THEME = {
  dark: {
    form: "space-y-6",
    input:
      "block w-full bg-white text-[#111] text-[16px] leading-[1.6] px-4 py-3 rounded-none border border-transparent focus:outline-none focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]",
    label: "flex items-baseline gap-3 text-white font-bold text-[16px] mb-2",
    required: "text-[#FFCC00] text-[16px]",
    optional: "text-[#bdbdbd] text-[16px] font-normal",
    error: "mt-2 text-[#ffb4a6] text-[16px] leading-[1.7]",
    consent: "flex items-start gap-3 text-[#e2e2e2] text-[16px] leading-[1.8] cursor-pointer",
    checkbox: "mt-[6px] h-[20px] w-[20px] shrink-0 accent-[#FFCC00]",
    link: "text-[#FFCC00] font-bold underline underline-offset-4",
    consentRequired: "ml-2 text-[#FFCC00]",
    submitError: "border-l-[4px] border-[#ffb4a6] pl-4 text-[#ffb4a6] text-[16px] leading-[1.8]",
    submit:
      "flex items-center justify-center w-full h-[60px] lg:h-[64px] bg-[#FFCC00] text-[#111] font-black text-[17px] lg:text-[18px] hover:bg-[#ffd633] disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
    success: "border-t-[3px] border-[#FFCC00] pt-6",
    successTitle: "text-white font-black text-[22px] leading-[1.5]",
    successBody: "mt-3 text-[#e2e2e2] text-[16px] leading-[1.95] text-balance",
  },
  light: {
    form: "space-y-7",
    input:
      "block w-full min-h-[56px] bg-[#f4f2ec] text-[#111] text-[16px] leading-[1.6] px-4 py-[14px] rounded-none border-0 border-b-2 border-[#111] focus:outline focus:outline-[3px] focus:outline-[#ffd400]",
    label: "flex items-center gap-3 text-[#111] font-bold text-[16px] mb-[10px]",
    required: "bg-[#111] text-white text-[13px] font-bold leading-[1.6] px-2 py-[1px]",
    optional: "border border-[#111] text-[#111] text-[13px] font-bold leading-[1.6] px-2 py-[1px]",
    error: "mt-2 text-[#b3261e] font-bold text-[16px] leading-[1.7]",
    consent: "flex items-start gap-3 text-[#111] text-[16px] leading-[1.8] cursor-pointer",
    checkbox: "mt-[3px] h-[22px] w-[22px] shrink-0 accent-[#111]",
    link: "text-[#111] font-bold underline underline-offset-4",
    consentRequired: "ml-2 inline-block align-middle bg-[#111] text-white text-[13px] font-bold leading-[1.6] px-2 py-[1px]",
    submitError: "border-l-[4px] border-[#b3261e] pl-4 text-[#b3261e] font-bold text-[16px] leading-[1.8]",
    submit:
      "flex items-center justify-center w-full h-[64px] lg:h-[68px] border-2 border-[#111] bg-[#ffd400] text-[#111] font-black text-[17px] lg:text-[18px] hover:bg-[#111] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
    success: "border-t-[3px] border-[#111] pt-6",
    successTitle: "text-[#111] font-black text-[22px] leading-[1.5]",
    successBody: "mt-3 text-[#111] text-[16px] leading-[1.95] text-balance",
  },
} as const;

function Field({
  id,
  label,
  required,
  error,
  tone,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  tone: FormTone;
  children: React.ReactNode;
}) {
  const theme = THEME[tone];
  return (
    <div>
      <label htmlFor={id} className={theme.label}>
        {label}
        <span className={required ? theme.required : theme.optional}>
          {required ? "必須" : "任意"}
        </span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className={theme.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function CorporateInquiryForm({ tone = "dark" }: { tone?: FormTone }) {
  const theme = THEME[tone];
  const INPUT = theme.input;
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const requestIdRef = useRef(createRequestId());
  const inFlightRef = useRef(false);

  const update =
    (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target instanceof HTMLInputElement && event.target.type === "checkbox" ? event.target.checked : event.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;

    const found = validate(form);
    setErrors(found);
    const firstInvalid = (["company", "name", "email", "message", "consent"] as const).find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`corp-${firstInvalid}`)?.focus();
      return;
    }

    inFlightRef.current = true;
    setStatus("submitting");
    setErrorMessage("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch("/api/corporate-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.company.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          consent: form.consent,
          website: form.website,
          request_id: requestIdRef.current,
        }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean; error?: string } | null;
      if (res.ok && data?.success === true) {
        setStatus("success");
        setForm(INITIAL);
        requestIdRef.current = createRequestId();
      } else {
        setErrorMessage(data?.error || FALLBACK_ERROR);
        setStatus("error");
      }
    } catch {
      setErrorMessage(FALLBACK_ERROR);
      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
      inFlightRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className={theme.success}>
        <p className={theme.successTitle}>送信が完了しました。</p>
        <p className={theme.successBody}>
          お問い合わせありがとうございます。内容を確認のうえ、担当者よりメールでご連絡します。
        </p>
      </div>
    );
  }

  const describedBy = (key: FieldKey) => (errors[key] ? `corp-${key}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className={theme.form}>
      <Field id="corp-company" label="会社名・屋号" required error={errors.company} tone={tone}>
        <input
          id="corp-company"
          type="text"
          autoComplete="organization"
          value={form.company}
          onChange={update("company")}
          maxLength={100}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={describedBy("company")}
          className={INPUT}
        />
      </Field>
      <Field id="corp-name" label="担当者名" required error={errors.name} tone={tone}>
        <input
          id="corp-name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          maxLength={60}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={INPUT}
        />
      </Field>
      <Field id="corp-email" label="メールアドレス" required error={errors.email} tone={tone}>
        <input
          id="corp-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          maxLength={254}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={INPUT}
        />
      </Field>
      <Field id="corp-phone" label="電話番号" tone={tone}>
        <input
          id="corp-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
          maxLength={30}
          className={INPUT}
        />
      </Field>
      <Field id="corp-message" label="相談したい内容" required error={errors.message} tone={tone}>
        <textarea
          id="corp-message"
          rows={6}
          value={form.message}
          onChange={update("message")}
          maxLength={3000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={`${INPUT} resize-y`}
        />
      </Field>

      {/* おとりフィールド。画面外に置き、人間には見せない */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="corp-website">ウェブサイト(入力しないでください)</label>
        <input id="corp-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
      </div>

      <div>
        <label htmlFor="corp-consent" className={theme.consent}>
          <input
            id="corp-consent"
            type="checkbox"
            checked={form.consent}
            onChange={update("consent")}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className={theme.checkbox}
          />
          <span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className={theme.link}>
              プライバシーポリシー
            </a>
            に同意します
            <span className={theme.consentRequired}>必須</span>
          </span>
        </label>
        {errors.consent && (
          <p id="corp-consent-error" role="alert" className={theme.error}>
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className={theme.submitError}>
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={theme.submit}
      >
        {status === "submitting" ? "送信中..." : "この内容で送信する"}
      </button>
    </form>
  );
}
