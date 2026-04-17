---
phase: 29-ios-admin-setup-byod-mam
reviewed: 2026-04-17T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - docs/_templates/admin-template-ios.md
  - docs/admin-setup-ios/00-overview.md
  - docs/admin-setup-ios/07-device-enrollment.md
  - docs/admin-setup-ios/08-user-enrollment.md
  - docs/admin-setup-ios/09-mam-app-protection.md
findings:
  critical: 0
  warning: 3
  info: 5
  total: 8
status: issues_found
---

# Phase 29: Code Review Report

**Reviewed:** 2026-04-17
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Phase 29 delivers three new iOS/iPadOS admin-setup guides (Device Enrollment, account-driven User Enrollment, MAM-WE App Protection Policies), a restructured overview that now routes across all four iOS admin paths, and a template extension introducing the privacy-limit callout pattern. Against the Phase 29 D-constraints and the 29-VALIDATION structural checks, the artefacts are in very good shape: all grep-based validation rows pass (exactly 7 privacy-limit callouts in 08 with correct link target, zero glyphs in any callout, zero Android references in 09, Portal Navigation Note preserved verbatim in the overview, correct frontmatter dates, shared Intune Enrollment Restrictions section present in 00 and cross-linked from 07/08, capabilities-without-supervision table at top of 07, Mermaid diagram restructured so non-ADE paths are parallel alternatives rather than downstream of ADE prereqs).

Findings cluster around technical accuracy and prose ambiguity in 08-user-enrollment.md, where four references to "Setup Assistant" describe a flow that in fact runs in the iOS Settings app on an already-set-up personal device (Setup Assistant is ADE-specific), and one Verification step points users to a Settings menu ("Accounts & Passwords") that was removed in iOS 13 and is not present on any iOS version in-scope for this guide (iOS 15+). 07-device-enrollment.md contains one web-enrollment URL that is probably the wrong endpoint for end users (a discovery-service endpoint rather than the user-facing enrollment URL). The rest of the findings are minor consistency and clarity items.

No critical, security, or D-constraint-violating issues found. All three warnings and five info items are narrowly scoped to individual lines; fixes are localized edits, not structural rework.

## Warnings

### WR-01: Account-driven User Enrollment does not run in Setup Assistant

**File:** `docs/admin-setup-ios/08-user-enrollment.md:69`, `:71`, `:164`, `:166`, `:168`, `:169`
**Issue:** Five lines describe the account-driven User Enrollment flow as running in "Setup Assistant" (e.g., "Apple's Setup Assistant fetches this resource without authentication", "Setup Assistant error", "Setup Assistant rejects the discovery response", "Setup Assistant rejects sign-in; enrollment cannot proceed", "Setup Assistant rejects credentials", "Setup Assistant has no path option"). Setup Assistant is specifically the iOS first-run/out-of-box wizard and is used by ADE (not User Enrollment). Account-driven User Enrollment is initiated on an already-set-up device from **Settings > General > VPN & Device Management > Sign in to Work or School Account** (which then invokes the account-based enrollment flow handled by iOS and `AccountAuthenticationPlugin`). The sibling Phase 26 guide at `docs/ios-lifecycle/00-enrollment-overview.md:66` correctly describes this as "The user enrolls by adding a work account via **Settings > VPN & Device Management**", so there is an internal contradiction between 08 and the canonical path overview it cross-references.

An admin following 08 and encountering an enrollment failure may waste time checking Setup Assistant behavior, DEP sync, or ADE profile assignment — all irrelevant to an account-driven User Enrollment flow.

**Fix:** Replace every occurrence of "Setup Assistant" in 08 with terminology consistent with the Settings-app-initiated flow. Suggested substitutions:

```
Line 69: "Apple's Setup Assistant fetches this resource..."
      -> "The iOS enrollment client fetches this resource..."

Line 71: "...fails at the 'Sign in with Managed Apple ID' step with a generic
          'we couldn't sign you in' error. Symptom appears in: device (Setup
          Assistant error)..."
      -> "...with a generic 'we couldn't sign you in' error. Symptom appears
          in: device (iOS shows the sign-in error inline in the Settings
          enrollment flow)..."

Line 164: "Setup Assistant rejects the discovery response"
       -> "the iOS enrollment flow rejects the discovery response"

Line 166: "Setup Assistant rejects sign-in; enrollment cannot proceed"
       -> "iOS rejects the sign-in with 'this Apple ID cannot be used here';
           enrollment cannot proceed"

Line 168: "Setup Assistant rejects credentials"
       -> "iOS rejects the Managed Apple ID sign-in"

Line 169: "Setup Assistant has no path option"
       -> "the Sign In to Work or School Account flow is unavailable on this
           iOS version"
```

