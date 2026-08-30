"use client";

/**
 * Communicates: Aiden plugs into the estate you already run.
 *
 * Motion thesis (Persuade): infinite left→right rolling bar — the stack
 * keeps streaming past like a live backplane. Mobbin: 1Password / Neon /
 * Rox / Headspace marquees with edge fades. Reduced motion = one static row.
 */
import { VendorMark, VENDOR_NAMES, type VendorSlug } from "@/components/replica/logos";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";

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

/** Full loop period — slow enough to read each mark (1Password-class). */
const MARQUEE_S = 36;

function Pill({
  pill,
  theme,
}: {
  pill: (typeof PILLS)[number];
  theme: "light" | "dark";
}) {
  return (
    <div
      data-vendor-slug={pill.slug}
      data-vendor-label={pill.label}
      className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2"
      title={VENDOR_NAMES[pill.slug]}
    >
      <VendorMark slug={pill.slug} theme={theme} className="h-4 w-4" />
      <span className="text-[13px] font-medium leading-none text-text-primary md:text-[14px]">
        {pill.label}
      </span>
    </div>
  );
}

function PillSet({
  theme,
  setId,
}: {
  theme: "light" | "dark";
  setId: "a" | "b";
}) {
  return (
    <div
      data-marquee-set={setId}
      className="flex shrink-0 items-center gap-3 pr-3"
      aria-hidden={setId === "b" ? true : undefined}
    >
      {PILLS.map((pill) => (
        <Pill key={`${setId}-${pill.slug}`} pill={pill} theme={theme} />
      ))}
    </div>
  );
}

export function Integrations({
  theme,
  reducedMotionOverride,
}: {
  theme: "light" | "dark";
  reducedMotionOverride?: boolean;
}) {
  const reduced = reducedMotionOverride ?? useReducedMotionSafe();
  const edgeFade =
    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

  return (
    <div
      role="img"
      aria-label="Integrations across GitHub, GitLab, Terraform, Datadog, PagerDuty, Jira, Open Policy Agent, and Slack"
      className="relative flex w-full flex-col items-center overflow-hidden rounded-[20px] border border-border bg-surface p-5 md:p-6"
    >
      <h3 className="mb-5 text-center text-[15px] font-medium leading-tight text-text-secondary md:mb-6">
        Plugs into the stack you already run
      </h3>

      {reduced ? (
        <div
          data-integrations-row
          data-integrations-static-row
          className="relative z-10 flex w-full flex-nowrap items-center justify-start gap-3 overflow-x-auto pb-1"
        >
          {PILLS.map((pill) => (
            <Pill key={pill.slug} pill={pill} theme={theme} />
          ))}
        </div>
      ) : (
        <div
          data-integrations-row
          data-marquee
          className="group/marquee relative z-10 w-full overflow-hidden"
          style={{
            maskImage: edgeFade,
            WebkitMaskImage: edgeFade,
          }}
        >
          <div
            data-animate="marquee"
            className="flex w-max"
            style={{
              animation: `replica-integrations-marquee ${MARQUEE_S}s linear infinite`,
            }}
          >
            <PillSet theme={theme} setId="a" />
            <PillSet theme={theme} setId="b" />
          </div>

          <style>{`
            @keyframes replica-integrations-marquee {
              from { transform: translate3d(-50%, 0, 0); }
              to { transform: translate3d(0, 0, 0); }
            }
            .group\\/marquee:hover [data-animate="marquee"] {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              [data-animate="marquee"] { animation: none !important; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
