import "server-only";

type EnvData = {
    contact: {
        phone: string;
        address: string;
    };
    partners: {
        audyEmail: string;
        antoniEmail: string;
    };
    career: {
        email: string;
    };
};

function getEnvVar(name: string, fallback?: string): string {
    const value = process.env[name];
    if (!value) {
        if (fallback !== undefined) {
            return fallback;
        }
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export function getEnvData(): EnvData {
    return {
        contact: {
            phone: getEnvVar("CONTACT_PHONE"),
            address: getEnvVar("CONTACT_ADDRESS"),
        },
        partners: {
            audyEmail: getEnvVar("PARTNER_AUDY_EMAIL"),
            antoniEmail: getEnvVar("PARTNER_ANTONI_EMAIL"),
        },
        career: {
            email: getEnvVar("CAREER_EMAIL"),
        },
    };
}
