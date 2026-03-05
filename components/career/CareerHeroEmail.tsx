import { FadeInHero } from "@/components/shared/FadeIn";
import type { Dictionary } from "@/dictionaries/types";

interface CareerHeroEmailProps {
    dict: Dictionary;
}

export default function CareerHeroEmail({ dict }: CareerHeroEmailProps) {
    return (
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
    );
}
