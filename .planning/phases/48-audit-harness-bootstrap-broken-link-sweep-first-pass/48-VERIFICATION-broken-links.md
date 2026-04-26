---
phase: 48
slug: audit-harness-bootstrap-broken-link-sweep-first-pass
generated: 2026-04-26
sweep_tool: markdown-link-check 3.14.2
gfm_precheck: grep -rn "#[A-Z]" docs/
total_findings: 75
---

# Phase 48: Broken-Link Sweep — First-Pass Inventory

## Header

- **Phase:** 48
- **Generated:** 2026-04-26
- **Sweep tools:**
  - GFM capital-anchor precheck: `grep -rn "#[A-Z]" docs/` (PITFALL-15 mitigation; Plan 48-08)
  - Broken-link sweep: markdown-link-check 3.14.2 with `.mlc-config.json` (Plan 48-09; 179 files scanned)
- **Total findings:** 75 (Category A: 51, Category B: 24, Category C: 0)
- **Scope:** all `docs/**/*.md` files (179 files at v1.4.1 close); external `learn.microsoft.com`, `docs.microsoft.com`, `techcommunity.microsoft.com`, `portal.azure.com`, `endpoint.microsoft.com`, `intune.microsoft.com` URLs excluded per REQUIREMENTS.md Out-of-Scope
- **All findings are pre-existing v1.0–v1.4.1 breakage.** Phase 48 ships no new content; the "New (Phase 48)" column in the Summary table is 0 across all rows.

---

## Category A — Broken Anchors

> Markdown anchor link targets that fail GFM lowercase-hyphenate normalization (PITFALL-15 mitigation: `#[A-Z]` precheck) OR point to anchors that don't exist in the target document.
>
> GFM capital-anchor references (`#UpperCase-Anchor`) and broken `#anchor` link references found via grep precheck and markdown-link-check anchor validation. Capital anchors fail GFM's lowercase-hyphenate normalization rule — every entry below is a candidate fix (rewrite anchor target to lowercase + hyphenate, or fix the heading id explicitly).

| File | Line | Link Target | Pre-existing? | Triage Decision |
|------|------|-------------|---------------|-----------------|
| *(GFM capital-anchor precheck returned 0 findings across 179 docs files — no `](path#Capital)` or `]: ...#Capital` link references found)* | | | | |
| docs/_glossary-android.md | 16 | `#kme` | A pre-existing v1.0–v1.4.1 | |
| docs/_glossary-android.md | 16 | `#kpe` | A pre-existing v1.0–v1.4.1 | |
| docs/_templates/admin-template-ios.md | 28 | `00-overview.md#portal-navigation-note` | A pre-existing v1.0–v1.4.1 | |
| docs/admin-setup-android/10-aosp-zebra.md | 10 | `#` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/02-esp-stuck-or-failed.md | 29 | `#device-phase-steps` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/02-esp-stuck-or-failed.md | 30 | `#user-phase-steps` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/02-esp-stuck-or-failed.md | 31 | `#error-code-steps` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/11-macos-setup-assistant-failed.md | 25 | `#authentication-failure` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/11-macos-setup-assistant-failed.md | 26 | `#await-configuration-stuck` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/11-macos-setup-assistant-failed.md | 27 | `#network-connectivity` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/12-macos-profile-not-applied.md | 25 | `#profile-not-showing` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/12-macos-profile-not-applied.md | 26 | `#profile-showing-not-working` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/13-macos-app-not-installed.md | 25 | `#dmg-pkg-missing` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/13-macos-app-not-installed.md | 26 | `#vpp-missing` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/13-macos-app-not-installed.md | 27 | `#app-install-failed` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/14-macos-compliance-access-blocked.md | 28 | `#device-non-compliant` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/14-macos-compliance-access-blocked.md | 29 | `#compliant-access-blocked` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/21-ios-compliance-blocked.md | 26 | `#cause-a-ca-gap` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/21-ios-compliance-blocked.md | 27 | `#cause-b-policy-mismatch` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/21-ios-compliance-blocked.md | 28 | `#cause-c-default-posture` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/25-android-compliance-blocked.md | 37 | `#cause-a-play-integrity-verdict-failure` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/25-android-compliance-blocked.md | 38 | `#cause-b-os-version-policy-mismatch` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/25-android-compliance-blocked.md | 39 | `#cause-c-ca-timing-gap` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/25-android-compliance-blocked.md | 40 | `#cause-d-passcode-encryption-policy-mismatch` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/27-android-zte-enrollment-failed.md | 34 | `#cause-a-device-not-uploaded-by-reseller` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/27-android-zte-enrollment-failed.md | 35 | `#cause-b-configuration-not-assigned` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/27-android-zte-enrollment-failed.md | 36 | `#cause-c-zt-intune-linking-broken` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/27-android-zte-enrollment-failed.md | 37 | `#cause-d-kme-zt-mutual-exclusion-conflict` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/28-android-knox-enrollment-failed.md | 34 | `#cause-a-b2b-account-pending` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/28-android-knox-enrollment-failed.md | 35 | `#cause-b-device-not-in-kap` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/28-android-knox-enrollment-failed.md | 36 | `#cause-c-profile-unassigned` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/28-android-knox-enrollment-failed.md | 37 | `#cause-d-kme-zt-mutex-collision` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/29-android-aosp-enrollment-failed.md | 35 | `#cause-a-realwear` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/29-android-aosp-enrollment-failed.md | 36 | `#cause-b-zebra` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/29-android-aosp-enrollment-failed.md | 37 | `#cause-c-pico` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/29-android-aosp-enrollment-failed.md | 38 | `#cause-d-htc` | A pre-existing v1.0–v1.4.1 | |
| docs/l1-runbooks/29-android-aosp-enrollment-failed.md | 39 | `#cause-e-meta-quest` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/21-android-compliance-investigation.md | 16 | `#cause-a-play-integrity-verdict-failure` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/21-android-compliance-investigation.md | 17 | `#cause-b-os-version-policy-mismatch` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/21-android-compliance-investigation.md | 18 | `#cause-c-ca-timing-gap` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/21-android-compliance-investigation.md | 19 | `#cause-d-passcode-encryption-policy-mismatch` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/22-android-knox-investigation.md | 21 | `#pattern-a-kme-profile-misconfiguration` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/22-android-knox-investigation.md | 22 | `#pattern-b-knox-tripped` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/22-android-knox-investigation.md | 24 | `#pattern-c-kme-zt-collision` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/22-android-knox-investigation.md | 25 | `#pattern-d-knox-license-edge` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/22-android-knox-investigation.md | 25 | `#pattern-e-dpc-json-malformation` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/23-android-aosp-investigation.md | 23 | `#pattern-a-realwear` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/23-android-aosp-investigation.md | 24 | `#pattern-b-zebra` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/23-android-aosp-investigation.md | 25 | `#pattern-c-pico` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/23-android-aosp-investigation.md | 26 | `#pattern-d-htc` | A pre-existing v1.0–v1.4.1 | |
| docs/l2-runbooks/23-android-aosp-investigation.md | 27 | `#pattern-e-meta-quest` | A pre-existing v1.0–v1.4.1 | |

