import { NextRequest, NextResponse } from "next/server";
import type { ContactApiResponse } from "@/lib/types/contact";
import { contactFormSchema } from "@/lib/schemas/contact";
import { rateLimit } from "@/lib/rate-limit";
import { getResendClient, getFromEmail, getToEmail } from "@/lib/resend";
import ContactEmail from "@/emails/index";

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip") ??
        "unknown"
    );
}

function errorResponse(
    error: string,
    status: number,
): NextResponse<ContactApiResponse> {
    return NextResponse.json({ success: false, error }, { status });
}

function successResponse(): NextResponse<ContactApiResponse> {
    return NextResponse.json({ success: true });
}

export async function POST(
    request: NextRequest,
): Promise<NextResponse<ContactApiResponse>> {
    const ip = getClientIp(request);

    const rateLimitResult = rateLimit(ip);
    if (!rateLimitResult.allowed) {
        return errorResponse(rateLimitResult.error, 429);
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return errorResponse("Invalid request body.", 400);
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
        const firstIssue = parsed.error.issues[0];
        return errorResponse(firstIssue?.message ?? "Invalid form data.", 422);
    }

    const formData = parsed.data;

    try {
        const resend = getResendClient();
        const { error } = await resend.emails.send({
            from: getFromEmail(),
            to: [getToEmail()],
            replyTo: formData.email,
            subject: `Contact Inquiry: ${formData.subject}`,
            react: ContactEmail(formData),
        });

        if (error) {
            console.error("Resend API error:", error);
            return errorResponse(
                "Failed to send email. Please try again later.",
                500,
            );
        }

        return successResponse();
    } catch (err) {
        console.error("Unexpected email error:", err);
        return errorResponse(
            "An unexpected error occurred. Please try again later.",
            500,
        );
    }
}
