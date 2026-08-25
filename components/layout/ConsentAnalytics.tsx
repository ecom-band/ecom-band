"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const CONSENT_KEY = "ecomband-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie banner + consent-gated GA4.
 * No tracking scripts load before the visitor grants consent.
 * GA only loads at all when NEXT_PUBLIC_GA_ID is configured.
 */
export function ConsentAnalytics() {
  const [consent, setConsent] = useState<Consent>("denied");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // storage unavailable — treat as session-only choice
    }
    setConsent(value);
  };

  return (
    <>
      {GA_ID && consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-w-xl rounded-xl border border-ink/15 bg-paper p-5 shadow-2xl shadow-ink/20"
        >
          <p className="text-sm leading-relaxed text-slate">
            We use cookies for analytics to understand how visitors use our
            site. See our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-amber-deep underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-lg border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper-soft"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
