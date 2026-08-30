# Phase 152: Integration, Registry & Navigation-Last Close - Pattern Map

**Mapped:** 2026-08-27
**Files analyzed:** 9 (4 Commit-A files, 2 hub files, 3+ inbound-link host files; validator authoring itself is out of scope — Phase 153)
**Analogs found:** 9 / 9

This is a documentation-corpus repo. "Files" below are markdown/registry/pipeline-script edits,
not application code. Every analog is a real prior commit or a real validator file already in
the tree — no invented patterns.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/_registry/RE-index.md` | registry/data table | CRUD (append rows) | `f0b7aa90` (Phase 137, RE-224/RE-225 append) | exact |
| `scripts/pipeline/filename-map.md` | generated artifact | batch/transform (regenerated, never hand-edited) | `f0b7aa90` diff on same file | exact |
| `scripts/pipeline/build-filename-map.mjs` | utility/generator + self-test canary | transform + drift-canary | same file's own prior bump, `f0b7aa90` commit body | exact (self-referential precedent) |
| `scripts/pipeline/build-publish-bundle.mjs` | service/orchestrator + self-test canary | batch (Approved-filter, zip build) | same file's own prior bump, `f0b7aa90` commit body | exact (self-referential precedent) |
| `docs/operations/00-index.md` | nav hub (not C17-enrolled) | request-response (static routing table) | `f4399195` (Phase 65, Apple Business H3 insert into a sibling hub file with same table shape) | role-match, structurally identical |
| `docs/index.md` | nav hub (C17-enrolled, `RE-219`) | request-response | `f4399195` (Phase 65 3-edit commit: banner clause, sub-heading + 3-row table, Cross-Platform References rows, Version History row) | exact |
| `docs/operations/patch-management/06-windows-driver-firmware-updates.md` (D-51 inbound link) | content edit (link insertion) | request-response | Phase 137/132 inbound-link style edits (single-line link insert, no structural change) | role-match |
| `docs/admin-setup-apv1/01-hardware-hash-upload.md` (D-54 inbound link, `RE-077`, C17-enrolled) | content edit (link insertion into an enrolled, See-Also-bearing file) | request-response | same class as above; C17-enrolled constraint mirrors `docs/index.md` handling | role-match |
| needle-spec handoff (STATE.md + plan summary, NOT a validator file — Phase 153 authors `check-phase-152.mjs`) | spec/config artifact | event-driven (handoff) | `check-phase-137.mjs` (full working needle-spec template) + `5f48a829` (STATE.md-only handoff precedent) | exact |

## Pattern Assignments

### `docs/_registry/RE-index.md` (registry, CRUD-append)

**Analog:** commit `f0b7aa90` (Phase 137 — "register RE-224/RE-225, regenerate filename-map, bump both row-count canaries")

**Row-append pattern** (diff from `f0b7aa90`):
```diff
 | RE-222 | docs/recipes/01-shared-windows-avd-client.md | Shared Windows AVD-Client Device: Self-Deploying Provisioning | Guide | Approved |
 | RE-223 | docs/recipes/02-shared-ipad-full-provisioning.md | Shared iPad Full Provisioning: Federated Sign-In to Verified End State | Guide | Approved |
+| RE-224 | docs/recipes/03-windows-11-multi-app-kiosk.md | Windows 11 Multi-App Kiosk: Assigned Access Provisioning | Guide | Approved |
+| RE-225 | docs/recipes/04-android-dedicated-mhs-multi-app.md | Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning | Guide | Approved |

 ## Review Notes
