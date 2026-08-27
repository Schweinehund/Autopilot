---
phase: 152-integration-registry-navigation-last-close
verified: 2026-08-27T17:22:02Z
status: human_needed
score: 5/5 must-haves verified
behavior_unverified: 0
overrides_applied: 0
deferred:
  - truth: "SC#5 enforcement half — Recipe #5's hub coverage is enforced by a successor validator authored additively"
    addressed_in: "Phase 153"
    evidence: "ROADMAP Phase 153 Success Criterion 3: 'the 19th Path-A lineage bump exists — milestone audit script, allowlist sidecar and baseline — together with the leaf validators for Phases 145 through 152 and the apex'. The needle-spec is fully pre-specified at .planning/STATE.md:633 (HARN-04) covering both hub files and the filename map, plus the negative needle and the never-edit-the-frozen-validator constraint."
human_verification:
  - test: "Read docs/index.md:276 against docs/recipes/05-enterprise-update-plan.md:30 and decide whether the recipes section lead-in must be amended now or deferred to a hygiene pass."
    expected: "The lead-in should not universally promise 'a concrete, reproducible device configuration end-to-end ... from zero to verified end state' when Recipe #5 self-describes as 'A tenant-wide configuration plan, not a per-platform procedure guide.'"
    why_human: "Prose-accuracy judgement. No validator can see it — the apex, C17 and the link checker are all green with the contradiction in place. This phase amended the sibling quick-nav lead-in at line 38 for exactly this reason and left line 276, so the omission is inconsistent rather than deliberate; whether that is worth a third content commit against D-01's two-commit contract is an owner call."
  - test: "Decide whether build-publish-bundle.mjs:40's 'v1.17' VERSION default is fixed in code before Phase 153 regenerates the bundle, or stays under D-23's procedural mitigation."
    expected: "Either the default becomes fail-closed (require --version) or D-23's 'always pass --version' is carried forward as an explicit Phase 153 precondition."
    why_human: "Risk-acceptance judgement on inherited debt. Phase 152 discharged its own obligation (dist/docs-library-v1.21.0.zip exists, dist/docs-library-v1.17.zip is absent), but Phase 153 SC#4 regenerates the bundle and a forgotten flag there silently writes a misnamed archive."
---

# Phase 152: Integration, Registry & Navigation-Last Close Verification Report

**Phase Goal:** Everything authored this milestone becomes reachable — publish bundle, hubs, indexes — through one atomic registry commit, with the full corpus green and no accepted-violation baseline introduced.
**Verified:** 2026-08-27T17:22:02Z
**Status:** human_needed
**Re-verification:** No — initial verification

Every number below was produced by a command run during this verification. Nothing is transcribed from a SUMMARY.

## Goal Achievement

### Observable Truths

| # | Truth (ROADMAP Success Criteria) | Status | Evidence |
|---|---|---|---|
| 1 | One commit lands every new registry row at `Status: Approved`, a generator-produced `filename-map.md`, and both canary literals bumped — content phases having touched the registry not at all | ✓ VERIFIED | `git log --oneline 56f55307..HEAD -- docs/_registry/ scripts/pipeline/` returns **exactly 1** commit (`74917b7d`), touching **exactly 4** files. `grep -c "^\| RE-"` = **236**; `grep -c "^\| RE-.*\| Approved \|$"` = **236**. Filename-map diff is `11 added / 0 removed` — pure additions, zero reordering, zero incumbent renames. |
| 2 | Both canary targets computed from the registry after the rows land, measured separately over different sets, both `--self-test` runs pass | ✓ VERIFIED | Ran both myself: `build-filename-map.mjs --self-test` → **8 passed, 0 failed, exit 0** (assertion (c) `rows.length=236`); `build-publish-bundle.mjs --self-test` → **15 passed, 0 failed, exit 0** (assertion (a) Approved-selection = 236). The two assert over different sets — all rows (`:285`) vs Approved-only (`:525`). Phase 137 provenance line intact verbatim in both, Phase 152 line appended beneath. |
| 3 | New `docs/operations/**` documents carry registry and filename-map rows and no document identifier, and a reader finds them in the regenerated publish bundle without being C17-gated | ✓ VERIFIED | Opened `dist/docs-library-v1.21.0.zip`: **238 entries = 236 .docx + manifest.csv + README.md**. All **11/11** new documents present by their generated names, all 11 present as manifest rows, sizes 17,285–53,497 bytes (substantive, not stubs). All **9** operations documents carry **0** `doc_id`/`status` frontmatter keys. C17's enrolled set is 236 files and contains **none** of the nine. |
| 4 | Navigation wired last: docs index recipes row, quick-nav fragment appended to the single existing line, Operations entry; operations index Patch row, a Firmware H2 that is not the barred literal, Version History row | ✓ VERIFIED | Ordering proven by commit sequence — registry `74917b7d` precedes nav `4816635b`. Master hub: recipes table **5** rows, Firmware H3 **3** rows, Patch sub-table **4** rows. Ops index: Patch **9** rows, Firmware H2 **6** rows placed between `## Apple Business Governance` and `## Version History`. Quick-nav is **one** line, amended in place — the unified diff shows exactly 1 removed / 1 added for that line, never split. Version History rows sit at the top of both reverse-chronological tables. |
| 5 | Recipe #5's hub coverage enforced by a successor validator authored additively — the frozen validator byte-unchanged — and full-corpus C17 plus the link checker both exit 0 | ✓ VERIFIED (this phase's half; enforcement deferred — see Deferred Items) | `git diff 56f55307..HEAD -- scripts/validation/` is **empty** — the whole tree, including `check-phase-132.mjs` and the audit allowlist, is byte-unchanged, and zero validators were authored. Ran both gates: C17 **236 files, 0 with violations, 0 total, exit 0**; `check-nav-hub-links.mjs` **0 hub-presence, 0 corpus-link, 0 total, exit 0**. Content precondition holds: the three troubleshooting hubs contain `recipes/05-` **0** times each. |

