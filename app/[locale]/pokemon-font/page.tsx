import { getTranslations } from "next-intl/server";
import PokemonFont from "@/components/pokemon-font";
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
  const t = await getTranslations({ locale, namespace: "PokemonFont.metadata" });

  return constructMetadata({
    page: "PokemonFont",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/pokemon-font`,
  });
}

export default async function PokemonFontPage({ params }: { params: Params }) {
  return <PokemonFont />;
}



