# Phase 64 Wave-1 Convention Contract

**Locked:** 2026-05-22
**Author:** Wave 1 executor (Plan 64-01)
**Purpose:** This is the Wave-1 contract every Wave 2 runbook task references. The exact strings locked here are the strings `check-phase-64.mjs` asserts, and the strings the 8 runbooks (`11-` through `18-`) must contain verbatim.

---

## 1. Locked Hard-Callout Exact Opening Strings

These are the **exact** strings `check-phase-64.mjs` asserts. Each runbook MUST contain its assigned opening string byte-for-byte.

| File | OP | Exact Opening String |
|------|----|----------------------|
| `11-vpp-catalog-runbook.md` | OP-9 | `> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**` |
| `12-shared-ipad-passcode-reset.md` | OP-11 | `> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**` |
| `13-device-release-runbook.md` | OP-6 | `> **⛔ Device Release — "release ≠ removal" (OP-6)**` |
| `14-device-transfer-runbook.md` | OP-5 | `> **⛔ Cross-OU Transfer — 4-cell impact matrix (OP-5)**` |

---

## 2. Full Hard-Callout Body Templates

### 2.1 OP-9 — Untouched-OU (file: `11-vpp-catalog-runbook.md`)

```markdown
> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**
>
> Apple transfers ALL licenses (including in-use) only while the destination OU is
> **untouched**. As soon as any action is performed in the new OU (purchase, assign,
> edit metadata), Apple's migration tool switches to transferring ONLY unassigned licenses.
> In-use licenses remain locked to the source OU's legacy token permanently.
>
> **Forbidden actions during migration:** purchase any app; assign any license; edit
> metadata; grant any role in the new OU.
>
> **Pre-migration gate (all must be TRUE):**
> - [ ] New OU has zero licenses, zero people, zero devices
> - [ ] All Content Managers have selected the new OU
> - [ ] All VPP purchasers invited and accepted
>
> Source: PITFALLS.md OP-9 — Apple official "Migrate content tokens" guide
```

### 2.2 OP-11 — MDM EraseDevice (file: `12-shared-ipad-passcode-reset.md`, Path C ONLY)

```markdown
> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**
>
> `EraseDevice` wipes the device and destroys ALL Shared iPad user partitions and
> their cached data. There is no recovery path for user session data once this command
> executes. This path is irreversible.
>
> **⚠️ L2 approval required before proceeding.**
>
> Only use Path C when:
> - Path A (Apple Business UI) is unavailable AND
> - Path B (MDM ClearPasscode) has been attempted and failed AND
> - Data loss on all Shared iPad user partitions has been explicitly accepted by the
>   device owner and an L2 admin has approved the action.
>
> Source: PITFALLS.md OP-11 — Apple MDM Protocol reference; ROADMAP.md SC#1
```

### 2.3 OP-6 — Device Release (file: `13-device-release-runbook.md`)

```markdown
> **⛔ Device Release — "release ≠ removal" (OP-6)**
>
> Releasing a device from Apple Business does NOT remove it from Apple's DEP backend.
> The device-to-MDM-server binding is deleted; however, existing MDM supervision and
> enrollment are NOT immediately broken — the device continues as managed until the next
> factory reset. After factory reset, the device becomes civilian.
>
> Resellers continue to push device serials to Apple Business per commercial agreement.
> A released device can re-appear in Apple Business if the reseller re-pushes it.
> If re-appeared and a default enrollment profile is set, the device will attempt MDM
> enrollment at next factory reset.
>
> **Pre-release checklist (all must be resolved):**
> - [ ] No active Shared iPad session ongoing on device
> - [ ] Admin understands device will re-enroll if DEP profile remains set
> - [ ] No other admin's MDM scope covers this device (coordinate first)
>
> Source: PITFALLS.md OP-6
```

### 2.4 OP-5 — Cross-OU Transfer (file: `14-device-transfer-runbook.md`)

