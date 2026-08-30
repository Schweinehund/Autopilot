# Phase 148: Application Update Management & WinGet Routing - Pattern Map

**Mapped:** 2026-08-23
**Files analyzed:** 3 (2 new, 1 modified)
**Analogs found:** 3 / 3

This is a documentation corpus, not application code. "Patterns" means authoring/structural
conventions (frontmatter, H2 skeleton, blockquote/citation shapes, table shapes), not code idioms.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/operations/patch-management/07-windows-autopatch.md` | new sibling guide (doc) | authored content, not registered/enrolled | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | exact (structural sibling: outside `PATCH_FILES`, no `doc_id`, no Version History, 10 H2s / 8 anchors precedent) |
| `docs/operations/patch-management/08-windows-app-updates.md` | new sibling guide (doc) | authored content, not registered/enrolled | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (structure) + `05-linux-update-delivery.md` (most recent sibling, confirms the pattern held twice) | exact |
| `docs/operations/patch-management/00-overview.md` | hub/index doc (4 additive edit sites + conditional re-stamp) | in-place text edit | itself (Phase 146/147 already inserted 4th/5th platform bullets, table columns, Related Resources entries, routing bullets in this exact file) | exact (self) |

Cross-linked, **never edited**: `01-windows-wufb-rings.md` (sealed, Phase 146), `co-management/03-cocmgmt-migration-paths.md` (cross-link only per CONTEXT D-49), `docs/operations/app-lifecycle/**` (D-35).

## EOL report — read before any edit

`git ls-files --eol` (measured this session):

```
i/lf    w/crlf   docs/operations/patch-management/00-overview.md          <- EDITED this phase, CRLF in worktree
i/lf    w/crlf   docs/operations/patch-management/01-windows-wufb-rings.md
i/lf    w/crlf   docs/operations/patch-management/02-macos-update-enforcement.md
i/lf    w/crlf   docs/operations/patch-management/03-ios-update-lifecycle.md
i/lf    w/crlf   docs/operations/patch-management/04-android-patch-delivery.md
i/lf    w/lf     docs/operations/patch-management/05-linux-update-delivery.md
i/lf    w/lf     docs/operations/patch-management/06-windows-driver-firmware-updates.md   <- analog, LF
---
i/lf    w/crlf   docs/operations/co-management/03-cocmgmt-migration-paths.md  <- cross-linked, never edited
```

Same trap class as Phases 146/147: `00-overview.md` is CRLF in the worktree while the structural
analog (`06-`, and now `05-`) is LF. Per CONTEXT D-56: **verify every `00-overview.md` string
replacement actually matched — a zero-match is silent.** `07-` and `08-` are new files — author them
LF-consistent with `06-`/`05-` (`.gitattributes` + `core.autocrlf=true` normalizes on checkout).

## Pattern Assignments

### `docs/operations/patch-management/07-windows-autopatch.md` (new)

**Analog:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md`

**Frontmatter pattern** (`06:1-7`, verbatim):
```
---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---
```
For `07-`: same field set, `platform: Windows`, `applies_to: all`, `audience: admin`,
`last_verified` = actual execution date, `review_by` = that + 60 by arithmetic (CONTEXT D-70). No
`doc_id` line — Phase 152 SC#3 makes non-enrollment permanent for `docs/operations/`.

**Platform-applicability blockquote + H1 pattern** (`06:9-16`, verbatim):
```
> **Platform applicability:** This guide is Windows-specific and covers the Intune driver and
> firmware update policy as its own surface — approval modes, the approval workflow, deferral and
> deadline behavior, OEM catalog and firmware delivery, reporting, Configuration Manager
> co-existence, and the documented absences. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For WUfB deployment ring topology and Autopatch ring
> disambiguation, see [Windows WUfB Rings](01-windows-wufb-rings.md).

# Windows Driver and Firmware Updates
```
`07-` H1 is `# Windows Autopatch` (CONTEXT D-71). Blockquote must use the full lexicon `> **Platform
applicability:**` (never the bare `> **Platform:**` — `V-54-27` corpus-wide negative), name the
guide's scope, and cross-link `01#hotpatch` + `01#autopatch-disambiguation` (D-19) — the corpus's
first inbound links into either anchor.

**Evidence-line pattern — blockquote immediately followed by a standalone `**Source:**` paragraph**
(`06:44-48`, verbatim):
```
> In Microsoft Intune, Windows driver updates are managed through **driver update policies**, which
> provide a dedicated policy surface for reviewing, approving, and deploying driver updates to
> managed devices.

**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)
```
Rule (carried by CONTEXT D-63/D-64): **one Source line per one blockquote of contiguous quotes from
one page; own paragraph, standalone, after the claim; never spans claims from different pages.**
This phase carries the milestone's heaviest multi-page quote load (D-64) — do not let one Source
line cover the two side-by-side license lists (APP-02) or the eight EAM limitations (APP-04); each
distinct-page claim gets its own line.

**`## Unsupported and Anti-Feature Callouts` shape — bold sub-label + blockquote(s) + prose + Source**
(`06:664-690` / mirrored `05:382-410`): pinned corpus H2 literal (D-24) — copy verbatim including
capitalization. Bold sub-labels for each pitfall, never a `PITFALL-N` identifier — precedent
`01-windows-wufb-rings.md:184` `**Dual-scan source conflict pitfall:**` and `05:384`
`**Root-context execution hazard.**`.

**Own-line anchor pattern** (`06:37,130,206,...`):
```
<a id="what-this-policy-does"></a>
## What This Policy Does
```
One `<a id="...">` per H2 except `## Related Resources`/`## External References`, own line,
immediately before the heading. `07` gets 8 anchors (D-15's skeleton) — these become the Phase-151
Recipe #5 cross-link contract.

**Related Resources / External References footer pattern** (`06:773-791`, verbatim shape):
```
## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — WUfB deployment ring topology, Autopatch ring
  disambiguation, Hotpatch, and the driver/firmware policy stub
- [Workload Slider Migration](../co-management/02-windows-workload-sliders.md) — Co-management
  workload migration sequence, including the Windows Update workload slider
- [Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md) — Windows
  Autopatch prerequisites and co-management workload sequencing

## External References

- [Configure Windows driver update policies (Microsoft Learn)](...)
...
```
`07` links `co-management/03#autopatch-prerequisites` (anchor confirmed live at `03:33`) per D-21 —
cross-link only, never edit `03`.

**No code fences anywhere** — all corpus `docs/operations/patch-management/*.md` files carry zero
fences (D-48); render the four-step hierarchy, CSP table and license lists as prose/tables/
blockquotes only.

**H2 skeleton (D-15, verbatim from CONTEXT — matching `05`/`06`'s 10-H2/8-anchor shape):**
```
## What Windows Autopatch Is and Is Not
## Enrollment and Prerequisites
## Autopatch Groups and the Test / Last Model
## Autopatch and Windows Update Client Policies
## Update Workloads and Service Objectives
## Autopatch and Hotpatch
## Reporting and Communications
## Unsupported and Anti-Feature Callouts
## Related Resources
## External References
```
American spelling throughout — `Enrollment`, `license`, `behavior`, `organization` (D-16; H2 becomes
a link-checked slug).

---

### `docs/operations/patch-management/08-windows-app-updates.md` (new)

**Analog:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (structure) and
`05-linux-update-delivery.md` (confirms the pattern held on the most recently authored sibling).

Same frontmatter field set as `07-` (platform: Windows). Same blockquote/H1/anchor/footer/no-fence
patterns as `07-` above — do not re-derive; copy `06`'s shapes verbatim.

**H2 skeleton (D-25, verbatim from CONTEXT):**
```
## Choosing a Windows App Update Mechanism
## Microsoft 365 Apps Update Channels
## Setting the Channel from Intune                  <- CONDITIONAL: drop if research fetch (a) fails (D-02)
## Enterprise App Management
## Microsoft Store Apps
## Enterprise App Management, Store Apps and WinGet — Routing
## Controlling WinGet on Managed Devices
## Unsupported and Anti-Feature Callouts
## Related Resources
## External References
```
10 H2s / 8 anchors normally, 9 H2s / 7 anchors if the D-02 conditional H2 is dropped (state the
absence in `## Microsoft 365 Apps Update Channels` instead).

**Four-step hierarchy renders as a decision list, never a code fence** (D-48) — `WINGET-GAP.md:271-276`
supplies it fenced; corpus convention (all patch-management files) is zero fences.

**Verbatim FAQ negative — quote exactly, do not extend** (D-39):
> "Does Enterprise App Management use **Winget**?" — "No. Enterprise App Catalog apps are directly
> installed by the Intune management extension (IME)."
Guardrail (WINGET-GAP.md:222-226, quoted verbatim in CONTEXT): "Do not extend it, do not paraphrase
it into something stronger, and do not attach a date or a rationale Microsoft did not give."

**`08` cross-links `app-lifecycle/01#supersedence`** only where supersedence is the actual mechanism
(the Win32 fallback tier) — never for EAM auto-update, which explicitly is not supersedence (D-34).
No edits to `docs/operations/app-lifecycle/**` (D-35).

**Absent-cadence contrast pattern** — follow `05`'s "no documented run-time cap" phrasing convention
(prose stating an absence, contrasted against the published EAM SLOs) rather than inventing a number
(D-32).

---

### `docs/operations/patch-management/00-overview.md` (four additive edit sites + conditional re-stamp)

**Analog:** itself — this is the file's **fourth** touch (Phase 145/146/147 already did additive
platform-bullet / table-column / Related-Resources-entry / routing-bullet insertions here). Follow
the same insertion shapes those phases used; grep the file for the most recent Windows/Linux entries
as the literal template rather than the `06`/`05` guides.

**Site pattern — Related Resources entry** (existing shape, e.g. `06`'s entry):
```
- [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md) — <summary clause>
```
Insert `07-windows-autopatch.md` then `08-windows-app-updates.md` bullets after `06`'s entry,
keeping Windows entries contiguous (D-52).

**Site pattern — routing bullets**: insert after the `01` Windows bullet, order `07`, `08` (D-52).
**One physical line per bullet, per entry, per table row** — `V-54-29`'s strip is per-physical-line
and does not cross a wrapped link (D-53's two silent leaks: em-dash description leak + wrapped-link
leak). **Never write `Hotpatch`, `VBS`, or `MEETS_STRONG_INTEGRITY` in any `00-overview.md`
insertion** — probed 31/1 FAIL when present, 32/0/0 when absent (D-53).

**No new comparison-table row** (unlike Phase 147's Linux column-add) — D-54: this phase adds no
platform, so the 5-column table is untouched. No change to the `> **Platform applicability:**`
blockquote lead-in (`V-54-26` pins the literal in the first 50 body lines).

**Conditional re-stamp, computed by arithmetic** (D-55): current `last_verified: 2026-08-21 /
review_by: 2026-10-20` — exactly 60 days, zero slack under `V-54-07`'s `> 60` test. If the execution
date differs, re-stamp both fields together (`review_by = last_verified + 60`); if it matches, no-op.
Never advance one stamp without the other (`V-54-07` has no lower bound — a negative interval passes
silently).

**"(file numbers 01 through 05)" prose does NOT change** (D-57) — describes the five per-platform
files; `06`/`07`/`08` are not per-platform. But `five` occurs at 7 sites — build the full site map
before editing (147 D-37 precedent).

## Shared Patterns

### Evidence-line contract (applies to every `**Source:**` line in `07`/`08`)
**Source:** `06-windows-driver-firmware-updates.md` (64 instances) and `05-linux-update-delivery.md`
(11 instances). One Source line per one contiguous blockquote from one page; own paragraph,
standalone, line-start, placed after the claim; never spans two source pages (D-63/D-64). `grep -rn
"Source:" scripts/` = 0 — human-only contract, unenforced by any validator; the verifier is the only
gate that catches a fabricated quote (D-62).

### No code fences in `docs/operations/patch-management/`
Zero fences across all seven existing files; `07`/`08` continue the pattern (D-48).

### `## Unsupported and Anti-Feature Callouts` — the pinned H2 literal
Now exists in SEVEN corpus files, two under `docs/operations/` (`06:664`, `05:382`) — D-24
(corrects 147's stale six-file/one-instance count). Copy the literal exactly.

### American spelling, zero exceptions
`Enrollment`/`enrollment` = 5481 occurrences corpus-wide; British variants = 0. Write `license`,
`behavior`, `organization`, `Enrollment`. Every H2 becomes a GitHub link-checked slug (D-16).

### C11 lexicon discipline
Write singular `Autopatch ring` (the fallback pattern is plural-only, `\bAutopatch rings\b`) and
`Configuration Manager`, never `SCCM`/`System Center` (D-72). Verify by running
`v1.20-milestone-audit.mjs`, not by reading the keyword list — `ALLOWLIST.c11_ops_patterns` is
undefined in the sidecar so the fallback regex is what actually runs.

### Validator assertion lines (exact strings this phase's edits must satisfy)
- `scripts/validation/check-phase-54.mjs:35` — `PATCH_FILES = [OV, WIN, MAC, IOS, AND_]` — **`07`/`08`
  are OUTSIDE this array**, so `V-54-07`, `V-54-08`, `V-54-26`, `V-54-30`, `V-54-31` do not bind them
  (D-68). Only `00-overview.md` edits are live-gated by these.
- `scripts/validation/check-phase-54.mjs:437` — `V-54-27`: NEGATIVE, no bare `> **Platform:**` token,
  walks `docs/` **and** `.planning/` — binds `07`, `08`, AND every PLAN file this phase writes.
- `scripts/validation/check-phase-54.mjs:499-509` — `V-54-29`: strips frontmatter/table
  rows/fenced-code/`[text](url)`/inline-code per physical line, NOT the em-dash description after a
  link and NOT a link wrapped across two lines — the two silent leaks (D-53).
- `scripts/validation/check-phase-53.mjs:21-24` — `CO_MGMT_FILES` = the 4 co-management files
  including `MP = "docs/operations/co-management/03-cocmgmt-migration-paths.md"`; scope-restricted,
  does not reach `07`/`08`, but confirms `03` is a live-pinned file this phase must not edit.
- `scripts/validation/v1.20-milestone-audit.mjs:585` — C11, `walkMd('docs')` — **the one live audit
  that actually reaches `07`/`08`** (the four fallback regex patterns at `:568-571`).
- `scripts/validation/check-nav-hub-links.mjs` — target existence + anchor resolution, no baseline/
  allowlist/ratchet — every new anchor and every cross-link this phase adds is live-checked here.
- `scripts/validation/c17-eee-contract.mjs:523-537` — enrollment gate keyed on `doc_id` only; `07`/`08`
  carry no `doc_id` so they are exempt (by design, D-70).
- `scripts/pipeline/build-filename-map.mjs:283` / `scripts/pipeline/build-publish-bundle.mjs:520-523`
  — the two canaries; both parse the registry file, not the filesystem — do not add a registry row
  this phase (Phase 152's job).

### Registry/index/nav wiring — explicitly NOT this phase's job
No edit to `docs/_registry/RE-index.md`, filename-map, canaries, `docs/operations/00-index.md`, or
any nav-hub. All Phase 152's, one atomic commit (D-73).

## No Analog Found

None — all three files in this phase's blast radius have a direct, recently-shipped structural
analog (`06-` for both new files' shape, `00-overview.md` for its own fourth-touch precedent).

## Metadata

**Analog search scope:** `docs/operations/patch-management/` (all 7 files), `co-management/03`
(anchor-only, cross-link never edit), plus validator source files `check-phase-54.mjs`,
`check-phase-53.mjs`, `v1.20-milestone-audit.mjs`, `check-nav-hub-links.mjs`, `c17-eee-contract.mjs`,
`build-filename-map.mjs`, `build-publish-bundle.mjs`.
**Files scanned:** 7 patch-management docs + 1 co-management doc + 7 validator/pipeline scripts.
**Pattern extraction date:** 2026-08-23, against HEAD `a161a43c`.
