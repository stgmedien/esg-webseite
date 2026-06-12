import { MAIN_NAV, PORTALE } from "@/lib/nav";
import { getChildren } from "@/lib/content";
import HeaderNav, { type NavItem } from "@/components/HeaderNav";

export default function SiteHeader() {
  const items: NavItem[] = MAIN_NAV.map((section) => {
    const children = section.hub
      ? getChildren(section.hub).map((c) => ({ label: c.title, href: `/${c.rel}` }))
      : [];
    return {
      label: section.label,
      href: section.href,
      accent: section.accent,
      children: [...children, ...(section.extra ?? [])],
    };
  });

  return <HeaderNav items={items} portale={PORTALE} />;
}
