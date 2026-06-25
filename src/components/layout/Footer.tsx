import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:flex sm:justify-between sm:px-6">
        <p className="min-w-0 truncate text-xs text-foreground/50">
          © {new Date().getFullYear()} {site.name}. Crafted with React, Three.js & care.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <a href={`mailto:${site.email}`} className="grid h-9 w-9 place-items-center rounded-lg glass hover:glow-blue" aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
          <a href={site.github} className="grid h-9 w-9 place-items-center rounded-lg glass hover:glow-blue" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href={site.linkedin} className="grid h-9 w-9 place-items-center rounded-lg glass hover:glow-blue" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
