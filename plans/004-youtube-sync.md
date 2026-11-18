# Plan 004: New YouTube uploads appear in the Studio and on the site within 12 hours, with no API key

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report. Do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: confirm plan 003 is DONE in `plans/README.md`,
> and that `lib/cms/map.ts` exports `showcase` and `youtubeId`. If not, STOP.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW (only creates new `video` documents. It never edits or deletes what Mauricio wrote)
- **Depends on**: plans/003-site-reads-from-sanity.md
- **Category**: direction
- **Planned at**: commit `4576c4b`, 2026-11-17
- **Issues**: https://github.com/Freddy-Nader/mns/issues/5, https://github.com/Freddy-Nader/mns/issues/6

## Why this matters

The video showcase is a hand-picked list. Every new upload needs someone to add it. With this plan a job that runs every 12 hours copies new uploads into Sanity as `video` documents with `estado: "auto"`. Mauricio can then pin, hide or retitle them in the Studio, and pick them as a score's recording (issue #6). Because the videos land in Sanity, the score picker sees synced videos too, and the Sanity webhook from plan 003 refreshes the site on its own.

## Design decisions (already made, do not revisit)

- **Source**: the channel's public RSS feed for **long-form uploads only**:
  `https://www.youtube.com/feeds/videos.xml?playlist_id=UULF<channel id without its leading "UC">`
  The `UULF` prefix excludes Shorts. It is community-documented, not official, so the job logs and exits 0 when the feed returns non-200 (it had intermittent 404s in Dec 2025) and simply tries again at the next run. The feed returns the latest ~15 uploads, which is enough because it runs every 12 hours.
- **No API key.** Nothing YouTube-related is a secret.
- **Runner**: a GitHub Actions `schedule` (every 12 hours), because Vercel Hobby cron runs only once a day. The repo is public, so Actions minutes are free.
- **Write rules**: create a doc only when no `video` doc already has that YouTube id in its `youtube` field. Use `_id: "video-<id>"` with `createIfNotExists`. Set `tituloYoutube`, `publicado`, `posterHD`, `estado: "auto"`, `youtube: "https://www.youtube.com/watch?v=<id>"`. **Never** patch or delete existing docs.
- **posterHD**: `HEAD https://i.ytimg.com/vi/<id>/maxresdefault.jpg` → 200 means `true`.
- **Showcase rule** (already in `lib/cms/map.ts` `showcase`): fijados in order, then the newest `videosRecientes` autos. `ajustes.videosRecientes` is 0 after migration, so nothing visible changes until the operator raises it in the Studio.

## Current state

