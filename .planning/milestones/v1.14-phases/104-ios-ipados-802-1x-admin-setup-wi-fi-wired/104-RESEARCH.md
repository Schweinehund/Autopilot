# Phase 104: iOS/iPadOS 802.1X Admin-Setup (Wi-Fi + Wired) — Research

**Researched:** 2026-06-30
**Domain:** iOS/iPadOS 802.1X profile authoring — Intune admin-setup documentation (Phase 104, DOT1X-06)
**Confidence:** HIGH — all iOS-specific facts re-verified live against Microsoft Learn on 2026-06-30; live verification supersedes prior corpus entries where they differ.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All twelve sub-decisions were resolved via three-agent adversarial review (Finder → Adversary → Referee, Opus). No overturns. All 12 are HIGH or MEDIUM confidence. Treated as non-negotiable by the planner.

**Area A — MAC-address randomization**
- **D-01:** MAC-randomization control lives in the **Wi-Fi subsection only**, not in Common Mechanics. It is a per-Wi-Fi-profile setting; iOS wired binds to "Any Ethernet" with no MAC control.
- **D-02:** MAC randomization is a **prominent plain-prose note** in the Wi-Fi subsection — NOT a `> **Label:**` blockquote callout. "Plain note" ≠ buried — it must be prominent prose, lead with the D-04 phrasing, and carry the iOS-14+ freshness stamp.
- **D-03:** State explicitly that MAC randomization does not apply to wired — iOS wired 802.1X presents the USB-Ethernet adapter's physical MAC.
- **D-04:** Canonical phrasing: **"Disable MAC address randomization: Yes"** (live-verified on MS Learn 2026-06-30 — real UI label; do not reproduce the STACK ~l.226 alternative which is internally contradictory). Keep any "verify in current Intune" hedge light; the label was confirmed accurate as of 2026-06-30.

**Area B — Three-separate-profiles model**
- **D-05:** Three-separate-profiles model conveyed in **structural prose — no blockquote callout, no Mermaid diagram.**
- **D-06:** Home three-profiles framing in **Common Mechanics** (cross-cutting: applies to both Wi-Fi and Wired).
- **D-07:** **LINK** cert-delivery-ordering rule to `02-cert-delivery-foundation.md`. State only the iOS-specific delta: three distinct Intune profiles (trusted root + SCEP/PKCS client cert + Wi-Fi/Wired); no combined `.mobileconfig`; no Apple Configurator — Intune-managed-fleet only.

**Area C — M-series iPad wired depth**
- **D-08:** iOS wired gets **full-peer treatment equal to Wi-Fi**, including a complete per-EAP-method config matrix. Matrix collapse reserved for gap platforms (Android/Linux) only.
- **D-09:** Add a **"When to use this" use-case paragraph** at the top of the Wired subsection — M-series iPads with a USB-Ethernet adapter, for multi-iPad shared-use scenarios.

**Area D — PEAP inner-auth = MS-CHAPv2 (B-05)**
- **D-10:** PEAP-inner-auth constraint is a **standalone "What breaks" WARNING blockquote callout** in the Wi-Fi PEAP context.
- **D-11:** Place the B-05 WARNING callout in the **Wi-Fi PEAP context, not Common Mechanics** (PEAP-inner is method-specific, not cross-method). Add a one-line cross-reference in the wired matrix's PEAP section. *(See Live Verification §4 — the iOS wired Intune UI exposes SCEP Certificates as the client auth for wired PEAP, not Username+Password/MS-CHAPv2. The cross-reference is still advisable but the wired PEAP cell description must reflect what the wired UI actually shows.)*
- **D-12:** Per-EAP Inner-method row differentiates: EAP-TLS = — (cert-only, n/a); PEAP = MS-CHAPv2 only (not PAP) on Wi-Fi; EAP-TTLS (Wi-Fi) = PAP / CHAP / MS-CHAP / MS-CHAP v2. iOS wired EAP-TTLS inner-method cell **MUST be hedged** (not cloned from Wi-Fi) — STACK ~l.167 / live 2026-06-30 verification (see §4 below).

**Hard constraints (non-negotiable, inherited from Phase 101/102):**
- A3 template locked (Common Mechanics → Wi-Fi → Wired; per-EAP matrix in each connection subsection)
- Link-not-copy (shared concepts live in `01-`/`02-`; this guide links, never restates)
- Co-equal EAP (no recommended default; all three methods at equal depth)
- Navigation-last (capability-matrix rows + global nav-hub = Phase 109; only `00-overview.md` item-5 is in scope here)
- Intune client-side scope only
- 90-day freshness stamps (file front-matter + iOS-14+ MAC-randomization note)
- Callout discipline: only B-05 WARNING and wired SCEP-only NOTE are research-prescribed callouts for this guide; MAC randomization (D-02) and three-profiles model (D-05) are structural prose, not callouts; no DANGER callout; no macOS deployment-channel WARNING analog

### Claude's Discretion

- Exact prose, callout phrasing/labels, anchor wording, section ordering within `05-ios.md` — provided locked decisions and corpus conventions are honored
- Exact phrasing of the per-EAP-method config matrices, the three-profiles prose, the MAC-randomization note, the "When to use this" wired use-case paragraph, and the B-05 "What breaks" callout
- The exact WARNING label/wording for the B-05 callout (must convey: iOS PEAP inner auth MUST be MS-CHAPv2, PAP fails on iOS unlike Windows/macOS, symptom = "Authentication Failed")
- Whether the MAC-randomization note precedes or follows the Wi-Fi per-EAP matrix — provided it is prominent and freshness-stamped

### Deferred Ideas (OUT OF SCOPE)

- macOS-only deployment-channel (User/Device keychain) mechanics — Phase 103; no iOS equivalent. Do NOT clone.
- Windows-only DANGER callout / dot3svc / enforcement-staging / TEAP / KB5014754 — Phase 102; no iOS equivalent. Do NOT clone.
- Android/Linux gap-stub guides — Phases 105–106.
- Capability-matrix 802.1X rows + global nav-hub wiring — Phase 109.
- L1/L2 runbooks + decision tree — Phases 107–108.
- iOS/iPadOS ABM "Assign Device Management" + Deadline migration — Phase 110.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-06 | An Intune admin can configure 802.1X for iOS/iPadOS devices (Wi-Fi + wired — wired GA on M-series iPad) across all three EAP methods, including MAC-address-randomization handling for NAC (iOS 14+), the wired SCEP-only constraint, and PEAP inner-auth = MS-CHAPv2. | Sections §3 (Wi-Fi field matrix), §4 (wired field matrix), §6 (MAC randomization), §7 (PEAP/B-05), §8 (SCEP-only). All verified against MS Learn 2026-06-30. |
</phase_requirements>

