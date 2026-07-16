# Improved Line Integrals slides — drop-in PreTeXt files

Two files, mirroring your repo layout:

- `source/sections/sec-line-integrals.ptx` — replaces the section fragment
- `assets/custom.css` — replaces the deck stylesheet

## What changed

**Content (`sec-line-integrals.ptx`)** — 14 slides:

- Wide equation chains split with `<md>`/`<mrow>` so reveal doesn't clip them
  ("From sum to integral", "Solving for the upper limit b").
- "Speed along the helix" + "Density along the curve" merged into one slide
  ("Speed and density along the helix") — both were short, and together they
  are one step of the plan.
- The Plotly `helix-wire.html` interactive replaced by a **static TikZ figure**
  (`li-helix-static`): quarter-turn helix, dashed shadow on z = 0, labeled
  endpoints. You can delete `assets/helix-wire.html` and the
  `generated-assets/qrcode/helix-wire-url.xml` stub (harmless if kept).
- New closing slide: "Recap: the recipe" — the key formula plus the four moves.
- Titles retuned as parallel chapter-style noun phrases; copy tightened.

**Style (`custom.css`)** — an editorial, book-like dark look:

- Deep warm near-black ground (#16130f), paper-white type, one gold accent
  (#b68235) used for rules, list markers, links and labels — never fills.
- Cormorant Garamond headings over Lora body (Google Fonts `@import`;
  falls back to Georgia/Times offline).
- Callout boxes are hairline-bordered and unfilled; headings are gold
  uppercase labels.
- Compiled SVG figures keep their dark ink, so they sit on a paper "plate"
  (light mat + hairline edge) — this also covers the path-independence
  section's PreFigure diagram and GeoGebra iframes.
- Figure 2 legend colors lightened to stay readable on the dark ground.

## Install

```sh
cp source/sections/sec-line-integrals.ptx  <repo>/source/sections/
cp assets/custom.css                       <repo>/assets/
pretext generate latex-image -t slides || true
pretext build slides            # or: main / line-integrals
```

Notes for your setup (from the repo's CLAUDE.md):

- MathJax 2.7.8: no `\textcolor` used anywhere — coloring stays in CSS.
- Macros `\vr`, `\vv` come from `docinfo.ptx`, unchanged.
- New `latex-image` figure needs no qrcode stub (stubs are only for
  `<interactive>` elements).
- The one removed interactive was `helix-wire`; everything else in
  `sec-path-independence.ptx` is untouched and still builds.
