# Phase 49: Pattern Mapping
**Generated:** 2026-04-26
**Source of truth:** 49-CONTEXT.md (27 D-rules), 49-RESEARCH.md (11 sections, 1014 lines)
**Closest analogs:** Phase 34 Android foundation docs, check-phase-30.mjs validator, `_glossary-macos.md`

---

## NEW FILES — Commit-1

### `docs/linux-lifecycle/00-enrollment-overview.md`

#### File Role + Data Flow

This is the PITFALL-7 whitelist gate document for Linux. It defines the canonical Linux capability boundary for all downstream phases (50-58). It is READ BY Phase 50 admin guides (which must not duplicate the bridge subsection per DPO-03), Phase 51/52 runbooks (which cite `#supported-management-surface`), and VERIFICATION.md (which quotes the literal whitelist table). It READS nothing at authoring time but cross-references `_glossary-linux.md` and `01-linux-prerequisites.md` via anchor links.

#### Closest Existing Analog

`docs/android-lifecycle/00-enrollment-overview.md` — the Phase 34 foundation doc this mirrors. Key line ranges:

- Lines 1-11: frontmatter + H1 + platform gate blockquote
- Lines 49-53: "For Admins Familiar with iOS" cross-platform bridge subsection
- Line 11: `> **Platform gate:**` blockquote shape (drives D-04 near-top placement)

#### Concrete Code Excerpts

**Analog frontmatter (lines 1-7):**
```yaml
---
last_verified: 2026-04-21
review_by: 2026-06-20
applies_to: all
audience: all
platform: Android
---
```
Adapt to:
```yaml
---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: all
platform: Linux
---
```
`review_by` = `last_verified` + 60 days (Phase 34 D-14). `audience: all` preserved; `applies_to: both` mirrors Android analog.

**Analog platform gate blockquote (line 11):**
```markdown
> **Platform gate:** This guide covers Android Enterprise enrollment modes in Microsoft Intune. For iOS/iPadOS enrollment, see [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md). For macOS ADE, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md). For Windows Autopilot, see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md). For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).
```
Adapt to Linux (substitute platform, paths, glossary link). The blockquote appears IMMEDIATELY under the H1, before any H2.

**Analog bridge subsection (lines 49-53):**
```markdown
## For Admins Familiar with iOS

Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for disambiguation.

"Supervision" is not an Android management term — Android does not use "supervised" or "unsupervised" as device states; see [_glossary-macos.md#supervision](../_glossary-macos.md#supervision) for the iOS definition.
```
Adapt to: `## For Admins Familiar with Windows / macOS / Android` with 2-4 paragraphs, each carrying the "the mapping is partial" framing and deflection to `#supported-management-surface`. Forbidden patterns: "Linux CA is similar to iOS CA" (PITFALL-2 bait); "Linux app delivery works like Win32" (PITFALL-1 framing).

#### Adaptation Notes — Linux-Specific Differences from the Android Analog

1. **H2 hierarchy is DIFFERENT from Android analog.** Android uses a 6-H2 structure (How to Use, Mode Comparison, Two Axes, For Admins Familiar, Mode Details, See Also). Linux uses 4 mandatory H2s per D-03/D-04/D-05:
   - `## Supported Management Surface` — 3-status capability TABLE (D-01, D-02), not a comparison matrix
   - `## Out of Scope for Linux via Intune` — bulleted explicit exclusions (D-03, peer H2 to whitelist)
   - `## Enrollment Constraints` — contains H3 `### BYOD vs Corporate-Owned Caveat` with `> ⚠️ Known caveat` blockquote (D-04)
   - `## For Admins Familiar with Windows / macOS / Android` — cross-platform bridge (D-05)
   - `## See Also`

2. **Whitelist table uses 3-status CLOSED STRING SET (D-01, D-02).** Android used a mode comparison with multi-column free text; Linux uses exactly 2 columns (`Capability | Linux Status`) with cells restricted to `Supported` / `Partial` / `Not supported`. CA row MUST read `Not supported — web-app CA only` (PITFALL-2 line 48 mandate). The validator (V-49-07) enforces this string set.

3. **BYOD caveat is H3 INSIDE `## Enrollment Constraints`** — NOT a blockquote inside the whitelist H2 (D-04 explicitly rejected 1B.1). Android analog has no equivalent caveat H3.

4. **Bridge subsection scope is 3 platform-analog paragraphs** (Windows, macOS, Android) vs Android analog's single iOS paragraph. Each paragraph requires the required pattern template from D-06:
   > "[Concept] on Linux behaves like [closest platform analog] in [narrow respect], but [specific divergence]; see [Supported Management Surface](#supported-management-surface) for the canonical Linux scope."

5. **No Mermaid diagram required** (CD-02 — optional at Claude's discretion; Linux has fewer axes than Android's ownership × management-scope grid).

6. **Word count target is lower:** 600-1000 words (CD-03) vs Android analog's ~1100 words.

#### Anti-Patterns to Avoid

- **PITFALL-1:** Do not write "Linux supports compliance similarly to Windows" or any parity claim — use the explicit partial-mapping template from D-06.
- **PITFALL-2:** Do not write "Linux CA is similar to iOS CA" or leave the CA capability cell blank or as bare "Partial" — the CA row must read `Not supported — web-app CA only`.
- **PITFALL-7 (Anti-Pattern 2):** Do not include stub H2s for capabilities that don't exist on Linux. The Out-of-Scope callout replaces stub sections.
- **DPO-03 guard:** Do not write deep feature explanations here — the Phase 50 `admin-setup-linux/00-overview.md` owns those and must NOT duplicate this bridge subsection.
- **Android analog anti-pattern:** Do not model after Android's "Enrollment Mode Comparison" table — Linux has only one enrollment mode (user-initiated via `intune-portal`); the table is a capability whitelist, not a mode comparison.

