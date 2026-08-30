# Phase 146: Windows Driver & Firmware Update Depth - Pattern Map

**Mapped:** 2026-08-19
**Files analyzed:** 4 (1 new, 3 modified)
**Analogs found:** 4 / 4

This is a documentation repo. "Patterns" below are prose/structural conventions in `docs/`, not
code idioms — frontmatter shape, blockquote conventions, citation-line placement, table shapes,
and heading-shape precedents the planner should copy verbatim rather than invent.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (NEW) | content/prose (operations guide) | transform (source quotes → structured guide) | its own four siblings `00-overview.md`, `01-windows-wufb-rings.md`, `02-macos-update-enforcement.md`, `04-android-patch-delivery.md` (frontmatter/blockquote/H1/citation shape) + `docs/_templates/recipe-template.md` (Unsupported callout table shape) | exact (structural shape); no doc_id (D-33) |
| `docs/operations/patch-management/01-windows-wufb-rings.md` (MODIFIED, stub-and-move `:168-214`) | content/prose | transform (in-place excision, byte-frozen retained lines) | itself — pre-edit `:168-214` is simultaneously the analog and the target | exact — self-analog |
| `docs/operations/patch-management/00-overview.md` (MODIFIED, 3 sites) | content/prose (routing hub) | transform (bullet/description edits) | itself — `:84-95` (Ring Terminology bullet + Source lines), `:150-166` (routing bullets), `:209-220` (Related Resources) are simultaneously analog and target | exact — self-analog |
| `.planning/REQUIREMENTS.md` §`:128` (MODIFIED, one C11 row) | content/prose (planning artifact) | transform (single-row factual correction) | no analog needed — literal row replace per D-20/D-21 | n/a |

## Pattern Assignments

### 1. Frontmatter + Platform-applicability blockquote + H1 (all 5 siblings, verbatim shape)

**Analog:** `docs/operations/patch-management/00-overview.md:1-21` and
`docs/operations/patch-management/01-windows-wufb-rings.md:1-16` (read directly, byte-exact).

Frontmatter (00-overview.md `:1-7`):
```markdown
---
last_verified: 2026-08-19
review_by: 2026-10-18
applies_to: all
audience: admin
platform: cross-platform
---
```
`01-windows-wufb-rings.md:1-7` is identical in field order/names but `platform: Windows` (not
`cross-platform`). **`06` copies the field set from `01` exactly — same five fields, same order,
`platform: Windows`, `applies_to: all`, `review_by = last_verified + 60` — and adds no `doc_id`
(D-33/D-34).**

Platform-applicability blockquote (`01-windows-wufb-rings.md:9-14`):
```markdown
> **Platform applicability:** This guide is Windows-specific (WUfB Update rings + Autopatch
> disambiguation + Hotpatch + driver/firmware). For the cross-platform overview, see
> [Patch Management Overview](00-overview.md).
> **macOS:** See [macOS DDM Update Enforcement](02-macos-update-enforcement.md).
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md).
```
Every line is `>`-prefixed, first line uses the bold lead-in `**Platform applicability:**`
(full lexicon, D-05), one line per other-platform sibling with a markdown link. **`06` must not
copy `01`'s per-sibling link list content** — D-35 rules `06`'s blockquote differs in content
from `01`'s (no sibling-link list; describe scope instead), and D-36 bars any forward link to
`05-`/`07-`/`08-`/firmware-BIOS guides inside it.

H1 style (`01-windows-wufb-rings.md:16`):
```markdown
# Windows WUfB Rings + Hotpatch + Driver/Firmware
```
Plain `# Title`, no anchor before it. D-67 locks `06`'s H1 as
`# Windows Driver and Firmware Updates` — American spelling, distinct from every existing
registry Title.

Opening paragraph shape (`01-windows-wufb-rings.md:18-25`) — one paragraph stating what the guide
covers, one paragraph routing back to `00-overview.md`, both before the first `<a id>`/H2:
```markdown
This guide is the Windows-specific patch management reference. It covers WUfB deployment ring
topology (the Windows Update client policy object in Intune) with deferral periods + deadline
enforcement, ...

For the cross-platform comparison and Ring Terminology hub, see
[Patch Management Overview](00-overview.md).
```

