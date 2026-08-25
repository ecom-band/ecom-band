import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0D1321",
          color: "#F6F6F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ width: 72, height: 8, borderRadius: 4, backgroundColor: "#D98E28" }} />
          <div style={{ width: 72, height: 8, borderRadius: 4, backgroundColor: "#F6F6F2" }} />
          <div style={{ width: 48, height: 8, borderRadius: 4, backgroundColor: "#D98E28" }} />
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          ECOM BAND
        </div>
        <div style={{ marginTop: 16, fontSize: 36, color: "#98A1B3" }}>
          Building &amp; Growing E-Commerce Businesses
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 28,
            fontSize: 22,
            color: "#98A1B3",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          <span>Amazon</span>
          <span style={{ color: "#D98E28" }}>·</span>
          <span>Shopify</span>
          <span style={{ color: "#D98E28" }}>·</span>
          <span>Walmart</span>
          <span style={{ color: "#D98E28" }}>·</span>
          <span>eBay</span>
          <span style={{ color: "#D98E28" }}>·</span>
          <span>TikTok Shop</span>
        </div>
      </div>
    ),
    size,
  );
}
