# Phase 109: 802.1X Integration — Capability Matrices + Navigation Hubs - Research

**Researched:** 2026-07-01
**Domain:** Markdown documentation navigation wiring — capability matrix row insertion + six-hub nav entries
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 — Glossary see-also wiring (SC3) = verify-only; SC3 is already satisfied (HIGH)**
All four existing SC3-named platform glossaries already carry the `[Network Authentication Glossary](_glossary-network.md)` see-also banner — `docs/_glossary.md:13`, `docs/_glossary-macos.md:12`, `docs/_glossary-android.md:14`, `docs/_glossary-linux.md:12`. SC3 is already TRUE. `_glossary-ios.md` does not exist; satisfied by `_glossary-macos.md`. `_glossary-apple-business.md` is NOT touched.

**D-02 — Network-Auth row shape & verdict vocabulary = single row, reuse the corpus 5-state verdict lock (HIGH)**
One consolidated `Network Authentication (802.1X)` row per matrix (not sub-rows). 5-state lock: cells use exactly `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. Each cell = verdict word + one hyperlink to the source per-platform matrix/guide (link-not-copy per PITFALL-7). ROADMAP SC1 "YES/NO/STUB" is conceptual shorthand only.

**D-03 — Nav-hub entry style = fold into each hub's existing groupings; no dedicated 802.1X H2 (HIGH)**
Route each 802.1X artifact into a pre-existing grouping by its type/platform. Verified hub shapes: `index.md` (`## Operations` :243, `## Cross-Platform References` :299); `quick-ref-l1.md` (`## Decision Trees` :35, `## Runbooks` :42); `quick-ref-l2.md` (`## Investigation Runbooks` :65). Routing map: decision tree #10 → `## Decision Trees`; L2 #31-33 → `## Investigation Runbooks`; cross-platform foundation guides → `## Cross-Platform References`; per-platform 802.1X admin guides + L1 #38-41 → per-platform sections in each hub. NO dedicated "802.1X / Network Authentication" H2 in any hub.

**D-04 — Matrix target file set = the 5 existing files, no new Windows matrix (HIGH)**
Add the Network-Auth row to exactly 5 existing files: `docs/reference/macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md`, `linux-capability-matrix.md`, and `4-platform-capability-comparison.md`. NO standalone Windows matrix.

### Claude's Discretion (within locked decisions)

- Exact row-insertion anchor within each of the 5 matrix files (which section, which row it follows)
- Exact verdict-word choice per platform cell (derived from live guide content — this research provides verified values)
- Row-label wording
- Nav-entry link-text wording
- All within D-02/D-03/D-04 and corpus conventions

### Deferred Ideas (OUT OF SCOPE)

- Standalone `docs/reference/windows-capability-matrix.md` — deferred to v1.6+ by committed corpus decision
- Network banner in `docs/_glossary-apple-business.md` — ABM-governance glossary; not SC3-named
- ROADMAP SC3 stale-filename cleanup (`_glossary-ios.md`) — future hygiene pass
- v1.13 corpus accuracy nits + MDM migration walkthroughs → Phase 110
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-11 | A reader can discover all 802.1X content through integrated navigation — Network-Authentication rows in the 5 platform capability matrices + the 4-platform comparison, glossary see-also wiring, and nav-hub entries (index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md), all committed navigation-last after content lands. | SC3 already satisfied (D-01). Matrix verdicts derived from live guides (Deliverable 1). Insertion anchors identified (Deliverable 2). Artifact inventory complete (Deliverable 3). Per-hub insertion map ready (Deliverable 4). All targets confirmed committed (Deliverable 5). |
</phase_requirements>

---

## Summary

Phase 109 is a pure navigation-wiring phase. All 802.1X content (15 files: 8 admin-setup guides, 4 L1 runbooks, 3 L2 runbooks, 1 decision tree, 1 glossary) landed and was committed in Phases 101–108. This phase adds one row to each of 5 capability matrices and wires entries into 6 navigation hubs. No new content files are authored; no files are deleted.

The research confirms: (1) all 15 target files exist on disk and are git-tracked, satisfying the navigation-last invariant (SC4) from the moment Phase 109 begins; (2) per-platform 802.1X verdicts are derivable from guide content at verified lines; (3) exact insertion anchors are identified for all 5 matrices; (4) the 6-hub entry map covers all artifact types without requiring new H2 sections in any hub; (5) SC3 (glossary see-also) is already true and requires no edits.

**Primary recommendation:** Execute in three waves — (1) add rows to the 4 per-platform matrices in any order; (2) add row to `4-platform-capability-comparison.md` (links to per-platform matrices, which now contain the row); (3) add hub entries to all 6 hubs in any order. SC4 is satisfied throughout since all content targets were committed before Phase 109 begins.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Capability matrix row insertion | Markdown docs (static reference layer) | — | Pure text-file edit; no build step |
| Nav-hub wiring | Markdown docs (navigation layer) | — | Pure text-file edit; navigation-last after content layer |
| Verdict derivation | Guide content layer (admin-setup-8021x) | — | Verdicts are read FROM guides, not re-authored |
| Glossary SC3 | Already satisfied | — | D-01: verify-only; no edits needed |

---

## Deliverable 1: Per-Platform 802.1X Capability Verdicts

Verdicts are derived from live guide content. Source citations are to the files read at research time (2026-07-01).

### Windows — Verdict: `Supported`

**Evidence from `docs/admin-setup-8021x/03-windows.md`:**
- H1 title: "Windows 802.1X Admin Setup: Wi-Fi and Wired" — both profile types documented in full
- Wi-Fi: `Devices > Configuration > New policy > Windows 10 and later > Templates > Wi-Fi` with Enterprise EAP type. All three EAP methods (EAP-TLS, PEAP-MSCHAPv2, EAP-TTLS) at co-equal depth. Client auth: SCEP / PKCS / Derived credential.
- Wired: `Devices > Configuration > New policy > Windows 10 and later > Templates > Wired network` using WiredNetwork CSP. All three EAP methods. Client auth: SCEP / PKCS / PFX Import (PKCS Imported) / Derived credential (additional option vs Wi-Fi). Authentication mode (User / Machine / User-or-machine) unique to Windows.
- Known caveats (documented in guide, per link-not-copy): dot3svc service must be set to Automatic startup (ships as Manual — Remediation pattern provided); 802.1X enforcement staging DANGER callout; KB5014754 strong cert mapping for Hybrid Entra Joined.
- **Rationale:** Native Intune profile types exist for both Wi-Fi and Wired. All three EAP methods. SCEP + PKCS + PFX Import all supported. No capability gaps that would reduce to Partial. [VERIFIED: docs/admin-setup-8021x/03-windows.md]

### macOS — Verdict: `Supported`

**Evidence from `docs/admin-setup-8021x/04-macos.md`:**
- H1 title: "macOS 802.1X Admin Setup: Wi-Fi and Wired" — both profile types documented
- Wi-Fi: `Devices > Configuration > New policy > macOS > Templates > Wi-Fi`, Enterprise type. All three EAP methods. Client auth: SCEP or PKCS (both supported for Wi-Fi).
- Wired: `Devices > Configuration > New policy > macOS > Templates > Wired network`. All three EAP methods. Client auth: SCEP only — "The macOS wired network profile supports only SCEP certificate profiles for client authentication (EAP-TLS and EAP-TTLS / PEAP certificate inner auth). PKCS certificate profiles are not supported for the wired profile type."
- Deployment channel (User vs Device keychain) decision is immutable after profile assignment — WARNING callout in guide.
- **Rationale:** Native Intune Wi-Fi and Wired profile types both exist. Both Wi-Fi and Wired 802.1X work. The PKCS-not-supported-wired constraint is a cert-delivery nuance captured in the linked guide (link-not-copy principle); it does not eliminate 802.1X capability on wired. Consistent with the cert-delivery row at `4-platform-capability-comparison.md:44` showing macOS as "Supported" (even though macOS wired cert delivery is SCEP-only, the overall cert capability is Supported). [VERIFIED: docs/admin-setup-8021x/04-macos.md]

