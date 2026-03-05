import { FadeInHero } from "@/components/shared/FadeIn";
import type { Dictionary } from "@/dictionaries/types";

interface ContactHeroInfoProps {
    dict: Dictionary;
}

// Formats a comma-separated address string into one block element per line segment.
function FormattedAddress({ address }: { address: string }) {
    const lines = address.split(",");
    return (
        <address className="not-italic">
            <p className="font-serif text-lg font-light leading-relaxed text-white md:text-xl">
                {lines.map((line, index) => (
                    <span key={index} className="block">
                        {line.trim()}
                        {index < lines.length - 1 && ","}
                    </span>
                ))}
            </p>
        </address>
    );
}

export default function ContactHeroInfo({ dict }: ContactHeroInfoProps) {
    return (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 lg:gap-12">
            <FadeInHero delay={0.7} duration={0.8}>
                <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                        {dict.contact.phoneLabel}
                    </p>
                    <a
                        href={`tel:${dict.contact.phone.replace(/\s/g, "")}`}
                        className="font-serif text-2xl font-light text-white transition-colors hover:text-white/80 md:text-3xl"
                    >
                        {dict.contact.phone}
                    </a>
                </div>
            </FadeInHero>

            <FadeInHero delay={0.8} duration={0.8}>
                <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                        {dict.contact.addressLabel}
                    </p>
                    <FormattedAddress address={dict.contact.address} />
                </div>
            </FadeInHero>
        </div>
    );
}
