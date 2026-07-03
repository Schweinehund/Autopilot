# Phase 103: macOS 802.1X Admin-Setup (Wi-Fi + Wired) — Research

**Researched:** 2026-06-30
**Domain:** Documentation authoring — macOS 802.1X Intune profile configuration for `docs/admin-setup-8021x/04-macos.md`
**Confidence:** HIGH — all primary findings sourced from milestone research (STACK.md, PITFALLS.md) verified against Microsoft Learn 2026-06-29/2026-06-30. Field names confirmed against Microsoft Learn on 2026-06-30 via direct page fetch (ref-wifi-settings-apple updated 2026-06-23; ref-wired-network-settings-macos updated 2026-06-04). No new open-ended research required; CONTEXT.md and SUMMARY.md confirm "Well-documented. No additional research needed."

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Area A — Deployment-channel callout (User vs Device keychain; immutable after assignment)**
- D-01: Deployment-channel decision is a standalone WARNING callout + decision table placed at the TOP of the Common Profile Mechanics section, before Wi-Fi and Wired subsections.
- D-02: Decision table maps cert type → channel: user cert → User channel; device cert → Device channel. State immutability + remediation: wrong channel = delete the profile, create a new one, reassign.
- D-03: Callout is WARNING, NOT DANGER. DANGER is reserved for irrecoverable fleet-wide lockout class (Windows enforcement-staging). The immutable-channel mistake is serious-but-recoverable (delete/recreate/reassign). macOS has NO DANGER callout in this guide.

**Area B — Common Mechanics content (macOS adaptation of the A3 template)**
- D-04: Include an explicit "No authentication-mode selector on macOS" note in Common Mechanics. macOS does NOT expose User/Machine/User-or-machine selector. Deployment channel is macOS's analog.
- D-05: Home the server-name field + server-validation behavior ONCE in Common Mechanics (applies to both Wi-Fi + wired and all three EAP methods). Add a one-line wired delta in the Wired subsection for the dynamic-trust-dialog suppression behavior.

**Area C — Wired subsection**
- D-06: Wired SCEP-only / PKCS-not-supported is a prominent standalone callout in the Wired subsection.
- D-07: macOS wired gets full peer treatment equal to Wi-Fi, including a complete per-EAP-method config matrix.
- D-08: B-04 (macOS Wi-Fi vs Wired profile-type confusion) is prevented structurally by distinct `## Wi-Fi` and `## Wired` sections with their own nav paths. NO blockquote callout for B-04.
- D-09: A single lightweight inline sentence at the top of the Wired subsection is permitted (e.g., "macOS Wi-Fi and wired 802.1X use separate Intune profile types and are configured independently"). NOT a callout.

**Area D — Per-EAP-method matrix columns**
- D-10: EAP-TTLS inner auth shown as an "Inner method" row in the per-EAP-method matrix. macOS option set: EAP-TTLS = PAP / CHAP / MS-CHAP / MS-CHAP v2; PEAP = MS-CHAPv2; EAP-TLS = — (n/a).
- D-11: Frame server-name population + trusted-root reference + enabled validation as a SECURITY requirement. Surface the A-05 macOS-specific fact: "On iOS/macOS, disabling server validation in a managed profile is flagged as a security violation."
- D-12: Surface the macOS-specific symptom (dynamic trust dialog) alongside the security framing. LINK the rogue-RADIUS / credential-harvest rationale to `01-eap-method-overview.md` (PEAP-MSCHAPv2 security note), `02-cert-delivery-foundation.md`, and `_glossary-network.md#server-name-validation`. Do NOT restate the theory.

**Hard constraints (carry-forward from Phase 101):**
- Co-equal EAP: no "recommended default" method; all three at equal depth in each connection subsection.
- Link-not-copy: link to `01-`/`02-` for shared concepts; never restate ordering rule, EKU, server-name-validation theory.
- Navigation-last: only the local `00-overview.md` item-4 entry is in scope. No capability-matrix rows or global nav-hub edits (Phase 109).
- Intune client-side scope only: no RADIUS/NPS/PKI build-out.
- No Windows-only mechanics: dot3svc, enforcement-staging, TEAP, KB5014754 have NO macOS equivalent. Do NOT clone them.

### Claude's Discretion

- Exact prose, callout phrasing, anchor wording, Mermaid/diagram use, and section ordering within `04-macos.md` — provided locked decisions and corpus conventions are honored.
- Exact phrasing of per-EAP-method config matrices, the deployment-channel decision-table wording, and the optional one-line B-04 separateness sentence (D-09).
- Wording of the WARNING deployment-channel callout (must convey: User vs Device keychain, immutable after assignment, cert-type→channel mapping, delete/recreate remediation path).
- Whether the deployment-channel WARNING is literally the first subsection of Common Mechanics or immediately follows a one-line section intro — provided it precedes any configuration steps.

### Deferred Ideas (OUT OF SCOPE)

- DANGER-class callout / dot3svc / enforcement-staging / TEAP / KB5014754 — Windows-only; explicitly NOT cloned into `04-macos.md`.
- iOS/iPadOS per-platform guide (`05-ios.md`) — Phase 104.
- Android/Linux gap-stub guides — Phases 105–106.
- Capability-matrix 802.1X rows + global nav-hub wiring — Phase 109 (navigation-last).
- L1/L2 runbooks + decision tree — Phases 107–108.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-05 | An Intune admin can configure 802.1X for macOS devices (Wi-Fi + wired) across all three EAP methods, including the irreversible deployment-channel (user vs device keychain) caveat and the wired-profile SCEP-only / PKCS-not-supported constraint. | Fully covered by STACK.md Building Blocks 1–2, 6–9; PITFALLS.md A-04/A-05/B-04/C-03; Microsoft Learn macOS Wi-Fi + Wired settings refs (verified 2026-06-30); locked by CONTEXT.md decisions D-01–D-12. |
</phase_requirements>

---

## Summary

