export function getEventStart(event: {
  date: Date | string;
  startTime: string;
}): Date {
  const date =
    event.date instanceof Date
      ? event.date.toISOString().slice(0, 10)
      : event.date.slice(0, 10);

  return parseDateTime(date, event.startTime);
}

export function getEventEnd(event: {
  date: Date | string;
  endTime: string;
}): Date {
  const date =
    event.date instanceof Date
      ? event.date.toISOString().slice(0, 10)
      : event.date.slice(0, 10);

  return parseDateTime(date, event.endTime);
}

export function isEventOngoing(event: {
  date: Date | string;
  startTime: string;
  endTime: string;
}): boolean {
  const now = new Date();
  const start = getEventStart(event);
  const end = getEventEnd(event);

  return now >= start && now < end;
}

export function hasEventEnded(event: {
  date: Date | string;
  endTime: string;
}): boolean {
  return new Date() >= getEventEnd(event);
}

export function canPurchaseTickets(event: {
  date: Date | string;
  endTime: string;
}): boolean {
  return !hasEventEnded(event);
}

function parseDateTime(
  date: string,
  time: string
): Date {
  const normalizedTime = normalizeTime(time);

  const value = new Date(
    `${date}T${normalizedTime}`
  );

  if (Number.isNaN(value.getTime())) {
    throw new Error(
      `Invalid event date/time: ${date} ${time}`
    );
  }

  return value;
}

function normalizeTime(time: string): string {
  const value = time.trim();

  // Already 24-hour format: 18:30
  if (/^\d{2}:\d{2}$/.test(value)) {
    return `${value}:00`;
  }

  // 12-hour format: 6:30 PM
  const match = value.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }

  let hour = Number(match[1]);
  const minute = match[2];
  const period = match[3].toUpperCase();

  if (hour === 12) {
    hour = 0;
  }

  if (period === "PM") {
    hour += 12;
  }

  return `${String(hour).padStart(2, "0")}:${minute}:00`;
}