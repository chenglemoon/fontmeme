import { getTranslations } from "next-intl/server";
import MontserratFont from "@/components/montserrat-font";
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
  const t = await getTranslations({ locale, namespace: "MontserratFont.metadata" });

  return constructMetadata({
    page: "MontserratFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/montserrat-font`,
  });
}

export default async function MontserratFontPage({ params }: { params: Params }) {
  return <MontserratFont />;
}


