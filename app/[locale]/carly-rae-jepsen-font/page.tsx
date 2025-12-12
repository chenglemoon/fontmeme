import { getTranslations } from "next-intl/server";
import CarlyRaeJepsenFont from "@/components/carly-rae-jepsen-font";
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
  const t = await getTranslations({ locale, namespace: "CarlyRaeJepsenFont.metadata" });

  return constructMetadata({
    page: "CarlyRaeJepsenFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/carly-rae-jepsen-font`,
  });
}

export default async function CarlyRaeJepsenFontPage({ params }: { params: Params }) {
  return <CarlyRaeJepsenFont />;
}



