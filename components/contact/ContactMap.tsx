import FadeIn from "@/components/shared/FadeIn";

interface ContactMapProps {
    title: string;
}

export default function ContactMap({ title }: ContactMapProps) {
    return (
        <div>
            <FadeIn delay={0.2} direction="right" distance={40}>
                <div className="mb-10">
                    <h2 className="font-serif text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
                        {title}
                    </h2>
                    <div className="mt-4 h-px w-16 bg-gray-900" />
                </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="none">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg lg:aspect-square">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://maps.google.com/maps?q=Jl.%20Sungai%20Sambas%203%20No.5,%20RT.4/RW.5,%20Kramat%20Pela,%20Kebayoran.%20Baru,%20Jakarta%20Selatan,%20Daerah%20Khusus%20Jakarta,%2012130&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        title="Office Location"
                        className="h-full w-full"
                        loading="lazy"
                    />
                </div>
            </FadeIn>
        </div>
    );
}
