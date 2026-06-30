# Phase 105: Android Enterprise 802.1X Admin-Setup (Wi-Fi + Wired Gap) - Research

**Researched:** 2026-06-30
**Domain:** Android Enterprise 802.1X Wi-Fi profile configuration in Microsoft Intune; documentation authoring
**Confidence:** HIGH (all primary findings verified against live Microsoft Learn page, cross-checked against project research corpus)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All 14 sub-decisions are LOCKED and resolved. They are reproduced here verbatim for planner reference.

**Area A — Wired gap-stub treatment**
- **D-01:** Keep a top-level `## Wired` H2 (cross-guide parallelism with Windows/macOS/iOS), collapsed to a gap stub that leads with the gap statement (bottom-line-up-front).
- **D-02:** The Wired section is one paragraph of plain prose (HARD CAP: two short paragraphs, ~3–6 sentences total) containing exactly the four A4 facts. NO sub-headings, NO table/matrix, NO per-EAP rows, NO callout.
- **D-03:** Deliver the gap as a plain-prose bold lead-in, NOT a `> **Label:**` blockquote.
- **D-04:** The Wired stub states exactly: (1) no native Intune wired-network profile type exists for Android Enterprise; (2) no documented OMA-URI workaround; (3) alternative = consult the network/infrastructure team for switch-side/non-Intune wired 802.1X; (4) Wi-Fi 802.1X IS fully supported — point back to the Wi-Fi section.

**Area B — Enrollment-mode model**
- **D-05:** One Enterprise Wi-Fi configuration path + a compact mode-applicability matrix (COBO/COPE/COSU/BYOD-WP), NOT per-mode subsections. The matrix must capture the real cross-tab deltas — corporate-owned (COBO/COPE/COSU) uses field "Radius server name" and carries Android 11+/14+ notes; personally-owned (BYOD-WP) tab uses "Certificate server names" and carries the UPN-in-SAN deployment-failure note.
- **D-06:** Cover COBO/COPE/COSU/BYOD-WP in scope; give AOSP a one-line out-of-scope/stub note only.
- **D-07:** The mode matrix carries factual rows for both per-mode deltas — BYOD-WP → UPN-in-SAN, and Device-Owner (COBO/COSU/COPE) → cert-access-approval. Only UPN-in-SAN additionally earns the prescribed WARNING (see C1/C2); cert-access (B-08) stays structural/inline — no callout. Cert-access content (B-08): for Device Owner profiles set SCEP "Certificate access" to "Grant silently for specific apps" (Wi-Fi supplicant); note Device-Owner cert reporting/revocation limitation.

**Area C — UPN-in-SAN (B-06)**
- **D-08:** A standalone "What breaks" WARNING blockquote (not DANGER).
- **D-09:** ONE WARNING, homed IN the Wi-Fi/BYOD-WP cert-auth context, cross-referenced from the SCEP-cert pointer and mode matrix — not duplicated.
- **D-10:** Frame the hard deployment-failure as a BYOD personally-owned-work-profile requirement covering both user and device certificates within that work-profile context. Do NOT generalize to corporate-owned (COBO/COPE/COSU). Live MS Learn ground truth: the Note sits under "Enterprise (personally owned work profile)" tab and is ABSENT from Corporate-owned and AOSP tabs.

**Area D — Version-gated RADIUS callouts + MAC randomization**
- **D-11:** ONE combined version-gated callout covering both gates (Android 11+ row + Android 14+ row), presented as a mini version-matrix.
- **D-12:** WARNING tier for the combined version-gated RADIUS callout.
- **D-13:** MAC randomization (Android 13+) = plain-prose freshness-stamped Wi-Fi note, NOT a callout. State real control values verbatim: "Use device default / Use randomized MAC / Use device MAC". NAC environments must select "Use device MAC".
- **D-14:** DNS-suffix-not-FQDN-list guidance lives inside the Android-14+ line as the 256-char mitigation. The combined version-gated callout carries an inline `last_verified` / `review_by` at +90 days (siblings stamp `last_verified 2026-06-30 / review_by 2026-09-28`).

### Claude's Discretion

- Exact prose, callout phrasing/labels, anchor wording, section ordering within `06-android.md` — provided the locked decisions above and corpus conventions are honored (`> **Label:**` blockquote callouts; front-matter freshness stamps; plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap).
- Exact phrasing of the per-EAP-method Wi-Fi config matrix, mode-applicability matrix, Wired gap-stub paragraph, MAC-randomization note, B-06 "What breaks" WARNING, and combined version-gated RADIUS WARNING — within locked structure and guardrails.
- The exact WARNING label/wording for B-06 (must convey: BYOD personally-owned-work-profile cert SAN must include the UPN for user AND device certs; symptom = Wi-Fi profile deployment fails, shown as "Error" in Intune; fix = add UPN to the SCEP SAN; do NOT generalize to corporate-owned modes).
- The exact WARNING label/wording for the combined version-gate (must convey: Android 11+ requires the RADIUS server-name field or devices may not connect; Android 14+ caps total server-name length ≤256 chars and disallows special characters, profiles silently fail on 14; use the DNS suffix not full FQDN lists).
- Exact placement order of the MAC-randomization note relative to the Wi-Fi per-EAP matrix.
- The EAP-TTLS inner-method row content.

