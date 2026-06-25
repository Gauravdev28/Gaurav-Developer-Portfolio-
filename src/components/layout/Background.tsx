import { useEffect, useRef } from "react";

export function Background() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let targetX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
    let targetY = typeof window !== "undefined" ? window.innerHeight / 2 : 500;
    let currentX = targetX;
    let currentY = targetY;
    let vx = 0;
    let vy = 0;
    let active = true;

    // Apply initial position
    if (ref.current) {
      ref.current.style.setProperty("--mx", `${currentX}px`);
      ref.current.style.setProperty("--my", `${currentY}px`);
    }

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const stiffness = 0.06;
    const damping = 0.82;

    const tick = () => {
      if (!active) return;

      const ax = (targetX - currentX) * stiffness;
      const ay = (targetY - currentY) * stiffness;

      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;

      currentX += vx;
      currentY += vy;

      if (ref.current) {
        ref.current.style.setProperty("--mx", `${currentX.toFixed(1)}px`);
        ref.current.style.setProperty("--my", `${currentY.toFixed(1)}px`);
      }

      requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    const raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden noise">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div
        ref={ref}
        className="absolute inset-0 transition-opacity"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--neon-blue) 9%, transparent) 0%, color-mix(in oklab, var(--neon-cyan) 4%, transparent) 45%, transparent 70%)",
        }}
      />
      {/* Soft pastel aurora — luxurious not loud */}
      <div className="absolute -top-48 left-1/4 h-[34rem] w-[34rem] rounded-full bg-[var(--neon-blue)]/[0.10] blur-[160px]" />
      <div className="absolute top-1/2 -right-32 h-[30rem] w-[30rem] rounded-full bg-[var(--neon-purple)]/[0.09] blur-[160px]" />
      <div className="absolute bottom-[-10rem] left-[10%] h-[28rem] w-[28rem] rounded-full bg-[var(--neon-cyan)]/[0.08] blur-[160px]" />
    </div>
  );
}
