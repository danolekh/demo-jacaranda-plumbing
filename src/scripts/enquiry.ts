import { track } from "./track";

// Enquiry forms post to the Pages Function at /api/enquiry. Without JavaScript the browser
// posts the form itself and lands on /thanks/; with it, the reply comes back in place and
// generate_lead fires only once the server has stored the enquiry.

for (const form of document.querySelectorAll<HTMLFormElement>("form[data-enquiry]")) {
  const formId = form.dataset.enquiry || "enquiry";
  const status = form.querySelector<HTMLElement>("[data-status]")!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  let started = false;

  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    track("form_start", { form_id: formId });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      track("form_error", { form_id: formId, reason: "validation" });
      return;
    }

    const data = new FormData(form);
    button.disabled = true;
    button.dataset.busy = "";
    status.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { accept: "application/json" },
      });
      const result = (await response.json()) as { ok: boolean; id?: string; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? `HTTP ${response.status}`);

      track("generate_lead", {
        form_id: formId,
        service: String(data.get("service") ?? ""),
        suburb: String(data.get("suburb") ?? ""),
        enquiry_id: result.id,
      });

      const name = String(data.get("name") ?? "").trim().split(/\s+/)[0];
      const done = form.querySelector<HTMLElement>("[data-done]")!;
      done.querySelector("[data-done-name]")!.textContent = name ? `Thanks, ${name}.` : "Thanks.";
      done.querySelector("[data-done-ref]")!.textContent = result.id ?? "";
      form.querySelector<HTMLElement>("[data-fields]")!.hidden = true;
      done.hidden = false;
      done.focus();
      status.textContent = "";
    } catch (error) {
      track("form_error", { form_id: formId, reason: "network" });
      status.textContent = "That didn't send. Please call us instead, the number is just above.";
      button.disabled = false;
    } finally {
      delete button.dataset.busy;
    }
  });
}
