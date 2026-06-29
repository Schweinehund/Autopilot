# v1.14 Research Summary — 802.1X Network Authentication Documentation (Pillar A)

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite
**Domain:** 802.1X enterprise network authentication (wired + Wi-Fi) via Microsoft Intune — documentation milestone, 5 platforms
**Researched:** 2026-06-29
**Confidence:** HIGH (all primary findings verified against Microsoft Learn; Linux EAP-TLS: MEDIUM; Linux PEAP/TTLS: LOW — not in MS docs)
**Scope note:** This summary covers Pillar A only. Pillars B (corpus nits), C (MIGFUT migration walkthroughs), D (chain-validator tooling refactors), and E (harness bump) are not synthesized here.

---

## Executive Summary

802.1X network authentication is a mature, well-documented domain in Microsoft Intune — but only for four of the five target platforms. The research converges on a single hard truth: the five platforms are not symmetric. Windows, macOS, and iOS/iPadOS have full native Intune profile support for both wired and Wi-Fi 802.1X. Android Enterprise has native Wi-Fi 802.1X support but zero native wired support (no profile type, no OMA-URI workaround). Linux has neither — neither Wi-Fi nor wired Intune profiles exist; neither certificate delivery nor 802.1X configuration can be pushed via MDM payloads. Linux 802.1X is a shell-script + nmcli pattern with EAP-TLS only verifiable against documented sources. Every per-platform admin-setup guide must open with a clear statement of what Intune can and cannot deliver on that platform before the reader reaches any configuration steps.

The recommended approach is a HYBRID architecture: a new `docs/admin-setup-8021x/` folder with two shared foundation files (EAP method overview + certificate delivery foundation) that all five per-platform guides link into, plus one per-platform guide covering both wired and Wi-Fi. This respects the suite's link-not-copy convention, avoids the anti-pattern of distributing 802.1X across five existing per-platform enrollment folders, and provides a single discoverable entry point for cross-platform 802.1X work. Three EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS) must be treated as co-equal throughout; the scope constraint prohibits presenting one as the recommended default. The certificate delivery ordering rule is the single most consequential fact in the entire doc set: trusted root must deploy before SCEP/PKCS client cert, which must deploy before the Wi-Fi or wired network profile — violating this order produces silent Intune "Succeeded" status alongside live authentication failures.

The primary risk in this milestone is scope creep toward RADIUS/NPS server configuration, which is explicitly out of scope. A secondary risk is platform-asymmetry errors — authoring wired-profile steps for Android or Linux, where no Intune profile exists, without sufficient prominence of the gap. The tertiary risk is freshness-stamp omissions on the multiple version-gated callouts (Android 11+, Android 14+) that will cause harness staleness failures if left unstamped. All three risks are addressed by ensuring the foundation phase establishes the scope callout template and the per-platform coverage-reality matrix is the first reference document written.

---

## Key Findings

### Building Blocks (from STACK.md)

All findings verified against Microsoft Learn documentation dated 2025-05-15 to 2026-06-29.

**Wi-Fi profile type — platform support:**
- Windows: Templates > Wi-Fi (enterprise section); also Settings Catalog. Full EAP-TLS + PEAP + EAP-TTLS.
- macOS: Templates > Wi-Fi. Deployment channel (User vs Device) must be chosen at profile creation — immutable after assignment.
- iOS/iPadOS: Templates > Wi-Fi. MAC address randomization control (iOS 14+) is critical for NAC environments.
- Android Enterprise: Templates > Wi-Fi. RADIUS server name required for Android 11+; 256-char total limit + no special characters on Android 14+.
- Linux: No native Wi-Fi profile in Intune. Shell script (Bash via Intune) + nmcli only. EAP-TLS only documented; PEAP/TTLS LOW confidence.

**Wired (Ethernet) profile type — platform support:**
- Windows: Templates > Wired network (WiredNetwork CSP). Unique: TEAP support, 802.1X enforcement toggle, PFX Import cert option.
- macOS: Templates > Wired network. Network interface selector. PKCS certs NOT supported — SCEP only for client auth.
- iOS/iPadOS: Templates > Wired network. GA (M-series iPads + USB Ethernet). PKCS certs NOT supported — SCEP only.
- Android Enterprise: No wired network profile type. No OMA-URI workaround documented.
- Linux: No wired network profile type. Same script-only gap as Wi-Fi.

**Certificate delivery — critical asymmetries:**
- SCEP: Supported on all 5 platforms for trusted root; client cert delivery on Windows/macOS/iOS/Android. Linux: no Intune cert profiles at all.
- PKCS: Supported on Windows/macOS/iOS/Android for Wi-Fi. NOT supported on macOS wired profiles. NOT supported on iOS/iPadOS wired profiles. NOT supported on Linux.
- PFX Import (PKCS Imported): Windows wired uniquely exposes this in the wired profile UI. Supported Windows/macOS/iOS/Android non-AOSP for Wi-Fi.
- Trusted root: Supported on Windows/macOS/iOS/Android. Linux: not supported via Intune.

