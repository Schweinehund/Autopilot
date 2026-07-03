# Phase 106: Linux 802.1X Admin-Setup (Script-Based EAP-TLS + Wired Gap) - Research

**Researched:** 2026-06-30
**Domain:** Linux 802.1X via nmcli / NetworkManager EAP-TLS; Intune Linux management surface
**Confidence:** MEDIUM (nmcli param set HIGH; Intune gap confirmation HIGH; Ubuntu version note HIGH)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Area W — Wired treatment**
- **D-01:** Keep the top-level `## Wired` H2 (cross-guide parallelism), collapsed to point at the same nmcli EAP-TLS workaround using `connection.type ethernet` — NOT a dead-end Android-style gap stub.
- **D-02:** nmcli's `802-1x.*` properties are connection-type-agnostic — identical EAP-TLS parameters apply to `connection.type ethernet`. Do NOT clone Android 105 D-04's "consult your network team" punt.

**Area L — Lead gap callout + version scoping**
- **D-03:** Guide-leading gap callout tier = `> **WARNING:**` blockquote. Not `IMPORTANT` (out-of-vocab). Not `CRITICAL`/`DANGER` (hazard-reserved). WARNING is the sibling lead-callout tier.
- **D-04:** Two distinct callouts: (1) SC1 HIGH-confidence settled gap fact leads the guide; (2) SC3 separate MEDIUM-confidence freshness-stamped "surface actively developing" callout. Not merged.
- **D-05:** Name both current LTS releases in a prerequisites/applies-to note (NOT front-matter platform field). PITFALLS :504 flags version delta. **[SEE FLAG BELOW — versions have shifted from 22.04+24.04 to 24.04+26.04]**

**Area S — Script depth + certificate delivery**
- **D-06:** Deliver discrete, followable `nmcli 802-1x.*` connection-parameter steps + a reference parameter table. Do NOT ship a full standalone runnable Bash script.
- **D-07:** Out-of-band cert-prerequisites note (standalone prominence): client cert + private key + CA root pre-placed on device out-of-band; nmcli params reference file paths only. NEVER show inline private-key material.
- **D-08:** Short "validate before fleet deployment / illustrative" disclaimer at the lead-in to the workaround section. Distinct from SC3 platform-surface callout.

**Area E — EAP scope framing**
- **D-09:** Dedicated short scope note (one sentence each: PEAP-MSCHAPv2, EAP-TTLS) placed after the gap lead / at the head of the EAP-TLS workaround. No nmcli config detail for PEAP/TTLS.
- **D-10:** Frame EAP-TLS-only as a source-confidence/documentation-scope boundary, NOT a method preference. Link back to co-equal `01-eap-method-overview.md`. Any framing that ranks EAP-TLS as "best for Linux" VIOLATES the locked co-equal constraint.

### Claude's Discretion
- Exact prose, callout phrasing/labels, anchor wording, section ordering within `07-linux.md` — provided locked decisions and corpus conventions are honored.
- Exact phrasing of nmcli command steps, reference parameter table, gap WARNING, MEDIUM-confidence freshness callout, out-of-band cert-prerequisites note, validate-before-fleet disclaimer, and PEAP/TTLS scope note.
- Whether `## Wired` H2 shows one changed property inline or cross-refs the Wi-Fi nmcli steps — provided it does NOT become a second full config treatment.

### Deferred Ideas (OUT OF SCOPE)
- Linux PEAP / EAP-TTLS via nmcli config steps
- Switch-side / non-Intune wired 802.1X (MAB, port-auth, VLAN, RADIUS/NPS)
- Inventing a Linux OMA-URI custom profile (none exists)
- Capability-matrix 802.1X rows + global nav-hub wiring (Phase 109)
- L1/L2 runbooks + decision tree (Phases 107-108)
- Sibling-only mechanics (Windows dot3svc/TEAP, macOS keychain channel, iOS MAC label, Android enrollment modes/UPN-in-SAN)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-08 | An operator can configure 802.1X on Linux (Ubuntu LTS) via the documented script/`nmcli` (NetworkManager `802-1x`) EAP-TLS workaround, with the no-native-Intune-Wi-Fi/wired/cert-profile reality leading the guide and PEAP/EAP-TTLS marked out of scope (MEDIUM-confidence callout; verify at plan time). | Live-verified gap (Section 1); concrete nmcli param set (Section 2); house-style/outline (Sections 3-5) |
</phase_requirements>

---

## Summary

This phase authors a single documentation file — `docs/admin-setup-8021x/07-linux.md` — plus a local edit to `docs/admin-setup-8021x/00-overview.md` (fill item 7 and log Change-History row). Linux is the deepest gap platform in this suite: Intune provides zero native Wi-Fi profile, wired network profile, or certificate-delivery profiles for Linux as of 2026-06-30. This is confirmed by live MS Learn verification (see Section 1). The guide's job is to (a) open with a prominent WARNING that the approach documented is an OS-level shell-script workaround, not an Intune profile; (b) provide followable nmcli `802-1x.*` EAP-TLS connection steps plus a reference parameter table; and (c) satisfy all three ROADMAP success criteria (SC1 gap callout, SC2 verification trio, SC3 PEAP/TTLS scope note + MEDIUM-confidence freshness callout).

