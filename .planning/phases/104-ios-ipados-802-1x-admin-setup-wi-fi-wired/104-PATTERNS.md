# Phase 104: iOS/iPadOS 802.1X Admin-Setup (Wi-Fi + Wired) - Pattern Map

**Mapped:** 2026-06-30
**Files analyzed:** 2 (1 new, 1 edit)
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/admin-setup-8021x/05-ios.md` | guide (per-platform admin-setup doc) | static (Intune config reference) | `docs/admin-setup-8021x/04-macos.md` | exact — same A3 template, same Apple platform, same wired SCEP-only constraint, same server-validation framing |
| `docs/admin-setup-8021x/00-overview.md` | guide (index/overview) | static (edit to existing file) | self — existing item-3 and item-4 entries in `00-overview.md` lines 28–31 + Change History rows lines 55–57 | exact — same list-entry and Change-History-row pattern used in Phases 102 and 103 |

**Secondary analog for `05-ios.md`:** `docs/admin-setup-8021x/03-windows.md` — original A3 template execution; supplies the `### In Intune admin center` compact-subsection pattern and the WARNING/NOTE callout block syntax.

**Link targets (link-not-copy — do NOT clone content from these):**
- `docs/admin-setup-8021x/01-eap-method-overview.md`
- `docs/admin-setup-8021x/02-cert-delivery-foundation.md`
- `docs/_glossary-network.md#server-name-validation`
- `docs/_glossary-network.md#inner-outer-identity`

---

## Pattern Assignments

### `docs/admin-setup-8021x/05-ios.md` (NEW — per-platform guide, static reference)

**Primary analog:** `docs/admin-setup-8021x/04-macos.md`
**Secondary analog:** `docs/admin-setup-8021x/03-windows.md`

---

#### Front-matter pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 1–7

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: macos
---
```

**iOS adaptation:** Clone verbatim; change `platform: macos` to `platform: ios`. Do not change any other key. The `review_by` date is 90 days from `last_verified` (2026-06-30 + 90 = 2026-09-28 — same value).

---

#### Prerequisites block pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 9–10

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

**iOS adaptation:** Clone verbatim (identical link targets; same prerequisite sequence).

---

#### H1 title + Scope banner pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 12–14

```markdown
# macOS 802.1X Admin Setup: Wi-Fi and Wired

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

**iOS adaptation:** Change title to `# iOS/iPadOS 802.1X Admin Setup: Wi-Fi and Wired`. Scope banner clones verbatim — link target `02-cert-delivery-foundation.md#canonical-scope-callout` is identical.

---

#### Common Profile Mechanics section pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 16–56

```markdown
## Common Profile Mechanics

This section covers settings that apply to both Wi-Fi and wired 802.1X profiles on macOS. For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), EKU requirements, and per-platform cert-delivery options, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md).
```

**iOS adaptation — three-profiles prose (D-05, D-06, D-07):**
Replace the macOS intro sentence above with iOS-specific three-profiles structural prose. After the link to `02-cert-delivery-foundation.md`, add a paragraph stating that iOS/iPadOS 802.1X requires three distinct Intune profiles — one Trusted Certificate profile (RADIUS CA), one SCEP or PKCS client certificate profile (client identity), and one Wi-Fi or Wired network profile. State that no combined `.mobileconfig` is used and that Apple Configurator is explicitly excluded — this guide covers Intune-managed-fleet only. Do NOT use a blockquote callout for this prose (D-05 compliance). Do NOT reproduce the cert-delivery ordering rule inline — link to `02-cert-delivery-foundation.md` (D-07 compliance).

**iOS adaptation — strip the macOS deployment-channel WARNING (lines 20–36):**
Do NOT clone the `> **WARNING -- Deployment channel: choose before creating the profile**` block. There is no iOS equivalent. This is the single largest structural difference between `04-macos.md` and `05-ios.md`.

**iOS adaptation — no-auth-mode-selector note:**
Replace line 37 in `04-macos.md` with an iOS-specific version:

```markdown
iOS/iPadOS does not expose a User / Machine / User-or-machine authentication mode selector in
Intune profiles. Windows-trained admins who expect this setting will not find it on iOS or macOS.
iOS authenticates as the current user context; machine-level pre-logon authentication is not
available through Intune iOS 802.1X profiles.
```

