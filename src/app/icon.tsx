import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The square mark (aeroplane + swoosh) cropped from the supplied lockup. */
function markDataUri() {
  const file = readFileSync(join(process.cwd(), "public", "logo-mark.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default function Icon() {
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
        <img src={markDataUri()} width={58} height={58} alt="" />
      </div>
    ),
    { ...size }
  );
}
