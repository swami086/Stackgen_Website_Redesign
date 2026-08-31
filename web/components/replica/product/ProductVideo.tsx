import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductVideoProps = {
  theme: "light" | "dark";
  caption: string;
  className?: string;
};

function PlayIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * Prior Soft Structuralism product video plate (play affordance + video-still atmosphere).
 * Same pattern as homepage Solution / ReplicaVideo — until real product footage ships.
 */
export function ProductVideo({ theme, caption, className }: ProductVideoProps) {
  return (
    <ProductSectionShell id="product-video" theme={theme} className={className}>
      <div className="w-full rounded-[20px] border border-border bg-surface p-1.5">
        <div
          className={cn(
            "relative flex h-[360px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[14px] border border-border bg-surface-raised md:h-[420px]",
          )}
          role="img"
          aria-label={`Video placeholder: ${caption}`}
          data-video-placeholder="product"
        >
          <AtmosphereField slot="video-still" theme={theme} className="z-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent"
              aria-hidden
            >
              <PlayIcon />
            </div>
            <p className="max-w-md text-center text-sm text-text-secondary">{caption}</p>
          </div>
        </div>
      </div>
    </ProductSectionShell>
  );
}
