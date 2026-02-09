import { getDictionary } from "../../get-dictionary";
import Image from "next/image";
import batikBg from "../../assets/images/batik2.png";
import BatikFooter from "../../components/BatikFooter";

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
                        {dict.practices.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/80 drop-shadow-lg md:mt-6 md:text-xl">
                        {dict.practices.subtitle}
                    </p>
                </div>
            </section>

            {/* Description */}
            <section className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                <p className="mx-auto mb-16 max-w-3xl text-center text-lg font-light leading-relaxed text-gray-600 md:mb-20 md:text-xl">
                    {dict.practices.description}
                </p>

                {/* Practice Areas */}
                <div className="mb-20 md:mb-28">
                    <h2 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                        {dict.practices.areasTitle}
                    </h2>
                    <div className="mb-12 h-1 w-16 bg-gray-900" />

                    <div className="grid gap-x-12 gap-y-0 lg:grid-cols-2">
                        {dict.practices.areas.map((area, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-5 border-b border-gray-100 py-5 transition-colors hover:border-gray-300"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-serif text-sm font-bold text-gray-900 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="text-base leading-snug text-gray-700 md:text-lg">
                                    {area}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Sectors */}
            <section className="border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                    <h2 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                        {dict.practices.sectorsTitle}
                    </h2>
                    <div className="mb-12 h-1 w-16 bg-gray-900" />

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {dict.practices.sectors.map((sector, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-transform group-hover:scale-110">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
                                        />
                                    </svg>
                                </span>
                                <span className="text-sm font-medium text-gray-700 md:text-base">
                                    {sector}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
