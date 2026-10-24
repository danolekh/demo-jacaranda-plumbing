// Marks each .rise element once it scrolls into view; the CSS in global.css does the rest.
const items = document.querySelectorAll<HTMLElement>(".rise");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add("in"));
}
