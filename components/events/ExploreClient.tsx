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
  ArrowRight,
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
    <main className="relative min-h-screen overflow-hidden bg-[#F7F5F2] text-[#111014]">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#0B0711] text-white">
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[-15%] top-[-45%] h-[700px] w-[700px] rounded-full bg-[#7C3AED]/18 blur-[160px]" />

          <div className="absolute right-[-15%] top-[-35%] h-[600px] w-[600px] rounded-full bg-[#A855F7]/12 blur-[150px]" />

          <div className="absolute bottom-[-40%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#4C1D95]/20 blur-[160px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
              `,
              backgroundSize: "96px 96px",
            }}
          />

          <div className="absolute left-[7%] top-0 hidden h-full w-px bg-white/[0.05] lg:block" />
          <div className="absolute right-[7%] top-0 hidden h-full w-px bg-white/[0.05] lg:block" />
        </div>

        {/* Increased top spacing for fixed navbar */}
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-36">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
              <Sparkles
                size={14}
                strokeWidth={1.8}
                className="text-[#C4B5FD]"
              />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                Discover what&apos;s happening
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-white/60">
                  Events happening around you
                </span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-[5.6rem]">
              Find your
              <br />
              <span className="text-white/35">
                next thing.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
              Music, nightlife, culture, experiences and everything worth
              leaving the house for.
            </p>
          </div>

          {/* =====================================================
              SEARCH
          ===================================================== */}

          <div className="mt-10 max-w-3xl">
            <div className="group relative">
              {/* Search focus atmosphere */}
              <div className="pointer-events-none absolute -inset-1 rounded-[24px] bg-[#7C3AED]/20 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />

              <div className="relative flex h-[68px] items-center rounded-[20px] border border-white/10 bg-white/[0.07] shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 focus-within:border-white/20 focus-within:bg-white/[0.09]">
                <Search
                  size={19}
                  strokeWidth={1.8}
                  className="ml-5 shrink-0 text-white/30"
                />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events..."
                  className="h-full w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/25 sm:text-base"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/40 transition-all hover:bg-white/[0.13] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick discovery line */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
              Discover
            </span>

            <div className="flex items-center gap-2 text-[10px] text-white/45">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              Music
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/45">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              Nightlife
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/45">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              Culture
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/45">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              Experiences
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESULTS AREA
      ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* =======================================================
            TOP CONTROLS
        ======================================================= */}

        <div className="flex flex-col gap-6 border-b border-black/[0.07] pb-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Results information */}
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

          {/* Location */}
          <div className="flex items-center gap-3">
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30 sm:block">
              Location
            </span>

            <div className="min-w-[200px]">
              <StateSelector
                value={state}
                onChange={setState}
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* =====================================================
              FILTER SIDEBAR
          ===================================================== */}

          <aside className="w-full shrink-0 lg:w-[210px]">
            <div className="mb-4 flex items-center gap-2 lg:hidden">
              <SlidersHorizontal
                size={15}
                strokeWidth={1.8}
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
                  Active
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
                    onRemove={() => setCategory("")}
                  />
                )}

                {price !== "all" && (
                  <FilterPill
                    label={
                      price === "free"
                        ? "Free events"
                        : "Paid events"
                    }
                    onRemove={() => setPrice("all")}
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
              <div className="relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white px-6 py-20 text-center shadow-[0_18px_55px_rgba(0,0,0,0.035)] sm:px-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-[#7C3AED]/[0.06] blur-[70px]"
                />

                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#111014] text-white shadow-[0_10px_30px_rgba(17,16,20,0.12)]">
                  <Search size={19} strokeWidth={1.8} />
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
                  className="relative mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#111014] px-5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7C3AED]"
                >
                  Clear filters

                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                      All events
                    </p>

                    <p className="mt-1 text-xs text-black/30">
                      {filtered.length}{" "}
                      {filtered.length === 1
                        ? "event available"
                        : "events available"}
                    </p>
                  </div>

                  <span className="hidden text-[10px] text-black/25 sm:block">
                    Scroll to discover
                  </span>
                </div>

                {/* =================================================
                    EVENT GRID
                ================================================= */}

                <div className="grid items-stretch grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((event) => (
                    <div
                      key={event.id}
                      className="flex h-full min-w-0"
                    >
                      <div className="flex h-full w-full min-w-0 flex-col">
                        <div className="flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-[24px]">
                          <div className="flex h-full w-full min-h-0 flex-col">
                            <EventCard event={event} />
                          </div>
                        </div>
                      </div>
                    </div>
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
      className="group inline-flex h-8 items-center gap-2 rounded-full border border-[#7C3AED]/15 bg-[#7C3AED]/[0.06] px-3 text-[10px] font-medium text-[#6D28D9] transition-all duration-200 hover:border-[#7C3AED]/25 hover:bg-[#7C3AED]/10"
    >
      <span className="max-w-[180px] truncate">
        {label}
      </span>

      <X
        size={11}
        strokeWidth={2}
        className="opacity-45 transition-opacity group-hover:opacity-100"
      />
    </button>
  );
}