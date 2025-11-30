"use client";

import ToolNav from "@/components/shared/ToolNav";
import Logo from "@/components/shared/Logo";
import MobileMenu from "@/components/header/MobileMenu";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Link as I18nLink } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Header");

  return (
    <header className="container flex items-center justify-between p-3 md:p-4 relative z-10 select-none">
      <I18nLink
        href="/"
        title={t("title")}
        prefetch={true}
        className="flex items-center gap-2 font-extrabold text-lg text-white"
      >
        <Logo height={42} />
        <span className="hidden sm:inline">Font Meme</span>
      </I18nLink>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Tool Navigation - Desktop only */}
        <div className="hidden lg:flex items-center">
          <ToolNav />
        </div>
        
        {/* Mobile Menu - Mobile only */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
        
        {/* Language Switcher - Desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