### iOS/iPadOS — Verdict: `Partial`

**Evidence from `docs/admin-setup-8021x/05-ios.md`:**
- Wi-Fi: `Devices > Configuration > New policy > iOS/iPadOS > Templates > Wi-Fi`, Enterprise type. All three EAP methods. Client auth: SCEP, PKCS, or Derived credential for Wi-Fi.
- Wired: `Devices > Configuration > New policy > iOS/iPadOS > Templates > Wired network`. Wired profile is documented and functional. However: "The iOS/iPadOS wired 802.1X profile targets M-series iPads equipped with a USB-Ethernet adapter." Not all iOS/iPadOS devices are eligible — limited to M-series iPad hardware.
- Wired cert constraint: "The iOS/iPadOS wired network profile supports only SCEP certificate profiles for client authentication across all three EAP types. PKCS certificate profiles are not supported for the wired profile type."
- PEAP inner auth constraint: "iOS/iPadOS PEAP inner authentication is always MS-CHAPv2. The Intune Wi-Fi profile UI for iOS/iPadOS PEAP does not present an inner-method selector."
- Three separate profiles required (Trusted Cert + SCEP/PKCS + Wi-Fi or Wired).
- **Rationale:** Wi-Fi 802.1X is fully supported. Wired 802.1X is hardware-limited (M-series iPad only, not all iOS/iPadOS devices) — this is a meaningful capability constraint that justifies `Partial`. PEAP inner-auth and three-profile requirement are nuances in the linked guide. [VERIFIED: docs/admin-setup-8021x/05-ios.md]

### Android Enterprise — Verdict: `Mode-dependent` (for 4-platform comparison); per-mode cells for android-capability-matrix.md

**Evidence from `docs/admin-setup-8021x/06-android.md`:**
- Wi-Fi: `Devices > Configuration > New policy > Android Enterprise > Templates > Wi-Fi`, Enterprise type. All three EAP methods. Works across COBO/COPE/BYOD-WP/Dedicated/ZTE.
- No wired: "Android Enterprise has no native Intune wired-network profile type. Unlike Windows, macOS, and iOS/iPadOS — which each have a dedicated Intune wired (Ethernet) network profile — there is no equivalent profile type for Android Enterprise and no documented OMA-URI workaround."
- AOSP: "AOSP (Android Open Source Project) devices share the same Intune Wi-Fi profile path but are a distinct no-GMS platform out of scope for this guide; cert-delivery options differ (no PKCS Imported)."
- Per-mode differences documented in guide: UPN-in-SAN hard requirement for BYOD-WP (profile deployment fails if absent); Certificate access configuration required for COBO/COPE/Dedicated; Android 11+/14+ version gates for RADIUS server-name field.
- **Per-mode verdicts for android-capability-matrix.md:**
  - COBO (Fully Managed): `Partial` — Wi-Fi supported; Wired not supported
  - COPE (Work Profile Corporate-Owned): `Partial` — Wi-Fi supported; Wired not supported
  - BYOD (Work Profile): `Partial` — Wi-Fi supported (with UPN-in-SAN + certificate-only post-AMAPI constraints); Wired not supported
  - Dedicated (COSU): `Partial` — Wi-Fi supported; Wired not supported
  - ZTE (Zero-Touch): `Partial` — Wi-Fi supported post-handoff; Wired not supported
  - AOSP: `Partial` — Wi-Fi shares profile path but distinct no-GMS platform; cert-delivery constraints; Wired not supported
- **Rationale for `Mode-dependent` in 4-platform comparison:** Android verdicts diverge by mode (BYOD has UPN-in-SAN deployment-failure risk; AOSP is a stub; all modes share the wired gap). Per `4-platform-capability-comparison.md:15`: "`Mode-dependent` applies primarily to Android (which has 5 GMS modes + AOSP) where verdicts diverge per mode." [VERIFIED: docs/admin-setup-8021x/06-android.md]

### Linux — Verdict: `Partial`

**Evidence from `docs/admin-setup-8021x/07-linux.md`:**
- Lead WARNING callout: "Microsoft Intune provides no native Wi-Fi profile, no native wired-network profile, and no certificate-delivery profiles (Trusted Certificate, SCEP, or PKCS) for Linux. The approach documented in this guide is an OS-level shell-script + nmcli (NetworkManager `802-1x.*`) workaround — not an Intune profile."
- Wi-Fi: EAP-TLS only via `nmcli connection add type wifi ... 802-1x.eap tls ...` commands. Certificates must be placed out-of-band before running commands.
- Wired: Same nmcli EAP-TLS workaround via `type ethernet`. Intune provides no native wired profile.
- EAP scope: "PEAP-MSCHAPv2: Technically possible via nmcli but not documented in verifiable Microsoft/vendor sources for Intune-managed Linux fleets; out of scope for this guide. EAP-TTLS: Similarly undocumented."
- MEDIUM-confidence freshness callout: "Intune's Linux management capabilities continue to evolve. As of this guide's `last_verified` date, Intune delivers no native Wi-Fi, wired, or certificate profiles for Linux."
- **Rationale:** 802.1X is achievable via nmcli workaround (EAP-TLS only). No native Intune profiles exist. PEAP/EAP-TTLS are out of documented scope. These constraints collectively justify `Partial` — the capability exists but only via workaround, EAP-TLS only, with out-of-band cert delivery required. [VERIFIED: docs/admin-setup-8021x/07-linux.md]

---

## Deliverable 2: Exact Matrix Insertion Anchors

### File 1: `docs/reference/4-platform-capability-comparison.md`

**Section:** `## Configuration` (starts at line 35)
**Insert after:** `| Certificate deployment (SCEP / PKCS / ACME) | ... |` row at **line 44**
**Rationale:** 802.1X uses the cert-delivery infrastructure; placing the row immediately after cert deployment reflects the dependency and mirrors the deployment ordering (cert → 802.1X network profile). [VERIFIED: docs/reference/4-platform-capability-comparison.md:44]

**Column structure:** `| Feature | Windows | macOS | iOS | Android | Linux |` (5 platform columns)

**Row label:** `| Network Authentication (802.1X) |`

**Cell link pattern** (per `4-platform-capability-comparison.md:11` link-not-copy convention and existing row pattern):
Each non-Windows cell links to the per-platform capability matrix with the `#configuration` section anchor (consistent with ALL other rows in this file).
- Windows cell → `linux-capability-matrix.md#configuration` (per architecture: "Windows column links target the Windows column of `linux-capability-matrix.md`") [VERIFIED: docs/reference/4-platform-capability-comparison.md:11,13]
- macOS cell → `macos-capability-matrix.md#configuration`
- iOS cell → `ios-capability-matrix.md#configuration`
- Android cell → `android-capability-matrix.md#configuration`
- Linux cell → `linux-capability-matrix.md#configuration`

