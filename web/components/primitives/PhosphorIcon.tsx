import {
  ArrowRight,
  ArrowsClockwise,
  Broadcast,
  BookOpen,
  ChartLine,
  ChartLineUp,
  ChatCircleDots,
  CheckCircle,
  CloudArrowDown,
  Compass,
  Funnel,
  GitBranch,
  Heartbeat,
  Lightning,
  MagnifyingGlass,
  RocketLaunch,
  ShieldCheck,
  Stack,
  TerminalWindow,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import type { PhosphorIconName } from "@/lib/phosphor-icons";

const ICONS = {
  stack: Stack,
  "rocket-launch": RocketLaunch,
  "chart-line-up": ChartLineUp,
  heartbeat: Heartbeat,
  "shield-check": ShieldCheck,
  "arrows-clockwise": ArrowsClockwise,
  "cloud-arrow-down": CloudArrowDown,
  "git-branch": GitBranch,
  lightning: Lightning,
  "book-open": BookOpen,
  "check-circle": CheckCircle,
  "chart-line": ChartLine,
  "magnifying-glass": MagnifyingGlass,
  broadcast: Broadcast,
  "terminal-window": TerminalWindow,
  compass: Compass,
  funnel: Funnel,
  "chat-circle-dots": ChatCircleDots,
  "arrow-right": ArrowRight,
} as const;

type PhosphorIconProps = {
  name: PhosphorIconName;
  size?: number;
  className?: string;
};

export function PhosphorIcon({ name, size = 24, className }: PhosphorIconProps) {
  const Icon = ICONS[name];
  return (
    <Icon
      size={size}
      weight="regular"
      className={cn(className)}
      aria-hidden
    />
  );
}
