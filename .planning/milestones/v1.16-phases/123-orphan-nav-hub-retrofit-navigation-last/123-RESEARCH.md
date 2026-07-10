# Phase 123: Orphan Nav-Hub Retrofit (Navigation-Last) - Research

**Researched:** 2026-07-08
**Domain:** Documentation-retrofit tooling (Node.js fork-pipeline scripts) + hand-authored markdown restructuring + a net-new link/anchor integrity checker
**Confidence:** HIGH (all claims below are grounded in direct file reads / grep / git log against the live repo; no external ecosystem research was needed — this is an internal-tooling phase)

## Summary

Phase 123's four LOCKED decisions in `123-CONTEXT.md` are implementation-ready as written; this research closes the gaps a planner needs to turn them into concrete tasks: exact line numbers in the Phase-122 fork base (`scripts/pipeline/retrofit-mermaid-structural.mjs`) that must change, a fully-specified algorithm and I/O contract for the net-new link/anchor checker (confirmed: **no reusable link-checker exists anywhere in the repo** — the only prior art, C13/C16 in `v1.6-milestone-audit.mjs`, are hardcoded allowlist/edge-substring checks, not a generic resolver, and C13 explicitly defers "full mlc sweep" to CI, never implemented in-repo), byte-verified confirmation of all 12 pre-existing broken links (with exact fix text), byte-verified confirmation of all 13 over-length #12 callouts (including a previously-unstated landmine: `index.md:9`'s single-line 459-char callout requires an **internal 3-way clause split**, not merely separation from line 10), and two newly-discovered duplicate-heading landmines (`common-issues.md` has 4× identical `### 802.1X Network Authentication Failure` H3s; `index.md` has 5× identical `### Admin Setup`, 4× identical `### Service Desk (L1)`, 4× identical `### Desktop Engineering (L2)` H3s) that make GitHub's per-file encounter-order slug-dedup (`-1`, `-2`, `-3`...) a correctness requirement for the checker, not an edge case to skip.

**Primary recommendation:** Fork `scripts/pipeline/retrofit-mermaid-structural.mjs` to a new `scripts/pipeline/retrofit-nav-hub.mjs`, adding only a 4-entry `NAV_HUB_PATHS` Set plus one `resolveDocType()` branch (no other guard changes needed — all 4 hubs are `platform: all`, mermaid-free, and un-enrolled, so every existing guard is either satisfied or inert); invoke it with the 4 explicit file paths (not `--all`) to sidestep the `--all`-enumeration-hazard entirely; build the link-checker as a new standalone `scripts/validation/*.mjs` (no `CHAIN_PHASES`, mirrors the Phase-115 C17 standalone precedent) implementing GitHub's exact slugify-and-dedup algorithm; sequence registry rows → fork run → hand `#12` splits → Summary authoring → link-checker → pre-existing-rot fixes → full corpus C17.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| EEE header-block + frontmatter injection (4 hubs) | Build/tooling (Node pipeline script) | — | Mechanical envelope transform, no runtime component; matches the Phase-121/122 fork pattern |
| `## Summary` prose authoring | Human/author (hand-work) | Build/tooling (placeholder emission) | Fork emits `[FILL-IN]`; a human writes real prose — same split as every prior retrofit phase |
| C17 #12 blockquote reflow | Human/author (hand-work) | — | LOCKED as hand-applied (D-02); no fork has ever split blockquotes |
| Link/anchor integrity verification | Build/tooling (new validation script) | — | Static-analysis problem over the markdown corpus; no runtime/service component exists in this project |
| Registry (`RE-index.md`) row minting | Human/author (hand-authored) | Build/tooling (`buildDocIdMap()` read-only join) | Registry mechanics are hand-authored-first, machine-read-only (121 D-04/D-05, unchanged) |
| Navigation-last git-history ordering | Process/git discipline | — | Enforced by commit sequencing, not by any code; verified via `git log` |