```markdown
> **⛔ Cross-OU Transfer — 4-cell impact matrix (OP-5)**
>
> OU transfer has HIGH-severity downstream effects. VPP device-licensed apps **STOP WORKING**
> immediately after transfer; licenses are tied to the source OU's content token and must be
> explicitly revoked and re-assigned from the target OU's catalog.
>
> | Impact Category | Survives OU Transfer? |
> |----------------|----------------------|
> | VPP device-licensed apps | **BREAKS** — stops working |
> | Enrollment profile | **Does NOT follow** device |
> | Intune config profiles | **Survives** (Intune is assignment authority) |
> | Audit entry | **Logged** — author-scope semantics (OP-14) |
>
> **Pre-transfer dependency checklist:**
> - [ ] Identified all VPP license dependencies in source OU
> - [ ] VPP licenses revoked (30-day grace observed for managed devices)
> - [ ] Target OU catalog has replacement licenses available
> - [ ] Enrollment profile compatibility confirmed with target OU
> - [ ] Device user notified
>
> Source: PITFALLS.md OP-5
```

---

## 3. D-04 Refined-C Gate Rule

**Rule (D-04 Refined-C):** Hard `⛔` callout on EVERY destructive path in `11-`, `12-` Path C, `13-`, `14-`. Light `> **Note:**` for informational warnings in `15-`, `16-`, `17-`.

**Critical distinction:** The `⚠️ L2 approval required` gate clause appears **ONLY** on `12-` Path C (OP-11 / SC#1 EraseDevice). The other destructive-path callouts (`11-` OP-9, `13-` OP-6, `14-` OP-5) are hard `⛔` callouts WITHOUT the L2-approval gate clause.

| File | Path | Hard ⛔ Callout? | L2 Approval Gate? |
|------|------|-----------------|-------------------|
| `11-vpp-catalog-runbook.md` | Full doc | YES (OP-9) | NO |
| `12-shared-ipad-passcode-reset.md` | Path C only | YES (OP-11) | **YES — L2 approval required** |
| `13-device-release-runbook.md` | Full doc | YES (OP-6) | NO |
| `14-device-transfer-runbook.md` | Full doc | YES (OP-5) | NO |
| `15-mdm-server-reassign-runbook.md` | Full doc | NO | NO |
| `16-managed-apple-account-runbook.md` | Full doc | NO | NO |
| `17-audit-log-scoping-runbook.md` | Full doc | NO | NO |
| `18-cross-org-boundary-cheat-sheet.md` | Full doc | NO | NO |

---

## 4. ABAUDIT Numbering Registry

**ABAUDIT purpose:** HTML comments that exempt the immediately following line from C15 regex scanning. The comment form is:
```html
<!-- ABAUDIT-NN: [reason — why this line is a legitimate disambiguation, not an anti-pattern] -->
```

**Numbering rules:**
- Numbering is sequential across the ENTIRE v1.6 corpus (not per-file, not per-phase)
- `ABAUDIT-04` is the LAST number shipped (in `06-mdm-server-assignment.md`, line 12)
- **Phase 64 starts at `ABAUDIT-05`**
- Reserved block: `ABAUDIT-05` through `ABAUDIT-20` (16 slots — generous headroom for all Phase 64 runbooks)
- Specific number-to-file assignments are made during Wave 2 runbook authoring in task order

**Scoping rule (mandatory):**
- The HTML comment on line i exempts ONLY line i+1 (one line only)
- One comment per banned line. If a table row or prose segment has 2 lines that each trigger a C15 regex, that is 2 separate ABAUDIT comments
- Comments do NOT need to be adjacent; each comment independently exempts its own +1 line

**Expected ABAUDIT allocations in Phase 64:**
- `18-cross-org-boundary-cheat-sheet.md` disambiguation table: highest ABAUDIT density. Each table row referencing Intune RBAC/roles/scope-tags needs one comment per triggering line. Expect ABAUDIT-05 through approximately ABAUDIT-14 or higher.
- `12-shared-ipad-passcode-reset.md` Path B prose: "requires Intune RBAC" triggers C15 regex 1 — each such line needs its own ABAUDIT comment
- `14-device-transfer-runbook.md` 4-cell impact matrix: the "Intune config profiles → Survives (Intune is assignment authority)" table row may trigger C15 regex — needs ABAUDIT comment if so

**Live example from corpus** (from `06-mdm-server-assignment.md` lines 12–13):
```markdown
<!-- ABAUDIT-04: next line distinguishes Apple-side MDM server assignment from Intune MDM push-cert management; C15 regex 4 false-positive exemption (disambiguation clause clarifying distinct surfaces, not conflating Apple and Intune delegation) -->
> is an Intune-side operation outside the Apple Business permission surface. See the
```

---

## 5. Per-Runbook `platform:` Frontmatter Values

The `platform:` field uses `+` separators with NO spaces. These values are LOCKED — do not deviate.

| File | `platform:` value |
|------|-------------------|
| `11-vpp-catalog-runbook.md` | `ios+ipados+macos+tvos` |
| `12-shared-ipad-passcode-reset.md` | `ios+macos+shared-ipad` |
| `13-device-release-runbook.md` | `ios+ipados+macos+tvos` |
| `14-device-transfer-runbook.md` | `ios+ipados+macos+tvos` |
| `15-mdm-server-reassign-runbook.md` | `ios+ipados+macos+tvos` |
| `16-managed-apple-account-runbook.md` | `ios+macos` |
| `17-audit-log-scoping-runbook.md` | `ios+ipados+macos+tvos` |
| `18-cross-org-boundary-cheat-sheet.md` | `ios+ipados+macos+tvos` |

---

## 6. Locked Envelope Specification

All 8 runbooks share this mandatory envelope structure. `check-phase-64.mjs` asserts envelope presence for all 8.

### 6.1 Frontmatter (5-field, mandatory)

```yaml
---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: [per-runbook value from §5 table above]
---
```

### 6.2 Platform Applicability Blockquote

Must appear immediately after frontmatter (before or at the start of the document body). Pattern:

```markdown
> **Platform applicability:** This document covers Apple Business [action-specific description] —
> [what this covers and what it does NOT cover]. This is distinct from [related Intune/other surface],
<!-- ABAUDIT-NN: next line is an Apple-Business-vs-Intune disambiguation clause; C15 false-positive exemption -->
> which is [description outside Apple Business surface].
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).
```

`18-cross-org-boundary-cheat-sheet.md` omits the forward link to itself; it carries the same Platform applicability block but references its own content inline.

### 6.3 Training-Data Notice Blockquote

```markdown
> **Training-data notice:** [Action] UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/PITFALLS.md [OP-NN]. Steps are marked
> `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).
```

### 6.4 Scope-Boundary Callout (D-02)

Runbooks `11-` through `17-` carry this callout. `18-` omits it (it IS the SOT).

```markdown
> **Scope boundary:** This runbook covers Apple Business-side [action]; Intune-side
> [related concern] is outside the Apple Business permission surface and is not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).
```

### 6.5 Required Sections (H2)

- `## Required Role & Permission` — present in action runbooks `11-` through `17-` ONLY
  - `18-cross-org-boundary-cheat-sheet.md` is a reference cheat-sheet with no single delegated action — this H2 is EXEMPT for `18-`
