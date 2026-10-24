// Counts every call tap and every enquiry, three ways at once:
// 1. window.dataLayer, so Google Tag Manager can send GA4 and Google Ads conversions;
// 2. a copy in sessionStorage, which the /tracking page reads to show what fired;
// 3. a beacon to /api/event, a server-side count that ad blockers and cookie banners can't hide.

export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const LOG_KEY = "jp:events";

export function track(event: string, params: TrackParams = {}) {
  const entry = { event, ...params, page_path: location.pathname, at: new Date().toISOString() };
  (window.dataLayer = window.dataLayer || []).push(entry);

  try {
    const log = JSON.parse(sessionStorage.getItem(LOG_KEY) ?? "[]");
    log.push(entry);
    sessionStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-50)));
  } catch {
    // Private mode or storage full: the dataLayer push above still happened.
  }

  const place = params.call_location ?? params.form_id ?? params.serviced ?? "";
  const beacon = JSON.stringify({ event, place: String(place), path: location.pathname });
  navigator.sendBeacon?.("/api/event", new Blob([beacon], { type: "application/json" }));

  window.dispatchEvent(new CustomEvent("jp:track", { detail: entry }));
}

// One listener for every tel: link on the page, wherever it sits. The link's
// data-call-location says which one it was (header, hero, sticky_bar, contact...).
document.addEventListener("click", (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="tel:"]');
  if (!link) return;
  track("click_to_call", {
    call_location: link.dataset.callLocation ?? "inline",
    phone_number: link.getAttribute("href")!.slice(4),
  });
});
