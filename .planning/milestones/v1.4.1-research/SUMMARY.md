# Research Summary: v1.4.1 Android Enterprise Completion & v1.4 Cleanup

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite — v1.4.1 milestone
**Scope:** DEFER-01..06 closure; DEFER-07/08 deferred to v1.5
**Researched:** 2026-04-24
**Synthesizer confidence:** HIGH (all 4 research domains cross-validated; no contradictions surfaced)

---

## 1. Executive Summary

v1.4.1 is an **additive + pin-synchronizing** milestone that closes 6 deferred items from v1.4 (DEFER-01..06) without refactoring any v1.4 architecture. Three new content blocks — Samsung **Knox Mobile Enrollment (KME)**, **per-OEM AOSP expansion** (5 OEMs: RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest), and **COPE full admin guide** — land into 6 pre-placed architectural seams (HTML anchors + `<a id="deferred-*">` stubs) already present on disk in v1.4. Three in-place hardening edits close DEFER-01 (audit allow-list expansion from ~10 to ~37 pins for legitimate iOS-attributed supervision bridge-prose), DEFER-02 (`last_verified` 60-day freshness normalization across template + 4 L2 runbooks), and DEFER-03 (Phase 39 AOSP stub re-validation, resolvable via content-migration into per-OEM files).

Load-bearing decisions: **(a)** COPE ships as a **FULL admin guide** (not a deprecation-rationale doc) — verified 2026-04-24 against MS Learn `setup-corporate-work-profile` (updated 2026-04-16), which documents COPE as first-class GA with two live token types and no deprecation marker; Google's WPCO is terminology evolution, not product deprecation. **(b)** KME is free at baseline (Knox Suite gates Advanced settings only); the "KME requires paid license" framing is inaccurate. **(c)** Meta Quest is the 5-OEM outlier, requiring **Meta Horizon Managed Services subscription** + the 4-portal `work.meta.com` layer — and carries a **community-sourced Feb 20, 2026 wind-down risk** requiring plan-time re-verification. **(d)** The audit harness has a **sidecar-path blocker** (hardcoded path to archived `.planning/phases/42-*/v1.4-audit-allowlist.json`) that MUST be fixed in Phase 43 or no audit can run end-to-end. Milestone-close criterion: flip v1.4 audit `tech_debt → passed` via a terminal re-audit phase.

---

## 2. Stack Additions

| Addition | Portal / Surface | Key Fact | License Gate | Confidence |
|---|---|---|---|---|
| **Knox Mobile Enrollment (KME)** | `central.samsungknox.com` — 4th portal overlay on tri-portal | Same DPC-extras JSON pattern as ZT; Intune token embedded in Knox Custom JSON | **Free baseline**; Knox Suite Enterprise gates anti-theft + app-install-during-enrollment; Intune Plan 1+ sufficient | HIGH |
| **Per-OEM AOSP (5 OEMs)** | Intune AOSP endpoints + optional vendor portals | 8 OEM / 18 model matrix from MS Learn 2026-04-16; Meta Quest outlier requires vendor portal | **AR/VR specialty devices may require Intune Suite / Plan 2** per MS Tech Community guidance; Plan 1 baseline AOSP still covers Zebra WS50 scanner | HIGH (matrix), MEDIUM (vendor tier names) |
| **COPE full admin** | Existing Intune admin center tile — `Devices → Enrollment → Android → Android Enterprise → Enrollment Profiles → Corporate-owned devices with work profile` | **Path A confirmed:** full admin guide (not deprecation-rationale). MS Learn actively maintained; WPCO = implementation evolution, not deprecation | Same as COBO; Intune Plan 1+ | HIGH |

### Per-OEM stack matrix (5 spotlight OEMs)

