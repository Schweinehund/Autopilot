# Phase 78: Legacy SSO Plug-in & Migration Guide -- Research

**Researched:** 2026-06-21
**Domain:** macOS Enterprise SSO plug-in product-name disambiguation, staged legacy→PSSO migration,
destructive rollback with WPJ/Secure Enclave facts, Kerberos coexistence, corpus mechanics
(C13 gate, atomic commit, anchor stability)
**Confidence:** HIGH overall -- all content facts cross-verified across at least two authoritative
Microsoft Learn / Apple official sources updated 2026-04-14 to 2026-06-15, supplemented by direct
corpus inspection. One fact cluster (VR-3 WPJ→Secure Enclave storage migration exact date) is
MEDIUM. All other claims are HIGH.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**A -- Document structure (WINNER: A1, Pure A3 hybrid)**
- D-01: A3 hybrid skeleton -- custom body over the corpus tail (`## Configuration-Caused Failures`
  + `## See Also` + `| Date | Change | Author |` Version-History). Body section order locked:
  1. Opening disambiguation table (SC1)
  2. When-to-use-which decision matrix (B4 / D-03)
  3. Staged migration sequence + Error 10002 warning (SC2 / DF-5)
  4. What breaks during migration
  5. Mandatory rollback (C1 / D-05)
  6. Kerberos SSO extension coexistence note (D-08)
  7. Corpus tail
- D-01a: Guide 09 is a NEW file -- no internal anchor-stability constraint; section heading names
  are at planner/executor discretion within SC1-SC4 constraints. Anchor stability binds ONLY the
  edited files 08 and 00-overview (body-level, touch no headings).
- D-01b (A1-C1 interlock): Rollback sits at body position 5. Safe because C1 front-loads the
  compliance-script swap prerequisite (D-06) BEFORE the migration sequence.

**B -- Decision matrix shape (WINNER: B4)**
- D-03: Scenario-row "when-to-use-which" matrix scoped strictly to migrate / keep-legacy / coexist.
  Rows = fleet scenarios; columns = recommended path.
- D-03a: Link-not-copy boundary to guide 08 for auth-method selection -- no auth-method capability
  columns in guide 09 matrix.
- D-03b: Routing-facet rows for macOS-version and on-prem-AD/Kerberos point-reference guides 07
  and D-07; do not restate those facts.
- D-03c: "Coexist" = cross-segment coexistence (SUPPORTED), NOT same-device (Error 10002, FORBIDDEN).

**C -- Rollback treatment (WINNER: C1)**
- D-05: Dedicated `## Rollback` section with hard-bordered destructive-action callout. Three SC3
  elements: destructive WPJ-key removal from Secure Enclave + CA-blocked-until-re-registered impact
  window + `security find-certificate` → `app-sso platform -s` compliance-script swap.
- D-06: Up-front pre-migration compliance-script prerequisite callout BEFORE the migration sequence.
  States the swap command ONCE canonically; rollback section cross-references it (D-06a link-not-copy).
- D-06b: VR-3 WPJ→Secure Enclave facts carry `last_verified` / `review_by` annotation (MEDIUM
  confidence per DS-2 90-day cadence).

**D -- Nav-wiring + Kerberos note (WINNER: D1)**
- D-07: Atomically convert BOTH code-spans to live links in the guide-09 commit:
  `00-overview.md:49` and `08-auth-methods-deep-dive.md:327` (body-level edits only, touch no
  headings).
- D-07a: Reciprocal `## See Also` in guide 09 → guides 07 and 08 + glossary
  `docs/_glossary-macos.md#enterprise-sso-plug-in`.
- D-08: Bounded `### Kerberos SSO Extension (Coexistence)` subsection -- exactly the SC4 trio:
  distinct Apple-native extension, separate Extension Identifiers, coexists with PSSO -- plus
  one explicit cross-reference to deferred PSSO-FUT-04. No payload walkthrough.
- D-08a: When converting `00-overview.md:49`, keep the existing Mermaid node `I`
  (`9. Enterprise SSO Plugin Migration`) and the prose description consistent with guide 09's
  actual title; touch no headings.

### Claude's Discretion

- Exact prose wording of the guide, disambiguation table cells, decision-matrix scenario rows/cells,
  migration steps, rollback callout, and Kerberos note -- within the factual constraints above and
  SC1-SC4.
- Exact internal heading names/anchors for guide 09 (new file -- no anchor-stability constraint).
- Which migration "what-breaks" items get their own `last_verified`/`review_by` annotations under
  the DS-2 90-day cadence (Company Portal version floors, Chrome native-messaging host, macOS-version
  gates).
- Whether the disambiguation appears as a table vs a labeled definition list (SC1 requires the
  four-term hierarchy be explicit; format is discretion).

### Deferred Ideas (OUT OF SCOPE)

- Full Kerberos SSO extension deep-dive (PSSO-FUT-04) -- guide 09 ships only the SSOMIG-04
  coexistence cross-reference note.
- Capability-matrix Authentication section + 5-platform comparison macOS cells (SSOREF-02) --
  Phase 79.
