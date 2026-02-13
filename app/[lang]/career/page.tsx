import { getDictionary } from "@/utils/get-dictionary";
import Image from "next/image";
import BatikFooter from "@/components/BatikFooter";
import FadeIn, { FadeInHero } from "@/components/FadeIn";

export default async function Career({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang: rawLang } = await params;
    const lang = (rawLang === "id" ? "id" : "en") as "en" | "id";
    const dict = await getDictionary(lang);

    const contentBgImage = "/images/backgrounds/CONTENT-BG-4.webp";

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative flex min-h-[85vh] items-center overflow-hidden md:min-h-screen">
                {/* Background */}
                <div className="absolute inset-0 -z-10 bg-black">
                    <Image
                        src="/images/backgrounds/career-main-bg.webp"
                        alt="Batik Background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                </div>

                <div className="container mx-auto max-w-7xl px-6 md:px-12">
                    <div className="max-w-4xl pt-32 pb-20">
                        {/* Top line */}
                        <FadeInHero delay={0.2} direction="left" distance={50}>
                            <div className="mb-8 h-px w-full max-w-2xl bg-white/40" />
                        </FadeInHero>

                        {/* Main heading */}
                        <FadeInHero delay={0.3} duration={0.8}>
                            <h1 className="font-serif text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                                {dict.career.title}
                            </h1>
                        </FadeInHero>

                        {/* Sub */}
                        <FadeInHero delay={0.5} duration={0.8}>
                            <p className="mt-6 max-w-xl text-lg font-light italic leading-relaxed text-white/90 md:mt-8 md:text-xl lg:text-2xl">
                                {dict.career.subtitle}
                            </p>
                        </FadeInHero>

                        {/* Email */}
                        <FadeInHero delay={0.7} duration={0.8}>
                            <div className="mt-12 md:mt-16">
                                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                                    {dict.career.emailLabel}
                                </p>
                                <a
                                    href={`mailto:${dict.career.email}`}
                                    className="font-serif text-2xl font-light text-white transition-colors hover:text-white/80 md:text-3xl"
                                >
                                    {dict.career.email}
                                </a>
                            </div>
                        </FadeInHero>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative bg-white">
                {contentBgImage && (
                    <div className="pointer-events-none absolute inset-0 z-0">
                        <Image
                            src={contentBgImage}
                            alt=""
                            fill
                            className="object-cover opacity-[0.05]"
                        />
                    </div>
                )}

                <div className="container relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                        {/* Header & Description */}
                        <FadeIn direction="up" distance={30}>
                            <div>
                                <h2 className="font-serif text-3xl font-light tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                                    {dict.career.headerText}
                                </h2>
                                <div className="mt-6 h-px w-24 bg-gray-900" />
                                <p className="mt-8 text-lg leading-relaxed text-gray-600">
                                    {dict.career.description}
                                </p>
                            </div>
                        </FadeIn>

                        {/* How to Apply */}
                        <FadeIn delay={0.2} direction="up" distance={30}>
                            <div className="rounded-2xl border border-gray-100 p-8">
                                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                                    {dict.career.applyTitle}
                                </h3>
                                <p className="text-base leading-relaxed text-gray-600">
                                    {dict.career.applyDescription}
                                </p>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                                        {dict.career.emailLabel}
                                    </p>
                                    <a
                                        href={`mailto:${dict.career.email}`}
                                        className="text-lg font-medium text-gray-900 hover:underline"
                                    >
                                        {dict.career.email}
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
