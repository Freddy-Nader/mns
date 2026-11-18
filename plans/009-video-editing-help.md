# Plan 009 (future, research): A tested editing workflow and reusable title, description and thumbnail templates for his videos

> **Executor instructions**: Research and templates, no site code. Stop on
> any STOP condition.

## Status

- **Priority**: P3 (future)
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (pairs well with plan 008's interview)
- **Category**: direction
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issue**: https://github.com/Freddy-Nader/mns/issues/9

## Why this matters

His YouTube videos are the main proof of his work. They feed the site's showcase (plan 004) and serve as free samples of his scores. Editing each one takes time, and inconsistent titles make the synced showcase look uneven, since synced videos show their YouTube title until he edits them in the Studio.

## Current state

- Channel `@mnadersch`, about 191 videos (`ajustes.videosEnCanal`).
- Synced videos display `tituloYoutube` when `obra` is empty (plan 003 mapping). A consistent title pattern such as `Obra · Compositor | Mauricio Nader` would let the sync fill `obra` and `autor` automatically later.
- Visual identity: `docs/design/tokens.md` (colours, three typefaces from ADR-0004).

## Steps

### Step 1: Find out what he edits today

Ask, as part of plan 008's interview: cuts, audio, titles, thumbnails, verticals for reels. Note the slowest step.

### Step 2: Compare at most three tools for that slowest step

For example Descript (cuts by text, audio cleanup), CapCut (vertical reframing, captions) and DaVinci Resolve (free, audio and colour). Compare cost, Spanish UI, phone support and learning time. Write `docs/content/video.md` with a recommendation.

### Step 3: Templates

In `docs/content/video.md`:
- A title pattern. Propose `Obra · Compositor | Mauricio Nader`. If he agrees, a later small plan can parse it in the sync (plan 004) to prefill `obra` and `autor`.
- A description template, in Spanish with an English block, with the score link when one exists.
- A thumbnail template using the tokens from `docs/design/tokens.md`, delivered as one editable file in a tool he can use (Canva or Figma). The design is the operator's call.

### Step 4: Test on one real video

**Verify**: one video published with the workflow and templates. Its URL goes in the doc.

## Done criteria

- [ ] `docs/content/video.md` with the tool recommendation, the templates and the tested video URL

## STOP conditions

- He prefers to keep editing as he does now. Record that and close issue #9.

## Maintenance notes

- If the title pattern is adopted, open a follow-up to parse it in `studio/scripts/sync-videos.ts`.
