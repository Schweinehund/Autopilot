# Requirements: v1.4.1 Android Enterprise Completion & v1.4 Cleanup

**Milestone:** v1.4.1
**Goal:** Close all 6 v1.4 Android deferred items (DEFER-01..06) — complete Android Enterprise coverage (Knox ME, full AOSP per-OEM, COPE full admin) and harden v1.4 artifacts (audit allow-list, 60-day freshness, AOSP stub) — bringing Android to operational completeness parity with Windows / macOS / iOS.
**REQ-ID convention:** AE-prefix + domain, continuing from v1.4 numbering. REQ-IDs pair 1:1 to requirements; phase mapping populated by `/gsd-new-milestone` roadmapper step.
**Last updated:** 2026-04-24

---

## v1.4.1 Requirements (28 total across 5 categories)

### Cleanup & Audit Harness (AEAUDIT-02..05 — Phase 43)

- [x] **AEAUDIT-02**: Expand audit allow-list sidecar from ~10 to ~37 pins for legitimate iOS-attributed supervision bridge-prose references in `docs/_glossary-android.md` + `docs/reference/android-capability-matrix.md` Cross-Platform Equivalences section
- [x] **AEAUDIT-03**: Normalize `last_verified` 60-day freshness cycle — retroactively re-date L2 runbooks 18-21 review_by (2026-07-22 → 2026-06-22) + normalize `docs/admin-setup-android/admin-template-android.md` frontmatter (exclude `_templates/` from C5 scope OR normalize sentinel)
- [x] **AEAUDIT-04**: Resolve Phase 39 AOSP stub envelope discrepancy (~1089 words vs 600-900 target) via content-migration approach — `docs/admin-setup-android/06-aosp-stub.md` becomes thin routing + PITFALL-7 anchor; deep content migrates to Phase 45 per-OEM files
- [x] **AEAUDIT-05**: Fix audit harness sidecar-path blocker — migrate `v1.4-audit-allowlist.json` from archived `.planning/phases/42-*/` to persistent `scripts/validation/`; update `v1.4-milestone-audit.mjs` line 57; version harness to `v1.4.1-milestone-audit.mjs` preserving v1.4 commit-SHA reproducibility anchor; add `scripts/validation/regenerate-supervision-pins.mjs` helper

### Knox Mobile Enrollment (AEKNOX-01..07 — Phase 44)

- [x] **AEKNOX-01**: Samsung KME admin guide (`docs/admin-setup-android/07-knox-mobile-enrollment.md`) — 4th-portal overlay on tri-portal pattern; B2B account onboarding (1-2 business day gate); reseller bulk upload + Knox Deployment App (Bluetooth/NFC) for existing stock; EMM profile with Intune DPC-extras JSON; 5-SKU disambiguation table (KME / KPE / Knox Suite / Knox Manage / Knox Configure); "free baseline; Knox Suite gates advanced" framing; reciprocal ZT mutual-exclusion callout
- [x] **AEKNOX-02**: Android L1 runbook 28 (`docs/l1-runbooks/28-android-knox-enrollment-failed.md`) — KME-specific enrollment failures; D-10 sectioned actor-boundary + D-12 three-part escalation packet; Play Integrity only
- [x] **AEKNOX-03**: Android L2 runbook 22 (`docs/l2-runbooks/22-android-knox-investigation.md`) — Knox portal → Intune handoff audit; Play Integrity 3-tier verdicts; zero SafetyNet tokens
- [x] **AEKNOX-04**: Fill `docs/reference/android-capability-matrix.md:113-119` deferred-knox-mobile-enrollment-row anchor with live Knox row; rename anchor from `#deferred-knox-mobile-enrollment-row` → `#knox-mobile-enrollment-row`
- [ ] **AEKNOX-05**: Extend `docs/admin-setup-android/00-overview.md` Mermaid from 5-branch to 6-branch (add Knox branch); update Setup Sequence numbered list with Knox step
- [ ] **AEKNOX-06**: Add Knox / KME / KPE glossary entries to `docs/_glossary-android.md` (+ AMAPI if missing); expand `02-provisioning-methods.md#knox-mobile-enrollment` anchor to live row
- [ ] **AEKNOX-07**: Retrofit Phase 35 ZT portal doc KME/ZT mutual-exclusion callout (`02-zero-touch-portal.md:16`) + Phase 36 COBO Samsung-admins callout — reciprocal forward-links to Knox guide; closes v1.4 forward promises

### Per-OEM AOSP Expansion (AEAOSPFULL-01..09 — Phase 45)

