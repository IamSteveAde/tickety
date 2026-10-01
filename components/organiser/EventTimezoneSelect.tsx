"use client";

import { useEffect, useState } from "react";

const fallback = ["Africa/Lagos", "Africa/Accra", "Africa/Nairobi", "Africa/Johannesburg", "Africa/Cairo", "Europe/London", "America/New_York", "Asia/Dubai"];

export default function EventTimezoneSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [zones, setZones] = useState(fallback);
  useEffect(() => {
    const intl = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
    if (intl.supportedValuesOf) setZones(intl.supportedValuesOf("timeZone"));
  }, []);
  return <label className="block space-y-2"><span className="text-xs font-semibold text-zinc-600">Event timezone</span><select required value={value} onChange={(e) => onChange(e.target.value)} className="h-[58px] w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-zinc-800 outline-none focus:border-violet-500">{Array.from(new Set([value, ...zones])).sort().map((zone) => <option key={zone} value={zone}>{zone.replace(/_/g, " ")}</option>)}</select><span className="block text-[11px] leading-5 text-zinc-500">Event times and email reminders use this timezone.</span></label>;
}
