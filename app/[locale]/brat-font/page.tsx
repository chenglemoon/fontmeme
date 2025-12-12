import { getTranslations } from "next-intl/server";
import BratFont from "@/components/brat-font";
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
  const t = await getTranslations({ locale, namespace: "BratFont.metadata" });

  return constructMetadata({
    page: "BratFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/brat-font`,
  });
}

export default async function BratFontPage({ params }: { params: Params }) {
  return <BratFont />;
}



