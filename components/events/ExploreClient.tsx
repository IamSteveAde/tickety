"use client";

import { useMemo, useState } from "react";
import { EventItem } from "@/lib/types";
import EventCard from "@/components/events/EventCard";
import StateSelector from "@/components/events/StateSelector";
import FilterSidebar, {
  PriceFilter,
} from "@/components/events/FilterSidebar";
import {
  ArrowDown,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

export default function ExploreClient({
  events,
}: {
  events: EventItem[];
}) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<PriceFilter>("all");

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery = event.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesState =
        state === "" || event.state === state;

      const matchesCategory =
        category === "" || event.category === category;

      const isFree = event.ticketTypes.every(
        (t) => t.price === 0
      );

      const matchesPrice =
        price === "all" ||
        (price === "free" ? isFree : !isFree);

      return (
        matchesQuery &&
        matchesState &&
        matchesCategory &&
        matchesPrice
      );
    });
  }, [events, query, state, category, price]);

  const hasFilters =
    query !== "" ||
    state !== "" ||
    category !== "" ||
    price !== "all";

  const clearFilters = () => {
    setQuery("");
    setState("");
    setCategory("");
    setPrice("all");
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F5F2]">
      {/* =========================================================
          PAGE ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#241044_0%,#13091F_38%,#F7F5F2_100%)] opacity-100" />

        <div className="absolute -left-[15%] -top-[45%] h-[650px] w-[650px] rounded-full bg-[#7C3AED]/20 blur-[160px]" />

        <div className="absolute -right-[15%] -top-[40%] h-[550px] w-[550px] rounded-full bg-[#9333EA]/15 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =========================================================
          HERO / SEARCH AREA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#09070F] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[15%] -top-[60%] h-[700px] w-[700px] rounded-full bg-[#7C3AED]/20 blur-[170px]" />

          <div className="absolute -right-[20%] -top-[40%] h-[600px] w-[600px] rounded-full bg-[#9333EA]/15 blur-[160px]" />

          <div className="absolute left-1/2 top-1/2 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A855F7]/[0.06] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
              `,
              backgroundSize: "90px 90px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 backdrop-blur-xl">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]/20">
              <Sparkles
                size={11}
                className="text-[#C084FC]"
              />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
              Discover what's happening
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]">
              Find your
              <br />
              <span className="text-white/35">
                next thing.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              Music, nightlife, culture, experiences and everything worth
              leaving the house for.
            </p>
          </div>

          {/* =====================================================
              SEARCH
          ===================================================== */}
          <div className="mt-10 max-w-3xl">
            <div className="group relative">
              <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-gradient-to-r from-[#7C3AED]/20 via-[#A855F7]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />

              <div className="relative flex items-center rounded-[20px] border border-white/10 bg-white/[0.075] shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-colors focus-within:border-white/20">
                <Search
                  size={19}
                  className="ml-5 shrink-0 text-white/35"
                />

                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search events..."
                  className="h-16 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/30 sm:text-base"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/40 transition-colors hover:bg-white/[0.12] hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTER / RESULTS
      ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* =======================================================
            TOP CONTROLS
        ======================================================= */}
        <div className="flex flex-col gap-5 border-b border-black/[0.07] pb-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Results */}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#111014] sm:text-3xl">
                Explore events
              </h2>

              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#111014] px-2 text-[10px] font-semibold text-white">
                {filtered.length}
              </span>
            </div>

            <p className="mt-1.5 text-xs text-black/40 sm:text-sm">
              {filtered.length === 1
                ? "One event waiting for you."
                : `${filtered.length} events worth discovering.`}
            </p>
          </div>

          {/* State selector */}
          <div className="flex items-center gap-3">
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30 sm:block">
              Location
            </span>

            <div className="min-w-[180px]">
              <StateSelector
                value={state}
                onChange={setState}
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            CONTENT
        ======================================================= */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* =====================================================
              SIDEBAR
          ===================================================== */}
          <aside className="w-full shrink-0 lg:w-[210px]">
            <div className="mb-4 flex items-center gap-2 lg:hidden">
              <SlidersHorizontal
                size={15}
                className="text-[#7C3AED]"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
                Filters
              </span>
            </div>

            <div className="sticky top-24">
              <FilterSidebar
                category={category}
                onCategoryChange={setCategory}
                price={price}
                onPriceChange={setPrice}
              />
            </div>
          </aside>

          {/* =====================================================
              RESULTS
          ===================================================== */}
          <div className="min-w-0 flex-1">
            {/* Active filters */}
            {hasFilters && (
              <div className="mb-7 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Filters
                </span>

                {query && (
                  <FilterPill
                    label={`"${query}"`}
                    onRemove={() => setQuery("")}
                  />
                )}

                {state && (
                  <FilterPill
                    label={state}
                    onRemove={() => setState("")}
                  />
                )}

                {category && (
                  <FilterPill
                    label={category}
                    onRemove={() =>
                      setCategory("")
                    }
                  />
                )}

                {price !== "all" && (
                  <FilterPill
                    label={
                      price === "free"
                        ? "Free events"
                        : "Paid events"
                    }
                    onRemove={() =>
                      setPrice("all")
                    }
                  />
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-[10px] font-semibold text-[#7C3AED] transition-colors hover:text-[#5B21B6]"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}
            {filtered.length === 0 ? (
              <div className="relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white px-6 py-20 text-center shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:px-10">
                {/* Decorative glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-[#7C3AED]/[0.06] blur-[70px]" />

                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#111014] text-white shadow-lg">
                  <Search size={19} />
                </div>

                <h3 className="relative mt-6 font-display text-2xl font-semibold tracking-[-0.03em] text-[#111014]">
                  Nothing matched that search.
                </h3>

                <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-black/40">
                  Try another search, choose a different location, or clear
                  your filters to see more events.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="relative mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#111014] px-5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#241044]"
                >
                  Clear filters
                  <ArrowDown
                    size={13}
                    className="rotate-[-45deg]"
                  />
                </button>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                    All events
                  </p>

                  <span className="text-[10px] text-black/25">
                    Scroll to discover
                  </span>
                </div>

                {/* =================================================
                    EVENT GRID
                ================================================= */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   FILTER PILL
   =============================================================== */

function FilterPill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="group inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/15 bg-[#7C3AED]/[0.06] px-3 py-1.5 text-[10px] font-medium text-[#6D28D9] transition-colors hover:border-[#7C3AED]/25 hover:bg-[#7C3AED]/10"
    >
      {label}

      <X
        size={11}
        className="opacity-50 transition-opacity group-hover:opacity-100"
      />
    </button>
  );
}