Strip the macOS deployment-channel explanation (second sentence of the macOS paragraph). Do NOT keep the sentence about User channel vs Device channel — no iOS equivalent.

**Server Validation subsection (clone):**

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 39–45

```markdown
### Server Validation

Always populate **Certificate server names** for every EAP method on both Wi-Fi and wired
connections, and always reference a **Root certificate for server validation** profile. This is
a security requirement, not merely a configuration option.

**Why this matters on macOS:** Without Certificate server names populated, macOS presents a
dynamic trust dialog that users must click through on every connection attempt. Populating the
field bypasses this dialog and eliminates the user-facing prompt. Additionally, on iOS and macOS,
disabling server validation in a managed profile is flagged as a security violation by the OS.

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the
[PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2), the
[Certificate Delivery Foundation](02-cert-delivery-foundation.md), and
[server-name validation](../_glossary-network.md#server-name-validation) in the glossary.
**No example in this guide shows server validation disabled.**
```

**iOS adaptation:** Change "Why this matters on macOS:" to "Why this matters on iOS/iPadOS:". The dynamic trust dialog sentence applies on iOS too — if Certificate server names is empty, iOS shows a per-connection trust prompt. The security-violation sentence ("on iOS and macOS, disabling server validation…") applies verbatim — keep it.

**Anonymous Outer Identity subsection (clone):**

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 47–56

```markdown
### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy (outer identity)** field in every macOS 802.1X profile to
prevent cleartext identity leakage before the authentication tunnel is established. For the
inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity before the TLS
  tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` to mask the
  certificate subject.
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity before the PEAP
  tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` so the username
  is not visible in cleartext.
- **EAP-TTLS:** The username is sent as the outer EAP identity before the TTLS tunnel opens.
  Set Identity privacy to `anonymous` or `anonymous@contoso.com`.

The domain suffix in the anonymous identity (e.g., `anonymous@contoso.com`) helps RADIUS
servers route the anonymous request to the correct realm when multiple realms share
infrastructure. Use a suffix that your RADIUS policy accepts; `anonymous` with no suffix is
valid if realm routing is not required.
```

**iOS adaptation:** Change "macOS" to "iOS/iPadOS" in the opening sentence. All EAP-method bullets apply verbatim to iOS. The realm-routing paragraph clones verbatim.

---

#### Wi-Fi section pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 59–83

```markdown
## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **macOS** > **Templates** > **Wi-Fi**

Select **Wi-Fi type: Enterprise** to access EAP authentication settings. The following matrix
covers the key per-EAP-method configuration fields. All three EAP methods are co-equal --
no method is ranked or recommended as a default. For when to choose each method, see
[01-eap-method-overview.md](01-eap-method-overview.md).

**Wi-Fi per-EAP-method configuration matrix:**

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix (wildcard suffix supported, e.g. `*.contoso.com`) | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP or PKCS profile (see note) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
```

**iOS adaptation — navigation path:**
Change `macOS` to `iOS/iPadOS` in the navigation path. Wi-Fi type preamble clones verbatim.

**iOS adaptation — Wi-Fi matrix cell differences from macOS (verified against MS Learn 2026-06-30):**

| Row | macOS cell | iOS cell |
|-----|-----------|---------|
| EAP type field value | EAP-TLS / PEAP / EAP-TTLS | same |
| Certificate server names | same | same |
| Root cert for server validation | same | same |
| Client authentication (EAP-TLS) | Certificates: SCEP or PKCS profile | Certificates: SCEP, PKCS, or Derived credential |
| Client authentication (PEAP) | Username and Password | Username and Password (implicit MS-CHAPv2; no inner-method selector) |
| Client authentication (EAP-TTLS) | Username and Password | Username and Password |
| Inner method (EAP-TLS) | -- (cert-only; no inner method) | same |
| Inner method (PEAP) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | -- (no inner-method selector; MS-CHAPv2 is the only option; see WARNING below) |
| Inner method (EAP-TTLS) | PAP / CHAP / MS-CHAP / MS-CHAP v2 | PAP / CHAP / MS-CHAP / MS-CHAP v2 [VERIFIED MS Learn 2026-06-30] |
| Identity privacy | same | same |

