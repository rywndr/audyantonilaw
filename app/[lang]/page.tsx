import { getDictionary } from "../get-dictionary";
import Image from "next/image";
import batikBg from "../assets/images/batik.jpg";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang: rawLang } = await params;
    const lang = (rawLang === "id" ? "id" : "en") as "en" | "id";
    const dict = await getDictionary(lang);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 font-sans text-white sm:p-12 md:p-20">
            {/* Batik bg */}
            <div className="absolute inset-0 -z-10 bg-black">
                <Image
                    src={batikBg}
                    alt="Batik Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            </div>

            <main className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center gap-8 text-center md:gap-12">
                <div className="space-y-4 md:space-y-6">
                    <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                        {dict.home.title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/90 drop-shadow-lg sm:text-xl md:text-2xl">
                        {dict.home.description}
                    </p>
                </div>

                <div className="mt-4 flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
                    <a
                        className="flex h-14 w-full items-center justify-center rounded-full bg-white px-10 text-lg font-semibold text-black transition-transform hover:scale-105 active:scale-95 sm:w-auto"
                        href={`/${lang}/contact-us`}
                    >
                        {dict.navigation.contact}
                    </a>
                    <a
                        className="group flex h-14 w-full items-center justify-center rounded-full px-10 text-lg font-semibold text-white transition-all sm:w-auto"
                        href={`/${lang}/practice-area`}
                    >
                        <span className="border-b-2 border-white/30 pb-1 transition-colors group-hover:border-white">
                            {dict.navigation.practices}
                        </span>
                    </a>
                </div>
            </main>
            <footer className="absolute bottom-6 text-center text-white/60">
                <p className="text-xs">
                    © {new Date().getFullYear()} A&A Counsellors at Law. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
}
