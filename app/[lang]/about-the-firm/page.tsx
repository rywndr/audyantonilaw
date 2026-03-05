import { getDictionary } from "@/utils/get-dictionary";
import { getCanonicalUrl } from "@/utils/canonical";
import BatikFooter from "@/components/layout/BatikFooter";
import PageHero from "@/components/hero/PageHero";
import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string }> };

function resolveLocale(raw: string): "en" | "id" {
    return raw === "id" ? "id" : "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang: rawLang } = await params;
    return {
        alternates: { canonical: getCanonicalUrl(resolveLocale(rawLang), "about-the-firm") },
    };
}

export default async function About({ params }: PageProps) {
    const { lang: rawLang } = await params;
    const lang = resolveLocale(rawLang);
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            <PageHero
                backgroundImage="/images/backgrounds/batik-about-bg.webp"
                title={dict.about.title}
                subtitle={dict.about.subtitle}
            />
            <AboutContent dict={dict} />
            <BatikFooter />
        </div>
    );
}
