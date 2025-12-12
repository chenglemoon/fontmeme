import { getTranslations } from "next-intl/server";
import UndertaleFont from "@/components/undertale-font";
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
  const t = await getTranslations({ locale, namespace: "UndertaleFont.metadata" });

  return constructMetadata({
    page: "UndertaleFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/undertale-font`,
  });
}

export default async function UndertaleFontPage({ params }: { params: Params }) {
  return <UndertaleFont />;
}



