# Phase 59 Collision-Term Matrix

**Captured:** 2026-05-05
**Owner:** Plan 59-05 (per D-16 plan-time matrix selection mandate)
**Purpose:** Locked collision-term matrix for CLEAN-08 see-also reciprocity. This artifact lists which cross-platform-equivalent terms exist in which of the 4 glossaries; basis for V-59-20..23 bidirectional reciprocity assertions in Plan 59-08 validator (`scripts/validation/check-phase-59.mjs`).

## Methodology

Per D-16, matrix sourced from:
1. Phase 49 D-13 9 LIN-02 absent-concept terms (Supervision, DPC, Work Profile, COBO/COPE/WPCO, MGP, ZTE, VPP, Hardware Hash, ABM)
2. Cross-platform encryption-compliance terms (dm-crypt / LUKS — Linux-only H3s; BitLocker and FileVault absent as H3s from Windows and macOS glossaries respectively)
3. Cross-platform CA-channel pair (Web-app CA Linux ↔ MAM-WE iOS per CONTEXT D-16 "compliance-lite" analogs)
4. Enrollment-channel pairs: ADE (Apple) ↔ ZTE (Android); Setup-flow pair OOBE (Windows) ↔ Setup Assistant (macOS)
5. `docs/reference/linux-capability-matrix.md` Cross-Platform Equivalences section (lines 71-93)
6. Direct H3 inventory of all 4 glossary files (38 Windows H3s + 11 macOS H3s + 24 Android H3s + 30 Linux H3s)

Per D-17, reciprocity is BIDIRECTIONAL and TRANSITIVELY COMPLETE: every glossary listing a term references EVERY OTHER glossary listing the term.

Per D-18, the 4-file equivalent applies — `_glossary-macos.md` IS the iOS glossary per REQUIREMENTS.md:144.

**Selection criterion:** A term qualifies for see-also treatment if an H3 entry for it (or a direct functional equivalent) exists in ≥2 of the 4 glossaries. Terms in only 1 glossary that merely reference other platforms via prose already satisfy navigation; see-also lines are not needed for 1-glossary terms.

**Note on dm-crypt / encryption triple:** `### dm-crypt` and `### LUKS` exist in Linux only. Windows `_glossary.md` does not contain `### BitLocker` and macOS `_glossary-macos.md` does not contain `### FileVault` as H3 entries. The Linux dm-crypt blockquote already mentions BitLocker and FileVault in prose; no reciprocal see-also can be appended because there is no target H3 in the other glossaries. These terms are excluded from the reciprocity pairs but listed here for audit completeness.

## Matrix

Columns mark which glossaries list the term (✓ = H3 entry exists; — = not present as H3 in this glossary).

