import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Rocket, Cpu } from "lucide-react";
import { site } from "@/data/site";
import { Card3D } from "@/components/ui/Card3D";

export function About() {
  return (
    <section id="about" className="relative section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionLabel kicker="01 — About" title="A student-builder fascinated by intelligent systems." />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-foreground/80 sm:text-xl">
              I'm a second-year B.Tech student studying Artificial Intelligence &amp; Machine Learning at{" "}
              <span className="text-foreground">{site.university}</span>. Alongside my academic focus, I work as a frontend developer and freelancer, crafting clean, responsive websites for clients.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/60">
              I specialize in coding layouts and building web experiences using HTML, CSS, and JavaScript. I enjoy resolving details at the boundary of design and frontend development, while building solid programming foundations in C, C++, and Python, and actively learning Data Structures &amp; Algorithms (DSA).
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <InfoRow
                icon={GraduationCap}
                label="Education"
                value={`${site.degree}, ${site.year}`}
              />
              <InfoRow icon={Sparkles} label="Focus" value="AIML, Frontend, DSA" />
              <InfoRow icon={Rocket} label="Goal" value="Ship products people remember" />
              <InfoRow icon={Cpu} label="Currently" value="Exploring LLMs & computer vision" />
            </div>
          </motion.div>

          {/* Highlights panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <Card3D maxTilt={6}>
              <div className="rounded-3xl glass-strong p-7 h-full">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--neon-blue)]/30 to-[var(--neon-purple)]/30 font-display text-xl font-semibold text-foreground/95">
                  GA
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base font-semibold">{site.name}</div>
                  <div className="truncate text-xs text-foreground/55">
                    {site.role} · {site.location}
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-foreground/[0.06]" />

              <ul className="space-y-4">
                {highlights.map((h) => (
                  <li key={h.title} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--neon-blue)] shadow-[0_0_12px_var(--neon-blue)]" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground/95">{h.title}</div>
                      <div className="text-[13px] leading-relaxed text-foreground/55">
                        {h.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const highlights = [
  {
    title: "Creative Frontend Focus",
    body: "Obsessing over clean coding layout structures, pixel-perfect spacing, and smooth interactive details.",
  },
  {
    title: "Freelance Client Solutions",
    body: "Delivering responsive, custom-crafted landing pages and web applications built to order.",
  },
  {
    title: "AI-First Developer Flow",
    body: "Leveraging generative tools like Copilot, Cursor, and Antigravity to speed up iteration and testing.",
  },
];

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
}) {
  return (
    <Card3D maxTilt={8}>
      <div className="flex min-w-0 items-center gap-3 rounded-2xl hairline bg-foreground/[0.02] p-3.5 transition-colors hover:bg-foreground/[0.04] h-full">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-foreground/[0.05]">
          <Icon className="h-4 w-4 text-[var(--neon-cyan)]" />
        </span>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-foreground/45">{label}</div>
          <div className="truncate text-sm text-foreground/90">{value}</div>
        </div>
      </div>
    </Card3D>
  );
}

export function SectionLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full hairline bg-foreground/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-blue)] animate-pulse-glow" />
        {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-5 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
      >
        {title}
      </motion.h2>
    </div>
  );
}
