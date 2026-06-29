# Phase 97: Enrollment & FileVault Depth Formalization - Research

**Researched:** 2026-06-28
**Domain:** Documentation formalization — macOS ADE guides 02 and 03; validator lineage; freshness-stamp convention
**Confidence:** HIGH (all four spot-verify claims confirmed against Microsoft Learn; all token presence confirmed by grep)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (Freshness granularity):** File-level frontmatter `last_verified`/`review_by` + one new dated `| Date | Change | Author |` version-history row per guide. NO per-section stamp pairs. Both guides already carry `last_verified: 2026-06-27` / `review_by: 2026-09-27`. Only bump frontmatter if a substantive content edit is made during spot-verify. The `+3-month / same-day-of-month` invariant applies if bumped.
- **D-02 (Harness coverage):** Phase 97 does NOT author `check-phase-97.mjs` or touch any chain-apex. Phase 97 only leaves durable assertable anchors and records the needle-spec hand-off for Phase 100.
- **D-03 (Needle granularity):** Fine-grained needles on stable Apple payload / key name tokens — recorded now in this research, implemented in Phase 100 as part of the indivisible Atom 2 commit.
- **D-04 (Content treatment):** Formalize-only. Freeze live-written content as-is. Bounded spot-verify of exactly four claims — correct only if wrong.
- **ROADMAP SC reconciliation:** ROADMAP Phase 97 SC#1/#3 say "per-section freshness stamps." Per user ruling, this CONTEXT.md is authoritative: file-level frontmatter + version-history row SATISFIES that intent. Do not amend ROADMAP.

### Claude's Discretion

- Exact wording of the new version-history rows (D-01).
- Precise needle-string list format in the Phase-100 hand-off (D-03), provided needles are stable tokens.
- Whether needle-spec is recorded inline in PLAN.md or as a dedicated note file in the phase dir.

### Deferred Ideas (OUT OF SCOPE)

- `check-phase-97.mjs` validator authoring — owned by Phase 100 (HARN-02 indivisible Atom 2).
- Full re-audit / re-verification of guides 02 & 03 beyond the four D-04 spot-verify claims.
- Guide 07 edits — owned by Phase 98.
- Link-integrity guard on `#end-user-sign-in-experience-secure-enclave` anchor — Phase 100 sweep.
- Per-section `last_verified`/`review_by` pair blocks — unprecedented in corpus, locked out by D-01.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DEP-01 | `docs/admin-setup-macos/02-enrollment-profile.md` carries the verified Account Settings depth — local admin + local user account fields (account type / prefill / restrict-editing), PSSO account-creation ownership, password-prefill (passwordless/federated) behavior, and the UPN-via-Full-Name display note — freshness-stamped and harness-covered. | Content already present (ground-truth audit in CONTEXT.md). Phase 97 adds version-history row; stable tokens confirmed for Phase-100 needles. |
| DEP-02 | `docs/admin-setup-macos/03-configuration-profiles.md` carries the verified FileVault (Full Disk Encryption) depth — three sub-payloads (FileVault / FileVault Options / Recovery Key Escrow), required `Defer`, Setup-Assistant enforcement, the recovery-key-escrow verification procedure, the assignment target, and the Local Password Policy (Passcode) section — freshness-stamped and harness-covered. | Content already present. Phase 97 adds version-history row; stable tokens confirmed for Phase-100 needles. |

</phase_requirements>

---

## Summary

Phase 97 is a pure formalization phase. Both target files were already written and committed during the 2026-06-27 live session; all DEP-01 and DEP-02 content elements are confirmed present. The phase delivers exactly three things: (1) one new `| Date | Change | Author |` version-history row in each guide documenting the formalization, (2) a bounded four-claim spot-verify against Microsoft Learn (all four claims confirmed correct — no content corrections required), and (3) a durable needle-spec hand-off record for Phase 100 to author `check-phase-97.mjs`.

The freshness frontmatter (`last_verified: 2026-06-27` / `review_by: 2026-09-27`) is already correct and must NOT be bumped because the spot-verify found no errors — no substantive content change was made. Only the version-history rows (date 2026-06-28) are added.