| OEM | Vendor portal | Portal required? | Vendor license required? | Special case |
|---|---|---|---|---|
| RealWear | RealWear Cloud | Optional | Optional (Workspace Pro advanced) | Wi-Fi credentials MUST be embedded in QR (no UI during enrollment) |
| Zebra (WS50) | StageNow (desktop) + OEMConfig | Optional | Free | OEMConfig via Intune APK push — NOT Managed Google Play |
| Pico | `business.picoxr.com` | Optional | Free baseline | Enterprise SKU required (not consumer PICO 4) |
| HTC VIVE Focus | Vive Business DMS | **NO** | **NO** | Simplest — direct QR via Intune |
| **Meta Quest** | **`work.meta.com`** | **REQUIRED** | **REQUIRED (Meta Horizon Managed Services, paid per-device)** | **4-portal pattern; wind-down Feb 20, 2026 (MEDIUM) — re-verify at plan time** |

### v1.4 exclusions preserved

Android Device Administrator (DA) legacy, Samsung E-FOTA, Knox Manage (competing MDM), ChromeOS, ArborXR/ManageXR/Ivanti/Omnissa, Android TV/Wear OS/Android Auto.

---

## 3. Features per Sub-Surface

### Knox Mobile Enrollment (DEFER-04)

| Category | Items |
|---|---|
| **Table stakes** | Reseller bulk upload; Knox Deployment App (Bluetooth/NFC) for existing stock; EMM-dropdown auto-populating Intune APK; Intune enrollment token embedded in Knox Custom JSON; first-boot auto-enrollment; profile auto-assign per trusted reseller; company-name + system-apps + optional QR; token revoke/export/replace lifecycle |
| **Differentiators** | No reseller required (KDA path) — beats Google ZT; Knox Suite Enterprise gated app-install + device-lock during enrollment; supports Dedicated + COBO + **COPE**; QR-enrollment for non-reseller devices on Android 10+; Samsung B2B 1-2 business day approval front-loading |
| **Anti-features** | Knox Configure / E-FOTA / Manage content (suite scope-creep); re-documenting tri-portal setup (reference Phase 35 only); reseller-side mechanics; Knox Workspace container content; cross-platform analog claims (KME = Samsung-only) |

### Per-OEM AOSP (DEFER-05)

| Category | Items |
|---|---|
| **Shared envelope table stakes** | 90-day token ceiling (contrast COBO no-expiry); QR-only; WPA/WPA2 PSK or WPA3 staging Wi-Fi; Entra Shared Device Mode at enrollment; Intune app 24.7.0+; wipe/delete/remote-lock/reset-passcode/restart one-device-at-a-time; alphanumeric/weak-biometric password types NOT enforceable |
| **Differentiators** | RealWear: canonical MS Learn example; Zebra WS50: OEMConfig via Zebra MX; Pico: Enterprise SKU + Business Suite coexistence; HTC: 3-model firmware matrix; Meta Quest: Meta Horizon 4-portal + regional availability |
| **Anti-features** | HMT-1Z1 intrinsically-safe cert; Zebra MX schema details (vendor-owned); consumer PICO 4 / consumer HTC Vive; Meta Horizon managed services recommendations (wind-down); Device Administrator legacy mode on XR devices |

### COPE full admin (DEFER-06 — Path A confirmed)

| Category | Items |
|---|---|
| **Table stakes** | "Corporate-owned devices with work profile" enrollment profile; default + staging token types; no-expiry default + 65-year staging; naming templates; Android 8+ with `afw#setup`/NFC removed on Android 11+; Intune app replaces Company Portal as DPC (post-AMAPI April 2025); **Android 15 Private space unmanaged** by Intune; Microsoft Authenticator auto-install |
| **Differentiators** | COPE-vs-COBO decision matrix (single-user corporate w/ personal-use allowance); profile-boundary (Android 11+ WPCO privacy-by-default); migration paths (factory reset + re-enroll, no in-place); COPE↔WPCO terminology reconciliation |
| **Anti-features** | "COPE is deprecated" framing (banned — factually wrong); re-documenting Google architectural evolution (Phase 34 glossary); per-work-profile config-profile authoring (cross-link); work-profile app isolation (BYOD guide); "COPE = COBO + work profile" equivalence (misleading Android 11+) |

