import Link from "next/link";
import PartnerImage from "@/components/shared/PartnerImage";
import { ArrowRightIcon } from "@/components/icons";
import {
    FadeInStagger,
    FadeInStaggerItem,
} from "@/components/shared/FadeIn";
import FadeIn from "@/components/shared/FadeIn";
import Image from "next/image";
import type { Partner, Dictionary } from "@/dictionaries/types";

interface PartnerCardProps {
    partner: Partner;
    lang: "en" | "id";
    readProfileLabel: string;
}

function PartnerCard({ partner, lang, readProfileLabel }: PartnerCardProps) {
    const profileHref = `/${lang}/our-people/${partner.id}`;

    return (
        <div className="group relative flex flex-col gap-8 md:flex-row md:items-start">
            <Link
                href={profileHref}
                className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-gray-100 sm:w-64 md:w-72 lg:w-80"
            >
                <PartnerImage
                    partnerId={partner.id}
                    partnerName={partner.name}
                    variant="list"
                />
            </Link>

            <div className="flex flex-1 flex-col pt-2">
                <div className="mb-3">
                    <span className="inline-block border-b border-gray-300 pb-1 text-xs font-medium uppercase tracking-widest text-gray-500">
                        {partner.title}
                    </span>
                </div>

                <Link href={profileHref} className="block">
                    <h3 className="font-serif text-3xl font-light text-gray-900 transition-colors group-hover:text-gray-600 sm:text-4xl">
                        {partner.name}
                    </h3>
                </Link>

                <div className="mb-6 mt-6 h-px w-full max-w-[50px] bg-gray-300 transition-all duration-500 group-hover:max-w-md group-hover:bg-gray-400" />

                <p className="mb-8 line-clamp-4 max-w-2xl text-base leading-relaxed text-gray-600">
                    {partner.bio[0]}
                </p>

                <div className="mt-auto">
                    <Link
                        href={profileHref}
                        className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-gray-600"
                    >
                        <span>{readProfileLabel}</span>
                        <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

interface PartnersListProps {
    dict: Dictionary;
    lang: "en" | "id";
}

export default function PartnersList({ dict, lang }: PartnersListProps) {
    return (
        <section className="relative bg-gray-50" style={{ clipPath: "inset(0)" }}>
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

            <div className="container relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 md:px-12 md:py-32">
                <FadeIn direction="up" distance={30}>
                    <div className="mb-12 text-center md:mb-20">
                        <h2 className="font-serif text-3xl font-light tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            {dict.partners.sectionTitle}
                        </h2>
                        <div className="mx-auto mt-4 h-px w-16 bg-gray-900 md:mt-6" />
                    </div>
                </FadeIn>

                <FadeInStagger className="grid gap-16" staggerDelay={0.2}>
                    {dict.partners.list.map((partner) => (
                        <FadeInStaggerItem key={partner.id}>
                            <PartnerCard
                                partner={partner}
                                lang={lang}
                                readProfileLabel={dict.partners.readProfile}
                            />
                        </FadeInStaggerItem>
                    ))}
                </FadeInStagger>
            </div>
        </section>
    );
}
