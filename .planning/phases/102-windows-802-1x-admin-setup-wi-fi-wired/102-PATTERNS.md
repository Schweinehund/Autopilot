# Phase 102: Windows 802.1X Admin-Setup — Pattern Map

**Mapped:** 2026-06-30
**Files analyzed:** 2 (1 CREATE, 1 EDIT)
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog(s) | Match Quality |
|-------------------|------|-----------|-------------------|---------------|
| `docs/admin-setup-8021x/03-windows.md` | doc — per-platform admin guide | request-response (Intune UI walkthrough) | `docs/admin-setup-8021x/02-cert-delivery-foundation.md` (front-matter, callout, matrix, Change History, scope-banner, link-not-copy); `docs/admin-setup-macos/03-configuration-profiles.md` (`#### In Intune admin center` subsection structure) | exact (same folder + same conventions) |
| `docs/admin-setup-8021x/00-overview.md` | doc — folder entry point (edit) | — | `docs/admin-setup-8021x/00-overview.md` itself (read the live text; add item 3 matching the existing numbered-list link style) | exact |

---

## Pattern Assignments

### `docs/admin-setup-8021x/03-windows.md` (CREATE)

**Primary analog:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md`
**Secondary analog:** `docs/admin-setup-macos/03-configuration-profiles.md`

---

#### YAML front-matter block

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 1–7

```yaml
---
last_verified: 2026-06-29
review_by: 2026-09-27
applies_to: both
audience: admin
platform: all
---
```

Copy this shape verbatim; change only the values:

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: windows
---
```

Rule: `review_by` = `last_verified` + 90 days. `platform: windows` (not `all`). `applies_to: both` (Wi-Fi + wired both in scope).

---

#### Prerequisites blockquote (top-of-file banner)

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 9–11

```markdown
> **Prerequisites:** Read [EAP Method Overview](01-eap-method-overview.md) first.
> For certificate term definitions, see [Network Authentication Glossary](../_glossary-network.md#scep).
```

For `03-windows.md`, mirror this pattern but link to both foundation files:

```markdown
> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.
```

---

#### Scope banner (one-line, immediately after prerequisites blockquote)

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 29–33 (the template the file itself publishes for per-platform guides)

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

Copy verbatim — this is the exact template text from `02-`. Do not modify or expand it.

---

#### `> **Label:**` blockquote callout convention

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 36–46 (CRITICAL callout), lines 137–140 (Boundary callout)

CRITICAL-severity example (lines 36–46):

```markdown
> **CRITICAL — Deployment ordering:** Always assign profiles in this sequence and confirm
> each reaches "Succeeded" across target devices before assigning the next:
>
> 1. **Trusted Root Certificate profile** (RADIUS server CA) → wait for "Succeeded"
> 2. **SCEP or PKCS client certificate profile** → wait for "Succeeded" + cert enrolled
> 3. **802.1X Wi-Fi or Wired network profile**
>
> Violating this order produces silent Intune "Succeeded" status while devices fail to
> authenticate. Intune does not enforce dependency ordering between profiles.
```

Boundary/NOTE-severity example (lines 137–140):

```markdown
> **Boundary:** This matrix shows which cert delivery methods Intune supports per platform at
> the foundation level. Per-platform guides (Phases 102--106) document the exact Intune UI
> fields, settings, and profile configuration steps for each platform. Do not duplicate that
> per-platform UI detail here -- link to the appropriate guide instead.
```

**Source:** `docs/admin-setup-macos/03-configuration-profiles.md` lines 37–40 (WARNING-style "What breaks" callout)

```markdown
> **What breaks if misconfigured:** If SSID does not match the network name exactly (including case), the device cannot find or connect to the network. Symptom appears in: device (Wi-Fi settings show no matching network).
> See: [Profile Not Applied](../l1-runbooks/12-macos-profile-not-applied.md)
```

Apply to `03-windows.md` using these severity labels (per RESEARCH.md Architecture Patterns — Callout Block Conventions):