**Score:** 5/5 truths verified (0 present, behavior-unverified)

### Deferred Items

| # | Item | Addressed In | Evidence |
|---|---|---|---|
| 1 | SC#5's enforcement half — the successor validator giving Recipe #5 hub coverage | Phase 153 | ROADMAP Phase 153 SC#3 names "the leaf validators for Phases 145 through 152 and the apex". `scripts/validation/check-phase-152.mjs` does not exist, by design (D-57, D-62). The needle-spec is on the surface a Phase 153 planner reads — `.planning/STATE.md:633` — and covers both hub files **and** the filename map (`RE-226`..`RE-236`), the line-scoped quick-nav test, the negative needle, and the never-edit-the-frozen-validator constraint. Handoff appears exactly **once** in STATE.md (no duplicate block). |

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `docs/_registry/RE-index.md` | 11 new rows at Approved | ✓ VERIFIED | 236 rows / 236 Approved; RE-226..RE-236 append in strict ascending order at the table tail |
| `scripts/pipeline/filename-map.md` | Generator-produced, 11 additions | ✓ VERIFIED | 11 added / 0 removed; worktree byte-identical to committed blob (`git status --porcelain -- scripts/pipeline/` empty) |
| `scripts/pipeline/build-filename-map.mjs` | Canary 225→236 | ✓ VERIFIED | `236` on 4 lines, `225` on 2 surviving history lines — exactly the pinned precision edge |
| `scripts/pipeline/build-publish-bundle.mjs` | Canary 225→236 | ✓ VERIFIED | `236` on 5 lines, `225` on 2 surviving history lines |
| `dist/docs-library-v1.21.0.zip` | Real bundle, 236 docx | ✓ VERIFIED | 4,069,321 bytes; 236 .docx + manifest + README. `dist/docs-library-v1.17.zip` **absent** |
| `docs/index.md` | Recipes row, quick-nav, Firmware H3, Linux row | ✓ VERIFIED | All four present; only 2 lines amended in the whole file |
| `docs/operations/00-index.md` | Firmware H2, 4 Patch rows, Version History | ✓ VERIFIED | 6-row Firmware table incl. the cross-directory matrix row; Patch 5→9 |
| 4 inbound-link host files | One link each | ✓ VERIFIED | All four present, one per file, in Commit B |
| `.planning/STATE.md` | Needle-spec handoff | ✓ VERIFIED | Line 633, fully pre-specified, single occurrence |

### Key Link Verification

