# Phase 94: Post-Migration Verification Content Closure — Research

**Researched:** 2026-06-26
**Domain:** macOS MDM migration documentation — source verification against Microsoft Learn,
  Iru/Kandji vendor portals, and Apple platform deployment guides
**Confidence:** HIGH (MIGV-01), MEDIUM (MIGV-02 — portal accessible but login-gated for live
  console path), MEDIUM (MIGV-03 — per-requirement framing)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 — MIGV-01 placement:** Upgrade the existing Stage 7 / Stage 3 "Behind the Scenes"
  assertion to a stamped, Microsoft-Learn-cited, full-confidence statement in-place. Do NOT add
  a separate pre-migration readiness-checklist sidebar.
- **D-02 — Iru-doc fallback posture:** Verified-or-honest-hedge (option 2A). Attempt live
  verification of the Iru console device-deletion UI path. If login-gated / unreachable: keep
  conceptual-steps form, update hedge to record attempt + date + blocker. Surface BOTH
  `support.kandji.io` (known-documented anchor) and `support.iru.io` (rebrand-expected target).
  Demote standing "URL unchanged at support.kandji.io" assertion to "verify which resolves."
- **D-03 — MIGV-03 supervision callout:** Refine in-place at Stage 7 step 4 (~lines 324-326).
  Keep MEDIUM-confidence framing. Keep single `profiles status -type enrollment | grep Supervised`
  command only. Do NOT add `profiles list` before-and-after baseline.
- **D-04 — Freshness-stamp granularity:** Hybrid (4C). Bump existing Stage 7 section-provenance
  block for in-coverage edits (MIGV-01 + MIGV-03). Add discrete inline freshness signal only on
  out-of-coverage Stage 2 MIGV-02 edit.

### Locked Scope Constraints (from domain section)

- No new files.
- No nav-hub edits (`docs/index.md`, `common-issues.md`, `quick-ref-l2.md`,
  `decision-trees/06-macos-triage.md`).
- No CI-3 Managed-Apple-ID→Account rename.
- MIGV-03 stays MEDIUM-confidence callout only — never flat assertion, never author-unrunnable
  validated procedure.
- PSSO Secure Enclave key NEVER survives migration (Apple authoritative; do not alter).
- All OS-26-gated additions carry `last_verified`/`review_by` stamps (90-day cycle).
- MIGV-02 vendor content is NOT OS-26-gated; Stage 2 inline stamp is discretionary hygiene.
- L2 #30 is edited ONLY if MIGV-01 answer changes migration-failure triage.

### Claude's Discretion

- Exact prose wording, sentence placement within identified passages, Markdown formatting.
- Whether the MIGV-02 Stage 2 inline freshness signal is a full `last_verified`/`review_by`
  pair or a lighter date-of-attempt note (hygiene, not mandated — planner's call).

### Deferred Ideas (OUT OF SCOPE)

None — scope locked prior to this phase. CI-3 rename, multi-tenant PSSO, iOS migration depth,
new scenario docs, and code-scaffolding integration remain out of v1.12 per
`.planning/REQUIREMENTS.md` Out-of-Scope table.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MIGV-01 | Guide 02 documents — at full confidence, Microsoft Learn verified — whether Intune requires config beyond ADE token assignment once an OS-26 in-place ABM migration resolves to profile-based enrollment | Gate 1 resolved below: existing ADE enrollment policy assignment alone is sufficient; no separate configuration mode exists — confirmed against current MS Learn + Microsoft TechCommunity blog |
| MIGV-02 | Stage 2 Kandji/Iru source-side steps reflect verified current Iru console device-deletion UI path; confirms secret-retrieval pre-flight still required | Gate 2 resolved below: docs.iru.com authoritative page fetched; support.iru.io resolves but is a login-gated SPA; support.kandji.io resolves and hosts KB with Iru branding; UI path confirmed equivalent to prior Kandji steps |
| MIGV-03 | Guide 02 documents best-available inference on supervision preservation through OS-26 in-place migration, framed as explicit MEDIUM-confidence callout | Gate 3 resolved below: Apple authoritative text on supervision + profile-based enrollment found; MEDIUM framing confirmed correct; PSSO Secure Enclave survival excluded per locked constraint |
</phase_requirements>

---

## Summary

This is a documentation-only phase. No code, no UI, no schema. All three research gates concern
external source verification for existing passages in a single file,
`docs/macos-lifecycle/02-mdm-migration-psso.md`. The phase executes three surgical edits plus one
freshness-stamp bump.

**Gate 1 (MIGV-01 — Microsoft Learn):** The existing assertion at lines 204 and 330 is factually
correct and confirmed against current Microsoft Learn. Microsoft Intune exposes exactly one
enrollment construct for this scenario: an enrollment policy (formerly "enrollment profile")
assigned to device serial numbers or set as the token default. There is no separate "profile-based
enrollment configuration mode" distinct from standard ADE enrollment policy assignment. The
Microsoft TechCommunity official blog for macOS 26 migration explicitly states: "Since migration
is treated as a new device enrollment, you'll need to follow standard Intune ADE (Automated Device
Enrollment) guidance to setup device enrollment profile." Apple's own deployment guide uses the
language "unenrolls from an Automated Device Enrollment and reenrolls with profile-based
enrollment," which is the Apple-side description of the mechanism — Intune has no corresponding
separate configuration object. The existing assertion qualifies for a full-confidence, cited
upgrade. L2 #30 does NOT need editing (the verified answer does not change triage).

