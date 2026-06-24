---
phase: 85-capability-matrix-l2-runbooks
reviewed: 2026-06-23T00:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - docs/reference/macos-capability-matrix.md
  - docs/reference/4-platform-capability-comparison.md
  - docs/_glossary.md
  - docs/l2-runbooks/00-index.md
  - docs/l2-runbooks/28-macos-kerberos-sso-investigation.md
  - docs/l2-runbooks/29-macos-graph-credential-investigation.md
  - scripts/validation/check-phase-63.mjs
findings:
  critical: 0
  warning: 2
  info: 3
  total: 5
status: issues_found
---

# Phase 85: Code Review Report

**Reviewed:** 2026-06-23
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Reviewed 6 documentation files plus one JS validation-harness edit for the
capability-matrix + macOS L2 runbooks phase. Adversarial focus areas (blob-hash
baselines, locked runbook constraints, Graph nav-property usage, cross-link
integrity) were all verified directly against the filesystem and git, and the
locked constraints all hold:

- **V-63-08 baseline** `73f16378…` and **V-63-09 baseline** `2314ede7…` both match
  `git hash-object` of the (newly edited) `macos-capability-matrix.md` and
  `4-platform-capability-comparison.md` respectively. Verified by running
  `git hash-object` — both produce the exact constants embedded in the harness.
- Runbook **#28 contains neither `app-sso diagnose` nor `klist -v`** (both grep to
  zero hits), and the doc explicitly warns against `app-sso diagnose` at line 116.
- Runbook **#29 Graph URLs all use the `platformCredentialMethods` nav-property
  segment**; `platformCredentialAuthenticationMethod` appears only as the resource
  type name and as the `{…Id}` path parameter — never as a URL segment. The Delete
  step (Step 3) carries a `[!WARNING]` at line 90.
- **No duplicate glossary terms** (`### ` headings de-dupe clean); the new
  `Entra ID SSO` term is present in the Alphabetical Index; the reciprocal
  `_glossary.md` see-also lines point to anchors (`#enterprise-sso-plug-in`,
  `#kerberos-sso-extension`, `#secure-enclave`, `#await-configuration`,
  `#setup-assistant`) that all exist as real headings in `_glossary-macos.md`.
- All relative cross-link targets resolve (guides 08/09/10/11, runbooks 10/27,
  `windows-vs-macos.md`, `admin-setup-macos/00-overview.md`, etc.). Anchor targets
  `#permissions` and `#national-cloud-availability` exist in guide 11; the
  `usePlatformSSOTGT` macOS-14.6+ claim is consistent between the matrix and
  runbook #28; permission scope names and PowerShell cmdlet names in runbook #29
  match the authoritative guide 11 verbatim.

No blockers were found. The findings below are two WARNINGs (a stale/now-false
provenance claim in the harness comment block, and a non-standard Graph scope name
worth verifying upstream) and three INFO items.

## Warnings

### WR-01: check-phase-63.mjs comment block asserts a now-false "exits 0 / no CHAIN_SKIP" invariant

**File:** `scripts/validation/check-phase-63.mjs:72-73` (and CHAIN_SKIP block 55-74)
**Issue:** The phase correctly rebased the V-63-08 and V-63-09 baseline blob
hashes to track the new content of the two edited matrix files (the hashes are
correct — verified via `git hash-object`). However, the surrounding comment block
still asserts:

> "Full chain check-phase-{48..66}.mjs exits 0 on Windows host with NO CHAIN_SKIP
> entries for the first time since v1.5 close."

This is no longer true. Running `node scripts/validation/check-phase-63.mjs`
exits **1** with `27 PASS, 5 FAIL` — the 5 failures are
`V-63-CHAIN-{58,59,60,61,62}`, because those older phase validators run their own
byte-unchanged / frontmatter assertions that now fail. Importantly, this is a
**pre-existing** condition, not a regression introduced by Phase 85: at
`959ce9a^` (immediately before this phase) the same harness already reported
`25 PASS, 7 FAIL`. Phase 85's baseline rebase actually *reduced* failures from 7
to 5 by re-syncing the two baselines it owns. The CHAIN-58 root cause is unrelated
to this phase (`V-58-10: review_by cycle is 92 days, expected 45` — a frontmatter
cadence drift that also fails at `959ce9a^`).

