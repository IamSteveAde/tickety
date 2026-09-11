import { NIGERIAN_STATES } from "@/lib/utils";
import { ChevronDown, MapPin } from "lucide-react";

export default function StateSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (state: string) => void;
}) {
  return (
    <div className="group relative w-full sm:w-auto">
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}
      <div className="pointer-events-none absolute -inset-1 rounded-[17px] bg-[#7C3AED]/10 opacity-0 blur-lg transition-opacity duration-300 group-focus-within:opacity-100" />

      {/* =====================================================
          CONTROL
      ===================================================== */}
      <div className="relative flex h-11 w-full items-center rounded-[14px] border border-black/[0.08] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-200 group-hover:border-black/[0.13] group-focus-within:border-[#7C3AED]/30 group-focus-within:shadow-[0_10px_30px_rgba(124,58,237,0.08)] sm:w-[190px]">
        {/* Location icon */}
        <div className="pointer-events-none ml-3.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/[0.07]">
          <MapPin
            size={12}
            strokeWidth={2}
            className="text-[#7C3AED]"
          />
        </div>

        {/* Select */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filter events by state"
          className="relative z-10 h-full w-full cursor-pointer appearance-none bg-transparent px-2.5 pr-9 text-[11px] font-medium text-[#111014] outline-none"
        >
          <option value="">All states</option>

          {NIGERIAN_STATES.map((state) => (
            <option
              key={state}
              value={state}
            >
              {state}
            </option>
          ))}
        </select>

        {/* Custom chevron */}
        <div className="pointer-events-none absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.035] transition-colors group-focus-within:bg-[#7C3AED]/[0.08]">
          <ChevronDown
            size={13}
            strokeWidth={2}
            className="text-black/35 transition-transform duration-200 group-focus-within:rotate-180 group-focus-within:text-[#7C3AED]"
          />
        </div>
      </div>
    </div>
  );
}