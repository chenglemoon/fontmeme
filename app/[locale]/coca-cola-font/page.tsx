import { getTranslations } from "next-intl/server";
import CocaColaFont from "@/components/coca-cola-font";
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
  const t = await getTranslations({ locale, namespace: "CocaColaFont.metadata" });

  return constructMetadata({
    page: "CocaColaFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/coca-cola-font`,
  });
}

export default async function CocaColaFontPage({ params }: { params: Params }) {
  return <CocaColaFont />;
}