### 2. `**Source:**` evidence-line placement (own paragraph, standalone, after the claim)

**Analog:** `01-windows-wufb-rings.md:165-166` and `00-overview.md:90-94`.

```markdown
**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02)
**Source:** [Configure hotpatch](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-hotpatch) (updated 2026-04-29)
```
Two consecutive `**Source:**` lines (no blank line between them) is an existing, used shape when
a claim draws on two pages — directly reusable for the B-5 dual-attribution case RESEARCH §2.2
flags (Q5/Q6 are on two different pages and must not share one line).

`00-overview.md:90-94` shows three consecutive `**Source:**` lines after a bulleted list, each on
its own line, each citing a different sub-claim in the list above it — the multi-citation-block
pattern to copy for `06`'s `## What This Policy Does` (three sources: S3 manage-driver-updates,
S1, and a driver/firmware page).

**Format is exactly** `**Source:** [Title](url) (updated YYYY-MM-DD)` — standalone paragraph, not
inside a blockquote, not inline. Per RESEARCH §5.5, the date in `(updated ...)` is the fetched
`updated_at` value (confirmed by matching `01:165-166` against their sources' `updated_at`), not
`ms.date` — use `updated_at` throughout `06`.

### 3. Verbatim first-party quote rendering — blockquote, attached to the claim it supports

**Analog:** `00-overview.md:37-99` shows narrative claims paraphrased in body prose with a
`**Source:**` line beneath (no blockquote used there); `01-windows-wufb-rings.md` uses the same
non-blockquote shape for its Hotpatch section (`:130-166`, prose + Source lines, no `>` quoting).

**No blockquoted first-party quote currently exists in the patch-management directory** — every
existing citation in `00`/`01` is paraphrase-plus-Source-line, not verbatim-quote-plus-Source-line.
D-31/D-53 explicitly require `06` to ship **verbatim quoted text** for several claims (the
undefined-state warning, the Win10/11 scoping note, DRV-03's rollback/never-Declined/pause
quotes) — this is new territory for the directory, so use standard Markdown `>` blockquote syntax
for the quoted sentence(s), immediately followed by a `**Source:**` line, e.g.:
```markdown
> Because Configuration Manager uses a local group policy to configure the update source policy,
> using Intune or a CSP to attempt to configure these same settings result in an undefined and
> unpredictable device state.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)
```
This is the natural extension of pattern 2 (Source-line-after-claim) applied to a blockquoted
claim instead of a paraphrased one — no corpus precedent contradicts it, and it keeps the
`**Source:**`-directly-beneath-the-claim placement rule intact.

### 4. Bold sub-label pitfall/absence callout (D-41's precedent)

**Analog:** `01-windows-wufb-rings.md:186` (read directly, byte-frozen — do not copy structure
*into* this line, copy the *form* elsewhere):
```markdown
**Dual-scan source conflict pitfall:** When SCCM co-management still controls the Windows Update
workload (workload slider not yet at Pilot Intune or Intune; see
[Workload Slider Migration](../co-management/02-windows-workload-sliders.md)), the `dual-scan`
source conflict can cause WUfB driver/firmware updates to flap. Specifically:
```
Form: `**<Short Label>:**` in bold, followed immediately (same paragraph) by the explanatory
sentence, optionally followed by a bulleted breakdown. This is the **only** other-file instance of
this form found in the corpus this session (`grep -rn "^\*\*[A-Z][a-z].*:\*\*" docs/operations/`
returns this line as the clearest match; other bold-lead-ins in the directory are single-word
labels like `**Source:**`/`**Windows:**` inside the platform blockquote, a different convention).
**Use this exact form** — bold sub-label + colon + inline prose — for every absence/limitation
item inside `06`'s `## Unsupported and Anti-Feature Callouts` section (D-41: no new `PITFALL-N`
identifiers, bold sub-labels only).

### 5. `## Unsupported and Anti-Feature Callouts` — table shape, the highest-value extraction