### WR-02: Verification step references an iOS Settings path that does not exist on iOS 15+

**File:** `docs/admin-setup-ios/08-user-enrollment.md:157`
**Issue:** Verification checklist item: "Post-enrollment: managed work account is visible on device under **Settings** > **Accounts & Passwords** and work content is accessible via managed apps (Outlook, Teams, Edge)". The **Accounts & Passwords** menu was present in iOS 11-12 only; iOS 13 split it into **Settings > Passwords** (for saved credentials) and per-app Accounts menus (e.g., **Settings > Mail > Accounts**, **Settings > Calendar > Accounts**). Phase 29 documents account-driven User Enrollment which requires iOS 15+ (stated in prerequisites line 53), so **Accounts & Passwords** will not appear on any in-scope device. An admin following the verification step will either fail to find the menu or will not complete the check, reducing the verification's value.

**Fix:** The work account created by account-driven User Enrollment is visible under **Settings > General > VPN & Device Management** (as a managed account entry) — that is the correct verification location for the managed-account artifact on iOS 15+. Also visible as a mail/contacts account depending on assigned profile. Rewrite the step:

```markdown
- [ ] Post-enrollment: the managed work account appears under **Settings** >
      **General** > **VPN & Device Management** as a managed User Enrollment
      profile, and work content is accessible via managed apps (Outlook,
      Teams, Edge)
```

### WR-03: Web-based enrollment URL is likely a discovery endpoint, not the user-facing enrollment URL

**File:** `docs/admin-setup-ios/07-device-enrollment.md:151`
**Issue:** The guide tells admins to "Communicate the web-based enrollment URL to end users: `https://enrollment.manage.microsoft.com/enrollmentserver/discovery.svc`". `enrollment.manage.microsoft.com/enrollmentserver/discovery.svc` is the MDM enrollment *discovery* service endpoint used by MDM clients (including Windows MDM and iOS Company Portal) for programmatic discovery — not a user-facing URL that renders a sign-in page in Safari. Users directed to this URL typically see an empty page, an XML/SOAP response, or an error depending on request headers.

The Phase 29 research flag already covers this partially ("confirm current URL against Microsoft Learn `ios-device-enrollment` at time of writing"), but surfacing a probably-wrong URL in the document body creates a risk that admins copy it directly into end-user runbooks without verifying.

**Fix:** Either replace the URL with the Intune user portal enrollment start page (typically `https://portal.manage.microsoft.com` — Company Portal web) which triggers the correct enrollment profile download, or remove the URL literal and keep only the research-flag language. Suggested replacement:

```markdown
3. Communicate the web-based enrollment URL to end users. This URL is
   tenant-scoped and varies by cloud environment; the canonical starting
   point is the Microsoft Intune Company Portal web experience at
   `https://portal.manage.microsoft.com`, from which Safari handles the
   profile download. Confirm the exact current URL and any tenant-specific
   redirects against Microsoft Learn (`ios-device-enrollment`) before
   distributing to end users — Microsoft has relocated this flow in the
   past and may do so again.
```

## Info

### IN-01: "Block App Store" example in What-Breaks callout is self-inconsistent with the capabilities table

**File:** `docs/admin-setup-ios/07-device-enrollment.md:129`
**Issue:** The What-Breaks callout warns: "users on devices with 'Block App Store' restrictions (inherited from any other policy) cannot install Company Portal at all". Line 36 of the same file states that Block App Store is a supervised-only restriction and is NOT available on Device-Enrollment-enrolled devices. The "inherited from any other policy" phrasing is vague — it could mean Screen Time / Family Sharing restrictions (a plausible source) or a prior MDM (less plausible for BYOD). A reader may conclude that the capabilities table is wrong.

**Fix:** Tighten the scenario to the actual realistic source of the restriction on an unsupervised device:

```markdown
> **What breaks if misconfigured:** If Company Portal is not assigned and the
> tenant relies on App Store auto-discovery only, users on devices with
> App Store access blocked by Screen Time or parental-control settings
> cannot install Company Portal...
```

### IN-02: Privacy-limit callout linking language says "every callout links to the Phase 26 User Enrollment concept page" but the sentence is in 08 itself

**File:** `docs/admin-setup-ios/08-user-enrollment.md:94`
**Issue:** The prose "Every callout links to the Phase 26 User Enrollment concept page" references the Phase 26 planning-phase identifier in user-facing documentation. Readers outside the planning team will not know which page "Phase 26" refers to. This is not a broken link (the actual callout links resolve to `../ios-lifecycle/00-enrollment-overview.md#user-enrollment`), just user-hostile phrasing.

