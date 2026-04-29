"use client";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: string;
  color?: "cyan" | "amber" | "emerald" | "rose";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export function StatCard({
  label,
  value,
  icon,
  color = "cyan",
  trend,
}: StatCardProps) {
  const colorClasses = {
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
    rose: "text-rose-400",
  };

  const bgClasses = {
    cyan: "bg-cyan-500/10",
    amber: "bg-amber-500/10",
    emerald: "bg-emerald-500/10",
    rose: "bg-rose-500/10",
  };

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className={`mt-2 text-2xl font-bold ${colorClasses[color]}`}>
            {value}
          </p>
          {trend && (
            <p
              className={`mt-1 text-xs font-medium ${
                trend.direction === "up"
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className={`rounded-lg ${bgClasses[color]} p-3`}>
            <span className="text-xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}
