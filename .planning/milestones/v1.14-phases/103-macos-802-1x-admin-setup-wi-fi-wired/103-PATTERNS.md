# Phase 103: macOS 802.1X Admin-Setup (Wi-Fi + Wired) — Pattern Map

**Mapped:** 2026-06-30
**Files analyzed:** 2 (1 CREATE, 1 EDIT)
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog(s) | Match Quality |
|-------------------|------|-----------|-------------------|---------------|
| `docs/admin-setup-8021x/04-macos.md` | doc — per-platform admin guide | request-response (Intune UI walkthrough) | `docs/admin-setup-8021x/03-windows.md` (structural clone — same A3 section order, same per-EAP matrix format, same callout convention, same footer; macOS deltas documented below) | exact (same folder + same A3 Hybrid template) |
| `docs/admin-setup-8021x/00-overview.md` | doc — folder entry point (edit) | — | `docs/admin-setup-8021x/00-overview.md` itself (read the live text at line 30; Phase 102 added item 3 + narrowed to 4–7; Phase 103 adds item 4 + narrows to 5–7 using the identical numbered-list link format) | exact |

---

## Pattern Assignments

### `docs/admin-setup-8021x/04-macos.md` (CREATE)

**Primary analog:** `docs/admin-setup-8021x/03-windows.md`

Clone the A3 Hybrid structure from the Windows deliverable and apply the macOS-specific deltas documented below. Every structural element (YAML block, prerequisites blockquote, scope banner, `## Common Profile Mechanics`, `### In Intune admin center` subsections, per-EAP matrix tables, `## See Also`, `## Change History`) is copied from `03-windows.md`. Only the *content* inside each element changes per the locked decisions D-01–D-12.

---

#### YAML front-matter block

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 1–7

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: windows
---
```

Change only `platform: windows` → `platform: macos`. All other keys and values are identical. Rule: `review_by` = `last_verified` + 90 days. No inline freshness stamp is mandated for any callout in the macOS guide (no KB-equivalent drift-risk callout exists).

---

#### Prerequisites blockquote

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 9–10

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

Copy verbatim — identical for macOS.

---

#### Document title

**Source:** `docs/admin-setup-8021x/03-windows.md` line 12

```markdown
# Windows 802.1X Admin Setup: Wi-Fi and Wired
```

macOS variant (change platform name only):

```markdown
# macOS 802.1X Admin Setup: Wi-Fi and Wired
```

Use `: Wi-Fi and Wired` (with ` and `, not ` / `) to avoid the double-hyphen anchor-slug trap.

---

#### Scope banner

**Source:** `docs/admin-setup-8021x/03-windows.md` line 14

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

Copy verbatim — identical for macOS. Do not expand or modify.

---

#### `## Common Profile Mechanics` — section opener prose

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 16–18

```markdown
## Common Profile Mechanics

This section covers settings that apply to both Wi-Fi and wired 802.1X profiles on Windows. For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), EKU requirements, and per-platform cert-delivery options, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md).
```

macOS variant: substitute "Windows" with "macOS". The link to `02-cert-delivery-foundation.md` and the link-not-copy reference pattern are identical.

---

#### Deployment-channel WARNING callout (replaces Windows `### Authentication Mode`)

**Source template:** `docs/admin-setup-8021x/03-windows.md` lines 20–31 (Windows auth-mode table — this is the structural slot being replaced, NOT the content to copy)

**Callout format to copy:** `docs/admin-setup-8021x/03-windows.md` lines 105–121 (WARNING blockquote convention — multi-paragraph, leading bold label, inner markdown table)

```markdown
> **WARNING -- dot3svc (Wired AutoConfig) service dependency:**
>
> The Wired AutoConfig service (`dot3svc`) ...
>
> | Mode | ... |
> |---|---|
```

Apply this exact blockquote structure (leading `>` on every line, blank `>` line between paragraphs, `> |---|---|` for inner table rows) for the macOS deployment-channel WARNING. The label changes; the pattern is identical:

```markdown
> **WARNING -- Deployment channel: choose before creating the profile**
>
> [content per RESEARCH.md "Deployment-channel WARNING callout draft"]
>
> | Certificate type | Deployment channel | Keychain |
> |------------------|--------------------|-----------| 
> | User certificate | User channel | User keychain |
> | Device certificate | Device channel | System keychain |
>
> [closing prose per RESEARCH.md]
```

