---
phase: 133-chain-validator-tooling-debt-closure
reviewed: 2026-07-19T00:00:00Z
depth: standard
files_reviewed: 16
files_reviewed_list:
  - scripts/validation/check-phase-60.mjs
  - scripts/validation/check-phase-61.mjs
  - scripts/validation/v1.4-audit-allowlist.json
  - scripts/validation/v1.4.1-audit-allowlist.json
  - scripts/validation/v1.5-audit-allowlist.json
  - scripts/validation/v1.6-audit-allowlist.json
  - scripts/validation/v1.7-audit-allowlist.json
  - scripts/validation/v1.8-audit-allowlist.json
  - scripts/validation/v1.9-audit-allowlist.json
  - scripts/validation/v1.10-audit-allowlist.json
  - scripts/validation/v1.11-audit-allowlist.json
  - scripts/validation/v1.12-audit-allowlist.json
  - scripts/validation/v1.13-audit-allowlist.json
  - scripts/validation/v1.14-audit-allowlist.json
  - scripts/validation/v1.15-audit-allowlist.json
  - scripts/validation/v1.16-audit-allowlist.json
findings:
  critical: 0
  warning: 1
  info: 1
  total: 2
status: issues_found
---

# Phase 133: Code Review Report

**Reviewed:** 2026-07-19
**Depth:** standard
**Files Reviewed:** 16
**Status:** issues_found

## Summary

This is a data-integrity review of the TOOL-04 coordinate-only re-pin (14 `-audit-allowlist.json`
sidecars) plus the TOOL-06 stderr slice-budget edit (`check-phase-60.mjs`, `check-phase-61.mjs`).
Verification method: cross-checked every re-pinned `{file,line}` coordinate for the pin-coordinate
categories (`supervision_exemptions`, `c7_knox_allowlist`, `c9_exemptions`, `safetynet_exemptions`)
against `v1.17-audit-allowlist.json` ground truth; ran `git show aaf0d2f~1:<path>` to diff every
sidecar's pre-fix content against post-fix content; spot-read the cited `docs/*.md` lines directly
to confirm the pinned occurrence actually sits there; live-ran 4 of the 14
`v1.<X>-milestone-audit.mjs --verbose` harnesses (v1.4, v1.4.1, v1.9, v1.14) to confirm C2/C7/C9/
safetynet genuinely PASS; programmatically confirmed all 9 Group-S sidecars (v1.5–v1.13) are
byte-identical across the 4 pin categories; confirmed all 14 files parse as valid JSON with no
unexpected duplicate `{file,line}` entries.

**No value-masking found.** Every re-pinned coordinate I checked — including all 3 fragmentation-
expansion targets (glossary 89/93, 125/127/129/131, cobo 51/53) and all 3 R-2/R-3/R-4 content-
timeline-gap additions (capability-matrix:129, glossary:151, glossary:330) — lands on a live line
that genuinely contains the described supervision/Knox/COPE content. The Group-S computation is
verified byte-identical across all 9 sidecars. The `.mjs` edits are scoped exactly as attested:
`check-phase-60.mjs:201` and `check-phase-61.mjs:397` changed only the `--self-test` catch-block
`n: 200 → n: 1000`; the `n: 500` CHAIN/harness-exit sites at both files are unchanged (verified by
direct grep of all `execFailDetail(...)` call sites).