This phase has no browser/frontend/API/database tiers — it is 100% static markdown content plus build-time Node.js tooling (`scripts/pipeline/`, `scripts/validation/`), consistent with every other v1.16 retrofit phase.

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` at the repo root describes the *Windows Autopilot Troubleshooter* PowerShell/FastAPI/React application — it governs `src/powershell`, `src/backend`, `src/frontend`. **None of its directives apply to this phase.** Phase 123 touches only `docs/`, `scripts/pipeline/`, `scripts/validation/`, and `.planning/` — it does not touch the application source tree the root CLAUDE.md governs. No conflicts to flag.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RETRO-06 | All orphan nav-hubs (`docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`) retrofitted to EEE with navigation-last discipline; C17 exits 0; routing/link tables remain accurate | Fork-base diff (below) delivers the EEE envelope; link-checker spec (below) delivers routing/link accuracy; git-log commands (below) prove navigation-last |

## User Constraints (from CONTEXT.md)

`123-CONTEXT.md` is exceptionally detailed and already LOCKS all four gray-area decisions via a 12-agent adversarial-review panel. Verbatim reproduction below (do not re-litigate):

### Locked Decisions (D-01 through D-04 + Registry)
- **D-01** — Standing verification = a single automated file+anchor link-checker (Option A, HIGH confidence, overruled the Proponent's "both/C" recommendation). The manual per-hub re-derivation layer is dropped (empirically zero in-scope findings). **12 pre-existing broken links MUST be fixed IN Phase 123** (not deferred): 11 bad `../` prefixes in `quick-ref-l2.md` (lines 316,317,318,320,322,366,367,368,369,371,373) + 1 dead anchor `common-issues.md:360`. Checker spec: filesystem-relative-to-linking-file path resolution, case-sensitive/Linux-CI posture, `{#id}` override FIRST then GitHub-slug fallback (87 `{#id}` overrides exist outside glossaries — lowercase, strip punctuation except hyphens, spaces→hyphens, **preserve double-hyphen** from punctuation-between-words, de-dup `-1/-2`), BOTH outbound (from the 4 hubs) AND inbound-to-hub (corpus-wide) directions, exit nonzero with `file:line → link` per failure.
- **D-02** — C17 #12 reflow: A-split (blank-line-separated blockquotes) for 11 callouts + full de-blockquote (bold-led paragraph) for the 2 `⚠️` ownership pointers (`quick-ref-l2.md:320,371`); reject Option C (reword-to-fit, FORBIDDEN per the mandatory word-preserving policy). 13 over-length callouts total: `common-issues.md` (5: lines 27,94,317,334,404), `quick-ref-l2.md` (7: 124,237,273,288,320,339,371), `index.md` (1: line 9). Hand-applied, NOT scripted.
- **D-03** — Fork base = a NEW `scripts/pipeline/` script forked from `retrofit-mermaid-structural.mjs` (Phase 122, chain tip) — NOT `retrofit-structural.mjs` (Phase 121), NOT in-place extension of `retrofit-reference.mjs`. Strip/change: replace `main()`'s `--all` enumeration with a 4-entry `NAV_HUB_PATHS` Set; add a nav-hub→Reference branch in `resolveDocType()`. Keep everything else (whole-pre-H1-span relocation, frontmatter injection, doc_id-resolve + sentinel + idempotency guards, auto-filled VH date). Envelope-injection only; C17 #12 is HAND-APPLIED, never by the fork.
- **D-04** — `## Summary` sourcing = net-new ≥30-word scope Summary (first H2) on all 4 hubs — FORECLOSED BY LOCK (D3-A + Phase-121 D-03 general rule), not a live A-vs-B pick. Retain the existing intro/coverage blockquote, relocated below Summary per D3-A (its see-also links — `[APv1 vs APv2]`/`[Windows vs macOS]` — must survive somewhere below, per SC2).
- **Registry** — Mint RE-218…221 (path-alphabetical: RE-218=`common-issues.md`, RE-219=`index.md`, RE-220=`quick-ref-l1.md`, RE-221=`quick-ref-l2.md`), all `Doc Type: Reference`, `Status: Approved`, hand-authored BEFORE the fork runs. VH branch = PREPEND, 3-column (all 4 hubs already have a 3-column `## Version History` table).

### Claude's Discretion
- Exact prose of each net-new `## Summary` (≥30 words, scope statement).
- The `common-issues.md:360` dead-anchor remediation (repoint vs. remove the macOS row).
- Plan/wave decomposition (batching the 4 hubs; ordering fork run → hand `#12` splits → Summary authoring → link-checker → pre-existing-rot fixes) — sequential-on-main-tree per `use_worktrees:false`.
- Whether the link-checker is a net-new script under `scripts/validation/` or an extension of existing slug-check tooling — **RESOLVED by this research: it must be net-new; no extensible slug-check tooling exists** (see "Don't Hand-Roll" / Common Pitfall 1 below).

### Deferred Ideas (OUT OF SCOPE)
- A diagram-aware / link-aware C17 assertion (folding the link-checker into C17 as a 14th assertion) — stays out of the frozen-harness envelope; a future HARN lever.
- Descriptive-filename rename pass (Phase 124, PIPE-04) — will re-touch nav-hub link targets; the checker should be re-runnable so Phase 124 can re-validate after renames.
- Whole-class enrollment of `operations/`, `device-operations/`, `cross-platform/apple-business/` (v1.17+) — `quick-ref-l2.md` links into `operations/` resolve to existing-but-unenrolled files; out of scope here.

## Standard Stack

No new libraries. This phase is 100% Node.js built-ins (`node:fs`, `node:path`, `node:process`) matching the repo's `scripts/pipeline/` and `scripts/validation/` zero-external-dependency convention — confirmed by every file in both directories (`retrofit-mermaid-structural.mjs:71-73`, `c17-eee-contract.mjs:16-18`). No `npm install` step, no Package Legitimacy Audit required — **this section and the Package Legitimacy Audit section are N/A; no external packages are installed in this phase.**

## Architecture Patterns

### System Architecture Diagram

```
 [Registry: docs/_registry/RE-index.md]
        │  (1) hand-author 4 rows RE-218..221, path-keyed, BEFORE fork run
        ▼
 [scripts/pipeline/retrofit-nav-hub.mjs]  (NEW fork of retrofit-mermaid-structural.mjs)
        │  buildDocIdMap() reads RE-index.md ──┐
        │  resolveDocType(rel) — NAV_HUB_PATHS │ (2) run: node retrofit-nav-hub.mjs
        │  → 'Reference' branch                │      docs/index.md docs/common-issues.md
        │  processFile() per hub:              │      docs/quick-ref-l1.md docs/quick-ref-l2.md
        │    guards: PATH-ALLOWLIST →           │
        │    MERMAID-STILL-PRESENT (inert,      │
        │    no mermaid) → TEMPLATE-SENTINEL     │
        │    (inert) → DOC-ID-ALREADY-PRESENT    │
        │    (inert, unenrolled) → DOC-ID-       │
        │    UNRESOLVED (satisfied by step 1) →  │
        │    platform detect (all 4 already      │
        │    carry platform: all → D1 label      │
        │    "All Platforms", no injection,       │
        │    keyless guard never fires)          │
        │  whole-pre-H1-span relocation:         │
        │    intro blockquote moved below         │
        │    Summary placeholder                  │
        │  VH: PREPEND 3-col row, auto-filled date│
        ▼
 [4 hubs: frontmatter + EEE block + H1 +
  "## Summary" + [FILL-IN] + relocated intro]
        │  (3) HAND: split/de-blockquote the 13 over-length #12 callouts
        │       (11 relocated-intro callouts may now live below Summary)
        ▼
 [4 hubs, #12-clean]
        │  (4) HAND: author real ≥30-word Summary prose per hub
        ▼
 [4 hubs, C17 assertions #1-11,13 green; #12 green; #5/#4 green]
        │  (5) RUN: node scripts/validation/check-nav-hub-links.mjs
        │       outbound scan (4 hubs → corpus) + inbound scan (corpus → 4 hubs)
        ▼
 [file:line → broken-link report]
        │  (6) HAND: fix the 12 pre-existing broken links (separate commit,
        │       git-blame-attributed as pre-existing-rot, NOT retrofit-drift)
        ▼
 [check-nav-hub-links.mjs exits 0]
        │  (7) RUN: node scripts/validation/c17-eee-contract.mjs  (full corpus)
        ▼
 [SC1 + SC2 satisfied; SC3 proved via git log (navigation-last)]
```

### Recommended Project Structure
No new directories. New files land in existing locations:
```
scripts/
├── pipeline/
│   └── retrofit-nav-hub.mjs          # NEW — Phase-123 fork of retrofit-mermaid-structural.mjs
└── validation/
    └── check-nav-hub-links.mjs       # NEW — net-new link/anchor checker (standalone, no CHAIN_PHASES)
docs/
├── index.md                          # MODIFIED — EEE envelope + Summary + #12 fixes + link fixes
├── common-issues.md                  # MODIFIED — same + common-issues.md:360 anchor fix
├── quick-ref-l1.md                   # MODIFIED — EEE envelope + Summary (no #12 violations found)
├── quick-ref-l2.md                   # MODIFIED — same + 11 `../` link fixes
└── _registry/RE-index.md             # MODIFIED — +4 rows RE-218..221
```

### Pattern 1: Minimal-diff fork-and-invoke (avoids the `--all` hazard entirely)
**What:** Rather than modifying `main()`'s `--all` enumeration (CONTEXT's suggested strip target at `retrofit-mermaid-structural.mjs:890-906`), invoke the new fork with the 4 explicit file paths as positional arguments. `main()` already has a working branch for this with **zero code changes required**:
```js
// retrofit-mermaid-structural.mjs:911-915 (inherited verbatim into the Phase-123 fork)
} else if (filePaths.length > 0) {
  targetAbsPaths = filePaths.map(p => {
    if (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p)) return p;
    return join(process.cwd(), p);
  });
}
```
**When to use:** Always, for this phase. Invoke as:
```bash
node scripts/pipeline/retrofit-nav-hub.mjs --dry-run docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md
node scripts/pipeline/retrofit-nav-hub.mjs docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md
```
**Why this matters:** The ONLY mandatory code change is adding `NAV_HUB_PATHS` + a `resolveDocType()` branch (Guard 1, `retrofit-mermaid-structural.mjs:402-407`, fires `PATH-ALLOWLIST` otherwise). Modifying the `--all` enumeration is optional cosmetic completeness — CONTEXT's own operational hazard note ("if the inherited `--all` is left unstripped and invoked, the idempotency guard makes every already-enrolled file ERROR") is entirely sidestepped by simply never invoking `--all` in this phase. Recommend the planner **skip editing `main()`'s `--all` block** and document "never invoke with `--all`" in the new fork's header comment instead — smaller diff, same fork-don't-refactor spirit, zero risk of the noisy-ERROR hazard.

