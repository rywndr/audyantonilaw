import { getDictionary } from "@/utils/get-dictionary";
import { getCanonicalUrl } from "@/utils/canonical";
import BatikFooter from "@/components/layout/BatikFooter";
import PageHero from "@/components/hero/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import ContactHeroInfo from "@/components/contact/ContactHeroInfo";
import ContactMap from "@/components/contact/ContactMap";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ lang: string }> };

function resolveLocale(raw: string): "en" | "id" {
    return raw === "id" ? "id" : "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang: rawLang } = await params;
    return {
        alternates: { canonical: getCanonicalUrl(resolveLocale(rawLang), "contact-us") },
    };
}

export default async function Contact({ params }: PageProps) {
    const { lang: rawLang } = await params;
    const lang = resolveLocale(rawLang);
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            <PageHero
                backgroundImage="/images/backgrounds/batik-main-bg.webp"
                title={dict.contact.title}
                subtitle={dict.contact.subtitle}
            >
                <ContactHeroInfo dict={dict} />
            </PageHero>

            <section className="bg-white">
                <div className="container mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                        <ContactForm
                            formTitle={dict.contact.formTitle}
                            formName={dict.contact.formName}
                            formEmail={dict.contact.formEmail}
                            formPhone={dict.contact.formPhone}
                            formSubject={dict.contact.formSubject}
                            formMessage={dict.contact.formMessage}
                            formSubmit={dict.contact.formSubmit}
                            formSending={dict.contact.formSending}
                            formSuccessTitle={dict.contact.formSuccessTitle}
                            formSuccessBody={dict.contact.formSuccessBody}
                            formSuccessReset={dict.contact.formSuccessReset}
                        />
                        <ContactMap title={dict.contact.mapTitle} />
                    </div>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
