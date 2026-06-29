# Architecture Research: v1.14 802.1X Documentation Integration

**Domain:** Documentation suite integration — 802.1X network authentication across 5 platforms via Intune
**Researched:** 2026-06-29
**Confidence:** HIGH — all findings based on direct repo inspection

---

## Standard Architecture

### Existing Doc-Suite Tier Structure

```
docs/
├── _glossary*.md            # Per-domain glossaries (Windows / macOS / Android / Linux / Apple Business)
├── index.md                 # Top-level nav hub (platform sections + Cross-Platform References)
├── common-issues.md         # Symptom-based cross-platform router
├── quick-ref-l1.md          # L1 quick-reference card (all platforms)
├── quick-ref-l2.md          # L2 quick-reference card (all platforms)
├── decision-trees/          # 00-09 triage trees (per-platform + Windows-mode-specific)
├── admin-setup-{platform}/  # Per-platform numbered guide sequences (00-overview + N guides)
│   └── 00-overview.md       # Entry point and guide index for that platform
├── l1-runbooks/             # 00-index.md + 01..37 (current highest: #37 macOS local password reset)
├── l2-runbooks/             # 00-index.md + 01..30 (current highest: #30 macOS MDM migration failure)
├── reference/               # Capability matrices (per-platform + 4-platform) + reference docs
├── macos-lifecycle/         # Scenario/journey guides (PSSO provisioning, MDM migration)
└── cross-platform/          # Cross-platform operational content (Apple Business governance)
```

### Content Conventions (confirmed from repo)

- **link-not-copy:** Shared concepts live in one canonical file; per-platform files cross-reference with markdown links, never paste the same explanation twice.
- **navigation-last:** Hub files (`index.md`, `quick-ref-l1.md`, etc.) are edited only after their target content files exist on disk.
- **freshness stamps:** Every file carries YAML front matter (`last_verified`, `review_by`, `applies_to`, `audience`, `platform`). Version-gated content additionally carries per-section `last_verified`/`review_by` inline stamps.
- **Per-platform numbering:** Admin-setup guide files are per-folder sequences (macOS: 00-11; iOS: 00-09; Linux: 00-05). L1 and L2 runbooks are globally numbered across platforms.
- **Audit harness:** `scripts/validation/check-phase-NN.mjs` per-phase validators + `v1.N-milestone-audit.mjs` + allowlist. New phases add check-phase-NN.mjs validators that ship at harness-bump time (last, as an indivisible atom).

---

## File Placement Recommendation: HYBRID

**Verdict: New `docs/admin-setup-8021x/` folder with shared foundation files + per-platform guide files.**

### Recommendation

Create `docs/admin-setup-8021x/` containing:

```
docs/admin-setup-8021x/
├── 00-overview.md               # Entry point: what 802.1X is, how this guide set is organized
├── 01-eap-method-overview.md    # EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS — co-equal, shared across all platforms
├── 02-cert-delivery-foundation.md # SCEP / PKCS imported-cert / trusted-root profiles + RADIUS server-name validation
├── 03-windows.md                # Windows wired + Wi-Fi Intune profiles (all 3 EAP methods)
├── 04-macos.md                  # macOS wired + Wi-Fi Intune profiles
├── 05-ios.md                    # iOS/iPadOS wired + Wi-Fi Intune profiles
├── 06-android.md                # Android wired + Wi-Fi Intune profiles
└── 07-linux.md                  # Linux wired + Wi-Fi Intune profiles
```

### Rationale

**Why not per-platform additions inside existing `admin-setup-{platform}/` folders:**

The existing per-platform folders are enrollment-and-provisioning-lifecycle focused (ADE, MDM enrollment, PSSO, compliance). 802.1X network authentication is orthogonal to device enrollment — it is a post-enrollment network access control feature. Distributing 802.1X across five folders would force an admin who needs to understand cross-platform 802.1X to navigate to five separate places with no shared entry point. It would also require duplicating the EAP method and cert delivery explanations in each platform folder, violating link-not-copy.

