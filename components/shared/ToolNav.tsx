"use client";

import { Link as I18nLink, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ToolNav() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  // 规范化路径进行比较
  let normalizedPathname = pathname;
  if (normalizedPathname.match(/^\/[a-z]{2}(-[A-Z]{2})?\//)) {
    normalizedPathname = normalizedPathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?\//, "/");
  }
  normalizedPathname = normalizedPathname.replace(/\/$/, "") || "/";
  
  const isActive = normalizedPathname === "/";
  const links = t.raw("links") as Array<{ href: string; name: string }>;
  const homeLink = links[0]; // 获取 Header.links 中的第一个链接（首页）

  return (
    <nav className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-gray-800 rounded-3xl p-1 px-2 [&_span]:rounded-xl [&_span]:px-2 [&_span]:bg-blue-600 [&_span]:text-white [&_a]:rounded-xl [&_a]:px-2 hover:[&_a]:bg-sky-50 dark:hover:[&_a]:bg-gray-700 hover:[&_a]:text-blue-600 dark:hover:[&_a]:text-blue-400 transition-colors">
      {isActive ? (
        <span title={homeLink.name}>
          {homeLink.name}
        </span>
      ) : (
        <I18nLink
          href={homeLink.href}
          title={homeLink.name}
          prefetch={true}
        >
          {homeLink.name}
        </I18nLink>
      )}
    </nav>
  );
}
