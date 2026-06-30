# Phase 105: Android Enterprise 802.1X Admin-Setup -- Pattern Map

**Mapped:** 2026-06-30
**Files analyzed:** 2 (1 CREATE + 1 EDIT)
**Analogs found:** 2 / 2 (both with multiple supporting analogs)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/admin-setup-8021x/06-android.md` | documentation guide (per-platform 802.1X admin setup) | request-response (admin reads → configures Intune) | `docs/admin-setup-8021x/05-ios.md` | exact structural sibling |
| `docs/admin-setup-8021x/00-overview.md` | documentation index (platform list + Mermaid) | n/a (static nav) | `docs/admin-setup-8021x/00-overview.md` (self, item-5 pattern) | self-edit, exact precedent at lines 32 + 60 |

---

## Pattern Assignments

### `docs/admin-setup-8021x/06-android.md` (CREATE)

**Primary analog:** `docs/admin-setup-8021x/05-ios.md`
**Secondary analog:** `docs/admin-setup-8021x/04-macos.md` (per-EAP matrix Inner-method row format)

The Android guide is a gap-degraded clone of `05-ios.md`. Clone the skeleton; strip iOS-only content; insert Android-specific elements per the sections below.

---

#### Element 1: YAML Front-Matter Block

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 1-7

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: ios
---
```

**Android delta:** Change `platform: ios` to `platform: android`. All other fields identical. The `both` value for `applies_to` carries over (guide covers Wi-Fi for all AE modes, Wired gap).

---

#### Element 2: Prerequisites Banner

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 9-10

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

**Android delta:** None -- clone verbatim.

---

#### Element 3: H1 Title

**Analog:** `docs/admin-setup-8021x/05-ios.md` line 12

```markdown
# iOS/iPadOS 802.1X Admin Setup: Wi-Fi and Wired
```

**Android delta:** Use `# Android Enterprise 802.1X Admin Setup: Wi-Fi` (drop "and Wired" -- the guide is Wi-Fi-primary; Wired is a gap stub, not a full section). This is a deliberate departure from the sibling title form; do not add "and Wired" back.

---

#### Element 4: Scope Banner (One-Line)

**Analog:** `docs/admin-setup-8021x/05-ios.md` line 14

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

**Android delta:** None -- clone verbatim. This is the one-line scope banner prescribed by Phase 101 D-06; the link target `02-cert-delivery-foundation.md#canonical-scope-callout` is platform-agnostic.

---

#### Element 5: Common Profile Mechanics Section

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 16-45 (structural model); `docs/admin-setup-8021x/04-macos.md` lines 16-55 (no-auth-mode-selector wording variant)

**iOS version (lines 16-26):**
```markdown
## Common Profile Mechanics

iOS/iPadOS 802.1X requires three distinct Intune configuration profiles -- not a single combined
configuration. Deploy them in this sequence:

1. A **Trusted Certificate** profile delivering the RADIUS server's root CA certificate (for
   server validation).
2. A **SCEP** or **PKCS** client certificate profile delivering the device identity certificate
   (for client authentication -- Wi-Fi only; wired requires SCEP only, see Wired section).
3. A **Wi-Fi** or **Wired network** profile referencing the trusted certificate and client
   certificate profiles above.
```

**Android delta:** The three-profile sequence is the same (Trusted Cert → SCEP/PKCS → Wi-Fi). Remove the "wired requires SCEP only" parenthetical -- Android has no wired profile at all. Step 3 references only the Wi-Fi profile type. Remove the `.mobileconfig` note (iOS-only). Keep the link-not-copy pointer to `02-cert-delivery-foundation.md` for the ordering rule.

**No-auth-mode-selector note:**
`05-ios.md` lines 26-27 and `04-macos.md` lines 37-38 both carry this. Clone for Android with appropriate platform name:

```markdown
Android Enterprise does not expose a User / Machine / User-or-machine authentication mode
selector in Intune profiles.
```

**Server Validation subsection (`### Server Validation`):**
**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 28-34 / `04-macos.md` lines 39-45

```markdown
### Server Validation

Always populate **Certificate server names** for every EAP method on both Wi-Fi and wired
connections, and always reference a **Root certificate for server validation** profile. This is
a security requirement, not merely a configuration option.
```