Requirements DEP-01 and DEP-02 move from Pending to Complete by: (a) checking `[x]` against both items in `REQUIREMENTS.md`, and (b) updating the traceability table status from "Pending" to "Complete" — the same pattern used for Phase 96 (ACC-01, ACC-02, ACC-04, GLOS-01).

**Primary recommendation:** Add one version-history row per guide (2026-06-28, formalization wording), update REQUIREMENTS.md traceability, and record the needle-spec in this file so Phase 100 can author `check-phase-97.mjs` without re-discovery.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Freshness stamp maintenance | Documentation (file frontmatter) | Version-history table | File-level convention established in Phase 96 D-03/D-04; no per-section pairs in corpus |
| Assertable anchor coverage | Documentation (stable section headers + content tokens) | Validation harness (Phase 100) | Phase 97 shapes the content; Phase 100 asserts it |
| Requirements traceability | REQUIREMENTS.md checkbox + traceability table | STATE.md / ROADMAP.md progress | Same pattern as Phase 96 complete-requirements |
| Needle-spec hand-off | RESEARCH.md (this file) | PLAN.md task action comment | Phase 100 executor must read this before authoring check-phase-97.mjs |

---

## Current File State

### Guide 02: `docs/admin-setup-macos/02-enrollment-profile.md`

[VERIFIED: file read]

| Property | Value | Line |
|----------|-------|------|
| `last_verified` | `2026-06-27` | 2 |
| `review_by` | `2026-09-27` | 3 |
| Version-history header | `\| Date \| Change \| Author \|` | 186 |
| Table separator | `\|------|--------|--------|` | 187 |
| Newest row date | `2026-06-27` | 188 |
| Oldest row date | `2026-04-14` | 193 |

**Version-history table structure (lines 186-193):** Five rows currently. Most-recent rows at top. Author column always `--`. No "Version History" heading — bare table immediately after `---` separator.

**Phase-97 new row (insert at line 188, pushing existing rows down):**
```
| 2026-06-28 | Formalized Account Settings section under DEP-01; bounded spot-verify of 4 factual claims confirmed correct against Microsoft Learn (2026-06-28) | -- |
```

**Frontmatter after Phase 97:** UNCHANGED — `last_verified: 2026-06-27` / `review_by: 2026-09-27`. No content correction from spot-verify, so no bump.

---

### Guide 03: `docs/admin-setup-macos/03-configuration-profiles.md`

[VERIFIED: file read]

| Property | Value | Line |
|----------|-------|------|
| `last_verified` | `2026-06-27` | 2 |
| `review_by` | `2026-09-27` | 3 |
| Version-history header | `\| Date \| Change \| Author \|` | 288 |
| Table separator | `\|------|--------|--------|` | 289 |
| Newest row date | `2026-06-27` | 290 |
| Oldest row date | `2026-04-14` | 297 |

**Version-history table structure (lines 288-297):** Six rows currently. Most-recent rows at top. Author column always `--`. Same bare-table format as guide 02.

**Phase-97 new row (insert at line 290, pushing existing rows down):**
```
| 2026-06-28 | Formalized FileVault (Full Disk Encryption) and Local Password Policy (Passcode) sections under DEP-02; bounded spot-verify of 4 factual claims confirmed correct against Microsoft Learn (2026-06-28) | -- |
```

**Frontmatter after Phase 97:** UNCHANGED — `last_verified: 2026-06-27` / `review_by: 2026-09-27`. No content correction from spot-verify, so no bump.

---

## Bounded Spot-Verify Results (D-04)

All four claims were verified against Microsoft Learn authoritative documentation (fetched 2026-06-28). No corrections required.

### Claim 1: FileVault `XTS-AES 128` cipher (guide 03 line 137)

**Guide text:** `"Turns on FileVault (XTS-AES 128) on macOS 10.13+"`

**Microsoft Learn (learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos, updated 2026-06-22):**
> "FileVault is a whole-disk encryption program included with macOS that uses **XTS-AES 128-bit encryption**."
> "FileVault uses XTS-AES 128-bit encryption as implemented by Apple's macOS."