**Analog:** `docs/_templates/recipe-template.md:98-102` and all four `docs/recipes/*.md` files
(e.g. `docs/recipes/01-shared-windows-avd-client.md:39-45`, read directly):

Template shape:
```markdown
## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| [Feature or configuration name] | [Why this combination is unsupported, or what silently breaks if attempted] | [The supported alternative, or "N/A -- no alternative exists"] |
```

Filled shape (`docs/recipes/01-shared-windows-avd-client.md:39-45`):
```markdown
## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Hybrid Microsoft Entra join | Self-deploying mode has no user affinity, and hybrid join cannot complete without one | Use Microsoft Entra joined only — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) |
| Autopilot Device Preparation (APv2) | APv2 uses a Device Preparation Policy, a different enrollment framework that cannot deliver this recipe's self-deploying flow | See [APv1 vs APv2](../apv1-vs-apv2.md) to confirm framework selection before starting |
```

**This is the corpus convention D-38 confirms and the draft's invented `## Limitations and
Absences` heading must not be used.** `06` uses the exact H2 string
`## Unsupported and Anti-Feature Callouts` (D-37's skeleton), and its rows should follow the
3-column `Feature | Why unsupported/what breaks | Do this instead` table shape from the recipes —
**not** the bold-sub-label prose form from pattern 4. D-41 requires bold-sub-label prose
specifically for **absence-type items lacking their own PITFALL-N** (rollback absence, no
inventory, CHID not enforced, etc.); the recipe-table shape is the closer fit for genuinely
binary unsupported/anti-feature rows (LTSC unsupported, GCC High absent, assignment filters
unsupported). The planner should decide per-item which of the two shapes (recipe table row vs.
bold sub-label paragraph) fits each of the ~10 items RESEARCH §5.2 lists, but the section H2
itself is fixed to the recipe/template string.

### 6. Numbered multi-step procedure (for DRV-06's six-step ConfigMgr procedure)

**Analog:** `docs/operations/co-management/03-cocmgmt-migration-paths.md:34-47` (closest existing
multi-step enumerated procedure in `docs/operations/`, read directly):
```markdown
<a id="autopatch-prerequisites"></a>
## Autopatch Prerequisites

Windows Autopatch requires co-management with the following **three workloads** set to
**Pilot Intune** or **Intune** before Autopatch can be enabled:

1. **Windows Update Policies** workload — Slider must be at Pilot Intune or Intune. This
   workload's policies (deferral, ring assignment, deadline enforcement) become Autopatch's
   surface for ring management.
2. **Device Configuration** workload — Slider must be at Pilot Intune or Intune. Configuration
   profile assignments must be deliverable from Intune before Autopatch ring management can apply
   matching configuration.
3. **Office Click-to-Run Apps** workload — Slider must be at Pilot Intune or Intune. Microsoft 365
   Apps update channel and version policies become Intune-managed; Autopatch coordinates Office
   updates alongside Windows quality updates.
```
Form: own-line `<a id>` above the H2, a lead sentence naming the count (*"the following **three
workloads**"*), then a numbered list where each item opens `N. **Bold Item Name** — explanation`.
Directly reusable for DRV-06's six-step procedure — lead sentence naming "six steps (four
required, two optional)" per RESEARCH §2.8, each step bolding its action verb/target, with the
D-31 verbatim blockquote (pattern 3) attached to step 3 for the undefined-state warning and the
D-29 `*Note:*` verbatim block for the Win10/11 scoping note adjacent to the procedure.

**Recipe `### Step N:` H3-per-step form (`docs/recipes/01-shared-windows-avd-client.md:47-52`)
is a different, heavier convention (numbered sub-steps under an H3, portal-navigation imperative
voice, `> **What breaks if misconfigured:**` callouts) — do not use it for `06`.** `06` is an
operations guide, not a recipe; D-38/D-33 already establish `06` follows `docs/operations/`
convention, not `docs/recipes/` convention, except for the one explicitly-named borrowed heading
(pattern 5).

### 7. `01` stub-and-move edit sites (self-analog, byte-frozen constraints)

