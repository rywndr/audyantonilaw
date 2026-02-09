import { getDictionary } from "../../get-dictionary";
import Image from "next/image";
import batikBg from "../../assets/images/batik.jpg";
import BatikFooter from "../../components/BatikFooter";

export default async function Contact({
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
                        {dict.contact.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/80 drop-shadow-lg md:mt-6 md:text-xl">
                        {dict.contact.subtitle}
                    </p>
                </div>
            </section>

            {/* Description & Contact Info Cards */}
            <section className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Address Card */}
                    <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
                            {dict.contact.addressLabel}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600">
                            {dict.contact.address}
                        </p>
                    </div>

                    {/* Phone Card */}
                    <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
                            {dict.contact.phoneLabel}
                        </h3>
                        <a
                            href={`tel:${dict.contact.phone.replace(/\s/g, "")}`}
                            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                            {dict.contact.phone}
                        </a>
                    </div>

                    {/* Email Card */}
                    <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
                            {dict.contact.emailLabel}
                        </h3>
                        <a
                            href={`mailto:${dict.contact.email}`}
                            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                            {dict.contact.email}
                        </a>
                    </div>

                    {/* Office Hours Card */}
                    <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
                            {dict.contact.hoursLabel}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {dict.contact.hours}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section className="border-t border-gray-100 bg-gray-50 mb-4">
                <div className="container mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Contact Form */}
                        <div>
                            <h2 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                                {dict.contact.formTitle}
                            </h2>
                            <div className="mb-10 h-1 w-16 bg-gray-900" />

                            <form className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {dict.contact.formName}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {dict.contact.formEmail}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {dict.contact.formPhone}
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            {dict.contact.formSubject}
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        {dict.contact.formMessage}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex h-14 items-center justify-center rounded-full bg-gray-900 px-10 text-base font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                                >
                                    {dict.contact.formSubmit}
                                </button>
                            </form>
                        </div>

                        {/* Map */}
                        <div>
                            <h2 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                                {dict.contact.mapTitle}
                            </h2>
                            <div className="mb-10 h-1 w-16 bg-gray-900" />

                            <div className="h-[460px] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm lg:h-full lg:min-h-[500px]">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://maps.google.com/maps?q=Jl.%20Sungai%20Sambas%203%20No.5,%20RT.4/RW.5,%20Kramat%20Pela,%20Kebayoran.%20Baru,%20Jakarta%20Selatan,%20Daerah%20Khusus%20Jakarta,%2012130&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    title="Office Location"
                                    className="h-full w-full"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BatikFooter />
        </div>
    );
}
