import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import { getDictionary } from "@/utils/get-dictionary";

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://www.audyantonilaw.com";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "A&A Counsellors at Law | Audy & Antoni",
        template: "%s | A&A Counsellors at Law",
    },
    description:
        "AUDY & ANTONI Counsellors at Law - A trusted Indonesian law firm specializing in corporate law, litigation, dispute resolution, and commercial legal services. Unlocking potential, safeguarding success.",
    keywords: [
        "Indonesian law firm",
        "corporate law",
        "litigation",
        "dispute resolution",
        "commercial law",
        "Jakarta law firm",
        "Audy & Antoni",
        "A&A Counsellors",
        "legal services Indonesia",
        "business law",
        "arbitration",
        "bankruptcy law",
        "M&A Indonesia",
    ],
    authors: [{ name: "AUDY & ANTONI Counsellors at Law" }],
    creator: "AUDY & ANTONI Counsellors at Law",
    publisher: "AUDY & ANTONI Counsellors at Law",
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
        type: "website",
        locale: "en_US",
        alternateLocale: "id_ID",
        url: SITE_URL,
        siteName: "A&A Counsellors at Law",
        title: "A&A Counsellors at Law | Audy & Antoni",
        description:
            "AUDY & ANTONI Counsellors at Law - A trusted Indonesian law firm specializing in corporate law, litigation, dispute resolution, and commercial legal services.",
        images: [
            {
                url: "/images/backgrounds/batik-main-bg.webp",
                width: 1200,
                height: 630,
                alt: "A&A Counsellors at Law - Indonesian Law Firm",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "A&A Counsellors at Law | Audy & Antoni",
        description:
            "AUDY & ANTONI Counsellors at Law - A trusted Indonesian law firm specializing in corporate law, litigation, and dispute resolution.",
        images: ["/images/backgrounds/batik-main-bg.webp"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        languages: {
            en: `${SITE_URL}/en`,
            id: `${SITE_URL}/id`,
        },
    },
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang: rawLang } = await params;
    const lang = (rawLang === "id" ? "id" : "en") as "en" | "id";
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body className={`${lora.variable} antialiased`}>
                <Navbar lang={lang} dict={dict} />
                {children}
            </body>
        </html>
    );
}