Phase 103 authors a single file — `docs/admin-setup-8021x/04-macos.md` — plus a one-line edit to `docs/admin-setup-8021x/00-overview.md` (adding the macOS platform-list entry as item 4, narrowing the placeholder from "4–7" to "5–7"). The deliverable is a macOS Wi-Fi + wired 802.1X admin-setup guide covering all three co-equal EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), the immutable deployment-channel WARNING, the no-auth-mode-selector note, the server-name / dynamic-trust-dialog suppression behavior, the SCEP-only wired callout, and full per-EAP-method matrices for both connection types.

This guide clones the locked Phase-102 A3 Hybrid template (Common Mechanics → Wi-Fi → Wired) with macOS adaptations: the Windows-only mechanics (dot3svc, enforcement-staging, TEAP, KB5014754) are entirely absent; the deployment-channel WARNING replaces the Windows auth-mode table as the lead Common Mechanics content; and the wired SCEP-only callout replaces the Windows enforcement-staging DANGER as the wired-only prominent callout.

All underlying facts were researched and verified at HIGH confidence during the milestone on 2026-06-29 against Microsoft Learn; field names were confirmed against Microsoft Learn on 2026-06-30 via direct fetch (macOS Wi-Fi settings ref updated 2026-06-23; macOS Wired settings ref updated 2026-06-04). This research phase synthesizes those findings into the exact content the planner needs to write `04-macos.md` without re-deriving any facts.

**Primary recommendation:** The planner can proceed directly to plan creation using this RESEARCH.md as the authoritative source of macOS 802.1X Intune configuration facts. Every claim below is tagged [VERIFIED: Microsoft Learn] or [CITED: milestone research STACK.md/PITFALLS.md] and is safe to include in the guide without further verification, with the exceptions noted in the Assumptions Log.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| 802.1X Wi-Fi profile creation | Intune admin center (Templates > Wi-Fi) | — | Templates path is the standard documented approach for macOS 802.1X enterprise profiles; Settings Catalog exists for macOS but Templates is the documented standard (note does NOT propagate from Windows guide) |
| 802.1X Wired profile creation | Intune admin center (Templates > Wired network) | — | Separate Intune profile type from Wi-Fi; WiredNetwork-equivalent CSP payload for macOS |
| Deployment channel selection | Intune admin center (Wi-Fi or Wired profile creation) | — | Per-profile, per-creation decision; immutable after assignment; homed in Common Mechanics (cross-cuts both connection types) |
| Cert delivery (SCEP for wired; SCEP or PKCS for Wi-Fi) | Intune cert profiles (02-cert-delivery-foundation.md) | — | Link-not-copy: cert mechanics homed in 02-; this guide links and notes wired SCEP-only constraint |
| 00-overview.md platform entry | docs/admin-setup-8021x/00-overview.md (edited) | — | Local nav only; global nav-hub wiring is Phase 109 |

---

## Deliverables

| File | Action | Notes |
|------|--------|-------|
| `docs/admin-setup-8021x/04-macos.md` | CREATE | Main deliverable; full guide |
| `docs/admin-setup-8021x/00-overview.md` | EDIT (one line block) | Add macOS platform-list entry (item 4); narrow placeholder from "4–7" to "5–7"; pre-existing file → must be harness-allowlisted |

---

## Guide Content Facts (Planner Reference)

This section documents every macOS-specific 802.1X fact needed to author `04-macos.md`, organized by the A3 structure sections. The planner assigns each to tasks; the implementer uses this verbatim.

