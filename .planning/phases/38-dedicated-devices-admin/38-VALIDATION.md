---
phase: 38
slug: dedicated-devices-admin
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-22
---

# Phase 38 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
>
> **Note:** This is a single-file documentation phase (no code). Validation is structural (anchor verification, word count, frontmatter schema, AEAUDIT-04 grep checks) rather than automated test execution. Sampling rate is per-task-commit grep audit.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — documentation validation via grep/manual structural review |
| **Config file** | none |
| **Quick run command** | `grep -nE "<a id=\"" docs/admin-setup-android/05-dedicated-devices.md \| wc -l` (anchor count check) |
| **Full suite command** | Combined AEAUDIT-04 audit script: `grep -nE "SafetyNet\|supervision" docs/admin-setup-android/05-dedicated-devices.md ; grep -c "last_verified:" docs/admin-setup-android/05-dedicated-devices.md ; wc -w docs/admin-setup-android/05-dedicated-devices.md` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run anchor-count grep + word-count check
- **After every plan wave:** Run full AEAUDIT-04 audit (no SafetyNet, no supervision, last_verified present, anchor count ≥ 11)
- **Before `/gsd-verify-work`:** Full audit + manual structural review against CONTEXT.md D-01..D-20
- **Max feedback latency:** 3 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 38-01-W0-01 | 01 | 0 | — | — | Anchor stability prereq verified | structural | `grep -c "<a id=" docs/admin-setup-android/03-fully-managed-cobo.md` (≥ 8) + `grep -c "<a id=" docs/admin-setup-android/02-zero-touch-portal.md` (≥ 3) | ✅ shipped | ⬜ pending |
| 38-01-W1-01 | 01 | 1 | AEDED-01 | — | Persona callout + 4-scenario overview present | structural | `grep -nE "audience-and-stakeholders\|scenarios" docs/admin-setup-android/05-dedicated-devices.md` | ❌ W0 | ⬜ pending |
| 38-01-W1-02 | 01 | 1 | AEDED-01 | — | Hybrid Phase 36 cross-link + Dedicated deltas in enrollment-profile section | structural | `grep -nE "enrollment-profile\|03-fully-managed-cobo.md#enrollment-profile" docs/admin-setup-android/05-dedicated-devices.md` | ❌ W0 | ⬜ pending |
| 38-01-W1-03 | 01 | 1 | AEDED-02 | T-38-01 (Unauthorized kiosk exit) | Exit-kiosk PIN H2 + verbatim SC2 lock phrase + MEDIUM marker | structural | `grep -nE "exit-kiosk-pin-synchronization\|configured identically in both\|MEDIUM:" docs/admin-setup-android/05-dedicated-devices.md` | ❌ W0 | ⬜ pending |
| 38-01-W1-04 | 01 | 1 | AEDED-03 | T-38-02 (FRP lockout) | Android 15 FRP re-provisioning H2 + 3-pathway breakdown + Phase 36 EFRP cross-link | structural | `grep -nE "android-15-frp-reprovisioning\|configure-efrp" docs/admin-setup-android/05-dedicated-devices.md` | ❌ W0 | ⬜ pending |
| 38-01-W2-01 | 01 | 2 | AEAUDIT-04 | — | Zero "SafetyNet"; zero "supervision" as Android management term; `last_verified` frontmatter; ≥ 11 anchors | automated grep audit | `grep -cE "SafetyNet" docs/admin-setup-android/05-dedicated-devices.md` (=0); `grep -nE "supervision" docs/admin-setup-android/05-dedicated-devices.md` (=0 outside cross-platform notes); `grep -c "last_verified:" docs/admin-setup-android/05-dedicated-devices.md` (≥ 1); `grep -c "<a id=" docs/admin-setup-android/05-dedicated-devices.md` (≥ 11) | ❌ W1 | ⬜ pending |
| 38-01-W2-02 | 01 | 2 | AEDED-01..03 | — | Source-confidence markers regex satisfied where MEDIUM/LOW assertions appear | automated grep audit | `grep -nE "\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]" docs/admin-setup-android/05-dedicated-devices.md` (≥ 2 MEDIUM markers expected per D-12: MHS exit-PIN + verbatim error string + FRP 3-pathway) | ❌ W1 | ⬜ pending |
| 38-01-W2-03 | 01 | 2 | AEDED-01..03 | — | Length envelope target 3200-4200 words per D-07 | automated count | `wc -w docs/admin-setup-android/05-dedicated-devices.md` (3200 ≤ count ≤ 4200) | ❌ W1 | ⬜ pending |
| 38-01-W2-04 | 01 | 2 | AEDED-01..03 | — | All D-08 mandatory anchors present | automated grep audit | `for a in audience-and-stakeholders scenarios prerequisites enrollment-profile enrollment-token provisioning-method-choice exit-kiosk-pin-synchronization exit-kiosk-pin android-15-frp-reprovisioning what-breaks renewal-maintenance; do grep -q "<a id=\"$a\"" docs/admin-setup-android/05-dedicated-devices.md \|\| echo "MISSING: $a"; done` (no MISSING output) | ❌ W1 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No new test infrastructure needed — Phase 38 is documentation-only.
- [ ] Anchor stability prereq verified (Phase 36 + Phase 35 anchors confirmed shipped):
  - Phase 36 `docs/admin-setup-android/03-fully-managed-cobo.md`: `#enrollment-profile`, `#enrollment-token`, `#provisioning-method-choice`, `#android-15-frp`, `#configure-efrp`, `#cope-migration`, `#what-breaks`, `#renewal-maintenance` (8 confirmed)
  - Phase 35 `docs/admin-setup-android/02-zero-touch-portal.md`: `#kme-zt-mutual-exclusion`, `#link-zt-to-intune`, `#dpc-extras-json` (3 confirmed)
  - Phase 35 `docs/admin-setup-android/01-managed-google-play.md`: `#bind-mgp` (1 confirmed)
