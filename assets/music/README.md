# Music for auto-generated Reels

The reel generator (`generators/generate-reel.js`) looks in this folder for
audio files and mixes one in by day-of-month rotation. If this folder is
empty or missing, reels are built **silent** — the bot keeps working, just
without music.

## Recommended tracks (upbeat / inspirational, royalty-free)

These four Pixabay tracks fit OlympiadReady's brand. All are licensed
**royalty-free for commercial use, no attribution required**, under the
[Pixabay Content License](https://pixabay.com/service/license-summary/).

| File name to save as | Search on Pixabay | Vibe |
|---|---|---|
| `track-01-uplift.mp3` | "uplifting corporate motivation" | Bright, builds energy |
| `track-02-success.mp3` | "successful inspiring background" | Confident, forward-driving |
| `track-03-future.mp3` | "future technology upbeat" | Modern, tech-positive |
| `track-04-positive.mp3` | "positive happy energetic" | Light, cheerful |

## How to download (5 min, one-time)

1. Go to **https://pixabay.com/music/**
2. In the search bar, type one of the search phrases above (e.g. *"uplifting
   corporate motivation"*).
3. Filter the results: **Genre: Corporate** or **Beats**; **Mood: Bright /
   Inspiring / Uplifting**.
4. Pick a track you like (preview by clicking play). Tracks **30–90 seconds
   long** are ideal — we only use the first 10s anyway.
5. Click **Download** (you may need to sign up for a free Pixabay account on
   the first download).
6. Save the file into this `assets/music/` folder with the file name from the
   table above (e.g. `track-01-uplift.mp3`).
7. Repeat for the other three tracks.

You only need **at least 1 file** for music to start working — but having 4+
means the Reel music rotates and feels less repetitive across the month.

## File naming rule

- Files are picked alphabetically and rotated by day-of-month.
- Use the names from the table for predictable rotation.
- Supported extensions: `.mp3`, `.m4a`, `.wav`.

## How the audio is mixed

In `generate-reel.js`:

- Trimmed to exactly 10 seconds (matching the video).
- 0.5s fade-in and 0.5s fade-out.
- Volume scaled to ~40% so any future voiceover or strong text would still
  read clearly over the top.
- Encoded as AAC 128 kbps, 44.1 kHz, stereo — IG's recommended Reel audio.

## What about user-dropped Reels?

If you drop your own `content/reels/<date>.mp4`, the bot posts that file
**unmodified** — its audio (or lack of it) is whatever you encoded in. Mix
your own music in beforehand (CapCut, iMovie, DaVinci Resolve, etc.) and use
royalty-free or owned tracks to avoid copyright takedowns.

## Why not Instagram's licensed music?

The Graph API doesn't expose Instagram's music library. There is no API call
that attaches a track from IG's catalog to a posted Reel. This is a Meta
restriction, not a bot bug. If you want IG-music Reels, post those manually
via the IG app on your phone for special occasions; let the bot handle the
daily cadence with the Pixabay tracks.
