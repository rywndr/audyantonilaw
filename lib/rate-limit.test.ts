import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// The module uses module-level mutable state (ipStore, globalTimestamps), so
// each test suite re-imports a fresh module via vi.resetModules() to prevent
// state leaking between test cases.

describe("rateLimit — per-IP window", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("allows the first request from an IP", async () => {
        const { rateLimit } = await import("./rate-limit");
        const result = rateLimit("1.2.3.4");
        expect(result.allowed).toBe(true);
    });

    it("allows up to the per-IP maximum (5) within the window", async () => {
        const { rateLimit } = await import("./rate-limit");
        for (let i = 0; i < 5; i++) {
            expect(rateLimit("1.2.3.4").allowed).toBe(true);
        }
    });

    it("blocks the 6th request from the same IP within the window", async () => {
        const { rateLimit } = await import("./rate-limit");
        for (let i = 0; i < 5; i++) rateLimit("1.2.3.4");
        const result = rateLimit("1.2.3.4");
        expect(result.allowed).toBe(false);
        expect((result as { allowed: false; error: string }).error).toMatch(
            /too many requests/i,
        );
    });

    it("treats different IPs independently", async () => {
        const { rateLimit } = await import("./rate-limit");
        for (let i = 0; i < 5; i++) rateLimit("1.2.3.4");
        // A different IP should still be allowed
        expect(rateLimit("9.8.7.6").allowed).toBe(true);
    });

    it("resets the per-IP counter after the 15-minute window expires", async () => {
        const { rateLimit } = await import("./rate-limit");
        for (let i = 0; i < 5; i++) rateLimit("1.2.3.4");
        expect(rateLimit("1.2.3.4").allowed).toBe(false);

        // Advance time past the 15-minute window so timestamps are pruned
        vi.advanceTimersByTime(15 * 60 * 1000 + 1);
        expect(rateLimit("1.2.3.4").allowed).toBe(true);
    });
});

describe("rateLimit — global daily limit", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("blocks any IP once the daily total of 100 requests is reached", async () => {
        const { rateLimit } = await import("./rate-limit");

        // Use 20 distinct IPs × 5 requests each = 100 total (exactly hits the cap)
        for (let ip = 0; ip < 20; ip++) {
            for (let req = 0; req < 5; req++) {
                rateLimit(`10.0.${ip}.1`);
            }
        }

        // The 101st request from a fresh IP should be blocked by the daily limit
        const result = rateLimit("192.168.0.1");
        expect(result.allowed).toBe(false);
        expect((result as { allowed: false; error: string }).error).toMatch(
            /daily.*limit/i,
        );
    });

    it("resets the daily counter after 24 hours", async () => {
        const { rateLimit } = await import("./rate-limit");

        for (let ip = 0; ip < 20; ip++) {
            for (let req = 0; req < 5; req++) {
                rateLimit(`10.0.${ip}.1`);
            }
        }
        expect(rateLimit("192.168.0.1").allowed).toBe(false);

        // Advance past the 24-hour daily window
        vi.advanceTimersByTime(24 * 60 * 60 * 1000 + 1);
        expect(rateLimit("192.168.0.1").allowed).toBe(true);
    });
});