**Full row:**
```markdown
| Network Authentication (802.1X) | Supported — [matrix](linux-capability-matrix.md#configuration) | Supported — [matrix](macos-capability-matrix.md#configuration) | Partial — [matrix](ios-capability-matrix.md#configuration) | Mode-dependent — [matrix](android-capability-matrix.md#configuration) | Partial — [matrix](linux-capability-matrix.md#configuration) |
```

---

### File 2: `docs/reference/macos-capability-matrix.md`

**Section:** `## Configuration` (lines 29–41)
**Insert after:** `| Declarative Device Management (DDM) | No | Yes (macOS 14+, preferred for software updates) |` row at **line 41**
**Rationale:** The `## Authentication` section (line 101) documents macOS Platform SSO exclusively — its preamble says "This section documents macOS Platform SSO (PSSO) authentication." 802.1X is a network-profile configuration capability, not a PSSO authentication method; it belongs in `## Configuration`. Inserting after DDM (last row in Configuration) maintains table integrity. [VERIFIED: docs/reference/macos-capability-matrix.md lines 29-41, 101]

**Column structure:** `| Feature | Windows | macOS |` (bilateral)

**Cell links:** Each cell links to the corresponding 802.1X admin guide (the source of truth for the capability detail).
- Windows cell → `../admin-setup-8021x/03-windows.md`
- macOS cell → `../admin-setup-8021x/04-macos.md`

**Full row:**
```markdown
| Network Authentication (802.1X) | Supported — [guide](../admin-setup-8021x/03-windows.md) | Supported — [guide](../admin-setup-8021x/04-macos.md) |
```

**Note:** This matrix uses prose-verdict style (e.g., "Yes (APv1 only — see...)", "No", "Partially (ADE without user affinity)") rather than the 5-state lock that applies to `4-platform-capability-comparison.md`. The planner should match the existing prose-verdict style while using verdict language derived from the 5-state lock concepts. Alternative: use "Supported" / "Partial" inline with a brief note, consistent with the Compliance and Conditional Access section rows which use "Supported" / "Not supported".

---

### File 3: `docs/reference/ios-capability-matrix.md`

**Section:** `## Configuration` (lines 35–45)
**Insert after:** `| Security baselines | Yes (curated baseline sets) | No | No |` row at **line 45**
**Rationale:** 802.1X Wi-Fi/Wired profile is a configuration profile capability. Security baselines is the last row before end of Configuration table. [VERIFIED: docs/reference/ios-capability-matrix.md lines 35-45]

**Column structure:** `| Feature | Windows | macOS | iOS |` (trilateral)

**Cell links:**
- Windows → `../admin-setup-8021x/03-windows.md`
- macOS → `../admin-setup-8021x/04-macos.md`
- iOS → `../admin-setup-8021x/05-ios.md`

**Full row:**
```markdown
| Network Authentication (802.1X) | Supported — [guide](../admin-setup-8021x/03-windows.md) | Supported — [guide](../admin-setup-8021x/04-macos.md) | Partial — [guide](../admin-setup-8021x/05-ios.md) |
```

---

### File 4: `docs/reference/android-capability-matrix.md`

**Section:** `## Configuration` (lines 31–42)
**Insert after:** `| DDM (Declarative Device Management) | DDM: N/A ... |` row at **line 42**
**Rationale:** Android Configuration section covers Wi-Fi profile authentication at line 41 ("Wi-Fi profile authentication: Username/password or certificate") — the 802.1X row belongs in Configuration directly following that context. DDM is the last existing row. [VERIFIED: docs/reference/android-capability-matrix.md lines 31-42]

**Column structure:** `| Feature | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) | BYOD (Work Profile) | Dedicated (COSU) | ZTE (Zero-Touch) | AOSP |` (mode-columned — 6 columns)

**Cell pattern:** Each mode cell: `[verdict] — [guide](../admin-setup-8021x/06-android.md)`

**Full row:**
```markdown
| Network Authentication (802.1X) | Partial — [guide](../admin-setup-8021x/06-android.md) | Partial — [guide](../admin-setup-8021x/06-android.md) | Partial — [guide](../admin-setup-8021x/06-android.md) | Partial — [guide](../admin-setup-8021x/06-android.md) | Partial — [guide](../admin-setup-8021x/06-android.md) | Partial — [guide](../admin-setup-8021x/06-android.md) |
```

**BYOD cell note:** The `Partial` verdict for BYOD is technically the same word as COBO/COPE/etc., but for a different reason: BYOD has the UPN-in-SAN deployment-failure risk (profile never deploys if absent) in addition to the wired gap. The linked guide carries that nuance (link-not-copy). If the planner wants to distinguish BYOD, prose like "Partial (certificate-only post-AMAPI; UPN-in-SAN required)" in the cell is acceptable IF it matches the existing android-capability-matrix.md prose style.

---

### File 5: `docs/reference/linux-capability-matrix.md`

**Section:** `## Configuration` (lines 24–31)
**Insert after:** `| Hardware/firmware policies | Supported (driver/firmware updates via WUfB) | Not supported |` row at **line 31**
**Rationale:** Last row in Configuration section. Wi-Fi/wired network configuration is a configuration-domain capability. [VERIFIED: docs/reference/linux-capability-matrix.md lines 24-31]

**Column structure:** `| Feature | Windows | Linux |` (bilateral)

**Cell links:**
- Windows → `../admin-setup-8021x/03-windows.md`
- Linux → `../admin-setup-8021x/07-linux.md`

**Full row:**
```markdown
| Network Authentication (802.1X) | Supported — [guide](../admin-setup-8021x/03-windows.md) | Partial — [guide](../admin-setup-8021x/07-linux.md) |
```

---

## Deliverable 3: Full 802.1X Artifact Inventory

All 15 files confirmed committed and git-tracked (verified by filesystem listing 2026-07-01). [VERIFIED: `ls` output]

### Foundation Guides — `docs/admin-setup-8021x/`

| Path | Title / Purpose |
|------|----------------|
| `docs/admin-setup-8021x/00-overview.md` | 802.1X Admin Setup Overview — entry point + coverage-reality table; links to all per-platform guides |
| `docs/admin-setup-8021x/01-eap-method-overview.md` | EAP Method Overview — EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS co-equal paths; when-to-choose |
| `docs/admin-setup-8021x/02-cert-delivery-foundation.md` | Certificate Delivery Foundation — deployment ordering (trusted-root → SCEP/PKCS → network profile); EKU; server-name validation; per-platform cert matrix |
| `docs/admin-setup-8021x/03-windows.md` | Windows 802.1X Admin Setup: Wi-Fi and Wired |
| `docs/admin-setup-8021x/04-macos.md` | macOS 802.1X Admin Setup: Wi-Fi and Wired |
| `docs/admin-setup-8021x/05-ios.md` | iOS/iPadOS 802.1X Admin Setup: Wi-Fi and Wired |
| `docs/admin-setup-8021x/06-android.md` | Android Enterprise 802.1X Admin Setup: Wi-Fi (+ wired gap stub) |
| `docs/admin-setup-8021x/07-linux.md` | Linux 802.1X Admin Setup: EAP-TLS via nmcli |

### L1 Runbooks — `docs/l1-runbooks/`

| Path | Title / Purpose |
|------|----------------|
| `docs/l1-runbooks/38-8021x-certificate-failure.md` | 802.1X Certificate Failure — cert-profile status, deployment ordering, per-platform event/diagnostic signal |
| `docs/l1-runbooks/39-8021x-radius-reject.md` | 802.1X RADIUS Reject — symptom, first checks, per-platform diagnostics, escalation trigger |
| `docs/l1-runbooks/40-8021x-server-trust-failure.md` | 802.1X Server Trust/Validation Failure — symptom, first checks, per-platform diagnostics |
| `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` | 802.1X EAP Negotiation Failure — symptom, first checks, per-platform diagnostics |