| From | To | Via | Status | Details |
|---|---|---|---|---|
| Registry Approved filter | Publish bundle | `Status: Approved` selection | ✓ WIRED | 236 Approved rows → 236 .docx in the zip; parity exact |
| Registry Title column | `.docx` filename | `build-filename-map.mjs` | ✓ WIRED | All 11 Titles equal their file's H1 verbatim; 0 incumbent renames |
| `06-windows-driver-firmware-updates.md` | `firmware-bios/00-overview.md` | Related Resources bullet | ✓ WIRED | Link checker resolves it |
| `app-lifecycle/00-overview.md` | `patch-management/08-windows-app-updates.md` | Related Resources bullet | ✓ WIRED | Resolves |
| `admin-setup-apv2/02-etg-device-group.md` | `08-windows-app-updates.md#enterprise-app-management-store-apps-and-winget--routing` | Inline WinGet link | ✓ WIRED | Target heading exists at `:252`; the double-hyphen slug is correct for the em-dash |
| `admin-setup-apv1/01-hardware-hash-upload.md` | `firmware-bios/01-windows-dfci.md#prerequisites-and-disqualifiers` | See Also entry | ✓ WIRED | Target heading exists at `:59` |
| Ops-index Firmware table | `../reference/firmware-oem-matrix.md` | Cross-directory row | ✓ WIRED | Link checker 0 failures |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|---|---|---|---|---|
| `manifest.csv` | RE-ID / Output Filename | `parseRegistry(RE-index.md)` | Yes — 236 real rows | ✓ FLOWING |
| `manifest.csv` | Status | Source frontmatter, `''` fallback | 227 populated, **9 blank** | ✓ FLOWING (blanks are the designed D-28 outcome, not a stub) |
| Bundle `.docx` set | 236 documents | Approved-row selection → convert | Yes — 17KB–53KB payloads | ✓ FLOWING |

The nine blank `Status` cells are exactly `RE-228`..`RE-236` — the nine operations documents, which carry no `status` key by INT-02's owner ruling. This is the empirical confirmation of D-28's accepted disposition, verified by reading the manifest out of the zip, not by trusting the claim.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|---|---|---|---|
| Filename-map canary holds | `node scripts/pipeline/build-filename-map.mjs --self-test` | 8 passed, 0 failed | ✓ PASS (exit 0) |
| Publish-bundle canary holds | `node scripts/pipeline/build-publish-bundle.mjs --self-test` | 15 passed, 0 failed | ✓ PASS (exit 0) |
| Full-corpus C17 | `node scripts/validation/c17-eee-contract.mjs` | 236 files, 0 violations, all 13 assertions 0 | ✓ PASS (exit 0) |
| Link checker | `node scripts/validation/check-nav-hub-links.mjs` | 0 hub-presence, 0 corpus-link, 0 total | ✓ PASS (exit 0) |
| Apex chain | `node scripts/validation/check-phase-144.mjs` | 101 PASS, 0 FAIL, 0 SKIPPED | ✓ PASS (exit 0) |
| Bundle reachability | Python `zipfile` read of `dist/docs-library-v1.21.0.zip` | 11/11 new docs present, 11/11 in manifest | ✓ PASS |

All three terminal gates were run by this verifier at HEAD, independently reproducing the orchestrator's numbers.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| INT-01 | 152-01 | One atomic unit, one commit; rows Approved, map regenerated, both canaries bumped | ✓ SATISFIED | Exactly 1 commit, 4 files, 11 pure map additions |
| INT-02 | 152-01, 152-02 | Ops docs get registry + map rows, no `doc_id`; reach the bundle; not C17-gated; legacy 20 not retrofitted | ✓ SATISFIED | 0 `doc_id` in all 9; all 9 in the zip and manifest; C17 enrolled set excludes them; no files added under `docs/` |
| INT-03 | 152-01 | Canary target computed from the registry, never hard-coded from a document count | ✓ SATISFIED | Both self-tests are strict equalities at 236 and pass; two instruments, two sets |
| INT-04 | 152-03, 152-04 | Navigation-last wiring on both index surfaces | ✓ SATISFIED | All six enumerated elements present; quick-nav still one line |
| INT-05 | 152-04 | Recipe #5 hub coverage added additively in a successor validator; frozen validator never edited | ◑ PARTIAL — content precondition SATISFIED, enforcement DEFERRED | `check-phase-132.mjs` byte-unchanged; needle-spec handed to Phase 153, which the ROADMAP assigns the leaf validator |
| INT-06 | 152-04 | Full-corpus C17 and link checker green, no accepted-violation baseline | ✓ SATISFIED | Both gates exit 0; `scripts/validation/` entirely byte-unchanged, allowlist untouched |

All six requirement IDs declared across the four plans are accounted for. `.planning/REQUIREMENTS.md` maps Phase 152 to `INT-01..INT-06` (6 requirements) and no additional ID is mapped to this phase — **zero orphaned requirements**.

