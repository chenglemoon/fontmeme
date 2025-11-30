import { getTranslations } from "next-intl/server";
import SquidGameFont from "@/components/squid-game-font";
import { constructMetadata } from "@/lib/metadata";
import { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

type Params = Promise<{ locale: string }>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SquidGameFont.metadata" });

  return constructMetadata({
    page: "SquidGameFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/squid-game-font`,
  });
}

export default async function SquidGameFontPage({ params }: { params: Params }) {
  return <SquidGameFont />;
}