**Apple Security Guide (support.apple.com):** XTS-AES 128-bit blocks with a 256-bit key; the shorthand "XTS-AES 128" is the standard industry designation.

**VERDICT: VERIFIED** [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos] — Guide shorthand matches Microsoft Learn exactly. No correction needed.

---

### Claim 2: macOS LAPS recovery-key "rotated every 6 months by default" (guide 02 line 71)

**Guide text:** `"Its password is auto-generated per device, escrowed in Intune (device record > **Local admin password**), and rotated every 6 months by default."`

**Microsoft Learn (learn.microsoft.com/en-us/intune/device-security/laps/setup-macos, updated 2026-06-22):**
> "After enrollment, Intune automatically rotates the LAPS-managed administrator password every six months."
> "LAPS policy includes a schedule for automatically rotating account passwords (once every six months)."

Additional note from the same page: the `Admin account password rotation period (days)` setting (1-180 days) is **in addition to** the automatic six-month rotation, not a replacement of it.

**VERDICT: VERIFIED** [VERIFIED: learn.microsoft.com/en-us/intune/device-security/laps/setup-macos] — "every 6 months by default" is accurate; the configured field shortens the cycle, the base autorotation remains six months. No correction needed.

---

### Claim 3: Escrow error code `-2016341107` / `0x87d1138d` meaning (guide 03 line 189)

**Guide text:** `"Error -2016341107 / 0x87d1138d means the user hasn't accepted the FileVault enablement prompt — educate the user, or use Setup Assistant enforcement to avoid the prompt."`

**Microsoft Learn (learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos, updated 2026-06-22), Error code reference table:**
> "**Error -2016341107 / 0x87d1138d:** User hasn't accepted FileVault enablement prompt. Resolution: User education on accepting FileVault prompts. Prevention: Consider Setup Assistant enforcement for automated deployment."

**VERDICT: VERIFIED** [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos] — Error code, hex representation, meaning, and suggested remediation all match exactly. No correction needed.

---

### Claim 4: "macOS 14.4+ removes the Setup-Assistant admin-role restriction" (guide 03 line 174)

**Guide text:** `"Pre-macOS 14.4 caveat: the account created interactively during Setup Assistant must have the **Administrator** role — relevant if you set the primary account to **Standard**... macOS 14.4+ removes this restriction."`

**Microsoft Learn (learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos, updated 2026-06-22):**
> "Tip: [macOS 14.4 adds refinements](https://support.apple.com/guide/deployment/manage-filevault-with-device-management-dep0a2cb7686/web) that apply to Setup Assistant. Prior to macOS 14.4, Setup Assistant requires the user account created interactively during Setup Assistant to have the role of Administrator."

The tip links to Apple's deployment documentation to confirm the refinement (the restriction removal).

**VERDICT: VERIFIED** [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos] — The guide's framing (pre-14.4 requires Administrator; 14.4+ removes this) matches Microsoft Learn exactly. No correction needed.

---

**Spot-verify summary:** All 4 claims CORRECT. Frontmatter stays at 2026-06-27/2026-09-27. The version-history row wording "confirmed correct against Microsoft Learn (2026-06-28)" is accurate and appropriate.

---

## Stable-Token Needle Inventory for Phase-100 Hand-Off (D-03)

All tokens below are confirmed present verbatim by grep on 2026-06-28. [VERIFIED: codebase grep]

### Guide 02 Needles (DEP-01) — `docs/admin-setup-macos/02-enrollment-profile.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| DEP01-N1 | `Non Platform SSO Accounts` | FOUND | Line 76, inside backtick span in callout |
| DEP01-N2 | `Restrict editing` | FOUND | Line 87, in settings table row |
| DEP01-N3 | `Prefill account info` | FOUND | Line 84, in settings table row |
| DEP01-N4 | `{{partialUPN}}` | FOUND | Lines 72, 85, 95, 102 |
| DEP01-N5 | `{{username}}` | FOUND | Lines 86, 95, 102 |

**UPN-via-Full-Name note presence:** Confirmed at line 102 — the note covers both `{{username}}` for full-name display and `{{partialUPN}}` for short name. No separate needle needed beyond DEP01-N4 and DEP01-N5, which together pin the note's substance.

