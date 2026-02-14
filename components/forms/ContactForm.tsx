"use client";

import { useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import FadeIn from "@/components/shared/FadeIn";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";
import type { ContactApiResponse } from "@/lib/types/contact";

interface ContactFormProps {
    formTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const zodResolver: Resolver<ContactFormData> = async (values) => {
    const result = contactFormSchema.safeParse(values);

    if (result.success) {
        return { values: result.data, errors: {} };
    }

    const fieldErrors: FieldErrors<ContactFormData> = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData | undefined;
        if (field && !fieldErrors[field]) {
            fieldErrors[field] = { type: "validation", message: issue.message };
        }
    }

    return { values: {}, errors: fieldErrors };
};

async function sendContactEmail(
    data: ContactFormData,
): Promise<ContactApiResponse> {
    const response = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return response.json() as Promise<ContactApiResponse>;
}

export default function ContactForm({
    formTitle,
    formName,
    formEmail,
    formPhone,
    formSubject,
    formMessage,
    formSubmit,
}: ContactFormProps) {
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver,
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const isSubmitting = status === "submitting";

    async function onValid(data: ContactFormData) {
        setStatus("submitting");
        setServerError("");

        try {
            const result = await sendContactEmail(data);

            if (result.success) {
                setStatus("success");
                reset();
            } else {
                setStatus("error");
                setServerError(
                    result.error ?? "Something went wrong. Please try again.",
                );
            }
        } catch {
            setStatus("error");
            setServerError(
                "Unable to send your message. Please check your connection and try again.",
            );
        }
    }

    const inputClassName =
        "w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 disabled:opacity-50";
    const errorClassName = "mt-1.5 text-xs text-red-600";

    return (
        <div>
            <FadeIn direction="left" distance={40}>
                <div className="mb-10">
                    <h2 className="font-serif text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
                        {formTitle}
                    </h2>
                    <div className="mt-4 h-px w-16 bg-gray-900" />
                </div>
            </FadeIn>

            <FadeIn delay={0.1}>
                {status === "success" ? (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mx-auto mb-4 h-10 w-10 text-green-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <p className="text-lg font-medium text-green-900">
                            Thank you for your inquiry.
                        </p>
                        <p className="mt-2 text-sm text-green-700">
                            We will get back to you as soon as possible.
                        </p>
                        <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="mt-6 text-sm font-medium uppercase tracking-widest text-green-800 underline underline-offset-4 transition-colors hover:text-green-600"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onValid)}
                        noValidate
                        className="space-y-8"
                    >
                        {status === "error" && serverError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                                {serverError}
                            </div>
                        )}

                        <div className="grid gap-8 sm:grid-cols-2">
                            <div className="group">
                                <label
                                    htmlFor="name"
                                    className="mb-3 block text-sm font-medium uppercase tracking-wider text-gray-500"
                                >
                                    {formName}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    disabled={isSubmitting}
                                    className={inputClassName}
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className={errorClassName}>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="group">
                                <label
                                    htmlFor="email"
                                    className="mb-3 block text-sm font-medium uppercase tracking-wider text-gray-500"
                                >
                                    {formEmail}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    disabled={isSubmitting}
                                    className={inputClassName}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className={errorClassName}>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            <div className="group">
                                <label
                                    htmlFor="phone"
                                    className="mb-3 block text-sm font-medium uppercase tracking-wider text-gray-500"
                                >
                                    {formPhone}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    disabled={isSubmitting}
                                    className={inputClassName}
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className={errorClassName}>
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                            <div className="group">
                                <label
                                    htmlFor="subject"
                                    className="mb-3 block text-sm font-medium uppercase tracking-wider text-gray-500"
                                >
                                    {formSubject}
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    disabled={isSubmitting}
                                    className={inputClassName}
                                    {...register("subject")}
                                />
                                {errors.subject && (
                                    <p className={errorClassName}>
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="group">
                            <label
                                htmlFor="message"
                                className="mb-3 block text-sm font-medium uppercase tracking-wider text-gray-500"
                            >
                                {formMessage}
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                disabled={isSubmitting}
                                className={`${inputClassName} resize-none`}
                                {...register("message")}
                            />
                            {errors.message && (
                                <p className={errorClassName}>
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group inline-flex items-center gap-3 text-base font-medium uppercase tracking-widest text-gray-900 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending...
                                        <svg
                                            className="h-5 w-5 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        {formSubmit}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </FadeIn>
        </div>
    );
}
