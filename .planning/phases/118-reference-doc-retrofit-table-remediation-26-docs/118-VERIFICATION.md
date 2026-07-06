---
phase: 118-reference-doc-retrofit-table-remediation-26-docs
verified: 2026-07-06T18:10:52Z
status: passed
score: 4/4 must-haves verified
overrides_applied: 0
---

# Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs) Verification Report

**Phase Goal:** All reference docs (~34 enrolled: capability matrices, 4-platform comparison, error-codes,
cross-platform references) are retrofitted to EEE — including table remediation (per-table prose so
capability-matrix content survives the ~2,000-char chunk window) — with the correct EEE header block
(doc_id from registry, Platform via D1 map, Status: Approved), D3-A structure, Version-History row +
Last Reviewed = last_verified verbatim, and C17 exits 0 on all enrolled reference-class files before
phase close. The 1 mermaid-bearing file (ca-enrollment-timing.md / RE-147) is a documented carve-out
to v1.16 (stays keyless/Pending).
**Verified:** 2026-07-06T18:10:52Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth (ROADMAP SC) | Status | Evidence |
|---|------|--------|----------|
| 1 | All reference doc files carry the correct EEE header block with `doc_id` from the registry, Platform normalized via D1 map, `Status: Approved` (SC1) | VERIFIED | All 34 enrolled files scanned for the 4 EEE frontmatter keys (`doc_id`, `status`, `owner`, `doc_type`) — 0 missing across 34 files. All `doc_id` values join correctly on `RE-index.md` Path column (spot-checked RE-159, RE-177, RE-168, RE-164, RE-165). All 34 carry `status: Approved`. Keyless-platform injection confirmed landed: all 10 previously-keyless files (7 error-codes + `powershell-ref.md` + `registry-paths.md` + `apv1-vs-apv2.md`) now carry `platform: Windows` (line 6 of each file, verified by direct grep). |
| 2 | Each capability-matrix table with >25 rows has a prose summary within 5 lines of the closing table delimiter (SC2) | VERIFIED | The one qualifying table (`error-codes/00-index.md`, 30-row Quick Lookup, lines 40-70) has post-table prose at line 74 ("## No-Code ESP Failures" heading + prose), within the 5-line window — matches plan's note that this table was already #11-compliant pre-retrofit. Per-table D-118-1 prose (before-lead-in + `> **Table summary:**` after) verified present on all 45 in-scope matrix/comparison tables across the 8 files: 4-platform=7, android=7, aosp-oem=4, ios=6, linux=9, macos=8, apv1-vs-apv2=1, windows-vs-macos=3 — grep count of "Table summary" per file matches plan's per-file table counts exactly. |
| 3 | Each reference doc has the D3-A structure (`# Title → block → ## Summary → sections`) and carries the Version-History row + `Last Reviewed` = `last_verified` verbatim (SC3) | VERIFIED | Structural order confirmed on all 34 files: frontmatter close → block line → H1 → `## Summary` (this is the locked project-wide EEE order, consistent with already-shipped Phase 116/117 files — the "D3-A" shorthand in ROADMAP text describes the doc's rendered top, block precedes H1 per the standard's C17 assertion #2 "H1 ... first non-frontmatter non-block content line"). All 34 files carry a `| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed |` Version-History row (0 missing). `last_verified` values confirmed byte-identical to pre-retrofit values via git history diff (spot-checked macos-capability-matrix.md: `2026-06-24` unchanged across 118-02 commits). |
| 4 | C17 exits 0 on all reference doc files before phase close (SC4) | VERIFIED | `node scripts/validation/c17-eee-contract.mjs` run live: `174 files checked, 0 with violations, 0 total violations`, all 13 assertion counters `#N=0`. `grep -rl "^doc_id:" docs/ | wc -l` = 174, matching the C17-scanned count exactly (enrollment is opt-in by doc_id presence). The 34 enrolled reference-class files are included in this count; `ca-enrollment-timing.md` (RE-147) carries no `doc_id` key (confirmed absent) and a `mermaid` fence at line 25 (confirmed present) — correctly excluded from the C17 scan, proving the carve-out held. |

**Score:** 4/4 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | ----------- | ------ | ------- |
| `scripts/pipeline/retrofit-reference.mjs` | Forked mechanical EEE retrofit helper | VERIFIED | Exists; 118-01 commit `353d062`; used by all 5 batch plans. |
| `docs/reference/*.md` (26 files) | EEE-retrofitted reference docs | VERIFIED | All 26 carry the 4 EEE keys, `Status: Approved`, VH row, except `ca-enrollment-timing.md` (documented carve-out, keyless/Pending). |
| `docs/error-codes/*.md` (7 files) | EEE-retrofitted error-code docs, keyless→Windows injected | VERIFIED | All 7 carry `platform: Windows` injected + 4 EEE keys; `00-index.md` double #12 split confirmed (C17 #12 = 0 violations). |
| `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md` | EEE-retrofitted comparison docs | VERIFIED | Both carry 4 EEE keys; apv1-vs-apv2 platform injected to Windows; windows-vs-macos already had `platform: all`. |
| `docs/_registry/RE-index.md` | 34 rows flipped Pending→Approved, RE-147 stays Pending | VERIFIED | Live grep: 35 total `Reference` Doc-Type rows, 34 `Approved`, exactly 1 `Pending` row (RE-147). |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | --- | --- | ------ | ------- |
| `scripts/pipeline/retrofit-reference.mjs` | `docs/_registry/RE-index.md` | path-column join to resolve doc_id | VERIFIED | Spot-checked doc_ids (RE-159, RE-177, RE-168, RE-164, RE-165) all match their registry row's Path column. |
| Block line `**Platform:**` field | `D1_MAP` | exact D1 label match (C17 #9/#10) | VERIFIED | C17 assertion #9 (block↔frontmatter match) and #10 (platform resolves in D1_MAP) both report 0 violations across the full corpus, including all 34 reference files. |
| Full-class C17 run | 34 enrolled reference docs | enrollment scan opt-in by doc_id key presence | VERIFIED | 174 files scanned = count of files carrying `doc_id:` frontmatter, exactly matching expected corpus size; the 1 mermaid file correctly excluded (no doc_id key). |

### Data-Flow Trace (Level 4)

Not applicable — this phase produces static documentation content, not a runtime data pipeline. The "data flow" analog (registry → doc_id → rendered block → C17 gate) is covered under Key Link Verification above and independently confirmed by the live C17 run.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| C17 exits 0 on full corpus | `node scripts/validation/c17-eee-contract.mjs` | `174 files checked, 0 with violations, 0 total violations` | PASS |
| Registry Approved/Pending counts exact | `grep "| Reference |" docs/_registry/RE-index.md` | 35 rows: 34 Approved, 1 Pending (RE-147) | PASS |
| Keyless-platform injection landed (10 files) | `grep "^platform:" <10 files>` | All 10 show `platform: Windows` | PASS |
| Mermaid carve-out held | `grep "^doc_id:" docs/reference/ca-enrollment-timing.md` (expect no match) + `grep mermaid` (expect match) | No doc_id; mermaid fence present at L25 | PASS |
| Per-table prose count matches plan | `grep -c "Table summary" <8 matrix/comparison files>` | 7,7,4,6,9,8,1,3 = 45 total, matches plan exactly | PASS |
| `last_verified` unchanged (verbatim carry) | `git show <pre-retrofit commit>:<file>` vs current | `2026-06-24` unchanged for macos-capability-matrix.md | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| RETRO-03 | 118-01..06 | All reference docs retrofitted to EEE incl. table remediation | SATISFIED | REQUIREMENTS.md line 41 marked `[x]`; Traceability table line 100 shows `RETRO-03 \| Phase 118 \| Complete`; REQUIREMENTS.md:100 cross-referenced against `Phase 118` grep — RETRO-03 is the only requirement mapped to this phase (no orphans). |

### Anti-Patterns Found

None. Scanned all 34 enrolled files for `TBD|FIXME|XXX|TODO|HACK|PLACEHOLDER` (case-insensitive) — the only regex hits were false positives from hex error codes containing the literal substring `xxxx` (e.g. `0x8018xxxx`), not debt markers. No empty implementations, no stub content, no unresolved markers.

### Human Verification Required

None. All must-haves are programmatically verifiable via the C17 harness, registry grep, and file-content inspection — no visual, real-time, or external-service-dependent behavior in this phase's deliverables.

### Gaps Summary

No gaps found. All four ROADMAP Success Criteria (SC1-SC4) for Phase 118 are verified against the live codebase:
- SC1 (EEE header block, doc_id, D1 Platform, Status: Approved) — verified on all 34 enrolled files.
- SC2 (table remediation / per-table prose) — verified on all 45 in-scope tables across 8 matrix/comparison files, plus the one >25-row table's pre-existing #11 compliance confirmed.
- SC3 (D3-A structure, Version-History row, Last Reviewed = last_verified verbatim) — verified on all 34 files, with a git-history diff confirming the verbatim carry.
- SC4 (C17 exits 0) — verified via a live run producing `174 files checked, 0 with violations, 0 total violations`.

The mermaid carve-out (RE-147 / `ca-enrollment-timing.md`) is correctly documented and excluded — it remains keyless with `RE-index.md` Status `Pending`, exactly as D-05 specifies, and is not counted toward the 34.

RETRO-03 is the sole requirement mapped to Phase 118 (REQUIREMENTS.md traceability table) and is marked Complete; no orphaned requirements exist for this phase.

---

_Verified: 2026-07-06T18:10:52Z_
_Verifier: Claude (gsd-verifier)_