---

## 4. Architecture / Integration Shape

### Proposed 5-phase DAG (begins at **Phase 43**)

```
                    ┌──────────────────────────────────────┐
                    │ Phase 43: v1.4 Cleanup & Harness Fix │
                    │ (DEFER-01/02/03 + sidecar path)      │
                    └──────────┬───────────────────────────┘
                               │
           ┌───────────────────┼────────────────────────┐
           │                   │                        │
           ▼                   ▼                        ▼
┌────────────────────┐ ┌─────────────────────┐ ┌──────────────────────┐
│ Phase 44: Knox ME  │ │ Phase 45: AOSP      │ │ Phase 46: COPE       │
│ (DEFER-04)         │ │ Per-OEM (DEFER-05)  │ │ Full Admin (DEFER-06)│
└──────────┬─────────┘ └──────────┬──────────┘ └──────────┬───────────┘
           │                      │                        │
           └──────────────────────┼────────────────────────┘
                                  ▼
                    ┌────────────────────────────────────┐
                    │ Phase 47: Integration & Re-Audit   │
                    │ (flip tech_debt → passed)          │
                    └────────────────────────────────────┘
```

### Parallelization & blockers

| Item | Detail |
|---|---|
| **Phase 43 MUST land first** | Sidecar path blocker (harness line 57 points at archived dir); allow-list baseline; freshness normalization; content-migration prep for AOSP stub |
| **Phases 44/45/46 parallelize** | Disjoint file sets; shared files (capability matrix, Mermaid, glossary index) handled append-only per v1.4 Phase 42 D-03 pattern |
| **Phase 47 MUST land last** | Harness sees final state; terminal re-audit records `re_audit_resolution:` + flips `tech_debt → passed`; integration phase owns glossary merges (single-author to avoid line-15 conflicts) |

### 6 pre-placed architectural seams (forward-link anchors on disk)

1. `02-zero-touch-portal.md:16` — `<a id="kme-zt-mutual-exclusion">` → Phase 44 closes
2. `android-capability-matrix.md:113-127` — 3 `<a id="deferred-*">` anchors → Phases 44/45/46 fill
3. `06-aosp-stub.md:99-112` — `<a id="deferred-content">` 7-row table → Phase 45 collapses
4. `03-fully-managed-cobo.md:58-66` — COPE Migration Note → Phase 46 retrofits (atomic with new doc)
5. `08-android-triage.md:37,76` — ANDE1 AOSP escalation stub → Phase 45 replaces with ANDR29
6. `l1-runbooks/00-index.md:77` — "AOSP L1 planned for v1.4.1" → Phase 45 removes + appends rows 28-29

### File-tree diff summary

- **NEW files:** `07-knox-mobile-enrollment.md`, `08-cope-full-admin.md`, `09-aosp-realwear.md`, `10-aosp-zebra.md`, `11-aosp-pico.md`, `12-aosp-htc-vive-focus.md`, `13-aosp-meta-quest.md`, `reference/aosp-oem-matrix.md`, L1 runbooks 28-29, L2 runbooks 22-23, `scripts/validation/v1.4-audit-allowlist.json` (migrated), `regenerate-supervision-pins.mjs`
- **MODIFIED:** `00-overview.md` Mermaid (5→6 branch), `android-capability-matrix.md` (fill 3 deferred anchors), `_glossary-android.md` (+ Knox/KME/AMAPI/WPCO), `admin-template-android.md` frontmatter, `06-aosp-stub.md` (collapse deferred-content table, preserve PITFALL-7), `08-android-triage.md` (replace ANDE1, add Knox sub-branch), L1/L2 index banners, 4 L2 runbooks (`review_by` re-date), `v1.4-milestone-audit.mjs` line 57 sidecar path

### Audit harness extension strategy (sidecar-only where possible; informational-first for new checks per D-29)

