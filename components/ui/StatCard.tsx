import { ReactNode } from "react";
import { cx } from "@/lib/utils";

export default function StatCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("rounded-2xl border border-sand-200 bg-white p-5 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-light">{label}</p>
        {icon && <span className="text-plum-400">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-light">{hint}</p>}
    </div>
  );
}
