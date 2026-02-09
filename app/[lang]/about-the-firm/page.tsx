import { getDictionary } from "../../get-dictionary";
import Image from "next/image";
import batikBg from "../../assets/images/batik.jpg";
import BatikFooter from "../../components/BatikFooter";

export default async function About({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang: rawLang } = await params;
    const lang = (rawLang === "id" ? "id" : "en") as "en" | "id";
    const dict = await getDictionary(lang);

    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-black">
                    <Image
                        src={batikBg}
                        alt="Batik Background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
                </div>
                <div className="relative z-10 px-6 pt-20 text-center text-white md:pt-24">
                    <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                        {dict.about.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/80 drop-shadow-lg md:mt-6 md:text-xl">
                        {dict.about.subtitle}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Text Column */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-10 h-1 w-16 bg-gray-900" />
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                                {dict.about.description1}
                            </p>
                            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                                {dict.about.description2}
                            </p>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-auto lg:min-h-[500px]">
                        <Image
                            src={batikBg}
                            alt="Batik Pattern"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="font-serif text-2xl font-semibold leading-snug text-white drop-shadow-lg md:text-3xl">
                                Unlocking potential,
                                <br />
                                safeguarding success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-sm md:h-64">
                        <Image
                            src={batikBg}
                            alt="Batik Pattern"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                            <p className="max-w-2xl font-serif text-xl font-semibold leading-relaxed text-white drop-shadow-lg md:text-2xl lg:text-3xl">
                                AUDY & ANTONI Counsellors at Law
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
