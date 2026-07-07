# Phase 114: EEE Standard, Templates, Doc ID Registry + Metadata Rules — Pattern Map

**Mapped:** 2026-07-04
**Files analyzed:** 10 (1 standard-doc new, 7 template modify/new, 1 registry new, 1 test-probe)
**Analogs found:** 10 / 10

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/_standards/EEE-SOP-standard.md` | standard-doc (NEW) | N/A — markdown authoring | `docs/error-codes/00-index.md` | role-match (structured spec doc with frontmatter + tables) |
| `docs/_templates/admin-template.md` | template (MODIFY) | N/A — markdown authoring | `docs/_templates/admin-template-android.md` | exact (template with concrete mappable `platform:` value) |
| `docs/_templates/l1-template.md` | template (MODIFY) | N/A — markdown authoring | `docs/_templates/admin-template-android.md` | role-match (same D-07 fix pattern) |
| `docs/_templates/l2-template.md` | template (MODIFY) | N/A — markdown authoring | `docs/_templates/admin-template-android.md` | role-match (same D-07 fix pattern) |
| `docs/_templates/admin-template-android.md` | template (MODIFY — add 4 keys + block only) | N/A — markdown authoring | itself (no platform fix needed) | exact |
| `docs/_templates/admin-template-ios.md` | template (MODIFY — add 4 keys + block only) | N/A — markdown authoring | `docs/_templates/admin-template-android.md` | exact (same delta shape) |
| `docs/_templates/admin-template-macos.md` | template (MODIFY — add 4 keys + block only) | N/A — markdown authoring | `docs/_templates/admin-template-android.md` | exact (same delta shape) |
| `docs/_templates/reference-template.md` | template (NEW) | N/A — markdown authoring | `docs/_templates/admin-template-android.md` | role-match (most complete template shape with HTML comment guidance) |
| `docs/_registry/RE-index.md` | registry (NEW) | N/A — markdown authoring | `docs/error-codes/00-index.md` | role-match (table-based lookup index with ID → details columns) |
| SC1 C10-leniency probe file | test-probe | N/A — harness validation | `scripts/validation/v1.14-milestone-audit.mjs` lines 517–554 + `docs/admin-setup-linux/00-overview.md` | exact (C10 check scope + existing Linux frontmatter shape) |

---

## Pattern Assignments

### `docs/_standards/EEE-SOP-standard.md` (standard-doc, NEW)

**Analog:** `docs/error-codes/00-index.md`

**Frontmatter pattern** (analog lines 1–7):
```yaml
---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
---
```

**EEE standard's own frontmatter (authored conformantly per RESEARCH.md):**
```yaml
---
doc_id: STD-001
status: Approved
owner: [project owner]
doc_type: Reference
platform: all
last_verified: 2026-07-04
review_by: 2026-10-02
---
```

**EEE body-text block immediately after frontmatter close:**
```markdown
**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** STD-001 · **Status:** Approved
```

**Section structure pattern** — the standard has ~10 H2 sections (tight specifications, not tutorial prose). Copy the "sparse frontmatter + H1 + H2-section cadence" from `docs/error-codes/00-index.md` (lines 1–13):
```markdown
---
[frontmatter]
---

[body-text block line]

# [Title]

## [Section]

[tight specification prose]

## [Next Section]
...
```

**Table pattern for D1 map** (analog: `docs/error-codes/00-index.md` Quick Lookup table, lines 26–57):
```markdown
| Raw `platform:` value | Clean visible label |
|-----------------------|--------------------|
| `Windows`             | Windows             |
| `windows`             | Windows             |
| `macOS`               | macOS               |
...
```

**Version History pattern** (analog: `docs/error-codes/00-index.md` lines 71–76):
```markdown
## Version History