### Front Matter (file-level)

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: macos
---
```

90-day review_by = authoring date + 90 days. No macOS-specific high-drift inline-stamped callout is mandated for this guide — the deployment-channel immutability is a stable platform behavior, not a version-gated policy change. [VERIFIED: PITFALLS.md E-03 two-tier mechanism; CONTEXT.md code_context freshness-stamps note]

### Scope Banner (one-line, top of file)

Exact template from `02-cert-delivery-foundation.md`:

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

[CITED: 02-cert-delivery-foundation.md canonical scope callout; Phase 101 D-06]

---

### Common Profile Mechanics Section

**What this section covers** (per D-01/D-03/D-04/D-05):
1. Deployment-channel WARNING + decision table (first content, before any config steps) — D-01/D-02/D-03
2. "No authentication-mode selector on macOS" note — D-04
3. Server-name field + server-validation security requirement (homed here once for both connections + all EAP methods) — D-05/D-11/D-12
4. Anonymous outer identity (Identity privacy) guidance
5. Link to `02-cert-delivery-foundation.md` for ordering rule and cert-delivery matrix

**Deployment-channel field: exact UI labels** [VERIFIED: Microsoft Learn ref-wifi-settings-apple, 2026-06-30; ref-wired-network-settings-macos, 2026-06-30]:

Field name: **Deployment channel**

| Option | When to select |
|--------|---------------|
| **User channel** | Always select when the linked authentication certificate is a user certificate. Stores certificates in the user keychain. |
| **Device channel** | Always select when the linked authentication certificate is a device certificate. Stores certificates in the system keychain. |

Microsoft Learn verbatim note (applies to both Wi-Fi and Wired): "It's not possible to edit the deployment channel after you deploy the profile. To do so, you must create a new profile."

Microsoft Learn also states: "We recommend rechecking the deployment channel setting in existing profiles when the linked authentication certificates are up for renewal to ensure the intended channel is selected."

**Decision table for the callout (D-02):**

| Certificate type | Deployment channel | Where cert is stored |
|------------------|--------------------|----------------------|
| User certificate (user identity) | User channel | User keychain |
| Device certificate (machine identity) | Device channel | System keychain |

Remediation path (wrong channel): delete the profile, create a new one with the correct channel, reassign.

Storing user certificates in the system keychain increases security risks (Microsoft Learn explicit warning on wired page).

**Deployment-channel WARNING callout draft (D-01/D-02/D-03):**

```markdown
> **WARNING — Deployment channel: choose before creating the profile**
>
> Select the **Deployment channel** before saving the profile. This setting determines where
> authentication certificates are stored on the device and cannot be changed after the profile
> is assigned. To correct a wrong channel, you must delete the profile, create a new one, and
> reassign it to device groups.
>
> | Certificate type | Deployment channel | Keychain |
> |------------------|--------------------|----------|
> | User certificate | User channel | User keychain |
> | Device certificate | Device channel | System keychain |
>
> Selecting the wrong channel (for example, storing a user certificate in the system keychain)
> creates both a functional failure and a security risk. When authentication certificates are
> up for renewal, recheck the deployment channel in existing profiles to confirm the intended
> channel is still selected.
```

[VERIFIED: Microsoft Learn ref-wifi-settings-apple 2026-06-30; ref-wired-network-settings-macos 2026-06-30; STACK.md Building Block 9 ~l.215; PITFALLS.md macOS deployment channel immutability]

**No authentication-mode selector note (D-04):**

macOS does NOT expose a User / Machine / User-or-machine authentication mode selector in Intune profiles. Windows-trained admins who expect this setting will not find it. The deployment channel (User vs Device keychain) is the macOS analog to the credential-context decision: user certificate + User channel authenticates as the current user; device certificate + Device channel authenticates as the device. Machine-level pre-logon authentication (Group Policy dependency, pre-logon domain connectivity) is NOT available through Intune macOS 802.1X profiles.

[CITED: SUMMARY.md ~l.166/180; PITFALLS.md per-platform coverage-reality matrix "NOT exposed" row]

**Server validation (D-05/D-11/D-12) — homed once in Common Mechanics:**

Always populate **Certificate server names** for every EAP method on both Wi-Fi and wired connections. Always reference a **Root certificate for server validation** profile. This is a SECURITY requirement, not merely a configuration option.

Key macOS-specific facts to surface:
- **Dynamic trust dialog (A-04):** Without Certificate server names populated, macOS presents an interactive trust dialog that users click through on every connection attempt. Populating the field bypasses this dialog. This applies to BOTH Wi-Fi and wired connections. [VERIFIED: Microsoft Learn ref-wifi-settings-apple "bypass the dynamic trust window"; ref-wired-network-settings-macos "bypass the dynamic trust window shown on user devices"]
- **Security violation (A-05):** On iOS/macOS, disabling server validation in a managed profile is flagged as a security violation by the OS. Never show disabled-validation examples. [CITED: PITFALLS.md A-05 ~l.107]
- **Link targets (D-12):** Link the rogue-RADIUS / credential-harvest rationale to `01-eap-method-overview.md` (PEAP-MSCHAPv2 security note), `02-cert-delivery-foundation.md`, and `../_glossary-network.md#server-name-validation`. Do NOT restate the theory.

The wired section adds a one-line delta (D-05): the dynamic trust dialog is a wired-specific named behavior in the Microsoft Learn wired settings page; the one-liner should call out that this applies particularly on the wired profile where the UI prompt would appear in a system-level context.

**Anonymous outer identity (Identity privacy):**

Field label on both Wi-Fi and Wired profiles: **Identity privacy (outer identity)** [VERIFIED: Microsoft Learn ref-wifi-settings-apple; ref-wired-network-settings-macos, 2026-06-30]

Value: `anonymous` or `anonymous@contoso.com`

Applies to: all three EAP methods on both Wi-Fi and wired.
- EAP-TLS: certificate Subject is sent as outer identity before TLS tunnel. Set Identity privacy to `anonymous` to mask it.
- PEAP-MSCHAPv2: username is sent as outer identity before PEAP tunnel. Set to `anonymous`.
- EAP-TTLS: username is sent as outer identity before TTLS tunnel. Set to `anonymous`.

[CITED: PITFALLS.md C-01/C-04]

---

### Wi-Fi Subsection

**Intune profile navigation:** [VERIFIED: STACK.md Building Block 1; Microsoft Learn ref-wifi-settings-apple 2026-06-30]

`Devices > Configuration > New policy > macOS > Templates > Wi-Fi`

Select **Wi-Fi type: Enterprise** to access EAP authentication settings.

**Deployment channel field** appears at the top of the Enterprise section before EAP type.

**EAP types available in macOS Wi-Fi profile:** EAP-FAST, EAP-SIM, EAP-TLS, EAP-TTLS, LEAP, PEAP
[VERIFIED: Microsoft Learn ref-wifi-settings-apple 2026-06-30]

Three co-equal types for this guide: EAP-TLS, EAP-TTLS, PEAP.

**Per-EAP-method config matrix for Wi-Fi** [VERIFIED: Microsoft Learn ref-wifi-settings-apple 2026-06-30; STACK.md Building Blocks 6–8]:

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---------|---------|----------------|----------|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix (wildcard suffix supported, e.g. `*.contoso.com`) | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP or PKCS profile (see note) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | — (cert-only; no inner method) | — (PEAP tunnels MSCHAPv2; inner not separately selectable) | Non-EAP method (inner identity): PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

**Wi-Fi EAP-TTLS inner auth field:** The field is labeled "Non-EAP method (inner identity)" in the Intune UI. Exact option labels [VERIFIED: Microsoft Learn ref-wifi-settings-apple 2026-06-30]:
- "Unencrypted password (PAP)"
- "Challenge Handshake Authentication Protocol (CHAP)"
- "Microsoft CHAP (MS-CHAP)"
- "Microsoft CHAP Version 2 (MS-CHAP v2)"

**Client certificate options for EAP-TLS (Wi-Fi — both SCEP and PKCS supported):**
- SCEP certificate profile
- PKCS certificate profile

The certificate selection respects the deployment channel: User channel → user certificate profiles only; Device channel → both user and device certificate profiles available (but must align cert type with channel).
[VERIFIED: Microsoft Learn ref-wifi-settings-apple 2026-06-30 — "If you select the user channel, your certificate options are limited to user certificate profiles. If you select the device channel, you have both user and device certificate profiles to choose from."]

