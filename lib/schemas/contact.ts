import { z } from "zod";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const PHONE_REGEX = /^[+\d\s\-()]*$/;

export const contactFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required.")
        .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters.`),
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .max(MAX_EMAIL_LENGTH, `Email must be at most ${MAX_EMAIL_LENGTH} characters.`)
        .email("Email address is invalid."),
    phone: z
        .string()
        .max(MAX_PHONE_LENGTH, `Phone must be at most ${MAX_PHONE_LENGTH} characters.`)
        .regex(PHONE_REGEX, "Phone number contains invalid characters.")
        .optional()
        .default(""),
    subject: z
        .string()
        .trim()
        .min(1, "Subject is required.")
        .max(MAX_SUBJECT_LENGTH, `Subject must be at most ${MAX_SUBJECT_LENGTH} characters.`),
    message: z
        .string()
        .trim()
        .min(1, "Message is required.")
        .max(MAX_MESSAGE_LENGTH, `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