### Pattern 2: Copy-paste-ready `resolveDocType()` diff
```js
// Insert after CA_ENROLLMENT_TIMING_PATH (retrofit-mermaid-structural.mjs:173), before resolveDocType():
// NEW (Phase 123, D-03 / EEE-SOP-standard.md:151-153 LOCK): the 4 orphan nav-hubs -> Reference.
const NAV_HUB_PATHS = new Set([
  'docs/index.md',
  'docs/common-issues.md',
  'docs/quick-ref-l1.md',
  'docs/quick-ref-l2.md',
]);

// resolveDocType() (retrofit-mermaid-structural.mjs:176-183) — add one line before `return null;`:
function resolveDocType(rel) {
  if (GLOSSARY_FILES.has(rel)) return 'Reference';
  if (GUIDE_DIRS.some(d => rel.startsWith(d))) return 'Guide';
  if (DECISION_TREE_PATHS.has(rel)) return 'Reference';
  if (ADMIN_SETUP_CARVEOUT_PATHS.has(rel)) return 'Guide';
  if (rel === CA_ENROLLMENT_TIMING_PATH) return 'Reference';
  if (NAV_HUB_PATHS.has(rel)) return 'Reference';   // NEW Phase 123
  return null;
}
```
No other guard needs touching. Verified against live frontmatter (all 4 files read in full during this research): all 4 hubs carry `platform: all` (`index.md:6`, `common-issues.md:6`, `quick-ref-l1.md:6`, `quick-ref-l2.md:6`) → `platformInjected` will be `false` for all 4 → the `KNOWN_WINDOWS_KEYLESS_PATHS` guard (`:465-467`) never evaluates → no addition needed there. None of the 4 carry `last_verified: 1970-01-01` (all read real dates) → `TEMPLATE-SENTINEL` guard inert. None carry a `doc_id` key yet → `DOC-ID-ALREADY-PRESENT` guard inert (will not fire). None contain a `` ```mermaid `` fence (grep-verified by CONTEXT and re-confirmed by full-file reads here) → `MERMAID-STILL-PRESENT` guard inert.

### Pattern 3: The link/anchor checker — full spec (net-new)
**What:** A standalone Node script, `scripts/validation/check-nav-hub-links.mjs`, mirroring `c17-eee-contract.mjs`'s standalone-no-`CHAIN_PHASES` pattern (confirmed precedent: `check-phase-115.mjs` "asserts standalone `c17-eee-contract.mjs` (no `CHAIN_PHASES`) NOT chain registration" per `STATE.md` 115-01 decision log).

**Reusable helpers (copy verbatim from `c17-eee-contract.mjs`/`retrofit-mermaid-structural.mjs` — both already implement these exactly):**
```js
// walkMd(dir) — c17-eee-contract.mjs:68-86, verbatim
// relNormalize(abs) — c17-eee-contract.mjs:89-94, verbatim
// readFile(relPath) — c17-eee-contract.mjs:61-65, verbatim (CRLF-normalizing)
// buildFenceMask(lines) — retrofit-mermaid-structural.mjs:262-280, verbatim (code-fence exclusion for both heading detection and link-regex scanning)
```

**I/O contract:**
- Usage: `node scripts/validation/check-nav-hub-links.mjs [--verbose]`
- Exit 0: zero broken links found in both outbound and inbound scans
- Exit 1: prints `file:line -> [text](target)` for every unresolved link, then a summary count; nonzero exit
- No `CHAIN_PHASES` array — this is a standalone validator, not a chained per-phase check

**Algorithm — outbound (from the 4 hubs):**
1. `HUB_PATHS = ['docs/index.md', 'docs/common-issues.md', 'docs/quick-ref-l1.md', 'docs/quick-ref-l2.md']`
2. For each hub, read raw content (CRLF-normalized), split into lines, build a fence mask (`buildFenceMask`).
3. Scan non-fenced lines with `/\[([^\]]*)\]\(([^)]+)\)/g` to extract every `(text, target)` pair with its 1-based line number.
4. Skip targets matching `/^(https?:|mailto:)/` — external links are explicitly OUT OF SCOPE (matches the pre-existing `v1.6-milestone-audit.mjs` C13 comment: "External MS Learn URL validation explicitly OUT OF SCOPE").
5. Split each remaining target on the first unescaped `#`: `filePart`, `fragPart` (may be empty).
6. Resolve `filePart` **relative to the linking file's own directory** (`path.dirname(hubAbsPath)`), not `cwd` — this is the exact bug class the 11 `../`-over-escape links exhibit (see Common Pitfall 2). Empty `filePart` means "this same file."
7. `existsSync` on the resolved absolute path → FAIL if missing (`file:line -> target file not found: <resolved>`).
8. If `fragPart` present, build/cache the target file's **resolvable-anchor-set** (algorithm below) and check membership → FAIL if absent.

