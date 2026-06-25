import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import { site, stats } from "@/data/site";
import { useIsMobile, useReducedMotion } from "@/hooks/useReducedMotion";

const PHRASES = [
  "AIML Student & Freelance Developer",
  "Crafting premium responsive websites",
  "Building intelligent web interfaces",
];

function useTyped(phrases: string[], speed = 55, pause = 1800) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[i % phrases.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setI((v) => v + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
      );
    return () => clearTimeout(timeout);
  }, [text, deleting, i, phrases, speed, pause]);
  return text;
}

export function Hero() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const typed = useTyped(PHRASES);

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden flex items-center justify-center">
      <div className="mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center text-center px-4 pt-28 pb-20 sm:px-6 relative z-10 pointer-events-none">
        {/* Copy container with manual pointer event restores */}
        <div className="flex flex-col items-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/70"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for internships & collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="mt-6 font-display text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-center"
          >
            Designing software
            <br />
            that thinks with you,
            <br />
            <span className="text-gradient">not for you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 flex h-7 items-center text-base text-foreground/75 sm:text-lg justify-center"
          >
            <span className="text-foreground/55">Gaurav Agarwal —&nbsp;</span>
            <span>{typed}</span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-blink bg-[var(--neon-cyan)]" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.38 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55 text-center mx-auto"
          >
            B.Tech AI/ML at {site.university}. I build fast, expressive interfaces and explore
            machine learning to make everyday software feel a little more alive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
            >
              View Selected Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.06]"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> Get in touch
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl hairline bg-foreground/[0.04] sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-background/40 px-4 py-4 text-center">
                <div className="font-display text-2xl font-semibold text-foreground">{s.value}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-foreground/45">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/40 hover:text-foreground/70 relative z-10 pointer-events-auto"
      >
        <ChevronDown className="h-5 w-5 animate-float-y" />
      </motion.a>
    </section>
  );
}
