# Phase 98: Guide 07 Comprehensive Pass - Context

**Gathered:** 2026-06-29
**Status:** Ready for planning

<domain>
## Phase Boundary

One file: `docs/admin-setup-macos/07-platform-sso-setup.md`. This phase does three things to it:

1. **Fix the residual VPP conflict (ACC-03)** — remove "VPP from Apps and Books" from the Step 2 Company Portal deployment line (~line 126) and reword the "Deploy to the device" callout to cleanly separate *install target* (the device) from *assignment target* (user group for affinity / device group for userless).
2. **Author a troubleshooting layer for the three real-world failure modes** from the 2026-06-27/28 session: TS-01 (Extension-Identifier-typo failure), TS-02 (consolidated A2 Company-Portal delivery requirements), TS-03 (Setup-Assistant SSO-extension diagnostic tree). This is **genuine net-new authoring**.
3. **Formalize the already-written PSSO admin-setup depth (DEP-03)** — the Registration-Approach decision record, End-User Sign-In Experience (Secure Enclave) + local-password lifecycle, Optional & Advanced settings (two account models), AccountName token mapping, Non-Platform-SSO-Accounts. This content was written in the live session and is shipped-stamped; **formalize-only** (Phase 97 D-04 pattern), not re-author.

The *what* is locked by ACC-03 + TS-01/02/03 + DEP-03 and the 5 ROADMAP success criteria. This phase resolves only the *how*: where the troubleshooting content lives, what format the diagnostic tree takes, how far to adopt A1/A2 labels, and how freshness is stamped. **No scope bleed into Phase 99** (the local-password-reset runbook + nav wiring) or **Phase 100** (validators).

</domain>

<decisions>
## Implementation Decisions

All four HOW decisions were resolved via `/adversarial-review` (Finder → Adversary → Referee, ground-truthed against the live guide 07, guide 01's A1/A2 definitions, the validator lineage, and ROADMAP/REQUIREMENTS). The review converged on **GA1=A (refined), GA2=B, GA3=A, GA4=B**. Two CRITICALs were stress-tested: the GA1-C "consolidated" violation **survived** (real, disqualifying for Option C); the GA3-C "anchor-break" CRITICAL was **downgraded** to a LOW execution-caution (breakage is avoidable via slug discipline). The full Finder/Adversary/Referee scoring trail is in DISCUSSION-LOG.md.

### D-01 (GA1): Troubleshooting architecture — distribute by semantic home, augment existing structures (NOT a new consolidated section)
- **TS-01 (Extension-Identifier typo)** → goes in the **existing `## Configuration-Caused Failures` table** (~line 221) as a new schema-conformant row (`Misconfiguration | Portal | Symptom | Runbook`) **plus an adjacent prose deep-dive** (symptom / root cause / fix) immediately below the table. ROADMAP SC#2 *names* the Configuration-Caused-Failures section as the home — putting the typo there satisfies SC#2 directly. The symptom string is the looping Setup-Assistant *"Unable to Sign-In … necessary SSO application or extension"* despite Company Portal **Installed** + PSSO policy **Succeeded**; root cause is the free-text Extension Identifier typo (correct value `com.microsoft.CompanyPortalMac.ssoextension`; Intune does **not** validate this field); note it **affects both A1 and A2**.
- **TS-02 (A2 Company-Portal delivery requirements)** → **AUGMENT the existing Advanced-section "ADE Path Prerequisites" table** (~lines 317–324), which *already* consolidates the A2 stack (CP 5.2604.0 LOB, three-policy same-static-user-group rule, group type) and is *already* the single anchor guide 01 cross-links (`#advanced--optional-ade-during-setup-assistant`, from 01:394 and 01:408). Add the **three net-new facts**: (a) the user must be **Intune-licensed**; (b) trim the LOB app's **Included apps** to `com.microsoft.CompanyPortalMac` only; (c) the enrollment profile stays device/serial-targeted, **bridged to the user group by user affinity**. Add the TS-02-mandated **cross-link from guide 01**. **Do NOT create a second A2-requirements table** — that duplication (drift hazard) is exactly why the new-consolidated-section variant was rejected.
- **TS-03 (diagnostic tree)** → its **own subsection** adjacent to the failures section (format per D-02).
- **Rejected:** Option C (distribute A2 reqs across Step 2 + Advanced) — **CRITICAL violation of TS-02's "consolidated … cross-linked from guide 01"**: a split leaves no single anchor for guide 01 to point at, defeating the locked requirement + SC#3. Option B (nest TS-02 requirements + TS-03 tree as subsections *under* the "Configuration-Caused Failures" H2) — confirmed **category error**: delivery requirements and a diagnostic tree are not "failures," and large subsections destroy the table's quick-ref scannability.

### D-02 (GA2): Diagnostic-tree format — numbered "if X → check Y" bisection ladder (nested ordered list), NOT mermaid, NOT a flat table
- TS-03's sequence — **Intune device record → Company Portal version ["Installed ≠ correct version"] → Extension Identifier → user license → A1 bisect via disabling `Enable Registration During Setup`** — is authored as a numbered/nested ordered list where the terminal A1-bisect drops in as a sub-bullet branch.
- **Rationale:** Mermaid (Option A) **breaks guide 07's idiom** — the file contains **zero** mermaid (mermaid is guide 01's idiom, e.g. 01:47) — and carries real **render fragility** (the labels contain `≠`, square brackets `["Installed ≠ correct version"]`, and a backticked `Enable Registration During Setup`, all of which require careful mermaid escaping or the parser breaks). A decision table (Option C) **flattens the tree** — it loses the ordered-elimination semantics and can't express the terminal *A1-bisect branch*. The ladder renders universally, matches the mostly-linear `→` shape, and sits cleanly as prose beside the failures table.

