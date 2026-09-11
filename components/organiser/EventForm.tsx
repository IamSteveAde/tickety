"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MapPin,
  Plus,
  Sparkles,
  Ticket,
  Trash2,
  Users,
} from "lucide-react";

import Button from "@/components/ui/Button";
import {
  NIGERIAN_STATES,
  EVENT_CATEGORIES,
} from "@/lib/utils";
import CoverImageUpload from "@/components/organiser/CoverImageUpload";

interface DraftTicketType {
  name: string;
  price: string;
  quantity: string;
}

interface DraftQuestion {
  label: string;
}

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [minAge, setMinAge] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [freeCapacity, setFreeCapacity] = useState("100");

  const [ticketTypes, setTicketTypes] = useState<
    DraftTicketType[]
  >([
    {
      name: "Regular",
      price: "",
      quantity: "",
    },
  ]);

  const [questions, setQuestions] = useState<
    DraftQuestion[]
  >([]);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "published" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  function updateTicketType(
    index: number,
    field: keyof DraftTicketType,
    value: string
  ) {
    setTicketTypes((prev) =>
      prev.map((ticket, i) =>
        i === index
          ? {
              ...ticket,
              [field]: value,
            }
          : ticket
      )
    );
  }

  function addTicketType() {
    setTicketTypes((prev) => [
      ...prev,
      {
        name: "",
        price: "",
        quantity: "",
      },
    ]);
  }

  function removeTicketType(index: number) {
    setTicketTypes((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        label: "",
      },
    ]);
  }

  function updateQuestion(
    index: number,
    value: string
  ) {
    setQuestions((prev) =>
      prev.map((question, i) =>
        i === index
          ? {
              ...question,
              label: value,
            }
          : question
      )
    );
  }

  function removeQuestion(index: number) {
    setQuestions((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          venue,
          state,
          date,
          startTime,
          category,
          description,
          coverImageUrl,
          tags,
          refundPolicy,
          minAge,
          isFree,
          freeCapacity,
          ticketTypes,
          customQuestions: questions.filter(
            (q) => q.label.trim() !== ""
          ),
        }),
      });

      const data = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error ??
            "Something went wrong publishing this event."
        );
      }

      if (data.redirectUrl) {
        window.location.href =
          data.redirectUrl;
        return;
      }

      setStatus("published");
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );

      setStatus("error");
    }
  }

  /* ============================================================
     SUCCESS
  ============================================================ */

  if (status === "published") {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <div className="relative overflow-hidden rounded-[32px] bg-[#111014] px-6 py-16 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#25D366]/10 blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#25D366]/10">
              <CheckCircle2
                size={32}
                className="text-[#4ADE80]"
              />
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A78BFA]">
              Published successfully
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              {title || "Your event"} is live.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">
              Your event page has been created and
              your WhatsApp ticket flow is ready for
              attendees.
            </p>

            <Button
              variant="primary"
              onClick={() =>
                window.location.reload()
              }
              className="mt-8 rounded-full bg-white px-7 text-[#111014] hover:bg-white/90"
            >
              Create another event
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     FORM
  ============================================================ */

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-5xl pb-36"
    >
      {/* ========================================================
          PAGE HEADER
      ======================================================== */}

      <header className="mb-10">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#7C3AED]/10">
            <Sparkles
              size={13}
              className="text-[#7C3AED]"
            />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
            Event builder
          </span>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-[-0.045em] text-[#111014] sm:text-5xl">
              Create your event
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
              Everything attendees need to know,
              presented beautifully and connected to
              your Tickety ticket flow.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold text-black/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
            Draft
          </div>
        </div>
      </header>

      {/* ========================================================
          ERROR
      ======================================================== */}

      {status === "error" && (
        <div className="mb-8 flex items-start gap-3 rounded-[18px] border border-red-200 bg-red-50 px-5 py-4">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div>
            <p className="text-sm font-semibold text-red-800">
              We couldn&apos;t publish your event
            </p>

            <p className="mt-1 text-xs leading-5 text-red-600/80">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          01 — EVENT DETAILS
      ======================================================== */}

      <section className="border-b border-black/[0.07] pb-14">
        <SectionHeader
          number="01"
          title="Event details"
          description="Start with the information attendees need to decide if they want to be there."
        />

        <div className="mt-9 space-y-7">
          <Field
            label="Event title"
            required
            hint="A clear, memorable name works best."
          >
            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Afrobeats Picnic — Lagos"
              className="
                h-[58px]
                w-full
                rounded-[16px]
                border
                border-black/[0.10]
                bg-white
                px-4
                text-[16px]
                font-medium
                tracking-[-0.015em]
                text-[#111014]
                outline-none
                transition-all
                placeholder:text-black/25
                hover:border-black/[0.16]
                focus:border-[#7C3AED]/50
                focus:ring-4
                focus:ring-[#7C3AED]/[0.07]
              "
            />
          </Field>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Venue"
              required
              icon={<MapPin size={13} />}
            >
              <input
                required
                value={venue}
                onChange={(e) =>
                  setVenue(e.target.value)
                }
                placeholder="Muri Okunola Park"
                className={inputClass}
              />
            </Field>

            <Field
              label="State"
              required
            >
              <div className="relative">
                <select
                  required
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select a state
                  </option>

                  {NIGERIAN_STATES.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

                <Chevron />
              </div>
            </Field>

            <Field
              label="Date"
              required
              icon={
                <CalendarDays size={13} />
              }
            >
              <input
                required
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field
              label="Start time"
              required
              icon={<Clock3 size={13} />}
            >
              <input
                required
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field
              label="Category"
              required
            >
              <div className="relative">
                <select
                  required
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select a category
                  </option>

                  {EVENT_CATEGORIES.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

                <Chevron />
              </div>
            </Field>
          </div>

          <Field
            label="Description"
            required
            hint="Give people enough context to understand the experience."
          >
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Tell attendees what makes this event worth attending..."
              className="
                min-h-[155px]
                w-full
                resize-y
                rounded-[16px]
                border
                border-black/[0.10]
                bg-white
                px-4
                py-3.5
                text-[14px]
                leading-6
                text-[#111014]
                outline-none
                transition-all
                placeholder:text-black/25
                hover:border-black/[0.16]
                focus:border-[#7C3AED]/50
                focus:ring-4
                focus:ring-[#7C3AED]/[0.07]
              "
            />

            <div className="mt-2 flex justify-between px-1 text-[10px] text-black/25">
              <span>
                Keep it useful and easy to scan.
              </span>

              <span>
                {description.length}
              </span>
            </div>
          </Field>
        </div>
      </section>

      {/* ========================================================
          02 — PRESENTATION
      ======================================================== */}

      <section className="border-b border-black/[0.07] py-14">
        <SectionHeader
          number="02"
          title="Event presentation"
          description="Make the event look as good as the experience you're creating."
        />

        <div className="mt-9 space-y-8">
          <Field
            label="Cover image"
            hint="Your complete artwork will be preserved — nothing gets cropped."
          >
            <CoverImageUpload
              value={coverImageUrl}
              onChange={
                setCoverImageUrl
              }
            />
          </Field>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Tags"
              hint="Separate multiple tags with commas."
            >
              <input
                value={tags}
                onChange={(e) =>
                  setTags(e.target.value)
                }
                placeholder="afrobeats, outdoor, nightlife"
                className={inputClass}
              />
            </Field>

            <Field
              label="Minimum age"
              hint="Leave blank if there is no restriction."
            >
              <input
                type="number"
                min={0}
                value={minAge}
                onChange={(e) =>
                  setMinAge(e.target.value)
                }
                placeholder="18"
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            label="Refund policy"
            hint="Optional, but recommended."
          >
            <textarea
              rows={4}
              value={refundPolicy}
              onChange={(e) =>
                setRefundPolicy(
                  e.target.value
                )
              }
              placeholder="e.g. Full refunds up to 48 hours before the event."
              className="
                min-h-[115px]
                w-full
                resize-y
                rounded-[16px]
                border
                border-black/[0.10]
                bg-white
                px-4
                py-3.5
                text-[14px]
                leading-6
                text-[#111014]
                outline-none
                transition-all
                placeholder:text-black/25
                hover:border-black/[0.16]
                focus:border-[#7C3AED]/50
                focus:ring-4
                focus:ring-[#7C3AED]/[0.07]
              "
            />
          </Field>
        </div>
      </section>

      {/* ========================================================
          03 — TICKETS
      ======================================================== */}

      <section className="border-b border-black/[0.07] py-14">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <SectionHeader
            number="03"
            title="Tickets"
            description="Set your ticket types, pricing and available capacity."
          />

          {/* FREE EVENT TOGGLE */}

          <button
            type="button"
            onClick={() =>
              setIsFree(!isFree)
            }
            className={[
              "flex h-12 shrink-0 items-center gap-3 rounded-full border px-4 transition-all",
              isFree
                ? "border-[#25D366]/30 bg-[#25D366]/10"
                : "border-black/[0.10] bg-white hover:border-black/20",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                isFree
                  ? "border-[#25D366] bg-[#25D366]"
                  : "border-black/20 bg-white",
              ].join(" ")}
            >
              {isFree && (
                <Check
                  size={11}
                  strokeWidth={3}
                  className="text-white"
                />
              )}
            </span>

            <span
              className={[
                "text-xs font-semibold",
                isFree
                  ? "text-[#168A43]"
                  : "text-black/55",
              ].join(" ")}
            >
              This is a free event
            </span>
          </button>
        </div>

        {isFree ? (
          <div className="mt-9 overflow-hidden rounded-[22px] border border-[#25D366]/15 bg-[#F6FBF7]">
            <div className="flex flex-col gap-7 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#25D366]/10">
                  <Users
                    size={17}
                    className="text-[#168A43]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#111014]">
                    Free admission
                  </p>

                  <p className="mt-1 max-w-md text-xs leading-5 text-black/40">
                    Attendees won't be charged.
                    Set the maximum number of
                    people your venue can
                    accommodate.
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-[180px]">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-black/35">
                  Capacity
                </label>

                <input
                  type="number"
                  min={1}
                  value={freeCapacity}
                  onChange={(e) =>
                    setFreeCapacity(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-9">
            {/* Desktop headings */}

            <div className="mb-3 hidden grid-cols-[1fr_190px_190px_44px] gap-3 px-4 sm:grid">
              <span className={tableLabel}>
                Ticket type
              </span>

              <span className={tableLabel}>
                Price · NGN
              </span>

              <span className={tableLabel}>
                Quantity
              </span>

              <span />
            </div>

            <div className="space-y-3">
              {ticketTypes.map(
                (ticket, index) => (
                  <div
                    key={index}
                    className="
                      group
                      rounded-[20px]
                      border
                      border-black/[0.08]
                      bg-white
                      p-3
                      shadow-[0_5px_20px_rgba(0,0,0,0.025)]
                      transition-all
                      hover:border-black/[0.13]
                      hover:shadow-[0_10px_30px_rgba(0,0,0,0.045)]
                    "
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_190px_190px_44px]">
                      {/* NAME */}

                      <div>
                        <label
                          className={
                            mobileLabel
                          }
                        >
                          Ticket type
                        </label>

                        <input
                          value={
                            ticket.name
                          }
                          onChange={(e) =>
                            updateTicketType(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Regular, VIP, VVIP"
                          className={
                            ticketInput
                          }
                        />
                      </div>

                      {/* PRICE */}

                      <div>
                        <label
                          className={
                            mobileLabel
                          }
                        >
                          Price · NGN
                        </label>

                        <div className="relative">
                          <span
                            className="
                              pointer-events-none
                              absolute
                              left-3.5
                              top-1/2
                              -translate-y-1/2
                              text-[14px]
                              font-semibold
                              text-black/30
                            "
                          >
                            ₦
                          </span>

                          <input
                            type="number"
                            min={0}
                            value={
                              ticket.price
                            }
                            onChange={(e) =>
                              updateTicketType(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            placeholder="5,000"
                            className={`${ticketInput} pl-9`}
                          />
                        </div>
                      </div>

                      {/* QUANTITY */}

                      <div>
                        <label
                          className={
                            mobileLabel
                          }
                        >
                          Quantity
                        </label>

                        <div className="relative">
                          <Users
                            size={15}
                            className="
                              pointer-events-none
                              absolute
                              left-3.5
                              top-1/2
                              -translate-y-1/2
                              text-black/25
                            "
                          />

                          <input
                            type="number"
                            min={0}
                            value={
                              ticket.quantity
                            }
                            onChange={(e) =>
                              updateTicketType(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            placeholder="e.g. 500"
                            className={`${ticketInput} pl-10`}
                          />
                        </div>
                      </div>

                      {/* DELETE */}

                      <div className="flex items-end justify-end sm:items-center sm:justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            removeTicketType(
                              index
                            )
                          }
                          disabled={
                            ticketTypes.length ===
                            1
                          }
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-[12px]
                            text-black/20
                            transition-all
                            hover:bg-red-50
                            hover:text-red-500
                            disabled:pointer-events-none
                            disabled:opacity-20
                          "
                          aria-label="Remove ticket type"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* ADD TICKET */}

            <button
              type="button"
              onClick={addTicketType}
              className="
                mt-3
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-[17px]
                border
                border-dashed
                border-black/10
                bg-[#FCFCFB]
                text-xs
                font-semibold
                text-black/40
                transition-all
                hover:border-[#7C3AED]/30
                hover:bg-[#7C3AED]/[0.025]
                hover:text-[#7C3AED]
              "
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.035]">
                <Plus size={14} />
              </span>

              Add another ticket type
            </button>
          </div>
        )}
      </section>

      
      {/* ========================================================
          FIXED PUBLISH BAR
      ======================================================== */}

      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-40
          border-t
          border-black/[0.08]
          bg-white/90
          px-4
          py-3
          shadow-[0_-15px_50px_rgba(0,0,0,0.08)]
          backdrop-blur-2xl
          sm:px-6
        "
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-5">
          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#7C3AED]/10 sm:flex">
              <Ticket
                size={15}
                className="text-[#7C3AED]"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.01em] text-[#111014]">
                Ready to publish?
              </p>

              <p className="hidden text-xs text-black/35 sm:block">
                Your event page and ticket flow will
                be created automatically.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={
              status === "submitting"
            }
            className="
              h-12
              shrink-0
              rounded-full
              bg-[#111014]
              px-5
              text-sm
              font-semibold
              text-white
              shadow-[0_8px_25px_rgba(17,16,20,0.18)]
              transition-all
              hover:-translate-y-0.5
              hover:bg-[#241044]
              hover:shadow-[0_12px_30px_rgba(17,16,20,0.22)]
              sm:min-w-[190px]
              sm:px-6
            "
          >
            <span className="flex items-center justify-center gap-2">
              {status === "submitting" ? (
                <>
                  <Clock3
                    size={16}
                    className="animate-spin"
                  />
                  <span>
                    Publishing...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Publish event
                  </span>

                  {/* Arrow is intentionally
                      on the SAME LINE */}
                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                  />
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}

/* ===============================================================
   SECTION HEADER
=============================================================== */

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#111014] font-mono text-[9px] font-bold text-white/55">
        {number}
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#111014]">
          {title}
        </h2>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-black/40">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ===============================================================
   FIELD
=============================================================== */

function Field({
  label,
  hint,
  required,
  icon,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#111014]">
          {icon && (
            <span className="text-black/30">
              {icon}
            </span>
          )}

          {label}

          {required && (
            <span className="text-[#7C3AED]">
              *
            </span>
          )}
        </span>

        {hint && (
          <span className="hidden text-[10px] text-black/25 sm:block">
            {hint}
          </span>
        )}
      </div>

      {hint && (
        <p className="mb-2 text-[10px] leading-4 text-black/30 sm:hidden">
          {hint}
        </p>
      )}

      {children}
    </label>
  );
}

/* ===============================================================
   INPUTS
=============================================================== */

const inputClass = `
  h-[52px]
  w-full
  rounded-[14px]
  border
  border-black/[0.10]
  bg-white
  px-4
  text-[13px]
  text-[#111014]
  outline-none
  transition-all
  placeholder:text-black/25
  hover:border-black/[0.16]
  focus:border-[#7C3AED]/50
  focus:ring-4
  focus:ring-[#7C3AED]/[0.07]
`;

const ticketInput = `
  h-[50px]
  w-full
  rounded-[13px]
  border
  border-black/[0.08]
  bg-[#FAFAFA]
  px-3.5
  text-[13px]
  text-[#111014]
  outline-none
  transition-all
  placeholder:text-black/25
  hover:border-black/[0.15]
  hover:bg-white
  focus:border-[#7C3AED]/45
  focus:bg-white
  focus:ring-4
  focus:ring-[#7C3AED]/[0.06]
`;

const mobileLabel =
  "mb-1.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-black/30";

const tableLabel =
  "text-[9px] font-bold uppercase tracking-[0.14em] text-black/30";

/* ===============================================================
   CHEVRON
=============================================================== */

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/30"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}