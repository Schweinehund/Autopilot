# Phase 47: Integration & Re-Audit — Research

**Researched:** 2026-04-25
**Domain:** Documentation integration, audit harness extension, YAML milestone closure, traceability update
**Confidence:** HIGH (all decisions pre-locked in CONTEXT.md D-01..D-40; research targets are recipe/schema/coordinate details only)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**AEINTEG-01 — GA1 = Option C (surgical re-canonicalization at 3 SC#1 hotspots)**
- D-01: Surgical re-canonicalization only at `docs/_glossary-android.md` line 15 alphabetical index, `docs/reference/android-capability-matrix.md` column-ordering, `docs/admin-setup-android/00-overview.md` Mermaid leaves. Single atomic commit.
- D-04: Scope FIXED. Out of scope: re-touching capability matrix lines 121-127, reordering beyond the 3 hotspots, reopening Phase 44 D-05 (KME branch) or Phase 46 D-20 (COPE column index 1).
- D-05: Per-file deliverables for re-canonicalization (see CONTEXT.md).
- D-06: Allow-list sidecar line-shift maintenance atomically in same commit; re-run `regenerate-supervision-pins.mjs --self-test`.

**AEINTEG-02 — GA2 = Option B (full harness extensions)**
- D-07: C4 regex expansion + C6 targets + C7 suffix-list + C9 sidecar tuning (exact token lists locked — see Code Examples below).
- D-10: All informational-first checks (C6/C7/C9) STAY informational-first in v1.4.1.
- D-11: C9 reporter format stays hits-only count; file:line surfacing deferred to v1.5.

**AEINTEG-03 — GA3 = Option A (append re_audit_resolution to v1.4 audit doc + status flip)**
- D-12: Single edit to `.planning/milestones/v1.4-MILESTONE-AUDIT.md` — extend `re_audit_resolution:` YAML mapping with sibling child keys for DEFER-01/02/03/05/06; flip frontmatter `status: tech_debt → passed`.
- D-14: Required fields per child key (see Code Examples).
- D-15: DEFER-04 (already closed c782af6) — do NOT re-touch.
- D-17: Run `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` post-Wave-1+2+3; exit 0 mandatory.
- D-32: Plan 47-04 uses fresh executor worktree (auditor-independence).

**AEINTEG-04 — GA4 = W3 × D1 (4-plan structure + "Closed Deferred Items" subsection)**
- D-20: Append "Closed Deferred Items" subsection to PROJECT.md Context section (exact bullet shape per CONTEXT).
- D-23: Active → Validated flips: AEAUDIT-02..05 + AEKNOX-01..07 + AEAOSPFULL-01..09 + AECOPE-01..04 = 24 reqs.
- D-28: Plan ordering: 47-01 (AEINTEG-01) → 47-02 (AEINTEG-02) → 47-03 (AEINTEG-04) → 47-04 (AEINTEG-03, LAST).
- D-29: Plans 47-01/02/03 may run serially or in parallel (no shared write hotspots); 47-04 strictly LAST.
- D-33: v1.4 harness `v1.4-milestone-audit.mjs` FROZEN at commit `3c3a140` — DO NOT MODIFY.

### Claude's Discretion

- Exact prose of "Closed Deferred Items" subsection bullets — compact vs. full-sentence, author's call.
- `resolution_plan` field shape — single ID vs. plan-range string.
- Whether to add `notes:` field under closure child keys.
- Plan 47-04 commit message wording.
- Whether to run `regenerate-supervision-pins.mjs --self-test` once per plan or terminal-only.

### Deferred Ideas (OUT OF SCOPE)

- C8 anti-paste-block marker drift detection — v1.5 backlog.
- C9 reporter format upgrade (file:line surfacing) — v1.5 backlog.
- v1.4.1-MILESTONE-AUDIT.md dedicated doc — no x.y precedent; deferred.
- C7 50-char window tuning — v1.5 backlog.
- AENAVUNIFY-04 (DEFER-07) and AECOMPARE-01 (DEFER-08) — explicitly v1.5; PROJECT.md "Deferrals" block stays unchanged.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEINTEG-01 | Atomic unified-rebuilds — capability matrix column-ordering, `00-overview.md` Mermaid leaf ordering, glossary line 15 alphabetical index; mirrors Phase 42 Wave 1/2 atomic rebuild pattern | Plan 47-01: 3 SC#1 hotspot files identified, current on-disk state read, locked invariants enumerated, pin-shift recipe documented |
| AEINTEG-02 | Audit harness check extensions — C4 regex expanded (Knox/KME/per-OEM/COPE tokens), C6 targets updated (09-13 per-OEM files), C7 suffix list expanded (5-SKU forms), C9 sidecar `cope_banned_phrases[]` extended (7 patterns) | Plan 47-02: exact line numbers verified in live harness file; token lists/regex literals ready for copy-paste |
| AEINTEG-03 | Terminal re-audit via `v1.4.1-milestone-audit.mjs` — expect 8/8 PASS; append `re_audit_resolution:` to v1.4-MILESTONE-AUDIT.md; flip `status: tech_debt → passed` | Plan 47-04: DEFER-04 precedent schema fully documented; DEFER-01..10 mapping reconciled; auditor-independence protocol stated |
| AEINTEG-04 | PROJECT.md traceability — move 24 reqs Active → Validated; "Closed Deferred Items" subsection; footer refresh | Plan 47-03: exact req-IDs per phase, closing SHAs, DEFER mapping, PROJECT.md format patterns all documented |
</phase_requirements>

---

## Summary

Phase 47 is the terminal phase of v1.4.1. Its four requirements map 1:1 to four plans in a strict DAG: 47-01 surgical re-canonicalization, 47-02 harness extensions, 47-03 PROJECT.md closure, 47-04 terminal re-audit (strictly last). Because CONTEXT.md D-01..D-40 pre-locks every substantive decision via adversarial review, this research focuses exclusively on recipe-level details the planner needs: exact regex literals, precise line coordinates in live files, YAML schema for closure child keys, pin-shift maintenance workflow, terminal commit SHAs, and DEFER-numbering reconciliation across the two documents that use incompatible enumeration.

All four plans produce single atomic commits with no shared write hotspots between Plans 47-01/02/03 (`docs/`, `scripts/validation/`, `.planning/PROJECT.md` respectively). Plan 47-04 is gated on all three preceding plans and must spawn a fresh executor worktree per Phase 42 D-02 auditor-independence rule.

**Primary recommendation:** Execute 47-01 → 47-02 → 47-03 in parallel (disjoint file sets), verify all three land successfully, then spawn fresh worktree for 47-04 terminal re-audit.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Glossary alphabetical-index re-sort | Docs / Content | Validation (sidecar pin-shift) | Line 16 is a single-line index; sort is alphabetical prose edit; pin coordinates shift accordingly |
| Capability matrix column-ordering coherence | Docs / Content | Validation (C6 PITFALL-7 informational) | Verify Phase 46 D-20 COPE column index 1 and Phase 44 D-05 Knox column across all 5 sub-tables; no content rewrite |
| Mermaid leaf ordering | Docs / Content | — | Verify 6-branch layout + AOSP leaf alphabetical consistency; Phase 44 D-05 KME branch already locked |
| Harness C4/C6/C7 code edits | Validation harness | — | Three targeted literal edits in `v1.4.1-milestone-audit.mjs` (regex, targets array, suffix list) |
| Harness C9 sidecar extension | Validation sidecar | — | Additive-only edit to `cope_banned_phrases[]` array in JSON; no harness code change |
| Allow-list pin-shift maintenance | Validation sidecar | Pin helper (--self-test) | After glossary line edit shifts supervision_exemptions[] coordinates, update pin lines + annotations atomically |
| `re_audit_resolution:` YAML extension | Milestone audit doc | — | Append sibling child keys per DEFER-04 schema; flip frontmatter status |
| PROJECT.md Active→Validated + closure | Planning docs | — | 24-req batch flip + "Closed Deferred Items" subsection + footer |
| Terminal re-audit run | Auditor (fresh worktree) | — | Auditor-independence per Phase 42 D-02; run harness, record exit-0, compose closure artifact |

---

## Standard Stack

### Core (verified by direct file reads)

| Tool | Version | Purpose | Source |
|------|---------|---------|--------|
| Node.js (ESM) | ambient | Run `v1.4.1-milestone-audit.mjs` and `regenerate-supervision-pins.mjs` | [VERIFIED: harness shebang `#!/usr/bin/env node`] |
| `v1.4.1-milestone-audit.mjs` | Phase 43 be1087b baseline | v1.4.1 audit harness (8 checks: C1-C5 blocking + C6/C7/C9 informational) | [VERIFIED: scripts/validation/v1.4.1-milestone-audit.mjs live read] |
| `v1.4.1-audit-allowlist.json` | Phase 46 Wave 2 baseline | Sidecar: 4 safetynet pins, 18 supervision pins, 3 cope_banned_phrases | [VERIFIED: scripts/validation/v1.4.1-audit-allowlist.json live read] |
| `regenerate-supervision-pins.mjs` | Phase 43 Plan 04 0a9cac0 | Pin helper: --report / --emit-stubs / --self-test modes | [VERIFIED: scripts/validation/regenerate-supervision-pins.mjs live read] |
| `v1.4-milestone-audit.mjs` | FROZEN commit 3c3a140 | v1.4 harness (reference only, DO NOT MODIFY) | [VERIFIED: CONTEXT D-33] |

### Files Phase 47 Edits (verified on-disk baseline as of 2026-04-25)

| File | Plan | Edit Type | Current Hotspot State |
|------|------|-----------|----------------------|
| `docs/_glossary-android.md` | 47-01 | Alphabetical index re-sort (line 16) | [VERIFIED: line 16 is the full `[afw#setup]...[Zero-Touch Enrollment]` index, 24 entries post-Phase-46] |
| `docs/reference/android-capability-matrix.md` | 47-01 | Column-order coherence verify | [VERIFIED: COPE at index 1, Knox column present, AOSP per-OEM link at 121-127] |
| `docs/admin-setup-android/00-overview.md` | 47-01 | Mermaid leaf ordering verify | [VERIFIED: 6-branch Mermaid present; AOSP-Path branch terminates at "Phase 39 — AOSP stub"; no per-OEM leaves yet in Mermaid — expected per D-04] |
| `scripts/validation/v1.4.1-milestone-audit.mjs` | 47-02 | C4 regex line 228, C6 targets lines 293-296, C7 suffix line 314 | [VERIFIED: exact lines confirmed by live read] |
| `scripts/validation/v1.4.1-audit-allowlist.json` | 47-02 (C9) + 47-01 (pin-shift) | `cope_banned_phrases[]` extend + supervision pin line updates | [VERIFIED: current 3 cope phrases at lines 31-35; 18 supervision pins confirmed] |
| `.planning/milestones/v1.4-MILESTONE-AUDIT.md` | 47-04 | `re_audit_resolution:` sibling keys + frontmatter status flip | [VERIFIED: frontmatter status: tech_debt line 5; re_audit_resolution: DEFER-04 closes at lines 143-168] |
| `.planning/PROJECT.md` | 47-03 | Active→Validated 24 reqs + subsection + footer | [VERIFIED: Active section empty post-Phase-46; Validated section has v1.0..v1.4 entries] |

---

## Architecture Patterns

### System Architecture Diagram

```
Input: post-Phase-46 master tip (all 4 content phases landed)
          |
          v
    [Plan 47-01: AEINTEG-01]
    docs/ surgical re-canonicalization
    (glossary line 16 sort + matrix column verify +
     Mermaid leaf verify) + sidecar pin-shift
    → atomic commit (docs/ + sidecar)
          |
          v (parallel with 47-02 and 47-03 — no shared files)

    [Plan 47-02: AEINTEG-02]             [Plan 47-03: AEINTEG-04]
    scripts/validation/ edits            .planning/PROJECT.md edits
    (C4/C6/C7 harness literals +         (24-req Active→Validated +
     C9 sidecar extend)                   "Closed Deferred Items" +
    → atomic commit (harness + sidecar)   footer refresh)
                                        → atomic commit
          |                                   |
          +-----------------------------------+
                         |
                         v
               [Plan 47-04: AEINTEG-03]   ← STRICTLY LAST
               Fresh executor worktree
               (auditor-independence, Phase 42 D-02)
               Run: node scripts/validation/v1.4.1-milestone-audit.mjs --verbose
               Verify: exit 0, 8/8 PASS
               Append: re_audit_resolution: sibling child keys to v1.4-MILESTONE-AUDIT.md
               Flip: frontmatter status: tech_debt → passed
               → atomic commit (.planning/milestones/v1.4-MILESTONE-AUDIT.md)
```

### Recommended Project Structure (no changes — existing paths only)

```
scripts/validation/
├── v1.4.1-milestone-audit.mjs       # Phase 47 edits C4/C6/C7
├── v1.4.1-audit-allowlist.json      # Phase 47 edits C9 + pin-shift
├── v1.4-milestone-audit.mjs         # FROZEN — reference only
├── v1.4-audit-allowlist.json        # FROZEN — reference only
└── regenerate-supervision-pins.mjs  # Run --self-test post-Plan-47-01

docs/
├── _glossary-android.md             # Plan 47-01: line 16 re-sort
├── reference/android-capability-matrix.md  # Plan 47-01: verify column order
└── admin-setup-android/00-overview.md      # Plan 47-01: verify Mermaid

.planning/
├── milestones/v1.4-MILESTONE-AUDIT.md  # Plan 47-04: re_audit_resolution extend + status flip
└── PROJECT.md                           # Plan 47-03: 24-req flip + Closed Deferred Items + footer
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Supervision pin validation | Custom grep + counter | `regenerate-supervision-pins.mjs --self-test` | Phase 43 Plan 04 helper reproduces hand-authored set; Tier-1/Tier-2 discrimination already implemented |
| YAML parse verification | Ad-hoc JSON.parse | CI job `audit-harness-integrity.yml` parse job (already gates on every commit) | Phase 43 Plan 08 CI already enforces JSON parse + non-empty supervision_exemptions[] |
| Deferred-file guard regex | New regex | Extend existing C4 regex literal at harness line 228 | Additive-only per Phase 43 D-26 contract |
| Re-audit run | New script | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` | Existing harness; exit 0 = all-PASS |

**Key insight:** Phase 47 is purely extending existing infrastructure — no new files, no new architectural concepts. Every tool needed already exists; the planner must reference it, not rebuild it.

---

## Code Examples

### C4 Regex Expansion (Plan 47-02, line 228 of v1.4.1-milestone-audit.mjs)

**Current (line 228):**
```javascript
// Source: [VERIFIED: scripts/validation/v1.4.1-milestone-audit.mjs line 228]
const re = /\]\([^)]*(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi)[^)]*\)/gi;
```

**After Phase 47 edit (D-07 token list):**
```javascript
// Source: CONTEXT D-07 locked token list
const re = /\]\([^)]*(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi|knox|kme|kpe|realwear|zebra|pico|htc-vive-focus|meta-quest|cope-full-admin|aosp-realwear|aosp-zebra|aosp-pico|aosp-htc-vive-focus|aosp-meta-quest|aosp-oem-matrix)[^)]*\)/gi;
```

Note: token list kept as a single string literal in the harness file (no new sidecar — CONTEXT D-07 / Phase 43 D-26 additive-only).

### C6 Targets Array Expansion (Plan 47-02, lines 293-296 of v1.4.1-milestone-audit.mjs)

**Current (lines 293-296):**
```javascript
// Source: [VERIFIED: scripts/validation/v1.4.1-milestone-audit.mjs lines 292-295]
const targets = [
  'docs/admin-setup-android/06-aosp-stub.md',
  // Phase 45 will add per-OEM files here (09-aosp-realwear.md, 10-aosp-zebra.md, etc.)
];
```

**After Phase 47 edit (D-07 C6 expansion):**
```javascript
// Source: CONTEXT D-07 + Phase 45 shipped file paths
const targets = [
  'docs/admin-setup-android/06-aosp-stub.md',
  'docs/admin-setup-android/09-aosp-realwear.md',
  'docs/admin-setup-android/10-aosp-zebra.md',
  'docs/admin-setup-android/11-aosp-pico.md',
  'docs/admin-setup-android/12-aosp-htc-vive-focus.md',
  'docs/admin-setup-android/13-aosp-meta-quest.md',
];
```

Remove the "Phase 45 will add per-OEM files here" placeholder comment.

### C7 Suffix-List Expansion (Plan 47-02, line 314 of v1.4.1-milestone-audit.mjs)

**Current (line 314):**
```javascript
// Source: [VERIFIED: scripts/validation/v1.4.1-milestone-audit.mjs line 314]
const suffixes = /(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure)/;
```

**After Phase 47 edit (D-07 + Phase 44 D-01 5-SKU table):**
```javascript
// Source: CONTEXT D-07 + Phase 44 D-01 5-SKU disambiguation table
const suffixes = /(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|KPE Standard|KPE Premium|on-device attestation|Mobile Enrollment Portal)/;
```

### C9 Sidecar cope_banned_phrases[] Expansion (Plan 47-02, sidecar JSON only)

**Current `v1.4.1-audit-allowlist.json` lines 31-35:**
```json
// Source: [VERIFIED: scripts/validation/v1.4.1-audit-allowlist.json lines 31-35]
"cope_banned_phrases": [
  "\\bCOPE\\b[^.]*\\bdeprecated\\b",
  "\\bCOPE\\b[^.]*\\bend of life\\b",
  "\\bCOPE\\b[^.]*\\bremoved\\b"
]
```

**After Phase 47 edit (D-07 + Phase 46 D-31 full banned set):**
```json
// Source: CONTEXT D-07 + Phase 46 D-31 banned-phrase discipline
"cope_banned_phrases": [
  "\\bCOPE\\b[^.]*\\bdeprecated\\b",
  "\\bCOPE\\b[^.]*\\bend of life\\b",
  "\\bCOPE\\b[^.]*\\bremoved\\b",
  "\\bCOPE\\b[^.]*\\bEOL\\b",
  "\\bCOPE\\b[^.]*\\bno longer supported\\b",
  "\\bCOPE\\b[^.]*\\bobsolete\\b",
  "\\bCOPE\\b[^.]*\\bsunset\\b",
  "\\bCOPE\\b[^.]*\\bretired\\b"
]
```

Note: sidecar JSON edit ONLY — no harness code change. The harness already reads from `ALLOWLIST.cope_banned_phrases` with a 3-pattern fallback; the extension simply adds 5 more patterns to the array.

Wait — Phase 46 D-31 lists 7 items: deprecated / end of life / EOL / no longer supported / obsolete / sunset / retired. Current sidecar has 3 of them (deprecated, end of life, removed). "Removed" is in the current sidecar but NOT in D-31's Phase 46 banned set. Keep "removed" as it already exists (additive-only contract), and add the 4 missing D-31 items: EOL, no longer supported, obsolete, sunset, retired. This yields 8 total patterns. Author's discretion whether to include "obsolete" at line position.

**Corrected final array (8 patterns, additive-only from current 3):**
```json
"cope_banned_phrases": [
  "\\bCOPE\\b[^.]*\\bdeprecated\\b",
  "\\bCOPE\\b[^.]*\\bend of life\\b",
  "\\bCOPE\\b[^.]*\\bremoved\\b",
  "\\bCOPE\\b[^.]*\\bEOL\\b",
  "\\bCOPE\\b[^.]*\\bno longer supported\\b",
  "\\bCOPE\\b[^.]*\\bobsolete\\b",
  "\\bCOPE\\b[^.]*\\bsunset\\b",
  "\\bCOPE\\b[^.]*\\bretired\\b"
]
```

### re_audit_resolution: Schema (Plan 47-04, modeled on DEFER-04 at lines 143-168)

**DEFER-04 closure block (Phase 43 Plan 09, lines 143-168 of v1.4-MILESTONE-AUDIT.md — VERBATIM):**
```yaml
# Source: [VERIFIED: .planning/milestones/v1.4-MILESTONE-AUDIT.md lines 143-168]
re_audit_resolution:
  DEFER-04:
    resolution_milestone: "v1.4.1"
    resolution_phase: "43-v1-4-cleanup-audit-harness-fix"
    resolution_plan: "07 (AOSP stub trim + Phase 45 prep shell migration) + 09 (Phase 39 re-gate)"
    resolution_commit_trim: "5dd0862"
    resolution_timestamp: "2026-04-24T21:40:00Z"
    pre_resolution_word_count: 1089
    final_word_count: 696
    envelope: "600-900 words (Phase 39 D-11 + PITFALL 12)"
    headroom_under_cap: 204
    d18_target: "~700 words (hit exactly 696 via RESEARCH §5 5-candidate compressions + additional invariant-safe Platform banner / OEM list compression)"
    invariants_preserved:
      - "PITFALL-7 'not supported under AOSP' framing: 2 grep hits"
      - "9-H2 whitelist: exactly 9 H2 headings"
      - "8-OEM enumeration: DigiLens/HTC/Lenovo/Meta/PICO/RealWear/Vuzix/Zebra all ≥ 2 hits (RealWear = 10)"
      - "Deferred-content table: 7 rows intact (Phase 45 AEAOSPFULL-09 collapses)"
      - "No forward-link from stub to .planning/ prep shell (D-19 prose-only rule)"
    harness_evidence:
      v1_4_1_harness: "scripts/validation/v1.4.1-milestone-audit.mjs — 8/8 PASS; C3 informational reports body 696 words; C6 informational confirms 1/1 AOSP-scoped files preserve PITFALL-7 framing"
    lossless_extract_artifact: ".planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md (770 words; verbatim RealWear deep content blockquote preserves every removed sentence; Phase 45 AEAOSPFULL-01 consumes and deletes per D-20 input-artifact lifecycle)"
    status: "resolved"
    validator_artifact: ".planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md (Validation Audit 2026-04-24 trailer)"
    classification_change: "C3_aosp_wordcount: informational (body 1089 vs 600-900 envelope) → PASS (body 696 within 600-900 envelope)"
    mechanism: "Inline-equivalent of /gsd-validate-phase 39 workflow per CONTEXT D-21 fallback path ..."
    notes: "DEFER-04 was the sole informational-severity tech-debt item on v1.4. ..."
```

**Minimum required fields per new sibling key (D-14):**
- `resolution_milestone: "v1.4.1"`
- `resolution_phase: "<phase-slug>"`
- `resolution_plan: "<plan-id-or-range>"`
- `resolution_commit: "<SHA>"` (or per-artifact named variants like `resolution_commit_trim`)
- `resolution_timestamp: "<ISO-8601>"`
- `status: "resolved"`
- `classification_change: "<original classification → resolved state>"`

**Optional at author's discretion (Claude's Discretion, CONTEXT D-14):**
- `invariants_preserved: [...]`
- `harness_evidence: {...}`
- `notes: "..."`

