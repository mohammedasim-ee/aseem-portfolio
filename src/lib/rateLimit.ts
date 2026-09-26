const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + WINDOW_MS;
  }

  entry.count += 1;
  hits.set(key, entry);

  return entry.count > MAX_REQUESTS;
}