**Android delta:** The rationale paragraph (lines 31-34 of `05-ios.md`) is iOS/macOS-specific (dynamic trust dialog, OS security violation). For Android, the link-not-copy pattern applies: link to `02-cert-delivery-foundation.md` and `01-eap-method-overview.md#peap-mschapv2` rather than restating the per-OS behavior. The `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 100-106 carry the Android-specific RADIUS server-name notes (11+/14+) -- link there.

**Anonymous Outer Identity subsection (`### Anonymous Outer Identity (Identity Privacy)`):**
**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 36-44 / `04-macos.md` lines 47-55

```markdown
### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy (outer identity)** field in every iOS/iPadOS 802.1X profile to
prevent cleartext identity leakage before the authentication tunnel is established. For the
inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** ... Set Identity privacy to `anonymous` or `anonymous@contoso.com` ...
- **PEAP-MSCHAPv2:** ... Set Identity privacy to `anonymous` or `anonymous@contoso.com` ...
- **EAP-TTLS:** ... Set Identity privacy to `anonymous` or `anonymous@contoso.com` ...
```

**Android delta:** Replace "iOS/iPadOS" with "Android Enterprise". The link target `../_glossary-network.md#inner-outer-identity` is platform-agnostic -- keep it. The three-bullet EAP breakdown clones verbatim except platform name.

---

#### Element 6: `## Wi-Fi` Section Header + `### In Intune admin center` Navigation Path

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 48-53 / `04-macos.md` lines 59-65

```markdown
## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **iOS/iPadOS** > **Templates** > **Wi-Fi**

Select **Wi-Fi type: Enterprise** to access EAP authentication settings. The following matrix
covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no
method is ranked or recommended as a default. For when to choose each method, see
[01-eap-method-overview.md](01-eap-method-overview.md).
```

**Android delta:** Change `iOS/iPadOS` to `Android Enterprise` in the navigation path. The `Wi-Fi type: Enterprise` phrasing and the co-equal-EAP boilerplate clone verbatim.

---

#### Element 7: Enrollment-Mode Note + Mode-Applicability Matrix

**Role classification:** mode-applicability matrix (new element -- no prior platform had enrollment modes)

**Closest analog:** `docs/admin-setup-8021x/04-macos.md` lines 106-119 (Network Interface selector table -- different content but same compact table-within-Wi-Fi-section format)

**macOS Network Interface table format (lines 106-119):**
```markdown
**Network Interface selector:**

The **Network Interface** field determines which Ethernet interface is configured...

| Option | Behavior |
|--------|----------|
| **First active Ethernet** (default) | Uses the first working Ethernet interface... |
...
```

**Android mode matrix (from RESEARCH.md Pattern 1):**
```markdown
| Enrollment mode | Tab in Intune | Server name field | Key delta |
|---|---|---|---|
| Fully managed (COBO) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Corporate-owned Work Profile (COPE) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Dedicated (COSU) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Personally owned Work Profile (BYOD-WP) | Personally owned | **Certificate server names** | UPN-in-SAN required (profile deployment fails if absent) |
```

**Pattern to apply:** introduce the matrix with a bold lead-in sentence explaining that all AE modes use the same Intune Wi-Fi path (STACK :23) and the matrix documents the UI field-name delta between tabs. Add a cross-ref note from the BYOD-WP row pointing to the UPN-in-SAN WARNING (per D-09 single-callout-plus-cross-ref discipline).

---

#### Element 8: AOSP One-Line Out-of-Scope Stub Note

**Role classification:** out-of-scope stub (new element -- no prior analog in corpus)

**Closest analog:** none. The `00-overview.md` lines 36-37 carry a one-line Wired availability note that uses an inline note format (plain prose, no blockquote). Apply that same inline-note format rather than a `> **NOTE:**` callout (callout discipline: AOSP is not Section-F-prescribed).

**`00-overview.md` line 36 inline note format:**
```markdown
> **Wired 802.1X availability note:** Android Enterprise has no native Intune wired-network
> profile type -- Wi-Fi only...
```

