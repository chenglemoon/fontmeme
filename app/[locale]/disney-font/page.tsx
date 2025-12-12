import { getTranslations } from "next-intl/server";
import DisneyFont from "@/components/disney-font";
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
  const t = await getTranslations({ locale, namespace: "DisneyFont.metadata" });

  return constructMetadata({
    page: "DisneyFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/disney-font`,
  });
}

export default async function DisneyFontPage({ params }: { params: Params }) {
  return <DisneyFont />;
}