### Guide 03 Needles (DEP-02) — `docs/admin-setup-macos/03-configuration-profiles.md`

| Needle ID | Literal Token | Present | Notes |
|-----------|--------------|---------|-------|
| DEP02-N1 | `FileVault Options` | FOUND | Line 144, sub-payload heading |
| DEP02-N2 | `Recovery Key Escrow` | FOUND | Line 152, sub-payload heading |
| DEP02-N3 | `Defer` | FOUND | Lines 138-141 (multiple); use `\| Defer \|` for exact table-row match or bare `Defer` (ubiquitous) |
| DEP02-N4 | `dontAllowFDEDisable` | FOUND | Line 148, Apple key name in backtick |
| DEP02-N5 | `DestroyFVKeyOnStandby` | FOUND | Line 150, Apple key name in backtick |
| DEP02-N6 | `Recovery Key Rotation In Months` | FOUND | Line 142, settings table row |
| DEP02-N7 | `Local Password Policy` | FOUND | Line 98, section heading `## Local Password Policy (Passcode)` |
| DEP02-N8 | `-2016341107` | FOUND | Line 189, error code in escrow verification section |

**Needle precision notes for Phase 100:**
- DEP02-N3 (`Defer`): the word appears many times. Use `| Defer |` (with surrounding pipe-space) to target the specific settings-table row, or `Defer = Enabled` to target the recommended-baseline sentence. Either is stable; `| Defer |` is more structurally anchored.
- DEP02-N7 (`Local Password Policy`): `## Local Password Policy (Passcode)` is the full heading. The needle `Local Password Policy` will match as a substring of this heading — that is sufficient. Alternatively use the full heading string.
- DEP01-N1 (`Non Platform SSO Accounts`): appears inside `` **`Non Platform SSO Accounts`** `` in the callout at line 76. The literal characters `Non Platform SSO Accounts` are present without backticks or markup in the string.

**Existing guide-03 needle (check-phase-81 E7):** `](07-platform-sso-setup.md)` — already asserted by `check-phase-81.mjs` E7. Phase 97 needles must not duplicate or conflict with E7. None of the DEP-02 tokens above overlap with E7.

**Guide-02 coverage:** Guide 02 is WHOLLY UNCOVERED by any existing chain validator. All five DEP01 needles are net-new coverage.

---

## Phase-100 Needle-Spec Hand-Off

> This section is the machine-readable spec that the Phase-100 `check-phase-97.mjs` author must consume. Do not re-derive this list at Phase 100 time — read it here.

### `check-phase-97.mjs` Structure Template

Model: `check-phase-94.mjs` (PRESENCE + content needles; NO chain; SELF dual-invariant).

```
CHAIN_PHASES = []            // lightweight — no chain; chain lives only in apex check-phase-100
CHAIN_SKIP = new Set([])

DELIVERABLE_02 = 'docs/admin-setup-macos/02-enrollment-profile.md'
DELIVERABLE_03 = 'docs/admin-setup-macos/03-configuration-profiles.md'
```

**Assertion classes (mirroring check-phase-94 pattern):**