**Android AOSP stub:** A brief inline sentence (not a blockquote) after the mode matrix -- e.g.: "AOSP (Android Open Source Project) devices share the same Intune Wi-Fi profile path but are a distinct no-GMS platform out of scope for this guide; cert-delivery options differ (no PKCS Imported)."

**Match quality:** no-analog -- use inline plain prose (not a callout).

---

#### Element 9: Per-EAP Wi-Fi Config Matrix

**Analog:** `docs/admin-setup-8021x/04-macos.md` lines 69-76 (format template with Inner-method row)
**Secondary:** `docs/admin-setup-8021x/05-ios.md` lines 66-73

**macOS Wi-Fi per-EAP matrix (lines 69-76):**
```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix (wildcard suffix supported, e.g. `*.contoso.com`) | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP or PKCS profile (see note) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
```

**Android deltas (mandatory -- DO NOT clone verbatim):**

| Row | macOS/iOS value | Android value | Source |
|---|---|---|---|
| "Certificate server names" label | `Certificate server names` (single field) | **Split by tab:** corporate-owned = `Radius server name`; BYOD-WP = `Certificate server names` | RESEARCH.md Pattern 2 / live MS Learn |
| Inner method -- EAP-TTLS | `PAP / CHAP / MS-CHAP / MS-CHAP v2` | `PAP / MS-CHAP / MS-CHAP v2` (**no plain CHAP**) | STACK :171 / live MS Learn UPHELD |
| Inner method -- PEAP | `-- (PEAP tunnels MSCHAPv2; inner not separately selectable)` | `None, or Microsoft CHAP Version 2 (MS-CHAP v2)` (Android exposes an explicit inner-method selector for PEAP) | RESEARCH.md Pattern 2 / live MS Learn |
| Client authentication -- EAP-TLS | `Certificates: SCEP or PKCS profile` | `Certificates: SCEP, PKCS, or Derived credential` | RESEARCH.md Pattern 2 |
| Client authentication -- PEAP/EAP-TTLS | `Username and Password` | `Username and Password` (same) | same |

The "server name field" split between corporate-owned and personally-owned tabs requires either two separate rows or a combined row with parenthetical per-tab notation. Two-row approach is acceptable; the RESEARCH.md Pattern 2 uses a single-row approach with parenthetical -- either is valid, at executor's discretion.

---

#### Element 10: B-06 UPN-in-SAN "What Breaks" WARNING

**Role classification:** WARNING callout, single-home in Wi-Fi/BYOD-WP cert-auth context

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 75-88 (B-05 PEAP inner-auth WARNING)

```markdown
> **WARNING -- PEAP inner authentication on iOS/iPadOS: MS-CHAPv2 only (PAP not supported)**
>
> iOS/iPadOS PEAP inner authentication is always MS-CHAPv2. The Intune Wi-Fi profile UI for
> iOS/iPadOS PEAP does not present an inner-method selector -- **there is no PAP option to
> select.** If PAP is injected via a custom profile or imported configuration, the result is an
> immediate **"Authentication Failed"** error; iOS sends an EAP-NAK to the RADIUS server.
>
> **This can mask a mixed-fleet issue:** macOS and Windows devices on the same SSID
> configured with PEAP+PAP may authenticate successfully while iOS devices fail. The
> surface symptom -- "Authentication Failed" on iOS only, same SSID -- is a strong
> indicator of a PEAP inner-auth mismatch.
>
> Always configure PEAP inner auth as MS-CHAPv2 on any SSID where iOS/iPadOS devices
> must authenticate.
```

**Android B-06 pattern to apply:** Clone the `> **WARNING --` opener format and "What breaks" framing. The B-06 WARNING must state (per CONTEXT.md D-08/D-09/D-10):
- Label: conveys BYOD personally-owned work profile Wi-Fi profile deployment failure if UPN absent
- Scope: BYOD personally-owned work profile ONLY (not COBO/COPE/COSU)
- Both user and device certificates within the BYOD work-profile context
- Symptom: Wi-Fi profile shows "Error" in Intune (deployment fails, not just authentication)
- Fix: add UPN to the SCEP SAN attribute for the Android Enterprise SCEP profile
- Must NOT mention corporate-owned (COBO/COPE/COSU) as also requiring UPN-in-SAN

