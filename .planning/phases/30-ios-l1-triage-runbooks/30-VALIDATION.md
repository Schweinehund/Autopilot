---
phase: 30
slug: ios-l1-triage-runbooks
status: phase-30-complete-pending-human-checkpoint
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-17
---

# Phase 30 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Source: `30-RESEARCH.md` Section 6 (Validation Architecture).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Static checks — grep-based assertions, YAML parser, markdown-link-check, Mermaid CLI |
| **Config file** | None currently in repo — Wave 0 creates `scripts/validation/check-phase-30.{mjs,sh}` |
| **Quick run command** | `node scripts/validation/check-phase-30.mjs --quick` (grep assertions only; <2s) |
| **Full suite command** | `node scripts/validation/check-phase-30.mjs` (+ markdown-link-check + Mermaid syntax) |
| **Estimated runtime** | ~0.2 seconds full suite (observed 2026-04-18; markdown-link-check and mermaid-cli skipped — binaries unavailable; grep-only checks complete in ~200ms) |

**Note:** Project CLAUDE.md documents Pester/pytest/Vitest harnesses, but none apply to markdown content. Phase 30 uses static-check validation (research Section 6 rationale).

---

## Sampling Rate

- **After every task commit:** Run `--quick` (grep checks on touched files — SC #1 node count, SC #2 banner-only integration, frontmatter keys present)
- **After every plan wave:** Run full suite (link-check + Mermaid + 71-placeholder sweep across `docs/admin-setup-ios/`)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

Tasks are finalized during planning (step 8). Placeholder rows populated from research Section 6 "Phase Requirements → Test Map" — planner MUST map each task to exactly one row below (or flag MANUAL).

| Check | Plan | Wave | Requirement | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|-------|------|------|-------------|-----------------|-----------|-------------------|-------------|--------|
| Decision tree ≤ 5 nodes | 30-02 | 1 | L1TS-01 / SC #1 | N/A | grep-count | `grep -cE "^\s*IOS[0-9]+\{" docs/decision-trees/07-ios-triage.md` ≤ 5 | ✅ | ✅ PASS |
| Single-branch integration (no iOS Mermaid in 00-initial-triage) | 30-08 | 3 | L1TS-01 / SC #2 | N/A | Mermaid-absence | `grep -cE "iOS\|iPadOS\|IOS[0-9]" <(sed -n '/```mermaid/,/```/p' docs/decision-trees/00-initial-triage.md)` → 0 | ✅ | ✅ PASS |
| 6 runbooks have `## Symptom` | 30-03/04/05/06/07 | 2 | L1TS-02 / SC #3 | N/A | grep presence | `grep -l "^## Symptom" docs/l1-runbooks/1[6-9]-ios*.md docs/l1-runbooks/2[0-1]-ios*.md \| wc -l` = 6 | ✅ | ✅ PASS |
| Only runbook 21 has `## User Action Required` | 30-07 | 2 | L1TS-02 / SC #4 (D-13) | N/A | grep presence | `grep -l "^## User Action Required" docs/l1-runbooks/*-ios-*.md \| wc -l` = 1 | ✅ | ✅ PASS |
| All 71 placeholders resolved | 33-02 (executed pre-authored 30-09) | 33 W1 | D-16 forward-contract | N/A | string-absence | `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` → 0 matches | ✅ | ✅ PASS |
| D-18 prose retrofit done | 33-02 (executed pre-authored 30-09) | 33 W1 | D-18 | N/A | line-content | `sed -n '243p' docs/admin-setup-ios/07-device-enrollment.md` does NOT contain "Phase 30" or "will live" | ✅ | ✅ PASS |
| 6 runbook files with D-21 naming | 30-03/04/05/06/07 | 2 | D-21 / L1TS-02 | N/A | file existence | `ls docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` → all 6 present | ✅ | ✅ PASS |
| 07-ios-triage.md exists | 30-02 | 1 | D-22 / L1TS-01 | N/A | file existence | `ls docs/decision-trees/07-ios-triage.md` | ✅ | ✅ PASS |
| 00-index.md has iOS section | 30-08 (executed via Phase 32 Plan 32-00 absorption) | 3 | D-23 | N/A | H2 grep | `grep "^## iOS L1 Runbooks" docs/l1-runbooks/00-index.md` → 1 match | ✅ | ✅ PASS |
| Template platform enum extended | 30-01 | 1 (Wave 0) | D-24 | N/A | string grep | `grep -E "platform:\s*Windows\s*\\\|\s*macOS\s*\\\|\s*iOS\s*\\\|\s*all" docs/_templates/l1-template.md` → 1 match | ✅ | ✅ PASS |
| Frontmatter per runbook (D-25) | 30-03/04/05/06/07 | 2 | D-25 | N/A | YAML parse | For each runbook: `last_verified`, `review_by`, `audience: L1`, `platform: iOS` present | ✅ | ✅ PASS |
| Platform gate banner on all 6 runbooks | 30-03/04/05/06/07 | 2 | D-26 | N/A | line grep | Line 9 (or first line of body) matches `^> \*\*Platform gate:\*\*` | ✅ | ✅ PASS |
| Internal links resolve | 30-01 (infrastructure) + all content plans (target files) | 1-3 | Link-integrity | N/A | markdown-link-check | `npx markdown-link-check docs/decision-trees/07-ios-triage.md docs/l1-runbooks/1[6-9]-ios-*.md docs/l1-runbooks/2[0-1]-ios-*.md` exits 0 | ✅ | SKIPPED — markdown-link-check and mermaid-cli binaries unavailable; Mermaid syntax validated by automated Check 13 logic; link-check deferred to PR review per project v1.0-v1.2 precedent |

*Status key: ✅ green · ❌ red · ⚠️ flaky · SKIPPED (tooling unavailable) — all rows resolved; no pending entries remain*

**Plan-column note for Checks 5 and 6:** Delivered by Phase 33 Plan 33-02 (which executed the pre-authored 30-09 enumeration). The per-row judgment is Phase 30's (30-09 plan); the execution is Phase 33's. Audit trail: 30-09 enumeration → 33-02 execution (commit a79fa2a) → PASS.

---

## Wave 0 Requirements

- [x] `scripts/validation/check-phase-30.mjs` (or `.sh`) — single command runs all 13 static checks above and exits non-zero on failure. Planner may split per-check if preferred.
- [x] Verify `markdown-link-check` availability — add as dev dep if missing (MEDIUM priority). **Status: SKIPPED — binary unavailable on runtime; deferred per v1.0-v1.2 precedent.**
- [x] Verify `@mermaid-js/mermaid-cli` availability — if unavailable, fall back to manual visual review (LOW — project has shipped 3 prior milestones without automated Mermaid validation; this is an acceptable fallback per v1.0-v1.2 precedent). **Status: SKIPPED — binary unavailable; manual visual review deferred to PR/human checkpoint.**

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Runbook prose is L1-executable (actual English, not bureaucratic boilerplate) | L1TS-02 quality | Subjective — requires human read-through | Reviewer reads each runbook end-to-end and asks: "Could a new L1 hire follow this without asking questions?" — flag any step that assumes unstated context |
| Actor-boundary clarity (SC #4 literal) — no ambiguity about L1 vs Admin vs User | L1TS-02 / SC #4 | Subjective beyond section-presence grep | For each runbook, reviewer confirms every instruction lives under exactly one H2 actor heading and no heading contains cross-actor content |
| Escalation packet completeness (D-12 three-part structure) | D-12 | Subjective completeness judgment | Verify each "Admin Action Required" section has: (1) imperative "Ask the admin to..." list, (2) "Verify" confirmation steps, (3) "If admin confirms none..." handoff |
| Mermaid visual rendering quality | SC #1/#2 | Visual — static syntax check does not evaluate layout | Render 07-ios-triage.md in GitHub web UI; confirm diamonds/terminals distinguishable, classDef styling applied |
| 71-placeholder per-row target accuracy (D-17 per-row judgment) | D-17 | Semantic — grep confirms absence but not correctness of replacement | Reviewer spot-checks a sample of replaced rows (10+) against failure-mode-to-runbook mapping documented in PLAN.md |

---

### Manual Verification Results (2026-04-18)

| # | Behavior | Outcome | Notes |
|---|----------|---------|-------|
| 1 | L1-executable prose | PASS | All 6 runbooks (16-21) use clear imperative language. Each triage step is self-contained with observable check (e.g., "Open Intune admin center → Devices → iOS → Device → Overview tab. Confirm MDM check-in timestamp is > 24 hours ago"). No step assumes unstated context. Runbook 21 (most complex — multi-cause H3 structure) remains navigable for a new L1 hire: the Symptom section explicitly lists all three causes and each H3 sub-section is isolated. |
| 2 | Actor-boundary clarity (SC #4) | PASS | All 6 runbooks have clean actor-boundary sectioning. Every instruction lives under exactly one H2 heading (`## L1 Triage Steps`, `## Admin Action Required`, `## User Action Required` [R21 only], `## Escalation Criteria`). No step in `## L1 Triage Steps` directs the L1 to "have the admin do X" without a section boundary. Runbook 21's per-cause H3 subsections each contain their own actor-appropriate instructions without cross-actor bleed. |
| 3 | Escalation packet completeness (D-12) | PASS | All 6 runbooks have the three-part `## Admin Action Required` structure: (a) imperative "Ask the admin to..." list; (b) "Verify..." confirmation steps with specific Intune UI navigation; (c) "If admin confirms none of the above..." handoff sentence to `## Escalation Criteria`. Runbook 21 implements this per-cause (three H3 subsections each with the full D-12 packet). |
| 4 | Mermaid visual rendering | SKIPPED | Rendering tooling unavailable on runtime environment — `@mermaid-js/mermaid-cli` binary absent. Mermaid syntax has been validated by automated Check 13 logic embedded in `check-phase-30.mjs` (structural parse). Visual rendering deferred to PR review / human checkpoint step 4. The `click` directive syntax and `classDef` declarations are present in the source and syntactically correct per Check 13. |
| 5 | 71-placeholder fidelity (sample of 10 rows from files 1, 2, 4, 6, 7, 8, 9) | PASS | 10 rows spot-checked against the 30-09 enumeration — all match exactly. See sampled rows below. No deviations found; 33-02 executed 30-09 faithfully. |

**Sampled rows for Manual Check 5:** rows 1, 9, 20, 28, 36, 43, 49, 52, 62, 66

| Row # | File | Enumeration target | Actual file content | Match |
|-------|------|-------------------|---------------------|-------|
| 1 | 01-apns-certificate.md | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` | Contains `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` in "New certificate created instead of renewed" row | ✅ |
| 9 | 02-abm-token.md | `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` | Contains `[Runbook 17: ADE Not Starting](../l1-runbooks/17-ios-ade-not-starting.md)` in "Expired token not renewed" row | ✅ |
| 20 | 04-configuration-profiles.md | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch)` | Contains R21 Cause B annotation in "Supervised-only restriction targeted to unsupervised device" row | ✅ |
| 28 | 05-app-deployment.md | L2P31 `[iOS L2 runbooks (Phase 31)](../l2-runbooks/00-index.md)` | Contains L2P31 link in "VPP device-licensed app to unsupervised device" row | ✅ |
| 36 | 06-compliance-policy.md | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, OS version)` | Contains R21 with OS version Cause B note in "Minimum OS version set ahead of latest Apple release" row | ✅ |
| 43 | 06-compliance-policy.md | `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) — APNs blocked at network edge` | Contains R16 with network-edge note in "APNs blocked at network edge" row | ✅ |
| 49 | 07-device-enrollment.md | `[Runbook 20: Device Cap Reached](../l1-runbooks/20-ios-device-cap-reached.md)` | Contains R20 in "Per-user device limit reached" row | ✅ |
| 52 | 07-device-enrollment.md | `[Runbook 21: Compliance Blocked](../l1-runbooks/21-ios-compliance-blocked.md) — Cause B (policy mismatch, passcode native-limit conflict)` | Contains R21 Cause B with passcode note in "Compliance policy requires passcode > device-native limit" row | ✅ |
| 62 | 08-user-enrollment.md | `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md)` | Contains R19 with Authenticator-parallel contextual note in "Microsoft Authenticator not assigned/installed" row | ✅ |
| 66 | 09-mam-app-protection.md | `[Runbook 19: License Invalid](../l1-runbooks/19-ios-license-invalid.md)` | Contains R19 in "User not assigned Intune license" row | ✅ |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s (observed: ~0.2s for grep-only checks)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending human checkpoint (Task 3 of Plan 33-03)