**Version-gated requirements (must carry freshness stamps):**
- Android 11+: RADIUS server name field required or new Wi-Fi profiles may not connect.
- Android 14+: Total RADIUS server names <=256 chars; no special characters.
- Android BYOD work profile (all versions): UPN must be present in certificate SAN — profile deployment fails if absent.
- Windows Hybrid Entra Joined: KB5014754 strong certificate mapping (SID in SAN) required as of February 11, 2025.
- macOS deployment channel: Immutable after profile assignment — cert type (user vs device) must align with channel before creating the profile.
- Windows wired: Wired AutoConfig (dot3svc) service must be running — ships as "Manual" startup on Windows 10/11.

### Features (from FEATURES.md)

**Table stakes — content the audience requires for the doc set to feel complete:**

| Content | Why Required |
|---|---|
| 802.1X conceptual overview (supplicant / authenticator / RADIUS / EAPOL) | L1/L2 cannot triage without the 3-actor model |
| EAP method comparison (TLS / PEAP-MSCHAPv2 / EAP-TTLS x what-authenticates / what-client-needs / trust requirements) | Required for admin profile-config choices |
| Certificate delivery prerequisite chain and ordering rule | All cert-based EAP methods fail silently without this |
| Per-platform Wi-Fi 802.1X admin-setup guide (5 platforms, 3 EAP methods each) | Core deliverable |
| Per-platform Wired 802.1X admin-setup guide (Windows + macOS + iOS native; Android + Linux = explicit gap stubs) | Stated milestone requirement |
| L1 runbooks: #38 cert failure, #39 RADIUS reject, #40 server trust failure, #41 EAP negotiation failure | L1 Service Desk needs scripted triage flows |
| L2 runbooks: #31 log collection, #32 cert investigation, #33 RADIUS/EAP investigation | L2 needs per-platform log-path + escalation content |
| Decision tree #10: 802.1X triage | Routes L1 symptom to runbook |
| Glossary: new docs/_glossary-network.md | Consistent terminology across all 5 platforms |
| Capability matrix 802.1X rows (5 platform matrices) | Existing doc structure requires this |
| Nav hub wiring (docs/index.md + L1/L2 indexes + quick-refs + common-issues) | All new docs must be reachable; navigation-last |

**Differentiators — valuable, not strictly required by audience expectation:**
- "Which EAP method?" decision matrix for admins (based on cert infra availability, user type, RADIUS vendor)
- Windows authentication mode decision (User / Machine / User-or-machine) — unique to Windows; enables pre-logon network access
- macOS deployment channel (User vs Device keychain) gotcha — immutable after deploy; must be called out with WARNING callout
- iOS MAC address randomization disable for NAC environments (iOS 14+)
- Android version-matrix for RADIUS server name behavior (Android 11+, 14+)
- Linux nmcli script approach — completes 5-platform coverage; EAP-TLS only; framed as out-of-Intune-profile-surface workaround
- Outer identity / identity privacy configuration per EAP method (applies to PEAP and EAP-TTLS primarily)
- Android Enterprise cert SAN / UPN requirement (affects personally-owned work profile)
- Per-platform "connected and authenticated" verification state (what done looks like)

**Anti-features — explicitly out of scope:**
- RADIUS/NPS server configuration, network switch/AP port config, MAB
- PKI/CA infrastructure build-out (ADCS, NDES setup), Certificate Connector installation
- EAP-SIM, EAP-FAST, LEAP, TEAP — visible in Intune UI but not in the three co-equal EAP paths
- Android wired 802.1X via Intune — no profile type exists; document the gap, not a workaround
- Linux PEAP / EAP-TTLS via Intune scripts — LOW confidence; not in Microsoft docs; out of scope
- WPA/WPA2 Personal (PSK) Wi-Fi profiles
- Conditional Access network-based policies

### Architecture (from ARCHITECTURE.md)

The recommended architecture is HYBRID: a single new folder `docs/admin-setup-8021x/` with 2 shared foundation files + 5 per-platform files, plus a new `docs/_glossary-network.md`. This is the only approach that satisfies link-not-copy (shared EAP and cert concepts live once), avoids topical contamination of existing enrollment-lifecycle folders, and provides a cross-platform entry point.

**New file inventory:**

