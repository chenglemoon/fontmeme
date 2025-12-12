import { getTranslations } from "next-intl/server";
import GraffitiGenerator from "@/components/graffiti-generator";
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
  const t = await getTranslations({ locale, namespace: "GraffitiGenerator.metadata" });

  return constructMetadata({
    page: "GraffitiGenerator",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    locale: locale as Locale,
    path: `/graffiti-generator`,
  });
}

export default async function GraffitiGeneratorPage({ params }: { params: Params }) {
  return <GraffitiGenerator />;
}