All four L1 runbooks are **cross-platform** (cover Windows/macOS/iOS/Android/Linux with per-platform inline sections).

### L2 Runbooks — `docs/l2-runbooks/`

| Path | Title / Purpose |
|------|----------------|
| `docs/l2-runbooks/31-8021x-log-collection.md` | 802.1X L2 Log Collection — per-platform log sources (Windows Event Viewer WLAN-AutoConfig/Dot3Svc, macOS Console.app/wifi.log, iOS Intune portal, Android adb logcat, Linux journalctl); prerequisite for #32 and #33 |
| `docs/l2-runbooks/32-8021x-cert-investigation.md` | 802.1X Certificate Chain Investigation — per-platform cert chain validation, SCEP profile deployment status, EKU/SAN/expiry |
| `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` | 802.1X RADIUS/EAP Investigation — RADIUS team request checklist; per-platform EAP mismatch + server-name validation failure diagnosis |

All three L2 runbooks are **cross-platform**.

### Decision Tree — `docs/decision-trees/`

| Path | Title / Purpose |
|------|----------------|
| `docs/decision-trees/10-8021x-triage.md` | 802.1X Triage Decision Tree — symptom-primary routing to L1 runbooks #38-41 with per-platform leaves |

### Glossary (target — no edits needed)

| Path | Status |
|------|--------|
| `docs/_glossary-network.md` | Canonical 802.1X glossary — target of see-also banners already in all 4 platform glossaries. Do NOT edit. |

---

## Deliverable 4: Per-Hub Insertion Map

D-03 routing rules applied per hub:

---

### Hub 1: `docs/index.md`

**Hub shape:** MIXED — Platform H2s (`## Windows Autopilot`, `## macOS Provisioning`, `## iOS/iPadOS Provisioning`, `## Android Enterprise Provisioning`, `## Linux Provisioning`) plus topic H2s (`## Operations` :243, `## Cross-Platform References` :299).

**Routing:**

**`## Cross-Platform References` (line 299) — add 3 entries for foundation guides:**
Insert after the existing `| [Linux Capability Matrix]...` row (currently last matrix entry) and before `## Version History`. Add:
```markdown
| [802.1X Admin Setup Overview](admin-setup-8021x/00-overview.md) | Cross-platform 802.1X network authentication — EAP method selection, cert-delivery ordering prerequisites, per-platform admin guides |
| [EAP Method Overview](admin-setup-8021x/01-eap-method-overview.md) | Co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance |
| [Certificate Delivery Foundation](admin-setup-8021x/02-cert-delivery-foundation.md) | Deployment ordering rule (trusted-root → SCEP/PKCS → network profile); EKU requirements; per-platform cert matrix |
| [Network Authentication Glossary](_glossary-network.md) | 802.1X, EAP, EAPOL, RADIUS, supplicant, SCEP, PKCS, trusted root, server-name validation terms |
```

**Per-platform Admin Setup tables — add 802.1X admin guide to each:**

- `## macOS Provisioning > ### Admin Setup` table (~line 134): Add row for `[802.1X Admin Setup](admin-setup-8021x/04-macos.md)` — macOS Wi-Fi + Wired 802.1X (deployment channel, SCEP-only wired)
- `## iOS/iPadOS Provisioning > ### Admin Setup` table (~line 168): Add row for `[802.1X Admin Setup](admin-setup-8021x/05-ios.md)` — iOS/iPadOS Wi-Fi + M-series iPad Wired 802.1X
- `## Android Enterprise Provisioning > ### Admin Setup` table (~line 203): Add row for `[802.1X Admin Setup](admin-setup-8021x/06-android.md)` — Android Wi-Fi 802.1X across COBO/COPE/BYOD/Dedicated/ZTE
- `## Linux Provisioning > ### Admin Setup` table (~line 237): Add row for `[802.1X Admin Setup](admin-setup-8021x/07-linux.md)` — Linux EAP-TLS via nmcli (no native Intune profiles)

**Per-platform L1 tables — add 802.1X decision tree + L1 runbook link:**

- `## macOS Provisioning > ### Service Desk (L1)` (~line 102): Add row for `[802.1X Triage Decision Tree](decision-trees/10-8021x-triage.md)` and/or a combined row pointing to 802.1X L1 runbooks
- `## iOS/iPadOS Provisioning > ### Service Desk (L1)` (~line 148): Same pattern
- `## Android Enterprise Provisioning > ### Service Desk (L1)` (~line 184): Same pattern
- `## Linux Provisioning > ### Service Desk (L1)` (~line 215): Same pattern
- `## Windows Autopilot > ### Service Desk (L1) - APv1` (~line 30): The 802.1X L1 runbooks and decision tree also cover Windows — add entry

**Per-platform L2 tables — add L2 #31-33 links:**