### Deferred Ideas (OUT OF SCOPE)

- Linux gap-and-workaround guide → Phase 106
- Android AOSP 802.1X depth → out of scope this milestone; one-line stub note only
- Android wired 802.1X workaround / switch-side config (MAB, port-auth, VLAN) → not this phase
- Capability-matrix 802.1X rows + global nav-hub wiring → Phase 109
- L1/L2 runbooks + decision tree → Phases 107–108
- Sibling-only mechanics (Windows dot3svc/TEAP/KB5014754; macOS deployment-channel keychain; iOS MAC label / M-series-iPad wired) → Phases 102/103/104
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-07 | An Intune admin can configure 802.1X Wi-Fi for Android Enterprise devices across all three EAP methods, including the UPN-in-SAN hard requirement (missing → profile deployment fails) and the version-gated RADIUS server-name behavior (Android 11+ required; Android 14+ ≤256 chars / no special chars), with the no-native-wired-profile gap documented explicitly (freshness-stamped). | Full coverage: Wi-Fi per-EAP matrix (verified live), UPN-in-SAN BYOD placement (live-verified under personally-owned tab), Android 11+/14+ version gates (live-verified), no-wired-profile gap (confirmed no OMA-URI workaround), MAC randomization Android 13+ (live-verified). |
</phase_requirements>

---

## Summary

Phase 105 delivers a single Markdown file (`docs/admin-setup-8021x/06-android.md`) plus a one-line edit to `docs/admin-setup-8021x/00-overview.md` (add item 6, narrow placeholder from "6–7" to "7"). This is a pure documentation authoring phase — no packages, no code. All technical facts are sourced from live Microsoft Learn documentation (verified 2026-06-30) and the shared research corpus (committed at `5150fa7`). The 14 locked decisions in CONTEXT.md are confirmed intact — zero drift detected between the research corpus and the live MS Learn page (last metadata commit 2026-06-22).

The guide structure follows the A3 Hybrid template (Common Mechanics → Wi-Fi → Wired) established in Phase 102, degraded for Android's gap: `## Wired` is retained for cross-guide parallelism but collapses to a plain-prose stub (two short paragraphs maximum, no callout, no table). Wi-Fi is the substantive section, carrying the full per-EAP matrix, the enrollment-mode compact matrix, two WARNING callouts (UPN-in-SAN for BYOD and version-gated RADIUS), a plain-prose MAC randomization note, and inline cert-access (B-08) structural documentation for Device Owner modes.

The signature Android risk is the UPN-in-SAN BYOD constraint: the MS Learn "Enterprise (personally owned work profile)" tab contains a Note block — confirmed ABSENT from the Corporate-owned and AOSP tabs — that profile *deployment* fails (not just authentication) if the UPN is missing from the cert SAN. This is the most consequential differentiator from all sibling platforms and must be prominently warned exactly once, in the Wi-Fi/BYOD-WP cert-auth context.

**Primary recommendation:** Clone the iOS guide (`05-ios.md`) as the structural nearest-sibling, strip iOS-specific content (M-series iPad wired matrix, "Disable MAC address randomization: Yes" label, PEAP-PAP wired note), apply the Android-specific A3 gap degradation for Wired, insert the two Android WARNINGs and the MAC-randomization plain-prose note, and wire the mode-delta table (corporate "Radius server name" vs BYOD "Certificate server names") into the Wi-Fi section.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Intune Wi-Fi profile authoring (configuration fields, field values, per-EAP matrix) | Documentation guide (`06-android.md`) | Foundation link targets (`01-`, `02-`) | The guide owns the Android-specific Intune UI field mapping; shared concepts link to `01-`/`02-` |
| UPN-in-SAN pitfall documentation | `06-android.md` Wi-Fi/BYOD-WP cert-auth section (single home) | Cross-reference from SCEP pointer and mode matrix | One callout, one home per link-not-copy discipline (same pattern as iOS B-05 in `05-ios.md:75`) |
| Version-gated RADIUS warning (Android 11+/14+) | `06-android.md` Wi-Fi section, combined WARNING callout | `02-cert-delivery-foundation.md:105–106` (already carries Android 11+/14+ notes; link back) | The combined callout with freshness stamp lives in the guide; the foundation file carries the overview reference |
| MAC randomization note (Android 13+) | `06-android.md` Wi-Fi section, plain-prose note | — | Android-platform-specific detail; not in foundation |
| Wired gap statement | `06-android.md` `## Wired` section (plain prose, no callout) | `00-overview.md:36` (already has the gap preview note) | The guide owns the gap explanation per A3 degradation; overview has a one-line preview |
| Navigation entry (item 6) | `docs/admin-setup-8021x/00-overview.md` | — | Local nav only; Phase 109 handles global nav |
| Shared concepts (server validation rationale, rogue-RADIUS, identity privacy, EAP comparison) | `01-eap-method-overview.md` / `02-cert-delivery-foundation.md` / `_glossary-network.md` | — | Link-not-copy: these are already homed; `06-android.md` links only |

---

## Standard Stack

