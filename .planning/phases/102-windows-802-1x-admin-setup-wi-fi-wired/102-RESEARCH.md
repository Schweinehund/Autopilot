# Phase 102: Windows 802.1X Admin-Setup (Wi-Fi + Wired) — Research

**Researched:** 2026-06-30
**Domain:** Documentation authoring — Windows 802.1X Intune profile configuration for `docs/admin-setup-8021x/03-windows.md`
**Confidence:** HIGH — all primary findings sourced from milestone research verified against Microsoft Learn 2026-06-29 (STACK.md, PITFALLS.md, ARCHITECTURE.md). No new web research required; CONTEXT.md marks this phase "well-documented."

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Area A — Internal structure of `03-windows.md` → A3: Hybrid**
- D-01: Structure as shared "common profile mechanics" section → Wi-Fi subsection → Wired subsection, with a compact per-EAP-method config matrix inside each connection subsection (three methods in one grid).
- D-02: Wired-only concerns (dot3svc, enforcement staging, TEAP awareness note) homed exactly once in the Wired subsection. Not repeated per-EAP-method.
- D-03: "Common mechanics" section links cert-delivery prerequisites to `02-` (does not restate ordering rule / EKU / server-name-validation theory); covers Windows auth mode and PerformServerValidation at guide altitude.
- Template note: This structure is the reusable per-platform template for Phases 103–106.

**Area B — dot3svc Intune Remediation depth → B2: documented pattern + cmdlets**
- D-04: Document detect→remediate pattern, not a productionized script. Include: detection signal (`sc query dot3svc` → STATE: STOPPED / Manual startup), load-bearing cmdlets (`Get-Service dot3svc`, `Set-Service -StartupType Automatic`, `Start-Service dot3svc`), and Intune Remediations UI path.
- D-05: Do NOT ship a full parameterized `Detect-*.ps1` / `Remediate-*.ps1` pair.

**Area C — KB5014754 strong-mapping callout: cadence + placement**
- D-06 (C-cad-180): File-level front-matter `review_by` stays 90-day. The inline KB5014754 callout carries its OWN `last_verified`/`review_by` set to +180 days. Two stamps measure different things and do not conflict.
- D-07 (C-place-callout): KB5014754 / SID-in-SAN requirement is a standalone, scoped "Hybrid Entra Joined" NOTE-style callout, NOT inline inside one EAP-TLS subsection. Placed once; applies across both Wi-Fi and Wired EAP-TLS.
- D-08: Callout content: as of 2025-02-11 DCs enforce strong cert mapping (KB5014754); Hybrid Entra Joined devices doing EAP-TLS need SID in the certificate SAN; Intune SCEP/PKCS profiles can include the SID; cloud-only Entra Joined devices are unaffected.

**Area D — Intune authoring path + TEAP scope**
- D-09 (D-path-both): Document Templates path as primary (Wi-Fi: `Devices > Configuration > New policy > Windows 10 and later > Templates > Wi-Fi`; Wired: `Templates > Wired network`) PLUS a single sentence noting the Settings Catalog also exposes these settings and may offer more granular options.
- D-10: Settings Catalog acknowledgment is ONE sentence, NOT a second walkthrough. Windows-scoped; does NOT propagate into Phases 103–106.
- D-11 (D-teap-note): TEAP gets a one-paragraph awareness note in the Wired subsection. NOT given co-equal config steps.

**Hard constraints (carry-forward from Phase 101):**
- Co-equal EAP: no "recommended default" method; all three at equal depth in each connection subsection.
- Link-not-copy: link to `01-`/`02-` for shared concepts; never restate ordering rule, EKU, server-name-validation theory.
- Navigation-last: only the local `00-overview.md` platform-list entry is in scope. No capability-matrix rows or global nav-hub edits (Phase 109).
- Intune client-side scope only: no RADIUS/NPS/PKI build-out.

### Claude's Discretion

- Exact prose, callout phrasing, anchor wording, Mermaid/diagram use, section ordering within the locked A3 structure.
- Exact phrasing of per-EAP-method config matrices and Identity-privacy/anonymous-outer-identity guidance (pitfall C-01).
- Wording of enforcement-staging DANGER callout (must convey: deploy "Do not enforce" first → switch to "Enforce" only after RADIUS reachability + cert pipeline confirmed; break-glass note).

### Deferred Ideas (OUT OF SCOPE)