- [ ] **AEAOSPFULL-01**: RealWear per-OEM admin (`docs/admin-setup-android/09-aosp-realwear.md`) — HMT-1, HMT-1Z1, Navigator 500; Wi-Fi-credentials-embedded-in-QR REQUIRED (no interactive Wi-Fi UI); Intune-direct OR hybrid with RealWear Cloud (Workspace Basic/Pro tier disambiguation)
- [ ] **AEAOSPFULL-02**: Zebra per-OEM admin (`docs/admin-setup-android/10-aosp-zebra.md`) — WS50 wearable scanner; OEMConfig-via-Intune-APK path (NOT Managed Google Play); StageNow desktop tool optional for profile generation
- [ ] **AEAOSPFULL-03**: PICO per-OEM admin (`docs/admin-setup-android/11-aosp-pico.md`) — PICO 4 Enterprise, Neo3 Pro/Eye; Enterprise SKU required (not consumer PICO 4); Pico Business Suite optional coexistence
- [ ] **AEAOSPFULL-04**: HTC VIVE Focus per-OEM admin (`docs/admin-setup-android/12-aosp-htc-vive-focus.md`) — Vive Focus 3, XR Elite, Focus Vision; direct-QR Intune flow (simplest of AR/VR OEMs); 3-model firmware minimum matrix
- [ ] **AEAOSPFULL-05**: Meta Quest per-OEM admin (`docs/admin-setup-android/13-aosp-meta-quest.md`) — Quest 2/3/3s/Pro; **4-portal pattern** (Intune + Meta for Work; MGP/ZT N/A); Meta Horizon Managed Services subscription REQUIRED; regional restrictions per model; **Feb 20, 2026 Meta Horizon wind-down risk flag with plan-time re-verification gate + Intune-direct fallback guidance**
- [ ] **AEAOSPFULL-06**: AOSP OEM matrix reference (`docs/reference/aosp-oem-matrix.md`) — OEM × capability dimensions table (enrollment methods, vendor portals required/optional, license tiers, Intune AOSP mode per-vendor, Wi-Fi embedding variance)
- [ ] **AEAOSPFULL-07**: Android L1 runbook 29 (`docs/l1-runbooks/29-android-aosp-enrollment-failed.md`) — replaces ANDE1 escalation stub in `docs/decision-trees/08-android-triage.md` Mermaid; ANDE1 → ANDR29 resolved node with click-link
- [ ] **AEAOSPFULL-08**: Android L2 runbook 23 (`docs/l2-runbooks/23-android-aosp-investigation.md`) — per-OEM symptom catalog; Play Integrity only; cross-links to per-OEM admin guides 09-13
- [ ] **AEAOSPFULL-09**: Retrofit `docs/admin-setup-android/06-aosp-stub.md` (collapse deferred-content table; preserve PITFALL-7 "not supported under AOSP" framing) + fill `android-capability-matrix.md:121-127` deferred-full-aosp-capability-mapping anchor with link to `aosp-oem-matrix.md` + update `docs/android-lifecycle/02-provisioning-methods.md` (surface 90-day token ceiling for AOSP; per-OEM firmware rows in version matrix)

### COPE Full Admin (AECOPE-01..04 — Phase 46)

- [ ] **AECOPE-01**: COPE full admin guide (`docs/admin-setup-android/08-cope-full-admin.md`) — parallel-structured to COBO guide; "Corporate-owned devices with work profile" enrollment profile; default + 65-year staging tokens; naming templates (`{{SERIAL}}`, `{{SERIALLAST4DIGITS}}`, `{{DEVICETYPE}}`, `{{ENROLLMENTDATETIME}}`, `{{UPNPREFIX}}`, `{{USERNAME}}`, `{{RAND:x}}`); Android 8-15 version breakpoints; `afw#setup` + NFC availability by Android version (removed Android 11+); **Android 15 Private space unmanaged callout (NEW for v1.4.1)**; COPE-vs-COBO decision matrix; research-gated path confirmation (full admin vs deprecation-rationale)
- [ ] **AECOPE-02**: Add COPE row to `docs/reference/android-capability-matrix.md` (6th Android column); preserve Cross-Platform Equivalences Section structure
- [ ] **AECOPE-03**: Retrofit Phase 36 COBO `§COPE Migration Note` (`03-fully-managed-cobo.md:58-66`) — replace "deferred to v1.4.1" sentence with forward link to `08-cope-full-admin.md` (ATOMIC same-commit with AECOPE-01)
- [ ] **AECOPE-04**: COPE glossary back-link in `docs/_glossary-android.md` (WPCO term already exists from Phase 34); add see-also + anchor to new COPE admin doc

### Integration & Re-Audit (AEINTEG-01..04 — Phase 47)

