import { EVENTS, bump, type Env } from "../../server/counters";

// POST /api/event: the beacon sent alongside every dataLayer push, so calls and leads are
// counted on the server even when an ad blocker stops Google Analytics.

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const body = (await request.json().catch(() => null)) as { event?: string; place?: string; path?: string } | null;
  if (!body?.event || !(EVENTS as readonly string[]).includes(body.event)) {
    return new Response(null, { status: 400 });
  }

  const place = (body.place ?? "").replace(/[^a-z0-9_ -]/gi, "").slice(0, 40);
  console.log(JSON.stringify({ type: "event", event: body.event, place, path: (body.path ?? "").slice(0, 120) }));

  if (env.JP_KV) {
    waitUntil(
      Promise.all([
        bump(env.JP_KV, body.event),
        body.event === "click_to_call" && place ? bump(env.JP_KV, `click_to_call:${place}`) : null,
      ]),
    );
  }
  return new Response(null, { status: 204 });
};
