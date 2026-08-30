# Phase 147: Linux Update Delivery - Pattern Map

**Mapped:** 2026-08-21
**Files analyzed:** 2 (1 new, 1 modified)
**Analogs found:** 2 / 2

This is a documentation corpus, not application code. "Patterns" means authoring/structural
conventions (frontmatter, H2 skeleton, blockquote/citation shapes, table shapes), not code idioms.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/operations/patch-management/05-linux-update-delivery.md` | new sibling guide (doc) | authored content, not registered/enrolled | `docs/operations/patch-management/06-windows-driver-firmware-updates.md` | exact (structural sibling: outside `PATCH_FILES`, no `doc_id`, no Version History) |
| `docs/operations/patch-management/00-overview.md` | hub/index doc (six string-replace edit sites) | in-place text edit | itself (prior edits by Phase 146 D-31 already inside file; no other analog needed) | exact (self) |

## EOL report — read before any edit

`git ls-files --eol docs/operations/patch-management/` (measured this session):

```
i/lf    w/crlf  attr/    docs/operations/patch-management/00-overview.md   <- EDITED this phase, CRLF in worktree
i/lf    w/crlf  attr/    docs/operations/patch-management/01-windows-wufb-rings.md
i/lf    w/crlf  attr/    docs/operations/patch-management/02-macos-update-enforcement.md
i/lf    w/crlf  attr/    docs/operations/patch-management/03-ios-update-lifecycle.md
i/lf    w/crlf  attr/    docs/operations/patch-management/04-android-patch-delivery.md
i/lf    w/lf    attr/    docs/operations/patch-management/06-windows-driver-firmware-updates.md   <- analog, LF in worktree
```

`00-overview.md` (the file this phase edits six times) is **CRLF** in the worktree; `06-` (the
structural analog for the new file's shape) is **LF**. Same trap class as Phase 146's "01 is CRLF
while its siblings are LF" — here the polarity is inverted (the odd-one-out is `06`, not `00`).
Per CONTEXT D-63: **verify every `00-overview.md` string replacement actually matched** — a
`\n`-based literal replace authored against an LF mental model silently no-ops against CRLF content.
The new file `05-linux-update-delivery.md` has no existing EOL — author it LF-consistent with `06`
(its structural analog) unless the repo's `.gitattributes`/`core.autocrlf` normalizes on checkout
(confirmed: one-line `.gitattributes` + `core.autocrlf=true` per CONTEXT D-63 — writing LF is safe,
git normalizes on checkout).

## Pattern Assignments

### `docs/operations/patch-management/05-linux-update-delivery.md` (new)

**Analog:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (LF, no `doc_id`, `applies_to: all`, `audience: admin`, outside `PATCH_FILES`)

**Frontmatter pattern** (`06-windows-driver-firmware-updates.md:1-7`):
```
---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---
```
For `05-`: `platform: Linux`, `applies_to: all`, `audience: admin`, `last_verified` = actual
execution date, `review_by` = that + 60 by arithmetic (D-62). No `doc_id` line (D-28/D-62).

**Platform-applicability blockquote + H1 pattern** (`06:9-16`):
```
> **Platform applicability:** This guide is Windows-specific and covers the Intune driver and
> firmware update policy as its own surface — approval modes, the approval workflow, deferral and
> deadline behavior, OEM catalog and firmware delivery, reporting, Configuration Manager
> co-existence, and the documented absences. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For WUfB deployment ring topology and Autopatch ring
> disambiguation, see [Windows WUfB Rings](01-windows-wufb-rings.md).

# Windows Driver and Firmware Updates
```
`05-` H1 is `# Linux Update Delivery` (D-70). Blockquote must use the full lexicon form (D-29),
name the guide's scope, and route to `00-overview.md` — per D-01 it must also state the
Ubuntu-scope/apt-family limitation. `V-54-27` bars any bare `> **Platform:**` line anywhere in
`docs/` or `.planning/` — never use the bare form.

