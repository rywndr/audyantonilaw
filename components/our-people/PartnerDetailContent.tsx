import Link from "next/link";
import Image from "next/image";
import { FadeInHero } from "@/components/shared/FadeIn";
import PartnerImage from "@/components/shared/PartnerImage";
import PartnerInfoCards from "@/components/shared/PartnerInfoCards";
import type { Partner, Dictionary } from "@/dictionaries/types";

interface PartnerDetailContentProps {
    partner: Partner;
    dict: Dictionary;
    lang: "en" | "id";
}

export default function PartnerDetailContent({
    partner,
    dict,
    lang,
}: PartnerDetailContentProps) {
    return (
        <section className="relative" style={{ clipPath: "inset(0)" }}>
            <div
                className="fixed inset-0 pointer-events-none z-0"
                aria-hidden="true"
            >
                <Image
                    src="/images/backgrounds/CONTENT-BG-2.webp"
                    alt=""
                    fill
                    className="object-cover opacity-[0.08]"
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-10 md:px-12 md:pt-14">
                <FadeInHero delay={0.5} direction="left" distance={20}>
                    <Link
                        href={`/${lang}/our-people`}
                        className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
                    >
                        {dict.partners.backLabel}
                    </Link>
                </FadeInHero>
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
                <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-20">
                    {/* Image + info cards column — sticky on desktop */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <FadeInHero delay={0.6} direction="left" distance={40}>
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 shadow-lg">
                                    <PartnerImage
                                        partnerId={partner.id}
                                        partnerName={partner.name}
                                        variant="list"
                                    />
                                </div>
                            </FadeInHero>

                            {/* Info cards — hidden on mobile, shown on desktop */}
                            <div className="mt-6 hidden lg:block">
                                <PartnerInfoCards partner={partner} dict={dict} />
                            </div>
                        </div>
                    </div>

                    {/* Bio + mobile info cards column */}
                    <div className="relative lg:col-span-8">
                        <FadeInHero delay={0.6}>
                            <div className="mb-12 space-y-6">
                                {partner.bio.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-base leading-relaxed text-gray-700 md:text-lg"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </FadeInHero>

                        {/* Info cards — shown on mobile, hidden on desktop */}
                        <div className="block lg:hidden">
                            <PartnerInfoCards partner={partner} dict={dict} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
