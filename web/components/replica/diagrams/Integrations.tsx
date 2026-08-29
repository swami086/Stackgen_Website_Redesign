"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { VendorMark, VENDOR_NAMES, type VendorSlug } from "@/components/replica/logos";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import { AMBIENT } from "@/lib/motion-tokens";
import { mulberry32, SEEDS } from "@/lib/seeded-random";

const PILLS: readonly { slug: VendorSlug; label: string }[] = [
  { slug: "github", label: "GitHub" },
  { slug: "gitlab", label: "GitLab" },
  { slug: "terraform", label: "Terraform" },
  { slug: "datadog", label: "Datadog" },
  { slug: "pagerduty", label: "PagerDuty" },
  { slug: "jira", label: "Jira" },
  { slug: "opa", label: "OPA" },
  { slug: "slack", label: "Slack" },
] as const;

export function Integrations({ theme }: { theme: "light" | "dark" }) {
  const reduced = useReducedMotionSafe();

  const offsets = useMemo(() => {
    const prng = mulberry32(SEEDS.integrations);
    return PILLS.map(() => ({
      x: (prng() - 0.5) * 30,
      y: (prng() - 0.5) * 30,
    }));
  }, []);

  return (
    <div
      role="img"
      aria-label="Integrations across GitHub, GitLab, Terraform, Datadog, PagerDuty, Jira, Open Policy Agent, and Slack"
      className="glass-specular relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] p-6"
    >
      <h3 className="mb-8 text-center text-[15px] font-medium leading-tight text-[var(--ds-text-secondary)]">
        Plugs into the stack you already run
      </h3>

      <div className="relative z-10 flex w-full max-w-xl flex-wrap justify-center gap-4">
        {PILLS.map((pill, i) => {
          const offset = offsets[i]!;
          return (
            <motion.div
              key={pill.slug}
              data-vendor-slug={pill.slug}
              data-vendor-label={pill.label}
              initial={reduced ? false : { x: offset.x, y: offset.y, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: reduced ? 0 : i * 0.05,
              }}
              className="flex items-center gap-2 rounded-full border border-[var(--ds-border)] bg-[var(--ds-surface)] px-4 py-2"
              title={VENDOR_NAMES[pill.slug]}
            >
              <VendorMark slug={pill.slug} theme={theme} className="h-4 w-4" />
              <span className="text-[14px] font-medium leading-none text-[var(--ds-text-primary)]">
                {pill.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {!reduced && (
        <div
          data-animate="sweep"
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-0 opacity-40",
            theme === "dark" ? "mix-blend-overlay" : "mix-blend-soft-light",
          )}
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgb(255 255 255 / 0.4) 50%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            animation: `replica-integrations-sweep ${AMBIENT.sweep}s linear infinite`,
          }}
        />
      )}

      {!reduced && (
        <style>{`
          @keyframes replica-integrations-sweep {
            0% { transform: translateX(-20%); }
            100% { transform: translateX(20%); }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-animate="sweep"] { animation: none !important; }
          }
        `}</style>
      )}
    </div>
  );
}