Each platform L2 section gets a row pointing to 802.1X L2 log collection (#31) as prerequisite for #32/#33, consistent with the pattern where L2 sections lead with a log-collection guide row.

**`## Operations` (line 243):** No 802.1X entries needed here — Operations covers Co-Management, Patch & Update, App Lifecycle, Compliance Drift. 802.1X network authentication is a Configuration domain, not Operations.

---

### Hub 2: `docs/common-issues.md`

**Hub shape:** Platform-grouped — symptoms as H3 under platform H2s at `:23` (Windows), `:157` (macOS), `:249` (iOS), `:304` (Android). No Linux H2 exists in this file.

**Add H3 to each existing platform H2:**

**Under `## Windows Autopilot Issues` (~after line 156, before macOS section):**
```markdown
### 802.1X Network Authentication Failure

Device cannot connect to a 802.1X-protected Wi-Fi or wired network after enrollment.

- **L1:** [802.1X Certificate Failure](l1-runbooks/38-8021x-certificate-failure.md) | [RADIUS Reject](l1-runbooks/39-8021x-radius-reject.md) | [Server Trust Failure](l1-runbooks/40-8021x-server-trust-failure.md) | [EAP Negotiation Failure](l1-runbooks/41-8021x-eap-negotiation-failure.md) — start with [802.1X Triage Decision Tree](decision-trees/10-8021x-triage.md) to route by symptom
- **L2:** [802.1X Log Collection](l2-runbooks/31-8021x-log-collection.md) | [Cert Investigation](l2-runbooks/32-8021x-cert-investigation.md) | [RADIUS/EAP Investigation](l2-runbooks/33-8021x-radius-eap-investigation.md)
```

**Under `## macOS ADE Failure Scenarios`** (add new H3 at end, before `## iOS/iPadOS Failure Scenarios`):
Same pattern, pointing to same 802.1X L1/L2 runbooks (they are cross-platform).

**Under `## iOS/iPadOS Failure Scenarios`** (add new H3 at end):
Same pattern.

**Under `## Android Enterprise Failure Scenarios`** (add new H3 at end):
Same pattern, noting that Android wired 802.1X has no native Intune profile (the guide captures this).

**Linux:** No `## Linux Failure Scenarios` H2 exists in `common-issues.md`. Linux 802.1X cannot be wired into a non-existent platform section without creating a new H2. **Research flag for planner:** Either (a) accept that Linux 802.1X is not in common-issues.md (the 4 existing platform H2s don't include Linux), or (b) add a Linux failure H3 to a relevant cross-platform callout. Linux-specific 802.1X issues route through the same L1 #38-41 + L2 #31-33 runbooks. The planner should note this gap but is not required to create a Linux H2 in common-issues.md for Phase 109.

---

### Hub 3: `docs/quick-ref-l1.md`

**Hub shape:** MIXED — `## Decision Trees` (:35) and `## Runbooks` (:42) are artifact-type buckets at file level. Per-platform H2 sections (macOS ADE Quick Reference, iOS/iPadOS Quick Reference, Android Enterprise Quick Reference, Linux Quick Reference, Apple Business Quick Reference) each have `### Decision Tree` and `### Runbooks` sub-sections.

**`## Decision Trees` (line 35) — add entry:**
```markdown
- [802.1X Triage](decision-trees/10-8021x-triage.md) — 802.1X authentication failure symptom routing (cross-platform: cert failure / RADIUS reject / server-trust failure / EAP negotiation failure)
```

**Per-platform `### Runbooks` sub-sections — add 802.1X L1 runbook references:**

The L1 runbooks #38-41 are cross-platform. Each per-platform section should reference the 802.1X runbooks that apply. Since all four L1 runbooks cover all platforms, fold them into each platform section:

**`## macOS ADE Quick Reference > ### macOS Runbooks`** (~line 109): Add after existing macOS runbook links:
```markdown
- [802.1X Certificate Failure](l1-runbooks/38-8021x-certificate-failure.md) — 802.1X cert-profile not deployed or cert rejected
- [802.1X RADIUS Reject](l1-runbooks/39-8021x-radius-reject.md) — RADIUS server rejects authentication
- [802.1X Server Trust Failure](l1-runbooks/40-8021x-server-trust-failure.md) — dynamic trust dialog or server cert validation failure
- [802.1X EAP Negotiation Failure](l1-runbooks/41-8021x-eap-negotiation-failure.md) — EAP method mismatch or negotiation not completing
```

**`## iOS/iPadOS Quick Reference > ### iOS Runbooks`** (~line 146): Same four entries.

**`## Android Enterprise Quick Reference > ### Android Runbooks`** (~line 179): Same four entries.

**`## Linux Quick Reference > ### Linux Runbooks`** (~line 215): Same four entries.

**Top-level `## Runbooks` (line 42):** This section currently lists only Windows APv1 runbooks (#1-5). Since the 802.1X L1 runbooks cover all platforms including Windows, add a subsection or note at the end of `## Runbooks`:
```markdown
- [802.1X Certificate Failure](l1-runbooks/38-8021x-certificate-failure.md) — cross-platform
- [802.1X RADIUS Reject](l1-runbooks/39-8021x-radius-reject.md) — cross-platform
- [802.1X Server Trust Failure](l1-runbooks/40-8021x-server-trust-failure.md) — cross-platform
- [802.1X EAP Negotiation Failure](l1-runbooks/41-8021x-eap-negotiation-failure.md) — cross-platform
```

**Note:** The top-level `## Runbooks` is currently Windows APv1 only. The planner may choose to add the 802.1X cross-platform runbooks here (since `## Runbooks` is an artifact-type bucket) OR rely on the per-platform sections for discoverability. Both approaches satisfy D-03's "fold into existing groupings" constraint.

---

### Hub 4: `docs/quick-ref-l2.md`

**Hub shape:** MIXED — `## Log Collection` and `## Investigation Runbooks` (:65) are at file level. Per-platform H2 sections (macOS ADE, iOS, Android, Linux, Apple Business) each have `### Investigation Runbooks` sub-sections.

**`## Investigation Runbooks` (line 65) — add entries:**
```markdown
- [802.1X Log Collection Guide](l2-runbooks/31-8021x-log-collection.md) — prerequisite for all 802.1X L2 investigations; per-platform log sources (Windows WLAN-AutoConfig/Dot3Svc, macOS Console.app/wifi.log, iOS Intune portal, Android adb logcat, Linux journalctl)
- [802.1X Certificate Chain Investigation](l2-runbooks/32-8021x-cert-investigation.md) — per-platform cert chain validation, SCEP profile status, EKU/SAN/expiry
- [802.1X RADIUS/EAP Investigation](l2-runbooks/33-8021x-radius-eap-investigation.md) — RADIUS team request checklist; per-platform EAP mismatch + server-name validation diagnosis
```

**Per-platform `### Investigation Runbooks` sub-sections — add 802.1X L2 references:**

- `## macOS ADE Quick Reference > ### macOS Investigation Runbooks` (~line 218): Add L2 #31, #32, #33 entries
- `## iOS/iPadOS Quick Reference > ### iOS Investigation Runbooks` (~line 274): Add L2 #31, #32, #33
- `## Android Enterprise Quick Reference > ### Android Investigation Runbooks` (~line 321): Add L2 #31, #32, #33
- `## Linux Quick Reference > ### Linux Investigation Runbooks` (~line 372): Add L2 #31, #32, #33

---

### Hub 5: `docs/l1-runbooks/00-index.md`

**Hub shape:** H2 sections by platform/framework: `## APv1 Runbooks`, `## APv2 Runbooks`, `## macOS ADE Runbooks`, `## iOS L1 Runbooks`, `## Android L1 Runbooks`, `## Linux L1 Runbooks`, `## Apple Business L1 Runbooks`, then `## Scope`, `## Related Resources`, `## Version History`.

**Structural decision for planner:** L1 runbooks #38-41 are cross-platform — they don't belong to a single platform section. Two options, both consistent with the file's established patterns:

**Option A (recommended by research):** Add a `## 802.1X L1 Runbooks` H2 section between `## Apple Business L1 Runbooks` and `## Scope`. This follows the same precedent as `## Apple Business L1 Runbooks` — which is also topic-based (not platform), added in Phase 65 plan 65-02. D-03's "no dedicated 802.1X H2" constraint targets the navigation hub files (index.md, quick-ref-l1.md, quick-ref-l2.md, common-issues.md) where topic-based H2s would cause structural inconsistency. The l1-runbooks/00-index.md already uses mixed platform+topic H2 structure.

**Option B:** Add H3 subsections `### 802.1X Network Authentication` within each of the 4 per-platform H2 sections (macOS ADE, iOS, Android, Linux), plus a Windows-context entry in `## APv1 Runbooks` or `## Related Resources`.

**Recommended entries (Option A):**
```markdown
## 802.1X L1 Runbooks

L1 runbooks for 802.1X network authentication failure scenarios. All four runbooks are cross-platform — each covers Windows, macOS, iOS/iPadOS, Android Enterprise, and Linux with per-platform inline sections. Start with the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) to route by symptom.

| # | Runbook | When to Use |
|---|---------|-------------|
| 38 | [802.1X Certificate Failure](38-8021x-certificate-failure.md) | Client certificate not deploying, cert profile shows error, or authentication fails with cert-related event ID |
| 39 | [802.1X RADIUS Reject](39-8021x-radius-reject.md) | RADIUS server explicitly rejects authentication; "Access-Reject" in logs |
| 40 | [802.1X Server Trust Failure](40-8021x-server-trust-failure.md) | Dynamic trust dialog appears, or RADIUS server cert validation fails |
| 41 | [802.1X EAP Negotiation Failure](41-8021x-eap-negotiation-failure.md) | Connection fails before authentication completes; EAP method mismatch |
```

**`## Related Resources` (line 101) — add 802.1X decision tree:**
```markdown
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) -- 802.1X authentication failure symptom routing
```

---

### Hub 6: `docs/l2-runbooks/00-index.md`

**Hub shape:** H2 sections by platform/framework: APv1 Runbooks, APv2 Runbooks, macOS ADE Runbooks, iOS L2 Runbooks, Android L2 Runbooks, Linux L2 Runbooks, (Apple Business). Each platform H2 has a "When to Use" table + "L1 Escalation Mapping" table.

**Add a new H2 after `## Linux L2 Runbooks` (following same pattern as Hub 5):**
```markdown
## 802.1X L2 Runbooks

> **Version gate:** These runbooks cover 802.1X network authentication investigation across all five platforms (Windows, macOS, iOS/iPadOS, Android Enterprise, Linux). For platform-specific enrollment or compliance L2 runbooks, see the per-platform sections above.

The [802.1X Log Collection Guide](31-8021x-log-collection.md) is a **prerequisite for both L2 investigation runbooks** — collect per-platform 802.1X diagnostic logs before beginning any investigation.

### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [802.1X Log Collection Guide](31-8021x-log-collection.md) | Before starting any 802.1X L2 investigation — collect Windows WLAN-AutoConfig/Dot3Svc event logs, macOS wifi.log, iOS Intune diagnostic report, Android adb logcat, or Linux journalctl wpa_supplicant logs | None |
| [802.1X Certificate Chain Investigation](32-8021x-cert-investigation.md) | Cert profile shows Succeeded in Intune but authentication still fails; cert chain, EKU, SAN, or expiry concerns | [802.1X Log Collection](31-8021x-log-collection.md) |
| [802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md) | Suspected RADIUS-side rejection, EAP method mismatch, or server-name validation failure requiring RADIUS team coordination | [802.1X Log Collection](31-8021x-log-collection.md) |
```

**L1 Escalation Mapping for 802.1X (add within the 802.1X H2):**
```markdown
### 802.1X L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| [L1 38: 802.1X Certificate Failure](../l1-runbooks/38-8021x-certificate-failure.md) | [802.1X Certificate Chain Investigation](32-8021x-cert-investigation.md) |
| [L1 39: 802.1X RADIUS Reject](../l1-runbooks/39-8021x-radius-reject.md) | [802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md) |
| [L1 40: 802.1X Server Trust Failure](../l1-runbooks/40-8021x-server-trust-failure.md) | [802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md) |
| [L1 41: 802.1X EAP Negotiation Failure](../l1-runbooks/41-8021x-eap-negotiation-failure.md) | [802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md) |
```

**Placement note:** This new H2 should go AFTER `## Linux L2 Runbooks` (line 173+) and BEFORE any `## Apple Business` L2 section (if one exists). The existing file ends with the Linux section at line 179 (based on content read). Confirm actual final line before writing.

---

## Deliverable 5: Navigation-Last Verification

All Phase 109 nav targets confirmed committed by filesystem listing (2026-07-01). [VERIFIED: `ls` output]

| Target | Path | Status |
|--------|------|--------|
| 802.1X Overview | `docs/admin-setup-8021x/00-overview.md` | ✓ Committed |
| EAP Method Overview | `docs/admin-setup-8021x/01-eap-method-overview.md` | ✓ Committed |
| Cert Delivery Foundation | `docs/admin-setup-8021x/02-cert-delivery-foundation.md` | ✓ Committed |
| Windows 802.1X Guide | `docs/admin-setup-8021x/03-windows.md` | ✓ Committed |
| macOS 802.1X Guide | `docs/admin-setup-8021x/04-macos.md` | ✓ Committed |
| iOS/iPadOS 802.1X Guide | `docs/admin-setup-8021x/05-ios.md` | ✓ Committed |
| Android 802.1X Guide | `docs/admin-setup-8021x/06-android.md` | ✓ Committed |
| Linux 802.1X Guide | `docs/admin-setup-8021x/07-linux.md` | ✓ Committed |
| L1 #38 Cert Failure | `docs/l1-runbooks/38-8021x-certificate-failure.md` | ✓ Committed |
| L1 #39 RADIUS Reject | `docs/l1-runbooks/39-8021x-radius-reject.md` | ✓ Committed |
| L1 #40 Server Trust Failure | `docs/l1-runbooks/40-8021x-server-trust-failure.md` | ✓ Committed |
| L1 #41 EAP Negotiation | `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` | ✓ Committed |
| L2 #31 Log Collection | `docs/l2-runbooks/31-8021x-log-collection.md` | ✓ Committed |
| L2 #32 Cert Investigation | `docs/l2-runbooks/32-8021x-cert-investigation.md` | ✓ Committed |
| L2 #33 RADIUS/EAP Investigation | `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` | ✓ Committed |
| Decision Tree #10 | `docs/decision-trees/10-8021x-triage.md` | ✓ Committed |
| Network Glossary | `docs/_glossary-network.md` | ✓ Committed |

**SC4 invariant status:** SATISFIED. All nav targets were committed before Phase 109 begins. No within-phase content→nav ordering hazard.

**Matrix ordering note:** Within Phase 109, the planner should write the 4 per-platform matrices FIRST (adding 802.1X rows with links to admin guides), then write the `4-platform-capability-comparison.md` row (linking to the per-platform matrices at `#configuration`). This ensures the per-platform matrix links resolve correctly when the 4-platform comparison row is committed. However, since `#configuration` already exists as an anchor in each matrix, the 4-platform comparison row is safe to write in any order — the anchor does not depend on the new row existing.

---

## Deliverable 6: Corpus Conventions

### Link Syntax
Standard GitHub-flavored Markdown: `[link text](relative/path.md)` or `[link text](relative/path.md#anchor-slug)`. [VERIFIED: existing file content throughout]

### Anchor Slug Rules
Plain-GitHub auto-slugs — no `{#id}` overrides. [VERIFIED: CONTEXT.md canonical_refs, Phase 108 conventions]

**Double-hyphen trap:** Headings containing hyphens or special characters can produce unexpected slugs.
- `## 802.1X` → slug `#8021x` (period removed, no hyphen before digits)
- `## Configuration` → slug `#configuration` (used in all 4-platform comparison row links above)
- `## Network Authentication (802.1X)` (hypothetical new H2) → slug `#network-authentication-8021x`
- Row label "Network Authentication (802.1X)" — this is TABLE ROW TEXT, not a heading; it has no slug.

**Anchor confirmation for section links used in this research:**
- `macos-capability-matrix.md#configuration` → resolves to `## Configuration` at line 29 [VERIFIED: file content]
- `ios-capability-matrix.md#configuration` → resolves to `## Configuration` at line 35 [VERIFIED: file content]
- `android-capability-matrix.md#configuration` → resolves to `## Configuration` at line 31 [VERIFIED: file content]
- `linux-capability-matrix.md#configuration` → resolves to `## Configuration` at line 24 [VERIFIED: file content]

### Verdict Vocabulary (5-State Lock)
Cells in `4-platform-capability-comparison.md` use ONLY: `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. [VERIFIED: docs/reference/4-platform-capability-comparison.md:15]

Per-platform matrices (macos/ios/android/linux) use their OWN prose-verdict style (e.g., "Yes", "No", descriptive text). The planner should match the existing table style within each file, using "Supported" / "Partial" / "Not supported" as appropriate per the corpus conventions in each file.

### Callout Vocabulary
`> **NOTE` / `> **WARNING` / `> **DANGER` / `> **CRITICAL` only. No `> **IMPORTANT`. [VERIFIED: CONTEXT.md canonical_refs from Phase 108]

### Freshness Stamps
Format: `*last_verified: YYYY-MM-DD · review_by: YYYY-MM-DD*` on version-gated content only. Matrix rows and hub nav entries do NOT require freshness stamps (they are structural navigation, not versioned technical content). The linked guides already carry their own freshness stamps.

### See-Also Banners (SC3)
One-directional only: platform glossaries point TO `_glossary-network.md`. The network glossary does NOT back-link to platform glossaries. [VERIFIED: CONTEXT.md D-01, D-10]

**SC3 verification status (all four banners confirmed already present):**
- `docs/_glossary.md:13` — banner present [CITED: CONTEXT.md D-01]
- `docs/_glossary-macos.md:12` — banner present [CITED: CONTEXT.md D-01]
- `docs/_glossary-android.md:14` — banner present [CITED: CONTEXT.md D-01]
- `docs/_glossary-linux.md:12` — banner present [CITED: CONTEXT.md D-01]

Phase 109 SC3 task: VERIFY these lines (read each file, confirm banner text at the stated line). If lines shifted due to prior edits, find and confirm the banner. No edits expected.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Verdict for a platform | Assume from training data | Read the guide at the stated section | Stale training = wrong verdict |
| Anchor slug for a heading | Guess | Derive from heading text per GitHub rules (lowercase, remove non-alphanumeric except hyphens, collapse hyphens) | Double-hyphen trap is real |
| 802.1X theory in matrix cells | Write prose | Verdict word + one link | PITFALL-7: link-not-copy |
| New H2 for 802.1X in hub | Create dedicated section | Fold into artifact-type or platform bucket | D-03: no dedicated 802.1X H2 in any hub |

---

## Common Pitfalls

### Pitfall 1: Windows column links in `4-platform-capability-comparison.md`
**What goes wrong:** Linking Windows cells in the 4-platform comparison to `../admin-setup-8021x/03-windows.md` instead of `linux-capability-matrix.md#configuration`.
**Why it happens:** The Windows 802.1X admin guide is the obvious target, but the established convention (line 11-13 of `4-platform-capability-comparison.md`) routes the Windows column to `linux-capability-matrix.md`.
**How to avoid:** Match the pattern of ALL other rows — Windows column → `linux-capability-matrix.md#section`. [VERIFIED: docs/reference/4-platform-capability-comparison.md:11-13]

### Pitfall 2: Adding 802.1X row to `## Authentication` in `macos-capability-matrix.md`
**What goes wrong:** Placing the 802.1X row in the `## Authentication` section (line 101) instead of `## Configuration`.
**Why it happens:** 802.1X IS authentication, and there's an existing `## Authentication` section. But that section's preamble states: "This section documents macOS Platform SSO (PSSO) authentication." 802.1X is a network-configuration capability deployed via Intune Wi-Fi/Wired configuration profiles.
**How to avoid:** Place in `## Configuration` after the DDM row at line 41. [VERIFIED: docs/reference/macos-capability-matrix.md:101]

### Pitfall 3: Android BYOD verdict in mode-columned matrix
**What goes wrong:** Marking BYOD as `Supported` because Wi-Fi 802.1X works via Intune profiles.
**Why it happens:** Wi-Fi IS supported on BYOD. But BYOD has the UPN-in-SAN requirement where the profile deployment FAILS (not just auth fails) if UPN is absent from SAN — a deployment constraint that distinguishes it.
**How to avoid:** Mark BYOD as `Partial` (consistent with other modes). The nuance lives in the linked guide (link-not-copy). [VERIFIED: docs/admin-setup-8021x/06-android.md]

### Pitfall 4: Missing Android wired gap in common-issues.md entry
**What goes wrong:** Writing the Android 802.1X common-issues H3 in a way that implies wired support exists.
**Why it happens:** Other platforms (Windows, macOS, iOS) have wired 802.1X. Android does not — no native Intune wired profile type.
**How to avoid:** The 802.1X L1/L2 runbooks cover Android Wi-Fi 802.1X. The common-issues H3 for Android routes to those runbooks. The wired gap is documented in the linked admin guide. [VERIFIED: docs/admin-setup-8021x/06-android.md: "Android Enterprise has no native Intune wired-network profile type"]

### Pitfall 5: Creating dedicated L2 hub section in l2-runbooks/00-index.md before verifying file end
**What goes wrong:** Inserting the 802.1X L2 Runbooks H2 at an incorrect position (e.g., before Linux L2 or after a non-existent Apple Business L2 H2).
**Warning signs:** Read l2-runbooks/00-index.md to line 173+ before writing — the file content shown in research stops at the Linux L2 intro. Confirm actual last section before inserting.
**How to avoid:** Read the full current state of l2-runbooks/00-index.md before editing.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | macOS verdict is `Supported` (not `Partial`) because both Wi-Fi and Wired exist as native Intune profiles, consistent with cert-delivery row | Deliverable 1 | If planner/reviewer disagrees: change to `Partial` citing SCEP-only wired constraint. Low impact — nuance moves from `Supported` + link to `Partial` + link. |
| A2 | Per-platform matrices use their OWN prose-verdict style rather than the 5-state lock | Deliverable 2 | If wrong: use 5-state vocabulary in per-platform matrices too. Planner should confirm by examining existing rows' vocabulary style. |
| A3 | `4-platform-capability-comparison.md` cell links for the NEW 802.1X row follow the established pattern (link to per-platform matrix `#configuration`) rather than linking directly to admin guides | Deliverable 2 | If wrong: change cells to link directly to admin-setup-8021x guides. Either approach satisfies D-02 ("per-platform matrix/guide"). Existing rows all link to matrices. |
| A4 | `## 802.1X L1 Runbooks` H2 in `l1-runbooks/00-index.md` is acceptable (follows Apple Business H2 precedent) | Deliverable 4, Hub 5 | If D-03 "no dedicated 802.1X H2" applies here too: use Option B (H3 within each platform section). |
| A5 | `## 802.1X L2 Runbooks` H2 in `l2-runbooks/00-index.md` is acceptable (follows same H2 pattern as other platform sections) | Deliverable 4, Hub 6 | If D-03 applies: add H3 within each platform section instead. |
| A6 | `common-issues.md` Linux omission is acceptable (no Linux H2 exists to fold into) | Deliverable 4, Hub 2 | If reviewer wants Linux coverage: requires adding a `## Linux Failure Scenarios` H2 to common-issues.md — scope expansion. |

---

## Open Questions

1. **macOS verdict: `Supported` vs `Partial`?**
   - What we know: Both Wi-Fi and Wired profile types exist in Intune for macOS. Wired is SCEP-only (PKCS not supported).
   - What's unclear: Does the SCEP-only wired constraint reduce the overall 802.1X verdict to `Partial`, or does the existence of the native Intune profile make it `Supported` with noted constraint in the linked guide?
   - Recommendation: Use `Supported` (consistent with cert-delivery row precedent where macOS is Supported despite wired-SCEP-only constraint). Override to `Partial` if reviewer has a consistent precedent otherwise.

2. **`## 802.1X L1 Runbooks` H2 in l1-runbooks/00-index.md — does D-03 apply?**
   - What we know: D-03 says no dedicated 802.1X H2 in any hub. l1-runbooks/00-index.md already has Apple Business L1 Runbooks H2 (topic-based, not platform).
   - What's unclear: Does "no dedicated 802.1X H2" extend to l1-runbooks/00-index.md's catalog-style file?
   - Recommendation: Treat l1-runbooks/00-index.md as a CATALOG (not a navigation hub in the D-03 sense), and allow the `## 802.1X L1 Runbooks` H2 as consistent with the Apple Business H2 pattern. The D-03 prohibition targets navigation hub files where adding a domain H2 would disrupt hub structure.

3. **`4-platform-capability-comparison.md` row: link to per-platform matrix or to admin guide?**
   - What we know: D-02 says "each cell = verdict word + one hyperlink to the source per-platform matrix/guide". The existing rows all link to per-platform matrices.
   - What's unclear: For a NEW row where the per-platform matrix didn't have 802.1X before, is the admin guide or the matrix the better link?
   - Recommendation: Link to per-platform matrix `#configuration` anchor (consistent with all other rows). The matrix then links to the admin guide. This is the established two-hop pattern.

---

## Validation Architecture

> NOTE: workflow.nyquist_validation is not explicitly configured; treating as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Markdown lint + link validation (no automated test suite for docs-only changes) |
| Config file | None detected |
| Quick run command | `git diff --name-only HEAD` to verify only expected files changed |
| Full suite command | Chain validator `check-phase-109.mjs` (to be authored in Phase 112) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DOT1X-11-SC1 | Network-Auth rows appear in all 5 matrices | manual | Read each matrix file, confirm row | ❌ Wave 0 |
| DOT1X-11-SC2 | Six hubs carry 802.1X entries | manual | Read each hub file, confirm entries | ❌ Wave 0 |
| DOT1X-11-SC3 | Glossary see-also banners present | manual | Read 4 glossary files at stated lines | ❌ Wave 0 (verify only) |
| DOT1X-11-SC4 | Nav edits committed after content | git log | `git log --oneline` ordering check | ❌ Wave 0 |

### Sampling Rate
- Per task commit: Read the edited file at affected lines to confirm insertion
- Per wave merge: Read all 5 matrices + 6 hubs to confirm complete coverage
- Phase gate: All 11 files verified before `/gsd-verify-work`

### Wave 0 Gaps
No test framework to install. Verification is file-read based (no automated tooling needed for Markdown-only edits).

*(All verification is manual/read-based — no test files to create)*

---

## Security Domain

> `security_enforcement` not explicitly set to false in config — treating as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Phase 109 is nav-only; no auth logic authored |
| V3 Session Management | No | Nav-only |
| V4 Access Control | No | Nav-only |
| V5 Input Validation | No | Static Markdown; no user input |
| V6 Cryptography | No | Nav-only |

### Threat Patterns for this Phase

No security-relevant code or configuration is authored in Phase 109. All edits are append-only Markdown to existing documentation files. No secrets, credentials, or auth logic are touched. Security review: N/A for nav-wiring phase.

---

## Sources

### Primary (HIGH confidence)
- `docs/admin-setup-8021x/03-windows.md` (lines 1-197) — Windows 802.1X full guide, verdict source
- `docs/admin-setup-8021x/04-macos.md` (lines 1-153) — macOS 802.1X full guide, verdict source
- `docs/admin-setup-8021x/05-ios.md` (lines 1-152) — iOS/iPadOS 802.1X full guide, verdict source
- `docs/admin-setup-8021x/06-android.md` (lines 1-128) — Android 802.1X full guide, verdict source
- `docs/admin-setup-8021x/07-linux.md` (lines 1-191) — Linux 802.1X full guide, verdict source
- `docs/reference/4-platform-capability-comparison.md` (lines 1-122) — 5-state lock, cell pattern, existing row precedent
- `docs/reference/macos-capability-matrix.md` (lines 1-134) — column structure, section structure
- `docs/reference/ios-capability-matrix.md` (lines 1-121) — column structure, section structure
- `docs/reference/android-capability-matrix.md` (lines 1-155) — mode-columned structure, section structure
- `docs/reference/linux-capability-matrix.md` (lines 1-119) — column structure, section structure
- `docs/index.md` (lines 1-345) — hub shape, section line numbers
- `docs/quick-ref-l1.md` (lines 1-258) — hub shape, Decision Trees/Runbooks section positions
- `docs/quick-ref-l2.md` (lines 1-398) — hub shape, Investigation Runbooks section positions
- `docs/common-issues.md` (lines 1-329) — platform H2 line numbers
- `docs/l1-runbooks/00-index.md` (lines 1-137) — catalog structure, platform H2s, Apple Business H2 precedent
- `docs/l2-runbooks/00-index.md` (lines 1-179) — catalog structure, platform H2s, escalation mapping patterns
- Filesystem `ls` output — confirmed 15 target files committed
- `.planning/phases/109-802-1x-integration-capability-matrices-navigation-hubs/109-CONTEXT.md` — locked decisions D-01–D-04, canonical refs

### Secondary (MEDIUM confidence)
- `.planning/ROADMAP.md` — Phase 109 goal, SC1-SC4 definitions
- `.planning/REQUIREMENTS.md` — DOT1X-11 requirement text
- `.planning/STATE.md` — project state, phase dependency chain

---

## Metadata

**Confidence breakdown:**
- Verdicts: HIGH — derived from live guide content at verified lines, not training data
- Matrix anchors: HIGH — specific line numbers from file reads
- Hub insertion map: HIGH — section line numbers from file reads; some structural decisions flagged as planner discretion
- Navigation-last verification: HIGH — filesystem confirmed all 15 targets

**Research date:** 2026-07-01
**Valid until:** 2026-09-29 (90 days — stable Markdown; tied to guide `review_by` dates)

---

## RESEARCH COMPLETE

**Phase:** 109 - 802.1X Integration — Capability Matrices + Navigation Hubs
**Confidence:** HIGH

### Key Findings

1. **All 15 nav targets confirmed committed** — SC4 (navigation-last) is satisfied from Phase 109 Day 1; no within-phase ordering risk.
2. **SC3 already satisfied** — all 4 glossary see-also banners are confirmed present per CONTEXT.md D-01; Phase 109 SC3 task is verify-only (read 4 lines, confirm).
3. **Verdicts derived from guide content:** Windows: Supported; macOS: Supported; iOS: Partial (M-series iPad wired only); Android: Mode-dependent (Wi-Fi works but with per-mode constraints; no native wired for any mode); Linux: Partial (EAP-TLS via nmcli only; no native Intune profiles).
4. **All 5 matrix insertion anchors identified:** 802.1X row goes in `## Configuration` in all 5 files, after the last existing row in that section (cert-delivery row at line 44 in `4-platform-capability-comparison.md`; DDM row at line 41/42 in macos/android; security baselines row at line 45 in ios; hardware/firmware policies row at line 31 in linux).
5. **Hub insertion map complete:** 6 hubs × artifact-type routing resolved; recommended L1/L2 catalog H2 approach follows Apple Business precedent.

### Files Created
`.planning/phases/109-802-1x-integration-capability-matrices-navigation-hubs/109-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Verdicts | HIGH | Derived from live guide content at verified lines |
| Matrix anchors | HIGH | Specific line numbers confirmed from file reads |
| Hub insertion map | HIGH | Section line numbers confirmed; structural options flagged |
| SC3 status | HIGH | CONTEXT.md D-01 explicitly states all 4 banners present |
| Nav-last verification | HIGH | `ls` confirms all 15 target files on disk |

### Open Questions
- macOS verdict (`Supported` vs `Partial`) — see Assumptions A1
- Whether D-03 extends to l1/l2 runbook catalog files — see Assumptions A4/A5
- Whether common-issues.md Linux omission needs a new H2 — see Assumptions A6

### Ready for Planning
Research complete. Planner can now create PLAN.md files targeting all 11 edit files (5 matrices + 6 hubs) with verified verdicts, insertion anchors, and nav entry content.