**MUST also cite (D-16 cross-doc rule):**
Each new child key in `re_audit_resolution:` must cite BOTH the PROJECT.md numbering AND the audit-doc numbering. Audit-doc numbering is canonical.

### Pin-Shift Annotation Pattern (Plan 47-01, sidecar maintenance)

**Pattern (verbatim from current sidecar entries):**
```
"re-verified 2026-04-25 post Plan 46-02 Wave 2; line shifted +13 from Plan 45-10 baseline due to Private Space H3 insertion + see-also blockquotes + frontmatter freshness add"
```

**Plan 47-01 glossary edit shifts** glossary supervision_exemptions[] pins. After editing line 16 of `_glossary-android.md`, any line >= the insertion/deletion point shifts. Update each affected pin's `"line"` value and append an annotation string of the form:
```
"re-verified 2026-04-25 post Plan 47-01; line shifted +N from Plan 46-02 Wave 2 baseline due to <description of glossary change>"
```

Then run: `node scripts/validation/regenerate-supervision-pins.mjs --self-test` from repo root. Exit 0 confirms the classifier still reproduces the hand-authored pin set.

---

## DEFER-Numbering Reconciliation (AEINTEG-04, D-16)

**CRITICAL:** PROJECT.md DEFER-01..06 ≠ v1.4-MILESTONE-AUDIT.md DEFER-01..10. Audit-doc numbering is canonical; PROJECT.md numbering is an alias.