---

## Summary

Phase 104 authors `docs/admin-setup-8021x/05-ios.md` — the third per-platform 802.1X admin-setup guide in the suite (after Windows `03-windows.md` and macOS `04-macos.md`). The guide uses the locked A3 Hybrid template (Common Mechanics → Wi-Fi → Wired; per-EAP config matrix in each connection subsection) and must clone the macOS deliverable's structure, stripping macOS-only deployment-channel mechanics and substituting iOS-specific content.

iOS/iPadOS is a full-guide platform for both Wi-Fi and wired 802.1X in Intune. The wired profile is GA on M-series iPads with USB Ethernet adapters (confirmed in-production use case: multi-iPad shared-use environments). Three iOS-specific deltas differentiate this guide from macOS: (1) MAC-address randomization control in the Wi-Fi profile (iOS 14+, required for NAC environments); (2) no deployment-channel selector (no macOS User/Device keychain analog); (3) no no-auth-mode-selector (like macOS — iOS also does not expose User/Machine/User-or-machine). The SCEP-only / PKCS-not-supported constraint on wired profiles is identical to macOS.

A critical live-verification finding (2026-06-30, MS Learn `ref-wired-network-settings-macos` iOS/iPadOS pivot) changes the wired EAP matrix: the iOS wired Intune UI exposes **only SCEP Certificates** as the client authentication method for PEAP and EAP-TTLS on wired profiles. There is no "Username and Password" inner auth selector for wired PEAP (unlike iOS Wi-Fi PEAP which uses Username+Password implying MS-CHAPv2), and no "Non-EAP method (inner identity)" selector for wired EAP-TTLS (unlike iOS Wi-Fi EAP-TTLS which exposes PAP/CHAP/MS-CHAP/MS-CHAPv2). The wired per-EAP matrix must reflect this accurately; the D-12 hedge for wired EAP-TTLS extends to wired PEAP inner auth as well.

**Primary recommendation:** Clone `04-macos.md` as the authoring scaffold, strip the deployment-channel WARNING section, add the three iOS-specific sections (MAC-randomization note, three-profiles prose in Common Mechanics, M-series iPad "When to use this"), swap matrix cells per the field maps in §3 and §4, and apply the B-05 WARNING callout in the Wi-Fi PEAP context.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Intune Wi-Fi profile 802.1X config | MDM/Intune (cloud admin center) | iOS supplicant (device) | All configuration pushed via Intune; device-side supplicant executes EAP exchange |
| Intune Wired network profile 802.1X config | MDM/Intune (cloud admin center) | iOS supplicant + USB-Ethernet adapter | Profile pushed via MDM; USB Ethernet adapter presents physical MAC |
| Trusted root certificate delivery | MDM/Intune cert profile | iOS keychain | Separate Trusted Certificate profile; must deploy before the 802.1X network profile |
| SCEP client certificate delivery (Wi-Fi) | MDM/Intune SCEP profile | NDES/SCEP infrastructure | SCEP or PKCS both supported on Wi-Fi |
| SCEP client certificate delivery (Wired) | MDM/Intune SCEP profile only | NDES/SCEP infrastructure | PKCS explicitly not supported on iOS wired |
| MAC address randomization control | MDM/Intune Wi-Fi profile | iOS OS (14+) | Wi-Fi profile field; no wired equivalent |
| Authentication mode selection | Not available | — | iOS does not expose User/Machine/User-or-machine selector |
| EAP inner authentication (Wi-Fi PEAP) | Implicit in Wi-Fi profile (MS-CHAPv2) | — | No explicit inner method selector for PEAP; Username+Password implies MS-CHAPv2 |
| EAP inner authentication (Wi-Fi EAP-TTLS) | Intune Wi-Fi profile field | — | "Non-EAP method (inner identity)" selector: PAP/CHAP/MS-CHAP/MS-CHAPv2 |
| EAP inner authentication (Wired PEAP + EAP-TTLS) | SCEP certificate only (wired profile UI) | — | Wired UI exposes only Certificates (SCEP) for both PEAP and EAP-TTLS; no username/password inner auth path in wired zone |

---

## Standard Stack

This is a documentation phase. The "stack" is the set of Intune profile types and linked document targets.

### Core Profile Types

| Profile Path (Intune) | Purpose | Platform |
|----------------------|---------|----------|
| Devices > Configuration > New policy > iOS/iPadOS > Templates > **Wi-Fi** | 802.1X enterprise Wi-Fi profiles | iOS/iPadOS |
| Devices > Configuration > New policy > iOS/iPadOS > Templates > **Wired network** | 802.1X wired profiles (M-series iPad + USB Ethernet) | iOS/iPadOS |
| Devices > Configuration > New policy > iOS/iPadOS > **Trusted certificate** | Root CA for RADIUS server validation | iOS/iPadOS |
| Devices > Configuration > New policy > iOS/iPadOS > **SCEP certificate** | Client identity cert (Wi-Fi: SCEP or PKCS; Wired: SCEP only) | iOS/iPadOS |
| Devices > Configuration > New policy > iOS/iPadOS > **PKCS certificate** | Client identity cert for Wi-Fi only (NOT supported on wired) | iOS/iPadOS |

[VERIFIED: MS Learn `ref-wifi-settings-apple` 2026-06-23, `ref-wired-network-settings-macos` 2026-06-04, both verified 2026-06-30]

### Link Targets (link-not-copy)

| Content | Source File | What to Link |
|---------|------------|-------------|
| Cert-delivery ordering rule | `02-cert-delivery-foundation.md` | CRITICAL callout at `:37–45`; link from Common Mechanics (D-07) |
| EAP-method comparison / when-to-choose | `01-eap-method-overview.md` | Link from Wi-Fi and Wired intro preamble |
| PEAP-MSCHAPv2 security note (rogue RADIUS rationale) | `01-eap-method-overview.md#peap-mschapv2` | Link from server validation prose |
| Per-platform cert-delivery support matrix (incl. iOS wired PKCS gap) | `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix` | Link from wired SCEP-only callout |
| Canonical scope callout | `02-cert-delivery-foundation.md#canonical-scope-callout` | One-line scope banner |
| Server-name validation concept | `../_glossary-network.md#server-name-validation` | Link from server validation prose |
| Inner-outer identity concept | `../_glossary-network.md#inner-outer-identity` | Link from identity privacy prose |

---

## Package Legitimacy Audit

Not applicable — documentation phase. No packages are installed.

---

## Architecture Patterns

### System Architecture Diagram (Document Relationship)