- Settings Catalog full walkthrough (D-10 guardrail: one-sentence note only).
- Productionized dot3svc Remediation scripts in `src/powershell/` (D-05).
- Capability-matrix 802.1X rows + global nav-hub wiring (Phase 109).
- macOS/iOS/Android/Linux per-platform guides (Phases 103–106).
- L1/L2 runbooks + decision tree (Phases 107–108).
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-04 | An Intune admin can configure 802.1X for Windows devices (Wi-Fi + wired) across all three EAP methods, including the dot3svc (Wired AutoConfig) service dependency (with a Remediation pattern), the PerformServerValidation security requirement, and the SCEP/PKCS/PFX-Import client-cert options. | Fully covered by STACK.md Building Blocks 1–2, 6–9, 12; PITFALLS.md B-01/B-02/B-03/A-05/C-01/C-02; locked by CONTEXT.md decisions D-01–D-11. |
</phase_requirements>

---

## Summary

Phase 102 authors a single file — `docs/admin-setup-8021x/03-windows.md` — plus a one-line edit to `docs/admin-setup-8021x/00-overview.md` (adding the Windows platform-list entry). The deliverable is a Windows Wi-Fi + wired 802.1X admin-setup guide covering all three co-equal EAP methods (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), the dot3svc service dependency and Remediation pattern, the 802.1X enforcement-staging DANGER callout, the PerformServerValidation security requirement, SCEP/PKCS/PFX-Import client cert options, and the KB5014754 Hybrid Entra Joined strong-mapping callout with a 180-day freshness stamp.

All underlying facts were researched and verified at HIGH confidence for the milestone on 2026-06-29 against Microsoft Learn. This research phase synthesizes those findings into the exact content the planner needs to write the guide without re-deriving any facts. No additional web research was required.

**Primary recommendation:** The planner can proceed directly to plan creation using this RESEARCH.md as the authoritative source of Windows 802.1X Intune configuration facts. Every claim below is tagged [VERIFIED: Microsoft Learn] or [CITED: milestone research STACK.md/PITFALLS.md] and is safe to include in the guide without further verification.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| 802.1X Wi-Fi profile creation | Intune admin center (Templates) | Settings Catalog (one-sentence note) | Templates path is primary per D-09; Settings Catalog is Windows-only acknowledgment |
| 802.1X Wired profile creation | Intune admin center (Templates > Wired network) | — | WiredNetwork CSP; no Settings Catalog alternative documented |
| Cert delivery (SCEP/PKCS/PFX) | Intune cert profiles (02-cert-delivery-foundation.md) | — | Link-not-copy: cert delivery mechanics homed in 02-; this guide links |
| dot3svc service management | Intune Remediations (detection + remediation scripts) | PowerShell direct (cmdlets documented) | Pattern B2: Intune Remediations is the deployment path; cmdlets are the implementation |
| KB5014754 strong mapping | Intune SCEP/PKCS profile SAN configuration | AD/DC enforcement side (out of scope) | SID-in-SAN is the client-side cert config action; DC enforcement is assumed to be in place |
| 00-overview.md platform entry | docs/admin-setup-8021x/00-overview.md (edited) | — | Local nav only; global nav-hub wiring is Phase 109 |

---

## Deliverables

| File | Action | Notes |
|------|--------|-------|
| `docs/admin-setup-8021x/03-windows.md` | CREATE | Main deliverable; full guide |
| `docs/admin-setup-8021x/00-overview.md` | EDIT (one line) | Add Windows platform-list entry (item 3); pre-existing file → must be harness-allowlisted |

---

## Guide Content Facts (Planner Reference)

This section documents every Windows-specific 802.1X fact needed to author `03-windows.md`, organized by the A3 structure sections. The planner assigns each to tasks; the implementer uses this verbatim.

