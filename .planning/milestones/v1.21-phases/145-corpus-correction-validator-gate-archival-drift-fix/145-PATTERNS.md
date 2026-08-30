# Phase 145: Corpus Correction, Validator Gate & Archival-Drift Fix - Pattern Map

**Mapped:** 2026-08-19
**Files analyzed:** 5 pattern categories covering ~35 files across 5 commit-atom classes (per D-17)
**Analogs found:** 4 / 5 categories have a direct precedent; 1 (attribution/correction prose) has none — new authoring

This is a documentation + validator repo, not an app. "Patterns" below means prose conventions in
`docs/` and validator idioms in `scripts/validation/`, not component/service/controller shapes.

## File Classification

| New/Modified File(s) | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/operations/patch-management/{00..04}*.md` (FIX-01..10 body edits + `**Source:**` lines) | content/prose | transform (in-place correction) | `docs/admin-setup-macos/10-kerberos-sso-extension.md:156` (Source-line shape) | exact (citation shape) / none (attribution rhetoric — new) |
| `scripts/validation/check-phase-59.mjs` (FIX-12, `V-59-14` only) | validator (Node script) | transform (live read → frozen read) | `check-phase-59.mjs:315` (`V-59-07`) and `:659` (existing frozen call-sites in the **same file**) | exact — self-analog, no need to look elsewhere |
| `docs/_glossary-linux.md`, `_glossary-apple-business.md`, `l2-runbooks/25-...md`, `cross-platform/apple-business/10-...md` (FIX-11, 11 lines/4 files) | content/prose | transform (link/label strip or inline) | no single analog needed — each site's own adjacent sentence is the pattern (D-30/D-31 already name the exact substance per site) | n/a — mechanical, self-contained |
| `scripts/generate-diagrams.py:1544` + `docs/decision-trees/09-linux-triage.md` + `docs/diagrams/decision-tree-09-linux-triage.svg` | build script (Python) + content + generated artifact | transform (string literal edit → regenerate) | sibling `title(W // 2, 36, ...)` calls at lines 258/362/504/779/959/1040/1126/1200/1265/1317 in the same file | exact — same function, same call shape |
| `co-management/03-cocmgmt-migration-paths.md:25` (D-50 token swap) | content/prose | transform (5-word parenthetical swap) | none needed — single-line literal replace | n/a |

## Pattern Assignments

### 1. `**Source:**` evidence-line convention (D-01, applies to all FIX-10 sites across the 5 patch-management files)

**Analog:** `docs/admin-setup-macos/10-kerberos-sso-extension.md:156`

**Verbatim shape (read directly):**
```markdown
**Source:** [Microsoft Learn -- Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) (updated 2026-06-15)
```
Placed as its own paragraph, directly beneath the paragraph carrying the claim it supports — not inside a blockquote, not inline/parenthetical.

**Variant survey (do not use these shapes for D-01 — they are different conventions in the corpus, cited here only so the planner doesn't confuse them):**
- `[CITED: training; needs live verification ...]` — 19 files, all under `docs/cross-platform/apple-business/` and `docs/l1-runbooks/` — an inline bracket flag for *unverified* training-knowledge content, not a dated first-party citation. Do not use for FIX-10.
- `[VERIFIED: ...]` — 3 files (`l1-runbooks/22`, `25`, `26`), same bracket-flag family, opposite polarity.
- `| Source |` table column — 4 files (`admin-setup-android/02`, `07`; `l2-runbooks/07`; `reference/imaging-to-autopilot.md`) — a tabular citation register, not a prose line. Not applicable inside patch-management's flowing paragraphs.
- `**Source confidence:**` — 3 files only (`l2-runbooks/18`, `l2-runbooks/24`, `linux-lifecycle/01`) — too thin a sample per D-12 to treat as a convention; do not import it.

**Use exactly the `10-kerberos-sso-extension.md:156` shape** — `**Source:** [Title](url) (updated YYYY-MM-DD)`, standalone paragraph, markdown-linked URL (not bare, per D-02's `V-54-29` link-stripping requirement).

### 2. Frozen-read conversion (FIX-12, `check-phase-59.mjs` `V-59-14`)

**Analog A — the historical precedent:** commit `066a9068` (Phase 128), which converted 8 validators' live `fs` reads to `readAtV116Close`. Representative diff shape from that commit message (files touched: `check-phase-101.mjs`, `109`, `118`, plus `_lib/frozen-at-close.mjs` gaining the export) — the mechanical move in every case was: swap the read-call only (`readFile(X)` → `readAtV116Close(X)`), leave needle/expected strings byte-unchanged, no import added (helper already imported at file top), append the frozen-tag suffix to the assertion **name** string, never touch `CHAIN_SKIP`/`CHAIN_PHASES`.

**Analog B — the exact template, already inside the target file itself:** `check-phase-59.mjs` already contains two `readAtV15Close` call sites to copy directly, so there is no need to look outside this file:

- `:307-315` (`V-59-07`, naming suffix D-37 says to copy):
```js
id: 7, name: 'V-59-07: docs/index.md Linux H2 -- 3 sub-H3 + row counts L1=4 / L2=4 / Admin=3 [v1.5-frozen @ ba2cbc0]',
run() {
  // frozen-aware: read docs/index.md at v1.5-close (Phase 59's own milestone). The live +1 rows
  // (L1/L2=5, Admin=4) are Phase-109 802.1X additions, out of Phase 59's deliverable scope.
  const c = readAtV15Close(INDEX_MD);
```

- `:657-660` (throw-don't-swallow comment D-36 says to match):
```js
const c = readAtV15Close(f);
// no null-check: readAtV15Close throws on git error; let it propagate
```

**The exact required edit** (RESEARCH.md's own re-measurement, HEAD `9182718b`):
```js
// Current (line 448):
const c = readFile(OPS_INDEX_MD);
// Required:
const c = readAtV15Close(OPS_INDEX_MD);
```
Plus the assertion name at line 447 — current `'V-59-14: docs/operations/00-index.md row counts -- Patch=5 / App=5 / Drift=5'` becomes (per D-35/D-37) something appending `[v1.5-frozen @ ba2cbc0]` and rephrasing to "carried five Patch rows at v1.5 close" (not "Phase 59 shipped five rows"). `readAtV15Close`/`readAtV116Close` are already imported at line 14 — no import edit needed. Rename the **assertion**, never the file (`audit-harness-v1.5-integrity.yml:270`'s `if [ -f … ]` guard would silently skip a renamed file).

### 3. Attribution / correction prose pattern (D-08..D-10) — **NO PRECEDENT EXISTS**

Searched `docs/` for any existing place stating a superseded corpus position alongside a corrected one (grep for `no longer`, `superseded`, `previously stated`, `earlier framing`, `this guide` near correction-shaped language). Nothing matches the shape CONTEXT.md specifies (corrected-statement-primary + paraphrased-corpus-attributed-superseded-clause + `**Source:**` line beneath). This is genuinely new authoring, not a pattern to copy from elsewhere in the corpus.

RESEARCH.md already supplies a worked example (not shipped prose, illustrative only) at its "Correction rhetorical shape" section:
```markdown
Hotpatch is enabled by default for eligible Windows 11 Enterprise 24H2+ devices from May 2026
onward, configured at two levels — a tenant-wide default that applies only to devices not targeted
by a quality-update policy, and a per-policy setting on the Windows quality update policy that wins
where assigned — a correction to this guide's earlier framing, which described a single opt-out
toggle. VBS is required; Arm64 devices are supported with CHPE disabled
(`HotPatchRestrictions=1`).

**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02)
```
Use this shape (corrected fact stated first; superseded framing folded into a trailing subordinate
clause attributed to "this guide," never to Microsoft; `**Source:**` line beneath) for all of
FIX-05/07/08 and by extension FIX-01/02/03/06/09. Every D-10 pinned literal must survive inside the
true sentence — that is what makes the shape validator-safe.

### 4. Platform-applicability blockquote + frontmatter block (D-06, D-07)

**Analog:** `docs/operations/patch-management/00-overview.md:1-20` (verbatim, read directly) — this is the actual file to be edited, so it is simultaneously the analog and the target; all five patch-management files open with the identical shape:

```markdown
---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: cross-platform
---

> **Platform applicability:** This guide is the cross-platform patch & update overview hub for
> Windows, macOS, iOS/iPadOS, and Android — covering concept terminology, the deferral-vs-enforcement
> distinction, and per-platform routing.
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md) for ring topology and Autopatch
> disambiguation.
...
```

Confirmed present in all 5 files (`00-overview.md` through `04-android-patch-delivery.md`) via grep on `review_by|last_verified`. Preserve this frontmatter/blockquote structure exactly; re-stamp only `last_verified`/`review_by` values (D-06: `review_by = last_verified + 60 days`, `last_verified` = actual commit-landing date, never blindly 2026-08-19). Evidence lines (`**Source:**`) go **outside** this blockquote, per D-07 — i.e., in the body paragraphs below it, never inserted as a new `>`-prefixed line inside it.

### 5. SVG generator edit (D-45, D-48)

**Target:** `scripts/generate-diagrams.py:1544`, inside `gen_dt_09()` (the Linux Triage diagram function):

```python
out += title(W // 2, 36, "Linux Triage Decision Tree",
             "Linux Intune client (Ubuntu 22.04 / 24.04 LTS)  ·  docs/decision-trees/09-linux-triage.md")
```

**`title()` signature** (`:82-87`):
```python
def title(x: int, y: int, text: str, sub: str | None = None) -> list[str]:
    out = [f'  <text x="{x}" y="{y}" text-anchor="middle" class="title">{h(text)}</text>']
    if sub:
        out.append(f'  <text x="{x}" y="{y + 22}" text-anchor="middle" class="subtitle">{h(sub)}</text>')
    return out
```
Confirms D-48: this is the centre-anchored `sub=` subtitle argument (rendered at `y+22` under the title, i.e. y=58 on this 1200×900 canvas), **not** the footer — the real footer is a separate call, `footer_path(W-20, H-8, "docs/diagrams/decision-tree-08-android-triage.svg")` (seen at the end of `gen_dt_08()`, immediately preceding `gen_dt_09()` in the file).

**Sibling `title(...)` call for shape comparison** (e.g. `gen_dt_00` at `:258`):
```python
out += title(W // 2, 36, "Initial Triage Decision Tree", "APv1 (classic Autopilot) — L1 symptom routing  ·  docs/decision-trees/00-initial-triage.md")
```
Same `W // 2, 36` position args, same `"<Title>", "<subtitle text>  ·  <doc path>"` shape — confirms the edit at `:1544` should only change the version-list text inside the subtitle string (per D-48: `Ubuntu 24.04 / 26.04 LTS · RHEL 9 / 10`), keeping the `·  docs/decision-trees/09-linux-triage.md` suffix and the title text untouched.

**Companion markdown site** (same commit, per D-49): `docs/decision-trees/09-linux-triage.md` carries the matching slash-compound `Ubuntu 22.04/24.04 LTS` at 3 sites — `:19` (page intro), `:21` (inside `> **Platform gate:**` blockquote), `:27` (body prose) — all three must be updated to the same version list as the SVG subtitle in the same commit, or the diagram and its page disagree.

## Shared Patterns

### Per-commit validator gate (D-18)
**Source:** RESEARCH.md's confirmed-green table (all run live at HEAD `9182718b`) — `check-phase-53.mjs`, `check-phase-54.mjs`, `check-phase-57.mjs`, `check-phase-59.mjs`, `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`, `v1.20-milestone-audit.mjs` (the only **live** C11 reader — see RESEARCH.md's Validator Architecture finding: 15/16 milestone-audit scripts are frozen-at-their-own-close and cannot observe a Phase-145 edit).
**Apply to:** every commit in D-17's five commit-atom classes; `check-phase-54.mjs` is additionally a **hard** gate on any commit touching `01-windows-wufb-rings.md`.

### Pin-is-literal-presence-test (not claim-endorsement)
**Source:** RESEARCH.md "Established Patterns" — `V-54-12` can require the literal `May 2026` to survive while the corpus states May 2026 is *unsupported*, because the literal appears inside a true sentence. This is the mechanism that makes the correction/attribution shape (pattern 3 above) validator-safe. Apply to every FIX-01..FIX-08 rewrite that touches a pinned literal (see D-10's preservation list).

### C11 same-commit keyword insertion before deletion
**Source:** D-13/D-14, `00-overview.md:76-87`. Before removing "mutually exclusive"/"mutual-exclusion" prose that currently keeps the three `\bAutopatch rings\b` hits C11-compliant, insert an allowlisted keyword (`disambiguation`, `PITFALL-9`, etc.) into the same window, in the same commit. Verify with `node scripts/validation/v1.20-milestone-audit.mjs` (live reader), not `v1.5-milestone-audit.mjs` (frozen, cannot see this edit).

## No Analog Found

| File/Site | Role | Reason |
|---|---|---|
| Attribution/correction rhetorical shape (FIX-05/07/08 and by extension 01/02/03/06/09) | content/prose | No existing place in `docs/` states a superseded corpus claim alongside its correction in this shape — confirmed by targeted grep (`no longer`, `superseded`, `previously stated`, `earlier framing`). This is new authoring; use RESEARCH.md's worked (illustrative, not shipped) example as the template, governed by D-08/D-09/D-10's per-file token constraints. |

## Metadata

**Analog search scope:** `docs/admin-setup-macos/`, `docs/operations/patch-management/`, `docs/cross-platform/apple-business/`, `docs/l1-runbooks/`, `docs/l2-runbooks/`, `docs/admin-setup-android/`, `docs/reference/`, `docs/linux-lifecycle/`, `scripts/validation/check-phase-59.mjs`, `scripts/generate-diagrams.py`, git history at commit `066a9068`.
**Files scanned:** ~40 (grep sweeps) + 5 read directly in full/targeted excerpt.
**Pattern extraction date:** 2026-08-19. No source files modified; SVG/`docs/` tree left untouched (no generator run performed).
