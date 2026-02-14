import { Resend } from "resend";

function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export function getResendClient(): Resend {
    return new Resend(getEnvVar("RESEND_API_KEY"));
}

export function getFromEmail(): string {
    return getEnvVar("FROM_EMAIL");
}

export function getToEmail(): string {
    return getEnvVar("TO_EMAIL");
}
