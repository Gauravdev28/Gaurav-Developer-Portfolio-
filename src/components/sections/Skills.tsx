import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { skills } from "@/data/site";
import { SectionLabel } from "./About";
import { Card3D } from "@/components/ui/Card3D";

const GROUPS = ["All", "Web", "Languages", "AI", "Core", "Tools"] as const;
type Group = (typeof GROUPS)[number];

export function Skills() {
  const [group, setGroup] = useState<Group>("All");
  const visible = useMemo(
    () => (group === "All" ? skills : skills.filter((s) => s.group === group)),
    [group],
  );

  return (
    <section id="skills" className="relative section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel
            kicker="02 — Toolkit"
            title="Tools I reach for — and the ones I'm sharpening."
          />
          <div className="flex flex-wrap gap-1 rounded-full hairline bg-foreground/[0.03] p-1">
            {GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  group === g
                    ? "bg-foreground/[0.08] text-foreground"
                    : "text-foreground/55 hover:text-foreground/85"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  // Cohesive colors mapped by skill group category
  const themeColor = useMemo(() => {
    switch (skill.group) {
      case "Languages":
        return "var(--neon-blue)"; // Emerald
      case "Web":
        return "var(--neon-cyan)"; // Mint Teal
      case "AI":
        return "var(--neon-purple)"; // Cyber Lime
      default:
        return "oklch(0.65 0.008 160)";
    }
  }, [skill.group]);

  const statusLabel = useMemo(() => {
    if (skill.level >= 85) return "Core Stack";
    if (skill.level >= 75) return "Active Use";
    return "Exploring";
  }, [skill.level]);

  return (
    <Card3D maxTilt={8}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03] h-full flex flex-col justify-between"
      >
        {/* Glowing background spotlight on hover */}
        <div
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(140px circle at 90% 10%, color-mix(in oklab, ${themeColor} 12%, transparent), transparent)`,
          }}
        />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full animate-pulse-glow"
                style={{
                  background: themeColor,
                  boxShadow: `0 0 10px ${themeColor}`,
                }}
              />
              <h4 className="font-display text-base font-semibold text-foreground/90">
                {skill.name}
              </h4>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/35 border border-white/10 rounded px-1.5 py-0.5">
              {skill.group}
            </span>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-foreground/60">
            {skill.note}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/45">
            Status
          </span>
          <span
            className="font-mono text-[10px] font-medium tracking-wide"
            style={{ color: themeColor }}
          >
            {statusLabel}
          </span>
        </div>
      </motion.div>
    </Card3D>
  );
}
