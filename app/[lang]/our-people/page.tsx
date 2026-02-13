import { getDictionary } from "@/utils/get-dictionary";
import Link from "next/link";
import Image from "next/image";
import BatikFooter from "@/components/BatikFooter";
import FadeIn, {
    FadeInHero,
    FadeInStagger,
    FadeInStaggerItem,
} from "@/components/FadeIn";
import Cta from "@/components/Cta";

const CONTENT_BG_IMAGE = "/images/backgrounds/CONTENT-BG-2.webp";

const partnerImages: Record<string, string> = {
    "andelton-antoni": "/images/profiles/andelton-antoni.webp",
    "audy-rahmat": "/images/profiles/audy-rahmat.webp",
};

export default async function Partners({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang: rawLang } = await params;
    const lang = (rawLang === "id" ? "id" : "en") as "en" | "id";
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative flex min-h-[85vh] items-center overflow-hidden md:min-h-screen">
                {/* Background */}
                <div className="absolute inset-0 -z-10 bg-black">
                    <Image
                        src="/images/backgrounds/batik-team-bg.webp"
                        alt="Batik Background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                </div>

                <div className="container mx-auto max-w-7xl px-6 md:px-12">
                    <div className="max-w-4xl pt-20">
                        {/* Top line */}
                        <FadeInHero delay={0.2} direction="left" distance={50}>
                            <div className="mb-8 h-px w-full max-w-2xl bg-white/40" />
                        </FadeInHero>

                        {/* Main heading */}
                        <FadeInHero delay={0.3} duration={0.8}>
                            <h1 className="font-serif text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                                {dict.partners.title}
                            </h1>
                        </FadeInHero>

                        {/* Sub */}
                        <FadeInHero delay={0.5} duration={0.8}>
                            <p className="mt-8 max-w-xl font-serif text-lg font-light italic leading-relaxed text-white/90 md:text-xl lg:text-2xl">
                                {dict.partners.subtitle}
                            </p>
                        </FadeInHero>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section
                className="relative bg-gray-50"
                style={{ clipPath: "inset(0)" }}
            >
                {CONTENT_BG_IMAGE && (
                    <div
                        className="fixed inset-0 pointer-events-none z-0"
                        aria-hidden="true"
                    >
                        <Image
                            src={CONTENT_BG_IMAGE}
                            alt=""
                            fill
                            className="object-cover opacity-[0.08]"
                        />
                    </div>
                )}

                <div className="container relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 md:px-12 md:py-32">
                    {/* Section Header */}
                    <FadeIn direction="up" distance={30}>
                        <div className="mb-12 text-center md:mb-20">
                            <h2 className="font-serif text-3xl font-light tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                                {dict.partners.sectionTitle}
                            </h2>
                            <div className="mx-auto mt-4 h-px w-16 bg-gray-900 md:mt-6" />
                        </div>
                    </FadeIn>

                    {/* Partners Cards */}
                    <FadeInStagger className="grid gap-16" staggerDelay={0.2}>
                        {dict.partners.list.map((partner) => (
                            <FadeInStaggerItem key={partner.id}>
                                <div className="group relative flex flex-col gap-8 md:flex-row md:items-start">
                                    {/* Image Column */}
                                    <Link
                                        href={`/${lang}/our-people/${partner.id}`}
                                        className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-gray-100 sm:w-64 md:w-72 lg:w-80"
                                    >
                                        {partnerImages[partner.id] ? (
                                            <>
                                                <Image
                                                    src={
                                                        partnerImages[
                                                            partner.id
                                                        ]
                                                    }
                                                    alt={partner.name}
                                                    fill
                                                    className="object-cover object-top"
                                                />
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                <span className="font-serif text-6xl font-light">
                                                    {partner.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </Link>

                                    {/* Content Column */}
                                    <div className="flex flex-1 flex-col pt-2">
                                        <div className="mb-3">
                                            <span className="inline-block border-b border-gray-300 pb-1 text-xs font-medium uppercase tracking-widest text-gray-500">
                                                {partner.title}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/${lang}/our-people/${partner.id}`}
                                            className="block"
                                        >
                                            <h3 className="font-serif text-3xl font-light text-gray-900 transition-colors group-hover:text-gray-600 sm:text-4xl">
                                                {partner.name}
                                            </h3>
                                        </Link>

                                        <div className="mt-6 mb-6 h-px w-full max-w-[50px] bg-gray-300 transition-all duration-500 group-hover:max-w-md group-hover:bg-gray-400" />

                                        <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600 line-clamp-4">
                                            {partner.bio[0]}
                                        </p>

                                        <div className="mt-auto">
                                            <Link
                                                href={`/${lang}/our-people/${partner.id}`}
                                                className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-gray-600"
                                            >
                                                <span>
                                                    {dict.partners.readProfile}
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeInStaggerItem>
                        ))}
                    </FadeInStagger>
                </div>
            </section>

            <Cta lang={lang} dict={dict} />

            <BatikFooter />
        </div>
    );
}
