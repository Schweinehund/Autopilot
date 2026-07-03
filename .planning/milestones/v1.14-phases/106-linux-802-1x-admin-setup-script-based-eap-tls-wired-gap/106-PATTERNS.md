# Phase 106: Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap) - Pattern Map

**Mapped:** 2026-06-30
**Files analyzed:** 2 (1 new, 1 edit)
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/admin-setup-8021x/07-linux.md` | doc — per-platform admin guide | request-response (operator follows guide to configure a device) | `docs/admin-setup-8021x/06-android.md` | exact (immediately-prior gap-platform guide; same A3-degraded structure) |
| `docs/admin-setup-8021x/00-overview.md` | doc — folder index (edit only) | N/A | `docs/admin-setup-8021x/00-overview.md` lines 36 + 59–63 (self-analog: prior item-5/6 edits) | exact (same file, same edit pattern) |

---

## Pattern Assignments

### `docs/admin-setup-8021x/07-linux.md` (NEW — per-platform admin guide)

**Primary analog:** `docs/admin-setup-8021x/06-android.md`
**Secondary analog:** `docs/admin-setup-8021x/05-ios.md` (three-column config-matrix shape; single-home cross-ref pattern)

---

#### Front-Matter Stamp Block

**Source:** `docs/admin-setup-8021x/06-android.md` lines 1–7

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: android
---
```

**Rules for `07-linux.md`:**
- Change `platform: android` to `platform: linux` (single lowercase token — never "Linux Ubuntu" or "linux-ubuntu")
- `last_verified` = guide authoring date (2026-06-30)
- `review_by` = authoring date + 90 days (2026-09-28)
- `applies_to: both` (covers both Wi-Fi and wired guidance — same as Android)
- `audience: admin` — unchanged

---

#### Prerequisites Blockquote

**Source:** `docs/admin-setup-8021x/06-android.md` lines 9–10

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

**Rule:** Replicate verbatim — same two link targets, same blockquote form, same position (immediately after front-matter, before the H1).

---

#### H1 + Scope Banner

**Source:** `docs/admin-setup-8021x/06-android.md` lines 12–14

```markdown
# Android Enterprise 802.1X Admin Setup: Wi-Fi

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

**Rules for `07-linux.md`:**
- H1: `# Linux 802.1X Admin Setup: EAP-TLS via nmcli` (or similar — executor's discretion on subtitle wording)
- Scope banner: replicate verbatim (same link target `02-cert-delivery-foundation.md#canonical-scope-callout`); this is the one-line scope banner mandated by Phase 101 D-06

---

#### Lead Gap WARNING Callout (D-03 / SC1)

**Source:** `docs/admin-setup-8021x/06-android.md` line 79 (inline WARNING form):

```markdown
> **WARNING -- Personally owned work profile (BYOD-WP): Wi-Fi profile deployment fails if UPN is absent from certificate SAN**
```

**Source:** `docs/admin-setup-8021x/05-ios.md` lines 75–88 (block WARNING form with continuation lines):

```markdown
> **WARNING -- PEAP inner authentication on iOS/iPadOS: MS-CHAPv2 only (PAP not supported)**
>
> iOS/iPadOS PEAP inner authentication is always MS-CHAPv2. The Intune Wi-Fi profile UI for
> iOS/iPadOS PEAP does not present an inner-method selector -- **there is no PAP option to
> select.** ...
```

**Rules for `07-linux.md` lead callout:**
- Form: `> **WARNING --` followed by a short title label, then `>` continuation lines for the body (block form, same as iOS example)
- Double-hyphen separator: `WARNING --` (not `WARNING:`, not `WARNING —`)
- Content: 3–4 sentences covering: (1) no native Intune Wi-Fi profile for Linux, (2) no native wired profile, (3) no cert-delivery profiles, (4) this guide documents an OS-level shell-script/nmcli workaround, not an Intune profile
- Position: immediately after the scope banner / before any config content (SC1 requires it leads)
- Do NOT use `IMPORTANT` (out-of-vocabulary in this suite), `CRITICAL` (reserved for auth-break hazard; 1× only in `02-`), or `DANGER` (reserved for lockout hazard; 1× only in `03-`)

---

#### Inline Freshness Stamp Form (SC3 MEDIUM-confidence callout body)

**Source:** `docs/admin-setup-8021x/06-android.md` line 100:

```markdown
*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

**Source:** `docs/admin-setup-8021x/05-ios.md` line 62:

```markdown
*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