**Algorithm — inbound (corpus-wide, to the 4 hubs):**
1. `walkMd('docs')` → every `.md` file under `docs/`.
2. For each file, repeat steps 2-6 above (scan links, resolve relative to *that* file's directory).
3. Keep only links whose resolved target's `relNormalize()` path equals one of `HUB_PATHS`.
4. Apply step 8 against the (post-retrofit) hub's own resolvable-anchor-set.
5. **Must run AFTER** the Summary insertion + hand `#12` splits are committed (see Sequencing) — inserting `## Summary` and relocating the intro blockquote does not rename any existing H2/H3 (verified: all 5 hub-targeting fragment links found — see Common Pitfall 4 — point at H2s whose text is untouched by the retrofit), but running the check only after the corpus is final avoids false confidence.

**Resolvable-anchor-set construction for a target file (used by both directions):**
1. Regex-scan the WHOLE raw content (fence-masked) for explicit overrides: `/\{#([a-zA-Z0-9_-]+)\}/g` → these strings are added to the set VERBATIM, no transformation (87 of these exist repo-wide across 29 files — confirmed by direct grep during this research; **none inside the 4 hubs themselves**, all in `l1-runbooks/`, `operations/`, `admin-setup-*/`, so this matters only for links the hubs make OUTWARD, not their own headings).
2. Regex-scan non-fenced lines for headings `/^#{1,6}\s+(.*)$/`; for each, strip any trailing `{#...}` override text and any `**`/`` ` `` inline-emphasis markers (mirrors `c17-eee-contract.mjs:191`'s `.replace(/\*\*/g, '')` precedent — GitHub slugifies rendered text, not raw markdown, so a heading like `### \`code\` Term` must have the backticks stripped before slugifying or the slug will be wrong).
3. Slugify per the **GitHub-slug algorithm** (below); if the resulting slug is already in a per-file `seenSlugs` Map (encounter order = document order), append `-1`, `-2`, `-3`... (GitHub's actual dedup suffix behavior) and record the suffixed version instead.
4. Union of (1) and (3) is the resolvable-anchor-set.

**GitHub-slug algorithm (exact, empirically re-derived and verified against 3 live corpus examples this research):**
```
1. lowercase the heading text
2. remove any characters NOT in [a-z0-9 _-] (i.e. strip punctuation like : / , ( ) . — IN PLACE,
   do not replace with a space — this is what produces the double-hyphen artifact when the
   punctuation itself was surrounded by spaces on both sides)
3. replace each remaining space with a single hyphen (do NOT collapse consecutive hyphens —
   two adjacent spaces become "--", not "-")
4. de-dup per file in encounter order: 1st occurrence of a slug -> as-is; 2nd -> slug + "-1";
   3rd -> slug + "-2"; etc.
```
**Verified against live headings during this research:**
- `"### iOS: Compliance / Access Blocked"` → `ios-compliance--access-blocked` (colon has no space before it, so its removal doesn't create a gap; `" / "` has spaces on BOTH sides, so removing `/` leaves two adjacent spaces → `--`). Confirmed working sibling anchor at `common-issues.md:149`; confirmed BROKEN sibling (typo'd as `#compliance-access-blocked` instead of the real `#compliance-failure-or-access-blocked`) at `common-issues.md:360`.
- `"## iOS/iPadOS Quick Reference"` → `iosipados-quick-reference` (no spaces around `/`, so removal produces no gap — single hyphen only). Confirmed against 6 live inbound links from `index.md`/`common-issues.md`/`l1-runbooks/34-...md`.
- `"### 802.1X Network Authentication Failure"` (appears 4× verbatim in `common-issues.md`, lines 157/257/319/395) → 1st: `8021x-network-authentication-failure`; 2nd: `...-1`; 3rd: `...-2`; 4th: `...-3`. No live link currently targets any suffixed variant (verified via corpus grep), but the checker's implementation MUST replicate this dedup correctly or it is not trustworthy for future links (see Common Pitfall 1).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown-to-HTML heading-ID computation | A "close enough" slugifier that just lowercases+replaces-spaces-with-hyphens and collapses repeats | The exact algorithm above (strip-in-place, don't collapse, dedup-by-encounter-order) | GitHub's real behavior produces `--` from space-surrounded punctuation and `-1/-2` suffixes for duplicate headings; a "cleaned up" slugifier will silently disagree with GitHub's actual rendered anchors and either false-flag working links or (worse) miss genuinely broken ones |
| Relative path resolution | `path.join(process.cwd(), target)` | `path.resolve(path.dirname(linkingFileAbsPath), target)` then `relNormalize()` | This exact cwd-vs-linking-file-directory confusion IS the root cause of all 11 pre-existing `quick-ref-l2.md` `../` bugs — the checker itself must not repeat the mistake it is built to detect |
| Fence-aware heading/link scanning | A naive full-content regex scan | `buildFenceMask()` (already implemented in `retrofit-mermaid-structural.mjs:262-280`) | Without fence-masking, a heading or link shown as a **markdown example** inside a code fence (e.g. any doc demonstrating markdown syntax) would falsely enter the anchor set or link scan |

**Key insight:** Every piece of "don't hand-roll" guidance here is really "don't approximate GitHub's actual slugify/render behavior" — the entire value of the link-checker is that it matches what GitHub (and, by extension, the Copilot Studio/SharePoint markdown-render pipeline this project grounds against) actually resolves at render time. An approximated algorithm that "looks right" but disagrees with GitHub on edge cases (double-hyphen, dedup-suffix) is worse than no checker, because it launders false confidence into SC2's "no broken links" claim.

## Common Pitfalls

### Pitfall 1: No prior link-checker exists to extend — don't assume one does
**What goes wrong:** A planner searches for "the existing link checker" (since a "C16" and "C13" reference show up in `v1.6-milestone-audit.mjs` and in nav-hub Version-History rows) and either wastes time trying to extend it, or worse, assumes its logic is reusable.
**Why it happens:** `v1.6-milestone-audit.mjs` (`scripts/validation/v1.6-milestone-audit.mjs:756-808`) has a check literally named "C16: 4-edge cross-link integrity triangle" — but on inspection it is a **hardcoded 4-endpoint substring-presence check** for one specific Apple Business cross-link triangle (`.includes('12-shared-ipad-passcode-reset')` etc.), not a generic resolver. `C13: Broken-link automation` (`:658-680`) only validates that a **sidecar allowlist JSON has the right shape** (15 entries in fixed categories) — its own comment says "full mlc sweep deferred to CI," meaning the actual link-checking was intended to run via an external `markdown-link-check` npm tool in CI, and was **never implemented as in-repo Node code**.
**How to avoid:** Build `check-nav-hub-links.mjs` as a genuinely new, standalone script (per Pattern 3 above). Do not attempt to extend `v1.6-milestone-audit.mjs` (it is a frozen predecessor surface per the byte-unchanged invariant, and its C16 is scoped to one unrelated Apple Business triangle anyway).
**Warning signs:** Any plan task that says "extend C13" or "extend C16" — reject it at review time.

### Pitfall 2: cwd-relative vs. linking-file-relative path resolution (the actual root cause of the 11 broken links)
**What goes wrong:** `quick-ref-l2.md` lives at `docs/quick-ref-l2.md`. Its 11 bad links use `../operations/patch-management/04-android-patch-delivery.md` and `../admin-setup-linux/03-compliance-policy.md` — but `docs/operations/...` and `docs/admin-setup-linux/...` are both **siblings of** `quick-ref-l2.md` inside `docs/`, not one level up. The `../` walks OUT of `docs/` to the repo root, then into a nonexistent `operations/` at repo root.
**Why it happens:** Someone authored the link as if resolving from the repo root, or copy-pasted from a file one directory deeper (e.g. `docs/l2-runbooks/`, where `../operations/...` would be correct).
**How to avoid:** Confirmed exact fix — **drop the `../` prefix** on all 11 links (verified: `docs/index.md:280` links the identical `operations/patch-management/04-android-patch-delivery.md` target with no `../`, proving the convention; `quick-ref-l2.md`'s own line 326 `l2-runbooks/18-android-log-collection.md` is correctly docs-relative). Exact line numbers re-verified this research: 316, 317, 318, 320, 322, 366, 367, 368, 369, 371, 373 — all match CONTEXT exactly, byte-confirmed via direct file read.
**Warning signs:** Any `../` in a link starting from a file that lives directly under `docs/` (not a subdirectory) should be treated as suspect by default.

### Pitfall 3: `index.md:9`'s single-LINE callout is 459 chars BY ITSELF — the fix is an internal split, not a line-separation
**What goes wrong:** CONTEXT correctly identifies `index.md:9` as one of the 13 over-length callouts, but a planner might assume (as with most other over-length callouts) that simply inserting a blank line between line 9 and line 10 (its `>` continuation) resolves it, since that's the shape of the fix used elsewhere.
**Why it happens:** Line 9's C17-measured group length (lines 9+10 joined) was reported at 459 chars — but that number is line 9 ALONE (empirically verified this research: `len("**Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS) provisioning, plus cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration), and Apple Business delegated governance (Apple Business-managed device pools, shared iPad passcode reset, sub-org admin onboarding).") == 459`); line 10 alone is 144 chars; joined = 604.
**How to avoid:** Line 9 needs an **internal 3-way clause split**, confirmed clean via two natural comma-boundary breaks (verified char counts, ≤200 each):
  - Chunk A (182c): `**Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS) provisioning,`
  - Chunk B (143c): `plus cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration),`
  - Chunk C (132c): `and Apple Business delegated governance (Apple Business-managed device pools, shared iPad passcode reset, sub-org admin onboarding).`
  - Line 10 (144c) then stands as its own 4th group, already ≤200 — no change needed to its text, only a preceding blank-line separator.
  This yields 4 A-split groups separated by 3 genuine blank lines, all word-preserving (D-02's mandatory constraint), all ≤200c.
**Warning signs:** Before hand-splitting any callout, always measure the SINGLE LINE's own length first, not just the C17-reported joined-group length — a joined-group violation can hide a single-line-already-violates-alone sub-problem.

### Pitfall 4: Duplicate headings within a single hub break naive slug-set construction
**What goes wrong:** `common-issues.md` contains the identical H3 `### 802.1X Network Authentication Failure` FOUR times (lines 157, 257, 319, 395 — one per platform section). `index.md` contains `### Admin Setup` FIVE times (lines 82, 136, 174, 212, 247), `### Service Desk (L1)` four times (104, 152, 192, 227), and `### Desktop Engineering (L2)` four times (117, 162, 202, 237). A naive anchor-set builder using a plain `Set<string>` (not tracking encounter order) will silently store only one entry per duplicate text, either losing the `-1/-2/-3` variants entirely or (worse) mapping a link's fragment to the WRONG section.
**Why it happens:** These are legitimate repeated sub-navigation structures (each platform section in `index.md` has its own "Service Desk (L1)" / "Desktop Engineering (L2)" / "Admin Setup" subsection by design) — not an authoring mistake, so they will not go away in this retrofit.
**How to avoid:** Implement the checker's anchor-set builder with a `Map<slugBase, count>` that increments on each repeat and stores the SUFFIXED slug (per the GitHub-slug algorithm's step 4 above), not a plain `Set`.
**Warning signs:** No link in the current corpus targets any of these ambiguous anchors (verified via repo-wide grep during this research — zero hits for `index.md#admin-setup`, `#service-desk`, `#desktop-engineering`, or `common-issues.md#8021x-network-authentication-failure` variants), so this is a **latent correctness requirement, not a live SC2 blocker** — but the checker must still get it right so it doesn't produce false confidence if such a link is ever added (including possibly by this very phase's Summary-authoring hand-work, if an author is tempted to add a same-file cross-reference).

### Pitfall 5: Sequencing the link-checker before Summary/#12 hand-work invalidates its result
**What goes wrong:** Running the checker immediately after the fork (before hand-splitting `#12` callouts or authoring the Summary) seems efficient, but the fork's `[FILL-IN]` placeholder text and the not-yet-relocated intro blockquote are transient states — link/anchor conclusions drawn against them don't describe the final committed corpus.
**Why it happens:** It's tempting to "verify early, verify often," but this checker's job is a final-state gate, not a per-task smoke test.
**How to avoid:** Run the checker as a gate AFTER all hand-work (Summary authoring + `#12` splits + the 12 pre-existing-rot fixes) is committed, immediately before the full-corpus C17 run — see Sequencing below.
**Warning signs:** A checker run that reports 0 failures before the 12 pre-existing-rot fixes are applied is a **false negative** (the checker isn't scoped to catch `../`-prefix bugs unless it's actually run — don't mistake "haven't fixed them yet" for "checker doesn't need to run again").

## Verification of the 12 Pre-Existing Broken Links (re-confirmed this research, byte-level)

All 12 line numbers and fix texts below were independently re-verified against the live file contents during this research (not merely copied from CONTEXT):

| # | File:Line | Current (broken) | Fix |
|---|-----------|-------------------|-----|
| 1-3 | `quick-ref-l2.md:316,317,318` | `[Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation)` (×3, in a table) | Drop `../` → `operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation`. Anchor confirmed valid: target file has explicit override `## Play Integrity Attestation {#play-integrity-attestation}` at line 50. |
| 4 | `quick-ref-l2.md:320` | `[Phase 54 SSoT — Android Patch Delivery — Deadlines](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates)` inside the ⚠️ de-blockquote candidate | Drop `../`. Anchor confirmed valid: explicit override `## Deadlines & Cutover Dates {#deadlines-cutover-dates}` at line 76 of the target. (This fix is independent of, and should be applied alongside, the D-02 de-blockquote treatment of this same line.) |
| 5 | `quick-ref-l2.md:322` | same target, plain paragraph | Drop `../`. |
| 6-9 | `quick-ref-l2.md:366,367,368,369` | `[Phase 50 SSoT](../admin-setup-linux/03-compliance-policy.md#step-N-...)` (×4, in a table) | Drop `../` → `admin-setup-linux/03-compliance-policy.md#step-N-...`. Anchors confirmed valid: target headings are plain (no `{#id}`) — `### Step 2: Configure Allowed Distributions` (line 64) slugifies to `step-2-configure-allowed-distributions` (matches exactly); `### Step 3: Configure Custom Compliance (Bash Discovery Scripts)` (line 82) → `step-3-configure-custom-compliance-bash-discovery-scripts`; `### Step 4: Configure Device Encryption (dm-crypt + LUKS)` (line 107) → `step-4-configure-device-encryption-dm-crypt-luks`; `### Step 5: Configure Password Policy` (line 127) → `step-5-configure-password-policy`. |
| 10 | `quick-ref-l2.md:371` | ⚠️ de-blockquote candidate, same target file (no fragment) | Drop `../` → `admin-setup-linux/03-compliance-policy.md`. |
| 11 | `quick-ref-l2.md:373` | plain paragraph, same target file (no fragment) | Drop `../` → `admin-setup-linux/03-compliance-policy.md`. |
| 12 | `common-issues.md:360` | `[macOS: Compliance / Access Blocked](#compliance-access-blocked)` — no matching heading | **Content decision (Claude's Discretion).** The intended target is `### Compliance Failure or Access Blocked` (line 206, under `## macOS ADE Failure Scenarios`), whose real GitHub slug is `#compliance-failure-or-access-blocked` — the author apparently hand-typed a shortened anchor guess instead of the real slug. **Recommended fix: repoint** to `#compliance-failure-or-access-blocked` (the row/content is legitimate — a macOS compliance section genuinely exists — so removing the row would delete a correct cross-reference over an anchor typo). |

## Verification of the 13 Over-Length #12 Callouts (re-confirmed this research)

All 13 locations re-read from live files. All 11 A-split candidates confirmed to have a clean sentence/clause boundary (verified: every one is either 2+ full sentences, or has an em-dash/comma clause break, with no markdown link broken mid-span by the chosen split point):

| File | Line | Sentence count | Treatment (per D-02) |
|------|------|-----------------|------------------------|
| `common-issues.md` | 27 | 1 (long, "Not sure which framework?" + link) | A-split — confirm split point doesn't break the `[APv1 vs APv2](apv1-vs-apv2.md)` link; split after "...before selecting a runbook" is not needed if measured length is under 200 without the sentence itself — **verify byte length at task time**; if it needs a split, break at the "...(Device Preparation), see..." clause boundary. |
| `common-issues.md` | 94 | 2 | A-split at the sentence boundary ("...Intune portal." \| "If the naming template...") |
| `common-issues.md` | 317 | 3 | A-split at sentence boundaries; contains 2 markdown links (`admin-setup-ios/09-...`, `_glossary-macos.md#mam-we`) — verify neither straddles a split point |
| `common-issues.md` | 334 | 1 (em-dash clause) | A-split at the em-dash: "...Decision Tree]" \| "— it disambiguates..." |
| `common-issues.md` | 404 | 2 | A-split at sentence boundary; contains 1 markdown link (`quick-ref-l1.md#apple-business-quick-reference`) in the 2nd sentence — verify it stays intact |
| `quick-ref-l2.md` | 124 | 2 | A-split at sentence boundary; 2nd sentence contains the `l2-runbooks/07-...` link |
| `quick-ref-l2.md` | 237 | 3 | A-split at sentence boundaries |
| `quick-ref-l2.md` | 273 | 3 | A-split at sentence boundaries |
| `quick-ref-l2.md` | 288 | 3 | A-split at sentence boundaries (contains "PITFALL-7" reference, not a link — safe) |
| `quick-ref-l2.md` | 320 | 1 (atomic, contains a link) | **De-blockquote** (per D-02) — confirmed 228 chars as a single line; A-split is numerically possible (CONTEXT measured 76c/155c) but fractures the sentence between subject-list and verb |
| `quick-ref-l2.md` | 339 | 2 | A-split at sentence boundary (contains "PITFALL-7" reference, not a link) |
| `quick-ref-l2.md` | 371 | 1 (atomic, contains a link) | **De-blockquote** (per D-02) — confirmed 211 chars as a single line |
| `index.md` | 9 | 1 (long, list-heavy) | **A-split, internal 3-way** — see Pitfall 3 above; confirmed 459 chars alone, needs splitting at 2 internal comma boundaries into 182c/143c/132c chunks, THEN a 4th blank-line separator before line 10 (144c, unchanged) |

`quick-ref-l1.md` has **zero** over-length callouts (confirmed via full-file read — its platform-coverage callout at lines 9-10 is short, and its escalation-trigger bullets are not blockquotes).

## Sequencing

Recommended task order (matches CONTEXT's "Claude's Discretion" ordering note, made concrete):

1. **Registry rows first.** Hand-author RE-218 (`common-issues.md`), RE-219 (`index.md`), RE-220 (`quick-ref-l1.md`), RE-221 (`quick-ref-l2.md`) in `docs/_registry/RE-index.md`, path-alphabetical, `Doc Type: Reference`, `Status: Approved`. Must precede the fork run (`buildDocIdMap()` join-on-Path will fail closed with `DOC-ID-UNRESOLVED` otherwise).
2. **Fork the script.** Create `scripts/pipeline/retrofit-nav-hub.mjs` per Patterns 1-2 above.
3. **Dry-run, then write.** `--dry-run` first against the 4 explicit paths, confirm `docType=Reference`, `platform-injected=N`, `d1=All Platforms`, `vhBranch=PREPEND-3col` for all 4; then run for real (writes files, emits `[FILL-IN]` Summary placeholders).
4. **Hand-split the 13 `#12` callouts.** Per the table above. Note: `common-issues.md`'s and `quick-ref-l2.md`'s relocated intro/coverage blockquotes are NOT in the 13-callout list (their own #12 status was already clean at 2-line joined length — only `index.md:9`'s relocated blockquote is itself a violation).
5. **Author the 4 net-new `## Summary` sections.** ≥30 words each, matching the RE-142 exemplar shape (`docs/reference/00-index.md:17-19`: net-new scope paragraph + retained intro immediately below). This must happen AFTER step 4 if the Summary text is placed before the relocated intro span (it is, per the fork's fixed output order) — no ordering conflict, but do this before step 6 since the link-checker's inbound scan should run against final heading text.
6. **Fix the 12 pre-existing broken links**, as a SEPARATE commit from steps 2-5 (git-blame-attributed as pre-existing-rot cleanup per D-01's explicit instruction — do not let this commit's diff get folded into the retrofit-envelope commit).
7. **Run the link-checker** (`check-nav-hub-links.mjs`) against the final corpus state — must be 0 failures on both outbound and inbound scans.
8. **Run full-corpus C17** (`c17-eee-contract.mjs`, no arguments — it walks all of `docs/` and self-selects enrolled files) — must exit 0 (this also re-validates all 174+ previously-enrolled files are still clean, per the established Phase-119/121/122 pattern of always running the FULL corpus, not just the 4 new files).
9. **Navigation-last attestation** (SC3) — see Verification below.

**Ordering hazard already flagged in CONTEXT and reconfirmed:** the link-checker (step 7) must run AFTER Summary insertion (step 5) since inserting `## Summary` mutates each hub's H2 ordering — though (as verified this research) it does not rename any EXISTING H2/H3 text, so no live inbound anchor actually breaks; running the checker only after all mutations are final is still the correct discipline to avoid false confidence.

## Verification

### SC1 — C17 exits 0 on all four hubs
```bash
node scripts/validation/c17-eee-contract.mjs --verbose
```
Confirm the per-file section for each of the 4 hubs shows no `[#N]` violation lines, and the final line reads `C17 assertion-violation-counts: #1=0 #2=0 ... #13=0` with `0 total violations` (this is a full-corpus run; it also re-proves all previously-enrolled files remain green, matching the Phase-122-15 precedent of "full-corpus C17 225/0").

### SC2 — link-checker green + the 12 pre-existing-rot fixes landed
```bash
node scripts/validation/check-nav-hub-links.mjs --verbose
```
Must exit 0. Additionally confirm via `git log --oneline -- docs/quick-ref-l2.md docs/common-issues.md` that a commit exists whose message identifies it as the pre-existing-rot cleanup (distinct from the EEE-envelope commit), satisfying D-01's "commit the 12 fixes separately" instruction.

### SC3 — navigation-last git-history attestation
```bash
# 1. Find the latest commit touching any Phase-121/122 content class (excludes the 4 hubs themselves)
git log -1 --format='%H %cI %s' -- \
  docs/decision-trees/ docs/lifecycle/ docs/lifecycle-apv2/ \
  docs/android-lifecycle/ docs/ios-lifecycle/ docs/macos-lifecycle/ docs/linux-lifecycle/ \
  docs/end-user-guides/ docs/_glossary*.md \
  docs/admin-setup-apv1/00-overview.md docs/admin-setup-apv1/01-hardware-hash-upload.md \
  docs/admin-setup-apv2/00-overview.md docs/admin-setup-android/00-overview.md \
  docs/admin-setup-ios/00-overview.md docs/admin-setup-macos/00-overview.md \
  docs/admin-setup-linux/00-overview.md docs/admin-setup-8021x/00-overview.md \
  docs/admin-setup-8021x/01-eap-method-overview.md docs/reference/ca-enrollment-timing.md

# 2. Find the EARLIEST Phase-123 commit touching any of the 4 hubs
git log --reverse --format='%H %cI %s' -- \
  docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md | \
  awk -v cutoff="<date from step 1>" '$2 > cutoff' | head -1
```
Confirm the step-2 result's commit date is strictly later than step 1's (mirrors the already-verified baseline: this research confirmed via `git log` that the most recent commit touching any of the 4 hub files today is `cf6aa5c` (Phase 110, `feat(110-04)`), and the most recent commit touching the Phase-122 decision-tree class is `91daa66` (`feat(122-05)`, 2026-07-07) — i.e., navigation-last already holds trivially as of research time since no hub edits have landed since Phase 110; Phase 123's own commits just need to land after 2026-07-07 to preserve it, which they will by construction of running this phase after Phase 122's completion).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The recommended `#12` split points for `common-issues.md:27/94/317/334/404` and `quick-ref-l2.md:124/237/273/288/339` are clause/sentence boundaries chosen by inspection, not byte-measured for every candidate split (only 320/371/index.md:9 were precisely measured this research) | Verification of the 13 Over-Length Callouts | Low — if a chosen split point still exceeds 200c on one side, the executor must re-split further at task time; no content-loss risk since the constraint (word-preserving) is unaffected, only exact split-point placement |
| A2 | The recommended repoint target for `common-issues.md:360` (`#compliance-failure-or-access-blocked`) is this research's inference from context (macOS section, matching link text), not an explicit instruction found elsewhere in the corpus | Verification of 12 Pre-Existing Broken Links, row 12 | Low — this is already flagged as "Claude's Discretion" in CONTEXT; if a different repoint is preferred, only one line changes |

**If this table is empty:** N/A — see above; both entries are low-risk implementation-detail assumptions, not decisions requiring user confirmation (the underlying gray areas were already resolved by CONTEXT's adversarial-review lock).

## Open Questions

None blocking. The single "Claude's Discretion" item not fully resolved by this research (exact Summary prose wording) is intentionally left to the executor, matching every prior retrofit phase's pattern (121, 122).

## Environment Availability

Skip — this phase has no external tool/service dependencies. Node.js is already required and available (used by every prior phase's `scripts/pipeline/` and `scripts/validation/` tooling); no new runtime, database, or CLI dependency is introduced.

## Validation Architecture

Skipped — `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (default: enabled), but this phase has **no application security surface** — it is a documentation corpus + build-time Node.js tooling with no runtime service, no authentication, no user input handling, and no network calls. The ASVS categories (V2 Authentication, V3 Session Management, V4 Access Control, V5 Input Validation, V6 Cryptography) are not applicable to a static-file retrofit + linter.

The one defensive property worth stating explicitly for the link-checker's implementation: **path resolution must stay within the repo tree.** Because the checker resolves attacker-uninfluenced but still relative (`../`) paths from markdown link targets, a pathological `../../../../etc/passwd`-style target in a future corpus edit should resolve to a nonexistent path and simply FAIL the existence check (not throw, not read arbitrary filesystem content) — `existsSync` naturally handles this since such a target from `docs/` still won't exist. No additional hardening is needed; this is local dev/CI tooling, not an exposed service, and the corpus is a first-party-authored, code-reviewed markdown tree, not untrusted input.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | N/A — no auth surface |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | No (defense-in-depth only) | `existsSync` naturally bounds path traversal to "file not found," no shell/exec invocation anywhere in the checker |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack
None applicable — no STRIDE-relevant threat surface exists for a build-time markdown linter with no network/auth/exec component.

## Sources

### Primary (HIGH confidence — direct file reads / grep / git log against the live repo, this session)
- `D:\claude\Autopilot\.planning\phases\123-orphan-nav-hub-retrofit-navigation-last\123-CONTEXT.md` — full read, all 4 locked decisions + specifics
- `D:\claude\Autopilot\.planning\REQUIREMENTS.md` — RETRO-06, traceability table
- `D:\claude\Autopilot\.planning\STATE.md` — v1.16 phase dependency summary, decision log through Phase 122
- `D:\claude\Autopilot\.planning\ROADMAP.md` (Phase 123 section, lines 150-161) — Goal + 3 Success Criteria
- `D:\claude\Autopilot\scripts\pipeline\retrofit-mermaid-structural.mjs` — full read (992 lines), the fork base
- `D:\claude\Autopilot\scripts\validation\c17-eee-contract.mjs` — full read (590 lines), the C17 contract + #12/#5/#4 assertion logic
- `D:\claude\Autopilot\scripts\validation\v1.6-milestone-audit.mjs` — targeted read of C13/C16 sections, confirming no reusable link-checker exists
- `D:\claude\Autopilot\docs\index.md`, `docs\common-issues.md`, `docs\quick-ref-l1.md`, `docs\quick-ref-l2.md` — full reads, all line numbers/anchors/callouts verified byte-level
- `D:\claude\Autopilot\docs\operations\patch-management\04-android-patch-delivery.md`, `docs\admin-setup-linux\03-compliance-policy.md` — heading grep, confirming `{#id}` overrides and plain-slug targets
- `D:\claude\Autopilot\docs\_registry\RE-index.md` (tail) — confirmed RE-217 is the current max, contiguous
- `D:\claude\Autopilot\docs\_standards\EEE-SOP-standard.md` (lines 140-189) — nav-hub Doc Type LOCK (D-07) + non-MECE precedence rule
- `D:\claude\Autopilot\docs\reference\00-index.md`, `docs\error-codes\00-index.md` — Summary + A-split exemplars
- `git log` / `git log -L` against `docs/quick-ref-l2.md`, the 4 hub files, and decision-tree files — navigation-last baseline + broken-link-age confirmation
- Repo-wide `grep` for `{#[a-z0-9_-]+}` (87 matches, 29 files) and for inbound fragment-links into the 4 hubs (11 total) — both counts independently re-derived, matching CONTEXT's claims exactly

### Secondary / Tertiary
None — this is a fully self-contained internal-tooling research task; no web search or Context7 lookup was needed or performed (no external library/framework is involved).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no external packages; zero-dependency convention confirmed by reading every relevant file's imports
- Architecture (fork diff): HIGH — exact line numbers verified against the live file at read time; all guard behaviors traced through `processFile()`'s actual logic, not inferred
- Link-checker spec: HIGH — algorithm empirically re-derived and verified against 3 independent live corpus examples (not merely copied from CONTEXT's prose description)
- Pitfalls: HIGH — all 5 pitfalls grounded in direct grep/read evidence gathered this session (including 2 landmines — the `index.md:9` internal-split requirement and the duplicate-heading dedup requirement — not explicitly called out in CONTEXT)

**Research date:** 2026-07-08
**Valid until:** Effectively indefinite for the fork-diff and link-checker-algorithm sections (internal tooling, not subject to ecosystem drift). Re-verify the byte-level line numbers/counts in the "Verification of..." tables if any hand-edit lands on the 4 hub files or their link targets between now and plan execution (low risk given navigation-last discipline holds these files frozen until this phase).
