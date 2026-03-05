import { getDictionary } from "@/utils/get-dictionary";
import { getCanonicalUrl } from "@/utils/canonical";
import { notFound } from "next/navigation";
import BatikFooter from "@/components/layout/BatikFooter";
import PartnerBanner from "@/components/hero/PartnerBanner";
import PartnerDetailContent from "@/components/our-people/PartnerDetailContent";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

function resolveLocale(raw: string): "en" | "id" {
    return raw === "id" ? "id" : "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang: rawLang, slug } = await params;
    return {
        alternates: {
            canonical: getCanonicalUrl(resolveLocale(rawLang), `our-people/${slug}`),
        },
    };
}

export default async function PartnerDetail({ params }: PageProps) {
    const { lang: rawLang, slug } = await params;
    const lang = resolveLocale(rawLang);
    const dict = await getDictionary(lang);

    const partner = dict.partners.list.find((p) => p.id === slug);
    if (!partner) notFound();

    return (
        <div className="min-h-screen">
            <PartnerBanner title={partner.title} name={partner.name} />
            <PartnerDetailContent partner={partner} dict={dict} lang={lang} />
            <BatikFooter />
        </div>
    );
}