Severity rule (D-03): WARNING (not DANGER). The immutable-channel mistake is serious-but-recoverable (delete/recreate/reassign). DANGER is reserved for fleet-wide irrecoverable lockout — the Windows enforcement-staging class. macOS has NO DANGER callout.

---

#### "No authentication-mode selector" note

**Source:** (no direct analog in 03-windows.md — this is a macOS-only addition to the Common Mechanics section)

Place immediately after the deployment-channel WARNING callout, before the server-validation subsection. No blockquote callout — this is a short explanatory paragraph (D-04). Example shape from RESEARCH.md:

```markdown
macOS does not expose a User / Machine / User-or-machine authentication mode selector in
Intune profiles. Windows-trained admins who expect this setting will not find it on macOS.
The Deployment channel (User vs Device keychain) is macOS's analog to the credential-context
decision: user certificate + User channel authenticates as the current user; device certificate
+ Device channel authenticates as the device.
```

---

#### Server validation subsection in Common Mechanics

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 33–43 (the Windows server-validation subsection homed in Common Mechanics)

```markdown
### Server Validation (PerformServerValidation)

Always enable server validation for all EAP methods on Windows. Always populate **Certificate
server names** with the RADIUS server's FQDN or CN suffix. Always reference a Trusted
Certificate profile for RADIUS server root CA validation. For the security rationale and
rogue-RADIUS risks, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2)
and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary.

The default Windows EAP XML skeleton ships with server validation disabled...
**No example in this guide shows server validation disabled.**
```

macOS variant (D-05/D-11/D-12): Keep the subsection heading and link-not-copy pattern. Replace Windows-specific prose (XML skeleton, blank-server-names regression detail) with the macOS-specific dynamic-trust-dialog symptom and A-05 security-violation fact. Retain the link targets to `01-eap-method-overview.md#peap-mschapv2` and `../_glossary-network.md#server-name-validation`. The two wired-only server-validation hardening bullets at lines 39–42 of the Windows file (Disable user prompts, Require cryptographic binding) are Windows-only and must NOT be cloned. Add a one-line wired delta only (D-05): populating Certificate server names also bypasses the dynamic trust dialog that appears on the wired profile at the system level.

---

#### Anonymous outer identity subsection

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 44–52

```markdown
### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy** field in every Windows 802.1X profile to prevent cleartext
identity leakage before the authentication tunnel is established (pitfall C-01). ...

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity ...
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity ...
- **EAP-TTLS:** The username is sent as the outer EAP identity ...
```

macOS variant: Same subsection heading and three-bullet EAP-method breakdown. The field label on macOS is "Identity privacy (outer identity)" (RESEARCH.md confirmed). Clone the per-EAP breakdown prose; substitute Windows-specific registry/XML references if any (none present). The domain-suffix realm-routing note (lines 52–53) applies equally to macOS — copy verbatim.

---

#### `## Wi-Fi` section — `### In Intune admin center` subsection

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 58–64

```markdown
### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wi-Fi**

Select **Enterprise** as the Wi-Fi type to access EAP authentication settings. ...

The Settings Catalog (`Devices > Configuration > New policy > Settings catalog`) also exposes
these Wi-Fi settings and may offer more granular options.
```

macOS variant: Change the navigation path to `**Devices** > **Configuration** > **New policy** > **macOS** > **Templates** > **Wi-Fi**`. The Wi-Fi type selector note (`Select **Enterprise**...`) applies equally. The Settings Catalog sentence (last line) is Windows-specific context and must NOT be cloned — omit it entirely (no macOS Settings Catalog note in RESEARCH.md; CONTEXT.md deferred list excludes it).

---

#### Wi-Fi per-EAP-method configuration matrix

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 68–77

```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Perform server validation | Enforced via trusted root reference | Yes -- always | Yes -- always |
| Client authentication method | SCEP cert / PKCS cert / Derived credential | Username and Password | Username and Password |
| Inner method | -- (cert-only; no inner method) | MSCHAPv2 (always; not PAP) | PAP / CHAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
| Authentication mode | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) |
```

