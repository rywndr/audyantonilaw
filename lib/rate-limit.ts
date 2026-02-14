type RateLimitEntry = {
    timestamps: number[];
};

type RateLimitConfig = {
    windowMs: number;
    maxRequests: number;
};

const PER_IP_CONFIG: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
};

const DAILY_LIMIT = 100;
const DAY_MS = 24 * 60 * 60 * 1000;

const ipStore = new Map<string, RateLimitEntry>();
const globalTimestamps: number[] = [];

function pruneTimestamps(timestamps: number[], windowMs: number): number[] {
    const cutoff = Date.now() - windowMs;
    return timestamps.filter((ts) => ts > cutoff);
}

function isWithinLimit(timestamps: number[], maxRequests: number): boolean {
    return timestamps.length < maxRequests;
}

function checkIpLimit(ip: string): boolean {
    const entry = ipStore.get(ip) ?? { timestamps: [] };
    entry.timestamps = pruneTimestamps(entry.timestamps, PER_IP_CONFIG.windowMs);
    ipStore.set(ip, entry);
    return isWithinLimit(entry.timestamps, PER_IP_CONFIG.maxRequests);
}

function checkGlobalDailyLimit(): boolean {
    const pruned = pruneTimestamps(globalTimestamps, DAY_MS);
    globalTimestamps.length = 0;
    globalTimestamps.push(...pruned);
    return isWithinLimit(globalTimestamps, DAILY_LIMIT);
}

function recordRequest(ip: string): void {
    const now = Date.now();

    const entry = ipStore.get(ip) ?? { timestamps: [] };
    entry.timestamps.push(now);
    ipStore.set(ip, entry);

    globalTimestamps.push(now);
}

export function rateLimit(
    ip: string,
): { allowed: true } | { allowed: false; error: string } {
    if (!checkGlobalDailyLimit()) {
        return {
            allowed: false,
            error: "Daily email limit reached. Please try again tomorrow.",
        };
    }

    if (!checkIpLimit(ip)) {
        return {
            allowed: false,
            error: "Too many requests. Please try again later.",
        };
    }

    recordRequest(ip);
    return { allowed: true };
}
