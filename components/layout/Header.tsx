"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/content/nav";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Every page hero is dark ink — the transparent header needs light text
  // until it gains its paper background on scroll (or when the menu opens).
  const onDark = !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onDark
          ? "bg-transparent"
          : "border-b border-ink/10 bg-paper/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 min-[400px]:px-5 sm:px-8 md:h-[4.5rem] 2xl:max-w-7xl">
        <Logo dark={onDark} />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {mainNav
            .filter((item) => item.label !== "Home")
            .map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={servicesOpen}
                    onFocus={() => setServicesOpen(true)}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.8rem] font-medium whitespace-nowrap transition-colors xl:px-3 xl:text-sm",
                      onDark
                        ? pathname.startsWith("/services")
                          ? "text-paper"
                          : "text-slate-light hover:text-paper"
                        : pathname.startsWith("/services")
                          ? "text-ink"
                          : "text-slate hover:text-ink",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </Link>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 transition-all duration-200",
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div
                      className="rounded-xl border border-ink/10 bg-paper p-2 shadow-xl shadow-ink/10"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget))
                          setServicesOpen(false);
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3.5 py-2.5 text-sm text-slate transition-colors hover:bg-paper-soft hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <div className="mt-1 border-t border-ink/10 px-3.5 py-2.5">
                        <Link
                          href="/services"
                          className="text-sm font-semibold text-amber-deep hover:underline"
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-2.5 py-2 text-[0.8rem] font-medium whitespace-nowrap transition-colors xl:px-3 xl:text-sm",
                    onDark
                      ? pathname === item.href
                        ? "text-paper"
                        : "text-slate-light hover:text-paper"
                      : pathname === item.href
                        ? "text-ink"
                        : "text-slate hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" className="px-4 py-2.5 whitespace-nowrap xl:px-5">
            Get Started
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn(
            "-mr-2 flex size-11 items-center justify-center rounded-md lg:hidden",
            onDark ? "text-paper" : "text-ink",
          )}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          // absolute (not fixed): the header's backdrop-blur makes it the
          // containing block for fixed descendants, which would collapse this.
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-paper px-4 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] min-[400px]:px-5 sm:px-8 md:h-[calc(100dvh-4.5rem)] lg:hidden"
        >
          <ul className="mx-auto max-w-3xl space-y-1">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-lg font-semibold text-ink md:text-xl"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 space-y-0.5 border-l border-ink/10 pl-5 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-sm text-slate md:text-base"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-6 max-w-3xl">
            <ButtonLink href="/contact" className="w-full">
              Get Started
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