| Date | Change |
|------|--------|
| 2026-07-04 | Initial version — EEE SOP standard for Phase-1 corpus retrofit |
```

**Required sections (from RESEARCH.md §EEE-SOP-standard.md Structure):** Purpose and Scope, Required Frontmatter Schema, Visible Header Block Format (D-05), D1 Platform Normalization Map, Doc Type Taxonomy, D2 Last Reviewed Semantics (META-04), Status Values, Grounding Notes, Phase-1 Scope, C17 Enforcement Reference.

---

### `docs/_templates/admin-template.md` (template, MODIFY — D-07 + 4 keys + EEE block)

**Analog:** `docs/_templates/admin-template-android.md`

**Current frontmatter** (admin-template.md lines 14–19 — the base to patch):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
platform: Windows | macOS | all
---
```

**Target frontmatter after delta (D-07 fix + 4 new keys in order before `platform:`):**
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: all   <!-- choose: Windows|macOS|iOS|Android|Linux|all -->
---
```

**Add EEE block immediately after frontmatter close, before the `> **Version gate:**` blockquote:**
```markdown
**Platform:** [normalized-from-D1] · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**Add `## Summary` as first H2 immediately after the EEE block (before `> **Version gate:**` or H1 — see note):**
```markdown
## Summary

[2–3 sentences: scope, audience, safety/escalation signal. Minimum 30 words.]
```

**Note on `> **Version gate:**` blockquote position:** Current templates (admin, l1, l2) place this between frontmatter and H1. After the EEE block and `## Summary` are added, the structural order becomes: frontmatter → EEE block line → H1 → `## Summary` → Version gate blockquote. The blockquote should move to after `## Summary` (part of body context, not a pre-H1 element).

**HTML comment guidance pattern** (copy from `admin-template-android.md` lines 1–27 — the `<!-- TEMPLATE ... -->` header block pattern):
```markdown
<!-- ADMIN SETUP GUIDE TEMPLATE
     Usage: ...
     Rules:
     - ...
     Reviewer: ...
-->
```

---

### `docs/_templates/l1-template.md` (template, MODIFY — D-07 + 4 keys + EEE block)

**Analog:** `docs/_templates/admin-template-android.md` (for the D-07 fix pattern)

**Current frontmatter** (l1-template.md lines 13–19):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L1
platform: Windows | macOS | iOS | Android | all
---
```

**Target frontmatter after delta:**
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L1
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Runbook
platform: all   <!-- choose: Windows|macOS|iOS|Android|Linux|all -->
---
```

**EEE block line (after frontmatter close):**
```markdown
**Platform:** [normalized-from-D1] · **Doc Type:** Runbook · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**`## Summary` section content guidance (from RESEARCH.md):**
```markdown
## Summary

[2–3 sentences: scope, audience, safety/escalation signal. Minimum 30 words.
For runbooks: open with the one-line scope/safety banner (read-only vs. escalation guardrail).]
```

---

### `docs/_templates/l2-template.md` (template, MODIFY — D-07 + 4 keys + EEE block)

**Analog:** Same as l1-template.md delta above.

**Current frontmatter** (l2-template.md lines 14–19):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both | ADE | all
audience: L2
platform: Windows | macOS | iOS | Android | all
---
```

**Target frontmatter after delta:**
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both | ADE | all
audience: L2
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Runbook
platform: all   <!-- choose: Windows|macOS|iOS|Android|Linux|all -->
---
```

---

### `docs/_templates/admin-template-android.md` (template, MODIFY — 4 keys + EEE block only, no D-07)

**Analog:** itself (current state is the delta base; no platform fix needed — `platform: Android` is already mappable)

**Current frontmatter** (lines 28–33):
```yaml
---
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
audience: admin
platform: Android
---
```

**Target frontmatter after delta (insert 4 keys before `platform:`):**
```yaml
---
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
audience: admin
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: Android
---
```