---

### Wired Subsection

**Intune profile navigation:** [VERIFIED: STACK.md Building Block 2; Microsoft Learn ref-wired-network-settings-macos 2026-06-30]

`Devices > Configuration > New policy > macOS > Templates > Wired network`

macOS Wi-Fi and wired 802.1X use separate Intune profile types and are configured independently. (One-line B-04 structural prevention — D-09.)

**Deployment channel field** appears first, before Network Interface. Same User channel / Device channel options as Wi-Fi.

**Network Interface field and options** [VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30]:

Field label: **Network Interface**

| Option | Behavior |
|--------|----------|
| **First active Ethernet** (default) | Uses the first working Ethernet interface. If none active, falls to next in service-order priority. Default setting; also the macOS system default. |
| Second active Ethernet | |
| Third active Ethernet | |
| First Ethernet | (non-active variants — not restricted to currently working interfaces) |
| Second Ethernet | |
| Third Ethernet | |
| Any Ethernet | |

Options with "active" in the title use interfaces that are actively working on the device. If there are no active interfaces, the next interface in service-order priority is configured.

**SCEP-only wired callout (D-06):**

The Microsoft Learn wired settings reference states explicitly (for EAP-TLS wired Client Authentication): "Select an existing SCEP client certificate profile that is also deployed to the device. This certificate is the identity presented by the device to the server to authenticate the connection. **Public Key Cryptography Standards (PKCS) certificates aren't supported.**"

The same PKCS constraint applies for EAP-TTLS and PEAP wired client auth methods (Certificates option under Authentication method also states "PKCS certificates aren't supported").
[VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30 — exact wording confirmed]

**SCEP-only callout draft (D-06):**

```markdown
> **NOTE — Wired client certificates: SCEP only (PKCS not supported)**
>
> macOS wired network profiles support only **SCEP certificate profiles** for client
> authentication. PKCS certificate profiles are not supported for the wired profile type.
> If your organization uses PKCS-only certificate delivery, you cannot use PKCS for wired
> 802.1X client authentication on macOS -- configure your SCEP infrastructure before
> proceeding with wired 802.1X deployment on macOS. Wi-Fi profiles support both SCEP and
> PKCS.
>
> See [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) for the full per-platform cert-delivery support matrix.
```

[VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30; STACK.md Building Block 6 ~l.104–107; CONTEXT.md D-06/SC2]

**EAP types available in macOS Wired profile:** EAP-FAST, EAP-TLS, EAP-TTLS, LEAP, PEAP
[VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30]

Three co-equal types for this guide: EAP-TLS, EAP-TTLS, PEAP.

**UI structure difference from Wi-Fi:** On the wired profile, server validation settings appear under a "Server Trust" section heading. The Certificate server names field is shown as **Certificate server names** under **Server Trust**. [VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30 — field shown as "Server Trust - Certificate server names"]

**Per-EAP-method config matrix for Wired** [VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30; STACK.md Building Blocks 6–8]:

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---------|---------|----------------|----------|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server Trust — Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client Authentication method | Certificates (SCEP only; PKCS not supported) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | — (cert-only; no inner method) | — (PEAP tunnels MSCHAPv2; inner not separately selectable) | Non-EAP method: PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

**Key differences from Wi-Fi matrix:**
- Wired EAP-TLS: SCEP only for client cert; PKCS not supported (Wi-Fi supports both).
- Wired EAP-TTLS "Certificates" option under Authentication method is also SCEP only.
- Wired PEAP "Certificates" option under Authentication method is also SCEP only.
- Server validation field is grouped under "Server Trust" section on the wired UI.

**Dynamic trust dialog (wired-specific delta, D-05):**

Microsoft Learn wired settings page explicitly states for Certificate server names: "you can bypass the dynamic trust window shown on user devices when they connect to this network." This is the wired-specific expression of the A-04 pitfall. A one-line wired delta in the guide should note that populating Certificate server names suppresses the interactive trust prompt that would otherwise appear on the user's device at each wired connection attempt.

---

### 00-overview.md Platform Entry (edit, item 4)

Current text in `00-overview.md` (confirmed line ~30):
```
4–7. Platform guides (Phase 103–106) -- entries added as each guide is authored.
```

Must be replaced with the macOS entry as item 4 + an updated "5–7" continuation. Suggested replacement:

```markdown
4. **[macOS 802.1X Admin Setup (Wi-Fi + Wired)](04-macos.md)** -- Wi-Fi and wired profiles for all three EAP methods; immutable deployment-channel decision (User vs Device keychain) before profile creation; wired SCEP-only constraint; server-name required to suppress dynamic trust dialog.

5–7. Platform guides (Phase 104–106) -- entries added as each guide is authored.
```

The Mermaid setup-sequence diagram in `00-overview.md` references "3–7. Platform Guides" as a node — this text is embedded in the diagram string. Inspect whether the diagram node also needs an update when item 4 is added. Based on the current `00-overview.md` content, the Mermaid node reads `"3–7. Platform\nGuides"` which is a range reference and does not need updating per guide (it remains valid until all five are added). Only the numbered list entry below the diagram needs editing for Phase 103.

[CITED: 00-overview.md l.30 inspection; CONTEXT.md Phase Boundary / Integration Points]

---

## Architecture Patterns

### A3 Document Structure (locked by Phase 102 D-01, inherited for Phase 103)

