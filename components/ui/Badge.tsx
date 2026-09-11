import { cx } from "@/lib/utils";
import { ReactNode } from "react";

type Tone = "plum" | "leaf" | "neutral" | "amber" | "red";

const toneClasses: Record<Tone, string> = {
  plum: "bg-plum-50 text-plum-700",
  leaf: "bg-leaf-50 text-leaf-700",
  neutral: "bg-sand-200 text-ink-light",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-600",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
