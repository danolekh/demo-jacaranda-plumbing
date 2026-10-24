import { track } from "./track";

// "Do you come to my suburb?" Type it and the answer shows with the drive time from Ashgrove,
// and the suburb lights up in the list below. Without JavaScript the full list is still there.

const root = document.querySelector<HTMLElement>("[data-suburb-check]");
if (root) {
  const input = root.querySelector<HTMLInputElement>("input")!;
  const answer = root.querySelector<HTMLElement>("[data-answer]")!;
  const rows = new Map(
    [...document.querySelectorAll<HTMLElement>("[data-suburb]")].map((row) => [row.dataset.suburb!.toLowerCase(), row]),
  );
  const minutes = (row: HTMLElement) => Number(row.dataset.minutes);
  let lastTracked = "";

  const clean = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

  function show(final: boolean) {
    const value = clean(input.value);
    for (const row of rows.values()) row.removeAttribute("data-match");
    if (value.length < 3) {
      answer.textContent = "";
      return;
    }

    const row = rows.get(value);
    if (row) {
      row.setAttribute("data-match", "");
      const name = row.dataset.suburb;
      answer.textContent = `Yes, we cover ${name}. It's about ${minutes(row)} minutes from our Ashgrove base, so most jobs there are same day.`;
      if (lastTracked !== value) {
        lastTracked = value;
        track("suburb_check", { suburb: name, serviced: true });
      }
      return;
    }

    const partial = [...rows.keys()].some((name) => name.startsWith(value));
    if (partial && !final) {
      answer.textContent = "";
      return;
    }
    answer.textContent = `${input.value.trim()} isn't on our usual list, but give us a ring. Within about 30 minutes of Ashgrove we'll usually still come.`;
    if (final && lastTracked !== value) {
      lastTracked = value;
      track("suburb_check", { suburb: input.value.trim(), serviced: false });
    }
  }

  input.addEventListener("input", () => show(false));
  input.addEventListener("change", () => show(true));
  root.querySelector("form")!.addEventListener("submit", (event) => {
    event.preventDefault();
    show(true);
  });
}
