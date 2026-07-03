---
phase: 101-802-1x-foundation-glossary-eap-methods-cert-delivery
reviewed: 2026-06-29T12:00:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - docs/_glossary-network.md
  - docs/admin-setup-8021x/00-overview.md
  - docs/admin-setup-8021x/01-eap-method-overview.md
  - docs/admin-setup-8021x/02-cert-delivery-foundation.md
  - docs/_glossary.md
  - docs/_glossary-macos.md
  - docs/_glossary-android.md
  - docs/_glossary-linux.md
findings:
  critical: 1
  warning: 3
  info: 2
  total: 6
status: issues_found
---

# Phase 101: Code Review Report

**Reviewed:** 2026-06-29T12:00:00Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Reviewed the new 802.1X foundation documentation set: a platform-neutral network-authentication glossary (`_glossary-network.md`), an admin-setup folder overview, an EAP method overview, a certificate-delivery foundation guide, and the four platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md`) that received reciprocal see-also banners.

The set is largely sound against the mandated checklist:

- **Cert-delivery ordering rule** (trusted-root → SCEP/PKCS client cert → 802.1X network profile) is stated correctly and prominently in a CRITICAL callout (`02-cert-delivery-foundation.md:37-45`).
- **No example disables server validation** anywhere; the only relevant text (`01-eap-method-overview.md:93`) is a security note instructing admins to *enable* it.
- **EKU OID** `1.3.6.1.5.5.7.3.2` (Client Authentication) is correct in all three occurrences.
- **All 13 glossary terms resolve**, and the internal anchors checked across the four new files (`#inner-outer-identity`, `#canonical-scope-callout`, `#scep`, `#trusted-root`, `#eku-client-authentication`, `#8021x`, `#server-name-validation`, etc.) all resolve to real headings with correct GitHub slugs.
- **No `_glossary-ios.md` reference** exists; the four platform-glossary banners all point to `_glossary-network.md`.
- **TEAP** is correctly scoped as a Windows-wired-only awareness item, not a co-equal method; the three methods are otherwise framed co-equally.

However, the EAP-method comparison table contains a wrong platform-capability cell that contradicts its own footnote (Critical), and three cross-file inconsistencies / copy-paste artifacts degrade matrix accuracy and reader trust (Warnings).

## Critical Issues

### CR-01: EAP comparison table marks PEAP-MSCHAPv2 as supported on Linux, contradicting its own footnote and the cert matrix

**File:** `docs/admin-setup-8021x/01-eap-method-overview.md:149` (footnote at `:152`)
**Issue:** The "Intune support" row lists `Win / macOS / iOS / Android / Linux*` for **both** EAP-TLS **and** PEAP-MSCHAPv2:

```
| Intune support | Win / macOS / iOS / Android / Linux* | Win / macOS / iOS / Android / Linux* | Win / macOS / iOS / Android |
```

But the asterisk footnote (`:152`) explicitly states: *"Linux: script-based EAP-TLS only via nmcli; **PEAP-MSCHAPv2 and EAP-TTLS on Linux are not documented in Microsoft Learn and are out of scope** for this guide set."* The PEAP-MSCHAPv2 column therefore asserts Linux support that the footnote — and the cert matrix in `02-cert-delivery-foundation.md:129` (Linux = no Intune profile, script-based only) — explicitly deny. An admin scanning the capability table would conclude Intune can deliver a PEAP-MSCHAPv2 profile to Linux, which is false. The `Linux*` token belongs only in the EAP-TLS column.
**Fix:** Remove `/ Linux*` from the PEAP-MSCHAPv2 cell so the row reads:
```
| Intune support | Win / macOS / iOS / Android / Linux* | Win / macOS / iOS / Android | Win / macOS / iOS / Android |
```
(EAP-TLS keeps the asterisk; PEAP-MSCHAPv2 and EAP-TTLS match — neither is in scope on Linux.)

## Warnings

### WR-01: PKCS glossary entry is internally inconsistent and contradicts the canonical cert matrix

