#!/usr/bin/env python3
"""
split-all-batches.py — Splits all downloaded 2x2 ChatGPT images into slides
and saves them to their correct batch folders automatically.

Naming convention for downloaded files (in your Downloads folder):
    batch-001.png, batch-002.png, ..., batch-016.png

Usage (run from the olympiadready-social directory):
    python scripts/split-all-batches.py
    python scripts/split-all-batches.py --input "C:/Users/akhil/Downloads"

The script:
  1. Scans the input folder for files named batch-NNN.* (any image extension)
  2. Finds the matching batch-NNN-topicname folder under social-content/handwritten/batches/
  3. Splits the 2x2 image into slide-1.png through slide-4.png
  4. Saves them directly into the batch folder
"""

import sys
import os
import re
import glob
import argparse
from PIL import Image

BATCHES_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "social-content", "handwritten", "batches"
)

DEFAULT_INPUT = os.path.join(os.path.expanduser("~"), "Downloads")


def find_batch_folder(batch_num: str) -> str | None:
    """Find the batch-NNN-topicname folder for a given batch number string like '001'."""
    pattern = os.path.join(BATCHES_DIR, f"batch-{batch_num}-*")
    matches = glob.glob(pattern)
    return matches[0] if matches else None


def split_2x2(input_path: str, output_folder: str) -> None:
    img = Image.open(input_path)
    w, h = img.size
    mid_x = w // 2
    mid_y = h // 2

    quadrants = [
        (0,     0,     mid_x, mid_y),   # slide-1  top-left
        (mid_x, 0,     w,     mid_y),   # slide-2  top-right
        (0,     mid_y, mid_x, h    ),   # slide-3  bottom-left
        (mid_x, mid_y, w,     h    ),   # slide-4  bottom-right
    ]

    os.makedirs(output_folder, exist_ok=True)

    for i, box in enumerate(quadrants, start=1):
        slide = img.crop(box)
        out_path = os.path.join(output_folder, f"slide-{i}.png")
        slide.save(out_path, "PNG")
        print(f"    slide-{i}.png  ({slide.width}x{slide.height})")


def main():
    parser = argparse.ArgumentParser(description="Split all batch images into slides.")
    parser.add_argument(
        "--input", "-i",
        default=DEFAULT_INPUT,
        help=f"Folder containing downloaded batch-NNN.png files (default: {DEFAULT_INPUT})"
    )
    args = parser.parse_args()

    input_dir = args.input
    if not os.path.isdir(input_dir):
        print(f"Error: input folder not found — {input_dir}")
        sys.exit(1)

    # Find all batch-NNN.* image files in the input folder
    image_extensions = ("*.png", "*.jpg", "*.jpeg", "*.webp")
    candidates = []
    for ext in image_extensions:
        candidates.extend(glob.glob(os.path.join(input_dir, ext)))

    batch_files = {}
    for f in candidates:
        name = os.path.basename(f)
        match = re.match(r"^batch-(\d{3})\.", name, re.IGNORECASE)
        if match:
            batch_num = match.group(1)
            batch_files[batch_num] = f

    if not batch_files:
        print(f"No files named batch-NNN.png found in: {input_dir}")
        print("Rename your downloaded files as: batch-001.png, batch-002.png, etc.")
        sys.exit(1)

    print(f"Found {len(batch_files)} batch image(s) in {input_dir}\n")

    ok = 0
    skipped = 0

    for batch_num in sorted(batch_files.keys()):
        src = batch_files[batch_num]
        batch_folder = find_batch_folder(batch_num)

        if not batch_folder:
            print(f"  [SKIP] batch-{batch_num} — no matching folder in batches/")
            skipped += 1
            continue

        folder_name = os.path.basename(batch_folder)
        print(f"  batch-{batch_num}  →  {folder_name}")
        split_2x2(src, batch_folder)
        ok += 1

    print(f"\nDone — {ok} batch(es) split, {skipped} skipped.")
    if ok > 0:
        print(f"Slides saved under: {BATCHES_DIR}")


if __name__ == "__main__":
    main()