**Cross-ref discipline (single-callout-plus-cross-ref):**
Analog: `docs/admin-setup-8021x/05-ios.md` line 134:
```markdown
For PEAP inner authentication context -- the wired Intune UI (Templates path) exposes only
Certificates (SCEP) as the client authentication method for wired PEAP; there is no MS-CHAPv2
or username/password path in the wired zone. For the iOS PEAP inner-auth constraint and
symptom, see the [PEAP "What breaks" WARNING in the Wi-Fi section](#wi-fi).
```

Apply same cross-ref pattern from: (a) the mode matrix BYOD-WP row, and (b) any SCEP cert pointer in Common Profile Mechanics -- link to `[UPN-in-SAN requirement](#wi-fi)` (or the specific anchor of the WARNING if the heading differs). The WARNING itself is homed once in the Wi-Fi section; everywhere else is a link only.

---

#### Element 11: B-08 Certificate Access for Device Owner -- Structural/Inline (No Callout)

**Role classification:** structural/inline guidance, NOT a callout

**Closest analog for CONTENT:** `docs/admin-setup-8021x/05-ios.md` lines 107-117 (iOS wired SCEP-only NOTE callout -- but NOTE there is a callout; here B-08 must NOT be a callout)

**Closest analog for FORM:** the bold-lead plain-prose blocks used throughout the corpus, e.g. `05-ios.md` lines 56-58 (MAC note intro) or `04-macos.md` lines 106-108 (Network Interface selector bold lead)

```markdown
**MAC address randomization (iOS 14.0+ / iPadOS 14.0+):**

For NAC (Network Access Control) environments where the RADIUS policy is keyed to device MAC
address, set **Disable MAC address randomization: Yes** in the Wi-Fi profile.
```

**Android B-08 pattern to apply:** Use the same bold-lead plain-prose form. Do NOT use a `> **NOTE:**` or `> **WARNING:**` blockquote -- this is a structural/inline block per Section F :585 and CONTEXT.md D-07. Content per RESEARCH.md Pattern 7: set SCEP "Certificate access" to "Grant silently for specific apps" (Wi-Fi supplicant) for Device Owner (COBO, COPE, COSU); note Device-Owner cert reporting/revocation limitation.

---

#### Element 12: Combined Version-Gated RADIUS WARNING (Android 11+/14+)

**Role classification:** WARNING callout with embedded mini version-matrix + inline freshness stamp

**Analog:** `docs/admin-setup-8021x/04-macos.md` lines 20-35 (deployment-channel WARNING with embedded table)

```markdown
> **WARNING -- Deployment channel: choose before creating the profile**
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
> Storing user certificates in the system keychain...
```

**Android version-gate WARNING pattern to apply:** Clone the `> **WARNING --` opener + embedded table format. The table is the "mini version-matrix" (Android 11+ row / Android 14+ row). Close the blockquote with the inline freshness stamp:

```markdown
> *last_verified: 2026-06-30 · review_by: 2026-09-28*
```

This freshness stamp format is established in `05-ios.md` line 62 (MAC note stamp) -- use the identical `*last_verified: YYYY-MM-DD · review_by: YYYY-MM-DD*` format at the end of the blockquote. The 90-day interval makes `review_by: 2026-09-28` (as used in sibling stamps).

**Scope constraint:** The version-gate WARNING applies to the `Radius server name` field in the corporate-owned and AOSP tabs -- NOT to the personally-owned `Certificate server names` field. The WARNING should state this scope clearly (RESEARCH.md Common Pitfall 3).

---

#### Element 13: MAC Randomization Plain-Prose Note (Android 13+)

**Role classification:** plain-prose freshness-stamped note (NOT a callout)

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 56-62 (MAC randomization note -- same form, different content)

