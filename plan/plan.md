
# Gaurav Agarwal — 3D Portfolio

Award-style dark portfolio with full cinematic 3D, neon blue/purple accents, glassmorphism, and smooth scroll-driven motion. Content uses placeholders (`#`, "your.email@example.com") wherever you said you'll replace it, plus your real info (ITM University Gwalior, B.Tech AI/ML, 2nd year).

## Sections (single-page, sticky nav, smooth scroll)

1. **Hero** — Fullscreen R3F canvas: floating 3D laptop (Drei `Float`), holographic AI core (icosahedron + distortion material), starfield, particle field, mouse parallax, dynamic point lights. Typing headline "Hi, I'm Gaurav Agarwal" + subtitle "AI & Machine Learning Developer". CTAs: View Projects / Download Resume / Contact Me. Scroll indicator.
2. **About** — Glass card with photo placeholder, intro, ITM University Gwalior (B.Tech AIML, 2nd Year), AI passion, career goals. Floating 3D icons orbit the card (small R3F scene).
3. **Skills** — Grid of interactive 3D skill cards (tilt on hover, neon glow): Python, C++, HTML, CSS, JavaScript, React, Git, GitHub, Machine Learning, DSA. Each card has a subtle floating mini-mesh.
4. **Projects** — Premium tilt cards for Employee Management System, Mini Chatbot, ATM Machine, Calculator, Portfolio Website, Future AI Projects. Each: animated preview, tech stack chips, description, Live Demo + GitHub buttons (`#` placeholders).
5. **Experience & Achievements** — Vertical animated timeline (GSAP ScrollTrigger): Hackathons, Certifications, Workshops, Campus Activities, Open Source, Internships — placeholder entries you can edit.
6. **GitHub** — Embeds github-readme-stats SVGs (contribution-style graph, repo stats, top languages, streak). Username placeholder `your-github`.
7. **Contact** — Validated form (zod + react-hook-form, mailto fallback), animated social icons (email, LinkedIn, GitHub), Download Resume button.

## Visual system

- **Theme:** Pure black `#000010` → deep indigo gradient bg. Neon blue `#00E5FF`, neon purple `#A855F7`, soft cyan glow.
- **Glassmorphism:** `backdrop-blur-xl bg-white/5 border border-white/10` with neon ring on hover.
- **Type:** Space Grotesk (headings) + Inter (body) via `@fontsource`.
- **Tokens:** Defined in `src/styles.css` under `@theme` (neon, glass, gradients, glow shadows). No hardcoded colors in components.

## Tech & architecture

- TanStack Start (existing) + React 19 + TS + Tailwind v4 (already set up).
- Add: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`, `@fontsource/space-grotesk`, `@fontsource/inter`, `react-hook-form`, `zod`.
- Single route `src/routes/index.tsx` composes sections.
- Folder structure:
  ```text
  src/
    components/
      sections/ Hero, About, Skills, Projects, Experience, GitHubStats, Contact
      three/    HeroScene, FloatingLaptop, AICore, Particles, Starfield
      ui/       GlassCard, NeonButton, TiltCard, SectionHeading
      layout/   Navbar, Footer, ScrollProgress
    hooks/      useMouseParallax, useScrollReveal
    data/       projects.ts, skills.ts, timeline.ts
    lib/        seo.ts
  ```
- Lazy-load heavy 3D scenes with `React.lazy` + `Suspense` fallbacks; `dpr={[1, 1.5]}`, `frameloop="demand"` where possible.
- `prefers-reduced-motion` disables Three scenes and heavy GSAP.
- SEO: route `head()` with title, description, OG tags, JSON-LD Person schema, semantic H1, alt text.

## Performance plan (Lighthouse 90+)

- Three.js scenes code-split per section; mobile renders a static gradient fallback for the hero canvas below 640px.
- Instanced particles, capped pixel ratio, no shadows except hero key light.
- Fonts subset via `@fontsource` (no Google CDN).
- No external images at build time; placeholders use CSS/SVG.

## Out of scope (you'll fill in later)

- Real resume PDF, profile photo, contact email, LinkedIn/GitHub URLs, project links — left as clearly marked placeholders.
- Backend / form delivery (mailto only; can wire to Cloud later).

After you approve I'll install deps and build the above end-to-end.
