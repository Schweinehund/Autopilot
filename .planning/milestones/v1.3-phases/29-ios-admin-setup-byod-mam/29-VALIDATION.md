---
phase: 29
slug: ios-admin-setup-byod-mam
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-17
note: Each plan task has a direct <automated> grep-based verify command that does not depend on any Wave 0 wrapper scripts. The scripts below are optional convenience wrappers that aggregate the direct greps — they are not prerequisites for sampling. Waves in the Per-Task Verification Map match plan frontmatter: Plans 29-01/02 in Wave 1; Plans 29-03/04/05 in Wave 2.
---

# Phase 29 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 29 is a documentation phase. Validation is structural pattern-matching on markdown files (frontmatter schema, required sections, cross-reference anchors, privacy-callout format conformance), not code execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual review + shell greps (no markdown test runner configured in this repo) |
| **Config file** | none — Wave 0 does not install a runner (see Wave 0 Gaps below) |
| **Quick run command** | `bash .planning/phases/29-ios-admin-setup-byod-mam/validate-quick.sh` (Wave 0 creates this script) |
| **Full suite command** | `bash .planning/phases/29-ios-admin-setup-byod-mam/validate-full.sh` (Wave 0 creates this script) |
| **Estimated runtime** | <5 seconds (grep-based) |

---

## Sampling Rate

