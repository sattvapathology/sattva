import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SEL = "main h2, main h3, main section > div p, main figure, main [data-stagger] > *, main iframe";

/** Lightweight scroll reveal. Skipped entirely for reduced-motion users. */
export function useReveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("reveal-on");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    const els = Array.from(document.querySelectorAll<HTMLElement>(SEL)).filter((el) => !el.closest("[data-r-skip]") && !el.hasAttribute("data-r"));
    els.forEach((el) => {
      const parent = el.parentElement;
      if (parent?.hasAttribute("data-stagger")) el.style.setProperty("--rd", `${Array.from(parent.children).indexOf(el) * 75}ms`);
      el.setAttribute("data-r", el.tagName === "P" ? "p" : "");
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("is-in"); // already visible: never hide
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
}
