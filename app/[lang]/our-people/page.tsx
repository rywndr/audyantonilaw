import { getDictionary } from "@/utils/get-dictionary";
import { getCanonicalUrl } from "@/utils/canonical";
import BatikFooter from "@/components/layout/BatikFooter";
import PageHero from "@/components/hero/PageHero";
import PartnersList from "@/components/our-people/PartnersList";
import CtaBanner from "@/components/shared/CtaBanner";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string }> };

function resolveLocale(raw: string): "en" | "id" {
    return raw === "id" ? "id" : "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang: rawLang } = await params;
    return {
        alternates: { canonical: getCanonicalUrl(resolveLocale(rawLang), "our-people") },
    };
}

export default async function Partners({ params }: PageProps) {
    const { lang: rawLang } = await params;
    const lang = resolveLocale(rawLang);
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            <PageHero
                backgroundImage="/images/backgrounds/batik-team-bg.webp"
                title={dict.partners.title}
                subtitle={dict.partners.subtitle}
            />
            <PartnersList dict={dict} lang={lang} />
            <CtaBanner lang={lang} dict={dict} />
            <BatikFooter />
        </div>
    );
}