| Path | Type | Depends On |
|---|---|---|
| `docs/_glossary-network.md` | Glossary | None — first |
| `docs/admin-setup-8021x/00-overview.md` | Entry point | None |
| `docs/admin-setup-8021x/01-eap-method-overview.md` | Shared foundation | `_glossary-network.md` |
| `docs/admin-setup-8021x/02-cert-delivery-foundation.md` | Shared foundation | `01-eap-method-overview.md` |
| `docs/admin-setup-8021x/03-windows.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/04-macos.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/05-ios.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/06-android.md` | Per-platform guide | Files 01-02 |
| `docs/admin-setup-8021x/07-linux.md` | Per-platform guide | Files 01-02 |
| `docs/l1-runbooks/38-8021x-cert-failure.md` | L1 runbook | Per-platform guides |
| `docs/l1-runbooks/39-8021x-radius-reject.md` | L1 runbook | Per-platform guides |
| `docs/l1-runbooks/40-8021x-server-trust-failure.md` | L1 runbook | Per-platform guides |
| `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` | L1 runbook | Per-platform guides |
| `docs/l2-runbooks/31-8021x-log-collection.md` | L2 prerequisite | Per-platform guides |
| `docs/l2-runbooks/32-8021x-cert-investigation.md` | L2 runbook | `31-*` |
| `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` | L2 runbook | `31-*` |
| `docs/decision-trees/10-8021x-triage.md` | Decision tree | L1 #38-41 |
| Capability matrix updates (5 files in `docs/reference/`) | Matrix rows | Per-platform guides |
| Nav hub updates (6 files: index, common-issues, quick-refs, L1/L2 indexes) | Navigation | All above (navigation-last) |

**Runbook numbering verified from repo:** L1 current highest = #37; L2 current highest = #30; decision tree current highest = `09-linux-triage.md`.

**Build order constraint:** Glossary -> Foundation files -> Per-platform guides -> L1/L2 runbooks -> Decision tree + Capability matrices -> Nav hubs (navigation-last) -> Harness bump (last, indivisible atom).

### Critical Pitfalls (from PITFALLS.md)

**Top pitfalls — must be prominent in every admin-setup guide:**

1. **Trust-before-profile ordering violation (A-01)** — Intune reports the Wi-Fi/wired profile as "Succeeded" while the device cannot authenticate, because the trusted root or SCEP cert profile has not yet reached the device. Prevention: stagger deployment rings; assign trusted root first (wait for "Succeeded" across devices), then SCEP/PKCS, then the network profile. This ordering rule must appear as a prerequisite block in every per-platform guide, not buried in the foundation doc.

2. **Server validation disabled — security trap and connection failure (A-05 / C-02)** — `PerformServerValidation = false` (Windows) or equivalent creates a rogue RADIUS attack surface. The Windows EAP XML default skeleton has this set to false. The docs must never show examples with server validation disabled. Android 11+ requires the RADIUS server name field to be populated or new profiles may not connect.

3. **Windows Wired 802.1X enforcement locks out devices (B-02)** — Setting the wired profile to "Enforce" before RADIUS is validated and certs are deployed can cut off all wired access simultaneously. Profile removal requires network access — a circular dependency. Requires a DANGER callout in the Windows wired guide with staged-rollout guidance.

4. **Android UPN-in-SAN required — profile deployment fails, not just auth (B-06)** — For Android Enterprise personally-owned work profile, the client certificate SAN must include the UPN. If absent, the Wi-Fi profile itself fails to deploy (not just authentication). Admins testing on Windows or iOS first (where this requirement does not apply) will be caught off guard when porting to Android.

5. **macOS deployment channel is immutable (STACK.md Building Block 9)** — Once a macOS Wi-Fi or wired profile is assigned, the User/Device deployment channel cannot be changed. Choosing the wrong channel requires deleting the profile, creating a new one, and reassigning. Requires a WARNING callout with a decision table (user cert -> User channel; device cert -> Device channel).

6. **Windows Wired dot3svc dependency (B-01)** — The Wired AutoConfig service (dot3svc) ships as "Manual" startup. 802.1X wired profile applies but supplicant does not engage if dot3svc is stopped. Intune shows profile "Succeeded." A companion Intune Remediation or PowerShell script must ensure dot3svc is running before the wired profile is deployed.

7. **Android 14+ RADIUS server name character limit (B-07)** — Total combined RADIUS server name length cannot exceed 256 characters on Android 14+; special characters disallowed. Profiles that worked on Android 11-13 fail silently on Android 14 devices. Use DNS suffix instead of full FQDNs. Requires a version-gated callout with `last_verified` / `review_by` freshness stamps.

8. **EAP methods treated unequally (E-06)** — The v1.14 scope constraint requires EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS to receive equal depth in every per-platform guide. Every per-platform guide must document all three methods to the same depth using the co-equal template established in the foundation phase.

---

## Per-Platform Coverage-Reality Matrix

*Highest-value synthesis for requirements and roadmap. Confirms what is and is not deliverable via Intune client-side configuration.*

