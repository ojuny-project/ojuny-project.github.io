import data from "./variants.json";

export interface Variant {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  defaultScheme: string;
  facts: string[];
  repos: string[];
}

export const VARIANTS = data as Variant[];

export function variantBySlug(slug: string): Variant | undefined {
  return VARIANTS.find((variant) => variant.slug === slug);
}

export function variantForPath(pathname: string, basePath = "/"): Variant | undefined {
  const base = basePath.endsWith("/") ? basePath : `${basePath}/`;
  let path = pathname;

  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }

  const [first] = path.split("/").filter(Boolean);
  return first ? variantBySlug(first) : undefined;
}
