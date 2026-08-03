# Assets Required — SecureOps Website

Graphics referenced in the code that don't exist yet. Nothing fake is shipped in
their place — each gap uses the site's existing `img: null` fallback convention
(see `techStack`, `team`, and `processSteps` in `src/App.jsx`) until the real
file lands, and the code marks the spot with an `ASSET SLOT` comment.

**Shared conventions for every prompt below** — match the existing
`svc-*.png` / `why-*.png` icon set so the new icons read as the same family:

- Isometric soft-3D render, matte-glossy hybrid finish, one soft studio light
  from the upper left, gentle contact shadow beneath — no metal reflections
- Palette strictly: matte violet `#6C5CA8` as the primary body, translucent
  glossy cyan `#79D7ED` as the secondary/accent element, no other colours
- Transparent background, no text, no logos, no people
- Centered in frame with even margins, rounded organic edges, no hard corners
- Export at 512×512 PNG-24 with alpha, then compress to under 80KB per file
  (the current icon set runs 130–245KB each — don't repeat that on new ones)

---

## Process-flow icons (4) — v2, matched to the hero render

| | |
|---|---|
| **Filenames** | `public/images/icons/proc-audit.png`, `proc-plan.png`, `proc-launch.png`, `proc-manage.png` |
| **Where they appear** | `#process` section — inside the 88×88 white tile of each step in the "how it works" flow, above a small teal step-number badge |
| **Current fallback** | The step number (01–04) rendered large and pale inside the tile — see `.process-flow-icon-fallback` in `src/index.css` |
| **Style note** | v1 (below, kept for reference) used the matte-violet soft-3D family shared with the service icons. This v2 set instead matches the dark glass / neon-cyan look of the hero video (`public/video/hero-cyber.mp4`) — each icon is a small self-contained dark panel, so it drops onto the white tile as a glowing "screen" rather than a plain line icon. |

**Prompt (run 4 times, swap only the bolded subject):**

```
A small rounded-square badge, isometric 3/4 view, floating on a fully
transparent background. The badge itself is a deep navy glass panel
(gradient from #0B2537 to #020D14) with a faint circuit-board pattern
etched into its surface and a soft dark contact shadow beneath it. Centered
inside the panel: a crisp, glowing neon-cyan (#5FE3CE to #7EEDD9) line-art
icon of **[SUBJECT]**, rendered as smooth glass tubing with rounded caps —
no sharp right angles anywhere, every line and corner gently filleted.
Soft outer glow around the cyan linework, subtle inner highlight, high
contrast against the dark panel. No text, no logos, no additional colors
besides navy and cyan. Clean, sharp, high-tech cybersecurity aesthetic,
3D render, 8k, transparent PNG background around the rounded badge.

[SUBJECT] per icon:
1. proc-audit  — a magnifying glass scanning over a stack of server plates,
   one thin horizontal scan-line pulsing across the lens
2. proc-plan   — a layered clipboard/blueprint sheet with a checkmark and a
   small gear resting on its corner
3. proc-launch — an upward arrow rising out of a rounded cloud outline,
   with a short glowing trail beneath it
4. proc-manage — a shield with a radar pulse ring at its center and a small
   gear half-overlapping its lower edge
```

<details>
<summary>v1 — matte-violet soft-3D style (superseded, kept for reference)</summary>

```
A single soft-3D icon centered on a transparent background, isometric 3/4
view at a consistent 30-degree angle, lit from the upper left with one soft
studio light. Subject: **[SUBJECT]**. Matte violet (#6C5CA8) primary body
with a translucent glossy cyan (#79D7ED) secondary element, rounded organic
edges, no hard corners, subtle contact shadow beneath. Clean minimal shape
language, high optical weight in the center of the frame with even margins
on all sides. No text, no background, no gradient backdrop, no outlines.
3D render, product-icon style, 8k, transparent PNG.

[SUBJECT] per icon:
1. proc-audit  — a rounded magnifying glass hovering over a small stack of
   server plates, one glowing cyan scan-line crossing the lens
2. proc-plan   — a layered blueprint sheet curling slightly at one corner,
   with a floating checkmark and a small compass/ruler resting on top
3. proc-launch — a rounded rocket tilted at takeoff angle with a soft cyan
   exhaust trail curling beneath it
4. proc-manage — a shield with a small radar/pulse ring inside it and a
   gear half-overlapping its lower edge
```
</details>

---

## Story banner illustration — ✅ done

| | |
|---|---|
| **Filename** | `public/images/story-illustration.png` |
| **Where it appears** | The full-bleed violet band right after `#services` ("אנחנו לא רק ספק IT...") — `.story-visual`, on the right side of that section (text sits on the left, opposite the hero's convention, by request) |
| **Status** | Generated, background-removed, and wired in. The decorative laptop-in-a-circle mark from the original layout was cut per request — no longer part of this section. |

---

## Contact band illustration — ✅ done (one caveat)

| | |
|---|---|
| **Filename** | `public/images/contact-illustration-v2.png` (renamed from the original `contact-illustration.png` when it was mirrored, per the immutable-cache rule — same filename would leave visitors who'd already loaded it stuck on the un-mirrored bytes for a year) |
| **Where it appears** | The violet "בואו נהפוך את אתגרי ה-IT שלכם" band at the bottom — `.contact-art`, under the heading beside the form |
| **Status** | Generated, cut out, wired in, mirrored to face the form. 640×541, 33KB. |
| **Caveat** | The supplied JPEG used a painted-on checkerboard to fake transparency, and the circle has a semi-transparent purple glow ring blended into it. That ring's colour sits between the checker and the artwork, so no threshold separates it — a faint speckled arc survives on the circle's outer edge. Removing it geometrically eats the desk and chair (thinner than the arc is wide) or breaks the cyan icon strokes. **If it bothers you: regenerate the source with a solid flat background colour instead of transparency**, and it cuts perfectly. |

**Prompt:**

```
A clean flat-vector illustration, transparent background, in the modern
corporate-SaaS illustration style (think unDraw or Storyset). A friendly
support professional wearing a headset sits at a simple desk, one hand
raised in a welcoming gesture, smiling toward the viewer. Their clothing
uses a soft violet (#8B7BC9) and deep violet (#4E4483) palette with a
bright cyan (#79D7ED) accent on the headset and one clothing detail. Behind
and around them, floating at slight angles: a large rounded chat/message
bubble outline in cyan (#79D7ED), a small envelope icon, and a small phone
handset icon, all in clean flat cyan outline. A large abstract circle in
mid-violet (#6C5CA8) sits behind the figure as a backdrop shape. Minimal
geometric shapes, smooth rounded edges, no gradients besides one subtle
shadow crescent on the circle, no background scenery, no text, no logos.
Warm, approachable, professional mood. Vector illustration, flat design,
transparent PNG.
```

Already wired in — `<img src="/images/contact-illustration-v2.png" ...>` in the contact section of `src/App.jsx`.

---

## Team headshots — ✅ done

| | |
|---|---|
| **Filenames** | `public/images/team/daniel.jpg`, `public/images/team/dvir.jpg` |
| **Where they appear** | `#team` section — the large circular photo in each alternating profile row (`.team-profile-photo`), 280px on desktop |
| **Status** | Both real photos received and wired in. |

**What to ask for, if briefing a photographer:** headshot, chest-up, looking at camera, relaxed confident expression, soft key light at 45°, clean seamless light-grey or white background, shallow depth of field, business-casual attire, square crop with generous headroom (the frame is a circle, so keep the subject centered with room on all sides — don't crop tight to the face).

To wire in once received: set `photo: '/images/team/daniel.jpg'` (etc.) on the matching entry in the `team` array in `src/App.jsx` — the field already exists and is handled.

---

## sitemap.xml — regenerate when articles change

`public/sitemap.xml` is a static file generated from the `articles` array in `src/App.jsx`, not something the app keeps in sync on its own. Whenever an article is added or removed, rerun the generator (a script under this session's scratchpad — reconstitute it if it's gone: read the `id` fields out of `articles`, emit one `<url>` per slug at `https://secureops.co.il/blog/<id>`, plus the homepage) and rebuild before deploying, or the sitemap will list articles that no longer exist / omit new ones.

---

## Priority

| Asset | Urgency | Why |
|---|---|---|
| Team headshots | ✅ done | Both founders' real photos are live |
| Contact band illustration | ✅ done | Live in `.contact-art` — see caveat above about the faint edge arc |
| Story banner illustration | ✅ done | Live in `.story-visual` |
| Process-flow icons | 🟡 medium | The section works today with numbered placeholders; icons are a polish pass, not a blocker |
