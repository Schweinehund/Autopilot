---
phase: 22
phase_name: macos-lifecycle-foundation
status: issues_found
depth: standard
files_reviewed: 6
findings:
  critical: 1
  warning: 3
  info: 1
  total: 5
---

## Scope

Files reviewed for phase 22 (macOS lifecycle foundation):

- `docs/macos-lifecycle/00-ade-lifecycle.md` (new -- 7-stage ADE lifecycle narrative, ~414 lines)
- `docs/reference/macos-commands.md` (new -- Terminal commands reference, ~207 lines)
- `docs/reference/macos-log-paths.md` (new -- log paths reference, ~66 lines)
- `docs/reference/endpoints.md` (modified -- macOS ADE endpoints section added)
- `docs/reference/00-index.md` (modified -- macOS References section added)
- `docs/index.md` (modified -- macOS Provisioning section updated)

---

## Critical

### CR-01: Fabricated Apple MDM protocol key `is_multi_user` presented as authoritative

**File:** `docs/macos-lifecycle/00-ade-lifecycle.md`
**Line:** 188-189
**Issue:** The "Behind the Scenes" table for Stage 3 maps Intune's User Affinity settings to Apple MDM enrollment profile protocol keys as follows:

```
| User Affinity: With | `is_multi_user: false` | Device associated with signing-in user |
| User Affinity: Without | `is_multi_user: true` | Shared/kiosk device, no user association |
```

`is_multi_user` is not a real key in Apple's MDM DEP enrollment profile protocol. The actual Apple DEP profile JSON specification contains keys such as `await_device_configured`, `is_mdm_removable`, `is_mandatory`, `is_supervised`, `skip_setup_items`, and `url` -- but no `is_multi_user` key. User affinity in ADE is an Intune-side concept controlling the enrollment flow; it has no direct boolean equivalent in the Apple DEP profile payload.

**Suggested fix:** Replace the two `is_multi_user` rows with an accurate description indicating it is an Intune-side setting with no direct Apple protocol equivalent.

**Confidence:** HIGH

---

## Warning

### WR-01: `pgrep` command in lifecycle doc uses different flags and pattern than canonical reference

**File:** `docs/macos-lifecycle/00-ade-lifecycle.md`
**Line:** 367
**Issue:** The Stage 7 "Watch Out For" section shows `pgrep -fl "Intune"` but the canonical command in `docs/reference/macos-commands.md` (line 167) is `pgrep -il "^IntuneMdm"`. The flags differ materially and the looser pattern would match unrelated processes.

**Suggested fix:** Replace with the canonical form: `pgrep -il "^IntuneMdm"`

**Confidence:** HIGH

---

### WR-02: APNs port 2197 omitted from `endpoints.md` table but present in lifecycle doc

**File:** `docs/reference/endpoints.md`
**Line:** 68
**Issue:** The Apple-Specific Endpoints table lists APNs as `(port 443, 5223)` but omits port 2197. The lifecycle doc correctly lists all three ports (443, 2197, 5223). Port 2197 is the MDM server-to-APNs communication port. Omitting it means network admins following this table will have an incomplete firewall allowlist.

**Suggested fix:** Update to `(port 443, 2197, 5223)`

**Confidence:** HIGH

---

### WR-03: "Microsoft Authenticator library embedded in Setup Assistant (macOS 14+)" is imprecise

**File:** `docs/macos-lifecycle/00-ade-lifecycle.md`
**Line:** 181
**Issue:** The text implies macOS 14 introduced a native Microsoft Authenticator broker in Setup Assistant. Official Microsoft documentation states modern auth is supported from macOS 10.15 via a web view, not a native embedded library. macOS 14 introduces Platform SSO (a separate feature).

**Suggested fix:** Clarify that the ADE enrollment authentication uses a web-based credential prompt on all supported OS versions (macOS 10.15+), and that Platform SSO on macOS 14+ is a separate post-enrollment feature.

**Confidence:** MEDIUM

---

## Info

### IR-01: `IntuneMacODC` minimum macOS version requirement (10.15+) stated without verifiable source

**File:** `docs/reference/macos-commands.md`
**Line:** 177
**Issue:** The IntuneMacODC section states "requires macOS 10.15+" but the official GitHub repository does not list a minimum version. The figure is plausible but unattributable.

**Suggested fix:** Annotate as community-documented: "requires macOS 10.15+ (community-documented minimum; verify against current script release)".

**Confidence:** MEDIUM

---

## Verified Clean

- All cross-references to existing files resolve correctly
- All glossary anchor links verified present in `_glossary-macos.md`
- No Windows terminology leaks (OOBE, ESP used only in explicit comparison contexts)
- Stage count (7) consistent across Mermaid diagram, Summary Table, and narrative
- ACME certificate version claim (macOS 13.1+) verified correct
- Await Configuration minimum OS (macOS 10.11+) verified correct
- ADE discovery endpoints confirmed against Apple's official network requirements
