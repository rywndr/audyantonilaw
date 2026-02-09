import { getDictionary } from "../../../get-dictionary";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import batikBg from "../../../assets/images/batik3.png";
import andeltonImg from "../../../assets/images/our-people/andelton-antoni.jpeg";
import BatikFooter from "../../../components/BatikFooter";

const partnerImages: Record<string, StaticImageData> = {
    "andelton-antoni": andeltonImg,
};

export default async function PartnerDetail({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang: rawLang, slug } = await params;
    const lang = (rawLang === "id" ? "id" : "en") as "en" | "id";
    const dict = await getDictionary(lang);

    const partner = dict.partners.list.find((p) => p.id === slug);

    if (!partner) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            {/* Banner */}
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
                    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60 md:text-base">
                        {partner.title}
                    </p>
                    <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                        {partner.name}
                    </h1>
                </div>
            </section>

            {/* Back Navigation */}
            <div className="container mx-auto max-w-7xl px-6 pt-10 md:px-12 md:pt-14">
                <Link
                    href={`/${lang}/our-people`}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
                >
                    {dict.partners.backLabel}
                </Link>
            </div>

            {/* Main Content */}
            <section className="container mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
                    {/* Image Column */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
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

                            {/* Info Cards */}
                            <div className="mt-6 space-y-4">
                                {partner.languages && (
                                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-4 w-4 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                                                />
                                            </svg>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                                {dict.partners.languagesLabel}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            {partner.languages.join(" · ")}
                                        </p>
                                    </div>
                                )}

                                {partner.membership && (
                                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-4 w-4 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                                />
                                            </svg>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                                {dict.partners.membershipLabel}
                                            </h3>
                                        </div>
                                        <ul className="space-y-1">
                                            {partner.membership.map(
                                                (mem, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-sm leading-relaxed text-gray-700"
                                                    >
                                                        {mem}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {partner.education && (
                                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-4 w-4 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                                />
                                            </svg>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                                {dict.partners.educationLabel}
                                            </h3>
                                        </div>
                                        <ul className="space-y-1">
                                            {partner.education.map(
                                                (edu, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-sm leading-relaxed text-gray-700"
                                                    >
                                                        {edu}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-8">
                        {/* Bio */}
                        <div className="mb-12">
                            <div className="space-y-5">
                                {partner.bio.map(
                                    (paragraph: string, index: number) => (
                                        <p
                                            key={index}
                                            className="text-base leading-relaxed text-gray-700 md:text-lg"
                                        >
                                            {paragraph}
                                        </p>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Projects */}
                        {partner.projects && (
                            <div className="border-t border-gray-100 pt-12">
                                {Object.entries(partner.projects).map(
                                    ([category, items]) => (
                                        <div key={category} className="mb-10">
                                            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                                                {category}
                                            </h3>
                                            <div className="mb-6 h-1 w-12 bg-gray-900" />

                                            <ul className="space-y-4">
                                                {items.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-4"
                                                    >
                                                        <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-gray-900" />
                                                        <span className="text-base leading-relaxed text-gray-700">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
