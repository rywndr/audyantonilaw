import { Resend } from "resend";

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export function getResendClient(): Resend {
    return new Resend(requireEnv("RESEND_API_KEY"));
}

export function getFromEmail(): string {
    return requireEnv("FROM_EMAIL");
}

// In development or testing, override with TEST_TO_EMAIL to avoid sending to the
// real domain. Fall back to TO_EMAIL only in production. Set TEST_TO_EMAIL in
// .env.local (e.g. yourname+test@example.com) to safely exercise the mail route.
export function getToEmail(): string {
    if (process.env.NODE_ENV !== "production" && process.env.TEST_TO_EMAIL) {
        return process.env.TEST_TO_EMAIL;
    }
    return requireEnv("TO_EMAIL");
}