```markdown
> **DANGER — 802.1X Enforcement Staging**
>
> [content]

> **WARNING — dot3svc service dependency:**
>
> [content]

> **NOTE — Hybrid Entra Joined: Strong Certificate Mapping Required**
>
> [content]
>
> *last_verified: 2026-06-30 · review_by: 2026-12-27*
```

The inline freshness stamp `*last_verified: … · review_by: …*` applies only to the KB5014754 callout (the 180-day two-tier stamp per D-06). No other callout carries its own stamp.

---

#### `#### In Intune admin center` compact subsection header

**Source:** `docs/admin-setup-macos/03-configuration-profiles.md` lines 29–32 (Wi-Fi section), lines 52–55 (VPN section), lines 67–70 (Email section)

Pattern: a `####` heading immediately followed by a bold navigation path:

```markdown
#### In Intune admin center

Navigation: **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Settings catalog** > **Networking** > **Wi-Fi**

Key settings:
```

For `03-windows.md`, apply this header inside both the Wi-Fi and Wired subsections (per A3 structure). Bold each menu level; use ` > ` as separator:

```markdown
#### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wi-Fi**
```

```markdown
#### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wired network**
```

---

#### Matrix / table format (per-EAP-method config matrix)

**Source:** `docs/admin-setup-8021x/01-eap-method-overview.md` lines 143–152 (EAP Method Comparison table)

```markdown
| Property | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| Client cert required | Yes | No | No |
| Server cert required | Yes | Yes | Yes |
| Inner credential | None (cert-only) | Domain username/password (MSCHAPv2) | PAP / MS-CHAP / MS-CHAPv2 |
| Identity privacy | Outer identity config | Outer identity config | Outer identity config |
| Intune support | Win / macOS / iOS / Android / Linux* | Win / macOS / iOS / Android | Win / macOS / iOS / Android |
| Wired support | Win / macOS / iOS | Win / macOS / iOS | Win / macOS / iOS |
```

Rules: EAP methods are columns; properties (settings) are rows. Three EAP-method columns enforces co-equal presentation. The `|---|---|---|---|` separator row uses `---` without padding (corpus style is minimal). Apply this exact column-order and row-as-setting orientation to the Wi-Fi config matrix and Wired config matrix in `03-windows.md`.

**Secondary source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 121–129 (Per-Platform Cert-Delivery Support Matrix) — shows the same `|---|---|---` minimal separator style and bold platform names in the leftmost column.

---

#### Link-not-copy cross-reference style

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 117–119

```markdown
This matrix is the single canonical home for cert-delivery support across platforms (decision B3). Per-platform guides (Phases 102--106) link back here rather than reproducing this table.
```

**Source:** `docs/admin-setup-8021x/01-eap-method-overview.md` lines 156–157

```markdown
For certificate delivery requirements -- trusted root profiles, SCEP/PKCS client certificate profiles, the deployment ordering rule, and the per-platform cert-delivery support matrix -- see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md).
```

Apply the same style in `03-windows.md` for every shared concept: state what the target covers, then link. Do not restate the concept body. Use `--` (double-dash) as the em-dash style (corpus is `--`, not `—`).

---

#### Change History table footer

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 143–148

```markdown
---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Initial version -- cert-delivery foundation: ordering rule, scope callout, EKU, server-name validation, per-platform cert matrix | -- |
```

Copy this footer structure exactly. For `03-windows.md` initial version entry:

```markdown
---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Windows 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS; dot3svc Remediation pattern; enforcement-staging DANGER callout; KB5014754 strong-mapping callout | -- |
```

---

#### Anchor slug convention

