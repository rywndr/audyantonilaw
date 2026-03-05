import Image from "next/image";
import FadeIn from "@/components/shared/FadeIn";
import type { Dictionary } from "@/dictionaries/types";

interface AboutContentProps {
    dict: Dictionary;
}

// Splits paragraph text on the firm name shorthand to inject a bold span inline.
// Done at the component level so the dictionary stays plain text without markup.
function ParagraphWithBoldFirmName({
    text,
    firmName,
}: {
    text: string;
    firmName: string;
}) {
    const parts = text.split(firmName);
    return (
        <>
            {parts.map((part, i) => (
                <span key={i}>
                    {part}
                    {i < parts.length - 1 && (
                        <strong className="font-semibold text-gray-900">
                            {firmName}
                        </strong>
                    )}
                </span>
            ))}
        </>
    );
}

export default function AboutContent({ dict }: AboutContentProps) {
    return (
        <section className="relative bg-white [clip-path:inset(0)]">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            <div
                className="fixed inset-0 pointer-events-none z-0"
                aria-hidden="true"
            >
                <Image
                    src="/images/backgrounds/CONTENT-BG.webp"
                    alt=""
                    fill
                    className="object-cover opacity-[0.03]"
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl items-start px-6 py-20 md:px-12 md:py-32 lg:grid lg:grid-cols-12 lg:gap-20">
                {/* Text column */}
                <div className="relative space-y-10 lg:col-span-7">
                    <FadeIn direction="left" distance={40}>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-gray-900" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                                {dict.about.sectionLabel}
                            </span>
                        </div>
                    </FadeIn>

                    <div className="space-y-8">
                        {dict.about.paragraphs.map((paragraph, index) => (
                            <FadeIn key={index} delay={0.1 + index * 0.08}>
                                <p className="text-lg font-light leading-[1.9] text-gray-600 md:text-xl">
                                    {paragraph.hasFirmName && (
                                        <strong className="font-semibold text-gray-900">
                                            {dict.about.firmName}
                                        </strong>
                                    )}
                                    {paragraph.hasFirmNameInText ? (
                                        <ParagraphWithBoldFirmName
                                            text={paragraph.text}
                                            firmName={dict.about.firmNameShort}
                                        />
                                    ) : (
                                        paragraph.text
                                    )}
                                </p>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.6} direction="left" distance={30}>
                        <div className="pt-8">
                            <div className="inline-flex items-center gap-3 border-l-2 border-gray-900 pl-6">
                                <div className="space-y-1">
                                    <p className="font-serif text-2xl font-light italic text-gray-900 md:text-3xl">
                                        {dict.about.tagline}
                                    </p>
                                    <p className="text-sm font-light tracking-wide text-gray-500">
                                        {dict.about.taglineSubtext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Image column */}
                <div className="mt-16 lg:col-span-5 lg:mt-0 lg:sticky lg:top-28">
                    <FadeIn delay={0.2} direction="right" distance={50}>
                        <div className="relative">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-[4/5]">
                                <Image
                                    src="/images/backgrounds/batik-team-bg.webp"
                                    alt="Batik Pattern"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="border-l-4 border-white pl-6">
                                        <p className="font-serif text-3xl font-light leading-tight text-white drop-shadow-lg md:text-4xl">
                                            {dict.home.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="-z-10 absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gray-900 opacity-5 blur-3xl" />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