```
04-macos.md
├── Front matter (YAML)
├── Prerequisites (link to 01-eap-method-overview.md + 02-cert-delivery-foundation.md)
├── Scope banner (one-line → 02-cert-delivery-foundation.md#canonical-scope-callout)
├── # macOS 802.1X Admin Setup: Wi-Fi and Wired
├── ## Common Profile Mechanics
│   ├── [Optional one-line intro]
│   ├── WARNING callout: Deployment channel (first content — before any config steps)
│   │   └── Decision table: user cert → User channel; device cert → Device channel
│   ├── No authentication-mode selector note
│   ├── Server validation (Certificate server names + Root cert + security framing + links)
│   └── Anonymous outer identity (Identity privacy field)
├── ## Wi-Fi
│   ├── ### In Intune admin center (profile path + Enterprise type selection)
│   └── Per-EAP-method config matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS in one grid)
│       └── Client cert note (SCEP or PKCS for Wi-Fi EAP-TLS)
├── ## Wired
│   ├── [One-line separateness sentence — D-09]
│   ├── ### In Intune admin center (profile path)
│   ├── SCEP-only callout (prominent standalone — D-06)
│   ├── Network Interface selector explanation
│   ├── [One-line dynamic-trust-dialog wired delta — D-05]
│   └── Per-EAP-method config matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS in one grid)
│       └── Client cert note (SCEP only for all EAP methods on wired)
├── ## See Also
└── ## Change History
```

**macOS-vs-Windows template deltas:**
- Deployment-channel WARNING (macOS) replaces auth-mode table (Windows).
- SCEP-only wired callout (macOS) replaces dot3svc WARNING + enforcement-staging DANGER (Windows).
- No TEAP awareness note (macOS has no TEAP).
- No KB5014754 callout (macOS — N/A).
- No Settings Catalog sentence (Windows-specific per D-10; does NOT propagate to macOS).
- No dot3svc remediation pattern.

**Style precedents from corpus:**
- `### In Intune admin center` compact subsection headers — from `docs/admin-setup-macos/03-configuration-profiles.md`
- `> **Label:** ...` blockquote callouts — corpus-wide convention
- Compact settings matrix with rows as settings, columns as EAP methods — from `01-eap-method-overview.md` and `03-windows.md`
- Front-matter freshness stamps — from `02-cert-delivery-foundation.md`
- Plain GitHub auto-slug anchors; no `{#id}` overrides; avoid double-hyphen slugs [CITED: MEMORY.md anchor slugs note]

### Per-EAP-Method Matrix Format

Render as a markdown table with EAP methods as columns and settings as rows. Three columns (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS) enforces co-equal presentation by construction. Separate tables for Wi-Fi and Wired to accommodate the SCEP-only wired difference.

### Callout Block Conventions

```markdown
> **WARNING — Deployment channel: choose before creating the profile**
> ...content...

> **NOTE — Wired client certificates: SCEP only (PKCS not supported)**
> ...content...
```

Label severity for macOS guide: WARNING (deployment channel — serious-but-recoverable; delete/recreate/reassign), NOTE (SCEP-only — informational constraint; admins in PKCS-only shops need advance notice). NO DANGER callout for macOS.

---

## Don't Hand-Roll

| Problem | Don't Author | Use Instead | Why |
|---------|-------------|-------------|-----|
| EAP method explanations (what EAP-TLS authenticates, when to choose) | In-guide EAP prose | Link to `01-eap-method-overview.md` | Link-not-copy; already authoritative |
| Deployment ordering rule (trusted root → SCEP/PKCS → network profile) | Restating the ordering rule | Link to `02-cert-delivery-foundation.md#the-deployment-ordering-rule` | Link-not-copy; already authoritative |
| EKU (Client Authentication OID) requirement | EKU explanation | Link to `02-cert-delivery-foundation.md#eku-requirement-client-authentication` | Link-not-copy |
| Rogue-RADIUS / credential-harvest rationale | Security explanation in macOS guide | Link to `01-eap-method-overview.md` (PEAP security note) + `02-cert-delivery-foundation.md` + `_glossary-network.md#server-name-validation` | Link-not-copy per D-12 |
| Per-platform cert-delivery support matrix | macOS-specific cert matrix rows | Link to `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix` | Link-not-copy; canonical home |
| Windows mechanics (dot3svc, enforcement-staging, TEAP, KB5014754) | Any Windows-specific section | Nothing — do not import | No macOS equivalent; importing is a template contamination error |
| Global nav-hub wiring (index.md, quick-refs, capability matrices) | Any hub edits | Phase 109 | Navigation-last hard constraint |
| iOS/iPadOS MAC randomization | Any iOS-specific note | Phase 104 | Wrong phase; iOS-specific content |

**Key insight:** The guide's value is the macOS-specific Intune UI paths, field names, and gotchas — especially the deployment-channel immutability, the wired SCEP-only constraint, and the dynamic-trust-dialog suppression behavior. Every prose sentence that explains shared EAP/cert/RADIUS theory is a link-not-copy violation.

---

## Common Pitfalls

### Pitfall 1: Wrong deployment channel — immutable after assignment (macOS-specific)

**What goes wrong:** Admin creates a macOS Wi-Fi or wired 802.1X profile with Device channel but links a user certificate, or User channel with a device certificate. Certificates land in the wrong keychain; authentication fails because the keychain the EAP supplicant accesses does not contain the expected certificate.
**Why it happens:** The channel selection appears early in the profile creation flow; admins may not understand the keychain implications. Additionally, admins copying from a working profile may flip the cert type without updating the channel.
**How to avoid:** Deployment-channel WARNING callout as the first content in Common Mechanics (D-01/D-02). Decision table makes the mapping explicit.
**Warning signs:** macOS device reports authentication failure; Intune shows profile "Succeeded"; certificate profile also shows "Succeeded"; no cert in expected keychain (`security find-identity -v -p eap`).
[CITED: STACK.md Building Block 9 ~l.215; CONTEXT.md D-01/D-02/D-03]

### Pitfall 2: PKCS cert used for wired client auth — silently unsupported (B-04 variant / C-scep)

