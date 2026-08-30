# Phase 151: Recipe #5 — The Enterprise Update Plan - Pattern Map

**Mapped:** 2026-08-26
**Files analyzed:** 3 (new recipe + 2 amended standards docs; the two retrofit targets are edits to
existing files, not new files)
**Analogs found:** 3 / 3

**Domain note:** This is a documentation-repository phase. "Patterns" below are document-shape and
authoring conventions extracted from shipped recipes, the template, and the governing standard —
not source code. All excerpts were read from disk this session; nothing here is inferred from
memory of prior phases.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/recipes/05-enterprise-update-plan.md` (new) | Device Recipe (prescriptive doc) | N/A (static doc) | `docs/recipes/01-shared-windows-avd-client.md` (Summary/D-06 exemplar, `Step 5a`/`5b` branch idiom) blended with `03-windows-11-multi-app-kiosk.md` and `04-android-dedicated-mhs-multi-app.md` (both carry `## Rollback/Recovery`, the section this recipe also needs) | exact (composite of 3) |
| `docs/_standards/EEE-SOP-standard.md` (amended, D-04/D-05) | Standard / normative spec | N/A | itself — STD-05 section (`## Admin Decision-Point Block Format`) is the section being widened | exact (self-amend) |
| `docs/_templates/recipe-template.md` (amended, D-47/D-50) | Template scaffold | N/A | itself — insertion point machine-pinned by `V-135-ROLLBACKORDER` / `V-136-H2SKELETON` | exact (self-amend) |
| `docs/recipes/01-shared-windows-avd-client.md` (retrofit target, D-47) | Device Recipe | N/A | `docs/recipes/03-windows-11-multi-app-kiosk.md` `## Rollback/Recovery` prose shape | role-match (donor pattern, recipient is itself) |
| `docs/recipes/02-shared-ipad-full-provisioning.md` (retrofit target, D-47) | Device Recipe | N/A | `docs/recipes/04-android-dedicated-mhs-multi-app.md` `## Rollback/Recovery` prose shape | role-match (donor pattern, recipient is itself) |

