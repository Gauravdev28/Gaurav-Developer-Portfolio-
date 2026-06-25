import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { nav, site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl hairline bg-foreground/[0.04]">
            <span className="font-display text-sm font-bold text-gradient">GA</span>
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground/90 sm:inline">
            {site.name}
          </span>
        </a>

        <nav className="relative hidden items-center gap-0.5 rounded-full hairline bg-background/40 px-1.5 py-1.5 backdrop-blur-xl md:flex">
          {nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground/85"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07]"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.02] md:inline-flex"
        >
          Let's talk
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl hairline bg-foreground/[0.04] md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 rounded-2xl glass-strong p-4 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-foreground/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
