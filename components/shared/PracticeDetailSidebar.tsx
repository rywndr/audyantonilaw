"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PracticeArea } from "@/dictionaries/types";

type PracticeDetailSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    areas: PracticeArea[];
    sidebarLabel: string;
    closeLabel: string;
};

export default function PracticeDetailSidebar({
    isOpen,
    onClose,
    title,
    areas,
    sidebarLabel,
    closeLabel,
}: PracticeDetailSidebarProps) {
    // ESC key support — allows keyboard navigation without reaching for the close button
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Scroll lock prevents the underlying page from scrolling while the drawer is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const isSingleArea = areas.length === 1;
    const singleArea = isSingleArea ? areas[0] : null;

    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-hidden bg-white shadow-2xl"
                    >
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                            <Image
                                src="/images/backgrounds/CONTENT-BG-4.webp"
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative z-10 flex h-full flex-col">
                            <div className="flex items-start justify-between px-8 pt-12 pb-8 md:px-16 md:pt-20 md:pb-12">
                                <div className="flex-1 pr-12">
                                    <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-black">
                                        {sidebarLabel}
                                    </p>
                                    <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                                        {title}
                                    </h2>
                                    <div className="mt-10 h-px w-32 bg-gray-900" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="group relative mt-1 text-sm font-medium uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900"
                                >
                                    {closeLabel}
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gray-900 transition-all duration-300 group-hover:w-full" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 pb-12 md:px-16 md:pb-20">
                                {isSingleArea && singleArea ? (
                                    <div className="max-w-2xl">
                                        <p className="font-serif text-xl font-light leading-relaxed text-gray-600 md:text-2xl md:leading-relaxed">
                                            {singleArea.description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-10">
                                        {areas.map((area, index) => (
                                            <div key={index}>
                                                <div className="mb-3 flex items-center gap-3">
                                                    <span className="text-xs font-bold text-gray-300">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <div className="h-px flex-1 bg-gray-100" />
                                                </div>
                                                <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                                                    {area.name}
                                                </h3>
                                                <p className="text-base leading-relaxed text-gray-600">
                                                    {area.description}
                                                </p>
                                                {index < areas.length - 1 && (
                                                    <div className="mt-10 h-px w-full bg-gray-100" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