Additionally, macOS `admin-setup-macos/` already runs 00-11, iOS runs 00-09, Linux runs 00-05. Appending 802.1X-specific guides (which are by nature 3 EAP methods × wired/Wi-Fi) would make these sequences significantly longer in a topically inconsistent way.

**Why not purely shared (one set of cross-platform files with no per-platform split):**

The Intune profile configuration is platform-specific at the Settings Catalog level — profile types, field names, payload keys, and supplicant behavior differ substantially between Windows (SCEP profile type, SSID profile, wired 802.1X policy), macOS (Wi-Fi/Ethernet MDM payloads with EAP settings dict), iOS (Wi-Fi MDM profile with EAPClientConfiguration), Android (Wi-Fi profile with enterprise settings), and Linux (NetworkManager + 802-1x configuration). Merging these into one file creates unusable, heavily conditionally-caveated content. L1/L2 diagnostic steps also differ per platform.

**Why hybrid is correct:**

802.1X is one concept (like "Compliance Policy" or "Configuration Profiles") that every platform implements through platform-specific Intune surfaces. The existing iOS admin-setup folder already follows this hybrid convention inside the folder: `04-configuration-profiles.md` and `05-app-deployment.md` cover iOS-specific surfaces, while cross-platform concepts (APNs certificate) live in a shared file that other platforms cross-reference. The 802.1X hybrid externalizes the shared layer into files 01-02, and makes the per-platform layer files 03-07 — cleanly exploiting link-not-copy within a single discoverable folder.

The `docs/cross-platform/apple-business/` precedent shows the suite already supports dedicated topical folders for content that crosses platform boundaries without belonging inside any one platform's enrollment folder.

---

## Shared vs Per-Platform Boundary (Link-Not-Copy)

### What Lives in the Shared Foundation Files (01-02)

These topics are platform-invariant. Per-platform guides (03-07) link to these; they never restate them.

**`01-eap-method-overview.md`:**
- What 802.1X is; supplicant model (client, authenticator, RADIUS)
- EAP-TLS: mutual certificate authentication, when to use, certificate requirements
- PEAP-MSCHAPv2: username/password over TLS tunnel, when to use, inner identity
- EAP-TTLS: outer TLS tunnel + inner PAP/CHAP/MSCHAPv2, when to use
- Comparison matrix: cert requirements, user experience, security posture, Intune support across 5 platforms
- Decision guide: which EAP method to choose

**`02-cert-delivery-foundation.md`:**
- Prerequisite: RADIUS server assumed to exist (scope guardrail per PROJECT.md)
- SCEP profile: Intune SCEP connector requirements, challenge URL, profile fields, assignments
- PKCS imported certificate profile: PKCS#12 import flow, when to use over SCEP
- Trusted root certificate profile: RADIUS server CA, why required for server validation
- RADIUS server-name validation: what the "Trusted server certificate names" field does and why misconfiguring it is the #1 connection failure cause
- Certificate delivery ordering: trusted root must deploy before SCEP/PKCS must deploy before Wi-Fi/wired profile

### What Lives in Per-Platform Files (03-07)

These topics are platform-specific. Each per-platform file opens with a link to `01-eap-method-overview.md` and `02-cert-delivery-foundation.md` as prerequisites.

- Intune profile type to create (Wi-Fi / wired / 802.1X profile — differs per platform)
- Settings Catalog path or template path (differs per platform)
- EAP method selection within the Intune UI (field names differ)
- Platform-specific supplicant behavior (macOS: EAP is configured in Wi-Fi MDM payload; Windows: separate wired 802.1X policy; Android: Wi-Fi enterprise block; Linux: NetworkManager 802-1x)
- Platform-specific gotchas and version requirements
- Wired-specific configuration (where supported: Windows, macOS, Linux, Android Ethernet-capable)
- Wi-Fi-specific configuration for all platforms
- Assignment targets and profile ordering for that platform
- Freshness stamps per-section for version-gated behavior

