# Deferred Items — Phase 121

Out-of-scope discoveries logged during plan execution, per the executor's SCOPE BOUNDARY rule
(only auto-fix issues directly caused by the current task's changes; pre-existing issues in
unrelated files/prior tasks are logged here, not fixed in place).

## DEFER-121-07-A: Unfilled `YYYY-MM-DD` Version-History date placeholder (9 files)

**Found during:** 121-07 Task 2 (verification-only plan; no doc/registry writes permitted by design).

**Root cause:** `retrofit-structural.mjs`'s CREATE branch writes a literal `YYYY-MM-DD` token for
the Version-History row's Date column rather than auto-filling the actual retrofit commit date —
the same defect class previously seen and manually fixed per the 117-01/118-04 precedent
("Version-History date placeholder requires manual fill ... filled 2026-07-06 across all 10
files"). That manual-fill step was apparently missed for 9 of the 21 files retrofitted in
Phase 121.

**Affected files (all carry `| YYYY-MM-DD | v1.16 EEE reformat — content not re-reviewed | — |`
instead of a real date):**

| File | Source commit |
|------|----------------|
| docs/_glossary.md | 9531a74 (121-04) |
| docs/_glossary-linux.md | 9531a74 (121-04) |
| docs/ios-lifecycle/00-enrollment-overview.md | 83d39dd (121-05) |
| docs/android-lifecycle/00-enrollment-overview.md | 83d39dd (121-05) |
| docs/android-lifecycle/01-android-prerequisites.md | 83d39dd (121-05) |
| docs/android-lifecycle/02-provisioning-methods.md | 83d39dd (121-05) |
| docs/android-lifecycle/03-android-version-matrix.md | 83d39dd (121-05) |
| docs/linux-lifecycle/00-enrollment-overview.md | 83d39dd (121-05) |
| docs/linux-lifecycle/01-linux-prerequisites.md | 83d39dd (121-05) |

**Not affected** (correctly filled `2026-07-07`): docs/_glossary-android.md,
docs/_glossary-apple-business.md, docs/_glossary-macos.md, docs/_glossary-network.md,
docs/end-user-guides/android-work-profile-setup.md, docs/end-user-guides/linux-intune-portal-enrollment.md,
docs/lifecycle/01-hardware-hash.md, docs/lifecycle/02-profile-assignment.md,
docs/lifecycle/05-post-enrollment.md, docs/lifecycle-apv2/00-overview.md,
docs/lifecycle-apv2/01-prerequisites.md, docs/lifecycle-apv2/03-automatic-mode.md.

**Why deferred, not fixed here:** 121-07 is a verification-only plan (`files_modified: []`,
threat model: "no change to any doc or registry file"). The defect is pre-existing (introduced
in 121-04/121-05, not by this plan's execution) and does not violate any of 121-07's own defined
acceptance criteria — the VH row is present and `last_verified` is carried verbatim in
frontmatter in all 21 files; only the VH table's cosmetic Date column is wrong in these 9.

**Impact:** Low — cosmetic completeness gap in the Version-History audit trail. Does not affect
C17 (195/0), registry status (19 Approved/9 Pending), enrollment, or content integrity.

**Recommended remediation:** A trivial one-line-per-file date fill (replace `YYYY-MM-DD` with
`2026-07-07`, matching the sibling files retrofitted the same day), ideally folded into Phase 122
or done as a quick standalone hygiene commit before Phase 125 close — do not let it reach the
frozen-surface re-baseline unfilled.

## DEFER-121-07-B — retrofit-structural.mjs idempotency + CRLF-write gaps (from 121-REVIEW.md)
  **Status:** acknowledged

**Source:** advisory code review (gsd-code-reviewer), 2026-07-07. Non-blocking — Phase 121 output is verified-clean (C17 195/0); these are robustness gaps for FUTURE re-runs, not defects in the shipped docs.

- **CR-01 (Critical for re-run safety):** `processFile()` has no "already retrofitted" guard. Re-running `node scripts/pipeline/retrofit-structural.mjs --all` in write mode over already-enrolled files would silently duplicate frontmatter keys, embed a second stale EEE block mid-body, and inject a spurious `[FILL-IN] ## Summary` ahead of the real one — while `main()` reports `OK, 0 ERROR(S)`. Inherited from the template forks (retrofit-reference.mjs / retrofit-guide.mjs share the gap).
- **WR-01 (latent):** `readFile()` normalizes CRLF→LF but `writeFileSync` never restores CRLF, contradicting the script's own "Windows repo files contain \r\n" comment. Not currently manifesting (targets are LF-only).

**Recommended remediation:** Phase 122 forks this script per the "fork, don't refactor in place" convention — add an idempotency guard (skip/error if `doc_id` already present) and symmetric line-ending handling in the Phase-122 fork. Full detail in `121-REVIEW.md`.