---

### `docs/linux-lifecycle/01-linux-prerequisites.md`

#### File Role + Data Flow

The canonical Ubuntu version × kernel-track × support-status matrix. READ BY Phase 50 `02-enrollment-profile.md` (LIN-06 end-user enrollment), Phase 52 L2 runbook 25 (kernel-version verification), and Phase 50 LIN-05 callout which back-links to the `#non-version-breakpoints` anchor (DPO-01). READS `_glossary-linux.md` (for term anchor cross-references). Downstream phases must cite THIS file for version gating — not inline version numbers (drift surface per PITFALL-4).

#### Closest Existing Analog

PRIMARY shape: `docs/android-lifecycle/03-android-version-matrix.md` — matrix orientation, Non-version Breakpoints H2/H3, breakpoint narrative pattern.
SECONDARY shape: `docs/android-lifecycle/01-android-prerequisites.md` — frontmatter, platform gate blockquote, H2 structure, concept-only orientation framing.

Key line ranges from the primary analog (`03-android-version-matrix.md`):
- Lines 1-7: frontmatter with `phase_46_wave2_retrofit` field (Linux uses standard 5-field frontmatter without this extra field)
- Lines 12-13: `> **Platform gate:**` blockquote (2-line form)
- Lines 28-34: the mode × minimum-OS × breakpoints table (3-column)
- Lines 98-121: `## Non-Version Breakpoints` H2 → H3 subsections (SafetyNet, AMAPI Migration)
- Lines 40-96: `## Version Breakpoint Details` H2 → named H3s with `<a id="">` anchors

#### Concrete Code Excerpts

**Analog frontmatter (lines 1-7 of `03-android-version-matrix.md`):**
```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: both
audience: admin
platform: Android
phase_46_wave2_retrofit: 2026-04-25
---
```
Adapt to (drop the `phase_46_wave2_retrofit` field, change platform):
```yaml
---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: admin
platform: Linux
---
```

**Analog platform gate blockquote (lines 12-13):**
```markdown
> **Platform gate:** This reference shows the minimum Intune-supported Android OS per enrollment mode and three notable Android version breakpoints (Android 11 COPE NFC removal, Android 12 corporate-identifier IMEI/serial removal, Android 15 FRP hardening) plus policy-gated non-version breakpoints (Play Integrity attestation cutover January 2025, AMAPI migration for BYOD April 2025).
> For provisioning-method version availability per mode × method, see [02-provisioning-methods.md](02-provisioning-methods.md). For Android terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).
```
Adapt: substitute Ubuntu version coverage summary and link to `_glossary-linux.md`.

**Analog Non-version Breakpoints section (lines 98-120):**
```markdown
## Non-Version Breakpoints

The following drift events are NOT gated by Android API level — they are policy-gated or temporally-gated by Google or Microsoft changes. Document them here alongside version breakpoints so admins have a single drift-surface to consult.

### SafetyNet → Play Integrity (January 2025)

Google turned off SafetyNet Attestation API in January 2025...

**Admin action required:** Update any Android compliance policy references...
```
Adapt to (H3 only, inside `## Supported Ubuntu Versions` H2 rather than a standalone H2 per D-09):
```markdown
### Non-version Breakpoints

The following drift events are NOT gated by Ubuntu LTS version — they are component-version-gated changes that affect all supported Ubuntu versions.

#### Identity Broker v2.0.2+

When `intune-portal` updates to include Identity Broker v2.0.2+, the device automatically re-registers — creating new Intune device IDs and new Entra device IDs. Admins must review device-based CA assignments, filters, and Entra group memberships that rely on device object IDs after this update.

**Admin action required:** ...See [Phase 50 LIN-05 admin pitfall callout](../admin-setup-linux/01-intune-linux-agent.md#identity-broker-v202-re-enrollment) for the step-by-step review checklist.
```

**Analog version-breakpoint H3 structure (lines 41-52):**
```markdown
### Android 11 — COPE NFC Provisioning Removed

**Affected modes:** COBO (no impact ...), COPE / WPCO (NFC and afw#setup paths removed).

**What changed:** ...

**Admin action required:** ...

**References:**
- [Jason Bayton ...]
```
Adapt to the Ubuntu EOS H3:
```markdown
### Ubuntu 20.04 — End-of-Support

Ubuntu 20.04 LTS (Focal) support was dropped in the Intune 2508 service release (August 2025). Devices running Ubuntu 20.04 cannot enroll or maintain Intune enrollment after this date.

**Admin action required:** Upgrade to Ubuntu 22.04 LTS or 24.04 LTS. In-place upgrade is supported from 20.04 → 22.04 via `do-release-upgrade`. See [Ubuntu upgrade documentation](https://ubuntu.com/server/docs/upgrade-introduction) for the recommended procedure.
```

#### Adaptation Notes — Linux-Specific Differences from the Android Analog

1. **Matrix shape is DIFFERENT from Android analog.** Android's matrix is mode × minimum-OS × breakpoints (3 columns, 5+ rows). Linux matrix is Ubuntu-version × kernel-tracks (5 columns, 3 rows) per D-07:

   ```
   | Version | GA Kernel | HWE Kernel | Support Status | EOS Date |
   |---|---|---|---|---|
   ```
   The header row is EXACTLY this string — the validator (V-49-09) performs a literal match on this exact header. Do not rename columns, reorder them, or add extra columns.