| PROJECT.md # | Audit-Doc # | Title | Closing Phase | Closing Commit | CONTEXT D-16 |
|-------------|-------------|-------|---------------|----------------|--------------|
| DEFER-01 | DEFER-01 | C2 allow-list expansion (27 supervision pins) | Phase 43 | `0b3be9a` (terminal) / `4f41431` (Plan 03 substantive) | [VERIFIED: v1.4-MILESTONE-AUDIT.md deferred_items DEFER-01 + Phase 43 VERIFICATION] |
| DEFER-02 | DEFER-02 | C5 freshness normalization (L2 runbooks 18-21 + template) | Phase 43 | `0b3be9a` (terminal) / `2574c79` (Plan 05 substantive) | [VERIFIED: v1.4-MILESTONE-AUDIT.md deferred_items DEFER-02 + Phase 43 VERIFICATION Plan 05] |
| DEFER-03 | DEFER-04 | Phase 41 VERIFICATION.md / AOSP stub re-validation | Phase 43 | `c782af6` (Plan 09) | [VERIFIED: v1.4-MILESTONE-AUDIT.md DEFER-04 already has re_audit_resolution block; DO NOT re-touch per D-15] |
| DEFER-04 | DEFER-08 | Knox Mobile Enrollment (AEKNOX-01..07) | Phase 44 | `51c2e72` (terminal) | [VERIFIED: v1.4-MILESTONE-AUDIT.md DEFER-08 + Phase 44 VERIFICATION] |
| DEFER-05 | DEFER-09 | Per-OEM AOSP expansion (AEAOSPFULL-01..09) | Phase 45 | `eb88750` (terminal) / `3400bff` (Plan 45-10 atomic retrofit) | [VERIFIED: v1.4-MILESTONE-AUDIT.md DEFER-09 + Phase 45 VERIFICATION] |
| DEFER-06 | DEFER-10 | COPE full admin path (AECOPE-01..04) | Phase 46 | `bcb0986` (terminal) / `ce5ffc0` (Wave 2 atomic) | [VERIFIED: v1.4-MILESTONE-AUDIT.md DEFER-10 + Phase 46 VERIFICATION] |