- [ ] **AEINTEG-01**: Atomic unified-rebuilds — capability matrix (merge Knox + AOSP + COPE rows in single wave); `00-overview.md` Mermaid (Knox branch + AOSP leaves); glossary (single-author sequencing to avoid line-15 alphabetical index conflicts); mirrors v1.4 Phase 42 Wave 1/2 atomic rebuild pattern
- [ ] **AEINTEG-02**: Audit harness check extensions — C4 regex expanded to include Knox/KME/per-OEM terms; C6 PITFALL-7 preservation check (informational-first grace per D-29); C7 Knox-attribution check (informational-first); C9 COPE banned-phrase check (informational-first via sidecar JSON so list updates atomically)
- [ ] **AEINTEG-03**: Terminal re-audit via `scripts/validation/v1.4.1-milestone-audit.mjs` — expect C1 SafetyNet PASS + C2 supervision PASS (27 v1.4 pins + new v1.4.1 pins) + C3 AOSP word count PASS (content-migrated) + C4 deferred-file guard PASS + C5 freshness PASS (all files at 60-day baseline); append `re_audit_resolution:` block to `.planning/milestones/v1.4-MILESTONE-AUDIT.md` with commit SHA + timestamp; flip `status: tech_debt → passed`
- [ ] **AEINTEG-04**: PROJECT.md traceability — move AEAUDIT-02..05 / AEKNOX-01..07 / AEAOSPFULL-01..09 / AECOPE-01..04 from Active → Validated; close DEFER-01..06 in Context notes; update Last Updated footer

---

## Future Requirements (deferred to v1.5)

- **AENAVUNIFY-04** (DEFER-07) — Cross-platform nav integration; backport Android into `docs/index.md` banner/H1 + `common-issues.md` + `quick-ref-l1.md` + `quick-ref-l2.md`
- **AECOMPARE-01** (DEFER-08) — 4-platform capability comparison document (Windows + macOS + iOS + Android)

## Out of Scope (v1.4.1 exclusions)

- Knox Configure / E-FOTA / Knox Manage / Knox Workspace — Samsung Suite scope-creep outside Intune-via-Knox admin path
- Vendor-proprietary MDM deep docs (ArborXR / ManageXR / Ivanti / Omnissa Workspace ONE) — document existence as alternatives only
- Android Device Administrator (DA) legacy mode — deprecated since Android 10 for new enrollments (v1.4 exclusion preserved)
- Samsung E-FOTA firmware management — orthogonal to Intune enrollment (v1.4 exclusion preserved)
- RealWear HMT-1Z1 intrinsically-safe hardware certification content — hardware-docs scope
- Consumer PICO 4 / consumer HTC Vive variants — enterprise SKUs only
- Zebra MX schema deep documentation — vendor-owned
- Samsung Knox On-Device Attestation as separate stack element — automatic in Intune since 2025
- ChromeOS management — different management platform (Google Admin)
- Android TV / Android Auto / Wear OS — specialized classes, not Intune enrollment scope (v1.4 exclusion)
- Cross-platform nav unification (DEFER-07) — v1.5
- 4-platform comparison doc (DEFER-08) — v1.5
- Localization / non-English content — consistent with v1.0-v1.4 English-only policy

---

## Traceability

*Phase mapping populated by `/gsd-roadmapper` run 2026-04-24. 5 phases (43-47); 28/28 requirements mapped 1:1; no orphans; no duplicates.*

| REQ-ID | Phase | Status |
|--------|-------|--------|
| AEAUDIT-02 | 43 | Active |
| AEAUDIT-03 | 43 | Active |
| AEAUDIT-04 | 43 | Active |
| AEAUDIT-05 | 43 | Active |
| AEKNOX-01 | 44 | Active |
| AEKNOX-02 | 44 | Active |
| AEKNOX-03 | 44 | Active |
| AEKNOX-04 | 44 | Active |
| AEKNOX-05 | 44 | Active |
| AEKNOX-06 | 44 | Active |
| AEKNOX-07 | 44 | Active |
| AEAOSPFULL-01 | 45 | Active |
| AEAOSPFULL-02 | 45 | Active |
| AEAOSPFULL-03 | 45 | Active |
| AEAOSPFULL-04 | 45 | Active |
| AEAOSPFULL-05 | 45 | Active |
| AEAOSPFULL-06 | 45 | Active |
| AEAOSPFULL-07 | 45 | Active |
| AEAOSPFULL-08 | 45 | Active |
| AEAOSPFULL-09 | 45 | Active |
| AECOPE-01 | 46 | Active |
| AECOPE-02 | 46 | Active |
| AECOPE-03 | 46 | Active |
| AECOPE-04 | 46 | Active |
| AEINTEG-01 | 47 | Active |
| AEINTEG-02 | 47 | Active |
| AEINTEG-03 | 47 | Active |
| AEINTEG-04 | 47 | Active |

**Coverage:** 28/28 requirements mapped (100%). No orphans. No duplicates.

**Phase DAG:**
- Phase 43 (cleanup) → entry phase (no deps)
- Phases 44 (Knox) / 45 (AOSP) / 46 (COPE) → depend on 43; parallelize with each other
- Phase 47 (integration + re-audit) → depends on 44/45/46; terminal