**Fix:**

```markdown
After enrollment, Intune manages work apps and data inside the managed APFS
volume. Each capability below lists what Intune can do and includes an
explicit Privacy limit callout describing what Intune cannot do. Every
callout links back to the User Enrollment section of the
[iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).
```

### IN-03: "See Also" references "Apple Provisioning Glossary" via `_glossary-macos.md` — correct filename but confusing label

**File:** `docs/admin-setup-ios/07-device-enrollment.md:271`, `docs/admin-setup-ios/08-user-enrollment.md:178`, `docs/admin-setup-ios/09-mam-app-protection.md:342`, `docs/admin-setup-ios/00-overview.md:115`
**Issue:** Every "See Also" block links `[Apple Provisioning Glossary](../_glossary-macos.md)`. The file exists (confirmed via filesystem) and per Phase 26 CONTEXT is deliberately the shared Apple glossary despite the macos-suffixed filename. A reader scanning the link target may reasonably mistake this for a macOS-specific glossary and skip it. Not a broken-link issue; purely UX. The sibling Phase 26 guide accepts the same tradeoff, so fixing in 29 alone would create inconsistency.

**Fix:** Defer unless/until a codebase-wide rename (Phase 32 NAV-01 glossary additions already on the roadmap) — flagged here for awareness. Alternative: add a parenthetical hint in each "See Also" line, e.g., `[Apple Provisioning Glossary](../_glossary-macos.md) — shared Apple-platform glossary (filename reflects its original macOS origin)`. Do not rewrite in Phase 29 scope.

### IN-04: Template Platform gate blockquote links "Apple Provisioning Glossary" but 00-overview.md Platform gate drops the third bullet

**File:** `docs/admin-setup-ios/00-overview.md:8-11`, `docs/_templates/admin-template-ios.md:25-28`
**Issue:** The template's Platform gate block has four lines:
1. This guide covers iOS/iPadOS configuration...
2. For macOS ADE setup, see...
3. For iOS/iPadOS enrollment terminology, see the Apple Provisioning Glossary
4. Portal navigation may vary... See Overview#portal-navigation-note

`00-overview.md` uses a three-line block (drops the fourth bullet about portal navigation) because the overview itself IS the source of that section. However the three new guides 07/08/09 all DO include the fourth bullet, pointing back to `00-overview.md#portal-navigation-note`. This is correct — the Overview doesn't need to link to its own section — but a reader (or linter) verifying template conformance may flag the overview as missing the fourth line. No action required; flagging for documentation hygiene.

**Fix:** No change needed. Consider adding an inline comment in the template clarifying that overview-class pages omit line 4 because they host the anchor.

### IN-05: Mermaid branch labels differ slightly from the narrative path labels

**File:** `docs/admin-setup-ios/00-overview.md:22-30` vs `:15`
**Issue:** The Mermaid diagram labels the four paths as **Corporate ADE**, **BYOD w/o ABM**, **Privacy-preserving BYOD**, and **App-layer only**. The narrative introduction (line 15) uses the terms "corporate ADE", "Device Enrollment", "account-driven User Enrollment", and "app-layer MAM-WE". Neither set is wrong — the Mermaid labels are abbreviated decision-point labels, the narrative uses official path names — but a reader skimming the diagram for "Device Enrollment" will not find that exact label. Consider aligning the narrative prose with the Mermaid labels or vice versa for scannability.

**Fix:** Optional. One low-friction option: keep the Mermaid labels as decision-style ("Corporate ADE", "BYOD w/o ABM", etc.) and add the canonical path name in each node title, e.g., `G[7. Device Enrollment (BYOD w/o ABM)]`. Alternatively leave as-is and add a parenthetical in the intro sentence cross-referencing the Mermaid branch labels.

---

_Reviewed: 2026-04-17_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
