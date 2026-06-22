---
phase: 78-legacy-sso-plug-in-migration-guide
reviewed: 2026-06-21T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
  - docs/admin-setup-macos/08-auth-methods-deep-dive.md
  - docs/admin-setup-macos/00-overview.md
findings:
  critical: 1
  warning: 2
  info: 2
  total: 5
status: issues_found
---

# Phase 78: Code Review Report

**Reviewed:** 2026-06-21
**Depth:** standard (documentation phase — correctness & operational-safety lens)
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Phase 78 adds the new migration guide `09-enterprise-sso-plugin-migration.md` and
converts two code-span placeholders to live links (in `08` See-Also and `00-overview`
numbered list). The factual/operational substance of the new guide is strong and the
high-risk content the workflow flagged is all correct:

- The four-term product-name hierarchy (umbrella "Microsoft Enterprise SSO plug-in for
  Apple devices" vs "Platform SSO" vs "SSO app extension" vs "Kerberos SSO extension")
  is stated correctly and distinctly (lines 29–32).
- Error 10002 cause (two SSOe payloads on the same device) is correct and consistent
  between the matrix (line 50) and the Staged Migration section (line 79).
- The staged migration order is safe: assign PSSO to pilot → validate (`Device
  Registration: REGISTERED`) → **THEN** unassign legacy (step 4 explicitly "only after
  PSSO is validated"). Never both simultaneously.
- The rollback procedure is complete: destructive Secure Enclave WPJ-key removal, the
  CA-blocked-until-re-registered outage window, and the `security find-certificate` →
  `app-sso platform -s` compliance-script swap are all present.
- The compliance-script swap is stated canonically once up front (lines 55–69) and the
  Rollback section cross-references it (line 129) rather than contradictorily restating.
- "Coexist" is correctly disambiguated as cross-segment fleet coexistence, NOT
  same-device (line 42), and the Kerberos coexistence note is bounded (distinct
  Apple-native extension, separate Extension Identifiers, exactly one PSSO-FUT-04
  out-of-scope cross-ref).
- Phase-80 runbook filename (`35-macos-sso-sign-in-failure.md`) remains a code-span, not
  a live link — C13 gate stays green. No Phase-79 capability-matrix content leaked in.
- Glossary anchors (`#enterprise-sso-plug-in`, `#platform-sso`, `#secure-enclave`) and
  the guide-07/guide-08 See-Also links all resolve. No headings were altered in the two
  edited files (anchor stability preserved).

One genuine defect was found: a broken internal anchor that fails link integrity (the
C13 lens). Two warnings and two info items follow.

## Critical Issues

### CR-01: Broken internal anchor — Rollback callout links to a malformed slug

**File:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md:129`

**Issue:** The compliance-script cross-reference in the Rollback callout links to
`#before-you-migrate--update-compliance-scripts-first` (two hyphens between "migrate"
and "update"). The target heading on line 55 is:

```
## Before You Migrate -- Update Compliance Scripts First
```

Under the standard GitHub-Flavored-Markdown slugger used by this corpus, a literal
`--` flanked by spaces produces **four** hyphens, not two: each surrounding space
becomes one hyphen and the two literal dashes are preserved → the real anchor is
`#before-you-migrate----update-compliance-scripts-first`. The corpus convention is
confirmed by existing good anchors where a space-flanked punctuation char yields exactly
two hyphens (`#advanced--optional-...` from "Advanced / Optional", `#cobo--cope--wpco`
from "COBO / COPE / WPCO"); in those cases the `--` derives from a single ` / `. Here the
heading already contains a literal `--`, so the surrounding spaces add two MORE hyphens.

Impact: the link silently dead-ends. This is exactly the link-integrity failure the C13
gate guards against, and it lands in the single most safety-critical callout in the guide
(the destructive-rollback warning that tells admins to swap their compliance script
*before* rollback). An admin who clicks it to confirm the procedure gets nowhere.

**Fix:** Either correct the link to match the real four-hyphen slug:

```markdown
> - **Compliance-script swap:** See the [Before You Migrate -- Update Compliance Scripts First](#before-you-migrate----update-compliance-scripts-first) prerequisite callout above
```

Or (preferred for readability and to remove the ambiguity at the source) retitle the
heading on line 55 to avoid the space-flanked literal dash, e.g.
`## Before You Migrate: Update Compliance Scripts First`, then link to
`#before-you-migrate-update-compliance-scripts-first`. Verify with the same slugger the
corpus link checker uses before landing.

## Warnings

### WR-01: Step 6 ("simultaneously") reads as contradicting the guide's own Error-10002 invariant

**File:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md:95` (and the
tension with `:116`)

**Issue:** Migration step 6 instructs, for each fleet group, to "assign the PSSO Settings
Catalog profile AND **simultaneously** unassign the legacy Device Features profile." The
guide's own "What Breaks #4" (line 116) states that if both profiles coexist on a device
"even briefly during policy sync," Error 10002 fires and SSO drops. Step 6 does append
"Do NOT allow both profiles to overlap on any device even briefly during policy sync,"
but the word "simultaneously" plus the acknowledged transient-sync window make the
instruction self-contradictory as written: Intune cannot guarantee atomic
assign+unassign across a policy-sync boundary, so a literal reading invites the exact
failure the section warns against. The pilot path (steps 2→4) is correctly staged
(assign → validate → then unassign); step 6 collapses that into one action without the
intervening validation, which is operationally riskier than the text admits.

**Fix:** Reword step 6 to mirror the safe pilot ordering and drop "simultaneously," e.g.
"For each additional group, assign the PSSO profile, confirm `Device Registration:
REGISTERED` on representative devices, THEN unassign the legacy profile — process one
group at a time. A brief overlap during sync may surface Error 10002; keep batches small
to bound the blast radius." This aligns the expansion phase with the pilot phase and
removes the apparent contradiction with line 116.

### WR-02: Decision-matrix "Migrate + Kerberos coexistence" row may imply same-device legacy+PSSO is fine

**File:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md:49`

**Issue:** The matrix row "On-premises AD / Kerberos resources needed → Migrate +
Kerberos coexistence … Both profiles can coexist when identifiers are separate" is
correct for PSSO + Kerberos-SSO-extension, but it sits two rows above the FORBIDDEN
legacy+PSSO row and reuses the word "coexist." A skimming admin who has internalized
"coexist = allowed" from this row could misapply it to the legacy SSO app extension. The
in-text disambiguation (line 42) defines "coexist" as cross-segment for the *legacy*
case, but the Kerberos row introduces a *third* sense of "coexist" (same-device,
different-extension) without re-flagging the distinction inline.

**Fix:** Add a half-clause to the Kerberos row making the distinction explicit, e.g.
"(this is PSSO + the Apple-native Kerberos extension on the same device — distinct from
the FORBIDDEN legacy-SSO-app-extension + PSSO same-device case below)." This keeps the
three senses of "coexist" (cross-segment legacy, same-device Kerberos, forbidden
same-device legacy) unambiguous at the point of reading.

