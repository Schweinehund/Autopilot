---
phase: 5
slug: l1-runbooks
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual structural review (documentation-only phase — no code) |
| **Config file** | none |
| **Quick run command** | `grep -riE "powershell\|cmdlet\|Invoke-\|Get-\|Set-\|HKLM\|HKCU\|regedit\|\.log\|Event Viewer\|eventvwr" docs/l1-runbooks/` |
| **Full suite command** | `grep -riE "powershell\|cmdlet\|Invoke-\|Get-\|Set-\|HKLM\|HKCU\|regedit\|\.log\|Event Viewer\|eventvwr" docs/l1-runbooks/ && echo "FAIL: prohibited content found" \|\| echo "PASS: no prohibited content"` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick run command (grep for prohibited content)
- **After every plan wave:** Run full suite command + manual checklist review
- **Before `/gsd:verify-work`:** Full suite must be green + all manual checks passed
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | L1RB-01 | structural | `grep -riE "powershell\|HKLM\|\.log" docs/l1-runbooks/01-device-not-registered.md` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | L1RB-02 | structural | `grep -riE "powershell\|HKLM\|\.log" docs/l1-runbooks/02-esp-stuck-or-failed.md` | ❌ W0 | ⬜ pending |
| 05-01-03 | 01 | 1 | L1RB-03 | structural | `grep -riE "powershell\|HKLM\|\.log" docs/l1-runbooks/03-profile-not-assigned.md` | ❌ W0 | ⬜ pending |
| 05-01-04 | 01 | 1 | L1RB-04 | structural | `grep -riE "powershell\|HKLM\|\.log" docs/l1-runbooks/04-network-connectivity.md` | ❌ W0 | ⬜ pending |
| 05-01-05 | 01 | 1 | L1RB-05 | structural | `grep -riE "powershell\|HKLM\|\.log" docs/l1-runbooks/05-oobe-failure.md` | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 2 | — | link-check | `grep -c "available after Phase 5" docs/decision-trees/*.md` returns 0 | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `docs/l1-runbooks/` directory created
- [ ] `docs/l1-runbooks/00-index.md` — index file stub

*Existing infrastructure covers framework needs — this is a documentation phase.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| YAML frontmatter complete | All L1RB-* | Frontmatter values require semantic check | Verify `last_verified`, `review_by`, `applies_to: APv1`, `audience: L1` in each file |
| Version gate banner present | All L1RB-* | Must be first content after frontmatter | Open each file, confirm banner text and link to `../apv1-vs-apv2.md` |
| Glossary terms linked on first mention | All L1RB-* | Requires semantic identification | Check first occurrence of ESP, OOBE, MDM, TPM, hardware hash, Autopilot, pre-provisioning, ZTD |
| Escalation Criteria section present | All L1RB-* | Structural check | Confirm `## Escalation Criteria` heading exists in each runbook |
| "Before escalating, collect" list present | All L1RB-* | Structural check | Confirm bullet list under escalation heading |
| Timing guidance on wait steps | All L1RB-* | Requires reading step context | Review each numbered step involving waiting for timing expectations |
| User communication script on wait > 2 min | All L1RB-* | Requires reading step context | Review each wait step for blockquote user script |
| No if/then branching in steps | All L1RB-* | Requires reading step logic | Verify linear step sequences; sub-scenarios use labeled sections (D-05/D-07) |
| Forward-links updated in Phase 4 trees | All | Must verify link targets exist | Check each former "(available after Phase 5)" is now a valid relative path |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
