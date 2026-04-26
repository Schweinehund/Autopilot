# Phase 42: Integration & Milestone Audit — Research

**Researched:** 2026-04-24
**Domain:** Documentation authoring, Node ESM harness scripting, allow-list validation, markdown surgery
**Confidence:** HIGH (all critical claims verified against live files in this session)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Cross-cutting contracts (apply to all plans):**
- D-01: Gap-handling policy = read-only-audit + on-demand Phase 43 (P-A). Audit exits `passed` / `gaps_found` / `tech_debt`; each has different handoff.
- D-02: Auditor independence required. Audit-run plan MUST spawn subagent distinct from AEAUDIT-01/02/03 content authors.
- D-03: Checkbox flip protocol. AEAUDIT-01/02/03 flip `[ ]` → `[x]` when VERIFICATION.md scores SATISFIED. AEAUDIT-04 flips `[x]` ONLY when audit exits `status: passed` or `status: tech_debt` with explicit user acceptance. Dedicated atomic plan mirrors v1.3 commit 48ad757.
- D-04: Finding classification: every finding tagged `kind: validation-gap | content-gap | integration-gap`.
- D-05: Deferral criteria — 4-part objective test (not affecting any `[x]` requirement SC; severity ≤ WARNING; fix > 1 plan or out-of-scope; explicit user acceptance).
- D-06: ROADMAP pre-flight fix. Phase 42 Plans table (lines 246-253) has copy-paste bug listing `41-0X-PLAN.md` entries. MUST be rewritten before execution. Line 301 progress count flips from `0/TBD` to explicit count.
- D-07: SC#1 (ROADMAP line 240 — 3 pairs) governs over AEAUDIT-01 (REQUIREMENTS.md line 92 — 2 pair examples). SC#1 is binding.