### Front Matter (file-level)

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: windows
---
```

90-day review_by = authoring date + 90 days. [VERIFIED: E-03 two-tier mechanism, PITFALLS.md]

### Scope Banner (one-line, top of file)

Exact template from `02-cert-delivery-foundation.md`:

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

[CITED: 02-cert-delivery-foundation.md scope callout template, Phase 101 D-06]

### Common Profile Mechanics Section

**What this section covers** (per D-03):
- Authentication mode (User / Machine / User or machine) — Windows-unique
- PerformServerValidation requirement — at guide altitude, linking to `01-` for the security rationale
- Anonymous outer identity (Identity privacy field) — guidance to populate
- One-sentence Settings Catalog note (D-10)
- Link to `02-cert-delivery-foundation.md` for the deployment ordering rule and cert-delivery matrix — do NOT restate here

**Authentication mode field values and decision guidance** [VERIFIED: Microsoft Learn Windows Wi-Fi/Wired settings ref, STACK.md Building Block 9]:

| Mode | Device credentials used | User credentials used | When to use |
|------|--------------------------|------------------------|-------------|
| User | No | Yes | Cloud-native Entra Joined; user auth at logon is sufficient |
| Machine (Computer) | Yes | No | Pre-logon domain connectivity (Group Policy, AD logon) with device cert deployed |
| User or machine | Yes (fallback) | Yes (primary) | Hybrid Entra Joined; machine auth at boot, user auth after logon |
| Guest | No | No | Unauthenticated open access; not used for 802.1X enterprise |

- Auth mode is not prominently surfaced in the Intune UI (pitfall B-03). Document the decision table; do not just list the options.
- Machine / User-or-machine requires a device (machine) SCEP/PKCS cert profile in addition to the user cert profile.

**PerformServerValidation:**
- Always enabled for all EAP methods on Windows.
- The default Windows EAP XML skeleton ships with `PerformServerValidation = false` — this must never appear in documentation examples. [VERIFIED: Microsoft Learn; PITFALLS.md C-02]
- Wired profile additionally exposes: "Disable user prompts for server validation" (Yes) and "Require cryptographic binding" (available for PEAP).
- Always populate "Certificate server names" with the RADIUS server FQDN or CN suffix.

**Anonymous outer identity (Identity privacy):**
- Field label: "Identity privacy" in the Intune Wi-Fi/Wired profile UI.
- Value: `anonymous` or `anonymous@contoso.com` (organization-specific domain suffix).
- Applies to: EAP-TLS (outer identity before TLS tunnel), PEAP (outer identity before PEAP tunnel), EAP-TTLS (outer identity before TTLS tunnel).
- Without this, the real UPN from the certificate Subject/SAN is sent in cleartext before the tunnel is established. [VERIFIED: PITFALLS.md C-01/C-04]

**Settings Catalog (one sentence):**
"The Settings Catalog (`Devices > Configuration > New policy > Settings catalog`) also exposes these Wi-Fi settings and may offer more granular options." [CITED: STACK.md Alternatives Considered; D-09/D-10]

---

### Wi-Fi Subsection

**Intune profile navigation (primary):**
`Devices > Configuration > New policy > Windows 10 and later > Templates > Wi-Fi`
[VERIFIED: Microsoft Learn Windows Wi-Fi settings ref, STACK.md Building Block 1]

**EAP types available in Wi-Fi profile:** EAP-TLS, Protected EAP (PEAP), EAP-TTLS
[VERIFIED: STACK.md Building Block 3]

**Per-EAP-method config matrix for Wi-Fi** [VERIFIED: STACK.md Building Blocks 6–8, Microsoft Learn]:

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---------|---------|----------------|----------|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile ref | Trusted Certificate profile ref | Trusted Certificate profile ref |
| Perform server validation | (enforced via trusted root ref) | Yes — always | Yes — always |
| Client auth method | SCEP cert / PKCS cert / Derived credential | Username and Password | Username and Password |
| Inner method | — (cert-only) | MSCHAPv2 (always; not PAP) | PAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

**Additional Wi-Fi settings (not per-EAP-method):**
- Authentication mode: see Common Mechanics section above
- PMK caching / pre-authentication: available (optional; advanced)
- FIPS compliance mode: available (optional)
- Single Sign-On (SSO): "Enable before user signs in" for pre-logon network access
- XML import: available for settings not exposed in the Intune UI ("export Wi-Fi settings from another Windows device")

**Cert options for EAP-TLS client auth (Wi-Fi):**
- SCEP certificate
- PKCS certificate
- Derived credential
[VERIFIED: STACK.md Building Block 6, Microsoft Learn]

---

### Wired Subsection

**Intune profile navigation (primary):**
`Devices > Configuration > New policy > Windows 10 and later > Templates > Wired network`
(Uses WiredNetwork CSP)
[VERIFIED: STACK.md Building Block 2, Microsoft Learn Windows wired settings ref]

**dot3svc Service Dependency (B-01 pitfall — highest-consequence wired fact)**

This is the "silent failure" pitfall: Intune reports the profile as "Succeeded" even when dot3svc is stopped. The service must be running for 802.1X to engage.

Default state: dot3svc ships as **Manual** startup on Windows 10/11.
[VERIFIED: PITFALLS.md B-01, Microsoft Learn wired settings ref]

Detection signal:
```
sc query dot3svc
```
Look for: `STATE: STOPPED` and `START_TYPE: DEMAND_START` (Manual)

Load-bearing PowerShell cmdlets (D-04):
```powershell
# Check current state
Get-Service -Name dot3svc

