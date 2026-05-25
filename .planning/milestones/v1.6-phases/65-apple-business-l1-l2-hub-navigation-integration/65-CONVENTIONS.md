# Phase 65 Wave-1 Convention Contract

**Locked:** 2026-05-22
**Author:** Wave 1 executor (Plan 65-01)
**Purpose:** This is the Wave-1 contract every Wave 2-5 task references. The exact strings locked here are the strings `check-phase-65.mjs` asserts, and the strings the Phase 65 deliverables (L1 #34, L2 #26, 5 hub appends, `12-` back-link) must contain verbatim.

See also: 65-PATTERNS.md (implementation excerpts + analog excerpts); 65-RESEARCH.md (verified line numbers + Mermaid syntax + ABAUDIT-24 reconciliation contract + V-64-05 flip block).

---

## 1. L1 #34 + L2 #26 Frontmatter Envelope

All new Phase 65 Apple Business docs use this mandatory 5-field frontmatter.

### 1.1 L1 #34 Frontmatter (file: `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md`)

Exact values (LOCKED — do not deviate):

```
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: L1
platform: ios+macos+shared-ipad
```

Key constraint: `platform: ios+macos+shared-ipad` — compound value with `+` separator, NO spaces around `+`. This is the Phase 62 contract (D-A5). The exact string `platform: ios+macos+shared-ipad` is verified in `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md:6`.

### 1.2 L2 #26 Frontmatter (file: `docs/l2-runbooks/26-apple-business-permission-denied.md`)

Exact values (LOCKED):

```
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: L2
platform: ios+macos+shared-ipad
```

The L2 uses the same `platform: ios+macos+shared-ipad` compound value as L1 #34.

### 1.3 L1 Read-Only Convention (VERBATIM — do not paraphrase)

The following note from `docs/l1-runbooks/30-linux-enrollment-failed.md:21` MUST be reproduced verbatim in L1 #34, with the Linux-specific parenthetical replaced by an Apple Business equivalent:

Original (30-:21):
> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing commands (`sudo apt install`, package reinstall, service restart) appear ONLY in the per-cause `### Admin Action Required` sections — they are not L1 actions.

For L1 #34, replace the Linux-specific parenthetical with Apple Business equivalents. The opening structure is IDENTICAL. Destructive Path C (EraseDevice) is L2-only per OP-11 and MUST NOT appear as an L1-executable step.

---

## 2. C16 4-Edge Load-Bearing Substring Registry (LOCKED — silent edge break if reworded)

Source: `scripts/validation/v1.6-milestone-audit.mjs:771-803` (C16 edgeMap).

These substrings are verified at `v1.6-milestone-audit.mjs:798` via `content.includes()`. Any rewording breaks the C16 edge SILENTLY — the harness gives no explicit error message for the missing substring; it shows "EXEMPTED" if an exemption covers the file.

| File | Required Substring | C16 Edge ID | Harness Line |
|------|--------------------|-------------|--------------|
| `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` | `12-shared-ipad-passcode-reset` | l1_34 → admin_12 | :778 |
| `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` | `34-apple-business` | admin_12 → l1_34 | :779 |
| `docs/common-issues.md` | `#apple-business-quick-reference` | common_issues → quick_ref_l1 | :780 |
| `docs/quick-ref-l1.md` | `34-apple-business` | quick_ref_l1 → l1_34 | :781 |

### H2 Title Lock (CRITICAL — C16 `common_issues` edge depends on this slug)

The H2 title in `docs/quick-ref-l1.md` MUST be EXACTLY:

```
## Apple Business Quick Reference
```

GitHub slugifies this to `#apple-business-quick-reference`. This is the slug `docs/common-issues.md` must contain in its C16 cross-link substring. DO NOT REWORD. Even adding "Card" (e.g., "## Apple Business Quick Reference Card") changes the slug to `#apple-business-quick-reference-card` and silently breaks the C16 `common_issues → quick_ref_l1` edge (65-PATTERNS.md Pitfall 2).

The H2 title `## Apple Business Quick Reference` also appears in `docs/quick-ref-l2.md` for consistency, but is NOT C16 load-bearing for the l2 file.

See 65-PATTERNS.md §"C16 Load-Bearing Substrings" for the complete table.

---

## 3. ABAUDIT Registry Continuity

### 3.1 Last-Shipped Number

ABAUDIT-23 is the last-shipped ABAUDIT number, allocated in `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md` (verified in 65-RESEARCH.md:309).

Phase 65 reserves ABAUDIT-24 as the next available number.

### 3.2 ABAUDIT-24 Allocation

ABAUDIT-24 is reserved for the L2 #26 Intune-scope leaf if and only if **Option B** (use the banned phrases + ABAUDIT exemption) is chosen. The recommended approach is **Option A**: avoid the banned phrases entirely.

Option A example callout (from 65-RESEARCH.md:279-285):

```
> **Scope boundary:** This path involves MDM commands (ClearPasscode / EraseDevice) that are
> issued from the Intune admin center, outside the Apple Business permission surface.
> See [18-cross-org-boundary-cheat-sheet.md](../cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md)
> for the full Apple-Business-vs-Intune responsibility table.
```

This phrasing avoids the C15 regex triggers, making ABAUDIT-24 unnecessary. Prefer Option A to minimize ABAUDIT overhead.

If Option B is required, the ABAUDIT-24 line-pair form is:

```
<!-- ABAUDIT-24: next line [reason why it trips C15]; C15 regex N false-positive exemption ([justification]) -->
[the line that trips C15]
```

### 3.3 C15 Regex Set L2 #26 Must Dodge or Exempt

The following regexes (quoted verbatim from `v1.6-milestone-audit.mjs:847-856`) are the highest-risk patterns for the L2 #26 Intune-scope leaf callout:

- **Regex 1** (`v1.6-milestone-audit.mjs:847`): `/\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i`
- **Regex 4** (`v1.6-milestone-audit.mjs:853`): `/\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i`

### 3.4 Line-Pair Rule (MANDATORY)

The HTML comment `<!-- ABAUDIT-NN: reason -->` exempts ONLY the immediately following line (`i+1`). The colon after the number is REQUIRED — the harness regex at `v1.6-milestone-audit.mjs:860` is `/<!--\s*ABAUDIT-\d+:/`. A space instead of a colon silently fails to exempt.

One comment per banned line. Budget one `<!-- ABAUDIT-NN -->` per line that trips a C15 regex.

---

## 4. 5-Hub Append-Only Contract (PITFALL-6)

All 5 hub-file edits are append-only. NO existing H2/H3 headings are renamed in any hub file. New content is inserted BETWEEN the last content H2 and `## Version History`.

### 4.1 Insertion Points (from 65-RESEARCH.md verified line numbers)

| File | Insertion After | Before | Verified Line |
|------|-----------------|--------|---------------|
| `docs/common-issues.md` | Android Enterprise Failure Scenarios section `:268-336` | `## Version History` `:337` | 65-RESEARCH.md ABNAV-03 |
| `docs/quick-ref-l1.md` | `## Linux Quick Reference` `:186-215` | `## Version History` `:216` | 65-RESEARCH.md ABNAV-04 |
| `docs/quick-ref-l2.md` | `## Linux Quick Reference` `:283-328` | `## Version History` `:329` | 65-RESEARCH.md ABNAV-05 |
| `docs/operations/00-index.md` | `## Compliance Drift Detection + Tenant Migration` `:51-61` | `## Version History` `:63` | 65-RESEARCH.md ABNAV-06 |
| `docs/index.md` | See Section 4.2 (surgical edits) | See Section 4.2 | 65-RESEARCH.md ABNAV-07 |

### 4.2 `docs/index.md` Surgical Edits (3 locations — NOT pure append-only)

`docs/index.md` requires 3 surgical edits per D-A4. Sub-H3 insertion shifts absolute line numbers for content after the insertion point, but NOT anchor slugs (acceptable per PITFALL-6 definition, which monitors H2/H3 anchor slugs, not line numbers):

1. **Line 9 banner append** — append `, plus Apple Business delegated governance (Apple Business-managed device pools, shared iPad passcode reset, sub-org admin onboarding)` before the closing period of the existing platform-coverage blockquote.

2. **`### Apple Business Governance` sub-H3** — insert after the last existing sub-H3 under `## Operations` H2 (after `:267` / `### Compliance Drift Detection + Tenant Migration` block), before the `---` separator (`:277`).

3. **Cross-Platform References entries** — append before `## Version History`.

See 65-PATTERNS.md §"`docs/index.md` (hub surgical edits ABNAV-07)" for the exact content template.

---

## 5. Atomic-Trio Contract (Wave 4 / D-04a + 62-08-PLAN §464-465)

The following 3 sub-actions are INDIVISIBLE. Any partial application leaves the validator chain RED (V-64-05 or V-65-12/13/14 will fail).

### Sub-Action 1: `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` back-link

Append a new bullet inside the existing `## Cross-References` H2 at `:194` (after the 3rd existing bullet, before the blank line + `## Version History`). The exact new bullet:

```
- **L1 runbook:** [L1 #34 — Apple Business Shared iPad Passcode Reset](../../l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md) (Path A L1-delegated entry point)
```

The relative path from `docs/cross-platform/apple-business/` to `docs/l1-runbooks/` is `../../l1-runbooks/`. The substring `34-apple-business` MUST appear (C16 `admin_12 → l1_34` edge). ABAUDIT-06 (line 13) and ABAUDIT-07 (line 116) are unaffected — this append is after line 194.

### Sub-Action 2: `scripts/validation/v1.6-audit-allowlist.json` — remove 4 sunset-65 entries

The 4 entries in `c16_missing_endpoint_exemptions` with `sunset_phase` of `"65"` or `"64-65"` MUST ALL be removed in the same atomic commit. The 4 identifiers:

- `admin_12` — file `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`, `sunset_phase: "64-65"`
- `l1_34` — file `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md`, `sunset_phase: "65"`
- `common_issues` — file `docs/common-issues.md#apple-business-governance-failure-scenarios`, `sunset_phase: "65"`
- `quick_ref_l1` — file `docs/quick-ref-l1.md#apple-business-quick-reference`, `sunset_phase: "65"`

Target state: `"c16_missing_endpoint_exemptions": []`

Any entry left in this array masks the C16 edge check (harness `:787-790` skips file if exempted).

### Sub-Action 3: `scripts/validation/check-phase-64.mjs:135-145` V-64-05 flip

Replace the NEGATIVE assertion (must NOT contain `34-apple-business`) with a POSITIVE assertion (MUST contain `34-apple-business`). The exact replacement block is in 65-PATTERNS.md §"Sub-Action 3" and 65-RESEARCH.md §"Recommended Reconciliation Approach".

The old failure detail string `12- contains 34-apple-business reference (C16 sunset Phase 65; must not appear in Phase 64)` MUST be absent after the flip. V-65-14 asserts this post-condition.

---

## 6. Validator Scope Boundary

`check-phase-65.mjs` MUST NOT duplicate C16 logic. C16 is handled exclusively by the V-65-AUDIT subprocess invocation of `v1.6-milestone-audit.mjs` (analog: `check-phase-64.mjs:316-331`).

`check-phase-65.mjs` performs ONLY Phase-65-specific structural assertions:
- File existence (L1 #34, L2 #26)
- Frontmatter strings (`platform: ios+macos+shared-ipad`)
- Cross-link substrings in L1 #34 (`12-shared-ipad-passcode-reset`, `#which-admin-owns-this-pool`)
- H2/section presence in hub files (5 hub appends)
- Mermaid leaf-node count (L2 #26: `([` occurrences ≥ 7)
- Allowlist JSON parse (`c16_missing_endpoint_exemptions.length === 0`)
- V-64-05 flip post-condition (old failure detail string absent from `check-phase-64.mjs`)
- CHAIN_PHASES self-reference guard (`!CHAIN_PHASES.includes(65)`)

### 6.1 CHAIN_PHASES Extension

CHAIN_PHASES extends to `[48..64]` (adds 64 from check-phase-64.mjs's `[48..63]`):

```
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
```

Phase 65 itself is NOT included (V-65-SELF asserts this; D-22 auditor-independence contract).

### 6.2 CHAIN_SKIP Unchanged

CHAIN_SKIP carries forward unchanged from Phase 64:

```
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);
```

Phase 65 adds NO new entries. The pre-existing failure root causes (CRLF/LF mismatch on Windows worktree + archived-path failures) are documented in `check-phase-64.mjs:55-72`. Resolution is deferred to Phase 66 terminal re-audit (fresh Linux worktree).

---

## 7. 4-Edge C16 Exemption Sunset Reference

Current state of `scripts/validation/v1.6-audit-allowlist.json:80-85` (BEFORE Wave 4):

- Entry 1: `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` (`sunset_phase: "65"`)
- Entry 2: `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` (`sunset_phase: "64-65"`)
- Entry 3: `docs/common-issues.md#apple-business-governance-failure-scenarios` (`sunset_phase: "65"`)
- Entry 4: `docs/quick-ref-l1.md#apple-business-quick-reference` (`sunset_phase: "65"`)

Wave 4 atomic commit removes ALL 4. V-65-13 (`c16_missing_endpoint_exemptions.length === 0`) verifies the clean state.