**Rules for `07-linux.md`:**
- Italic form with centered-dot separator (`·`) — not `|`, not `/`
- The SC3 "surface actively developing" callout body must close with this stamp
- The stamp in the SC3 callout is SEPARATE from the front-matter stamp block (per D-04)
- Values: `last_verified: 2026-06-30 · review_by: 2026-09-28`

---

#### Per-EAP Config-Matrix Table Shape (adapted for Linux reference parameter table)

**Source (sibling three-column form):** `docs/admin-setup-8021x/06-android.md` lines 67–75:

```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server name field (corporate-owned/AOSP) | **Radius server name** ... | **Radius server name** | **Radius server name** |
...
```

**Source (sibling three-column form, wired):** `docs/admin-setup-8021x/05-ios.md` lines 125–132:

```markdown
| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
...
```

**Rules for `07-linux.md` reference parameter table (D-06):**
- Linux is EAP-TLS ONLY — do NOT use the three-column form (would imply co-equal PEAP/TTLS coverage that is out of scope and undocumented)
- Adapt to a **two-column** nmcli property reference:

```markdown
| nmcli Property | EAP-TLS Value / Placeholder |
|---|---|
| `802-1x.eap` | `tls` |
| `802-1x.identity` | `device-user@domain.com` |
| `802-1x.ca-cert` | `/etc/certs/ca-root.pem` |
| `802-1x.client-cert` | `/etc/certs/client-cert.pem` |
| `802-1x.private-key` | `/etc/certs/private-key.pem` |
| `802-1x.private-key-password` | `<passphrase>` (omit if key is unencrypted) |
| `802-1x.private-key-password-flags` | `4` (unencrypted key) or `0` (system-managed) |
| `802-11-wireless-security.key-mgmt` | `wpa-eap` (Wi-Fi only; not used for wired) |
| `802-11-wireless.ssid` | `YourCorporateSSID` (Wi-Fi only) |
```

- Source line for this property set: `106-RESEARCH.md` Section 2, confirmed from networkmanager.dev/docs/api/1.52.0/settings-802-1x.html (HIGH confidence on property names; MEDIUM confidence on command syntax)
- Add a trailing source attribution line: `Source: NetworkManager Reference Manual — settings-802-1x (networkmanager.dev). Property values are illustrative placeholders; validate for your environment.`

---

#### Wired H2 Form

**Source:** `docs/admin-setup-8021x/06-android.md` line 110:

```markdown
## Wired
```

**Rules for `07-linux.md`:**
- Bare `## Wired` heading — no subtitle, same as Android
- Body: collapsed stub pointing at the SAME nmcli EAP-TLS workaround with `connection.type ethernet`; NOT the Android "consult your network team" text (line 112 of Android — do NOT clone)
- The wired stub must show the concrete `nmcli connection add type ethernet ...` command (D-02); it is NOT a dead-end gap stub
- Remove `wifi-sec.key-mgmt` and `802-11-wireless.ssid` from the wired command (not applicable to wired connections)

**Android wired text (DO NOT CLONE — for contrast reference only):** `docs/admin-setup-8021x/06-android.md` line 112:

```markdown
**Android Enterprise has no native Intune wired-network profile type.** ... organizations ... should consult their network or infrastructure team for switch-side configuration options ...
```

---

#### See-Also + Change-History Footer

**Source:** `docs/admin-setup-8021x/06-android.md` lines 116–128:

```markdown
## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS cert delivery, per-platform cert matrix (incl. Android Enterprise BYOD UPN-in-SAN requirement)
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Android Enterprise 802.1X admin setup: ... | -- |
```

**Rules for `07-linux.md`:**
- Same three See-Also links — update the parenthetical descriptions to be Linux-accurate (remove Android-specific references to UPN-in-SAN, SCEP/PKCS delivery options not available on Linux, etc.)
- Change-History table: one initial row, `Author` column = `--` (no named author — matches all sibling files)
- Double horizontal-rule before the Change History section (`---`) — matches sibling pattern
- `--` double-hyphen separator in the Change column (same as Android `|...; ... | -- |` form)

---

#### Sibling-Only Mechanics — DO NOT CLONE

The following Android content is present in `06-android.md` and must NOT appear in `07-linux.md`:

| Android section | Source lines | Why excluded |
|---|---|---|
| Android Enterprise enrollment modes (COBO/COPE/COSU/BYOD-WP) | 56–63 | No Intune Android enrollment modes apply to Linux |
| UPN-in-SAN WARNING | 79–83 | Android-specific SCEP profile deployment failure; Linux has no Intune cert profiles at all |
| Certificate access for Device Owner modes | 85–89 | Android-specific SCEP profile setting |
| Version-gated RADIUS server-name WARNING (Android 11+/14+) | 91–100 | Android OS version gates; no Intune profile for Linux |
| MAC randomization (`Use device MAC`) | 102–106 | Android 13+ feature; no Intune Wi-Fi profile for Linux |
| "consult your network team" wired punt | 112 | Contradicts D-02; Linux alternative is nmcli, not deferral |