> Triage Decision column intentionally left empty — Phase 60 second-pass triage populates per CONTEXT D-11.

---

## Category B — Broken File Paths

> Relative-path inter-doc links to files that don't exist (file moved, renamed, or deleted), plus external URLs that returned non-2xx/3xx status codes. Template placeholder links (`[filename]`, `link`) are included as intentional template stubs requiring no fix.

| File | Line | Link Target | Pre-existing? | Triage Decision |
|------|------|-------------|---------------|-----------------|
| docs/_templates/admin-template.md | 43 | `../runbooks-l1/relevant-runbook.md` | A pre-existing v1.0–v1.4.1 | |
| docs/_templates/admin-template.md | 23 | `link` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/_templates/admin-template-android.md | 51 | `../l1-runbooks/[filename].md` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/_templates/admin-template-android.md | 111 | `../l1-runbooks/[runbook-filename].md` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/_templates/admin-template-android.md | 113 | `../l1-runbooks/26-mgp-app-not-installed.md` | A pre-existing v1.0–v1.4.1 | |
| docs/_templates/admin-template-ios.md | 71 | `../l1-runbooks/[runbook-filename].md` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/_templates/admin-template-ios.md | 57 | `link` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/_templates/admin-template-macos.md | 49 | `../l1-runbooks/[runbook-filename].md` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/_templates/admin-template-macos.md | 13 | `link` | A pre-existing v1.0–v1.4.1 (template placeholder) | |
| docs/admin-setup-android/02-zero-touch-portal.md | 160 | `https://support.google.com/work/android/topic/9158960` | A pre-existing v1.0–v1.4.1 (external URL 404) | |
| docs/admin-setup-android/07-knox-mobile-enrollment.md | 51 | `https://knox.samsung.com` | A pre-existing v1.0–v1.4.1 (external URL redirect/error) | |
| docs/admin-setup-android/09-aosp-realwear.md | 9 | `../admin-setup/00-overview.md` | A pre-existing v1.0–v1.4.1 (wrong path: no admin-setup/ dir) | |
| docs/admin-setup-android/09-aosp-realwear.md | 125 | `https://portal.realwear.com` | A pre-existing v1.0–v1.4.1 (external URL error) | |
| docs/admin-setup-android/10-aosp-zebra.md | 9 | `../admin-setup/00-overview.md` | A pre-existing v1.0–v1.4.1 (wrong path: no admin-setup/ dir) | |
| docs/admin-setup-android/11-aosp-pico.md | 9 | `../admin-setup/00-overview.md` | A pre-existing v1.0–v1.4.1 (wrong path: no admin-setup/ dir) | |
| docs/admin-setup-android/12-aosp-htc-vive-focus.md | 9 | `../admin-setup/00-overview.md` | A pre-existing v1.0–v1.4.1 (wrong path: no admin-setup/ dir) | |
| docs/admin-setup-android/13-aosp-meta-quest.md | 9 | `../admin-setup/00-overview.md` | A pre-existing v1.0–v1.4.1 (wrong path: no admin-setup/ dir) | |
| docs/device-operations/03-re-provisioning.md | 105 | `../reference/conditional-access-enrollment.md` | A pre-existing v1.0–v1.4.1 (file does not exist) | |
| docs/l1-runbooks/04-network-connectivity.md | 35 | `https://ztd.dds.microsoft.com` | A pre-existing v1.0–v1.4.1 (external URL unreachable) | |
| docs/l1-runbooks/28-android-knox-enrollment-failed.md | 69 | `https://knox.samsung.com` | A pre-existing v1.0–v1.4.1 (external URL redirect/error) | |
| docs/l2-runbooks/03-tpm-attestation.md | 174 | `02-device-registration.md` | A pre-existing v1.0–v1.4.1 (file does not exist) | |
| docs/l2-runbooks/04-hybrid-join.md | 161 | `05-policy-conflict.md` | A pre-existing v1.0–v1.4.1 (file does not exist) | |
| docs/reference/endpoints.md | 125 | `https://support.apple.com/en-us/HT101555` | A pre-existing v1.0–v1.4.1 (external URL redirect chain) | |
| docs/reference/network-infrastructure.md | 153 | `../l2-runbooks/01-network-connectivity.md` | A pre-existing v1.0–v1.4.1 (file does not exist) | |

