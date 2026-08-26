---
phase: 150-per-oem-bios-guides-capability-matrix
verified: 2026-08-26T05:00:00Z
status: passed
score: 5/5 must-haves verified
behavior_unverified: 0
overrides_applied: 0
---

# Phase 150: Per-OEM BIOS Guides & Capability Matrix Verification Report

**Phase Goal:** Dell, HP and Lenovo each get a guide shaped identically enough that the capability
matrix is a genuine transposition rather than a second artefact that drifts — and a service-desk
reader finds a Recovery section even where the vendor is silent.
**Verified:** 2026-08-26T05:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria, read through the filed D-01/D-02 amendment)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Three per-OEM guides exist at an identical shape (amended to six capability H2s per filed `REQUIREMENTS.md:75` `[AMENDED 2026-08-25]` entry), every Recovery section present, silence stated explicitly | ✓ VERIFIED | `grep -n "^## "` on all three guides returns byte-identical 9-line sets (`Delivery, Authentication, Scope, Prerequisites, Offboarding and Loss of the Management Plane, Recovery, Unsupported and Anti-Feature Callouts, Related Resources, External References`); 7 hand-authored `<a id=...>` anchors in each; HP and Lenovo Recovery sections state documented silences with `as-of` dates and named pages checked (`03-hp-bios-configuration.md:328-350`, `04-lenovo-bios-configuration.md:220-266`) |
| 2 | Inverted-prerequisite pair reads as a cross-vendor decision point (Dell needs a virgin BIOS; Lenovo needs one already set) | ✓ VERIFIED | Canonical sentence lands in `00-overview.md:140` ("Dell wants a virgin BIOS; Lenovo needs a provisioned one"); fixed greppable form in `02-dell-bios-configuration.md:134-142` and `04-lenovo-bios-configuration.md:149-160`; matrix 2×2 sub-table at `firmware-oem-matrix.md:96-103` with four pairwise-distinct cells |
| 3 | HP Connect documented as vendor connector (5 D-23 claims), custody quoted against Dell's no-customer-data statement, both fleet-first order + 30-day countdown + orphaned Remediations | ✓ VERIFIED | All 5 claims present at `03-hp-bios-configuration.md:26-60` (admin.hp.com console, Remediations over Graph, Global Admin→Intune Admin consent chain, Sure Admin cert/key auth, "No per-device agent"); both custody quotes at lines 133-147, 8 lines apart, each with its own `**Source:**` line; fleet-first order + 30-day countdown + orphaned Remediations at `03-hp-bios-configuration.md:281-326` |
| 4 | Lenovo tooling fork stated plainly, model list attached to certificate tool only | ✓ VERIFIED | `04-lenovo-bios-configuration.md:36,54` states TBCT V2 does not support ThinkCentre ("incompatible WMI BIOS Interface"); `:110-135` (Scope) states the exclusion again and explicitly attaches the ThinkPad/ThinkCentre/ThinkStation model-floor sentence to "the certificate tool ... and never to the settings tool," with the reconciliation labeled "this corpus's own reading" |
| 5 | Password custody scope accurate (two RBAC paths, minimum authoring role, post-unenrollment readability); matrix transposes the three guides and is C17-green | ✓ VERIFIED | `02-dell-bios-configuration.md:80-91` states both RBAC paths as an asymmetry, "Policy and Profile manager" as minimum authoring role, and "Passwords remain readable after a device leaves Intune management"; matrix's six capability H2s are byte-identical in order to the three guides' six (`firmware-oem-matrix.md:32-135`); `node scripts/validation/c17-eee-contract.mjs` independently re-run: `235 files checked, 0 with violations, 0 total violations` |