# Remediate
Set-Service -Name dot3svc -StartupType Automatic
Start-Service -Name dot3svc
```

Intune Remediations UI path (D-04):
`Devices > Remediations > + Create` → Platform: Windows 10 and later → supply Detection script + Remediation script → Assign to device groups

Pattern description for the guide (NOT a productionized script — D-05):
- **Detection:** Exit non-zero if `(Get-Service dot3svc).StartType -ne 'Automatic'` OR `(Get-Service dot3svc).Status -ne 'Running'`
- **Remediation:** `Set-Service -Name dot3svc -StartupType Automatic; Start-Service dot3svc`

**802.1X Enforcement Staging (B-02 pitfall — second highest-consequence wired fact)**

The wired profile has an "802.1x" enforcement field with three values:
- **Not configured** — profile delivered but enforcement state unspecified
- **Do not enforce** — profile configures settings but switch port is not required to authenticate
- **Enforce** — switch port requires 802.1X; if RADIUS unreachable or device has no cert, ALL wired access is blocked

DANGER callout content (Claude's discretion on phrasing, but must convey):
1. Deploy with "Do not enforce" first — confirm profile delivery, RADIUS reachability, and cert pipeline succeed.
2. Switch to "Enforce" only after verifying RADIUS is reachable and all devices have valid certificates.
3. Break-glass: if Enforce is set and RADIUS fails, the device loses wired access AND cannot receive the remediation policy update over wired (chicken-and-egg). Have a manual break-glass procedure (local admin + non-802.1X port or USB Ethernet).
[VERIFIED: PITFALLS.md B-02, STACK.md Building Block 9, Microsoft Learn wired settings ref]

Microsoft Learn wording (exact, load-bearing): "When enforced, the Wired AutoConfig service requires 802.1X for port authentication. Incorrect enforcement settings can block internet access, requiring manual policy removal."

**EAP types available in Wired profile:** EAP-TLS, Protected EAP (PEAP), EAP-TTLS, TEAP
[VERIFIED: STACK.md Building Block 4]

**Per-EAP-method config matrix for Wired** [VERIFIED: STACK.md Building Blocks 6–9, Microsoft Learn]:

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---------|---------|----------------|----------|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile ref | Trusted Certificate profile ref | Trusted Certificate profile ref |
| Perform server validation | (enforced via trusted root ref) | Yes — always | Yes — always |
| Disable user prompts for server validation | Yes | Yes | Yes |
| Require cryptographic binding | — | Available (PEAP hardening) | — |
| Client auth method | SCEP / PKCS / PFX Import / Derived credential | Username and Password | Username and Password |
| Inner method | — (cert-only) | MSCHAPv2 | PAP / CHAP / MS-CHAP / MS-CHAPv2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

**Key difference from Wi-Fi: PFX Import (PKCS Imported) is available as a client cert option for wired only** — not available in the Windows Wi-Fi profile UI.
[VERIFIED: STACK.md Building Block 6, 02-cert-delivery-foundation.md]

**Additional wired settings:**
- Authentication mode: same User / Machine / User or machine options as Wi-Fi
- Block period: configurable delay before retry after failed auth
- EAPOL timing: Authentication period, retry delay, start period, max EAPOL-start, max auth failures — all configurable (advanced; not required for standard deployments)

**TEAP Awareness Note content (D-11 — one paragraph, exact content)**:

TEAP (Tunneled EAP, RFC 7170) appears in the Windows wired-network profile UI as a fourth EAP type alongside EAP-TLS, PEAP, and EAP-TTLS. It is unique to Windows wired 802.1X — no other platform surfaces TEAP via Intune. TEAP chains machine and user credentials in a single authentication exchange using Primary EAP and Secondary EAP method selections, eliminating the need for separate machine-then-user re-authentication sequences. TEAP is not a co-equal configuration path in this guide set; for organizations evaluating TEAP, consult your RADIUS/NPS team to confirm NPS TEAP support before deployment.
[VERIFIED: STACK.md Building Block 9 (Table row: TEAP — Yes, unique to Windows wired); PITFALLS.md Table F: "TEAP deep-dive beyond awareness note — out of scope"; 01-eap-method-overview.md l.154 promise]

**Cert options for EAP-TLS client auth (Wired) — differs from Wi-Fi:**
- SCEP certificate
- PKCS certificate
- **PFX Import certificate (PKCS Imported)** — unique explicit option in wired profile UI
- Derived credential
[VERIFIED: STACK.md Building Block 6; 02-cert-delivery-foundation.md PFX Import section]

---

### KB5014754 Hybrid Entra Joined Callout

**Placement:** Standalone NOTE-style callout in `03-windows.md`, after the Wired subsection (or as a standalone section before See Also). NOT nested inside the EAP-TLS rows of the Wi-Fi or Wired matrix — cross-cuts both. [D-07]

**Freshness stamps (two-tier, D-06):**
- File front-matter: `last_verified: 2026-06-30`, `review_by: 2026-09-28` (90 days)
- Inline KB5014754 callout: `last_verified: 2026-06-30`, `review_by: 2026-12-27` (180 days)

**Callout content (D-08):**
- As of **2025-02-11**, Windows Domain Controllers entered enforcement mode for KB5014754 strong certificate mapping.
- **Hybrid Entra Joined** devices using EAP-TLS for 802.1X (Wi-Fi or wired) authenticate against NPS/RADIUS servers that perform Kerberos authentication against AD. DC enforcement requires the **SID (Security Identifier)** to be present in the certificate's Subject Alternative Name (SAN).
- **Action required:** In Intune SCEP and PKCS certificate profiles for Hybrid Entra Joined devices, configure the SAN to include the device or user SID. Intune supports SID-in-SAN inclusion in both SCEP and PKCS profiles.
- **Cloud-only Entra Joined devices are unaffected** — this requirement applies only when DCs are involved in the authentication chain.
[VERIFIED: STACK.md Building Block 12; Microsoft Learn "Plan for Change: Implement strong mapping for SCEP and PKCS certificates"]

---

### 00-overview.md Platform Entry (one-line edit, item 3)

Current text in `00-overview.md` (line ~28):
```
3–7. Platform guides (Phase 102–106) -- entries added as each guide is authored.
```

Must be replaced or augmented to add the Windows entry as item 3, updating the remaining "4–7" range. Suggested replacement:
```markdown
3. **[Windows 802.1X Admin Setup (Wi-Fi + Wired)](03-windows.md)** — Wi-Fi and wired profiles for all three EAP methods; dot3svc dependency and Remediation pattern; enforcement staging; KB5014754 strong certificate mapping.

