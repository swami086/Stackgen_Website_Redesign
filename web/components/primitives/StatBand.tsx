export type Stat = { value: string; label: string; mechanism: string };

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <li key={stat.label} className="flex flex-col gap-2">
          <h3
            data-part="figure"
            className="tabular-nums text-[56px] font-medium leading-none tracking-[-0.02em] text-text-primary"
          >
            {stat.value}
          </h3>
          <p className="text-base leading-6 text-text-primary">{stat.label}</p>
          <p className="text-[13px] leading-5 tracking-[0.04em] text-text-secondary">
            {stat.mechanism}
          </p>
        </li>
      ))}
    </ul>
  );
}
