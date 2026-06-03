# olympiadready-social

Daily Instagram posting bot for [@olympiad.ready](https://instagram.com/olympiad.ready). Runs entirely on GitHub Actions (free) — no server, no your-PC-on, no third-party scheduler.

## What it posts and when (all IST)

| Time | Slot | Format | Source file |
|---|---|---|---|
| 07:00 | Morning quiz | Single image | `content/quizzes/<today>/morning-question.png` |
| 11:00 | Daily Reel | Video | `content/reels/<today>.mp4` |
| 14:00 | Yesterday's answers | 2-image carousel | `content/quizzes/<yesterday>/{morning,evening}-answer.png` |
| 19:00 | Evening quiz | Single image | `content/quizzes/<today>/evening-question.png` |

GitHub Actions cron can drift 5–15 minutes during busy hours. That's normal.

## How overrides work

The bot uses **filename as the contract**. At post time:

- **If your file is in place at the expected path → it posts that.**
- **If it's missing → it auto-generates one** from `generators/quiz-bank.js` and the templates in `generators/`.

You can drop:

- `content/quizzes/2026-06-05/morning-question.png` — your own morning quiz image
- `content/quizzes/2026-06-05/evening-question.png` — your own evening quiz image
- `content/quizzes/2026-06-05/morning-answer.png` — your answer reveal (used in next-day 14:00 carousel)
- `content/quizzes/2026-06-05/evening-answer.png` — same
- `content/reels/2026-06-05.mp4` — your own Reel (1080×1920 vertical recommended)

Drop at least **30 min before post time** so the workflow doesn't race with your commit.

### Caption overrides

Drop a `content/quizzes/<date>/captions.json`:

```json
{
  "morning": { "caption": "Your custom morning text…", "hashtags": "#extra #tags" },
  "evening": { "caption": "Your custom evening text…", "hashtags": "#more" }
}
```

For the 2 PM answer carousel: `content/quizzes/<date>/answers.json`:

```json
{ "caption": "…", "hashtags": "…" }
```

For the Reel: `content/reels/<date>.json`:

```json
{ "caption": "…", "hashtags": "…" }
```

If a field is missing the bot falls back to a sensible default (see `poster/lib/captions.js`).

## Required GitHub Actions secrets

| Name | Source |
|---|---|
| `IG_APP_ID` | Meta app dashboard → Settings → Basic |
| `IG_APP_SECRET` | Meta app dashboard → Settings → Basic |
| `IG_ACCESS_TOKEN` | Long-lived user token (auto-refreshed weekly) |
| `IG_USER_ID` | Instagram Business Account numeric ID |
| `SECRETS_WRITE_PAT` | *(optional)* fine-grained PAT with **Secrets: read+write** on this repo. Lets the weekly refresh job rotate `IG_ACCESS_TOKEN` automatically. Without it you'll get a reminder issue every ~50 days and you paste the new token yourself. |

## Skipping a day

Two ways:

1. **Just before the slot**: add an entry to `state/posted.json` with a matching `slotKey` (e.g. `"2026-06-05-morning"`). The bot treats that slot as already done and skips silently.
2. **Disable a workflow** in the Actions tab if you want to pause a whole stream (e.g. no Reels for a week).

## Backfilling / catching up

Trigger any workflow manually from the **Actions** tab → pick the workflow → **Run workflow** button. The bot computes "today" / "yesterday" from the actual IST clock at run time, so manual runs target the current IST date.

To post a specific older date, set the file paths to that date and clear the matching `slotKey` from `state/posted.json` before triggering.

## Sanity-test before going live

```bash
DRY_RUN=1 npm run post:morning      # builds + commits content, skips the API call
```

## What gets committed

The bot **commits content back to this repo** on every run so:

- The public `raw.githubusercontent.com` URL it gives Instagram is reachable
- You have a permanent audit trail of exactly what was posted
- `state/posted.json` shows IG media IDs you can use to delete/edit later

Commits are made by `ig-bot <bot@olympiadready.com>`.

## Music in auto-generated Reels

The Reel generator mixes in royalty-free background music from `assets/music/`
(rotated by day-of-month). See `assets/music/README.md` for the four
recommended tracks and a 5-min one-time setup.

If `assets/music/` is empty, Reels are built silent — the bot keeps
working.

For your own dropped Reels, bake music in yourself before pushing — the bot
posts those files unmodified.

**Why not Instagram's music library?** Meta's Graph API doesn't expose it.
There is no way to attach IG-licensed tracks to API-posted Reels. Post
manually via the IG app on occasions where you want their music.

## Local development

```bash
npm install
npx playwright install chromium
DRY_RUN=1 IG_USER_ID=fake IG_ACCESS_TOKEN=fake npm run post:morning
```

The dry run will generate today's morning question image into `content/quizzes/<today>/` without calling Instagram.