| Term (canonical) | Windows (`_glossary.md`) | Apple (`_glossary-macos.md`) | Android (`_glossary-android.md`) | Linux (`_glossary-linux.md`) | Cross-platform Equivalent / Notes |
|------------------|--------------------------|------------------------------|----------------------------------|------------------------------|----------------------------------|
| **Supervision** | — | ✓ (`### Supervision`) | ✓ (`### Supervision` — disambiguation callout) | ✓ (`### Supervision` — callout-only redirect) | Apple supervision = permanent per-device iOS/iPadOS gate; Android and Linux have callout H3s redirecting to macOS definition |
| **Zero-Touch Enrollment (ZTE)** | — | — | ✓ (`### Zero-Touch Enrollment`) | ✓ (`### Zero-Touch Enrollment (ZTE)` — callout-only) | Android ZTE is the native; Linux callout redirects to Android; macOS ADE is different H3 name; Windows Autopilot is the Windows analog (H2-level, not H3) |
| **ADE** (Automated Device Enrollment) | — | ✓ (`### ADE`) | — | — | macOS/iOS zero-touch enrollment; Android ZTE is the closest functional analog per existing `### Zero-Touch Enrollment` prose |
| **COBO / COPE / WPCO** (Android ownership modes) | — | — | ✓ (`### COBO`, `### COPE`, `### WPCO` — 3 separate H3s) | ✓ (`### COBO / COPE / WPCO` — single combined callout) | Android-specific ownership taxonomy; Linux callout redirects to Android definitions |
| **DPC** (Device Policy Controller) | — | — | ✓ (`### DPC`) | ✓ (`### DPC (Device Policy Controller)` — callout-only) | Android-specific on-device management agent; Linux callout redirects to Android definition |
| **Work Profile** | — | — | ✓ (`### Work Profile`) | ✓ (`### Work Profile` — callout-only) | Android Enterprise containerized partition; Linux callout redirects to Android definition |
| **ABM** (Apple Business Manager) | — | ✓ (`### ABM`) | — | ✓ (`### ABM (Apple Business Manager)` — callout-only) | Apple procurement + enrollment portal; Linux callout redirects to macOS definition |
| **VPP** (Volume Purchase Program) | — | ✓ (`### VPP`) | — | ✓ (`### VPP (Volume Purchase Program)` — callout-only) | Apple bulk app licensing; Linux callout redirects to macOS definition |
| **Managed Google Play (MGP)** | — | — | ✓ (`### Managed Google Play`) | ✓ (`### Managed Google Play (MGP)` — callout-only) | Android enterprise app distribution; Linux callout redirects to Android definition |
| **Hardware Hash** | ✓ (`### Hardware hash`) | — | — | ✓ (`### Hardware Hash` — callout-only) | Windows Autopilot device-identification primitive; Linux callout redirects to Windows definition |
| **Corporate Identifiers** | ✓ (`### Corporate identifiers`) | — | ✓ (`### Corporate Identifiers`) | — | Pre-enrollment corporate tagging mechanism on both Windows (hardware hash alternative) and Android (IMEI/serial); semantically equivalent enrollment-time tagging pattern |
| **Web-app CA / MAM-WE** (compliance-lite pair) | — | ✓ (`### MAM-WE`) | — | ✓ (`### Web-app CA`) | Both as "compliance-lite" patterns per CONTEXT D-16: Linux web-app CA = browser-challenge enforcement without device-level CA; iOS MAM-WE = app-layer data protection without MDM enrollment |
| **OOBE / Setup Assistant** (enrollment setup flow) | ✓ (`### OOBE`) | ✓ (`### Setup Assistant`) | — | — | First-run setup flow pair: Windows OOBE (Autopilot enrollment entry) ↔ macOS Setup Assistant (ADE enrollment entry); existing macOS blockquote mentions OOBE in prose |
| **ESP / Await Configuration** (enrollment hold gate) | ✓ (`### ESP`) | ✓ (`### Await Configuration`) | — | — | Enrollment gate pair: Windows ESP (holds desktop until policies applied) ↔ macOS Await Configuration (holds Setup Assistant until config confirmed); existing macOS blockquote mentions ESP in prose |

### Reference-only terms (H3 in 1 glossary only — listed for completeness; no see-also pairs generated)

| Term | Present in | Notes |
|------|-----------|-------|
| dm-crypt | Linux only (`### dm-crypt`) | BitLocker (Windows) and FileVault (macOS) are mentioned in prose but have no H3 entries in their respective glossaries |
| LUKS | Linux only (`### LUKS`) | Related to dm-crypt; same prose-reference situation |
| BYOD | Android only (`### BYOD`) | Windows MAM-WE and iOS Account-Driven User Enrollment are referenced in prose; those ARE H3s in other glossaries — the Android BYOD blockquote gets a see-also line referencing macOS `#account-driven-user-enrollment` |
| User Enrollment | Android only (`### User Enrollment`) | AOSP-specific concept; macOS Account-Driven User Enrollment is referenced in prose — blockquote gets a see-also line referencing macOS |
| Account-Driven User Enrollment | macOS only (`### Account-Driven User Enrollment`) | Referenced by Android `### BYOD` and `### User Enrollment`; gets see-also lines back to Android |

## Anchor Map

For each term in the matrix with ≥2 ✓ marks, the anchor map records the H3 GFM-derived slug in each listing glossary.

