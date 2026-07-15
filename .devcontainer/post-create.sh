#!/usr/bin/env bash
set -e

# TeX for latex-image (TikZ/pgfplots) + PDF->SVG conversion
sudo apt-get update
sudo apt-get install -y --no-install-recommends \
  texlive-latex-extra texlive-pictures pdf2svg

# PreTeXt CLI and PreFigure
pip install pretext prefig

echo "Setup complete. Build with:  pretext build slides  &&  pretext view slides"