**iOS MAC note (lines 56-62):**
```markdown
**MAC address randomization (iOS 14.0+ / iPadOS 14.0+):**

For NAC (Network Access Control) environments where the RADIUS policy is keyed to device MAC
address, set **Disable MAC address randomization: Yes** in the Wi-Fi profile. With this option
enabled, the device presents its actual Wi-Fi MAC address instead of the per-network randomized
MAC that iOS 14+ uses by default. Without this setting, NAC environments will see a different
MAC each time the device joins a new network, causing RADIUS to reject devices whose randomized
MACs are not in the allow list.

Wired connections are unaffected...

*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

**Android delta (MANDATORY -- do NOT clone the iOS control name):**

| iOS (must NOT use) | Android (must use) |
|---|---|
| `Disable MAC address randomization: Yes` | `Use device MAC` |
| `iOS 14+` | `Android 13+` |
| "enabled" / "Yes" | select the "Use device MAC" option (three-option selector: Use device default / Use randomized MAC / Use device MAC) |
| "Wired connections are unaffected" paragraph | omit (Android wired is a gap stub; there is no wired profile to reference) |

The bold lead `**MAC address randomization (Android 13+):**` and the freshness stamp `*last_verified: 2026-06-30 · review_by: 2026-09-28*` clone exactly from the iOS pattern.

---

#### Element 14: `## Wired` Section (Gap Stub)

**Role classification:** top-level H2 section, plain-prose gap stub (no callout, no table, no sub-headings)

**Analog for heading:** `docs/admin-setup-8021x/05-ios.md` line 99

```markdown
## Wired
```

**Analog for FORM (prose, not callout):** `docs/admin-setup-8021x/00-overview.md` line 36 (inline gap preview note):
```markdown
> **Wired 802.1X availability note:** Android Enterprise has no native Intune wired-network
> profile type -- Wi-Fi only; see the Android guide for details.
```

But the `## Wired` section itself must be plain prose (NOT a blockquote). The `00-overview.md` note is a callout because it's in an index file cross-referencing -- the per-platform guide's Wired section must be plain prose per D-03.

**Pattern to apply:** `## Wired` H2 (verbatim from `05-ios.md:99`), followed by plain-prose paragraph(s). The content from RESEARCH.md Pattern 6 is the executor-ready draft:

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

**Hard constraints (D-02/D-03):** NO `> **Label:**` callout, NO `###` sub-heading, NO table/matrix, NO per-EAP rows. Bold lead-in on the first sentence only. Maximum two short paragraphs (~3-6 sentences total). All four D-04 facts must be present: (1) no native Intune wired profile, (2) no OMA-URI workaround, (3) network-team consultation alternative, (4) Wi-Fi IS supported.

---

#### Element 15: See Also Section

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 140-144 / `docs/admin-setup-8021x/04-macos.md` lines 141-145

```markdown
## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS cert delivery, per-platform cert matrix (incl. iOS wired PKCS not supported)
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root
```

**Android delta:** Remove the iOS wired PKCS parenthetical ("incl. iOS wired PKCS not supported") and replace with Android-relevant qualifier (e.g., "incl. Android Enterprise BYOD UPN-in-SAN requirement"). The three-link structure and format clone verbatim.

---

#### Element 16: Change History Table

**Analog:** `docs/admin-setup-8021x/05-ios.md` lines 148-152

```markdown
## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- iOS/iPadOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP / EAP-TTLS; MAC-address randomization note (iOS 14+); M-series iPad wired use case; wired SCEP-only callout; PEAP "What breaks" callout | -- |
```

**Android delta:** Replace the change description with Android-specific scope summary: "Initial version -- Android Enterprise 802.1X admin setup: Wi-Fi profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS across COBO/COPE/COSU/BYOD-WP modes; UPN-in-SAN deployment-failure WARNING (BYOD-WP); version-gated RADIUS server-name WARNING (Android 11+/14+); MAC randomization note (Android 13+); wired gap stub (no native Intune wired profile)". Date = 2026-06-30. Author = `--`.

---

### `docs/admin-setup-8021x/00-overview.md` (EDIT)

**Analog:** Self -- `docs/admin-setup-8021x/00-overview.md` line 32 (item-5 iOS entry) and line 60 (Change History item-5 row)

---

#### Edit 1: Platform List -- Replace Placeholder Line 34 + Add Item 6

**Current state at line 34:**
```markdown
6–7. Platform guides (Phase 105–106) -- entries added as each guide is authored.
```