macOS Wi-Fi variant (remove Windows-only rows, update macOS-specific values):

| Row | Windows value | macOS value | Action |
|-----|--------------|-------------|--------|
| `EAP type field value` | `EAP - TLS` / `Protected EAP (PEAP)` / `EAP-TTLS` | identical | copy |
| `Certificate server names` | RADIUS FQDN or CN suffix | identical (wildcard suffix supported per RESEARCH.md) | copy |
| `Root cert for server validation` | Trusted Certificate profile reference | identical | copy |
| `Perform server validation` | (Windows-specific field) | **omit row** — macOS handles validation via Certificate server names + Root cert; no separate boolean field | remove |
| `Client authentication method` | SCEP / PKCS / Derived credential | SCEP or PKCS (no Derived credential on macOS Wi-Fi; RESEARCH.md omits it) | update |
| `Inner method` | `MSCHAPv2 (always; not PAP)` for PEAP; PAP/CHAP/MS-CHAP/MS-CHAPv2 for EAP-TTLS | PEAP = `-- (PEAP tunnels MSCHAPv2; inner not separately selectable)`; EAP-TTLS = `PAP / CHAP / MS-CHAP / MS-CHAP v2` | update per D-10 |
| `Identity privacy (outer identity)` | identical | identical | copy |
| `Authentication mode` | See Common Profile Mechanics | **omit row** — macOS has no auth-mode selector (D-04) | remove |

The `|---|---|---|---|` minimal separator style (no padding) is copied verbatim from line 69.

---

#### `## Wired` section opening (one-line B-04 sentence, D-09)

**Source:** `docs/admin-setup-8021x/03-windows.md` line 95 (`## Wired` heading) and lines 97–101 (section opener)

```markdown
## Wired

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wired network**

The wired profile uses the WiredNetwork CSP. Before configuring the 802.1X settings, address
the two high-consequence wired-only prerequisites below.
```

macOS variant: After `## Wired`, add the D-09 one-line B-04 prevention sentence as plain prose (not a callout): "macOS Wi-Fi and wired 802.1X use separate Intune profile types and are configured independently." Then open the `### In Intune admin center` block with the macOS wired navigation path: `**Devices** > **Configuration** > **New policy** > **macOS** > **Templates** > **Wired network**`. The "WiredNetwork CSP" and "two high-consequence wired-only prerequisites" opener is Windows-specific — omit it. The SCEP-only NOTE callout (D-06) fulfills the "wired-only prerequisite" role.

---

#### Wired SCEP-only NOTE callout (replaces dot3svc WARNING + enforcement-staging DANGER)

**Source template (callout format):** `docs/admin-setup-8021x/03-windows.md` lines 105–121 (WARNING blockquote) and lines 124–138 (DANGER blockquote) — these are the structural slots being replaced, not the content to copy.

macOS uses a single NOTE-severity callout (D-06) with no DANGER callout (D-03):

```markdown
> **NOTE -- Wired client certificates: SCEP only (PKCS not supported)**
>
> [content per RESEARCH.md "SCEP-Only Wired Callout (Full Draft)"]
```

Copy the `> **Label --` format from line 105 of the Windows file. The inner paragraph + link pattern follows the same blockquote mechanics as the Windows WARNING. Severity label: NOTE (informational constraint — admins in PKCS-only shops need to know before attempting configuration, not a recoverable-error class).

---

#### Wired Network Interface selector explanation

**Source:** (no Windows analog — Windows has no Network Interface selector field)

Place after the SCEP-only NOTE callout and before the per-EAP matrix. Use plain prose + markdown table matching the matrix style. No callout blockquote. The table has two columns: Option and Behavior. Source content is from RESEARCH.md "Network Interface field and options" section (seven options, "First active Ethernet" as default).

---

#### Wired per-EAP-method configuration matrix

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 144–155

```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Perform server validation | Enforced via trusted root reference | Yes -- always | Yes -- always |
| Disable user prompts for server validation | Yes | Yes | Yes |
| Require cryptographic binding | -- | Available (PEAP hardening) | -- |
| Client authentication method | SCEP cert / PKCS cert / PFX Import (PKCS Imported) / Derived credential | Username and Password | Username and Password |
| Inner method | -- (cert-only; no inner method) | MSCHAPv2 | PAP / CHAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
| Authentication mode | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) |
```