2. **Three rows only** (Ubuntu 20.04, 22.04, 24.04) per D-07. Android matrix had 5 mode rows.

3. **Ubuntu 20.04 row uses footnote marker** (D-08). The cell `Dropped — Intune 2508 [^1]` keeps the row visible in the matrix while the `### Ubuntu 20.04 — End-of-Support` H3 holds the narrative. Accept either GFM footnote `[^1]` or inline parenthetical per CD-05 and Section 8 GFM notes in RESEARCH.md.

4. **Non-version Breakpoints is H3 (not H2).** Android analog placed `## Non-Version Breakpoints` as a peer H2 to `## Version Breakpoint Details`. Linux places `### Non-version Breakpoints` as an H3 INSIDE `## Supported Ubuntu Versions` per D-09 (to avoid SC#2 scope drift and preserve Phase 50 LIN-05 ownership).

5. **`[verify-on-current-Ubuntu]` inline markers** required for GA/HWE kernel version cells per D-10 (MEDIUM confidence — not documented by Microsoft). Use `6.8 [verify-on-current-Ubuntu]` pattern in those cells.

6. **EOS Date column uses pinned-event labels**, not bare dates (D-10): `"Intune 2508 — August 2025"` not `"August 2025"`. This prevents date drift when the cell is read months after authoring.

7. **H2 structure** (`## Supported Ubuntu Versions`, `## Hardware and Software Prerequisites`, `## Licensing Prerequisites`, `## See Also`) is simpler than Android's matrix doc which has only the matrix + breakpoint detail H2s. The prerequisites H2s are drawn from `01-android-prerequisites.md` (tri-portal surface pattern), adapted to Linux hardware/software requirements (x86_64 architecture, GNOME session, hardware TPM 2.0).

#### Anti-Patterns to Avoid

- **PITFALL-4 Anti-Pattern 1:** Do not add rows for non-Ubuntu distros (RHEL, Fedora) — Ubuntu-only per REQUIREMENTS.md Out of Scope (deferred to v1.6+).
- **PITFALL-4 Anti-Pattern 2:** Do not collapse GA and HWE kernel columns into a single cell with `<br>` — the 5-column orientation is the locked shape (D-07 rejected 2A.3 compound cells).
- **Drift surface guard (anti-Pattern 3):** Do not state kernel version numbers inline in prose; only in the matrix table cells with `[verify-on-current-Ubuntu]` markers where confidence is MEDIUM.
- **Phase ownership:** Do not write the Identity Broker v2.0.2+ `> ⚠️ Known admin pitfall` callout here — that belongs to Phase 50 LIN-05. The Non-version Breakpoints H3 provides the anchor TARGET; Phase 50 owns the detailed pitfall callout that back-links here.

---

### `docs/_glossary-linux.md`

#### File Role + Data Flow

The canonical Linux terminology layer for all downstream content. READ BY Phase 50 admin guides (LIN-03 through LIN-06), Phase 51/52 runbooks (term anchors), Phase 59 CLEAN-08 (5-platform glossary normalization), and by the collision audit in `check-phase-49.mjs`. READS the 3 existing glossaries indirectly (the collision audit checks this file's H3 terms against them). Commit-2 reciprocal appends add this file as a LINK TARGET from the 3 existing glossaries.

#### Closest Existing Analog

PRIMARY structural template: `docs/_glossary-macos.md` (per Phase 34 D-08 mirror-discipline — mirror macOS, not Android).
SECONDARY pattern source: `docs/_glossary-android.md` — per-term `> **Cross-platform note:**` blockquote pattern (Phase 34 D-10).

Key line ranges:
- `_glossary-macos.md` lines 1-10: frontmatter + top platform-coverage blockquote
- `_glossary-macos.md` lines 12-16: `# Apple Provisioning Glossary` + `## Alphabetical Index` + pipe-delimited term list
- `_glossary-macos.md` lines 20-50: H2 category `## Enrollment` with H3 term entries
- `_glossary-macos.md` lines 111-118: `## Version History` H2 with dated-change table
- `_glossary-android.md` lines 22-38: H3 term entry with `> **Cross-platform note:**` blockquote after definition
- `_glossary-android.md` lines 76-78: Supervision absent-concept callout-only entry (Phase 34 D-11 precedent)

#### Concrete Code Excerpts

**macOS analog frontmatter (lines 1-7):**
```yaml
---
last_verified: 2026-04-24
review_by: 2026-07-16
applies_to: both
audience: all
platform: all
---
```
Linux glossary uses `platform: Linux` (C10 blocking check per D-24 V-49-18):
```yaml
---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: all
platform: Linux
---
```

**macOS analog platform-coverage blockquote (lines 9-10):**
```markdown
> **Platform coverage:** This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```
Adapt to:
```markdown
> **Platform coverage:** This glossary covers Linux-specific terminology for Intune-managed Ubuntu LTS devices.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```
Note: This blockquote is the future APPEND TARGET for a "For Windows terminology, see [Linux Provisioning Glossary]..." back-ref IF any future phase adds a reciprocal from Linux back into itself — not applicable here. The Linux glossary's OWN blockquote references the 3 existing glossaries one-way at commit-1 time; the 3 existing glossaries get their reciprocal Linux link in commit-2.

**macOS analog Alphabetical Index (lines 14-16):**
```markdown
## Alphabetical Index

[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](#ade) | [APNs](#apns) | [Await Configuration](#await-configuration) | ...
```
Linux analog (all 29 terms, ~20 native + 9 absent-concept, alphabetically sorted — D-24c validator asserts `## Alphabetical Index` H2 exists):
```markdown
## Alphabetical Index

[ABM (Apple Business Manager)](#abm-apple-business-manager) | [APT repository](#apt-repository) | [COBO / COPE / WPCO](#cobo--cope--wpco) | [deb (package format)](#deb-package-format) | [dm-crypt](#dm-crypt) | [dpkg](#dpkg) | [DPC (Device Policy Controller)](#dpc-device-policy-controller) | [GA kernel](#ga-kernel) | [GNOME desktop](#gnome-desktop) | [Hardware Hash](#hardware-hash) | [HWE kernel](#hwe-kernel) | [Identity Broker](#identity-broker) | [intune-agent.timer](#intune-agenttimer) | [intune-portal (package)](#intune-portal-package) | [journalctl](#journalctl) | [Linux compliance settings](#linux-compliance-settings) | [LUKS](#luks) | [Managed Google Play (MGP)](#managed-google-play-mgp) | [microsoft-identity-broker](#microsoft-identity-broker) | [MS Edge for Linux](#ms-edge-for-linux) | [packages.microsoft.com](#packagesmicrosoftcom) | [Supervision](#supervision) | [systemd](#systemd) | [Ubuntu LTS](#ubuntu-lts) | [/var/log/dpkg.log](#varlogdpkglog) | [/var/log/intune-update.log](#varlogintune-updatelog) | [VPP (Volume Purchase Program)](#vpp-volume-purchase-program) | [Web-app CA](#web-app-ca) | [Work Profile](#work-profile) | [Zero-Touch Enrollment (ZTE)](#zero-touch-enrollment-zte)
```

**Android analog per-term entry with Cross-platform note (lines 22-27):**
```markdown
### BYOD

Bring-Your-Own-Device refers to Android Enterprise's personally-owned work profile enrollment path...

> **Cross-platform note:** On Windows, "BYOD" typically refers to Mobile Application Management Without Enrollment (MAM-WE) or light device enrollment — see the [Windows Autopilot Glossary](_glossary.md). On iOS, BYOD maps to [Account-Driven User Enrollment or profile-based User Enrollment](_glossary-macos.md#account-driven-user-enrollment)...
```
The `> **Cross-platform note:**` blockquote MUST appear on the lines IMMEDIATELY following the H3 definition body (within 5 lines of the H3, per D-23 validator heuristic V-49-19). This is the Phase 34 D-10 Anti-Pattern 4 guard.

Example Linux term entry pattern (from RESEARCH.md Section 5):
```markdown
### dm-crypt

The Linux kernel's subsystem for transparent disk encryption, providing block-device encryption via the device mapper (dm) layer. Intune compliance on Linux uses dm-crypt presence to evaluate Device Encryption compliance, with `/boot` and `/boot/efi` excluded from the encryption requirement.

> **Cross-platform note:** On Windows, the analog is BitLocker (drive-level encryption). On macOS, the analog is FileVault (full-disk XTS-AES encryption). Android uses the dm-crypt subsystem identically on some hardware, but Intune does not expose Android dm-crypt as a compliance signal. Do not conflate.
```

**Android analog Supervision absent-concept callout (lines 76-78 of `_glossary-android.md`):**
```markdown
### Supervision

> **Android note:** "Supervision" is an iOS/iPadOS management-state concept (see [Apple Glossary — Supervision](_glossary-macos.md#supervision)). Android does not use this term. The closest analog is [Fully Managed](#fully-managed), which is an ownership-mode designation set at provisioning, not a permanent device state gating restriction settings. Do not conflate.
```
Linux absent-concept callout shape (D-13 — replace "Android note" with "Linux note"):
```markdown
### Supervision

> **Linux note:** "Supervision" is an iOS/iPadOS management concept that does not apply to Linux device management in Intune. Linux devices have no "supervised" or "unsupervised" device state. See [Apple Provisioning Glossary — Supervision](_glossary-macos.md#supervision) for the definition used in iOS/iPadOS context.
```
All 9 absent-concept entries use this `> **Linux note:**` blockquote-only shape. The H3 is REQUIRED even for absent-concept entries — it gives downstream runbooks a stable anchor (DPO-04).

**macOS analog Version History (lines 111-118):**
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-24 | Phase 42: added Android Enterprise Provisioning Glossary see-also to continuation banner (AEAUDIT-03) | -- |
```
Linux analog (D-24c validator asserts `## Version History` H2 exists):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-26 | Phase 49: initial Linux Provisioning Glossary — 20 native terms, 9 absent-concept entries, collision audit complete | -- |
```

#### Adaptation Notes — Linux-Specific Differences from macOS Primary Analog

1. **5 content categories are DIFFERENT from macOS categories.** macOS uses: Enrollment / Device Management / App Distribution / App Protection (MAM) / Version History. Linux uses (D-11, CD-04): `## Distro & Lifecycle` / `## Agent & Service` / `## Compliance & Encryption` / `## Operations & Diagnostics` / `## Cross-Platform Collisions` / `## Version History`. The validator (V-49-17) asserts all 5 content category H2 strings by exact regex match.

2. **`## Cross-Platform Collisions` H2 is LINUX-ONLY.** macOS analog has no equivalent H2. This H2 contains ONLY absent-concept callout entries (D-12, D-13) — 9 terms that exist on other platforms but DON'T exist on Linux. Linux-native terms that have a DIFFERENT meaning from a cross-platform homonym live in their topical category H2 with a per-term `> **Cross-platform note:**` blockquote (not in Cross-Platform Collisions).

3. **`platform: Linux` frontmatter (not `platform: all`)** — this is the C10 blocking check difference from macOS analog (which uses `platform: all`). The Linux glossary serves only Linux; all 3 Phase 49 Linux files must carry `platform: Linux`.

4. **~20 native terms + 9 absent-concept entries = 29 total H3s.** macOS analog has 11 terms. The Linux glossary is substantially larger due to distro/kernel/service complexity.

5. **Alphabetical Index H2 is validator-asserted (V-49-14).** macOS has one but it is not validator-asserted in check-phase-30.mjs. For Linux, the Alphabetical Index must exist as an H2 node.

6. **PITFALL-5 collision-audit discipline:** Every Linux-native term in the 4 topical category H2s that appears as an H3 in ANY of the 3 existing glossaries MUST carry a `> **Cross-platform note:**` blockquote within 5 lines of its H3. The validator (V-49-19) enforces this. PITFALL-5 named at-risk terms: "agent" (maps to `intune-agent.timer` + `microsoft-identity-broker` H3s), "compliance" (maps to `Linux compliance settings` H3), "enrollment" (no Linux-native H3 named "enrollment" — enrollment is a top-level concept, not a glossary entry here), "portal" (maps to `intune-portal (package)` H3).

#### Anti-Patterns to Avoid

- **Anti-Pattern 4 (Phase 34 D-10):** Never place cross-platform comparison text INLINE inside the definition sentence. Always use a separate `> **Cross-platform note:**` blockquote AFTER the definition. The validator (V-49-19) only looks for the blockquote form.
- **Phase 34 D-11 Supervision-pattern violation:** Do not write a full definition for absent concepts (DPC, Work Profile, etc.). The absent-concept entry is blockquote-only — a redirect, not a definition.
- **macOS mirror-discipline violation:** Do not add a `## Alphabetical Index` as the LAST section — it must be the FIRST H2 after the platform-coverage blockquote (macOS analog lines 14-16 show this placement).
- **PITFALL-12 awareness:** Do NOT pre-create a `c5_collision_allowlist[]` key in `v1.5-audit-allowlist.json` — lazy-add only when a first false-positive surfaces (Phase 48 D-15 YAGNI per D-23).

---

### `scripts/validation/check-phase-49.mjs`

#### File Role + Data Flow

The Phase 49 validator-as-deliverable (Phase 48 D-18 contract). Runs standalone (`node scripts/validation/check-phase-49.mjs`) and is registered in `.github/workflows/audit-harness-v1.5-integrity.yml`. Reads 6 files (see Section 3 of RESEARCH.md). Ships in commit-1; uses `--skip-reciprocal` flag so commit-1 passes without the commit-2 reciprocal appends. Commit-2's post-commit verification runs without the flag to assert all 3 reciprocal strings.

#### Closest Existing Analog

`scripts/validation/check-phase-30.mjs` — the pattern exemplar per Phase 48 D-25 + CONTEXT.md line 149. All structural patterns (argv parsing, `readFile` helper, `checks` array, `padLabel` output formatter, exit code) are directly reusable.

Secondary analog: `scripts/validation/check-phase-31.mjs` (same pattern; use for comparison if any pattern question arises).

#### Concrete Code Excerpts

**Analog file header + imports (check-phase-30.mjs lines 1-13):**
```javascript
#!/usr/bin/env node
// Phase 30 static validation harness
// Source of truth: .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
// NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const QUICK = argv.includes('--quick');
const VERBOSE = argv.includes('--verbose');
```
Adapt to Phase 49 (drop `readdirSync`, `statSync`, `execFileSync` — Phase 49 does not use recursive directory walks or external tools; add `SKIP_RECIPROCAL` flag):
```javascript
#!/usr/bin/env node
// Phase 49 static validation harness
// Source of truth: .planning/phases/49-linux-foundation-taxonomy-glossary-version-matrix/49-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SKIP_RECIPROCAL = argv.includes('--skip-reciprocal');
```

**Analog `readFile` helper (check-phase-30.mjs lines 15-19):**
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}
```
Reuse VERBATIM in check-phase-49.mjs.

**Analog individual check structure (check-phase-30.mjs lines 51-67):**
```javascript
const checks = [
  {
    id: 1, name: "Decision tree <=5 decision-diamond nodes",
    type: "file-match-count", required: true,
    run() {
      const content = readFile("docs/decision-trees/07-ios-triage.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/07-ios-triage.md" };
      const matches = content.match(/^\s*IOS\d+\{/gm) || [];
      const count = matches.length;
      if (count >= 1 && count <= 5) return { pass: true, detail: count + " decision-diamond node(s) found" };
      return { pass: false, detail: "Expected 1-5 decision-diamond nodes, found " + count };
    }
  },
```
Adapt for Phase 49 checks. Example V-49-02 (H2 heading assertion):
```javascript
  {
    id: 2, name: "00-enrollment-overview.md has H2 ## Supported Management Surface",
    type: "file-match", required: true,
    run() {
      const content = readFile("docs/linux-lifecycle/00-enrollment-overview.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/linux-lifecycle/00-enrollment-overview.md" };
      if (/^## Supported Management Surface\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 '## Supported Management Surface' not found" };
    }
  },
```

**Analog output formatter + exit logic (check-phase-30.mjs lines 303-337):**
```javascript
const LABEL_WIDTH = 56;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + " ";
  return s + " " + ".".repeat(LABEL_WIDTH - s.length) + " ";
}

let passed = 0, failed = 0, skipped = 0;
const activeChecks = QUICK ? checks.filter(c => c.type !== "external") : checks;

for (const check of activeChecks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: "Unexpected error: " + e.message }; }
  const prefix = "[" + check.id + "/" + checks.length + "] " + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + "SKIPPED -- " + (result.detail || "") + "\n");
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + "PASS" + (VERBOSE && result.detail ? " -- " + result.detail : "") + "\n");
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + "FAIL -- " + result.detail + "\n");
  }
}

