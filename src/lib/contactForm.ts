export type ContactFormState = {
  company: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  message: string;
};

export const INITIAL_CONTACT_FORM: ContactFormState = {
  company: "",
  name: "",
  phone: "",
  email: "",
  area: "",
  message: "",
};

export const AREA_OPTIONS: { value: string; label: string }[] = [
  { value: "hokkaido", label: "北海道" },
  { value: "tohoku", label: "東北" },
  { value: "kanto", label: "関東" },
  { value: "chubu", label: "中部" },
  { value: "kinki", label: "近畿" },
  { value: "chugoku", label: "中国・四国" },
  { value: "kyushu", label: "九州・沖縄" },
];

type ContactApiResponse = {
  success: boolean;
  error?: string;
};

const GENERIC_ERROR_MESSAGE =
  "送信に失敗しました。通信環境をご確認のうえ、再度お試しください。";

export async function submitContactForm(
  form: ContactFormState
): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL;

  if (!apiUrl) {
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }

  const areaLabel =
    AREA_OPTIONS.find((option) => option.value === form.area)?.label ?? "";

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        company: form.company,
        name: form.name,
        phone: form.phone,
        email: form.email,
        area: areaLabel,
        message: form.message,
      }),
    });

    if (!res.ok) {
      return { ok: false, message: GENERIC_ERROR_MESSAGE };
    }

    const data = (await res.json()) as ContactApiResponse;

    if (!data.success) {
      return { ok: false, message: data.error || GENERIC_ERROR_MESSAGE };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }
}

export function pushGenerateLeadEvent(): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead" });
}