**Analog (item-5 pattern, line 32):**
```markdown
5. **[iOS/iPadOS 802.1X Admin Setup (Wi-Fi + Wired)](05-ios.md)** -- Wi-Fi and wired profiles for all three EAP methods; MAC-address randomization disabled for NAC environments (iOS 14+); wired profile targets M-series iPads with USB Ethernet; wired SCEP-only constraint.
```

**Android item-6 replacement (clone format, substitute Android content):**
```markdown
6. **[Android Enterprise 802.1X Admin Setup (Wi-Fi)](06-android.md)** -- Wi-Fi profiles for
   all three EAP methods across COBO/COPE/COSU/BYOD work profile modes; UPN-in-SAN
   deployment requirement for personally-owned work profile; version-gated RADIUS
   server-name behavior (Android 11+/14+); no native wired profile (gap documented).

7. Platform guide (Phase 106) -- entry added when guide is authored.
```

**Note:** The Mermaid label `C[3–7. Platform<br/>Guides]` (line 21) remains accurate -- it covers items 3-7 regardless of how many are filled. Only change it if the current label is numerically wrong after this edit. Current label is `3–7.` which is still valid; leave Mermaid unchanged unless the executor confirms a reason to edit it.

---

#### Edit 2: Change History -- Append Row

**Analog (Change History rows, lines 58-60):**
```markdown
| 2026-06-29 | Initial version -- 802.1X admin-setup folder overview (two foundation guides) | -- |
| 2026-06-30 | Added item 3 -- Windows platform-guide entry linking 03-windows.md; narrowed placeholder range from 3--7 to 4--7 | -- |
| 2026-06-30 | Added item 4 -- macOS platform-guide entry linking 04-macos.md; narrowed placeholder range from 4--7 to 5--7 | -- |
| 2026-06-30 | Added item 5 -- iOS/iPadOS platform-guide entry linking 05-ios.md; narrowed placeholder range from 5--7 to 6--7 | -- |
```

**Android row to append:**
```markdown
| 2026-06-30 | Added item 6 -- Android Enterprise platform-guide entry linking 06-android.md; narrowed placeholder range from 6--7 to 7 | -- |
```

Clone the pattern verbatim: date | description | `--`.

---

## Shared Patterns

### Callout Convention (`> **Label:**`)

**Source:** `docs/admin-setup-8021x/05-ios.md` (WARNING at line 75; NOTE at line 107), `docs/admin-setup-8021x/04-macos.md` (WARNING at line 20)
**Apply to:** All `> **WARNING --` and `> **NOTE --` blocks in `06-android.md`

```markdown
> **WARNING -- [label summarizing the failure/constraint]**
>
> [body prose]
>
> [optional embedded table]
>
> *last_verified: YYYY-MM-DD · review_by: YYYY-MM-DD*
```

Rules:
- Opener: `> **WARNING --` (two hyphens, space, description) -- never `> **Warning**` or `> ⚠️`
- Body lines: each line prefixed with `> ` (blockquote continuation)
- Blank blockquote line between paragraphs: `>`
- Freshness stamp: `> *last_verified: ... · review_by: ...*` as the final line inside the blockquote (applies only to version-gated content per D-14; the UPN-in-SAN WARNING does not need its own stamp -- it inherits the file-level front-matter stamp)
- No DANGER tier for Android (DANGER is reserved for Windows-enforce/fleet-lockout class per CONTEXT.md D-08)

### Freshness Stamp Format

**Source:** `docs/admin-setup-8021x/05-ios.md` line 62 (inline), line 2-3 (front-matter)
**Apply to:** File front-matter, MAC randomization note, version-gated RADIUS WARNING

Front-matter format:
```yaml
last_verified: 2026-06-30
review_by: 2026-09-28
```