The harness edit itself is narrowly correct, but leaving a comment that claims a
green chain while the harness exits non-zero is misleading provenance that will
waste a future maintainer's time and undermines the comment block's credibility.
**Fix:** Update the comment block to reflect reality — either re-populate
`CHAIN_SKIP` with `{58,59,60,61,62}` plus a one-line root-cause pointer (matching
the established CHAIN_SKIP-documentation pattern this file already uses), or strike
the "exits 0 … NO CHAIN_SKIP entries" sentence and replace it with the current
known-failing-chain status and its pre-existing-cause note.

### WR-02: Non-standard Graph permission scope name `UserAuthMethod-PlatformCred.Read` — verify against Microsoft Graph

**File:** `docs/l2-runbooks/29-macos-graph-credential-investigation.md:33,155`
**Issue:** The runbook cites `UserAuthMethod-PlatformCred.Read` as the minimum
delegated read scope. This identifier mixes a hyphen and a dot
(`UserAuthMethod-PlatformCred.Read`), which does not match the conventional
Microsoft Graph permission-naming pattern (e.g.
`UserAuthenticationMethod.Read.All`). It is internally consistent with the
in-suite authoritative source (`guide 11 §Permissions` uses the identical string),
so this is not a phase-introduced inconsistency — but the underlying scope name
should be confirmed against current Microsoft Graph permission references, because
a wrong scope name in an L2 runbook will send engineers to grant a non-existent
permission. **Fix:** Verify the exact scope identifier against the live Graph
permissions reference for `platformCredentialMethods`; if it is incorrect, correct
it in both runbook #29 and guide 11 in lockstep (they must stay in sync).

## Info

### IN-01: V-63-08 / V-63-09 failure-detail strings still say "byte-unchanged invariant violated"

**File:** `scripts/validation/check-phase-63.mjs:214,235`
**Issue:** The FAIL-path detail strings for V-63-08/09 read
`(OU-10 D-A3 byte-unchanged invariant violated)`. After this phase the files are
intentionally *changed* and the baseline was rebased, so the "byte-unchanged
invariant" framing is now semantically stale — the check is really a
"matches-current-baseline" guard, not a "never-changes" guard. Cosmetic only (the
strings only print on the FAIL branch, which no longer fires), but the wording no
longer matches intent. **Fix:** Reword the detail strings (and the `=== V-63-08
… byte-unchanged ===` section comments) to "matches pinned baseline blob" or
similar, to avoid future confusion about whether these files are frozen.

### IN-02: H1 title "5-Platform Capability Comparison" vs filename `4-platform-capability-comparison.md`

**File:** `docs/reference/4-platform-capability-comparison.md:9`
**Issue:** The H1 reads "5-Platform Capability Comparison" while the file is named
`4-platform-capability-comparison.md`. This is a pre-existing, intentional legacy
filename (validator `V-58-26` explicitly asserts the `4-platform-…` filename is
"retained … D-11 traceability"), so it is not a Phase 85 defect and must not be
renamed. Noted only so downstream readers are not surprised by the mismatch.
**Fix:** None required; leave as-is per D-11. Optionally add a one-line note near
the H1 explaining the filename/title divergence is intentional for link
stability.

### IN-03: Runbook #29 Step numbering uses H3 only, skipping an H2 wrapper for the step body

**File:** `docs/l2-runbooks/29-macos-graph-credential-investigation.md:25-161`
**Issue:** Steps 1–5 are authored as `### Step N` headings directly under the
`## Context` → `---` break, with no parent `## Investigation` (or similar) H2
grouping them. Runbook #28 by contrast groups its steps under `## Track A` / `##
Track B` H2s. This is a minor structural inconsistency between the two sibling
runbooks delivered in the same phase; both render fine and all anchors resolve, so
it is style-only. **Fix:** Optional — for parity with #28, wrap Steps 1–5 under a
single H2 (e.g. `## Investigation Steps`). Not required for correctness.

---

_Reviewed: 2026-06-23_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