**iOS addition — Deployment channel row:** Do NOT add. No iOS equivalent.

**iOS addition — MAC-randomization prominent prose (D-01, D-02, D-03, D-04):**
Place as a prominent paragraph immediately before OR after the Wi-Fi per-EAP matrix (Claude's discretion — CONTEXT.md §Claude's Discretion). Do NOT use a `> **Label:**` blockquote. Must include:
1. Exact control name: "Disable MAC address randomization" with option "Yes"
2. That "Yes" forces the device to present its actual Wi-Fi MAC (not randomized)
3. Required for NAC environments where RADIUS policy is keyed to MAC
4. iOS 14.0+ / iPadOS 14.0+ version gate — carry an inline freshness stamp (`last_verified: 2026-06-30`)
5. That wired is unaffected — USB-Ethernet adapter presents its physical MAC automatically (D-03)

Do NOT write "set MAC randomization to Yes" — that is the STACK ~l.226 error (D-04 guardrail).

**iOS addition — B-05 "What breaks" WARNING callout (D-10, D-11):**
Place within the Wi-Fi section in the PEAP context (either inside the matrix explanation or immediately after). Use the WARNING callout syntax from `docs/admin-setup-8021x/03-windows.md` lines 105–121:

```markdown
> **WARNING -- [label]**
>
> [content lines]
```

The B-05 callout must convey:
- iOS/iPadOS PEAP inner authentication is always MS-CHAPv2; the Intune UI does not show an inner-method selector for Wi-Fi PEAP (no PAP option is presented)
- If PAP is injected via custom profile or imported config, the result is "Authentication Failed" immediately
- macOS and Windows devices on the same SSID with PEAP+PAP may succeed while iOS devices fail
- Symptom: "Authentication Failed" on iOS; RADIUS logs show EAP-NAK from the iOS device

Do NOT place this callout in Common Mechanics (method-specific, not cross-method — D-11).

**iOS addition — client certificate options note (after matrix):**
Clone pattern from `docs/admin-setup-8021x/04-macos.md` lines 78–82:

```markdown
**Client certificate options for EAP-TLS (Wi-Fi -- both SCEP and PKCS supported):**
- SCEP certificate profile
- PKCS certificate profile
```

iOS adds Derived credential as a third option. Link to `02-cert-delivery-foundation.md` for ordering rule (same link target as macOS).

---

#### Wired section pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 86–137

**iOS adaptation — "When to use this" paragraph (D-09):**
Open the Wired section (before the `### In Intune admin center` subsection or immediately after the section heading) with a 2–3-sentence paragraph grounding the M-series iPad use case. Content: M-series iPads equipped with a USB-Ethernet adapter; typical scenario is multi-iPad shared-use environments such as classrooms or labs where wired Ethernet is available. This paragraph has no macOS analog — it is iOS-only content added per D-09.

**`### In Intune admin center` navigation subsection:**

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 92–93

```markdown
### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **macOS** > **Templates** > **Wired network**
```

**iOS adaptation:** Change `macOS` to `iOS/iPadOS`.

**SCEP-only NOTE callout (clone and adapt):**

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 94–104

```markdown
> **NOTE -- Wired client certificates: SCEP only (PKCS not supported)**
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

**iOS adaptation:** Change all instances of "macOS" to "iOS/iPadOS". The PKCS-not-supported constraint is identical — MS Learn explicitly states "PKCS certificates aren't supported" for all three iOS wired EAP types [VERIFIED 2026-06-30]. Remove the deployment-channel sentence if any exists — no iOS equivalent. Keep the link to `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix`.

**Network Interface note (iOS-specific — do NOT clone macOS selector table):**

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 106–120 — the macOS Network Interface selector table with 7 options (First active Ethernet, Second active Ethernet, etc.)

**iOS adaptation:** Do NOT clone this table. iOS wired 802.1X automatically sets Network Interface to "Any Ethernet" — there is no selector. Add a single-sentence note: "Network Interface is automatically set to **Any Ethernet** — the iOS/iPadOS wired profile targets any available USB-Ethernet interface; no selection is required." [VERIFIED MS Learn 2026-06-30]

**Wired per-EAP matrix (clone structure, substitute iOS cells):**

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 124–135

```markdown
**Wired per-EAP-method configuration matrix:**

