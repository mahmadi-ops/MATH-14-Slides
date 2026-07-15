#!/usr/bin/env bash
set -e

# TeX for latex-image (TikZ/pgfplots; PreTeXt compiles with xelatex),
# PDF->SVG conversion, cairo headers for PreFigure, node for MathJax labels
sudo apt-get update
sudo apt-get install -y --no-install-recommends \
  texlive-latex-extra texlive-pictures texlive-fonts-recommended texlive-xetex \
  pdf2svg libcairo2-dev pkg-config build-essential nodejs npm

# PreTeXt CLI and PreFigure
pip install pretext prefig

# Download PreFigure's MathJax engine (required to render diagram labels)
prefig init

echo "Setup complete. Build with:  pretext build slides  &&  pretext view slides"
