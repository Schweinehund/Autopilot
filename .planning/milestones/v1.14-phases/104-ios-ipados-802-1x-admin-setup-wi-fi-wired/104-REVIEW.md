---
phase: 104-ios-ipados-802-1x-admin-setup-wi-fi-wired
reviewed: 2026-06-30T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/admin-setup-8021x/05-ios.md
  - docs/admin-setup-8021x/00-overview.md
findings:
  critical: 0
  warning: 1
  info: 3
  total: 4
status: issues_found
---

# Phase 104: Code Review Report

**Reviewed:** 2026-06-30
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed `docs/admin-setup-8021x/05-ios.md` (iOS/iPadOS 802.1X admin-setup guide) and `docs/admin-setup-8021x/00-overview.md` (navigation entry) against the twelve locked decisions in `104-CONTEXT.md`, the live-verified facts in `104-RESEARCH.md`, and the explicit defect checklist from the review scope.

The implementation satisfies every prescribed BLOCKER check: MAC-randomization is plain prose (D-02 compliant), not a callout; the three-profiles model is structural prose (D-05 compliant), not a callout; the canonical phrasing "Disable MAC address randomization: Yes" (D-04) is used correctly and the forbidden STACK ~l.226 alternative does not appear; the wired PEAP and EAP-TTLS inner-method cells are correctly hedged as cert-only "(via Templates path)" and do not assert MS-CHAPv2/PAP/CHAP as selectable inner methods (D-12); no macOS deployment-channel WARNING, no Network Interface selector table, no Windows-only tokens (dot3svc, TEAP, KB5014754), no Apple Configurator reference, and no DANGER callout appear in the file. The PEAP "What breaks" WARNING blockquote is present in the Wi-Fi PEAP context (D-10 compliant). The wired SCEP-only NOTE blockquote is present (standard constraint callout). All relative links to `01-`, `02-`, and `../_glossary-network.md` are structurally valid. Both files carry well-formed YAML front-matter with `last_verified` and `review_by` fields. The `00-overview.md` placeholder is correctly narrowed to "6--7", item 5 links `05-ios.md`, and items 3 and 4 are undamaged.

One WARNING is filed for a technical documentation inaccuracy in the Wi-Fi EAP-TTLS client-authentication row. Three informational findings cover minor precision gaps.

---

## Warnings

### WR-01: Wi-Fi EAP-TTLS `Client authentication` row omits certificate auth option

**File:** `docs/admin-setup-8021x/05-ios.md:71`

**Issue:** The Wi-Fi per-EAP matrix "Client authentication" cell for EAP-TTLS reads only `Username and Password`. The live-verified authoritative field map (RESEARCH §3, MS Learn `ref-wifi-settings-apple` iOS/iPadOS pivot, 2026-06-23, verified 2026-06-30) states the authentication method for iOS Wi-Fi EAP-TTLS is `Username and Password (inner: PAP/CHAP/MS-CHAP/MS-CHAPv2) OR Certificates / Derived credential`. The certificate option (SCEP, PKCS, Derived credential) is omitted. An admin implementing certificate-based EAP-TTLS on iOS Wi-Fi -- a valid Intune configuration -- finds no guidance in this row and may incorrectly conclude the method requires switching to EAP-TLS, or may configure EAP-TTLS with the wrong credential type. This is the only place in the guide where the EAP-TTLS Wi-Fi client-auth options appear; the EAP-TLS row documents cert auth for that method only, not for EAP-TTLS.

**Fix:** Expand the EAP-TTLS `Client authentication` cell in the Wi-Fi matrix to reflect both paths:

```markdown
| Client authentication | Certificates: SCEP, PKCS, or Derived credential (see note) | Username and Password (implicit MS-CHAPv2; no inner-method selector) | Username and Password (inner: PAP / CHAP / MS-CHAP / MS-CHAP v2); or Certificates: SCEP, PKCS, or Derived credential |
```

The Inner method row (line 72) already correctly lists `PAP / CHAP / MS-CHAP / MS-CHAP v2` and requires no change -- that row is accurate for the username/password path. The cert-auth path has no inner method selector (parallel to EAP-TLS).