All three EAP methods are co-equal configuration paths -- no method is ranked or recommended
as a default.

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server Trust -- Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client Authentication method | Certificates (SCEP only; PKCS not supported) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
```

**iOS wired matrix cell differences (CRITICAL — verified MS Learn 2026-06-30):**

| Row | macOS cell | iOS cell |
|-----|-----------|---------|
| EAP type field value | same | same |
| Server Trust — Cert server names | same | same |
| Root cert for server validation | same | same |
| Client Authentication (EAP-TLS) | Certificates (SCEP only; PKCS not supported) | Certificates: SCEP only (PKCS not supported) — same |
| Client Authentication (PEAP) | Username and Password | Certificates: SCEP only (PKCS not supported); no Username/Password option in wired UI [VERIFIED] — add cross-ref to Wi-Fi B-05 callout per D-11 |
| Client Authentication (EAP-TTLS) | Username and Password | Certificates: SCEP only (PKCS not supported); no inner-auth-method selector in wired UI [VERIFIED] |
| Inner method (EAP-TLS) | -- (cert-only; no inner method) | same |
| Inner method (PEAP) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | -- (cert-only in wired UI; for PEAP + username/password, use a Wi-Fi profile — see Wi-Fi PEAP note) |
| Inner method (EAP-TTLS) | PAP / CHAP / MS-CHAP / MS-CHAP v2 | -- (cert-only in wired UI via Templates path; inner auth via username/password not exposed in wired Intune UI — verify in Intune console if username/password EAP-TTLS on wired is required) |
| Identity privacy | same | same |

The D-12 hedge on wired EAP-TTLS extends to wired PEAP per the RESEARCH.md live-verification finding (§4). Both cells must reflect "Certificates (SCEP only) — no username/password path in wired Intune UI" rather than cloning macOS.

**D-11 wired cross-reference:** Add a one-line cross-reference near the wired PEAP row directing wired-only readers to the Wi-Fi PEAP "What breaks" WARNING for MS-CHAPv2 context.

---

#### See Also footer pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 141–145

```markdown
## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS cert delivery, per-platform cert matrix
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root
```

**iOS adaptation:** Clone verbatim. All three link targets are identical. Update the `02-` description to mention PKCS-not-supported-wired if desired (Claude's discretion on exact description text).

---

#### Change History footer pattern

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 149–154

```markdown
## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- macOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS; immutable deployment-channel WARNING; wired SCEP-only callout; dynamic trust dialog suppression | -- |
```

**iOS adaptation:** Clone table structure. Initial row content:
```
| 2026-06-30 | Initial version -- iOS/iPadOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP / EAP-TTLS; MAC-address randomization note (iOS 14+); M-series iPad wired use case; wired SCEP-only callout; PEAP "What breaks" callout | -- |
```

---

### `docs/admin-setup-8021x/00-overview.md` (EDIT — add item-5 entry + narrow placeholder)

**Analog:** self — existing item-3 and item-4 entries, and Change History rows

---

#### Platform-list entry pattern

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 28–31

```markdown
3. **[Windows 802.1X Admin Setup (Wi-Fi + Wired)](03-windows.md)** -- Wi-Fi and wired profiles for all three EAP methods; dot3svc dependency and Remediation pattern; enforcement staging; KB5014754 strong certificate mapping.

