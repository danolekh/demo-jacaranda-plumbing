# Working on this site with Claude Code

Read `README.md` first. These are the rules for any change, by a person or by Claude.

- **Copy is Australian English for a local buyer**: hot water system, enquiry, colour, litres,
  "mobile". Plain sentences, no marketing words. All copy lives in `src/data/site.ts`.
- **Every `tel:` link gets `data-call-location`** with a new, specific value. The tracking script
  picks up any `tel:` link by itself; the location is how GA4 tells them apart.
- **A new event** goes in three places: `EVENTS` in `server/counters.ts`, the table on
  `src/pages/tracking.astro`, and the table in `README.md`.
- **`generate_lead` fires only after the server says ok.** Never on click.
- **Performance budget**: mobile Lighthouse 95+ performance, 100 accessibility, on every page. Images
  through `<Picture>` from `astro:assets`, never a raw `<img>` to a big file. No new client-side
  dependency without a reason written in the PR.
- **Design rules**: one typeface (Cabinet Grotesk), warm black ground, brass only for the call to
  action. No gradients, no shadows on things at rest, no icon cards, no small uppercase labels.
- **Every change is a branch and a pull request.** Fill in the PR template, including the preview
  link and the Lighthouse numbers.