| Capability | Windows | macOS | iOS/iPadOS | Android Enterprise | Linux |
|---|---|---|---|---|---|
| **Wi-Fi 802.1X profile (Intune native)** | YES | YES | YES | YES | NO — shell script + nmcli only |
| **Wired 802.1X profile (Intune native)** | YES | YES | YES (GA, M-series iPad) | NO — no profile type | NO — no profile type |
| **EAP-TLS (Wi-Fi)** | Full | Full | Full | Full | MEDIUM confidence — nmcli script only |
| **PEAP-MSCHAPv2 (Wi-Fi)** | Full | Full | Full | Full | LOW confidence — not in MS docs |
| **EAP-TTLS (Wi-Fi)** | Full | Full | Full | Full; no CHAP inner (PAP/MS-CHAP/MS-CHAPv2 only) | OUT OF SCOPE |
| **EAP-TLS (Wired)** | Full | Full | Full | NO native wired | NO native wired |
| **PEAP-MSCHAPv2 (Wired)** | Full | Full | Full | NO native wired | NO native wired |
| **EAP-TTLS (Wired)** | Full | Full | Full | NO native wired | NO native wired |
| **SCEP cert delivery** | Full | Full | Full | Full | NO — no Intune cert profiles |
| **PKCS cert delivery (Wi-Fi)** | Full | Full | Full | Full | NO |
| **PKCS cert delivery (Wired)** | Full | NOT SUPPORTED — SCEP only | NOT SUPPORTED — SCEP only | NO native wired | NO |
| **PFX Import / PKCS Imported (Wired)** | Full (unique to Windows wired profile UI) | Wi-Fi only | Wi-Fi only | Wi-Fi only, non-AOSP | NO |
| **Trusted root cert delivery** | Full | Full | Full | Full | NO |
| **Authentication mode (User/Machine/Both)** | Configurable | NOT exposed | NOT exposed | NOT exposed | N/A |
| **Deployment channel (User vs Device keychain)** | N/A | REQUIRED — immutable after assignment | N/A | N/A | N/A |
| **RADIUS server name (server validation)** | Optional | Required to suppress dynamic trust dialog | Required to suppress dynamic trust dialog | Required Android 11+; <=256 chars total / no special chars Android 14+ | Configured in script |
| **MAC address randomization control** | N/A | N/A | Disable-able in Wi-Fi profile (iOS 14+) — required for NAC | Configurable Android 13+ | N/A |
| **UPN in cert SAN required** | Not a blocker | Not a blocker | Not a blocker | Required for personally-owned work profile — profile fails to deploy if absent | N/A |
| **Outer identity / identity privacy** | Supported (PEAP, EAP-TTLS) | Supported (all three EAP methods) | Supported (all three EAP methods) | Supported | Via nmcli script parameters |
| **TEAP** | Wired only (unique to Windows) | No | No | N/A | N/A |
| **dot3svc service dependency** | Yes — must be running; ships as Manual startup | N/A | N/A | N/A | N/A |
| **Strong cert mapping (KB5014754)** | Hybrid Entra Joined only — SID in SAN required (2025-02-11) | N/A | N/A | N/A | N/A |
| **Wired coverage type** | Full guide | Full guide | Full guide | Gap stub — no native Intune profile | Gap stub — no native profile |

**Reading guide for requirements authors:**
- "NO" in the wired column for Android and Linux means: document the gap with a one-paragraph explanation and what the alternative is (network team consultation for Android; OS-level nmcli config for Linux).
- "NOT SUPPORTED" for PKCS on macOS/iOS wired means: document the SCEP-only constraint with a callout; admins in PKCS-only shops need to know before attempting configuration.
- "NOT exposed" for Authentication mode on macOS/iOS/Android means: these platforms authenticate as the current user context only; machine-level pre-logon auth is not available through Intune profiles.

---

## Recommended Architecture and File Placement

**Verdict: HYBRID — new `docs/admin-setup-8021x/` with shared foundation + per-platform files.**

Do not distribute 802.1X guides across existing `admin-setup-{platform}/` folders. Those folders are enrollment-lifecycle focused; 802.1X is a post-enrollment network access feature. Distributing across five folders would require duplicating EAP and cert concepts, violate link-not-copy, and eliminate the cross-platform entry point admins need.

**Shared foundation (01-02) handles:** 802.1X supplicant model, EAP method comparison, cert delivery ordering rule, RADIUS server-name validation concept, deployment ordering. Per-platform guides link to these — never restate them.

**Per-platform files (03-07) handle:** Intune profile type, UI navigation path, EAP method settings within the Intune UI, platform-specific gotchas, wired + Wi-Fi coverage (or explicit gap stubs), "done/verified" state.

**Glossary:** New `docs/_glossary-network.md` for protocol-level, platform-neutral terms (EAP-TLS, PEAP, RADIUS, supplicant, authenticator, SCEP, PKCS, trusted root, EAPOL, inner/outer identity). Existing platform glossaries get see-also banners pointing to it.

---

## Build-Order and Phase-Grouping Recommendation

Phase numbering continues from v1.13 close (Phase 100) -> v1.14 starts at Phase 101.

### Phase 101 — Foundation

**Rationale:** Glossary and EAP concepts must exist before any per-platform guide can reference them. Co-equal EAP method template established here drives consistency across all five platform phases.
**Delivers:** `docs/_glossary-network.md` + `docs/admin-setup-8021x/00-overview.md` + `01-eap-method-overview.md` + `02-cert-delivery-foundation.md` + glossary see-also banners in existing platform glossaries.
**Pitfalls to avoid:** E-02 (copy-paste instead of link-not-copy), E-06 (EAP methods treated unequally), E-01 (scope callout template established here).
**Research flag:** No additional research needed. Standard phase.

### Phase 102 — Windows Wi-Fi + Wired Admin-Setup