**Target = analog:** `01-windows-wufb-rings.md:168-214`, re-measured this session at HEAD:

| Block | Lines | Disposition |
|---|---|---|
| Anchor | `:168` `<a id="driver-firmware-policy"></a>` | RETAIN byte-identical |
| H2 | `:169` `## Driver and Firmware Update Policy` | RETAIN byte-identical (D-11) |
| Movable substance | `:171-178` | MOVE to `06`, correcting the `:177` firmware claim per RESEARCH §2.4 |
| Disambiguation | `:180-184` (`:180` opens `**This is NOT a ring** — ...`) | RETAIN byte-identical |
| Dual-scan section | `:186-213` | RETAIN byte-identical — **D-06 frozen zone, no re-wrap, no substitution, no link removal** |
| `## Related Resources` | `:215` | follows immediately |

`:200`'s `**Mitigation options (pick one):**` and mitigation item 3 (`:207-210`) are edit sites
*inside* the frozen zone — append/substitute-in-place only (D-24/D-25), never re-wrap the
surrounding lines.

### 8. `00-overview.md` three edit sites (self-analog)

**Target = analog**, re-measured: driver bullet `:84-88` (append cross-link sentence, `:89` blank,
`:90` is an existing `**Source:**` line — do not append there, D-55); routing bullet `:153-154`
(add a new bullet, amend the existing one so it stops routing to the stub); Related-Resources
description `:211-213` (amend to stop claiming `01` carries "the driver/firmware update policy
surface").

## Shared Patterns

### Citation-line format is corpus-standard, already used twice in scope
**Source:** `docs/admin-setup-macos/10-kerberos-sso-extension.md:156` (per Phase 145 precedent,
same shape) and `docs/operations/patch-management/01-windows-wufb-rings.md:165-166`,
`00-overview.md:90-94` (in-directory precedent, closer analog for this phase).
**Apply to:** every `**Source:**` line in `06`, and the D-25/D-55 additions to `01`/`00-overview.md`.

### Platform-applicability blockquote full lexicon
**Source:** `01-windows-wufb-rings.md:9-14`, `00-overview.md:9-19`.
**Apply to:** `06`'s frontmatter-adjacent blockquote — must use `> **Platform applicability:**`
(not the shorter `> **Platform:**` the draft may have used), per D-05's corpus-wide `V-54-27` walk.

### Unsupported/Anti-Feature H2 string is fixed
**Source:** `docs/_templates/recipe-template.md:98`, all four `docs/recipes/*.md`.
**Apply to:** `06`'s callouts section header — must be `## Unsupported and Anti-Feature Callouts`
verbatim, not `## Limitations and Absences` or any other invented spelling.

### No `doc_id`, no C17 enrollment
**Source:** `docs/_templates/recipe-template.md:23-24` (doc_id IS required there — the negative
precedent) vs. all five `docs/operations/patch-management/*.md` siblings (none carry `doc_id`).
**Apply to:** `06`'s frontmatter — omit `doc_id` entirely, per D-33; `docs/operations/` is
enrolled by directory, never cherry-picked by filename.

## No Analog Found

| File/Site | Role | Reason |
|---|---|---|
| Blockquoted verbatim first-party quote + `**Source:**` line (new to this directory) | content/prose | `docs/operations/patch-management/` has zero existing blockquoted-quote-plus-Source instances; pattern 3 above extends the existing Source-line convention to a blockquote form by combining two corpus-wide conventions (blockquote quoting elsewhere in `docs/`, e.g. `00-overview.md`'s platform blockquote syntax, + the Source-line placement rule) rather than copying a single existing site |

## Metadata

**Analog search scope:** `docs/operations/patch-management/{00,01,02,04}*.md`,
`docs/_templates/recipe-template.md`, `docs/recipes/*.md`,
`docs/operations/co-management/03-cocmgmt-migration-paths.md`, `.planning/REQUIREMENTS.md:128`.
**Files scanned:** 4 siblings read in full/targeted excerpt, 1 template + 4 recipes read targeted,
1 co-management procedure read targeted; ~10 files total.
**Pattern extraction date:** 2026-08-19. No source files modified.
