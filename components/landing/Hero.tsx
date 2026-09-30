"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Hero.module.css";
import { ArrowRight, ArrowUpRight, Check, Pause, Play, Ticket } from "lucide-react";

function RevealWord({ children, delay, accent = false }: {
  children: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span className={styles.wordMask}>
      <span
        className={`${styles.word} ${accent ? styles.accent : ""}`}
        style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      >
        {children}
      </span>
    </span>
  );
}

const benefits = ["Secure booking", "Instant tickets", "Unforgettable experiences"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!video) return;

    const syncMotion = () => {
      if (motionPreference.matches) {
        video.pause();
      } else {
        void video.play().catch(() => setIsPlaying(false));
      }
    };

    syncMotion();
    motionPreference.addEventListener("change", syncMotion);
    return () => {
      motionPreference.removeEventListener("change", syncMotion);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-[#100b1b] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/event-poster.jpg')] bg-cover bg-center">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/images/event-poster.jpg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => { setVideoFailed(true); setIsPlaying(false); }}
          className={`h-full w-full object-cover object-center ${videoFailed ? "hidden" : ""}`}
        >
          <source src="/images/event.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,7,24,0.88)_0%,rgba(12,7,24,0.62)_48%,rgba(12,7,24,0.25)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,7,24,0.95)_0%,transparent_45%,rgba(12,7,24,0.2)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[740px] max-w-[1360px] flex-col px-5 pb-7 pt-36 sm:min-h-[820px] sm:px-8 sm:pb-8 sm:pt-44 lg:min-h-[min(920px,100svh)] lg:px-12 lg:pt-48">
        <div className="flex flex-1 items-center pb-14 lg:pb-20">
          <div className="w-full">
            <div className={`${styles.eyebrow} mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md`}>
              <Ticket size={14} className="text-violet-300" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]">Your next experience starts here</span>
            </div>

            <h1 id="hero-heading" className="max-w-[900px] font-display text-[clamp(3.25rem,7.8vw,7rem)] font-medium leading-[0.99] tracking-[-0.065em]">
              <span className="sr-only">Find something worth showing up for.</span>
              <span aria-hidden="true">
                <RevealWord delay={140}>Find</RevealWord>{" "}
                <RevealWord delay={250}>something</RevealWord><br />
                <RevealWord delay={380}>worth</RevealWord>{" "}
                <RevealWord delay={490} accent>showing</RevealWord>
                <br className="hidden sm:block" />{" "}
                <RevealWord delay={620} accent>up</RevealWord>{" "}
                <RevealWord delay={720} accent>for.</RevealWord>
              </span>
            </h1>

            <p className={`${styles.description} mt-7 max-w-[440px] text-[15px] leading-relaxed text-white/75 sm:text-[17px]`}>
              The music. The people. The moments that stay with you.
              Discover your next event and be part of it with Tickety.
            </p>

            <div className={`${styles.actions} mt-9 flex flex-col gap-3 sm:flex-row sm:items-center`}>
              <Link href="/explore" className="group inline-flex min-h-14 items-center justify-center gap-7 rounded-full bg-violet-600 px-7 text-sm font-semibold text-white shadow-[0_8px_40px_rgba(124,58,237,0.3)] transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Explore events
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/organiser/events/new" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/30 bg-white/[0.05] px-7 text-sm font-medium backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Create an event
                <ArrowUpRight size={18} aria-hidden="true" className="text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.footer} flex flex-wrap items-end justify-between gap-6 border-t border-white/20 pt-6`}>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-200">Discover. Book. Experience.</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {benefits.map((benefit) => (
                <span key={benefit} className="flex items-center gap-1.5 text-[11px] text-white/70 sm:text-xs">
                  <Check size={13} className="text-violet-300" aria-hidden="true" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          {!videoFailed && (
            <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause background video" : "Play background video"} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/25 bg-black/20 py-2 pl-4 pr-3 text-[11px] text-white/80 backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <span>{isPlaying ? "Pause the moment" : "Play the moment"}</span>
              {isPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