- [ ] Phase 34 `docs/_glossary-android.md` anchor existence: `#dedicated-device`, `#cosu`, `#managed-home-screen`, `#lock-task-mode`, `#entra-shared-device-mode`, `#play-integrity`, `#dpc`, `#afw-setup`
- [ ] Phase 34 `docs/android-lifecycle/03-android-version-matrix.md#android-15-breakpoint` anchor verification

*Existing infrastructure (grep, wc) covers all phase validation requirements — no test framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Persona callout reads as actionable for both Intune Admin AND LOB Operations Owner audiences | AEDED-01 SC1 | Reading-comprehension judgment; can't grep | Read D-01 implementation; verify (a) PITFALL 7 line 194 verbatim core wording present, (b) example responsibilities concrete enough that an Intune Admin understands "what does the LOB ops owner contribute that I don't?" |
| Scenario routing paragraph (`### How to choose`) achieves SC5 disambiguation between multi-app kiosk and Entra shared device mode | AEDED-01 SC5 | Reading-comprehension judgment; D-13 disambiguation phrasing locked but cannot grep "is the meaning clear" | Read D-13 disambiguation phrasing in execution; ask "would an admin reading this know which scenario to pick?" |
| MHS exit-PIN H2 framing makes scope explicit (multi-app + digital signage only; not single-app) | AEDED-02 SC2 + D-14 | Framing judgment | Read D-02 H2 opening sentence; verify scope disclaimer present |
| Phase 36 cross-link orientation paragraph (D-03) does NOT restate Phase 36 mechanics | AEDED-01 SC1 + D-03 + Anti-Pattern 1 | Anti-Pattern 1 compliance is about absence of restatement; can grep for short word count but not for "is this restatement" | Read D-03 orientation paragraph + deltas; confirm only delta content is restated, not COBO mechanics |
| Phase 36 D-05 "no pre-empting" guard respected in D-04 FRP section | AEDED-03 SC3 + Phase 36 D-05 | Cross-doc semantic check | Read D-04 H2; confirm no EFRP step-level config restated; only re-provisioning behavior matrix + cross-link to Phase 36 `#configure-efrp` |
| ARCH Q6 Platform note banner (D-10) actually disambiguates Dedicated vs iOS Shared iPad vs Windows Shared PC at the right level | F-XCUT-08 closure | Cross-platform terminology judgment | Read D-10 banner text; verify cross-platform contrast is concrete (not just "see other platforms") |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies — structural grep checks specified per task
- [x] Sampling continuity: no 3 consecutive tasks without automated verify — every task has grep-verifiable acceptance criteria
- [x] Wave 0 covers all MISSING references — Phase 35/36 anchors verified shipped before Wave 1 starts
- [x] No watch-mode flags — single-execution greps only
- [x] Feedback latency < 3s — grep on a single ~250-line markdown file
- [ ] `nyquist_compliant: true` set in frontmatter — pending plan execution

**Approval:** pending — set to `approved 2026-04-22` after gsd-plan-checker validates the plan against this strategy