**DEFER-03 special case:** The audit-doc calls this "DEFER-04" and it maps to PROJECT.md's DEFER-03. It is ALREADY CLOSED (commit `c782af6`) with a complete `re_audit_resolution: DEFER-04:` block at lines 143-168. Plan 47-04 appends SIBLING keys for DEFER-01/02/05/06 (audit numbering) only — it does NOT add a key for DEFER-04 again. Use `DEFER-01:`, `DEFER-02:`, `DEFER-08:`, `DEFER-09:`, `DEFER-10:` as the YAML mapping keys (audit-doc canonical numbering).

**Note on DEFER-03 (audit) / DEFER-05..07 (audit):** The v1.4 audit doc has DEFER-05 (Windows glossary reciprocal see-also — INFORMATIONAL), DEFER-06 (AENAVUNIFY-04 cross-nav — explicitly v1.5), DEFER-07 (AECOMPARE-01 — v1.5). None of these map to PROJECT.md DEFER-01..06 and none are closed by Phase 47 scope. They remain open and are NOT added to `re_audit_resolution:`.

---

## Terminal Commit SHAs for AEINTEG-04 (D-20)

These are required for the "Closed Deferred Items" subsection bullets in PROJECT.md and for the `re_audit_resolution:` child keys.

| Phase | Terminal Commit | Content Commit | Notes |
|-------|----------------|----------------|-------|
| Phase 43 | `0b3be9a` | Plan 03: `4f41431` (supervision pins); Plan 05: `2574c79` (freshness); Plan 09: `c782af6` (DEFER-04) | [VERIFIED: git log + 43-VERIFICATION wave record] |
| Phase 44 | `51c2e72` | Plan 07: `85a221c` (ZT/COBO forward-links + anti-paste) — terminal content | [VERIFIED: git log + 44-VERIFICATION wave record] |
| Phase 45 | `eb88750` | Plan 45-10: `3400bff` (atomic Wave 4 retrofits — terminal content commit) | [VERIFIED: git log + 45-VERIFICATION] |
| Phase 46 | `bcb0986` | `ce5ffc0` (Wave 2 atomic 5-file retrofit) / `8863361` (PROJECT.md evolution) | [VERIFIED: git log recent commits] |

