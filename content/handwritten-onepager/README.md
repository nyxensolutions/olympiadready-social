# Handwritten One-Pager Content

## Folder Structure

Each topic folder contains:
- `prompt.md` — Full ChatGPT/DALL·E image generation prompt
- `meta.json` — Caption hook, topic, grade, hashtag guidance

```
content/handwritten-onepager/
  01-pythagorean-triples/         ← Math
  02-divisibility-rules/          ← Math
  03-perfect-squares/             ← Math
  04-hcf-lcm-shortcuts/           ← Math
  05-percentage-mental-math/      ← Math
  06-area-perimeter-formulas/     ← Math
  07-clock-angle-problems/        ← Math / LR
  08-number-series-patterns/      ← Math / LR
  09-blood-relations-shortcut/    ← Logical Reasoning
  10-coding-decoding-patterns/    ← Logical Reasoning
  11-newton-3-laws/               ← Science / Physics
  12-human-digestive-system/      ← Science / Biology
  13-photosynthesis-summary/      ← Science / Biology
  14-simple-machines/             ← Science / Physics
  15-states-of-matter/            ← Science / Chemistry
  16-mirror-image-rules/          ← Logical Reasoning
  17-homophones-confused-pairs/   ← English
  18-prime-numbers-1-to-100/      ← Math
  19-ratio-proportion-tricks/     ← Math
  20-speed-distance-time/         ← Math
```

## How to Post One

1. **Generate image** — copy `prompt.md` contents into ChatGPT (GPT-4o image gen)
   - Aspect ratio: 16:9 landscape (1920×1080 or 1280×720)
   - OlympiadReady logo badge in top right
   - Download the image as PNG

2. **Schedule the post** — copy files into root of this folder:
   ```
   content/handwritten-onepager/2026-08-25.png   ← the generated image
   content/handwritten-onepager/2026-08-25.json  ← copy of that topic's meta.json
   ```
   Then commit and push before Monday 10 AM IST.

3. **The workflow** (`post-handwritten-onepager.yml`) reads the date,
   finds those two files, builds the caption from meta, and posts automatically.

## Caption Format (auto-generated)

The `buildOnepager(dateStr, meta)` function in `poster/lib/captions.js` uses:
- `meta.topic` — for caption body
- `meta.caption_hook` — used as opening line (rotating pool of 4 hooks)
- `meta.grade` — mentioned in caption

## Posting Schedule

Mondays at 10 AM IST (triggered by cron-job.org).
20 topics = ~5 months of Monday content if posted weekly.
