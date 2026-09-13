import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  const file = readFileSync(join(process.cwd(), "public", "logo-light.png"));
  const logo = `data:image/png;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0e3a33 0%, #146656 58%, #23a184 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={logo} width={328} height={140} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.1, maxWidth: 960 }}>
            Your next journey starts here
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              marginTop: 20,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Custom holidays across Himachal, Kashmir, Ladakh, Spiti, Kerala and beyond — planned by
            real travel experts.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 22,
            color: "rgba(255,255,255,0.72)",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.domain}</div>
          <div style={{ display: "flex" }}>{siteConfig.phoneDisplay}</div>
          <div style={{ display: "flex" }}>Verified stays · Transparent pricing</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
