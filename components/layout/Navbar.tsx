"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import type { Dictionary } from "@/dictionaries/types";

type NavbarProps = {
    lang: "en" | "id";
    dict: Dictionary;
};

export default function Navbar({ lang, dict }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Check if current page contains banner or hero
    const isPartnerDetailPage =
        pathname?.includes("/our-people/") &&
        pathname?.split("/").length > 3 &&
        pathname?.split("/")[3] !== "";

    // Detect scroll position to change navbar colors
    useEffect(() => {
        const handleScroll = () => {
            // Shorter threshold for partner detail
            const heroHeightMultiplier = isPartnerDetailPage ? 0.4 : 0.85;
            const heroHeight = window.innerHeight * heroHeightMultiplier;
            setIsScrolled(window.scrollY > heroHeight);
        };

        // Check initial scroll position
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isPartnerDetailPage]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const textColorClass = isScrolled ? "text-gray-900" : "text-white";
    const burgerColorClass = isScrolled ? "bg-gray-900" : "bg-white";

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
                    <Link
                        href={`/${lang}`}
                        className={`relative z-50 flex items-end gap-2 transition-colors duration-300 md:gap-3 ${textColorClass}`}
                    >
                        {/* Logo */}
                        <Image
                            src="/images/logo.png"
                            alt="Audy & Antoni"
                            width={168}
                            height={168}
                            className="h-12 w-auto md:h-14"
                            priority
                        />

                        {/* Firm name and subtitle */}
                        <div className="flex flex-col leading-none pb-0.5">
                            <span className="font-serif text-xs font-semibold tracking-wide md:text-base">
                                AUDY & ANTONI
                            </span>
                            <span
                                className={`text-[8px] font-light tracking-[0.12em] md:text-[10px] md:tracking-[0.15em] mt-0.5 ${
                                    isScrolled ? "opacity-60" : "opacity-75"
                                }`}
                            >
                                COUNSELLORS AT LAW
                            </span>
                        </div>
                    </Link>

                    {/* Hamburger menu */}
                    {!isMenuOpen && (
                        <button
                            className="group relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-1.5 p-1 focus:outline-none"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span
                                className={`block h-0.5 w-8 transition-all duration-300 ${burgerColorClass}`}
                            />
                            <span
                                className={`block h-0.5 w-6 transition-all duration-300 group-hover:w-8 ${burgerColorClass}`}
                            />
                            <span
                                className={`block h-0.5 w-4 transition-all duration-300 group-hover:w-8 ${burgerColorClass}`}
                            />
                        </button>
                    )}
                </div>
            </nav>
            <Sidebar
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                lang={lang}
                dict={dict}
            />
        </>
    );
}
