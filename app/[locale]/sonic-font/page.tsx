import { getTranslations } from "next-intl/server";
import SonicFont from "@/components/sonic-font";
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
  const t = await getTranslations({ locale, namespace: "SonicFont.metadata" });

  return constructMetadata({
    page: "SonicFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/sonic-font`,
  });
}

export default async function SonicFontPage({ params }: { params: Params }) {
  return <SonicFont />;
}