**One scope-adjacent alert surfaced during live verification:** The Ubuntu LTS versions named in D-05 (22.04 + 24.04) are now out-of-date. Current Microsoft Learn documentation (last updated 2026-04-16) lists **Ubuntu 24.04 + 26.04** as the supported enrollment targets. Ubuntu 22.04 support ends August 2026. The planner must decide whether to update D-05 to 24.04 + 26.04, or write the guide to name "current LTS releases (Ubuntu 24.04 and 26.04 as of guide authoring)." This does NOT change the guide scope or structure — only the version names in the applies-to note.

**Primary recommendation:** Author `07-linux.md` following the structural outline in Section 4 of this document, using the concrete nmcli parameter set from Section 2, the house-style conventions extracted in Section 3, and reflecting Ubuntu 24.04 + 26.04 (not 22.04 + 24.04) in the prerequisites note.

---

## 1. Live Verification Results: Three Plan-Time Flags

### Flag 1: Intune Linux Native Profile Surface (Wi-Fi / Wired / Cert)

**Verdict: SCOPE UNCHANGED. No native Wi-Fi, wired, or cert profiles for Linux — confirmed 2026-06-30.**

**Evidence chain:**

1. **Microsoft Learn — Wi-Fi profile creation guide** (last updated 2026-06-22, git commit 7328cf31):
   - Lists Wi-Fi profile supported platforms as: Android device administrator, Android Enterprise and kiosk, Android (AOSP), iOS/iPadOS, macOS, Windows, Windows Holographic for Business.
   - **Linux is absent from this list.** [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/templates/configure-wifi]

2. **Microsoft Learn — Linux deployment guide** (last updated 2026-06-22, git commit 7328cf31):
   - Linux Intune capabilities listed: compliance policies (settings catalog), custom Bash scripts, Conditional Access (via Microsoft Edge), MDE. No mention of Wi-Fi profile, wired network profile, or certificate delivery profile for Linux.
   - Quote: "You can enforce device compliance policies based on Linux distribution type, version, device encryption, or password complexity."
   - [VERIFIED: learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux]

3. **Microsoft Learn — Wired network settings** (2026-06-29 research; Linux row = "NOT SUPPORTED — same gap as Wi-Fi: shell scripts only; no structured 802.1X profile"):
   - Wired profile supported platforms: Windows, macOS, iOS/iPadOS. Linux = NOT SUPPORTED.
   - [VERIFIED: STACK.md :38, cross-confirmed with wired-networks-configure page]

**Confidence: HIGH** — confirmed from two separate MS Learn pages both updated 2026-06-22. No native profile support has shipped since the 2026-06-29 research date.

**Implication for plan:** Scope is unchanged. The guide opens with the HIGH-confidence gap WARNING (D-03/D-04). The SC1 callout content is settled fact, not speculative. The SC3 MEDIUM-confidence "surface actively developing" callout remains warranted because Microsoft continues expanding Linux Intune capabilities (e.g., Microsoft Identity Broker architectural change introduced June 2026), and 802.1X profile support could ship in a future update.

---

### Flag 2: nmcli 802-1x.* EAP-TLS Parameter Set

**Verdict: PROPERTY NAMES AND TYPES CONFIRMED from official NetworkManager documentation.**

**Source:** networkmanager.dev/docs/api/1.52.0/settings-802-1x.html — NetworkManager Reference Manual, settings-802-1x section [VERIFIED: networkmanager.dev]

#### Core 802-1x.* Properties for EAP-TLS