---

### `docs/admin-setup-8021x/00-overview.md` (EDIT — fill item 7 + add Change-History row)

**Self-analog:** `docs/admin-setup-8021x/00-overview.md` lines 34–35 and 59–63 (prior item-5/6 edits establish the pattern)

---

#### Current Item-7 Placeholder (exact text to replace)

**Source:** `docs/admin-setup-8021x/00-overview.md` line 36:

```markdown
7. Platform guide (Phase 106) -- entry added when guide is authored.
```

**Replace with (from `106-RESEARCH.md` Section 5):**

```markdown
7. **[Linux 802.1X Admin Setup (EAP-TLS via nmcli)](07-linux.md)** -- No native Intune Wi-Fi, wired, or cert-delivery profiles for Linux; guide documents EAP-TLS via nmcli (NetworkManager `802-1x.*`) as an OS-level workaround, with out-of-band certificate prerequisites. Ubuntu 24.04 LTS and 26.04 LTS. PEAP-MSCHAPv2 and EAP-TTLS out of scope (not in verifiable Microsoft/vendor sources for Intune-managed Linux fleets).
```

---

#### Wired Availability Note — DO NOT MODIFY

**Source:** `docs/admin-setup-8021x/00-overview.md` line 38:

```markdown
> **Wired 802.1X availability note:** Android Enterprise has no native Intune wired-network profile type -- Wi-Fi only; see the Android guide for details. Linux has no native Intune Wi-Fi or wired profile -- script-based EAP-TLS only via nmcli; see the Linux guide for details.
```

This pre-existing text is already correct for Linux. Do NOT modify it. The item-7 link addition will cause the phrase "see the Linux guide for details" to connect to `07-linux.md`.

---

#### Change-History Row Format

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 59–63 (the four prior item-edit rows):

```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Initial version -- 802.1X admin-setup folder overview (two foundation guides) | -- |
| 2026-06-30 | Added item 3 -- Windows platform-guide entry linking 03-windows.md; narrowed placeholder range from 3--7 to 4--7 | -- |
| 2026-06-30 | Added item 4 -- macOS platform-guide entry linking 04-macos.md; narrowed placeholder range from 4--7 to 5--7 | -- |
| 2026-06-30 | Added item 5 -- iOS/iPadOS platform-guide entry linking 05-ios.md; narrowed placeholder range from 5--7 to 6--7 | -- |
| 2026-06-30 | Added item 6 -- Android Enterprise platform-guide entry linking 06-android.md; narrowed placeholder range from 6--7 to 7 | -- |
```

**New row to append (after the Android row at line 63):**

```markdown
| 2026-06-30 | Added item 7 -- Linux platform-guide entry linking 07-linux.md; placeholder removed | -- |
```

**Pattern rules:**
- `Date` column: 2026-06-30 (guide authoring date)
- `Change` column: starts with "Added item N --" (double-hyphen, same as all prior rows); brief description of the edit
- `Author` column: `--` (two hyphens — no named author, consistent with all sibling rows)
- Append after the existing last row (do not re-order the table)

---

## Shared Patterns

### WARNING Callout Double-Hyphen Form

**Source:** Multiple files — confirmed at `06-android.md:79`, `05-ios.md:75`, `03-windows.md` (per context)
**Apply to:** The `07-linux.md` lead gap callout (D-03) AND any secondary callouts

```markdown
> **WARNING -- <short label text>**
>
> <body text>
```

- Double-hyphen (`--`) separator — NOT colon (`:`), NOT em-dash (`—`), NOT `IMPORTANT`
- Suite vocabulary: NOTE / WARNING / DANGER / CRITICAL only

---

### NOTE Callout Form (for non-hazard informational callouts)

**Source:** `docs/admin-setup-8021x/05-ios.md` lines 107–117:

```markdown
> **NOTE -- Wired client certificates: SCEP only (PKCS not supported)**
>
> The iOS/iPadOS wired network profile supports only **SCEP certificate profiles** for client
> authentication across all three EAP types ...
```