- `## Verification` — present in ALL 8 files (including `18-`)

---

## 7. C16 Constraint for `12-`

`12-shared-ipad-passcode-reset.md` must **NOT** contain the string `34-apple-business` in Phase 64.

**Background:** The `v1.6-audit-allowlist.json` line 82 exempts the `admin_12 ↔ l1_34` C16 edge with `"sunset_phase": "64-65"`. The `34-apple-business-shared-ipad-passcode-reset.md` file does not yet exist; adding a broken forward link in Phase 64 would be invalid. The C16 edge goes live in Phase 65.

`check-phase-64.mjs` V-64-05 asserts the ABSENCE of `34-apple-business` in `12-`.

---

## 8. Hard-Callout Convention Summary (Phase 64 First Realization)

Phase 64 introduces the `⛔` hard-bordered callout convention. The convention specification:

- Opening line: `> **⛔ [ACTION LABEL] — [SEVERITY/CONSEQUENCE] ([OP-NN])**`
- Body: consequence sentence(s), then mitigation/checklist
- Separator `---` before the callout block (matches `09-shared-ipad-lifecycle.md` lines 41/69 pattern)
- The `⛔` glyph is the exact discriminator `check-phase-64.mjs` asserts via `includes()`

This convention is derived from the `09-shared-ipad-lifecycle.md` "Critical (OP-12)" precedent (lines 43–68), upgraded with the `⛔` glyph to distinguish Phase 64 hard callouts from the pre-existing `> **Critical` form.