**For "Closed Deferred Items" subsection (D-20 format):**
```markdown
## Closed Deferred Items (v1.4 → v1.4.1)

- **DEFER-01** (Audit allow-list expansion — C2 supervision pins) — closed Phase 43 commit `4f41431` (AEAUDIT-02 + Plans 43-03/43-04)
- **DEFER-02** (60-day freshness normalization) — closed Phase 43 commit `2574c79` (AEAUDIT-03 + Plan 43-05)
- **DEFER-03** (AOSP stub re-validation / Phase 41 VERIFICATION) — closed Phase 43 commit `c782af6` (AEAUDIT-04 + Plans 43-07/43-09)
- **DEFER-04** (Knox Mobile Enrollment) — closed Phase 44 commit `51c2e72` (AEKNOX-01..07 + Plans 44-01..44-07)
- **DEFER-05** (Per-OEM AOSP Expansion) — closed Phase 45 commit `eb88750` (AEAOSPFULL-01..09 + Plans 45-01..45-10)
- **DEFER-06** (COPE Full Admin) — closed Phase 46 commit `bcb0986` (AECOPE-01..04 + Plans 46-01..46-02)
```

Note: exact prose shape is Claude's Discretion per CONTEXT. The above follows the D-20 template verbatim.

---

## Common Pitfalls

### Pitfall 1: Confusing DEFER numbering across documents
**What goes wrong:** Plan 47-04 executor adds `re_audit_resolution: DEFER-06:` (PROJECT.md numbering) instead of `DEFER-10:` (audit-doc canonical numbering).
**Why it happens:** Two parallel enumeration systems; audit-doc uses 1-10, PROJECT.md uses 1-6.
**How to avoid:** Always use audit-doc DEFER-NN as the YAML key. The body text of each child key should cite both (e.g., "PROJECT.md DEFER-06 / audit DEFER-10").
**Warning signs:** YAML key value ≤ 6 for new keys (audit-doc DEFER-01..04 already existed; new Phase 47 keys are DEFER-01, DEFER-02, DEFER-08, DEFER-09, DEFER-10).

### Pitfall 2: Re-touching DEFER-04 closure block
**What goes wrong:** Plan 47-04 appends a second DEFER-04 child key or modifies the existing one.
**Why it happens:** DEFER-03 in PROJECT.md maps to DEFER-04 in audit-doc; Phase 43 already closed it.
**How to avoid:** Check that `re_audit_resolution:` mapping already has a DEFER-04 key before writing. Append new keys as siblings. D-15 explicitly forbids re-touching it.

