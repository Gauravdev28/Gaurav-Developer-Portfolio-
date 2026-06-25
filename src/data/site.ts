export const site = {
  name: "Gaurav Agarwal",
  role: "AIML Student, Frontend Developer & Freelancer",
  location: "Gwalior, India",
  university: "ITM University, Gwalior",
  degree: "B.Tech in Artificial Intelligence & Machine Learning",
  year: "2nd Year",
  email: "gauravagldeveloper28@gmail.com",
  linkedin: "https://www.linkedin.com/in/gauravdeveloper",
  github: "https://github.com/Gauravdev28",
  githubUser: "Gauravdev28",
  resumeUrl: "/resume.html",
};

export const stats = [
  { value: "5", label: "Projects shipped" },
  { value: "2yr", label: "Building software" },
  { value: "5+", label: "Certifications" },
  { value: "∞", label: "Curiosity" },
];

export type Skill = {
  name: string;
  color: string;
  group: string;
  level: number; // 0-100
  note: string;
};

export const skills: Skill[] = [
  // Web Development
  { name: "HTML", color: "#E34F26", group: "Web", level: 92, note: "Semantic layout markup and page structures." },
  { name: "CSS", color: "#1572B6", group: "Web", level: 90, note: "Responsive flex/grid systems and keyframe animations." },
  { name: "JavaScript", color: "#FACC15", group: "Web", level: 85, note: "Modern ES6+, async control, and DOM manipulation." },

  // Programming Languages
  { name: "C", color: "#60A5FA", group: "Languages", level: 75, note: "Procedural concepts and low-level fundamentals." },
  { name: "C++", color: "#A855F7", group: "Languages", level: 78, note: "Algorithm implementation and systems thinking." },
  { name: "Python", color: "#3B82F6", group: "Languages", level: 90, note: "Daily driver — scripting, data pipelines, automation." },

  // AI & ML
  { name: "Prompt Engineering", color: "#34D399", group: "AI", level: 85, note: "Crafting structured system prompts and LLM loops." },

  // Learning / Core
  { name: "Data Structures (DSA)", color: "#FB7185", group: "Core", level: 60, note: "(Currently learning) Stack, queue, recursion, trees." },

  // Tools
  { name: "Git & GitHub", color: "#F97316", group: "Tools", level: 88, note: "Version control, branching, and pull requests." },
  { name: "Copilot", color: "#EC4899", group: "Tools", level: 88, note: "AI pair programming and syntax suggestions." },
  { name: "Antigravity", color: "#10B981", group: "Tools", level: 92, note: "Google's agentic coder tool for codebase refactors." },
  { name: "Cursor", color: "#22D3EE", group: "Tools", level: 85, note: "AI-first code editor for rapid prototyping." },
  { name: "IBM BOB", color: "#A855F7", group: "Tools", level: 75, note: "Developer configurations and automation setups." },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  challenge: string;
  learning: string;
  tech: string[];
  live: string;
  repo: string;
  accent: string;
  year: string;
};

export const projects: Project[] = [
  {
    title: "Employee Management System",
    tagline: "Python & JSON CRUD platform",
    description: "A desktop platform to manage employee details, departments, and attendance records stored securely in JSON formats.",
    challenge: "Structuring relational employee data in a flat JSON file schema while maintaining speed.",
    learning: "Handling JSON serialization, local file operations, and data integrity validation.",
    tech: ["Python", "JSON"],
    live: "#",
    repo: "#",
    accent: "from-emerald-400/20 to-teal-600/10",
    year: "2025",
  },
  {
    title: "IEEE Hackathon Website",
    tagline: "Web portal for college hackathon event",
    description: "A responsive portal created for a college hackathon organized by IEEE, featuring registration workflows, schedule boards, and dynamic countdowns.",
    challenge: "Designing a responsive layout that remains functional and readable across mobile screens during high-concurrency registration hours.",
    learning: "Crafting lightweight, semantic CSS components and handling simple form validation controls.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "#",
    repo: "#",
    accent: "from-teal-400/20 to-cyan-600/10",
    year: "2025",
  },
];

export const timeline = [
  {
    year: "Jun 2026",
    title: "Introduction to Generative AI — Skill India",
    body: "Completed professional certification covering foundational LLM architectures, prompt structuring, and applied generative tools.",
    tag: "Certification",
  },
  {
    year: "2026",
    title: "Microsoft Skill Fest Badge",
    body: "Earned Microsoft credentials demonstrating capability in cloud configurations, code diagnostics, and collaborative development.",
    tag: "Award",
  },
  {
    year: "2026",
    title: "CISCO Python Essentials I",
    body: "Earned professional certification validating core Python syntax, algorithms, and procedural scripting structures.",
    tag: "Certification",
  },
  {
    year: "Jan 2026",
    title: "Campus Outreach Intern — Pregrad",
    body: "Represented the platform, coordinated tech events, and connected student builders to learning tracks.",
    tag: "Internship",
  },
  {
    year: "2025",
    title: "B.Tech AI & ML — ITM University Gwalior",
    body: "Started undergraduate B.Tech journey focused on intelligent systems and software engineering.",
    tag: "Education",
  },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
