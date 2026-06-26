# Phase 91: Glossary + Capability Matrix - Pattern Map

**Mapped:** 2026-06-24
**Files analyzed:** 6 new/modified elements
**Analogs found:** 6 / 6

---

## File Classification

| New/Modified Element | Role | Data Flow | Closest Analog | Match Quality |
|----------------------|------|-----------|----------------|---------------|
| `docs/_glossary-macos.md` — 9 new `###` entries + index | documentation / glossary entry | transform (add terms) | Existing `## Device Management` entries: `### ABM`, `### ABM Token`, `### APNs` | exact |
| `docs/_glossary.md` — reciprocal see-also on `### Tenant migration` | documentation / cross-reference | transform (append blockquote) | `_glossary.md` Phase-59 entries with `> See also:` blockquotes (e.g., `### OOBE`, `### ESP`) | exact |
| `docs/reference/macos-capability-matrix.md` — one new `## Enrollment` table row | documentation / matrix row | transform (append row) | Existing `## Enrollment` table rows (lines 16–27) | exact |
| `docs/reference/4-platform-capability-comparison.md` — one new `## Enrollment` table row | documentation / matrix row | transform (append row) | Existing `## Enrollment` table rows (lines 22–32) | exact |
| `scripts/validation/check-phase-63.mjs` — V-63-08 + V-63-09 `const BASELINE` edits | validator / blob-hash guard | transform (replace hash string) | Lines 209 and 230 of same file | exact (self-analog) |
| `.planning/phases/91-glossary-capability-matrix/91-ANCHOR-INVENTORY.md` — new artifact | planning artifact | transform (create) | `.planning/milestones/v1.10-phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` | exact |

---

## Pattern Assignments

### `docs/_glossary-macos.md` — New `###` Term Entries

**Analog:** `docs/_glossary-macos.md`, `## Device Management` section — specifically `### ABM Token` (lines 70–75) and `### APNs` (lines 76–81) as the cleanest examples of the negative-callout form (D-02); `### Account-Driven User Enrollment` (lines 22–28) for the positive-callout with See-also form.

**Entry anatomy pattern — negative Windows-equivalent callout** (lines 70–75 verbatim):
```markdown
### ABM Token

The server token (.p7m file) downloaded from Apple Business Manager that enables communication between Intune and ABM for device sync and enrollment profile deployment. Also called "enrollment program token" or "ADE token" in Microsoft documentation. Must be renewed annually -- a lapsed token silently stops new device syncing.

> **Windows equivalent:** No equivalent. Windows Autopilot uses Graph API and direct Intune integration without a separate token file. The annual renewal lifecycle of the ABM token is a macOS-unique operational concern.
```

**Entry anatomy pattern — negative callout WITH See-also inside blockquote** (lines 62–68 verbatim):
```markdown
### ABM

Apple Business Manager -- Apple's web portal for managing device enrollment, app distribution (Apps and Books), and Managed Apple IDs for organizations. ABM is the single Apple-side portal for all device management administration. Accessed at [business.apple.com](https://business.apple.com).

> **Windows equivalent:** No direct single equivalent. Device enrollment is managed in the [Intune admin center](https://intune.microsoft.com) under Devices > Windows > Enrollment. ABM is Apple-side while Intune is Microsoft-side; macOS admins work across both portals.
> See also: [ABM (Apple Business Manager)](_glossary-linux.md#abm-apple-business-manager) (Linux).
> See also: [Apple Business](_glossary-apple-business.md#apple-business) (renamed 2026-04-14; ABM Token → content token rebrand mapping).
```

**Entry anatomy pattern — positive Windows-equivalent callout WITH See-also** (lines 22–28 verbatim):
```markdown
### Account-Driven User Enrollment

Apple's privacy-preserving BYOD enrollment method for iOS/iPadOS (iOS 15+) and macOS (Sonoma+). The user starts enrollment from Settings > General > VPN & Device Management on their personal device by signing in with their Managed Apple ID; the OS coordinates with the organization's MDM via the well-known `https://[domain]/.well-known/com.apple.remotemanagement` discovery endpoint. Only the organization's "work" apps and data are managed; the user's personal content (photos, iCloud, personal apps) remains invisible to IT. Supersedes the deprecated profile-based User Enrollment (deprecated iOS 18).