**Score:** 5/5 truths verified (0 present-but-behavior-unverified)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/operations/firmware-bios/02-dell-bios-configuration.md` | Dell guide, 9 H2 / 7 anchors, BIOS-06/09/10 Dell content | ✓ VERIFIED | Exists, correct shape, all claimed content present |
| `docs/operations/firmware-bios/03-hp-bios-configuration.md` | HP guide, BIOS-07/09 content, both custody quotes | ✓ VERIFIED | Exists, correct shape, both quotes juxtaposed with separate evidence lines |
| `docs/operations/firmware-bios/04-lenovo-bios-configuration.md` | Lenovo guide, BIOS-08/06 content, two-tool fork | ✓ VERIFIED | Exists, correct shape, fork and model-list attribution correct |
| `docs/reference/firmware-oem-matrix.md` | RE-226, C17-enrolled, six-table transposition | ✓ VERIFIED | `doc_id: RE-226`, `status: Approved`, byte-identical H2 transposition, 7/7 table-summary blockquotes, Source Attribution present |
| `docs/_glossary.md` | 4 new Hardware terms, index entries, version-history row | ✓ VERIFIED | `Sure Admin`, `Think BIOS Config`, `HP Connect`, `DCECMI` all present under `## Hardware`; frontmatter dates deliberately unchanged per owner ruling, recorded in Version History |
| `.planning/REQUIREMENTS.md` | Filed BIOS-05 six-section amendment naming D-01 | ✓ VERIFIED | Line 75 carries the full `[AMENDED 2026-08-25]` `[OWNER-RULED]` text |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| 3 guides | `00-overview.md` | platform-applicability blockquote route-back | ✓ WIRED | `check-nav-hub-links.mjs`: 0 hub-presence / 0 corpus-link failures |
| 3 guides ↔ each other | cross-vendor contrast links | ✓ WIRED | Confirmed present (Dell↔HP, Dell↔Lenovo, HP↔Lenovo cross-references) |
| Matrix | 3 guides, `00-overview.md`, `01-windows-dfci.md`, `03-tpm-attestation.md` | `## See Also` (6 links, D-13) | ✓ WIRED | All 6 links present at `firmware-oem-matrix.md:191-197` |
| `00-overview.md` | 3 guides + matrix | `## Choosing a Path` outbound links | ✓ WIRED | Lines 128-135; false "not yet written" sentence removed |
| HP guide | `docs/reference/licensing-matrix.md` | license-floor link-not-copy | ✓ WIRED | Present in Prerequisites |
| Guides | `06-windows-driver-firmware-updates.md#unsupported-callouts` | seam sentence | ✓ WIRED | Present in all three guides; `06` file itself confirmed unedited |

### Data-Flow / Transposition Trace

| Artifact | Data Variable | Source | Transposes Correctly | Status |
|----------|---------------|--------|----------------------|--------|
| Matrix Delivery/Authentication/Scope/Prerequisites/Offboarding/Recovery tables | per-OEM cell values | the three guides' equivalent H2 sections | Cell-by-cell spot check (Prerequisites 2×2, Offboarding countdown, Recovery silences) matches guide prose | ✓ FLOWING |

### Behavioral Spot-Checks

Not applicable — this is a pure documentation-corpus phase with no runnable code. Verification instead
re-ran all validator gates independently (below) rather than spot-checking runtime behavior.

### Probe Execution / Gate Re-Runs (independently re-executed, not trusted from SUMMARY)

