import { json, type Env } from "../../server/counters";

// GET /api/stats: the counters for the /tracking page. Counts only, never an enquiry.

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const totals: Record<string, number> = {};
  const calls: Record<string, number> = {};
  if (env.JP_KV) {
    const { keys } = await env.JP_KV.list({ prefix: "count:" });
    const values = await Promise.all(keys.map((k) => env.JP_KV!.get(k.name)));
    keys.forEach((k, i) => {
      const name = k.name.slice("count:".length);
      const n = Number(values[i] ?? 0);
      if (name.startsWith("click_to_call:")) calls[name.slice("click_to_call:".length)] = n;
      else totals[name] = n;
    });
  }
  return json({ totals, calls });
};