> **Windows equivalent:** No direct equivalent. The closest parallel is [Intune MAM-WE](#mam-we) on Windows MAM-enrolled devices, but Account-Driven User Enrollment is a device-level BYOD enrollment path whereas Windows MAM-WE is app-layer only. Microsoft's "Work profile on personally-owned devices" concept applies to Android but has no iOS-Autopilot equivalent.
> See also: [BYOD](_glossary-android.md#byod) (Android); [User Enrollment](_glossary-android.md#user-enrollment) (Android).
```

**Rules derived from analogs:**
- Heading: `### Term Name` (title case; the one exception is `### app-sso` which is all-lowercase matching the CLI command)
- Body: 2–4 sentences. Definition + scope + key behavior + cross-link.
- Blockquote label: `> **Windows equivalent:**` (PRESERVED VERBATIM per D-15 anti-rename rule — never change to "Windows analog", "Equivalent", etc.)
- See-also lines go INSIDE the blockquote, appended after the Windows-equivalent sentence.
- Blank line separates body from blockquote block.
- No blank lines BETWEEN lines within the same blockquote block.

**Migration-term negative callout template** (per D-02 — apply to `MDM Migration`, `Assign Device Management`, `Deadline`, `Kandji-Iru`, `Delete Device Record`, `Activation Lock Bypass`):
```markdown
> **Windows equivalent:** No direct equivalent — Windows tenant-to-tenant migration requires deregistration from the source tenant, hardware-hash re-import to the target tenant, and a full device reset (NOT Autopilot Reset). In-place re-enrollment without a wipe is not available on Windows. See [Tenant migration](_glossary.md#tenant-migration).
```

**Alphabetical Index pattern** (line 17 verbatim — the executor appends to this pipe-separated list):
```markdown
[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | [Enterprise SSO Plug-in](#enterprise-sso-plug-in) | [Jailbreak Detection](#jailbreak-detection) | [Kerberos SSO Extension](#kerberos-sso-extension) | [MAM-WE](#mam-we) | [Platform SSO](#platform-sso) | [Secure Enclave](#secure-enclave) | [Setup Assistant](#setup-assistant) | [Supervision](#supervision) | [VPP](#vpp)
```
Each new term must be inserted in alpha order using the same `[Display Name](#anchor)` pipe-delimited format. New terms (alpha-sorted insertion points): `ACME` before `ADE`; `Activation Lock Bypass` before `ADE`; `app-sso` before `APNs`; `Assign Device Management` before `Await Configuration`; `Deadline` after `ADE`; `Delete Device Record` after `Deadline`; `FileVault Recovery Key` after `Enterprise SSO Plug-in`; `Kandji-Iru` after `Kerberos SSO Extension`; `MDM Migration` after `MAM-WE`; `Profile-Based Enrollment` after `Platform SSO`.

**Heading-to-slug table** (all 9 required — executor MUST verify before commit):
| Heading text | Required slug | Risk |
|---|---|---|
| `### MDM Migration` | `#mdm-migration` | low |
| `### Assign Device Management` | `#assign-device-management` | low |
| `### Deadline` | `#deadline` | low |
| `### Kandji-Iru` | `#kandji-iru` | HIGH — MUST use bare dash, not `Kandji / Iru` |
| `### Delete Device Record` | `#delete-device-record` | low |
| `### FileVault Recovery Key` | `#filevault-recovery-key` | low |
| `### Activation Lock Bypass` | `#activation-lock-bypass` | low |
| `### Profile-Based Enrollment` | `#profile-based-enrollment` | low |
| `### ACME` | `#acme` | low |
| `### app-sso` | `#app-sso` | medium — heading must be `### app-sso` NOT `### app-sso platform -s` |

**H2 placement** (per RESEARCH.md Architecture Patterns — Claude's discretion):
- `## Device Management`: MDM Migration, Assign Device Management, Deadline, Kandji-Iru, Delete Device Record, FileVault Recovery Key, Activation Lock Bypass
- `## Enrollment`: Profile-Based Enrollment, ACME
- `## Authentication`: app-sso

**Version History row to append** (analog: lines 152–162):
```markdown
| 2026-06-24 | Phase 91: added 9 new terms (MDM Migration, Assign Device Management, Deadline, Kandji-Iru, Delete Device Record, FileVault Recovery Key, Activation Lock Bypass, Profile-Based Enrollment, ACME, app-sso) to ## Device Management, ## Enrollment, ## Authentication; updated Alphabetical Index; added reciprocal see-also in _glossary.md#tenant-migration | -- |
```

**Front-matter freshness stamps** (lines 1–7 verbatim):
```yaml
---
last_verified: 2026-06-22
review_by: 2026-09-22
applies_to: both
audience: all
platform: all
---
```
Executor updates `last_verified` to 2026-06-24 and `review_by` to 2026-09-24.

---

### `docs/_glossary.md` — Reciprocal `> See also:` on `### Tenant migration`

**Analog:** Existing see-also lines in `_glossary.md` — the `### OOBE` and `### ESP` entries (lines 30–44) demonstrate the `> See also: [Term](_glossary-macos.md#anchor)` form used for reciprocal cross-links:

```markdown
> **Cross-platform note:** On macOS, the equivalent first-run configuration experience is Setup Assistant, which is customizable via the ADE enrollment profile in Intune. iOS/iPadOS also uses Setup Assistant. Android uses a Setup Wizard with the DPC download flow for enterprise provisioning.
> See also: [Setup Assistant](_glossary-macos.md#setup-assistant) (Apple/macOS+iOS).
```

And the TPM entry (line 113–115) demonstrates a bare `> See also:` with no `> **Windows equivalent:**` label:
```markdown
> See also: [Secure Enclave](_glossary-macos.md#secure-enclave) (analogous Apple hardware root of trust; not bit-for-bit equivalent — Secure Enclave performs no TPM-2.0/DICE attestation).
```

**Current `### Tenant migration` entry** (lines 121–123 verbatim):
```markdown
### Tenant migration

The process of moving Autopilot-registered devices from one Microsoft tenant to another. Requires deregistration from source tenant, hardware hash re-import to target tenant, and device reset (NOT Autopilot Reset). See [Tenant Migration](device-operations/04-tenant-migration.md).
```

**Pattern to apply:** `### Tenant migration` has no existing `> **Windows equivalent:**` blockquote. Add a new `> See also:` blockquote appended directly after the prose (matching the TPM entry's bare `> See also:` form — do NOT invent a `> **Windows equivalent:**` label on a Windows-glossary entry):
```markdown
### Tenant migration

The process of moving Autopilot-registered devices from one Microsoft tenant to another. Requires deregistration from source tenant, hardware hash re-import to target tenant, and device reset (NOT Autopilot Reset). See [Tenant Migration](device-operations/04-tenant-migration.md).

> See also: [MDM Migration](_glossary-macos.md#mdm-migration) (macOS — wipe-free in-place re-enrollment on macOS 26+, distinct from Windows tenant migration which requires a full device reset).
```

**Version History row to append** (analog: `_glossary.md` lines 243–245):
```markdown
| 2026-06-24 | Phase 91: added reciprocal `> See also:` to ### Tenant migration pointing to _glossary-macos.md#mdm-migration | -- |
```

---

### `docs/reference/macos-capability-matrix.md` — New `## Enrollment` Row

**Analog:** Existing `## Enrollment` table rows (lines 13–27 verbatim):
```markdown
## Enrollment

| Feature | Windows | macOS |
|---------|---------|-------|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with user affinity, ADE without user affinity |
| Pre-provisioning (White Glove) | Yes (APv1 only) | No |
| Self-deploying/kiosk enrollment | Yes (APv1) | Partially (ADE without user affinity) |
| Hybrid domain join | Yes (APv1 + Intune Connector) | No |
| Enrollment Status Page equivalent | ESP (device phase + user phase, itemized) | Await Configuration (single lock, generic progress) |
| ESP timeout configuration | Yes (admin-configurable) | No (no enforced timeout) |
| Dynamic enrollment groups | Yes (ZTDId attribute) | Yes (enrollmentProfileName attribute) |
| Re-enrollment fires blocking screen | Yes (every enrollment) | No (first enrollment only) |
```

**Rules derived from analog:**
- Single-line pipe cells — no `<br>` or HTML (zero HTML precedent in this file)
- Feature label is a short noun phrase (not a question, not a full sentence)
- Windows cell: `n/a` (plain, lowercase) — verified correct per D-04
- macOS cell: single clause carrying all coverage facts, ends with a see-also link
- New row is APPENDED as the last data row inside `## Enrollment` (after the `Re-enrollment fires blocking screen` row, before the blank line preceding `## Configuration`)

**New row format** (from RESEARCH.md Architecture Patterns / D-04):
```markdown
| macOS 26 in-place ABM migration | n/a | Supported (profile-based re-enrollment, wipe-free; PSSO re-registration always required post-migration; pre-macOS-26 devices use wipe-and-re-enroll fallback) — see [MDM Migration Walkthrough](../macos-lifecycle/02-mdm-migration-psso.md) |
```

**Version History row to append** (analog: lines 126–131):
```markdown
| 2026-06-24 | Phase 91: add macOS 26 in-place ABM migration row under ## Enrollment; update V-63-08 BASELINE in check-phase-63.mjs atomically | -- |
```

Front-matter: update `last_verified` to 2026-06-24 and `review_by` to 2026-09-24.

---

### `docs/reference/4-platform-capability-comparison.md` — New `## Enrollment` Row

**Analog:** Existing `## Enrollment` table rows (lines 19–32 verbatim):
```markdown
## Enrollment

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| Zero-touch / autopilot enrollment method | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Hardware identity / token model | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
| User affinity / userless enrollment | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Partial — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Pre-provisioning (White Glove / equivalent) | Supported — [matrix](linux-capability-matrix.md#enrollment) (APv1 only — see [APv1 vs APv2](../apv1-vs-apv2.md)) | Not supported — [matrix](macos-capability-matrix.md#enrollment) | Not supported — [matrix](ios-capability-matrix.md#enrollment) | Not supported — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Hybrid Entra Join / domain join | Supported — [matrix](linux-capability-matrix.md#enrollment) (APv1 only — see [APv1 vs APv2](../apv1-vs-apv2.md)) | Not supported — [matrix](macos-capability-matrix.md#enrollment) | Not supported — [matrix](ios-capability-matrix.md#enrollment) | Not supported — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Enrollment Status Page (ESP / equivalent) | Supported — [matrix](linux-capability-matrix.md#enrollment) | Partial — [matrix](macos-capability-matrix.md#enrollment) | Partial — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Re-enrollment behavior (blocking screen) | Supported — [matrix](linux-capability-matrix.md#enrollment) | Not supported — [matrix](macos-capability-matrix.md#enrollment) | Not supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
| BYOD enrollment path | Supported — [matrix](linux-capability-matrix.md#enrollment) | n/a — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Supported — [matrix](android-capability-matrix.md#enrollment) | Partial — [matrix](linux-capability-matrix.md#enrollment) |
| Factory-reset / re-provisioning behavior | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Windows 10 support / minimum OS | Supported — [matrix](linux-capability-matrix.md#enrollment) (APv1 only on Windows 10; APv2 requires Windows 11 22H2+ — see [APv1 vs APv2](../apv1-vs-apv2.md)) | n/a — [matrix](macos-capability-matrix.md#enrollment) | n/a — [matrix](ios-capability-matrix.md#enrollment) | n/a — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
```

**Rules derived from analog:**
- Cell format: `{verdict} — [matrix]({platform}-capability-matrix.md#{section})` — em-dash (`—`), not regular hyphen
- Windows column links to `linux-capability-matrix.md#enrollment` (confirmed: file line 12 states "Windows column links target the Windows column of `linux-capability-matrix.md`")
- `n/a` cells: `n/a — [matrix]({platform}-capability-matrix.md#enrollment)` (lowercase `n/a`, em-dash, then link)
- macOS `Supported` cell: `Supported — [matrix](macos-capability-matrix.md#enrollment)` (links to `#enrollment`, NOT `#migration`)
- New row APPENDED as last data row in `## Enrollment` (after `Windows 10 support / minimum OS` row, before blank line preceding `## Configuration`)

**New row format** (from RESEARCH.md Architecture Patterns / D-05):
```markdown
| macOS 26 in-place ABM migration | n/a — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | n/a — [matrix](ios-capability-matrix.md#enrollment) | n/a — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
```

**Version History row to append** (analog: lines 114–119):
```markdown
| 2026-06-24 | Phase 91: add macOS 26 in-place ABM migration row under ## Enrollment; update V-63-09 BASELINE in check-phase-63.mjs atomically | -- |
```

Front-matter: update `last_verified` to 2026-06-24 and `review_by` to 2026-09-24.

---

### `scripts/validation/check-phase-63.mjs` — V-63-08 and V-63-09 BASELINE Edits

**Analog:** Lines 202–241 of the same file (self-analog — both guard blocks follow identical structure).

**V-63-08 block** (lines 202–221 verbatim — executor replaces the `const BASELINE` value on line 209):
```javascript
  // === V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db ===
  {
    id: 8, name: 'V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db',
    run() {
      if (!existsSync(join(process.cwd(), MACOS_MATRIX))) {
        return { pass: false, detail: MACOS_MATRIX + ' missing' };
      }
      const BASELINE = '73f16378197223378a8507a6751c763902de58db';
      try {
        const result = execFileSync('git', ['hash-object', MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
        const actual = result.toString().trim();
        if (actual !== BASELINE) {
          return { pass: false, detail: 'macos-capability-matrix.md blob hash CHANGED: expected ' + BASELINE + ', got ' + actual + ' (OU-10 D-A3 byte-unchanged invariant violated)' };
        }
        return { pass: true, detail: 'macos-capability-matrix.md blob hash matches baseline ' + BASELINE };
      } catch (err) {
        return { pass: true, skipped: true, detail: 'git hash-object not available -- skipped' };
      }
    }
  },
```

**V-63-09 block** (lines 223–242 verbatim — executor replaces the `const BASELINE` value on line 230):
```javascript
  // === V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob 2314ede7be54efbea1d4a4a787068310869a5896 ===
  {
    id: 9, name: 'V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob 2314ede7be54efbea1d4a4a787068310869a5896',
    run() {
      if (!existsSync(join(process.cwd(), PLATFORM_COMPARISON))) {
        return { pass: false, detail: PLATFORM_COMPARISON + ' missing' };
      }
      const BASELINE = '2314ede7be54efbea1d4a4a787068310869a5896';
      try {
        const result = execFileSync('git', ['hash-object', PLATFORM_COMPARISON], { stdio: 'pipe', cwd: process.cwd() });
        const actual = result.toString().trim();
        if (actual !== BASELINE) {
          return { pass: false, detail: '4-platform-capability-comparison.md blob hash CHANGED: expected ' + BASELINE + ', got ' + actual + ' (OU-10 D-A3 byte-unchanged invariant violated)' };
        }
        return { pass: true, detail: '4-platform-capability-comparison.md blob hash matches baseline ' + BASELINE };
      } catch (err) {
        return { pass: true, skipped: true, detail: 'git hash-object not available -- skipped' };
      }
    }
  },
```

**Edit procedure** (exact two-target pattern per RESEARCH.md Q5):
1. Edit `docs/reference/macos-capability-matrix.md` (add the new Enrollment row)
2. Run `git hash-object docs/reference/macos-capability-matrix.md` — capture the 40-char hex
3. Replace `'73f16378197223378a8507a6751c763902de58db'` on line 209 with the new hash
4. Also update the comment on line 202 and the `name:` string on line 204 to embed the new hash (the `name:` field includes the hash literally — update it too so the test output label stays accurate)
5. Edit `docs/reference/4-platform-capability-comparison.md` (add the new Enrollment row)
6. Run `git hash-object docs/reference/4-platform-capability-comparison.md` — capture the 40-char hex
7. Replace `'2314ede7be54efbea1d4a4a787068310869a5896'` on line 230 with the new hash (same comment/name update on lines 223 and 225)
8. `git add docs/reference/macos-capability-matrix.md docs/reference/4-platform-capability-comparison.md scripts/validation/check-phase-63.mjs`
9. `git commit` — single atomic commit
10. Run `node scripts/validation/check-phase-63.mjs` — V-63-08 and V-63-09 must both show `PASS`

---

### `.planning/phases/91-glossary-capability-matrix/91-ANCHOR-INVENTORY.md` — New Artifact

**Analog:** `.planning/milestones/v1.10-phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` (verbatim structure):

```markdown
# Phase 85 Pre-Edit Anchor Inventory

**Captured:** 2026-06-23 (BEFORE any Phase 85 edits to existing files)
**Files inventoried:** 1 existing file receiving new rows
**Purpose:** Pre-edit anchor-stability surface (SC#1 / PITFALL-6 / DA-4 convention)
**Mirrors format:** .planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md

---

## File 1: docs/reference/macos-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** `45b4865`
**Pre-edit blob hash:** `e91f28c76441577d4e6176756ba04300ceb555e1`
**Receiving:** Kerberos SSO Extension row(s) appended inside the `## Authentication` table (before `## See Also`)

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `13:## Enrollment`
- `29:## Configuration`
- `42:## App Deployment`
- `55:## Compliance`
- `67:## Software Updates`
- `79:## Conditional Access`
- `88:## Key Gaps Summary`
- `100:## Authentication`
- `114:## See Also`
- `122:## Version History`

H3 anchors: (none — H2-only file)

**Permitted edits per Plan 85-01:**
- New data row(s) APPENDED inside the Authentication H2 table
- Zero H2/H3 headings renamed
- Zero existing prose modified
- `check-phase-63.mjs` V-63-08 BASELINE updated to post-edit hash in same commit
```

**Adaptation rules for Phase 91:**
- Replace `Phase 85` → `Phase 91` everywhere
- Replace `Files inventoried: 1` → `Files inventoried: 2` (two files receiving new rows)
- Phase 91 inventories BOTH `macos-capability-matrix.md` AND `4-platform-capability-comparison.md` — two `## File N:` sections required
- Pre-edit git SHA: run `git log -1 --format='%h' -- {file}` on authoring day
- Pre-edit blob hash: run `git hash-object {file}` on authoring day — these are what V-63-08/09 currently match
- Known current hashes (confirmed 2026-06-24, re-verify on execution day): `macos-capability-matrix.md` = `73f16378197223378a8507a6751c763902de58db`; `4-platform-capability-comparison.md` = `2314ede7be54efbea1d4a4a787068310869a5896`
- H2 anchor list for `macos-capability-matrix.md` (current HEAD): `13:## Enrollment`, `28:## Configuration`, `42:## App Deployment`, `56:## Compliance`, `68:## Software Updates`, `79:## Conditional Access`, `88:## Key Gaps Summary`, `100:## Authentication`, `116:## See Also`, `126:## Version History` (H3 anchors: none)
- H2 anchor list for `4-platform-capability-comparison.md` (current HEAD): `## Enrollment`, `## Configuration`, `## App Deployment`, `## Compliance`, `## Software Updates`, `## Conditional Access`, `## Single Sign-On`, `## See Also`, `## Version History` (H3 anchors: none)
- Permitted edits section: one data row APPENDED inside `## Enrollment` table; zero H2/H3 headings renamed; zero existing prose modified; V-63-08 and V-63-09 BASELINE updated to post-edit hashes in same commit

**Commit ordering rule** (from 85-ANCHOR-INVENTORY.md + RESEARCH.md Q4):
- Task 1: create + commit `91-ANCHOR-INVENTORY.md` (BEFORE any matrix edit)
- Task 2: matrix edits + hash bumps (separate commit, or one combined atomic commit for both files together)

---

## Shared Patterns

### Frontmatter Freshness Stamps
**Source:** `docs/_glossary-macos.md` lines 1–7; `docs/reference/macos-capability-matrix.md` lines 1–7
**Apply to:** All documentation files receiving edits
```yaml
---
last_verified: 2026-06-24
review_by: 2026-09-24
applies_to: both
audience: all
platform: all
---
```
Update `last_verified` to execution date and `review_by` to execution date + 90 days.

### Version History Row Convention
**Source:** `docs/_glossary-macos.md` lines 152–162; `docs/reference/macos-capability-matrix.md` lines 126–132
**Apply to:** All documentation files receiving edits
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-24 | Phase 91: [one-line description of change] | -- |
```
Append as the FIRST data row (most-recent-first ordering, matching the existing pattern in all four Version History tables).

### Blockquote `> See also:` Placement (D-15 anti-rename rule)
**Source:** `docs/_glossary-macos.md` lines 27–28 (Account-Driven User Enrollment), lines 67–68 (ABM)
**Apply to:** All new glossary entries with cross-references; `_glossary.md#tenant-migration` reciprocal addition
- If an entry has an existing `> **Windows equivalent:**` blockquote, append `> See also:` lines INSIDE that blockquote (no blank line between them).
- If an entry has no existing blockquote, add a new `> See also:` blockquote after the body prose (blank line between prose and blockquote).
- NEVER rename `> **Windows equivalent:**` to anything else.

### Atomic Commit Rule for Blob-Pinned Files
**Source:** `scripts/validation/check-phase-63.mjs` lines 202–242; RESEARCH.md Q5
**Apply to:** Any edit to `macos-capability-matrix.md` or `4-platform-capability-comparison.md`
- Content file edit + `const BASELINE` update in `check-phase-63.mjs` MUST be in the same `git commit`.
- Never split across two commits (creates a red HEAD at the intermediate commit).
- Verify with `node scripts/validation/check-phase-63.mjs` after the atomic commit.

---

## No Analog Found

All elements have close analogs in the existing codebase. No files in this phase lack a match.

---

## Metadata

**Analog search scope:** `docs/`, `docs/reference/`, `scripts/validation/`, `.planning/milestones/`
**Files scanned:** 6 (primary analogs: `_glossary-macos.md`, `_glossary.md`, `macos-capability-matrix.md`, `4-platform-capability-comparison.md`, `check-phase-63.mjs`, `85-ANCHOR-INVENTORY.md`)
**Pattern extraction date:** 2026-06-24
