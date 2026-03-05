import "server-only";

// Centralises all runtime environment access for sensitive contact data.
// Keeps .env values away from dictionary files and ensures failures are loud and
// immediate rather than silently falling back to empty strings.

type ContactEnvData = {
    contact: { phone: string; address: string };
    partners: { audyEmail: string; antoniEmail: string };
    career: { email: string };
};

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export function getEnvData(): ContactEnvData {
    return {
        contact: {
            phone: requireEnv("CONTACT_PHONE"),
            address: requireEnv("CONTACT_ADDRESS"),
        },
        partners: {
            audyEmail: requireEnv("PARTNER_AUDY_EMAIL"),
            antoniEmail: requireEnv("PARTNER_ANTONI_EMAIL"),
        },
        career: {
            email: requireEnv("CAREER_EMAIL"),
        },
    };
}
