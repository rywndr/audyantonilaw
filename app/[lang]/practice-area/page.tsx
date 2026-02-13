import { getDictionary } from "@/utils/get-dictionary";
import Image from "next/image";
import BatikFooter from "@/components/BatikFooter";
import FadeIn, { FadeInHero } from "@/components/FadeIn";
import PracticeAreaClient from "@/components/PracticeAreaClient";

export default async function PracticeArea({
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
                <div className="absolute inset-0 -z-10 bg-black">
                    <Image
                        src="/images/backgrounds/batik-practices-bg.webp"
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

                        <FadeInHero delay={0.3} duration={0.8}>
                            <h1 className="font-serif text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                                {dict.practices.title}
                            </h1>
                        </FadeInHero>

                        <FadeInHero delay={0.5} duration={0.8}>
                            <p className="mt-8 max-w-xl font-serif text-lg font-light italic leading-relaxed text-white/90 md:text-xl lg:text-2xl">
                                {dict.practices.subtitle}
                            </p>
                        </FadeInHero>
                    </div>
                </div>
            </section>

            {/* Practice Areas */}
            <PracticeAreaClient
                headerText={dict.practices.headerText}
                corporateTitle={dict.practices.corporate.title}
                corporateAreas={dict.practices.corporate.areas}
                litigationTitle={dict.practices.litigation.title}
                litigationAreas={dict.practices.litigation.areas}
                learnMoreText={dict.practices.learnMore}
                contentBgImage="/images/backgrounds/CONTENT-BG-3.webp"
            />

            {/* Business Sectors Section */}
            <section className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-32">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-[0.15]" />

                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                            backgroundSize: "80px 80px",
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />
                </div>

                <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                    {/* Section Header */}
                    <FadeIn direction="up" distance={30}>
                        <div className="mb-16 text-center md:mb-24">
                            <p
                                className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                                style={{ color: "#C8A97E" }}
                            >
                                {dict.practices.sectors.label}
                            </p>
                            <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                                {dict.practices.sectors.title}
                            </h2>
                            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent opacity-60" />
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
                                {dict.practices.sectors.description}
                            </p>
                        </div>
                    </FadeIn>

                    {/* Sectors Grid */}
                    <FadeIn delay={0.2} direction="up" distance={40}>
                        <div className="grid gap-x-12 gap-y-0 md:grid-cols-2 lg:gap-x-24">
                            {/* Left Column */}
                            <div className="divide-y divide-white/10 border-t border-b border-white/10 md:border-none">
                                {dict.practices.sectors.list
                                    .slice(0, 9)
                                    .map((sector, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-5 py-6 transition-all duration-500 hover:px-6 hover:-mx-6 rounded-sm hover:bg-white/[0.02]"
                                        >
                                            {/* Sector Image/Icon */}
                                            {sector.image ? (
                                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 transition-all duration-300 group-hover:ring-[#C8A97E]">
                                                    <Image
                                                        src={sector.image}
                                                        alt={sector.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-[#C8A97E]/10 group-hover:ring-[#C8A97E]">
                                                    <span className="font-serif text-lg font-light text-neutral-400 transition-colors group-hover:text-[#C8A97E]">
                                                        {sector.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Sector Name */}
                                            <div className="flex-1">
                                                <h4 className="font-serif text-lg tracking-wide text-neutral-300 transition-colors group-hover:text-white">
                                                    {sector.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Right Column */}
                            <div className="divide-y divide-white/10 border-b border-white/10 md:border-none">
                                {dict.practices.sectors.list
                                    .slice(9)
                                    .map((sector, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-5 py-6 transition-all duration-500 hover:px-6 hover:-mx-6 rounded-sm hover:bg-white/[0.02]"
                                        >
                                            {/* Sector Image/Icon */}
                                            {sector.image ? (
                                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 transition-all duration-300 group-hover:ring-[#C8A97E]">
                                                    <Image
                                                        src={sector.image}
                                                        alt={sector.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-[#C8A97E]/10 group-hover:ring-[#C8A97E]">
                                                    <span className="font-serif text-lg font-light text-neutral-400 transition-colors group-hover:text-[#C8A97E]">
                                                        {sector.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Sector Name */}
                                            <div className="flex-1">
                                                <h4 className="font-serif text-lg tracking-wide text-neutral-300 transition-colors group-hover:text-white">
                                                    {sector.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
