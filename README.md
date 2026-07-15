# Section 16.3 Slides — Path Independence, Conservative Fields, and Potential Functions

PreTeXt slideshow (reveal.js output) for Calculus IV, Section 16.3.

## Structure

- `source/main.ptx` — the slideshow source (8 slides: definitions, Theorems 1–3, four examples)
- `project.ptx` — PreTeXt CLI project manifest (one target: `slides`, format `revealjs`)
- `publication/publication.ptx` — publication settings
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on every push to `main`

Figures:

- Chain-rule dependency diagram: **PreFigure** (compiled to SVG at build time)
- Helix/line 3D figure: inline **JSXGraph** interactive (HTML output) side by side with a **TikZ/pgfplots** version (compiled to SVG for HTML; native in LaTeX output)

## Dev container

Open the repo in VS Code and accept the "Reopen in Container" prompt (or Command
Palette → "Dev Containers: Reopen in Container"). The container installs TeX,
`pdf2svg`, the PreTeXt CLI, PreFigure, and the PreTeXt-tools extension. First build
of the container takes several minutes (TeX Live is large). Then:

```sh
pretext build slides
pretext view slides
```

## Build locally

Requirements: Python 3.10+, a TeX distribution with `pgfplots` (e.g. TeX Live), and `pdf2svg` or `dvisvgm`.

```sh
pip install pretext prefig
pretext generate prefigure latex-image -t slides
pretext build slides
pretext view slides                   # opens the deck in your browser
```

Output lands in `output/slides/main.html`.

Note: `generated-assets/qrcode/interactive-helix-url.xml` is a committed stub. The
`prefigure` and `latex-image` extractors read a QR-code sidecar for the JSXGraph
interactive and fail if it is missing (`pretext generate qrcode` does not produce it
for revealjs targets in CLI 2.44). Keep the stub; if you add more interactives, add a
matching `<xml:id>-url.xml` stub for each.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo: Settings → Pages → Source → **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The deck will be at
   `https://<user>.github.io/<repo>/main.html`.