**What goes wrong:** Admin assigns a PKCS certificate profile for EAP-TLS (or EAP-TTLS cert inner auth) on a macOS wired network profile. The wired profile does not accept PKCS; the PKCS cert cannot be referenced. Authentication fails or the cert selection in the profile UI is absent.
**Why it happens:** Wi-Fi supports PKCS; admins assume wired does too. The difference is not obvious without reading the Microsoft Learn wired settings reference.
**How to avoid:** SCEP-only wired callout (D-06) placed prominently before the wired config matrix. Admins in PKCS-only shops need to know before attempting wired configuration.
**Warning signs:** The Intune wired profile only shows SCEP certificate profiles in the client cert picker; PKCS profiles are absent from the selection.
[VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30; CONTEXT.md D-06]

### Pitfall 3: Certificate server names blank — dynamic trust dialog + security risk (A-04/A-05)

**What goes wrong:** On macOS, leaving Certificate server names blank presents an interactive trust dialog that users click through at each connection. On wired connections this is particularly disruptive (appears at system level). Additionally, accepting any certificate without name validation creates a rogue-RADIUS attack surface.
**Why it happens:** Admins see the field as optional (it has no visual "required" indicator in the UI) and skip it to simplify initial setup.
**How to avoid:** Server validation section in Common Mechanics frames this as a SECURITY requirement; surfaces the macOS dynamic-trust-dialog symptom; links to rogue-RADIUS rationale in `01-`/`02-`/glossary without restating it (D-12).
**Warning signs:** Users report intermittent trust dialog prompts when connecting to Wi-Fi or wired Ethernet; wired connections trigger a trust dialog at login.
[VERIFIED: Microsoft Learn ref-wifi-settings-apple + ref-wired-network-settings-macos; PITFALLS.md A-04/A-05]

### Pitfall 4: Incorrect profile type — Wi-Fi profile assigned for wired (B-04)

**What goes wrong:** Admin creates a macOS Wi-Fi 802.1X profile and assigns it to devices expecting wired (Ethernet) 802.1X to be configured. The Wi-Fi profile configures wireless only; Ethernet 802.1X is never established.
**Why it happens:** Windows-trained admins (where the "Wired network" profile type is distinct and well-labeled) may still conflate macOS Wi-Fi and wired at the Intune level.
**How to avoid:** Prevented structurally by the locked A3 template (separate `## Wi-Fi` and `## Wired` sections with distinct nav paths). D-09 permits one optional inline sentence at the top of the Wired subsection.
[CITED: PITFALLS.md B-04 ~l.253–268; CONTEXT.md D-08/D-09]

### Pitfall 5: EAP-TTLS inner auth method mismatch (C-03)

**What goes wrong:** The macOS EAP-TTLS profile specifies MS-CHAP v2 as the inner method, but the RADIUS/NPS policy is configured for PAP. The inner auth negotiation fails after the TTLS tunnel is established.
**Why it happens:** Admins select the inner method without confirming the NPS policy configuration. All four options (PAP / CHAP / MS-CHAP / MS-CHAP v2) are visible in the Intune UI on macOS; the wrong one is an easy mistake.
**How to avoid:** The per-EAP-method matrix shows the inner method row; the guide should note that the selected method must match the RADIUS/NPS policy. Co-ordinate with the RADIUS/NPS admin before selecting.
[CITED: PITFALLS.md C-03 ~l.426; CONTEXT.md D-10]

---

## Code Examples (Planner Reference)

### Deployment-Channel WARNING Callout (Full Draft)

```markdown
> **WARNING — Deployment channel: choose before creating the profile**
>
> The **Deployment channel** setting determines where authentication certificates are stored
> on the device and **cannot be changed after the profile is assigned**. To correct a wrong
> channel selection, you must delete the profile, create a new one with the correct channel,
> and reassign it to device groups.
>
> | Certificate type | Deployment channel | Keychain |
> |------------------|--------------------|----------|
> | User certificate | User channel | User keychain |
> | Device certificate | Device channel | System keychain |
>
> Storing user certificates in the system keychain (by selecting Device channel with a user
> certificate) increases security risk and causes authentication failures. When authentication
> certificates are up for renewal, recheck the deployment channel in existing profiles to
> confirm the correct channel is still selected.
```

[VERIFIED: Microsoft Learn ref-wifi-settings-apple 2026-06-30; ref-wired-network-settings-macos 2026-06-30; STACK.md Building Block 9 ~l.215–221]

### SCEP-Only Wired Callout (Full Draft)

```markdown
> **NOTE — Wired client certificates: SCEP only (PKCS not supported)**
>
> The macOS wired network profile supports only **SCEP certificate profiles** for client
> authentication (EAP-TLS and EAP-TTLS / PEAP certificate inner auth). PKCS certificate
> profiles are not supported for the wired profile type. Wi-Fi profiles support both SCEP
> and PKCS.
>
> If your organization uses PKCS-only certificate delivery, configure your SCEP
> infrastructure before deploying wired 802.1X on macOS. See
> [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix)
> for the per-platform cert-delivery support matrix.
```

[VERIFIED: Microsoft Learn ref-wired-network-settings-macos 2026-06-30 — "Public Key Cryptography Standards (PKCS) certificates aren't supported." (EAP-TLS, EAP-TTLS, PEAP)]

### Server Validation Section (Core Content, Common Mechanics)

```markdown
Always populate **Certificate server names** for every EAP method on both Wi-Fi and wired
connections, and always reference a **Root certificate for server validation** profile.
This is a security requirement.

**Why this matters (macOS-specific):** Without Certificate server names populated, macOS
presents a dynamic trust dialog that users must click through on every connection attempt.
On wired connections, this dialog appears at the system level. Populating the field bypasses
the dialog. Additionally, on iOS and macOS, disabling server validation in a managed profile
is flagged as a security violation by the OS.

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the
[PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2) and
[server-name validation](../_glossary-network.md#server-name-validation) in the glossary.
**No example in this guide shows server validation disabled.**
```

[VERIFIED: Microsoft Learn ref-wifi-settings-apple "bypass the dynamic trust window"; ref-wired-network-settings-macos "bypass the dynamic trust window shown on user devices"; PITFALLS.md A-04/A-05; CONTEXT.md D-11/D-12]