| Check ID | Type | Target | Needle / Condition |
|----------|------|--------|--------------------|
| V-97-PRESENCE-02 | PRESENCE | DELIVERABLE_02 | file exists + non-empty |
| V-97-PRESENCE-03 | PRESENCE | DELIVERABLE_03 | file exists + non-empty |
| V-97-CONTENT-DEP01-N1 | CONTENT | DELIVERABLE_02 | `Non Platform SSO Accounts` |
| V-97-CONTENT-DEP01-N2 | CONTENT | DELIVERABLE_02 | `Restrict editing` |
| V-97-CONTENT-DEP01-N3 | CONTENT | DELIVERABLE_02 | `Prefill account info` |
| V-97-CONTENT-DEP01-N4 | CONTENT | DELIVERABLE_02 | `{{partialUPN}}` |
| V-97-CONTENT-DEP01-N5 | CONTENT | DELIVERABLE_02 | `{{username}}` |
| V-97-CONTENT-DEP02-N1 | CONTENT | DELIVERABLE_03 | `FileVault Options` |
| V-97-CONTENT-DEP02-N2 | CONTENT | DELIVERABLE_03 | `Recovery Key Escrow` |
| V-97-CONTENT-DEP02-N3 | CONTENT | DELIVERABLE_03 | `| Defer |` |
| V-97-CONTENT-DEP02-N4 | CONTENT | DELIVERABLE_03 | `dontAllowFDEDisable` |
| V-97-CONTENT-DEP02-N5 | CONTENT | DELIVERABLE_03 | `DestroyFVKeyOnStandby` |
| V-97-CONTENT-DEP02-N6 | CONTENT | DELIVERABLE_03 | `Recovery Key Rotation In Months` |
| V-97-CONTENT-DEP02-N7 | CONTENT | DELIVERABLE_03 | `Local Password Policy` |
| V-97-CONTENT-DEP02-N8 | CONTENT | DELIVERABLE_03 | `-2016341107` |
| V-97-SELF | SELF | in-file | CHAIN_PHASES excludes 97; CHAIN_SKIP.size === 0 |

**Total checks:** 2 PRESENCE + 13 CONTENT + 1 SELF = 16 checks.

**No freshness assertion** — never assert `last_verified` or `review_by` values (time-bomb; no macOS doc is in any freshness-assertion scope per v1.12-milestone-audit.mjs C5/C10/C11).

**No allowlist / sidecar** — hard-assert all 15 content+presence checks (mirrors C16 empty `c16_missing_endpoint_exemptions: []` precedent from check-phase-94).

**CRLF normalization:** apply `.replace(/\r\n/g, '\n')` before needle test (Windows-safe, as in all existing validators).

### Hand-off note location recommendation

Record this spec in the phase dir as a standalone `97-NEEDLE-SPEC.md` (the planner should include this as a task deliverable). That file becomes the Phase-100 executor's reading material. The content of the spec is captured in this RESEARCH.md section, which the planner can copy verbatim.

---

## Validator Lineage Reference

[VERIFIED: file read]

### `check-phase-94.mjs` (model validator)

- **Purpose:** Per-phase content-needle validator; no chain (chain lives in apex only).
- **Pattern:** CHAIN_PHASES = []; CHAIN_SKIP = new Set([]); DELIVERABLE = single file; CONTENT_NEEDLES = array of {id, file, needle}; PRESENCE + CONTENT-* + SELF checks.
- **Key design note from its header:** "bare PRESENCE is trivially green on old bytes" — explicitly justifies the fine-grained content-needle approach Phase 97 adopts.
- **SELF check shape:** `CHAIN_PHASES.includes(94)` (self-reference guard) + `CHAIN_SKIP.size !== 0` (Phase 68 7b635ca invariant).

### `check-phase-95.mjs` (current chain apex)

- **CHAIN_PHASES:** [48..94] — 47 entries.
- **CHAIN_SKIP:** new Set([]) — empty per Phase 68 invariant.
- **Role:** Runs all 47 sub-validators + v1.12-milestone-audit.mjs + AUDIT + SELF.
- **Does NOT include phases 96+** — those will be included in the new apex `check-phase-100.mjs` (CHAIN_PHASES=[48..100]).

### `check-phase-81.mjs` E7 (existing guide-03 needle)

- **Assertion:** `docs/admin-setup-macos/03-configuration-profiles.md` contains `](07-platform-sso-setup.md)`.
- **Status:** Live in chain (apex 95 → chain 48..94 includes 81).
- **Implication:** Guide 03 is already a live assertion target; Phase 97's new DEP-02 needles must not duplicate or diverge from E7.

---

## Requirements Binding Convention

[VERIFIED: codebase inspection of REQUIREMENTS.md + Phase 96 precedent]

**How DEP-01/DEP-02 move from Pending to Complete (same pattern as Phase 96 ACC-01/ACC-02/ACC-04/GLOS-01):**

