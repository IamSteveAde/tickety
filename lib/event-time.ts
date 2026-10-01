import { eventInstant } from "./email/schedule";

export function getEventStart(event: {
  date: Date | string;
  startTime: string;
  timezone?: string;
}): Date {
  const date =
    event.date instanceof Date
      ? event.date.toISOString().slice(0, 10)
      : event.date.slice(0, 10);

  return eventInstant(date, event.startTime, event.timezone);
}

export function getEventEnd(event: {
  date: Date | string;
  endTime: string;
  timezone?: string;
}): Date {
  const date =
    event.date instanceof Date
      ? event.date.toISOString().slice(0, 10)
      : event.date.slice(0, 10);

  return eventInstant(date, event.endTime, event.timezone);
}

export function isEventOngoing(event: {
  date: Date | string;
  startTime: string;
  endTime: string;
  timezone?: string;
}): boolean {
  const now = new Date();
  const start = getEventStart(event);
  const end = getEventEnd(event);

  return now >= start && now < end;
}

export function hasEventEnded(event: {
  date: Date | string;
  endTime: string;
  timezone?: string;
}): boolean {
  return new Date() >= getEventEnd(event);
}

export function canPurchaseTickets(event: {
  date: Date | string;
  endTime: string;
  timezone?: string;
}): boolean {
  return !hasEventEnded(event);
}
