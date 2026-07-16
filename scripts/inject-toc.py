#!/usr/bin/env python3
"""Append the TOC-menu <script> to each built reveal deck (idempotent).

Usage: python3 scripts/inject-toc.py [output-dir ...]
With no args, processes every subdirectory of ./output.
Only touches the reveal deck entry files (those with Reveal.initialize),
not the GeoGebra applet frame pages."""
import sys, glob, os

TAG = '<script src="external/toc-menu.js"></script>'
dirs = sys.argv[1:] or [d for d in glob.glob("output/*") if os.path.isdir(d)]
for d in dirs:
    for html in glob.glob(os.path.join(d, "*.html")):
        s = open(html, encoding="utf-8").read()
        if "Reveal.initialize" not in s:      # skip applet frame pages
            continue
        if "toc-menu.js" in s:                # idempotent
            continue
        if "</body>" in s:
            s = s.replace("</body>", "  " + TAG + "\n</body>", 1)
            open(html, "w", encoding="utf-8").write(s)
            print("injected:", html)