| nmcli Property | Type | Value for EAP-TLS | Notes |
|---|---|---|---|
| `802-1x.eap` | array of string | `tls` | Allowed EAP method; `tls` selects certificate-based EAP-TLS |
| `802-1x.identity` | string | `user@domain.com` | Identity string (outer EAP identity / supplicant username) |
| `802-1x.ca-cert` | byte array / path | `/path/to/ca-root.pem` | CA certificate for server verification; use `file://` prefix when passing as absolute path in older NM versions |
| `802-1x.client-cert` | byte array / path | `/path/to/client-cert.pem` | Client certificate for authentication |
| `802-1x.private-key` | byte array / path | `/path/to/private-key.pem` | Private key (supports encrypted PEM or PKCS#12) |
| `802-1x.private-key-password` | string | `<passphrase>` | Decryption passphrase for encrypted private key; omit if key is unencrypted |
| `802-1x.private-key-password-flags` | uint32 (flags) | `4` (not-required) or `0` (none) | `4` = not-required (unencrypted key / no prompt); `0` = system-managed (stored in keyring) |

**`private-key-password-flags` values:**
- `0x0` (none / 0) — system is responsible for providing/storing (stored in connection file, accessible to root)
- `0x1` (1) — agent-owned (NetworkManager agent manages the secret)
- `0x2` (2) — not-saved (ask on each connection, not stored)
- `0x4` (4) — not-required (private key is unencrypted; no password needed)

#### Wi-Fi Context (additional properties)

| nmcli Property | Value | Notes |
|---|---|---|
| `connection.type` | `wifi` | Connection type for wireless |
| `802-11-wireless.ssid` | `<SSID-string>` | The target SSID |
| `802-11-wireless-security.key-mgmt` | `wpa-eap` | Selects WPA2/WPA3 Enterprise; required for 802.1X Wi-Fi |

**Abbreviated form in nmcli:** `wifi-sec.key-mgmt wpa-eap` (nmcli accepts both `wifi-sec` and `802-11-wireless-security` as property namespace)

#### Wired (Ethernet) Context — ONE property changes

| nmcli Property | Value | Notes |
|---|---|---|
| `connection.type` | `ethernet` | Connection type for wired/Ethernet |

All `802-1x.*` properties are **identical** for wired and Wi-Fi. The `802-11-wireless-security.key-mgmt` property is **not needed** for wired connections — the 802-1x section attaches to the ethernet connection directly; NetworkManager's wired 802.1X handling does not require an explicit key-mgmt value.

#### Concrete nmcli Command Steps

**Step 1 — Create the Wi-Fi EAP-TLS connection:**

```bash
nmcli connection add \
  type wifi \
  con-name "Corp-WiFi-EAP-TLS" \
  ssid "YourSSID" \
  wifi-sec.key-mgmt wpa-eap \
  802-1x.eap tls \
  802-1x.identity "user@domain.com" \
  802-1x.ca-cert /etc/certs/ca-root.pem \
  802-1x.client-cert /etc/certs/client-cert.pem \
  802-1x.private-key /etc/certs/private-key.pem \
  802-1x.private-key-password-flags 4
```

Use `802-1x.private-key-password-flags 4` for an unencrypted private key. For an encrypted key, replace flags with `0` and add `802-1x.private-key-password "passphrase"`.

**Step 2 — Activate the connection:**

```bash
nmcli connection up "Corp-WiFi-EAP-TLS"
```

**Step 3 — For wired (Ethernet 802.1X), change ONE property:**

```bash
nmcli connection add \
  type ethernet \
  con-name "Corp-Wired-EAP-TLS" \
  ifname eth0 \
  802-1x.eap tls \
  802-1x.identity "user@domain.com" \
  802-1x.ca-cert /etc/certs/ca-root.pem \
  802-1x.client-cert /etc/certs/client-cert.pem \
  802-1x.private-key /etc/certs/private-key.pem \
  802-1x.private-key-password-flags 4
```

Note: No `wifi-sec.key-mgmt` or `802-11-wireless.ssid` for wired; all `802-1x.*` properties are unchanged.

**Confidence assessment:**
- Property names (`802-1x.eap`, `802-1x.identity`, `802-1x.ca-cert`, `802-1x.client-cert`, `802-1x.private-key`, `802-1x.private-key-password`, `802-1x.private-key-password-flags`): **HIGH** — confirmed from official NetworkManager API documentation at networkmanager.dev.
- Property values and command structure: **MEDIUM** — nmcli command syntax is standard NetworkManager CLI convention; the exact `nmcli connection add` form shown is consistent with multiple authoritative sources (RHEL 9 docs, major.io, NetworkManager reference) and the official property types, but the commands are not from an official MS Learn Linux 802.1X guide (none exists). The "validate before fleet deployment" disclaimer (D-08) is warranted.
- Wi-Fi vs. wired distinction (one-property change for `connection.type ethernet`): **HIGH** — 802-1x properties are connection-type-agnostic per NetworkManager design; confirmed by STACK.md :38 and consistent with nmcli architecture.

**Sources consulted:**
- [VERIFIED: networkmanager.dev/docs/api/1.52.0/settings-802-1x.html] — NM 1.52.0 reference (official)
- [VERIFIED: networkmanager.dev/docs/api/latest/nm-settings-nmcli.html] — nmcli property reference
- [ASSUMED] RHEL 9 docs (Red Hat documentation, 403 on direct fetch) — community-cross-verified via major.io and other sources
- [ASSUMED] major.io/p/802-1x-networkmanager-using-nmcli/ — shows PEAP steps (not EAP-TLS) but confirms nmcli property convention; MEDIUM-confidence tertiary source

---

### Flag 3: Ubuntu LTS Version Targets

**Verdict: SCOPE SHIFT DETECTED — versions have changed from D-05 (22.04 + 24.04) to (24.04 + 26.04). Ubuntu 22.04 support ends August 2026.**

**Evidence:**

1. **Microsoft Learn — Supported operating systems and browsers** (last updated 2026-04-16):
   - Linux section reads: "Ubuntu Desktop 24.04 and 26.04 LTS with a GNOME graphical desktop environment" and "Ubuntu LTS, version 24.04 and 26.04"
   - Ubuntu 22.04 is **NOT listed**.
   - [VERIFIED: learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms]

2. **Microsoft Learn — Linux deployment guide** (last updated 2026-06-22):
   - "Enrollment is supported on Linux desktops running: Ubuntu LTS, version 26.04 and 24.04 LTS"
   - Also confirms RHEL 9 and RHEL 10. No mention of 22.04.
   - [VERIFIED: learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux]

3. **Search result confirmation** (2026-06-30): "Microsoft Intune now supports Ubuntu 26.04 LTS. Support for Ubuntu 22.04 LTS ends in August 2026."

**Implication for D-05:** The locked decision (D-05) specified "Ubuntu 22.04 + 24.04" based on PITFALLS :504 research dated 2026-06-29. One day later the live verification shows the supported pair is now **24.04 + 26.04**. The planner should write the applies-to note as **Ubuntu 24.04 LTS and 26.04 LTS** (the current supported pair as of guide authoring).

**D-05 structural guidance remains unchanged:** Name both current LTS releases explicitly in a prerequisites/applies-to note (NOT front-matter). The note about per-version Intune agent capability differences (PITFALLS :504) now applies to 24.04 vs. 26.04, not 22.04 vs. 24.04. The nmcli mechanics remain distro-agnostic across all supported Ubuntu versions.

**Confidence: HIGH** — confirmed from two separate MS Learn pages, one updated 2026-06-22.

---

## 2. Standard Stack

### Deliverable Stack (this is a documentation phase — no installable packages)

| Component | Version/Form | Purpose |
|---|---|---|
| NetworkManager / nmcli | System-provided (Ubuntu 24.04: NM 1.44+; Ubuntu 26.04: NM 1.48+) | Connection management tool that operators use for 802.1X EAP-TLS |
| `802-1x.*` connection properties | NM API (networkmanager.dev reference) | The documented parameter set for EAP-TLS |
| Markdown (CommonMark/GFM) | Suite house standard | The document format |

No packages are installed by this phase — it authors documentation only.

### Package Legitimacy Audit

> **Not applicable.** This phase installs no packages. Deliverable is a Markdown file.

---

## 3. House-Style Extraction from Sibling Guides

### 3.1 Front-Matter Stamp Block

From `06-android.md` lines 1-7 (exact template):

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: linux
---
```

Rules:
- `last_verified` = guide authoring date
- `review_by` = `last_verified` + 90 days (e.g., 2026-06-30 → 2026-09-28)
- `applies_to: both` (applies to Wi-Fi and wired guidance)
- `audience: admin`
- `platform: linux` (single lowercase token — NOT "Linux Ubuntu" — cf. `06-android.md:6` = `android`)

The SC3 MEDIUM-confidence freshness callout inside the body carries its OWN inline `last_verified`/`review_by` stamp (separate from the front-matter, per D-04 and E-03 convention, same as `06-android.md:100`).

### 3.2 Prerequisites Blockquote

From `06-android.md` lines 9-10:

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

Replicate verbatim — same two link targets; same blockquote form.

### 3.3 Scope Banner

From `06-android.md` line 14:

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

Replicate verbatim — same link target `#canonical-scope-callout`. This is the one-line scope banner required by Phase 101 D-06.

### 3.4 Lead Callout Tier (WARNING — Referee-verified)

From `06-android.md` line 79:
```markdown
> **WARNING -- ...**
```

From `05-ios.md` line 75:
```markdown
> **WARNING -- ...**
```

Pattern: `> **WARNING --` (double-hyphen separator, not colon or em-dash). Content follows on the same line or indented continuation lines.

**Vocabulary census (Referee-verified from 106-CONTEXT.md):**
- `NOTE` — informational
- `WARNING` — lead callout tier for platform constraints and availability warnings (every sibling uses this tier for its lead callout)
- `CRITICAL` — auth-break hazard (1× only, `02-:37` cert-ordering)
- `DANGER` — lockout hazard (1× only, `03-:124` enforcement-staging)
- `IMPORTANT` — **NOT in this suite's vocabulary**

The `07-linux.md` lead gap callout is `WARNING` (D-03). The cert-ordering note (if referenced) is already in `02-` and linked, not restated here.

### 3.5 Inline Freshness Stamp Form

From `06-android.md` line 100:

```markdown
*last_verified: 2026-06-30 · review_by: 2026-09-28*
```

This form (italic, centered-dot separator, inline with content) is used for per-section version-gated content stamps. The SC3 MEDIUM-confidence callout body should carry this stamp (D-04/E-03). Authoring date: 2026-06-30; review_by: 2026-09-28.

### 3.6 Config-Matrix Table Shape

From `05-ios.md` lines 66-73 and `06-android.md` lines 67-75 — the three-column per-EAP matrix:

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|

For `07-linux.md`, the reference parameter table is **not** a three-column per-EAP matrix (only EAP-TLS is documented). Instead, adapt to a two-column parameter reference table:

| nmcli Property | EAP-TLS Value / Placeholder |
|---|---|

(See Section 2 above for the concrete rows — this matches D-06's "reference parameter table" requirement without implying three co-equal methods.)

### 3.7 Wired H2 Form

From `06-android.md` line 110:

```markdown
## Wired
```

Bare `## Wired` heading (no subtitle). The Android version then has a gap-stub paragraph; Linux uses a collapsed stub pointing at the same nmcli workaround (`type ethernet`) per D-01.

### 3.8 See-Also / Change-History Footer

From `06-android.md` lines 116-128:

```markdown
## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- ...
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- ...
- [Network Authentication Glossary](../_glossary-network.md) -- ...

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- ... | -- |
```

Replicate this structure. The See-Also items are the same three links; the Change-History has one row for initial authoring.

### 3.9 Anchor Slug Rules (Double-Hyphen Trap)

From `106-CONTEXT.md` and memory:
- Use plain GitHub auto-slugs — NO `{#id}` override syntax
- Double-hyphen trap: `## Wired H2` auto-slugs to `wired-h2` (single hyphen between words); `##Wi-Fi` auto-slugs to `wi-fi` (hyphen in word preserved). Cross-guide links must use the auto-slug, not a hand-crafted one.
- Avoid heading text like `## EAP-TLS -- Wi-Fi` which generates `eap-tls----wi-fi` (four hyphens). Use `## EAP-TLS Wi-Fi` (auto-slug `eap-tls-wi-fi`) or `## Wi-Fi (EAP-TLS)` (auto-slug `wi-fi-eap-tls`).

---

## 4. Proposed Section Outline for `07-linux.md`

```
---
[front-matter stamp block]
---

> **Prerequisites:** ...

# Linux 802.1X Admin Setup: EAP-TLS via nmcli

> **Scope:** ...

---

> **WARNING -- Linux: Intune provides no native 802.1X profiles; this is an OS-level workaround**
>
> [3-4 sentences: no Wi-Fi profile, no wired profile, no cert delivery via Intune;
>  the approach documented is a shell-script / nmcli workaround, not an Intune profile;
>  certificate delivery is out-of-band (see cert-prerequisites note below);
>  this callout satisfies SC1]

---

## EAP Method Scope Note

All three EAP methods remain co-equal for 802.1X network authentication (see [EAP Method Overview](01-eap-method-overview.md)); this guide documents EAP-TLS only because it is the sole method with verifiable nmcli/vendor documentation for Intune-managed Linux fleets -- a source-confidence scope boundary, not a method preference.

- **PEAP-MSCHAPv2:** Technically possible via nmcli but not documented in verifiable Microsoft/vendor sources for Intune-managed Linux fleets; out of scope for this guide.
- **EAP-TTLS:** Similarly undocumented for this configuration context; out of scope for this guide.

[satisfies D-09 (one sentence each) and D-10 (co-equal framing)]

---

## Applies To

This guide applies to Ubuntu 24.04 LTS and 26.04 LTS managed by Microsoft Intune.
nmcli/NetworkManager 802-1x.* properties are distro-agnostic; the examples use Ubuntu LTS.
Per-version Intune agent capability differences (e.g., broker version, compliance features)
may affect agent behavior; always test on a representative device before fleet rollout.

[satisfies updated D-05 — names 24.04 + 26.04; notes version delta without exaggerating it]

---

## Certificate Prerequisites (Out-of-Band)

> **Note:** Intune delivers no certificate profiles to Linux devices. Before running the
> nmcli commands below, the following files must be present on the device, placed there
> by a separate out-of-band process (e.g., Intune Bash script, MDT, SCCM, manual copy):
>
> - `/etc/certs/ca-root.pem` — RADIUS server root CA certificate (for server validation)
> - `/etc/certs/client-cert.pem` — Device/user client certificate (for client authentication)
> - `/etc/certs/private-key.pem` — Private key for the client certificate
>
> Adjust file paths to match your deployment. Never embed private-key material in documentation.
> For cert delivery concepts, see [Certificate Delivery Foundation](02-cert-delivery-foundation.md).

[satisfies D-07 — standalone prominence; file paths not inline key material]

---

## EAP-TLS via nmcli -- Wi-Fi

> **Note:** The nmcli commands below are illustrative. Parameters (SSID, file paths,
> identity) are placeholders. Validate on a test device before fleet deployment.

[satisfies D-08 — "validate before fleet deployment" disclaimer at workaround lead-in]

### Configuration Steps

**Step 1 -- Create the EAP-TLS Wi-Fi connection:**

```bash
nmcli connection add \
  type wifi \
  con-name "Corp-WiFi-EAP-TLS" \
  ssid "YourCorporateSSID" \
  wifi-sec.key-mgmt wpa-eap \
  802-1x.eap tls \
  802-1x.identity "device-user@domain.com" \
  802-1x.ca-cert /etc/certs/ca-root.pem \
  802-1x.client-cert /etc/certs/client-cert.pem \
  802-1x.private-key /etc/certs/private-key.pem \
  802-1x.private-key-password-flags 4
```

Adjust `private-key-password-flags` if the key is encrypted:
- `4` — key is unencrypted; no passphrase required
- `0` — system-managed; NetworkManager stores the passphrase (also add `802-1x.private-key-password "passphrase"`)

**Step 2 -- Bring up the connection:**

```bash
nmcli connection up "Corp-WiFi-EAP-TLS"
```

### nmcli 802-1x.* Reference Parameter Table (EAP-TLS)

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

Source: NetworkManager Reference Manual — settings-802-1x (networkmanager.dev). Property values are illustrative placeholders; validate for your environment.

### Verification

After connecting, confirm the connection succeeded with the locked verification trio:

```bash
# Show connection status
nmcli connection show "Corp-WiFi-EAP-TLS"

# Show IP address assignment (confirms RADIUS granted access)
ip addr show

# Check NetworkManager logs for EAP negotiation details
journalctl -u NetworkManager
```

[satisfies SC2 verification trio]

---

## Wired

The same EAP-TLS workaround via nmcli applies to wired (Ethernet) 802.1X. Change
`connection.type` from `wifi` to `ethernet` and specify the interface name; all
`802-1x.*` parameters are identical. Remove the `wifi-sec.key-mgmt` and
`802-11-wireless.ssid` properties (not applicable to wired).

```bash
nmcli connection add \
  type ethernet \
  con-name "Corp-Wired-EAP-TLS" \
  ifname eth0 \
  802-1x.eap tls \
  802-1x.identity "device-user@domain.com" \
  802-1x.ca-cert /etc/certs/ca-root.pem \
  802-1x.client-cert /etc/certs/client-cert.pem \
  802-1x.private-key /etc/certs/private-key.pem \
  802-1x.private-key-password-flags 4
```

As with Wi-Fi: Intune provides no native wired-network profile for Linux. This is an
OS-level nmcli workaround. Certificates must be pre-placed out-of-band.
Verify wired connectivity with the same trio: `nmcli connection show`, `ip addr show`,
`journalctl -u NetworkManager`.

[satisfies D-01/D-02: H2 present, collapsed to same nmcli path; NOT "consult network team"]

---

> **Note -- Linux Intune surface is actively developing**
>
> Intune's Linux management capabilities continue to evolve. As of this guide's
> `last_verified` date, Intune delivers no native Wi-Fi, wired, or certificate profiles
> for Linux; this workaround is the documented approach. Verify the current feature set
> at [Deployment guide for Linux device management](https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux)
> before each major fleet deployment.
>
> *last_verified: 2026-06-30 · review_by: 2026-09-28*

[satisfies D-04 SC3 MEDIUM-confidence "surface actively developing" callout with 90-day stamp]

---

## See Also

- [EAP Method Overview](01-eap-method-overview.md) ...
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) ...
- [Network Authentication Glossary](../_glossary-network.md) ...

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Linux 802.1X EAP-TLS admin setup via nmcli; platform gap lead WARNING; EAP method scope note (PEAP/TTLS out of scope); Ubuntu 24.04/26.04 LTS; out-of-band cert prerequisites; nmcli Wi-Fi + wired EAP-TLS steps; reference parameter table; verification trio; MEDIUM-confidence freshness callout | -- |
```

**Section order rationale:**
- Gap WARNING **leads** (SC1, D-03) — opened before any config content
- EAP scope note immediately after gap (D-09/D-10) — before any EAP-specific steps
- Applies-to note before config steps (D-05) — operator context
- Cert prerequisites before the nmcli commands (D-07) — operator must prep certs first
- "Validate before fleet" disclaimer at workaround lead-in (D-08)
- nmcli steps + parameter table + verification (SC2, D-06)
- `## Wired` H2 (D-01, cross-guide parallel)
- SC3 MEDIUM-confidence freshness callout after the workaround content (D-04) — "surface actively developing" governs future changes, not the current workaround steps
- See-Also + Change-History (footer convention)

---

## 5. The Exact 00-overview.md Item-7 Edit

**File:** `docs/admin-setup-8021x/00-overview.md`

**Current line 36:**

```markdown
7. Platform guide (Phase 106) -- entry added when guide is authored.
```

**Replace with:**

```markdown
7. **[Linux 802.1X Admin Setup (EAP-TLS via nmcli)](07-linux.md)** -- No native Intune Wi-Fi, wired, or cert-delivery profiles for Linux; guide documents EAP-TLS via nmcli (NetworkManager `802-1x.*`) as an OS-level workaround, with out-of-band certificate prerequisites. Ubuntu 24.04 LTS and 26.04 LTS. PEAP-MSCHAPv2 and EAP-TTLS out of scope (not in verifiable Microsoft/vendor sources for Intune-managed Linux fleets).
```

**Also add a row to the Change-History table** (after the existing 2026-06-30 row for Android):

```markdown
| 2026-06-30 | Added item 7 -- Linux platform-guide entry linking 07-linux.md; placeholder removed | -- |
```

Note: The `> **Wired 802.1X availability note:**` callout at line 38 already pre-frames Linux correctly ("Linux has no native Intune Wi-Fi or wired profile -- script-based EAP-TLS only via nmcli; see the Linux guide for details"). This pre-existing text is correct and complete; do NOT modify it. The item-7 link will now connect that description to the actual guide.

---

## Architecture Patterns

### Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| 802.1X Wi-Fi config | OS layer (nmcli/NM) | — | Intune has no Wi-Fi profile for Linux; nmcli is the only delivery mechanism |
| 802.1X Wired config | OS layer (nmcli/NM) | — | Same gap as Wi-Fi; same nmcli mechanism, `type ethernet` |
| Certificate delivery | Out-of-band (Bash script / manual) | — | Intune delivers no cert profiles for Linux; certs must be pre-placed |
| Guide delivery | `docs/admin-setup-8021x/07-linux.md` | `00-overview.md` item-7 edit | One new file, one local edit |

### Recommended File Structure

```
docs/admin-setup-8021x/
├── 00-overview.md          # EDITED: item 7 filled + Change-History row
├── 01-eap-method-overview.md  # LINK TARGET only (no changes)
├── 02-cert-delivery-foundation.md  # LINK TARGET only (no changes)
├── 03-windows.md           # No changes
├── 04-macos.md             # No changes
├── 05-ios.md               # No changes
├── 06-android.md           # No changes (structural template)
└── 07-linux.md             # NEW FILE (this phase's sole deliverable)
```

---

## Common Pitfalls

### Pitfall 1: Callout Tier Inflation
**What goes wrong:** Using `CRITICAL` or `IMPORTANT` for the lead gap callout.
**Prevention:** `WARNING` is the correct tier (Referee-verified). `CRITICAL` (cert ordering) and `DANGER` (enforcement lockout) are the only two hazard-tier callouts in the suite; both are already homed in other files. `IMPORTANT` does not appear in the suite vocabulary.

### Pitfall 2: Cloning Android's Wired Stub
**What goes wrong:** Copying Android's "consult your network team" wired stub for Linux.
**Prevention:** D-02 explicitly prohibits this. Linux's wired alternative is "same nmcli, `type ethernet`" (SUMMARY :178). The `## Wired` section shows the concrete command, not a deferral.

### Pitfall 3: Inline Private-Key Material
**What goes wrong:** Including a real or example private key in the `802-1x.private-key-password` inline in docs.
**Prevention:** D-07 — nmcli commands use file-path placeholders only. No key material in docs. Project CLAUDE.md: "Never commit credentials."

### Pitfall 4: Framing EAP-TLS as "Preferred" on Linux
**What goes wrong:** Saying "EAP-TLS is recommended for Linux" — violates co-equal constraint.
**Prevention:** D-10 — frame as "documented here due to source confidence, not preference." Link to `01-eap-method-overview.md` for the co-equal overview.

### Pitfall 5: Wrong Ubuntu Versions
**What goes wrong:** Naming Ubuntu 22.04 + 24.04 (as in D-05 original) instead of 24.04 + 26.04.
**Prevention:** Live verification confirms 22.04 support ends August 2026 and is not listed as a current supported enrollment target. Name 24.04 + 26.04.

### Pitfall 6: Merging SC1 + SC3 Callouts
**What goes wrong:** Combining the HIGH-confidence gap fact with the MEDIUM-confidence "actively developing" caveat into one callout.
**Prevention:** D-04 — two separate callouts, placed at different points in the guide (gap WARNING leads; SC3 follows the workaround content).

### Pitfall 7: Documenting PEAP/TTLS nmcli Steps
**What goes wrong:** Adding nmcli config steps for PEAP or EAP-TTLS because they are "technically possible."
**Prevention:** D-09 — one sentence each, no steps. These methods are out of scope for this guide.

### Pitfall 8: Adding `wifi-sec.key-mgmt` to the Wired Command
**What goes wrong:** Copying the Wi-Fi command verbatim for the wired section, including `wifi-sec.key-mgmt wpa-eap`.
**Prevention:** Wired connections do not use `802-11-wireless-security` settings. Remove that property for `type ethernet`. The 802-1x.* properties attach directly to the ethernet connection type.

---

## Validation Architecture

> Skipping standard nyquist_validation section — this project has no automated test framework for documentation content. Verification is content-based (string checks, callout tiers, anchor slugs, link targets), performed by the harness at Phase 112.

---

## Security Domain

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V5 Input Validation | No | N/A (documentation phase) |
| V6 Cryptography | Informational only | Guide must NOT show inline private-key material (D-07); placeholder paths only |
| V2 Authentication | N/A | — |

**Security note specific to this guide:** The locked constraint from D-07 and the project CLAUDE.md ("Never commit credentials") forbids any real or plausible-looking private key material in the guide text. All examples use `/path/to/file.pem` placeholder forms.

---

## Environment Availability

> SKIPPED — this phase has no external dependencies. Deliverable is two Markdown file edits (one new file, one edit to an existing file). No CLI tools, services, or runtimes are required during authoring.

---

## State of the Art

| Old Assumption | Current State | Impact |
|---|---|---|
| Ubuntu 22.04 + 24.04 are the current LTS targets (PITFALLS :504) | Ubuntu 24.04 + 26.04 are the current enrollment targets; 22.04 support ends August 2026 | Update D-05 version names in the guide's applies-to note |
| Intune Linux surface may add native profiles "soon" | As of 2026-06-22 (MS Learn updated), NO Wi-Fi/wired/cert profiles for Linux; compliance+scripts+CA only | Gap scope unchanged; SC3 freshness callout remains warranted |

**Deprecated:**
- The "22.04 vs 24.04" Intune agent capability delta (PITFALLS :504) — now 24.04 vs 26.04. The nmcli mechanics are unchanged.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | nmcli command form (`nmcli connection add type wifi ... wifi-sec.key-mgmt wpa-eap`) is syntactically correct for Ubuntu 24.04+ | Section 2 (command steps) | Commands may need `802-11-wireless-security.key-mgmt` instead of abbreviated `wifi-sec.key-mgmt`; both should work per NM docs but executor should test on a target device |
| A2 | Wired 802.1X via nmcli requires NO `802-11-wireless-security.key-mgmt` equivalent — the 802-1x.* section attaches directly to ethernet type | Section 2 (wired note) | If NM requires an explicit `key-mgmt` for wired 802.1X on some Ubuntu versions, the guide command would fail silently; mitigated by "validate before fleet" disclaimer |
| A3 | `private-key-password-flags 4` is the correct value for an unencrypted private key in nmcli | Section 2 (param table) | Official NM docs confirm `not-required = 0x4`; LOW risk |

**If this table is empty for a claim:** All properties confirmed from official NetworkManager API docs (HIGH) or MS Learn (HIGH). Only command syntax is ASSUMED at MEDIUM; the "validate before fleet" disclaimer (D-08) mitigates this.

---

## Open Questions

1. **Whether to show `file://` prefix on cert paths**
   - What we know: NM docs say cert properties "support blob and path schemes with file:// prefix." On modern NM (Ubuntu 24.04+, NM 1.44+), bare paths work. Older docs reference `file://` explicitly.
   - What's unclear: Whether Ubuntu 24.04 + 26.04 require `file://` prefix or accept bare path strings for `802-1x.ca-cert`, `802-1x.client-cert`, `802-1x.private-key`.
   - Recommendation: Use bare paths in the guide (simpler, works on NM 1.44+) and add a parenthetical: "Older NetworkManager versions may require `file://` prefix for certificate paths (e.g., `file:///etc/certs/ca-root.pem`)."

2. **Whether to name `ifname` in the wired example**
   - What we know: `nmcli connection add type ethernet con-name "..." ifname eth0` specifies the interface. On Ubuntu, wired interfaces may be named `eth0`, `enp3s0`, `ens33`, etc.
   - Recommendation: Use `ifname <interface-name>` as a placeholder with a note to substitute the actual interface (discoverable via `ip link show`).

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: learn.microsoft.com/en-us/intune/device-configuration/templates/configure-wifi] — Wi-Fi profile platforms (Linux absent); last updated 2026-06-22
- [VERIFIED: learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux] — Linux Intune capabilities + Ubuntu 24.04/26.04 enrollment support; last updated 2026-06-22
- [VERIFIED: learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms] — Supported OS list, Linux = Ubuntu 24.04 + 26.04; last updated 2026-04-16
- [VERIFIED: networkmanager.dev/docs/api/1.52.0/settings-802-1x.html] — 802-1x connection properties (official NM 1.52.0 reference)
- [VERIFIED: networkmanager.dev/docs/api/latest/nm-settings-nmcli.html] — nmcli property reference (official)

### Secondary (MEDIUM confidence)
- [ASSUMED] major.io/p/802-1x-networkmanager-using-nmcli/ — PEAP nmcli example; cross-confirms nmcli property convention
- [ASSUMED] Red Hat RHEL 9 networking guide (Ch.36 — 802.1X EAP-TLS with cert on filesystem); 403 on direct fetch but search results confirm pattern

### Tertiary (LOW confidence)
- [ASSUMED] keytos.io — nmcli EAP-TLS examples cited in original SUMMARY.md research; not re-fetched; treated as MEDIUM in SUMMARY.md due to non-MS-Learn provenance

---

## Metadata

**Confidence breakdown:**
- Intune Linux gap (no native profiles): HIGH — two MS Learn pages, both updated 2026-06-22
- Ubuntu LTS version (24.04 + 26.04): HIGH — MS Learn supported-platforms page, 2026-04-16
- nmcli 802-1x.* property names: HIGH — official NM API reference
- nmcli command syntax (connection add form): MEDIUM — standard NM CLI convention, not an MS Learn guide
- Wired one-property change: HIGH — NM architecture (802-1x is type-agnostic)
- House-style conventions: HIGH — extracted from sibling guides (06-android.md, 05-ios.md)

**Research date:** 2026-06-30
**Valid until:** 2026-09-28 (90-day review cycle; Linux Intune surface is actively developing)
