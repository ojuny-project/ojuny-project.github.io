import data from "../data/base16.json";
import { variantForPath } from "../data/variants";

export type SchemeVariant = "dark" | "light";

export interface Scheme {
  id: string;
  name: string;
  author: string;
  variant: SchemeVariant;
  palette: Record<string, string>;
}

const normalize = (scheme: Scheme): Scheme => ({
  ...scheme,
  palette: Object.fromEntries(
    Object.entries(scheme.palette).map(([key, value]) => [key.toLowerCase(), value]),
  ),
});

export const SCHEMES = (data.schemes as Scheme[]).map(normalize);
export const DEFAULT_SCHEME_ID = data.default;
export const STORAGE_KEY = "ojuny.base16";
export const THEME_EVENT = "ojuny:theme-change";

const HEX = /^#[0-9a-f]{6}$/i;
const BASE_KEY = /^base0[0-9a-f]$/i;

export const DEFAULT_SCHEME =
  SCHEMES.find((scheme) => scheme.id === DEFAULT_SCHEME_ID) ?? SCHEMES[0];

export function schemeById(id: string): Scheme | undefined {
  return SCHEMES.find((scheme) => scheme.id === id);
}

export function pageDefaultScheme(
  pathname?: string,
  basePath?: string,
): Scheme {
  if (typeof window === "undefined") return DEFAULT_SCHEME;

  const variant = variantForPath(
    pathname ?? window.location.pathname,
    basePath ?? import.meta.env.BASE_URL,
  );
  const scheme = variant ? schemeById(variant.defaultScheme) : undefined;

  return scheme ?? DEFAULT_SCHEME;
}

export function isScheme(value: unknown): value is Scheme {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Scheme>;
  if (
    typeof candidate.id !== "string" ||
    typeof candidate.name !== "string" ||
    (candidate.variant !== "dark" && candidate.variant !== "light") ||
    !candidate.palette ||
    typeof candidate.palette !== "object"
  ) {
    return false;
  }

  return Object.entries(candidate.palette).every(
    ([key, color]) => BASE_KEY.test(key) && typeof color === "string" && HEX.test(color),
  );
}

export function readStoredScheme(): Scheme {
  if (typeof localStorage === "undefined") return DEFAULT_SCHEME;

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (isScheme(stored)) return normalize(stored);
  } catch {
    return pageDefaultScheme();
  }

  return pageDefaultScheme();
}

export function saveScheme(scheme: Scheme): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scheme));
}

export function clearStoredScheme(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function applyScheme(scheme: Scheme, persist = true): void {
  const root = document.documentElement;

  for (const [key, value] of Object.entries(scheme.palette)) {
    if (BASE_KEY.test(key) && HEX.test(value)) {
      root.style.setProperty(`--${key.toLowerCase()}`, value);
    }
  }

  root.dataset.theme = scheme.variant;
  root.dataset.scheme = scheme.id;
  root.style.colorScheme = scheme.variant;

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) themeColor.content = scheme.palette.base00;

  if (persist) saveScheme(scheme);

  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: scheme }));
}

export function resetScheme(): void {
  clearStoredScheme();
  applyScheme(pageDefaultScheme(), false);
}

export function swatchStyle(scheme: Scheme): string {
  return [
    scheme.palette.base08,
    scheme.palette.base0a,
    scheme.palette.base0b,
    scheme.palette.base0c,
    scheme.palette.base0d,
    scheme.palette.base0e,
  ]
    .map((color, index) => `--swatch-${index + 1}: ${color}`)
    .join("; ");
}