### Pitfall 3: Glossary pin-shift without --self-test
**What goes wrong:** Plan 47-01 edits glossary line 16 (alphabetical index re-sort) and updates sidecar pin coordinates, but skips `regenerate-supervision-pins.mjs --self-test`. A shifted-but-unchecked pin later causes C2 harness FAIL at re-audit time.
**Why it happens:** Pin-shift is mechanical; easy to update the line number but miss an adjacent secondary entry.
**How to avoid:** Run `node scripts/validation/regenerate-supervision-pins.mjs --self-test` from repo root after every glossary edit. Must exit 0.
**Warning signs:** `--report` mode shows > 0 un-pinned Tier-1 occurrences.

### Pitfall 4: Plan 47-04 not using a fresh worktree
**What goes wrong:** Plan 47-04 terminal re-audit runs from the same worktree that authored Plans 47-01/02/03.
**Why it happens:** Convenience; worktree spawning adds setup friction.
**How to avoid:** Explicitly spawn a fresh executor worktree per Phase 42 D-02 / CONTEXT D-32. The auditor-independence rule is architectural — re-audit verdict must come from a distinct agent/worktree.

### Pitfall 5: Adding cope_banned_phrases as harness code instead of sidecar-only
**What goes wrong:** Executor modifies C9 run() function body in `v1.4.1-milestone-audit.mjs` to hardcode new patterns.
**Why it happens:** Misreading D-07 — the "no harness code edits for COPE phrases" rule applies to the BANNED-PHRASE LIST specifically.
**How to avoid:** C9 sidecar change = edit `cope_banned_phrases[]` array in JSON. C7 suffix list = edit the `suffixes` regex literal in the harness JS. These are different targets.

### Pitfall 6: Missing the Mermaid AOSP-Path leaf ordering scope
**What goes wrong:** Plan 47-01 re-sorts the Mermaid without checking whether AOSP branch leaves exist.
**Why it happens:** Current on-disk state: Mermaid terminates AOSP-Path at "Phase 39 — AOSP stub" (a single leaf). D-04 locks that Phase 47's Mermaid work is verification-only — the per-OEM leaves were NOT added to the Mermaid by Phase 45 (they added to admin-setup-android/ docs only).
**How to avoid:** Confirm Mermaid `AOSP_PATH[Phase 39 — AOSP stub]` single-leaf form is consistent with D-04 + Phase 45 scope. No per-OEM leaves to add. The "verify AOSP per-OEM leaf ordering" task is a coherence check, not a content authoring task.

### Pitfall 7: Status flip on v1.4 audit doc treated as harness freeze violation
**What goes wrong:** Executor refuses to edit `v1.4-MILESTONE-AUDIT.md` frontmatter because harness is frozen.
**Why it happens:** D-33 states "v1.4 harness FROZEN at commit 3c3a140" — misread as applying to the audit DOC.
**How to avoid:** D-33 freezes the HARNESS CODE (`v1.4-milestone-audit.mjs`). The audit DOC (`v1.4-MILESTONE-AUDIT.md`) is not frozen; Phase 43 Plan 09 already updated it for DEFER-04 closure. D-18 explicitly states doc metadata updates are allowed.

---

## Pin-Shift Maintenance Recipe (Plan 47-01)

The glossary line 16 re-sort may move entries (or may be order-preserving if already nearly-alphabetical). Current on-disk line 16 contains 24 index entries. Any insertion or deletion in the glossary before line 76 (Supervision H3 — supervision_exemptions line 76) shifts pin coordinates.

**Current supervision_exemptions[] pin coordinates in sidecar (verified):**

| File | Current Line | Reason |
|------|-------------|--------|
| `docs/_glossary-android.md` | 16 | Alphabetical index Supervision link |
| `docs/_glossary-android.md` | 46 | COBO Cross-platform note |
| `docs/_glossary-android.md` | 66 | Fully Managed Cross-platform note |
| `docs/_glossary-android.md` | 76 | Supervision H3 heading |
| `docs/_glossary-android.md` | 78 | Supervision blockquote body |
| `docs/_glossary-android.md` | 172 | MHS cross-platform note |
| `docs/_glossary-android.md` | 188 | Version History supervision row |
| `docs/reference/android-capability-matrix.md` | 78 | D-12 HTML comment opening |
| `docs/reference/android-capability-matrix.md` | 80 | D-12 HTML comment body |
| `docs/reference/android-capability-matrix.md` | 81 | D-12 HTML comment closing |
| `docs/reference/android-capability-matrix.md` | 83 | Cross-Platform Equivalences intro |
| `docs/reference/android-capability-matrix.md` | 87 | Paired-row header |
| `docs/reference/android-capability-matrix.md` | 88 | Paired-row body |

The capability matrix pins (lines 78-88) are UNAFFECTED by Plan 47-01 glossary edits. Only glossary pins need updating if the re-sort changes line counts. Run `--self-test` to confirm.

**Workflow:**
1. Edit `docs/_glossary-android.md` line 16 (alphabetical index re-sort).
2. Run `node scripts/validation/regenerate-supervision-pins.mjs --report` — note any shifted pins.
3. Update affected `"line"` values in `v1.4.1-audit-allowlist.json` supervision_exemptions[].
4. Update each affected pin's reason string with post-Plan-47-01 annotation.
5. Run `node scripts/validation/regenerate-supervision-pins.mjs --self-test` — must exit 0.
6. Commit docs/ + sidecar atomically.

---

## Auditor-Independence Protocol (Plan 47-04)

Per Phase 42 D-02 / CONTEXT D-32:

- Plans 47-01/02/03 execute in content-author worktrees.
- Plan 47-04 spawns a DISTINCT executor worktree pinned to the post-Plan-47-03 commit SHA.
- The auditor worktree runs `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` and records the exact stdout output.
- The auditor worktree then appends `re_audit_resolution:` sibling child keys to `.planning/milestones/v1.4-MILESTONE-AUDIT.md` and flips the frontmatter status.
- Commit is made from this distinct worktree.

**Phase 42 precedent:** Plan 42-06 spawned a fresh worktree for the v1.4 audit run ("gsd-executor agent a23e52fe distinct from Plans 42-02/42-03/42-04 content-author worktree agents per D-02 auditor-independence rule; fresh worktree spawn verified at execution start" — per v1.4-MILESTONE-AUDIT.md `performed_by` field, line 25).

---