```
Rows append at the tail, inside the table, before `## Review Notes` (D-15). Title column is the
H1 verbatim (D-13); Status is `Approved` for all new rows (D-10); Doc Type per D-12's rule
(`Guide` for the nine ops docs + Recipe #5, `Reference` for the matrix). Per D-11, record the
`Approved`-semantic exception in `## Review Notes` the way the existing `RE-212` entry does —
read that entry verbatim before writing the new note (not excerpted here; grep
`RE-212` in `docs/_registry/RE-index.md`).

---

### `scripts/pipeline/filename-map.md` (generated artifact, transform)

**Analog:** same `f0b7aa90` diff — two pure-addition lines, zero reordering:
```diff
 <221-existing-entries>
+RE-224 ...
+RE-225 ...
```
Never hand-edited (D-16). Regenerate via `node scripts/pipeline/build-filename-map.mjs` after the
registry rows land, then diff against the committed map to confirm pure append (no renames — this
phase's D-16 already measured `236a237,247`, eleven pure additions).

---

### `scripts/pipeline/build-filename-map.mjs` (canary 1, 4 sites)

**Analog:** the commit body of `f0b7aa90` + this file's own comment block at the row-count assertion.

**Exact commented pattern to replicate** (`scripts/pipeline/build-filename-map.mjs:274-284`, current text):
```javascript
  // (c) Parsing the REAL docs/_registry/RE-index.md yields exactly 225 rows
  //     (bumped 221 -> 223 at v1.18 close: RE-222/RE-223 recipes added in Phase 132;
  //      bumped 223 -> 225 in Phase 137: RE-224/RE-225 recipes added;
  //      deliberate drift-canary, bump on each registry-row addition)
  {
    const content = readFile(REGISTRY_REL_PATH);
    const rows = content ? parseRegistry(content) : [];
    stAssert(
      '(c) parseRegistry(docs/_registry/RE-index.md) yields exactly 225 rows',
      rows.length === 225,
      'rows.length=' + rows.length
    );
  }
```
D-17: bump **four** sites (lines 274, 276, 282, 283 in the current file) — comment lines 274/276,
the assertion label string at 282, and the numeric literal in the `stAssert` call at 283. Append a
new provenance line beneath the existing history rather than editing prior lines (D-18) — the
existing three-line comment history (`221 -> 223`, `223 -> 225` per Phase 137) is the model; add a
fourth `225 -> 236 in Phase 152` line. New value is `236` (eleven new rows: `225 + 11`).

---

### `scripts/pipeline/build-publish-bundle.mjs` (canary 2, 4 sites)

**Analog:** same commit `f0b7aa90`.

**Module header** (`scripts/pipeline/build-publish-bundle.mjs:8` — D-17's easy-to-miss site):
```javascript
// Converts EVERY docs/_registry/RE-index.md Status:Approved doc (225 today) to .docx,
```
Bump `225` → `236` here too — this is the literal the first CONTEXT draft would have missed
(D-17's "no self-test catches a stale comment").

**Self-test assertion block** (`scripts/pipeline/build-publish-bundle.mjs:515-523`):
```javascript
  // (a) Approved selection yields exactly 225 rows (reuses the imported, self-test-proven parser)
  //     (bumped 221 -> 223 at v1.18 close: RE-222/RE-223 recipes added in Phase 132, but this
  //      canary was MISSED then -- RED since the v1.18 close per FILENAME-MAP-SELFTEST-DRIFT
  //      (see 6acc429b, which only bumped build-filename-map.mjs's canary, not this one);
  //      bumped 223 -> 225 in Phase 137: RE-224/RE-225 recipes added, both canaries now bumped together)
  stTry('(a) Approved selection yields exactly 225 rows', () => {
    const content = readFile(REGISTRY_REL_PATH);
    const rows = content ? parseRegistry(content).filter(r => r.status === 'Approved') : [];
    stAssert('(a) Approved selection yields exactly 225 rows', rows.length === 225, 'rows.length=' + rows.length);
  });
```
Same 4-site rule: header comment line 8, this comment block, the label string, the assertion
literal. New value: since all eleven rows are Approved, the Approved-only count equals the
all-rows count — but D-19/D-20 require measuring each **separately** via its own instrument
(`grep -c "^| RE-"` for canary 1, the Approved-filtered count for canary 2), never transcribing
one predicted number for both. Append a new provenance line per D-18, matching this block's
existing history style exactly (parenthetical, past-tense, names the phase and the rows added).

**Version-flag default trap** (`scripts/pipeline/build-publish-bundle.mjs:40`, cited in D-23 — do
not touch this line, but the executor MUST invoke with `--version=v1.21.0` because the default is
stale):
```javascript
const VERSION = ... /* defaults to 'v1.17' */
```

---

### `docs/operations/00-index.md` (nav hub, request-response, NOT C17-enrolled)

**Analog:** commit `f4399195` (Phase 65) — same H3-insertion pattern used against
`docs/operations/00-index.md`'s sibling H2/H3 structure (this file already uses this exact shape
for its 4 existing H2 sections, verified: `## Co-Management`, `## Patch & Update Management`,
`## App Lifecycle Automation`, `## Compliance Drift Detection + Tenant Migration`,
`## Apple Business Governance`, `## Version History`).

**Patch table row-growth pattern** (`docs/operations/00-index.md:301-308`, current):
```markdown
### Patch & Update Management

Cross-platform OS update enforcement -- Windows Update for Business rings, macOS managed update commands (DDM), iOS supervised vs unsupervised update lifecycle, and Android per-OEM patch delivery (Play Integrity tier impact).

| Resource | Description |
|----------|-------------|
| [Patch & Update Management Overview](operations/patch-management/00-overview.md) | 4-platform update-enforcement comparison hub (Windows + macOS + iOS + Android) |
| [Windows WUfB Rings](operations/patch-management/01-windows-wufb-rings.md) | Windows Update for Business ring topology; Hotpatch; dual-scan source conflict |
| [Android Patch Delivery](operations/patch-management/04-android-patch-delivery.md) | Per-OEM patch delivery; Play Integrity MEETS_STRONG_INTEGRITY enforcement cascade |
```
D-32: append four rows after the existing Android row, filename order (05 Linux, 06 driver/firmware,
07 Autopatch, 08 app updates), each a markdown link + one terse Covers clause — D-65 bars
"Autopatch...rings" adjacency without the disambiguation keyword ("Autopatch groups and the Test
and Last deployment rings", not "Autopatch rings").

**Version History row pattern** (`docs/operations/00-index.md:74-79`, current — table is
reverse-chronological, top row newest):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 65 plan 65-03: appended Apple Business Governance H2 (ABNAV-06; 5th Operations sub-section) | -- |
| 2026-05-01 | Phase 59 (CLEAN-08): added 3 new H2 sections (...) | -- |
```
D-36: insert a new top row dated at execution, naming both edits (new heading + 4 Patch rows) and
the requirement ID (INT-04), Author cell `--`.

**New heading placement** (D-29, D-30): insert `## Firmware and BIOS Governance` after
`## Apple Business Governance` and before `## Version History`, matching the append-only pattern
Phase 65 used to add its own H2 in the same spot on the sibling hub. Table is the same
`| Guide | Covers |` shape, 6 rows (5 firmware-bios docs + 1 cross-directory matrix row per D-31).

---

### `docs/index.md` (nav hub, request-response, C17-enrolled `RE-219`)

**Analog:** commit `f4399195` (Phase 65) — direct structural precedent for every sub-part of
Commit B on this file.

**Banner blockquote edit — target line 23, NOT line 21** (`docs/index.md:18-27` measured, cat -n
offset by 17; actual file lines are 21/23/25/27):
```
> **Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS) provisioning,

> plus cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration),

> and Apple Business delegated governance (Apple Business-managed device pools, shared iPad passcode reset, sub-org admin onboarding).

> Not sure which framework applies? See [APv1 vs APv2](apv1-vs-apv2.md) for Windows or [Windows vs macOS](windows-vs-macos.md) for cross-platform.
```
Line 23 (the "plus cross-platform operational depth..." paragraph) is the operational-domain
enumeration and the D-44 target — append the firmware/BIOS clause there, matching Phase 65's own
edit style (append inside the parenthetical, comma-joined, before the closing paren):
```diff
-> **Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS) provisioning,
+> **Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS) provisioning, and Apple Business delegated governance (...).
```
(this is Phase 65's actual literal diff, shown above as `f4399195`'s change — reuse this exact
append-in-parenthetical shape on line 23, not line 21.)

**Sub-heading + table insertion pattern** (`f4399195` diff, exact copy target for D-38/D-39):
```diff
+### Apple Business Governance
+
+Apple Business delegated governance for sub-org admins -- Shared iPad passcode reset, permission denied investigation, MDM server assignment, VPP catalog, Managed Apple Account provisioning, and cross-org boundary operations.
+
+| Resource | Description |
+|----------|-------------|
+| [Apple Business Operations Overview](cross-platform/apple-business/00-overview.md) | Governance tree root; links to all 18 admin-context docs |
+| [L1 #34: Shared iPad Passcode Reset](l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md) | Path A (Apple Business UI, L1-delegatable) |
+| [L2 #26: Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) | 7-leaf Mermaid triage tree |
```
Copy this shape exactly for `### Firmware and BIOS Governance` with 3 rows (domain overview, DFCI
guide, Dell guide — D-39), placed to mirror the operations-index placement (D-38).

**Recipes table row-append pattern** (`docs/index.md:280-283`, current — exact model for the new
Recipe #5 row per D-42):
```markdown
| [Shared Windows AVD-Client Device: Self-Deploying Provisioning](recipes/01-shared-windows-avd-client.md) | Provision a self-deploying, Entra-joined shared Windows device running the Windows App as its Azure Virtual Desktop client -- device/Intune config only, assumes AVD host pools and session hosts already exist |
| [Shared iPad Full Provisioning: Federated Sign-In to Verified End State](recipes/02-shared-ipad-full-provisioning.md) | Provision a supervised Shared iPad end-to-end -- ADE enrollment, federated Managed Apple Account sign-in, device-licensed Required apps, and per-role layered configuration |
| [Windows 11 Multi-App Kiosk: Assigned Access Provisioning](recipes/03-windows-11-multi-app-kiosk.md) | Lock a Windows 11 device to a restricted user experience -- a multi-app allow-list, Start layout, and Taskbar -- delivered through an AssignedAccess CSP custom OMA-URI profile, with no Templates GUI path available |
| [Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning](recipes/04-android-dedicated-mhs-multi-app.md) | Lock an Android Enterprise Dedicated device to a curated Managed Home Screen app grid -- MHS assigned as Required, an App Configuration policy carrying the worked JSON payload, and exit-PIN hardening |
```
Same one-line-per-row pattern, title = H1 verbatim, description does not imply a device end state
(D-42).

**Patch sub-table row-add pattern** (`docs/index.md:301-308` matches the operations-index copy
exactly — same table appears on both hubs):
```markdown
### Patch & Update Management

Cross-platform OS update enforcement -- ...

| Resource | Description |
|----------|-------------|
| [Patch & Update Management Overview](operations/patch-management/00-overview.md) | 4-platform update-enforcement comparison hub (Windows + macOS + iOS + Android) |
| [Windows WUfB Rings](operations/patch-management/01-windows-wufb-rings.md) | Windows Update for Business ring topology; Hotpatch; dual-scan source conflict |
| [Android Patch Delivery](operations/patch-management/04-android-patch-delivery.md) | Per-OEM patch delivery; Play Integrity MEETS_STRONG_INTEGRITY enforcement cascade |
```
D-41: append **one** row only, for Linux update delivery (`05-linux-update-delivery.md`).

**Quick-nav line 38 pattern** (`docs/index.md`, "Choose Your Platform" bullet list — D-43 target
is the Recipes bullet, currently reading):
```markdown
- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning, Windows 11 multi-app kiosk, Android Dedicated multi-app kiosk)
- [Operations](#operations) -- Cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration)
```
D-45/D-46: amend the Recipes bullet's lead-in prose ("End-to-end provisioning and governance
recipes with embedded admin decision points") and append `enterprise update plan` (lowercase) to
the parenthetical list. D-43 explicitly: do NOT touch the Operations bullet line (Phase 65's own
precedent left its sibling gap unfixed — this is intentional, matching precedent).

**Version History row pattern**: same shape as the operations-index table shown above; insert at
top, reverse-chronological convention only (not a strict sort invariant — D-47).

---

### Inbound-link host files (D-51..D-54)

**Analog class:** single-line link insertions into existing prose/section — no structural
change, no new heading. No single historical commit is a perfect analog (these are small,
scattered edits), but the constraint pattern is: for C17-enrolled targets (`RE-077` —
`docs/admin-setup-apv1/01-hardware-hash-upload.md`), the edit must respect that file's existing
See Also / Version History sections and the frozen-anchor rule already established for
`docs/index.md` in the Phase 65 precedent (D-49) — link to the file, not a heading anchor, per
this phase's own D-54 correction. Read the target section headings in each host file directly at
plan/execution time; no excerpt substitutes for that.

---

### Needle-spec handoff (Phase 153 authors the validator; this phase authors only the spec)

**Analog:** `scripts/validation/check-phase-137.mjs` (full working template) — this is the
closest complete example of exactly what INT-05 asks Phase 153 to produce, and this phase's job
is to write down the needle-spec so precisely that Phase 153 does no re-derivation (D-57, D-62).

**Header self-documentation pattern** (`scripts/validation/check-phase-137.mjs:1-19`):
```javascript
#!/usr/bin/env node
// check-phase-137.mjs -- Phase 137 deliverables (Integration & Navigation-Last Close)
//
// v1.19 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-138.mjs).
// NEEDLE IS FULLY PRE-SPECIFIED -- copied from 137-02-SUMMARY.md's "Needle-spec handoff" section and
// STATE.md:349, not re-derived. Per-recipe, LINE-SCOPED co-presence check, NOT a whole-file c.includes():
// a whole-file `includes('Dedicated')` false-matches docs/index.md:36 (two lines above the quick-nav
// bullet), so every assertion here extracts the single matching line and tests THAT line in isolation.
```

**Line-scoped bullet check pattern (avoids the whole-file false-match D-61 warns about)**
(`scripts/validation/check-phase-137.mjs:79-97`):
```javascript
{
  name: 'V-137-BULLET: single quick-nav bullet line contains both recipe fragments (line-scoped)',
  run() {
    // ... extracts the single bulletLines match, asserts exactly 1 line found,
    // then tests BULLET_FRAGMENT_03 / BULLET_FRAGMENT_04 against THAT line only ...
    if (bulletLines.length !== 1) {
      return { pass: false, detail: 'BULLET needle absent: expected exactly 1 quick-nav bullet line, found ' + bulletLines.length };
    }
    if (!isolatedLine.includes(BULLET_FRAGMENT_03)) {
      return { pass: false, detail: 'BULLET needle absent on the isolated bullet line: "' + BULLET_FRAGMENT_03 + '"' };
    }
    return { pass: true, detail: 'isolated quick-nav bullet line contains both fragments' };
  }
}
```

**Filename-map needle** — MUST be carried forward (D-61 flags this as the twin's regression risk
if omitted). Model from `scripts/validation/check-phase-132.mjs:60-70`:
```javascript
checks.push({
  id: 'FILENAMEMAP',
  name: 'V-132-FILENAMEMAP: RE-222 + RE-223 present in ' + DELIVERABLE_FILENAMEMAP,
  run() {
    const c = readFile(DELIVERABLE_FILENAMEMAP);
    if (c === null) return { pass: false, detail: DELIVERABLE_FILENAMEMAP + ' missing' };
    if (!c.includes('RE-222')) return { pass: false, detail: 'FILENAMEMAP needle absent: RE-222' };
    if (!c.includes('RE-223')) return { pass: false, detail: 'FILENAMEMAP needle absent: RE-223' };
    return { pass: true, detail: '...' };
  }
});
```

**HUBSNOTWIRED corrected-literal warning** (`check-phase-137.mjs:15-16` header comment —
important for the needle-spec's own self-documentation, since D-61 also requires "the three
troubleshooting hubs not referencing recipes/05-"):
```javascript
//   V-137-HUBSNOTWIRED      common-issues.md / quick-ref-l1.md / quick-ref-l2.md do NOT reference recipes/03- or recipes/04-
//                            (corrected literals -- check-phase-132.mjs:97's own pattern does not cover
//                            recipes 03/04 and must not be edited, per 137-02-SUMMARY.md's Correction of record)
```
Same class of warning applies here: state explicitly in the needle-spec that
`check-phase-132.mjs`'s existing HUBSNOTWIRED pattern does not cover `recipes/05-` and must not be
edited (frozen), matching the precedent this phase's D-60/D-61 already establish.

**Self-invariant pattern** (`check-phase-137.mjs:32-33`):
```javascript
// Lightweight: NO chain (chain lives only in apex check-phase-138.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);
```
Same dual-invariant applies to the Phase-153-authored `check-phase-152.mjs`.

**Handoff-surface precedent** (D-63): commit `5f48a829` touched `STATE.md` only, one line — but
this phase's D-63 requires recording on BOTH `STATE.md`'s Plan-Time Research Flags block AND the
final plan summary, since a spec living only in a summary is not on the surface a Phase-153
planner reads.

## Shared Patterns

### Provenance-line canary bumps (never in-place edits)
**Source:** `scripts/pipeline/build-filename-map.mjs` and `build-publish-bundle.mjs`, both at
their self-test comment blocks (excerpted above).
**Apply to:** both canary bump edits in Commit A. Append a new line beneath the existing history;
never rewrite a prior line.

### Registry-row / hub-table row append-only, tail-of-table
**Source:** `f0b7aa90` (registry), `f4399195` (both `docs/index.md` tables).
**Apply to:** `RE-index.md`, both Patch sub-tables, the Recipes table, both new Firmware/BIOS
tables.

### Both hub files mirror each other's section order
**Source:** established pattern noted in CONTEXT.md's own "Established Patterns" list, confirmed
by direct comparison of `docs/index.md`'s Operations H2 sub-headings against
`docs/operations/00-index.md`'s top-level H2s — both currently end in
`... / Apple Business Governance / (new: Firmware and BIOS Governance)`.
**Apply to:** placement decisions for the new heading on both files (D-30, D-38).

### Version History table: reverse-chronological, top-insert, `Author: --`
**Source:** both `docs/index.md:Version History` and `docs/operations/00-index.md:Version
History` (excerpts above) — every existing row in both tables uses `Author: --`.
**Apply to:** D-36, D-47 rows.

## No Analog Found

None. Every file in this phase's blast radius has a direct, quoted precedent already in the tree
— this phase is explicitly modeled as the structural twin of Phase 137/132, and the CONTEXT.md
canonical_refs section already names the exact analogs used above.

## Metadata

**Analog search scope:** `scripts/pipeline/`, `scripts/validation/`, `docs/index.md`,
`docs/operations/00-index.md`, `docs/_registry/RE-index.md`, and commits `f0b7aa90`, `b694254f`,
`f4399195`, `c3733928`, `5f48a829` (all named in 152-CONTEXT.md's canonical_refs).
**Files scanned:** 9 target files + 5 precedent commits + 3 validator files.
**Pattern extraction date:** 2026-08-27
