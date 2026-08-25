import Link from "next/link";
import {
  ArrowRight,
  Package,
  Truck,
  Tag,
  ShieldCheck,
  Store,
  Boxes,
  ShoppingCart,
  Gavel,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";
import { platformAccent } from "@/lib/platform";
import { cn } from "@/lib/cn";
import { PlatformBadge } from "./PlatformBadge";
import { ImagePlaceholder, type ImageSpec } from "./ImagePlaceholder";

const serviceIcon: Record<string, LucideIcon> = {
  "amazon-fba-wholesale": Package,
  "amazon-fbm-wholesale": Truck,
  "amazon-private-label": Tag,
  "amazon-account-reinstatement": ShieldCheck,
  "shopify-private-label": Store,
  "shopify-dropshipping": Boxes,
  "walmart-wholesale": ShoppingCart,
  "ebay-wholesale": Gavel,
  "tiktok-shop": Clapperboard,
};

export function ServiceCard({
  service,
  blurb,
  image,
  imageId,
}: {
  service: Service;
  /** "card" = short homepage blurb, "overview" = fuller services-page copy */
  blurb?: "card" | "overview";
  /** Optional thumbnail spec — renders a media strip above the card body. */
  image?: ImageSpec;
  imageId?: string;
}) {
  const Icon = serviceIcon[service.slug] ?? Package;
  const accent = platformAccent[service.platform];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-ink/8 bg-white shadow-[0_1px_2px_rgba(13,19,33,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/8",
        image ? "overflow-hidden p-0" : "p-6 sm:p-7",
      )}
    >
      {/* amber band sweep along the top edge */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0 z-10 h-0.5 origin-left scale-x-0 rounded-full bg-amber transition-transform duration-300 group-hover:scale-x-100",
          image ? "inset-x-0 rounded-none" : "inset-x-6",
        )}
      />
      {image && (
        <div className="border-b border-ink/8 bg-paper-soft/60 p-3 pb-0">
          <ImagePlaceholder
            spec={image}
            id={imageId}
            compact
            className="rounded-b-none border-b-0"
          />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col", image && "p-6 sm:p-7")}>
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className={`inline-flex size-11 items-center justify-center rounded-lg text-ink ${accent.tile}`}
        >
          <Icon className="size-5" />
        </span>
        <PlatformBadge platform={service.platform} />
      </div>
      <h3 className="type-display-sub mt-5 text-xl">{service.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
        {blurb === "overview" ? service.overview : service.cardBlurb}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-deep">
        Learn More
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
      </div>
    </Link>
  );
}