## Current On-Disk State: 3 SC#1 Hotspot Files (Plan 47-01 Baseline)

### 1. `docs/_glossary-android.md` line 16 (alphabetical index)

**Current state (verified 2026-04-25):**
```
[afw#setup](#afw-setup) | [AMAPI](#amapi) | [BYOD](#byod) | [COBO](#cobo) | [COPE](#cope) | [Corporate Identifiers](#corporate-identifiers) | [Dedicated](#dedicated) | [DPC](#dpc) | [EMM](#emm) | [Entra Shared Device Mode](#entra-shared-device-mode) | [Fully Managed](#fully-managed) | [Knox](#knox) | [KME](#kme) | [KPE](#kpe) | [Managed Google Play](#managed-google-play) | [Managed Home Screen](#managed-home-screen) | [OEMConfig](#oemconfig) | [Play Integrity](#play-integrity) | [Private Space](#private-space) | [Supervision](#supervision) | [User Enrollment](#user-enrollment) | [Work Profile](#work-profile) | [WPCO](#wpco) | [Zero-Touch Enrollment](#zero-touch-enrollment)
```

This is 24 entries. Alphabetical order check: afw#setup / AMAPI / BYOD / COBO / COPE / Corporate Identifiers / Dedicated / DPC / EMM / Entra Shared Device Mode / Fully Managed / Knox / KME / KPE / Managed Google Play / Managed Home Screen / OEMConfig / Play Integrity / Private Space / Supervision / User Enrollment / Work Profile / WPCO / Zero-Touch Enrollment.

**Already substantially alphabetical.** The re-canonicalization task verifies all H3 headings under their parent H2 sections are consistent with the index ordering — the index line itself may need minor adjustment (e.g., K-entries: Knox / KME / KPE are in correct sub-order).

### 2. `docs/admin-setup-android/00-overview.md` Mermaid

**Current state (verified 2026-04-25):** 6-branch Mermaid:
- COBO / BYOD WP / Dedicated → MGP
- Zero-Touch Enrollment → MGP → ZT
- AOSP → AOSP_PATH (single leaf "Phase 39 — AOSP stub")
- Knox - KME Samsung-only → KNOX

**Hotspot scope:** Verify AOSP leaf and Knox leaf ordering consistency. The Mermaid does NOT have individual per-OEM AOSP leaves (that was out of Phase 45 scope per D-04). Setup Sequence numbered list items 1/2/3 correspond to branches.

### 3. `docs/reference/android-capability-matrix.md`

Per Phase 46 VERIFICATION truth #11: COPE column at index 1 across all 5 sub-tables. Per Phase 44 VERIFICATION Plan 04: Knox row in capability matrix populated. Per Phase 45 Plan 45-10: lines 121-127 anchor + AOSP OEM matrix link. The re-canonicalization verifies cross-table consistency.

---

## Runtime State Inventory

> Greenfield-extension phase. No rename/refactor. Runtime state inventory is not applicable to Phase 47 scope.

None — verified by inspection: Phase 47 edits documentation files, a harness .mjs file, a sidecar JSON, and a planning artifact. No database records, no registered services, no OS-level state, no secret keys, and no build artifacts are affected.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Run `v1.4.1-milestone-audit.mjs` | ✓ | ambient (harness shebang confirmed) | — |
| Git worktree | Plan 47-04 auditor-independence | ✓ | ambient (project is a git repo) | — |
| `regenerate-supervision-pins.mjs` | Plan 47-01 pin-shift verification | ✓ | Phase 43 Plan 04 shipped at `0a9cac0` | — |
| CI (`audit-harness-integrity.yml`) | Post-commit sidecar parse | ✓ | Phase 43 Plan 08 shipped at `54bbc34` | — |

**Missing dependencies with no fallback:** None.

---

## Validation Architecture

> `workflow.nyquist_validation` is absent from `.planning/config.json` — treated as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom Node.js harness (not Jest/Vitest/pytest) — `scripts/validation/v1.4.1-milestone-audit.mjs` |
| Config file | `scripts/validation/v1.4.1-audit-allowlist.json` (sidecar) |
| Quick run command | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| Full suite command | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| Pin helper | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEINTEG-01 | SC#1 hotspots re-canonicalized; glossary alphabetical order correct; matrix column coherence; Mermaid leaf order consistent | Structural + harness-run | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (C2 supervision PASS = pins in sync; C5 freshness PASS = all docs within 60d) + `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ✅ harness + helper exist |
| AEINTEG-02 | C4 expanded regex catches Knox/COPE/per-OEM links in deferred files; C6 covers 6 AOSP-scoped files; C7 suffix list recognizes 5-SKU forms; C9 detects 7 banned-phrase patterns | Harness-run | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (C4 PASS; C6/C7/C9 informational with correct counts) | ✅ harness exists |
| AEINTEG-03 | Terminal re-audit exit 0; `v1.4-MILESTONE-AUDIT.md` has `re_audit_resolution:` sibling keys for DEFER-01/02/05/06 (audit numbering); frontmatter `status: passed` | Harness-run + manual YAML check | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (exit 0, 8/8 PASS); grep `status: passed` `.planning/milestones/v1.4-MILESTONE-AUDIT.md` | ✅ harness exists |
| AEINTEG-04 | PROJECT.md has 24 Active→Validated flips; "Closed Deferred Items" subsection present; footer refreshed; zero "deferred to v1.4.1" in docs/ | Grep terminal sanity | `grep -r "deferred to v1.4.1" docs/ \| wc -l` (expect 0); `grep "Closed Deferred Items" .planning/PROJECT.md` | ✅ grep available |

### Sampling Rate

- **Per plan commit:** `node scripts/validation/v1.4.1-milestone-audit.mjs` (quick, no --verbose)
- **Per wave merge:** `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` + `node scripts/validation/regenerate-supervision-pins.mjs --self-test`
- **Phase gate (Plan 47-04):** Full harness verbose run from fresh worktree; exit 0 mandatory before appending re_audit_resolution

### Wave 0 Gaps

None — existing test infrastructure covers all phase requirements. The harness, sidecar, pin helper, and CI workflow are all on disk from Phases 43-46.

---

## Security Domain