**Android Capability Matrix (AEAUDIT-01 / SC#1):**
- D-08: Shape = S-C Hybrid. Primary content is Android-mode-first matrix; separate H2 "Cross-Platform Equivalences" carries 3 paired comparison rows per SC#1.
- D-09: Domains = D-A iOS-5 verbatim (Enrollment / Configuration / App Deployment / Compliance / Software Updates). Android-specific surfaces slot INTO these 5 domains.
- D-10: Exactly 5 mode rows: COBO (Fully Managed) / BYOD (Work Profile) / Dedicated (COSU) / ZTE (Zero-Touch) / AOSP (stub reference). AOSP row is stub-reference only.
- D-11: Cross-Platform Equivalences H2 — exactly 3 paired rows: (1) iOS Supervision ↔ Android Fully Managed (COBO); (2) Apple ADE ↔ Google Zero-Touch Enrollment (ZTE); (3) iOS User Enrollment (Account-Driven) ↔ Android Work Profile (BYOD).
- D-12: "supervision" / "supervised" appears ONLY as iOS-attributed reference in Cross-Platform Equivalences section. HTML comment at section head required.
- D-13: Anti-Pattern 1 guard — cells link to canonical source files, never duplicate grids.
- D-14: Deferral footers mandatory at end of doc (KME v1.4.1, Full AOSP v1.4.1, 4-platform v1.5).
- D-15: Section ordering locked: Frontmatter → H1 → Lead paragraph → 5 domain H2s → Cross-Platform Equivalences H2 → Key Gaps Summary H2 → See Also H2 → Deferral footers.
- D-16: Frontmatter: `platform: Android`, `audience: admin`, `applies_to: both`, `last_verified: YYYY-MM-DD`, `review_by: last_verified + 60 days` (NOT 90-day iOS/macOS cycle).
- D-17: Anchor lock — `#enrollment`, `#configuration`, `#app-deployment`, `#compliance`, `#software-updates`, `#cross-platform-equivalences`, `#key-gaps-summary`, `#see-also`. Renames forbidden after Phase 42 commit.
- D-18: Visual grammar — `🔒 COBO-only` / `🔒 FM/DO-only` for mode-restricted capabilities.

**docs/index.md Android Stub (AEAUDIT-02 / SC#2) — I-A True-Minimal:**
- D-19: Exactly three surgical additions (one Choose-Your-Platform bullet, one new H2 section, one Cross-Platform References table row). Zero edits to existing sections.
- D-20: Cross-Platform References table is a shared resource table; adding a row is strictly additive (not a platform-section edit). In-scope for AEAUDIT-02.
- D-21: Version History row: `| 2026-04-24 | Phase 42: added Android Provisioning stub H2, Choose-Your-Platform bullet, Android Glossary cross-reference entry (AEAUDIT-02) | -- |`
- D-22: Lines 1-7 (frontmatter, `last_verified` may bump), 9-10 (banner), 14 (H1 narrative), 25-92 (Windows), 95-126 (macOS), 130-162 (iOS/iPadOS), existing Cross-Platform References rows — ALL UNTOUCHED.

**docs/_glossary-macos.md See-also (AEAUDIT-03 / SC#3) — G-A Banner-Extend:**
- D-23: Exactly one sentence appended to existing line-10 continuation blockquote. Change line 10 from `> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).` to `> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).`
- D-24: Lines 1-7 (frontmatter), line 9 (first banner line), line 11 onward (all term content) — UNTOUCHED. Version History row may be appended.

**Audit Mechanism + Mechanical Checks (AEAUDIT-04 / SC#4 / SC#5) — E-B Scripted + R-B Contextual Allow-list:**
- D-25: Node harness at `scripts/validation/v1.4-milestone-audit.mjs` (ESM, cross-platform). Stdout format locked with 5 checks and summary line.
- D-26: Sidecar allow-list at `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`.
- D-27: C1 — SafetyNet semantic zero. Pass if 0 matches OR every match has `/successor|turned off|deprecated|Play Integrity/i` within ±200 chars OR `{file, line}` in `allowlist.safetynet_exemptions[]`. 4 pinned exemptions.
- D-28: C2 — supervision semantic zero. Pass if every match `{file, line}` in `allowlist.supervision_exemptions[]`. 10 (+ re-scan of 21-android-compliance-investigation.md) pinned exemptions.
- D-29: C3 — AOSP word-count INFORMATIONAL ONLY. Always PASS in Phase 42; emits tech-debt note if body outside 600-900. Phase 42 does NOT re-gate Phase 39 self-certification.
- D-30: C4 — deferred-file Android-link guard. Targets: `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`. Regex scoped to markdown link targets only. Pass if 0 matches.
- D-31: C5 — `last_verified` freshness. 60-day freshness check (`review_by - last_verified ≤ 60 days`). Explicitly enumerated scope includes `docs/reference/android-capability-matrix.md` (activates after AEAUDIT-01 lands).
- D-32: Audit doc YAML frontmatter extended with `mechanical_checks:` block; body: Executive Summary → Requirements Coverage table → Phase-Level Status → Integration Findings → Mechanical Checks Summary → Tech Debt → Recommended Next Steps → Deferred Items.

### Claude's Discretion
- Exact prose tone and length of the capability matrix lead paragraph
- Exact wording of each of the 3 cross-platform equivalence paired rows (within D-12 writing rule)
- Exact Key Gaps Summary item count and phrasing (iOS has 8, macOS has 7 — author chooses parity target)
- Exact visual layout of paired cross-platform rows (table vs stacked blockquotes)
- Node harness internal implementation details (single file vs helper module import)
- Allow-list JSON schema internal fields (top-level keys `safetynet_exemptions` and `supervision_exemptions` are contract)
- Plan count and wave structure (recommended ≥7 plans)

### Deferred Ideas (OUT OF SCOPE)
- Full cross-platform nav integration (`common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, full `docs/index.md` Android H2 with L1/L2/Admin subsections) — AENAVUNIFY-04 post-v1.4
- 4-platform unified capability comparison document — AECOMPARE-01 v1.5
- Knox Mobile Enrollment row in capability matrix — v1.4.1
- Full AOSP per-OEM capability mapping — v1.4.1
- `docs/_glossary.md` (Windows) reciprocal see-also to `_glossary-android.md` — follow-up (AEAUDIT-03 names only `_glossary-macos.md`)
- AOSP stub body word-count drift fix — record as tech debt; recommend `/gsd-validate-phase 39` in v1.4.1
- COPE full admin path — v1.4.1

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEAUDIT-01 | Intune admin can read an Android capability matrix (`docs/reference/android-capability-matrix.md`) comparing modes by feature with cross-platform comparison column (supervision vs Android fully managed, ADE vs Zero-Touch, etc.) | Structural conventions from ios-capability-matrix.md and macos-capability-matrix.md verified; 5-domain spine, 🔒 glyph, Key Gaps tail pattern documented in full detail below |
| AEAUDIT-02 | Navigation hub (`docs/index.md`) has an Android stub section with "Choose Your Platform" entry and H2 pointing to android-lifecycle — existing Windows/macOS/iOS sections untouched | Exact insertion line numbers verified from live file; docs/index.md structure mapped line-by-line |
| AEAUDIT-03 | Cross-platform glossary (`docs/_glossary-macos.md`) has a 1-line see-also cross-reference to `_glossary-android.md` — no other modifications | Exact current line 10 text verified; exact replacement wording from D-23 confirmed against live file |
| AEAUDIT-04 | Milestone audit passes all Android-specific checks: no SafetyNet as compliance mechanism, no "supervision" for Android, AOSP stub word-count within scope guard, no Android links in deferred shared files, all Android docs have `last_verified` frontmatter | All 5 checks researched; allow-list pins VERIFIED against live line numbers; harness design from check-phase-30.mjs and check-phase-31.mjs documented |

</phase_requirements>

---

## Summary

Phase 42 is a pure documentation and tooling phase: write one new markdown doc (capability matrix), perform two surgical markdown edits (index.md + glossary-macos.md), author one Node ESM harness script, commit one JSON sidecar, run the audit, and produce the milestone audit document. No external services, no APIs, no build pipelines.

All four gray areas were resolved via adversarial review in 42-CONTEXT.md with locked decisions D-01 through D-32. This research answers the planner's operational questions: exact structural conventions to replicate, exact line numbers to target, exact regex patterns to implement, verified allow-list pins, correct plan sequencing and wave structure, and the ROADMAP pre-flight bug fix.

The most critical findings are: (1) the `docs/index.md` insertion points are at line 21 (Choose-Your-Platform bullet), line 164 (new H2 section, after line 162 closing `---`), and line 184 (Cross-Platform References table row, between macOS Glossary and Windows vs macOS rows); (2) all 10 supervision allow-list pins are VERIFIED against live files; `21-android-compliance-investigation.md` has ZERO supervision matches and requires no sidecar entry; (3) the 4 SafetyNet pins are VERIFIED; (4) AOSP body word count is confirmed at 1089 words (well outside the 600-900 Phase 39 envelope, tech debt only); (5) deferred files (common-issues.md, quick-ref-l1.md, quick-ref-l2.md) have zero Android link matches today.

**Primary recommendation:** Sequence plans in two waves — Wave 1 authors the 3 content artifacts (capability matrix, index.md stub, glossary-macos.md) plus creates the allow-list sidecar and harness script in a dedicated scripting plan; Wave 2 runs the audit (independent subagent), authors the audit document, and flips REQUIREMENTS.md in an atomic commit. A pre-flight plan fixes the ROADMAP copy-paste bug.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Capability matrix authoring | Document layer | — | Pure markdown; no code |
| docs/index.md surgical edit | Document layer | — | Pure markdown; 3 additive insertions |
| _glossary-macos.md surgical edit | Document layer | — | Pure markdown; 1 sentence append |
| Node harness scripting | Scripting layer (scripts/validation/) | — | Node ESM; reads files, no HTTP |
| Allow-list sidecar JSON | Config layer | — | JSON committed alongside harness |
| Audit run + milestone audit doc | Verification layer | — | Subagent reads files, writes YAML+markdown |
| REQUIREMENTS.md flip | Config layer | — | Atomic single-commit checkbox update |
| ROADMAP.md pre-flight fix | Config layer | — | Copy-paste bug fix; no content authoring |

---

## Standard Stack

### Core (this phase)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Node.js (ESM) | Runtime on machine | Validation harness | Phase 30/31 precedent; cross-platform; already used |
| Markdown | N/A | All content artifacts | Project format (all docs are .md) |

No npm packages required — harness uses only Node built-ins: `node:fs`, `node:path`, `node:process`.

### Structural Precedents

| Artifact | Template Source | Key Properties |
|----------|----------------|----------------|
| Android capability matrix | `docs/reference/ios-capability-matrix.md` | 5-domain spine, trilateral column pattern, 🔒 glyph, 8-item Key Gaps Summary |
| Node harness | `scripts/validation/check-phase-30.mjs` | ESM imports, `--verbose` flag, `padLabel()` width-56, summary line, exit code |
| Allow-list sidecar | `scripts/validation/check-phase-31.mjs` `parseInventory()` pattern | JSON object with typed arrays |
| Milestone audit doc | `.planning/milestones/v1.3-MILESTONE-AUDIT.md` | YAML frontmatter with scores/tech_debt/nyquist; body sections |

**Version verification:** [VERIFIED: local file inspection] Node built-ins confirmed available; no npm installs needed.

---

## Architecture Patterns

### System Architecture Diagram

```
Phase 42 Data Flow:

[Phases 34-41 Android docs]
        |
        v
[Wave 1 Plans] ──────────────────────────────────────┐
  42-01: ROADMAP pre-flight fix                        │
  42-02: android-capability-matrix.md (NEW)            │  content artifacts
  42-03: docs/index.md stub edits                      │
  42-04: docs/_glossary-macos.md see-also              │
  42-05: v1.4-milestone-audit.mjs harness + allowlist  │
        |                                               │
        v                                               │
[Wave 2 Plans] ◄────────────────────────────────────── ┘
  42-06: Audit run (independent subagent)
        ├── reads: all Android docs (D-31 scope glob)
        ├── reads: deferred files (C4 guard)
        ├── reads: v1.4-audit-allowlist.json
        ├── runs: node scripts/validation/v1.4-milestone-audit.mjs
        └── writes: .planning/milestones/v1.4-MILESTONE-AUDIT.md
  42-07: REQUIREMENTS.md atomic flip (4 checkboxes)
        └── depends on: 42-06 audit exits status: passed/tech_debt
```

### Recommended Project Structure (new files only)

```
docs/reference/
└── android-capability-matrix.md    (NEW — AEAUDIT-01)

scripts/validation/
└── v1.4-milestone-audit.mjs        (NEW — AEAUDIT-04)

.planning/phases/42-integration-milestone-audit/
└── v1.4-audit-allowlist.json       (NEW — D-26)

.planning/milestones/
└── v1.4-MILESTONE-AUDIT.md         (NEW — AEAUDIT-04)
```

### Pattern 1: iOS Capability Matrix Structural Conventions

**What:** The ios-capability-matrix.md is the PRIMARY template for the Android matrix. Verified structure:

```
[VERIFIED: live file inspection of docs/reference/ios-capability-matrix.md]

Frontmatter:
  last_verified: YYYY-MM-DD
  review_by: YYYY-MM-DD           ← 90-day iOS cycle; Android uses 60-day (D-16)
  applies_to: both
  audience: admin
  platform: all                   ← Android matrix uses platform: Android

H1: # Intune: iOS/iPadOS Capability Matrix — Windows, macOS, iOS
    ↕ Android: # Intune: Android Capability Matrix — Modes by Feature

Lead paragraph: ~2-3 sentences, audience-mixed framing, points to sibling matrices,
                explains what axis the matrix illuminates
                (iOS example: Windows readers / Apple-platform readers framing)

H2: ## Enrollment           (11 feature rows for iOS)
H2: ## Configuration        (9 rows)
H2: ## App Deployment       (8 rows)
H2: ## Compliance           (8 rows)
H2: ## Software Updates     (5 rows)
H2: ## Key Gaps Summary     (8 numbered bullets for iOS; 7 for macOS)
H2: ## See Also             (5 links for iOS)

--- (section separator)
## Version History table
```

**iOS column header pattern:** `| Feature | Windows | macOS | iOS |`
**Android column header pattern:** `| Feature | COBO (Fully Managed) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |`

**🔒 glyph usage in iOS matrix (VERIFIED):**
- `🔒 supervised ADE only` — feature requires supervision
- `🔒 supervised ADE only for...` — partial restriction (some sub-features only)
- Applied inline within cell text, not as standalone column
- Android analog per D-18: `🔒 COBO-only` or `🔒 FM/DO-only`

**iOS Key Gaps Summary tail (VERIFIED 8 items):**
- Numbered bullet list `1.`, `2.`, ... `8.`
- Each item: **Bold title** — explanation sentence
- macOS Key Gaps Summary is 7 items, same format [VERIFIED]

**iOS See Also section (VERIFIED 5 links):**
- Sister matrices first (macos-capability-matrix.md, windows-vs-macos.md)
- Then platform-specific overview and admin entry point
- Android See Also should mirror: ios-capability-matrix.md, macos-capability-matrix.md (siblings), then android-lifecycle/00-enrollment-overview.md, android-lifecycle/02-provisioning-methods.md, android-lifecycle/03-android-version-matrix.md

**macOS matrix difference (VERIFIED):**
- Bilateral only (Windows | macOS columns)
- No 🔒 glyph (no supervision concept)
- 7-item Key Gaps Summary
- No Version History table (uses bare `| Date | Change | Author |` at bottom)
- iOS matrix HAS explicit `## Version History` H2 above the table
- Android matrix should follow iOS pattern (explicit Version History H2)

### Pattern 2: Android-Specific Domain Content Mapping (D-09)

**What:** iOS 5-domain spine maps to Android-specific surfaces per D-09.

| Domain | Android-Native Surfaces to Add |
|--------|-------------------------------|
| Enrollment | Tri-portal requirement (Intune + MGP + ZT portal); 5 mode rows; AMAPI migration note (BYOD) |
| Configuration | DDM not applicable; Settings Catalog applies; mode-restricted restrictions (🔒 COBO-only) |
| App Deployment | MGP as mandatory app channel (vs VPP for iOS); MHS (Dedicated row); AMAPI migration footnote; LOB via APK |
| Compliance | Play Integrity (replaces iOS jailbreak analog); 3 verdict levels (Basic / Basic+Device / Strong) |
| Software Updates | Policy-based update management; Android 10+ update enforcement |

**AOSP row cells:** All cells except Enrollment read: `AOSP stub — see [06-aosp-stub.md](../admin-setup-android/06-aosp-stub.md)`. Enrollment cell: QR-only provisioning on select OEMs.

### Pattern 3: Cross-Platform Equivalences Section Structure

**What:** The exact paired-row structure locked by D-11 and D-12.

```markdown
## Cross-Platform Equivalences

<!-- AEAUDIT-04: "supervision" in this section MUST appear only as an iOS-attributed
     reference. Android management states are "Fully Managed" / "Work Profile" /
     "Dedicated" / "ZTE" — never "supervised". Each paired row MUST attribute the
     platform in the column header (e.g., "iOS Supervision" not "Supervision"). -->

| iOS / Apple | Android |
|-------------|---------|
| **iOS Supervision (ADE-enrolled)** | **Android Fully Managed (COBO / DPC owner)** |
| [row 1 body] | [row 1 body] |
| **Apple Automated Device Enrollment (ADE) via ABM** | **Google Zero-Touch Enrollment via ZT portal** |
| [row 2 body] | [row 2 body] |
| **iOS Account-Driven User Enrollment (BYOD iOS 15+)** | **Android Work Profile (BYOD, Company Portal enrollment)** |
| [row 3 body] | [row 3 body] |
```

**Platform attribution rule (D-12):** Both sides of every paired row MUST have explicit platform name in the header cell (e.g., "iOS Supervision" not "Supervision"; "Android Fully Managed" not "Fully Managed"). The word "supervision" or "supervised" may appear only in the iOS column or in the HTML comment — never in the Android column.

**Phase 34 D-03 narrative template (VERIFIED from docs/android-lifecycle/00-enrollment-overview.md lines 51-53):**
> Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation.
>
> "Supervision" is not an Android management term — Android does not use "supervised" or "unsupervised" as device states.

This is the exact wording template for Row 1 body content.

### Pattern 4: Node Harness Structure (check-phase-30.mjs precedent)

**What:** The exact ESM structure to replicate in v1.4-milestone-audit.mjs.

```javascript
// [VERIFIED: check-phase-30.mjs lines 1-19]

#!/usr/bin/env node
// Phase NN static validation harness
// Source of truth: .planning/phases/NN.../NN-VALIDATION.md
// NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';  // Not needed for v1.4 (no external tools)
import process from 'node:process';

const argv = process.argv.slice(2);
const QUICK = argv.includes('--quick');   // Not needed for v1.4 (no external checks)
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalize (Phase 31 ca40eb9)
}
```

**padLabel function and output format (VERIFIED: check-phase-30.mjs lines 303-337):**
```javascript
// [VERIFIED: check-phase-30.mjs lines 303-337]
const LABEL_WIDTH = 56;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
// (iterate checks...)
process.stdout.write(padLabel(prefix) + 'PASS' + (VERBOSE && result.detail ? ' -- ' + result.detail : '') + '\n');
process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
```

**Per-check object shape (from check-phase-30.mjs and check-phase-31.mjs):**
```javascript
{
  id: 1,
  name: "C1: Zero SafetyNet as compliance mechanism",
  type: "semantic-zero",
  required: true,
  run() {
    // returns { pass: boolean, detail: string, skipped?: boolean }
  }
}
```

**D-25 stdout contract (LOCKED — exact format):**
```
[1/5] C1: Zero SafetyNet as compliance mechanism .......... PASS
[2/5] C2: Zero supervision as Android mgmt term ........... PASS
[3/5] C3: AOSP stub word count within Phase 39 envelope ... PASS (informational — Phase 39 self-certification)
[4/5] C4: Zero Android links in deferred shared files ..... PASS
[5/5] C5: last_verified frontmatter on all Android docs ... PASS

Summary: 5 passed, 0 failed, 0 skipped
```

Note: The label for C3 is 50 chars; padded to 56 with dots; the parenthetical "(informational — Phase 39 self-certification)" appears in the PASS line since C3 always passes (D-29). Implement by setting `result.detail` to the informational string on C3 PASS — `--verbose` is not required to show it.

**Allow-list sidecar (D-26 — parseInventory() pattern from check-phase-31.mjs):**
```javascript
// [VERIFIED: check-phase-31.mjs lines 31-39]
function parseInventory() {
  const raw = readFile('.planning/phases/31-.../placeholder-inventory.json');
  if (!raw) return { placeholders: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, placeholders: [] };
  }
}
```

Adapt for v1.4:
```javascript
function parseAllowlist() {
  const raw = readFile('.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try { return JSON.parse(raw); }
  catch (err) { return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] }; }
}
```

### Pattern 5: Supervision Regex + Allow-list Design (C2)

**Regex (D-28 locked):** `/\bsupervis(ion|ed|ory)\b/gi`

**Per-match check:** Look up `{file: relPath, line: lineNumber}` in `allowlist.supervision_exemptions[]`. Match by both file and line number together.

**Line-number extraction pattern:**
```javascript
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const lineNum = i + 1;  // 1-indexed
  const matches = lines[i].matchAll(/\bsupervis(ion|ed|ory)\b/gi);
  for (const match of matches) {
    const exempted = allowlist.supervision_exemptions.some(
      e => e.file === relPath && e.line === lineNum
    );
    if (!exempted) violations.push({ file: relPath, line: lineNum, text: match[0] });
  }
}
```

**Scope:** All Android doc paths per D-31 (enumerated in Environment Availability section).

### Pattern 6: SafetyNet Semantic-Zero Regex (C1)

**Regex:** `/SafetyNet/g` (case-sensitive — the token is a proper noun)

**Pass condition (D-27):**
```javascript
function safetyNetPassLine(content, matchIndex) {
  const windowStart = Math.max(0, matchIndex - 200);
  const windowEnd = Math.min(content.length, matchIndex + 200 + 'SafetyNet'.length);
  const window = content.slice(windowStart, windowEnd);
  return /successor|turned off|deprecated|Play Integrity/i.test(window);
}
```

**Three-tier check per match:**
1. Does `{file, line}` appear in `allowlist.safetynet_exemptions[]`? → exempt
2. Does the ±200-char window around the match contain `/successor|turned off|deprecated|Play Integrity/i`? → exempt
3. Otherwise → violation

### Pattern 7: AOSP Word-Count (C3 — Informational)

**Body extraction algorithm (D-29):**
```javascript
function bodyWordCount(content) {
  // Strip frontmatter (between opening --- and closing ---)
  let body = content.replace(/^---[\s\S]*?---\n/, '');
  // Strip ## See Also section and everything after
  body = body.replace(/^## See Also[\s\S]*$/m, '');
  // Strip ## Changelog section and everything after
  body = body.replace(/^## Changelog[\s\S]*$/m, '');
  return body.split(/\s+/).filter(Boolean).length;
}
```

**VERIFIED counts for `docs/admin-setup-android/06-aosp-stub.md`:**
- Total words: 1197 [VERIFIED: node script in this session]
- Body words (excl frontmatter + See Also + Changelog): 1089 [VERIFIED]
- Phase 39 envelope: 600-900
- Drift: 189 words over top of envelope — tech debt, NOT a gate failure in Phase 42

### Pattern 8: Deferred-File Android-Link Guard (C4)

**Targets:** `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`

**Regex (D-30 locked):**
```javascript
/\]\([^)]*(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi)[^)]*\)/i
```

This scopes to markdown link target syntax `](...)` — matches link targets containing Android-specific paths. Does NOT match bare text mentions (intentional: nav text like "Android" in prose is acceptable; link targets are the gate).

**VERIFIED baseline [VERIFIED: grep in this session]:**
- `docs/common-issues.md`: 0 matches
- `docs/quick-ref-l1.md`: 0 matches
- `docs/quick-ref-l2.md`: 0 matches

Phase 42 does NOT touch these files (out-of-scope per D-30 deferred-file guard). The check should already PASS at execution time.

### Pattern 9: C5 last_verified Freshness

**Per-file assertions (D-31):**
```javascript
// frontmatter present
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);

// last_verified: ISO-8601 date (not "TBD" or null)
/^last_verified:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(fm)

// review_by: ISO-8601 date
/^review_by:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(fm)

// review_by - last_verified <= 60 days
const lastVerified = new Date(fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})/m)[1]);
const reviewBy = new Date(fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})/m)[1]);
const diffDays = (reviewBy - lastVerified) / (1000 * 60 * 60 * 24);
// pass if diffDays <= 60
```

**Note on glob expansion:** The harness must resolve globs manually using `readdirSync`/`walkMd()` since Node does not expand globs natively. Use the `walkMd()` helper from check-phase-30.mjs (lines 21-38) or equivalent.

### Anti-Patterns to Avoid

- **Duplicating canonical content:** Matrix cells MUST link to `02-provisioning-methods.md` or `03-android-version-matrix.md` rather than embedding grids from those docs (D-13, inherits D-26 Anti-Pattern 1).
- **Writing "supervision" for Android:** The HTML comment guard in the Cross-Platform Equivalences section exists for this reason. The word appears ONLY in the iOS column headers and body text.
- **4-platform table:** The Cross-Platform Equivalences H2 has exactly 3 paired rows. More rows pre-empt AECOMPARE-01.
- **Re-gating Phase 39:** C3 always PASS in Phase 42. No `if wordCount > 900 { return { pass: false } }` logic.
- **Same subagent for audit run:** The audit plan (Wave 2) must explicitly spawn a fresh subagent.
- **Touching "must not modify" lines:** CONTEXT D-22 and D-24 enumerate exactly which lines are frozen.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File reading in harness | Shell `grep` or `exec` calls | `fs.readFileSync` | Portability; Phase 30/31 established NO SHELL rule |
| Glob expansion | Custom recursive walker from scratch | Copy `walkMd()` from check-phase-30.mjs lines 21-38 | Already vetted; handles stat errors gracefully |
| Frontmatter parsing | Custom YAML parser | Simple regex on first 20 lines (Phase 31 pattern) | YAML is simple here; full parser adds npm dependency |
| SafetyNet window check | Counting characters manually | `content.slice(Math.max(0, matchIndex - 200), matchIndex + 200)` | Exact pattern established in D-27 |
| Word count | `wc -w` shell command | `content.split(/\s+/).filter(Boolean).length` | Cross-platform; NO SHELL rule |

**Key insight:** All harness utilities needed are already demonstrated in check-phase-30.mjs (338 lines) and check-phase-31.mjs (149 lines). The planner should direct the executor to read those files first before writing v1.4-milestone-audit.mjs.

---

## Runtime State Inventory

> This phase involves no rename/refactor/migration. All content is additive or surgical append. Omitted per instructions.

---

## Common Pitfalls

### Pitfall 1: docs/index.md Line Number Drift

**What goes wrong:** Planner specifies insertion at "line 21" but by execution time another plan has modified the file.
**Why it happens:** No Phase 41 plans touch docs/index.md, but executor must verify line numbers before editing.
**How to avoid:** Plans should read docs/index.md first and locate insertion points by content anchor (the `## Choose Your Platform` list) rather than raw line number. The section structure is stable.
**Warning signs:** Line numbers in this research don't match what the executor reads — they are VERIFIED at research time (2026-04-24) but must be re-confirmed.

### Pitfall 2: Supervision Allow-list Line Drift

**What goes wrong:** A prior Phase 41 plan (41-08, still in progress at research time per git status) modifies `docs/admin-setup-android/03-fully-managed-cobo.md`. If it changes line 35, the allow-list pin for that file will be wrong.
**Why it happens:** Plan 41-08 is unfinished; it touches the COBO file.
**How to avoid:** The harness plan (42-0N) MUST re-scan all pinned files at authoring time and re-verify line numbers. CONTEXT D-28 explicitly requires this: "Plan 42-0N-PLAN responsible for final enumeration must re-scan at authoring time and pin exhaustively."
**Warning signs:** Harness reports unexpected supervision violations in COBO file or misses them.

### Pitfall 3: C3 Always-PASS Implementation

**What goes wrong:** Developer implements C3 as a real gate (pass: false when body > 900 words), contradicting D-29.
**Why it happens:** The word "check" implies a gate; the informational-only behavior is subtle.
**How to avoid:** C3's `run()` always returns `{ pass: true, detail: 'AOSP body N words vs Phase 39 envelope 600-900 (informational — Phase 39 self-certification)' }`. The tech-debt note appears in the audit doc, not as a FAIL output.
**Warning signs:** The harness exits 1 when AOSP stub is outside envelope.

### Pitfall 4: Auditor Independence Violation

**What goes wrong:** The same agent that writes the capability matrix (AEAUDIT-01) also runs the audit.
**Why it happens:** Convenience — a single agent could do everything sequentially.
**How to avoid:** The audit-run plan (42-06 or equivalent) must spawn a subagent by name, and the audit doc must record `performed_by: "<subagent identity>"` distinct from the content authors.
**Warning signs:** `performed_by` field matches an agent name from earlier capability matrix plan.

### Pitfall 5: ROADMAP Copy-Paste Bug Not Fixed Before Execution

**What goes wrong:** Plans reference `42-0X-PLAN.md` numbering, but ROADMAP still lists `41-0X-PLAN.md` entries in the Phase 42 Plans section.
**Why it happens:** The copy-paste bug is in ROADMAP.md lines 246-253 [VERIFIED].
**How to avoid:** Plan 42-01 (or the first plan) fixes ROADMAP.md Phase 42 Plans table and the `0/TBD` progress count.
**Warning signs:** ROADMAP Plans section for Phase 42 still references 41-0X file names.

### Pitfall 6: ios-capability-matrix.md 90-day Cycle Copied to Android

**What goes wrong:** Android capability matrix frontmatter uses `review_by: last_verified + 90 days` (copied from iOS matrix), violating D-16.
**Why it happens:** iOS matrix is the structural template and uses 90-day cycle; Phase 34 D-14 establishes 60-day for Android specifically.
**How to avoid:** Android matrix `review_by` = `last_verified + 60 days`. With `last_verified: 2026-04-24`, `review_by: 2026-06-23`.
**Warning signs:** C5 freshness check flags the new capability matrix on its first run.

### Pitfall 7: 21-android-compliance-investigation.md Not Re-scanned at Authoring

**What goes wrong:** Allow-list sidecar includes a supervision entry for 21-android-compliance-investigation.md that doesn't exist (or misses a real hit added during Phase 41 execution).
**Why it happens:** At adversarial-review time (CONTEXT.md authoring), Phase 41 execution was not yet complete. CONTEXT D-28 flags: "scan at authoring; pin any hits."
**How to avoid:** The harness/allow-list plan (Wave 1) must run a fresh grep of this file before writing the JSON sidecar.
**Findings at research time [VERIFIED]:** 21-android-compliance-investigation.md has ZERO supervision matches. No sidecar entry needed for this file. But executor must re-verify because Phase 41 work may have added content.

---

## Code Examples

Verified patterns from live file inspection:

### docs/index.md — Exact Insertion Points

```
[VERIFIED: docs/index.md read in this session, 2026-04-24]

Current state of Choose Your Platform list (lines 18-22):
  Line 18: - [Windows Autopilot](#windows-autopilot) -- ...
  Line 19: - [macOS Provisioning](#macos-provisioning) -- ...
  Line 20: - [iOS/iPadOS Provisioning](#iosipados-provisioning) -- ...
  Line 21: - [Cross-Platform References](#cross-platform-references) -- ...

Insertion 1 (D-19 step 1): INSERT after line 20 (iOS bullet), BEFORE line 21 (Cross-Platform):
  - [Android Enterprise Provisioning](#android-enterprise-provisioning) -- Android device provisioning
    via Intune (Zero-Touch, Fully Managed, Work Profile, Dedicated, AOSP stub)

Line 130-162: iOS/iPadOS Provisioning section
  Line 130: ## iOS/iPadOS Provisioning
  ...
  Line 162: (content of iOS section — last content line before section separator)
  Line 163: --- (the closing horizontal rule of the iOS section)
  Line 164: (blank line — then ## Cross-Platform References starts at line 166)

Insertion 2 (D-19 step 2): INSERT after line 163 (the iOS --- separator), BEFORE the blank line:
  ## Android Enterprise Provisioning

  Troubleshooting, investigation, and setup guides for Android Enterprise provisioning through
  Microsoft Intune. For terminology, see the [Android Enterprise Provisioning Glossary]
  (_glossary-android.md). For enrollment paths, see the [Android Provisioning Lifecycle]
  (android-lifecycle/00-enrollment-overview.md).

  ---

Cross-Platform References table starts at line 167:
  Line 167: | Resource | Description |
  Line 168: | --- | --- |
  Line 169: | [Windows Autopilot Glossary](_glossary.md) | Windows... |
  Line 170: (blank)
  Line 171: | [macOS Provisioning Glossary](_glossary-macos.md) | macOS ADE terminology... |
  Line 172: | [Windows vs macOS Concept Comparison]... | ... |
  ...
  Line 183: | [iOS Capability Matrix]... | ... |

Insertion 3 (D-19 step 3): INSERT between _glossary-macos.md row (line 171) and Windows vs macOS row (line 172):
  | [Android Enterprise Provisioning Glossary](_glossary-android.md) | Android Enterprise terminology
    (Work Profile, COBO, COPE, Zero-Touch, DPC, Managed Google Play) |
```

NOTE: Line numbers above are approximate from visual inspection; executor must verify by reading the file and locating anchors by content. The structural anchor pattern (iOS section, `---` separator, Cross-Platform References H2, table rows) is stable.

### docs/_glossary-macos.md — Exact Line 10 Surgery

```
[VERIFIED: docs/_glossary-macos.md lines 1-11 read in this session]

Current line 9:  > **Platform coverage:** This glossary covers Apple-platform provisioning and
                 management terminology for macOS and iOS/iPadOS.
Current line 10: > For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).

Target line 10 (D-23):
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android
Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```

This is a one-line in-place replacement: the first `For Windows...` sentence is preserved, a second sentence is appended to the same blockquote continuation line. Line count is unchanged (2-line blockquote remains 2-line).

### Allow-list JSON — Exact Verified Shape

```json
// [VERIFIED: D-26 CONTEXT.md; all line numbers verified against live files in this session]
{
  "schema_version": "1.0",
  "generated": "2026-04-24T00:00:00Z",
  "phase": "42-integration-milestone-audit",
  "safetynet_exemptions": [
    {"file": "docs/_glossary-android.md", "line": 138,
     "reason": "deprecation-context prose naming SafetyNet as Play Integrity predecessor"},
    {"file": "docs/_glossary-android.md", "line": 150,
     "reason": "changelog row naming SafetyNet→Play Integrity 2025 transition"},
    {"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 85,
     "reason": "Non-version Breakpoints section header naming deprecation event"},
    {"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 87,
     "reason": "Non-version Breakpoints section body describing deprecation event"}
  ],
  "supervision_exemptions": [
    {"file": "docs/_glossary-android.md", "line": 65, "reason": "§Supervision H3 disambiguation entry"},
    {"file": "docs/_glossary-android.md", "line": 67, "reason": "Supervision cross-platform note blockquote body"},
    {"file": "docs/_glossary-android.md", "line": 134, "reason": "supervised MDM profile cross-platform callout"},
    {"file": "docs/_glossary-android.md", "line": 148, "reason": "Changelog row naming supervision-as-callout-only Phase 34 decision"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 51,
     "reason": "Phase 34 D-03 locked For-Admins-Familiar-with-iOS narrative — iOS Supervision analog"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 53,
     "reason": "Phase 34 D-03 locked narrative — supervision-is-not-an-Android-term bridge"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 83,
     "reason": "See Also section supervision cross-link"},
    {"file": "docs/admin-setup-android/03-fully-managed-cobo.md", "line": 35,
     "reason": "Cross-platform note blockquote — iOS Supervision analog in COBO context"},
    {"file": "docs/l2-runbooks/20-android-app-install-investigation.md", "line": 21,
     "reason": "Unlike iOS where supervision state... — cross-platform contrast prose"}
  ]
}
```

**VERIFIED line numbers (current state, 2026-04-24):**
- `_glossary-android.md:65` — `### Supervision` H3 heading [VERIFIED]
- `_glossary-android.md:67` — blockquote body of supervision disambiguation note [VERIFIED]
- `_glossary-android.md:134` — "supervised MDM profile cross-platform callout" near Managed Home Screen [VERIFIED: line 134 is "supervised" in cross-platform note under MHS]
- `_glossary-android.md:148` — changelog row containing "supervision as callout-only" [VERIFIED: line 148 is a Version History row]
- `00-enrollment-overview.md:51` — "iOS Supervision" in "For Admins Familiar with iOS" section [VERIFIED: line 51 contains "iOS Supervision"]
- `00-enrollment-overview.md:53` — "supervision is not an Android term" bridge sentence [VERIFIED: line 53]
- `00-enrollment-overview.md:83` — See Also section "supervision" cross-link [VERIFIED: line 83]
- `03-fully-managed-cobo.md:35` — cross-platform note blockquote [VERIFIED: line 35 is the blockquote containing "iOS Supervision"]
- `20-android-app-install-investigation.md:21` — "Unlike iOS where supervision state..." [VERIFIED: line 21]
- `21-android-compliance-investigation.md`: **ZERO matches** [VERIFIED: grep found no matches] — no sidecar entry needed

**CRITICAL NOTE:** Plan 41-08 modifies `docs/admin-setup-android/03-fully-managed-cobo.md`. The executor of the harness/allow-list plan MUST re-verify line 35 of this file at authoring time.

**SafetyNet pin VERIFICATION:**
- `_glossary-android.md:138` — "Play Integrity is Google's device-attestation API, successor to the SafetyNet Attestation API" [VERIFIED: line 138]
- `_glossary-android.md:150` — Version History row "SafetyNet Attestation API turned off..." [VERIFIED: line 150]
- `03-android-version-matrix.md:85` — `### SafetyNet → Play Integrity (January 2025)` heading [VERIFIED: line 85]
- `03-android-version-matrix.md:87` — body paragraph "Google turned off SafetyNet Attestation API" [VERIFIED: line 87]

### v1.4-MILESTONE-AUDIT.md — Extended Frontmatter Shape

```yaml
# [VERIFIED: v1.3-MILESTONE-AUDIT.md read in this session; D-32 extension]
---
milestone: v1.4
milestone_name: Android Enterprise Enrollment Documentation
audited: 2026-04-24T<HH:MM:SSZ>
status: passed | gaps_found | tech_debt
scores:
  requirements: 37/37
  phases: 9/9
  integration: <N>/<N>_flows_clean
  flows: <N>/<N>
  nyquist: <summary e.g. "2_compliant_7_partial_0_missing">
mechanical_checks:
  harness: scripts/validation/v1.4-milestone-audit.mjs
  allowlist: .planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json
  last_run: <ISO timestamp>
  commit: <git sha>
  results:
    C1_safetynet_semantic: passed
    C2_supervision_semantic: passed
    C3_aosp_wordcount: informational (body 1089 words vs Phase 39 envelope 600-900 — tech debt, recommend /gsd-validate-phase 39)
    C4_deferred_file_guard: passed
    C5_last_verified_freshness: passed
performed_by: "<subagent identity — must be distinct from AEAUDIT-01/02/03 authors>"
deferred_items: []
---
```

**v1.3 frontmatter fields inherited (VERIFIED):**
- `milestone`, `milestone_name`, `audited`, `status` — direct carry-forward
- `scores:` with `requirements:`, `phases:`, `integration:`, `flows:`, `nyquist:` — same sub-key names
- `gaps_closed:` field — present in v1.3; v1.4 may be empty array `[]` if status is `passed`
- `re_audit_resolution:` field — not present unless a Phase 43 re-audit occurs
- `tech_debt:` — present in v1.3 as per-phase list; v1.4 should enumerate AOSP word-count drift + any other findings
- `nyquist:` in v1.3 was a summary string; v1.4 should mirror

**v1.4 body sections (D-32):**
1. Executive Summary
2. Requirements Coverage table (37 requirements, 4 AEAUDIT rows highlighted)
3. Phase-Level Status (9 phases: 34-42)
4. Integration Findings
5. Mechanical Checks Summary (harness output verbatim or summarized)
6. Tech Debt
7. Recommended Next Steps
8. Deferred Items (AENAVUNIFY-04, AECOMPARE-01, Knox ME, AOSP full, etc.)

### ROADMAP Pre-flight Fix — Corrected Phase 42 Plans Table

Current (buggy — lines 245-253 as verified):
```
**Plans**: 8 plans (3 waves, all autonomous)
  - [x] 41-01-PLAN.md — L2 template platform enum...
  - [x] 41-02-PLAN.md — docs/l2-runbooks/18-android-log-collection.md...
  ...
  - [ ] 41-08-PLAN.md — Atomic retrofit of 3 docs/admin-setup-android files...
```

Corrected (to replace with actual Phase 42 plan roster — planner fills `N` count):
```
**Plans**: N plans (2 waves, all autonomous)
  - [ ] 42-01-PLAN.md — ROADMAP pre-flight fix: rewrite Phase 42 Plans table (D-06) - Wave 0
  - [ ] 42-02-PLAN.md — docs/reference/android-capability-matrix.md (AEAUDIT-01; D-08..D-18) - Wave 1
  - [ ] 42-03-PLAN.md — docs/index.md Android stub (AEAUDIT-02; D-19..D-22) - Wave 1
  - [ ] 42-04-PLAN.md — docs/_glossary-macos.md see-also (AEAUDIT-03; D-23..D-24) - Wave 1
  - [ ] 42-05-PLAN.md — scripts/validation/v1.4-milestone-audit.mjs harness + v1.4-audit-allowlist.json (AEAUDIT-04; D-25..D-31) - Wave 1
  - [ ] 42-06-PLAN.md — Audit run (independent subagent) + .planning/milestones/v1.4-MILESTONE-AUDIT.md (D-32) - Wave 2
  - [ ] 42-07-PLAN.md — REQUIREMENTS.md atomic flip: AEAUDIT-01/02/03/04 [x] (D-03) - Wave 2
```

The progress table line 301 must also change from `0/TBD` to `0/7` (or actual plan count chosen by planner).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| v1.3 audit: manual-only, no harness | v1.4 audit: E-B scripted harness (Node ESM) | Phase 42 design | Reproducible; re-runnable in v1.4.1 |
| v1.3 audit: no allow-list | v1.4 audit: committed JSON sidecar allow-list | Phase 42 design | Explicit exemption rationale; auditable |
| SafetyNet in Android docs | Play Integrity only (SafetyNet turned off January 2025) | January 2025 (Google) | C1 check; all v1.4 Android docs use Play Integrity |
| BYOD DPC = Company Portal | BYOD DPC = Microsoft Intune app (post-AMAPI) | April 2025 (Microsoft) | AMAPI migration note in capability matrix App Deployment domain |
| COPE recommended | WPCO recommended (COPE not deprecated, but WPCO is successor) | Ongoing from Android 11+ | Matrix can note COPE → WPCO trajectory in Configuration domain |

**Deprecated/outdated:**
- SafetyNet Attestation API: turned off January 2025 by Google; replaced by Play Integrity API
- Company Portal as BYOD DPC: replaced by Microsoft Intune app post-April 2025 AMAPI migration
- Custom OMA-URI for BYOD: no longer supported post-AMAPI

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | docs/index.md line numbers for insertion points are stable between now and execution | Code Examples | Executor will insert at wrong location; must re-verify by content anchor |
| A2 | Plan 41-08 completion does not add new supervision matches to 03-fully-managed-cobo.md beyond line 35 | Allow-list design | C2 may have un-exempted violations at audit run |
| A3 | docs/reference/android-capability-matrix.md does not yet exist | Standard Stack | If it exists already, plan 42-02 would be a rewrite, not a new file |
| A4 | The v1.4 requirement count is 37/37 (inherited from CONTEXT.md D-32 scores block) | Audit doc shape | Audit doc scores block would have wrong denominator |

**If this table were empty:** All claims were verified — but A1 and A2 above are execution-time risks, not research-time gaps.

---

## Open Questions

1. **Plan 41-08 completion state**
   - What we know: git status shows 41-08-PLAN.md as untracked; ROADMAP shows it as `[ ]` incomplete
   - What's unclear: Whether Phase 41 execution is fully complete before Phase 42 starts. The allow-list pin for `03-fully-managed-cobo.md:35` may shift.
   - Recommendation: The harness/allow-list plan (Wave 1) must verify this file's line numbers. If line 35 is no longer the blockquote line, update the sidecar accordingly.

2. **Exact plan count for ROADMAP fix**
   - What we know: Research suggests 7 plans based on D-33 recommendation of ≥7 and the plan DAG above
   - What's unclear: Planner may split or combine plans differently
   - Recommendation: Planner decides; ROADMAP fix plan (42-01) can only be fully accurate after the planner sets the plan roster

3. **v1.4 requirements count confirmation**
   - What we know: CONTEXT.md D-32 says `requirements: 37/37`; the full REQUIREMENTS.md was not counted in this session
   - What's unclear: Whether 37 is exactly right given Phases 34-42 scope
   - Recommendation: The audit executor should count `[x]` requirements in REQUIREMENTS.md and VERIFY the denominator before writing the audit doc. If CONTEXT.md states 37, treat as correct unless the count produces a different number.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | v1.4-milestone-audit.mjs harness | Confirmed (Phase 30/31 harnesses run) | Runtime on machine | — |
| `node:fs`, `node:path`, `node:process` | Harness built-ins | Confirmed (same as Phase 30/31) | N/A (built-in) | — |
| `docs/admin-setup-android/06-aosp-stub.md` | C3 word count | Confirmed (file exists, 129 lines) | Current | — |
| `docs/reference/android-capability-matrix.md` | C5 freshness scope (activates after AEAUDIT-01) | Does not exist yet | To be created by 42-02 | — |
| `docs/decision-trees/08-android-triage.md` | C5 freshness scope | Confirmed [VERIFIED: file exists] | Current | — |
| `docs/end-user-guides/android-work-profile-setup.md` | C5 freshness scope | Confirmed [VERIFIED: file exists] | Current | — |
| `docs/l1-runbooks/22-27-android-*.md` | C5 freshness scope | All 6 confirmed [VERIFIED] | Current | — |
| `docs/l2-runbooks/18-21-android-*.md` | C5 freshness scope | All 4 confirmed [VERIFIED] | Current | — |
| `docs/_templates/admin-template-android.md` | C5 freshness scope | Confirmed [VERIFIED: file exists] | Current | — |

**Missing dependencies:** None that block execution. The android-capability-matrix.md file does not exist yet but is CREATED by Plan 42-02 before the harness runs in Wave 2.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js (built-in ESM) — no test framework; harness IS the test |
| Config file | None (harness self-contained) |
| Quick run command | `node scripts/validation/v1.4-milestone-audit.mjs --verbose` |
| Full suite command | `node scripts/validation/v1.4-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEAUDIT-01 | android-capability-matrix.md exists with correct structure | structural | Harness C5 checks frontmatter; planner may add structure grep | Wave 1 creates |
| AEAUDIT-02 | docs/index.md has Android stub H2 and bullet | structural | Manual spot-check (H2 + bullet grep) | Exists (to be edited) |
| AEAUDIT-03 | docs/_glossary-macos.md line 10 contains both glossary links | structural | `grep "_glossary-android.md" docs/_glossary-macos.md` | Exists (to be edited) |
| AEAUDIT-04 | v1.4-milestone-audit.mjs exits 0 with 5 PASS | harness run | `node scripts/validation/v1.4-milestone-audit.mjs` | Wave 1 creates |

### Sampling Rate
- **Per task commit:** Read target file and verify specific added content exists (content grep)
- **Per wave merge:** `node scripts/validation/v1.4-milestone-audit.mjs --verbose`
- **Phase gate:** Harness exits 0 and v1.4-MILESTONE-AUDIT.md status = `passed` or `tech_debt` (with user acceptance) before REQUIREMENTS.md flip

### Wave 0 Gaps

None — existing infrastructure covers all phase requirements. The harness is a new file created within Phase 42 itself (Wave 1), not a pre-existing fixture.

---

## Security Domain

> This phase creates only markdown documentation and a Node.js file-reader script. No authentication, no external HTTP, no user input, no credentials.

| ASVS Category | Applies | Rationale |
|---------------|---------|-----------|
| V2 Authentication | No | No auth surface |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | Local file reads only |
| V5 Input Validation | No | Harness reads local files with known paths; no user input |
| V6 Cryptography | No | No cryptography |

No ASVS controls apply to this phase.

---

## Sources

### Primary (HIGH confidence)
- `docs/reference/ios-capability-matrix.md` — structural template; all conventions verified by direct read
- `docs/reference/macos-capability-matrix.md` — sibling matrix; 7-item Key Gaps, bilateral pattern verified
- `scripts/validation/check-phase-30.mjs` — harness template; ESM structure, padLabel, LABEL_WIDTH=56, exit code verified (338 lines)
- `scripts/validation/check-phase-31.mjs` — allow-list sidecar pattern; parseInventory() pattern verified (149 lines)
- `.planning/milestones/v1.3-MILESTONE-AUDIT.md` — audit doc template; YAML frontmatter keys verified
- `docs/index.md` — insertion target; line-by-line structure verified (197 lines)
- `docs/_glossary-macos.md` — surgical edit target; lines 9-10 exact text verified
- `docs/_glossary-android.md` — supervision/SafetyNet pins; lines 65, 67, 134, 138, 148, 150 verified
- `docs/android-lifecycle/00-enrollment-overview.md` — supervision pins; lines 51, 53, 83 verified
- `docs/admin-setup-android/03-fully-managed-cobo.md` — supervision pin; line 35 verified
- `docs/l2-runbooks/20-android-app-install-investigation.md` — supervision pin; line 21 verified
- `docs/l2-runbooks/21-android-compliance-investigation.md` — zero supervision matches verified by grep
- `docs/android-lifecycle/03-android-version-matrix.md` — SafetyNet pins; lines 85, 87 verified
- `docs/admin-setup-android/06-aosp-stub.md` — AOSP word counts; 1197 total / 1089 body verified by Node script
- `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — zero Android link matches verified by grep
- `.planning/phases/42-integration-milestone-audit/42-CONTEXT.md` — all locked decisions D-01 through D-32

### Secondary (MEDIUM confidence)
- `.planning/ROADMAP.md` lines 235-253 — Phase 42 section and copy-paste bug confirmed
- `.planning/STATE.md` — milestone status, Phase 41 completion state
- `.planning/REQUIREMENTS.md` — AEAUDIT-01..04 lines 92-95 verified

### Tertiary (LOW confidence)
- None — all research was file-read verification against live codebase.

---

## Metadata

**Confidence breakdown:**
- Allow-list pin accuracy: HIGH — all 13 exemption lines verified against live files (exception: cobo.md line 35 may shift if plan 41-08 is not yet complete)
- Structural conventions: HIGH — verified against ios-capability-matrix.md and macos-capability-matrix.md live files
- Harness design: HIGH — verified against check-phase-30.mjs (338 lines) and check-phase-31.mjs (149 lines)
- Plan sequencing: HIGH — derived directly from D-25/D-26/D-28/D-31 locked decisions
- Insertion line numbers: MEDIUM — verified at research time; may drift if any edit touches docs/index.md before execution

**Research date:** 2026-04-24
**Valid until:** 2026-05-24 (30 days) — line number claims may be stale earlier if Phase 41 or other work modifies target files