**EEE block line (add after frontmatter close, before H1):**
```markdown
**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**Key observation:** `admin-template-android.md` already uses the HTML comment guidance pattern (lines 1–27 header block + inline `<!-- ... -->` callout patterns). The new `reference-template.md` should copy this HTML comment style.

---

### `docs/_templates/admin-template-ios.md` (template, MODIFY — 4 keys + EEE block only, no D-07)

**Analog:** `docs/_templates/admin-template-android.md` (same delta shape)

**Current frontmatter** (admin-template-ios.md lines 18–23):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: iOS
---
```

**Target frontmatter after delta:**
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: iOS
---
```

**EEE block line:**
```markdown
**Platform:** iOS · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```

---

### `docs/_templates/admin-template-macos.md` (template, MODIFY — 4 keys + EEE block only, no D-07)

**Analog:** `docs/_templates/admin-template-android.md` (same delta shape)

**Current frontmatter** (admin-template-macos.md lines 18–23):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: macOS
---
```

**Target frontmatter after delta:**
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: macOS
---
```

**EEE block line:**
```markdown
**Platform:** macOS · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft
```

---

### `docs/_templates/reference-template.md` (template, NEW — D-06)

**Analog:** `docs/_templates/admin-template-android.md` (most complete template: HTML comment header block, TEMPLATE-SENTINEL pattern, inline `<!-- -->` callout guidance, `platform: Android` concrete value pattern)

**HTML comment header block pattern** (copy structure from admin-template-android.md lines 1–27):
```markdown
<!-- REFERENCE DOCUMENT TEMPLATE
     Usage: Copy this file as your starting point for any reference doc (capability matrix,
     comparison, error-code guide, endpoint list, etc.)
     Rules:
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - doc_type: Reference (this template is reference-class only)
     - Tables: cap at ~25 rows or add a prose summary paragraph within 5 lines of any
       table that exceeds 25 rows (Phase 118 C17 table-remediation rule)
     - No Mermaid fences (C17 assertion #1)
     Reviewer: [Platform Lead for the reference domain]
-->
```

**Frontmatter (new — no existing keys to preserve):**
```yaml
---
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Reference
platform: [FILL-IN]   <!-- choose from D1 map: Windows|macOS|iOS|Android|Linux|all -->
---
```

**EEE block line:**
```markdown
**Platform:** [normalized] · **Doc Type:** Reference · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**Table convention pattern** (analog: `docs/error-codes/00-index.md` lines 26–57 — short table with prose summary above/below it; `docs/reference/00-index.md` as format reference):
```markdown
| [Column A] | [Column B] | [Column C] |
|------------|------------|------------|
| [value]    | [value]    | [value]    |

> **Table summary:** [1-2 sentence prose summary — required if table exceeds 25 rows.]
```

---

### `docs/_registry/RE-index.md` (registry, NEW — D-08)

**Analog:** `docs/error-codes/00-index.md`

**Table structure pattern** (error-codes/00-index.md lines 26–57 — this is the closest existing multi-column ID-to-detail lookup table in the repo):
```markdown
| Code | Name | Mode | Category |
|------|------|------|----------|
| 0x80004005 | HybridJoinTimeout (ESP) | UD | [ESP and Enrollment Errors](link) |
```

**RE-index.md target format** (RESEARCH.md §Doc ID Registry):
```markdown
# Doc ID Registry — Phase-1

> This registry lives OUTSIDE the indexed SharePoint library. See scripts/pipeline/README.md §SC3.
> If this file is indexed, doc-specific queries ("What does RE-047 cover?") return the registry
> row instead of the document content.

| Doc ID | Path | Title | Doc Type | Status |
|--------|------|-------|----------|--------|
| RE-001 | docs/l1-runbooks/01-device-not-registered.md | [H1 title] | Runbook | Pending |
...
| RE-178 | docs/windows-vs-macos.md | [H1 title] | Reference | Pending |
```

**Frontmatter:** The registry is NOT in the indexed library and does NOT get a RE-NNN Doc ID. It uses NO frontmatter (it is a pure operator-reference file, not a corpus doc). Copy the "no frontmatter" pattern from the analog: `docs/error-codes/00-index.md` has frontmatter, but the registry must not be indexed — use either no frontmatter or clearly mark it out-of-scope. Safest: include a minimal frontmatter with `doc_id: REG-001` (not RE-NNN) or none at all; planner decides.

**Ordering rule** (RESEARCH.md §RE-NNN Assignment Ordering):
1. RE-001 to RE-042 — `docs/l1-runbooks/` (sorted by filename)
2. RE-043 to RE-075 — `docs/l2-runbooks/`
3. RE-076 to RE-086 — `docs/admin-setup-apv1/`
4. RE-087 to RE-091 — `docs/admin-setup-apv2/`
5. RE-092 to RE-105 — `docs/admin-setup-android/`
6. RE-106 to RE-115 — `docs/admin-setup-ios/`
7. RE-116 to RE-127 — `docs/admin-setup-macos/`
8. RE-128 to RE-133 — `docs/admin-setup-linux/`
9. RE-134 to RE-141 — `docs/admin-setup-8021x/`
10. RE-142 to RE-167 — `docs/reference/`
11. RE-168 to RE-174 — `docs/error-codes/`
12. RE-175 to RE-176 — `docs/end-user-guides/`
13. RE-177 — `docs/apv1-vs-apv2.md`
14. RE-178 — `docs/windows-vs-macos.md`

---

### SC1 C10-Leniency Probe (test-probe)

**Analog (C10 check):** `scripts/validation/v1.14-milestone-audit.mjs` lines 517–554

**C10 check — exact code** (lines 524–554 — the only assertions C10 makes):
```javascript
run() {
  const violations = [];
  for (const relPath of linuxDocPaths()) {
    const content = readFile(relPath);
    if (!content) { violations.push({ file: relPath, reason: 'unreadable' }); continue; }
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
    if (!fmMatch) { violations.push({ file: relPath, reason: 'no frontmatter' }); continue; }
    const fm = fmMatch[1];
    // Platform check — only line-anchored match, no key whitelist
    if (!/^platform:\s*Linux\s*$/m.test(fm)) {
      violations.push({ file: relPath, reason: 'platform: Linux missing' }); continue;
    }
    const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
    const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
    if (!lvMatch) { violations.push({ file: relPath, reason: 'last_verified missing or malformed' }); continue; }
    if (lvMatch[1] === '1970-01-01') continue;  // TEMPLATE-SENTINEL -- skip
    if (!rbMatch) { violations.push({ file: relPath, reason: 'review_by missing or malformed' }); continue; }
    const lv = new Date(lvMatch[1]);
    const rb = new Date(rbMatch[1]);
    const diffDays = Math.round((rb - lv) / 86400000);
    if (diffDays > 90) {
      violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>90)' });
    }
  }
  if (violations.length === 0) return { pass: true };
  ...
}
```

**Key observation:** C10 checks ONLY three things (platform: Linux present, last_verified ISO date, review_by within 90 days). No key-whitelist assertion. Adding `doc_id`, `status`, `owner`, `doc_type` is invisible to this check.

**linuxDocPaths() scope** (lines 199–239 — determines where the probe file must go):
```javascript
function linuxDocPaths() {
  // Directory walks — docs/admin-setup-linux is always included
  for (const d of ['docs/linux-lifecycle', 'docs/admin-setup-linux']) {
    for (const abs of walkMd(d)) { paths.add(relNormalize(abs)); }
  }
  // L1 runbooks: /\/(3[0-3])-linux-/ pattern
  // L2 runbooks: /\/(2[4-5])-linux-/ pattern
  // Root singletons: docs/_glossary-linux.md, docs/reference/linux-capability-matrix.md, etc.
}
```

**Probe file analog** — `docs/admin-setup-linux/00-overview.md` (lines 1–7) shows the current Linux frontmatter shape that the probe augments:
```yaml
---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: enrollment
audience: admin
platform: Linux
---
```

**Probe file target shape** (copy existing Linux doc frontmatter + add 4 new keys):
```yaml
---
doc_id: RE-T10
status: Draft
owner: test-owner
doc_type: Reference
platform: Linux
last_verified: 2026-07-03
review_by: 2026-09-30
---
# C10 Leniency Probe
Test fixture for META-01 precondition. Delete after SC1 confirmed.
```

**Probe file placement:** `docs/admin-setup-linux/99-c10-probe.md` — this path is in `linuxDocPaths()` scope via the `docs/admin-setup-linux` directory walk, guaranteeing C10 scans it.

**Harness invocation command** (run from repo root — no npm script alias exists in package.json):
```bash
node scripts/validation/v1.14-milestone-audit.mjs
```

**Pass criterion:** The C10 result line in harness output shows `PASS` (id: 10). If the probe causes any C10 violation, check that `last_verified` is a valid ISO date and `review_by - last_verified` is ≤ 90 days.

**Cleanup:** Delete `docs/admin-setup-linux/99-c10-probe.md` immediately after the harness run confirms C10 PASS.

---

## Shared Patterns

### EEE Header Block Format (all 7 templates + EEE-SOP-standard.md itself)

**Source:** PIPE-02 empirical proof (RESEARCH.md Pattern 2) + D-05 locked decision
**Apply to:** Every template (6 existing modified + 1 new Reference template) + `EEE-SOP-standard.md`

```markdown
**Platform:** [normalized-from-D1] · **Doc Type:** [Runbook|Guide|Reference] · **Doc ID:** RE-[NNN] · **Status:** Draft
```

Rules:
- Middle-dot `·` (U+00B7) separator — the validated separator from PIPE-02
- Field order locked: Platform first, Doc Type second, Doc ID third, Status fourth (D-05)
- `owner` is NOT in the block (D-01)
- `Last Reviewed` is NOT in the block (D-05)
- `## Summary` must immediately follow — no intervening H2/H3 or blockquote

### 4 New Required Frontmatter Keys (all 7 templates)

**Source:** D-01 through D-05 decisions; C17 assertion #8
**Apply to:** All 7 templates (before `platform:` line)
**Key order (insert before existing `platform:` line):**

```yaml
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: [Runbook|Guide|Reference]
```

### D-07 Pipe-List Fix (3 templates only)

**Source:** D-07 locked decision
**Apply to:** `admin-template.md`, `l1-template.md`, `l2-template.md` ONLY
**Change:** `platform: Windows | macOS | [iOS | Android |] all` → `platform: all` + HTML comment

```yaml
platform: all   <!-- choose: Windows|macOS|iOS|Android|Linux|all -->
```

**Do NOT apply to:** `admin-template-android.md` (`platform: Android`), `admin-template-ios.md` (`platform: iOS`), `admin-template-macos.md` (`platform: macOS`) — already concrete mappable values.

### HTML Comment Guidance Pattern (all templates)

**Source:** `docs/_templates/admin-template-android.md` lines 1–27 (most complete example)
**Apply to:** All templates (extend existing header comment blocks; add inline `<!-- ... -->` guidance after the `platform:` line for author choice)

Pattern: `<!-- [rule or guidance for author] -->` directly in frontmatter or immediately after affected line.

### TEMPLATE-SENTINEL Pattern (Reference template + Android template)

**Source:** `docs/_templates/admin-template-android.md` line 29
**Apply to:** New `reference-template.md`

```yaml
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
```

Rationale: Harness skips freshness checks on files with `1970-01-01` (line 539: `if (lvMatch[1] === '1970-01-01') continue`). Templates must use this sentinel so they don't fail freshness validators.

---

## No Analog Found

All files have analogs in the codebase. No gaps.

---

## Metadata

**Analog search scope:** `docs/_templates/`, `docs/error-codes/`, `docs/reference/`, `docs/admin-setup-linux/`, `scripts/validation/`
**Files scanned:** 12 (6 templates + 2 index docs + 1 Linux admin doc + 1 validator + pipeline README + package.json)
**Pattern extraction date:** 2026-07-04
