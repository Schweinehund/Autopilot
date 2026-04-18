# Phase 32: Candidate Options for Adversarial Review

Four gray areas × 3-4 candidate options = 14 candidates. Adversarial review scores each via Finder (surface flaws) → Adversary (disprove flaws) → Referee (rule real vs false positive). Winner per gray area = lowest confirmed-flaw score.

**Phase 32 context:** iOS/iPadOS content is reachable from every shared navigation entry point (hub index, common-issues routing, quick-ref cards, new capability matrix) with additive injection into existing shared files — no full rewrites, all pre-existing links preserved.

**Locked priors (do NOT re-litigate):**
- Phase 25 D-01/D-02: Hybrid approach for common-issues.md (section at bottom + platform selector + cross-ref banners)
- Phase 25 D-07/D-08: Append-to-bottom quick-ref pattern
- Phase 25 D-14/D-15: Section-level platform separation, bidirectional cross-ref banners
- Phase 26 canonical_refs: iOS glossary terms extend `_glossary-macos.md` (not new file `_glossary-ios.md`)
- Phase 20 taxonomy: `platform: all` frontmatter on shared files
- Phase 30 30-08 shipped: iOS banner in `00-initial-triage.md` + iOS L1 section in `l1-runbooks/00-index.md` (already done)
- Phase 31 D-20/D-21: MAM advisory in `l2-runbooks/00-index.md` only (already done)
- Phase 30 D-31: MAM-WE L1 deferred to ADDTS-01
- SC #4 literal: Additive edits only; pre-existing links must remain valid

---

## Gray Area A: Capability Matrix Scope & Structure (NAV-03)

**SC #3 literal:** "The iOS capability matrix (`reference/ios-capability-matrix.md`) documents feature parity gaps across iOS, macOS, and Windows in a scannable table format, allowing an admin to answer 'can iOS do X' without reading three separate platform guides."

### A1: Standalone trilateral, 5 domains (mirror macOS matrix structure)

**Description:** New `reference/ios-capability-matrix.md`. Three columns (Windows | macOS | iOS). Five domains matching existing macOS matrix: Enrollment, Configuration, App Deployment, Compliance, Software Updates. Key Gaps Summary at bottom. See Also footer.

**Pros:**
- Mirrors proven macOS matrix structure (consistency = low reader ramp cost)
- Trilateral satisfies SC #3 literal with minimum complexity
- Maintains 1:1 domain parity — "can I find Feature X?" answer is at same row index across both matrices
- Existing admins already use `macos-capability-matrix.md` — cognitive reuse

**Cons:**
- 5 domains may miss the iOS-unique axis (supervision state gates several capabilities)
- Row ambiguity where feature exists in multiple forms per path (e.g., silent install = ADE-supervised-only, not a flat "yes/no")
- Duplicates macOS matrix rows verbatim (repeated Windows column content)

### A2: Standalone trilateral, 6 domains (add Supervision/Enrollment axis)

**Description:** A1 plus a 6th domain "Enrollment Model & Supervision" with rows: supervised-vs-unsupervised capability gates, supported enrollment paths, ownership model options, default MDM channel, DDM availability. Total 6 domains.

**Pros:**
- Captures the iOS-unique supervision axis that cannot be flattened into Enrollment domain
- SC #3 "can iOS do X" often maps to "only if supervised" — 6th domain answers this class of question directly
- Discloses the 4-path vs macOS-1-path asymmetry in a dedicated table
- macOS column for the 6th domain clarifies that macOS has analogous supervision concepts (User Approved MDM) — educational

**Cons:**
- Departs from macOS matrix structure (5 domains) — consistency cost
- 6th domain blends enrollment + supervision, which are distinct axes — risk of category confusion
- Row complexity grows (per-path-per-supervision-state states may need footnotes)

### A3: Merge into expanded shared `apple-capability-matrix.md` (rename + expand)

**Description:** Rename existing `reference/macos-capability-matrix.md` → `reference/apple-capability-matrix.md`. Three columns Windows | macOS | iOS in one unified matrix. Update all existing cross-references (index.md line 144, reference/00-index.md line 23, admin-setup-macos/00-overview.md cross-links).

