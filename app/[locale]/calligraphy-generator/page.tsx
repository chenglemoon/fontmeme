import { getTranslations } from "next-intl/server";
import CalligraphyGenerator from "@/components/calligraphy-generator";
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
  const t = await getTranslations({ locale, namespace: "CalligraphyGenerator.metadata" });

  return constructMetadata({
    page: "CalligraphyGenerator",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/calligraphy-generator`,
  });
}

export default async function CalligraphyGeneratorPage({ params }: { params: Params }) {
  return <CalligraphyGenerator />;
}