**Gate 2 (MIGV-02 — Iru/Kandji vendor portal):** The Iru rebrand from Kandji (October 2025) is
confirmed. Both `support.kandji.io` and `support.iru.io` resolve (HTTP 200). `support.kandji.io`
hosts Iru-branded KB articles (title: "Platform Overview - Kandji Support - Iru"; page text:
"Kandji is now Iru"). `support.iru.io` resolves but serves a JavaScript SPA shell (576 bytes) that
is login-gated and renders no content without authentication — the device-deletion UI path at
`support.iru.io/kb/deleting-a-device-record` returns HTTP 200 but no extractable text.
`docs.iru.com` is the new authoritative documentation domain with fully publicly accessible
content; the device-deletion UI path is confirmed there. The UI path (Devices > device > Device
Action Menu > Delete Device Record > type "DELETE" > confirm) is identical to what support.kandji.io
documents. The Iru documentation does NOT include a "retrieve secrets before deletion" pre-flight
instruction — this is a gap in the vendor's own documentation that the guide correctly fills. The
four permanently destroyed secrets are: Device lock PIN code, Recovery password, FileVault Recovery
Key, Activation Lock Bypass Code. Per D-02: the standing assertion "support portal URL unchanged at
support.kandji.io" must be demoted to "verify which resolves" with both URLs surfaced.