4–7. Platform guides (Phase 103–106) -- entries added as each guide is authored.
```

[CITED: 00-overview.md l.28; CONTEXT.md Phase Boundary; ARCHITECTURE.md file placement]

---

## Architecture Patterns

### A3 Document Structure (locked by D-01/D-02/D-03)

```
03-windows.md
├── Front matter (YAML)
├── Scope banner (one-line → 02-cert-delivery-foundation.md#canonical-scope-callout)
├── Prerequisites (link to 01-eap-method-overview.md + 02-cert-delivery-foundation.md)
├── ## Common Profile Mechanics
│   ├── Authentication mode table (User/Machine/User-or-machine/Guest)
│   ├── PerformServerValidation requirement (link to 01- for security rationale)
│   ├── Anonymous outer identity guidance
│   └── One-sentence Settings Catalog note
├── ## Wi-Fi
│   ├── #### In Intune admin center (profile path)
│   └── Per-EAP-method config matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS in one grid)
├── ## Wired
│   ├── #### In Intune admin center (profile path)
│   ├── dot3svc service dependency (WARNING callout + Remediation pattern)
│   ├── 802.1X enforcement staging (DANGER callout)
│   ├── Per-EAP-method config matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS in one grid)
│   └── TEAP awareness note (one paragraph)
├── ## Hybrid Entra Joined — Strong Certificate Mapping (NOTE callout with 180-day stamp)
├── ## See Also
└── ## Change History
```

**Style precedents from corpus:**
- `#### In Intune admin center` compact subsection headers — from `docs/admin-setup-macos/03-configuration-profiles.md`
- `> **Label:** ...` blockquote callouts — corpus-wide convention
- Compact settings matrix with rows as settings, columns as EAP methods — from `01-eap-method-overview.md` EAP comparison table pattern
- Front-matter freshness stamps — from `02-cert-delivery-foundation.md`
- Plain GitHub auto-slug anchors; no `{#id}` overrides; avoid double-hyphen slugs [CITED: MEMORY.md anchor slugs note]

### Per-EAP-Method Matrix Format

Render as a markdown table with EAP methods as columns and settings as rows. Three columns (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS) enforces co-equal presentation by construction. Separate tables for Wi-Fi and Wired to accommodate the PFX Import difference.

### Callout Block Conventions

```markdown
> **NOTE — Hybrid Entra Joined:** ...content...
>
> *last_verified: 2026-06-30 · review_by: 2026-12-27*

> **WARNING — dot3svc service dependency:** ...

> **DANGER — 802.1X enforcement staging:** ...
```

Label severity: DANGER (enforcement staging — simultaneous wired lockout risk), WARNING (dot3svc — silent failure, per-device), NOTE (KB5014754 — scoped to Hybrid Entra Joined only).

---

## Don't Hand-Roll