**Rationale:** Windows is the most complete platform. Authoring Windows first sets the guide template depth that subsequent platform phases follow.
**Delivers:** `docs/admin-setup-8021x/03-windows.md` covering Wi-Fi + Wired, all three EAP methods.
**Key content:** Authentication mode (User/Machine/User-or-machine), dot3svc service dependency, 802.1X enforcement staging (DANGER callout), TEAP awareness note (one paragraph; not a co-equal path), strong mapping callout for Hybrid Entra Joined, PFX Import option for wired.
**Pitfalls to avoid:** B-01 (dot3svc), B-02 (enforcement misconfiguration), B-03 (auth mode mismatch), A-01 (ordering), A-05 (server validation), E-03 (freshness stamps for KB5014754 callout).
**Research flag:** Well-documented. No additional research needed.

### Phase 103 — macOS Wi-Fi + Wired Admin-Setup

**Rationale:** macOS has two notable constraints distinguishing it from other platforms: the immutable deployment channel and the PKCS gap on wired profiles.
**Delivers:** `docs/admin-setup-8021x/04-macos.md` covering Wi-Fi + Wired, all three EAP methods.
**Key content:** Deployment channel decision (User vs Device) with WARNING callout — immutable after assignment; network interface selector for wired; PKCS-not-supported-for-wired callout; SCEP-only for wired client auth; server name required to suppress dynamic trust dialog.
**Pitfalls to avoid:** B-04 (profile type confusion), macOS deployment channel immutability, A-04 (RADIUS server cert trust).
**Research flag:** Well-documented. No additional research needed.

### Phase 104 — iOS/iPadOS Wi-Fi + Wired Admin-Setup

**Rationale:** iOS/iPadOS wired is newer (M-series iPad use case, GA confirmed). MAC randomization for NAC is iOS-specific. PKCS gap mirrors macOS wired.
**Delivers:** `docs/admin-setup-8021x/05-ios.md` covering Wi-Fi + Wired, all three EAP methods.
**Key content:** MAC address randomization — "Disable MAC address randomization: Yes" required for NAC environments (iOS 14+); PKCS-not-supported-for-wired callout; SCEP-only for wired; iOS wired targets M-series iPads with USB Ethernet; three separate Intune profiles required (trusted root + SCEP/PKCS cert + Wi-Fi/Wired); PEAP inner auth must be MS-CHAPv2 (not PAP).
**Pitfalls to avoid:** B-05 (iOS PEAP inner auth must be MS-CHAPv2), E-07 (.mobileconfig payload confusion — three separate Intune profiles, not a combined payload), A-01 (ordering), MAC randomization.
**Research flag:** Well-documented. No additional research needed.

### Phase 105 — Android Enterprise Wi-Fi + Wired Gap Stub

**Rationale:** Android has the highest number of version-gated constraints and the most distinct failure mode (Wi-Fi profile deployment fails — not just auth — if UPN absent from SAN).
**Delivers:** `docs/admin-setup-8021x/06-android.md` covering Wi-Fi (EAP-TLS + PEAP + EAP-TTLS for all AE modes: COBO/COPE/COSU/BYOD WP/AOSP), plus a wired gap stub.
**Key content:** RADIUS server name required for Android 11+ (freshness stamp); 256-char limit + no special chars on Android 14+ (freshness stamp); UPN-in-SAN required for personally-owned work profile (profile fails to deploy if absent); certificate access approval for COBO/COPE; no CHAP for EAP-TTLS inner auth; MAC randomization (Android 13+).
**Pitfalls to avoid:** B-06 (UPN in SAN), B-07 (Android 14+ char limit), B-08 (cert access approval for Device Owner), A-05 (server validation), E-03 (freshness stamps on EVERY version-gated callout).
**Research flag:** Well-documented. No additional research needed. Wired stub is a confirmed platform gap.

### Phase 106 — Linux Wi-Fi Admin-Setup (Script-Based) + Wired Gap Stub

**Rationale:** Linux has zero native Intune 802.1X or certificate profile support. The guide must prominently document the platform gap before explaining the shell-script workaround.
**Delivers:** `docs/admin-setup-8021x/07-linux.md` covering EAP-TLS via Bash script + nmcli (Wi-Fi only), plus a wired gap stub.
**Key content:** Platform constraint callout (no native Wi-Fi, wired, or cert profiles in Intune for Linux); certificate delivery must be bundled in the script or managed out-of-band; EAP-TLS only covered (PEAP/TTLS not documented in Microsoft sources — noted as out of scope with one-sentence explanation); nmcli `802-1x.*` connection parameters; verification via `nmcli connection show` + `ip addr show` + `journalctl -u NetworkManager`.
**Pitfalls to avoid:** B-09 (Linux limited MDM surface — must be the lead callout), E-01 (this is a workaround not an Intune profile), E-03 (freshness stamp — Linux Intune surface is actively developing).
**Research flag:** MEDIUM confidence. At Phase 106 plan time, verify current Linux Intune management surface against Microsoft Learn. If native profile support has been added since research date (2026-06-29), scope adjusts.