- **C1 SafetyNet / C2 Supervision:** no regex changes; expand allow-list sidecar (~10 → ~37 pins)
- **C3 AOSP word count:** remains informational; DEFER-03 content-migration flips it to passing naturally
- **C4 Deferred-file Android-link guard:** extend regex to include Knox/KME/per-OEM terms
- **C5 Freshness 60-day:** exclude template; re-date 4 L2 runbooks from `2026-07-22 → 2026-06-22`
- **C6-C10 proposed new checks:** informational-first grace period (D-29 pattern)
- **Harness file-versioning:** copy to `v1.4.1-milestone-audit.mjs` preserving v1.4 `commit 3c3a140` reproducibility anchor

---

## 5. Pitfalls + Prevention (top per phase)

| Phase | Top pitfall | Prevention |
|---|---|---|
| **43 (cleanup)** | Allow-list sidecar silent-degradation — harness line 59-62 returns empty arrays on parse fail; if archive dir is cleaned before path update, audit invisibly loses all exemptions | Atomic commit: allow-list move + harness path update in same diff; CI test that allow-list parses AND has >0 entries |
| **44 (Knox)** | **"KPE license per device" misconception** + bare-Knox umbrella ambiguity (KME / Knox Manage / Knox Suite / Knox Configure / KPE) | 5-SKU disambiguation table (H2 not footnote); explicit "No per-device KPE license — Intune supplies KPE Premium transparently" anti-pattern callout; proposed C7 bare-Knox regex (informational) |
| **44 (Knox)** | DPC extras JSON schema drift — admins copy-paste Phase 35 ZT JSON into Knox profile | Bidirectional "DO NOT copy JSON from Zero-Touch guide" callout in BOTH Knox doc AND Phase 35 retrofit |
| **45 (AOSP)** | **PITFALL-7 preservation** — per-OEM "supported" assertions erode v1.4 "not supported under AOSP" framing | Explicit carry-forward rule in phase CONTEXT; proposed C6 regex-detect (informational grace) |
| **45 (AOSP)** | **Meta Horizon wind-down volatility** — Feb 20, 2026 community-sourced report | Per-vendor §Licensing gate with "re-verify at plan time" research flag; "use Intune AOSP profile; do NOT rely on Meta Horizon for net-new" fallback copy |
| **45 (AOSP)** | Wi-Fi credential embedding non-uniformity — Phase 39 stub treated as blanket constraint | Per-OEM matrix enumerates each constraint with vendor honor status (RealWear REQUIRED; others OPTIONAL) |
| **46 (COPE)** | **"Deprecated" creep** — banned-phrase regex risk parallel to v1.4 SafetyNet ban | Mandatory research gate at Phase 46 plan-time checks Google AE Help + Android Developers + Bayton FAQ; if deprecation declared → re-scope; extend C9 banned-phrase check via sidecar JSON |
| **46 (COPE)** | Atomic back-reference management — COBO `§COPE Migration Note` says "deferred to v1.4.1" (line 64); must retrofit in same commit as new doc | Same-commit rule (D-22 append-only pattern); retrofit replaces deferral sentence with forward link |
| **46 (COPE)** | Android 15 **Private space unmanaged** — admins expect COPE to contain personal-space mechanisms | Mandatory Android-version breakpoint block with Private space limitation callout |
| **47 (integration + re-audit)** | **Audit re-run silent-failure paths** — terminal audit may newly fail on C5 (new docs without 60-day frontmatter) or C6 (PITFALL-7 regex on new Meta/Pico prose) and NOT flip status | Every new v1.4.1 doc uses Phase 34 template; terminal audit is LAST plan; informational-first for new C6-C10; pre-commit manual audit per phase |
| **47 (integration + re-audit)** | **Parallel merge conflicts** on capability matrix + Mermaid + glossary line 15 | Append-only H2-block additions; integration phase owns glossary as single-plan single-author; mirror v1.4 Phase 42 Wave 1/2 atomic rebuild pattern |

---

