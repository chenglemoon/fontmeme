import { getTranslations } from "next-intl/server";
import MinecraftFont from "@/components/minecraft-font";
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
  const t = await getTranslations({ locale, namespace: "MinecraftFont.metadata" });

  return constructMetadata({
    page: "MinecraftFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/minecraft-font`,
  });
}

export default async function MinecraftFontPage({ params }: { params: Params }) {
  return <MinecraftFont />;
}