Corpus uses **plain GitHub auto-slugs** — the heading text is lowercased and spaces replaced with hyphens. No `{#id}` overrides.

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` links from `00-overview.md` line 34:
```markdown
See [full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```
The heading at line 14 of `02-` is `## Canonical Scope Callout` → slug is `#canonical-scope-callout`.

**Double-hyphen trap** (MEMORY.md): Headings containing ` / ` (slash with spaces) produce `--` in the auto-slug (space-slash-space → `-`+`-`). Avoid heading text with ` / ` when the slug will be used as a link target. Use ` and ` or ` + ` instead (e.g., `## Wi-Fi and Wired` not `## Wi-Fi / Wired`).

---

### `docs/admin-setup-8021x/00-overview.md` (EDIT — add item 3)

**Analog:** `docs/admin-setup-8021x/00-overview.md` itself (the live file is the source of truth)

---

#### Exact region to edit

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 24–28

```markdown
1. **[EAP Method Overview](01-eap-method-overview.md)** -- EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS presented co-equally: what authenticates, client requirements, trust requirements, and when to choose each. No method is ranked as a default.

2. **[Certificate Delivery Foundation](02-cert-delivery-foundation.md)** -- Deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), EKU requirements, RADIUS server-name validation, and the per-platform cert-delivery support matrix.

3–7. Platform guides (Phase 102–106) -- entries added as each guide is authored.
```

The `3–7.` line (line 28) is the single target for the edit.

---

#### Descriptive-one-liner link format

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 24–26 (items 1 and 2)

Pattern: `N. **[Title](filename.md)** -- one-sentence description covering the key facts the guide contains.`

- Bold linked title, double-dash (`--`), then a single descriptive sentence (no period at end of list items is fine; items 1–2 do not end with periods).
- The description names the specific content — "what authenticates, client requirements…" — not abstract role labels.

Apply the same pattern for item 3:

```markdown
3. **[Windows 802.1X Admin Setup (Wi-Fi + Wired)](03-windows.md)** -- Wi-Fi and wired profiles for all three EAP methods; dot3svc dependency and Remediation pattern; enforcement staging; KB5014754 strong certificate mapping.

4–7. Platform guides (Phase 103–106) -- entries added as each guide is authored.
```

The `3–7.` line becomes two lines: item 3 (the new Windows entry) followed by a new `4–7.` continuation line. The `3–7` range shrinks to `4–7` because Windows (item 3) is now authored.

---

## Shared Patterns

### Front-matter freshness stamp (file-level, 90-day)

**Source:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md` lines 1–7; `docs/admin-setup-8021x/01-eap-method-overview.md` lines 1–7; `docs/admin-setup-8021x/00-overview.md` lines 1–7

All three foundation files follow the same 6-key YAML block: `last_verified`, `review_by` (last_verified + 90 days), `applies_to`, `audience`, `platform`. Apply to `03-windows.md` with `platform: windows`.

### Inline callout freshness stamp (KB5014754 callout only, 180-day)

**Source:** RESEARCH.md lines 460–472 (D-06 two-tier mechanism, template ready)

```markdown
> *last_verified: 2026-06-30 · review_by: 2026-12-27*
```

Placed as the last line inside the KB5014754 NOTE blockquote. No other callout in `03-windows.md` carries an inline stamp. The 180-day value applies only to this callout (drift-risk-appropriate per PITFALLS.md E-03).

### Double-dash (`--`) em-dash style

**Source:** Throughout `02-cert-delivery-foundation.md` and `00-overview.md`

Use `--` (two hyphens), never an actual em-dash `—`. Applies to all prose in `03-windows.md` and the `00-overview.md` edit.

### Numbered list — no trailing period on descriptive entries

**Source:** `docs/admin-setup-8021x/00-overview.md` lines 24–26

Items 1 and 2 in the overview list end their description sentences without a period. Item 3 should follow the same convention (description ends without a terminal period).

---

## No Analog Found

None — both files have strong analogs in the corpus. The `03-windows.md` CREATE uses two overlapping analogs (same-folder front-matter/callout/matrix conventions from `02-`; connection-section + `#### In Intune admin center` structure from `docs/admin-setup-macos/03-configuration-profiles.md`). The `00-overview.md` EDIT is its own analog.

---

## Metadata

**Analog search scope:** `docs/admin-setup-8021x/` (all three Phase-101 files read in full); `docs/admin-setup-macos/03-configuration-profiles.md` (full read)
**Files scanned:** 4 analog files read; 2 planning files read (CONTEXT.md, RESEARCH.md)
**Pattern extraction date:** 2026-06-30

---

## PATTERN MAPPING COMPLETE