**Evidence-line pattern — blockquote immediately followed by a standalone `**Source:**` paragraph**
(`06:44-48`):
```
> In Microsoft Intune, Windows driver updates are managed through **driver update policies**, which
> provide a dedicated policy surface for reviewing, approving, and deploying driver updates to
> managed devices.

**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)
```
Rule (146-PATTERNS.md §2, carried by D-21): **one Source line per one blockquote of contiguous
quotes from one page; own paragraph, standalone, after the claim; never span two source pages.**
For Canonical (non-Microsoft) sources use the dated form confirmed in 147-RESEARCH.md D-08, e.g.
`**Source:** [Automatic updates](https://ubuntu.com/server/docs/how-to/software/automatic-updates/) (Canonical, updated 2026-07-15)` —
matches the corpus's existing dated `**Source:**` convention (all 82 instances carry a date; D-09/D-10).

**Undated-source shape** (only if a genuinely undated source is ever needed — none is expected here
per D-08's correction): `02-macos-update-enforcement.md:26` —
```
**Source:** [Apple: device management updates](https://support.apple.com/guide/deployment/device-management-updates-depd638aa061/web) (published 2026-06-08) and [Deprecated MDM policies for macOS](https://learn.microsoft.com/en-us/intune/intune-service/protect/deprecated-mdm-policies-macos) (updated 2026-06-22) — the Intune article's own deprecation banner gives no removal date; that absence is stated here, not filled.
```
Keep the dated field; state the absence in a trailing clause. Do not coin a fourth shape (D-09).

**`## Unsupported and Anti-Feature Callouts` shape — bold sub-label + blockquote(s) + prose + Source**
(`06:664-690`):
```
## Unsupported and Anti-Feature Callouts

**Driver update policies do not apply during Windows Autopilot, and critical drivers install anyway.**
Both halves matter, and neither is safe to read on its own:

> Can I apply driver update policies during Windows Autopilot? — No. Driver updates aren't supported during Windows Autopilot at this time.

> Windows applies critical updates during Windows Autopilot. These updates may include critical driver updates that have not yet been approved by an admin.

The first half alone reads as "nothing happens to drivers during Autopilot", which is false. ...

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)
```
This is the pinned H2 literal (D-25) — copy exactly, including capitalization. For `05-`, the
**first** bold sub-label under this H2 must be the LNX-02 root-context hazard full treatment
(D-50), and it references the reboot signal by anchor rather than redefining it (D-56). Use bold
sub-labels for new pitfalls, never a `PITFALL-N` identifier (D-26) — precedent is
`01-windows-wufb-rings.md:184`, `**Dual-scan source conflict pitfall:**`.

**Own-line anchor pattern** (`06:37,130,206,...`):
```
<a id="what-this-policy-does"></a>
## What This Policy Does
```
One `<a id="...">` per major H2, own line, immediately before the heading (D-69). These become the
cross-link contract for Phases 148/151.

**Related Resources / External References footer pattern** (`06:773-791`):
```
## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — WUfB deployment ring topology, Autopatch ring
  disambiguation, Hotpatch, and the driver/firmware policy stub
...

## External References

- [Configure Windows driver update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy)
...
```
`05-`'s `## External References` may duplicate freely against siblings (D-71); no tool verifies
those URLs — confirm manually during the D-06 fetch pass. Related Resources links to `00-`, the
Linux admin-setup tree, both reference matrices, and the glossary — never to `06-` or to
not-yet-existing `07-`/`08-`/firmware guides (D-48).

**No code fences anywhere** — all six `docs/operations/patch-management/*.md` files carry zero
fences (D-23); ship `unattended-upgrades` config as prose/tables/blockquotes, never a fenced block.
No runnable root-context script body (D-24).

**H2 skeleton to author (D-22)** — exact order, `## Unsupported and Anti-Feature Callouts` pinned
literal, all others Claude's discretion:
```
## What Intune Can and Cannot Do for Linux Updates
## Deferral, Enforcement and Attestation for Linux
## Delivering Updates with a Bash Platform Script
## Configuring unattended-upgrades
## Reboot Handling
## Ubuntu Pro and Livepatch
## Compliance and Conditional Access
## Unsupported and Anti-Feature Callouts
## Related Resources
## External References
```

---

### `docs/operations/patch-management/00-overview.md` (six edit sites)

**Analog:** itself — pattern is "extend an existing 4-column table/list to 5" per the corpus's own
4→5 precedent, `docs/reference/4-platform-capability-comparison.md` (RE-143), filename kept, H1
retitled, Linux appended last (D-38).

**Site 1 — platform-applicability blockquote** (`00-overview.md:8-16`, currently four platform
bullets: Windows, macOS, iOS/iPadOS, Android) — append a `**Linux:**` bullet in the same bold-label
bullet shape, routed to `05-linux-update-delivery.md`.

**Site 2 — Cross-Platform Comparison table** (`00-overview.md:37-60`). Current 4-column header and
row shape:
```
| Concept | Windows | macOS | iOS/iPadOS | Android |
|---------|---------|-------|------------|---------|
| Cadence model | WUfB deployment rings (deferral periods) | macOS Software Update + DDM | iOS update policies (DDM iOS 17+) | Google Play monthly + OEM (LifeGuard / KSP) |
| Deferral mechanism | ... | ... | ... | (No tenant-side deferral; Google Play handles) |
```
Absent-capability parenthetical convention to reuse for Linux cells (D-35): `(No Intune-side
deferral; distro-native only)`, `(None — compliance policy + web-app CA is attestation only)`,
`(no hard deadline)`. **Every row must stay on one physical line** — `V-54-29`'s strip is
`/^\|.*\|.*$/gm` (per-physical-line) — do not wrap the new/widened row even though it will exceed
~380 characters (D-34). Append Linux as the last column (D-33 — order is NOT validator-sensitive,
but matches `4-platform-capability-comparison.md`'s own append-last precedent).

**Site 3 — Related Resources entry** (`00-overview.md:213-225`, list ordered `01, 06, 02, 03, 04`
non-numeric): insert a `05-linux-update-delivery.md` bullet in the same
`- [Title](file.md) — summary clause` shape used at every existing entry; insertion point is
Claude's discretion (D-39).

**Site 4 — routing bullet** (`00-overview.md:151` `## Routing to Per-Platform Guides` section) —
add a Linux routing sentence matching the per-platform paragraph shape at
`00-overview.md:220-224` ("For Android tenants planning ... start with [Android Patch
Delivery](04-android-patch-delivery.md).").

**Site 5 — Attestation `Examples:` clause** (`00-overview.md:127-130`, the third bullet of
`## Deferral vs Enforcement`) — current shape: `- **Attestation** — ... Examples: Android Play
Integrity verdicts ...; iOS device-level ...`. Append a Linux clause in the same `Examples:` list
(web-app CA attestation-only per D-30).

**Site 6 — D-73 correction** (`00-overview.md:87-88`, defective text): current text reads verbatim
```
Approval mode is
fixed when the driver policy is created and cannot be changed afterwards; the 0–30 day deferral are
set per deployment ring, and the quality-update deadline and grace period do apply to drivers.
```
Correct per 146's own `## Deferral and Deadline Behavior` (already correct) and Microsoft Learn
source [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy)
(updated 2026-04-24): the 0-30 day deferral is the **Driver Update Policy's own setting**, not a
WUfB-deployment-ring setting.

**Prose sweep** — 7 `four` tokens re-measured at `:39, :40, :46, :59, :168, :175, :184` (D-37,
re-confirmed at HEAD `96c5919d` with zero drift) — each becomes `five` / `Windows, macOS,
iOS/iPadOS, Android, and Linux` as appropriate. `platform:` frontmatter value stays
`cross-platform` — never add `, Linux` (locked by `ROADMAP.md:126`; would split-fail `V-54-07`
anchored vs `V-54-31` unanchored, D-40).

## Shared Patterns

### Evidence-line contract (applies to every `**Source:**` line in `05-`)
**Source:** `06-windows-driver-firmware-updates.md` (repeated at lines 48, 63, 71, 83, 91, 683, 690...)
and `146-PATTERNS.md` §2 (Source-line scope fix). One Source line per one contiguous blockquote from
one page; own paragraph; never spans two source pages. `grep -rn "Source:" scripts/` = 0 — this
contract is human-only, unenforced by any validator; the verifier re-fetches and diffs (D-20).

### No code fences in `docs/operations/patch-management/`
Zero fences in all six files today (D-23). Configuration ships as prose/tables/blockquotes only.

### `## Unsupported and Anti-Feature Callouts` — the pinned H2 literal
Exists in six corpus files; `06-windows-driver-firmware-updates.md:664` is the only
`docs/operations/` instance and closest precedent by directory + doc class (D-25). Copy verbatim.

### Validator assertion lines (exact strings this phase's edits must satisfy)
- `scripts/validation/check-phase-54.mjs:90` — `V-54-07: all 5 patch-management files have valid platform: + audience: + 60-day cycle`
- `scripts/validation/check-phase-54.mjs:127` — `V-54-08: 00-overview.md has 4-platform comparison table (Windows + macOS + iOS + Android)` — regex uses `[^\n]*` gaps, NOT order- or column-count-sensitive per D-33 (five live probes all 32/0/0)
- `scripts/validation/check-phase-54.mjs:421` — `V-54-26: cross-platform '> **Platform applicability:**' blockquote within first 50 lines of body for all 5 patch-management files` — binds only the five hardcoded `PATCH_FILES`, NOT `05-` or `06-`, but the shape is still required editorially (D-29)
- `scripts/validation/check-phase-54.mjs:437` — `V-54-27: NEGATIVE — no bare '> **Platform:**' token across docs/ + .planning/ corpus` — binds `05-`'s new blockquote AND every plan file this phase produces
- `scripts/validation/check-phase-54.mjs:494` — `V-54-29: NEGATIVE — 00-overview body prose does NOT contain Hotpatch/VBS/MEETS_STRONG_INTEGRITY substantively` — strips table rows before testing; per-physical-line strip `/^\|.*\|.*$/gm` (D-34) — never wrap a table row onto two lines
- `scripts/validation/check-phase-54.mjs:535` — `V-54-31: SC#5 — all 5 patch-management ops files carry valid platform: frontmatter` — unanchored regex, split-failure risk with `V-54-07` if `cross-platform, Linux` is ever written (D-40)
- `scripts/validation/check-phase-50.mjs:41` — `const VALID_STATUS = /^(Supported|Partial|Not supported)/;` — prefix match; the D-35 parenthetical cell form is FATAL if ever applied to `linux-capability-matrix.md` (D-41) — do not touch that file this phase
- `scripts/validation/check-phase-50.mjs:34` — `const ADMIN_FILES = [ADMIN_OVERVIEW, ADMIN_AGENT, ADMIN_ENROLLMENT, ADMIN_COMPLIANCE, ADMIN_APP, ADMIN_CA, MATRIX];` — six admin files plus `linux-capability-matrix.md`; none touched this phase (D-42)

### Registry/index/nav wiring — explicitly NOT this phase's job
No edit to `docs/_registry/RE-index.md`, filename-map, canaries, `docs/operations/00-index.md`, or
any nav-hub. All Phase 152's, one atomic commit (D-64). Do not add a registry row even though the
new file's existence might tempt it — both self-test canaries parse the registry file, not the
filesystem, so an unregistered `05-` moves neither and a stray row would break both at 225-vs-226.

## No Analog Found

None — both files in this phase's blast radius have a direct, recently-shipped structural analog
(`06-` for the new file, self for `00-overview.md`'s incremental-column pattern).

## Metadata

**Analog search scope:** `docs/operations/patch-management/` (all six files), plus validator source
files `scripts/validation/check-phase-54.mjs` and `scripts/validation/check-phase-50.mjs`.
**Files scanned:** 6 corpus docs + 2 validator scripts.
**Pattern extraction date:** 2026-08-21, against HEAD `96c5919d`.