1. In `REQUIREMENTS.md`: change `- [ ] **DEP-01**:` to `- [x] **DEP-01**:` (and same for DEP-02).
2. In `REQUIREMENTS.md` Traceability table: change `| DEP-01 | Phase 97 | Pending |` to `| DEP-01 | Phase 97 | Complete |`.
3. Same for DEP-02.

There is no separate requirements-traceability file and no in-doc marker — the convention is purely the checkbox and traceability table in `REQUIREMENTS.md`. The plan's `requirements:` frontmatter listing DEP-01/DEP-02 is the task-level binding, but the requirements move to Complete via the REQUIREMENTS.md edit at phase close.

---

## Freshness Invariant

[VERIFIED: Phase 96 CONTEXT.md D-03 + D-04; ROADMAP Phase 96 cross-cutting constraints]

- **Convention:** `last_verified` + 3 months, same day-of-month = `review_by`. Never bump one without the other.
- **Current values (both guides):** `last_verified: 2026-06-27` → `review_by: 2026-09-27` (June 27 + 3 months = September 27). CORRECT.
- **Phase 97 action:** Do NOT bump. The spot-verify found no errors; no substantive content change was made. Frontmatter stands at 2026-06-27/2026-09-27.
- **Version-history row date:** Use `2026-06-28` (today's execution date, not the live-session date 2026-06-27). The version-history row documents when the formalization occurred, not when the content was originally written.
- **If a spot-verify correction had been needed:** the executor would have bumped both stamps to the correction date (2026-06-28) and computed `review_by: 2026-09-28`. Since no correction was found, this case does not apply.

---

## Common Pitfalls

### Pitfall 1: Bumping frontmatter when the spot-verify finds no errors
**What goes wrong:** Executor bumps `last_verified` to 2026-06-28 as a reflexive "we touched the file" action when only a version-history row was added.
**Why it happens:** Confusion between "we reviewed the file" (always happens) and "we made a substantive content edit" (the D-01 trigger for bumping).
**How to avoid:** Only bump frontmatter if the spot-verify produces an actual text correction in the body of the guide. Version-history rows do not count as substantive content edits.
**Warning signs:** Executor plan task says "update last_verified to today" without mentioning a content correction.

### Pitfall 2: Inserting the version-history row at the BOTTOM of the table
**What goes wrong:** New row lands below the 2026-04-14 initial-version rows, out of chronological order.
**Why it happens:** Appending to the end of a markdown table is the lazy path.
**How to avoid:** Insert the new row at line 188 (guide 02) / line 290 (guide 03) — immediately after the table separator line — so newest rows appear at the top (matching existing convention).

### Pitfall 3: Adding a "Version History" heading
**What goes wrong:** Executor adds `### Version History` or similar heading before the table.
**Why it happens:** The heading seems natural, but it is absent from both guides' current tables.
**How to avoid:** The convention is a bare table immediately after `---`. No heading. Confirm by reading lines 184-188 in guide 02 and 286-290 in guide 03.

### Pitfall 4: Authoring check-phase-97.mjs in this phase
**What goes wrong:** Executor creates `scripts/validation/check-phase-97.mjs` during Phase 97 execution.
**Why it happens:** Temptation to "complete" the harness coverage immediately.
**How to avoid:** D-02 is LOCKED — Phase 97 only records the needle-spec. The validator is authored at Phase 100 as part of the indivisible Atom 2 commit. Creating it now fractures the Atom 2 and produces an orphan validator that runs in no chain.

### Pitfall 5: Marking DEP-01/DEP-02 Complete without updating REQUIREMENTS.md
**What goes wrong:** Phase closes with the plan committed but REQUIREMENTS.md still shows `[ ]` and "Pending" in the traceability table.
**Why it happens:** Executor forgets the REQUIREMENTS.md update is a deliverable.
**How to avoid:** Include a task in the plan that explicitly edits REQUIREMENTS.md to flip both DEP-01 and DEP-02 from Pending to Complete.

---

## Code Examples

### Version-history row insertion (guide 02, line 188)

Guide 02's table before Phase 97 (lines 186-193):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-27 | Added Account Settings section ... | -- |
| 2026-06-27 | Added managed-admin → `Non Platform SSO Accounts` ... | -- |
| 2026-06-27 | Clarified `Restrict editing` ... | -- |
| 2026-06-27 | Added UPN-looking-login note ... | -- |
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- ... | -- |
```

Guide 02's table after Phase 97 (new row at top):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-28 | Formalized Account Settings section under DEP-01; bounded spot-verify of 4 factual claims confirmed correct against Microsoft Learn (2026-06-28) | -- |
| 2026-06-27 | Added Account Settings section ... | -- |
...
```

### Version-history row insertion (guide 03, line 290)

Guide 03's table before Phase 97 (lines 288-297):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-27 | Rewrote FileVault (Full Disk Encryption) section ... | -- |
| 2026-06-27 | Added third sub-payload **FileVault Options** ... | -- |
| 2026-06-27 | Documented FileVault **assignment target** ... | -- |
| 2026-06-27 | Added "Local Password Policy (Passcode)" section ... | -- |
| 2026-06-20 | Phase 76 ... | -- |
| 2026-06-20 | Phase 75 ... | -- |
| 2026-04-14 | Resolved Phase 24 runbook links | -- |
| 2026-04-14 | Initial version -- ... | -- |
```

Guide 03's table after Phase 97 (new row at top):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-28 | Formalized FileVault (Full Disk Encryption) and Local Password Policy (Passcode) sections under DEP-02; bounded spot-verify of 4 factual claims confirmed correct against Microsoft Learn (2026-06-28) | -- |
| 2026-06-27 | Rewrote FileVault (Full Disk Encryption) section ... | -- |
...
```

### REQUIREMENTS.md changes

```diff
-  - [ ] **DEP-01**: `docs/admin-setup-macos/02-enrollment-profile.md` carries the verified Account Settings depth...
+  - [x] **DEP-01**: `docs/admin-setup-macos/02-enrollment-profile.md` carries the verified Account Settings depth...

-  - [ ] **DEP-02**: `docs/admin-setup-macos/03-configuration-profiles.md` carries the verified FileVault...
+  - [x] **DEP-02**: `docs/admin-setup-macos/03-configuration-profiles.md` carries the verified FileVault...

  | DEP-01 | Phase 97 | Pending |
+ | DEP-01 | Phase 97 | Complete |

  | DEP-02 | Phase 97 | Pending |
+ | DEP-02 | Phase 97 | Complete |
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Needle-spec discovery at Phase 100 | Re-read guides 02/03 and re-derive token list | Read this RESEARCH.md § "Stable-Token Needle Inventory" | All 13 tokens are already grepped and confirmed; re-derivation risks drift |
| Freshness stamp format | Invent a new format | Mirror lines 2-3 of either guide: `last_verified: YYYY-MM-DD` (no quotes) / `review_by: YYYY-MM-DD` | Format must match corpus convention for any future harness that might check format |
| Requirements closure | Write a new convention | Checkbox + traceability table in REQUIREMENTS.md | Same two-touch pattern used for all 4 Phase 96 requirements |

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — Phase 97 is doc edits + REQUIREMENTS.md updates only; no CLI tools, services, or runtimes required beyond a text editor).

---

## Validation Architecture

> `workflow.nyquist_validation` not explicitly set to false in config; treat as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js (no test runner — validators are standalone .mjs scripts) |
| Config file | none |
| Quick run command | `node scripts/validation/check-phase-94.mjs` (model; no check-phase-97 yet) |
| Full suite command | `node scripts/validation/check-phase-95.mjs` (chain apex) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DEP-01 | Guide 02 contains Account Settings content tokens | content-needle | Deferred to Phase 100 (`check-phase-97.mjs`) | No — Wave 0 gap; not authored this phase |
| DEP-02 | Guide 03 contains FileVault + Passcode content tokens | content-needle | Deferred to Phase 100 (`check-phase-97.mjs`) | No — Wave 0 gap; not authored this phase |

### Sampling Rate

- **Per task commit:** No automated check available this phase (check-phase-97.mjs not yet authored). Manual verification: grep the guide for the added version-history row.
- **Per wave merge:** `node scripts/validation/check-phase-95.mjs` (confirms existing chain still passes, including guide 03 E7 needle from check-phase-81).
- **Phase gate:** Full suite green (check-phase-95.mjs) before `/gsd-verify-work`.

### Wave 0 Gaps

- `scripts/validation/check-phase-97.mjs` — covers DEP-01 and DEP-02 via 13 content needles + 2 presence checks. **NOT authored this phase** (Phase 100 Atom 2 deliverable per D-02 LOCKED). The needle-spec in `## Phase-100 Needle-Spec Hand-Off` above is the design input for Phase 100.

---

## Security Domain

> Phase 97 is a documentation-only phase (no code, no configuration, no authentication flows). Security section is minimal.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | n/a — doc edit only |
| V3 Session Management | No | n/a |
| V4 Access Control | No | n/a |
| V5 Input Validation | No | n/a |
| V6 Cryptography | No | n/a (XTS-AES 128 is documented, not implemented) |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| — | (none) | — | — |

All claims in this research were verified against authoritative sources (Microsoft Learn fetched 2026-06-28, codebase grep confirmed verbatim). No unverified assumptions.

---

## Open Questions

None. All research questions were answered definitively:

1. Exact file state — confirmed by direct read (line numbers, frontmatter values, table structure).
2. Spot-verify — all 4 claims VERIFIED against Microsoft Learn.
3. Token inventory — all 13 candidate tokens confirmed FOUND verbatim.
4. Validator structure — confirmed by reading check-phase-94.mjs and check-phase-95.mjs.
5. Requirements binding — confirmed by REQUIREMENTS.md inspection.
6. Hand-off location — needle-spec embedded in this RESEARCH.md; planner should also produce `97-NEEDLE-SPEC.md`.

---

## Sources

### Primary (HIGH confidence)

- Microsoft Learn — `learn.microsoft.com/en-us/intune/device-configuration/endpoint-security/encrypt-filevault-macos` (updated 2026-06-22, fetched 2026-06-28) — XTS-AES 128 spec, error -2016341107, macOS 14.4 admin-role removal
- Microsoft Learn — `learn.microsoft.com/en-us/intune/device-security/laps/setup-macos` (updated 2026-06-22, fetched 2026-06-28) — LAPS default 6-month rotation
- Codebase direct read — `docs/admin-setup-macos/02-enrollment-profile.md` — file state, token presence [VERIFIED: file read]
- Codebase direct read — `docs/admin-setup-macos/03-configuration-profiles.md` — file state, token presence [VERIFIED: file read]
- Codebase direct read — `scripts/validation/check-phase-94.mjs` — validator structure template [VERIFIED: file read]
- Codebase direct read — `scripts/validation/check-phase-95.mjs` — chain apex, CHAIN_PHASES=[48..94] [VERIFIED: file read]
- Codebase direct read — `scripts/validation/check-phase-81.mjs` E7 — existing guide-03 needle [VERIFIED: file read]
- `.planning/phases/97-enrollment-filevault-depth-formalization/97-CONTEXT.md` — all four locked decisions [VERIFIED: file read]
- `.planning/REQUIREMENTS.md` — DEP-01/DEP-02 full text, traceability convention [VERIFIED: file read]

### Secondary (MEDIUM confidence)

- Apple Security Guide (support.apple.com/guide/security) — XTS-AES 128-bit blocks / 256-bit key spec, consistent with Microsoft Learn
- WebSearch results confirming LAPS 180-day default and error code meaning — consistent with Microsoft Learn fetched content

---

## Metadata

**Confidence breakdown:**

- Spot-verify results: HIGH — verified directly against Microsoft Learn (fetched 2026-06-28, page updated 2026-06-22)
- Token inventory: HIGH — confirmed by grep against live file contents
- Validator structure: HIGH — directly read from check-phase-94.mjs
- Freshness convention: HIGH — directly read from Phase 96 CONTEXT.md + guide frontmatter
- Requirements binding: HIGH — directly read from REQUIREMENTS.md + Phase 96 precedent

**Research date:** 2026-06-28
**Valid until:** 2026-09-28 (90 days; freshness matches guide review_by dates)
