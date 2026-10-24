// Small helpers shared by the Pages Functions in functions/api.

export interface Env {
  /** KV namespace for enquiries (30 days) and event counters. Optional so local dev works without it. */
  JP_KV?: KVNamespace;
}

/** The events the site sends. Anything else is ignored. */
export const EVENTS = ["click_to_call", "generate_lead", "form_start", "form_error", "suburb_check"] as const;
export type EventName = (typeof EVENTS)[number];

/**
 * Adds one to a counter. KV has no atomic increment, so two taps in the same second can count
 * once; fine for a demo. A client site would use D1 (one UPDATE ... SET n = n + 1) or
 * Workers Analytics Engine instead.
 */
export async function bump(kv: KVNamespace, key: string) {
  const current = Number((await kv.get(`count:${key}`)) ?? 0);
  await kv.put(`count:${key}`, String(current + 1));
}

export function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
      ...init.headers,
    },
  });
}