macOS wired variant (remove Windows-only rows, enforce SCEP-only, update field labels):

| Row | Windows value | macOS value | Action |
|-----|--------------|-------------|--------|
| `EAP type field value` | as shown | identical | copy |
| `Server Trust -- Certificate server names` | `Certificate server names` | `Server Trust -- Certificate server names` (macOS wired UI groups this under a "Server Trust" section — RESEARCH.md confirmed) | update row label |
| `Root cert for server validation` | Trusted Certificate profile reference | identical | copy |
| `Perform server validation` | (Windows field) | **omit row** | remove |
| `Disable user prompts for server validation` | (Windows-only field) | **omit row** | remove |
| `Require cryptographic binding` | (Windows-only field) | **omit row** | remove |
| `Client Authentication method` | SCEP / PKCS / PFX Import / Derived credential | `Certificates (SCEP only; PKCS not supported)` for EAP-TLS; `Username and Password` for PEAP/EAP-TTLS | update — SCEP only on wired |
| `Inner method` | same as Wi-Fi | `-- (cert-only; no inner method)` for EAP-TLS; `-- (PEAP tunnels MSCHAPv2; inner not separately selectable)` for PEAP; `PAP / CHAP / MS-CHAP / MS-CHAP v2` for EAP-TTLS | update per D-10 |
| `Identity privacy (outer identity)` | identical | identical | copy |
| `Authentication mode` | See Common Profile Mechanics | **omit row** | remove |

The `|---|---|---|---|` minimal separator style is copied from line 145.

---

#### `## See Also` section

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 185–189

```markdown
## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS/PFX-Import, per-platform cert matrix
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root
```

macOS variant: copy the section verbatim with one update to the `02-` description — remove the PFX-Import mention (macOS wired supports no PFX Import), e.g., "SCEP/PKCS cert delivery, per-platform cert matrix". All three link targets are identical.

---

#### `## Change History` footer

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 193–197

```markdown
---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Windows 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS; dot3svc Remediation pattern; enforcement-staging DANGER callout; KB5014754 strong-mapping callout | -- |
```

macOS variant:

```markdown
---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- macOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS; immutable deployment-channel WARNING; wired SCEP-only callout; dynamic trust dialog suppression | -- |
```

---

### `docs/admin-setup-8021x/00-overview.md` (EDIT — add item 4)

**Analog:** `docs/admin-setup-8021x/00-overview.md` itself (the live file is the source of truth)

---

#### Exact region to edit

**Source:** `docs/admin-setup-8021x/00-overview.md` line 30

```markdown
4–7. Platform guides (Phase 103–106) -- entries added as each guide is authored.
```

This single line (line 30) is the sole edit target.

---

#### Numbered list link format to replicate

**Source:** `docs/admin-setup-8021x/00-overview.md` line 28 (item 3 — the Phase-102 precedent, just added)

```markdown
3. **[Windows 802.1X Admin Setup (Wi-Fi + Wired)](03-windows.md)** -- Wi-Fi and wired profiles for all three EAP methods; dot3svc dependency and Remediation pattern; enforcement staging; KB5014754 strong certificate mapping.
```

Pattern: `N. **[Title](filename.md)** -- one-sentence description naming the key content facts; semicolon-separated clauses; no terminal period.`

Apply identically for item 4:

```markdown
4. **[macOS 802.1X Admin Setup (Wi-Fi + Wired)](04-macos.md)** -- Wi-Fi and wired profiles for all three EAP methods; immutable deployment-channel decision (User vs Device keychain) before profile creation; wired SCEP-only constraint; server name required to suppress dynamic trust dialog.

5–7. Platform guides (Phase 104–106) -- entries added as each guide is authored.
```

The `4–7.` placeholder becomes two lines: the new item 4 entry + a new `5–7.` continuation line. The Mermaid diagram node at line 21 (`C[3–7. Platform<br/>Guides]`) references a range and does NOT require updating for a single guide addition — it stays valid as a range reference until all five platform guides are authored. Executor verifies at authoring time (assumption A1 from RESEARCH.md).

