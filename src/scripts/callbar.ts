// The sticky call bar steps aside while the big phone number or the footer is on screen,
// so it never covers them, and comes back when they scroll away.
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const targets = document.querySelectorAll("#enquire, footer");

if (bar && targets.length && "IntersectionObserver" in window) {
  const visible = new Set<Element>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target);
    bar.toggleAttribute("data-away", visible.size > 0);
  });
  targets.forEach((target) => observer.observe(target));
}
