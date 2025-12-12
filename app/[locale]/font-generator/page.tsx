import { getTranslations } from "next-intl/server";
import FontGeneratorPage from "@/components/font-generator";
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
  const t = await getTranslations({ locale, namespace: "FontGenerator.metadata" });

  return constructMetadata({
    page: "FontGenerator",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/font-generator`,
  });
}

export default async function FontGeneratorRoute({ params }: { params: Params }) {
  return <FontGeneratorPage />;
}