> `security_enforcement` is absent from `.planning/config.json` — treated as enabled. However, this phase makes no changes to authentication, session management, access control, cryptography, or APIs. The ASVS categories below are assessed against the actual phase scope.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Phase 47 edits documentation and validation harness files only |
| V3 Session Management | No | No session state involved |
| V4 Access Control | No | No authorization changes |
| V5 Input Validation | No | Harness reads only local filesystem files via Node.js `fs.readFileSync` (no user input) |
| V6 Cryptography | No | No cryptographic operations |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Regex catastrophic backtracking in C4/C7 | Denial of Service | Both regexes use simple alternation on bounded token sets; no unbounded `.*` cross-line; [ASSUMED low risk per harness pattern analysis] |
| Sidecar JSON injection via crafted `reason` strings | Tampering | Sidecar is committed to git; no runtime user input; CI enforces parse [VERIFIED: Phase 43 Plan 08 CI job] |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| v1.4 harness (5 checks, frozen) | v1.4.1 harness (8 checks: +C6/C7/C9 informational) | Phase 43 Plan 02 commit be1087b | Phase 47 extends C4/C6/C7/C9 scope, not check count |
| `cope_banned_phrases[]` with 3 patterns | Extended to 8 patterns (Phase 46 D-31 full set) | Phase 47 Plan 47-02 | Informational metric more accurate post-COPE ship |
| C6 targets: 1 file (06-aosp-stub.md) | Extended to 6 files (+09-13 per-OEM) | Phase 47 Plan 47-02 | PITFALL-7 preservation check now covers full per-OEM fleet |
| v1.4-MILESTONE-AUDIT.md with `status: tech_debt` | `status: passed` + `re_audit_resolution:` for 5 additional DEFERs | Phase 47 Plan 47-04 | Milestone formally complete; no zombie deferrals bleeding to v1.5 |
| 24 requirements in Active section of PROJECT.md | All 28 v1.4.1 reqs in Validated section | Phase 47 Plan 47-03 | Full traceability closure for v1.4.1 milestone |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Mermaid in `00-overview.md` does not need per-OEM AOSP leaves added — current single "Phase 39 — AOSP stub" leaf is the correct post-Phase-45 form per D-04 | Current On-Disk State §2 | If wrong: Plan 47-01 would need to add 5 AOSP per-OEM leaves to Mermaid — low risk; D-04 explicitly scopes out this work |
| A2 | Phase 43 Plan 03 commit `4f41431` is the appropriate closing SHA for DEFER-01 (allow-list expansion) | Terminal Commit SHAs | If wrong: D-20 bullet would cite wrong SHA — low risk; can be corrected at Plan 47-03 authoring time by checking git log |
| A3 | "removed" in current cope_banned_phrases[] (not in D-31 list) should be KEPT (additive-only contract) | C9 Sidecar Extension example | If wrong: slightly different array; no harness impact since additive-only — very low risk |
| A4 | Glossary alphabetical index line 16 is already substantially correct and requires only minor coherence verification (not a full structural rewrite) | Current On-Disk State §1 | If wrong: re-canonicalization is slightly larger; still single-file atomic commit |

**If this table is non-empty:** Claims A1-A4 are [ASSUMED] based on on-disk file reads plus locked CONTEXT decisions. A1 and A4 carry the most planning impact; verify at Plan 47-01 authoring time.

---

## Open Questions

1. **Exact line-shift delta from Plan 47-01 glossary edit**
   - What we know: Current glossary alphabetical index on line 16 has 24 entries in substantially alphabetical order.
   - What's unclear: Until the actual re-sort edit is made, we don't know how many lines shift and by how much. The number of affected supervision_exemptions[] pins is deterministic post-edit.
   - Recommendation: Plan 47-01 executor runs `regenerate-supervision-pins.mjs --report` immediately after glossary edit to get exact delta before updating sidecar.

2. **Whether capability matrix cross-table coherence requires any content edits**
   - What we know: Phase 46 VERIFICATION confirms COPE column index 1 across all 5 sub-tables; Phase 45 Plan 10 confirms AOSP anchor at 121-127.
   - What's unclear: Whether the "column-ordering coherence" check finds any actual drift that requires editing, or is pure verification (no-op edit).
   - Recommendation: Plan 47-01 executor reads all 5 sub-table headers and compares column order. If already coherent: no edit needed (verification-only). If drift found: surgical column-label edit per D-04 scope.

---

## Sources

### Primary (HIGH confidence)
- `scripts/validation/v1.4.1-milestone-audit.mjs` live read — exact line numbers for C4 (228), C6 targets (293-296), C7 suffix (314), current regex/token literals
- `scripts/validation/v1.4.1-audit-allowlist.json` live read — current 3 cope phrases, 18 supervision pins, 4 safetynet pins
- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` live read (lines 1-169) — frontmatter, DEFER-01..10 enumeration, re_audit_resolution DEFER-04 schema
- `.planning/phases/47-integration-re-audit/47-CONTEXT.md` — D-01..D-40 all locked decisions
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-VERIFICATION.md` — wave execution record with commit SHAs
- `.planning/phases/44-knox-mobile-enrollment/44-VERIFICATION.md` — terminal commit `51c2e72`
- `.planning/phases/45-per-oem-aosp-expansion/45-VERIFICATION.md` — terminal commit `eb88750`, atomic `3400bff`
- `.planning/phases/46-cope-full-admin/46-VERIFICATION.md` — terminal commit `bcb0986`, atomic `ce5ffc0`
- `git log --oneline` — confirmed all commit SHAs

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` — phase sequencing, accumulated context, research flags
- `.planning/REQUIREMENTS.md` lines 48-53 — AEINTEG-01..04 verbatim
- `docs/_glossary-android.md` lines 1-30 — current line 16 alphabetical index state
- `docs/admin-setup-android/00-overview.md` — current Mermaid 6-branch state

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all files verified by live reads
- Architecture: HIGH — all decisions locked in CONTEXT.md; dependency DAG is explicit
- Code examples: HIGH — regex/array literals copied from verified live harness with locked D-07 additions
- DEFER reconciliation: HIGH — audit-doc DEFER-01..10 + PROJECT.md DEFER-01..06 verified by cross-reading both documents
- Terminal SHAs: HIGH — verified via git log + VERIFICATION.md wave records
- Pitfalls: HIGH — derived from explicit CONTEXT decisions and prior phase precedents

**Research date:** 2026-04-25
**Valid until:** 2026-05-25 (stable documentation infrastructure; no external dependencies)
