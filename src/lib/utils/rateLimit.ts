const WINDOW_SIZE = 60000; // 1 minute
const MAX_REQUESTS = 100;

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry) {
    rateLimitMap.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (now - entry.timestamp > WINDOW_SIZE) {
    rateLimitMap.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}