4. **[macOS 802.1X Admin Setup (Wi-Fi + Wired)](04-macos.md)** -- Wi-Fi and wired profiles for all three EAP methods; immutable deployment-channel decision (User vs Device keychain) before profile creation; wired SCEP-only constraint; server name required to suppress dynamic trust dialog.
```

**iOS item-5 entry:**
```markdown
5. **[iOS/iPadOS 802.1X Admin Setup (Wi-Fi + Wired)](05-ios.md)** -- Wi-Fi and wired profiles for all three EAP methods; MAC-address randomization disabled for NAC environments (iOS 14+); wired profile targets M-series iPads with USB Ethernet; wired SCEP-only constraint.
```

**Placeholder line (current — `00-overview.md` line 32):**
```markdown
5–7. Platform guides (Phase 104–106) -- entries added as each guide is authored.
```

**Replace with:**
```markdown
6–7. Platform guides (Phase 105–106) -- entries added as each guide is authored.
```

The iOS item-5 entry is inserted before this narrowed placeholder line.

---

#### Change History row pattern

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 55–57

```markdown
| 2026-06-30 | Added item 3 -- Windows platform-guide entry linking 03-windows.md; narrowed placeholder range from 3--7 to 4--7 | -- |
| 2026-06-30 | Added item 4 -- macOS platform-guide entry linking 04-macos.md; narrowed placeholder range from 4--7 to 5--7 | -- |
```

**New row to append:**
```markdown
| 2026-06-30 | Added item 5 -- iOS/iPadOS platform-guide entry linking 05-ios.md; narrowed placeholder range from 5--7 to 6--7 | -- |
```

Note: Use `--` (double-hyphen) as dash, consistent with existing rows. The Change History table already has three rows; the new row is the fourth.

---

## Shared Patterns

### `> **Label:**` Blockquote Callout Convention

**Source:** `docs/admin-setup-8021x/03-windows.md` (WARNING, lines 105–121; DANGER, lines 124–139; NOTE, lines 173–181) and `docs/admin-setup-8021x/04-macos.md` (WARNING, lines 20–36; NOTE, lines 94–104)

**Syntax:**
```markdown
> **LABEL -- Short descriptive title**
>
> [Body paragraph(s). Bold key terms.]
>
> | optional table |
> |---|---|
> | ... | ... |
>
> [Follow-up action paragraph.]
```

**Apply to:** The B-05 PEAP WARNING callout in `05-ios.md` Wi-Fi section, and the wired SCEP-only NOTE callout in `05-ios.md` Wired section.

**Callout discipline (from CONTEXT.md §Established Patterns):**
- B-05 PEAP inner auth → `> **WARNING**` — D-10 mandates this; research-prescribed
- Wired SCEP-only → `> **NOTE`** — standard wired constraint callout (clone from `04-macos.md` lines 94–104)
- MAC-randomization → plain prose (NOT a callout) — D-02 compliance
- Three-profiles model → plain prose (NOT a callout) — D-05 compliance
- No DANGER callout — no enforcement-staging analog on iOS
- No deployment-channel WARNING — no macOS deployment-channel analog on iOS

### Section Heading Sequence (A3 Hybrid Template)

**Source:** `docs/admin-setup-8021x/04-macos.md` (nearest) and `docs/admin-setup-8021x/03-windows.md` (original)

```
## Common Profile Mechanics
  ### Server Validation
  ### Anonymous Outer Identity (Identity Privacy)
---
## Wi-Fi
  ### In Intune admin center
---
## Wired
  ### In Intune admin center
---
## See Also
---
## Change History
```

**iOS-specific additions within this structure:**
- `## Common Profile Mechanics` receives the three-profiles structural prose (new, no macOS equivalent)
- `## Wi-Fi` receives the MAC-randomization prominent prose (new, no macOS equivalent) and the B-05 WARNING callout
- `## Wired` receives the "When to use this" paragraph (D-09) before `### In Intune admin center`

### Per-EAP Matrix Table Shape

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 67–77 (Wi-Fi) and lines 128–135 (Wired)

```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | ... | ... | ... |
| Certificate server names / Server Trust -- Certificate server names | ... | ... | ... |
| Root certificate for server validation | ... | ... | ... |
| Client authentication / Client Authentication method | ... | ... | ... |
| Inner method (Non-EAP method / inner identity) | ... | ... | ... |
| Identity privacy (outer identity) | ... | ... | ... |
```

**Apply to:** Both the Wi-Fi matrix and the Wired matrix in `05-ios.md`. The Inner-method row is mandatory in both (D-12). Column header uses "PEAP-MSCHAPv2" (not "PEAP") for descriptive clarity — consistent with `03-windows.md` and `04-macos.md`.

### Front-matter Freshness Stamp

**Source:** `docs/admin-setup-8021x/04-macos.md` lines 1–7