Not this phase (verified via `git log`, listed for the planner's awareness only): the registry row,
filename-map row, canary bumps, and nav-hub/index entries are **all** Phase 152 — confirmed by
`git log --oneline` showing commits `f1449134`/`fb179bfa`/`996dcead` (registry+filename-map, Phase
132) and `71ad89a3`/`b5eb902b` (index.md + quick-nav, Phase 132) as the historical precedent for
that separate, later-phase pattern. `check-phase-151.mjs` is Phase 153 (confirmed: `fe6dce27
feat(136-01): create RE-225 file-identity shell` shows even the file-identity shell for a new
recipe landed in a *different* phase (136) than its content (in this milestone's precedent, RE-225
= recipe 04), reinforcing that content-authoring and registry/validator work are historically split
across phases).

## Pattern Assignments

### `docs/recipes/05-enterprise-update-plan.md` (new Device Recipe)

**Primary analog:** `docs/recipes/01-shared-windows-avd-client.md` (242 lines) for frontmatter,
header block, Summary, Prerequisites, branch idiom. **Secondary analogs:**
`docs/recipes/03-windows-11-multi-app-kiosk.md` (328 lines, H2 skeleton at lines 17/27/41/58/256/
275/307/321) and `docs/recipes/04-android-dedicated-mhs-multi-app.md` (301 lines, H2 skeleton at
17/31/39/53/261/273/285/294) for `## Rollback/Recovery` prose shape and placement.

**Frontmatter + header block pattern** (`docs/recipes/01-shared-windows-avd-client.md` lines 1-14):
```yaml
---
doc_id: RE-222
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-17
review_by: 2026-10-15
applies_to: Shared Windows AVD-client device (self-deploying, kiosk or Shared PC)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Approved

# Shared Windows AVD-Client Device: Self-Deploying Provisioning
```
Per D-69/D-70/D-71/D-72/D-73: this recipe's `platform: all` (renders `All Platforms`), `doc_id:
RE-227`, `status: Approved`, `owner: Intune Admin Lead`, and the date pair is authoring-date /
authoring-date+60 (not +90 — the template's own +90 rule at `recipe-template.md` line 5 is
superseded in this milestone by FIX-10's 60-day cadence per D-71).

**Summary end-state pattern (D-06 exemplar)** (`01-shared-windows-avd-client.md` lines 19-22):
```
Following this recipe yields a self-deploying, Entra-joined shared Windows device that runs the
Windows App as its Azure Virtual Desktop client, provisioned end-to-end from zero through Intune.
It covers Windows 10/11 devices and requires the Intune Administrator role plus Entra ID Groups
permissions to create the deployment profile, Enrollment Status Page, dynamic device group, and
app assignment this recipe walks through.
```
Per D-06/D-07: name a concrete fleet end-state (not four unresolved variables), and do not
pre-decide any of the nine live decisions in this sentence.

**`> **Scope:**` line pattern** (`01-shared-windows-avd-client.md` line 24):
```
> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.
```

**Prerequisites bullet pattern** (`01-shared-windows-avd-client.md` lines 26-34): bold lead-in per
bullet (`**This recipe is NOT:**`, `**RBAC:**`, `**Licensing:**`), each followed by inline links to
the guide it defers to — reuse this shape for D-35's entitlement-gate prerequisites (Dell BIOS
password precondition).

**Case 1 branching decision + sibling H3 branch idiom** (`01-shared-windows-avd-client.md` lines
105-114, verified exact text):
```
### Step 5: Choose kiosk or Shared PC

> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |

### Step 5a: Kiosk configuration
```
This is the ONLY shipped solution to STD-05 D-04 rule 3's H2/H3 branch-depth cap (D-28); reuse
verbatim for D-1's, D-3's and D-4's branch bodies (D-29), including D-4's 4-branch fan-out and
D-30's "none" branch. Per D-21, replace the heading-slug `#step-5a-kiosk-configuration` link target
convention with a hand-authored `<a id="…">` per decision point instead — do NOT copy the
heading-slug-link mechanism verbatim, only the sibling-H3 structural idiom.

**`> **What breaks if misconfigured:**` callout pattern** (`01-shared-windows-avd-client.md` line
112, template shape at `recipe-template.md` line 112):
```
   > **What breaks if misconfigured:** [Specific downstream failure this causes. Include: what the admin will see, what the end user will see, and link to the troubleshooting runbook that covers this failure.]
   > See: [Troubleshooting Runbook Title](../l1-runbooks/relevant-runbook.md)
```
Per D-19: budget these across the recipe (shipped counts are 1, 4, 6, 6 in recipes 01-04); per
D-38, this domain has no L1/L2 runbook coverage, so the `Runbook`/"See" link target must instead be
an intra-recipe anchor (recipe 04's precedent, reconciled with the D-21 `<a id>` scheme).

**`## Rollback/Recovery` prose shape** (`03-windows-11-multi-app-kiosk.md` lines 275-306, one bold
pseudo-heading per mechanism, verified exact excerpt):
```
## Rollback/Recovery

Removing the Assigned Access configuration is not the same as returning the device to its prior state.

**Exiting a running session (temporary):**

- Alt+F4, Alt+Tab, Alt+Shift+Tab and Ctrl+Alt+Del are not blocked for a restricted-user-experience account. ...

**Removing the configuration (permanent):**

- Unassign or delete the Intune policy that carries the configuration. ...
```
And the shorter `04-android-dedicated-mhs-multi-app.md` lines 273-283 variant (two mechanisms, same
bold-pseudo-heading shape, opens with a one-line framing sentence distinguishing "removing config"
from "returning to prior state"). Per D-39/D-41: this recipe's version opens with the TRUE count
("four of the nine mechanisms below have no rollback path" — not "most"), and per D-45 orders
worst-first.

**`## Configuration-Caused Failures` table pattern** (`03-windows-11-multi-app-kiosk.md` lines
307-320, and `04-android-dedicated-mhs-multi-app.md` lines 285-293):
```
| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Backslashes doubled inside an XML attribute such as `App/@DesktopAppPath` | The path never resolves... | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
```
Per D-38, this domain's Runbook column has no L1/L2 target to link — follow recipe 04's precedent
of an intra-recipe step anchor instead of an external runbook link.

**H2 skeleton to match** (verified, `03-windows-11-multi-app-kiosk.md` and
`04-android-dedicated-mhs-multi-app.md` both show, in fixed order): `## Summary` → `## Prerequisites`
→ `## Unsupported and Anti-Feature Callouts` → `## Steps` → `## Verification` →
`## Rollback/Recovery` → `## Configuration-Caused Failures` → `## See Also`. This is the exact
8-element order `V-136-H2SKELETON` pins in recipe 04 and the same slot `V-135-ROLLBACKORDER` pins
in recipe 03 (Rollback/Recovery between Verification and Configuration-Caused Failures) — this
recipe's own H2 skeleton must match this order (D-49).

---

### `docs/_standards/EEE-SOP-standard.md` (amended per D-04/D-05)

**Section being widened** (`EEE-SOP-standard.md` lines 456-538, `## Admin Decision-Point Block
Format (STD-05)`): read in full this session. Key excerpts:

D-01 composite block shape (lines 468-479, verified): three cases — Case 1 branching (`| Option |
When to choose | Consequence if wrong | Branch |`), Case 2 enumerable (`| Option | When to choose |
Recorded as |`), Case 3 free-value (lead-in only, no table).

D-02 mandatory blank line (lines 481-485): blank line between the `> **Ask the admin:**` lead-in
and any following table is mandatory — GFM lazy continuation otherwise absorbs the table into the
blockquote.

D-04 the three-rule normative branch floor (lines 503-513, verified exact text): rule 3 — "Branch
headings live at H2 or H3 only, never deeper. Boolean decisions ... may skip branch headings
entirely and instead use an if/then prose pair." — this is the rule D-27 says was misapplied to
D-2 in the draft (D-2 is not Boolean, has 3 branches + a precedence rule).

D-06 Recipe Summary end-state statement (lines 524-531, verified exact text, quoted above under the
recipe's Summary pattern) — the exact sentence this section requires satisfying.

The amendment itself (D-04/D-05 of CONTEXT.md) is a NEW subsection inside this STD-05 section (or
an adjacent D-08-numbered addition — exact insertion point is Claude's Discretion per CONTEXT.md),
widening the doc-class definition and STD-05 D-06's end-state rule to admit a fleet end-state. Model
the amendment's own changelog entry on the existing pattern at line 617:
```
| 2026-07-17 | v1.18 STD-05 — added Admin Decision-Point Block Format (D-01..D-07: ...) |
```
(lines 616-618, `## Changelog`-style table at the end of the standard — verified present, exact
row format is `| date | description |`).

---

### `docs/_templates/recipe-template.md` (amended per D-47/D-50)

**Full file read** (140 lines). The insertion point for the promoted `## Rollback/Recovery` section
is between the existing `## Verification` (line 124) and `## Configuration-Caused Failures` (line
129) blocks:
```
## Verification

- [ ] [How to confirm the configuration is correct -- specific portal location to check, expected state]
- [ ] [Second verification check]

## Configuration-Caused Failures
```
Insert a new `## Rollback/Recovery` H2 with a bracketed placeholder here, prose-only per D-51 (no
bracketed markdown link, since C13 hard-pins exactly 15 allowlist entries / 9
`template_placeholder` entries and neither names `recipe-template.md`).

**`TEMPLATE-SENTINEL` line — do not touch** (line 39, verified exact text):
```
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
```
Per D-53, `check-phase-129.mjs` asserts its presence; this is what makes C17 skip assertions #9 and
#12 on the template file itself.

**Existing worked-example HTML comment block** (lines 56-87) — the three Case 1/2/3 examples living
inside `## Summary`, deleted by authors before publishing a real recipe; not touched by this
amendment, listed here only because it is adjacent to the insertion the template edit must not
disturb.

---

## Shared Patterns

### The `<a id>` anchor convention (source for D-21's divergence, not itself copied verbatim)
**Source:** `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (verified
grep hits: lines 37, 130, 206, 292, 379 — `<a id="what-this-policy-does"></a>` style, one bare
self-closing anchor tag per anchor point, no visible label).
**Apply to:** the nine decision points in the new recipe, per D-21 — each gets a hand-authored
descriptive `<a id="decision-…">` with NO visible `D-NN` label, diverging from the recipe class
(measured 0 `<a id>` occurrences across `docs/recipes/*` today per D-22) toward the operations-guide
convention (8 per guide).

### Bold-pseudo-heading prose sections (Rollback/Recovery, Prerequisites)
**Source:** both `03-windows-11-multi-app-kiosk.md` and `04-android-dedicated-mhs-multi-app.md`
Rollback/Recovery sections (excerpted above) and `01-shared-windows-avd-client.md` Prerequisites
bullets (lines 26-34).
**Apply to:** `## Rollback/Recovery` (D-39) and `## Prerequisites` (D-35).

### Full relative path linking (no numeric-prefix shorthand)
**Rule (D-65):** three path shapes needed from `docs/recipes/05-…`:
`../operations/patch-management/…`, `../operations/firmware-bios/…`, `../reference/…`. Verified
against the analog files' own See Also link shapes, e.g. `01-shared-windows-avd-client.md` line 33:
`[Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md)` — same `../<dir>/<file>.md`
relative-path convention, no numeric-prefix shorthand used anywhere in the four shipped recipes.

## No Analog Found

None. All three files being created/amended in this phase have a direct, previously-shipped analog
in the same directory/class. (The registry/filename-map/canary/nav-hub touchpoints that a naive
reading of "add a new recipe" might expect this phase to also touch were verified via `git log` to
be a *separate, later* phase's responsibility — see the "Not this phase" note under File
Classification — and are correctly excluded per CONTEXT.md's explicit phase boundary.)

## Metadata

**Analog search scope:** `docs/recipes/`, `docs/_templates/`, `docs/_standards/`,
`docs/operations/patch-management/`, `scripts/validation/check-phase-135.mjs`,
`scripts/validation/check-phase-136.mjs`, `git log --oneline --all` (for cross-phase precedent).
**Files scanned:** 8 read in full or via targeted grep/sed (all four shipped recipes' H2 skeletons,
recipe 01 and 03 read substantially, recipe 04's Rollback/Configuration-Caused-Failures sections,
the full recipe template, the STD-05 section of EEE-SOP-standard.md, both check-phase-13x needle
files' header comments).
**Pattern extraction date:** 2026-08-26