| Gate | Command | Result | Status |
|------|---------|--------|--------|
| Apex | `node scripts/validation/check-phase-144.mjs` | `101 PASS, 0 FAIL, 0 SKIPPED` | PASS |
| C17 | `node scripts/validation/c17-eee-contract.mjs` | `235 files checked, 0 with violations, 0 total violations` | PASS |
| Nav-hub links | `node scripts/validation/check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | PASS |
| check-phase-54 | `node scripts/validation/check-phase-54.mjs` | `32 passed, 0 failed, 0 skipped` | PASS |
| check-phase-49 | `node scripts/validation/check-phase-49.mjs` | `22 passed, 0 failed, 0 skipped` | PASS |
| v1.20-milestone-audit (C11) | `node scripts/validation/v1.20-milestone-audit.mjs` | `16 passed, 0 failed, 0 skipped` | PASS |

All six gate results match what SUMMARY/what_shipped claimed — independently reproduced, not merely trusted.

### Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|-----------------|-------------|--------|----------|
| BIOS-05 | 01, 02, 03, 04, 05 | Identical shape (amended six-section) | ✓ SATISFIED | 9/9 H2, 7/7 anchor match across all three guides |
| BIOS-06 | 01, 02, 03, 04, 05 | Inverted-prerequisite pair | ✓ SATISFIED | Overview canonical sentence + both guides + matrix 2×2 |
| BIOS-07 | 02, 05 | HP Connect as vendor connector | ✓ SATISFIED | All 5 D-23 claims + both juxtaposed quotes |
| BIOS-08 | 03, 04 | Lenovo tooling fork | ✓ SATISFIED | ThinkCentre exclusion stated; model list on certificate tool |
| BIOS-09 | 01, 02, 03, 04 | Losing management plane loses the secret | ✓ SATISFIED | Dell/HP/Lenovo offboarding content, fleet-first + countdown |
| BIOS-10 | 01 | Password custody scope | ✓ SATISFIED | RBAC asymmetry, minimum role, post-unenrollment readability |
| BIOS-12 | 04, 05 | Enrolled matrix, C17-green, registry row deferred | ✓ SATISFIED | RE-226 Approved, C17 green, no registry row (confirmed, deferred to Phase 152) |

No orphaned requirements — the 7 IDs mapped to Phase 150 in `REQUIREMENTS.md:244` exactly match the
union of `requirements:` fields declared across all 5 plans.

### Anti-Patterns Found

None. `grep -iE "TBD|FIXME|XXX|TODO|HACK|PLACEHOLDER|coming soon|not yet implemented|not yet written"`
across all 6 shipped/edited files returns zero hits inside phase-150 content (one unrelated pre-existing
glossary line matched incidentally and is untouched by this phase). Zero code fences in any of the six
files (`grep -n '^```'` — no hits). All 6 code-review findings (2 Critical, 3 Warning, 1 Info) from
`150-REVIEW.md` independently re-verified as landed in commit `6f21903b`:

- CR-01 (falsified "oldest source" superlative) — clause removed, confirmed absent from `00-overview.md`.
- CR-02 (unsourced HP "Lost password" cell) — restated as an honest scope limit, matrix cell count now agrees with Key Gaps Summary enumeration.
- WR-01 (announcement-as-go-live-date) — both sites now attribute "April 2023" to the announcement only.
- WR-02 (Offboarding vocabulary self-contradiction) — table-summary reasoning restated with the actual structural cause; `n/a` cell justification is now internally consistent.
- WR-03 (overstated re-verification claim) — scoped to what `150-RESEARCH.md` actually re-confirmed.
- IN-01 (circular glossary referent) — "Its" corrected to "HP's."

### Human Verification Required

None. This is a documentation corpus with no runtime behavior; all claims are independently checkable
by reading the shipped bytes against the cited sources, which this verification did (guide prose,
matrix cells, glossary entries, all six independent gate re-runs, and cross-checks of every code-review
fix). No visual, real-time, or external-service behavior is in scope.

### Gaps Summary

No gaps found. All 5 ROADMAP Success Criteria (read through the filed D-01/D-02 six-section amendment),
all 7 requirement IDs, all plan-level must_haves truths/artifacts/key_links spot-checked, and all
9 prohibitions sampled across the 5 plans (no registry row, canaries unbumped, no code fences, no BIOS
token tables, no cmdlet syntax, no per-model matrices, indices untouched, `01-windows-dfci.md` and `06`
untouched, glossary dates unchanged) hold in the actual shipped bytes. The D-80 two-commit contract
(`70978222` content, `2fab0ac5` overview) plus the `6f21903b` fix commit match exactly what
`what_shipped` claimed, and all six gates were independently re-run by this verifier rather than trusted
from SUMMARY.md, with identical results.

The five accepted inconsistencies (D-88) are correctly filed and do not constitute gaps: (a) SC#3's
"both paths" fleet-first phrasing is HP-only in the sources, owner-ruled; (b) matrix ships Approved
without a registry row until Phase 152, as designed; (c) U-6 closed positively (HP Connect confirmed
in Intune's Partner portals tab since the April 2023 announcement); (d) `06-windows-driver-firmware-updates.md` intentionally stays generic while this phase names vendor clients; (e) ROADMAP SC#1's
literal "five-section" text is superseded by the filed REQUIREMENTS.md amendment, per D-02's own
scoping rule.

---

_Verified: 2026-08-26T05:00:00Z_
_Verifier: Claude (gsd-verifier)_
