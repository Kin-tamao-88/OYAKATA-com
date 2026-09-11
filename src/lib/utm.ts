const UTM_STORAGE_KEY = "oyakata_utm_params";

export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

const EMPTY_UTM_PARAMS: UtmParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

const UTM_KEYS = Object.keys(EMPTY_UTM_PARAMS) as (keyof UtmParams)[];

export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  try {
    if (window.sessionStorage.getItem(UTM_STORAGE_KEY)) return;
  } catch {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((key) => params.get(key));
  if (!hasUtm) return;

  const utm: UtmParams = { ...EMPTY_UTM_PARAMS };
  for (const key of UTM_KEYS) {
    utm[key] = params.get(key) ?? "";
  }

  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // sessionStorageが使えない環境では計測を諦める
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return { ...EMPTY_UTM_PARAMS };

  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return { ...EMPTY_UTM_PARAMS };
    return { ...EMPTY_UTM_PARAMS, ...JSON.parse(raw) };
  } catch {
    return { ...EMPTY_UTM_PARAMS };
  }
}
