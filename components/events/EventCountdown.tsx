"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3 } from "lucide-react";

interface EventCountdownProps {
  date: string;
  startTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
}

function parseEventDate(date: string, startTime: string) {
  const datePart = date.slice(0, 10);

  const time = startTime.trim();

  // Handles:
  // 18:30
  // 18:30:00
  // 6:30 PM
  // 6:30PM
  const twelveHourMatch = time.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (twelveHourMatch) {
    let hours = Number(twelveHourMatch[1]);
    const minutes = Number(twelveHourMatch[2]);
    const period = twelveHourMatch[3].toUpperCase();

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return new Date(
      `${datePart}T${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:00`
    );
  }

  const twentyFourHourMatch = time.match(
    /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/
  );

  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);
    const seconds = Number(twentyFourHourMatch[3] ?? 0);

    return new Date(
      `${datePart}T${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  }

  // Fallback if the stored time has an unexpected format.
  return new Date(`${datePart}T00:00:00`);
}

function getTimeLeft(target: Date): TimeLeft {
  const difference = target.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      started: true,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    started: false,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function EventCountdown({
  date,
  startTime,
}: EventCountdownProps) {
  const targetDate = useMemo(
    () => parseEventDate(date, startTime),
    [date, startTime]
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft(targetDate));
    };

    updateCountdown();

    const interval = window.setInterval(
      updateCountdown,
      1000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [targetDate]);

  if (timeLeft.started) {
    return (
      <div className="overflow-hidden rounded-[20px] border border-red-200 bg-[#FFF7F7]">
        <div className="flex min-h-[74px] items-center gap-4 px-5 py-4 sm:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
            <Clock3
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
              Event time
            </p>

            <p className="mt-1 text-sm font-semibold tracking-[-0.02em] text-zinc-900">
              This event has started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-red-200 bg-[#FFF7F7]">
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Countdown label */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
            <span className="absolute inset-0 animate-ping rounded-xl bg-red-500 opacity-[0.12]" />

            <Clock3
              aria-hidden="true"
              className="relative h-4 w-4"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
              Event starts in
            </p>

            <p className="mt-1 truncate text-xs font-medium text-zinc-500">
              Don't miss the start.
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <CountdownUnit
            value={timeLeft.days}
            label="Days"
          />

          <CountdownSeparator />

          <CountdownUnit
            value={timeLeft.hours}
            label="Hours"
          />

          <CountdownSeparator />

          <CountdownUnit
            value={timeLeft.minutes}
            label="Min"
          />

          <CountdownSeparator />

          <CountdownUnit
            value={timeLeft.seconds}
            label="Sec"
          />
        </div>
      </div>
    </div>
  );
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-[38px] text-center sm:min-w-[46px]">
      <div className="flex h-9 items-center justify-center rounded-lg bg-white px-1.5 font-mono text-sm font-semibold tracking-[-0.04em] text-zinc-950 shadow-[0_1px_3px_rgba(24,24,27,0.08)] sm:px-2">
        {pad(value)}
      </div>

      <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.12em] text-red-400">
        {label}
      </p>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mb-4 text-sm font-semibold text-red-300"
    >
      :
    </span>
  );
}