---
phase: 35
slug: android-prerequisites-mgp-zero-touch-portal
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-21
---

# Phase 35 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This is a **documentation phase** — no traditional test framework. Validation is grep-based mechanical checks + structural audits. See `35-RESEARCH.md` §Validation Architecture for the authoritative source.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Bash + grep + wc + git (no test runner) |
| **Config file** | None — checks are ad-hoc per-deliverable |
| **Quick run command** | Targeted grep against the file(s) modified by the current task (see Per-Task map below) |
| **Full suite command** | Sequential execution of all grep checks in §Per-Task Verification Map |
| **Estimated runtime** | ~10 seconds (grep across 4 small markdown files + git diff) |

---

## Sampling Rate

- **After every task commit:** Run targeted grep against the file(s) modified by that task. Anchor-integrity check for any doc modified.
- **After every plan wave:** File-existence check on the 4 deliverables; frontmatter presence + 60-day `review_by` check; AEAUDIT-04 "supervision" guard; PITFALL 11 shared-file guard (git diff).
- **Before `/gsd-verify-work`:** All grep checks pass. Zero "supervision" occurrences in Phase 35 docs (except allowed cross-platform-note contexts). Zero Android links in v1.0–v1.3 shared files. All 16 reserved anchors resolve.
- **Max feedback latency:** 10 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 35-01-01 | 01 | 1 | AEPREQ-01 | — | Tri-portal surface section present | grep | `grep -c "^## Tri-Portal Surface\|^## Tri-portal Surface\|tri-portal-surface" docs/android-lifecycle/01-android-prerequisites.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-01-02 | 01 | 1 | AEPREQ-01 | — | GMS vs AOSP split subsection present | grep | `grep -c "gms-vs-aosp-split\|GMS vs AOSP" docs/android-lifecycle/01-android-prerequisites.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-01-03 | 01 | 1 | AEPREQ-01 | — | Android 12+ corporate-identifier anchor present | grep | `grep -c "android-12-corporate-identifiers\|Android 12" docs/android-lifecycle/01-android-prerequisites.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-01-04 | 01 | 1 | AEPREQ-01 | — | Portal-dependencies-by-mode subsection present | grep | `grep -c "portal-dependencies-by-mode\|Portal Dependencies" docs/android-lifecycle/01-android-prerequisites.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-01-05 | 01 | 1 | AEPREQ-01 (D-01) | — | Concept-only guard — no portal step H4 headings | grep | `grep -c "^#### In Intune admin center\|^#### In Managed Google Play\|^#### In Zero-Touch portal" docs/android-lifecycle/01-android-prerequisites.md` = 0 | ❌ W0 | ⬜ pending |
| 35-01-06 | 01 | 1 | AEPREQ-01 (D-06) | — | Word-count within 600–900 range | structure | `wc -w docs/android-lifecycle/01-android-prerequisites.md` between 600–900 | ❌ W0 | ⬜ pending |
| 35-01-07 | 01 | 1 | AEPREQ-01 | — | Cross-reference to Phase 34 version matrix present (D-03) | grep | `grep -c "03-android-version-matrix.md" docs/android-lifecycle/01-android-prerequisites.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-02-01 | 02 | 1 | AEPREQ-02 | — | Mermaid flowchart block present | grep | `grep -c "^\`\`\`mermaid" docs/admin-setup-android/00-overview.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-02-02 | 02 | 1 | AEPREQ-02 | — | Five mode branches in mermaid (COBO, BYOD, Dedicated, ZTE, AOSP) | grep | `grep -cE "COBO\|BYOD\|Dedicated\|ZTE\|AOSP" docs/admin-setup-android/00-overview.md` ≥ 5 | ❌ W0 | ⬜ pending |
| 35-02-03 | 02 | 1 | AEPREQ-02 (D-09) | — | GMS-path prerequisites checklist present | grep | `grep -c "gms-path-prerequisites\|GMS-Path Prerequisites\|### GMS" docs/admin-setup-android/00-overview.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-02-04 | 02 | 1 | AEPREQ-02 (D-09) | — | ZTE-path prerequisites checklist present | grep | `grep -c "zte-path-prerequisites\|ZTE-Path Prerequisites\|### ZTE" docs/admin-setup-android/00-overview.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-02-05 | 02 | 1 | AEPREQ-02 (D-09) | — | AOSP-path prerequisites checklist present | grep | `grep -c "aosp-path-prerequisites\|AOSP-Path Prerequisites\|### AOSP" docs/admin-setup-android/00-overview.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-02-06 | 02 | 1 | AEPREQ-02 (D-10) | — | Portal Navigation Note section present | grep | `grep -c "portal-navigation-note\|Portal Navigation Note" docs/admin-setup-android/00-overview.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-01 | 03 | 2 | AEPREQ-03 | — | What-breaks table present with required column | grep | `grep -c "Downstream impact" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-02 | 03 | 2 | AEPREQ-03 (D-12) | — | Failure-mode row: wrong portal URL | grep | `grep -cE "Wrong portal URL\|intune\.microsoft\.com" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-03 | 03 | 2 | AEPREQ-03 (D-12) | — | Failure-mode row: Google Workspace account used | grep | `grep -c "Google Workspace\|G-Suite" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-04 | 03 | 2 | AEPREQ-03 (D-12) | — | Failure-mode row: binding disconnected | grep | `grep -c "Binding disconnected\|disconnect" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-05 | 03 | 2 | AEPREQ-03 (D-13) | — | Dedicated "Account types" subsection present | grep | `grep -cE "^### Account types\|^## Account types" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-06 | 03 | 2 | AEPREQ-03 (D-13) | — | Entra-preferred inline reminder at account-selection step | grep | At least one blockquote ≥ 1 line containing both "Entra" and "August 2024" | ❌ W0 | ⬜ pending |
| 35-03-07 | 03 | 2 | AEPREQ-03 (D-14) | — | Pre-Aug-2024 bindings deferred as text-only stub | grep | `grep -c "v1\.4\.1\|binding migration" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-08 | 03 | 2 | AEPREQ-03 (D-15) | — | `endpoint.microsoft.com` used (not bare `intune.microsoft.com`) | grep | `grep -c "endpoint\.microsoft\.com" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-03-09 | 03 | 2 | AEPREQ-03 (D-16) | — | Disconnect-consequences anchor present | grep | `grep -c "disconnect-consequences\|^## Disconnect" docs/admin-setup-android/01-managed-google-play.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-04-01 | 04 | 2 | AEPREQ-04 (D-19) | — | Top-of-page reseller prerequisites blockquote present | grep | First 25 lines after frontmatter contain blockquote with "reseller" | ❌ W0 | ⬜ pending |
| 35-04-02 | 04 | 2 | AEPREQ-04 (D-19) | — | Numbered Step 0 section present | grep | `grep -cE "^## Step 0\|^### Step 0" docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-04-03 | 04 | 2 | AEPREQ-04 (D-20) | — | DPC extras JSON code block present | grep | `grep -c "\`\`\`json" docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-04-04 | 04 | 2 | AEPREQ-04 (D-20) | — | DPC package reference present | grep | `grep -c "com\.google\.android\.apps\.work\.clouddpc" docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-04-05 | 04 | 2 | AEPREQ-04 (D-20) | — | EXTRA_ENROLLMENT_TOKEN field reference present | grep | `grep -c "EXTRA_ENROLLMENT_TOKEN\|PROVISIONING_ADMIN_EXTRAS_BUNDLE" docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-04-06 | 04 | 2 | AEPREQ-04 (D-20) | — | Fields reference table adjacent to JSON block | structure | Pipe-table with "Required" column present within 30 lines of JSON block | ❌ W0 | ⬜ pending |
| 35-04-07 | 04 | 2 | AEPREQ-04 (D-21) | — | KME/ZT top-of-doc warning blockquote present | grep | Within first 40 lines of body, a blockquote containing both "KME" and "mutual" | ❌ W0 | ⬜ pending |
| 35-04-08 | 04 | 2 | AEPREQ-04 (D-21) | — | KME/ZT inline callout near ZT-Intune linking step | grep | Within 15 lines of `#link-zt-to-intune` anchor, a blockquote containing "Samsung" and ("KME" or "mutual") | ❌ W0 | ⬜ pending |
| 35-04-09 | 04 | 2 | AEPREQ-04 (D-22) | — | Phase 39 forward-references present for deferred content | grep | `grep -c "Phase 39\|dual-SIM\|device claim" docs/admin-setup-android/02-zero-touch-portal.md` ≥ 1 | ❌ W0 | ⬜ pending |
| 35-04-10 | 04 | 2 | AEPREQ-04 (D-22) | — | No Phase 39 anchors reserved in Phase 35 output | grep | `grep -cE "#device-claim-workflow\|#profile-assignment\|#dual-sim-imei-1\|#reseller-upload-handoff" docs/admin-setup-android/02-zero-touch-portal.md` = 0 | ❌ W0 | ⬜ pending |
| 35-all-01 | all | gate | AEAUDIT-04 | — | Zero "supervision" as Android management term in Phase 35 docs | grep | `grep -in "supervis" docs/android-lifecycle/01-android-prerequisites.md docs/admin-setup-android/*.md` returns zero matches (or matches only in explicit iOS-cross-reference blockquote) | ❌ W0 | ⬜ pending |
| 35-all-02 | all | gate | D-18/D-24 | — | All 4 docs have `platform: Android` frontmatter | grep | `grep -l "^platform: [Aa]ndroid$" docs/android-lifecycle/01-android-prerequisites.md docs/admin-setup-android/*.md` returns 4 files | ❌ W0 | ⬜ pending |
| 35-all-03 | all | gate | D-18/D-24 | — | All 4 docs have `last_verified` + `review_by` frontmatter | grep | Each of the 4 files has both `last_verified:` and `review_by:` in frontmatter; delta ≤ 60 days | ❌ W0 | ⬜ pending |
| 35-all-04 | all | gate | PITFALL 11 | — | Zero modifications to v1.0–v1.3 shared files | git | `git diff --name-only HEAD~N HEAD -- docs/_glossary-macos.md docs/_glossary.md docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md` returns empty across Phase 35 commits | ❌ W0 | ⬜ pending |
| 35-all-05 | all | gate | AEAUDIT-04 | — | Zero SafetyNet references in Phase 35 docs | grep | `grep -in "safetynet" docs/android-lifecycle/01-android-prerequisites.md docs/admin-setup-android/*.md` returns zero matches | ❌ W0 | ⬜ pending |
| 35-all-06 | all | gate | — | — | No deferred-file links in Phase 35 docs | grep | Zero matches for `common-issues\|quick-ref-l1\|quick-ref-l2` as link targets in Phase 35 docs | ❌ W0 | ⬜ pending |
| 35-all-07 | all | gate | — | — | Anchor integrity — all reserved anchors resolve | structure | Every anchor in CONTEXT D-05/D-11/D-17/D-23 resolves to an H1/H2/H3 heading in the corresponding file | ❌ W0 | ⬜ pending |
| 35-all-08 | all | gate | — | — | Cross-reference integrity — all intra-Phase-35 links resolve | structure | Every `../android-lifecycle/` or `01-managed-google-play.md#...` or `02-zero-touch-portal.md#...` link in Phase 35 docs resolves to an existing anchor | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky · W0 = depends on Wave 0 file creation*

