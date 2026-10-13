import { pagePath } from "./registry";
import { SITE_NAME } from "./site";
import type { BreadcrumbItem, SeoPageDef } from "./types";

export function buildBreadcrumbs(page: SeoPageDef): BreadcrumbItem[] {
  return [
    { name: SITE_NAME, path: "/" },
    ...(page.breadcrumbParents ?? []),
    { name: page.breadcrumbLabel, path: pagePath(page) },
  ];
}
