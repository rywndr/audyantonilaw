import { getDictionary } from "@/utils/get-dictionary";
import { getCanonicalUrl } from "@/utils/canonical";
import BatikFooter from "@/components/layout/BatikFooter";
import PageHero from "@/components/hero/PageHero";
import CareerContent from "@/components/career/CareerContent";
import CareerHeroEmail from "@/components/career/CareerHeroEmail";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string }> };

function resolveLocale(raw: string): "en" | "id" {
    return raw === "id" ? "id" : "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang: rawLang } = await params;
    return {
        alternates: { canonical: getCanonicalUrl(resolveLocale(rawLang), "career") },
    };
}

export default async function Career({ params }: PageProps) {
    const { lang: rawLang } = await params;
    const lang = resolveLocale(rawLang);
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            <PageHero
                backgroundImage="/images/backgrounds/career-main-bg.webp"
                title={dict.career.title}
                subtitle={dict.career.subtitle}
            >
                <CareerHeroEmail dict={dict} />
            </PageHero>
            <CareerContent dict={dict} />
            <BatikFooter />
        </div>
    );
}
