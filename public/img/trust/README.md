# Trust / accreditation logos

The footer's "Trusted & Registered With" row (see
`src/components/layout/TrustMarks.tsx`) expects the official artwork for:

| Mark             | Suggested filename        |
| ---------------- | ------------------------- |
| NIDHI            | `nidhi.png` / `nidhi.svg` |
| Himachal Tourism | `himachal-tourism.png`    |
| MSME / Udyam     | `msme.png`                |
| TAAI             | `taai.png`                |

Until the client supplies them, each tile renders the body's name as plain
type. Do not substitute a redrawn, traced or generated lookalike: these marks
state that the company holds a registration, so anything other than the issued
artwork is a false claim.

To switch a tile over, drop the file here and fill in that entry's `logo`
(`src`, plus the artwork's real intrinsic `width`/`height`) in `TrustMarks.tsx`.
Transparent PNG or SVG, ideally at least 200px on the long edge — the tiles
render every mark at a uniform 36px height.