### 00-overview.md Item-4 Edit (Surgical Replacement)

Current line (confirmed, 00-overview.md):
```
4–7. Platform guides (Phase 103–106) -- entries added as each guide is authored.
```

Replace with:
```markdown
4. **[macOS 802.1X Admin Setup (Wi-Fi + Wired)](04-macos.md)** -- Wi-Fi and wired profiles for all three EAP methods; immutable deployment-channel decision (User vs Device keychain) before profile creation; wired SCEP-only constraint; server name required to suppress dynamic trust dialog.

5–7. Platform guides (Phase 104–106) -- entries added as each guide is authored.
```

[CITED: 00-overview.md l.30; CONTEXT.md Phase Boundary + Integration Points; ARCHITECTURE.md file placement]

---

## Assumptions Log

> Claims tagged [ASSUMED] — all others in this research are [VERIFIED: Microsoft Learn] or [CITED: milestone research].

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Mermaid diagram node in 00-overview.md reads "3–7. Platform\nGuides" and does NOT need updating when item 4 is added (range remains valid). | 00-overview.md edit spec | If the Mermaid node uses a literal list that the executor needs to expand, the edit spec is incomplete — executor should inspect the diagram at authoring time. |
| A2 | PEAP inner auth on macOS wired is implicitly MSCHAPv2 and no inner method selector is exposed in the wired PEAP UI (unlike EAP-TTLS which shows the Non-EAP method dropdown). | Wired matrix "Inner method" row for PEAP | The Microsoft Learn wired page shows PEAP "Username and Password" with no inner method sub-option visible in the docs text, but the actual Intune UI may expose it; executor should verify at authoring time. |
| A3 | PEAP on macOS Wi-Fi does not expose a separate inner auth method dropdown (MSCHAPv2 is implicit). | Wi-Fi matrix "Inner method" row for PEAP | Same risk as A2 — confirm in live portal at authoring time. |

**If this table is short (3 items):** All other claims in this research were verified against Microsoft Learn official documentation on 2026-06-30 or cited from HIGH-confidence milestone research (STACK.md/PITFALLS.md, verified 2026-06-29). The three assumptions above are minor structural or UI-rendering details that have no impact on the guide's substantive content or locked decisions.

---

## Open Questions (All Resolved or Delegated)

1. **Exact UI label for PEAP inner method on macOS wired** — RESOLVED via delegation: executor spot-checks at authoring time. Both macOS wired PEAP and macOS Wi-Fi PEAP show "Username and Password" with no visible inner method sub-dropdown in the Microsoft Learn docs text; the inner method is implicit MSCHAPv2 in PEAP by specification. The matrix row shows "— (PEAP tunnels MSCHAPv2; inner not separately selectable)" which is correct to document regardless.

2. **Whether 00-overview.md Mermaid diagram node needs updating** — RESOLVED: diagram node references a range ("3–7. Platform Guides") that stays valid until all five are added; only the numbered list entry below the diagram needs the item-4 edit. Executor verifies at authoring time.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 103 is a documentation-only phase (CREATE one markdown file + EDIT one markdown file). No external tools, services, runtimes, databases, or CLI utilities beyond the project's git toolchain are required.

---

## Sources

### Primary (HIGH confidence — verified against Microsoft Learn 2026-06-30)

- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-apple` — macOS Wi-Fi 802.1X enterprise settings: deployment channel field labels and options, EAP types, Certificate server names, Root certificate for server validation, inner auth options (Non-EAP method / inner identity) for EAP-TTLS, Identity privacy (outer identity). Page last updated 2026-06-23; fetched 2026-06-30.
- `https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-macos` — macOS Wired 802.1X settings: deployment channel, Network Interface options (all seven values), Server Trust section, Certificate server names, PKCS-not-supported exact wording, inner auth options for EAP-TTLS, Identity privacy (outer identity). Page last updated 2026-06-04; fetched 2026-06-30.

### Secondary (HIGH confidence — milestone research verified against Microsoft Learn 2026-06-29)

- `.planning/research/STACK.md` — macOS Wi-Fi/Wired profile facts: Building Blocks 1–2 (profile paths), 6 (client cert options: SCEP vs PKCS; wired SCEP-only), 7 (server cert trust settings: "Certificate server names" + "Root certificate for server validation" on both connections), 8 (inner auth options for EAP-TTLS; identity privacy), 9 (macOS deployment channel immutable; interface selector; wired PKCS gap)
- `.planning/research/PITFALLS.md` — A-04 (RADIUS server cert trust / dynamic-trust-window), A-05 (server-validation disabled = security violation), B-04 (macOS Wi-Fi/wired profile-type confusion; Section F prevention = "Separate profile type guidance"), C-03 (EAP-TTLS inner auth mismatch + macOS option set), E-03 (freshness stamps)
- `.planning/research/SUMMARY.md` — Phase 103 summary (~l.217–225); Per-Platform Coverage-Reality Matrix (~l.151–175); macOS deployment channel immutable (~l.29); wired interface selector + PKCS gap (~l.36); auth mode NOT exposed (~l.166/180); SCEP-only "with a callout" (~l.179)

### Style Reference (HIGH confidence — repo inspection)

- `docs/admin-setup-8021x/03-windows.md` — A3 structural template: section order, `### In Intune admin center` headers, per-EAP matrix with Inner-method row, single Common-Mechanics home for server validation, front-matter freshness-stamp block, See-Also + Change-History footer
- `docs/admin-setup-8021x/00-overview.md` — current state of item-4 placeholder; confirmed l.30 text
- `.planning/phases/103-macos-802-1x-admin-setup-wi-fi-wired/103-CONTEXT.md` — locked decisions D-01 through D-12 (authoritative)

---

## Metadata