Applied at **two levels** in `05-ios.md`:
1. **File-level:** YAML front-matter block with `last_verified` and `review_by` keys (clone from `04-macos.md`)
2. **Inline (MAC-randomization note only):** An additional inline `last_verified: 2026-06-30` freshness stamp on the iOS-14+ MAC-randomization note, because this is version-gated, drift-prone content (E-03 from CONTEXT.md)

The inline stamp pattern follows the precedent of `docs/admin-setup-8021x/03-windows.md` line 181:
```markdown
*last_verified: 2026-06-30 · review_by: 2026-12-27*
```
Use equivalent compact inline format for the MAC-randomization note.

### Anchor Slug Convention

**Source:** All existing files in `docs/admin-setup-8021x/`

Plain GitHub auto-slugs only. Do NOT use `{#id}` anchor overrides. Do NOT produce double-hyphen slugs (e.g., avoid section headings with " -- " that produce `--` in the slug). This is enforced by the locked decisions (CONTEXT.md §Claude's Discretion, "plain GitHub auto-slug anchors with no `{#id}` overrides; double-hyphen trap").

### Link-not-copy Convention

**Source:** All three existing guides (`03-windows.md`, `04-macos.md`, `01-`/`02-` foundation files)

Shared concepts already homed in `01-`/`02-` or the glossary are **linked, never restated**:
- Cert-delivery ordering rule → `02-cert-delivery-foundation.md` (CRITICAL callout at `:37–45`)
- EAP-method comparison → `01-eap-method-overview.md`
- PEAP security note / rogue-RADIUS rationale → `01-eap-method-overview.md#peap-mschapv2`
- Server-name validation concept → `../_glossary-network.md#server-name-validation`
- Inner-outer identity concept → `../_glossary-network.md#inner-outer-identity`
- Per-platform cert matrix → `02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix`

---

## No Analog Found

No files in scope lack an analog. Both deliverables have high-quality exact-match analogs in the codebase.

---

## What to Strip vs Keep (Critical Delta Table)

| `04-macos.md` element | Action in `05-ios.md` | Reason |
|-----------------------|-----------------------|--------|
| Deployment-channel WARNING callout (lines 20–36) | STRIP entirely | No iOS equivalent; macOS-only mechanic |
| Deployment-channel explanation in no-auth-mode paragraph (line 37) | STRIP, replace with iOS-only prose | macOS-only |
| Network Interface selector table (lines 106–120) | STRIP, replace with single "Any Ethernet" note | iOS has no interface selector |
| Inner-method cells for macOS wired PEAP + EAP-TTLS (both "Username and Password") | REPLACE with cert-only hedge | iOS wired UI exposes only SCEP Certificates [VERIFIED 2026-06-30] |
| `platform: macos` in front-matter | REPLACE with `platform: ios` | — |
| "macOS" in title, nav paths, and prose | REPLACE with "iOS/iPadOS" | — |
| "Both SCEP and PKCS supported" for Wi-Fi EAP-TLS cert options | UPDATE to add Derived credential | iOS Wi-Fi also supports Derived credential |

| New element in `05-ios.md` | Not present in `04-macos.md` | Source |
|----------------------------|-----------------------------|--------|
| Three-profiles structural prose in Common Mechanics | No macOS equivalent | D-05/D-06/D-07 |
| MAC-randomization prominent prose with freshness stamp | No macOS equivalent | D-01/D-02/D-04 |
| "When to use this" paragraph in Wired | No macOS equivalent | D-09 |
| B-05 "What breaks" WARNING callout in Wi-Fi PEAP context | No macOS equivalent | D-10/D-11 |
| D-11 one-line wired cross-reference to Wi-Fi B-05 callout | No macOS equivalent | D-11 guardrail |

---

## Metadata

**Analog search scope:** `docs/admin-setup-8021x/` (all five existing files)
**Files read:** `04-macos.md` (154 lines), `03-windows.md` (198 lines), `00-overview.md` (58 lines)
**Pattern extraction date:** 2026-06-30
**Primary analog confidence:** HIGH — `04-macos.md` is the Phase 103 deliverable (passed verification); structural and stylistic identity with `05-ios.md` is by construction (same A3 Hybrid template, same Apple platform Intune UX vocabulary)
