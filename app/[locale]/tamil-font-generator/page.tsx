import { getTranslations } from "next-intl/server";
import TamilFontGenerator from "@/components/tamil-font-generator";
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
  const t = await getTranslations({ locale, namespace: "TamilFontGenerator.metadata" });

  return constructMetadata({
    page: "TamilFontGenerator",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/tamil-font-generator`,
  });
}

export default async function TamilFontGeneratorPage({ params }: { params: Params }) {
  return <TamilFontGenerator />;
}