## 6. Requirements Shape

REQ-IDs continue from v1.4 convention (AE-prefix + domain). Recommended categories for REQUIREMENTS.md:

| Category | Scope | Phase | Count est. |
|---|---|---|---|
| **AEAUDIT-02+** | Cleanup: allow-list sidecar expansion (~10 → ~37 pins); `last_verified` 60-day freshness normalization; Phase 39 AOSP stub re-validation (content-migration); sidecar path fix; harness file-versioning | Phase 43 | 4-6 reqs |
| **AEKNOX-01+** | Knox Mobile Enrollment: admin guide; L1 runbook 28; L2 runbook 22; capability matrix row; Mermaid 5→6 branch; glossary KME entry; provisioning-method matrix KME row; ZT portal reciprocal retrofit; COBO Samsung-admins callout closure | Phase 44 | 6-8 reqs |
| **AEAOSPFULL-01+** | Per-OEM AOSP: 5 OEM files (09-13); `aosp-oem-matrix.md`; L1 runbook 29 (replaces ANDE1); L2 runbook 23; Phase 39 stub retrofit (preserve PITFALL-7, collapse deferred-content table); capability matrix deferred-anchor fill; provisioning-methods 90-day token ceiling; per-OEM firmware rows | Phase 45 | 7-10 reqs |
| **AECOPE-01+** | COPE full admin: new `08-cope-full-admin.md`; capability matrix COPE row; COBO Migration Note retrofit (atomic same-commit); glossary back-link; Android 15 Private space limitation; Intune admin center UI-label verification at plan time | Phase 46 | 4-6 reqs |
| **AEINTEG-01+** | Integration + re-audit: capability matrix unified-rebuild; Mermaid unified-rebuild; glossary single-author merge; C4/C6-C10 harness extensions (informational-first); terminal re-audit plan; `tech_debt → passed` flip; PROJECT.md Active → Validated; MILESTONE-AUDIT `re_audit_resolution:` block; close DEFER-01..06 | Phase 47 | 5-7 reqs |

**Projected total:** 26-37 requirements across 5 phases.

---

## 7. Watch-Out-For (Risk Matrix)

| # | Risk | Severity | Likelihood | Mitigation | Plan-time re-verification? |
|---|---|---|---|---|---|
| R1 | **Meta Horizon managed services wind-down (Feb 20, 2026)** | HIGH | MEDIUM | Plan-time re-verification at Phase 45; frame Meta Quest as "supported but under vendor transition"; recommend Intune-direct path; 60-day review cycle catches staling | **YES — Phase 45 research gate** |
| R2 | **COPE drift** — Google announces deprecation mid-milestone | HIGH | LOW (no signal as of 2026-04-24) | Phase 46 research gate runs BEFORE authoring; escape-hatch "re-scope to deprecation-rationale at 40% scope"; parameterize C9 banned-phrase check via sidecar JSON | **YES — Phase 46 research gate** |
| R3 | **Audit harness silent-failure** — parse-error → empty allow-list; C5/C6 failing on v1.4.1 docs; re-audit does not flip status | HIGH | MEDIUM | Phase 43 sidecar-path atomic commit + CI parse-check; informational-first new regex; terminal re-audit is LAST plan; pre-commit manual audit per phase | No — engineering discipline |
| R4 | **Parallel merge conflicts** — capability matrix / Mermaid / glossary line 15 between Phases 44/45/46 | MEDIUM | HIGH | Append-only H2-block additions; integration phase owns glossary single-author; Phase 42 Wave 1/2 atomic rebuild precedent | No — mitigated by architecture |
| R5 | **PITFALL-7 erosion** — v1.4 Phase 39 "not supported under AOSP" framing dissolves under per-OEM "supported" assertions | MEDIUM | MEDIUM | Explicit carry-forward rule in Phase 45 CONTEXT; proposed C6 regex-detect (informational grace); per-OEM doc structure preserves stub's 9-H2 whitelist | No — regex enforcement |
| R6 | **Knox SKU ambiguity** — KME/KPE/Knox Manage/Knox Suite/Knox Configure confusion → "KME requires paid license" inaccuracy OR admins paying for Knox Manage | MEDIUM | MEDIUM-HIGH | 5-SKU disambiguation H2 (not footnote); "Intune supplies KPE Premium transparently" callout; proposed C7 bare-Knox regex (informational) | No — content discipline |

