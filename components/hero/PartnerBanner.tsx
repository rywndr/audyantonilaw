import Image from "next/image";
import { FadeInHero } from "@/components/shared/FadeIn";

interface PartnerBannerProps {
    title: string;
    name: string;
}

export default function PartnerBanner({ title, name }: PartnerBannerProps) {
    return (
        <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-black">
                <Image
                    src="/images/backgrounds/batik-team-bg.webp"
                    alt="Batik Background"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            </div>
            <div className="relative z-10 px-6 pt-20 text-center text-white md:pt-24">
                <FadeInHero delay={0.2} duration={0.8}>
                    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60 md:text-base">
                        {title}
                    </p>
                </FadeInHero>
                <FadeInHero delay={0.4} duration={0.8}>
                    <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                        {name}
                    </h1>
                </FadeInHero>
            </div>
        </section>
    );
}
