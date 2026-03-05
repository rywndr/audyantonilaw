import { getDictionary } from "@/utils/get-dictionary";
import { getCanonicalUrl } from "@/utils/canonical";
import Image from "next/image";
import BatikFooter from "@/components/layout/BatikFooter";
import PageHero from "@/components/hero/PageHero";
import PracticeAreaList from "@/components/practice-area/PracticeAreaList";
import BusinessSectors from "@/components/shared/BusinessSectors";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string }> };

function resolveLocale(raw: string): "en" | "id" {
    return raw === "id" ? "id" : "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang: rawLang } = await params;
    return {
        alternates: { canonical: getCanonicalUrl(resolveLocale(rawLang), "practice-area") },
    };
}

export default async function PracticeArea({ params }: PageProps) {
    const { lang: rawLang } = await params;
    const lang = resolveLocale(rawLang);
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            <PageHero
                backgroundImage="/images/backgrounds/batik-practices-bg.webp"
                title={dict.practices.title}
                subtitle={dict.practices.subtitle}
            />

            <div className="relative" style={{ clipPath: "inset(0)" }}>
                <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
                    <Image
                        src="/images/backgrounds/CONTENT-BG-3.webp"
                        alt=""
                        fill
                        className="object-cover opacity-[0.07]"
                    />
                </div>

                <PracticeAreaList
                    headerText={dict.practices.headerText}
                    corporateTitle={dict.practices.corporate.title}
                    corporateAreas={dict.practices.corporate.areas}
                    litigationTitle={dict.practices.litigation.title}
                    litigationAreas={dict.practices.litigation.areas}
                    learnMoreText={dict.practices.learnMore}
                    sidebarLabel={dict.practices.sidebarLabel}
                    sidebarCloseLabel={dict.practices.sidebarClose}
                />
            </div>

            <BusinessSectors
                label={dict.practices.sectors.label}
                title={dict.practices.sectors.title}
                description={dict.practices.sectors.description}
                sectors={dict.practices.sectors.list}
            />

            <BatikFooter />
        </div>
    );
}
