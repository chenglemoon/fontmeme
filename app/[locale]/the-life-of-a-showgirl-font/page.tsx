import { getTranslations } from "next-intl/server";
import TheLifeOfAShowgirlFont from "@/components/the-life-of-a-showgirl-font";
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
  const t = await getTranslations({ locale, namespace: "TheLifeOfAShowgirlFont.metadata" });

  return constructMetadata({
    page: "TheLifeOfAShowgirlFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/the-life-of-a-showgirl-font`,
  });
}

export default async function TheLifeOfAShowgirlFontPage({ params }: { params: Params }) {
  return <TheLifeOfAShowgirlFont />;
}