| Problem | Don't Author | Use Instead | Why |
|---------|-------------|-------------|-----|
| EAP method explanations (what EAP-TLS authenticates, when to choose) | In-guide EAP prose | Link to `01-eap-method-overview.md` | Link-not-copy; already authoritative |
| Deployment ordering rule (trusted root → SCEP/PKCS → network profile) | Restating the ordering rule | Link to `02-cert-delivery-foundation.md#the-deployment-ordering-rule` | Link-not-copy; already authoritative |
| EKU (Client Authentication OID) requirement | EKU explanation in Windows guide | Link to `02-cert-delivery-foundation.md#eku-requirement-client-authentication` | Link-not-copy |
| RADIUS server-name validation concept | Explaining why validation matters | Link to `../_glossary-network.md#server-name-validation` | Link-not-copy |
| Per-platform cert-delivery support matrix | Windows-specific cert matrix rows | Link to `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix` | Link-not-copy; canonical home |
| PEAP-MSCHAPv2 rogue-RADIUS security rationale | Security explanation in Windows guide | Link to `01-eap-method-overview.md` (PEAP security note) | Link-not-copy |
| Global nav-hub wiring (index.md, quick-refs, capability matrices) | Any hub edits | Phase 109 | Navigation-last hard constraint |
| Productionized dot3svc PowerShell script pair | Detect-*.ps1 / Remediate-*.ps1 | Documented pattern + cmdlets (D-04/D-05) | SC2 mandates pattern; shipped script is freshness liability |

**Key insight:** The guide's value is the Windows-specific Intune UI paths, field names, and gotchas — not re-explaining 802.1X theory or certificate mechanics. Every prose sentence that explains shared concepts is a link-not-copy violation.

---

## Common Pitfalls

### Pitfall 1: dot3svc stopped — profile "Succeeded" but device not authenticated (B-01)

**What goes wrong:** The wired 802.1X profile reports "Succeeded" in Intune but dot3svc is stopped or Manual startup. The 802.1X supplicant never engages. Port stays unauthenticated.
**Why it happens:** Windows 10/11 ships dot3svc as Manual. Intune does not manage service startup via the wired network profile itself.
**How to avoid:** Document the service dependency prominently (WARNING callout); provide the Remediation pattern (D-04).
**Warning signs:** `sc query dot3svc` → STATE: STOPPED; no Dot3Svc/Operational event log events; wired shows "Unauthenticated" despite profile applied.

### Pitfall 2: Enforce before RADIUS/cert readiness — simultaneous wired lockout (B-02)

**What goes wrong:** Setting 802.1X enforcement to "Enforce" before confirming RADIUS reachability and valid client certificates blocks ALL wired-connected devices simultaneously. Removing the profile requires network access (chicken-and-egg).
**Why it happens:** "Enforce" is the intended production setting, deployed too early during initial rollout.
**How to avoid:** DANGER callout; staged rollout ("Do not enforce" first → validate → "Enforce"); break-glass procedure documented.
**Warning signs:** All wired devices on a switch lose connectivity simultaneously.

### Pitfall 3: Auth mode mismatch — no pre-logon connectivity (B-03)

**What goes wrong:** Profile configured for "User" auth mode on Hybrid Entra Joined devices. Group Policy and domain logon fail because the device is not on the network before a user logs in.
**Why it happens:** Auth mode is not prominently surfaced in the Intune UI; default is User mode.
**How to avoid:** Auth mode decision table in Common Mechanics section; note that Machine / User-or-machine requires a device cert profile alongside the user cert profile.

### Pitfall 4: PerformServerValidation disabled or server names blank — rogue RADIUS surface (A-05/C-02)

**What goes wrong:** The default Windows EAP XML skeleton ships with `PerformServerValidation = false`. If left as-is, devices accept any RADIUS certificate — rogue RADIUS can intercept the PEAP-MSCHAPv2 exchange and offline-crack the NT hash.
**Why it happens:** Admins use the default XML or disable validation to "get it working."
**How to avoid:** Never document or show examples with server validation disabled. Always populate "Certificate server names." DANGER-level security note in the guide.

### Pitfall 5: Anonymous outer identity omitted — UPN visible in cleartext (C-01/C-04)

**What goes wrong:** The real UPN from the certificate Subject (EAP-TLS) or the username (PEAP/TTLS) is sent in cleartext before the TLS tunnel is established. PII leakage and internal directory exposure.
**Why it happens:** "Identity privacy" field left blank; admins assume the cert/credentials are inside the tunnel from the start.
**How to avoid:** Identity privacy guidance in Common Mechanics section; apply to all three EAP methods.

---

## Code Examples (Planner Reference)

### dot3svc Remediation Pattern (for guide inclusion)