- **After every task commit:** Run `validate-quick.sh` — spot-checks the specific file just modified for required sections and frontmatter.
- **After every plan wave:** Run `validate-full.sh` — structural greps for every row in the Per-Task Verification Map.
- **Before `/gsd-verify-work`:** Full suite must be green (every row ✅).
- **Max feedback latency:** 5 seconds.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 29-TPL-01 | 29-01 | 1 | ABYOD-01/02/03 | — | Template extension documents privacy-limit callout pattern | structural | `grep -i "PRIVACY-LIMIT CALLOUT PATTERN" docs/_templates/admin-template-ios.md` | inline | ⬜ pending |
| 29-01-01 | 29-02 | 1 | ABYOD-01/02/03 | — | Overview frontmatter widens to `applies_to: all` | format | `head -10 docs/admin-setup-ios/00-overview.md \| grep "applies_to: all"` | inline | ⬜ pending |
| 29-01-02 | 29-02 | 1 | ABYOD-01/02 | — | Shared Intune Enrollment Restrictions section present | structural | `grep -iE "^## .*Enrollment Restrictions" docs/admin-setup-ios/00-overview.md` | inline | ⬜ pending |
| 29-01-03 | 29-02 | 1 | ABYOD-01/02/03 | — | Mermaid diagram restructured (non-ADE paths do not chain from ADE prereqs) | review | Manual: confirm no arrow from `03-ade-enrollment-profile` to BYOD nodes | — | ⬜ pending |
| 29-01-04 | 29-02 | 1 | ABYOD-01/02/03 | — | BYOD-path prereqs section present (D-09) | structural | `grep -i "BYOD.*prerequisites\|BYOD-path prereqs" docs/admin-setup-ios/00-overview.md` | inline | ⬜ pending |
| 29-02-01 | 29-03 | 2 | ABYOD-01 | — | File exists with required sections | structural | `test -f docs/admin-setup-ios/07-device-enrollment.md` | inline | ⬜ pending |
| 29-02-02 | 29-03 | 2 | ABYOD-01 | — | Capabilities Available Without Supervision table at top (D-14) | structural | `grep -i "Capabilities Available Without Supervision" docs/admin-setup-ios/07-device-enrollment.md` | inline | ⬜ pending |
| 29-02-03 | 29-03 | 2 | ABYOD-01 | — | Both Company Portal AND web-based flows documented (D-12) | content | `grep -ci "web-based\|company portal" docs/admin-setup-ios/07-device-enrollment.md` → ≥4 | inline | ⬜ pending |
| 29-02-04 | 29-03 | 2 | ABYOD-01 | — | NO privacy-limit callouts (D-18) | negative | `grep -c "Privacy limit:" docs/admin-setup-ios/07-device-enrollment.md` → 0 | inline | ⬜ pending |
| 29-02-05 | 29-03 | 2 | ABYOD-01 | — | Personal vs corporate ownership flag section (D-16) | structural | `grep -iE "^##.*Ownership\|Personal.*Corporate" docs/admin-setup-ios/07-device-enrollment.md` | inline | ⬜ pending |
| 29-02-06 | 29-03 | 2 | ABYOD-01 | — | Configuration-Caused Failures with Phase 30 placeholder | format | `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/07-device-enrollment.md` → ≥1 | inline | ⬜ pending |
| 29-03-01 | 29-04 | 2 | ABYOD-02 | — | File exists | structural | `test -f docs/admin-setup-ios/08-user-enrollment.md` | inline | ⬜ pending |
| 29-03-02 | 29-04 | 2 | ABYOD-02 | — | Top-of-doc "Privacy Boundaries on User Enrollment" summary section (D-19) | structural | `grep -i "Privacy Boundaries on User Enrollment" docs/admin-setup-ios/08-user-enrollment.md` | inline | ⬜ pending |
| 29-03-03 | 29-04 | 2 | ABYOD-02 | — | Exactly 7 inline privacy-limit callouts — one per D-20 boundary (D-01/D-02) | format | `[ $(grep -cE "^> \*\*Privacy limit:\*\*" docs/admin-setup-ios/08-user-enrollment.md) -eq 7 ]` | inline | ⬜ pending |
| 29-03-04 | 29-04 | 2 | ABYOD-02 | — | No 🔒 or 🛡️ glyph in privacy callouts (D-02) | negative | `grep -E "Privacy limit.*🔒\|Privacy limit.*🛡️" docs/admin-setup-ios/08-user-enrollment.md \| wc -l` → 0 | inline | ⬜ pending |
| 29-03-05 | 29-04 | 2 | ABYOD-02 | — | Privacy-callout link target matches D-03 | format | `grep "Privacy limit" docs/admin-setup-ios/08-user-enrollment.md \| grep -c "ios-lifecycle/00-enrollment-overview.md#user-enrollment"` → = callout count (7) | inline | ⬜ pending |
| 29-03-06 | 29-04 | 2 | ABYOD-02 | — | Profile-based UE deprecation section (D-21) | structural | `grep -iE "profile-based.*deprecat\|deprecat.*profile-based" docs/admin-setup-ios/08-user-enrollment.md` | inline | ⬜ pending |
| 29-03-07 | 29-04 | 2 | ABYOD-02 | — | Managed Apple ID vs personal Apple ID disambiguation (D-22) | content | `grep -ci "managed apple id" docs/admin-setup-ios/08-user-enrollment.md` → ≥2 | inline | ⬜ pending |
| 29-03-08 | 29-04 | 2 | ABYOD-02 | — | All 7 D-20 privacy boundaries covered (UDID/serial/IMEI, wipe scope, personal app inventory, location, passcode, VPN scope, APFS volume) | content | `grep -ciE "UDID\|serial number\|IMEI\|APFS\|managed volume\|per-app VPN\|managed-content passcode\|personal apps" docs/admin-setup-ios/08-user-enrollment.md` → ≥7 distinct topics | inline | ⬜ pending |
| 29-04-01 | 29-05 | 2 | ABYOD-03 | — | File exists | structural | `test -f docs/admin-setup-ios/09-mam-app-protection.md` | inline | ⬜ pending |
| 29-04-02 | 29-05 | 2 | ABYOD-03 | — | Three-level summary table at top (D-25) | structural | `grep -iE "Level 1.*Level 2.*Level 3\|Enterprise Basic.*Enhanced.*High" docs/admin-setup-ios/09-mam-app-protection.md` | inline | ⬜ pending |
| 29-04-03 | 29-05 | 2 | ABYOD-03 | — | Level 2 AND Level 3 "What breaks if misconfigured" callouts (D-25) | structural | `grep -ciE "What breaks if misconfigured" docs/admin-setup-ios/09-mam-app-protection.md` → ≥2 | inline | ⬜ pending |
| 29-04-04 | 29-05 | 2 | ABYOD-03 | — | Dedicated `## Selective Wipe` section (D-28) near start of operational content | structural | `grep -E "^## Selective Wipe" docs/admin-setup-ios/09-mam-app-protection.md` | inline | ⬜ pending |
| 29-04-05 | 29-05 | 2 | ABYOD-03 | — | Dual-targeting coverage (enrolled AND unenrolled) (D-26) | content | `grep -ciE "enrolled\b.*unenrolled\|unenrolled\b.*enrolled" docs/admin-setup-ios/09-mam-app-protection.md` → ≥2 | inline | ⬜ pending |
| 29-04-06 | 29-05 | 2 | ABYOD-03 | — | No Android references (D-27) | negative | `grep -ci "android" docs/admin-setup-ios/09-mam-app-protection.md` → 0 | inline | ⬜ pending |
| 29-04-07 | 29-05 | 2 | ABYOD-03 | — | Standalone — no required MDM cross-reads (D-24) | review | Manual: every MDM link is optional-deeper-detail, not required to follow core concepts | — | ⬜ pending |
| 29-04-08 | 29-05 | 2 | ABYOD-03 | — | iOS-specific behaviors section (D-29) | structural | `grep -iE "^## .*iOS-Specific\|App SDK\|Managed Open In" docs/admin-setup-ios/09-mam-app-protection.md` | inline | ⬜ pending |
| 29-ALL-01 | 29-03/04/05 | 2 | ABYOD-01/02/03 | — | Frontmatter `last_verified: 2026-04-17` on new files | format | `grep -c "last_verified: 2026-04-17" docs/admin-setup-ios/0[7-9]*.md` → 3 | inline | ⬜ pending |
| 29-ALL-02 | 29-03/04/05 | 2 | ABYOD-01/02/03 | — | Frontmatter `review_by: 2026-07-16` (last_verified + 90d) on new files | format | `grep -c "review_by: 2026-07-16" docs/admin-setup-ios/0[7-9]*.md` → 3 | inline | ⬜ pending |
| 29-ALL-03 | 29-03/04/05 | 2 | ABYOD-01/02/03 | — | "iOS L1 runbooks (Phase 30)" placeholder used in Configuration-Caused Failures tables | format | `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/0[7-9]*.md` → ≥3 | inline | ⬜ pending |
| 29-ALL-04 | 29-03/04/05 | 2 | ABYOD-01/02/03 | — | All relative cross-references resolve | integrity | `bash -c 'grep -oE "\]\(\.\.?/[^)]+\)" docs/admin-setup-ios/0[7-9]*.md docs/admin-setup-ios/00-overview.md \| sed "s/.*(\(.*\))/\1/" \| while read link; do target="${link%%#*}"; test -f "docs/admin-setup-ios/$target" \|\| test -f "docs/$target" \|\| exit 1; done'` (inline iteration, no wrapper script) | inline | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

