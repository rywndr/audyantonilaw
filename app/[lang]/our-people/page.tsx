import { getDictionary } from "../../get-dictionary";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import batikBg from "../../assets/images/batik.jpg";
import andeltonImg from "../../assets/images/our-people/andelton-antoni.jpeg";
import BatikFooter from "../../components/BatikFooter";

const partnerImages: Record<string, StaticImageData> = {
    "andelton-antoni": andeltonImg,
};

export default async function Partners({
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
                        {dict.partners.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/80 drop-shadow-lg md:mt-6 md:text-xl">
                        {dict.partners.subtitle}
                    </p>
                </div>
            </section>

            {/* Partners Grid */}
            <section className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
                    {dict.partners.list.map((partner) => (
                        <Link
                            key={partner.id}
                            href={`/${lang}/our-people/${partner.id}`}
                            className="group block"
                        >
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                                {/* Image */}
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                                    {partnerImages[partner.id] ? (
                                        <Image
                                            src={partnerImages[partner.id]}
                                            alt={partner.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                                            <span className="font-serif text-sm uppercase tracking-widest">
                                                {partner.name}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-8 text-center md:p-10">
                                    <h2 className="mb-2 font-serif text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                                        {partner.name}
                                    </h2>
                                    <p className="mb-6 text-sm font-medium uppercase tracking-widest text-gray-500">
                                        {partner.title}
                                    </p>
                                    <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                        {partner.bio[0]}
                                    </p>
                                    <span className="inline-flex items-center rounded-full border border-gray-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                                        {dict.partners.readProfile}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="ml-2 h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