---

## New Components Inventory

### New Files

| Path | Type | Depends On |
|------|------|------------|
| `docs/_glossary-network.md` | Glossary | None (foundation first) |
| `docs/admin-setup-8021x/00-overview.md` | Admin setup | None |
| `docs/admin-setup-8021x/01-eap-method-overview.md` | Shared foundation | `_glossary-network.md` |
| `docs/admin-setup-8021x/02-cert-delivery-foundation.md` | Shared foundation | `01-eap-method-overview.md` |
| `docs/admin-setup-8021x/03-windows.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/04-macos.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/05-ios.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/06-android.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/07-linux.md` | Per-platform guide | Files 01-02 |
| `docs/l1-runbooks/38-8021x-cert-failure.md` | L1 runbook | Per-platform guides (cross-ref) |
| `docs/l1-runbooks/39-8021x-radius-reject.md` | L1 runbook | Per-platform guides (cross-ref) |
| `docs/l1-runbooks/40-8021x-server-trust-failure.md` | L1 runbook | Per-platform guides (cross-ref) |
| `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` | L1 runbook | Per-platform guides (cross-ref) |
| `docs/l2-runbooks/31-8021x-log-collection.md` | L2 runbook (prerequisite) | Per-platform guides |
| `docs/l2-runbooks/32-8021x-cert-investigation.md` | L2 runbook | `31-8021x-log-collection.md` |
| `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` | L2 runbook | `31-8021x-log-collection.md` |
| `docs/decision-trees/10-8021x-triage.md` | Decision tree | L1 runbooks #38-41 exist |

### Glossary: New `docs/_glossary-network.md`