### Phase 107 — L1 Runbooks (#38-41)

**Rationale:** Runbooks cross-reference per-platform guides for config-step context; must follow all five platform guides.
**Delivers:** L1 #38 (cert failure), #39 (RADIUS reject), #40 (server trust failure), #41 (EAP negotiation failure). All four are cross-platform with per-platform inline sections gated by a "select your platform" header.
**Key content per runbook:** Symptom description -> first-check steps (check cert profile status in Intune, check RADIUS server name field, check dot3svc on Windows, check event logs) -> per-platform diagnostic commands -> escalation trigger -> what to send to L2.
**Pitfalls to avoid:** D-01 (diagnostic signal mapping — include per-platform where-to-look table); anti-pattern of creating 20 separate runbooks (4 cross-platform is correct).
**Research flag:** Standard L1 runbook pattern. No additional research needed.

### Phase 108 — L2 Runbooks (#31-33) + Decision Tree (#10)

**Rationale:** L2 runbooks require L1 runbooks for escalation-path cross-references. Decision tree routes to L1 #38-41 and requires those files to exist first.
**Delivers:** L2 #31 (cross-platform log collection — prerequisite for #32 and #33), #32 (cert investigation), #33 (RADIUS/EAP investigation), Decision tree #10 (802.1X triage).
**Key content:** Per-platform log sources (Windows Event Viewer WLAN-AutoConfig/Dot3Svc, macOS Console.app/wifi.log, iOS Intune portal + device settings, Android Intune portal + ADB logcat, Linux journalctl); "what to request from RADIUS/NPS team" section (not NPS config steps); certificate chain validation steps; EAP method mismatch diagnostics.
**Pitfalls to avoid:** E-01 (L2 runbooks request information from the RADIUS team — they do not configure RADIUS); D-01 (diagnostic signal map is the anchor for all L2 runbooks).
**Research flag:** Android ADB logcat filters and Linux journalctl unit filters are MEDIUM confidence. Verify specific filter strings at plan time.

### Phase 109 — Capability Matrices + Navigation Hubs (Integration)

**Rationale:** Capability matrix updates are append-only and derive from per-platform guide content. Navigation hubs must be last (navigation-last hard constraint); all six nav-hub files batch in this phase.
**Delivers:** 5 capability matrix updates (macos, ios, android, linux, 4-platform) + 6 nav-hub edits (docs/index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md, l1-runbooks/00-index.md, l2-runbooks/00-index.md).
**Pitfalls to avoid:** E-04 (breaking frozen surfaces — nav hub edits must be allowlisted; no edits to v1.0-v1.13 content files); E-05 (glossary and matrix integrity).
**Research flag:** Standard integration pattern. No additional research needed.

### Phase 110 — Pillars B + C (Corpus Nits + MIGFUT Migration Walkthroughs)

**Rationale:** Corpus nits (Pillar B) are small surgical edits to three pre-existing files. MIGFUT migration walkthroughs (Pillar C) are net-new docs on existing platforms. Can batch if scope is manageable; split to two phases if not.
**Delivers (Pillar B):** `docs/index.md:108` stale macOS-runbook count fix; `quick-ref-l1.md:101` L1 #36 mislabel fix; `common-issues.md:242-247` L1 #36 PSSO re-registration entry.
**Delivers (Pillar C):** iOS/iPadOS ABM "Assign Device Management" + Deadline migration walkthrough; Jamf Pro + Mosyle source-MDM-specific release steps addendum to `docs/macos-lifecycle/02-mdm-migration-psso.md`.
**Note:** Pillar B edits touch pre-existing files — must be in the harness allowlist.
**Research flag:** Pillar B is surgical text fixes — no research. Pillar C may need plan-time research on current iOS/iPadOS ABM Deadline UI path and iOS 26 version-gating status.

### Phase 111 — Pillar D Chain-Validator Tooling Refactors

**Rationale:** Tooling refactors touch the validator chain and must be isolated from content phases to preserve the byte-unchanged-invariant on predecessor frozen surfaces.
**Delivers:** `_lib/exec-fail-detail.mjs` DRY refactor (~18-21 sites); frozen-aware helper adoption sweep (~13 sites); helper-spawn stderr wrapper fixes (3 sites). WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 O(n^2) caching is a stretch candidate.
**Research flag:** Code refactors to existing validator infrastructure — no research needed. Scope discipline: if a refactor surfaces a deeper SCOPE-GAP-class discovery, route forward rather than expanding v1.14.

### Phase 112 — Pillar E: 12th Path-A Audit Harness Lineage Bump (Last, Indivisible Atom)

**Rationale:** Harness bump is always the final phase. It must be the sole deliverable of its phase — never batched with content or tooling.
**Delivers:** `v1.14-milestone-audit.mjs` (Path-A from v1.13, C1-C16 inherited) + `v1.14-audit-allowlist.json` + BASELINE_18; `check-phase-101..NN.mjs` per-phase validators; `_lib/frozen-at-close.mjs` V113 pin; 12th parallel CI coexistence workflow; 3-axis terminal re-audit close (fresh git clone + cross-OS Linux GHA + fresh zero-context sub-agent; cross-OS EXACT MATCH).
**Research flag:** Standard 12th-in-lineage Path-A bump. No research needed.

