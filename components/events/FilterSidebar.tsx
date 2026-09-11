import { EVENT_CATEGORIES } from "@/lib/utils";
import { cx } from "@/lib/utils";
import {
  Check,
  ChevronRight,
  SlidersHorizontal,
  Tag,
} from "lucide-react";

export type PriceFilter = "all" | "free" | "paid";

export default function FilterSidebar({
  category,
  onCategoryChange,
  price,
  onPriceChange,
}: {
  category: string;
  onCategoryChange: (category: string) => void;
  price: PriceFilter;
  onPriceChange: (price: PriceFilter) => void;
}) {
  return (
    <aside className="w-full shrink-0 sm:w-56">
      <div className="relative">
        {/* =====================================================
            FILTER PANEL
        ===================================================== */}
        <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_15px_45px_rgba(0,0,0,0.045)]">
          {/* ===================================================
              HEADER
          =================================================== */}
          <div className="border-b border-black/[0.06] px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#111014]">
                <SlidersHorizontal
                  size={13}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[-0.01em] text-[#111014]">
                  Filters
                </p>

                <p className="mt-0.5 text-[9px] text-black/30">
                  Refine your discovery
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================
              CATEGORY
          =================================================== */}
          <div className="px-3 py-5">
            <div className="flex items-center gap-2 px-2">
              <Tag
                size={12}
                className="text-[#7C3AED]"
              />

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">
                Category
              </p>
            </div>

            <div className="mt-3 space-y-0.5">
              <FilterOption
                label="All categories"
                active={category === ""}
                onClick={() =>
                  onCategoryChange("")
                }
              />

              {EVENT_CATEGORIES.map((cat) => (
                <FilterOption
                  key={cat}
                  label={cat}
                  active={category === cat}
                  onClick={() =>
                    onCategoryChange(cat)
                  }
                />
              ))}
            </div>
          </div>

          {/* ===================================================
              DIVIDER
          =================================================== */}
          <div className="mx-5 h-px bg-black/[0.06]" />

          {/* ===================================================
              PRICE
          =================================================== */}
          <div className="px-3 py-5">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-3 w-3 items-center justify-center rounded-full border border-[#7C3AED]/30">
                <span className="h-1 w-1 rounded-full bg-[#7C3AED]" />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">
                Price
              </p>
            </div>

            <div className="mt-3 space-y-0.5">
              <FilterOption
                label="All"
                active={price === "all"}
                onClick={() =>
                  onPriceChange("all")
                }
              />

              <FilterOption
                label="Free"
                active={price === "free"}
                onClick={() =>
                  onPriceChange("free")
                }
              />

              <FilterOption
                label="Paid"
                active={price === "paid"}
                onClick={() =>
                  onPriceChange("paid")
                }
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            DECORATIVE ACCENT
        ===================================================== */}
        <div className="pointer-events-none absolute -bottom-2 left-8 right-8 h-5 rounded-full bg-[#7C3AED]/[0.06] blur-xl" />
      </div>
    </aside>
  );
}

/* ===============================================================
   FILTER OPTION
   =============================================================== */

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "group relative flex w-full items-center justify-between rounded-[11px] px-3 py-2.5 text-left transition-all duration-200",
        active
          ? "bg-[#7C3AED]/[0.07] text-[#5B21B6]"
          : "text-black/45 hover:bg-black/[0.035] hover:text-black/75"
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {/* Active indicator */}
        <span
          className={cx(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
            active
              ? "border-[#7C3AED] bg-[#7C3AED]"
              : "border-black/[0.12] bg-white group-hover:border-black/20"
          )}
        >
          {active && (
            <Check
              size={9}
              strokeWidth={3}
              className="text-white"
            />
          )}
        </span>

        <span
          className={cx(
            "truncate text-[11px] font-medium",
            active
              ? "font-semibold"
              : ""
          )}
        >
          {label}
        </span>
      </span>

      {/* Arrow */}
      <ChevronRight
        size={12}
        className={cx(
          "shrink-0 transition-all duration-200",
          active
            ? "translate-x-0 text-[#7C3AED]/60"
            : "-translate-x-1 text-black/10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
        )}
      />
    </button>
  );
}