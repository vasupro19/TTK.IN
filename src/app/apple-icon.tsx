import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // iOS masks the corners itself, so this is a full-bleed cream tile with the
  // mark centred — matching the artwork's own ground rather than fighting it.
  const file = readFileSync(join(process.cwd(), "public", "logo-mark.png"));
  const src = `data:image/png;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdfcfb",
        }}
      >
        <img src={src} width={152} height={152} alt="" />
      </div>
    ),
    { ...size }
  );
}