---

## Info

### IN-01: Wildcard server-name notation documented only in EAP-TLS column

**File:** `docs/admin-setup-8021x/05-ios.md:69`

**Issue:** The `Certificate server names` row documents `(wildcard suffix supported, e.g. \`*.contoso.com\`)` in the EAP-TLS column only. The PEAP and EAP-TTLS columns show only `RADIUS FQDN or CN suffix` without the wildcard annotation. Wildcard CN suffixes are supported by the `Certificate server names` field for all EAP types on iOS/iPadOS (the field behavior is per-profile, not per-EAP-method). An admin implementing PEAP or EAP-TTLS who reads only their column may not know wildcards are valid, and may unnecessarily enumerate individual FQDNs rather than using a `*.contoso.com` suffix. The same asymmetry appears in the wired matrix (line 128).

**Fix:** Add the wildcard note to the PEAP and EAP-TTLS columns in both matrices, or add a single prose note below the matrix header stating that wildcard CN suffixes are supported for all three EAP methods:

```markdown
> Certificate server names accepts a wildcard CN suffix (e.g. `*.contoso.com`) for all three EAP types.
```

Alternatively, standardize all three cells in the `Certificate server names` row to read `RADIUS FQDN or CN suffix (wildcard suffix supported, e.g. \`*.contoso.com\`)`.

---

### IN-02: Wired PEAP cross-reference anchor targets Wi-Fi section top, not WARNING callout

**File:** `docs/admin-setup-8021x/05-ios.md:134`

**Issue:** The D-11 cross-reference paragraph in the Wired section links to `#wi-fi` -- the auto-slug for `## Wi-Fi` -- rather than to the PEAP WARNING callout itself. Because the WARNING callout has no Markdown heading of its own, no tighter anchor exists; but a wired-only reader following the link lands at the top of the Wi-Fi section and must scan visually to find the callout (which is several screens below the `## Wi-Fi` heading, after the MAC-randomization note and the full Wi-Fi matrix). The D-11 guardrail specifies "a one-line cross-reference to the Wi-Fi PEAP 'What breaks' callout" -- the intent is that a wired reader can locate the callout without hunting.

**Fix:** Add a short Markdown heading immediately above the WARNING callout to create a linkable anchor, then update the wired cross-reference to point to that heading:

In the Wi-Fi section, add before line 75:
```markdown
#### PEAP inner authentication constraint
```
This generates `#peap-inner-authentication-constraint`.

Then update line 134:
```markdown
...see the [PEAP inner authentication constraint (Wi-Fi section)](#peap-inner-authentication-constraint).
```

This makes the D-11 cross-reference precise and navigable without requiring the reader to scan the Wi-Fi section.

---

### IN-03: `(see note)` cross-reference in EAP-TLS cell is unclickable and imprecise

**File:** `docs/admin-setup-8021x/05-ios.md:71`

**Issue:** The EAP-TLS `Client authentication` cell reads `Certificates: SCEP, PKCS, or Derived credential (see note)`. The referenced "note" is the bold-prose paragraph at lines 90-95 (`**Client certificate options for EAP-TLS...**`), which is not a Markdown heading and therefore has no auto-slug anchor. The `(see note)` text is not a hyperlink, so a reader cannot click to navigate. In a rendered Markdown page, the reader must scroll down to find the cert-options paragraph. This is a navigability gap for a quick-reference table.

**Fix:** Either convert the bold paragraph to a proper Markdown heading to create an anchor:
```markdown
#### EAP-TLS client certificate options (Wi-Fi)
```
and update the cell to `Certificates: SCEP, PKCS, or Derived credential (see [cert options below](#eap-tls-client-certificate-options-wi-fi))`; or inline the three cert options directly in the cell -- they are short enough:
```markdown
| Client authentication | SCEP, PKCS, or Derived credential | ... | ... |
```
and remove the separate paragraph, consolidating the cert-options detail into the prose at lines 95-96 which already links to `02-cert-delivery-foundation.md`.

---

_Reviewed: 2026-06-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
