import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Row,
    Column,
    Section,
    Text,
} from "@react-email/components";
import type { ContactFormData } from "@/lib/schemas/contact";

const LOGO_URL = "https://www.audyantonilaw.com/images/logo.png";

type ContactEmailProps = ContactFormData;

function EmailField({ label, value }: { label: string; value: string }) {
    return (
        <Row style={{ marginBottom: "16px" }}>
            <Column>
                <Text style={labelStyle}>{label}</Text>
                <Text style={valueStyle}>{value}</Text>
            </Column>
        </Row>
    );
}

export default function ContactEmail({
    name,
    email,
    phone,
    subject,
    message,
}: ContactEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>
                New inquiry from {name}: {subject}
            </Preview>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    <Section style={logoSectionStyle}>
                        <Img
                            src={LOGO_URL}
                            width="120"
                            height="120"
                            alt="Audy & Antoni — Counsellors at Law"
                            style={logoStyle}
                        />
                    </Section>

                    <Section style={headerStyle}>
                        <Heading as="h1" style={headingStyle}>
                            New Contact Inquiry
                        </Heading>
                        <Hr style={headerDividerStyle} />
                    </Section>

                    <Section style={contentStyle}>
                        <EmailField label="Name" value={name} />
                        <EmailField label="Email" value={email} />
                        {phone && <EmailField label="Phone" value={phone} />}
                        <EmailField label="Subject" value={subject} />

                        <Hr style={dividerStyle} />

                        <Text style={labelStyle}>Message</Text>
                        <Text style={messageStyle}>{message}</Text>
                    </Section>

                    <Section style={footerStyle}>
                        <Text style={footerTextStyle}>
                            This message was sent via the contact form on
                            audyantonilaw.com
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const bodyStyle: React.CSSProperties = {
    backgroundColor: "#f4f4f5",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: "40px 0",
};

const containerStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    maxWidth: "600px",
    margin: "0 auto",
    overflow: "hidden",
};

const logoSectionStyle: React.CSSProperties = {
    backgroundColor: "#1a1a1a",
    padding: "24px 40px",
    textAlign: "center" as const,
};

const logoStyle: React.CSSProperties = {
    margin: "0 auto",
    display: "block",
};

const headerStyle: React.CSSProperties = {
    padding: "32px 40px 0",
};

const headingStyle: React.CSSProperties = {
    color: "#111827",
    fontSize: "22px",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
};

const headerDividerStyle: React.CSSProperties = {
    borderColor: "#111827",
    borderWidth: "1px",
    width: "48px",
    margin: "0",
};

const contentStyle: React.CSSProperties = {
    padding: "24px 40px",
};

const labelStyle: React.CSSProperties = {
    color: "#6b7280",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    margin: "0 0 4px",
};

const valueStyle: React.CSSProperties = {
    color: "#111827",
    fontSize: "15px",
    lineHeight: "1.5",
    margin: "0",
};

const dividerStyle: React.CSSProperties = {
    borderColor: "#e5e7eb",
    margin: "24px 0",
};

const messageStyle: React.CSSProperties = {
    color: "#111827",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: "4px 0 0",
    whiteSpace: "pre-wrap" as const,
};

const footerStyle: React.CSSProperties = {
    backgroundColor: "#f9fafb",
    padding: "20px 40px",
};

const footerTextStyle: React.CSSProperties = {
    color: "#9ca3af",
    fontSize: "12px",
    margin: 0,
    textAlign: "center" as const,
};