- `content/videos.ts` header comment: *"From his two YouTube channels (@mnadersch has 191 videos)"*. Only `@mnadersch` is known. The second channel is not named anywhere in the repo.
- `lib/cms/map.ts` (plan 003) has `youtubeId(s)` and `showcase(videos, recientes)`.
- `studio/env.ts` has `projectId` and `dataset`. `studio/scripts/migrate.ts` shows the plain-`fetch` mutate pattern to copy.
- CI is `.github/workflows/ci.yml` (Node 22, `npm ci`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Find channel id | `curl -sL https://www.youtube.com/@mnadersch \| grep -o '"channelId":"UC[^"]*"' \| head -1` | `"channelId":"UC..."` |
| Dry run | `node --experimental-strip-types studio/scripts/sync-videos.ts --dry` | prints new ids or `nothing new`, exit 0 |
| Tests | `npm test` | all pass |

## Scope

**In scope**:
- `studio/scripts/rss.ts` (create, pure parser, type-free imports only)
- `studio/scripts/sync-videos.ts` (create)
- `tests/rss.test.ts` (create) and `tests/fixtures/youtube-feed.xml` (create, a trimmed real feed with 3 entries)
- `.github/workflows/sync-videos.yml` (create)
- `plans/README.md` (status row)

**Out of scope**:
- `lib/cms/*`, components, Studio schema. If the showcase rule needs changing, STOP.
- The YouTube Data API, and any "videos en el canal" auto-count. `ajustes.videosEnCanal` stays manual.
- A second channel, until the operator names it.

## Operator prerequisites

- GitHub repository secret `SANITY_WRITE_TOKEN` (Editor token, created at https://www.sanity.io/manage). The workflow reads it as `${{ secrets.SANITY_WRITE_TOKEN }}`. Never write the value anywhere.

## Steps

### Step 1: Parser

`studio/scripts/rss.ts` exports `parseFeed(xml: string): { id: string; title: string; published: string }[]`, reading `<entry>` blocks and their `<yt:videoId>`, `<title>` and `<published>`. Decode the five XML entities in titles (`&amp; &lt; &gt; &quot; &#39;`). Regex is fine for this fixed format. Do not add an XML dependency.

Save a real feed to `tests/fixtures/youtube-feed.xml` (trim to 3 entries) and write `tests/rss.test.ts`. It should cover 3 entries parsed, ids 11 chars, a title with `&amp;` decoded, `published` kept as ISO, and an empty string giving `[]`.

**Verify**: `npm test` → all pass, including the new file.

### Step 2: Sync script

`studio/scripts/sync-videos.ts`:
1. `CHANNELS = ["UC..."]` with the id found by the command above, plus a comment naming the handle.
2. Fetch each feed. On non-200, `console.log` the status and continue.
3. Query existing ids: `*[_type == "video"].youtube` via the public query API, and map them through the same id regex as `lib/cms/map.ts` (copy the regex and note the duplication in a comment, because `studio/` cannot import `@/`).
4. For each new id, HEAD the maxres poster and build the doc.
5. `--dry` prints what would be created. Otherwise send one mutate request with `createIfNotExists` for all new docs. Missing `SANITY_WRITE_TOKEN` on a real run → exit 1.

**Verify**: `node --experimental-strip-types studio/scripts/sync-videos.ts --dry` → exit 0 and either lists ids or prints `nothing new`.

### Step 3: Workflow

`.github/workflows/sync-videos.yml`: `on: schedule: - cron: "17 */12 * * *"` plus `workflow_dispatch`. One job, `ubuntu-latest`, `timeout-minutes: 5`, Node 22, no `npm ci` (the script has no dependencies), run the script with `SANITY_WRITE_TOKEN: ${{ secrets.SANITY_WRITE_TOKEN }}`. `permissions: contents: read`.

**Verify**: `npx --yes action-validator .github/workflows/sync-videos.yml` exits 0. If that tool is unavailable, check that `python3 -c "import yaml,sys; yaml.safe_load(open(sys.argv[1]))" .github/workflows/sync-videos.yml` exits 0.

### Step 4: First real run (operator)

After merge, the operator triggers the workflow once from the Actions tab. New `video` docs then appear in the Studio under "Videos" with thumbnails.

**Verify** (operator or executor with network): the public query `count(*[_type=="video" && estado=="auto"])` returns a number ≥ 1.

## Test plan

- `tests/rss.test.ts` against a real fixture.
- Dry run against the live feed.
- The showcase ordering is already covered by `tests/cms-map.test.ts` from plan 003.

## Done criteria

- [ ] `npm test` exits 0 with the new RSS tests
- [ ] dry run exits 0
- [ ] `grep -rn "patch\|delete" studio/scripts/sync-videos.ts` prints nothing (the script never edits or deletes)
- [ ] workflow file is valid YAML with a 12-hour `schedule` and `workflow_dispatch`
- [ ] no YouTube API key and no token value anywhere in the diff

## STOP conditions

- The `UULF` feed returns 404 for this channel on three tries spread over 10 minutes. Report it. The fallback is the YouTube Data API with a key, which is a new decision for the operator.
- The channel id cannot be found with the command above.
- The feed includes items that are clearly Shorts (vertical, under 60 s). Report the ids.

## Maintenance notes

- To add the second channel, append its id to `CHANNELS`.
- If Mauricio deletes a synced video in the Studio, the next run creates it again, because it is still in the feed. The guide (plan 005) tells him to set it to "Oculto" instead of deleting it.
- Once he is happy with the result, the operator can set "Videos recientes en la portada" to 2 in the Studio's Ajustes. That is a content choice, not code.