- L1/L2 runbooks (sign-in failure #35, SE-key verification #36, L2 #27) -- Phase 80.
- Nav-hub integration (index / common-issues / quick-ref / decision-tree SSO leaf) -- Phase 81.
- v1.9 harness lineage bump -- Phase 82.
- Per-user-MFA → CA-MFA migration prerequisite (DF-3) -- primarily a guide-07/08 concern; mention
  in guide 09 only if it bears on the migration decision, do not re-document.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SSOMIG-01 | Document what the legacy Microsoft Enterprise SSO plug-in is and does NOT do vs. Platform SSO, with a when-to-use-which decision matrix; product-name hierarchy made explicit | Section 1 (disambiguation) + Section 2 (decision matrix) of this research; four-term hierarchy from CD-1/PITFALLS:451-463, SUMMARY:27-33, and FEATURES:34; matrix from FEATURES:233-246 and 3.3 Legacy vs. Platform SSO Decision Matrix |
| SSOMIG-02 | Document staged legacy→Platform SSO migration sequence: assign PSSO to pilot → validate → THEN unassign legacy profile (never both assigned simultaneously → Error 10002), plus what breaks | Migration sequence from MG-1/PITFALLS:540-551 and FEATURES:259-274; Error 10002 from DF-5/PITFALLS:131-152; what-breaks from FEATURES:270-274 and CONTEXT D-01 section 4 |
| SSOMIG-03 | Document mandatory PSSO rollback procedure: destructive WPJ-key removal, CA-blocked-until-re-registered, pre-migration compliance-script update | MG-3/PITFALLS:569-579 and MG-2/PITFALLS:555-562; VR-3/PITFALLS:385-399 for the `security find-certificate` → `app-sso platform -s` swap |
| SSOMIG-04 | Document Kerberos SSO extension coexistence as a cross-reference note: distinct Apple-native extension, separate extension identifiers, coexists with PSSO | MG-4/PITFALLS:583-593 and FEATURES:3.2/FEATURES:222-229; PSSO-FUT-04 cross-reference |

</phase_requirements>

---

## Summary

Phase 78 is a pure documentation phase. No code is written. The planner's job is to produce a
correct, coherent content outline and task sequence for authoring
`docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` and making two atomic nav-wiring
edits. The research therefore focuses on three concerns: (1) verifying and annotating the factual
claims the guide must assert, (2) confirming the mechanical constraints that govern the commit
structure and nav-wiring, and (3) identifying the exact corpus conventions the guide must follow.

All four decisions are locked (A1/B4/C1/D1). Every factual claim needed for the four success
criteria (SC1-SC4) has at least HIGH or MEDIUM confidence from the existing research files
(PITFALLS.md, FEATURES.md, SUMMARY.md), all of which were verified against Microsoft Learn sources
updated between 2026-04-14 and 2026-06-15. One fact cluster -- VR-3 (WPJ→Secure Enclave storage
migration, ~Q3/August 2025) -- is MEDIUM confidence because it was sourced from Jamf Community
and a Microsoft change note rather than a dedicated Microsoft Learn official doc. It requires a
`last_verified`/`review_by` annotation and should not be stated without that caveat.

The mechanical constraints are well-established by the Phase-77 precedent: the C13 15-entry
allowlist check in the frozen v1.8 harness is the only live audit gate; both code-span→live-link
conversions MUST land in the same commit as guide 09; body-level edits only on the two edited
files (00-overview.md and 08-auth-methods-deep-dive.md -- touch no headings). The corpus
conventions (A3 tail shape, hard-bordered callout, `## Configuration-Caused Failures` table column
shape, front-matter, Version-History row format) are all directly readable from sibling guides 07
and 08 and the exemplar 02-enrollment-profile.md.

**Primary recommendation:** The planner needs one plan (78-01-PLAN.md) with three tasks: author
guide 09 in A3 hybrid structure, convert `08-auth-methods-deep-dive.md:327` code-span to live link
+ add Version-History row, convert `00-overview.md:49` code-span to live link + add Version-History
row -- all three in one atomic commit. The verification command is
`node scripts/validation/v1.8-milestone-audit.mjs` passing 15/15.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Product-name disambiguation (SC1) | Corpus (documentation) | -- | Pure documentation fact; no runtime component |
| When-to-use-which decision matrix | Corpus | -- | Configuration decision; guides admin choice of profile type |
| Staged migration sequence | Corpus | -- | Admin-executed MDM policy orchestration; documented only |
| Error 10002 warning | Corpus | -- | Fact about Apple/Intune behavior; documented only |
| Compliance-script swap prerequisite | Corpus | -- | Admin script update; documented as a prerequisite callout |
| Destructive rollback + CA-blocked window | Corpus | -- | Admin-executed MDM + device action; documented only |
| Kerberos coexistence note | Corpus | -- | Configuration coexistence fact; documented only |
| Nav-wiring (code-span → live link) | Corpus | -- | Two atomic edit tasks; no code change |

---

## Standard Stack

This phase ships Markdown documentation only. There is no installable software stack.

### Authoring Toolchain (already present in repo)

| Tool | Version / Status | Purpose |
|------|-----------------|---------|
| `node scripts/validation/v1.8-milestone-audit.mjs` | Frozen v1.8 harness | C13 broken-link gate verification |
| `grep` / `test` | Shell builtins | Task verify commands (same pattern as 77-01-PLAN) |
| `git diff HEAD --name-only` | Standard git | Atomic commit verification (three files in one commit) |

### Package Legitimacy Audit

No packages are installed in this phase. The only toolchain item that executes is the
already-present `v1.8-milestone-audit.mjs` (frozen, byte-verified in prior phases). No package
legitimacy audit is required.

---

## Architecture Patterns

### System Architecture Diagram

```
Admin edits (three files) --atomic-commit--> git working tree
                                                     |
                                                     v
                                     v1.8-milestone-audit.mjs (C13 gate)
                                       - allowlist.length === 15
                                       - 6 transient_external
                                       - 9 template_placeholder
                                       - internal links verified
                                             |
                                     PASS (15/15) or FAIL
```

Guide 09 content flow (how a reader navigates):
```
00-overview.md (item 9, live link) ──────────────────────────────┐
08-auth-methods-deep-dive.md (## See Also, live link) ──────────>│
                                                                  v
                                          09-enterprise-sso-plugin-migration.md
                                          ┌─────────────────────────────────────┐
                                          │ 1. Disambiguation table (SC1)        │
                                          │ 2. Decision matrix (B4)              │──> [guide 08] (link-not-copy auth method selection)
                                          │ 3. Staged migration + 10002 warn     │
                                          │ 4. What breaks                       │
                                          │ 5. ## Rollback (C1/D-05)             │──> [compliance-script swap: canonical here]
                                          │ 6. Kerberos coexistence note (D-08)  │──> [PSSO-FUT-04 cross-ref]
                                          │ 7. ## Config-Caused Failures tail    │──> [Phase 81: 06-config-failures.md hub]
                                          │ 8. ## See Also                       │──> [guide 07, guide 08, glossary]
                                          │ 9. Version History                   │
                                          └─────────────────────────────────────┘
```

### Recommended Project Structure

No new directories. Three file changes in one commit:

```
docs/admin-setup-macos/
├── 09-enterprise-sso-plugin-migration.md   # CREATE (new file)
├── 08-auth-methods-deep-dive.md            # EDIT line 327 only + Version-History row
└── 00-overview.md                          # EDIT line 49 only + Version-History row
```

### Pattern 1: A3 Hybrid Skeleton

**What:** Custom body over the standard corpus tail. Body = all guide-09-specific content
(disambiguation table, decision matrix, migration sequence, what-breaks, rollback, Kerberos note).
Tail = `## Configuration-Caused Failures` + `## See Also` + `| Date | Change | Author |`
Version-History table.

**When to use:** Any guide that has a bespoke purpose (not a generic setup-TASK guide) but must
remain compatible with the `06-config-failures.md` reverse-lookup hub. A3 is the referee-blessed
pattern for both guide 07 (Phase 76) and guide 08 (Phase 77).

**Example (tail shape from guide 08 -- verified at lines 311-334):**
```markdown
## Configuration-Caused Failures

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| [row] | Intune | [symptom] | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| [row] | Intune | [symptom] | -- |

---

## See Also

- [Platform SSO Setup](07-platform-sso-setup.md)
- [Platform SSO](../_glossary-macos.md#platform-sso)
- ...

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 77 (PSSO-05..11): initial version | -- |
```
[VERIFIED: direct corpus inspection of 08-auth-methods-deep-dive.md:311-334]

### Pattern 2: Hard-Bordered Destructive-Action Callout

**What:** A blockquote callout with a bold title and body text, used for warnings that require
explicit admin acknowledgment. Drawn from guides 07 and 08 and Phases 62-64.

**Syntax (from guide 07 `### Known Silent Blockers` callout, verified):**
```markdown
> **Before You Deploy -- Resolve These First:**
>
> [Body text explaining the danger.]
```

For the D-05 rollback callout, the title should signal the destructive nature (e.g.,
"**Destructive Action -- Rollback Removes the Secure Enclave WPJ Key:**"). The three SC3 elements
(destructive WPJ-key removal, CA-blocked window, compliance-script cross-reference) all go inside
this callout.
[VERIFIED: direct corpus inspection of 07-platform-sso-setup.md:27-35]

### Pattern 3: C13 Atomic Link+Target Landing

**What:** Any new internal markdown link must land in the same git commit as its target file.
The C13 check in v1.8-milestone-audit.mjs does NOT have a per-phase allowlist for
"not-yet-authored" internal links (only `transient_external` and `template_placeholder` categories
exist). An internal link to a file that does not yet exist will cause C13 to fail.

**Mechanism for guide 09:**
- `08-auth-methods-deep-dive.md:327` currently contains the code-span:
  `Legacy Enterprise SSO plug-in and migration guide: \`09-enterprise-sso-plugin-migration.md\` (Phase 78 -- not yet authored)`
  This code-span converts to a live link in the same commit that creates guide 09.
- `00-overview.md:49` currently contains `9. \`09-enterprise-sso-plugin-migration.md\` (added in a later documentation phase)`
  This converts to a live link in the same commit that creates guide 09.
- Both edited files receive a new Version-History row dated the commit date.

**Verification:** `node scripts/validation/v1.8-milestone-audit.mjs` prints 15/15 after the atomic commit.
[VERIFIED: direct corpus inspection of v1.8-milestone-audit.mjs:659-679 and 77-01-PLAN.md verification block]

### Pattern 4: Duplication-with-Cross-Reference (Link-not-Copy)

**What:** When a fact is canonical in one location, other locations CROSS-REFERENCE it via a link
rather than restating the prose verbatim. Prevents drift between duplicate statements.

**Application in guide 09 (locked in D-06a):**
- The `security find-certificate` → `app-sso platform -s` swap command is stated ONCE canonically
  in the up-front pre-migration prerequisite callout (D-06). The `## Rollback` section
  cross-references that callout by anchor -- it does NOT restate the command.
- The Error 10002 fact is canonical in the migration-sequence section (SC2). The
  `## Configuration-Caused Failures` tail row references it without restating the full explanation.
- Guide 09's decision matrix links to guide 08 for auth-method selection details -- does not
  copy guide 08's four-dimension table.
[VERIFIED: 77-CONTEXT.md D-03/C4 pattern + 78-CONTEXT.md D-06a]

### Pattern 5: DS-2 Provenance Annotation

**What:** Section-local `last_verified`/`review_by` inline annotations on rapidly-changing facts,
supplementing the document-level front-matter.

**When to use in guide 09:** The VR-3 WPJ→Secure Enclave storage migration facts (the
`security find-certificate` false-negative claim) are MEDIUM confidence and should carry an inline
provenance note. The migration "what-breaks" items that are version-specific (Chrome native-messaging
host, macOS 12 silent failure, Company Portal version floors) are also candidates per CONTEXT D-61b.

**Format (from guide 07 ADE section, verified at line 154):**
```markdown
_Section provenance -- `last_verified: 2026-06-21` / `review_by: 2026-09-21`. [Reason for annotation.]_
```
[VERIFIED: direct corpus inspection of 07-platform-sso-setup.md:154]

### Anti-Patterns to Avoid

- **Copying guide 08's auth-method selection table:** The decision matrix in guide 09 covers only
  the migrate/keep-legacy/coexist axis. Auth-method selection (passwordless / phishing-resistant /
  hardware / macOS-version) belongs in guide 08 and must be referenced by link, never copied.
  Violates D-03a.
- **Making `## Rollback` conditional ("if migration fails"):** Rollback is MANDATORY, not a
  conditional fallback. The section must exist as a first-class body section, not an appendix or
  a terminal step under "what to do if step N fails." Violates D-05, MG-3.
- **Live link to guide 09 before guide 09 exists in the same commit:** Creating a live link to
  `09-enterprise-sso-plugin-migration.md` in any file in any commit BEFORE the commit that
  creates guide 09 will fail C13. The Phase-77 pattern (code-span-now, live-link-when-target-exists)
  is exactly why those code-spans exist.
- **Touching headings in 00-overview.md or 08-auth-methods-deep-dive.md:** Both files are
  already cross-linked by external content. Renaming or reordering headings breaks anchor links.
  Body-level code-span → live-link conversion is anchor-safe; heading changes are not.
- **Writing "coexist" in the decision matrix to mean same-device coexistence:** The matrix column
  "coexist" means cross-segment fleet coexistence (legacy-OS segment + PSSO segment running
  side-by-side). Same-device coexistence of legacy SSO app extension + Platform SSO is explicitly
  FORBIDDEN (Error 10002). Violates D-03c.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Terminology disambiguation | A new glossary section inside guide 09 | Link to `_glossary-macos.md#enterprise-sso-plug-in` (Phase 75 anchor, VERIFIED present at line 136-140) | Phase 75 created these anchors precisely for this purpose; duplicating content creates drift risk |
| Auth-method selection table | A copy of guide 08's four-dimension table inside the decision matrix | A direct link `[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)` in the matrix routing column | D-03a; guide 08 owns that table; duplication creates drift; Phase 79 capability matrix also links to it |
| Kerberos SSO extension payload walkthrough | A full Kerberos configuration guide inside guide 09 | A bounded `###` subsection with the SC4 trio + a PSSO-FUT-04 cross-reference | Kerberos deep-dive is PSSO-FUT-04 (explicitly deferred); guide 09 ships only the coexistence cross-reference note |
| WPJ key verification command | Any invocation of `security find-certificate` for Secure Enclave-stored keys | `app-sso platform -s` | VR-3: WPJ moved to Secure Enclave ~Aug 2025; `security find-certificate` returns false negatives for all new PSSO-enrolled devices |

**Key insight:** The value of guide 09 is not comprehensiveness -- it is that it routes the
mixed-fleet admin to the right decision and flags the one irreversible action (rollback removes
the WPJ key from the Secure Enclave). Everything else already exists or is deferred.

---

## Content Facts by Section

The following sections annotate confidence levels and sources for every fact the guide 09 author
must assert. This is the primary research deliverable for this documentation phase.

### Section 1: Opening Disambiguation Table (SC1)

**Claim:** Four-term product-name hierarchy:

| Term | Scope | Config Surface |
|------|-------|---------------|
| Microsoft Enterprise SSO plug-in for Apple devices | Umbrella product; delivered via Company Portal | N/A -- parent container |
| Platform SSO (PSSO) | Modern sub-feature (macOS 13+, recommended 14+); device-level Entra ID auth + SSO | Intune Settings Catalog ONLY |
| SSO app extension | Legacy sub-feature; app/browser SSO without OS-level login integration | Intune Device Features template (or auto-included with PSSO) |
| Kerberos SSO extension | DIFFERENT Apple-native extension; on-premises AD Kerberos only | Separate MDM payload; coexists with PSSO |

**Confidence:** HIGH [CITED: learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin (updated 2026-06-15); PITFALLS:451-465 CD-1]

**Critical trap to surface:** Writing "configure the Enterprise SSO plug-in" when meaning
"configure Platform SSO" causes admins to configure the legacy redirect-type Device Features
template instead of the Settings Catalog policy, resulting in Error 10002 conflicts.
[CITED: PITFALLS:461-463]

**Platform SSO INCLUDES the SSO app extension:** Configuring Platform SSO via the Settings Catalog
automatically provides both Platform SSO AND the SSO app extension. The legacy Device Features
template provides ONLY the SSO app extension (no OS-level login binding, no Entra device join,
no hardware-bound PRT). This is the key functional difference and MUST be in the disambiguation.
[CITED: FEATURES:29-34; learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin]

**Extension identifier shared:** Both the legacy SSO app extension and Platform SSO use the same
extension identifier (`com.microsoft.CompanyPortalMac.ssoextension`, Team ID `UBF8T346G9`). The
difference is the PAYLOAD type and the presence/absence of Platform SSO settings, not the
extension binary identifier. The Kerberos SSO extension uses a DIFFERENT payload type (Kerberos,
not Redirect). This is why sharing identifiers between Kerberos and PSSO causes override (MG-4).
[CITED: FEATURES:220; SUMMARY:38-41; PITFALLS:583-593]

### Section 2: When-to-Use-Which Decision Matrix (B4 / D-03)

**Matrix axis:** migrate / keep-legacy / coexist (cross-segment). NOT auth-method selection
(that is guide 08's job -- link, don't copy).

**Routing-facet rows the planner must include (from D-03b):**

| Fleet Scenario | Recommended Path |
|----------------|-----------------|
| All devices on macOS 13+ | Migrate to Platform SSO via Settings Catalog |
| Mixed fleet: some devices on macOS 10.15-12 | Keep legacy Device Features SSO app extension for those devices; PSSO for 13+ segment (cross-segment coexist = supported) |
| On-prem AD / Kerberos resources needed | Platform SSO for Entra auth + separate Kerberos SSO extension for on-prem (coexist) -- cross-reference the Kerberos subsection (D-08) |
| Same device: both legacy profile AND PSSO profile | FORBIDDEN -- Error 10002 (same-device NOT supported) |
| Hybrid Entra join (on-prem AD join) | NOT SUPPORTED by Microsoft; PSSO requires Entra join (cloud-only) |

[CITED: FEATURES:233-251; PITFALLS:513; SUMMARY:27-33]

**macOS 10.15-12 routing row:** PSSO profile installs on macOS 12 and earlier but PSSO registration
fails SILENTLY -- no error is displayed. These devices either use legacy SSO app extension behavior
(if URLs are in the payload) or get no SSO. Admin must scope the PSSO assignment to a dynamic group
filtering macOS 13+ devices, OR retain the legacy Device Features profile for macOS 10.15-12
devices. [CITED: FEATURES:326; PITFALLS:324-326]

**Link-not-copy boundary (D-03a):** The matrix column for recommended path should route to guide 08
for auth-method selection: e.g., "Migrate to Platform SSO -- see [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) for method selection."

**Confidence:** HIGH [CITED: FEATURES:3.3 Legacy vs. Platform SSO Decision Matrix:233-251]

### Section 3: Staged Migration Sequence + Error 10002 Warning (SC2)

**Full migration sequence (from MG-1, PITFALLS:540-551):**

1. Deploy Platform SSO Settings Catalog profile to a PILOT group separate from devices
   currently using the legacy Device Features SSO app extension profile.
2. Validate PSSO registration completes for pilot devices: confirm `app-sso platform -s`
   shows `Device Registration: REGISTERED` and `User Registration: REGISTERED` (or equivalent)
   on representative pilot devices. Confirm Error 10001 and Error 10002 are absent.
3. Confirm SSO works in browsers and apps on pilot devices.
4. THEN unassign the legacy Device Features SSO app extension profile from the pilot group.
   Do NOT unassign before PSSO is validated -- and do NOT assign PSSO and keep the legacy
   profile simultaneously (see Error 10002 warning below).
5. Monitor for 48 hours: confirm no Error 10002, no compliance drift, no CA-blocked users.
6. Expand to full fleet: assign PSSO Settings Catalog profile AND simultaneously unassign legacy
   Device Features profile for each group. Do NOT overlap.
7. Do NOT delete the legacy Device Features profile until confirmed unassigned from ALL devices.

**Error 10002 exact behavior:** Error `10002: multiple SSOe payloads configured`. When the new
Settings Catalog PSSO policy AND the old Device Features SSO app extension profile are both
assigned to the same device, the system detects two competing extension payloads. BOTH STOP
WORKING. PSSO registration is blocked. The error code appears in Intune device status for the
PSSO profile. [CITED: PITFALLS:131-152 DF-5; FEATURES:255-257; SUMMARY:166]

**48-hour monitoring window:** The 48-hour window is the PITFALLS.md MG-1 recommendation
(PITFALLS:550). It is a practitioner-sourced best practice, not a Microsoft-official number.
Tag this as a recommended minimum, not an absolute SLA.
[CITED: PITFALLS:550 MG-1; confidence for the specific number: MEDIUM]

**Confidence:** HIGH for the sequence and Error 10002 behavior [CITED: PITFALLS:131-152, 540-551;
FEATURES:259-274]. MEDIUM for the exact "48-hour" monitoring duration.

### Section 4: What Breaks During Migration

**Chrome SSO loss (FEATURES:272-273):**
After PSSO registration, Chrome may lose SSO until the `com.microsoft.browsercore.json`
native-messaging host file is present. The file is created by a correct Company Portal PKG
installation; some automated installation methods omit it. Workaround: fresh PKG install from
the direct download URL, or an MDM script to copy `com.microsoft.browsercore.json` to the
Chrome NativeMessagingHosts directory.
[CITED: FEATURES:70-71, 272-273]

**Edge profile sign-in requirement (FEATURES:273):**
After PSSO registration, Edge users must be signed in to their Edge profile for browser SSO
to work. This is a behavior change from the legacy SSO app extension where Edge SSO did not
require profile sign-in.
[CITED: FEATURES:273]

**macOS 12 and earlier silent failure (FEATURES:326; PITFALLS:324-326):**
PSSO profile installs but registration fails silently on macOS 12 and earlier. No error is
displayed. These devices must retain the legacy SSO app extension profile or be upgraded to
macOS 13+ first.
[CITED: FEATURES:326]

**Profile-conflict window (PITFALLS:271):**
If both profiles briefly coexist on the device during policy sync (even transiently), Error
10002 appears and SSO stops working temporarily. Minimize this by staging the swap carefully
per the MG-1 sequence; staging to a pilot group before full-fleet reduces blast radius.
[CITED: PITFALLS:271; FEATURES:271]

**Confidence:** HIGH for all four items [CITED: FEATURES:270-274; PITFALLS:131-152, 324-326]

**DS-2 annotation candidates:** Company Portal version requirements and Chrome native-messaging
host behavior may change with Company Portal releases -- apply a section-level `last_verified`
provenance note to the what-breaks section per CONTEXT D-61b.

### Section 5: Mandatory Rollback (C1 / D-05)

This is the most mechanically complex section. Three elements must all appear in the dedicated
`## Rollback` section hard-bordered callout (D-05). The compliance-script swap is stated
CANONICALLY in the up-front D-06 prerequisite callout and CROSS-REFERENCED from here (not restated).

**Element 1 -- Destructive WPJ-key removal from Secure Enclave:**
When PSSO is rolled back (PSSO policy removed / legacy Device Features profile reinstated),
the Secure Enclave WPJ key that PSSO enrollment created is removed. This key provided
device-based Conditional Access. Its removal is DESTRUCTIVE and cannot be undone without
re-enrolling in PSSO. [CITED: PITFALLS:569-579 MG-3]

**Element 2 -- CA-blocked-until-re-registered impact window:**
After rollback, affected users have NO Entra device registration (PSSO deleted the old
Keychain WPJ cert, and removing PSSO removes the Secure Enclave WPJ key without reinstating
the legacy Keychain WPJ cert). Users cannot satisfy device-based Conditional Access until
they re-open Company Portal and complete a fresh legacy WPJ registration manually. This is
an active service outage for any user protected by device-based CA policies.
[CITED: PITFALLS:569-579 MG-3]

**Element 3 -- Compliance-script swap (canonical location: D-06 up-front prerequisite):**
The `security find-certificate` check for WPJ verification returns FALSE NEGATIVES once PSSO
migration starts, because the WPJ key has moved from the Login Keychain to the Secure Enclave
(VR-3). Admins or IT scripts using `security find-certificate -a | grep Microsoft` (or similar)
for device compliance verification will report "device not joined / not compliant" on correctly
PSSO-enrolled devices. The fix: replace with `app-sso platform -s | grep "Device Registration"`.
[CITED: PITFALLS:385-399 VR-3; MG-2 PITFALLS:555-562; SUMMARY:83]

**Confidence of Element 3 (VR-3):** MEDIUM. The Jamf Community and a Microsoft change note confirm
this migration occurred approximately Q3 2025 / August 2025 (SUMMARY:83 states "From August 2025,
all new Entra device registrations store the WPJ certificate in the Secure Enclave"). However, the
authoritative Microsoft Learn reference for the WPJ storage migration has not been confirmed as a
primary-source official doc -- it was corroborated in SUMMARY from `apple-sso-plugin` (updated
2026-06-15) and from Jamf Community. The _glossary-macos.md entry for `## Secure Enclave` (line 132)
independently confirms: "From August 2025, new Entra device registrations store the Workplace Join
(WPJ) key in the Secure Enclave by default -- use `app-sso platform -s` to verify registration
rather than `security find-certificate`, which returns false negatives for Secure Enclave-stored
keys." This provides a second internal corpus confirmation.
[CITED: _glossary-macos.md:132 (VERIFIED by corpus inspection); SUMMARY:83; PITFALLS:385-399]

**D-06 up-front prerequisite callout placement:** The compliance-script swap must appear BEFORE the
migration sequence (body position: before Section 3 in the locked A1 order). This neutralizes the
A1-C1 interlock flaw (D-01b): a successful migration admin will see the false-negative warning
BEFORE they start migrating, not only at rollback. The guide-07 structural precedent for this
pattern is `### Known Silent Blockers -- Resolve Before Deployment` appearing BEFORE `## Steps`
(07-platform-sso-setup.md:25-35, VERIFIED by corpus inspection).

### Section 6: Kerberos SSO Extension Coexistence Note (D-08 / SSOMIG-04)

**SC4 trio facts:**

**Fact 1 -- Distinct Apple-native extension:**
The Kerberos SSO extension is an Apple-NATIVE extension (NOT a Microsoft extension), using the
Kerberos payload type rather than the Redirect payload type used by the Microsoft Enterprise SSO
plug-in. It handles Kerberos ticket-granting for on-premises AD / Kerberos resources only. It is
NOT used for Entra ID authentication.
[CITED: FEATURES:224-229; PITFALLS:515]

**Fact 2 -- Separate Extension Identifiers:**
The Apple SSO extension framework supports multiple extensions per device IF they have DIFFERENT
Extension Identifiers. The Microsoft PSSO extension identifier is
`com.microsoft.CompanyPortalMac.ssoextension`. The Apple Kerberos SSO extension identifier is a
DIFFERENT identifier (Apple-controlled, not the Microsoft identifier). If an admin configures both
under the SAME Extension Identifier value, one OVERRIDES the other (MG-4 conflict).
[CITED: PITFALLS:583-593 MG-4]

**Fact 3 -- Coexists with PSSO:**
On devices with both Entra ID cloud resources and on-premises AD/Kerberos resources, both extensions
CAN be deployed simultaneously as separate profile entries with their distinct identifiers. Platform
SSO handles Entra ID cloud authentication; the Kerberos SSO extension handles on-prem Kerberos SSO.
They operate in parallel without conflict when identifiers are separate.
[CITED: FEATURES:228-229; PITFALLS:587-590]

**PSSO-FUT-04 cross-reference:** The bounded `###` subsection MUST include an explicit cross-reference
to the deferred PSSO-FUT-04 deep-dive ("Full Kerberos SSO extension configuration guide is deferred
to a future documentation phase -- see PSSO-FUT-04 in the v1.9 deferred-cleanup tracking"). This
is the SSOMIG-04 coexistence cross-reference note -- the full Kerberos guide is out of v1.9 scope.

**Confidence:** HIGH [CITED: PITFALLS:583-593 MG-4; FEATURES:222-229]

### Section 7: Corpus Tail -- Configuration-Caused Failures Table

The `## Configuration-Caused Failures` table uses the four-column shape:
`| Misconfiguration | Portal | Symptom | Runbook |`

Confirmed from guide 08 lines 311-316 (VERIFIED by corpus inspection). Guide 07 uses the same
four columns at line 133 (VERIFIED). The column is named "Runbook" (not "Guide") in guide 08.
Guide 07 uses bare em-dash `—` for rows with no runbook; guide 08 uses `--` (double hyphen).
Guide 09 should use `--` to match guide 08 (the more recent exemplar).

**Seeded rows for guide 09's migration-failure failures table (drawn from research pitfalls):**

| Misconfiguration | Portal | Symptom | Runbook |
|------------------|--------|---------|---------|
| Legacy SSO app extension profile still assigned alongside Platform SSO Settings Catalog policy | Intune | Error 10002; both SSO profiles stop working; PSSO registration suppressed | `35-macos-sso-sign-in-failure.md` (Phase 80) |
| PSSO profile assigned to macOS 12 or earlier devices without legacy profile retained | Intune | PSSO registration silently fails; no error displayed; users have no SSO | -- |
| Chrome native-messaging host JSON missing after Company Portal installation | Device | Chrome loses SSO after PSSO migration; other browsers and apps unaffected | -- |
| PSSO rolled back without completing legacy WPJ re-registration | Intune / Device | Users CA-blocked; cannot satisfy device-based CA policies until Company Portal WPJ registration completed | -- |

Note: Runbook filenames that reference Phase 80 guides must be code-spans (`` `35-macos-sso-sign-in-failure.md` ``), not live links (Phase 80 not yet authored -- C13 mechanism).

### Corpus Tail -- See Also

Guide 09's `## See Also` MUST include (from D-07a):
- `[Platform SSO Setup](07-platform-sso-setup.md)` -- live link (guide 07 exists; depends-on per ROADMAP:469)
- `[Auth Methods Deep-Dive](08-auth-methods-deep-dive.md)` -- live link (guide 08 exists per Phase 77)
- `[Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)` -- live link (anchor VERIFIED at _glossary-macos.md:136)
- `[Platform SSO](../_glossary-macos.md#platform-sso)` -- live link (anchor VERIFIED at _glossary-macos.md:123)
- `[Secure Enclave](../_glossary-macos.md#secure-enclave)` -- live link (anchor VERIFIED at _glossary-macos.md:130)

No live links to Phase 80 runbooks (not yet authored -- use code-spans per C13 mechanism).

---

## Mechanical Constraints

### C13 Gate -- Exact Mechanics

The frozen v1.8-milestone-audit.mjs C13 check (lines 659-679, VERIFIED by corpus inspection):
- Reads `ALLOWLIST.c13_broken_link_allowlist` array
- Hard-fails if `allowlist.length !== 15`
- Hard-fails if `transient_external` count !== 6 or `template_placeholder` count !== 9
- Scope comment: "internal anchor links + relative paths in docs/**/*.md"
- External MS Learn URL validation is explicitly OUT OF SCOPE
- Full `markdown-link-check` tool sweep runs at CI level (GitHub Actions); this harness check
  only validates the allowlist sidecar shape

**Implication:** The allowlist itself does NOT need to change for Phase 78. No new categories or
entries are added. The two code-span→live-link conversions make previously-exempt code-spans into
live links -- but because the target (`09-enterprise-sso-plugin-migration.md`) lands in the same
commit, those live links are valid at the moment the C13 check runs. No allowlist surgery needed.
[VERIFIED: direct corpus inspection of v1.8-milestone-audit.mjs:659-679]

**What would break C13:** Creating a live link to `09-enterprise-sso-plugin-migration.md` in any
commit that does NOT also create that file. This is exactly why the guide-08 and guide-09 code-spans
in 00-overview.md were created as code-spans by Phase 76 (planted for exactly this landing pattern).

### Atomic Commit Requirement

Three files must land in a SINGLE commit:
1. `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` (CREATE)
2. `docs/admin-setup-macos/08-auth-methods-deep-dive.md` (EDIT -- line 327 code-span → live link + Version-History row)
3. `docs/admin-setup-macos/00-overview.md` (EDIT -- line 49 code-span → live link + Version-History row)

The verification command after the commit:
```bash
git diff HEAD --name-only
```
must show all three files changed together. The 77-01-PLAN used this exact verification (line 236).

### Anchor Stability -- Edited Files

For `08-auth-methods-deep-dive.md` (line 327 edit):
- Current line 327 content: `- Legacy Enterprise SSO plug-in and migration guide: \`09-enterprise-sso-plugin-migration.md\` (Phase 78 -- not yet authored)`
- Target line 327 content: `- [Legacy Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)`
  (exact link text at planner/executor discretion; pattern must be a live markdown link)
- NO heading changes allowed in `08-auth-methods-deep-dive.md` -- body-level only
- Add one Version-History row at the bottom of the `| Date | Change | Author |` table

For `00-overview.md` (line 49 edit):
- Current line 49 content: `9. \`09-enterprise-sso-plugin-migration.md\` (added in a later documentation phase)`
- Target line 49 content: live link with a description, e.g.:
  `9. **[Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)** -- [description matching guide 09 title/purpose]`
- Keep Mermaid node `I` label (`9. Enterprise SSO Plugin Migration`) consistent with guide 09's
  actual title. The Mermaid diagram is in `00-overview.md:19-32` -- check title alignment but
  do NOT rename the Mermaid node `I` label during this phase unless it already says
  "9. Enterprise SSO Plugin Migration" (D-08a). The current diagram (VERIFIED at lines 19-32)
  shows node `I` as `[9. Enterprise SSO<br/>Migration]` -- this is already present and consistent;
  no Mermaid edit needed.
- NO heading changes allowed in `00-overview.md` -- body-level only
- Add one Version-History row at the bottom of the `| Date | Change | Author |` table

[VERIFIED: direct corpus inspection of 00-overview.md:19-49 and 08-auth-methods-deep-dive.md:327]

---

## Front-Matter Shape for Guide 09

Based on sibling guides 07 and 08 (both VERIFIED by corpus inspection):

```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: admin
platform: macOS
---
```

`last_verified` and `review_by` are document-level DS-2 90-day cadence fields. The VR-3
compliance-script fact may additionally carry a section-level `_Section provenance_` annotation.

---

## Common Pitfalls

### Pitfall 1: Error 10002 Same-Device vs. Cross-Segment Confusion (D-03c)

**What goes wrong:** The decision matrix column "coexist" is read by admins as meaning
same-device coexistence of both the legacy Device Features profile AND the Platform SSO
Settings Catalog policy. Admins deploy both simultaneously and trigger Error 10002.

**Why it happens:** "Coexist" in a fleet-management context is typically read as "run both at
the same time." In this guide's context it means "run legacy profiles for the legacy-OS segment
AND PSSO for the modern-OS segment simultaneously in the same tenant."

**How to avoid:** Make the matrix column header or a cell annotation explicit:
"Coexist (cross-segment: separate device groups for legacy and PSSO -- NOT same-device)."
Add a visible note that same-device coexistence → Error 10002.

**Warning signs:** If a cell in the matrix says "coexist" without clarifying cross-segment vs
same-device, Finder-class review will flag it as contradicting SC2.

### Pitfall 2: `security find-certificate` Not Replaced (VR-3 / MG-2)

**What goes wrong:** The guide documents the compliance-script swap in the rollback section only
(not up front). An admin follows the migration sequence, compliance dashboards show devices as
"not joined," they think the migration failed, and they roll back unnecessarily -- destroying the
Secure Enclave WPJ keys for all already-migrated users.

**Why it happens:** `security find-certificate` false-negatives look identical to a failed migration.
If the swap prerequisite is only in the rollback section, admins who are actively migrating never
see it.

**How to avoid:** The D-06 up-front prerequisite callout (before the migration steps) is the fix
locked by the A1-C1 interlock (D-01b). The planner must place this callout BEFORE the migration
sequence section, following the guide-07 `### Known Silent Blockers -- Resolve Before Deployment`
structural precedent.

### Pitfall 3: Rollback Treated as Optional (MG-3)

**What goes wrong:** The `## Rollback` section is made a sub-section of the migration sequence
(e.g., "If migration fails, see [Rollback](#rollback) below"), or is placed at the end of the
document as an afterthought. Admins who do not read the whole guide miss it and roll back without
the procedure -- leaving users CA-blocked.

**Why it happens:** Rollback procedures are conventionally placed last as "cleanup" steps.

**How to avoid:** The rollback section is position 5 in the locked body order (D-01). It is a
first-class body section with its own H2 heading, not a sub-section. The hard-bordered
destructive-action callout signals that this is mandatory, not conditional.

### Pitfall 4: Live Link to Guide 09 in a Preceding Commit (C13)

**What goes wrong:** A planner who separates the "convert code-spans" task into a different wave
or a different plan than "create guide 09" will create a live link to a non-existent file, failing
C13.

**Why it happens:** Treating the nav-wiring edits as "follow-up" tasks naturally suggests they
belong in a later task or wave.

**How to avoid:** All three file changes (CREATE guide 09 + EDIT 08:327 + EDIT 00-overview:49)
MUST be in ONE atomic commit. The plan must have one task (or three tasks in one wave with a single
commit instruction) for all three files.

### Pitfall 5: Stating VR-3 Without MEDIUM Confidence Annotation (D-06b)

**What goes wrong:** The `security find-certificate` → `app-sso platform -s` swap is presented
as a firmly-dated absolute fact ("From August 2025, all new registrations use Secure Enclave
storage") without the MEDIUM confidence annotation and `last_verified`/`review_by` provenance note.
If the date or behavior turns out to be wrong, the guide gives admins incorrect instructions.

**How to avoid:** Apply a `_Section provenance_` inline annotation to the compliance-script
prerequisite callout: `_Section provenance -- \`last_verified: 2026-06-21\` / \`review_by: 2026-09-21\`. VR-3: WPJ storage migration date sourced from Jamf Community + Microsoft apple-sso-plugin doc; re-verify at each 90-day review._`

---

## Code Examples

### C13 Verification Command (from 77-01-PLAN:234)

```bash
node scripts/validation/v1.8-milestone-audit.mjs
```

Expected output when passing: 15/15 checks pass. C13 check output line:
`{ pass: true, detail: '15-entry broken-link allowlist (6 transient_external + 9 template_placeholder) honored; full mlc sweep deferred to CI' }`

### 00-overview.md Line 49 Conversion (verified current state)

Current (line 49):
```
9. `09-enterprise-sso-plugin-migration.md` (added in a later documentation phase)
```

Target (planner determines exact description text -- must match guide 09's title and purpose):
```
9. **[Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)** -- [description]
```

Verify command (adapted from 77-01-PLAN task 2):
```bash
grep -q "\[.*09-enterprise-sso-plugin-migration\.md\]" docs/admin-setup-macos/00-overview.md \
  && ! grep -qE '^9\. `09-enterprise-sso-plugin-migration\.md`' docs/admin-setup-macos/00-overview.md \
  && echo "OVERVIEW09_OK"
```

### 08-auth-methods-deep-dive.md Line 327 Conversion (verified current state)

Current (line 327):
```
- Legacy Enterprise SSO plug-in and migration guide: `09-enterprise-sso-plugin-migration.md` (Phase 78 -- not yet authored)
```

Target:
```
- [Legacy Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md)
```

Verify command:
```bash
grep -q "\[.*09-enterprise-sso-plugin-migration\.md\]" docs/admin-setup-macos/08-auth-methods-deep-dive.md \
  && ! grep -q '`09-enterprise-sso-plugin-migration\.md`' docs/admin-setup-macos/08-auth-methods-deep-dive.md \
  && echo "GUIDE08NAV_OK"
```

### Guide 09 Front-Matter Block (verified corpus shape)

```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Enterprise SSO plug-in migration to Platform SSO.
> For the Platform SSO setup walk-through, see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

### Hard-Bordered Callout Syntax (verified from guide 07)

```markdown
> **[Title -- Signals Severity]:**
>
> [Body text. Can be multi-paragraph within the blockquote.]
>
> - **[Sub-item A]:** [Detail.]
>
> - **[Sub-item B]:** [Detail.]
```

### Version-History Row Format (verified from guides 07, 08, 00-overview)

```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Phase 78 (SSOMIG-01..04): initial Enterprise SSO plug-in migration guide | -- |
```

Author field is `--` (double hyphen, NOT em-dash). This is confirmed in all three sibling files.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact on Guide 09 |
|--------------|------------------|--------------|---------------------|
| Workplace Join (WPJ) cert stored in macOS Login Keychain | WPJ key stored in Secure Enclave (hardware-bound) | ~August 2025 (new Entra device registrations) | `security find-certificate` returns false negatives for PSSO-enrolled devices; use `app-sso platform -s` instead |
| SSO app extension (Device Features template) only | Platform SSO (Settings Catalog) for macOS 13+ -- automatically includes SSO app extension | PSSO GA August 2025 | Guide 09's migration sequence is the migration path from the old approach to the new |
| Verifying device registration via Keychain cert inspection | Verifying via `app-sso platform -s` | August 2025 (VR-3) | Compliance scripts using `security find-certificate` must be updated as a PRE-MIGRATION step |

**Deprecated/outdated:**
- `security find-certificate -a | grep Microsoft` for WPJ verification: False negatives on all
  PSSO-enrolled devices since August 2025. Replace with `app-sso platform -s`. Document as a
  pre-migration prerequisite (D-06).
- Device Features template for SSO app extension on macOS 13+: Superseded by Platform SSO Settings
  Catalog. Keep for macOS 10.15-12 only. Document as the "keep-legacy" path in the decision matrix.

---

## Environment Availability

Step 2.6: SKIPPED -- Phase 78 is a pure documentation / markdown-authoring phase with no external
tool, service, or runtime dependencies beyond the already-present `node` runtime (used by the
v1.8-milestone-audit.mjs validation script, which is already in the repo and confirmed working
from Phase 77 execution).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The 48-hour monitoring window in MG-1 is a practitioner recommendation, not an official Microsoft number | Section 3 (Staged Migration Sequence) | Guide over- or under-specifies the monitoring requirement; no hard failure |
| A2 | WPJ→Secure Enclave storage migration date is "August 2025" -- sourced from Jamf Community + Microsoft apple-sso-plugin doc (MEDIUM confidence) | Section 5 (Mandatory Rollback) + D-06 up-front prerequisite callout | If date is wrong, the provenance annotation still flags it for re-verification; compliance-script swap advice is still correct regardless of exact date |
| A3 | The Kerberos SSO extension uses a different Extension Identifier than the Microsoft PSSO extension (MG-4 claim) | Section 6 (Kerberos coexistence note) | If wrong, the "separate identifiers" assertion in SC4 would mislead admins into a misconfiguration; but MG-4 in PITFALLS.md is HIGH confidence from Microsoft Learn |

**If this table is empty:** All claims in this research were verified or cited -- no user confirmation needed.
This table has 3 low-risk assumptions; none require user confirmation before proceeding to planning.

---

## Open Questions

1. **Exact link text for the 00-overview.md line-49 conversion**
   - What we know: The description must be consistent with guide 09's actual title (D-08a); current
     guide 08's description at line 47-48 is a good structural model.
   - What's unclear: Guide 09's exact H1 title hasn't been chosen yet (planner/executor discretion).
   - Recommendation: Planner defines the description text as part of the guide 09 authoring task;
     the 00-overview edit task must read guide 09's actual H1 to stay consistent.

2. **Whether the `## Configuration-Caused Failures` table in guide 09 uses `—` or `--` for no-runbook cells**
   - What we know: Guide 07 uses `—` (em-dash); guide 08 uses `--` (double hyphen); the 77-01-PLAN
     explicitly uses `--` and double-hyphen convention.
   - What's unclear: Both are present in sibling guides; there is a mild inconsistency.
   - Recommendation: Use `--` (double hyphen) to match guide 08 (the more recent exemplar and the
     one guide 09's See Also points to). The 77-01-PLAN.md line 235 establishes `--` as the
     current corpus standard.

---

## Sources

### Primary (HIGH confidence)

- `learn.microsoft.com/en-us/entra/identity-platform/apple-sso-plugin` (updated 2026-06-15) --
  Umbrella product name hierarchy; WPJ key storage migration August 2025; browser SSO requirements;
  Extension Identifier. Cited for Section 1, Section 5.
- `learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension`
  (updated 2026-06-15) -- Error 10002 dual-profile conflict; MG-3 rollback/CA-blocked; DF-5 exact
  behavior. Cited for Section 3, Section 5.
- `learn.microsoft.com/en-us/intune/device-configuration/templates/configure-enterprise-sso-plugin-macos`
  (updated 2026-04-14) -- Legacy SSO app extension behavior, Device Features template configuration.
  Cited for Section 1, Section 2.
- `learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos`
  (updated 2026-05-18) -- Platform SSO Settings Catalog; migration ordering (Step 7: unassign
  legacy profile after PSSO validated). Cited for Section 3.
- `.planning/research/PITFALLS.md` -- DF-5, MG-1, MG-2, MG-3, MG-4, VR-3, CD-1; HIGH confidence
  sections sourced from Microsoft Learn. Used throughout.
- `.planning/research/FEATURES.md` -- §3.1-3.4 Legacy SSO, Kerberos, Decision Matrix, Migration;
  HIGH confidence from official sources. Used throughout.
- `.planning/research/SUMMARY.md` -- executive synthesis; confirms HIGH confidence overall for
  Phase 78 content.
- Direct corpus inspection (VERIFIED for all mechanical/format claims):
  - `docs/admin-setup-macos/00-overview.md` -- lines 19-49, 67-71 (current code-spans, Mermaid, Version-History)
  - `docs/admin-setup-macos/08-auth-methods-deep-dive.md` -- lines 1-50, 311-334 (corpus tail shape, line 327 code-span)
  - `docs/admin-setup-macos/07-platform-sso-setup.md` -- lines 1-50, 130-154 (front-matter, Known Silent Blockers pattern, C-C-F table, ADE provenance annotation)
  - `docs/admin-setup-macos/02-enrollment-profile.md` -- lines 1-30 (corpus front-matter exemplar)
  - `docs/admin-setup-macos/06-config-failures.md` -- lines 1-50 (reverse-lookup hub shape, five-column vs four-column table)
  - `docs/_glossary-macos.md` -- lines 1-40, 115-144 (glossary anchors #platform-sso at line 123, #secure-enclave at line 130, #enterprise-sso-plug-in at line 136, WPJ/Secure Enclave fact at line 132)
  - `scripts/validation/v1.8-milestone-audit.mjs` -- lines 659-679 (C13 exact mechanics, 15-entry allowlist, 6+9 category counts)
  - `.planning/phases/77-auth-methods-deep-dive/77-01-PLAN.md` -- atomic commit pattern, verify commands, C13 verification

### Secondary (MEDIUM confidence)

- Jamf Community -- WPJ key storage migration Q3 2025 (VR-3, corroborates SUMMARY:83); used in A2
  assumptions log with MEDIUM confidence tag.
- `_glossary-macos.md:132` (internal corpus) -- independent second confirmation of the
  `security find-certificate` false-negative claim and August 2025 date.

---

## Metadata

**Confidence breakdown:**
- Content facts (disambiguation, Error 10002, migration sequence, what-breaks, Kerberos note): HIGH
  -- all sourced from Microsoft Learn docs updated 2026-04-14 to 2026-06-15
- VR-3 (WPJ→Secure Enclave migration exact date): MEDIUM -- Jamf Community + Microsoft apple-sso-plugin;
  independent corpus confirmation in _glossary-macos.md:132
- Mechanical constraints (C13 gate, atomic commit, anchor stability): HIGH -- verified by direct
  corpus inspection of the harness code and all three affected files
- Corpus conventions (front-matter, callout syntax, Version-History format, C-C-F table shape): HIGH
  -- verified by direct corpus inspection of guides 07, 08, 02-enrollment-profile.md

**Research date:** 2026-06-21
**Valid until:** 2026-09-21 (90-day DS-2 cadence; VR-3 facts need re-verification first)
