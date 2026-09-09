---
phase: "154"
slug: "style-landing-merge-the-verified-google-style-pass"
status: verified
# threats_open = count of OPEN threats at or above workflow.security_block_on severity (the blocking gate)
threats_open: 0
asvs_level: 1
created: "2026-09-03"
---

# Phase 154 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

This phase imported 29 commits and roughly 300 blobs from a foreign repository with unrelated
history and no remote, and landed them over the live documentation corpus through a prefix-mapped
`git apply --3way`. It exposes no network listener, no authentication surface and no authorization
surface; every threat below is an **integrity, measurement or repudiation** threat. The register is
the union of the four plan-time `<threat_model>` blocks (154-01 through 154-04), which share a
phase-level ID namespace — where a threat recurs across plans at different severities, the highest
wins.

`/gsd-secure-phase` was owed for this phase from execution and was carried forward through Phase 155.
This document discharges that debt.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| foreign repository → this object database | `git remote add scratch` + `git fetch` imported 29 commits and ~300 blobs from a tree nothing here had ever validated. | Unvalidated corpus content |
| foreign patch → live working tree | A 281-file diff generated against unrelated history, applied over the live corpus through a prefix map. | Rewritten published prose |
| unmerged index → git history | Three `UU` paths sat in the index between the apply and C3. A commit taken in that window ships conflict markers and exits 0. | Conflict markers |
| tool invocation boundary → registered Stop hooks | Two Stop hooks are registered; their sync commits are pathspec-scoped — exactly the shape that ships markers when unmerged paths exist. | Conflict markers |
| tooling arguments → what gets measured | `sweep3.py` and `pins2.py` take corpus root and pins file as arguments; the wrong argument silently changes what is protected and what is rewritten, without changing the shape of the output. | Measurement validity |
| scratch geometry → main-repo geometry | `c97d322` resolves here after the fetch but is **not** path-compatible with `docs/`; the wrong half in the wrong repository produces a large, plausible, wrong answer. | Measurement validity |
| measurement artifact → Phase 156's proof | `154-GATE-BASELINE.json` is the sole before-half. A wrong SHA makes a downstream green meaningless while every gate still passes. | Audit trail integrity |
| substitution row → corpus (deferred) | Row 26 writes nothing today and rewrites a vendor product name across a document in Phase 156. The fix must be correct now because its effect lands later, under a different plan's gates. | Vendor product name integrity |
| `D:\claude\docs-google-style-test` → this repository | The source has **no remote** and held the only copy of 29 commits. | Irreplaceable history |

---

## Threat Register