**Pros:**
- One source of truth for "which platform does X" across all platforms the project covers
- No split cognitive load (readers don't guess which matrix file)
- Avoids duplicated Windows column content across two matrices
- Semantic naming correctness (it's now about Apple not just macOS)

**Cons:**
- Violates SC #3 literal: requires file named `ios-capability-matrix.md` ("The iOS capability matrix (`reference/ios-capability-matrix.md`)")
- Violates SC #4 literal: "injected into existing shared files (not full rewrites)" — renaming is a bigger edit than injection
- Cross-reference update cost: index.md, reference/00-index.md, macOS admin-setup, Phase 25 D-11 audit history — all need touch-ups
- Loses Phase 25's macOS-focused matrix identity

### A4: Standalone bilateral iOS vs macOS (Apple-only)

**Description:** `reference/ios-capability-matrix.md` with two columns (macOS | iOS). Focuses on Apple-to-Apple parity. Cross-links to existing macOS matrix for Windows comparison.

**Pros:**
- Tightest scope — only where iOS and macOS diverge
- Shorter document (faster to scan)
- Clearer "is this iOS or macOS" signal for readers already in Apple context

**Cons:**
- Fails SC #3 literal: "feature parity gaps across iOS, macOS, and Windows" requires all three
- Forces readers to cross-reference two matrices to answer "can iOS do X that Windows does" — exactly what SC #3 wants to prevent
- Inconsistent with macOS matrix which is bilateral (Windows|macOS) — now readers have two differently-scoped matrices to reconcile

---

## Gray Area B: Glossary Extension Scope & Structure (NAV-01)

**SC #1 literal:** Shared glossary contains iOS-specific terms (supervision, MAM-WE, APNs, account-driven user enrollment, VPP, jailbreak detection) that did not exist in prior milestones.

**Locked from Phase 26:** Extends `_glossary-macos.md`, not a new `_glossary-ios.md` file.

### B1: Keep filename + inline iOS terms into existing H2 sections + update VPP entry

**Description:** Keep `_glossary-macos.md` filename. Add iOS terms merged into existing H2 structure: supervision + account-driven UE + MAM-WE → Enrollment section; APNs + jailbreak detection → new "Device Management" subsection; update existing VPP entry with iOS device-licensed vs user-licensed distinction callout. Alphabetical Index updated. Total 6 new terms + 1 updated entry.

**Pros:**
- Minimal structural churn — existing H2 sections accept new terms naturally
- VPP entry gets iOS-specific context (not just macOS) — bug fix as side effect
- Satisfies SC #1 with exactly the 6 listed terms — no scope creep
- No file rename → no cross-reference cascade
- Alphabetical Index stays coherent with mixed-platform terms

**Cons:**
- Platform-origin of each term is not visually flagged (reader must infer from Windows equivalent callout)
- Existing section headings are macOS-centric ("Enrollment" has ABM as first entry) — iOS terms inherit macOS-framing visual hierarchy
- No dedicated "iOS-specific" landing point for readers who want iOS-only terms

### B2: Keep filename + dedicated "iOS-Specific" H2 section at end

**Description:** Keep `_glossary-macos.md` filename. Add new `## iOS-Specific Terms` H2 section at end with alphabetically-ordered iOS terms. macOS-shared terms (ABM, ADE, VPP) stay in existing sections. APNs (shared Apple concept but iOS-critical) lives in new section.

**Pros:**
- Clear visual separation — reader browsing for iOS terms has a landing zone
- Preserves existing sections (Enrollment/Device Management/App Distribution) unchanged
- Low risk of contaminating macOS-shared terms
- Alphabetical Index gets a new anchor group

**Cons:**
- Redundancy when a term is truly shared (supervision applies to macOS too via User Approved MDM — does it go in both sections?)
- VPP entry update still needed in existing section — section structure splits related content
- Sets a precedent that future Apple additions (tvOS, visionOS?) each get their own H2 — scales badly
- "iOS-Specific" framing contradicts fact that APNs, account-driven UE, etc. are concepts Apple shares across all Apple-platform MDM

### B3: Rename file to `_glossary-apple.md` + restructure

**Description:** Rename `_glossary-macos.md` → `_glossary-apple.md`. Update every cross-reference: index.md, windows-vs-macos.md, admin-setup-macos/*, admin-setup-ios/*, l1-runbooks/10-15, l2-runbooks/10-13, decision-trees/06-macos-triage.md, 07-ios-triage.md, macos-lifecycle/00-ade-lifecycle.md, ios-lifecycle/00-enrollment-overview.md + 01-ade-lifecycle.md. Add iOS terms with optional per-term platform-scope tag.

**Pros:**
- Semantic accuracy — file now covers Apple, not just macOS
- Future-proof (if tvOS/visionOS ever added)
- Eliminates future reader confusion ("why is an iOS term in a macOS glossary?")

**Cons:**
- Violates SC #4 literal: "all pre-existing links in those files remain valid after iOS sections are added" — renaming breaks every `_glossary-macos.md` link until each is updated
- Large regression risk: estimated 40+ files reference `_glossary-macos.md` — one missed reference = broken link
- Phase 26 CONTEXT.md canonical_refs explicitly states "iOS terms will be added here per Phase 32 NAV-01" using the `_glossary-macos.md` path — renaming departs from locked Phase 26 language
- Out of scope for Phase 32 (file renames are a separate refactoring concern)
- Breaks v1.2 shipped history: users browsing the 116-doc corpus have a known link; rename is a breaking change

### B4: B1 + extended terms beyond SC #1 list (~11-12 terms total)

**Description:** B1 baseline (6 SC-listed terms) + additional foundational iOS terms: ADE Token (iOS variant callout appended to existing entry), DEP (legacy name for ADE), Managed Apple ID, Company Portal (iOS variant), Declarative Device Management (DDM), ACME certificate. Total ~11-12 terms with 1 update.

**Pros:**
- Captures common iOS terminology readers encounter (DDM appears in iOS compliance and app deployment; ACME referenced in ADE enrollment profile)
- Future-proofs against "term not in glossary" complaints from L1/L2 readers
- Managed Apple ID is iOS/iPadOS-critical — deeper BYOD-vs-corporate ID distinction

**Cons:**
- Scope creep beyond SC #1's explicit list — if the SC listed 6 terms, adding 5 more may be disallowed
- DDM is a macOS concept too — questionable to call it "iOS-specific"
- ACME cert is Phase 28 D-11 content — may be over-covered in glossary + Phase 28 doc
- DEP legacy name reintroduces Apple-deprecated terminology

---

## Gray Area C: NAV-02 Routing for iOS's 4 Paths (index.md + common-issues.md)

**Locked from Phase 25 D-01/D-02:** Hybrid approach = new section at bottom of common-issues.md + platform selector + cross-ref banners in shared Windows symptom categories.

### C1: Mirror macOS section structure exactly (flat symptom-based)

**Description:**
- **index.md:** Add `## iOS/iPadOS Provisioning` H2 after `## macOS Provisioning`. Subsections: Service Desk (L1), Desktop Engineering (L2), Admin Setup — matching macOS structure. Tables with "When to Use" columns.
- **common-issues.md:** Add `## iOS/iPadOS Failure Scenarios` H2 at bottom with ~6 flat symptom categories matching iOS L1 runbooks 16-21 (APNs, ADE not starting, enrollment restriction, license invalid, device cap, compliance blocked). Start-here link to 07-ios-triage.md.
- **MAM-WE:** Single entry in common-issues.md routing to `admin-setup-ios/09-mam-app-protection.md` with ADDTS-01 advisory note. No L1 routing (deferred).
- **Cross-ref banners:** Add to Device Registration, Profile Assignment, Security/Enrollment Windows sections.

**Pros:**
- Maximum consistency with Phase 25 macOS precedent (adversarial-review survived)
- Symptom-based routing is battle-tested — same mental model as Windows + macOS sections
- Low implementation risk — proven pattern
- Matches current iOS L1 runbook 6-scenario structure 1:1

**Cons:**
- Flattens iOS's 4-path reality — readers may not realize "license invalid" is BYOD-path-specific
- MAM-WE inclusion in common-issues feels token (single entry without L1 runbook)
- Does not surface enrollment-path context that matters for disambiguating ADE vs BYOD failures

### C2: Path-segmented routing (4 subsections per path)

**Description:**
- **index.md:** iOS section has subsections per enrollment path (ADE / Device Enrollment / User Enrollment / MAM-WE) rather than per role.
- **common-issues.md:** iOS H2 has per-path sub-H3 sections with sub-symptom lists under each.
- **MAM-WE:** Dedicated subsection within iOS H2.

**Pros:**
- Reflects iOS's actual structural reality (4 paths)
- Readers who know their path can jump directly to relevant content
- MAM-WE gets proportional treatment without looking like token inclusion

**Cons:**
- Departs from macOS precedent established in Phase 25 — fractures consistency
- Higher click cost (readers must first identify path before finding symptom)
- iOS L1 runbooks 16-21 are NOT path-segmented — they cover symptoms that span paths, so per-path routing creates impedance mismatch
- Doubles the size of iOS section vs macOS section
- Violates SC #4 intent (additive injection) by creating a new organizing axis not used elsewhere

### C3: Hybrid — role-first structure + path-aware disambiguation notes

**Description:**
- **index.md:** C1 role-based structure (L1/L2/Admin Setup) but with inline "When path matters" notes where a symptom routes differently per path (e.g., "Device not appearing: ADE → runbook 17 | BYOD → runbook 19"). Admin Setup subsection explicitly lists the 4 paths as content links.
- **common-issues.md:** C1 flat symptom-based BUT each symptom entry with path variance notes inline. E.g., "Device Not Appearing: — ADE: [APNs expired](..16) — BYOD: [License invalid](..19)".
- **MAM-WE:** C1's token entry + cross-link to MAM advisory in l1-runbooks/00-index.md and l2-runbooks/00-index.md (both already shipped).

**Pros:**
- Preserves Phase 25 macOS consistency for structure
- Surfaces path-variance where it genuinely matters without segmenting entire sections
- Single-source: symptom-first is the established mental model across Windows/macOS/iOS
- Readers who don't know their path still land on the right symptom

**Cons:**
- Per-symptom path notes add visual noise for symptoms with no path variance (most of them)
- Risk of path-variance rot: if L1 runbooks change routing, notes in 2 places (admin-setup-ios + common-issues.md) need sync
- Subtly more complex to author/maintain than C1

### C4: C1 with deferred MAM-WE entirely (no common-issues routing)

**Description:** C1 baseline but MAM-WE is NOT listed as a symptom category in common-issues.md. Instead, common-issues.md iOS section preamble includes a single cross-link: "MAM-WE troubleshooting is deferred to ADDTS-01 future milestone. See [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md) for current guide." No MAM symptom entry.

**Pros:**
- Internally consistent: no L1 runbook exists → no symptom routing entry → no dead-end reader
- Matches Phase 30 D-31 ADDTS-01 defer posture exactly
- Cleaner signal to readers: MAM-WE is app-layer, not enrollment-MDM
- Reduces "why doesn't this link have an L1 runbook?" confusion

**Cons:**
- Readers hitting a MAM-WE-specific symptom ("app protection policy not enforcing") may not find guidance in common-issues.md at all
- Silent omission may feel incomplete to admin-audience readers (NAV-02 mandates "iOS/iPadOS section" generically)
- Requires preamble note to redirect

---

## Gray Area D: NAV-02 Quick-Ref L1 + L2 Content (iOS has no CLI)

**Locked from Phase 25 D-07/D-08:** Append iOS section to bottom of both `quick-ref-l1.md` and `quick-ref-l2.md`.

### D1: Mirror macOS quick-ref structure, substitute iOS-appropriate content

**Description:**
- **L1 quick-ref iOS section:**
  - Top Checks (portal-based, ~4-5 items): Device in ABM? Device in Intune? Enrollment profile assigned? APNs cert valid? Compliance state?
  - Escalation Triggers (portal-observation-based)
  - Decision Tree link (07-ios-triage.md)
  - Runbook links (16-21)
- **L2 quick-ref iOS section:**
  - Replace macOS's "Key Terminal Commands" bash block with "MDM Diagnostic Report" subsection (trigger path + data scope) + "Intune Portal Paths" subsection (Token sync > ABM sync > Profile delivery > Compliance state) + compact "Sysdiagnose trigger reference" (per-device-type combos per Phase 31 D-05)
  - Key log artifacts (what sysdiagnose `.tar.gz` contains; Company Portal upload contents)
  - Investigation Runbook links (14-17)
- **Frontmatter:** `platform: all` already set (Phase 25 D-09) — no change.

**Pros:**
- Consistent with macOS quick-ref structure (adversarial-review survived)
- Handles no-CLI reality by substituting content without restructuring section shape
- Sysdiagnose reference in quick-ref is genuinely useful — per-device-type triggers are hard to remember
- Scannable — stays within 40-50 lines per section (macOS L2 is 57 lines)

**Cons:**
- "Sysdiagnose trigger reference" may feel misplaced in a quick-ref (vs a dedicated reference doc)
- Intune portal paths overlap with 15-ios-ade-token-profile.md Prerequisites — some redundancy
- MDM Diagnostic Report as quick-ref content inherits Phase 31 D-31 research flag (portal UI path may shift)

### D2: Flow-heavy L2 (decision matrix lead)

**Description:** D1 baseline but L2 iOS section LEADS with the three-method decision matrix table from Phase 31 D-03 (Method | Who Triggers | Data Scope | Latency) as the opening content. Remaining L2 content compresses beneath. L1 section unchanged from D1.

**Pros:**
- Addresses the "L2 from Windows experience" onboarding problem with the most valuable iOS-unique content
- Decision matrix is inherently a quick-ref format — fits context
- Phase 31 D-03 already authored the matrix; quick-ref reuse = consistency

**Cons:**
- Breaks macOS-precedent content order (macOS leads with IntuneMacODC bash snippet)
- Duplicates Phase 31 14-ios-log-collection.md Section 0 content — risk of drift
- Decision matrix is 6 columns × 3 rows = may crowd the quick-ref
- Two sources of truth for the decision matrix = maintenance burden

### D3: Per-path L1 Top Checks (ADE vs BYOD disambiguation)

**Description:** L1 quick-ref iOS section has TWO Top Checks blocks:
- **ADE path:** Device in ABM? Enrollment profile assigned? ABM token synced? Setup Assistant completed?
- **BYOD / User Enrollment path:** User license valid? Enrollment restriction allowing personal device? Company Portal installed? (MAM-WE path gets no checks — app-layer, no Top Checks meaningful)

L2 quick-ref unchanged from D1.

**Pros:**
- Recognizes iOS's 4-path reality at L1 entry point
- ADE vs BYOD failures have different portal entry points — distinct Top Checks are more accurate
- Surfaces enrollment-path as a first-class disambiguator

**Cons:**
- Doubles L1 iOS section length — scannability cost
- Departs from macOS precedent (single Top Checks block)
- L1 may not know the path yet at triage time — "which Top Checks do I use?" is itself an L1 question
- Breaks cognitive consistency with Windows/macOS sections (single block each)

### D4: Minimal — 5-10 line iOS block with links out

**Description:** L1 and L2 iOS sections are SHORT (5-10 lines each):
- Start-here link to 07-ios-triage.md / 00-index.md iOS sections
- Escalation triggers (3-5 bullets max)
- Runbook links list
- No Top Checks, no sysdiagnose reference, no portal path strings

**Pros:**
- Minimum quick-ref bloat
- Forces detail into runbooks where it belongs
- Fastest to author and least maintenance burden

**Cons:**
- Fails quick-ref card's purpose (L1/L2 use it for rapid portal-check recall, not as link menu)
- Inconsistent with macOS quick-ref sections which have substantive Top Checks + escalation content
- Does not satisfy the "one-page cheat sheet" framing in file preambles
- Regresses against Phase 25 D-07/D-08 precedent which authored meaningful content (not link menus)

---

## Adversarial Review Request

For each of the 4 gray areas above, run Finder/Adversary/Referee:

1. **Finder:** Identify every flaw per candidate (severity: critical/medium/low)
2. **Adversary:** Attempt to disprove surfaced flaws as false positives
3. **Referee:** Rule REAL ISSUE vs FALSE POSITIVE per flaw; sum real-issue score per candidate
4. **Winner per gray area:** Candidate with lowest confirmed-flaw score

Present:
- Full per-candidate flaw trail
- Adversary disproves with reasoning
- Referee rulings
- Winner with synthesized rationale
- Any carry-forward recommendations for phase execution

Context to honor: all "Locked priors" listed at top of this document — flaws that challenge these are out-of-scope for this review.
