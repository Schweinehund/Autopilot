# Phase 67: Corpus Surgical Sweeps (Pillar A — Low-Risk Warm-Up) - Pattern Map

**Mapped:** 2026-05-26
**Files analyzed:** 11 (5 corpus-edit targets + 1 sidecar + 5 plan/artifact files)
**Analogs found:** 11/11 (100% — every Phase 67 deliverable has a direct in-repo precedent at HEAD)

**Phase 67 is a "Low-Risk Warm-Up" against an already-validated harness.** Every pattern below is a mechanical copy from Phase 64/65/66 precedent. There is NO new authoring of conventions — the planner's job is to map existing patterns onto the locked D-01..D-04 decisions.

---

## File Classification

### Corpus Files (MODIFIED, surgical line edits)

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/admin-setup-ios/05-app-deployment.md` | documentation (admin-setup, ADE) | surgical-line-replace + block-insert + tail-table append + frontmatter bump | Phase 64 `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` (OP-10 callout); existing tail-table at L222-227 of THIS file (self-precedent for VH row append) | EXACT (callout) + SELF (tail-table) |
| `docs/admin-setup-macos/04-app-deployment.md` | documentation (admin-setup, ADE) | surgical-line-replace + block-insert + tail-table append + frontmatter bump | Same as iOS file above; tail-table self-precedent at L160-165 | EXACT (callout) + SELF (tail-table) |
| `docs/admin-setup-macos/01-abm-configuration.md` | documentation (admin-setup, ABM) | surgical-line-replace + tail-table append + frontmatter bump (Branch B only) | iOS/macOS file tail-table convention above | role-match (admin-setup) |
| `docs/_glossary-macos.md` | documentation (glossary, PITFALL-6 scoped) | tail-row-append inside existing `## Version History` H2 + frontmatter bump (Branch B only) | The same file's own existing 4-row table at L121-128 (self-precedent: 4 prior phase rows ending 2026-04-13) | EXACT SELF |

### Sidecar (MODIFIED, ANNOTATE-not-remove)

| File | Role | Data Flow | Closest Analog | Match Quality |
|------|------|-----------|----------------|---------------|
| `scripts/validation/v1.6-audit-allowlist.json` | config (validator sidecar) | per-entry JSON field append (additive only) | Phase 66-02 atomic commit `3a9a671` populated the same `c13_rotting_external` block initially; same compact-object-per-line convention | EXACT (same file, same block) |

### Planning Artifacts (CREATED)

| File | Role | Data Flow | Closest Analog | Match Quality |
|------|------|-----------|----------------|---------------|
| `.planning/phases/67-.../67-VERIFICATION.md` | planning-artifact (close-gate report) | static report (SC checklist + tool stdout capture + validator exit table) | `.planning/milestones/v1.6-phases/66-.../66-VERIFICATION.md` (Phase 66 close-gate); `.planning/milestones/v1.6-phases/65-.../65-VERIFICATION.md` (Phase 65 close-gate, has Section B "Commands Run + Exit Codes" table format) | EXACT (66) + Section-B (65) |
| `.planning/phases/67-.../67-ANCHOR-INVENTORY.md` | planning-artifact (PITFALL-6 anchor snapshot) | static heading-table (Line / Level / Heading / Slug / Notes) | `.planning/milestones/v1.6-phases/65-.../65-ANCHOR-INVENTORY.md` (canonical format; 6 files × H2/H3 anchor tables) | EXACT |
| `.planning/phases/67-.../67-01-PLAN.md` | planning-artifact (branchable execute plan) | YAML frontmatter + objective + read_first + action waves + verify + done | `.planning/milestones/v1.6-phases/66-.../66-02-PLAN.md` (atomic harness commit plan; closest analog for sidecar JSON edit + pre-commit dry-run pattern) | role-match (sidecar edit + dry-run) |
| `.planning/phases/67-.../67-02-PLAN.md` | planning-artifact (atomic execute plan) | same plan shape | `.planning/milestones/v1.6-phases/66-.../66-02-PLAN.md` (atomic-within-plan precedent; 4-5 file indivisible commit + pre-commit dry-run protocol) | EXACT (atomic-within-plan) |
| `.planning/phases/67-.../67-03-PLAN.md` | planning-artifact (close-gate execute plan) | same plan shape | `.planning/milestones/v1.6-phases/66-.../66-05-PLAN.md` (close-gate plan; chain re-run + VERIFICATION.md authoring + traceability flips) | EXACT |

---

## Pattern Assignments

### `docs/admin-setup-ios/05-app-deployment.md` + `docs/admin-setup-macos/04-app-deployment.md` (SWEEP-02 callout + table-cell rename + VH row)

**Primary analog (callout block):** `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` lines 30-43

