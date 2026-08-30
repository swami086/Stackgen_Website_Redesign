"use client";

/**
 * Communicates: production teams already trust StackGen.
 *
 * Motion thesis (Persuade): infinite left→right rolling logo bar — same
 * pattern as Integrations. Mobbin: 1Password / Neon / Rox / Headspace.
 * Reduced motion = one static row.
 */
import { replicaContent } from "@/content/replica";
import { useReducedMotionSafe } from "@/components/replica/motion/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

type ReplicaLogosProps = {
  theme: "light" | "dark";
  className?: string;
};

const MARQUEE_S = 40;

type LogoItem = (typeof replicaContent.logos.items)[number];

function LogoMark({
  logo,
  decorative,
}: {
  logo: LogoItem;
  decorative?: boolean;
}) {
  return (
    <div
      data-customer-logo={logo.alt}
      className="flex h-8 shrink-0 items-center justify-center px-4"
    >
      <img
        src={logo.src}
        alt={decorative ? "" : logo.alt}
        className="h-5 w-auto max-w-none object-contain"
      />
    </div>
  );
}

function LogoSet({
  items,
  setId,
}: {
  items: readonly LogoItem[];
  setId: "a" | "b";
}) {
  const decorative = setId === "b";
  return (
    <div
      data-marquee-set={setId}
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={decorative || undefined}
    >
      {items.map((logo) => (
        <LogoMark
          key={`${setId}-${logo.alt}`}
          logo={logo}
          decorative={decorative}
        />
      ))}
    </div>
  );
}

export function ReplicaLogos({ theme, className }: ReplicaLogosProps) {
  const { eyebrow, items } = replicaContent.logos;
  const reduced = useReducedMotionSafe();

  return (
    <section
      data-pencil-id={REPLICA_FRAMES[theme].logos}
      className={cn(
        "flex w-full flex-col items-center gap-8 overflow-hidden px-4 py-16 md:px-24 md:py-24",
        className,
      )}
    >
      <p className="whitespace-nowrap text-center font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
        {eyebrow}
      </p>

      {reduced ? (
        <div
          data-logos-row
          className="flex w-full flex-row flex-wrap items-center justify-center gap-8 md:justify-between"
        >
          {items.map((logo) => (
            <LogoMark key={logo.alt} logo={logo} />
          ))}
        </div>
      ) : (
        <div
          data-logos-row
          data-marquee
          className="group/marquee relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div
            data-animate="marquee"
            className="flex w-max"
            style={{
              animation: `replica-logos-marquee ${MARQUEE_S}s linear infinite`,
            }}
          >
            <LogoSet items={items} setId="a" />
            <LogoSet items={items} setId="b" />
          </div>

          <style>{`
            @keyframes replica-logos-marquee {
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
    </section>
  );
}
