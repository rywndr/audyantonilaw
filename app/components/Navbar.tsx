"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import type { Dictionary } from "../../dictionaries/types";

type NavbarProps = {
    lang: "en" | "id";
    dict: Dictionary;
};

export default function Navbar({ lang, dict }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // check if on the home page
    const isHomePage = pathname === `/${lang}`;

    // prevent scrolling when menu is open
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

    const textColorClass = isHomePage ? "text-white" : "text-gray-900";
    const burgerColorClass = isHomePage ? "bg-white" : "bg-gray-900";

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
                    isHomePage
                        ? "bg-transparent"
                        : "bg-white/95 border-b border-gray-100 backdrop-blur-md"
                }`}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
                    <Link
                        href={`/${lang}`}
                        className={`relative z-50 flex items-end gap-3 transition-colors duration-300 ${textColorClass}`}
                    >
                        {/* a&a logo */}
                        <span className="font-serif text-2xl font-bold tracking-tight leading-none md:text-3xl">
                            A&A
                        </span>

                        {/* firm name and subtitle - hidden on mobile */}
                        <div className="hidden sm:flex flex-col leading-none pb-0.5">
                            <span className="font-serif text-sm font-semibold tracking-wide md:text-base">
                                AUDY & ANTONI
                            </span>
                            <span className="text-[9px] font-light tracking-[0.15em] opacity-75 md:text-[10px] mt-0.5">
                                COUNSELLORS AT LAW
                            </span>
                        </div>
                    </Link>

                    {/* hamburger menu */}
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
