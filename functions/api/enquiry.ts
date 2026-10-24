import { bump, json, type Env } from "../../server/counters";

// POST /api/enquiry: the enquiry form on every page. Validates, stores the enquiry in KV for
// 30 days and logs it (visible in `wrangler pages deployment tail`). With JavaScript the page
// gets JSON back; without it the browser is redirected to /thanks/.
//
// On a client's site this is also where the tradie hears about it: an SMS, an email, or a
// webhook into their job management app (ServiceM8, Tradify, simPRO).

const LIMITS = { name: 80, phone: 30, suburb: 60, service: 60, details: 2000, page: 120 } as const;
type Field = keyof typeof LIMITS;

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");
  const form = await request.formData().catch(() => null);
  if (!form) return reply(wantsJson, request, 400, { ok: false, error: "Could not read the form." });

  const value = (field: Field) => String(form.get(field) ?? "").trim().slice(0, LIMITS[field]);
  const enquiry = {
    name: value("name"),
    phone: value("phone"),
    suburb: value("suburb"),
    service: value("service"),
    details: value("details"),
    page: value("page"),
  };

  // The hidden "website" field is only ever filled by bots. Answer as if it worked.
  if (String(form.get("website") ?? "") !== "") return reply(wantsJson, request, 200, { ok: true, id: newId() });

  const missing = (["name", "phone", "suburb", "service"] as const).filter((f) => !enquiry[f]);
  if (missing.length) {
    return reply(wantsJson, request, 400, { ok: false, error: `Please fill in: ${missing.join(", ")}.` });
  }
  if (enquiry.phone.replace(/\D/g, "").length < 8) {
    return reply(wantsJson, request, 400, { ok: false, error: "That phone number looks too short." });
  }

  const id = newId();
  const receivedAt = new Date().toISOString();
  console.log(JSON.stringify({ type: "enquiry", id, receivedAt, ...enquiry }));

  if (env.JP_KV) {
    await env.JP_KV.put(`enquiry:${receivedAt}:${id}`, JSON.stringify({ id, receivedAt, ...enquiry }), {
      expirationTtl: 60 * 60 * 24 * 30,
    });
    waitUntil(bump(env.JP_KV, "enquiry_stored"));
  }

  return reply(wantsJson, request, 200, { ok: true, id });
};

function reply(wantsJson: boolean, request: Request, status: number, body: { ok: boolean; id?: string; error?: string }) {
  if (wantsJson) return json(body, { status });
  if (body.ok) return Response.redirect(new URL(`/thanks/?ref=${body.id}`, request.url).toString(), 303);
  return new Response(`${body.error} Please go back and try again, or call 0491 570 156.`, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

/** JP- and six characters people can read out over the phone (no 0/O or 1/I). */
function newId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "JP-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}
