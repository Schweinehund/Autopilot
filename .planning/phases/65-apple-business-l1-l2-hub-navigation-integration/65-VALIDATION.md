---
phase: 65
slug: apple-business-l1-l2-hub-navigation-integration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-22
---

# Phase 65 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This is a DOCUMENTATION + navigation-integration phase — "tests" are structural
> assertions in the `check-phase-65.mjs` validator-as-deliverable plus the active
> milestone-audit C15/C16 corpus-integrity gates (with the C16 4-edge triangle
> going LIVE this phase via the atomic exemption-removal commit). No application
> runtime.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js ESM validator (`scripts/validation/check-phase-65.mjs`) — Path-A copy from `check-phase-64.mjs`; CHAINS through 64 (transitive chain to 62/63) |
| **Config file** | none — standalone script; milestone harness `v1.6-milestone-audit.mjs` already active since Phase 62 |
| **Quick run command** | `node scripts/validation/check-phase-65.mjs` |
| **Full suite command** | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-65.mjs` |
| **Estimated runtime** | ~6 seconds (chain adds ~1s over Phase 64) |

---

## Sampling Rate

- **After every task commit:** `node scripts/validation/check-phase-65.mjs`
- **After every plan wave:** `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-65.mjs`
- **Before `/gsd:verify-work`:** Full suite green (all check-phase-65 assertions PASS + C14/C15/C16 PASS, including the 4 newly-live C16 triangle edges)
- **Max feedback latency:** ~6 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 65-01-01 | 01 | 1 | (harness) | — | `check-phase-65.mjs` scaffolds ABNAV-01..07 assertions; chains 64 | structural | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-01-02 | 01 | 1 | (convention) | — | PITFALL-6 pre-edit anchor inventory artifact captured for `12-` + the 5 hub files BEFORE any content edits land | structural / inventory | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-02-01 | 02 | 2 | ABNAV-01 | OP-11 | L1 #34 exists; compound `platform: ios+macos+shared-ipad` frontmatter via `+` separator; `#which-admin-owns-this-pool` cross-link; 3-path matrix (Path A executable + B/C escalate rows); L1 read-only convention honored | structural + frontmatter parse | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-02-02 | 02 | 2 | ABNAV-01 | — | L1 `00-index.md` appended with #34 row; #34 cap honored (exactly 1 v1.6 L1 runbook) | structural + count | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-02-03 | 02 | 2 | ABNAV-02 | — | L2 #26 exists; 7-leaf Mermaid tree (all 7 DA-9 leaf identities present); Intune-scope leaf carries C15-safe scope-boundary callout with ABAUDIT exemption | structural + Mermaid node count | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-02-04 | 02 | 2 | ABNAV-02 | — | L2 `00-index.md` appended with #26 row; #26 cap honored (exactly 1 v1.6 L2 runbook) | structural + count | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-03-01 | 03 | 3 | ABNAV-03 | — | `common-issues.md` `## Apple Business Governance Failure Scenarios` H2 appended (routing-table voice); load-bearing `#apple-business-quick-reference` substring present (C16 edge) | structural + C16 substring | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-03-02 | 03 | 3 | ABNAV-04 | — | `quick-ref-l1.md` `## Apple Business Quick Reference` H2 appended (L1 quick-steps voice); H2 slugifies to exactly `apple-business-quick-reference`; load-bearing `34-apple-business` substring present (C16 edge) | structural + slug + C16 substring | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-03-03 | 03 | 3 | ABNAV-05 | — | `quick-ref-l2.md` `## Apple Business Quick Reference` H2 appended (L2 quick-triage voice) | structural | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-03-04 | 03 | 3 | ABNAV-06 | — | `operations/00-index.md` Apple Business as 5th sub-section (after Co-Management / Patch / App / Drift) | structural section-order | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-03-05 | 03 | 3 | ABNAV-07 | — | `docs/index.md` 3 surgical edits: line 9 platform-coverage banner appendix, `## Operations` sub-H3 inserted, Cross-Platform References entries appended | structural surgical | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-03-ALL | 03 | 3 | All 5 hubs | — | Anchor stability: pre-edit anchor inventory matches post-edit (zero existing H2/H3 anchors shifted) per PITFALL-6 / DA-4 | anti-regression | `node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-04-01 | 04 | 4 | (atomic) | OP-11 | **ATOMIC COMMIT — INDIVISIBLE:** (a) `12-shared-ipad-passcode-reset.md` `## Cross-References` tail appended with `34-apple-business-shared-ipad-passcode-reset.md` bullet (substring `34-apple-business` present); (b) `v1.6-audit-allowlist.json` admin_12 + l1_34 + common_issues#... + quick_ref_l1#... exemptions REMOVED; (c) `check-phase-64.mjs` V-64-05 FLIPPED from NEGATIVE→POSITIVE (`12-` MUST contain `34-apple-business`) | atomic-commit / C16 live | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs` | ❌ W1 | ⬜ pending |
| 65-04-02 | 04 | 4 | All | — | C16 4-edge triangle PASSES with NO exemptions: l1_34 ↔ admin_12 ↔ common_issues ↔ quick_ref_l1; harness C16 reports 0 EXEMPTED entries for `"65"` / `"64-65"` sunset rows | corpus-integrity | `node scripts/validation/v1.6-milestone-audit.mjs` | Harness | ⬜ pending |
| 65-05-01 | 05 | 5 | All | — | Full suite green: check-phase-62 + check-phase-63 + check-phase-64 (with FLIPPED V-64-05) + check-phase-65 ALL PASS; C14/C15/C16 PASS; zero v1.6 exemptions remain expired | full-chain corpus-integrity | `node scripts/validation/v1.6-milestone-audit.mjs && node scripts/validation/check-phase-65.mjs` (chains 64→63→62) | ❌ W1 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky · ❌ W1 = file/edit created in Wave 1*
*(Task IDs are indicative; the planner finalizes the exact plan/task decomposition. Wave assignments reflect navigation-files-last invariant: L1#34/L2#26 land BEFORE the 5 hub appends, which land BEFORE the atomic C16-live commit.)*

---

## Wave 0 / Wave 1 Requirements

- [ ] `scripts/validation/check-phase-65.mjs` — Path-A copy from `check-phase-64.mjs`; extend with ABNAV-01..07 deliverable assertions, the L1 #34 + L2 #26 envelope greps (frontmatter + compound `platform:` parser + Mermaid 7-leaf node count), the 5 hub-append H2-presence + load-bearing-substring checks, the `12-` back-link assertion (POSITIVE: MUST contain `34-apple-business`), and the allowlist-removal verification (4 entries with sunset_phase `"65"` or `"64-65"` MUST be absent). Built as the Wave 1 gate that all Wave 2-4 content tasks validate against.
- [ ] PITFALL-6 pre-edit anchor inventory artifacts for `12-` and the 5 hub files — captured BEFORE any content edits land (DA-4 / Phase 65 SC#5 mandatory invariant).

*The validator + the anchor inventory are phase deliverables, not pre-existing infrastructure — together they form Wave 1, the gate that all Wave 2-5 content tasks validate against. The milestone harness `v1.6-milestone-audit.mjs` itself already exists and is active since Phase 62.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| L1 staff actually finds + uses `#which-admin-owns-this-pool` lookup before passcode reset | ABNAV-01 | Workflow validation requires a human walking through the runbook end-to-end | Reviewer walks through L1 #34 as a fresh L1 hire; confirms the cross-link to `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` resolves and the lookup step happens BEFORE Path A execution |
| L2 #26 Mermaid tree renders correctly in GitHub markdown view | ABNAV-02 | Harness does not Mermaid-render; only GitHub renders the diagram | Open the rendered file in GitHub; confirm all 7 leaves visible and `click` directives navigate to the correct targets |
| Intune-scope leaf scope-boundary callout reads as helpful (not just C15-evading) | ABNAV-02 | Semantic helpfulness of the callout cannot be grepped | Reviewer reads the Intune-scope leaf node text; confirms it directs the L2 engineer to the right Intune-side resource without violating REQUIREMENTS:89 out-of-scope invariant |
| L1 #34 Path B/C escalate-to-L2 pointers include a "Before escalating, collect:" handoff section | ABNAV-01 | Handoff quality requires a human read | Reviewer confirms the pointer mirrors the `30-linux-enrollment-failed.md:188-198` pattern |
| Quick-ref H2 title `## Apple Business Quick Reference` slugifies EXACTLY to `apple-business-quick-reference` | ABNAV-04 (C16 edge) | Slug computation is GitHub-specific; the harness checks substring presence but does not slugify | Reviewer (or `check-phase-65.mjs` if implemented) verifies the H2 title; any deviation silently breaks the C16 `common_issues→quick-ref-l1` edge |

---

## Validation Sign-Off

- [ ] All tasks have an `<automated>` verify (check-phase-65.mjs) or Wave 1 dependency
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 1 builds `check-phase-65.mjs` covering all ABNAV-01..07 + envelope + load-bearing-substring assertions + allowlist-removal verification + the V-64-05 flip
- [ ] PITFALL-6 pre-edit anchor inventories captured for `12-` and all 5 hub files before content edits
- [ ] No watch-mode flags
- [ ] Feedback latency < 6s
- [ ] `nyquist_compliant: true` set in frontmatter (after planner maps every task)
- [ ] Atomic-commit unit (Task 65-04-01) explicitly captures the 3 sub-actions (12- back-link + 4 allowlist removals + V-64-05 flip) as a SINGLE indivisible commit

**Approval:** pending (planner finalizes task IDs)
