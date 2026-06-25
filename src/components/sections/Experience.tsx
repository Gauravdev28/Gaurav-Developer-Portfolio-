import { motion } from "framer-motion";
import { timeline } from "@/data/site";
import { SectionLabel } from "./About";
import { Card3D } from "@/components/ui/Card3D";

export function Experience() {
  return (
    <section id="experience" className="relative section-pad">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionLabel kicker="04 — Journey" title="Experience, certifications and milestones" />

        <div className="relative mt-12">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent sm:left-1/2" />
          <ul className="space-y-8">
            {timeline.map((item, i) => (
              <motion.li
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative grid gap-4 sm:grid-cols-2 ${
                  i % 2 === 0 ? "" : "sm:[&>div:first-child]:col-start-2"
                }`}
              >
                <div className={`relative pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                  <div
                    className={`absolute top-3 grid h-5 w-5 place-items-center rounded-full bg-background ring-2 ring-[var(--neon-blue)] ${
                      i % 2 === 0 ? "left-1.5 sm:left-auto sm:right-[-12px]" : "left-1.5 sm:left-[-12px]"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse-glow" />
                  </div>
                  <Card3D maxTilt={8}>
                    <div className="rounded-2xl glass p-5 h-full">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground/60">
                          {item.tag}
                        </span>
                        <span className="font-display text-sm text-[var(--neon-cyan)]">{item.year}</span>
                      </div>
                      <h3 className="mt-2 font-display text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{item.body}</p>
                    </div>
                  </Card3D>
                </div>
                <div className="hidden sm:block" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