Rationale for a new glossary file (not absorbed into existing platform glossaries): 802.1X terms are protocol-level and platform-neutral. The existing glossaries are organized by platform context (`_glossary.md` = Windows Autopilot; `_glossary-macos.md` = macOS ADE; `_glossary-android.md` = Android Enterprise; `_glossary-linux.md` = Linux Intune). Network authentication vocabulary (EAP-TLS, PEAP, RADIUS, supplicant, SCEP, PKCS#12, trusted root, authenticator, 802.1X port-based access control) does not belong in any one platform glossary. The Apple Business governance precedent (`_glossary-apple-business.md`) demonstrates the suite already supports domain-scoped glossary files for cross-platform topics.

Each existing platform glossary should receive a `see-also` banner pointing to `_glossary-network.md` for 802.1X terms (the same pattern as the reciprocal see-also banners between `_glossary-macos.md` and `_glossary-android.md`).

### L1 Runbook Numbering (verified: current highest is #37)

The four 802.1X failure scenarios map to cross-platform L1 runbooks #38-41. Cross-platform (not per-platform) is correct because: (a) the failure symptoms are protocol-level and identical regardless of platform, (b) L1 Service Desk uses the decision tree to reach the runbook, and (c) the existing Apple Business L1 #34 is cross-platform (iOS+macOS+Shared iPad). Each runbook will have per-platform diagnostic steps inline, gated by a "select your platform" header — the same structure as platform-diverse runbooks in the existing suite.

| Number | File | Scenario |
|--------|------|----------|
| 38 | `38-8021x-cert-failure.md` | Device has no valid certificate or cert expired — network access blocked before auth attempt |
| 39 | `39-8021x-radius-reject.md` | RADIUS server returns Access-Reject — credentials or policy mismatch |
| 40 | `40-8021x-server-trust-failure.md` | Server certificate validation failure — missing trusted root or wrong RADIUS server name in profile |
| 41 | `41-8021x-eap-negotiation-failure.md` | EAP method mismatch or negotiation failure — supplicant and RADIUS cannot agree on method |

### L2 Runbook Numbering (verified: current highest is #30)

Three 802.1X L2 runbooks at #31-33. L2 #31 is the log collection prerequisite (platform-specific per-section, matching the established pattern of `10-macos-log-collection.md`, `14-ios-log-collection.md`, `18-android-log-collection.md`, `24-linux-log-collection.md`). For 802.1X, a single cross-platform log collection runbook is more appropriate than five separate ones, because the Windows + Linux log sources are command-line and the macOS + iOS + Android sources are Intune-portal or device-side — all can be documented in one file with per-platform sections.

| Number | File | Scenario |
|--------|------|----------|
| 31 | `31-8021x-log-collection.md` | Collect 802.1X diagnostic data per platform (prerequisite for #32 and #33) |
| 32 | `32-8021x-cert-investigation.md` | Certificate validity, SCEP delivery confirmation, trusted root chain investigation |
| 33 | `33-8021x-radius-eap-investigation.md` | RADIUS server policy, NPS event log correlation, EAP type negotiation investigation |

### Decision Tree

`docs/decision-trees/10-8021x-triage.md` — next in the sequence (current highest: `09-linux-triage.md`). This is a cross-platform triage tree that routes on symptom (no network access / cert error / RADIUS reject / EAP method failure) to L1 runbooks #38-41.

---

## Integration Points Inventory

### Capability Matrices (files requiring new rows)

| File | What to Add |
|------|-------------|
| `docs/reference/macos-capability-matrix.md` | New "Network Authentication (802.1X)" section: wired Ethernet 802.1X (MDM Ethernet payload), Wi-Fi 802.1X (Wi-Fi MDM payload EAPClientConfiguration), EAP-TLS/PEAP/EAP-TTLS support, SCEP/PKCS delivery support |
| `docs/reference/ios-capability-matrix.md` | Same pattern: Wi-Fi 802.1X (supervised required for silent push), EAP method rows, cert delivery |
| `docs/reference/android-capability-matrix.md` | Wi-Fi enterprise block 802.1X rows, EAP method support, SCEP/PKCS, wired (limited OEM coverage) |
| `docs/reference/linux-capability-matrix.md` | Wi-Fi + wired 802.1X via NetworkManager 802-1x settings, EAP method rows, no MDM-delivered cert support (SCEP not available for Linux) |
| `docs/reference/4-platform-capability-comparison.md` | New "Network Authentication" domain column across Windows/macOS/iOS/Android (Linux is not in this 4-platform file; add Linux as 5th column or add a note directing to linux-capability-matrix) |

Note: Windows does not have a standalone `windows-capability-matrix.md` — Windows is the baseline column in all per-platform comparison matrices. Windows 802.1X rows (wired 802.1X policy, Wi-Fi profile, SCEP, all three EAP methods) appear as the reference column in each per-platform matrix.

### Glossaries (files requiring additions)

| File | What to Add |
|------|-------------|
| `docs/_glossary-network.md` | NEW — primary home for all 802.1X/EAP/RADIUS/SCEP/PKCS/supplicant terms |
| `docs/_glossary.md` | See-also banner pointing to `_glossary-network.md` for 802.1X terms |
| `docs/_glossary-macos.md` | See-also banner for 802.1X terms; optionally inline macOS-specific terms (EAP settings dict, MDM Wi-Fi/Ethernet payload) |
| `docs/_glossary-android.md` | See-also banner for 802.1X terms |
| `docs/_glossary-linux.md` | See-also banner + possibly inline NetworkManager 802-1x term |

### Navigation Hubs (navigation-last — edited AFTER target content exists)

| File | What to Add |
|------|-------------|
| `docs/index.md` | New `## 802.1X Network Authentication` H2 section (parallel to `## Operations`) with L1/L2/Admin Setup sub-tables; add to `## Choose Your Platform` bullet list; add glossary + decision tree to Cross-Platform References table |
| `docs/common-issues.md` | 802.1X symptom rows: no network post-enrollment, cert failure, RADIUS reject, server trust error — routing to L1 #38-41 |
| `docs/quick-ref-l1.md` | New `## 802.1X Quick Reference` section with 4-runbook table (#38-41) + common-first-checks cheat sheet |
| `docs/quick-ref-l2.md` | New `## 802.1X Quick Reference` section with L2 #31-33 + per-platform log-collection commands + RADIUS event ID reference |
| `docs/l1-runbooks/00-index.md` | New `## 802.1X Network Authentication L1 Runbooks` H2 with #38-41 table |
| `docs/l2-runbooks/00-index.md` | New `## 802.1X Network Authentication L2 Runbooks` H2 with #31-33 table + L1 escalation mapping |

---

## Suggested Build Order

The dependency graph determines order. Navigation-last and harness-bump-last are hard constraints.

### Phase Group A: Foundation (no dependencies — start here)

These files have no dependencies on other 802.1X content and can be authored first. Within group, glossary before EAP overview since the overview uses the glossary terms.

1. `docs/_glossary-network.md` — all 802.1X/EAP/RADIUS/SCEP/PKCS/supplicant terms
2. `docs/admin-setup-8021x/00-overview.md` — folder entry point and guide index
3. `docs/admin-setup-8021x/01-eap-method-overview.md` — EAP method foundation (links to glossary)
4. `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — cert delivery foundation (links to EAP overview)

Glossary platform see-also banners can also be appended in this phase (they only reference the new glossary file, not the per-platform guides).

### Phase Group B: Per-Platform Admin Guides (require Group A)

Each per-platform guide requires files 01-02 to exist for cross-referencing. They are independent of each other, but the suite's `use_worktrees:false` constraint means they must be authored sequentially. Suggested authoring order: Windows first (most complete Intune surface, establishes the template), then macOS, then iOS, then Android, then Linux.

5. `docs/admin-setup-8021x/03-windows.md`
6. `docs/admin-setup-8021x/04-macos.md`
7. `docs/admin-setup-8021x/05-ios.md`
8. `docs/admin-setup-8021x/06-android.md`
9. `docs/admin-setup-8021x/07-linux.md`

Capability matrix additions for each platform can be done alongside its per-platform guide (same phase) since the matrix rows are drawn from the guide content — or consolidated into a single matrix-update phase after all guides exist. Consolidated is lower-risk (avoids partial matrix state).

### Phase Group C: L1/L2 Runbooks (require Group B)

L1 runbooks cross-reference the per-platform guides for configuration-step context; L2 runbooks cross-reference both per-platform guides and L1 runbooks. L2 #31 log-collection is a prerequisite for L2 #32 and #33.

10. `docs/l1-runbooks/38-8021x-cert-failure.md`
11. `docs/l1-runbooks/39-8021x-radius-reject.md`
12. `docs/l1-runbooks/40-8021x-server-trust-failure.md`
13. `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md`
14. `docs/l2-runbooks/31-8021x-log-collection.md` (prerequisite)
15. `docs/l2-runbooks/32-8021x-cert-investigation.md`
16. `docs/l2-runbooks/33-8021x-radius-eap-investigation.md`

L1 and L2 log-collection (#31) can be authored in the same phase batch. L2 #32 and #33 both require #31 and can batch together.

### Phase Group D: Decision Tree (require Group C)

The 802.1X triage decision tree routes to L1 runbooks #38-41, so those files must exist first.

17. `docs/decision-trees/10-8021x-triage.md`

### Phase Group E: Capability Matrices (require Group B, can batch with Group C or D)

Capability matrix rows are derived from per-platform guide content. Can be done any time after Group B. Consolidating all 5 matrix updates into one phase reduces hub-navigation fragility. This can parallelize with runbook authoring (Group C) since matrices and runbooks don't depend on each other.

18. Update `docs/reference/macos-capability-matrix.md`
19. Update `docs/reference/ios-capability-matrix.md`
20. Update `docs/reference/android-capability-matrix.md`
21. Update `docs/reference/linux-capability-matrix.md`
22. Update `docs/reference/4-platform-capability-comparison.md`

### Phase Group F: Navigation Hubs (navigation-last — require Groups C, D, E)

Hub files must be edited only after all target content exists. All six hub files can be updated in one phase (they are additive/append-only edits).

23. `docs/l1-runbooks/00-index.md` — append 802.1X L1 Runbooks section
24. `docs/l2-runbooks/00-index.md` — append 802.1X L2 Runbooks section
25. `docs/index.md` — new 802.1X H2 section + Cross-Platform References entries
26. `docs/common-issues.md` — 802.1X symptom rows
27. `docs/quick-ref-l1.md` — 802.1X quick-reference section
28. `docs/quick-ref-l2.md` — 802.1X quick-reference section

### Phase Group G: Harness Bump (last — requires all prior groups)

The audit harness lineage bump is always the final indivisible atom. For v1.14 this is the 12th Path-A generation: `v1.14-milestone-audit.mjs` + `v1.14-audit-allowlist.json` + per-phase `check-phase-101..N.mjs` validators + new CI workflow + `_lib/frozen-at-close.mjs` V113 pin + 3-axis terminal re-audit close.

29. Harness lineage bump + milestone close (one indivisible atomic commit per established precedent)

---

## Parallelization Notes

The suite runs `use_worktrees:false` (sequential-on-main-tree). However, the build order above still reveals logical parallelism that informs phase batching — multiple files can be authored within one phase plan if they share the same dependency tier.

**Within-phase batching opportunities:**

| Group | Files That Can Batch Together |
|-------|-------------------------------|
| A | Glossary + admin-setup-8021x/00-overview can be one phase plan; 01-eap-method-overview + 02-cert-delivery-foundation can be one phase plan |
| B | All 5 per-platform guides are independent of each other — can be 1-2 guides per plan, or batched as 2-3 plans of 2 guides each |
| C | L1 #38-41 can batch as 2 per plan; L2 #31 alone (it's prerequisite); L2 #32+#33 can batch |
| D+E | Decision tree + all 5 matrix updates are independent and can be one phase |
| F | All 6 nav-hub edits are independent append-only edits and can be one phase |

**Anti-batching hard constraint:** Harness-bump (Group G) must be the sole deliverable of its phase. Never batch harness-bump with content files.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Distributing 802.1X Across Existing Per-Platform Folders

**What it looks like:** Adding `docs/admin-setup-macos/12-8021x-wifi.md`, `docs/admin-setup-ios/10-8021x-wifi.md`, etc. with EAP method and cert delivery content duplicated in each.

**Why wrong:** Violates link-not-copy for all shared foundation content. Breaks discoverability for admins wanting a cross-platform view. Inflates each platform folder with content topically alien to enrollment/provisioning.

**Instead:** `docs/admin-setup-8021x/` hybrid with shared 01-02 + per-platform 03-07.

### Anti-Pattern 2: Per-Platform L1 Runbooks (20 runbooks instead of 4)

**What it looks like:** L1 #38-57, one per platform per failure type (Windows cert failure, macOS cert failure, iOS cert failure, etc.)

**Why wrong:** 802.1X failure symptoms at L1 are identical regardless of platform (no network access, auth error in portal). The Service Desk does not have platform-specific diagnostic tools. The existing cross-platform L1 #34 (Apple Business, iOS+macOS+Shared iPad) proves cross-platform L1 runbooks are already established in the suite.

**Instead:** 4 cross-platform L1 runbooks (#38-41) with per-platform inline sections gated by a "select your platform" header.

### Anti-Pattern 3: Nav Hub Wiring Before Content Files Exist

**What it looks like:** Adding 802.1X rows to `docs/index.md` in the foundation phase, before per-platform guides or runbooks are authored.

**Why wrong:** Hub links to non-existent files will break the link-check harness and create a partially-broken nav state during authoring. The suite's navigation-last pattern exists precisely to prevent this.

**Instead:** All hub edits in Group F, after Groups A-E are fully complete.

### Anti-Pattern 4: Scoping RADIUS/NPS Server Setup Into the Guides

**What it looks like:** Adding NPS configuration steps, RADIUS server policy setup, or AD Certificate Services installation to the per-platform guides.

**Why wrong:** Explicitly out of scope per PROJECT.md guardrail ("Intune client-side config only — assumes RADIUS/NPS already exists"). RADIUS server documentation is a different domain owned by network/infrastructure teams.

**Instead:** Each guide opens with a prerequisite callout block listing what must exist on the RADIUS/NPS side before the Intune profile steps apply. `02-cert-delivery-foundation.md` carries this callout.

---

## Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `docs/admin-setup-8021x/00-overview.md` | Entry point and guide-sequence index for 802.1X admin setup | `docs/index.md` (linked from), per-platform guides (linked to) |
| `docs/admin-setup-8021x/01-eap-method-overview.md` | Canonical EAP method concepts — authoritative source for all platforms | `_glossary-network.md` (term anchors), per-platform guides (linked from), decision tree (linked from) |
| `docs/admin-setup-8021x/02-cert-delivery-foundation.md` | Canonical cert delivery concepts — SCEP/PKCS/trusted-root prerequisites | `01-eap-method-overview.md` (prerequisite), per-platform guides (linked from) |
| `docs/admin-setup-8021x/03-07-{platform}.md` | Platform-specific Intune profile steps | Files 01-02 (linked to for shared concepts), L1 runbooks (linked to from runbooks), L2 log collection (linked from) |
| `docs/_glossary-network.md` | Term definitions for 802.1X/EAP/RADIUS/SCEP/PKCS/supplicant | `01-eap-method-overview.md` and `02-cert-delivery-foundation.md` (term anchors), platform glossaries (see-also banners) |
| `docs/l1-runbooks/38-41-*.md` | L1 scripted procedures for 802.1X failure scenarios | Per-platform guides (cross-reference), `docs/decision-trees/10-8021x-triage.md` (routing target) |
| `docs/l2-runbooks/31-33-*.md` | L2 investigation guides | L1 runbooks (L1 escalation mapping), per-platform guides (config context), L2 index |
| `docs/decision-trees/10-8021x-triage.md` | Symptom-to-runbook routing for 802.1X failures | L1 runbooks #38-41 (routing targets), `docs/index.md` (linked from) |
| Capability matrices (5 files) | 802.1X feature parity rows per platform | Per-platform guides (content source), `docs/index.md` Cross-Platform References |
| Nav hubs (6 files) | Discovery and routing | All content files above (navigation-last dependency) |

---

## Sources

All findings from direct repo inspection on 2026-06-29:

- `docs/index.md` — nav hub structure and platform section conventions confirmed
- `docs/l1-runbooks/00-index.md` — L1 #37 confirmed as current highest
- `docs/l2-runbooks/00-index.md` — L2 #30 confirmed as current highest
- `docs/decision-trees/` directory listing — `09-linux-triage.md` confirmed as current highest
- `docs/admin-setup-macos/` listing — numbered guide sequence pattern (00-11) confirmed
- `docs/admin-setup-ios/` listing — numbered guide sequence (00-09) confirmed
- `docs/admin-setup-linux/` listing — numbered guide sequence (00-05) confirmed
- `docs/reference/` listing — per-platform matrices + `4-platform-capability-comparison.md` confirmed
- `docs/reference/linux-capability-matrix.md` — capability matrix format and front matter conventions confirmed
- `scripts/validation/check-phase-100.mjs` — validator pattern, CHAIN_PHASES invariant, harness-last conventions confirmed
- `.planning/PROJECT.md` — v1.14 scope, locked constraints (5 platforms, wired+Wi-Fi, 3 EAP methods co-equal, Intune client-side only, full doc-tier), phase numbering starts at 101

---

*Architecture research for: v1.14 802.1X Network Authentication Documentation Integration*
*Researched: 2026-06-29*