**None required.** Every row in the Per-Task Verification Map above specifies a self-contained inline shell command (`grep`, `test`, `head`, or inline-iterated link-check). Executors run the command directly from the task's `<automated>` block — no wrapper scripts need to be created in advance.

**Optional convenience wrappers** (not required for Nyquist compliance; can be authored later if the team wants a single-command entry point):

- `validate-quick.sh` — wrapper that runs the inline commands for a specific file path
- `validate-full.sh` — wrapper that iterates every row and prints pass/fail
- `link-check.sh` — wrapper for 29-ALL-04 (currently embedded inline in that row)

*No markdown test runner installed in this repo. Inline `grep`/`test` primitives satisfy sampling continuity at per-task and per-wave cadences.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Privacy-callout phrasing is neutral-factual, not alarmist (SPECIFICS guidance) | ABYOD-02 | Prose voice cannot be grepped | Read every `> **Privacy limit:**` line in `08-user-enrollment.md`; each must be a factual statement (no "warn", "beware", "cannot spy", value-laden language) |
| MAM-WE standalone-ness — every cross-reference to MDM content is optional, not required | ABYOD-03 | Reading flow judgement | Read `09-mam-app-protection.md` without following any cross-link; confirm every core concept is comprehensible in isolation |
| "Capabilities Available Without Supervision" table answers "can I do X on BYOD?" in <30 seconds | ABYOD-01 | UX judgement (scannability) | Time-boxed reader test: locate 3 capabilities (e.g., app deployment modes, OS update enforcement, silent install) — each found in <30s |
| Mermaid diagram communicates "choose your path," not "do step 7 after step 6" | ABYOD-01/02/03 | Visual comprehension | Render diagram; confirm BYOD/MAM-WE paths are parallel alternatives, not downstream of ADE prereqs |
| Privacy-limit callouts read with end-user-plausible calm tone (SPECIFICS) | ABYOD-02 | Voice judgement | As above for alarmist check — combined single pass |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify (inline grep/test commands — no Wave 0 dependencies)
- [x] Sampling continuity: every task has an inline automated check; no 3 consecutive tasks without automated verify
- [x] Wave 0: none required (inline commands have no prerequisites)
- [x] No watch-mode flags
- [x] Feedback latency < 5s (grep-based)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-17

**Approval:** pending
