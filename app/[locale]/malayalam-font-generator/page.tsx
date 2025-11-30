import { getTranslations } from "next-intl/server";
import MalayalamFontGenerator from "@/components/malayalam-font-generator";
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
  const t = await getTranslations({ locale, namespace: "MalayalamFontGenerator.metadata" });

  return constructMetadata({
    page: "MalayalamFontGenerator",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/malayalam-font-generator`,
  });
}

export default async function MalayalamFontGeneratorPage({ params }: { params: Params }) {
  return <MalayalamFontGenerator />;
}