### Phase Ordering Rationale

- Foundation first: glossary and EAP concepts referenced by all per-platform guides. Authoring any platform guide before these exist violates link-not-copy.
- Windows before other platforms: most complete Intune surface; Windows guide establishes the depth template.
- macOS before iOS: macOS wired is more complex (deployment channel, interface selector, PKCS gap); iOS is similar but simpler.
- Android before Linux: Android has native Wi-Fi profiles — it follows the native-profile pattern. Linux is the most deviant and should be last so authors have internalized the "what Intune delivers" framing before writing the gap-and-workaround doc.
- L1 runbooks after all platform guides: they reference config-step context from those guides.
- L2 runbooks and decision tree after L1 runbooks: they cross-reference L1 escalation paths.
- Capability matrices and nav hubs last: navigation-last hard constraint.
- Harness bump absolutely last: sole deliverable of its phase.

**Estimated total: 12 phases (101-112).** This is at the upper bound of the ~8-12 estimate in PROJECT.md. Phase-count reduction options: batch macOS + iOS into one phase (risk: depth compression); absorb Pillar B corpus nits into Phase 109 (nav hub edits are already append-only).

### Research Flags

**Needs plan-time research (verify at authoring time):**
- Phase 106 (Linux): Current Linux Intune management surface is actively developing. Verify EAP-TLS nmcli approach is still the correct documented pattern at authoring time. Confidence MEDIUM.
- Phase 108 (L2 runbooks): Android ADB logcat filters and Linux journalctl unit filters for 802.1X are MEDIUM confidence. Verify specific filter strings at plan time.
- Phase 110 (Pillar C): iOS/iPadOS ABM "Assign Device Management" + Deadline UI path and iOS 26 version-gating status were not researched for v1.14. Research needed at Phase 110 plan time.

**Well-documented patterns (standard phases — skip research):**
- Phases 101-105: Full Microsoft Learn coverage; all settings verified.
- Phase 107 (L1 runbooks): Standard runbook pattern established across #1-37.
- Phase 109 (Integration): Standard append-only integration pattern across 13 milestones.
- Phases 111-112 (Tooling + Harness): Code refactors + Path-A lineage bump; no research needed.

---

## Open Scoping Questions for Discuss-Phase

*These are genuine gray areas where research does not resolve the question uniquely. Surface at /gsd-discuss-phase before requirements authoring.*

**Q1: Certificate delivery guides — standalone phase or absorbed into foundation?**
FEATURES.md recommends a standalone Certificate Delivery phase as an intermediate between Foundation and per-platform guides. ARCHITECTURE.md absorbs this into `02-cert-delivery-foundation.md` within the Foundation phase. The question is whether the cert delivery content is large enough to warrant its own phase or whether it fits in Phase 101. Recommendation: absorb into Phase 101; split only if that phase plan becomes too large.

**Q2: macOS + iOS/iPadOS — one phase or two?**
The two platforms share the PKCS-not-supported-for-wired constraint and SCEP-only wired pattern. Batching reduces total phase count from 12 to 11 but risks depth compression. Both platforms have meaningful distinct content (macOS: deployment channel decision; iOS: MAC randomization, M-series iPad wired use case). Recommendation: two phases (103 + 104) for depth quality; accept 12 phases total; or batch with a plan to split execution into two plan files within one phase.

**Q3: How prominent should the Android wired gap stub be?**
Options: (a) one paragraph explaining the gap; (b) a full section with explanation + alternative path note. The discuss-phase should decide whether Android Enterprise admins needing wired 802.1X are likely readers of this doc set and whether they need a longer treatment or just a clear "not available via Intune" callout.

**Q4: iOS/iPadOS wired 802.1X — full peer depth or shorter specialized section?**
The wired profile for iOS/iPadOS targets M-series iPads with USB Ethernet, primarily for shared-use scenarios. Should the guide treat iOS wired as a full peer of macOS wired, or as a shorter section with a "When to use this" callout early? Research supports full peer treatment at the Intune settings level, but the narrower hardware applicability suggests adding a use-case framing paragraph.

**Q5: Linux PEAP / EAP-TTLS — mention as theoretically possible or strictly exclude?**
PEAP and EAP-TTLS via nmcli are technically possible but not documented in Microsoft Learn or verified third-party guides for Intune-managed-fleet delivery. Options: (a) strictly exclude with "only EAP-TLS is covered"; (b) note PEAP/TTLS are possible via nmcli but not demonstrated in Intune-managed-fleet documentation and therefore out of scope. Recommendation: option (b) — one sentence; do not attempt to document undocumented patterns.

**Q6: Pillar D tooling refactors — one phase or multiple sub-phases?**
The three DRY refactors touch ~35+ sites. The question is whether they constitute one phase (111) or three phases (pushing harness bump to 114). Recommendation: one phase (111) with up to 4-5 sequential plans; split only if site count or complexity warrants it after initial plan analysis.