| Term | Glossary | H3 Heading (verbatim) | GFM Slug |
|------|----------|----------------------|----------|
| Supervision | `_glossary-macos.md` | `### Supervision` | `#supervision` |
| Supervision | `_glossary-android.md` | `### Supervision` | `#supervision` |
| Supervision | `_glossary-linux.md` | `### Supervision` | `#supervision` |
| Zero-Touch Enrollment | `_glossary-android.md` | `### Zero-Touch Enrollment` | `#zero-touch-enrollment` |
| Zero-Touch Enrollment | `_glossary-linux.md` | `### Zero-Touch Enrollment (ZTE)` | `#zero-touch-enrollment-zte` |
| ADE | `_glossary-macos.md` | `### ADE` | `#ade` |
| COBO | `_glossary-android.md` | `### COBO` | `#cobo` |
| COPE | `_glossary-android.md` | `### COPE` | `#cope` |
| WPCO | `_glossary-android.md` | `### WPCO` | `#wpco` |
| COBO/COPE/WPCO | `_glossary-linux.md` | `### COBO / COPE / WPCO` | `#cobo--cope--wpco` |
| DPC | `_glossary-android.md` | `### DPC` | `#dpc` |
| DPC | `_glossary-linux.md` | `### DPC (Device Policy Controller)` | `#dpc-device-policy-controller` |
| Work Profile | `_glossary-android.md` | `### Work Profile` | `#work-profile` |
| Work Profile | `_glossary-linux.md` | `### Work Profile` | `#work-profile` |
| ABM | `_glossary-macos.md` | `### ABM` | `#abm` |
| ABM | `_glossary-linux.md` | `### ABM (Apple Business Manager)` | `#abm-apple-business-manager` |
| VPP | `_glossary-macos.md` | `### VPP` | `#vpp` |
| VPP | `_glossary-linux.md` | `### VPP (Volume Purchase Program)` | `#vpp-volume-purchase-program` |
| Managed Google Play | `_glossary-android.md` | `### Managed Google Play` | `#managed-google-play` |
| Managed Google Play | `_glossary-linux.md` | `### Managed Google Play (MGP)` | `#managed-google-play-mgp` |
| Hardware Hash | `_glossary.md` | `### Hardware hash` | `#hardware-hash` |
| Hardware Hash | `_glossary-linux.md` | `### Hardware Hash` | `#hardware-hash` |
| Corporate Identifiers | `_glossary.md` | `### Corporate identifiers` | `#corporate-identifiers` |
| Corporate Identifiers | `_glossary-android.md` | `### Corporate Identifiers` | `#corporate-identifiers` |
| Web-app CA | `_glossary-linux.md` | `### Web-app CA` | `#web-app-ca` |
| MAM-WE | `_glossary-macos.md` | `### MAM-WE` | `#mam-we` |
| OOBE | `_glossary.md` | `### OOBE` | `#oobe` |
| Setup Assistant | `_glossary-macos.md` | `### Setup Assistant` | `#setup-assistant` |
| ESP | `_glossary.md` | `### ESP` | `#esp` |
| Await Configuration | `_glossary-macos.md` | `### Await Configuration` | `#await-configuration` |
| Account-Driven User Enrollment | `_glossary-macos.md` | `### Account-Driven User Enrollment` | `#account-driven-user-enrollment` |
| BYOD | `_glossary-android.md` | `### BYOD` | `#byod` |
| User Enrollment | `_glossary-android.md` | `### User Enrollment` | `#user-enrollment` |

## Reciprocity Pairs

For each term in the matrix with ≥2 H3 occurrences, list ALL bidirectional pairs that must be appended (Cartesian product of listing glossaries). This is the validator V-59-22 bidirectional pair check input.