```
docs/admin-setup-8021x/
├── 00-overview.md       ← receives item-5 entry + "6-7" placeholder narrowing
├── 01-eap-method-overview.md    ← LINK target (EAP comparison, PEAP security note)
├── 02-cert-delivery-foundation.md  ← LINK target (ordering rule, scope callout, cert matrix)
├── 03-windows.md        ← A3 template original; strip Windows-only mechanics
├── 04-macos.md          ← NEAREST clone scaffold; strip deployment-channel WARNING
└── 05-ios.md            ← NEW: Phase 104 primary deliverable

docs/admin-setup-8021x/05-ios.md flow:
  [Front-matter: last_verified + review_by]
  [Prerequisites block → links to 01- and 02-]
  [Scope banner → links to 02- canonical scope callout]
  [## Common Profile Mechanics]
    → Three-profiles prose (D-05/D-06/D-07) — structural, no callout
    → No-auth-mode-selector note (no User/Machine analog)
    → Server Validation section (links to 01-, glossary)
    → Anonymous Outer Identity section
  [## Wi-Fi]
    → Navigation path
    → MAC-randomization prominent note (D-01/D-02/D-04; iOS 14+ freshness stamp)
    → Wi-Fi per-EAP config matrix (D-08/D-12)
    → PEAP: B-05 "What breaks" WARNING callout (D-10/D-11)
    → EAP-TLS / EAP-TTLS cert options prose
  [## Wired]
    → "When to use this" paragraph (D-09: M-series iPad, USB Ethernet)
    → SCEP-only NOTE callout
    → Network Interface note ("Any Ethernet" — automatic, not configurable)
    → Wired per-EAP config matrix (D-08/D-12 with wired-specific cell hedges)
    → One-line cross-reference to Wi-Fi B-05 callout (D-11 guardrail)
  [## See Also]
  [## Change History]

docs/admin-setup-8021x/00-overview.md (EDIT):
  → Add item 5 linking 05-ios.md
  → Narrow placeholder from "5–7" to "6–7"
  → Update Change History
```

### Recommended Project Structure

```
docs/admin-setup-8021x/
├── 00-overview.md        (edit — item 5 entry)
└── 05-ios.md             (new — primary deliverable)
```

No other files are created or modified by Phase 104.

### Pattern: A3 Hybrid Template (inherited from Phase 102 D-01)

**What:** Common Mechanics → Wi-Fi subsection → Wired subsection. Per-EAP-method config matrix inside EACH connection subsection. Shared/cross-cutting settings (server validation, identity privacy, three-profiles model) live in Common Mechanics and are referenced by both connection subsections.

**Established by:** `03-windows.md` (original), `04-macos.md` (closest clone — nearest precedent for `05-ios.md`)

**iOS Application:**
- Common Mechanics: three-profiles prose (D-05/D-06) + no-auth-mode-selector note + server validation framing + identity privacy
- Wi-Fi: MAC-randomization note (D-01) + Wi-Fi per-EAP matrix + B-05 WARNING (D-10/D-11)
- Wired: "When to use this" (D-09) + SCEP-only NOTE + network interface note + wired per-EAP matrix + B-05 cross-ref (D-11)

### Anti-Patterns to Avoid

- **Cloning macOS deployment-channel WARNING:** No iOS equivalent. The iOS wired profile has no deployment channel selector; the macOS WARNING must be stripped entirely. [VERIFIED]
- **Cloning Windows DANGER callout (enforcement staging) or dot3svc remediation:** No iOS equivalent. [VERIFIED]
- **Restating cert-delivery ordering rule:** Link to `02-`, do not restate (link-not-copy, E-02).
- **Treating SCEP-only as Wi-Fi behavior:** PKCS is supported for Wi-Fi; only wired is SCEP-only. The SCEP-only NOTE callout belongs in the Wired section only.
- **Placing MAC-randomization in Common Mechanics:** Wi-Fi-only setting; wired has no analog (D-01, D-03).
- **Using a blockquote callout for MAC randomization:** Research-prescribed as structural prose (D-02); callout discipline forbids it.
- **Using a Mermaid diagram for three-profiles model:** Redundant with existing diagrams in `00-overview.md` and `01-`; callout-inflation risk (D-05).
- **Cloning iOS Wi-Fi EAP-TTLS or PEAP inner auth cell to wired matrix:** iOS wired Intune UI only exposes SCEP Certificates for wired PEAP and EAP-TTLS; no username/password / inner method selector exists in the wired zone. [VERIFIED: MS Learn wired settings 2026-06-30]
- **Using `{#id}` anchor overrides:** Plain GitHub auto-slugs only; double-hyphen trap.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| EAP method comparison | Inline comparison table | Link to `01-eap-method-overview.md` | Already homed; link-not-copy |
| Cert-delivery ordering rule | Inline ordering callout | Link to `02-cert-delivery-foundation.md` | Already homed as CRITICAL callout; restating = divergence risk |
| Scope callout | Custom scope prose | One-line banner linking to `02-#canonical-scope-callout` | Established template from Phase 101 |
| Rogue-RADIUS / server validation rationale | Full security explanation | Link to `01-#peap-mschapv2` and `../_glossary-network.md#server-name-validation` | Already homed; link-not-copy |
| Per-platform cert-delivery matrix | iOS cert rows | Link to `02-#per-platform-cert-delivery-support-matrix` | Already maintained there |

**Key insight:** `05-ios.md` covers only iOS-specific deltas. Everything already homed in `01-`/`02-` or the glossary is a link target, not restatement.

---

## Live Verification Findings (2026-06-30)

These are facts confirmed directly from Microsoft Learn on 2026-06-30 that update or refine the prior research corpus. Planners and executors MUST use these over the prior corpus where they differ.

### §1 — "Disable MAC address randomization" — UI label and values confirmed

**Source:** MS Learn `ref-wifi-settings-apple` (iOS/iPadOS + macOS pivot, updated 2026-06-23, verified 2026-06-30)
[VERIFIED: MS Learn — Apple Wi-Fi settings reference, 2026-06-30]

The setting appears TWICE in the iOS/iPadOS Wi-Fi profile — once under Basic profiles and once under Enterprise profiles. Both instances have identical options:

| Option | Meaning |
|--------|---------|
| **Not configured** | Intune does not change this setting. By default, devices present a randomized MAC when connecting to a new network. |
| **Yes** | Forces devices to present their actual Wi-Fi MAC address instead of a random MAC address. Use for NAC support. |
| **No** | Enables MAC address randomization. Users cannot turn it off. |

Exact UI label: **"Disable MAC address randomization"** — confirmed. The CONTEXT.md D-04 phrasing "Disable MAC address randomization: Yes" is correct.