This phase produces no installable packages. The "stack" is the document authoring pattern.

### Authoring Stack

| Asset | Location | Purpose |
|-------|----------|---------|
| Structural template | `docs/admin-setup-8021x/05-ios.md` | Nearest structural sibling to clone (A3 Hybrid: Common Mechanics → Wi-Fi → Wired; single-callout-plus-cross-ref; MAC note; front-matter stamps; See-Also / Change-History footer) |
| Per-EAP Wi-Fi matrix | `docs/admin-setup-8021x/04-macos.md:75` | Matrix format with Inner-method row |
| Gap degradation precedent | `102-CONTEXT.md:36` | "Android collapses the Wired subsection to a one-paragraph gap stub" |
| Link targets | `01-eap-method-overview.md`, `02-cert-delivery-foundation.md`, `_glossary-network.md` | EAP comparison, cert ordering, server-name validation, inner-outer identity, SCEP/PKCS |

### Package Legitimacy Audit

Not applicable — this phase installs no external packages.

---

## Architecture Patterns

### Document Structure (A3 Hybrid, gap-degraded)

```
docs/admin-setup-8021x/06-android.md
├── [YAML front-matter]        # last_verified / review_by / applies_to / audience / platform
├── Prerequisites banner       # same as siblings: link 01- and 02-
├── # Android Enterprise 802.1X Admin Setup: Wi-Fi
│   (title drops "and Wired" -- guide is Wi-Fi-primary; Wired is a gap stub)
├── > Scope banner             # link to 02-#canonical-scope-callout (one-line per D-06 Phase 101)
├── ## Common Profile Mechanics
│   ├── Three-profile sequence (Trusted Cert → SCEP/PKCS → Wi-Fi)
│   ├── No auth-mode-selector note (like siblings)
│   └── ## Server Validation   # security-requirement framing + link to 02- + rogue-RADIUS link to 01-
│   └── ## Anonymous Outer Identity  # identity privacy; link to _glossary-network.md#inner-outer-identity
├── ## Wi-Fi
│   ├── ### In Intune admin center   # navigation path
│   ├── Enrollment-mode note + mode-applicability matrix (COBO/COPE/COSU/BYOD-WP deltas)
│   ├── AOSP one-line out-of-scope stub note  (D-06)
│   ├── Per-EAP Wi-Fi config matrix (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS)
│   ├── > WARNING -- UPN-in-SAN BYOD  (C1/D-08/D-09; homed here per D-09 Referee revision)
│   ├── Cert-access (B-08) for Device Owner -- structural/inline, no callout  (D-07)
│   ├── > WARNING -- Version-gated RADIUS (Android 11+/14+, combined)  (D-11/D-12/D-14)
│   └── MAC randomization plain-prose note (Android 13+, freshness-stamped)  (D-13)
├── ## Wired
│   └── [Plain prose bold lead-in, two short paragraphs, four facts only]  (D-01/D-02/D-03/D-04)
├── ## See Also
└── ## Change History
```

### System Architecture Diagram

```
Admin reads pre-requisites
        |
        v
01-eap-method-overview.md --> [chooses EAP method]
        |
        v
02-cert-delivery-foundation.md --> [understands ordering rule + cert types]
        |
        v
06-android.md
  Common Profile Mechanics
    |           |
    v           v
  server     identity
  validation  privacy
  (links to   (links to
   02-/01-)    01-)
    |
    v
  Wi-Fi section
    |
    +---> mode-applicability matrix
    |       (corporate-owned: Radius server name)
    |       (BYOD-WP: Certificate server names + UPN-in-SAN WARNING)
    |
    +---> per-EAP config matrix
    |       EAP-TLS / PEAP / EAP-TTLS
    |
    +---> B-06 WARNING (BYOD UPN-in-SAN) [homed here]
    |
    +---> B-08 inline (Device Owner cert-access)
    |
    +---> version-gated RADIUS WARNING (Android 11+ / 14+) [freshness stamp]
    |
    +---> MAC randomization plain-prose note (Android 13+) [freshness stamp]
    |
    v
  Wired section (gap stub, plain prose only)
    |
    v
  [admin consults network team for wired 802.1X]
```

### Recommended File Layout

```
docs/admin-setup-8021x/
├── 00-overview.md           EDITED: add item 6 (Android link), narrow placeholder to "7"
├── 01-eap-method-overview.md     (link target -- do not modify)
├── 02-cert-delivery-foundation.md (link target -- do not modify)
├── 03-windows.md            (sibling -- do not modify)
├── 04-macos.md              (sibling -- do not modify)
├── 05-ios.md                (sibling -- do not modify)
└── 06-android.md            CREATED (this phase)
```

### Pattern 1: Mode-Applicability Matrix (enrollment-mode deltas)

The guide uses one Wi-Fi profile path for all AE modes. A compact matrix captures the two cross-tab UI deltas (D-05), sourced from live MS Learn verification.

```markdown
| Enrollment mode | Tab in Intune | Server name field | Key delta |
|---|---|---|---|
| Fully managed (COBO) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Corporate-owned Work Profile (COPE) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Dedicated (COSU) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Personally owned Work Profile (BYOD-WP) | Personally owned | **Certificate server names** | UPN-in-SAN required (profile deployment fails if absent) |
```

