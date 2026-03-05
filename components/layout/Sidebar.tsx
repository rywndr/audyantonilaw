"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/dictionaries/types";
import Footer from "@/components/layout/Footer";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    lang: "en" | "id";
    dict: Dictionary;
};

export default function Sidebar({ isOpen, onClose, lang, dict }: SidebarProps) {
    const pathname = usePathname();

    // Esc to close
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Helper to switch lang while keeping path
    const switchLang = (targetLang: "en" | "id") => {
        if (!pathname) return `/${targetLang}`;
        const segments = pathname.split("/");
        segments[1] = targetLang;
        return segments.join("/");
    };

    const navItems = [
        { label: dict.navigation.about, href: `/${lang}/about-the-firm` },
        { label: dict.navigation.partners, href: `/${lang}/our-people` },
        { label: dict.navigation.practices, href: `/${lang}/practice-area` },
        { label: dict.navigation.career, href: `/${lang}/career` },
        { label: dict.navigation.contact, href: `/${lang}/contact-us` },
    ];

    const isActive = (href: string) => {
        if (href === `/${lang}`) {
            return pathname === `/${lang}` || pathname === `/${lang}/`;
        }
        return pathname?.startsWith(href);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60]">
                    {/* Blur overlay for the rest of the page */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.aside
                        id="site-sidebar"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="absolute right-0 top-0 h-full w-full max-w-[420px] overflow-hidden shadow-2xl"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-white">
                            <Image
                                src="/images/patterns/sidebar.webp"
                                alt=""
                                fill
                                className="object-cover opacity-40"
                                priority
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex h-full flex-col">
                            {/* Header with Close button */}
                            <div className="flex items-center justify-end px-8 pt-8 md:px-12 md:pt-10">
                                <button
                                    onClick={onClose}
                                    className="group flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900"
                                >
                                    <span>{dict.navigation.closeMenu}</span>
                                </button>
                            </div>

                            {/* Navigation */}
                            <nav className="flex flex-1 flex-col justify-center px-8 md:px-12">
                                <div className="space-y-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className="group block"
                                        >
                                            <div className="flex items-center gap-4 py-3 transition-all">
                                                <span
                                                    className={`text-2xl font-light tracking-tight transition-colors md:text-3xl ${
                                                        isActive(item.href)
                                                            ? "text-gray-900"
                                                            : "text-gray-500 group-hover:text-gray-900"
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>
                                                {isActive(item.href) && (
                                                    <span className="h-px w-8 shrink-0 bg-gray-900 md:w-12" />
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </nav>

                            {/* Footer with Language Switcher and Copyright */}
                            <div className="border-t border-gray-200/50 bg-white/50 px-8 py-8 backdrop-blur-sm md:px-12 md:py-10">
                                {/* Language Switcher */}
                                <div className="mb-8">
                                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                                        {dict.navigation.language}
                                    </p>
                                    <div className="flex gap-6">
                                        <Link
                                            href={switchLang("en")}
                                            onClick={onClose}
                                            className={`text-sm font-medium tracking-wide transition-colors ${
                                                lang === "en"
                                                    ? "text-gray-900 underline underline-offset-4 decoration-gray-900"
                                                    : "text-gray-500 hover:text-gray-900"
                                            }`}
                                        >
                                            EN
                                        </Link>
                                        <Link
                                            href={switchLang("id")}
                                            onClick={onClose}
                                            className={`text-sm font-medium tracking-wide transition-colors ${
                                                lang === "id"
                                                    ? "text-gray-900 underline underline-offset-4 decoration-gray-900"
                                                    : "text-gray-500 hover:text-gray-900"
                                            }`}
                                        >
                                            ID
                                        </Link>
                                    </div>
                                </div>

                                {/* Copyright */}
                                <Footer
                                    variant="light"
                                    className="leading-relaxed"
                                />
                            </div>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}