Inline format (within prose or blockquote):
```markdown
*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

Interval: 90 days (Android version-gated content). `2026-06-30 + 90 days = 2026-09-28`.

### Anchor Slug Convention

**Source:** Project MEMORY.md (`reference_glossary_anchor_slugs.md`); observed throughout `05-ios.md` cross-refs
**Apply to:** All internal cross-references in `06-android.md`

Rules:
- Plain GitHub auto-slugs: no `{#id}` override syntax
- Lowercase, hyphens replace spaces, punctuation stripped
- `## Wi-Fi` → `#wi-fi`
- `## Wired` → `#wired`
- `## Common Profile Mechanics` → `#common-profile-mechanics`
- `### Server Validation` → `#server-validation`
- `### In Intune admin center` → `#in-intune-admin-center` (if used twice in the same file, second instance auto-increments to `#in-intune-admin-center-1`)
- Double-hyphen trap: a heading `## EAP-TLS` slugs as `#eap-tls` (single hyphen from the heading text). Never manually write `#eap--tls`.

### Link-Not-Copy Discipline

**Source:** `docs/admin-setup-8021x/05-ios.md` lines 24, 34, 38, 82, 95 (link-out pattern)
**Apply to:** All shared concepts in `06-android.md`

```markdown
see [Certificate Delivery Foundation](02-cert-delivery-foundation.md)
see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2)
see [server-name validation](../_glossary-network.md#server-name-validation) in the glossary
see [inner-outer identity](../_glossary-network.md#inner-outer-identity)
```

Never restate: cert-ordering rule, rogue-RADIUS rationale, EAP method comparison, identity-privacy concept, SCEP/PKCS concept explanations, per-platform cert-delivery matrix.

### Co-Equal EAP Boilerplate

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 65-66 / `05-ios.md` lines 54-55

```markdown
All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when
to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).
```

Clone verbatim in the `## Wi-Fi` intro before the per-EAP matrix.

---

## No Analog Found

| Structural Element | Role | Data Flow | Reason |
|---|---|---|---|
| Enrollment-mode applicability matrix (COBO/COPE/COSU/BYOD-WP) | mode-matrix | n/a (static doc) | No prior platform had enrollment modes; table format borrowed from `04-macos.md` Network Interface table but content is entirely new |
| AOSP one-line out-of-scope stub note | out-of-scope note | n/a | No prior guide had a sub-platform out-of-scope note; use inline prose (not a callout) |

---

## Critical Android-Specific Deltas (Do Not Clone from Siblings)

| Element | iOS/macOS value (DO NOT USE) | Android value (MUST USE) | Reference |
|---|---|---|---|
| MAC control name | `Disable MAC address randomization: Yes` (`05-ios.md:57`) | `Use device MAC` (three-option: Use device default / Use randomized MAC / Use device MAC) | CONTEXT.md D-13; live MS Learn |
| MAC version gate | iOS 14.0+ / iPadOS 14.0+ | Android 13+ | CONTEXT.md D-13 |
| EAP-TTLS inner methods | PAP / CHAP / MS-CHAP / MS-CHAP v2 (macOS `04-macos.md:75`; iOS `05-ios.md:72`) | PAP / MS-CHAP / MS-CHAP v2 (**no plain CHAP**) | CONTEXT.md Claude's Discretion; STACK :171 |
| Wired section content | Full wired matrix + `### In Intune admin center` (`05-ios.md:103-136`) | Plain prose gap stub only (no sub-sections, no table, no callout) | CONTEXT.md D-01 through D-04 |
| UPN-in-SAN scope | n/a (iOS has no UPN-in-SAN constraint) | BYOD personally-owned work profile ONLY (not COBO/COPE/COSU) | CONTEXT.md D-10; live MS Learn personally-owned tab |
| Server name field label | `Certificate server names` (iOS only) | Corporate-owned: `Radius server name`; BYOD-WP: `Certificate server names` | RESEARCH.md Pattern 2; live MS Learn |
| Wired SCEP-only callout | `> **NOTE -- Wired client certificates: SCEP only (PKCS not supported)**` (`05-ios.md:107`) | Omit entirely (Android has no wired profile; the iOS NOTE has no Android equivalent) | CONTEXT.md A1 |
| M-series iPad wired note | `05-ios.md:101` | Omit entirely (Android-specific wired = gap; no hardware-model note) | CONTEXT.md out-of-scope |

---

## Metadata

**Analog search scope:** `docs/admin-setup-8021x/` (all five existing files read in full)
**Files scanned:** 4 analog files fully read (`05-ios.md`, `04-macos.md`, `00-overview.md`, `02-cert-delivery-foundation.md` lines 55-114)
**Pattern extraction date:** 2026-06-30
