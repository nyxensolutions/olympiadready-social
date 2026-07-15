#!/usr/bin/env python3
"""
split-slides.py — Splits a 2×2 ChatGPT-generated image into 4 individual slides.

Usage:
    python split-slides.py <input_image> [output_folder]

Examples:
    python split-slides.py ~/Downloads/photosynthesis.png
    python split-slides.py ~/Downloads/photosynthesis.png social-content/handwritten/batches/batch-001-photosynthesis/

If output_folder is omitted, slides are saved in the same folder as the input image.
Output files: slide-1.png, slide-2.png, slide-3.png, slide-4.png
"""

import sys
import os
from PIL import Image


def split_2x2(input_path: str, output_folder: str | None = None) -> None:
    img = Image.open(input_path)
    w, h = img.size

    mid_x = w // 2
    mid_y = h // 2

    # 2×2 grid — top-left, top-right, bottom-left, bottom-right
    quadrants = [
        (0,     0,     mid_x, mid_y),   # slide-1  top-left
        (mid_x, 0,     w,     mid_y),   # slide-2  top-right
        (0,     mid_y, mid_x, h    ),   # slide-3  bottom-left
        (mid_x, mid_y, w,     h    ),   # slide-4  bottom-right
    ]

    out_dir = output_folder or os.path.dirname(os.path.abspath(input_path))
    os.makedirs(out_dir, exist_ok=True)

    for i, box in enumerate(quadrants, start=1):
        slide = img.crop(box)
        out_path = os.path.join(out_dir, f"slide-{i}.png")
        slide.save(out_path, "PNG")
        print(f"  Saved {out_path}  ({slide.width}×{slide.height})")

    print(f"\nDone — 4 slides saved to: {out_dir}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    input_path  = sys.argv[1]
    output_folder = sys.argv[2] if len(sys.argv) > 2 else None

    if not os.path.isfile(input_path):
        print(f"Error: file not found — {input_path}")
        sys.exit(1)

    split_2x2(input_path, output_folder)
