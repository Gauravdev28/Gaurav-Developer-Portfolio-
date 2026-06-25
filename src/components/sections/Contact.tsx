import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Download, Github, Linkedin, Mail, Send, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import { SectionLabel } from "./About";
import { Card3D } from "@/components/ui/Card3D";

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name").max(80),
  email: z.string().trim().email("Valid email please").max(160),
  message: z.string().trim().min(10, "A few more words").max(1000),
});
type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) return;
    const subject = encodeURIComponent(`Portfolio — ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative section-pad">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionLabel kicker="05 — Contact" title="Let's build something memorable" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Card3D maxTilt={6}>
              <div className="rounded-3xl glass-strong p-6 sm:p-8 h-full">
            <h3 className="font-display text-xl font-semibold">Reach out</h3>
            <p className="mt-2 text-sm text-foreground/65">
              Internships, collaborations or just to say hi — I usually respond within a day.
            </p>

            <div className="mt-6 space-y-2">
              <ContactLink href={`mailto:${site.email}`} icon={Mail} label="Email" value={site.email} />
              <ContactLink href={site.linkedin} icon={Linkedin} label="LinkedIn" value="Connect with me" />
              <ContactLink href={site.github} icon={Github} label="GitHub" value={`@${site.githubUser}`} />
            </div>

            <a
              href={site.resumeUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] px-5 py-3 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
              </div>
            </Card3D>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative"
          >
            <Card3D maxTilt={6}>
              <div className="rounded-3xl glass p-6 sm:p-8 h-full">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name", { required: true })}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl bg-foreground/5 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-foreground/10 transition-all focus:ring-[var(--neon-cyan)]/50"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="jane@company.com"
                  className="w-full rounded-xl bg-foreground/5 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-foreground/10 transition-all focus:ring-[var(--neon-cyan)]/50"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  rows={5}
                  {...register("message", { required: true })}
                  placeholder="What would you like to build?"
                  className="w-full resize-none rounded-xl bg-foreground/5 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-foreground/10 transition-all focus:ring-[var(--neon-cyan)]/50"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {sent ? "Email opened" : "Send message"}
            </button>
              </div>
            </Card3D>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-foreground/55">{label}</span>
        {error && <span className="text-[11px] text-destructive">{error}</span>}
      </span>
      {children}
    </label>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex min-w-0 items-center gap-3 rounded-2xl bg-foreground/[0.03] p-3 transition-all hover:bg-foreground/[0.06]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass transition-shadow group-hover:glow-blue">
        <Icon className="h-4 w-4 text-[var(--neon-cyan)]" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-wider text-foreground/45">{label}</span>
        <span className="block truncate text-sm text-foreground/90">{value}</span>
      </span>
    </a>
  );
}