**OP-10 callout pattern** (Phase 64 precedent, lines 30-43):
```markdown

This runbook covers the day-to-day operational procedures for managing an Organizational Unit's
VPP (Volume Purchase Program) catalog in Apple Business. It covers four areas: claiming a
content token, transferring licenses between OUs, purchasing apps, and scoping payment methods.

**Label disambiguation:** Apple calls this artifact a **content token**; Microsoft Intune labels
the same artifact an **Apple VPP token**. They are the same object — a cryptographic credential
that ties purchased app licenses to an OU. This disambiguation matters when following both
Apple Business and Intune documentation simultaneously. All steps in this runbook use Apple's
terminology ("content token").

## Required Role & Permission
```

**Adaptation for Phase 67:** CONTEXT.md D-03 specifies a `> **Note:**` blockquote variant (not bold inline prose). The blockquote format is the IDENTICAL information density — Phase 64 precedent uses **bold** label-disambiguation prose, Phase 67 D-03 uses `>` blockquote because the insertion point is right above a table (not above a section heading). The semantic equivalence is preserved: "Apple calls this … Intune labels it as … same artifact, different vendor terminology."

**Exact text to insert** (verbatim from CONTEXT.md D-03 row 2a / 6a):
```markdown
> **Note:** Apple calls this artifact a "content token" (formerly "VPP location token"); Microsoft Intune labels it "Apple VPP token" under `Tenant administration > Connectors and tokens > Apple VPP tokens`. Same artifact, different vendor terminology.

```

**Surrounding-blank-line discipline:** One blank line BEFORE the `>` block (separating from preceding prose); one blank line AFTER (separating from the `| Component | Renewal Period | …` table header). Mirrors Phase 64 `11-vpp-catalog-runbook.md:30` (blank line before) + `:39-40` (blank line after, before next H2).

---

**Secondary analog (tail-table Version History row append):** Self-precedent at `docs/admin-setup-ios/05-app-deployment.md` lines 222-227

**Existing tail-table at L222-227** (the unheaded `| Date | Change | Author |` table after `---` separator):
```markdown
---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |
| 2026-04-16 | Initial version — iOS/iPadOS app deployment guide with Key Concepts section (managed vs unmanaged, VPP device vs user licensing, silent install boundary table), 4-column deployment type comparison, per-type sections with supervised-only silent install callouts, managed app status verification in three admin-center locations, configuration-caused failures, and VPP/LOB renewal cadences | -- |
```

**Row append pattern for Phase 67 (CONTEXT.md D-03 VH-iOS row, verbatim):**
```markdown
| 2026-05-26 | Phase 67 (SWEEP-02): renamed "VPP (Apps and Books) location token" to "content token" per Apple 2026-04-14 rebrand (L71, L201); added Apple-vs-Intune label disambiguation callout above Renewal/Maintenance table; PITFALLS.md CI-2 closure | -- |
```

**Conventions preserved:**
- Column shape `| Date | Change | Author |` byte-identical to existing rows
- `-- ` placeholder in Author column (consistent with all 2 existing rows)
- Append at FILE END (insert as last row in the table; do not promote to H2)
- Date format ISO `2026-05-26`

**macOS equivalent at L160-165** (same structure, fewer rows):
```markdown
---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- DMG, PKG (managed/unmanaged), VPP with comparison table, per-type prerequisites, VPP renewal | -- |
```
(Phase 67 D-03 VH-mac row appended identically.)

---

**Frontmatter `last_verified:` bump pattern**

**Existing frontmatter** at `docs/admin-setup-ios/05-app-deployment.md:1-7`:
```yaml
---
last_verified: 2026-04-18
review_by: 2026-07-17
applies_to: ADE
audience: admin
platform: iOS
---
```

**Phase 67 edit:** `last_verified: 2026-04-18` → `last_verified: 2026-05-26`. The `review_by:` and other fields stay byte-identical. Same pattern for macOS (`last_verified: 2026-04-14` → `2026-05-26`).

---

### `docs/_glossary-macos.md` (SWEEP-02 mandatory + SWEEP-01 Branch B optional VH H2 row)

**Analog:** SELF — the existing `## Version History` H2 at line 121 already has 4 phase-history rows from Phases 59 / 42 / 32 / initial.