20 threats (17 `mitigate`, 3 `accept`): 1 `critical`, 12 `high`, 4 `medium`, 3 `low`. Thirteen were
closed by live commands run during this audit; the remaining seven — the measurement-integrity and
repudiation set — were routed to `gsd-security-auditor` for full-read verification against actual git
history. Two of the auditor's load-bearing claims (the T-154-04 tree-object equality and the
T-154-05 bundle) were independently re-run by the orchestrator rather than accepted as written.

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-154-01 | Tampering | `docs/**` at each of the four commits | critical | mitigate | The conflict-marker gate `git grep -nE '^(<{7}\|={7}\|>{7})' -- docs/` must exit 1 before each of C1–C4, run and recorded four separate times. C17 is measurably blind to this class — it reported 237 files / 0 violations on a tree carrying three live marker blocks. **Re-verified live at HEAD: exit 1, clean.** | closed |
| T-154-02 | Tampering | `sweep3.py` pins argument | high | mitigate | Both recorded sweeps name `scripts/docs-style/_CONTENT-PINS.txt` in full (`154-GATE-BASELINE.json:85,296`). The two `_EMDASH-PINS.txt` runs sit under keys containing `control` / `negative_control_never_a_gate` with an explicit "never a pass/fail input" sibling field; no plan's `<acceptance_criteria>` references their totals. **Pin count re-verified live: 562.** | closed |
| T-154-03 | Tampering | `_CONTENT-PINS.txt`, `_DISPOSITIONS.tsv` | high | mitigate | `pins2.py` prohibited from running (it hardcodes the scratch repository as its corpus source); the post-merge run got a new `_DISPOSITIONS-docs.tsv` sibling rather than an edit. **Re-verified live: `git diff --exit-code` clean.** | closed |
| T-154-04 | Repudiation | `154-GATE-BASELINE.json`, C1 parentage | high | mitigate | See the dedicated finding below. **Verified by command, twice, independently.** | closed |
| T-154-05 | Denial of service | `D:\claude\docs-google-style-test` (no remote, sole copy of 29 commits) | high | mitigate | Both halves survive. `.planning/artifacts/154-scratch-corpus.bundle` is **tracked in this repository** (1,701,557 bytes); `git bundle verify` returns "records a complete history … is okay". `refs/scratch/heads/master` = `e71f8625`, identical to the source repo's HEAD, 29 commits reachable. | closed |
| T-154-06 | Spoofing | `docs/end-user-guides/android-work-profile-setup.md` | high | mitigate | Resolution direction named per file, never lumped; heading and modal phrase asserted present post-resolution, the sample rewrite's tight dashes asserted absent. **`check-nav-hub-links` re-run live: 0 hub-presence / 0 corpus-link failures** — the only automated detector for a wrong-direction android resolution. | closed |
| T-154-07 | Information disclosure | published prose under `docs/` | low | accept | Internal planning references leaking into published prose is a real class here, but it is HYG-02's scope in Phase 157. This phase writes exactly one word of new prose into `docs/` and records rather than fixes any batch-10 defect it notices. | closed — accepted |
| T-154-08 | Elevation of privilege | — | low | accept | No authentication, authorization, session or network surface exists anywhere in this phase. Recorded as genuinely absent rather than filled with a fabricated web threat. | closed — accepted |
| T-154-09 | Tampering | the index across an invocation boundary | high | mitigate | Apply, resolve, gate and commit ran in one invocation; no `UU` path could survive it. The registered Stop hooks' pathspec commits were the concrete attack path. **Re-verified live: `git status --porcelain` empty.** | closed |
| T-154-10 | Tampering | `docs/operations/patch-management/00-overview.md` | high | mitigate | All eight `ours` lines including two whole navigation entries reconstructed and enumerated. A dropped entry is invisible to C17 and surfaces only as a dangling link — **`check-nav-hub-links` re-run live at 0 corpus-link failures.** | closed |
| T-154-11 | Denial of service | the live corpus mid-apply | medium | mitigate | `--3way` implies `--index`, so an interruption leaves a partially-applied index. Recovery path (`git checkout -m -- docs` then `git reset --hard` to the pre-merge SHA) was on disk in the baseline artifact before the apply began. | closed |
| T-154-12 | Repudiation | a vacuously green census | high | mitigate | Every census asserts a non-zero denominator before a zero numerator: `entries_checked: 186`, Title Case `count: 43`, post-merge tight-dash `occurrences: 4365` against pre-merge `7` (strictly greater). STYLE-04's `entries_lost==0` criterion was **falsified by measurement** and disclosed as `WINDOWS.md #11` with root-cause tracing, not papered over. | closed |
| T-154-13 | Tampering | verifier input via the worktree | medium | mitigate | The post-merge run happened on a clean tree with the new dispositions file already committed, because the tool diffs BASE against the worktree and not against HEAD. | closed |
| T-154-14 | Spoofing | running half (a) in the wrong repository | medium | mitigate | Each run records the working directory it executed in; half (a) additionally asserts the scratch repository unmodified and still at its own HEAD before and after. | closed |
| T-154-15 | Tampering | `subs-admin-batch9.tsv` row 26 (deferred effect — rewrites in Phase 156) | high | mitigate | The fixed pattern was **compiled and executed in both directions**, not read: `Sure Admin` → no match (vendor form rejected); `The Admin can sign in.` → matches (bare token preserved). Row count 26 unchanged, row 26 at its original position with 2 tab fields, row 25 byte-identical to `HEAD~1`. **A sibling gap in row 25 falls outside this threat's named scope — see WARNING-154-01.** | closed |
| T-154-16 | Repudiation | historical evidence in acceptance criteria | high | mitigate | Every historical claim independently re-derived from git history rather than from the plan's prose. `git show --stat 0332a61c -- sweep3.py` confirms `KEEP_LINE` grew 3→7 alternates; `git show --name-only 9b3007c1` is empty for `sweep3.py`, confirming the draft's original SHA credit was wrong and was corrected; `git show --numstat 9b3007c1` on the six `subs-*.tsv` files gives 5+3+6+1+4+1 = 20, an exact match; `git show dc7e996` confirms the "Create a local admin account" revert precedent, and that phrase is live in `sweep3.py:48`. All CONFIRMED. | closed |
| T-154-17 | Tampering | `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` | high | mitigate | Annotate-and-supersede with the superseded wording preserved verbatim, scoped edits only, apex chain member baselined before and re-run after in the same task with both runs quoted. | closed |
| T-154-18 | Repudiation | VERIFY-01 flipping to Validated | high | mitigate | `REQUIREMENTS.md:38` names VERIFY-01 explicitly and carries two `[SUCCESS-CRITERION AMENDMENT]` markers (D-16, D-28) **on VERIFY-01's own bullet**, not folded into an SC#2-only amendment — the mitigation's literal test. The amendment openly discloses the unmet "process exits 0" clause and its root cause (`verify-meaning.py`'s `changed_files()` has no path scope). **See WARNING-154-02 on the `Complete` label.** | closed |
| T-154-19 | Tampering | a vacuous standing detector | medium | mitigate | The zero-occurrence assertion for the expanded vendor form runs alongside a strictly-positive count of the short form in the affected document, so an empty search space cannot pass as a clean result. | closed |
| T-154-SC | Tampering | package-manager installs | low | accept | Zero npm, pip or cargo installs — every tool already exists in-repo (RESEARCH.md, Environment Availability). No Package Legitimacy Audit table is required and none is fabricated. | closed — accepted |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above `workflow.security_block_on` count toward `threats_open`*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Finding — T-154-04, the re-pointed baseline

This threat deserves its own record, because what was done looks, at first reading, exactly like the
failure mode the threat was written to prevent.

`154-GATE-BASELINE.json` records `gate_baseline.sha = 8de413aa`, but `measured_at_sha = 789a348a`.
The `sha` field was **re-pointed after the fact**, by owner ruling, so that plan 154-02's
`git rev-parse C1^ == gate_baseline.sha` equality would hold. A value edited to satisfy its own
equality check is ordinarily a repudiation defect.

It is not one here, and the reason is checkable rather than rhetorical. Verified by command, twice —
once by the auditor, once independently by the orchestrator:

| Check | Command | Result |
|-------|---------|--------|
| The `docs` tree is identical across the re-point | `git rev-parse 789a348a^{tree}:docs` vs `8de413aa^{tree}:docs` | Both `2a275d9a1976c380b545e6772b5b5ffdfd23c995` — **equal** |
| C1's true parent | `git rev-parse af678f0c^` | `8de413aa…` — **exact match** |
| Intervening commits touch `docs/` | `git show --stat 0ad34e95`, `git show --stat 8de413aa` | JSON only; ROADMAP/STATE/SUMMARY only — **neither touches `docs/`** |
| The original value survives | `measured_at_sha` vs commit `0ad34e95` | `789a348a…` byte-identical — **preserved verbatim** |
| The edit was not an amend | `git log -p` | Landed in a **new** commit `9086c705` |

Because the two SHAs name the same `docs` tree object, every measured component in the artifact is
still a correct reading of the tree the landing actually built on. This is a stale label corrected on
a sound measurement, not a re-measurement backfilled to fit — and it matches this project's own
sanctioned annotate-and-supersede pattern for the structural fact that GSD close-out always adds a
SUMMARY/STATE/ROADMAP commit after the measurement commit, making any `HEAD == recorded SHA`
precondition unsatisfiable by construction. Logged as `WINDOWS.md #9`.

---

## Warnings — non-blocking, carried forward

**WARNING-154-01 — latent vendor-name corruption in `subs-admin-batch9.tsv` row 25.**
Row 26 (`Admin`) gained `(?<!Sure )` so it will not rewrite HP's product name "Sure Admin" to "Sure
Administrator". Row 25 (`Admins`, plural) did **not** gain the same exemption. The gap is unreachable
today — `grep -rno 'Sure Admins' docs/` returns 0, while "Sure Admin" singular occurs 10+ times in
`docs/operations/firmware-bios/03-hp-bios-configuration.md` and `docs/operations/00-index.md`. It is
therefore latent, not live.

It is nonetheless the **identical mechanism** as T-154-15, with the identical deferred-effect
character: these rows apply in Phase 156. It falls outside T-154-15's literal named scope (that
threat names row 26 specifically), and it was found by code review *after* the 154-04 fix commit
`a7ac71e0`, so it was never patched. Recorded in `154-REVIEW.md` as WR-03 and in `154-VERIFICATION.md`
as "confirmed latent, non-blocking".