---

## 8. Confidence Dashboard

| Domain | Confidence | Notes |
|---|---|---|
| Stack — Knox ME portal + license | HIGH | Samsung Knox docs + MS Learn + petervanderwoude cross-validated |
| Stack — Per-OEM Intune AOSP matrix | HIGH | MS Learn 2026-04-16 snapshot (8 OEMs / 18 models); Phase 39 drift +2 models, no removals |
| Stack — Meta Horizon wind-down Feb 20 2026 | MEDIUM | Community-sourced; **re-verify at Phase 45 plan time** |
| Stack — RealWear Workspace tier names | MEDIUM | Community + support pages; not officially enumerated |
| Stack — Pico Business Suite + Intune coexistence | MEDIUM | PICO Newsroom public + ArborXR community corroboration |
| Stack — COPE active status (Path A) | HIGH | MS Learn `setup-corporate-work-profile` updated 2026-04-16; UI tile present; two token types GA |
| Features — Table stakes per surface | HIGH | MS Learn authoritative across all 3 |
| Features — Differentiators | HIGH | Cross-validated with Bayton + Samsung + OEM docs |
| Features — COPE decision (Path A) | HIGH | Verdict: full admin guide; gated research at Phase 46 is belt-and-braces |
| Architecture — v1.4 state + retrofit targets | HIGH | All 6 forward-link anchors verified on disk |
| Architecture — Phase DAG parallelization | MEDIUM | Disjoint file sets verified; append-only contract proven in v1.4 Phase 42 D-03 |
| Architecture — Audit harness sidecar-only extension | HIGH | 5-check harness reviewed; sidecar-path blocker identified at line 57 |
| Pitfalls — Knox / AOSP / COPE / audit | HIGH | 40 pitfalls catalogued across 6 categories |
| Pitfalls — Meta Horizon wind-down as risk | MEDIUM | Same caveat as stack MEDIUM |

**Overall synthesizer confidence:** HIGH — four research files cross-validate without contradiction. Two MEDIUM-confidence items (Meta Horizon wind-down; RealWear/Pico tier names) have explicit plan-time re-verification flags.

---

## 9. Research Flags for Plan Time (Consolidated)

| Phase | Research flag(s) |
|---|---|
| **43 (cleanup)** | Sidecar location decision (`scripts/validation/` vs `.planning/validation/`); harness file-versioning decision; 60-day rule still Phase 34 D-14 policy; Phase 41 VERIFICATION.md validator placement |
| **44 (Knox)** | Current Samsung Knox portal UI/URL (portal has redesign history); current KME license-tier gate; Knox L1 routing (new branch OR AND5 sub-gate); reciprocal mutual-exclusion wording vs Phase 35; DPC extras JSON schema current state |
| **45 (AOSP)** | OEM GA status for 5 spotlight OEMs; **Meta Horizon wind-down date re-verification**; per-OEM Wi-Fi embedding variance; Pico business license terms; Intune Suite / Plan 2 licensing gate for AR/VR; Zebra WS50 OEMConfig APK push delivery |
| **46 (COPE)** | **Google WPCO deprecation signal check** (AE Help + Android Developers + Bayton FAQ) — if any declares deprecation, re-scope to rationale doc; Intune admin center UI-label verification; Android 15 Private space Intune support status; Android 11+ `afw#setup`/NFC removal still accurate |
| **47 (integration + re-audit)** | Re-audit acceptance criteria; classification of new C2 findings; capability matrix unified-rebuild wave structure; glossary single-author merge sequencing; MILESTONE-AUDIT `re_audit_resolution:` format |

