# Architecture Research — v1.23 Kiosk Follow-Through Content + Harness Close

**Domain:** Documentation-corpus repository with a self-validating harness and a .docx publish pipeline (not a runtime application)
**Researched:** 2026-09-10
**Confidence:** HIGH (repo-measured) for existing mechanics; MEDIUM for the two undecided landing sites (Pillar B new-reference-doc? / Pillar C RE-237-delta-vs-new-guide?) that PROJECT.md itself defers to discuss-phase

All claims below are `[MEASURED path:line]` unless marked `[ASSUMED]`.

## System Overview

This is not a service architecture — it is a four-layer content/governance pipeline:

```
┌────────────────────────────────────────────────────────────────────────┐
│ CONTENT LAYER                                                          │
│  docs/recipes, docs/l1-runbooks, docs/l2-runbooks, docs/reference,     │
│  docs/decision-trees, docs/_glossary*.md                              │
│  Hubs: docs/index.md, docs/common-issues.md,                          │
│        docs/quick-ref-l1.md, docs/quick-ref-l2.md,                    │
│        docs/l2-runbooks/00-index.md                                   │
├────────────────────────────────────────────────────────────────────────┤
│ REGISTRY LAYER                                                         │
│  docs/_registry/RE-index.md  (RE-ID | Path | Title | Doc Type | Status)│
│  237 rows today [MEASURED docs/_registry/RE-index.md:253]              │
├────────────────────────────────────────────────────────────────────────┤
│ VALIDATION LAYER (scripts/validation/)                                 │
│  check-phase-NNN.mjs (per-phase) → check-phase-159.mjs (apex, chains   │
│  48..158+[30,31]) → vX.YY-milestone-audit.mjs (per-milestone C1-C17)   │
│  → check-nav-hub-links.mjs (corpus-wide link/anchor scan, standalone)  │
│  → _lib/frozen-at-close.mjs (MILESTONE_CLOSE_SHAS back-anchor pins)    │
├────────────────────────────────────────────────────────────────────────┤
│ PUBLISH LAYER (scripts/pipeline/)                                      │
│  build-publish-bundle.mjs → build-filename-map.mjs → guard-docx.mjs   │
│  both read RE-index.md's Approved rows; both self-test-pin row count  │
├────────────────────────────────────────────────────────────────────────┤
│ CI LAYER (.github/workflows/)                                          │
│  19 audit-harness-vX.YY-integrity.yml workflows today                 │
│  [MEASURED: `ls .github/workflows | grep -i audit` → 19 files]         │
└────────────────────────────────────────────────────────────────────────┘
```

A new document does not "just exist" — it must be (1) authored, (2) wired into whichever hub routes to it, (3) optionally registered in RE-index.md, (4) picked up by the nav-link checker and the milestone-audit harness's live-HEAD C17 pass, and only at the *next* milestone's close does the harness-close phase freeze it into a back-anchor pin. Content lands now; the freeze is always the harness-close phase's job, never the content phase's.

## Registry → Bundle Data Flow (exact wiring, measured)

```
docs/_registry/RE-index.md  (Approved rows)
        │
        ├──► scripts/pipeline/build-publish-bundle.mjs
        │      REGISTRY_REL_PATH const [build-publish-bundle.mjs:57]
        │      self-test canary (a): rows.length === 237
        │        [build-publish-bundle.mjs:524-527, comment trail :515-522]
        │
        └──► scripts/pipeline/build-filename-map.mjs
               REGISTRY_REL_PATH const [build-filename-map.mjs:57]
               self-test canary (c): parseRegistry(...) yields exactly 237 rows
                 [build-filename-map.mjs:274-286]
               NEVER writes RE-index.md itself (D-09) [build-filename-map.mjs:27-28]
```

Two canary sites total, one per pipeline file — matches PROJECT.md's own framing ("both publish-bundle drift canaries ... bump in the same atom") `[MEASURED PROJECT.md:34]`. Both are hardcoded literal counts (`237`) inside each file's own `--self-test` block, not derived at runtime — every registry-row addition is a two-file edit, same commit, or the self-tests go RED. `build-publish-bundle.mjs:8` also carries a non-enforcing header comment ("237 today") that should be bumped for consistency but is not itself gated.

**Consequence for this milestone:** any new registry row (a new L2 runbook per PROJECT.md's "A new L2 runbook is registered the same way," and/or a new reference doc if Pillar B's discuss-phase decision goes that way) is row 238, and both self-test literals move 237→238 in the same commit as the registry-row insert. If two new docs are registered this milestone, the canaries move 237→239, not 237→238 twice.

