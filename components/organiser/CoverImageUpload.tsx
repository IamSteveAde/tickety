"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

export default function CoverImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] = useState("");

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  async function handleFileSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    // Tickety event artwork must be square (1:1).
    // Validate the actual image dimensions before uploading so
    // portrait/landscape artwork can never reach the server.
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. Please upload an image under 5MB.");
      e.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    try {
      const dimensions = await new Promise<{
        width: number;
        height: number;
      }>((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
          resolve({
            width: image.naturalWidth,
            height: image.naturalHeight,
          });
          URL.revokeObjectURL(imageUrl);
        };

        image.onerror = () => {
          URL.revokeObjectURL(imageUrl);
          reject(new Error("We couldn't read this image. Please try another file."));
        };

        image.src = imageUrl;
      });

      if (dimensions.width !== dimensions.height) {
        setError(
          `Your flyer must be square (1:1). This image is ${dimensions.width} × ${dimensions.height}px. Please upload a square flyer, such as 500 × 500px.`
        );
        e.target.value = "";
        return;
      }

      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ?? "Upload failed"
        );
      }

      onChange(data.url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed"
      );

      setPreviewUrl(null);
      onChange("");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setError("");

    onChange("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openFilePicker() {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  }

  const displayUrl =
    previewUrl ?? value;

  return (
    <div className="w-full">
      {/* =====================================================
          UPLOADED IMAGE
      ===================================================== */}
      {displayUrl ? (
        <div className="relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#0B0910] shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-[15%] -top-[25%] h-[300px] w-[300px] rounded-full bg-[#7C3AED]/10 blur-[90px]" />

            <div className="absolute -bottom-[25%] -right-[15%] h-[280px] w-[280px] rounded-full bg-[#9333EA]/[0.06] blur-[90px]" />
          </div>

          {/* =================================================
              HEADER
          ================================================= */}
          <div className="relative flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#25D366]/10">
                <CheckCircle2
                  size={14}
                  className="text-[#5EEA91]"
                />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-white">
                  Event flyer
                </p>

                <p className="mt-0.5 text-[8px] text-white/30">
                  1:1 square artwork
                </p>
              </div>
            </div>

            {!uploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/40 transition-all hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* =================================================
              IMAGE PREVIEW

              IMPORTANT:
              object-contain = NEVER CROP THE ARTWORK
          ================================================= */}
          <div className="relative flex min-h-[260px] w-full items-center justify-center bg-[#111014] p-5 sm:min-h-[340px] sm:p-8">
            {/* Checkerboard-ish backdrop */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(255,255,255,.8) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(255,255,255,.8) 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, rgba(255,255,255,.8) 75%),
                  linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.8) 75%)
                `,
                backgroundSize: "24px 24px",
                backgroundPosition:
                  "0 0, 0 12px, 12px -12px, -12px 0px",
              }}
            />

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl}
              alt="Event flyer preview"
              className="relative z-10 block h-auto max-h-[520px] w-auto max-w-full object-contain object-center drop-shadow-[0_25px_45px_rgba(0,0,0,0.4)]"
            />

            {/* Uploading overlay */}
            {uploading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#09070F]/75 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06]">
                    <Loader2
                      size={22}
                      className="animate-spin text-[#C084FC]"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-white">
                    Uploading image...
                  </p>

                  <p className="mt-1 text-[10px] text-white/35">
                    Preparing your event artwork
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}
          <div className="relative flex flex-col gap-3 border-t border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-2">
              <Sparkles
                size={11}
                className="text-[#A78BFA]"
              />

              <p className="text-[9px] text-white/35">
                Square flyer · 1:1 · 500 × 500px recommended
              </p>
            </div>

            {!uploading && (
              <button
                type="button"
                onClick={openFilePicker}
                className="text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#C4B5FD] transition-colors hover:text-white sm:text-right"
              >
                Replace image
              </button>
            )}
          </div>
        </div>
      ) : (
        /* =====================================================
           EMPTY UPLOAD STATE
        ===================================================== */
        <button
          type="button"
          onClick={openFilePicker}
          className="group relative flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-black/[0.12] bg-white px-6 text-center transition-all duration-300 hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/[0.015] hover:shadow-[0_20px_60px_rgba(124,58,237,0.06)] sm:min-h-[340px]"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/[0.04] blur-[70px] transition-all duration-500 group-hover:bg-[#7C3AED]/[0.08]" />

          {/* Decorative lines */}
          <div className="pointer-events-none absolute inset-6 rounded-[22px] border border-black/[0.035]" />

          {/* Upload icon */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#111014] text-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
            <UploadCloud
              size={23}
              strokeWidth={1.7}
            />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]">
              <ImagePlus
                size={10}
                strokeWidth={2.5}
              />
            </span>
          </div>

          {/* Copy */}
          <div className="relative mt-6">
            <p className="font-display text-lg font-semibold tracking-[-0.025em] text-[#111014]">
              Add your event artwork
            </p>

            <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-black/40">
              Upload a square flyer for your event.
              Your artwork must be 1:1 to display correctly.
            </p>
          </div>

          {/* File types */}
          <div className="relative mt-5 flex items-center gap-2">
            <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[9px] font-medium text-black/35">
              JPG
            </span>

            <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[9px] font-medium text-black/35">
              PNG
            </span>

            <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[9px] font-medium text-black/35">
              WEBP
            </span>
          </div>

          <p className="relative mt-3 text-[9px] font-medium text-black/30">
            1:1 square required · 500 × 500px recommended · Maximum 5MB
          </p>
        </button>
      )}

      {/* =====================================================
          FILE INPUT
      ===================================================== */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* =====================================================
          ERROR
      ===================================================== */}
      {error && (
        <div className="mt-3 flex items-start gap-2.5 rounded-[14px] border border-red-500/15 bg-red-500/[0.05] px-3.5 py-3">
          <X
            size={13}
            className="mt-0.5 shrink-0 text-red-500"
          />

          <p className="text-xs leading-5 text-red-600">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}