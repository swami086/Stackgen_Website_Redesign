import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { VendorMark, VENDOR_NAMES } from "@/components/replica/logos";

// Defining these locally since they are missing from motion folder
const AMBIENT = { sweep: 6 };
const SEEDS = { integrations: 12345 };
function mulberry32(a: number) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";

export function Integrations({ theme }: { theme: "light" | "dark" }) {
  const isReduced = useReducedMotionSafe();

  const PILLS = [
    { slug: "github" },
    { slug: "gitlab" },
    { slug: "terraform" },
    { slug: "datadog" },
    { slug: "pagerduty" },
    { slug: "jira" },
    { slug: "opa" },
    { slug: "slack" }
  ] as const;

  const offsets = useMemo(() => {
    const prng = mulberry32(SEEDS.integrations);
    return PILLS.map(() => {
      const x = (prng() - 0.5) * 30;
      const y = (prng() - 0.5) * 30;
      return { x, y };
    });
  }, []);

  return (
    <div 
      role="img"
      aria-label="Integrations across GitHub, GitLab, Terraform, Datadog, PagerDuty, Jira, Open Policy Agent, and Slack"
      className="glass-specular relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] p-6"
    >
      <h3 className="text-secondary mb-8 text-center text-[15px] font-medium leading-tight">
        Plugs into the stack you already run
      </h3>
      
      <div className="relative z-10 flex w-full max-w-[500px] flex-wrap justify-center gap-4">
        {PILLS.map((pill, i) => {
          // The plan requires exact match for 'OPA', but VENDOR_NAMES might return 'Open Policy Agent'
          // We'll use the exact labels from the plan
          const displayLabel = pill.slug === "opa" ? "OPA" : VENDOR_NAMES[pill.slug as keyof typeof VENDOR_NAMES];
          const offset = offsets[i];
          
          return (
            <motion.div
              key={pill.slug}
              data-vendor-slug={pill.slug}
              data-vendor-label={displayLabel}
              initial={isReduced ? false : { x: offset.x, y: offset.y, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: isReduced ? 0 : i * 0.05
              }}
              className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 shadow-[0_2px_12px_var(--glass-shadow)]"
            >
              <VendorMark slug={pill.slug as any} theme={theme} className="h-4 w-4" />
              <span className="text-primary text-[14px] font-medium leading-none">{displayLabel}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Sweep ambient effect */}
      <div 
        className={cn(
          "pointer-events-none absolute inset-0 z-0 opacity-40",
          theme === "dark" ? "mix-blend-overlay" : "mix-blend-soft-light"
        )}
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)"
        }}
        {...(!isReduced && {
          "data-animate": "sweep"
        })}
      >
        {!isReduced && (
          <style>{`
            [data-animate="sweep"] {
              animation: sweep ${AMBIENT.sweep}s linear infinite;
              background-size: 200% 200%;
            }
            @keyframes sweep {
              0% { background-position: -100% -100%; transform: translateX(-20%); }
              100% { background-position: 200% 200%; transform: translateX(20%); }
            }
          `}</style>
        )}
      </div>
    </div>
  );
}