Detection script concept (D-04 pattern):
```powershell
# Detection: exits 1 (detected = issue present) if service not automatic and running
$svc = Get-Service -Name dot3svc
if ($svc.StartType -ne 'Automatic' -or $svc.Status -ne 'Running') {
    exit 1
}
exit 0
```

Remediation script concept (D-04 pattern):
```powershell
Set-Service -Name dot3svc -StartupType Automatic
Start-Service -Name dot3svc
```

Note to planner/implementer: These are documentation examples of the pattern. They are NOT production-grade scripts (no error handling, no logging, no parameterization). Per D-05, the guide does not ship a productionized script pair. The cmdlets appear as inline code in the guide body; the full scripts do not ship as attached files.
[VERIFIED: PITFALLS.md B-01; STACK.md Building Block 9]

### Freshness Stamp Template for KB5014754 Callout (D-06)

```markdown
> **NOTE — Hybrid Entra Joined: Strong Certificate Mapping Required**
>
> As of **2025-02-11**, Windows Domain Controllers enforce KB5014754 strong certificate
> mapping. Hybrid Entra Joined devices using EAP-TLS for 802.1X must include the device
> or user **SID in the certificate SAN**. Configure this in the Intune SCEP or PKCS
> profile's Subject Alternative Name settings. Cloud-only Entra Joined devices are
> unaffected — this requirement only applies when DCs are in the authentication chain.
>
> *last_verified: 2026-06-30 · review_by: 2026-12-27*
```

[VERIFIED: STACK.md Building Block 12; PITFALLS.md E-03 two-tier mechanism]

### Enforcement Staging DANGER Callout Template

```markdown
> **DANGER — 802.1X Enforcement Staging**
>
> Do not set enforcement to **Enforce** until you have confirmed:
> 1. The RADIUS server is reachable from managed devices.
> 2. All target devices have received valid client certificates.
> 3. A break-glass procedure exists (manual policy removal via a non-802.1X port or
>    local admin access) in case enforcement blocks all wired access.
>
> Setting **Enforce** before the cert pipeline is validated blocks ALL wired-connected
> devices simultaneously. Removing the enforcement policy requires network access --
> which is unavailable if enforcement has locked all ports.
>
> **Staged rollout:** Deploy with **Do not enforce** first. Confirm authentication
> succeeds on a pilot set of devices. Switch to **Enforce** only after validation.
```

[VERIFIED: PITFALLS.md B-02; STACK.md Building Block 9]

---

## Assumptions Log

> Claims tagged [ASSUMED] — all others in this research are [VERIFIED] or [CITED].

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Exact Intune UI field label for auth mode is "Authentication mode" with dropdown values "User", "Machine", "User or machine", "Guest" | Wi-Fi subsection, Wired subsection | Field labels might have shifted in a minor Intune update; verify at implementation time against current UI screenshot or Microsoft Learn field reference |
| A2 | The Intune Remediations UI path is `Devices > Remediations` | dot3svc Remediation pattern | Intune admin center navigation occasionally renames menu items; verify at implementation time |

If the table above is nearly empty (2 items), it reflects that virtually all facts in this research came from HIGH-confidence verified sources (Microsoft Learn 2026-06-29 via STACK.md, PITFALLS.md). The two assumptions above are UI-navigation details that are stable but should be spot-checked against the live portal at plan time.

---

## Open Questions (RESOLVED)

1. **Exact current Intune UI label for 802.1X enforcement field** — **RESOLVED:** label spellings ("Do not enforce" / "Enforce") delegated to the implementer to spot-check against the live portal / Microsoft Learn at authoring time. Cosmetic only; no structural impact on SC1–SC4 or task execution.
   - What we know: STACK.md calls it "802.1x enforcement" with value "Enforce"; Microsoft Learn wired settings ref (2026-06-04) uses "802.1x" as the setting category
   - What's unclear: Whether the dropdown labels are exactly "Not configured / Do not enforce / Enforce" in the current portal

2. **Whether 00-overview.md "3–7" text is a single line or formatted list** — **RESOLVED:** confirmed a single line (`00-overview.md` l.28, verified by direct inspection). The edit replaces that line with the item-3 entry + an updated "4–7" continuation line.
   - What we know: `00-overview.md` l.28 shows `3–7. Platform guides (Phase 102–106) -- entries added as each guide is authored.`

---

## Sources