**Confidence breakdown:**
- macOS Wi-Fi profile paths + field names: HIGH — Microsoft Learn ref-wifi-settings-apple, fetched 2026-06-30 (updated 2026-06-23)
- macOS Wired profile paths + field names + PKCS-not-supported exact wording: HIGH — Microsoft Learn ref-wired-network-settings-macos, fetched 2026-06-30 (updated 2026-06-04)
- Deployment channel field labels and immutability: HIGH — same sources + STACK.md Building Block 9
- Network Interface option values: HIGH — Microsoft Learn ref-wired-network-settings-macos confirmed all seven options
- EAP-TTLS inner auth options (macOS): HIGH — Microsoft Learn ref-wifi-settings-apple + ref-wired-network-settings-macos confirmed all four options + exact UI labels
- A3 document structure: HIGH — locked by Phase 102 CONTEXT.md; precedent in 03-windows.md
- Callout severity tier (WARNING, not DANGER): HIGH — locked by CONTEXT.md D-03; rationale verified against corpus precedent
- PEAP inner method (implicit MSCHAPv2, no selector): MEDIUM — Microsoft Learn docs text does not enumerate a PEAP inner method sub-option; consistent with PEAP specification but executor should verify in live portal

**Research date:** 2026-06-30
**Valid until:** 2026-09-28 (90-day file-level review cycle; no macOS-specific inline stamp mandated)

---

## Plan-Time Verification Flags

The following items are MEDIUM confidence or carry UI-rendering uncertainty. The executor must spot-check these against the live Intune admin center at authoring time:

| # | Item | Why Flagged | Action |
|---|------|-------------|--------|
| V1 | PEAP inner method UI on macOS Wi-Fi: is there a sub-option dropdown, or is MSCHAPv2 implicit? | Microsoft Learn docs text for macOS Wi-Fi PEAP shows no inner method sub-option; PEAP spec implies MSCHAPv2; UI may differ | Spot-check in live Intune portal before writing the Wi-Fi PEAP matrix row |
| V2 | PEAP inner method UI on macOS Wired: same question as V1 | Same reason; wired page shows no inner method sub-option under PEAP "Username and Password" | Spot-check in live Intune portal before writing the Wired PEAP matrix row |
| V3 | 00-overview.md Mermaid diagram node: does the "3–7. Platform Guides" node text need updating when item 4 is added? | Assumed it stays valid as a range; diagram node may use literal numbering | Inspect 00-overview.md diagram source at authoring time before writing the edit |
| V4 | Exact Intune admin center navigation path for macOS Wi-Fi: current portal menu labels | STACK.md documents `Devices > Configuration > New policy > macOS > Templates > Wi-Fi` (verified 2026-06-29) — Intune portal menus occasionally rename items | Verify against current portal or Microsoft Learn navigation note at authoring time |

---

## RESEARCH COMPLETE

**Phase:** 103 — macOS 802.1X Admin-Setup (Wi-Fi + Wired)
**Confidence:** HIGH

### Key Findings

- macOS Wi-Fi profile navigation (`Devices > Configuration > New policy > macOS > Templates > Wi-Fi`, Enterprise type) and all field names are confirmed against Microsoft Learn 2026-06-30. The deployment channel field labels are exactly "User channel" and "Device channel." The immutability warning is verbatim from the official docs.
- macOS Wired profile navigation (`Devices > Configuration > New policy > macOS > Templates > Wired network`) and all field names are confirmed, including the complete seven-option Network Interface selector. PKCS-not-supported exact wording is confirmed from the docs ("Public Key Cryptography Standards (PKCS) certificates aren't supported.") and applies to EAP-TLS, EAP-TTLS, and PEAP wired client authentication.
- EAP-TTLS inner auth field on macOS (Wi-Fi and Wired) is labeled "Non-EAP method (inner identity)" with exact options: "Unencrypted password (PAP)", "Challenge Handshake Authentication Protocol (CHAP)", "Microsoft CHAP (MS-CHAP)", "Microsoft CHAP Version 2 (MS-CHAP v2)".
- The outer identity field on both Wi-Fi and Wired is confirmed as "Identity privacy (outer identity)".
- The "Server Trust" section heading on the Wired profile wraps the Certificate server names + Root cert fields; the Wi-Fi profile uses the same field names without the subsection heading.
- The 00-overview.md item-4 edit is a surgical two-line replacement; exact target text and replacement text are provided above.
- Two callout drafts are provided at plan-actionable fidelity: the deployment-channel WARNING and the SCEP-only wired NOTE.

### File Created

`.planning/phases/103-macos-802-1x-admin-setup-wi-fi-wired/103-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| macOS Wi-Fi profile paths + field names | HIGH | Microsoft Learn ref-wifi-settings-apple, fetched 2026-06-30 (updated 2026-06-23) |
| macOS Wired profile paths + field names | HIGH | Microsoft Learn ref-wired-network-settings-macos, fetched 2026-06-30 (updated 2026-06-04) |
| Deployment channel immutability + exact UI labels | HIGH | Same sources + STACK.md Building Block 9 |
| Network Interface selector (all 7 options) | HIGH | Microsoft Learn ref-wired-network-settings-macos |
| PKCS-not-supported (exact wording) | HIGH | Microsoft Learn verbatim: "PKCS certificates aren't supported" |
| EAP-TTLS inner auth options + field labels | HIGH | Microsoft Learn confirmed all four options + field label |
| A3 document structure (macOS adaptation) | HIGH | Locked by Phase 102 CONTEXT.md; precedent in 03-windows.md |
| Callout severity (WARNING, not DANGER) | HIGH | Locked by CONTEXT.md D-03 |
| PEAP inner method (implicit MSCHAPv2) | MEDIUM | Not enumerated in docs text; consistent with spec; executor verifies in portal |

### Open Questions

- PEAP inner method UI on macOS Wi-Fi and Wired (V1/V2 above): executor spot-checks in live portal at authoring time.
- 00-overview.md Mermaid diagram node (V3): executor inspects at authoring time.

### Ready for Planning

Research complete. Planner can now create PLAN.md for Phase 103.