*[VERIFIED: learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-android-enterprise — live 2026-06-30]*

### Pattern 2: Per-EAP Wi-Fi Config Matrix (Android Enterprise)

All settings confirmed against live MS Learn corporate-owned and personally-owned tabs.

```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server name field (corporate-owned/AOSP) | Radius server name (DNS suffix or FQDN; Android 11+/14+ gates apply) | Radius server name | Radius server name |
| Server name field (BYOD personally-owned) | Certificate server names (FQDN or CN suffix; wildcard suffix supported) | Certificate server names | Certificate server names |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP, PKCS, or Derived credential | Username and Password | Username and Password, or Certificates (SCEP / PKCS) |
| Inner method (Non-EAP / inner identity) | -- (cert-only; no inner method) | None, or Microsoft CHAP Version 2 (MS-CHAP v2) | Unencrypted password (PAP) / Microsoft CHAP (MS-CHAP) / Microsoft CHAP Version 2 (MS-CHAP v2) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
```

**EAP-TTLS inner method precision:** The live page lists exactly three options for Android: "Unencrypted password (PAP)", "Microsoft CHAP (MS-CHAP)", "Microsoft CHAP Version 2 (MS-CHAP v2)". Plain CHAP (without "Microsoft") is NOT listed for any Android tab. [VERIFIED: live MS Learn 2026-06-30]

**PEAP inner method precision:** PEAP offers two inner options for Android: "None" or "Microsoft CHAP Version 2 (MS-CHAP v2)". [VERIFIED: live MS Learn 2026-06-30]

### Pattern 3: B-06 UPN-in-SAN WARNING (BYOD-WP home)

The WARNING lives in the Wi-Fi/BYOD-WP cert-auth context (homed per D-09 Referee revision). The exact text content is Claude's discretion; the structure and required facts are:

```markdown
> **WARNING -- [label conveying: BYOD personally-owned work profile Wi-Fi profile deployment fails if UPN absent from cert SAN]**
>
> [Must state:
>   - Applies to: BYOD personally-owned work profile ONLY (not COBO/COPE/COSU)
>   - Scope: both user and device certificates within the BYOD work-profile context
>   - Symptom: Wi-Fi profile shows "Error" in Intune (profile deployment fails, not just authentication)
>   - Cause: UPN absent from certificate Subject Alternative Name (SAN)
>   - Fix: in the SCEP profile for Android Enterprise, add "User principal name (UPN)" as a SAN attribute
>   - Do NOT generalize to corporate-owned enrollment modes
> ]
```

*[VERIFIED: learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-android-enterprise — personally-owned tab, live 2026-06-30: "When using any EAP type (EAP-TLS, PEAP, or EAP-TTLS) and certificates for authentication, it's required to include the user principal name (UPN) in the Subject Alternative Name (SAN) for user and device certificates. If the UPN isn't present in the SAN, the Wi-Fi profile deployment fails." — ABSENT from Corporate-owned and AOSP tabs.]*

### Pattern 4: Combined Version-Gated RADIUS WARNING (Android 11+/14+)

One combined WARNING with freshness stamp, mini version-matrix format.

```markdown
> **WARNING -- Android RADIUS server name version requirements**
>
> | Android version | Behavior |
> |---|---|
> | Android 11+ | New Wi-Fi profiles might require the Radius server name field to be configured. Without it, devices may not connect to the Wi-Fi network. |
> | Android 14+ | Total combined length of all configured RADIUS server names must be 256 characters or fewer; special characters not permitted. Profiles that worked on Android 11–13 may silently fail on Android 14 devices. **Use the DNS suffix** (e.g., `contoso.com`) instead of a list of full FQDNs to stay within the 256-character limit. |
>
> *last_verified: 2026-06-30 · review_by: 2026-09-28*
```

**Scope note:** The Android 11+/14+ gates apply to the "Radius server name" field in the corporate-owned and AOSP tabs. The personally-owned (BYOD-WP) tab uses "Certificate server names" and does not show the same Android-version sub-bullets in the live page — the version gates are framed for the corporate-owned "Radius server name" field. Executor should scope the WARNING clearly to the "Radius server name" context (corporate-owned/AOSP) while noting general server-name validation applies to all modes via the link to `02-`.

*[VERIFIED: live MS Learn 2026-06-30 — corporate-owned tab, "Radius server name" field for EAP-TLS, EAP-TTLS, and PEAP all carry identical Android 11+ and Android 14+ sub-bullets.]*

### Pattern 5: MAC Randomization Plain-Prose Note (Android 13+)

Not a callout. Plain-prose freshness-stamped note in the Wi-Fi section (D-13).

```markdown
**MAC address randomization (Android 13+):**

For NAC (Network Access Control) environments where the RADIUS policy is keyed to device
MAC address, set **Use device MAC** in the Wi-Fi profile. With this option, the device
presents its actual Wi-Fi MAC address instead of the per-network randomized MAC.
The full set of options is: **Use device default / Use randomized MAC / Use device MAC**.
Without "Use device MAC", NAC environments will see a different MAC address each time
the device joins a new network, causing RADIUS to reject devices whose MACs are not in
the allow list.

*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

**Critical:** Android's control name is "Use device MAC" -- do NOT use iOS's "Disable MAC address randomization: Yes". [VERIFIED: live MS Learn 2026-06-30]

### Pattern 6: Wired Gap Stub (Plain Prose, D-01/D-02/D-03/D-04)

```markdown
## Wired