## Component-by-Component Integration

### Pillar A — L2 kiosk block-dialog triage runbook

| Aspect | Finding |
|---|---|
| New file | `docs/l2-runbooks/34-<slug>.md` — highest existing number is `33-8021x-radius-eap-investigation.md` `[MEASURED: ls docs/l2-runbooks]`; numbering is append-only, not grouped strictly by platform (macOS SSO runbooks 27-30 were appended after Linux/Apple-Business 24-26), so 34 is the next slot regardless of topic. |
| Hub 1 (mandatory) | `docs/l2-runbooks/00-index.md` — add a row to the "When to Use" table and to "L1 Escalation Mapping," following the exact 5-column shape already used for runbooks 01-05 `[MEASURED docs/l2-runbooks/00-index.md:1-40]`. |
| Hub 2 (mandatory) | `docs/quick-ref-l2.md` — add a platform section following the existing per-runbook cheat-sheet pattern `[MEASURED docs/quick-ref-l2.md:1-40]`. |
| Hub 3 ("Windows triage decision tree") | `docs/decision-trees/00-initial-triage.md` — `[ASSUMED, naming-symmetry evidence]`. Confirmed structurally: `00-initial-triage.md` is Windows/APv1's own tree (parallel to `04-apv2-triage.md`=APv2, `06-macos-triage.md`, `07-ios-triage.md`, `08-android-triage.md`, `09-linux-triage.md`, `10-8021x-triage.md` `[MEASURED: ls docs/decision-trees]`); no file named `AL8025`, `RestrictRun`, or `kioskUser0/1` exists anywhere in `docs/` yet except the RE-237 recipe itself `[MEASURED: grep -rl "AL8025|RestrictRun|kioskUser0|kioskUser1" docs/ → docs/recipes/06-walk-up-avd-kiosk-autologon.md only]`. Its "Stage 3: Symptom Routing" section (`00-initial-triage.md:75`) is the structurally correct place for a post-provisioning symptom-routing row, but this file's TRE-numbered escalation rows are pre-registration/connectivity-flavored, not runtime-symptom-flavored — **flag for discuss-phase**: confirm whether `00-initial-triage.md` or a new escalation row inside `02-profile-assignment.md` (which already mentions "kiosk" once, at `docs/decision-trees/02-profile-assignment.md` PRE6 `[MEASURED]`) is the intended target. |
| HUB-WIRING rule | PROJECT.md's carried trigger `HUB-WIRING-NON-BARRED-SURFACE`: hubs route to the runbook, never to `docs/recipes` directly `[MEASURED PROJECT.md:17]`. All three hub edits above must link to the new `docs/l2-runbooks/34-*.md` path, not to `docs/recipes/06-walk-up-avd-kiosk-autologon.md`. |
| Registry | New RE-ID (candidate row 238, pending Pillar B's own row decision — see below) — PROJECT.md states "A new L2 runbook is registered the same way [as a new Reference doc]" `[MEASURED PROJECT.md:34]`. |
| Validators touched | `check-nav-hub-links.mjs` (corpus-wide scan; the new file's relative links must all resolve, and links *into* it from the 3 hubs must resolve — no per-file registration list to edit, it walks the whole corpus `[MEASURED check-nav-hub-links.mjs:29-35]`) and, if registered, `v1.22-milestone-audit.mjs`'s live-HEAD C17 leg (spawns `c17-eee-contract.mjs` over live `docs/`, so a new enrolled doc is picked up automatically, no code edit needed there). |

### Pillar B — Kiosk-class reference rows (allow-list, OEM inventory, Remote Help, Credential Guard/CredSSP)

`[MEASURED]` No existing `docs/reference/*.md` file currently covers Windows App child-process names, Remote Help, or CredSSP — `grep -rl "Remote Help|CredSSP|Credential Guard|msrdc.exe|crossdeviceresume" docs/reference docs/recipes` returns only `docs/reference/firmware-oem-matrix.md`, `docs/reference/licensing-matrix.md` (incidental "Credential Guard" hits, not the CredSSP/Remote Help content) and `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237 itself, which already narrates the pilot's own OEM-bloat and RDP-cred findings in prose).

Two landing shapes, both structurally valid, and PROJECT.md explicitly defers the choice: "possibly a new reference doc, which would be registry row 238" `[MEASURED milestone_context]`.

- **Shape 1 — amend existing reference docs.** `docs/reference/firmware-oem-matrix.md` (OEM bloat inventory fits its existing per-OEM-quirk shape) and a Windows-security-flavored file (none exists yet for CredSSP/Credential Guard specifically — closest existing sibling is `docs/reference/security-baseline-conflicts.md`). Amending an existing Approved doc touches **no** registry row and **no** canary.
- **Shape 2 — new reference doc** (e.g. `docs/reference/kiosk-hardening-reference.md` or similar). This is registry row 238, bumps both canaries (see Data Flow section above), and needs its own hub wiring (at minimum `docs/reference/00-index.md` and any decision-tree/L2-runbook cross-links that would cite it).

**Recommendation:** split by content shape, not force one file. The child-process allow-list and OEM-bloat inventory are naturally reference-table material — extend `firmware-oem-matrix.md` for the OEM piece; the Remote Help/CredSSP material is Windows-security-troubleshooting-flavored and closer to a new file or an extension of `security-baseline-conflicts.md`. This is a discuss-phase call, not a research call — both are architecturally supported.

### Pillar C — AVD host-pool Entra SSO

PROJECT.md itself states this is undecided: "whether it lands as an RE-237 delta or its own admin-setup guide is a discuss-phase decision" `[MEASURED PROJECT.md:32]`.

- **RE-237 delta:** modifies `docs/recipes/06-walk-up-avd-kiosk-autologon.md` in place (new step or new "Host-Pool Entra SSO" H2 section, following the existing "Asset Provenance" H2 precedent already added by Plan 155-05 `[MEASURED NOTICE:"Plan 155-05 wiring"]`). No registry row, no canary, no hub-wiring change (RE-237 is already wired everywhere it needs to be).
- **New admin-setup guide:** would live under an `docs/admin-setup-*` sibling directory (none currently named for AVD/host-pool specifically — closest existing precedent is the platform-specific `admin-setup-macos/`, `admin-setup-android/`, `admin-setup-ios/`, `admin-setup-linux/` directories `[MEASURED]`) — registry row 238 (or 239 if Pillar B also takes a row), both canaries, and hub wiring into `docs/index.md`'s admin-setup guide table.

Architecturally, an RE-237 delta is the lower-friction path (zero new registry/canary/hub work) and matches how Pillar A's runbook explicitly should NOT duplicate recipe content (HUB-WIRING rule). Given the SSO content is deployment-configuration for the *same* kiosk built in RE-237, a delta is the natural fit unless the owner wants it independently discoverable outside the kiosk recipe's own audience.

### Pillar D — Licensing/hardware decision record

**Critical measured fact:** `docs/reference/licensing-matrix.md` **already exists** (RE-157, "Autopilot Licensing Requirements", Approved) `[MEASURED docs/reference/licensing-matrix.md:1-20]`. This is a **modify**, not a **create** — no new registry row, no canary bump for this pillar. The ruling lands as (1) a new section/table row in the existing `licensing-matrix.md`, and (2) an update inside `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (RE-237) recording the decision and its downstream effect on Shell Launcher / OEM-cleanup scope, per PROJECT.md `[MEASURED PROJECT.md:32]`.

### Pillar E — Vendor De-Bloat into the Kiosk Baseline

**Measured current state:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/` already exists with `Files/Remove-KioskOemBloat.ps1`, `Files/Remove-KioskRunTasks.ps1`, `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1`, `README.md` `[MEASURED: find ...kiosk-baseline -type f]`. The tree's own `NOTICE` file explicitly names the gap this pillar fills: *"Not vendored: `RemoveBloat.ps1` (Andrew Taylor's public De-Bloat) — GAP, not a shortfall... If the admin decision... is later made in favor of vendoring, that vendoring is a future plan's scope, following the same pinned-SHA-plus-GitHub-API-confirmation method 155-02 used for the Windows App files"* `[MEASURED NOTICE, "Not vendored: RemoveBloat.ps1" section]`.

This pillar is therefore: add `RemoveBloat.ps1` (pinned commit SHA from `andrew-s-taylor/public`, confirmed via GitHub API exactly as 155-02 did for `Azure/WindowsAppKiosk`) into `package-sources/kiosk-baseline/` (most likely alongside or inside `Files/`, matching the existing "PSADT package's own Files\ folder" convention), re-sign per the recipe's own signing step, and **append** a new dated entry to the existing `NOTICE` file using the exact provenance-block shape already established (Origin / Pinned SHA / Retrieval date / SHA256 / Bytes) — never rewrite prior NOTICE entries. This touches assets only — no `docs/` registry, no canary, no hub-wiring. RE-237's own prose (Step 8, "Ask the admin" language, `RE-237:196-201` per the NOTICE's own citation) needs a follow-up edit recording the decision once made.

### Pillar F — ClickOnce investigation

`assets/recipes/06-walk-up-avd-kiosk/diagnostics/Trace-StorisEula.ps1` already ships `[MEASURED: find ...diagnostics -type f]`, confirmed "explicitly untested... the STORIS kiosk track is tabled" in NOTICE. Outcome lands as either a new recipe step inside RE-237 (modify) or a documented-negative paragraph inside RE-237 or a reference doc — no new top-level file structurally required unless the owner wants a dedicated runbook, which PROJECT.md does not indicate.

### Pillar G — Riders (glossary + Version-History fill)

- **Glossary terms** → `docs/_glossary.md` (modify): add H3 entries for Assigned Access, Shell Launcher, autologon account, `RestrictRun`, Credential Guard/CredSSP, Remote Help unattended, following the existing per-term H3 anchor convention.
- **Version-History fill** → exactly 9 files, `[MEASURED]` enumerated in `.planning/milestones/v1.16-phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/deferred-items.md:22-30`:
  `docs/_glossary.md`, `docs/_glossary-linux.md`, `docs/ios-lifecycle/00-enrollment-overview.md`, `docs/android-lifecycle/00-enrollment-overview.md`, `docs/android-lifecycle/01-android-prerequisites.md`, `docs/android-lifecycle/02-provisioning-methods.md`, `docs/android-lifecycle/03-android-version-matrix.md`, `docs/linux-lifecycle/00-enrollment-overview.md`, `docs/linux-lifecycle/01-linux-prerequisites.md`.
  Each carries a literal `| YYYY-MM-DD | v1.16 EEE reformat — content not re-reviewed | — |` row to replace with `2026-07-07` per PROJECT.md `[MEASURED PROJECT.md:35]`. **Overlap note:** `docs/_glossary.md` is touched by *both* the new glossary-terms edit and the Version-History fill — land both edits in the same commit/plan for this file to avoid two review passes over one file.

## Harness Close (Pillar H) — exact mechanics, must land strictly last

### H.1 — `V122` back-anchor pin (`V122-PIN-DEFERRAL`)

**File:** `scripts/validation/_lib/frozen-at-close.mjs`.

**Placement rule, with the reason named in code:** insert the `V122` entry **immediately before** the existing `V14` entry inside the `MILESTONE_CLOSE_SHAS` object literal (currently `V14` is the object's last key, at `frozen-at-close.mjs:216`; `V121` sits at `:198-215`, itself inserted before `V14` for the identical reason). The reason is `V-140-V14PIN` (`scripts/validation/check-phase-140.mjs:118-143`): this check regex-asserts the literal `V14` pin text is present, wrapped in `MILESTONE_CLOSE_SHAS`, **and** that no other `V`-tag key appears *after* `V14` in the object body (`check-phase-140.mjs:143`, failure detail: *"another V-tag key appears after V14 -- V14 is no longer the last entry"*). Appending `V122` at the end of the file would fail this check; every prior milestone (V115 through V121) inserted before V14 for the same reason `[MEASURED frozen-at-close.mjs:181-215 comment trail]`.

**Recovery command** (subject-line pair discriminator, the method that replaced the naive dual-token `--grep --all-match` form after it produced false positives at V118/V119):
```
git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.22/ && $2 ~ /MILESTONE CLOSE/'
```
Expect count=1. Per `.planning/milestones/v1.22-DEFERRED-CLEANUP.md:47-51`, the recovered subject is expected to read `"docs(153-14): v1.21 MILESTONE CLOSE..."`-shaped but for v1.22 — **do not** trust a cached SHA from any prior conversation; re-run this command at harness-close time, since it is the v1.22 close-gate commit that does not exist until v1.22 actually closes.

**Companion exports:** add `readAtV122Close` and `lsTreeAtV122Close`, following the verbatim pattern of every `readAtVNNNClose`/`lsTreeAtVNNNClose` pair already in the file (`frozen-at-close.mjs:271-290` and `:342-360`) — these are one-line arrow-function delegations to `readAtClose('V122', p)` / `lsTreeAtClose('V122', dir, opts)`.

**APPEND-ONLY interaction:** `frozen-at-close.mjs` carries an owner-ratified APPEND-ONLY ruling (Phase 144 D-31) already re-amended twice (Phase 153 for the V120 pin + the `withDocsAtClose`/`materializeDocsAtClose` helper pair; Phase 159 for the V121 pin) `[MEASURED frozen-at-close.mjs:26-43]`. The v1.23 harness-close phase must record a **third** named re-amendment for its own V122 mid-file insert, in the same comment-block style, not silently.

### H.2 — Convert `v1.22-milestone-audit.mjs` to frozen V122 reads (`C17-FROZEN-AWARE-RESIDUE-V22`), including the CR-01 existsSync-doc-path-gate class

**Current (unconverted) shape, measured:**
- `readFileSync, existsSync, readdirSync, statSync` imported from `node:fs` (`v1.22-milestone-audit.mjs:67`).
- Local `readFile(relPath)` reads live disk via `existsSync`/`readFileSync` against `process.cwd()` (`:82-85`).
- Local `walkMd(dir)` recursively walks live disk via `readdirSync`/`statSync` (`:88-101`).
- Four **singleton existsSync doc-path gates** — the exact "CR-01 class" the milestone context names — live inside `appleBusinessDocPaths()` (`:131`, `:144`), `androidDocPaths()` (`:192`), and `linuxDocPaths()` (`:243`): `if (existsSync(join(process.cwd(), p))) paths.add(p);`.
- C17's own contract-presence guard: `if (!existsSync(join(process.cwd(), CONTRACT))) {` at `:855`.

**Why "CR-01 class" is the right name:** `159-REVIEW.md`/`159-REVIEW-FIX.md` recorded and fixed the *identical* defect on `v1.21-milestone-audit.mjs` this same phase (`159-REVIEW-FIX.md:30-55`, commit `dfa75ff9`): the four singleton gates in `appleBusinessDocPaths()`/`androidDocPaths()`/`linuxDocPaths()` read live disk instead of the frozen corpus the harness claims to audit. `v1.22-milestone-audit.mjs` is a Path-A copy that carries the same pre-fix shape forward (confirmed: its own header explicitly says it is "BORN LIVE-HEAD... it therefore becomes the successor (v1.23) milestone's SOLE unconverted harness" `[MEASURED v1.22-milestone-audit.mjs:11-19]`). The milestone context's instruction is to fold the CR-01 fix into the *same* conversion pass this time, rather than requiring a second review-and-fix cycle.

**Target shape, measured from `v1.21-milestone-audit.mjs`'s already-converted, already-CR-01-fixed form** (the exact template to replicate with `V121`→`V122` substituted everywhere):
1. Import `{ createFrozenCorpusReader, withDocsAtClose }` from `./_lib/frozen-at-close.mjs` (`v1.21-milestone-audit.mjs:75`); keep `existsSync` imported from `node:fs` solely for the live C17 contract-presence guard (`v1.21-milestone-audit.mjs:70`, `:871`).
2. Define `const MILESTONE_TAG = 'V122'` and `const FROZEN = createFrozenCorpusReader(MILESTONE_TAG, { extraPaths: [SIDECAR_PATH] })` (pattern at `v1.21-milestone-audit.mjs:94`), where `SIDECAR_PATH` is `scripts/validation/v1.22-audit-allowlist.json`.
3. Rewrite local `readFile(relPath)` to return `FROZEN.get(relPath)` (pattern at `v1.21-milestone-audit.mjs:101`).
4. Rewrite local `walkMd(dir)` to filter `FROZEN.paths` by the `dir` prefix and re-absolutize, rather than recursing live disk (pattern at `v1.21-milestone-audit.mjs:105-116`).
5. Replace all four singleton gates — `v1.22-milestone-audit.mjs:131, 144, 192, 243` — with `FROZEN.has(p)`.
6. Wrap the C17 subprocess spawn in `withDocsAtClose('V122', (tmpDir, writtenPaths) => { ... })` (pattern at `v1.21-milestone-audit.mjs:879`), keeping the live `existsSync(CONTRACT_ABS)` presence guard exactly as-is (unaffected by the conversion, per D-19 in the v1.21 precedent).
7. Drop `readFileSync`, `readdirSync`, `statSync` from the `node:fs` import once genuinely dead (confirm via grep first — the v1.21 fix confirmed this by grep before deleting, `159-REVIEW-FIX.md:37`).
8. Update the file's own header comment block (currently claims to be a live-HEAD harness, `v1.22-milestone-audit.mjs:11-19`) to record the conversion, the V122 pin reference, and the residue this closes (`C17-FROZEN-AWARE-RESIDUE-V22`).

### H.3 — 21st Path-A lineage bump

Per PROJECT.md `[MEASURED PROJECT.md:34]` and the `check-phase-159.mjs` apex-shape precedent `[MEASURED check-phase-159.mjs:18-36]`:

| New file | Pattern to copy from |
|---|---|
| `scripts/validation/v1.23-milestone-audit.mjs` | Path-A copy of the now-converted `v1.22-milestone-audit.mjs` (frozen-aware from birth this time — no residue class opens for v1.23's own harness, since it inherits the conversion pattern immediately) |
| `scripts/validation/v1.23-audit-allowlist.json` | Path-A copy of `v1.22-audit-allowlist.json`, header-fields-only |
| `scripts/validation/check-phase-160.mjs` .. `check-phase-16N.mjs` | one per v1.23 phase, following the `check-phase-15X.mjs` numbering/shape precedent |
| Apex `check-phase-<final-160-phase>.mjs` | `CHAIN_PHASES` spans `[48..N-1]` (N = the harness-close phase's own number — **not** included, mirrors `check-phase-159.mjs`'s `[48..158]` excluding 159 itself, `V-<N>-SELF` asserts this), `CHAIN_EXTRA = [30, 31]` carried forward verbatim, disjoint-from-span guard asserted at module load `[MEASURED check-phase-159.mjs:18-36]` |
| `.github/workflows/audit-harness-v1.23-integrity.yml` | 20th CI workflow — copy `audit-harness-v1.22-integrity.yml`'s structure (path-filter re-pointed v1.23-scoped, `check-phase-160..16N` job list, same `linux-chain-ubuntu-latest` fetch-depth:0/autocrlf:false/continue-on-error:false/30-min-timeout contract, same DUAL-APEX pattern — standalone apex job AND the Linux chain job both run the full `48..N-1` recursion, intentionally not deduplicated per the v1.22 file's own recorded rationale `[MEASURED audit-harness-v1.22-integrity.yml:1-27]`) |

### H.4 — Predecessor-surfaces census discipline

The v1.22 harness-close phase (159) recorded, as its own closing discipline, the exact file set it touched beyond ordinary content (`159-CONTEXT.md:116`, D-63): `_lib/frozen-at-close.mjs`, `v1.21-milestone-audit.mjs`, `regenerate-supervision-pins.mjs`, the new `v1.22-milestone-audit.mjs`/`v1.22-audit-allowlist.json`/`check-phase-154..159.mjs`, and the new CI workflow — "about 13" files, enumerated and explained, nothing else may differ. The v1.23 harness-close phase should produce the analogous census against the v1.22 close SHA once it exists, covering: `_lib/frozen-at-close.mjs` (H.1), `v1.22-milestone-audit.mjs` (H.2), the new `v1.23-*` harness/sidecar/check-phase files and CI workflow (H.3), and nothing from Pillars A-G (those are content, already landed and closed out in earlier phases).

## Build Order (dependency-derived)

```
1. Registry-independent content first (no ordering constraint on each other):
   Pillar D  (licensing-matrix.md + RE-237 edit — pure modify, zero registry/canary touch)
   Pillar E  (vendor RemoveBloat.ps1 + NOTICE append — assets only)
   Pillar F  (ClickOnce outcome — RE-237 edit or negative doc)
   Pillar G  (glossary terms + 9-file Version-History fill — pure modify)
        ↓
2. Registry-affecting content (must land registry row BEFORE its canary bump,
   and BEFORE the harness treats the doc as enrolled):
   Pillar A  (new L2 runbook → hub-wire → registry row → both canaries, same atom)
   Pillar B  (reference-doc amend, OR new reference doc → registry row → both
              canaries — discuss-phase picks the shape)
   Pillar C  (RE-237 delta, OR new admin-setup guide → registry row → both
              canaries — discuss-phase picks the shape)
        ↓
   [if 2+ pillars land new rows in the same milestone, verify the canary literal
    moves by the TOTAL row count added, not once per pillar — see Data Flow note]
        ↓
3. Corpus-wide validation sweep (after ALL content lands, before harness-close):
   check-nav-hub-links.mjs clean (0 failures)
   v1.22-milestone-audit.mjs (still live-HEAD at this point) green over the
     new/changed docs — this is the harness that must see the final content
     shape BEFORE it gets frozen in step 4
        ↓
4. Harness close (Pillar H) — LAST, own final phase, never batched with content:
   H.1 V122 pin (frozen-at-close.mjs)          -- must be able to recover the
                                                   v1.22 close-gate SHA, which
                                                   only exists because v1.22
                                                   already shipped (it did,
                                                   2026-09-10, archive b403537b)
   H.2 Convert v1.22-milestone-audit.mjs        -- depends on H.1 (needs V122
       (CR-01 class + C17 leg)                     pin + readAtV122Close to exist)
   H.3 Fork v1.23-milestone-audit.mjs + sidecar -- depends on H.2's converted
       + check-phase-160..N + apex + 20th          shape (Path-A copies the
       CI workflow                                 POST-conversion file, not
                                                     the pre-conversion one)
   H.4 Predecessor-surfaces census + 3-axis     -- last; depends on H.1-H.3
       terminal re-audit at one shared SHA          all being committed
```

**Why harness-close must be strictly last:** the V122 pin recovery command greps for a v1.22 "MILESTONE CLOSE" commit subject — that commit is v1.22's *own* close-gate, already in history (2026-09-10, tag `v1.22`, archive commit `b403537b`), so H.1 does not depend on anything in this milestone's content phases. But H.2's conversion changes what `v1.22-milestone-audit.mjs` treats as "the corpus" (frozen at V122, not live HEAD) — running it before all Pillar A-G content lands would freeze an incomplete v1.22-era snapshot into the wrong tag's harness, which is nonsensical (V122 must equal exactly what existed at v1.22's actual close, not a mid-v1.23 state). H.3's new `v1.23-milestone-audit.mjs` is the harness that will eventually audit *this* milestone's content — it must fork from the corrected `v1.22-milestone-audit.mjs`, so H.2 before H.3 is a hard dependency, and both come after content so the new v1.23 harness's own C1-C17 checks run against the real, complete v1.23 corpus at least once before close.

## Validators Touched Per Pillar (summary table)

| Pillar | New files | Modified files | Validator(s) that see it |
|---|---|---|---|
| A (L2 runbook) | `docs/l2-runbooks/34-*.md` | `docs/l2-runbooks/00-index.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/00-initial-triage.md` (or `02-profile-assignment.md` — TBD), `docs/_registry/RE-index.md`, `build-publish-bundle.mjs`, `build-filename-map.mjs` | `check-nav-hub-links.mjs`, `v1.22-milestone-audit.mjs` C17 leg (live-HEAD), both bundle self-tests |
| B (reference rows) | possibly a new `docs/reference/*.md` | `docs/reference/firmware-oem-matrix.md` and/or a security-flavored reference doc; possibly `RE-index.md` + both bundle files | same as A, if a row is added; none beyond C17 if pure amend |
| C (AVD SSO) | possibly a new admin-setup guide | `docs/recipes/06-walk-up-avd-kiosk-autologon.md` (delta path); possibly `RE-index.md` + both bundle files (new-guide path) | same as A, if a new guide; none beyond C17 if RE-237 delta |
| D (licensing) | none | `docs/reference/licensing-matrix.md`, `docs/recipes/06-walk-up-avd-kiosk-autologon.md` | C17 leg only (already-enrolled docs) |
| E (De-Bloat vendoring) | `assets/recipes/.../kiosk-baseline/RemoveBloat.ps1` (or `Files/RemoveBloat.ps1`) | `assets/recipes/.../kiosk-baseline/NOTICE` (append), RE-237 Step 8 prose | none (`assets/` is outside `docs/`, never walked by C17 or the .docx conversion, per project convention) |
| F (ClickOnce) | none (uses existing `Trace-StorisEula.ps1`) | `docs/recipes/06-walk-up-avd-kiosk-autologon.md` | C17 leg only |
| G (riders) | none | `docs/_glossary.md` (both edits land here), 8 other Version-History files | C17 leg only |
| H (harness close) | `v1.23-milestone-audit.mjs`, `v1.23-audit-allowlist.json`, `check-phase-160..N.mjs`, apex `check-phase-<final>.mjs`, `audit-harness-v1.23-integrity.yml` | `_lib/frozen-at-close.mjs`, `v1.22-milestone-audit.mjs` | itself — the new apex chains everything above it |

## Anti-Patterns to Avoid This Milestone

### Anti-Pattern 1: Landing the V122 pin before content is final

**What people do:** run the harness-close phase concurrently with content phases to "save a phase."
**Why it's wrong:** the V122 pin and the `v1.22-milestone-audit.mjs` conversion freeze what "v1.22's corpus" means for every future validator; doing this before v1.23's own content lands doesn't corrupt V122 (it's a real, already-shipped commit) but wastes the ordering guarantee the back-anchor chain exists for, and risks H.3's `v1.23-milestone-audit.mjs` forking from a not-yet-CR-01-fixed `v1.22-milestone-audit.mjs` if the phases race.
**Do this instead:** own final phase, strictly last, per PROJECT.md's explicit instruction `[MEASURED PROJECT.md:36]`.

### Anti-Pattern 2: Routing a hub link to `docs/recipes/06-...` instead of the new L2 runbook

**What people do:** since RE-237 already narrates the kiosk block-dialog symptom in prose, it's tempting to link hubs straight to the recipe instead of writing (and wiring) a dedicated runbook.
**Why it's wrong:** violates `HUB-WIRING-NON-BARRED-SURFACE` explicitly named in PROJECT.md, and duplicates escalation-routing content that belongs in `docs/l2-runbooks/`, not `docs/recipes/`.
**Do this instead:** write the runbook, link hubs to it; the runbook may itself cite RE-237 as background, not the reverse.

### Anti-Pattern 3: Bumping one canary but not the other

**What people do:** edit `RE-index.md`, then bump only `build-publish-bundle.mjs`'s self-test literal, forgetting `build-filename-map.mjs` has its own independent hardcoded count.
**Why it's wrong:** exactly this class of miss happened historically — `[MEASURED build-publish-bundle.mjs:516-518]` records that the 221→223 bump at v1.18 close "was MISSED then -- RED since the v1.18 close" because only `build-filename-map.mjs`'s canary was bumped.
**Do this instead:** treat the registry-row insert and both canary-literal bumps as one atomic edit, same commit.

## Sources

- `D:/claude/Autopilot/.planning/PROJECT.md` (current-milestone section, lines 11-36) — [MEASURED]
- `D:/claude/Autopilot/.planning/milestones/v1.22-DEFERRED-CLEANUP.md` (Part A, lines 32-100) — [MEASURED]
- `D:/claude/Autopilot/scripts/validation/_lib/frozen-at-close.mjs` (full file, 628 lines) — [MEASURED]
- `D:/claude/Autopilot/scripts/validation/v1.22-milestone-audit.mjs` (header + doc-path functions, lines 1-250) — [MEASURED]
- `D:/claude/Autopilot/scripts/validation/v1.21-milestone-audit.mjs` (converted target shape, lines 70-120, 134-270, 868-906) — [MEASURED]
- `D:/claude/Autopilot/.planning/milestones/v1.22-phases/159-harn-harness-close/159-REVIEW.md` and `159-REVIEW-FIX.md` (CR-01 finding + applied fix, lines 30-55/30-42) — [MEASURED]
- `D:/claude/Autopilot/.planning/milestones/v1.22-phases/159-harn-harness-close/159-CONTEXT.md` (D-01, D-15, D-36, D-51, D-54, D-63) — [MEASURED]
- `D:/claude/Autopilot/docs/_registry/RE-index.md` (last rows 244-253, Review Notes) — [MEASURED]
- `D:/claude/Autopilot/scripts/pipeline/build-publish-bundle.mjs` (lines 8, 505-527) — [MEASURED]
- `D:/claude/Autopilot/scripts/pipeline/build-filename-map.mjs` (lines 4-57, 227-286) — [MEASURED]
- `D:/claude/Autopilot/scripts/validation/check-phase-140.mjs` (V-140-V14PIN, lines 118-143) — [MEASURED]
- `D:/claude/Autopilot/scripts/validation/check-phase-159.mjs` (apex chain-shape comments, lines 6-110) — [MEASURED]
- `D:/claude/Autopilot/scripts/validation/check-nav-hub-links.mjs` (hub roster + scan model, lines 1-60) — [MEASURED]
- `D:/claude/Autopilot/docs/l2-runbooks/` directory listing, `docs/l2-runbooks/00-index.md`, `docs/quick-ref-l2.md` (heads) — [MEASURED]
- `D:/claude/Autopilot/docs/decision-trees/` directory listing, `00-initial-triage.md` structure — [MEASURED]
- `D:/claude/Autopilot/docs/reference/` directory listing, `licensing-matrix.md` head — [MEASURED]
- `D:/claude/Autopilot/assets/recipes/06-walk-up-avd-kiosk/` directory tree and `NOTICE` file (full read) — [MEASURED]
- `D:/claude/Autopilot/.planning/milestones/v1.16-phases/121-.../deferred-items.md` (DEFER-121-07-A, lines 7-30) — [MEASURED]
- `.github/workflows/` directory listing (19 files), `audit-harness-v1.22-integrity.yml` header (lines 1-27) — [MEASURED]

---
*Architecture research for: v1.23 Walk-Up AVD Kiosk Follow-Through content + harness close, Autopilot documentation-corpus repository*
*Researched: 2026-09-10*