**File:** `docs/_glossary-network.md:86`
**Issue:** The PKCS term enumerates support as *"PKCS client certificates are supported for 802.1X on **Windows and Android Enterprise** (Wi-Fi + Wired for Windows; Wi-Fi only for Android),"* then adds *"PKCS certificates are NOT supported for wired profiles on macOS or iOS/iPadOS."* The first clause omits macOS/iOS entirely, while the second clause's "...for wired profiles on macOS or iOS" implies PKCS Wi-Fi **is** supported there. This self-contradicts and disagrees with the canonical matrix (`02-cert-delivery-foundation.md:126-127`), which shows macOS PKCS = "Wi-Fi only" and iOS/iPadOS PKCS = "Wi-Fi only" (supported for Wi-Fi). A reader relying on the glossary alone could wrongly conclude PKCS Wi-Fi certs cannot be deployed to macOS/iOS.
**Fix:** Align the enumeration with the matrix, e.g.: *"PKCS client certificates are supported for 802.1X Wi-Fi on Windows, macOS, iOS/iPadOS, and Android Enterprise, and additionally for wired profiles on Windows. PKCS is NOT supported for wired profiles on macOS or iOS/iPadOS (use SCEP for those), and is not available for Linux."*

### WR-02: iOS/iPadOS PFX Import matrix cell carries a meaningless "non-AOSP" qualifier (Android copy-paste artifact)

**File:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md:127`
**Issue:** The iOS/iPadOS row's "PFX Import / PKCS Imported" cell reads `Wi-Fi only, non-AOSP`. AOSP (Android Open Source Project) is an Android-only distinction; it is nonsensical applied to iOS/iPadOS and is clearly copied from the Android row (`:128`, which legitimately uses "non-AOSP"). The capability ("Wi-Fi only") is correct, but the stray qualifier undermines matrix accuracy.
**Fix:** Change the iOS/iPadOS PFX Import cell to `Wi-Fi only` (drop `, non-AOSP`).

### WR-03: "PFX Import" vs "PKCS Imported" terminology conflation between the section text and the matrix column

**File:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md:83-87` vs matrix `:123-128`
**Issue:** The "PFX Import (PKCS Imported)" section states the profile type is *"unique to Windows wired network configuration"* and *"the only platform that exposes this profile type in the wired profile cert picker."* Yet the matrix column titled "PFX Import / PKCS Imported" shows macOS, iOS/iPadOS, and Android with "Wi-Fi only" support in that same column. The two distinct things — PFX Import (Windows wired-only) and the cross-platform PKCS Imported (PFX) Wi-Fi profile — are merged into one slashed column, so the prose's "unique to Windows" claim reads as directly contradicting the matrix. The reconciliation ("...in the wired profile cert picker") is buried and easy to miss.
**Fix:** Either split the matrix column into "PFX Import (Windows wired)" and "PKCS Imported (Wi-Fi)", or add a one-line note under the matrix clarifying that "PFX Import" = Windows wired profile cert picker only, while "PKCS Imported" Wi-Fi profiles exist cross-platform.

## Info

### IN-01: Inconsistent inline freshness-stamp placement across the new guide files

**File:** `docs/admin-setup-8021x/02-cert-delivery-foundation.md:108` (present); `00-overview.md` and `01-eap-method-overview.md` (absent)
**Issue:** `02-cert-delivery-foundation.md` carries an inline `> *Freshness: last verified 2026-06-29 against Microsoft Learn. Review by 2026-09-27.*` stamp, while the sibling guides `00-overview.md` and `01-eap-method-overview.md` rely on YAML frontmatter (`last_verified` / `review_by`) only. All three share identical frontmatter dates, so this is cosmetic, but the placement is inconsistent within the same folder.
**Fix:** Either add the inline freshness stamp to `00` and `01`, or remove it from `02` and standardize on frontmatter only.

### IN-02: "Highest assurance posture" criterion slightly undercuts the co-equal framing of EAP-TLS

**File:** `docs/admin-setup-8021x/01-eap-method-overview.md:69`
**Issue:** EAP-TLS's "When to Choose" list includes *"Highest assurance posture is needed."* While factually defensible (mutual-cert auth), this phrasing reads as a soft ranking and is the only "When to Choose" bullet across the three methods that frames a method as superior rather than situational. It mildly tensions with the document's stated "no method is ranked or recommended as a default" (`:17`).
**Fix:** Reframe situationally, e.g. *"Passwordless, certificate-only authentication is a requirement"* — keeping the criterion descriptive rather than comparative.

---

_Reviewed: 2026-06-29T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
