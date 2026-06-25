import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/site";
import { SectionLabel } from "./About";
import { Card3D } from "@/components/ui/Card3D";

export function Projects() {
  return (
    <section id="projects" className="relative section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header section label */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionLabel
            kicker="03 — Selected Work"
            title="A cybernetic showcase of things I've built and learned from."
          />
        </div>

        {/* Responsive Holographic Cyber-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectGridCard key={p.title} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface ProjectGridCardProps {
  project: (typeof projects)[number];
  index: number;
}

function ProjectGridCard({ project, index }: ProjectGridCardProps) {
  const hasLink = project.live && project.live !== "#";
  const hasRepo = project.repo && project.repo !== "#";

  return (
    <Card3D maxTilt={7} className="rounded-3xl">
      <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-6 h-full flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.03] hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)]">
        
        {/* Holographic Glowing Backdrop Spot on hover */}
        <div
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at 80% 20%, color-mix(in oklab, var(--neon-blue) 9%, transparent), transparent)`,
          }}
        />

        {/* Cyber-pulse Scanline Sweep (Horizontal Line Moving Vertically) */}
        <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-blue)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-card-scan pointer-events-none" />

        {/* Giant wireframe index number in the top-right corner */}
        <span className="absolute -top-4 -right-2 font-display text-[7.5rem] font-extrabold leading-none text-foreground/[0.02] tracking-tighter group-hover:text-foreground/[0.04] transition-colors pointer-events-none select-none">
          0{index + 1}
        </span>

        {/* Card header & body */}
        <div className="flex flex-col gap-4 relative z-10">
          {/* Header row metadata */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-foreground/45">
              Project 0{index + 1}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/35 border border-white/5 rounded px-2 py-0.5">
              {project.year}
            </span>
          </div>

          {/* Title and tagline */}
          <div>
            <h4 className="font-display text-xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
              {project.title}
            </h4>
            <p className="mt-0.5 text-xs text-[color:var(--neon-cyan)] font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Project description */}
          <p className="text-[13px] leading-relaxed text-foreground/60 line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags list */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-foreground/75 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card links & actions footer */}
        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/[0.04] relative z-10">
          {hasLink ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[color:var(--card)] hover:bg-white/90 transition-colors"
            >
              Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-medium text-foreground/45 cursor-default">
              Conceptual
            </span>
          )}

          {hasRepo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-foreground/80 hover:bg-white/[0.08] transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> Source
            </a>
          )}
        </div>

      </div>
    </Card3D>
  );
}