*Action owed:* either fix row 25 or register it in Phase 156's threat model **before** Phase 156's
sweep touches `03-hp-bios-configuration.md`.

**WARNING-154-02 — `Complete` against three open ledger entries.**
`REQUIREMENTS.md:142` marks VERIFY-01 `Complete`, while `WINDOWS.md` rows 9, 10 and 11 — the three
deviations that produced VERIFY-01's unmet literal clause and STYLE-04's falsified `entries_lost==0`
criterion — all remain `status: open`. This does not violate T-154-18's mitigation, whose test is
explicit-by-name amendment and which passes. It is a cross-document status inconsistency: a
requirement reads `Complete` while its own root-cause ledger entries are unresolved.

*Action owed:* close `WINDOWS.md` #9/#10/#11 with an explicit disposition, or record the
inconsistency deliberately at the milestone-close audit.

**WARNING-154-03 — two live vacuous-pass mechanisms in `verify2.py`.**
WR-01 (`verify2.py:43` — a silent, misleadingly clean report if `docs/` is not found from cwd) and
WR-02 (`verify2.py:28-30` — `baseline()` discards `git show` failures) are both still present and
unfixed.

Neither made this phase's greens vacuous, and that was checked rather than assumed: every recorded
run produced large, internally-consistent numbers (`resolvedOk: 6271/6271`, `missingFile: 27/27`,
`missingAnchor: 454/454`, stable across baseline and after). A WR-01 wrong-cwd failure produces
all-zero output; a WR-02 bad-BASE failure produces near-universal "LINE COUNT DIFFERS" across all 237
files. Neither shape appears.

