import Image from "next/image";
import FadeIn from "@/components/shared/FadeIn";
import type { Dictionary } from "@/dictionaries/types";

interface CareerContentProps {
    dict: Dictionary;
}

export default function CareerContent({ dict }: CareerContentProps) {
    return (
        <section className="relative bg-white">
            <div className="pointer-events-none absolute inset-0 z-0">
                <Image
                    src="/images/backgrounds/CONTENT-BG-4.webp"
                    alt=""
                    fill
                    className="object-cover opacity-[0.05]"
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
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

                    <FadeIn delay={0.2} direction="up" distance={30}>
                        <div className="rounded-2xl border border-gray-100 p-8">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">
                                {dict.career.applyTitle}
                            </h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                {dict.career.applyDescription}
                            </p>
                            <div className="mt-6 border-t border-gray-200 pt-6">
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
    );
}