Per D-75 the requirement checkboxes are the close-gate's to flip, so their current state is not assessed as a gap. Noted for the close-gate only: `INT-01`/`INT-02`/`INT-03` are already `[x]` with traceability rows reading `Complete`, while `INT-04`/`INT-05`/`INT-06` read `[ ]` / `Pending`. The close-gate needs to flip three rows, not six.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|---|---|---|---|---|
| `docs/index.md` | 404 | The word `TBD` inside a Version History row | ℹ️ Info | Pre-existing since Phase 24, not introduced here — `git diff 56f55307..HEAD` shows no added line containing it. Historical prose describing placeholders that were *resolved*, not an open debt marker. |

Scanned all 10 files changed by the two content commits for `TBD|FIXME|XXX|TODO|HACK|PLACEHOLDER`. Nine are clean; the tenth hit is the pre-existing historical row above. **No unreferenced debt marker was introduced by this phase**, so the debt-marker gate does not fire.

Tree noise from the concurrent Google-style pass was excluded by narrowed pathspecs throughout. The forms I ran were `git status --porcelain -- docs/`, `git status --porcelain -- scripts/pipeline/` and `git diff 56f55307..HEAD -- <path>`; both status forms returned empty. I did not run a bare `git status`, and I modified nothing.

### Known Findings — do either block the goal?

Both were pre-confirmed by the orchestrator; I re-read each in the source to classify it, and neither is re-derived here.

**CR-01 — `docs/index.md:276` recipes lead-in contradicts Recipe #5. ⚠️ WARNING, does not block.**
Real and confirmed: the lead-in promises "each yields a concrete, reproducible device configuration end-to-end ... from zero to verified end state" while `docs/recipes/05-enterprise-update-plan.md:30` states "A tenant-wide configuration plan, not a per-platform procedure guide."
It does not block because it fails no stated obligation. SC#4 enumerates three master-hub deliverables — recipes row, quick-nav fragment, Operations entry — and all three are present. D-42 constrained the *row* description ("does not imply a device end state"), and the shipped row complies. No decision in D-01..D-75 scoped the section lead-in, so this is an **omission in the decision set**, not a violated decision. It breaks no reachability, reddens no gate, and leaves no stub. It is nonetheless a genuine inconsistency the phase created the conditions for and half-corrected — the sibling lead-in at line 38 *was* amended for exactly this reason — so it is routed to human decision rather than silently passed.

**CR-02 — `build-publish-bundle.mjs:40` `VERSION` defaults to `'v1.17'`. ⚠️ WARNING, does not block.**
Real and confirmed. It does not block for two measured reasons. First, the phase discharged its own obligation: the run used `--version=v1.21.0`, `dist/docs-library-v1.21.0.zip` exists, and `dist/docs-library-v1.17.zip` is **absent** — the amended D-23 tripwire is an absence assertion and it holds. Second, this is **inherited debt, not a phase-152 regression**: `git diff 56f55307..HEAD -- scripts/pipeline/build-publish-bundle.mjs` touches no line containing `VERSION` or `v1.17`, and `git log -S"'v1.17'"` dates the default to `2eae4653` in Phase 127. The residual risk is forward-looking — Phase 153 SC#4 regenerates the bundle — which is why it is raised for a human decision rather than closed.

### Gaps Summary

None. No truth failed, no artifact is missing or stubbed, no key link is unwired, and no blocker anti-pattern was introduced.

The phase goal is achieved on all three of its clauses, each proved by a command rather than a claim: everything authored this milestone **is reachable** (236/236 Approved rows → 236 .docx in a real bundle, all eleven new documents present and non-trivial, both hubs wired, all four inbound links resolving); the corpus **is green** (C17 236/0/0, link checker 0/0, apex 101/0/0, all exit 0 and all re-run here); and **no accepted-violation baseline was introduced** (`scripts/validation/` byte-unchanged in its entirety — a stronger proof than the allowlist-only check the plan promised).

The single scope reduction is honest and roadmap-sanctioned: SC#5's enforcement half is deferred to Phase 153, which the ROADMAP already tasks with the leaf validators for Phases 145–152, and the needle-spec is fully pre-specified on the surface a Phase 153 planner actually reads.

Status is `human_needed` rather than `passed` solely because two confirmed findings need an owner disposition. Neither is a gap, neither blocks Phase 153, and neither requires a re-plan — but both are judgement calls a verifier should not make silently.

---

_Verified: 2026-08-27T17:22:02Z_
_Verifier: Claude (gsd-verifier)_
