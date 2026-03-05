import { FadeInHero } from "@/components/shared/FadeIn";
import {
    EmailIcon,
    LanguageIcon,
    EducationIcon,
    MembershipIcon,
} from "@/components/icons";
import type { Partner, Dictionary } from "@/dictionaries/types";

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
    hoverable?: boolean;
}

function InfoCard({ icon, label, children, hoverable = false }: InfoCardProps) {
    return (
        <div
            className={`border border-gray-100 bg-white p-5 shadow-sm ${hoverable ? "transition-colors hover:border-[#C8A97E]/50" : ""}`}
        >
            <div className="mb-2 flex items-center gap-2">
                {icon}
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {label}
                </h3>
            </div>
            {children}
        </div>
    );
}

interface PartnerInfoCardsProps {
    partner: Partner;
    dict: Dictionary;
}

export default function PartnerInfoCards({
    partner,
    dict,
}: PartnerInfoCardsProps) {
    return (
        <div className="space-y-4">
            {partner.email && (
                <FadeInHero delay={0.65}>
                    <InfoCard
                        icon={<EmailIcon />}
                        label="Email"
                        hoverable
                    >
                        <a
                            href={`mailto:${partner.email}`}
                            className="break-all text-sm font-medium text-gray-900 transition-colors hover:text-[#C8A97E]"
                        >
                            {partner.email}
                        </a>
                    </InfoCard>
                </FadeInHero>
            )}

            {partner.languages && (
                <FadeInHero delay={0.7}>
                    <InfoCard
                        icon={<LanguageIcon />}
                        label={dict.partners.languagesLabel}
                    >
                        <p className="text-sm text-gray-700">
                            {partner.languages.join(" · ")}
                        </p>
                    </InfoCard>
                </FadeInHero>
            )}

            {partner.membership && (
                <FadeInHero delay={0.8}>
                    <InfoCard
                        icon={<MembershipIcon />}
                        label={dict.partners.membershipLabel}
                    >
                        <ul className="space-y-1">
                            {partner.membership.map((mem, idx) => (
                                <li
                                    key={idx}
                                    className="text-sm leading-relaxed text-gray-700"
                                >
                                    {mem}
                                </li>
                            ))}
                        </ul>
                    </InfoCard>
                </FadeInHero>
            )}

            {partner.education && (
                <FadeInHero delay={0.9}>
                    <InfoCard
                        icon={<EducationIcon />}
                        label={dict.partners.educationLabel}
                    >
                        <ul className="space-y-1">
                            {partner.education.map((edu, idx) => (
                                <li
                                    key={idx}
                                    className="text-sm leading-relaxed text-gray-700"
                                >
                                    {edu}
                                </li>
                            ))}
                        </ul>
                    </InfoCard>
                </FadeInHero>
            )}
        </div>
    );
}
