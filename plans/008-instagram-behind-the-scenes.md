# Plan 008 (future, process design): A short agreed workflow for behind-the-scenes posts, tested once end to end

> **Executor instructions**: This plan is mostly an interview and a document.
> The only code is optional and reuses plan 007. Stop on any STOP condition.

## Status

- **Priority**: P3 (future)
- **Effort**: S (document), M with the optional Studio upload
- **Risk**: LOW
- **Depends on**: plans/007-social-post-drafts.md for the optional part only
- **Category**: direction
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issue**: https://github.com/Freddy-Nader/mns/issues/8

## Why this matters

Rehearsals, arrangements in progress and tours are good material, but only if posting them takes him minutes. The risk is building tooling before knowing what he will actually do, so this plan starts with what he does today.

## Current state

- `content/site.ts` lists no Instagram account. Confirm one exists before anything else.
- Plan 007 decides the voice in `docs/content/voz-redes.md`.
- The Sanity dataset is public (ADR-0007), so raw material (unpublished videos and photos) must **not** be uploaded to Sanity. Use a private place he already has, for example a Google Drive folder.

## Steps

### Step 1: Interview (operator with Mauricio, 20 minutes)

Write the answers into `docs/content/instagram.md`:
- What he films today, and on what device.
- Which of three formats he would do: a rehearsal reel (15 to 30 s), a carousel of an arrangement in progress (score photo, then a short clip, then the finished link), or concert-day stories.
- A frequency he can keep. Suggest one post a week and adjust to his answer.
- Who edits (see plan 009).

### Step 2: Write the flow in `docs/content/instagram.md`

He drops the raw clip plus a one-line note into a shared Drive folder. The operator, or plan 007's route if it gets a new "nota" input, turns it into a caption draft. He posts. Keep it to one page, headings without numbers, plain sentences.

### Step 3: One full test cycle

One real clip goes through the whole flow to a published post. Record what was slow in the same doc.

## Done criteria

- [ ] `docs/content/instagram.md` exists with formats, frequency and the flow, agreed with Mauricio
- [ ] one cycle done (operator confirms the post URL in the doc)

## STOP conditions

- He has no Instagram account or does not want one. Close issue #8 with that answer.

## Maintenance notes

- Only after two or three manual cycles is it worth adding a "material" input to plan 007's route. Evaluate then whether some of it belongs on `/encargos` or `/bio` (issue #8's last point). That is a design change, so it is the operator's call.