**Version gate:** iOS 14.0 and newer; iPadOS 14.0 and newer.

**D-04 validation:** The STACK ~l.226 alternative phrasing ("set MAC randomization to 'Yes' (forces actual MAC)") describes a non-existent and internally contradictory control. The real setting is "Disable MAC address randomization = Yes" to force the physical MAC. Do not reproduce the alternative.

### §2 — iOS Wi-Fi EAP types and PEAP inner auth

**Source:** MS Learn `ref-wifi-settings-apple` iOS/iPadOS pivot (updated 2026-06-23, verified 2026-06-30)
[VERIFIED: MS Learn — Apple Wi-Fi settings reference, 2026-06-30]

EAP types in the iOS/iPadOS Wi-Fi profile: **EAP-FAST, EAP-SIM, EAP-TLS, EAP-TTLS, LEAP, PEAP** (same page, same reference — macOS adds additional nuance in macOS pivot; iOS has same set).

**PEAP inner auth (iOS Wi-Fi):** The Intune iOS Wi-Fi UI for PEAP shows authentication method options: "Derived credential" or "Username and Password". When "Username and Password" is selected, there is **no explicit "Non-EAP method (inner identity)" dropdown** shown in the iOS pivot (unlike EAP-TTLS which explicitly shows the inner method selector). The implicit inner method for PEAP "Username and Password" is MS-CHAPv2. This is consistent with B-05: iOS PEAP only supports MS-CHAPv2 as the inner method — the UI simply does not expose an inner-method selector, preventing PAP from being selected.

**EAP-TTLS inner auth (iOS Wi-Fi):** The iOS pivot explicitly shows the "Non-EAP method (inner identity)" dropdown with options: **Unencrypted password (PAP), Challenge Handshake Authentication Protocol (CHAP), Microsoft CHAP (MS-CHAP), Microsoft CHAP Version 2 (MS-CHAP v2)** — all four supported on iOS Wi-Fi EAP-TTLS.

**No authentication mode selector:** iOS/iPadOS Wi-Fi profile has no User/Machine/User-or-machine field. [VERIFIED]

**No deployment channel selector:** iOS/iPadOS Wi-Fi profile has no deployment channel field. [VERIFIED — field only in macOS pivot]

### §3 — iOS Wi-Fi per-EAP field map (authoritative for the Wi-Fi matrix)

**Source:** MS Learn `ref-wifi-settings-apple` iOS/iPadOS pivot (updated 2026-06-23, verified 2026-06-30)
[VERIFIED: MS Learn, 2026-06-30]

| Setting | EAP-TLS | PEAP | EAP-TTLS |
|---------|---------|------|---------|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix (wildcard `*.contoso.com` supported) | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Authentication method | Certificates: SCEP or PKCS or Derived credential | Username and Password (implicit MS-CHAPv2 inner; no PAP option) OR Certificates / Derived credential | Username and Password (inner: PAP/CHAP/MS-CHAP/MS-CHAPv2) OR Certificates / Derived credential |
| Inner method (Non-EAP method / inner identity) | — (cert-only; no inner method) | — (no inner method selector; MS-CHAPv2 implicit) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
| Disable MAC address randomization | Note: appears before/after EAP type block (not per-EAP) — set once per profile; use "Yes" for NAC | same | same |

**Client certificate options (Wi-Fi, EAP-TLS):** SCEP certificate, PKCS certificate, Derived credential. Both SCEP and PKCS supported on Wi-Fi.

**Wi-Fi security type field:** WPA - Enterprise or WPA/WPA2 - Enterprise.

### §4 — iOS Wired per-EAP field map (authoritative for the Wired matrix) — CRITICAL LIVE FINDING

**Source:** MS Learn `ref-wired-network-settings-macos` iOS/iPadOS pivot (updated 2026-06-04, verified 2026-06-30)
[VERIFIED: MS Learn — Apple wired network settings reference, 2026-06-30]

**Network Interface:** Automatically set to **"Any Ethernet"** — not configurable by the admin. Unlike macOS which has a full interface selector (First active Ethernet, etc.), iOS wired automatically targets any available Ethernet interface. No field to set. [VERIFIED]

**EAP types available on iOS wired:** EAP-TLS, EAP-TTLS, PEAP. *(EAP-FAST and LEAP are NOT available on iOS wired — macOS pivot has them; iOS pivot does not.)* [VERIFIED]

**PKCS explicitly not supported on iOS wired (all three EAP types):**
- EAP-TLS: "Public Key Cryptography Standards (PKCS) certificates aren't supported."
- EAP-TTLS (iOS pivot): "PKCS certificates aren't supported."
- PEAP (iOS pivot): "PKCS certificates aren't supported."
[VERIFIED: MS Learn, 2026-06-30]

**CRITICAL WIRED INNER AUTH FINDING — differs from STACK corpus:**

The iOS wired Intune UI exposes **only SCEP Certificates** as the client authentication option for both PEAP and EAP-TTLS in the wired zone. Unlike iOS Wi-Fi (where PEAP has "Username and Password" implying MS-CHAPv2, and EAP-TTLS has the "Non-EAP method (inner identity)" selector with PAP/CHAP/MS-CHAP/MS-CHAPv2), the iOS wired UI shows:

- **Wired PEAP (iOS pivot):** "Client Authentication — Certificates: Select an existing SCEP client certificate profile... PKCS certificates aren't supported." — **no "Username and Password" option; no MS-CHAPv2 inner auth path visible in the wired Intune UI.**
- **Wired EAP-TTLS (iOS pivot):** "Client Authentication — Certificates: Select an existing SCEP client certificate profile... PKCS certificates aren't supported." — **no "Non-EAP method (inner identity)" selector; no PAP/CHAP/MS-CHAP/MS-CHAPv2 option in the wired Intune UI.**

This extends the D-12 "iOS wired-TTLS cell hedge" to also cover wired PEAP. The live MS Learn iOS wired pivot shows BOTH wired PEAP and wired EAP-TTLS as certificate-only (SCEP) in the Intune UI.

**Impact on the wired per-EAP matrix:**

| Setting | EAP-TLS (Wired) | PEAP (Wired) | EAP-TTLS (Wired) |
|---------|----------------|-------------|-----------------|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server Trust — Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client Authentication | Certificates: SCEP only (PKCS not supported) | Certificates: SCEP only (PKCS not supported); no Username/Password/MS-CHAPv2 option in wired UI [VERIFIED] | Certificates: SCEP only (PKCS not supported); no inner auth method selector in wired UI [VERIFIED] |
| Inner method | — (cert-only; no inner method) | — (only cert available in wired UI; see Wi-Fi section for MS-CHAPv2 PEAP note) | — (cert-only in wired UI; see Wi-Fi section for EAP-TTLS inner method options) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