### D-03 (GA3): A1/A2 labels — lightweight deferential cross-reference to guide 01 (the canonical owner); preserve ALL slugs byte-identical
- Guide 01 (`01-psso-provisioning-walkthrough.md`, title + "Which Path Is Right for You?" table, ~lines 11–20) **canonically owns** A1 (standard post-enrollment) / A2 (ADE-during-Setup-Assistant). Guide 07 currently uses only long prose names. Harmonize by adding a **lightweight equivalence pointer** ("this deployment's during-Setup-Assistant approach is the **A2** path — see guide 01") and use A1/A2 **where the new troubleshooting content needs them** (e.g. SC#2's required "affects both A1 and A2", the TS-03 "A1 bisect"). Point to guide 01 as the definer rather than re-defining the taxonomy in guide 07.
- **HARD CONSTRAINT — slug discipline:** **Do NOT rename any heading.** The `## Advanced / Optional: ADE-during-Setup-Assistant` heading (slug `#advanced--optional-ade-during-setup-assistant`) and `## End-User Sign-In Experience (Secure Enclave)` heading (slug `#end-user-sign-in-experience-secure-enclave`) carry inbound cross-file anchors (guide 01:394/408 → Advanced; guide 02:102 & 03:104 → End-User) **plus** internal refs (07:25/40/127/253 → Advanced). Add A1/A2 labels in **body prose only**; headings/slugs stay byte-identical (Phase 96 D-04 slug discipline). This keeps the Phase-100 link-integrity sweep green.
- **Rejected:** Option C (full retrofit) — highest-churn-regression on a file carrying freshly-stamped DEP-03 content, conflicts with the suite's surgical/formalize-don't-author principle, and risks the slug breakage above for no offsetting benefit. Option B (use A1/A2 without defining/pointing) — imports undefined jargon into a guide readers land on directly, forcing a mid-troubleshooting jump to guide 01.
- **Ruled a false positive (do not "fix"):** the apparent line-19 ("This deployment registers PSSO during Setup Assistant") vs line-309 ("the default and documented standard path is post-enrollment") "contradiction" is **intentional chosen-deployment-vs-documented-default framing**, already reconciled at lines 46 and 91. No reconciliation edit is needed or wanted.

### D-04 (GA4): Freshness — file-level frontmatter bump + version-history row; NO new per-section pair-stamp
- Apply the milestone-wide convention (Phase 96 D-03 / Phase 97 D-01): bump the file-level frontmatter `last_verified` / `review_by` to the Phase-98 edit date with the **+3-month / same-day-of-month invariant** preserved (never bump one without the other), and add **one dated `| Date | Change | Author |` version-history row** documenting the ACC-03 + TS-01/02/03 + DEP-03 work.
- **Do NOT add a new per-section `last_verified`/`review_by` pair-stamp** to the troubleshooting content. The in-file precedent (the Advanced section's own provenance stamp ~line 311, `2026-06-20`/`2026-09-20`) does **not** override Phase 97 D-01's locked rejection of per-section pair-stamps for v1.13 content: a new dated locus buys **zero harness leverage** (the Phase-100 validator needles stable tokens, never dates — Phase 97 D-02), and it would create a third independently-drifting freshness locus.
- **Caveat (lockstep):** if the Phase-98 pass **edits the existing Advanced section's content**, bump its line-311 per-section stamp (`2026-06-20`→edit date, `2026-09-20`→+3-month/same-day) in lockstep, per Phase 96 D-03's "bump stamps on edited content." If the Advanced section is left untouched, leave its 06-20 stamp as-is.
- **Ruled false positives (do not let them drive a different choice):** "file-level bump over-claims whole-file re-verification" — corpus semantics for `last_verified` = "last meaningfully edited on a scoped additive edit," not "every claim re-verified" (Phase 96 D-03). "Per-section stamp invites a Phase-100 date time-bomb" — the harness is *forbidden* to needle dates and macOS docs are in no freshness-assertion scope, so no time-bomb can arise.

### Content treatment — author TS-01/02/03 fresh + verify; formalize-only for DEP-03
- **TS-01/02/03 is net-new authoring** — the researcher/planner must source and verify these claims (Extension Identifier exact string + Intune-does-not-validate behavior; CP LOB floors 5.2404.0 (A1) / 5.2604.0 (A2); the typo symptom string; "Intune-licensed user"; the `com.microsoft.CompanyPortalMac` Included-apps trim; macOS 26 A2 hard gate). Cross-link guide 01 ↔ guide 07 per TS-02.
- **DEP-03 content is formalize-only** (Registration Approach, End-User Sign-In, Optional & Advanced, AccountName token, Non-PSSO-Accounts) — it is already present and "verified against Microsoft Learn" per the existing version-history rows. **Freeze it; do not re-author.** Bound any spot-verify to genuinely uncited high-drift factual claims only (the Phase 97 D-04 cap), and correct only if wrong.

### Claude's Discretion
- Exact wording of the new failures-table row, the TS-01 deep-dive prose, the A2-augmentation cells, the diagnostic-tree ladder steps, the A1/A2 equivalence pointer, and the version-history row are at the planner/executor's discretion, provided they satisfy the locked SCs and the decisions above.
- Exact placement of the TS-03 diagnostic-tree subsection (immediately after the failures table vs after the deep-dive) is a layout choice, provided it does not nest under the "Configuration-Caused Failures" H2 (D-01) and does not rename existing headings (D-03).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & scope (locked)
- `.planning/ROADMAP.md` §"Phase 98: Guide 07 Comprehensive Pass" (~lines 82–95) — goal + 5 success criteria. SC#2 *names* the Configuration-Caused-Failures section as the typo's home (drives D-01).
- `.planning/REQUIREMENTS.md` — `ACC-03` (~line 15), `TS-01` (~line 20), `TS-02` (~line 21), `TS-03` (~line 22), `DEP-03` (~line 28): full text of the VPP fix, the three failure modes, and the PSSO admin-setup depth.

### Target file (the single file this phase edits)
- `docs/admin-setup-macos/07-platform-sso-setup.md` — the live target. Key landmarks: Step 2 CP deployment line + "Deploy to the device" callout (~lines 121–134, ACC-03); existing `## Configuration-Caused Failures` table (~lines 221–231, TS-01 home); `## Advanced / Optional: ADE-during-Setup-Assistant` → "ADE Path Prerequisites" table (~lines 307–324, TS-02 augmentation target + existing per-section stamp ~line 311); frontmatter stamps (~lines 2–3); version-history table (~lines 355–364).

### Cross-guide canonical source for A1/A2 (do NOT re-define — point to it)
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — canonical A1/A2 owner: title (~line 11), "Which Path Is Right for You?" table (~lines 17–20), per-stage A1/A2 columns (~lines 71–78). Guide 07 cross-links here (D-03); TS-02 also requires a guide-01 → guide-07 cross-link into `#advanced--optional-ade-during-setup-assistant`.

### Anchor-stability map (preserve byte-identical — Phase-100 link sweep guards these)
- Inbound cross-file: `#advanced--optional-ade-during-setup-assistant` ← guide 01:394, 01:408; `#end-user-sign-in-experience-secure-enclave` ← guide 02:102, guide 03:104.
- Internal: Advanced anchor ← guide 07:25, 40, 127, 253. (07:335 targets `#registration-approach-decision-and-alternatives`, NOT the Advanced anchor.)

### Harness / freshness precedent (read to honor the locked conventions)
- `.planning/phases/97-enrollment-filevault-depth-formalization/97-CONTEXT.md` — D-01 (file-level freshness, no per-section pairs), D-02/D-03 (validator deferral to Phase 100, presence-only needles on stable tokens, never dates), D-04 (formalize-only + bounded spot-verify). Phase 98 inherits all four.
- `.planning/phases/96-surgical-conflict-fixes/96-CONTEXT.md` — D-03 (+3-month/same-day stamp invariant; "bump stamps on edited content"), D-04 + slug discipline ("display text may be slashed; the anchor stays bare").
- `.planning/ROADMAP.md` §"Phase 100" (~lines 110–120) — the indivisible validator/chain Atom 2. Phase 98 authors **no** `check-phase-98.mjs`; it only records the needle-spec hand-off (below).

### Existing harness coverage of guide 07 (do not break)
- `scripts/validation/check-phase-76.mjs` — `V-76-PRESENCE`: asserts guide 07 exists + non-empty (presence-only; restructuring is safe).
- `scripts/validation/check-phase-81.mjs` — E7 needles the inbound link string `](07-platform-sso-setup.md)` from guide 03 (path-level, not internal anchors).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Configuration-Caused Failures table** (07:221–231) — already a `Misconfiguration | Portal | Symptom | Runbook` schema with pointer-style `Runbook` cells; the TS-01 typo row drops in as a schema-conformant row + Runbook pointer to the deep-dive (D-01).
- **Advanced "ADE Path Prerequisites" table** (07:317–324) — already consolidates the A2 stack (CP 5.2604.0 LOB, three-policy same-static-group rule); augment it in place with the three net-new TS-02 facts rather than duplicating (D-01).
- **Contrast-co-location idiom** — the guide already disambiguates confusable values via explicit contrast tables (AccountShortName vs preferred_username, 07:177–180; macOS-13 vs 14+ dual-field, 07:190–195). Use the same idiom if the two near-identical bundle IDs (`com.microsoft.CompanyPortalMac.ssoextension` vs `com.microsoft.CompanyPortalMac`) end up adjacent.
- **Version-history table + frontmatter stamps** (07:2–3, 355–364) — the freshness mechanism for D-04; mirror the existing row format.

### Established Patterns
- **Formalize-don't-author** (Phase 96/97) — DEP-03 content is frozen; only ACC-03 + TS-01/02/03 are authored fresh.
- **Slug discipline** (Phase 96 D-04) — body text may change freely; headings/slugs stay byte-identical to protect inbound anchors (D-03).
- **File-level freshness, +3-month/same-day invariant** (Phase 96 D-03 / Phase 97 D-01) — drives D-04; per-section pair-stamps are not added.
- **Validators are a Phase-100 close-phase deliverable** (Phase 97 D-02; project memory) — Phase 98 hands off a needle-spec, authors no validator.

### Integration Points
- Guide 01 ↔ Guide 07 cross-links (D-03 + TS-02) — the A1/A2 equivalence pointer and the guide-01 → guide-07 `#advanced...` cross-link.
- **Phase-100 needle-spec hand-off (record explicitly so Phase 100 doesn't re-discover):** candidate stable tokens for the future `check-phase-98.mjs` — `com.microsoft.CompanyPortalMac.ssoextension` (Extension Identifier / typo anchor), `Enable Registration During Setup`, `5.2604.0` (A2 CP floor), `com.microsoft.CompanyPortalMac` (Included-apps trim), `Non Platform SSO Accounts`, `AccountShortName`, and stable section labels. Presence-only on these tokens; never needle the freshness dates.

</code_context>

<specifics>
## Specific Ideas

- The dominant principle, inherited from Phases 96/97, is **minimal-surgical**: lean on existing anchors and the existing Advanced consolidation, file-level freshness, **cross-link rather than duplicate**, and preserve every slug byte-stable for the Phase-100 link-integrity sweep. All four adversarial-review winners (GA1-A, GA2-B, GA3-A, GA4-B) express this one stance.
- **Symptom string to author verbatim (TS-01):** the looping Setup-Assistant *"Unable to Sign-In … necessary SSO application or extension"* despite Company Portal **Installed** + PSSO policy **Succeeded** — the tell that distinguishes the (permanent) Extension-Identifier typo from the (transient) "Company Portal still downloading → Try Again" behavior noted in guide 01.
- **Adversarial-review nuance:** the Referee adopted Option A for GA1 but *refined* it — the win is "typo in the existing failures section + A2 reqs augmenting the existing Advanced table," explicitly **not** the literal "new `## Troubleshooting` section that re-consolidates A2 reqs" (which would duplicate the Advanced table). Honor the refinement, not just the letter.
- DISCUSSION-LOG.md captures the full Finder/Adversary/Referee scoring trail (Finder 138 pts; Adversary disproved 10 for +49; Referee rulings + winners) for audit.

</specifics>

<deferred>
## Deferred Ideas

- **`check-phase-98.mjs` validator + chain-apex extension** — owned by **Phase 100** (HARN-02, indivisible Atom 2). Phase 98 only records the needle-spec hand-off (see Integration Points).
- **Local-macOS-password-reset runbook + macOS navigation wiring** — owned by **Phase 99** (RUN-01). Guide 07's local-password-lifecycle section already cross-links the concepts; the dedicated runbook is not authored here.
- **Full re-audit / re-verification of the shipped DEP-03 depth against Microsoft Learn** — out of scope; DEP-03 is formalize-only with at most a bounded spot-verify of genuinely uncited high-drift claims (Phase 97 D-04 cap).
- **Link-integrity guard on guide 07's anchors** — the real guard is the Phase-100 link-integrity sweep; Phase 98 only preserves the slugs byte-stable (D-03).

None beyond the above — discussion stayed within phase scope.

</deferred>

---

*Phase: 98-guide-07-comprehensive-pass*
*Context gathered: 2026-06-29*
