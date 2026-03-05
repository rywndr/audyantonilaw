"use client";

import { useState } from "react";
import FadeIn from "@/components/shared/FadeIn";
import PracticeDetailSidebar from "@/components/shared/PracticeDetailSidebar";
import { ArrowDiagonalIcon } from "@/components/icons";
import type { PracticeArea } from "@/dictionaries/types";

interface PracticeAreaRowProps {
    area: PracticeArea;
    learnMoreText: string;
    onOpen: (area: PracticeArea) => void;
}

function PracticeAreaRow({ area, learnMoreText, onOpen }: PracticeAreaRowProps) {
    return (
        <div
            className="group relative cursor-pointer py-8"
            onClick={() => onOpen(area)}
        >
            <div className="absolute inset-y-0 left-0 w-0 bg-[#C8A97E] transition-all duration-300 group-hover:w-1.5" />
            <div className="px-2 transition-all duration-300 group-hover:pl-8 group-hover:pr-4">
                <h4 className="mb-4 font-serif text-xl font-light tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                    {area.name}
                </h4>
                <div className="flex items-center justify-between border-t border-transparent pt-4 transition-all duration-300 group-hover:border-gray-200">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-[#C8A97E]">
                        {learnMoreText}
                    </span>
                    <ArrowDiagonalIcon className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[#C8A97E]" />
                </div>
            </div>
        </div>
    );
}

interface PracticeAreaGroupProps {
    title: string;
    areas: PracticeArea[];
    learnMoreText: string;
    onOpen: (area: PracticeArea) => void;
    fadeDelay: number;
}

function PracticeAreaGroup({
    title,
    areas,
    learnMoreText,
    onOpen,
    fadeDelay,
}: PracticeAreaGroupProps) {
    return (
        <FadeIn delay={fadeDelay} direction="up" distance={40}>
            <div className="mb-16 md:mb-24">
                <div className="mb-12 flex items-center gap-6">
                    <h3 className="font-serif text-4xl font-light uppercase tracking-wide text-gray-900 md:text-5xl lg:text-6xl">
                        {title}
                    </h3>
                </div>
                <div className="divide-y divide-gray-200 border-t border-gray-900">
                    {areas.map((area, index) => (
                        <PracticeAreaRow
                            key={index}
                            area={area}
                            learnMoreText={learnMoreText}
                            onOpen={onOpen}
                        />
                    ))}
                </div>
            </div>
        </FadeIn>
    );
}

interface PracticeAreaListProps {
    corporateTitle: string;
    corporateAreas: PracticeArea[];
    litigationTitle: string;
    litigationAreas: PracticeArea[];
    learnMoreText: string;
    sidebarLabel: string;
    sidebarCloseLabel: string;
    headerText?: string;
}

export default function PracticeAreaList({
    corporateTitle,
    corporateAreas,
    litigationTitle,
    litigationAreas,
    learnMoreText,
    sidebarLabel,
    sidebarCloseLabel,
    headerText,
}: PracticeAreaListProps) {
    const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

    return (
        <>
            <section className="relative">
                <div className="container relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
                    {headerText && (
                        <FadeIn>
                            <div className="mb-16 max-w-3xl md:mb-24">
                                <h2 className="font-serif text-4xl font-light leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                                    {headerText}
                                </h2>
                                <div className="mt-8 h-px w-32 bg-gray-900" />
                            </div>
                        </FadeIn>
                    )}

                    <PracticeAreaGroup
                        title={corporateTitle}
                        areas={corporateAreas}
                        learnMoreText={learnMoreText}
                        onOpen={setSelectedArea}
                        fadeDelay={0.2}
                    />

                    <PracticeAreaGroup
                        title={litigationTitle}
                        areas={litigationAreas}
                        learnMoreText={learnMoreText}
                        onOpen={setSelectedArea}
                        fadeDelay={0.3}
                    />
                </div>
            </section>

            <PracticeDetailSidebar
                isOpen={selectedArea !== null}
                onClose={() => setSelectedArea(null)}
                title={selectedArea?.name ?? ""}
                areas={selectedArea ? [selectedArea] : []}
                sidebarLabel={sidebarLabel}
                closeLabel={sidebarCloseLabel}
            />
        </>
    );
}