**Note on D-12 / D-11 conformance:** The D-12 decision ("PEAP = MS-CHAPv2 holds in BOTH connection matrices") applies to iOS Wi-Fi. For iOS wired, the Intune UI exposes only Certificates (SCEP) for wired PEAP — no Username+Password/MS-CHAPv2 path. The wired PEAP "Inner method" cell should read "— (cert-only in wired UI; see Wi-Fi PEAP note)" and include the D-11 cross-reference to the Wi-Fi B-05 WARNING. This accurately reflects the live Intune UI state rather than assuming behavior not shown in the UI.

**Note on STACK Building Block 8 divergence:** STACK ~l.183 showed iOS/iPadOS Wired PEAP as supporting "Username and Password (Yes)" — this appears to conflict with the live MS Learn wired settings page iOS pivot (2026-06-04) which only shows Certificates. The live 2026-06-30 verification supersedes the corpus finding for the wired zone. The D-12 hedge for wired TTLS was correct; the same hedge should extend to wired PEAP.

---

## Section-by-Section Authoring Guidance

### Front Matter

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: ios
---
```

Clone directly from `04-macos.md`. The iOS-14+ MAC-randomization note carries an ADDITIONAL inline freshness stamp (D-02 / E-03) — see §6 below.

### Prerequisites Block

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

Clone verbatim from `04-macos.md:9-10`.

### Scope Banner

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

Clone verbatim from `04-macos.md:14`. (One-line scope banner per Phase 101 D-06.)

### Common Profile Mechanics

**Three-profiles structural prose (D-05, D-06, D-07):**

Lead with a brief paragraph stating that Intune delivers three distinct profiles for iOS/iPadOS 802.1X — one Trusted Certificate profile (for RADIUS CA), one SCEP or PKCS client certificate profile (for client identity), and one Wi-Fi or Wired network profile. No combined `.mobileconfig`; no Apple Configurator — this guide covers Intune-managed-fleet only. Then LINK the cert-delivery-ordering rule to `02-cert-delivery-foundation.md` (never restate the ordering rule inline).

**No-auth-mode-selector note:**

Clone from `04-macos.md:37` — "macOS does not expose a User / Machine / User-or-machine authentication mode selector..." — substitute "iOS/iPadOS" for "macOS" and strip the deployment-channel sentence (no iOS equivalent). iOS authenticates as the current user context only; no machine-level pre-logon authentication.

**Server Validation section:**

Clone from `04-macos.md:39-45`. Server validation framing is identical on iOS and macOS:
- Always populate Certificate server names (suppresses dynamic trust dialog on iOS — same behavior as macOS)
- Always reference a Root certificate for server validation
- "On iOS and macOS, disabling server validation in a managed profile is flagged as a security violation by the OS" — this sentence applies verbatim to iOS
- Link to `01-eap-method-overview.md#peap-mschapv2` and `../_glossary-network.md#server-name-validation`

**Anonymous Outer Identity section:**

Clone from `04-macos.md:49-56`. Outer identity / identity privacy is identical on iOS and macOS (all three EAP methods; field name "Identity privacy (outer identity)"; use `anonymous` or `anonymous@domain`).

### Wi-Fi — MAC-randomization Note (D-01, D-02, D-03, D-04)