**Existing H2 table at L121-128** (verbatim):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-05 | Phase 59 (CLEAN-08): appended `> See also:` lines INSIDE existing `> **Windows equivalent:**` blockquotes for collision-matrix terms (Account-Driven User Enrollment, ADE, Await Configuration, Setup Assistant, Supervision, ABM, VPP, MAM-WE); existing `> **Windows equivalent:**` labels PRESERVED verbatim per D-15 anti-rename | -- |
| 2026-04-24 | Phase 42: added Android Enterprise Provisioning Glossary see-also to continuation banner (AEAUDIT-03) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection), updated VPP with iOS device-licensed vs user-licensed distinction, new ## App Protection (MAM) H2 | -- |
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
```

**Conventions confirmed:**
- Column shape `| Date | Change | Author |` (same 3-column form as tail-tables)
- `-- ` placeholder in Author column (no author attribution convention)
- Rows ordered **newest-first** (descending date) — Phase 67's new row inserts at line 124 (immediately after the `|------|` separator, becoming the new newest row)
- ISO date format (`YYYY-MM-DD`)

**Phase 67 row to append (SWEEP-02 mandatory, planner-discretion phrasing per CONTEXT.md Claude's Discretion):**
```markdown
| 2026-05-26 | Phase 67 (SWEEP-02): coordinating row for VPP location token → content token surgical rename in admin-setup-ios/05- + admin-setup-macos/04-app-deployment.md (PITFALLS.md CI-2 closure) | -- |
```

**Phase 67 row to append (SWEEP-01 Branch B only — IF Apple URL drifted):**
```markdown
| 2026-05-26 | Phase 67 (SWEEP-01): updated business.apple.com reference at L64 (PITFALLS.md CI-1 closure; Branch B surgical update) | -- |
```

**Frontmatter bump:** `last_verified: 2026-05-05` → `last_verified: 2026-05-26` ONLY IF a row is actually appended (i.e., SWEEP-02 always, SWEEP-01 Branch B conditionally). Currently at line 2.

**PITFALL-6 anchor stability invariant:**
- Insert the new row INSIDE the existing table (between the `|------|------|--------|` separator at line 124 and the existing top row at line 125) OR at the bottom of the table — both work. Newest-first convention prefers position 1 (immediately after separator).
- DO NOT add blank lines between rows. DO NOT promote any anchor.
- Anchors AT OR ABOVE line 121 (`## Version History` H2) must remain unshifted.

---

### `scripts/validation/v1.6-audit-allowlist.json` (sidecar per-entry annotation)

**Analog:** SELF — this file was last populated by Phase 66-02 atomic commit `3a9a671` (recorded in `66-VERIFICATION.md:120` SHA registry). Phase 67 annotates entries INSIDE the same `c13_rotting_external` block per ANNOTATE-not-remove mode (CONTEXT.md D-04).

**Existing entries** (verbatim from `v1.6-audit-allowlist.json:79-93`, compact single-line-per-entry shape):

```json
  "c13_rotting_external": {
    "ci_1_abm_urls": [
      { "url": "https://business.apple.com", "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 92, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand; included for completeness — quarterly check confirms reachability", "category": "live_url_quarterly_check" },
      { "url": "https://business.apple.com", "file": "docs/admin-setup-macos/01-abm-configuration.md", "line": 52, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand", "category": "live_url_quarterly_check" },
      { "url": "https://business.apple.com", "file": "docs/admin-setup-macos/04-app-deployment.md", "line": 105, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand", "category": "live_url_quarterly_check" },
      { "url": "https://business.apple.com", "file": "docs/_glossary-macos.md", "line": 64, "reason": "ABM live portal URL in definitional prose; retained per Apple newsroom post-rebrand", "category": "live_url_quarterly_check" }
    ],
    "ci_2_vpp_location_token": [
      { "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 71, "term": "VPP (Apps and Books) location token", "context": "prerequisites bullet", "reason": "legacy 'VPP location token' term retained per Q5(b) no-corpus-sweep contract; rename deferred to v1.7+ CI-2", "category": "legacy_term_surgical_rename_candidate" },
      ...
```

**Phase 67 SWEEP-01 annotation pattern** (ANNOTATE-not-remove; one new field per existing entry):

```json
{ "url": "https://business.apple.com", "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 92, "reason": "ABM live portal URL; retained per Apple newsroom post-rebrand; included for completeness — quarterly check confirms reachability", "category": "live_url_quarterly_check", "last_revalidated": "2026-05-26" }
```

**Phase 67 SWEEP-02 annotation pattern** (per CONTEXT.md D-04; one new field per existing entry):

```json
{ "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 71, "term": "VPP (Apps and Books) location token", "context": "prerequisites bullet", "reason": "legacy 'VPP location token' term retained per Q5(b) no-corpus-sweep contract; rename deferred to v1.7+ CI-2", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_05_26": true }
```

**Conventions preserved:**
- Single-line compact object per entry (no pretty-print expansion of existing entries)
- Append new field at END of object (before closing `}`) — matches the precedent of `category` being the last field in pre-Phase-67 state
- Preserve 4-entry shape in `ci_1_abm_urls` and 6-entry shape in `ci_2_vpp_location_token` (V-66-02 shape check at `check-phase-66.mjs:85-112` enforces presence/object-shape but not entry counts; verified at RESEARCH.md §Validation Architecture)
- DO NOT modify the `quarterly_audit` metadata block at lines 113-118 (per CONTEXT.md canonical_refs line 182: "DO NOT MODIFY")

**JSON parse verification** (per RESEARCH.md Pitfall 1):
```powershell
node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.6-audit-allowlist.json','utf8')); console.log('OK')"
```
Run immediately after each edit. Validator `check-phase-66.mjs` V-66-02 fails fast on parse errors.

---

### `.planning/phases/67-.../67-VERIFICATION.md` (close-gate artifact)

**Primary analog:** `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-VERIFICATION.md`