**Android Enterprise has no native Intune wired-network profile type.** Unlike Windows,
macOS, and iOS/iPadOS -- which each have a dedicated Intune wired (Ethernet) network
profile -- there is no equivalent profile type for Android Enterprise and no documented
OMA-URI workaround. Organizations that require wired 802.1X authentication for Android
Enterprise devices should consult their network or infrastructure team for switch-side
configuration options (such as port-based authentication or alternative access policies)
outside of Intune's device management surface. Android Enterprise Wi-Fi 802.1X is fully
supported through Intune; see the [Wi-Fi section](#wi-fi) above.
```

Constraints: no callout, no sub-headings, no table, no per-EAP rows. Bold lead only. Two short paragraphs maximum (the above example is one; a second is permitted if needed for clarity). D-04 four facts must all be present: (1) no native profile, (2) no OMA-URI workaround, (3) network team consult, (4) Wi-Fi IS supported.

### Pattern 7: Device Owner Cert-Access (B-08) — Structural/Inline, No Callout

In the Wi-Fi section, after the per-EAP matrix, inline structural guidance (D-07):

```markdown
**Certificate access for Device Owner modes (COBO, COPE, COSU):**

In the SCEP certificate profile for Android Enterprise Device Owner enrollment types,
configure **Certificate access** to **Grant silently for specific apps** and include
the Wi-Fi supplicant in the allowed apps list. The default setting ("Require user
approval for all apps") is silently rejected on fully managed devices where no user
interaction is available, causing 802.1X authentication to fail even when the
certificate profile shows "Succeeded" in Intune.

Note: For Device Owner profiles, Intune certificate reporting is unavailable and
Intune cannot revoke certificates delivered via this profile type.
```

*[VERIFIED: PITFALLS B-08 + live SCEP profiles reference; structural placement, no callout per D-07 / Section F `:585`]*

### Pattern 8: AOSP One-Line Stub Note (D-06)

Single inline sentence, not a section, not a callout:

```markdown
> **Note:** AOSP (Android Open Source Project) devices are a distinct platform without
> Google Mobile Services (GMS). AOSP Wi-Fi 802.1X uses the same Intune profile path but
> is out of scope for this guide; cert-delivery options (no PKCS Imported) differ. See
> the Android Enterprise documentation or your Intune console for AOSP-specific settings.
```

Or as inline plain prose with no callout. Exact form is Claude's discretion; must not be a full coverage treatment.

### Pattern 9: 00-overview.md Item-6 Edit

Current state at `00-overview.md:34` (after Phase 104 edit narrowed to "6–7"):
```
6–7. Platform guides (Phase 105–106) -- entries added as each guide is authored.
```

Required edit — replace with:
```
6. **[Android Enterprise 802.1X Admin Setup (Wi-Fi)](06-android.md)** -- Wi-Fi profiles
   for all three EAP methods across COBO/COPE/COSU/BYOD work profile modes; UPN-in-SAN
   deployment requirement for personally-owned work profile; version-gated RADIUS
   server-name behavior (Android 11+/14+); no native wired profile (gap documented).

7. Platform guide (Phase 106) -- entry added when guide is authored.
```

Also update the Mermaid `C[3–7.]` label to `C[3–7.]` (or analogous label) and the Change History footer.

### Anti-Patterns to Avoid

- **Cloning iOS MAC label verbatim:** iOS uses "Disable MAC address randomization: Yes". Android uses "Use device MAC". These are different controls with different names.
- **Adding the UPN-in-SAN WARNING to the Common Mechanics section:** The failure is BYOD-WP-specific. An all-mode Common Mechanics home would mis-scope it to COBO/COPE/COSU — directly contradicting D-10.
- **Two UPN-in-SAN WARNINGs:** Single-callout-plus-cross-ref. One home in Wi-Fi/BYOD-WP cert-auth context; cross-references from SCEP pointer and mode matrix — not a second standalone WARNING.
- **Wired callout or table:** The Wired section must NOT have a `> **Label:**` callout (D-03), a table/matrix (D-02), or sub-headings (D-02). Plain prose only.
- **Generalizing UPN-in-SAN to "all enrollment types":** PITFALLS B-06 (`:295`) contains the incorrect "all enrollment types" framing. The live MS Learn page is dispositive: the Note is under the personally-owned tab only. Do NOT follow B-06's enrollment-type scope.
- **Two separate version-gate callouts:** One combined WARNING for Android 11+ and Android 14+ (D-11), not two.
- **Cloning macOS deployment-channel or iOS M-series iPad wired content:** No Android equivalents exist. Do not import.
- **Calling out cert-access (B-08) with a WARNING or NOTE blockquote:** B-08 is structural/inline only per Section F `:585` and D-07.
- **Double-hyphen trap in anchor slugs:** Plain GitHub auto-slugs; no `{#id}` overrides. Check: a heading like `## Wi-Fi and Wired` would slug as `wi-fi-and-wired`, not `wi-fi--and--wired`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Server-validation rationale | Inline prose restating rogue-RADIUS risk | Link to `01-eap-method-overview.md#peap-mschapv2` and `02-cert-delivery-foundation.md` | Link-not-copy; these are already homed |
| EAP method comparison / when-to-choose | Inline comparison table | Link to `01-eap-method-overview.md` | Restating duplicates and risks drift |
| Cert-delivery ordering rule | Inline ordered list re-explaining trusted-root → SCEP → Wi-Fi | Link to `02-cert-delivery-foundation.md` (ordering rule CRITICAL callout) | Already homed; link only |
| SCEP/PKCS concept explanation | Inline glossary entries | Link to `_glossary-network.md#scep` and `#pkcs` | Already defined in Phase 101 glossary |
| Identity privacy concept explanation | Inline concept section | Link to `_glossary-network.md#inner-outer-identity` | Already defined |
| Per-platform cert-delivery support matrix | Reproduce table inline | Link to `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix` | Single source of truth |

**Key insight:** The A3 template enforces a single link-target-per-concept discipline. Every shared concept in this guide has already been homed in a Phase 101 foundation file. The per-platform guide must link, never restate.

---

## Common Pitfalls

### Pitfall 1: UPN-in-SAN Scope Creep (BYOD-only constraint generalized to all modes)
**What goes wrong:** Executor reads PITFALLS B-06 (`:295`) "all enrollment types ... Fully Managed, COPE" and writes the WARNING as applying to all AE modes.
**Why it happens:** B-06 was authored before the live MS Learn page was re-verified by the Adversary and Referee. B-06 is the inaccurate outlier.
**How to avoid:** Use the live MS Learn fact (Note sits under personally-owned tab only, ABSENT from corporate-owned and AOSP tabs) as authoritative. D-10 is locked.
**Warning signs:** The WARNING text mentions "Fully Managed" or "COPE" or "COBO" as enrollment types that also require UPN-in-SAN.

### Pitfall 2: Two WARNING Callouts for UPN-in-SAN
**What goes wrong:** A second standalone WARNING block appears in Common Mechanics or SCEP cert section in addition to the homed WARNING.
**Why it happens:** Trying to make the WARNING visible from multiple entry points.
**How to avoid:** Single-callout-plus-cross-ref pattern (D-09): home once in Wi-Fi/BYOD-WP cert-auth context; cross-reference with a link (not a duplicate WARNING) from the SCEP pointer and mode matrix.
**Warning signs:** Two `> **WARNING` blocks containing UPN-in-SAN content.

### Pitfall 3: Android 14+ Gate Applied to Personally-Owned Tab
**What goes wrong:** Executor documents the Android 11+/14+ version gates as applying equally to the personally-owned "Certificate server names" field.
**Why it happens:** The combined version-gate callout doesn't distinguish which field it applies to.
**How to avoid:** The live MS Learn page shows the Android 11+ and Android 14+ sub-bullets under the corporate-owned/AOSP "Radius server name" field only. The personally-owned "Certificate server names" field does not show these sub-bullets in the live page. Scope the combined version-gate WARNING to the "Radius server name" field (corporate-owned context); add a note that server-name validation applies to all modes via the link to `02-`.
**Warning signs:** The combined version-gate WARNING says "applies to all enrollment modes" without distinguishing the field name.

### Pitfall 4: Wired Gap Stub Overshot
**What goes wrong:** The Wired section grows a sub-heading, callout, per-EAP table, or third paragraph.
**Why it happens:** Author instinct to be thorough.
**How to avoid:** Hard cap: two short paragraphs (~3–6 sentences total), no callout, no sub-headings, no table/matrix (D-02). The only structure permitted is a bold lead-in (D-03).
**Warning signs:** A `> **NOTE:**` or `> **WARNING:**` block under `## Wired`; a `###` sub-heading; a markdown table with EAP rows.

### Pitfall 5: Mac Randomization as Callout
**What goes wrong:** MAC randomization note becomes a `> **NOTE:**` or `> **WARNING:**` blockquote.
**Why it happens:** It feels like a deployment risk deserving a callout.
**How to avoid:** D-13 is explicit: plain-prose freshness-stamped note, NOT a callout. Section F has no callout prescription for MAC randomization. Same treatment as iOS 104 D-02.
**Warning signs:** A blockquote containing "Use device MAC" or "MAC randomization".

### Pitfall 6: EAP-TTLS Inner Method Includes Plain CHAP
**What goes wrong:** The Wi-Fi config matrix lists "CHAP" as an inner method option for EAP-TTLS on Android.
**Why it happens:** macOS and iOS matrices list CHAP; executor clones without checking Android's specific list.
**How to avoid:** Android EAP-TTLS inner methods are PAP / MS-CHAP / MS-CHAPv2. "CHAP" (plain CHAP without "Microsoft") is NOT listed for Android on either the corporate-owned or personally-owned tabs.
**Warning signs:** Matrix row shows "PAP / CHAP / MS-CHAP / MS-CHAP v2" for Android (same as macOS).

### Pitfall 7: Using iOS MAC Label on Android
**What goes wrong:** "Disable MAC address randomization: Yes" appears in the Android guide.
**Why it happens:** Direct clone from `05-ios.md:57`.
**How to avoid:** Android's control is "Use device MAC" — a distinctly different UI label with three-option semantics. Strip and replace.
**Warning signs:** "Disable MAC address randomization" anywhere in `06-android.md`.

---

## Live Verification Summary (2026-06-30)

**Source:** `https://learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-android-enterprise`
**Page metadata date:** `ms.date: 2025-06-17` (doc content) / `updated_at: 2026-06-22` (metadata commit)
**Verdict: ZERO DRIFT from locked decisions.**

| Locked fact | Live page finding | Status |
|---|---|---|
| UPN-in-SAN Note sits under personally-owned tab only | Confirmed: Note is in the `# [Personally owned]` tab under "EAP type" preamble. Text: "When using any EAP type (EAP-TLS, PEAP, or EAP-TTLS) and certificates for authentication, it's required to include the user principal name (UPN) in the Subject Alternative Name (SAN) for user and device certificates. If the UPN isn't present in the SAN, the Wi-Fi profile deployment fails." | UPHELD |
| Note ABSENT from Corporate-owned and AOSP tabs | Confirmed: No UPN-in-SAN Note appears under `# [Corporate-owned]` or `# [AOSP]` tabs. | UPHELD |
| Corporate-owned field name: "Radius server name" | Confirmed: Under `# [Corporate-owned]` Enterprise section, all three EAP methods show field "Radius server name". | UPHELD |
| Personally-owned field name: "Certificate server names" | Confirmed: Under `# [Personally owned]` Enterprise section, EAP-TLS shows "Certificate server names" (with "Add one or more common names"). | UPHELD |
| Android 11+ gate on Radius server name | Confirmed: "Android 11 and newer: New Wi-Fi profiles might require this setting be configured. Otherwise, the devices might not connect to your Wi-Fi network." | UPHELD |
| Android 14+ gate: ≤256 chars, no special chars, DNS suffix | Confirmed: "Android 14 and newer: Google doesn't allow the total content length of all the Radius servers to be greater than 256 characters or to include special characters. If you have multiple Radius servers with the same DNS suffix in their fully qualified domain name, then we recommend you enter only the suffix." | UPHELD |
| MAC randomization: "Use device default / Use randomized MAC / Use device MAC" (Android 13+) | Confirmed: All three options listed under MAC address randomization on both Basic and Enterprise corporate-owned sections. "This feature applies to: Android 13 and later." | UPHELD |
| EAP-TTLS inner: PAP / MS-CHAP / MS-CHAPv2 ONLY (no plain CHAP) | Confirmed: Listed as "Unencrypted password (PAP)", "Microsoft CHAP (MS-CHAP)", "Microsoft CHAP Version 2 (MS-CHAP v2)" for both corporate-owned and personally-owned tabs. Plain CHAP not listed. | UPHELD |
| PEAP inner: None or MS-CHAPv2 | Confirmed: "None" and "Microsoft CHAP Version 2 (MS-CHAP v2)" listed for corporate-owned; same for personally-owned. | UPHELD |

[VERIFIED: learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-android-enterprise, live fetch 2026-06-30]

---

## Runtime State Inventory

Not applicable — this is a greenfield documentation phase. No runtime state migration required.

---

## Environment Availability

Step 2.6: SKIPPED — this phase is a pure documentation authoring phase. The only dependency is write access to the git working tree (confirmed). No external services, databases, CLI tools, or runtimes are required beyond the standard text editor / git workflow.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| `00-overview.md` item placeholder "6–7" | Item 6 = Android guide; placeholder narrows to "7" | This phase | One-line edit to overview; pattern established by Phases 103/104 |
| No Android Enterprise 802.1X guide in suite | `06-android.md` authored | This phase | DOT1X-07 satisfied |
| PITFALLS B-06 "all enrollment types" UPN-in-SAN scope | Live-verified: BYOD-WP only (personally-owned tab); B-06 `:295` is the inaccurate outlier | 2026-06-30 Adversary + Referee live re-verification | D-10 locked; guide must NOT follow B-06's enrollment-type scope |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The personally-owned (BYOD-WP) tab "Certificate server names" field does not carry Android 11+/14+ version-gate sub-bullets (these are only on the corporate-owned "Radius server name" field). | Pattern 4 / version-gate WARNING scope note | If the personally-owned tab also has the 11+/14+ gates on "Certificate server names", the combined WARNING needs a broader scope statement. Plan-time: re-confirm from the live page. |
| A2 | AOSP tab uses "Radius server name" (same field as corporate-owned) with the Android 11+ language but WITHOUT the Android 14+ constraint text. | AOSP one-line stub note | If AOSP also has the 14+ constraint, the stub note may need to mention it. Low risk: AOSP is out-of-scope for this guide; one-line stub. |
| A3 | Intune admin center currently shows "Certificate access" in SCEP profile for Android Enterprise Device Owner as a distinct UI field with "Grant silently for specific apps" option. | Pattern 7 (B-08 inline) | If the UI field name has changed, the inline documentation would be inaccurate. Planner should verify at plan time via Intune console if possible. |

**If this table is empty:** Claims A1/A2/A3 are low-risk and flagged for plan-time spot-check, not blockers.

---

## Open Questions

1. **Plan-time: Re-confirm UPN-in-SAN Note placement has not moved tabs**
   - What we know: Adversary, Referee, and this research session all confirmed the Note is under the personally-owned tab (2026-06-30)
   - What's unclear: Google/Android cert-SAN constraints can drift between Android releases
   - Recommendation: Executor should spot-check the live page at authoring time; carry freshness stamp on the mode matrix row that references it.

2. **Plan-time: Exact AOSP Enterprise EAP-TTLS inner method list**
   - What we know: AOSP Enterprise EAP-TTLS in the live page does not list inner methods explicitly (the live AOSP tab shows EAP-TLS, EAP-TTLS, PEAP but inner auth for EAP-TTLS under AOSP was not surfaced in the fetched content)
   - What's unclear: Whether AOSP supports the same PAP/MS-CHAP/MS-CHAPv2 list as corporate-owned
   - Recommendation: AOSP is a one-line out-of-scope stub (D-06); no EAP-TTLS inner method content needed for AOSP in this guide.

3. **Plan-time: 00-overview.md Mermaid label update scope**
   - What we know: The Mermaid diagram shows `C[3–7. Platform Guides]`; Phase 104 added item 5 and narrowed to "6–7"
   - What's unclear: Whether the Mermaid node label needs updating or just the descriptive list
   - Recommendation: Update both the list item (item 6) and the Mermaid node if the label is version-specific; otherwise leave Mermaid as-is. Pattern from Phase 104 edit (`:60`) is precedent.

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/configuration/wi-fi-settings-android-enterprise] — Live fetch 2026-06-30; last metadata commit 2026-06-22; doc content date 2025-06-17. Verified: UPN-in-SAN personally-owned tab placement; field name delta (Radius server name vs Certificate server names); Android 11+/14+ gates; MAC randomization three options; EAP-TTLS and PEAP inner method lists.
- [VERIFIED: `.planning/research/STACK.md`] — Android Enterprise section (`:235–245`); no wired profile / no OMA-URI (`:37`, `:245`); EAP-TTLS inner methods (`:171`); RADIUS server-name version gates (`:149`)
- [VERIFIED: `.planning/research/PITFALLS.md`] — B-06 (`:289–308`), B-07 (`:311–323`), B-08 (`:326–344`); Section F callout prescription table (`:568–599`)
- [VERIFIED: `.planning/research/SUMMARY.md`] — Per-platform coverage-reality matrix (`:151–180`); Android wired gap reading guide (`:178–179`); Research Q7 freshness intervals (`:343`)
- [VERIFIED: `docs/admin-setup-8021x/05-ios.md`] — Structural template; single-callout-plus-cross-ref (`:75`, `:134`); MAC note pattern (`:56–62`); front-matter; See-Also/Change-History
- [VERIFIED: `docs/admin-setup-8021x/04-macos.md`] — Per-EAP Wi-Fi matrix (`:75`); Inner-method row format
- [VERIFIED: `docs/admin-setup-8021x/00-overview.md`] — Current state; item placeholder at `:34`; Change History (`:60`) showing item-5 pattern

### Secondary (MEDIUM confidence)
- [CITED: `.planning/phases/105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap/105-CONTEXT.md`] — All 14 locked decisions; Referee's BYOD-scoping correction (D-09); live re-verification log

### Tertiary (LOW confidence)
- [ASSUMED A1] — Personally-owned "Certificate server names" field does not carry Android 11+/14+ sub-bullets (not explicitly confirmed in live fetch; the fetch returned corporate-owned sub-bullets for all three EAP types but personally-owned EAP type sections did not show the same version-gate bullets)
- [ASSUMED A3] — "Grant silently for specific apps" is the current Intune UI label for Device Owner cert-access option (based on PITFALLS B-08; not re-verified against live Intune console)

---

## Metadata

**Confidence breakdown:**
- Deliverable structure: HIGH — live-verified, sibling templates read, 14 locked decisions confirmed
- Per-EAP Wi-Fi field values: HIGH — live MS Learn page verified all three EAP methods for both corporate-owned and personally-owned tabs
- UPN-in-SAN BYOD scope: HIGH — live-verified by this session + Adversary + Referee (three independent verifications)
- Android 11+/14+ gates: HIGH — live-verified
- MAC randomization control name/version: HIGH — live-verified
- EAP-TTLS inner method list (no plain CHAP): HIGH — live-verified
- Wired gap (no profile, no OMA-URI): HIGH — confirmed in STACK.md and live page contains no wired profile section
- Cert-access B-08 UI label: MEDIUM — sourced from PITFALLS research; plan-time spot-check recommended

**Research date:** 2026-06-30
**Valid until:** 2026-09-28 (90-day cadence; Android version-gated content)

---

*Phase: 105-android-enterprise-802-1x-admin-setup-wi-fi-wired-gap*
*Research completed: 2026-06-30*