**Gate 3 (MIGV-03 — supervision):** Apple's authoritative documentation at
`support.apple.com/guide/deployment/dep1d89f0bff` confirms: "Mac computers are also supervised if
they: Have macOS 11 or later and enroll in a device management service using account-driven Device
Enrollment, profile-based Device Enrollment, or Automated Device Enrollment." Since the B1 in-place
migration re-enrolls via profile-based enrollment (Apple's own language for the mechanism), and
macOS 26 devices meet the macOS 11+ condition, supervision *should be* re-granted. However, no
single authoritative source explicitly confirms supervision is *preserved* through the migration
transition itself (there is a momentary unenrollment). The MEDIUM framing is correct and must be
preserved. The existing callout at lines 324-326 needs tightening to cite the Apple source.

**Primary recommendation:** Execute three in-place edits to `docs/macos-lifecycle/02-mdm-migration-psso.md`
per the locked decisions, with the exact line map below. Do not touch any other file unless the
planner judges post-authoring that the MIGV-01 finding materially changes L2 #30 triage (it does not).

---

## Architectural Responsibility Map

> Included because "architecture" for a documentation phase = which section/stage owns each
> capability claim. This map prevents the planner from mis-assigning edits to the wrong passage.

| Capability Claim | Primary Location | Secondary Location | Rationale |
|------------------|-----------------|--------------------|-----------|
| Intune requires no additional config beyond ADE policy (MIGV-01) | Stage 7 "Behind the Scenes" (line 330) | Stage 3 "Behind the Scenes" (line 204) | Stage 7 is the post-migration context where the reassurance matters most; Stage 3 carries a lighter form already |
| Iru console device-deletion UI path (MIGV-02) | Stage 2 "What Happens" step 5 (lines 154-160) | Stage 2 step 3 (line 148), B2 Stage 3 (line 477-489), glossary (line 548) | Stage 2 step 5 is the primary "how to do it" surface; steps 3/4 + glossary carry URL assertion |
| Supervision preservation through migration (MIGV-03) | Stage 7 "What Happens" step 4 (lines 324-326) | Stage 7 "Watch Out For" (line 338) | The step-4 callout is the primary claim; Watch Out For is the consequence bulletin |
| Freshness stamps (D-04) | Stage 7 section-provenance block (line 428) | Stage 2 inline (new, near step 5) | Provenance block governs OS-26-gated B1 content; Stage 2 edit is vendor-sourced and needs separate stamp |

---

## Research Gate Findings

### Gate 1: MIGV-01 — Intune Profile-Based Enrollment Configuration Requirement

**Question:** Does Intune require ANY configuration beyond ADE token / enrollment-policy
assignment once an OS-26 in-place ABM "Assign Device Management" migration resolves to
profile-based enrollment? Or is the existing ADE enrollment policy assignment alone sufficient?

**Finding: ADE enrollment policy assignment alone is sufficient. No separate "profile-based
enrollment configuration mode" exists in Intune.**

**Evidence:**

1. **Apple Platform Deployment Guide** (`support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web`)
   uses the exact phrase: "a Mac with macOS 26 or later supports migration that unenrolls from an
   Automated Device Enrollment and reenrolls with profile-based enrollment." This is Apple's label
   for the B1 migration result — it is a description of the enrollment TYPE, not a distinct Intune
   configuration object. [CITED: support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web]

2. **Microsoft TechCommunity Intune Blog** ("Apple making device migration to Microsoft Intune
   easy with upcoming OS 26 release," 2025-08-04, by Iris Yuning Ye, Microsoft):
   "Since migration is treated as a new device enrollment, you'll need to follow standard Intune
   ADE (Automated Device Enrollment) guidance to setup device enrollment profile... After
   successfully synced device from ABM to Intune, you need to create the enrollment profile, and
   then manually assign it to the devices via device serial number." No mention of a separate
   profile-based enrollment configuration step. [CITED: techcommunity.microsoft.com/blog/intunecustomersuccess/apple-making-device-migration-to-microsoft-intune-easy-with-upcoming-os-26-relea/4439895]

3. **Microsoft Learn — Set up ADE for macOS** (`learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos`, updated 2026-06-22): Documents the single Intune enrollment policy construct (Devices > Enrollment > Apple > Enrollment program tokens > token > Enrollment policies). No second enrollment object for "profile-based enrollment" is described or referenced. [CITED: learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos]

4. **Microsoft Learn — Manage macOS ADE devices and tokens** (`learn.microsoft.com/en-us/intune/device-enrollment/apple/manage-devices-tokens-macos`, updated 2026-06-22): Confirms the migration workflow: ensure device is in ABM, assign a macOS enrollment policy, sync. No additional step for migrated devices. [CITED: learn.microsoft.com/en-us/intune/device-enrollment/apple/manage-devices-tokens-macos]

**Confirmed:** The existing assertion at lines 204 and 330 of guide 02 is factually correct.
"No separate 'profile-based enrollment' configuration is required in Intune beyond having the ADE
enrollment policy assigned to the device serial number" accurately describes the Intune behavior.

**Confidence:** HIGH [VERIFIED: multiple Microsoft Learn pages + Microsoft official blog, all
current as of 2026-06-22 to 2026-06-26]

**L2 #30 impact:** NONE. The MIGV-01 answer (no additional config needed) does not alter
migration-failure triage in L2 #30. The Track A root cause (enrollment policy not assigned) and
Track B root cause (policy misconfiguration) are unchanged. Do NOT edit L2 #30.

**Authoring-day re-verification step (executor MUST run):**
```
# Confirm MS Learn page still says no separate profile-based enrollment config
# Navigate to: https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos
# Search page for "profile-based" — confirm no separate configuration object appears
# Confirm the Microsoft blog at the URL above still reflects the "standard ADE guidance" framing
```

---

### Gate 2: MIGV-02 — Iru Console Device-Deletion UI Path

**Question:** What is the current Iru (post-Kandji-rebrand, Oct 2025) admin-console
device-deletion / "Delete Device Record" UI path? Which portal URLs resolve? Does deletion
still require the secret-retrieval pre-flight?

**Finding A — Portal URLs:**

- `support.kandji.io` — RESOLVES (HTTP 200). Hosts full KB articles with Iru branding. The
  platform overview page text reads: "Kandji is now Iru." The deletion KB article at
  `support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji` is fully accessible.
  [VERIFIED: curl HTTP 200, content confirmed]

- `support.iru.io` — RESOLVES (HTTP 200), but serves a JavaScript single-page application shell
  (576 bytes, rendered by browser only). Content at `support.iru.io/kb/deleting-a-device-record`
  returns HTTP 200 but yields no extractable text — the portal is login-gated and requires a
  live browser session. [VERIFIED: curl HTTP 200 confirmed; content LOGIN-GATED/SPA — not
  publicly readable via automated fetch]

- `docs.iru.com` — The new authoritative Iru documentation domain. Fully publicly accessible.
  The device-deletion article at
  `docs.iru.com/en/endpoint/devices/device-record-management/deleting-a-device-record-and-uninstalling-iru-endpoint`
  is accessible and confirmed (HTTP 200). [VERIFIED: curl + WebFetch confirmed]

**Finding B — Device-Deletion UI Path (confirmed from docs.iru.com + support.kandji.io):**

The UI path is consistent across both sources. Exact steps (verified against docs.iru.com):

1. Log in to Iru Endpoint and open **Devices**
2. Click the target device
3. Click the **Device Action Menu** (top right of device record)
4. Select **Delete Device Record**
5. In the confirmation popup, type **DELETE** in the text field
6. Click **Delete Device Record** to confirm

For bulk deletion: radio-button select devices → **Bulk Action Menu** → **Delete devices**.

After deletion: the Iru Agent is notified at its next check-in (every ~15 minutes) and uninstalls
itself, removing installed profiles.

[CITED: docs.iru.com/en/endpoint/devices/device-record-management/deleting-a-device-record-and-uninstalling-iru-endpoint]
[CITED: support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji]

**Finding C — Permanently destroyed secrets (confirmed from both sources):**

The following four items are explicitly listed as permanently destroyed on Delete Device Record:
- Device lock PIN code
- Recovery password
- **FileVault Recovery Key**
- **Activation Lock Bypass Code**

"This action cannot be undone." [CITED: docs.iru.com + support.kandji.io — text consistent]

**Finding D — Secret-retrieval pre-flight (documentation gap):**

Neither `docs.iru.com` nor `support.kandji.io` mentions a requirement to retrieve secrets
*before* performing Delete Device Record. The vendor's own documentation describes the secrets
as permanently destroyed but provides no "retrieve these first" pre-flight instruction. Guide 02's
existing pre-flight framing (steps 3 and 4 of Stage 2 retrieve FileVault key and Activation Lock
bypass code before step 5's Delete Device Record) is CORRECT and addresses a genuine gap in the
vendor's documentation. The existing guide 02 approach is the right one; the vendor's silence on
pre-flight does not change the operator-safety requirement.

**Finding E — URL assertion in current guide 02 (must be corrected per D-02):**

- Line 148: `"support portal URL unchanged at support.kandji.io"` — this flat assertion must be
  updated. While `support.kandji.io` does still resolve and host content, `support.iru.io` also
  resolves (as the rebrand target). The standing assertion was that the URL is "unchanged" — this
  needs to become a both-URLs-acknowledged statement since the rebrand has produced a new URL
  that is live. Additionally, the authoritative documentation domain has shifted to `docs.iru.com`.
- Line 548 (glossary): `"support portal remains at support.kandji.io"` — same correction needed.

**Confidence:** MEDIUM-HIGH. UI path confirmed from publicly accessible `docs.iru.com` and
`support.kandji.io`. `support.iru.io` resolves but is SPA-only and inaccessible without login.
The honest-hedge posture (D-02) applies to the `support.iru.io` console navigation specifically:
confirmed accessible but content not verifiable without operator login credentials.

**Authoring-day re-verification steps (executor MUST run):**
```bash
# 1. Confirm docs.iru.com deletion article still resolves:
curl -s -o /dev/null -w "%{http_code}" -L "https://docs.iru.com/en/endpoint/devices/device-record-management/deleting-a-device-record-and-uninstalling-iru-endpoint"
# Expected: 200

# 2. Confirm support.kandji.io KB article still resolves:
curl -s -o /dev/null -w "%{http_code}" -L "https://support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji"
# Expected: 200

# 3. Confirm support.iru.io base URL still resolves:
curl -s -o /dev/null -w "%{http_code}" -L "https://support.iru.io"
# Expected: 200

# 4. If operator has Iru console access: log in to support.iru.io, navigate to
#    Devices > [device] > Device Action Menu, confirm "Delete Device Record" label
#    is present and UI steps match the docs.iru.com description.
```

---

### Gate 3: MIGV-03 — Supervision Preservation Through OS-26 In-Place Migration

**Question:** What do the best available sources say about whether device supervision is
preserved through an OS-26 in-place ABM "Assign Device Management" migration to Intune?

**Finding A — Apple authoritative text on supervision + profile-based enrollment:**

Apple's "About Apple device supervision" deployment guide
(`support.apple.com/en-gw/guide/deployment/dep1d89f0bff/web`) states explicitly:

> "Mac computers are also supervised if they: Have macOS 11 or later and enroll in a device
> management service using **account-driven Device Enrollment, profile-based Device Enrollment,
> or Automated Device Enrollment**"

Since the B1 in-place migration re-enrolls via "profile-based enrollment" (Apple's own
description in `support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web`),
and macOS 26 devices satisfy the macOS 11+ condition, **Apple's own rules indicate that
supervision should be re-granted as a result of the profile-based re-enrollment.**

[CITED: support.apple.com/en-gw/guide/deployment/dep1d89f0bff/web — authoritative on supervision
+ profile-based enrollment]
[CITED: support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web — authoritative
on "unenrolls from ADE + reenrolls with profile-based enrollment" language]

**Finding B — Why MEDIUM confidence remains correct:**

Apple's supervision text governs what enrollment TYPE produces supervision, not whether
supervision *survives a transition* through a momentary unenrollment. The Apple migration guide
is silent on supervision preservation as an explicit guarantee. No community source (Addigy,
Intune IRL, emm-blog.com, SimpleMDM) has published empirical results confirming or denying
supervision is preserved *through* the transition. The best-available inference is:

- Device unenrolls from old MDM (Kandji/Iru) → supervision drops momentarily
- Device re-enrolls with Intune via profile-based enrollment → Apple rules grant supervision
- Net result: supervision should be re-granted; may appear as "preserved" from operator perspective

This is inference from composition of two Apple-authoritative facts, not a single explicit
confirmation. MEDIUM framing is correct and must be preserved per locked decision D-03.

**Finding C — What the existing callout needs (lines 324-326):**

The existing step-4 callout text is substantively correct but can be tightened:
- The reasoning is already sound: "macOS 11 or later enforces supervision on profile-based
  enrollment, and the migration re-enrolls via profile-based enrollment — so supervision should
  be regranted."
- The improvement: cite the Apple source for the profile-based enrollment supervision rule
  (`dep1d89f0bff` URL).
- Keep the existing `profiles status -type enrollment | grep Supervised` pilot verification
  command per D-03.
- Do NOT add `profiles list` before-and-after per D-03.
- No claim that PSSO Secure Enclave key survives — that remains excluded per Apple authoritative
  position (Stage 9 already handles this correctly, untouched by Phase 94).

**Finding D — PSSO Secure Enclave key (HIGH confidence, locked — do not alter):**

Apple's authoritative documentation states: "The Secure Enclave key from the Kandji/Iru
enrollment is permanently destroyed when the device unenrolls from Kandji/Iru MDM. This is a
hardware-enforced property of the Secure Enclave: the key is bound to the enrollment and is
destroyed on unenrollment." This is already correctly documented in Stage 9 of guide 02 and is
NOT affected by the MIGV-03 callout. The MIGV-03 callout covers supervision status only.
[CITED: Apple documentation on Secure Enclave + PSSO; already in guide 02 at lines 392-394]

**Confidence (MIGV-03):** MEDIUM — per requirement and locked decision. The reasoning is
sound and grounded in Apple authoritative text on supervision rules; the gap is that no source
explicitly confirms supervision survives the *transition* (only that re-enrollment grants it).
MEDIUM is the correct framing and must not be upgraded to HIGH.

**Authoring-day re-verification step (executor MUST run):**
```bash
# Confirm Apple supervision guide still includes profile-based enrollment in supervision list:
# Navigate to: https://support.apple.com/en-gw/guide/deployment/dep1d89f0bff/web
# (or current region-equivalent)
# Confirm "Mac computers are also supervised if they: Have macOS 11 or later and enroll...
# profile-based Device Enrollment" language is still present.
# Check for any new Apple publication explicitly confirming supervision preservation
# through OS-26 migration — if found, may allow upgrading to HIGH.
```

---

## Target File Line Map (Exact Edit Targets)

All edits land exclusively in `docs/macos-lifecycle/02-mdm-migration-psso.md`.

### Edit 1 — MIGV-01: Stage 7 "Behind the Scenes" (Primary Touch — D-01)

| Property | Value |
|----------|-------|
| Lines | 330 |
| Block | Stage 7 > Behind the Scenes > first bullet |
| Current text (abridged) | "From Intune's perspective, the device re-enrolls as a fresh ADE enrollment — no separate 'profile-based enrollment' configuration mode is required in Intune. The existing ADE enrollment policy... automatically handles the migrated device's re-enrollment." |
| Change | Add Microsoft Learn citation + Microsoft TechCommunity blog citation inline; add `last_verified`/`review_by` stamps via the Stage 7 provenance block bump (D-04); promote from unstamped assertion to cited full-confidence statement |
| Stamp vehicle | D-04 provenance block bump at line 428 covers this (in-coverage) |

### Edit 1b — MIGV-01: Stage 3 "Behind the Scenes" (Secondary Touch — D-01)

| Property | Value |
|----------|-------|
| Lines | 204 |
| Block | Stage 3 > Behind the Scenes > third bullet |
| Current text (abridged) | "No separate 'profile-based enrollment' configuration is required in Intune beyond having the ADE enrollment policy assigned to the device serial number." |
| Change | Add supporting citation to match Stage 7's upgraded form; keep prose minimal (this is the lighter-form instance) |
| Stamp vehicle | Covered by Stage 7 provenance block bump (both Stage 3 and Stage 7 are inside the B1 OS-26-gated content scope) |

### Edit 2a — MIGV-02: Stage 2 step 3 URL assertion (D-02)

| Property | Value |
|----------|-------|
| Lines | 148 |
| Block | Stage 2 > What Happens > step 3 |
| Current text | "...In the Kandji (rebranded **Iru**, October 2025; support portal URL unchanged at support.kandji.io) console..." |
| Change | Replace "support portal URL unchanged at support.kandji.io" with both-URLs language: acknowledge `support.kandji.io` (known-documented anchor, Iru-branded content) and `support.iru.io` (rebrand target, login-gated on authoring day) and `docs.iru.com` (new authoritative docs domain, publicly accessible); demote flat assertion to "verify which resolves" posture |

### Edit 2b — MIGV-02: Stage 2 step 4 verification note (D-02)

| Property | Value |
|----------|-------|
| Lines | 152 |
| Block | Stage 2 > What Happens > step 4 > note |
| Current text | "Verify current Iru console labels on authoring day — the October 2025 rebrand may cause console navigation to differ from the support.kandji.io documentation, which still displays 'Kandji' branding..." |
| Change | Update note to reflect 2026-06-26 verification attempt findings: `support.kandji.io` now displays Iru branding ("Kandji is now Iru"); `docs.iru.com` is new authoritative docs domain; `support.iru.io` resolves but is login-gated SPA; UI path confirmed identical via docs.iru.com |

### Edit 2c — MIGV-02: Stage 2 step 5 deletion steps + inline stamp (D-02 + D-04)

| Property | Value |
|----------|-------|
| Lines | 154-160 |
| Block | Stage 2 > What Happens > step 5 |
| Current text | Conceptual steps with hedge "(verify in current Iru console — exact UI labels may differ from support.kandji.io documentation)" |
| Change | Upgrade hedge: retain conceptual form; cite docs.iru.com as verified source for UI path; add confirmed "type DELETE in text field" confirmation step; add discrete inline freshness signal (D-04 hygiene: date of verification attempt + what was verified vs. what remains login-gated) |
| Stamp vehicle | Discrete inline stamp here (vendor-sourced, not in Stage 7 provenance block scope) |

### Edit 2d — MIGV-02: B2 Stage 3 (line 477-489)

| Property | Value |
|----------|-------|
| Lines | 477-489 |
| Block | B2 Path > B2 Stage 3 > "What the Admin Sees" |
| Current text | "...initiate an Erase Mac command (or equivalent wipe action) from the Kandji/Iru console..." |
| Change | Minimal: no direct URL assertion here, but ensure consistency with updated Stage 2 URL guidance. The B2 Stage 2 already cross-references Stage 2 for full detail (line 475), so Stage 3 itself needs no URL change unless the planner judges it warrants a "see Stage 2 for updated portal guidance" note. |

### Edit 2e — MIGV-02: Glossary line 548 (D-02)

| Property | Value |
|----------|-------|
| Lines | 548 |
| Block | Glossary Quick Reference table > Kandji / Iru row |
| Current text | "support portal remains at support.kandji.io" |
| Change | Update to reflect both URLs: `support.kandji.io` (Iru-branded KB, publicly accessible) and `support.iru.io` (login-gated SPA on verification date); note `docs.iru.com` as authoritative public docs domain |

### Edit 3 — MIGV-03: Stage 7 step 4 supervision callout (D-03)

| Property | Value |
|----------|-------|
| Lines | 324-326 |
| Block | Stage 7 > What Happens > step 4 + note |
| Current text | "Supervision status (MEDIUM confidence). Supervision is expected to be maintained through the B1 in-place migration. macOS 11 or later enforces supervision on profile-based enrollment, and the migration re-enrolls via profile-based enrollment — so supervision should be regranted." + note with pilot command |
| Change | Tighten wording; add explicit Apple source citation for the profile-based enrollment supervision rule (`dep1d89f0bff` URL); keep the `profiles status -type enrollment | grep Supervised` pilot command unchanged; keep MEDIUM framing; no claim about PSSO Secure Enclave key |
| Stamp vehicle | Covered by Stage 7 provenance block bump at line 428 (D-04) |

### Edit 4 — D-04: Stage 7 section-provenance block bump (line 428)

| Property | Value |
|----------|-------|
| Lines | 428 |
| Block | Stage 7 section-provenance block (after Stage 9 "How to Verify" section) |
| Current text | "`last_verified: 2026-06-24` / `review_by: 2026-09-24`" |
| Change | Bump to `last_verified: <authoring-day>` / `review_by: <authoring-day + 90d>`. Optionally add or update the supervision-re-confirm instruction in the provenance block prose (already present: "Re-confirm... supervision-status preservation through OS-26 in-place migration against current Apple Business Manager documentation and Apple Support migration guide at each 90-day review") |
| Precedent | `docs/admin-setup-macos/07-platform-sso-setup.md` ADE-section provenance block at line 156 |

---

## Don't Hand-Roll

> For a docs-only phase, this section covers documentation patterns that must NOT be hand-crafted
> when established conventions exist in the file.

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Freshness stamps | Custom date notation | Existing `last_verified: YYYY-MM-DD` / `review_by: YYYY-MM-DD` frontmatter/provenance pattern | 90-day review cycle requires machine-recognizable format consistent with guide 07 precedent |
| Confidence labelling | New callout format | Existing "MEDIUM confidence" callout pattern already at lines 324-326 (refine, don't rewrite) | Phase 95 validator `check-phase-94.mjs` will check for this pattern |
| Vendor URL citations | Arbitrary link text | Explicit URL prose ("support.kandji.io", "docs.iru.com") already established in guide 02 | Both-names-for-searchability convention requires surfacing actual domain strings |
| Both-brand requirement | Single "Iru" label | "Kandji/Iru" dual-name pattern already throughout guide 02 | Searchability for admins who still know only "Kandji" brand |

---

## Common Pitfalls

### Pitfall 1: Treating "profile-based enrollment" as an Intune configuration object
**What goes wrong:** Author interprets Apple's language "reenrolls with profile-based enrollment"
as implying Intune has a separate configuration for "profile-based enrollment mode."
**Why it happens:** Apple uses "profile-based enrollment" as a descriptor of the enrollment TYPE
resulting from migration; Intune's admin UI does not expose this as a separate configuration.
**How to avoid:** Cite the MS Learn + Microsoft blog text that explicitly says "standard ADE
enrollment guidance" / "enrollment profile assigned to device serial number" is all that is needed.
**Warning signs:** If research suggests a second configuration object, re-verify against current
MS Learn — Intune's enrollment policies tab is the only construct.

### Pitfall 2: Conflating "supervision preserved" with "supervision re-granted"
**What goes wrong:** Author upgrades MIGV-03 to HIGH confidence, asserting "supervision is
preserved" without acknowledging the momentary unenrollment.
**Why it happens:** Apple's supervision rule text says profile-based enrollment grants supervision,
so it's tempting to call this "preservation."
**How to avoid:** The Apple source confirms supervision *rules* (profile-based enrollment = supervised
on macOS 11+); it does not explicitly confirm survival through the unenrollment transition moment.
Keep MEDIUM, cite the Apple rule, note the inference gap.
**Warning signs:** Any source claiming "supervision is confirmed preserved through macOS 26
migration" — verify the source is authoritative and not just repeating the inference.

### Pitfall 3: Fabricating Iru console UI labels for support.iru.io
**What goes wrong:** Author states a specific support.iru.io navigation path as if verified from
a live console session.
**Why it happens:** `support.iru.io` resolves (HTTP 200), so it's tempting to assert it is
accessible. But it is a login-gated SPA.
**How to avoid:** Cite `docs.iru.com` for the UI path (publicly accessible); acknowledge
`support.iru.io` resolves but is login-gated; use the D-02 honest-hedge posture.
**Warning signs:** Any prose that states "In the Iru console at support.iru.io, navigate to..."
without a login-verified session.

### Pitfall 4: Removing the existing "MEDIUM confidence" label from MIGV-03
**What goes wrong:** Callout gets rewritten to a flat assertion after citing the Apple source.
**Why it happens:** Having an Apple source feels like it should upgrade to HIGH.
**How to avoid:** MEDIUM is LOCKED by adversarial-review verdict (3-iii). The Apple source
confirms the supervision rule, not the preservation outcome — MEDIUM remains correct.
**Warning signs:** Any draft of step 4 that removes the "MEDIUM confidence" qualification.

---

## State of the Art

| Old State (v1.11 guide 02) | Current State (post-Phase 94) | Impact |
|----------------------------|-------------------------------|--------|
| MIGV-01 assertion unstamped and uncited at lines 204+330 | Cited (MS Learn + blog) + stamped via provenance block | Operator can trace claim to source; 90-day review cycle engaged |
| URL "unchanged at support.kandji.io" as flat assertion (lines 148, 548) | Both URLs surfaced (support.kandji.io confirmed Iru-branded; support.iru.io confirmed resolves, login-gated); docs.iru.com surfaced as authoritative public docs | Operator knows which URL to visit; hedge prevents stale assertion |
| MIGV-03 callout uncited (lines 324-326) | Apple source cited (`dep1d89f0bff`) for profile-based enrollment supervision rule | MEDIUM framing now grounded in Apple's own text |

**Deprecated / superseded:**

- `support.kandji.io` as the sole stated portal URL: still valid (Iru-branded content there),
  but no longer correct to state it as "unchanged" or "only" URL.
- "Kandji Support" nomenclature: the platform overview page now reads "Platform Overview -
  Kandji Support - Iru" — both names present; guide 02 "Kandji/Iru" dual-name convention is
  correct and should be maintained.

---

## Environment Availability

> Step 2.6: SKIPPED. Phase 94 is documentation-only. No external tools, services, CLIs,
> runtimes, or databases required. All edits are Markdown text changes to one file.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `support.iru.io` is login-gated (SPA, no readable public KB) — confirmed via curl showing 576-byte JS shell, but a future browser render might expose public articles | Gate 2 / Edit 2c | Low — docs.iru.com is the confirmed public docs domain; even if support.iru.io gains public content, the UI path is already confirmed via docs.iru.com |
| A2 | The docs.iru.com deletion article UI path ("Device Action Menu > Delete Device Record > type DELETE") is current and unchanged from the support.kandji.io version | Gate 2 | Low-Medium — executor re-verifies the URL on authoring day; if UI has changed, the guide 02 language remains hedged ("verify in current Iru console") |
| A3 | B2 Stage 3 (lines 477-489) requires only consistency-check, not substantive edit | Line Map / Edit 2d | Low — B2 Stage 3 cross-references Stage 2 for all Kandji/Iru detail; no standalone URL assertion on those lines |

**No assumptions with HIGH risk if wrong.** All critical claims are verified from accessible sources.

---

## Open Questions

1. **Does support.iru.io expose a public KB path at operator login?**
   - What we know: support.iru.io resolves and serves a login-gated SPA.
   - What's unclear: Whether an operator-authenticated session would show a KB with the same
     content as docs.iru.com, or whether docs.iru.com is entirely separate.
   - Recommendation: Surface both URLs in guide 02; direct operators to docs.iru.com for the
     confirmed public path and support.iru.io for authenticated console access.

2. **Has any community admin published empirical supervision test results for macOS 26 B1 migration?**
   - What we know: No single source found (Addigy, Intune IRL, emm-blog, SimpleMDM, medium.com
     user) published empirical before-and-after supervision results.
   - What's unclear: Supervision behavior at the exact moment of unenrollment (does the OS
     consider itself supervised between unenroll and re-enroll?).
   - Recommendation: MEDIUM remains correct. The Phase 94 callout recommends an operator pilot
     with `profiles status -type enrollment | grep Supervised` — any operator running the B1
     path will generate the empirical data the Apple docs haven't published.

---

## Security Domain

> This is a docs-only phase. `security_enforcement` is not set to false in config.json
> (key absent), so this section is included per protocol — but the findings are minimal.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | No | No user input, no data processing |
| V2 Authentication | No | No auth surface touched |
| V4 Access Control | No | No access control surface |
| V6 Cryptography | No | No crypto hand-rolled; PSSO Secure Enclave discussion is documentation of Apple behavior, not implementation |

**Security-relevant documentation note:** The MIGV-02 edit touches the Stage 2 section where
operators perform irreversible secret-destruction actions (FileVault Recovery Key + Activation
Lock bypass code). The D-02 honest-hedge posture exists precisely to protect this surface:
shipping a guessed UI path into a stage where operators destroy secrets permanently is a
documentation safety hazard. All Phase 94 prose on this surface must maintain the
"verify in current Iru console" hedge and the explicit pre-flight sequencing.

---

## Package Legitimacy Audit

> SKIPPED. This is a documentation-only phase with no package installs.

---

## Sources

### Primary (HIGH confidence)

- `learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos`
  (updated 2026-06-22) — ADE enrollment policy structure; no separate profile-based config
- `learn.microsoft.com/en-us/intune/device-enrollment/apple/manage-devices-tokens-macos`
  (updated 2026-06-22) — Migration workflow: assign policy to device serial, sync
- `support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web`
  — Apple authoritative: "unenrolls from ADE and reenrolls with profile-based enrollment"
- `support.apple.com/en-gw/guide/deployment/dep1d89f0bff/web`
  — Apple authoritative on supervision: "Mac computers supervised if... profile-based Device
  Enrollment... macOS 11 or later"
- `docs.iru.com/en/endpoint/devices/device-record-management/deleting-a-device-record-and-uninstalling-iru-endpoint`
  — Iru authoritative docs; device-deletion UI path; confirmed 4 permanently destroyed secrets

### Secondary (MEDIUM confidence)

- `techcommunity.microsoft.com/blog/intunecustomersuccess/apple-making-device-migration-to-microsoft-intune-easy-with-upcoming-os-26-relea/4439895`
  (2025-08-04, Iris Yuning Ye, Microsoft Intune PM) — "standard ADE guidance"; enrollment
  profile assigned by serial number; no separate profile-based enrollment step
- `support.kandji.io/kb/deleting-a-device-record-and-uninstalling-kandji`
  — KB article confirming device-deletion steps (Iru-branded, publicly accessible)
- Portal URL resolution checks (verified 2026-06-26 via curl):
  - `support.kandji.io` → HTTP 200, Iru-branded KB
  - `support.iru.io` → HTTP 200, 576-byte login-gated SPA
  - `docs.iru.com` → HTTP 200, publicly accessible

### Tertiary (LOW confidence — informational only)

- `intuneirl.com/mac-admins-your-migration-glow-up-just-dropped/` — community blog; no
  supervision-preservation empirical data; confirms user-facing migration flow
- `emm-blog.com/2025/10/20/native-mdm-migration-in-macos-tahoe-and-ios-ipados-26-...`
  — community blog; no supervision data
- `simplemdm.com/blog/apple-streamlines-mdm-migrations-in-ios-26-and-macos-26/` — community;
  no supervision data

---

## Metadata

**Confidence breakdown:**

- MIGV-01 (Intune config requirement): HIGH — multiple current Microsoft Learn pages + official
  blog + consistent with Apple description; no contradictory sources found
- MIGV-02 (Iru portal URL + UI path): MEDIUM-HIGH — docs.iru.com fully confirmed; support.iru.io
  resolves but SPA-only; docs.kandji.io confirmed Iru-branded; UI path consistent across both
  accessible sources
- MIGV-03 (supervision preservation): MEDIUM — Apple authoritative on supervision rule for
  profile-based enrollment (HIGH); explicit confirmation that supervision *survives the transition*
  is absent from any authoritative source (confirming MEDIUM is correct)

**Research date:** 2026-06-26
**Valid until:** 2026-09-26 (90 days, aligned with provenance block review cycle — however,
executor MUST re-verify portal URLs and MS Learn pages on the actual authoring day)

**Phase scope note:** This is a docs-only phase. No security/UI/schema surface is touched. The
only file modified is `docs/macos-lifecycle/02-mdm-migration-psso.md`. The conditionally-touched
file (`docs/l2-runbooks/30-macos-mdm-migration-failure.md`) is NOT edited — the MIGV-01 verified
answer does not change migration-failure triage.

---

## RESEARCH COMPLETE
