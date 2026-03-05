"use client";

import { useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import FadeIn from "@/components/shared/FadeIn";
import { ArrowRightIcon, SpinnerIcon, CheckCircleIcon } from "@/components/icons";
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
    formSending: string;
    formSuccessTitle: string;
    formSuccessBody: string;
    formSuccessReset: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// Inline Zod resolver avoids the @hookform/resolvers package dependency while
// keeping validation logic co-located with the schema it validates against.
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

const INPUT_CLASS =
    "w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-lg text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-gray-900 focus:ring-0 disabled:opacity-50";
const ERROR_CLASS = "mt-1.5 text-xs text-red-600";
const LABEL_CLASS =
    "mb-3 block text-sm font-medium uppercase tracking-wider text-gray-500";

interface FormFieldProps {
    id: keyof ContactFormData;
    label: string;
    type?: string;
    error?: string;
    disabled?: boolean;
    register: ReturnType<typeof useForm<ContactFormData>>["register"];
}

function FormField({
    id,
    label,
    type = "text",
    error,
    disabled,
    register,
}: FormFieldProps) {
    return (
        <div>
            <label htmlFor={id} className={LABEL_CLASS}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                disabled={disabled}
                className={INPUT_CLASS}
                {...register(id)}
            />
            {error && <p className={ERROR_CLASS}>{error}</p>}
        </div>
    );
}

export default function ContactForm({
    formTitle,
    formName,
    formEmail,
    formPhone,
    formSubject,
    formMessage,
    formSubmit,
    formSending,
    formSuccessTitle,
    formSuccessBody,
    formSuccessReset,
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
        defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
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
                setServerError(result.error ?? "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setServerError("Unable to send your message. Please check your connection and try again.");
        }
    }

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
                        <CheckCircleIcon className="mx-auto mb-4 h-10 w-10 text-green-600" />
                        <p className="text-lg font-medium text-green-900">{formSuccessTitle}</p>
                        <p className="mt-2 text-sm text-green-700">{formSuccessBody}</p>
                        <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="mt-6 text-sm font-medium uppercase tracking-widest text-green-800 underline underline-offset-4 transition-colors hover:text-green-600"
                        >
                            {formSuccessReset}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-8">
                        {status === "error" && serverError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                                {serverError}
                            </div>
                        )}

                        <div className="grid gap-8 sm:grid-cols-2">
                            <FormField
                                id="name"
                                label={formName}
                                error={errors.name?.message}
                                disabled={isSubmitting}
                                register={register}
                            />
                            <FormField
                                id="email"
                                label={formEmail}
                                type="email"
                                error={errors.email?.message}
                                disabled={isSubmitting}
                                register={register}
                            />
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            <FormField
                                id="phone"
                                label={formPhone}
                                type="tel"
                                error={errors.phone?.message}
                                disabled={isSubmitting}
                                register={register}
                            />
                            <FormField
                                id="subject"
                                label={formSubject}
                                error={errors.subject?.message}
                                disabled={isSubmitting}
                                register={register}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className={LABEL_CLASS}>
                                {formMessage}
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                disabled={isSubmitting}
                                className={`${INPUT_CLASS} resize-none`}
                                {...register("message")}
                            />
                            {errors.message && (
                                <p className={ERROR_CLASS}>{errors.message.message}</p>
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
                                        {formSending}
                                        <SpinnerIcon className="h-5 w-5" />
                                    </>
                                ) : (
                                    <>
                                        {formSubmit}
                                        <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