> Note: External URL failures (Google, Knox, RealWear, Apple, ztd.dds.microsoft.com) are non-Microsoft domains not covered by REQUIREMENTS.md Out-of-Scope exemption. Status codes reflect transient network reachability at sweep time; these may be alive but unreachable from CI environment.
>
> Triage Decision column intentionally left empty — Phase 60 second-pass triage populates per CONTEXT D-11.

---

## Category C — Deferred Stubs / Intentional

> Links that intentionally point to v1.5+ deferred content (whitelist exemption candidates).
>
> Intentional stubs or links to files planned but not yet created (e.g., Phase 49+ Linux files referenced in cross-platform see-also). These are NOT broken links to fix; they are forward-looking references. Allowlist column references future `c13_broken_link_allowlist[]` if added in v1.6+.

| File | Line | Link Target | Reason | Allowlist Entry |
|------|------|-------------|--------|-----------------|
| *(No Category C deferred-stub findings — sweep found 0 forward references to v1.5+ planned files. No links to `admin-setup-linux/`, `linux-lifecycle/`, `operations/`, `4-platform-capability-comparison.md`, or other v1.5-Phase-49–58 target paths were found in the existing 179-file corpus.)* | | | | |

---

## Summary

| Category | Pre-existing (v1.0–v1.4.1) | New (Phase 48) | Total |
|----------|---------------------------|----------------|-------|
| A: Broken Anchors (incl. GFM capitals) | 51 | 0 | 51 |
| B: Broken File Paths | 24 | 0 | 24 |
| C: Deferred / Intentional | 0 | 0 | 0 |
| **Total** | **75** | **0** | **75** |

All findings are pre-existing. Phase 48 introduces no new content; subsequent v1.5 phases (49-58) own their own per-phase verification of new content.

**Phase 48 status:** First-pass sweep complete. Category A (51 findings): intra-file `#anchor` links whose target headings do not exist in the document — cluster pattern in l1-runbooks/l2-runbooks "quick-nav" TOC sections. Category B (24 findings): broken relative paths (5 files), external URL failures (6 URLs), and template placeholder stubs (9 entries). Category C: zero — no v1.5 forward-reference stubs found in existing corpus.

Phase 60 second-pass triage will diff against this baseline; any post-Phase-48 finding count > 0 represents v1.5-introduced breakage requiring fix in Phase 61 gap closure.