---

#### Change History row to append

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 51–54

```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Initial version -- 802.1X admin-setup folder overview (two foundation guides) | -- |
| 2026-06-30 | Added item 3 -- Windows platform-guide entry linking 03-windows.md; narrowed placeholder range from 3--7 to 4--7 | -- |
```

Append a new row following the same pattern:

```markdown
| 2026-06-30 | Added item 4 -- macOS platform-guide entry linking 04-macos.md; narrowed placeholder range from 4--7 to 5--7 | -- |
```

---

## Shared Patterns

### YAML front-matter freshness stamp (file-level, 90-day)

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 1–7
**Apply to:** `04-macos.md` (the only new file)

6-key YAML block: `last_verified`, `review_by` (= last_verified + 90 days), `applies_to: both`, `audience: admin`, `platform: macos`. No inline callout freshness stamps are mandated for the macOS guide — there is no KB-equivalent high-drift callout (CONTEXT.md: "no macOS-specific high-drift inline-stamped callout is mandated by research for this guide").

### `> **Label --` blockquote callout convention

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 105, 124, 173
**Apply to:** Deployment-channel WARNING and SCEP-only NOTE in `04-macos.md`

Two-hyphen label separator (`--` not `—`), bold label, blank `>` line between paragraphs, inner markdown tables prefixed with `> |`. Severity labels for macOS guide: WARNING (deployment-channel, D-03) and NOTE (SCEP-only, D-06). No DANGER callout on macOS.

### Double-dash (`--`) em-dash style

**Source:** Throughout `docs/admin-setup-8021x/03-windows.md` and `00-overview.md`
**Apply to:** All prose in `04-macos.md` and the `00-overview.md` edit

Use `--` (two hyphens), never `—`. Applies to callout labels, Change History descriptions, numbered-list descriptions, and inline prose.

### `### In Intune admin center` compact subsection header

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 58–60, lines 97–99
**Apply to:** Wi-Fi and Wired subsections in `04-macos.md`

`###` heading level immediately followed by `Navigation: **Bold** > **Bold** > ...` with each menu level bolded and ` > ` as separator.

### Per-EAP-method matrix orientation

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 68–77, lines 144–155
**Apply to:** Wi-Fi matrix and Wired matrix in `04-macos.md`

EAP methods as columns (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), settings as rows. Minimal `|---|---|---|---|` separator (no padding). Three columns enforces co-equal presentation by construction. Two separate matrices (one per connection type) to accommodate wired SCEP-only difference.

### Link-not-copy cross-reference style

**Source:** `docs/admin-setup-8021x/03-windows.md` lines 18, 35, 84
**Apply to:** All cross-file references in `04-macos.md`

State what the target covers, then link. Do not restate the concept body. Example pattern:

```markdown
For the deployment ordering rule ... see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md).
```

### Numbered list link style (for `00-overview.md` edit)

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 24–28 (items 1–3)
**Apply to:** Item 4 entry in `00-overview.md`

`N. **[Title](filename.md)** -- semicolon-separated description clauses without a terminal period.`

---

## No Analog Found

None — both files have strong analogs. `04-macos.md` is a direct structural clone of `03-windows.md` with documented macOS deltas. `00-overview.md` is its own analog (live file read at authoring time).

---

## macOS-vs-Windows Template Delta Map

This table is the executor's primary reference for which Windows sections to clone, adapt, or omit:

| Windows section / element | Action for macOS | Decision |
|---------------------------|-----------------|----------|
| YAML front-matter | Clone; change `platform: windows` → `platform: macos` | — |
| Prerequisites blockquote | Clone verbatim | — |
| Scope banner | Clone verbatim | — |
| `## Common Profile Mechanics` opener | Clone; change "Windows" → "macOS" | — |
| `### Authentication Mode` table (lines 20–31) | **Replace** with deployment-channel WARNING callout + decision table | D-01/D-02/D-03 |
| Auth-mode table `Authentication mode` row in matrices | **Omit** from all matrices | D-04 |
| `### Server Validation (PerformServerValidation)` (lines 33–43) | Clone heading; replace Windows-specific prose with macOS dynamic-trust-dialog + A-05 security-violation content; retain link-not-copy links; add one-line wired delta | D-05/D-11/D-12 |
| Wired extra validation bullets (lines 39–42: Disable user prompts, Require cryptographic binding) | **Omit** (Windows-only settings) | — |
| `### Anonymous Outer Identity` (lines 44–52) | Clone verbatim; update field label to "Identity privacy (outer identity)" | — |
| Wi-Fi `### In Intune admin center` nav path | Clone; change `Windows 10 and later` → `macOS` | — |
| Wi-Fi Settings Catalog sentence (line 64) | **Omit** (Windows-only) | D-08 context |
| Wi-Fi per-EAP matrix `Perform server validation` row | **Omit** | — |
| Wi-Fi per-EAP matrix `Authentication mode` row | **Omit** | D-04 |
| Wi-Fi per-EAP matrix `Client authentication method` | Update: `SCEP or PKCS` (no Derived credential for macOS) | — |
| Wi-Fi per-EAP matrix `Inner method` for PEAP | Update to `-- (PEAP tunnels MSCHAPv2; inner not separately selectable)` | D-10 |
| Wi-Fi Additional settings block (SSO, PMK, FIPS, XML, lines 88–91) | **Omit** (Windows-only features) | — |
| Wired `### In Intune admin center` nav path | Clone; change `Windows 10 and later` → `macOS`; change `Wired network` stays same | — |
| Wired "WiredNetwork CSP" + prerequisites opener (lines 101–102) | **Omit**; replace with D-09 one-line B-04 separateness sentence | D-09 |
| `### dot3svc Service Dependency` WARNING (lines 103–121) | **Replace** with SCEP-only NOTE callout | D-06 |
| `### 802.1X Enforcement Staging` DANGER (lines 122–138) | **Omit** entirely — no macOS equivalent | D-03 |
| Wired matrix `Perform server validation` row | **Omit** | — |
| Wired matrix `Disable user prompts for server validation` row | **Omit** (Windows-only field) | — |
| Wired matrix `Require cryptographic binding` row | **Omit** (Windows-only field) | — |
| Wired matrix `Certificate server names` row label | Update to `Server Trust -- Certificate server names` (macOS wired UI groups under "Server Trust") | — |
| Wired matrix `Client authentication method` for EAP-TLS | Update to `Certificates (SCEP only; PKCS not supported)` | D-06/D-07 |
| Wired matrix `Client authentication method` for EAP-TTLS/PEAP | Update to `Username and Password` (same); add SCEP-only note for Certificates option | D-06 |
| Wired matrix `PFX Import` cert option | **Omit** (Windows-only; macOS wired is SCEP only) | — |
| Wired matrix `Authentication mode` row | **Omit** | D-04 |
| `### TEAP (Tunneled EAP)` awareness note (lines 165–167) | **Omit** entirely -- no macOS TEAP | — |
| `## Hybrid Entra Joined -- Strong Certificate Mapping` (lines 171–181) | **Omit** entirely -- KB5014754 Windows DC enforcement, no macOS equivalent | D-03 |
| `## See Also` | Clone; update `02-` description to remove PFX-Import reference | — |
| `## Change History` | Clone; update initial-version description for macOS content | — |
| Inline freshness stamp `*last_verified: · review_by: *` | **Omit** — no macOS high-drift callout mandated | — |
| **macOS-only additions (no Windows analog)** | | |
| Network Interface selector table (after SCEP-only callout, Wired section) | **Add** (macOS-only Intune field; no Windows equivalent) | D-07 |
| One-line dynamic-trust-dialog wired delta | **Add** as prose in Wired section after Network Interface selector | D-05 |
| "No authentication-mode selector" note | **Add** in Common Mechanics after deployment-channel WARNING | D-04 |

---

## Metadata

**Analog search scope:** `docs/admin-setup-8021x/` (03-windows.md and 00-overview.md read in full); planning files (103-CONTEXT.md, 103-RESEARCH.md, 102-PATTERNS.md) read in full
**Files scanned:** 4 files read (2 planning + 2 analog docs)
**Pattern extraction date:** 2026-06-30

---

## PATTERN MAPPING COMPLETE
