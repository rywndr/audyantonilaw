import Image from "next/image";
import FadeIn from "@/components/shared/FadeIn";
import { getSectorKey, getBusinessSectorImage } from "@/utils/business-sectors";

interface BusinessSectorsProps {
    label: string;
    title: string;
    description: string;
    sectors: string[];
}

interface SectorRowProps {
    sectorName: string;
}

function SectorRow({ sectorName }: SectorRowProps) {
    const sectorKey = getSectorKey(sectorName);
    const imageSrc = getBusinessSectorImage(sectorKey);

    return (
        <div className="group flex items-center gap-5 rounded-sm py-6 transition-all duration-500 hover:-mx-6 hover:bg-white/[0.02] hover:px-6">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 transition-all duration-300 group-hover:ring-[#C8A97E]">
                <Image
                    src={imageSrc}
                    alt={sectorName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h4 className="flex-1 font-serif text-lg tracking-wide text-neutral-300 transition-colors group-hover:text-white">
                {sectorName}
            </h4>
        </div>
    );
}

// Splits sectors into two balanced columns for desktop layout.
// Half-and-half split preserves visual symmetry regardless of total count.
function SectorColumn({ sectors }: { sectors: string[] }) {
    return (
        <div className="divide-y divide-white/10">
            {sectors.map((name) => (
                <SectorRow key={name} sectorName={name} />
            ))}
        </div>
    );
}

export default function BusinessSectors({
    label,
    title,
    description,
    sectors,
}: BusinessSectorsProps) {
    const midpoint = Math.ceil(sectors.length / 2);
    const leftSectors = sectors.slice(0, midpoint);
    const rightSectors = sectors.slice(midpoint);

    return (
        <section className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-32">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                <FadeIn direction="up" distance={30}>
                    <div className="mb-16 text-center md:mb-24">
                        <p
                            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                            style={{ color: "#C8A97E" }}
                        >
                            {label}
                        </p>
                        <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                            {title}
                        </h2>
                        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent opacity-60" />
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
                            {description}
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2} direction="up" distance={40}>
                    <div className="grid gap-x-12 md:grid-cols-2 lg:gap-x-24">
                        <div className="border-b border-t border-white/10 md:border-none">
                            <SectorColumn sectors={leftSectors} />
                        </div>
                        <div className="border-b border-white/10 md:border-none">
                            <SectorColumn sectors={rightSectors} />
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