**Apply to:** The cert-prerequisites note (D-07) and the SC3 "surface actively developing" callout (D-04) in `07-linux.md`, if callout form is warranted. The executor may use plain prose for cert-prerequisites (per `106-CONTEXT.md` callout-discipline note: "calibrate callout-vs-prose at executor discretion").

---

### Freshness Stamp (Inline + Front-Matter)

**Source:** `docs/admin-setup-8021x/06-android.md` lines 1–6 (front-matter) and line 100 (inline):

```markdown
last_verified: 2026-06-30
review_by: 2026-09-28
```

and inline:

```markdown
*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

**Apply to:** Front-matter of `07-linux.md` (static file-level stamp) AND the SC3 "surface actively developing" callout body (per-section inline stamp — D-04).

---

### Anchor Slug Rules (Double-Hyphen Trap)

**Source:** `106-CONTEXT.md` (Established Patterns) and `106-RESEARCH.md` Section 3.9

- Plain GitHub auto-slugs — NO `{#id}` override syntax anywhere in the suite
- `## Wired` auto-slugs to `#wired` — safe
- `## EAP-TLS via nmcli -- Wi-Fi` would auto-slug to `#eap-tls-via-nmcli----wi-fi` (four hyphens from `--` + space + `-`) — use `## EAP-TLS via nmcli (Wi-Fi)` → `#eap-tls-via-nmcli-wi-fi` instead
- Any heading containing a double-hyphen label must be checked for multi-hyphen slug output before use in cross-file links

---

### Link-Not-Copy Boundary

**Apply to:** All content in `07-linux.md`

The following concepts are already homed in `01-`/`02-`/`_glossary-network.md`. They must be LINKED, never restated in `07-linux.md`:

| Concept | Link target |
|---|---|
| Co-equal EAP method overview / when-to-choose | `01-eap-method-overview.md` |
| Cert-delivery ordering rule (trusted-root → SCEP/PKCS → 802.1X profile) | `02-cert-delivery-foundation.md` |
| EKU = Client Authentication requirement | `02-cert-delivery-foundation.md` |
| RADIUS server-name validation rationale (rogue-RADIUS) | `02-cert-delivery-foundation.md` |
| Inner/outer identity privacy theory | `_glossary-network.md#inner-outer-identity` |
| SCEP, PKCS, supplicant, 802.1X, EAP, RADIUS term definitions | `_glossary-network.md` |
| Full scope exclusion list | `02-cert-delivery-foundation.md#canonical-scope-callout` |

---

## No Analog Found

None. Both target files have strong analogs with exact or role-match quality.

---

## Metadata

**Analog search scope:** `docs/admin-setup-8021x/` — all seven existing files read or referenced
**Files scanned:** `06-android.md` (128 lines, fully read), `05-ios.md` (153 lines, fully read), `00-overview.md` (64 lines, fully read)
**Upstream inputs consumed:** `106-CONTEXT.md` (169 lines), `106-RESEARCH.md` (755 lines)
**Pattern extraction date:** 2026-06-30

---

## PATTERN MAPPING COMPLETE

**Phase:** 106 - Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap)
**Files classified:** 2
**Analogs found:** 2 / 2

### Coverage
- Files with exact analog: 2 (both target files have immediately-prior-sibling or self-analog with complete structure match)
- Files with role-match analog: 0
- Files with no analog: 0

### Key Patterns Identified
- All sibling guides use `> **WARNING --` (double-hyphen) blockquote as the lead-callout tier for platform-constraint warnings; `07-linux.md` must replicate this form exactly
- The front-matter stamp block (`last_verified`/`review_by`/`applies_to`/`audience`/`platform`) is copied from `06-android.md` lines 1–7 with only `platform: android` changed to `platform: linux`
- The nmcli reference parameter table is a two-column adaptation of the sibling three-column per-EAP matrix; single-column because Linux is EAP-TLS-only documentation scope
- The `00-overview.md` item-7 edit pattern is self-analog: append a Change-History row with `| 2026-06-30 | Added item 7 -- Linux platform-guide entry linking 07-linux.md; placeholder removed | -- |` and replace line 36 with the live link
- The `## Wired` H2 is a bare heading (no subtitle) followed by a collapsed stub — same heading form as `06-android.md:110` but body content differs (nmcli `type ethernet` command, not "consult your network team")
- Inline freshness stamp form: `*last_verified: YYYY-MM-DD · review_by: YYYY-MM-DD*` (italic, centered-dot separator) — used in SC3 callout body, NOT just front-matter

### File Created
`.planning/phases/106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap/106-PATTERNS.md`

### Ready for Planning
Pattern mapping complete. Planner can reference analog patterns in PLAN.md files.
