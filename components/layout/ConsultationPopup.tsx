"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle2, X } from "lucide-react";
import { ContactForm } from "@/components/blocks/ContactForm";
import { consultationPopup as config } from "@/content/popup";
import { site } from "@/content/site";

const STORAGE_KEY = "ecomband-consultation-popup";
const DAY_MS = 86_400_000;

type PopupRecord = { state: "dismissed" | "submitted"; at: number };

function readRecord(): PopupRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PopupRecord>;
    if (
      (parsed.state === "dismissed" || parsed.state === "submitted") &&
      typeof parsed.at === "number"
    ) {
      return parsed as PopupRecord;
    }
    return null;
  } catch {
    return null;
  }
}

function writeRecord(state: PopupRecord["state"]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    // storage unavailable — the popup simply won't be suppressed next visit
  }
}

/** True while a previous dismissal/submission is still inside its cooldown. */
function isSuppressed(): boolean {
  const record = readRecord();
  if (!record) return false;
  const cooldownDays =
    record.state === "submitted"
      ? config.submittedCooldownDays
      : config.dismissCooldownDays;
  return Date.now() - record.at < cooldownDays * DAY_MS;
}

function isExcluded(pathname: string): boolean {
  return config.excludedPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Consultation popup (lead capture).
 *
 * Trigger: first visit → visitor scrolls past `scrollThresholdPx` → after
 * `delayMs` the dialog opens (unless the route is excluded or another
 * overlay has locked body scroll, in which case it waits).
 *
 * Once closed or submitted, it stays hidden for the configured cooldown.
 * Accessible modal: focus trap, Escape to close, focus restored on close,
 * body scroll locked while open.
 */
export function ConsultationPopup() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submittedRef = useRef(false);
  const shownRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // 1. Arm the popup after the visitor has scrolled and the delay has elapsed.
  useEffect(() => {
    if (!config.enabled || isSuppressed()) return;

    let timer: number | undefined;
    const onScroll = () => {
      if (window.scrollY < config.scrollThresholdPx) return;
      window.removeEventListener("scroll", onScroll);
      timer = window.setTimeout(() => setArmed(true), config.delayMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // page may already be scrolled (reload / anchor link)

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  // 2. Open once armed, as soon as we're on an eligible route with no other
  //    overlay (e.g. the mobile menu) holding the body scroll lock.
  useEffect(() => {
    if (!armed || shownRef.current || isExcluded(pathname)) return;

    let retry: number | undefined;
    const tryOpen = () => {
      if (document.body.style.overflow === "hidden") {
        retry = window.setTimeout(tryOpen, 1500);
        return;
      }
      shownRef.current = true;
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    tryOpen();

    return () => {
      if (retry) window.clearTimeout(retry);
    };
  }, [armed, pathname]);

  const close = useCallback(() => {
    setOpen(false);
    writeRecord(submittedRef.current ? "submitted" : "dismissed");
    restoreFocusRef.current?.focus?.();
  }, []);

  // 3. Close if the visitor navigates (e.g. follows the Privacy Policy link).
  const openedOnRef = useRef<string | null>(null);
  useEffect(() => {
    if (open && openedOnRef.current === null) {
      openedOnRef.current = pathname;
    } else if (open && openedOnRef.current !== pathname) {
      close();
    }
    if (!open) openedOnRef.current = null;
  }, [open, pathname, close]);

  // 4. Body scroll lock, Escape, focus trap, initial focus.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // Focus the dialog heading first so screen readers announce context.
    const focusTimer = window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="consultation-popup"
          className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-popup-title"
            aria-describedby="consultation-popup-lead"
            initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl shadow-ink/40 sm:max-h-[calc(100dvh-3rem)] lg:flex-row"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close consultation popup"
              className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white lg:bg-ink-soft lg:text-paper lg:hover:bg-ink-border"
            >
              <X aria-hidden className="size-5" />
            </button>

            {/* Brand panel */}
            <div className="relative shrink-0 bg-ink px-6 py-6 text-paper lg:flex lg:w-[38%] lg:flex-col lg:justify-between lg:px-9 lg:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,rgba(224,141,38,0.18),transparent_70%)]"
              />
              <div className="relative">
                <p className="type-eyebrow text-amber">{config.eyebrow}</p>
                <h2
                  id="consultation-popup-title"
                  data-autofocus
                  tabIndex={-1}
                  // Programmatic focus target only — not interactive, so no ring.
                  style={{ outline: "none" }}
                  className="type-display mt-3 pr-10 text-2xl sm:text-3xl lg:pr-0 lg:text-[2rem]"
                >
                  {config.title}
                </h2>
                <p
                  id="consultation-popup-lead"
                  className="mt-3 hidden text-sm leading-relaxed text-slate-light lg:block"
                >
                  {config.lead}
                </p>
              </div>
              <ul className="relative mt-6 hidden space-y-3 lg:block">
                {config.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-paper/85">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="relative mt-6 hidden font-mono text-[0.65rem] tracking-[0.14em] text-slate-light uppercase lg:block">
                {site.businessHours} · {site.email}
              </p>
            </div>

            {/* Form panel */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:pt-14 lg:pb-8">
              <p className="mb-5 text-sm leading-relaxed text-slate lg:hidden">
                {config.lead}
              </p>
              <ContactForm
                source="popup"
                compact
                idPrefix="popup"
                onSuccess={() => {
                  submittedRef.current = true;
                  setSubmitted(true);
                  writeRecord("submitted");
                }}
                successActions={
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-lg border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-soft"
                  >
                    Close
                  </button>
                }
              />
              {!submitted && (
                <button
                  type="button"
                  onClick={close}
                  className="mt-4 text-xs font-medium text-slate underline-offset-2 hover:text-ink hover:underline"
                >
                  Not right now
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