---

## Wave 0 Requirements

All four deliverable files do NOT exist yet — all are created in this phase:

- [ ] `docs/android-lifecycle/01-android-prerequisites.md` — covers AEPREQ-01 (Wave 1)
- [ ] `docs/admin-setup-android/00-overview.md` — covers AEPREQ-02 (Wave 1)
- [ ] `docs/admin-setup-android/01-managed-google-play.md` — covers AEPREQ-03 (Wave 2)
- [ ] `docs/admin-setup-android/02-zero-touch-portal.md` — covers AEPREQ-04 (Wave 2)
- [ ] `docs/admin-setup-android/` directory creation (git auto-creates on first file)

**Pre-Wave-1 gate:** Phase 34 deliverables must be merged — especially `docs/_templates/admin-template-android.md` (required structural template for the three admin-setup-android docs in Wave 2). `docs/android-lifecycle/00-enrollment-overview.md`, `02-provisioning-methods.md`, `03-android-version-matrix.md`, and `_glossary-android.md` are cross-reference targets required before Wave 1 can produce authoritative links.

**Framework install:** None — validation uses bash + coreutils + git only.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mermaid flowchart renders as a legible 5-branch diagram | AEPREQ-02 (D-07) | Visual rendering validation — grep cannot check diagram legibility | Render the mermaid block via the GitHub web UI or a mermaid renderer; confirm 5 mode branches converge correctly (COBO/BYOD/Dedicated → MGP; ZTE → MGP + ZT portal; AOSP → Phase 39 stub). |
| "Downstream impact" column cells are semantically meaningful | AEPREQ-03 (D-12) | grep confirms column header presence but not cell content quality | Read the what-breaks table and confirm each row's downstream-impact cell identifies concrete modes broken (e.g., "COBO / BYOD WP / Dedicated broken"). |
| Top-of-doc KME/ZT callout is framed as decision-framing, not gotchas-enumeration | AEPREQ-04 (D-21) | SC5 semantic check — grep catches the text but cannot distinguish decision-framing tone from gotchas-section tone | Read the top-of-doc blockquote; confirm phrasing is "For Samsung fleets: choose KME or ZT, never both" style, not "Here is a list of things that might break" style. |
| "Fields reference" table (D-20) is adjacent and not separated by the copy-paste target JSON | AEPREQ-04 | Visual proximity check | Confirm the Fields reference table is within 30 lines of (ideally immediately before or after) the JSON code block, and the JSON block does not contain `//` comments. |
| Phase 39 anchor namespace is reserved but not used | AEPREQ-04 (D-22) | Forward-planning contract | After Phase 35 execution, confirm the 4 reserved Phase 39 anchors (`#device-claim-workflow`, `#profile-assignment`, `#dual-sim-imei-1`, `#reseller-upload-handoff`) are absent from `02-zero-touch-portal.md`. |
| Step 0 blockquote and Step 0 section differ in content (blockquote is decision-framing, section is execution) | AEPREQ-04 (D-19) | Semantic check beyond grep — both must exist AND differ | Read both; confirm blockquote focuses on the reseller-is-hard-prereq framing and Step 0 section focuses on the verification execution steps. |

---

## Validation Sign-Off

- [ ] All tasks have automated grep verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (4 deliverable files + admin-setup-android/ directory)
- [ ] No watch-mode flags (not applicable — no test runner)
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending — planner to confirm before execution begins
