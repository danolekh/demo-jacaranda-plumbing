# Jacaranda Plumbing & Gas

A website for a made-up Brisbane plumber, built the way a trades agency works: Astro and Tailwind,
static on Cloudflare Pages, one repo per client, every change on a branch with a preview before it
goes live.

- Live: https://jacaranda-plumbing.danolekh.com
- Tracking demo: https://jacaranda-plumbing.danolekh.com/tracking/

The business, its phone number (an ACMA number reserved for fiction), licence, ABN and prices are
all made up. The site is kept out of search engines (meta robots, `robots.txt`, `X-Robots-Tag`).

## What's in it

- **Home** with the services, a "do you come to my suburb?" checker, how a job goes, a price guide,
  questions answered in full, and the phone number as the headline of the last screen.
- **Four service pages** (`/hot-water-systems/`, `/blocked-drains/`, `/gas-fitting/`,
  `/emergency-plumber/`) from one template and one data file.
- **Click to call everywhere**: header, hero, a sticky bar on phones, the contact block, the footer.
  The sticky bar steps aside when the big number or the footer is on screen.
- **An enquiry form that really submits** to a Pages Function, which validates it, stores it in KV
  for 30 days and logs it. Works without JavaScript too (falls back to a normal POST and `/thanks/`).
- **Tracking for every call tap and every enquiry**, see below.
- Australian English copy for a local buyer, `Plumber` LocalBusiness JSON-LD with every suburb served.

## Tracking

`src/scripts/track.ts` sends each event three ways:

1. `window.dataLayer.push(...)`, ready for Google Tag Manager to forward to GA4 and Google Ads;
2. a copy in `sessionStorage`, which `/tracking/` shows live;
3. a beacon to `/api/event`, a server-side count that ad blockers and cookie banners can't hide.

| Event | Fires when | Parameters |
| --- | --- | --- |
| `click_to_call` | any tap on a `tel:` link | `call_location`, `phone_number` |
| `generate_lead` | the server has stored an enquiry | `form_id`, `service`, `suburb`, `enquiry_id` |
| `form_start` | first focus on a form | `form_id` |
| `form_error` | invalid field or failed send | `form_id`, `reason` |
| `suburb_check` | someone checks their suburb | `suburb`, `serviced` |

Every `tel:` link carries `data-call-location`, so GA4 can tell a hero tap from a sticky-bar tap.
`generate_lead` fires only after the Function answers `ok`, so a double-click or a failed send never
counts as a lead. To connect GA4: set `gtmId` in `src/data/site.ts`, add one Custom Event trigger per
event name in GTM, and mark `click_to_call` and `generate_lead` as key events.

## Structure

```
src/data/site.ts        every word, price, suburb and question on the site
src/data/photos.ts      the photos and their credits
src/components/         one component per section
src/pages/[service].astro  the four service pages
src/scripts/            tracking, the form, the suburb checker, entrances
functions/api/          Pages Functions: enquiry, event, stats
server/counters.ts      shared helpers for the Functions
public/_headers         noindex, caching
```

## Working on it

```sh
pnpm install
pnpm dev            # Astro dev server, no Functions
pnpm preview        # build + wrangler pages dev: the real thing, Functions and KV included
pnpm check          # astro check + the Functions' types
```

Cloudflare Pages settings for the Git integration: build command `pnpm build`, output `dist`,
KV binding `JP_KV`. Pull requests get a preview URL; `main` is production.

Budget: mobile Lighthouse 95+ performance and 100 accessibility on every page. Photos go through
`astro:assets` (AVIF/WebP, lazy below the fold), the font is self-hosted, CSS is inlined, and the
only JavaScript is the tracking, the form and the suburb checker.

Photos are from Wikimedia Commons, credited in the footer. None of them shows this business.
