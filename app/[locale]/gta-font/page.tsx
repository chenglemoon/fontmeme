import { getTranslations } from "next-intl/server";
import GtaFont from "@/components/gta-font";
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
  const t = await getTranslations({ locale, namespace: "GtaFont.metadata" });

  return constructMetadata({
    page: "GtaFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/gta-font`,
  });
}

export default async function GtaFontPage({ params }: { params: Params }) {
  return <GtaFont />;
}