## Info

### IN-01: Matrix "fails silently" wording for macOS 12 duplicated across three locations

**File:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md:48, 51, 113-114, 157`

**Issue:** The macOS-12 "PSSO installs but registration fails silently" fact is stated in
the matrix (line 48), the "What Breaks #3" section (lines 113–114), and the
Configuration-Caused Failures table (line 157). The restatements are mutually consistent
(no contradiction), but three near-verbatim copies increase future drift risk if the
version floor changes.

**Fix:** Optional — designate "What Breaks #3" as canonical and have the matrix/table
rows cross-reference it (mirroring the pattern guide 08 uses for the FileVault fact),
rather than re-asserting the behavior.

### IN-02: VR-3 MEDIUM-confidence WPJ-storage date carries `last_verified`/`review_by` only at section level

**File:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md:69`

**Issue:** The MEDIUM-confidence VR-3 fact (WPJ key moved to Secure Enclave "from
approximately August 2025") is well-annotated with provenance and a 90-day re-verify
note — good practice. The same fact is repeated in guide 08 line 51 ("From August 2025…")
without the MEDIUM-confidence/`review_by` caveat. Not a defect (guide 08 predates this
phase and is out of edit scope here), but worth tracking so the two copies are re-verified
together at the next review cycle.

**Fix:** No change required for Phase 78. Note the cross-file dependency in the
deferred-cleanup tracker so the August-2025 date is re-confirmed in both guides
simultaneously at the 2026-09-21 review.

---

_Reviewed: 2026-06-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