**YAML frontmatter pattern** (lines 1-14 of 66-VERIFICATION.md):
```yaml
---
phase: 66-apple-business-validation-tooling-closure-milestone-audit
verified: 2026-05-25
status: passed
score: 5/5 SC + AUDIT-14/15 contracts satisfied
v66_final_state: "23 PASS / 0 FAIL / 5 SKIPPED (V-66-06 chicken-and-egg resolved at Wave 5)"
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 4/5 plans complete
  gaps_closed: [...]
  gaps_remaining: []
  regressions: []
---
```

**Phase 67 frontmatter adaptation:**
```yaml
---
phase: 67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up
verified: 2026-05-26
status: passed
score: 4/4 SC satisfied (SWEEP-01 + SWEEP-02 closure)
v67_final_state: "23 PASS / 0 FAIL / 5 SKIPPED (modulo CHAIN_SKIP {48,51,58,60,61} — same as v1.6 close)"
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 2/3 plans complete
  gaps_closed: []
  gaps_remaining: []
  regressions: []
---
```

**SC satisfaction block pattern** (66-VERIFICATION.md:28-82 demonstrates the SC#1..SC#5 evidence format; Phase 67 has SC#1-4 per ROADMAP.md:275-285):

```markdown
## Success Criteria Satisfaction (ROADMAP.md:275-285 SC#1-4)

### SC#1: [SC text from ROADMAP.md]

**Evidence:**
- [bulleted concrete evidence with file refs, line numbers, validator names, commit SHAs]
- ...

**Closing commit:** [SHA from `git log`]

### SC#2: ...

[repeat for SC#2, SC#3, SC#4]
```

**V-NN final state table pattern** (66-VERIFICATION.md:97-113):
```markdown
## V-66-NN Final State (Post-Wave-5 LOCAL re-run)

| Assertion | State | Verified by |
|-----------|-------|-------------|
| V-66-01 | PASS | C11 +6 LOCKED tokens at v1.6-milestone-audit.mjs:577 (Wave 2 commit `3a9a671`) |
| ... | ... | ... |
| V-66-CHAIN-{48..65} | 13 PASS + 5 SKIPPED | check-phase-{48..65}.mjs subprocess chain; SKIP {48,51,58,60,61} per CHAIN_SKIP |
| V-66-AUDIT | PASS | v1.6-milestone-audit.mjs subprocess exit 0 (15/15 PASS) |

**Final tally:** 23 PASS + 5 SKIPPED + 0 FAIL; exit 0
```

**Phase 67 adaptation:** No new V-NN assertions (Phase 67 introduces no validator; relies on existing C11/C15 inertia + V-66-02 sidecar shape stability). Phase 67's "final state" table mirrors the structure but reports the v1.6 chain pass-through:
- Row 1: `v1.6-milestone-audit.mjs` — PASS (15/15) — both C11 and C15 inert on Phase 67 edited surface (CONTEXT.md D-03 line 99; RESEARCH.md A3)
- Row 2: `check-phase-66.mjs` — PASS (23 PASS / 5 SKIPPED / 0 FAIL) — same as v1.6 close
- Row 3: `check-phase-62.mjs` — PASS (29 PASS / 5 SKIPPED) — V-62-SIDECAR c16-only assertion unchanged
- Row 4: `markdown-link-check@3.14.2` — alive (4/4 URLs) — Plan 67-01 Wave 1 capture

---

**Secondary analog (commands run + exit code table):** `.planning/milestones/v1.6-phases/65-apple-business-l1-l2-hub-navigation-integration/65-VERIFICATION.md` lines 114-124

**Section B pattern:**
```markdown
## Section B — Commands Run + Exit Codes

| Command | Exit Code | Summary Line |
|---------|-----------|--------------|
| `node scripts/validation/v1.6-milestone-audit.mjs` | 0 | `Summary: 15 passed, 0 failed, 0 skipped` |
| `node scripts/validation/check-phase-62.mjs` | 0 | `Result: 29 PASS, 0 FAIL, 5 SKIPPED` |
| `node scripts/validation/check-phase-63.mjs` | 0 | `Result: 27 PASS, 0 FAIL, 5 SKIPPED` |
| `node scripts/validation/check-phase-64.mjs` | 0 | `Result: 24 PASS, 0 FAIL, 5 SKIPPED` |
| `node scripts/validation/check-phase-65.mjs` | 0 | `Result: 28 PASS, 0 FAIL, 5 SKIPPED` |
```

Phase 67 includes a 6th row (`check-phase-66.mjs`) and prepends a SWEEP-01-specific block per RESEARCH.md Example 10 (markdown-link-check tool output + corroborating curl HEAD evidence).

---

**SWEEP-01 H2 subsection pattern** (RESEARCH.md Example 10 — the only Phase 67-novel block; not a Phase 66 precedent because Phase 66 had no URL-probe deliverable):

```markdown
## SWEEP-01: ABM URL Live-State Verification (2026-05-26)

### Mechanism
`markdown-link-check@3.14.2` invoked locally via `node -e "require('markdown-link-check')(...)"` — same pin as `audit-harness-v1.6-integrity.yml:167` `rotting-external-quarterly` job; IS-equivalent evidence per CONTEXT.md D-02.

### Tool Output (primary evidence)
```json
[{ "link": "https://business.apple.com", "status": "alive", "statusCode": 200, "err": null }]
```
Captured: 2026-05-26 HH:MM:SS UTC; Exit code: 0

### Corroborating Evidence (secondary — curl HEAD)
```
HTTP/1.1 200 OK
Server: Apple
[other headers...]
```

### Outcome
**Branch A** — All 4 ci_1_abm_urls entries confirmed alive. Sidecar annotated; no corpus edits. Quarterly cron continues monitoring (next fire 2026-07-01).
```

---

### `.planning/phases/67-.../67-ANCHOR-INVENTORY.md` (PITFALL-6 pre-edit snapshot)

**Analog:** `.planning/milestones/v1.6-phases/65-apple-business-l1-l2-hub-navigation-integration/65-ANCHOR-INVENTORY.md`

**Document-level frontmatter pattern** (65-ANCHOR-INVENTORY.md:1-8):
```markdown
# Phase 65 Pre-Edit Anchor Inventory

**Captured:** 2026-05-22 (Wave 1 — BEFORE any Wave 2-4 edits)
**Purpose:** PITFALL-6 / SC#5 anti-regression baseline. Wave 3 + Wave 4 tasks verify against this inventory. Any H2/H3 anchor slug present in this document that is ABSENT post-edit constitutes a PITFALL-6 violation and a Wave 3 / Wave 4 rollback condition.

**Files covered:** 6 (the one sanctioned exception + 5 hub files)
```

**Phase 67 frontmatter adaptation** (single file in scope per CONTEXT.md D-01):
```markdown
# Phase 67 Pre-Edit Anchor Inventory

**Captured:** 2026-05-26 (Plan 67-02 Wave 1 — BEFORE SWEEP-02 edits)
**Purpose:** PITFALL-6 / D-01 anti-regression baseline for the single file in STATE.md:125 scope. Wave 6 post-edit diff verifies zero anchor shift at or above line 121 (`## Version History` H2). Any anchor present pre-edit that is missing or line-shifted post-edit constitutes a PITFALL-6 violation and a rollback condition.

**Files covered:** 1 (`docs/_glossary-macos.md` — sole PITFALL-6 scope file per STATE.md:125 "capability matrices, glossaries, hub files")
```

**Per-file anchor table pattern** (65-ANCHOR-INVENTORY.md:16-30 for File 1):
```markdown
## File 1: `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`

**Total line count:** 201
**Role:** Canonical admin-context runbook; Wave 4 atomic-trio back-link append target (D-04a)
**Insertion point:** After line 194 (inside `## Cross-References` tail), before blank line + `## Version History`

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| 31 | H1 | `Shared iPad Passcode Reset (3-Path Decision Matrix)` | `shared-ipad-passcode-reset-3-path-decision-matrix` | H1 title — not C16 load-bearing |
| 40 | H2 | `Required Role & Permission` | `required-role--permission` | V-64-08 asserts this present |
| 66 | H3 | `Path A — Apple Business UI Reset (L1-delegated, preferred)` | `path-a--apple-business-ui-reset-l1-delegated-preferred` | Part of Path A < B < C ordering (V-64-03) |
| ... | ... | ... | ... | ... |
| 196 | H2 | `Version History` | `version-history` | append point boundary sentinel |
```

**Phase 67 adaptation for `_glossary-macos.md`:**
```markdown
## File 1: `docs/_glossary-macos.md`

**Total line count:** 128 (per RESEARCH.md A6)
**Role:** Glossary; SWEEP-02 mandatory coordinating row + SWEEP-01 Branch B optional row appended to `## Version History` H2 at line 121
**Insertion point:** INSIDE existing H2 table (between separator line 124 and existing newest row at line 125), newest-first convention

### H2/H3 Anchor Table

| Line | Level | Heading Text | Slug | Notes |
|------|-------|-------------|------|-------|
| [TBD from Select-String capture per RESEARCH.md Example 7] | ... | ... | ... | ... |
| 121 | H2 | `Version History` | `version-history` | MUST remain at line 121 post-edit (PITFALL-6 anti-regression boundary) |
```

**Capture mechanism** (RESEARCH.md Example 7, PowerShell):
```powershell
Select-String -Path docs/_glossary-macos.md -Pattern '^#' | ForEach-Object {
  "{0,4} | {1}" -f $_.LineNumber, $_.Line
} | Out-File .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-glossary-anchors-pre.txt -Encoding utf8
```

**Load-bearing anchor flag pattern** (65-ANCHOR-INVENTORY.md:32-35):
```markdown
### Load-Bearing Anchor Flags

- `#cross-references` (line 187): D-04a append target. Wave 4 appends at `:194` (inside this H2's body). The slug MUST remain `#cross-references` — the append does NOT rename the heading.
- ...
```

**Phase 67 adaptation:**
```markdown
### Load-Bearing Anchor Flags

- `#version-history` (line 121): SWEEP-02 mandatory row append target (+ SWEEP-01 Branch B optional). The H2 slug MUST remain `#version-history` post-edit (append does not rename the heading); line position MUST remain 121 (insert is INSIDE the table at L125, no new H2 promoted).
- Any anchor at or above line 121 must remain at its current line number (per D-01 / STATE.md:125 PITFALL-6 contract).
```

**Post-edit verification pattern** (65-ANCHOR-INVENTORY.md:312-322):
```markdown
## Post-Edit Verification Protocol (Plan 65-05 Close-Gate)

After Wave 3 + Wave 4 land, re-grep each file for the captured H2/H3 anchor slug set. Any anchor slug in the pre-edit set that is MISSING post-edit constitutes a PITFALL-6 violation and a Wave 3 / Wave 4 rollback condition.
```

**Phase 67 adaptation:** Post-edit diff per RESEARCH.md Example 7 lines 429-435 using `git diff --no-index` between pre/post temp captures. Per CONTEXT.md Claude's Discretion (line 161), the post-edit diff may live inline in `67-ANCHOR-INVENTORY.md` OR in a separate `67-ANCHOR-INVENTORY-POST.md` file (Phase 65 used inline; Phase 67 planner may match).

---

### `.planning/phases/67-.../67-01-PLAN.md`, `67-02-PLAN.md`, `67-03-PLAN.md` (execute plans)

**Plan frontmatter analog** (66-02-PLAN.md:1-72 — closest because it's an atomic-within-plan sidecar-touching plan with pre-commit dry-run; 66-05-PLAN.md:1-92 for close-gate; both relevant):

**Common frontmatter shape (66-02-PLAN.md:1-22):**
```yaml
---
phase: 66-apple-business-validation-tooling-closure-milestone-audit
plan: 02
type: execute
wave: 2
depends_on: [66-01]
files_modified:
  - scripts/validation/v1.6-milestone-audit.mjs
  - scripts/validation/v1.6-audit-allowlist.json
  - ...
autonomous: true
requirements:
  - AUDIT-14
tags:
  - validation
  - apple-business
  - atomic-commit
  - harness
  - phase-66
```

**must_haves block** (66-02-PLAN.md:23-72) — `truths` (bulleted invariants the executor MUST achieve), `artifacts` (per-file `provides` + `min_lines` + `contains` substring set), `key_links` (cross-file substring assertions). Mirror this structure exactly.

**Plan body sections (66-02-PLAN.md:74-291):**
- `<objective>` — 1-2 paragraphs: contract reference + atomicity rationale + Output enumeration
- `<execution_context>` — `@$HOME/.claude/get-shit-done/workflows/execute-plan.md` + `@$HOME/.claude/get-shit-done/templates/summary.md`
- `<context>` — `@`-references to PROJECT.md / REQUIREMENTS.md / STATE.md / ROADMAP.md / CONTEXT.md / RESEARCH.md / PATTERNS.md + relevant source files
- `<interfaces>` — exact line-level BEFORE/AFTER for each edit
- `<tasks>` — `<task type="auto">` with `<name>`, `<files>`, `<read_first>`, `<action>` (PHASE 1: pre-edit verify, PHASE 2: apply edits, PHASE 3: pre-commit dry-run, PHASE 4: commit, PHASE 5: post-commit verify), `<verify><automated>` + `<expected>`, `<done>`
- `<threat_model>` — STRIDE table covering the plan's specific blast radius
- `<verification>` — V-NN to validator mapping table
- `<success_criteria>` — numbered list mapping each truth to acceptance criteria
- `<output>` — what SUMMARY.md should contain at plan close

**Phase 67-01 adaptation** (branchable plan, RESEARCH.md Pattern 1 lines 216-238):
```yaml
files_modified:
  # Branch A:
  - scripts/validation/v1.6-audit-allowlist.json
  # Branch B (conditional — only if any of 4 URLs drifted):
  # - docs/admin-setup-ios/05-app-deployment.md
  # - docs/admin-setup-macos/01-abm-configuration.md
  # - docs/admin-setup-macos/04-app-deployment.md
  # - docs/_glossary-macos.md
requirements:
  - SWEEP-01
tags:
  - validation
  - rotting-references
  - apple-business
  - branchable
  - phase-67
```

`<action>` waves per RESEARCH.md Pattern 1:
- Wave 1: install pinned `markdown-link-check@3.14.2` + probe + capture stdout to draft 67-VERIFICATION.md
- Wave 2 decision point: Branch A (all alive) vs Branch B (any drift)
- Wave 2A (Branch A): sidecar `last_revalidated` annotation only
- Wave 2B (Branch B): surgical line edit + tail-table row + frontmatter bump + glossary H2 row + sidecar annotation
- Wave 3: pre-commit dry-run (3 validators) + commit (message variant A vs B)

**Phase 67-02 adaptation** (atomic-within-plan, mirrors 66-02-PLAN.md structure closely):
```yaml
files_modified:
  - docs/admin-setup-ios/05-app-deployment.md
  - docs/admin-setup-macos/04-app-deployment.md
  - docs/_glossary-macos.md
  - scripts/validation/v1.6-audit-allowlist.json
requirements:
  - SWEEP-02
tags:
  - corpus-edit
  - apple-business
  - atomic-commit
  - sweep-02
  - phase-67
```

`<action>` waves per CONTEXT.md D-04 Plan 67-02 layout (lines 129-141):
- Wave 1: PITFALL-6 anchor inventory pre-snapshot → 67-ANCHOR-INVENTORY.md
- Wave 2: 6 line rewrites verbatim per D-03 table (do NOT renegotiate text)
- Wave 3: 2 callout block inserts (one per doc) above `## Renewal / Maintenance`
- Wave 4: 2 tail-table VH rows (iOS + macOS) + 2 frontmatter `last_verified` bumps
- Wave 5: 1 coordinating row to `_glossary-macos.md` `## Version History` H2 + `last_verified` bump (no SWEEP-01 row unless plan 67-01 was Branch B)
- Wave 6: sidecar annotate 6 `ci_2_vpp_location_token` entries with `"resolved_2026_05_26": true`
- Wave 7: post-edit anchor inventory + diff vs Wave 1 → assert zero shift ≥ line 121
- Wave 8: pre-commit dry-run (3 validators: harness + check-phase-62 + check-phase-66)
- Wave 9: atomic commit (single SHA)

**Phase 67-03 adaptation** (close-gate, mirrors 66-05-PLAN.md):
```yaml
files_modified:
  - .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md
  - .planning/PROJECT.md
  # Possibly .planning/ROADMAP.md and STATE.md if phase 67 needs flips (per CONTEXT.md scope)
requirements:
  - traceability
tags:
  - close-gate
  - verification
  - traceability
  - phase-67
```

`<action>` waves per CONTEXT.md D-04 Plan 67-03 layout (lines 143-149):
- Wave 1: full chain `check-phase-{48..66}.mjs` (subprocesses via check-phase-66.mjs's CHAIN_PHASES; expect 23 PASS / 5 SKIPPED / 0 FAIL)
- Wave 2: `v1.6-milestone-audit.mjs` (expect 15/15 PASS)
- Wave 3: author 67-VERIFICATION.md with the captured tool output + curl evidence + SC#1-4 checklist + validator exit table
- Wave 4: PROJECT.md SWEEP-01 + SWEEP-02 Active→Validated flips with Plan 67-01 + 67-02 closing SHAs
- Wave 5: commit close-gate

---

## Shared Patterns

### Pre-Commit Dry-Run Triple

**Source:** `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-02-PLAN.md` lines 196-208 + RESEARCH.md Example 8

**Apply to:** Plan 67-01 Wave 3 + Plan 67-02 Wave 8

```powershell
# MANDATORY before `git add` per CONTEXT.md D-04 Plan 67-02 Waves
node scripts/validation/v1.6-milestone-audit.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "DRY-RUN STEP 1 FAILED: harness exit $LASTEXITCODE" }
node scripts/validation/check-phase-62.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "DRY-RUN STEP 2 FAILED: V-62-SIDECAR canary" }
node scripts/validation/check-phase-66.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "DRY-RUN STEP 3 FAILED: V-66-02 sidecar shape" }
```

**Expected:** All 3 exit 0 (the same pattern Phase 66 used, minus `--self-test` and minus chain validators 63/64/65 which Phase 67 picks up at Plan 67-03 close-gate Wave 1).

---

### JSON Parse Guard (Sidecar Edit Safety)

**Source:** RESEARCH.md Pitfall 1 + Pitfall 5 (CRLF/LF line-ending drift)

**Apply to:** Plan 67-01 Wave 2 (sidecar annotation) + Plan 67-02 Wave 6 (sidecar annotation)

```powershell
# Immediately after every sidecar edit
node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.6-audit-allowlist.json','utf8')); console.log('OK')"
```

If output is not `OK`, do NOT `git add` — the JSON has a syntax error. Re-read the file and fix the broken brace/comma.

```powershell
# After edit, verify diff size is small (~4-6 lines for SWEEP-01, ~6 lines for SWEEP-02)
git diff scripts/validation/v1.6-audit-allowlist.json
```
If the diff shows the entire file as changed, line endings drifted (CRLF/LF mismatch) — revert and re-edit using LF.

---

### Frontmatter `last_verified:` Bump

**Source:** Multiple files; pattern verified at `docs/admin-setup-ios/05-app-deployment.md:2` and `docs/admin-setup-macos/04-app-deployment.md:2` and `docs/_glossary-macos.md:2` (30+ files corpus-wide use ISO format per RESEARCH.md Open Question 4)

**Apply to:** Every Phase 67-edited file

```yaml
---
last_verified: 2026-05-26   # was 2026-04-18 (iOS) / 2026-04-14 (macOS) / 2026-05-05 (glossary)
review_by: <unchanged>      # do NOT modify review_by; the 60/90-day review cadence is independent
applies_to: <unchanged>
audience: <unchanged>
platform: <unchanged>
---
```

**Bump rule** (per CONTEXT.md D-01): bump ONLY on files actually edited in this phase. Branch A SWEEP-01: zero files bumped. Branch B SWEEP-01: bump affected files only. SWEEP-02: always bump iOS + macOS 04/05 files; bump glossary only if its prose is edited (the H2 row append in `## Version History` does NOT count as a prose edit per RESEARCH.md Open Question 4 — but planner's discretion to bump anyway for traceability symmetry).

---

### Plan Commit Message Convention

**Source:** Phase 66 commit log (referenced in CONTEXT.md D-04 lines 125-128, 142, 150) — `docs(NN-NN): ...` for documentation-only, `feat(scope): ...` for validator/harness changes, `chore(...)` for housekeeping

**Phase 67 commit messages** (per CONTEXT.md D-04 lines 125-127, 141, 149):

```
docs(67-01): SWEEP-01 — 4 ABM URLs verified live + sidecar last_revalidated annotation (no corpus edits)
# OR Branch B variant:
docs(67-01): SWEEP-01 — surgical update {N} of 4 ABM URLs + Version History rows + sidecar refresh

docs(67-02): SWEEP-02 — VPP location token -> content token surgical rename (6 occurrences / 2 files) + sidecar resolved + 2 VH rows

docs(67-03): Phase 67 close-gate — chain validators green + 67-VERIFICATION.md + traceability flips
```

**Rollback semantics:** `git revert <Plan 67-02 SHA>` cleanly restores v1.6-close corpus baseline. Per-plan boundary preserved (CONTEXT.md D-04 line 153-154).

---

### Chain Validator Re-Run + Exit-Code Capture

**Source:** `66-VERIFICATION.md:97-113` (V-66-NN Final State table) + `65-VERIFICATION.md:114-124` (Section B Commands Run + Exit Codes table) + RESEARCH.md Example 9

**Apply to:** Plan 67-03 Wave 1+2 (close-gate full-chain verification)

```powershell
# Plan 67-03 Wave 1 — full chain via check-phase-66.mjs (subprocesses 48..65 internally)
& node scripts/validation/check-phase-66.mjs --verbose 2>&1 | Tee-Object -Variable chainOutput -FilePath .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/_tmp-chain-output.txt

# Expected: exit 0, 23 PASS / 5 SKIPPED / 0 FAIL (matching v1.6 close per 66-VERIFICATION.md:113)
# The 5 SKIPPED MUST be exactly {48, 51, 58, 60, 61}
```

**Phase 67 expected pass-through** (no new validator surface; Phase 67 inherits the v1.6 chain green-gate):
- `v1.6-milestone-audit.mjs` — exit 0, 15/15 PASS (C11/C14/C15/C16 unaffected by Phase 67 edits per CONTEXT.md D-03 line 99)
- `check-phase-{48..65}.mjs` chain via subprocess — same as v1.6 close (23 PASS / 5 SKIPPED / 0 FAIL)
- `check-phase-66.mjs` — exit 0 modulo CHAIN_SKIP (V-66-02 shape stable; V-66-01..07 PASS unchanged)

---

## No Analog Found

None. Every Phase 67 deliverable has a direct in-repo precedent.

**Note on "branchable plan" novelty:** Plan 67-01's branchable wave structure (Branch A zero-edits vs Branch B surgical edits gated on Wave 1 verification outcome) is documented in RESEARCH.md §Pattern 1 (lines 216-238) as a NEW pattern formalized at Phase 67 for v1.7+ rotting-reference verification phases. This is the closest thing to "no analog" but the wave-and-task shape is otherwise standard Phase 65/66 plan grammar — only the if/else fork at Wave 2 is novel.

---

## Metadata

**Analog search scope:**
- `.planning/milestones/v1.6-phases/65-*/` (4 files: 65-VERIFICATION.md, 65-ANCHOR-INVENTORY.md, 65-03/04/05-PLAN.md)
- `.planning/milestones/v1.6-phases/66-*/` (6 files: 66-VERIFICATION.md, 66-01..05-PLAN.md)
- `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` (Phase 64 OP-10 callout precedent, lines 30-43)
- `docs/admin-setup-ios/05-app-deployment.md` (self-precedent for tail-table; current edit target)
- `docs/admin-setup-macos/04-app-deployment.md` (self-precedent for tail-table; current edit target)
- `docs/_glossary-macos.md` (self-precedent for H2 `## Version History` table; current edit target)
- `scripts/validation/v1.6-audit-allowlist.json` (self-precedent; current edit target; pre-populated by commit `3a9a671`)

**Files scanned:** 11 (4 admin-setup corpus files + 1 glossary + 1 sidecar + 1 callout precedent + 4 Phase 65/66 planning artifacts)

**Read-only constraint honored:** Zero source files modified by this pattern-mapping step. Only `67-PATTERNS.md` written.

**Pattern extraction date:** 2026-05-26
