import Link from "next/link";
import { Mail } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { site } from "@/content/site";
import { footerNav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="type-eyebrow mb-4 text-amber-soft">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-slate-light transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-light">
              {site.footerTagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="flex min-w-0 max-w-full items-center gap-2 rounded-md border border-ink-border px-3.5 py-2 text-sm text-slate-light transition-colors hover:border-amber hover:text-paper"
              >
                <Mail aria-hidden className="size-4 shrink-0" />
                <span className="truncate">{site.email}</span>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ECOM BAND on LinkedIn"
                className="rounded-md border border-ink-border p-2 text-slate-light transition-colors hover:border-amber hover:text-paper"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </div>
            <p className="mt-6 font-mono text-xs tracking-wider text-slate-light/80 uppercase">
              {site.businessHours} · {site.markets}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 min-[400px]:grid-cols-2 sm:grid-cols-4">
            <FooterColumn title="Company" links={[...footerNav.company]} />
            <FooterColumn title="Services" links={[...footerNav.services]} />
            <FooterColumn title="Resources" links={[...footerNav.resources]} />
            <FooterColumn title="Legal" links={[...footerNav.legal]} />
          </div>
        </div>
      </Container>

      <div className="border-t border-ink-border">
        <Container className="flex flex-col items-start justify-between gap-2 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-light">
            © {new Date().getFullYear()} {site.legalName}. All rights
            reserved.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.18em] text-slate-light/70 uppercase">
            {site.tagline}
          </p>
        </Container>
      </div>
    </footer>
  );
}
