import { cx } from "@/lib/utils";

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" && "text-center mx-auto", "max-w-2xl", className)}>
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-ink-light">{subtitle}</p>}
    </div>
  );
}