One genuine data-integrity defect was found in the R-1 override for `v1.4.1` (WR-01): the "reused
each pin's own original, byte-unchanged reason text" claim in the SUMMARY is false for this one
pin — v1.4.1's MHS-note pin at re-pinned line 303 carries `v1.4`'s reason text (byte-identical to
v1.4's own entry), not v1.4.1's own pre-existing reason text (confirmed via `git show aaf0d2f~1`).
The line target itself is correct (spot-checked against `docs/_glossary-android.md:303`), so this
does not cause a false PASS/masking outcome, but it is a provenance/audit-trail corruption that
directly contradicts this phase's own D-01 contract ("reason text is never altered ... only the
line integer moves") and the SUMMARY's explicit factual claim about what was done.

## Warnings

### WR-01: v1.4.1's R-1-corrected MHS pin carries v1.4's reason text, not its own

**File:** `scripts/validation/v1.4.1-audit-allowlist.json:14` (supervision_exemptions, line 303 entry)
**Issue:** The SUMMARY (`133-02-SUMMARY.md` line 124) states the R-1 override was "Corrected to a
normal identity-preserving move (134->303 for v1.4, 172->303 for v1.4.1), reusing each pin's own
original, byte-unchanged reason text." This claim is false for v1.4.1. Confirmed via
`git show aaf0d2f~1:scripts/validation/v1.4.1-audit-allowlist.json`: the pre-fix v1.4.1 entry at
old line 172 carried its own distinct reason text — `"MHS cross-platform note referencing iOS
supervised MDM profile (re-verified 2026-04-25 post Plan 46-02 Wave 2; line shifted +13 from Plan
45-10 baseline due to Private Space H3 insertion + see-also blockquotes + frontmatter freshness
add)"` — consistent with every other v1.4.1 supervision entry's `"(re-verified 2026-04-25 post Plan
46-02 Wave 2 ...)"` annotation pattern. The post-fix file instead carries v1.4's plain
`"(verified 2026-04-24)"` text verbatim (byte-identical to v1.4's own line-303 entry), which is
provably not v1.4.1's own history — v1.4.1 postdates v1.4 by one revalidation wave and every one
of its sibling pins reflects that. This indicates the executor's re-pin tooling cross-contaminated
the two sidecars for this one pin (likely copy-pasted the already-fixed v1.4 entry as a template
for v1.4.1 instead of moving v1.4.1's own pre-existing entry).
Functionally harmless (the C2 check still passes because the *line* is correct — verified live via
`node scripts/validation/v1.4.1-milestone-audit.mjs --verbose`), but it corrupts the audit trail
this phase exists to produce, and directly violates D-01's "reason text is never altered ... only
line integer moves" contract plus the SUMMARY's own factual attestation.
**Fix:** Restore v1.4.1's own original reason text at the line-303 supervision entry:
```json
{"file": "docs/_glossary-android.md", "line": 303, "reason": "MHS cross-platform note referencing iOS supervised MDM profile (re-verified 2026-04-25 post Plan 46-02 Wave 2; line shifted +13 from Plan 45-10 baseline due to Private Space H3 insertion + see-also blockquotes + frontmatter freshness add)"}
```
(This is a text-only correction; do not touch the `line` value, which is already correct.)

## Info

### IN-01: check-phase-48.mjs's matching HELPER-SPAWN-STDERR-01 site was deliberately left at n:200, diverging from the other two sites in this same category

**File:** `scripts/validation/check-phase-48.mjs:85` (not in this review's file scope, but directly
relevant to the `n:200→n:1000` change reviewed here)
**Issue:** CONTEXT's TOOL-06 decision names 3 sites converging on one slice-budget value:
`check-phase-{48,60,61}.mjs`. Only 2 of the 3 (`60`, `61`) were changed in this review's scope; a
separate commit (`ba6d53f4`, "keep check-phase-48 self-test budget at n:200 (frozen V-111-TOOL03
contract)") explicitly declined to touch 48 because a frozen downstream test (`V-111-TOOL03`)
asserts the literal `n:200` value. This is not a defect — it's a documented, deliberate exception —
but it means TOOL-06's "3 sites converge" framing is only 2/3 true post-133, and a future reader of
`check-phase-60.mjs`/`check-phase-61.mjs` alone (without also reading `ba6d53f4`'s commit message)
would reasonably expect `check-phase-48.mjs` to match. No action required for this review's scope;
flagging so Phase 134's close-audit doesn't mistake the divergence for accidental drift.
**Fix:** None needed for this phase; ensure the `ba6d53f4` rationale is cross-referenced from
Phase 134's TOOL-06 closure note if TOOL-06 is cited as "3/3 sites converged."

---

## Verification detail (supporting the "no value-masking" conclusion)

- **v1.17 ground-truth convergence:** every one of v1.4, v1.4.1, and all 9 Group-S sidecars now
  carries exactly 26 supervision / 10 c7_knox / 4 c9 / 4 safetynet pins with `{file,line}` values
  identical to `v1.17-audit-allowlist.json`'s own pins (v1.4/v1.4.1 correctly carry 0 c7_knox/c9,
  since those categories predate their content). v1.14 and v1.15 converge identically. v1.16 was
  already Case-1-solved pre-phase and is unchanged in identity.
- **Fragmentation targets spot-checked directly in `docs/_glossary-android.md`:** lines 37, 89, 93,
  125, 127, 129, 131, 145, 147, 151, 218, 220, 224, 303, 330, 333 and `docs/reference/
  android-capability-matrix.md:129` and `docs/admin-setup-android/03-fully-managed-cobo.md:51-53`
  all genuinely contain the described supervision/Knox content at the pinned line.
  `docs/android-lifecycle/00-enrollment-overview.md:65-97` also spot-checked and correct.
- **Live harness re-run:** `v1.4`, `v1.4.1`, `v1.9` (Group-S), `v1.14` `--verbose` all show C2
  (supervision) PASS, and v1.9/v1.14 additionally show C7/C9 PASS and safetynet-relevant C1 PASS,
  matching the SUMMARY's per-category table exactly.
- **Group-S byte-identity:** programmatically confirmed (`JSON.stringify` comparison across the 4
  pin-category arrays) that v1.6–v1.13 are identical to v1.5, as claimed.
- **No unexpected duplicate `{file,line}` pins** introduced in `supervision_exemptions`,
  `safetynet_exemptions`, or `c9_exemptions` for any of the 14 sidecars (the legitimate `c7_knox`
  same-line dup pairs at glossary:220 are pre-existing and correctly preserved, not new).
- **`.mjs` scope containment confirmed:** `check-phase-60.mjs` and `check-phase-61.mjs` each have
  exactly one `n:1000` site (the `--self-test` catch block) and their `n:500` CHAIN/harness-exit
  sites are byte-unchanged from pre-fix.

---

_Reviewed: 2026-07-19_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
