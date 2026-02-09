import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import { getDictionary } from "../get-dictionary";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "A&A Counsellors at Law | Audy & Antoni",
    description: "Unlocking potential. safeguarding success",
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
            >
                <Navbar lang={lang} dict={dict} />
                {children}
            </body>
        </html>
    );
}
