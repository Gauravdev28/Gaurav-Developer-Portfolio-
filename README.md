# 🌌 Gaurav Agarwal — 3D Developer Portfolio

Welcome to my premium, award-style 3D developer portfolio! This project showcases my skills, projects, achievements, and experience as an AI & Machine Learning student using state-of-the-art web technologies and cinematic 3D graphics.

---

## ✨ Features & Sections

1. **🚀 Hero Scene**: A fullscreen immersive Three.js/React Three Fiber (R3F) canvas featuring a floating 3D laptop, a holographic rotating AI core (icosahedron with custom distortion material), custom particle fields, starfield background, and mouse parallax. Includes a dynamic typing headline: *"Hi, I'm Gaurav Agarwal" | "AI & Machine Learning Developer"*.
2. **👤 About Me**: A sleek glassmorphism card highlighting my education at **ITM University Gwalior** (B.Tech AI/ML, 2nd Year) and passion for artificial intelligence, surrounded by orbiting 3D technology icons.
3. **⚡ Skills Grid**: Interactive 3D skill cards with tilt-on-hover effects and custom neon glows representing proficiency in Python, C++, HTML, CSS, JavaScript, React, Git, GitHub, Machine Learning, and DSA.
4. **📁 Projects Showcase**: Premium tilt cards for projects like:
   - **Employee Management System**
   - **Mini Chatbot**
   - **ATM Machine Simulator**
   - **Smart Calculator**
   - **Interactive Portfolio Website**
   - *Future AI Projects*
5. **🏆 Timeline & Achievements**: An interactive vertical timeline driven by GSAP animations, showcasing hackathons, certifications, campus activities, and workshops.
6. **📊 GitHub Analytics**: Dynamically embedded GitHub statistics showing contributions, top repositories, top languages, and activity streaks.
7. **✉️ Contact Form**: A fully validated, modern contact form built with React Hook Form and Zod validation, styled with custom glassmorphism.

---

## 🎨 Visual System & Design Aesthetics

- **Theme**: Premium dark mode theme using deep space colors (`#000010` background) transitioning into glowing indigo/cyan gradients.
- **Accents**: Neon blue (`#00E5FF`) and neon purple (`#A855F7`) interactive highlights.
- **Glassmorphism**: High-end styling using `backdrop-blur-xl bg-white/5 border border-white/10` with custom hover neon rings.
- **Typography**: Space Grotesk (headings) and Inter (body copy) loaded locally for optimal performance.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19 Server-Side Rendering Framework)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 🚀 Getting Started

To run this portfolio website locally on your computer, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended) or [Bun](https://bun.sh/).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Gauravdev28/Gaurav-Developer-Portfolio-.git
   cd Gaurav-Developer-Portfolio-
   ```

2. Install dependencies:
   ```bash
   npm install
   # or if you use bun
   bun install
   ```

### Running Locally
To start the local development server:
```bash
npm run dev
# or
bun dev
```
Open your browser and navigate to the local server URL (usually **`http://localhost:8080`** or the fallback port printed in your terminal).

### Building for Production
To build the project for production:
```bash
npm run build
# or
bun run build
```
This compiles the application and optimizes assets using Nitro.