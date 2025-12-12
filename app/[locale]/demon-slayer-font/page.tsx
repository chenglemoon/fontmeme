import { getTranslations } from "next-intl/server";
import DemonSlayerFont from "@/components/demon-slayer-font";
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
  const t = await getTranslations({ locale, namespace: "DemonSlayerFont.metadata" });

  return constructMetadata({
    page: "DemonSlayerFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/demon-slayer-font`,
  });
}

export default async function DemonSlayerFontPage({ params }: { params: Params }) {
  return <DemonSlayerFont />;
}