---

## 10. Sources (aggregated)

### Microsoft Learn — HIGH confidence
- [Samsung Knox Mobile Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-samsung-knox-mobile-enroll) (2026-04-14)
- [Corporate-owned devices with work profile](https://learn.microsoft.com/en-us/mem/intune/enrollment/android-corporate-owned-work-profile-enroll) (2026-04-16)
- [AOSP Supported Devices](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/android-os-project-supported-devices) (2026-04-16)
- [AOSP userless enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-userless-enroll)
- [AOSP user-associated enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-user-associated-enroll)
- [Zebra MX on Intune](https://learn.microsoft.com/en-us/intune/intune-service/configuration/android-zebra-mx-overview)
- [Specialty devices with Intune](https://learn.microsoft.com/en-us/mem/intune/fundamentals/specialty-devices-with-intune)
- [Microsoft Tech Community — Purpose-built devices](https://techcommunity.microsoft.com/t5/microsoft-intune-blog/protect-your-organization-s-purpose-built-devices-with-microsoft/ba-p/3755654)

### Samsung Knox — HIGH confidence
- [Knox Central Portal](https://central.samsungknox.com/)
- [KME get-started](https://docs.samsungknox.com/admin/knox-mobile-enrollment/get-started/get-started-with-knox-mobile-enrollment/)
- [KPE Licensing Update](https://www.samsungknox.com/en/blog/samsung-knox-platform-for-enterprise-kpe-licensing-update)
- [Samsung Knox × Intune partner page](https://www.samsungknox.com/en/partner-solutions/microsoft-intune)

### OEM vendor docs — HIGH confidence
- [RealWear Supported EMM Providers](https://support.realwear.com/knowledge/supported-enterprise-mobility-management-providers)
- [RealWear Intune AOSP FAQ](https://support.realwear.com/knowledge/faq-intune-aosp)
- [HTC VIVE Focus 3 Intune enrollment](https://www.vive.com/us/support/focus3/category_howto/enrolling-the-headset-using-the-device-enrollment-token.html)
- [PICO Newsroom — Intune](https://www.picoxr.com/global/about/newsroom/microsoft-intune)
- [Meta for Work third-party MDM](https://work.meta.com/help/294719289919907)
- [Meta Horizon Managed Solutions](https://forwork.meta.com/meta-horizon-managed-solutions/)
- [Zebra Intune enrollment](https://supportcommunity.zebra.com/s/article/000021176)

### Google Android Enterprise — HIGH confidence
- [AE Help — General FAQs](https://support.google.com/work/android/answer/14772109)
- [Google Developers — Provision device (WPCO + COPE)](https://developers.google.com/android/management/provision-device)
- [Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005)

### Community — MEDIUM confidence
- [Jason Bayton — AE EMM COPE support](https://bayton.org/android/android-enterprise-emm-cope-support/)
- [Jason Bayton — COPE in Android 11](https://bayton.org/android/android-enterprise-faq/cope-in-android-11/)
- [Peter van der Woude — KME with Intune](https://petervanderwoude.nl/post/using-samsung-knox-mobile-enrollment-with-microsoft-intune/)
- [Scalefusion — COPE vs WPCO](https://scalefusion.com/android-corporate-owned-personally-enabled-cope)
- [Hexnode — KPE Premium license](https://www.hexnode.com/mobile-device-management/help/what-is-samsung-knox-platform-for-enterprise-kpe-premium-license/)

### Project-internal
- `.planning/PROJECT.md`, `.planning/STATE.md`, `.planning/milestones/v1.4-MILESTONE-AUDIT.md`
- `scripts/validation/v1.4-milestone-audit.mjs`
- `docs/_glossary-android.md`, `docs/admin-setup-android/*`, `docs/reference/android-capability-matrix.md`, `docs/decision-trees/08-android-triage.md`

---

*End SUMMARY.md — ready for gsd-roadmapper consumption. Phase numbering begins at 43.*