| Term | Source Glossary | Source H3 Anchor | Target Glossary | Target H3 Anchor |
|------|-----------------|------------------|-----------------|------------------|
| Supervision | `_glossary-macos.md` | `#supervision` | `_glossary-android.md` | `#supervision` |
| Supervision | `_glossary-macos.md` | `#supervision` | `_glossary-linux.md` | `#supervision` |
| Supervision | `_glossary-android.md` | `#supervision` | `_glossary-macos.md` | `#supervision` |
| Supervision | `_glossary-android.md` | `#supervision` | `_glossary-linux.md` | `#supervision` |
| Supervision | `_glossary-linux.md` | `#supervision` | `_glossary-macos.md` | `#supervision` |
| Supervision | `_glossary-linux.md` | `#supervision` | `_glossary-android.md` | `#supervision` |
| ZTE ↔ Linux ZTE callout | `_glossary-android.md` | `#zero-touch-enrollment` | `_glossary-linux.md` | `#zero-touch-enrollment-zte` |
| ZTE ↔ Linux ZTE callout | `_glossary-linux.md` | `#zero-touch-enrollment-zte` | `_glossary-android.md` | `#zero-touch-enrollment` |
| COBO ↔ Linux callout | `_glossary-android.md` | `#cobo` | `_glossary-linux.md` | `#cobo--cope--wpco` |
| COBO ↔ Linux callout | `_glossary-linux.md` | `#cobo--cope--wpco` | `_glossary-android.md` | `#cobo` |
| COPE ↔ Linux callout | `_glossary-android.md` | `#cope` | `_glossary-linux.md` | `#cobo--cope--wpco` |
| COPE ↔ Linux callout | `_glossary-linux.md` | `#cobo--cope--wpco` | `_glossary-android.md` | `#cope` |
| WPCO ↔ Linux callout | `_glossary-android.md` | `#wpco` | `_glossary-linux.md` | `#cobo--cope--wpco` |
| WPCO ↔ Linux callout | `_glossary-linux.md` | `#cobo--cope--wpco` | `_glossary-android.md` | `#wpco` |
| DPC | `_glossary-android.md` | `#dpc` | `_glossary-linux.md` | `#dpc-device-policy-controller` |
| DPC | `_glossary-linux.md` | `#dpc-device-policy-controller` | `_glossary-android.md` | `#dpc` |
| Work Profile | `_glossary-android.md` | `#work-profile` | `_glossary-linux.md` | `#work-profile` |
| Work Profile | `_glossary-linux.md` | `#work-profile` | `_glossary-android.md` | `#work-profile` |
| ABM | `_glossary-macos.md` | `#abm` | `_glossary-linux.md` | `#abm-apple-business-manager` |
| ABM | `_glossary-linux.md` | `#abm-apple-business-manager` | `_glossary-macos.md` | `#abm` |
| VPP | `_glossary-macos.md` | `#vpp` | `_glossary-linux.md` | `#vpp-volume-purchase-program` |
| VPP | `_glossary-linux.md` | `#vpp-volume-purchase-program` | `_glossary-macos.md` | `#vpp` |
| Managed Google Play | `_glossary-android.md` | `#managed-google-play` | `_glossary-linux.md` | `#managed-google-play-mgp` |
| Managed Google Play | `_glossary-linux.md` | `#managed-google-play-mgp` | `_glossary-android.md` | `#managed-google-play` |
| Hardware Hash | `_glossary.md` | `#hardware-hash` | `_glossary-linux.md` | `#hardware-hash` |
| Hardware Hash | `_glossary-linux.md` | `#hardware-hash` | `_glossary.md` | `#hardware-hash` |
| Corporate Identifiers | `_glossary.md` | `#corporate-identifiers` | `_glossary-android.md` | `#corporate-identifiers` |
| Corporate Identifiers | `_glossary-android.md` | `#corporate-identifiers` | `_glossary.md` | `#corporate-identifiers` |
| Web-app CA / MAM-WE | `_glossary-linux.md` | `#web-app-ca` | `_glossary-macos.md` | `#mam-we` |
| Web-app CA / MAM-WE | `_glossary-macos.md` | `#mam-we` | `_glossary-linux.md` | `#web-app-ca` |
| OOBE / Setup Assistant | `_glossary.md` | `#oobe` | `_glossary-macos.md` | `#setup-assistant` |
| OOBE / Setup Assistant | `_glossary-macos.md` | `#setup-assistant` | `_glossary.md` | `#oobe` |
| ESP / Await Configuration | `_glossary.md` | `#esp` | `_glossary-macos.md` | `#await-configuration` |
| ESP / Await Configuration | `_glossary-macos.md` | `#await-configuration` | `_glossary.md` | `#esp` |
| BYOD (Android) ↔ Account-Driven UE (macOS) | `_glossary-android.md` | `#byod` | `_glossary-macos.md` | `#account-driven-user-enrollment` |
| BYOD (Android) ↔ Account-Driven UE (macOS) | `_glossary-macos.md` | `#account-driven-user-enrollment` | `_glossary-android.md` | `#byod` |
| User Enrollment (Android) ↔ Account-Driven UE (macOS) | `_glossary-android.md` | `#user-enrollment` | `_glossary-macos.md` | `#account-driven-user-enrollment` |
| User Enrollment (Android) ↔ Account-Driven UE (macOS) | `_glossary-macos.md` | `#account-driven-user-enrollment` | `_glossary-android.md` | `#user-enrollment` |