### Primary (HIGH confidence — milestone research verified against Microsoft Learn 2026-06-29)
- `.planning/research/STACK.md` — Windows Wi-Fi/Wired profile facts: Building Blocks 1–2 (profile paths), 3–4 (EAP methods), 6 (client cert options), 7 (server trust settings), 8 (inner auth / outer identity), 9 (Windows-specific mechanics), 12 (KB5014754)
- `.planning/research/PITFALLS.md` — B-01 (dot3svc), B-02 (enforcement staging), B-03 (auth mode mismatch), A-05/C-02 (server validation / rogue-RADIUS), C-01/C-04 (outer identity), E-03 (freshness stamps), F (pitfall-to-phase mapping)
- `.planning/research/ARCHITECTURE.md` — HYBRID file layout, 03-windows.md as single deliverable, shared-vs-per-platform boundary
- `.planning/research/SUMMARY.md` — Phase 102 Windows summary (§Phase 102, ll.209–215); Per-Platform Coverage-Reality Matrix (ll.151–175); Q7 cadence note (l.343)

### Secondary (HIGH confidence — Phase 101 foundation files, already in repo)
- `docs/admin-setup-8021x/00-overview.md` — entry-point file to be edited; platform-list structure confirmed
- `docs/admin-setup-8021x/01-eap-method-overview.md` — TEAP awareness note promise (l.154); link targets for EAP concepts
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md` — scope callout template, ordering rule, cert matrix, PFX Import section

### Style Reference (HIGH confidence — repo inspection)
- `docs/admin-setup-macos/03-configuration-profiles.md` — `#### In Intune admin center` style; `> **What breaks:**` callout convention; guide structure precedent
- `.planning/phases/102-windows-802-1x-admin-setup-wi-fi-wired/102-CONTEXT.md` — locked decisions D-01 through D-11 (authoritative)

---

## Metadata

**Confidence breakdown:**
- Windows Wi-Fi profile facts (paths, EAP methods, fields): HIGH — Microsoft Learn 2026-06-29 via STACK.md
- Windows Wired profile facts (paths, EAP methods, enforcement, TEAP): HIGH — same source
- dot3svc Remediation pattern: HIGH — PITFALLS.md B-01 + Microsoft Learn wired settings ref
- KB5014754 callout content: HIGH — STACK.md Building Block 12
- A3 structure: HIGH — locked by CONTEXT.md decisions D-01/D-02/D-03
- Freshness stamp conventions: HIGH — PITFALLS.md E-03 two-tier mechanism

**Research date:** 2026-06-30
**Valid until:** 2026-09-28 (90-day file-level review cycle; KB5014754 callout valid 180 days to 2026-12-27)

---

## RESEARCH COMPLETE

**Phase:** 102 — Windows 802.1X Admin-Setup (Wi-Fi + Wired)
**Confidence:** HIGH

### Key Findings

- The A3 structure (Common Mechanics → Wi-Fi subsection → Wired subsection, per-EAP-method matrix in each) is locked and well-supported. The planner has exact Intune profile paths and EAP field names for both Wi-Fi and Wired at table-ready fidelity.
- The dot3svc B2 pattern is fully documented: detection cmdlet (`Get-Service dot3svc`), remediation cmdlets (`Set-Service -StartupType Automatic` + `Start-Service`), and Intune Remediations UI path.
- The KB5014754 two-tier freshness stamp is ready: file front-matter at 90 days (`review_by: 2026-09-28`), inline callout at 180 days (`review_by: 2026-12-27`).
- The PFX Import (PKCS Imported) distinction — unique to Windows wired, not available in Wi-Fi UI — is documented and ready for the wired EAP-TLS matrix row.
- TEAP one-paragraph awareness note content is written above and ready for verbatim use.
- The 00-overview.md edit is a surgical one-line replacement; the exact text is provided.

### File Created

`.planning/phases/102-windows-802-1x-admin-setup-wi-fi-wired/102-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Windows Wi-Fi profile paths + field names | HIGH | STACK.md Building Block 1/6–9; verified Microsoft Learn 2026-06-29 |
| Windows Wired profile paths + field names | HIGH | STACK.md Building Block 2/6–9; verified Microsoft Learn 2026-06-29 |
| dot3svc pattern + cmdlets | HIGH | PITFALLS.md B-01 + Microsoft Learn wired settings ref |
| KB5014754 callout content + dates | HIGH | STACK.md Building Block 12; enforcement date 2025-02-11 verified |
| A3 document structure | HIGH | Locked by CONTEXT.md; precedent in macOS-03 and 01-eap-method-overview.md |
| Freshness stamp two-tier mechanism | HIGH | PITFALLS.md E-03; confirmed by CONTEXT.md D-06 |

### Open Questions

- Exact UI label spellings for the 802.1X enforcement dropdown (minor cosmetic — verify at implementation)
- Exact Intune Remediations navigation path spelling (stable but verify at implementation)

### Ready for Planning

Research complete. Planner can now create PLAN.md for Phase 102.