**Q7: Freshness stamp review cycle for version-gated 802.1X content — 90 days or 180 days?**
Version gates: Android 11+, Android 14+, iOS 14+ MAC randomization, Windows KB5014754 strong mapping. Recommendation: 90-day review cycle for Android version-gated callouts; 180-day cycle for more stable Windows callouts. Discuss-phase should confirm the project's preferred review interval.

**Q8: Should `docs/admin-setup-8021x/00-overview.md` include a "platform comparison at a glance" table?**
A quick summary table (platform x wired x Wi-Fi x EAP methods x cert types) at the entry point would let admins quickly identify which guide is relevant. Recommendation: yes — include an abbreviated version of the coverage-reality matrix above, linking to per-platform guides for each row.

---

## Confidence Assessment

| Area | Confidence | Notes |
|---|---|---|
| Stack (Intune profile types and settings per platform) | HIGH | All settings verified against Microsoft Learn; last-modified dates 2025-05-15 to 2026-06-29 |
| Features (table stakes vs differentiators vs anti-features) | HIGH | Well-established from existing doc suite patterns + Microsoft Learn content |
| Architecture (file placement, numbering, build order) | HIGH | Based on direct repo inspection; runbook numbering verified; anti-patterns verified against suite conventions |
| Pitfalls (cert, per-platform, EAP method, authoring) | HIGH for Win/macOS/iOS/Android; MEDIUM for Linux | Windows/macOS/iOS/Android pitfalls verified against Microsoft Learn. Linux surface actively developing |
| Linux EAP-TLS via script | MEDIUM | Verified against third-party keytos.io guide + nmcli docs; not against a Microsoft Learn official guide |
| Linux PEAP / EAP-TTLS via script | LOW | Not in Microsoft Learn or verified third-party guides; out of scope |

**Overall confidence: HIGH** for the four native-profile platforms. Research provides sufficient fidelity to write requirements and a roadmap without additional up-front research. Linux requires plan-time verification.

### Gaps to Address

- **Linux current Intune surface:** Actively developing. At Phase 106 plan time, verify current state of Linux Wi-Fi and cert profile support against Microsoft Learn. If native profile support has been added since research date (2026-06-29), scope adjusts.
- **L2 runbook Android ADB logcat filters:** Specific `adb logcat` filter expressions for 802.1X on Android Enterprise are not in the research. Verify at Phase 108 plan time.
- **iOS/iPadOS ABM Deadline migration (Pillar C):** Current iOS 26 version-gating for "Assign Device Management" + Deadline was not researched for v1.14. Research needed at Phase 110 plan time.
- **TEAP depth decision:** TEAP is visible in Windows wired Intune UI and unique to Windows wired. Research recommends a one-paragraph awareness note (not co-equal treatment). If the discuss-phase determines TEAP is commonly needed in the audience's environments, depth increases for Windows wired guide.

---

## Sources

### Primary (HIGH confidence — verified against Microsoft Learn)

| Source | Verified (date / doc last-modified) |
|---|---|
| Windows Wi-Fi settings reference — `ref-wifi-settings-windows` | 2026-06-29 / doc updated 2025-05-15 |
| Apple Wi-Fi settings reference — `ref-wifi-settings-apple` | 2026-06-29 / doc updated 2026-06-23 |
| Apple wired network settings reference — `ref-wired-network-settings-macos` | 2026-06-29 / doc updated 2026-06-04 |
| Windows wired network settings reference — `ref-wired-network-settings-windows` | 2026-06-29 / doc updated 2026-06-04 |
| Android Enterprise Wi-Fi settings reference — `ref-wifi-settings-android-enterprise` | 2026-06-29 / doc updated 2025-06-17 |
| Intune device profile types overview | 2026-06-29 / doc updated 2026-06-03 |
| Certificate platform support matrix — `certificates/overview` | 2026-06-29 / doc updated 2026-06-22 |
| SCEP profiles — `certificates/scep-profiles` | 2026-06-29 |
| Imported PKCS profiles — `certificates/imported-pfx-profiles` | 2026-06-29 |
| In-development features page | 2026-06-29 / doc updated 2026-06-29 |
| Context7 Intune docs | Multiple queries, 2026-06-29 |
| Direct repo inspection | 2026-06-29 — runbook/tree numbering, folder structures, harness validator pattern |

### Secondary (MEDIUM confidence)

| Source | Finding |
|---|---|
| keytos.io — Linux EAP-TLS + Intune shell script (third-party) | Linux EAP-TLS via nmcli + SCEP script delivery pattern; sole verified source for Linux approach |

### Tertiary (LOW confidence)

| Source | Finding |
|---|---|
| Community guides (StackOverflow, forums) | Referenced in PITFALLS.md as negative examples only — not used as authoritative sources |

---

*Research completed: 2026-06-29*
*Ready for roadmap: yes*
*Pillar A phases: 101-109 (9 content phases) + Pillar B/C in 110 + Pillar D in 111 + Pillar E harness bump in 112 = 12 total phases*