**Note on ADE:** `### ADE` in macOS already links to Android `### Zero-Touch Enrollment` via the `_glossary-android.md` prose reference in its `> **Windows equivalent:**` blockquote. We add a see-also line to `### ADE` in macOS referencing Android `#zero-touch-enrollment`, and we add a see-also line to `### Zero-Touch Enrollment` in Android referencing macOS `#ade`.

Additional reciprocity pairs for ADE ↔ ZTE:

| Term | Source Glossary | Source H3 Anchor | Target Glossary | Target H3 Anchor |
|------|-----------------|------------------|-----------------|------------------|
| ADE ↔ ZTE | `_glossary-macos.md` | `#ade` | `_glossary-android.md` | `#zero-touch-enrollment` |
| ADE ↔ ZTE | `_glossary-android.md` | `#zero-touch-enrollment` | `_glossary-macos.md` | `#ade` |

## Estimated see-also line count

| Glossary | Number of see-also lines to append | Notes |
|----------|------------------------------------|-------|
| `_glossary.md` | 4 | NEW `> **Cross-platform note:**` blockquotes for: `### Hardware hash` (→ Linux), `### Corporate identifiers` (→ Android), `### OOBE` (→ macOS Setup Assistant), `### ESP` (→ macOS Await Configuration) |
| `_glossary-macos.md` | 7 | APPENDED inside existing 11 `> **Windows equivalent:**` blockquotes: Account-Driven User Enrollment (→ Android), ADE (→ Android), Await Configuration (already has Windows ref; add back-ref), Setup Assistant (→ Windows), Supervision (→ Android + Linux), ABM (→ Linux), VPP (→ Linux), MAM-WE (→ Linux) |
| `_glossary-android.md` | 9 | APPENDED inside existing 23 `> **Cross-platform note:**` blockquotes: BYOD (→ macOS), User Enrollment (→ macOS), Zero-Touch Enrollment (→ macOS + Linux), COBO (→ Linux), COPE (→ Linux), WPCO (→ Linux), Work Profile (→ Linux), DPC (→ Linux), Corporate Identifiers (→ Windows), Managed Google Play (→ Linux) |
| `_glossary-linux.md` | 9 | APPENDED inside existing callout blockquotes: ABM (→ macOS), COBO/COPE/WPCO (→ Android), DPC (→ Android), Hardware Hash (→ Windows), MGP (→ Android), Supervision (→ macOS), VPP (→ macOS), Work Profile (→ Android), ZTE (→ Android + macOS); also dm-crypt (→ Windows + macOS) and Web-app CA (→ macOS) in existing `> **Cross-platform note:**` blockquotes |

**Total reciprocal pairs validated by V-59-22:** 40 pairs (20 bidirectional relationships × 2 directional pairs each)

This matrix is locked at Plan 59-05 commit-1; Tasks 2 / 3 / 4 / 5 use it as the authoritative input.