*Action owed:* fix both before Phase 156 re-invokes the same script — Phase 156 will not have this
audit's cwd/BASE sanity check available to it.

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-154-01 | T-154-04 | `gate_baseline.sha` was re-pointed from `789a348a` to `8de413aa` by owner ruling rather than re-measured, to satisfy an equality that GSD close-out makes structurally unsatisfiable. Accepted because the two SHAs name the same `docs` tree object (verified twice by command), `measured_at_sha` preserves the original verbatim, and the change landed as a new commit rather than an amend. | Owner (annotate-and-supersede ruling, 2026-09-01) | 2026-09-01 |
| AR-154-02 | T-154-12, T-154-18 | VERIFY-01's literal "process exits 0" clause is **not met** — 3 undispositioned findings on `.planning/STATE.md` and `.planning/WINDOWS.md`, because `verify-meaning.py`'s `changed_files()` has no path scope. Accepted as an openly disclosed amendment rather than worked around by adding path scoping or padding `_DISPOSITIONS.tsv` beyond its 6 rows. Zero undispositioned `docs/` findings — the corpus-meaning guarantee itself is proven. `WINDOWS.md #10`. | Owner (D-28 amendment) | 2026-09-01 |
| AR-154-03 | T-154-12 | STYLE-04's `entries_lost==0` criterion is **falsified**: 45 of 186 `_PINNED-HEADINGS.txt` entries are validator test-fixture string literals that live only in `scripts/validation/*.mjs` and were never `docs/` headings. Confirmed absent from `docs/` at the pre-merge baseline too — zero heading loss attributable to this landing. The plan's D-25 premise is the defect, not the merge. `WINDOWS.md #11`. | Owner (154-04 amendment sweep) | 2026-09-01 |
| AR-154-04 | T-154-07 | Internal planning references leaking into published `docs/` prose is a real class in this corpus; it is deferred to HYG-02 in Phase 157. This phase records rather than fixes any batch-10 defect it notices. | Phase 154 scope | 2026-09-01 |
| AR-154-05 | T-154-08, T-154-SC | Recorded as **genuinely absent** rather than filled with a fabricated web threat: no authentication, authorization, session or network surface exists anywhere in this phase, and it performs zero npm/pip/cargo installs. | Phase 154 threat models | 2026-09-01 |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-09-03 | 20 | 20 | 0 | `gsd-security-auditor` (7 high-severity, full read against git history) + orchestrator (13, live commands; 2 auditor claims independently re-run) |

### Audit notes — 2026-09-03

- The audit was run retroactively. `/gsd-secure-phase` was owed from Phase 154's execution and was
  carried through Phase 155 before being discharged here, after 155's own verification.
- Two of the auditor's load-bearing claims were **not** taken on trust: the T-154-04 `docs` tree-object
  equality and the T-154-05 bundle were both re-run by the orchestrator against live git state. Both
  held. This follows the project's own standing lesson that a written audit log is not evidence.
- Three warnings are carried forward (WARNING-154-01, -02, -03 above). None is blocking; all three
  have a named action owed, and two of them come due in Phase 156.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-09-03