Place as a prominent prose paragraph either immediately before or after the per-EAP matrix (Claude's discretion). Do NOT use a `> **Label:**` blockquote callout. Must include:

1. The exact control name: **"Disable MAC address randomization"** with option **"Yes"**
2. That "Yes" forces the device to present its actual Wi-Fi MAC address (not a randomized one)
3. That this is required for NAC (Network Access Control) environments where the RADIUS policy is keyed to MAC address
4. That iOS 14.0+ / iPadOS 14.0+ are required (`last_verified: 2026-06-30`)
5. That wired connections use the physical USB-Ethernet adapter MAC automatically — no randomization setting (D-03)
6. The inline freshness stamp (version-gated content, E-03)

Do NOT write: "set MAC randomization to Yes" — this is the STACK ~l.226 error. The correct label is "Disable MAC address randomization: Yes".

### Wi-Fi — B-05 WARNING Callout (D-10, D-11)

Place within the Wi-Fi PEAP section (after the EAP type is introduced, before or alongside the matrix). Use a `> **WARNING**` blockquote. Must convey:
- iOS/iPadOS PEAP inner authentication MUST be MS-CHAPv2 (the Intune UI does not show an inner method selector for PEAP — there is no PAP option)
- Configuring PAP inner auth via custom profile or imported settings causes immediate "Authentication Failed"
- macOS and Windows devices on the same SSID with PEAP+PAP may succeed while iOS devices fail
- Symptom: "Authentication Failed" immediately; RADIUS logs show EAP-NAK from the device

Do NOT place this in Common Mechanics (PEAP-inner is method-specific, not cross-method — D-11).

### Wi-Fi — Per-EAP Config Matrix

Use the field map from §3 above. Three columns (EAP-TLS / PEAP / EAP-TTLS) with rows matching the macOS Wi-Fi matrix in `04-macos.md:68-76`. Substitute iOS-specific values. Key differences from macOS:
- No "Deployment channel" row (no iOS equivalent)
- "Disable MAC address randomization" is a profile-level setting noted in prose, not a per-EAP row
- Client auth for EAP-TLS Wi-Fi: SCEP, PKCS, or Derived credential (macOS also includes SCEP and PKCS but without the Derived credential option)
- Inner method for EAP-TTLS: PAP / CHAP / MS-CHAP / MS-CHAP v2 [VERIFIED] — same as macOS Wi-Fi

### Wi-Fi — Client Certificate Options Note

For EAP-TLS Wi-Fi: "Both SCEP and PKCS certificate profiles are supported." Link to `02-cert-delivery-foundation.md` for cert profile configuration.

### Wired — "When to use this" Paragraph (D-09)

Open the Wired subsection with a paragraph (before the SCEP-only callout) explaining the use case: M-series iPads equipped with a USB-Ethernet adapter; multi-iPad shared-use environments (e.g., classroom or lab deployments where a wired Ethernet connection is available). This grounds the narrower hardware applicability before the technical configuration steps. Keep to 2-3 sentences.

### Wired — SCEP-only NOTE Callout

Clone from `04-macos.md:97-104` (the wired SCEP-only NOTE pattern). Substitute "macOS" → "iOS/iPadOS". Key difference: iOS wired has no deployment-channel selector (strip that part of the macOS NOTE). The core statement is the same:
- Wired network profile supports only SCEP certificate profiles for client authentication
- PKCS certificate profiles are NOT supported for the wired profile type
- Wi-Fi profiles support both SCEP and PKCS
- Link to `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix`

[VERIFIED: All three EAP types on iOS wired explicitly state "PKCS certificates aren't supported" — MS Learn 2026-06-30]

### Wired — Network Interface Note

After the SCEP-only callout, add a brief note: **Network Interface is automatically set to "Any Ethernet"** — there is no interface selector in the iOS wired profile (unlike macOS which has First active Ethernet, Second active Ethernet, etc.). The profile applies to any available USB-Ethernet interface on the device.

[VERIFIED: MS Learn `ref-wired-network-settings-macos` iOS pivot, 2026-06-30]

Do NOT include a network interface table (like `04-macos.md:110-119`). iOS has no selection to make.

### Wired — Per-EAP Config Matrix (D-08, D-12)

Use the field map from §4 above. Full-peer matrix (clone macOS wired matrix structure from `04-macos.md:124-137`). Key iOS-specific differences:

- No "Deployment channel" row (no iOS equivalent)
- "Network Interface" row: remove or note "Automatically set to Any Ethernet — not configurable" (or handle in prose instead)
- EAP-TLS client auth: "Certificates: SCEP only (PKCS not supported)" [VERIFIED]
- PEAP client auth: "Certificates: SCEP only (PKCS not supported) — see Wi-Fi PEAP note for MS-CHAPv2 context" — with cross-reference to the B-05 WARNING in the Wi-Fi section (D-11)
- EAP-TTLS client auth: "Certificates: SCEP only (PKCS not supported) — specific inner authentication options in the wired zone are not separately configurable via the Intune UI; verify in Intune console" [VERIFIED — live verification 2026-06-30; wired UI shows Certificates only, no inner method selector] (D-12 hedge)
- Inner method row for PEAP (wired): "— (cert-only in wired UI; for PEAP + username/password use Wi-Fi)" [VERIFIED]
- Inner method row for EAP-TTLS (wired): "— (cert-only in wired UI; inner auth via username/password is a Wi-Fi-only path on iOS)" [VERIFIED]
- Identity privacy: identical to Wi-Fi and macOS

### Wired — B-05 Cross-Reference (D-11 guardrail)

In the Wired subsection near the PEAP configuration, add a one-line cross-reference: "For PEAP inner authentication on iOS Wi-Fi, see [PEAP inner authentication (Wi-Fi section)](#...) — the Intune wired UI exposes Certificates (SCEP) as the client auth method; the MS-CHAPv2 constraint applies on Wi-Fi profiles."

This prevents a wired-only reader from being confused by the absence of a "Username and Password / MS-CHAPv2" option in the wired Intune UI.

### See Also Footer

Clone from `04-macos.md:143-147`. Links to:
- `01-eap-method-overview.md`
- `02-cert-delivery-foundation.md`
- `../_glossary-network.md`

### Change History Footer

Add initial entry:
```
| 2026-06-30 | Initial version -- iOS/iPadOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP / EAP-TTLS; MAC-address randomization note (iOS 14+); M-series iPad wired use case; wired SCEP-only callout; PEAP "What breaks" callout | -- |
```

### 00-overview.md Edit

Current line 32 reads: `5–7. Platform guides (Phase 104–106) -- entries added as each guide is authored.`

Replace with:
```
5. **[iOS/iPadOS 802.1X Admin Setup (Wi-Fi + Wired)](05-ios.md)** -- Wi-Fi and wired profiles for all three EAP methods; MAC-address randomization disabled for NAC environments (iOS 14+); wired profile targets M-series iPads with USB Ethernet; wired SCEP-only constraint.

6–7. Platform guides (Phase 105–106) -- entries added as each guide is authored.
```

Add Change History entry:
```
| 2026-06-30 | Added item 5 -- iOS/iPadOS platform-guide entry linking 05-ios.md; narrowed placeholder range from 5--7 to 6--7 | -- |
```

---

## Common Pitfalls

### Pitfall 1: B-05 — iOS PEAP inner auth set to PAP (Wi-Fi)
**What goes wrong:** Admin copies PEAP config from macOS or Windows where PAP inner auth is valid. iOS does not support PAP as a PEAP inner method. "Authentication Failed" immediately; RADIUS logs show EAP-NAK.
**Why it happens:** Intune UI for iOS Wi-Fi PEAP does not show an inner method selector — only "Username and Password" with implicit MS-CHAPv2. If using a custom profile or imported settings, PAP can be injected.
**How to avoid:** Always use MS-CHAPv2 inner auth for iOS PEAP. The Intune Wi-Fi UI enforces this by not exposing an inner method selector for PEAP. Document with B-05 WARNING callout (D-10).
**Warning signs:** "Authentication Failed" on iOS Wi-Fi with PEAP; same SSID + PEAP+PAP works on macOS/Windows.
[VERIFIED: MS Learn, PITFALLS.md B-05]

### Pitfall 2: E-07 — Three-profiles confusion (combined .mobileconfig expectation)
**What goes wrong:** Admin creates a single Wi-Fi profile expecting it to deliver certificates too. The certificate must be a separate Intune profile (SCEP or PKCS).
**How to avoid:** State in Common Mechanics prose (D-05/D-06) that three distinct Intune profiles are required. Exclude Apple Configurator / manual `.mobileconfig` path explicitly. Link ordering rule to `02-`.
[VERIFIED: PITFALLS.md E-07]

### Pitfall 3: A-04/A-05 — Server validation disabled / server trust not configured
**What goes wrong:** Certificate server names field left empty; RADIUS cert root not deployed. iOS silently fails 802.1X; connection shows "Authentication Failed". On iOS/macOS, disabling server validation in a managed profile is flagged as a security violation by the OS.
**How to avoid:** Always populate Certificate server names. Always reference a Root certificate for server validation. Common Mechanics server validation section must be explicit that this is a security requirement, not optional.
[VERIFIED: PITFALLS.md A-04, A-05]

### Pitfall 4: A-01 — Cert ordering race (profiles deployed simultaneously)
**What goes wrong:** Trusted root + SCEP cert + Wi-Fi/Wired profiles deployed to same group simultaneously. 802.1X profile may fire before cert reaches device; silent "Authentication Failed" even though Intune shows "Succeeded".
**How to avoid:** Prerequisite block (linking `02-`) handles this; do not restate inline (link-not-copy). Covered by Common Mechanics linkout.
[VERIFIED: PITFALLS.md A-01]

### Pitfall 5: MAC randomization / NAC failure
**What goes wrong:** iOS 14+ device joins a NAC-protected SSID with a randomized MAC. RADIUS policy keyed to MAC rejects or rate-limits the connection. Symptoms are intermittent (new random MAC per connection).
**How to avoid:** Set "Disable MAC address randomization: Yes" in the Intune iOS Wi-Fi profile (D-04). Wired is unaffected (USB-Ethernet adapter presents physical MAC — D-03).
[VERIFIED: MS Learn 2026-06-30, D-01 through D-04]

### Pitfall 6: PKCS used for iOS wired cert delivery
**What goes wrong:** Admin creates an iOS wired network profile and selects a PKCS certificate. Intune UI explicitly states "PKCS certificates aren't supported" for all three EAP types on iOS wired.
**How to avoid:** SCEP-only NOTE callout in Wired section (cloned from `04-macos.md`). Link to per-platform cert matrix in `02-`.
[VERIFIED: MS Learn — all three iOS wired EAP types explicitly state PKCS not supported, 2026-06-30]

### Pitfall 7: iOS wired "inner method" cell cloned from Wi-Fi (D-12 hedge)
**What goes wrong:** Author clones iOS Wi-Fi EAP-TTLS inner methods (PAP/CHAP/MS-CHAP/MS-CHAPv2) to the wired matrix. The iOS wired Intune UI only exposes Certificates (SCEP) for wired EAP-TTLS and wired PEAP — no username/password or inner method selector exists in the wired zone.
**How to avoid:** Wired PEAP and wired EAP-TTLS inner method cells must reflect "Certificates (SCEP only) — inner auth via username/password not exposed in wired Intune UI" rather than cloning from Wi-Fi. [VERIFIED: MS Learn wired settings iOS pivot, 2026-06-30]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| iOS wired 802.1X — in development / not available | iOS/iPadOS wired 802.1X GA in Intune | Now reflected in MS Learn (2026-06-04) | M-series iPad wired use case is fully authorable in Phase 104 |
| macOS-only wired settings reference | Shared Apple wired settings reference with iOS/iPadOS pivot | Updated 2026-06-04 | Same MS Learn page covers both iOS and macOS; `ref-wired-network-settings-macos` is the canonical URL |
| Per-platform MAC randomization control not documented | "Disable MAC address randomization" dropdown fully documented | Updated 2026-06-23 in ref-wifi-settings-apple | iOS 14+ NAC requirement is authoritatively documented |

**Deprecated/outdated:**
- STACK ~l.226 phrasing "set MAC randomization to 'Yes' (forces actual MAC)": This is internally contradictory. The real control is "Disable MAC address randomization: Yes". Do not reproduce.
- STACK Building Block 8 entry showing iOS wired PEAP supporting "Username and Password": The live MS Learn iOS wired pivot (2026-06-04) shows only Certificates (SCEP) for wired PEAP. This STACK entry was likely derived from a different source or pre-GA state. Trust the live 2026-06-30 verification.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Intune iOS wired profile UI as documented on MS Learn (2026-06-04) has not changed between June 4 and the authoring date. | §4, wired matrix | If changed: executor should verify exact UI fields in Intune console before finalizing wired PEAP / EAP-TTLS matrix cells. Low risk — just updated 2026-06-04. |
| A2 | The B-05 WARNING belongs in the Wi-Fi PEAP section; the wired PEAP section only needs a cross-reference. | §7 (pitfalls) | If iOS wired PEAP also supports Username+Password via some path not shown in the standard UI (e.g., Settings Catalog or custom profile), the B-05 warning may also be needed in the wired section. Risk: LOW. Live verification shows cert-only in wired Intune UI. |
| A3 | iOS wired EAP-FAST and LEAP are not supported (iOS pivot only shows EAP-TLS, EAP-TTLS, PEAP). | §4 | If Apple or Microsoft adds EAP-FAST to iOS wired after 2026-06-04: executor should not include EAP-FAST in iOS wired matrix. |

---

## Open Questions (RESOLVED)

1. **iOS wired PEAP "Username and Password" path via Settings Catalog** — **RESOLVED**
   - What we know: The Templates path iOS wired UI only shows Certificates (SCEP) for PEAP. Settings Catalog may expose different/more granular options.
   - What's unclear: Whether Settings Catalog surfaces a Username+Password/MS-CHAPv2 path for iOS wired PEAP.
   - **RESOLVED:** Out of scope for Phase 104 (Templates path is the documented standard; Settings Catalog is noted as available but not the primary path per STACK Building Block 1). The wired PEAP inner-method cell reads cert-only "(via Templates path)" with a cross-reference to the Wi-Fi B-05 WARNING. See D-12 + §4 wired matrix.

2. **iOS wired EAP-TTLS "Username/Password" path** — **RESOLVED**
   - What we know: STACK ~l.167 noted "Username/Password option exists" for iOS wired EAP-TTLS but inner methods not explicitly documented. Live 2026-06-30 verification of the Templates path shows Certificates-only.
   - What's unclear: Whether a username/password inner auth path exists for iOS wired EAP-TTLS via Settings Catalog.
   - **RESOLVED:** Apply the D-12 hedge in the wired EAP-TTLS cell: "Certificates: SCEP only (via Templates path); inner auth via username/password and specific inner options not exposed in the Templates Intune UI — verify in Intune console if username/password EAP-TTLS on wired is required." See §4 wired matrix.

---

## Environment Availability

Skipped — documentation phase with no external tool dependencies. All authoring is file creation/editing.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Audit harness (chain validator) — `check-phase-104.mjs` (to be created in Phase 112 atom) |
| Config file | `.planning/scripts/validation/` (Phase 112 authorship) |
| Quick run command | Not applicable until Phase 112 |
| Full suite command | Not applicable until Phase 112 |

**Per-task verification (documentation phases):** Manual review against the criteria below. The planner should specify explicit verification steps per task rather than automated test commands.

### Phase Requirements → Verification Map

| Req ID | Behavior | Verification Type | Check |
|--------|----------|-------------------|-------|
| DOT1X-06 | iOS Wi-Fi 802.1X profiles for all 3 EAP methods | Manual review | `05-ios.md` Wi-Fi section has EAP-TLS / PEAP / EAP-TTLS matrix with all fields populated |
| DOT1X-06 | "Disable MAC address randomization: Yes" documented for NAC, iOS 14+, freshness-stamped | Manual review | MAC-rand note present in Wi-Fi section with exact D-04 phrasing + `last_verified` + iOS 14.0 version gate |
| DOT1X-06 | iOS wired 802.1X profile for M-series iPad + USB Ethernet | Manual review | Wired section has "When to use this" paragraph + full per-EAP matrix |
| DOT1X-06 | SCEP-only / PKCS-not-supported documented for wired | Manual review | SCEP-only NOTE callout present in Wired section |
| DOT1X-06 | PEAP inner = MS-CHAPv2 documented (Wi-Fi) | Manual review | B-05 WARNING callout present in Wi-Fi PEAP context |
| DOT1X-06 | Three separate Intune profiles required | Manual review | Three-profiles prose in Common Mechanics, not a callout (D-05 compliance) |
| DOT1X-06 | `00-overview.md` item-5 entry added | Manual review | Item 5 links `05-ios.md`; placeholder narrowed to "6–7" |

### Callout Discipline Checklist (executor verification gate)

The executor MUST verify before committing:

- [ ] MAC-randomization content is **prose**, NOT a `> **Label:**` blockquote — D-02 compliance
- [ ] Three-profiles model is **prose**, NOT a `> **Label:**` blockquote — D-05 compliance
- [ ] B-05 PEAP inner auth IS a `> **WARNING**` blockquote — D-10 compliance
- [ ] SCEP-only wired IS a `> **NOTE**` blockquote — standard wired constraint callout
- [ ] No DANGER callout exists in the file (no Windows-only enforcement-staging analog)
- [ ] No deployment-channel WARNING exists in the file (no macOS analog)
- [ ] No `{#id}` anchor overrides — plain GitHub auto-slugs only
- [ ] All freshness stamps present: file front-matter `last_verified`/`review_by` + iOS-14+ inline stamp on MAC-rand note

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Yes — 802.1X is enterprise authentication | SCEP/PKCS certificate profiles + RADIUS server cert validation |
| V3 Session Management | No — MDM push; no session tokens in this guide | — |
| V4 Access Control | No — network access control is RADIUS-side (out of scope) | — |
| V5 Input Validation | No — documentation phase; no user input in the guide itself | — |
| V6 Cryptography | Yes — certificate profiles, never hand-roll | SCEP (CA-backed); never show self-signed or disabled server validation |

### Known Threat Patterns for iOS 802.1X

| Pattern | STRIDE | Standard Mitigation in Guide |
|---------|--------|------------------------------|
| Rogue RADIUS server / PEAP credential harvest | Spoofing | Certificate server names populated; Root cert for server validation referenced; never show server validation disabled |
| MAC-based NAC bypass (randomized MAC bypasses allow-list) | Elevation of Privilege | "Disable MAC address randomization: Yes" for NAC environments (D-04) |
| PAP inner auth with PEAP (cleartext password in tunnel) | Information Disclosure | B-05 WARNING: iOS PEAP must use MS-CHAPv2; PAP is not supported |
| PKCS cert deployed to iOS wired profile (fails silently) | Denial of Service | SCEP-only NOTE callout + link to `02-` cert matrix |

---

## Sources

### Primary (HIGH confidence — live-verified 2026-06-30)

- MS Learn `ref-wifi-settings-apple` (iOS/iPadOS + macOS pivot) — `https://learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-apple` — updated 2026-06-23, verified 2026-06-30. **Authority for:** Wi-Fi EAP types, PEAP inner auth (no selector = implicit MS-CHAPv2), EAP-TTLS inner methods (PAP/CHAP/MS-CHAP/MS-CHAPv2), MAC randomization setting and options, security type field, identity privacy field.
- MS Learn `ref-wired-network-settings-macos` (iOS/iPadOS + macOS pivot) — `https://learn.microsoft.com/en-us/intune/intune-service/configuration/wired-network-settings-macos` — updated 2026-06-04, verified 2026-06-30. **Authority for:** iOS wired EAP types (EAP-TLS/EAP-TTLS/PEAP; no EAP-FAST/LEAP on iOS), PKCS not supported (all three wired EAP types explicitly stated), "Any Ethernet" network interface (not configurable), wired PEAP + EAP-TTLS both show Certificates-only (no username/password inner auth in wired UI).

### Secondary (HIGH confidence — prior research corpus, verified 2026-06-29)

- `.planning/research/STACK.md` — Building Blocks 1-9; iOS Wi-Fi/wired profile building blocks; inner auth options (B-08); cert delivery platform matrix (B-05, B-06). All HIGH confidence. Note: B-08 PEAP "Username and Password" for iOS wired overridden by live 2026-06-30 verification (wired UI shows cert-only).
- `.planning/research/PITFALLS.md` — B-05 (iOS PEAP inner must be MS-CHAPv2), E-07 (three-profiles model), A-04/A-05 (server validation), A-01 (ordering), Section F callout-prescription table. HIGH confidence.
- `.planning/research/SUMMARY.md` — Phase 104 synthesis (~l.225-234), iOS coverage-reality matrix (~l.151-180), Research Q4 resolution (~l.333-334). HIGH confidence.
- `docs/admin-setup-8021x/04-macos.md` — Clone scaffold for `05-ios.md` structural patterns. Verified by prior execution (Phase 103 passed verification).
- `.planning/phases/104-ios-ipados-802-1x-admin-setup-wi-fi-wired/104-CONTEXT.md` — 12 locked decisions (D-01..D-12) + executor guardrails. Referee-upheld, adversarial-review validated.

### Tertiary (LOW confidence — not used)

None — all iOS-specific facts required for this phase were verified via HIGH-confidence sources.

---

## Metadata

**Confidence breakdown:**
- iOS Wi-Fi field map: HIGH — live-verified from MS Learn 2026-06-30
- iOS wired field map: HIGH — live-verified from MS Learn 2026-06-30 (critical update: wired PEAP + EAP-TTLS show Certificates-only, not username/password)
- MAC-randomization setting label + options: HIGH — live-verified from MS Learn 2026-06-30
- B-05 PEAP inner auth pitfall: HIGH — verified PITFALLS.md + MS Learn (UI shows no inner method selector for Wi-Fi PEAP on iOS)
- SCEP-only wired constraint: HIGH — live-verified from MS Learn 2026-06-30 (all three EAP types explicitly state PKCS not supported)
- Callout discipline: HIGH — directly from CONTEXT.md locked decisions + PITFALLS.md Section F
- 00-overview.md edit spec: HIGH — current file content verified (line 32 placeholder "5–7" confirmed)

**Research date:** 2026-06-30
**Valid until:** 2026-09-28 (90-day review cycle; MAC-randomization note should be reverified)
**Critical re-verify trigger:** Any MS Learn doc update to `ref-wifi-settings-apple` or `ref-wired-network-settings-macos` — particularly the wired PEAP/EAP-TTLS inner auth sections if the UI adds a username/password path.