process.stdout.write("\nSummary: " + passed + " passed, " + failed + " failed, " + skipped + " skipped\n");
process.exit(failed > 0 ? 1 : 0);
```
Reuse VERBATIM in check-phase-49.mjs (drop the `QUICK` / `activeChecks` filter since Phase 49 has no external tool checks; adapt the `[N/22]` total count to the actual number of checks).

**PITFALL-5 Collision Audit (V-49-19) — new logic not in analog:**
```javascript
// Extract Linux-native term H3s (topical categories only — exclude Cross-Platform Collisions)
function extractLinuxNativeTerms(content) {
  const lines = content.split('\n');
  const terms = [];
  let inTopicalCategory = false;
  let inCrossplatformCollisions = false;
  for (const line of lines) {
    if (/^## Cross-Platform Collisions\s*$/.test(line)) { inCrossplatformCollisions = true; inTopicalCategory = false; continue; }
    if (/^## (Distro & Lifecycle|Agent & Service|Compliance & Encryption|Operations & Diagnostics)\s*$/.test(line)) { inTopicalCategory = true; inCrossplatformCollisions = false; continue; }
    if (/^## /.test(line)) { inTopicalCategory = false; continue; }
    if (inTopicalCategory && /^### (.+)\s*$/.test(line)) {
      terms.push({ name: RegExp.$1.trim(), lineIndex: lines.indexOf(line) });
    }
  }
  return terms;
}

// Check if term H3 in Linux glossary has cross-platform note within 5 lines after H3
function hasCrossplatformNote(lines, termLineIndex) {
  const end = Math.min(termLineIndex + 6, lines.length);
  for (let i = termLineIndex + 1; i < end; i++) {
    if (/^> \*\*Cross-platform note:\*\*/.test(lines[i])) return true;
  }
  return false;
}
```

**`--skip-reciprocal` flag integration:**
```javascript
// Checks V-49-20 through V-49-22 use this pattern:
  {
    id: 20, name: "_glossary.md contains reciprocal Linux link",
    type: "reciprocal", required: !SKIP_RECIPROCAL,
    run() {
      if (SKIP_RECIPROCAL) return { pass: true, skipped: true, detail: "--skip-reciprocal flag set; check deferred to commit-2 validation" };
      const content = readFile("docs/_glossary.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/_glossary.md" };
      if (content.includes('[Linux Provisioning Glossary](_glossary-linux.md)')) return { pass: true };
      return { pass: false, detail: "Reciprocal Linux link not found in docs/_glossary.md" };
    }
  },
```

**3-status closed set check (V-49-07) — new logic:**
```javascript
  {
    id: 7, name: "Capability table 3-status closed set (D-02)",
    type: "table-cell-validation", required: true,
    run() {
      const content = readFile("docs/linux-lifecycle/00-enrollment-overview.md");
      if (content === null) return { pass: false, detail: "File does not exist" };
      // Find the Supported Management Surface table
      const VALID_STATUS = /^(Supported|Partial|Not supported)/;
      const lines = content.split('\n');
      let inTable = false;
      let headerSeen = false;
      const violations = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^## Supported Management Surface\s*$/.test(line)) { inTable = true; continue; }
        if (inTable && /^## /.test(line)) break; // next H2 — exit table scope
        if (!inTable) continue;
        if (!/^\|/.test(line)) continue;
        if (!headerSeen) { headerSeen = true; continue; } // skip header row
        if (/^\|[-| ]+\|/.test(line)) continue; // skip separator row
        const cells = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cells.length < 2) continue;
        const statusCell = cells[1];
        if (!VALID_STATUS.test(statusCell)) violations.push("row: \"" + statusCell + "\"");
      }
      if (violations.length === 0) return { pass: true, detail: "All status cells use canonical strings" };
      return { pass: false, detail: violations.join("; ") + " — violates closed 3-status set" };
    }
  },
```

**Frontmatter check (V-49-18) — 60-day cycle assertion:**
```javascript
  {
    id: 18, name: "C10 frontmatter: platform: Linux + 60-day last_verified/review_by",
    type: "frontmatter", required: true,
    run() {
      const files = [
        "docs/linux-lifecycle/00-enrollment-overview.md",
        "docs/linux-lifecycle/01-linux-prerequisites.md",
        "docs/_glossary-linux.md"
      ];
      const failures = [];
      for (const f of files) {
        const content = readFile(f);
        if (content === null) { failures.push(f + ": file not found"); continue; }
        const fmMatch = content.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
        const lvMatch = fm.match(/^last_verified: (\d{4}-\d{2}-\d{2})\s*$/m);
        const rbMatch = fm.match(/^review_by: (\d{4}-\d{2}-\d{2})\s*$/m);
        if (!lvMatch) issues.push("last_verified missing or invalid");
        if (!rbMatch) issues.push("review_by missing or invalid");
        if (lvMatch && rbMatch) {
          const lv = new Date(lvMatch[1]), rb = new Date(rbMatch[1]);
          const days = (rb - lv) / (1000 * 60 * 60 * 24);
          if (days > 60) issues.push("review_by is >" + Math.round(days) + " days after last_verified (max 60)");
        }
        if (issues.length > 0) failures.push(f + ": " + issues.join("; "));
      }
      if (failures.length === 0) return { pass: true, detail: "All 3 Linux files have valid frontmatter" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
```

#### Adaptation Notes — Differences from check-phase-30.mjs

1. **No external tools** (no `execFileSync`, no `walkMd`, no `readdirSync`). Phase 49 validator is pure file-reads-only per Phase 48 D-25.

2. **22 discrete checks** (V-49-01 through V-49-22) vs check-phase-30's 13. The validator is larger due to the PITFALL-5 collision audit (V-49-19) being the primary purpose of the file.

3. **`--skip-reciprocal` flag** is unique to Phase 49. check-phase-30.mjs uses `--quick` to skip external checks. Phase 49's flag skips checks V-49-20 through V-49-22 specifically (not all non-structural checks).

4. **PITFALL-5 collision audit is novel logic** with no exact analog in check-phase-30.mjs or check-phase-31.mjs. The H3-extraction + cross-glossary comparison + 5-line blockquote lookahead algorithm is new code following the regex-based heading detection style of the analog.

5. **Validator constant comment** (D-25 requirement): Pin the H2 string `## Cross-Platform Collisions` as a named constant with a comment explaining Phase 50+ must update the constant in the same commit if renaming:
   ```javascript
   // CDI-02: This H2 string is PINNED. Phase 50+ renaming requires same-commit validator update.
   const CROSS_PLATFORM_COLLISIONS_H2 = /^## Cross-Platform Collisions\s*$/m;
   ```

6. **Matrix header row is exact-match** (V-49-09). The check uses a literal regex with all 5 column names. This is more precise than any check-phase-30 check.

#### Anti-Patterns to Avoid

- **Phase 48 D-25 violation:** Do not `import` from any shared module or utility file. All logic is inline in the single `.mjs` file.
- **No `execFileSync` for markdown-link-check** — Phase 49 has no external tool check. This keeps the validator runnable in any Node.js environment without npm packages.
- **Do not pre-populate `c5_collision_allowlist[]`** in v1.5-audit-allowlist.json — YAGNI per D-23. The validator has no allowlist lookup code in Phase 49.
- **Do not assert `[^1]` footnote syntax** in V-49-09/V-49-10 — accept either GFM footnote or inline parenthetical per CD-05 and RESEARCH.md Section 8.

---

## EDIT FILES — Commit-2 (Reciprocal Appends + Pin Refresh)

### Combined Entry: 3 Existing Glossary Appends + Pin Coordinate Refresh

#### Where to Append and Exact Append String

Each of the 3 existing glossaries receives EXACTLY one sentence appended to its existing top platform-coverage blockquote.

**`docs/_glossary.md` — Windows Autopilot Glossary**

Current blockquote (lines 9-11):
```markdown
> **Framework coverage:** This glossary covers terminology for both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2).
> Terms specific to one framework are labeled. See [APv1 vs APv2](apv1-vs-apv2.md) for framework selection.
> For macOS provisioning terminology (ADE, ABM, Setup Assistant), see the [macOS Provisioning Glossary](_glossary-macos.md).
```
Append one sentence (D-19, D-20) to make line 11 become:
```markdown
> For macOS provisioning terminology (ADE, ABM, Setup Assistant), see the [macOS Provisioning Glossary](_glossary-macos.md). For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).
```
Note: The append is to an EXISTING blockquote line — adding the sentence to the end of the last `>` line in the blockquote, not adding a new `>` line. This is the "within existing blockquote" semantic per D-20. Pin-coordinate risk for `_glossary.md`: LOW — the Windows glossary is not known to have pinned supervision_exemptions entries in `v1.5-audit-allowlist.json`. No pin refresh expected for this file.

**`docs/_glossary-android.md` — Android Enterprise Provisioning Glossary**

Current blockquote (lines 12-13 as of commit-1 time, BEFORE Phase 48 D-09 SC#1 corrections):
```markdown
> **Platform coverage:** This glossary covers Android Enterprise provisioning and management terminology for Intune-managed Android devices. For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology (macOS, iOS/iPadOS), see the [Apple Provisioning Glossary](_glossary-macos.md).
```
Append one sentence to the end of this single-line blockquote:
```markdown
> **Platform coverage:** This glossary covers Android Enterprise provisioning and management terminology for Intune-managed Android devices. For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology (macOS, iOS/iPadOS), see the [Apple Provisioning Glossary](_glossary-macos.md). For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).
```
Pin-coordinate risk: HIGH (RESEARCH.md Section 4). `v1.5-audit-allowlist.json` has entries for `docs/_glossary-android.md` with supervision_exemptions pinned at specific line numbers. If the blockquote is currently on line 12 as a single line and the append keeps it single-line, there is NO line number shift (the content is longer but the line count is the same). However, if the append causes a line wrap in the source file (creating a new `>` continuation line), ALL subsequent lines shift by +1. The executor MUST run `node scripts/validation/regenerate-supervision-pins.mjs --report` after making the edit to detect any shift BEFORE committing.

**`docs/_glossary-macos.md` — Apple Provisioning Glossary**

Current blockquote (lines 9-10):
```markdown
> **Platform coverage:** This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```
Append one sentence to the end of line 10:
```markdown
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md). For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).
```
Pin-coordinate risk: MEDIUM. The macOS glossary may have supervision_exemptions pins if `_glossary-macos.md` appears in `v1.5-audit-allowlist.json` sidecar. Run `--report` to check.

#### Exact Append String Template

The validator (V-49-20 through V-49-22) checks for this exact literal string in each file:

```
[Linux Provisioning Glossary](_glossary-linux.md)
```

The surrounding sentence is:
```
For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).
```

All three files receive the same sentence. The sentence is appended to the LAST line of the existing blockquote (not as a new `>` line — per D-20 "within existing blockquote without displacing content below").

#### Pin Coordinate Refresh Workflow

Per RESEARCH.md Section 4 and D-22 commit-2 atomicity:

```bash
# Step 1: Make all 3 reciprocal append edits (Edit tool, one per file)

# Step 2: Run pin coordinate report BEFORE staging
node scripts/validation/regenerate-supervision-pins.mjs --report
# Inspect output for "pin at line X does not match term at line Y" messages

# Step 3: For each shifted pin in v1.5-audit-allowlist.json:
#   - Lines in docs/_glossary-android.md that were BELOW the blockquote (line 12)
#     shift by +1 if the edit adds a new line (no shift if edit is within same line)
#   - Update the affected supervision_exemptions[] entries:
#     { "file": "docs/_glossary-android.md", "line": 76 } → "line": 77
#   - Add 1 to all subsequent pinned line numbers for that file
#   Currently at-risk pins per RESEARCH.md Section 4:
#     docs/_glossary-android.md lines 76, 78, 172, 188, 16, 46, 66
#     (all shift by +1 IF a new line is inserted before them)

# Step 4: Stage all changed files atomically:
#   docs/_glossary.md, docs/_glossary-android.md, docs/_glossary-macos.md
#   scripts/validation/v1.5-audit-allowlist.json (IF pin coordinates shifted)

# Step 5: Commit atomically
git commit -m "feat(49): reciprocal append + pin coord refresh"

# Step 6: Post-commit self-test
node scripts/validation/regenerate-supervision-pins.mjs --self-test
# expect exit 0

# Step 7: Final validator run (without --skip-reciprocal)
node scripts/validation/check-phase-49.mjs
# expect exit 0 (all 22 checks PASS)
```

Key rule: The pin refresh and the glossary edits MUST be in the SAME commit. Do not commit the glossary edits and then the pin refresh separately — this violates Phase 48 D-14 atomicity contract and will cause `--self-test` to fail between commits.

#### Append-Only Contract Compliance (Phase 42 D-03 / ROADMAP line 506)

The "append" semantic here is: adding a sentence to the END of an existing multi-sentence blockquote line. This does NOT displace any content below the blockquote. It does NOT insert a new `>` line above any existing content. The validator (V-49-20 through V-49-22) checks for string PRESENCE only — it does not check line position. If the executor needs to add the sentence as a new `>` continuation line (for readability), that is acceptable as long as the new line is AFTER all existing `>` lines in the blockquote.

---

## EDIT FILES — Commit-1 (ROADMAP/REQUIREMENTS Corrections)

### Combined Entry: ROADMAP.md SC#4 + REQUIREMENTS.md LIN-02 Wording Corrections

#### ROADMAP.md Line 172 — SC#4 "all 4" → "all 3"

**File:** `.planning/ROADMAP.md`
**Line:** 172 (current text, verbatim):
```
  4. All 4 existing platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, and `_glossary-ios.md` if it exists as a separate file) contain reciprocal Linux see-also entries (one-line appends per file — append-only contract)
```

**After correction (D-17, D-18):**
```
  4. All 3 existing platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`; iOS terminology lives inside `_glossary-macos.md`) contain reciprocal Linux see-also entries (one-line appends per file — append-only contract)
```

Changes: `All 4` → `All 3`; removed `and `_glossary-ios.md` if it exists as a separate file`; added `; iOS terminology lives inside `_glossary-macos.md`` to explain the count.

This correction MUST land in commit-1 because the validator (V-49-20 through V-49-22) depends on the corrected count — and the validator runs at the end of commit-1. The SC#4 correction in ROADMAP.md must precede or accompany the validator that implements it.

Coordination with Phase 48 D-09 pending SC#1 correction: Phase 48 D-09 also modifies ROADMAP.md. If Phase 48 has not yet committed its correction, the Phase 49 executor applies ONLY the line 172 change. If Phase 48 has already committed, the Phase 49 executor applies line 172 only (no conflict expected since the changes are on different lines).

#### REQUIREMENTS.md Line 144 — LIN-02 Traceability Wording Correction

**File:** `.planning/REQUIREMENTS.md`
**Line:** 144 (current text, verbatim):
```
| LIN-02 | 49 | docs/_glossary-linux.md — cross-collision audit first; reciprocal see-also in all 4 existing glossaries |
```

**After correction (D-17, D-18):**
```
| LIN-02 | 49 | docs/_glossary-linux.md — cross-collision audit first; reciprocal see-also in all 3 existing platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`; iOS terminology lives inside `_glossary-macos.md`) |
```

Changes: `all 4 existing glossaries` → `all 3 existing platform glossaries` with full parenthetical clarification of which 3 files and the iOS-in-macOS note.

Both ROADMAP.md and REQUIREMENTS.md corrections land in commit-1 before the validator's first run.

---

## Summary: Check-to-Decision Traceability

| Phase 49 check | Decision | Anti-pattern guarded |
|---|---|---|
| V-49-01 to V-49-06 | D-24a | PITFALL-7 whitelist-first; SC#1 equally-prominent |
| V-49-07 | D-01, D-02, CDI-01 | PITFALL-2 blank/Partial CA cell |
| V-49-08 to V-49-12 | D-24b, D-07, D-08, D-09 | PITFALL-4 version-homogeneity |
| V-49-13 to V-49-17 | D-24c, D-11, CDI-02 | PITFALL-5 collision anchor gap |
| V-49-18 | D-24c, Phase 34 D-14 | C10 frontmatter blocking |
| V-49-19 | D-21, D-23, PITFALL-5 line 122 | PITFALL-5 glossary collision |
| V-49-20 to V-49-22 | D-24d, D-19 | SC#4 reciprocal append completeness |

## PATTERN MAPPING COMPLETE
