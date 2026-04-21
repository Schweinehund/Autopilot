# Phase 34: Android Foundation - Context

**Gathered:** 2026-04-21
**Status:** Ready for planning
**Method:** Adversarial review (finder/adversary/referee scored pattern) across 15 candidate options in 5 sub-areas

<domain>
## Phase Boundary

Phase 34 delivers five foundational documents that anchor all downstream v1.4 Android Enterprise phases (35-42). The scope is conceptual and structural only — no admin setup content, no troubleshooting, no mode-specific guides, no navigation updates beyond what the foundation documents themselves require.

1. `docs/_glossary-android.md` — disambiguates 13 Android terms that collide with Windows/macOS/iOS glossaries (AEBASE-01)
2. `docs/android-lifecycle/00-enrollment-overview.md` — explains the two orthogonal axes (ownership × management scope) and establishes the iOS supervision analog (AEBASE-02)
3. `docs/android-lifecycle/02-provisioning-methods.md` — NFC / QR / DPC identifier (afw#setup) / Zero-Touch matrix across all supported modes with Android version availability (AEBASE-03)
4. `docs/android-lifecycle/03-android-version-matrix.md` — minimum OS per mode and breakpoint callouts for Android 11 (COPE NFC removal), Android 12 (IMEI/serial removal), Android 15 (FRP hardening) (AEBASE-04)
5. `docs/_templates/admin-template-android.md` — tri-portal H4 sub-section template (Intune admin center / Managed Google Play / Zero-Touch portal) with optional-ZT handling for BYOD/AOSP guides (AEBASE-05)

Phase 35-42 consume these as references. Breaking a contract here causes rework across 8 downstream phases.

</domain>

<decisions>
## Implementation Decisions

### Enrollment Overview Structure (AEBASE-02 / SC2)
- **D-01:** **5-column mode-comparison table** mirroring v1.3 Phase 26 iOS shape (docs/ios-lifecycle/00-enrollment-overview.md lines 31-36). Columns: **Mode | Ownership Model | Management Scope | Provisioning Surface | Appropriate Use Case**. Rows per mode: ZTE, COBO (Fully Managed), BYOD Work Profile, Dedicated, AOSP.
- **D-02:** **Separate narrative section** placed immediately after the comparison table explains the two orthogonal axes (ownership vs management scope). Narrative — not a table column — carries the axes explanation so that readers unfamiliar with the axes concept don't bounce off dense tabular content. Title: "Two Axes of Android Enterprise."
- **D-03:** **iOS supervision analog as a dedicated subsection**, NOT a column header, to stay AEAUDIT-04 clean (zero uses of "supervision" as an Android management term). Section titled "For Admins Familiar with iOS" uses this exact framing: "Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for disambiguation."
- **D-04:** **Management Scope column values** use Android terminology only — "Fully managed" / "Work profile" / "Dedicated (COSU)" / "AOSP (unmanaged)". Do NOT use "Supervised" / "Unsupervised" for Android. Phase 34 narrative does the iOS cross-platform bridging — table rows stay Android-native.
- **D-05:** **AOSP row** in the comparison table carries explicit "out-of-GMS" annotation in the Provisioning Surface column ("QR only, OEM-gated") and is explicitly called out in the narrative as structurally different (no MGP binding, no work profile, OEM matrix defined separately in Phase 39 stub).
- **D-06:** **Provisioning Surface column** (not full provisioning matrix) lists 1-2 representative methods per mode and links to `docs/android-lifecycle/02-provisioning-methods.md` for the full method-mode matrix. Prevents Anti-Pattern 1 duplication.
- **D-07:** **Target length 800-1200 words** (matches v1.3 iOS precedent D-01).

### Android Glossary Structure (AEBASE-01 / SC1)
- **D-08:** **Mirror `docs/_glossary-macos.md` structure exactly**: alphabetical pipe-delimited index at top (line 16 pattern), `---` separator, then category sections.
- **D-09:** **Categories**: Enrollment / Ownership & Management Scope / Provisioning Methods / Portals & Binding / Compliance & Attestation. Five categories absorb all 13 disambiguation entries without forcing term-to-category ambiguity (theme-only option 2B risk).
- **D-10:** **Per-term cross-platform callout after definition**, using Anti-Pattern 4 "Do this instead" format (ARCHITECTURE.md lines 525-526): `> **Cross-platform note:** [How this Android term differs from the term with the same name on Windows/macOS/iOS]`. Definition stands alone; callout comes after.
- **D-11:** **13 mandatory disambiguation entries** per AEBASE-01: work profile, supervision (as "absent Android concept" callout-only entry pointing to Fully Managed), user enrollment, dedicated, corporate identifiers, COBO, COPE, BYOD, DPC, Managed Google Play (MGP), afw#setup, WPCO, fully managed.
- **D-12:** **Additional Android-native terms** (non-collision but needed for downstream phases): Zero-Touch Enrollment, Play Integrity, AMAPI, Managed Home Screen (MHS), Entra shared device mode, EMM.
- **D-13:** **Version history section at the bottom** — same pattern as _glossary-macos.md (observed lines 111+) — records term evolution (COPE→WPCO language drift, AMAPI April 2025 migration, SafetyNet→Play Integrity January 2025 deprecation).
- **D-14:** **`last_verified` + `review_by` frontmatter with 60-day review cycle** (not 90-day) per SUMMARY.md guidance: Android UI changes faster than macOS.
- **D-15:** **Reciprocal cross-reference stub** added to `docs/_glossary-macos.md` — a 1-line "See also: Android Provisioning Glossary" entry (AEAUDIT-03 is Phase 42's full reciprocal-link work; Phase 34 does not modify _glossary-macos.md content, only notes the planned reciprocal link for Phase 42).

### Admin Template Structure (AEBASE-05 / SC3)
- **D-16:** **Single template file** at `docs/_templates/admin-template-android.md`. Three H4 portal sub-sections: `#### In Intune admin center` / `#### In Managed Google Play` / `#### In Zero-Touch portal`.
- **D-17:** **ZT portal section wrapped in HTML-comment subtractive pattern** following exact precedent from admin-template-macos.md lines 76-77 and admin-template-ios.md lines 98-99:
  ```markdown
  <!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
       corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
       via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
       admin guides (neither uses the Zero-Touch portal). -->
  ```
- **D-18:** **Managed Google Play subsection is mandatory** for all GMS-based modes (COBO, BYOD, Dedicated, ZTE) — MGP binding is the prerequisite gate per PITFALLS.md Pitfall 2. Template does NOT make MGP optional. Only AOSP guides delete the MGP subsection, and Phase 39 AOSP stub writes that guide using a different pattern per research.
- **D-19:** **"What breaks if misconfigured" callouts required per every configurable setting** (pattern inherited from admin-template-macos.md and admin-template-ios.md). Tri-portal cross-portal symptoms documented inline — a misconfiguration in Managed Google Play may surface as a symptom in Intune admin center.
- **D-20:** **Renewal/Maintenance section mandatory by default** (unlike iOS template where optional) — per ARCHITECTURE.md Q3 guidance (line 371). Both MGP binding and ZT reseller relationship have maintenance obligations.
- **D-21:** **Frontmatter block** at top: `platform: Android`, `audience: admin`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle).
- **D-22:** **Renumbered downstream admin guides** — the admin-setup-android/ directory starts at `00-overview.md` (Phase 35), so template is Phase 34 deliverable but not numbered in the admin-setup-android/ sequence.

### Provisioning-Method Matrix Orientation (AEBASE-03 / SC4)
- **D-23:** **Mode-rows × method-cols orientation**. Rows: COBO, BYOD Work Profile, Dedicated, ZTE, AOSP. Columns: NFC, QR, afw#setup, Zero-Touch. Cell values: ✓ (supported) / ✗ (not supported) / the specific min Android version where support exists. Reader locates mode first, scans row for supported methods — matches AEBASE-03 phrasing ("for any given enrollment mode which of the four provisioning methods are supported") and Phase 38 SC4 phrasing ("filtered row for dedicated mode").
- **D-24:** **Android version availability embedded in cells** (not a separate column). A cell like "✓ Android 11+ (COPE NFC removed)" carries both the supported marker and the version gate. Prevents compound cell bloat by keeping notes short.
- **D-25:** **Dedicated supplementary column "Notes"** after the 4 method columns captures mode-level constraints that don't fit per-cell (e.g., COBO row Notes: "Dual-SIM devices: register IMEI 1"; Dedicated row Notes: "MHS exit-PIN sync requirement — see Phase 38").
- **D-26:** **Single canonical matrix** in `docs/android-lifecycle/02-provisioning-methods.md` — Anti-Pattern 1 guard. Downstream mode guides (Phases 36-39) reference this matrix via filtered-row link patterns, NOT by duplicating grids.
- **D-27:** **Mutual-exclusion callout on ZT column** for Samsung devices: Knox Mobile Enrollment is mutually exclusive with Zero-Touch on Samsung hardware (PITFALLS.md mutual-exclusion concern). Callout placed adjacent to the Zero-Touch column header, not inside a cell.
- **D-28:** **No Knox ME row in v1.4** — KME is deferred to v1.4.1 per PROJECT.md Key Decisions. Matrix notes that KME will be added in v1.4.1 (stub reference only).

### Version Fragmentation Matrix Structure (AEBASE-04 / SC5)
- **D-29:** **Breakpoints-only orientation**. Three columns: **Mode | Intune Minimum OS | Notable Version Breakpoints**. Rows per mode (COBO, BYOD Work Profile, Dedicated, ZTE, AOSP). Mirrors FEATURES.md lines 350-358 research structure.
- **D-30:** **Narrative callouts per breakpoint live in a second section** below the matrix titled "Version Breakpoint Details." Each breakpoint (Android 11 COPE NFC removal / Android 12 IMEI & serial removal from corporate identifiers / Android 15 FRP hardening) gets its own subsection with mode impact and admin action required.
- **D-31:** **Do NOT add `min_android_version` as frontmatter** on any Android doc — ARCHITECTURE.md Q7 explicit prohibition. Version gating lives in this matrix body only; downstream admin guides cite back to this matrix, they do not restate versions inline (drift guard per Pitfall 1).
- **D-32:** **Supplementary subsection "Non-version Breakpoints"** covers temporal deprecations: SafetyNet → Play Integrity (January 2025), AMAPI migration for BYOD (April 2025). These are not version-gated but are policy-gated — document alongside version breakpoints so admins have a single drift-surface to consult.
- **D-33:** **`last_verified` frontmatter on this matrix is load-bearing** — milestone audit (Phase 42) uses this date as the audit anchor. 60-day review cycle (not 90).

### Claude's Discretion
- Exact word counts within the 800-1200 enrollment-overview target
- Narrative tone and voice in the enrollment overview (factual, audience-mixed)
- Exact category names in the glossary so long as the 5-category count and coverage of 13 terms + Android-native terms is preserved
- Mermaid diagram inclusion in the enrollment overview (iOS Phase 26 used one; Android may benefit from a ownership × management-scope decision diagram — author's call)
- Exact cell content for the provisioning-method matrix version annotations (shortest readable phrasing)
- Whether to include a "Portal shorthand glossary" at the top of the admin template (e.g., "Throughout this template, 'MGP' refers to Managed Google Play; 'ZT' refers to Zero-Touch")
- Ordering of the 5 category sections in the glossary

### Folded Todos
None — Phase 34 is pure foundation work with no pending-todo overlap.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor, reviewer) MUST read these before planning or implementing.**

### Requirements and Roadmap
- `.planning/REQUIREMENTS.md` — AEBASE-01 through AEBASE-05 and traceability table (Phase 34)
- `.planning/ROADMAP.md` — Phase 34 entry lines 92-103 with goal, dependencies, and 5 success criteria
- `.planning/PROJECT.md` — v1.4 scope decisions, scope-trim rationale, and deferred items (Knox ME / COPE full / AOSP full / cross-platform nav)
- `.planning/STATE.md` — current milestone state and research flags to verify at plan time

### v1.4 Android Enterprise Research (all 2026-04-19)
- `.planning/research/FEATURES.md` — 5 enrollment modes, tri-portal model, reading-model complexity, mode-by-mode deep dives, provisioning matrix at lines 329-336, version matrix at lines 350-358
- `.planning/research/ARCHITECTURE.md` — directory structure, parallel-directory pattern, 9 Q&A architecture decisions, anti-patterns
- `.planning/research/PITFALLS.md` — 7+ critical pitfalls; especially Pitfall 1 (version decay), Pitfall 2 (MGP binding), Pitfall 3 (terminology collision), Pitfall 10 (template before mode docs)
- `.planning/research/SUMMARY.md` — consolidated research recommendations and source-confidence hierarchy (Google AE Help > MS Learn > Jason Bayton > community)
- `.planning/research/STACK.md` — tooling/frontmatter conventions, 60-day review cycle rationale for Android

### v1.3 Validated Precedents
- `.planning/milestones/v1.3-phases/26-ios-ipados-foundation/26-CONTEXT.md` — iOS Foundation CONTEXT (validated decision pattern for shape of this phase)
- `docs/ios-lifecycle/00-enrollment-overview.md` — **PRIMARY structural template** for enrollment overview (5-col comparison table at lines 31-36, per-path narrative sections, audience-routing "How to Use This Guide" section)
- `docs/_glossary-macos.md` — **PRIMARY structural template** for glossary (alphabetical index at line 16, category sections, per-term cross-platform callouts after definition)
- `docs/_templates/admin-template-ios.md` — iOS admin template (HTML-comment subtractive-deletion pattern at lines 98-99)
- `docs/_templates/admin-template-macos.md` — macOS admin template (HTML-comment subtractive-deletion pattern at lines 76-77)

### Cross-Platform Navigation (for awareness only — NOT modified in Phase 34)
- `docs/index.md` — navigation hub (Android stub deferred to Phase 42)
- `docs/common-issues.md` — cross-platform symptom router (Android integration post-v1.4)
- `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — quick reference cards (Android integration post-v1.4)
- `docs/_glossary.md` — Windows Autopilot glossary (for cross-reference targets in Android glossary)

### Adversarial Review Artifact
- `.planning/phases/34-android-foundation/34-DISCUSSION-LOG.md` — full adversarial-review audit trail (finder/adversary/referee verdicts)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from v1.0-v1.3)
- **Frontmatter schema** — `last_verified`, `review_by`, `platform`, `audience`, `applies_to` — established across 118 docs. Phase 34 extends `platform` values to include `Android` (already planned per ARCHITECTURE.md).
- **Alphabetical glossary index pattern** — pipe-delimited top-of-page index (e.g., `[ABM](#abm) | [ABM Token](#abm-token) | ...`) from `_glossary-macos.md` line 16.
- **Per-term cross-platform callout pattern** — `> **Windows equivalent:** ...` blockquote after definition from `_glossary-macos.md` (lines 26, 32, 38, 44, 50). Android version uses `> **Cross-platform note:**` framing.
- **HTML-comment subtractive-deletion pattern** — `<!-- Include ... ONLY if ... Delete this entire section if not applicable. -->` from admin-template-macos.md lines 76-77 and admin-template-ios.md lines 98-99.
- **5-column comparison table pattern** — enrollment-path comparison from `docs/ios-lifecycle/00-enrollment-overview.md` lines 31-36. Android version uses Mode / Ownership / Management Scope / Provisioning Surface / Use Case columns.
- **Version-gate blockquote pattern** — `> **Platform gate:** ...` at top of every platform-specific doc.
- **"How to Use This Guide" audience-routing section** — L1 / L2 / Admin routing from `docs/ios-lifecycle/00-enrollment-overview.md` lines 13-19.
- **Subsection anchors for downstream cross-reference** — Phase 35-42 admin guides and runbooks will link to `#supervision`, `#fully-managed`, etc. anchors established in Phase 34.

### Established Patterns
- **60-day review cycle for fast-moving platforms** — iOS uses 60-day (faster than macOS 90-day); Android per SUMMARY.md also needs 60-day.
- **Source-hierarchy confidence attribution** — HIGH: Google Android Enterprise Help; MEDIUM: Microsoft Learn Android docs (lag 6-18 months); MEDIUM: Jason Bayton (bayton.org/android); LOW: community blogs.
- **Anti-Pattern 1 guard** — matrices live in single canonical reference docs, not duplicated into mode guides. Mode guides use "filtered row" reference patterns.
- **Anti-Pattern 4 guard** — Android terms defined on their own merits; cross-platform notes come AFTER definitions, never as the primary definition.

### Integration Points
- `docs/android-lifecycle/` directory is NEW — no existing content to integrate with. Created in Phase 34.
- `docs/admin-setup-android/` directory created in Phase 35 (not Phase 34). Template for that directory is Phase 34 deliverable.
- `docs/_glossary-android.md` is NEW — no existing content. `docs/_glossary-macos.md` existing cross-reference stub ("Microsoft's 'Work profile on personally-owned devices' concept applies to Android but has no iOS-Autopilot equivalent" — line 26) stays valid after _glossary-android.md is created.
- `docs/_templates/admin-template-android.md` is NEW. Parallel to existing `admin-template-macos.md` and `admin-template-ios.md`. Phase 35-39 admin guides copy from this template.
- Enrollment overview must establish anchors (`#two-axes`, `#fully-managed`, `#work-profile`, `#dedicated`, `#aosp`, `#for-admins-familiar-with-ios`) that Phase 35-42 cross-references depend on.
- Provisioning-method matrix anchors (`#nfc`, `#qr`, `#afw-setup`, `#zero-touch`) must be stable — Phase 36-39 admin guides reference filtered rows.
- Version matrix anchors (`#cobo`, `#byod`, `#dedicated`, `#zte`, `#aosp`, `#android-11-breakpoint`, `#android-12-breakpoint`, `#android-15-breakpoint`) — Phase 36-39 and Phase 42 audit reference these.

</code_context>

<specifics>
## Specific Ideas

### From Adversarial Review Evidence
- **"Supervision Analog" framing**: Narrative prose, not column header. AEAUDIT-04 forbids "supervision" used as an Android management term. Use "Management Scope" column name; iOS bridge lives in a dedicated narrative subsection titled "For Admins Familiar with iOS."
- **Mode row labels**: Use the PROJECT.md Key Decisions language — COBO (Fully Managed), BYOD (Work Profile), Dedicated (COSU), ZTE (Zero-Touch Enrollment), AOSP. Use the parenthetical expansion on first appearance per row.
- **AOSP footprint in Phase 34**: Present but flagged. AOSP appears in all three matrices (overview comparison, provisioning methods, version matrix) with explicit "out-of-GMS" annotation and forward-reference to Phase 39 stub (`docs/admin-setup-android/06-aosp-stub.md`). Phase 34 does NOT deep-dive AOSP — Phase 39 does.
- **Tri-portal shorthand**: Throughout all Phase 34 deliverables, use full names on first use per section, then shorthand: "Intune admin center" / "Managed Google Play (MGP)" / "Zero-Touch portal (ZT portal)."
- **Research-flag verification at plan time** per STATE.md: (a) Zero-Touch portal UI naming check; (b) enrollment token 90-day limit (MEDIUM confidence — not stated in current MS Learn); (c) COPE deprecation language ("Google recommends WPCO", NOT "COPE deprecated").

### Cross-Platform Callout Pattern for Glossary
Each of 13 disambiguation entries gets this structure:
```markdown
### [Term]

[Android definition, 2-4 sentences, on own merits.]

> **Cross-platform note:** On [Windows/macOS/iOS], "[term]" refers to [different
> concept]. See [sibling glossary link]. Do not conflate.
```

### Version Breakpoint Narrative Pattern
Each of 3 breakpoints gets this structure:
```markdown
### Android 11 — COPE NFC Provisioning Removed

**Affected modes:** COBO (NFC path only), COPE (discontinued NFC path).
**What changed:** [2-3 sentences on behavior change.]
**Admin action required:** [Migration path or new supported approach.]
**References:** [Google AE Help link], [MS Learn link].
```

</specifics>

<deferred>
## Deferred Ideas

Ideas that surfaced during the adversarial review but belong in other phases or future milestones:

- **Knox Mobile Enrollment row in provisioning-method matrix** — deferred to v1.4.1 per PROJECT.md. Phase 34 matrix includes a placeholder note that KME will be added in v1.4.1.
- **Full AOSP OEM matrix (RealWear, Zebra, Pico, HTC VIVE Focus, Meta Quest)** — deferred to v1.4.1 per PROJECT.md. Phase 34 matrices reference AOSP in a single row; the full OEM breakdown is Phase 39 stub's scope (AEAOSP-01).
- **4-platform comparison document** — deferred to v1.5 per PROJECT.md (AECOMPARE-01). Phase 34 glossary does NOT pre-empt this deliverable with a 4-platform collision table (Option 2C rejected during adversarial review).
- **Cross-platform navigation integration** (backport Android into `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) — deferred to post-v1.4 unification task per PROJECT.md Key Decisions. Phase 42 handles only the `docs/index.md` Android stub.
- **Reciprocal cross-reference link from `docs/_glossary-macos.md` to `docs/_glossary-android.md`** — deferred to Phase 42 (AEAUDIT-03). Phase 34 creates the target but does not modify _glossary-macos.md.
- **Mermaid diagram in enrollment overview** — author's discretion (Claude's Discretion). iOS Phase 26 used one; Android overview may benefit from an ownership × management-scope decision diagram. Not required by any success criterion.

### Reviewed Todos (not folded)
None — `gsd-tools todo match-phase 34` returned zero matches.

</deferred>

---

*Phase: 34-android-foundation*
*Context gathered: 2026-04-21*
*Method: adversarial-review skill (finder → adversary → referee) — 46 flaws evaluated, 23 real, winners selected on lowest-real-flaw basis*
