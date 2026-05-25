---
phase: 62
slug: apple-business-foundation-rebrand
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-21
---

# Phase 62 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Derived from `62-RESEARCH.md` §9 Validation Architecture.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js built-in `assert` + custom check runner (v1.5 audit-harness pattern) |
| **Config file** | none — harness is self-contained |
| **Quick run command** | `node scripts/validation/check-phase-62.mjs --verbose` |
| **Full suite command** | `node scripts/validation/v1.6-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3-8 seconds quick / ~10-15 seconds full |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-62.mjs --verbose`
- **After every plan wave:** Run `node scripts/validation/v1.6-milestone-audit.mjs --verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 62-01-01 | 01 | 1 | AB-06 (D-05 patch) | — | Planning files patched "5"→"4 existing glossaries" with rationale footnote | structural | `grep -c "4 existing platform glossaries" .planning/REQUIREMENTS.md .planning/ROADMAP.md .planning/STATE.md` | ❌ W0 | ⬜ pending |
| 62-02-01 | 02 | 2 | AB-01 | — | `_glossary-apple-business.md` exists at `docs/` root with frontmatter | structural | `check-phase-62.mjs` V-62-01 | ❌ W0 | ⬜ pending |
| 62-02-02 | 02 | 2 | AB-01 | — | Rebrand-mapping table present at top with 8 term pairs (Legacy/New/Date/Where columns) | structural | `check-phase-62.mjs` V-62-02 | ❌ W0 | ⬜ pending |
| 62-02-03 | 02 | 2 | AB-01 | — | Alphabetical Index + 4 H2 categories (Roles & Permissions, Organizational Units, Content Distribution, Federated Identity + Governance Operations) | structural | `check-phase-62.mjs` V-62-02b | ❌ W0 | ⬜ pending |
| 62-03-01 | 03 | 2 | AB-05 (callout site #1) | T-62-C | `docs/cross-platform/apple-business/00-overview.md` exists with rebrand callout containing all 3 tokens within first 50 lines | structural+content | `v1.6-milestone-audit.mjs` C14 (site #1) | ❌ W0 | ⬜ pending |
| 62-03-02 | 03 | 2 | (style-guide convention) | — | Style-guide HTML-comment-block convention section in `00-overview.md` defining `<!-- ABAUDIT-{##}: ... -->` pattern | structural | `check-phase-62.mjs` V-62-STYLE | ❌ W0 | ⬜ pending |
| 62-04-01 | 04 | 3 | AB-02 | — | `01-role-permission-model.md` exists with Account Holder DO NOT DELEGATE hard-bordered callout | structural | `check-phase-62.mjs` V-62-03 | ❌ W0 | ⬜ pending |
| 62-04-02 | 04 | 3 | AB-03 | — | Full per-permission catalog ~50 rows across 7 in-scope subgroups; Brand-related excluded with pointer | content | `check-phase-62.mjs` V-62-04 (keyword scan for "Edit-without-View" or "Requires" or "Manage MDM Servers") | ❌ W0 | ⬜ pending |
| 62-04-03 | 04 | 3 | AB-03 (OP-3) | — | Edit-without-View dependency table present with cross-subgroup pairs | structural | `check-phase-62.mjs` V-62-04b | ❌ W0 | ⬜ pending |
| 62-05-01 | 05 | 3 | AB-04 | — | `02-ous-architecture.md` exists with OU scoping table (devices/content tokens/MDM servers/accounts/role assignments) | structural | `check-phase-62.mjs` V-62-05 | ❌ W0 | ⬜ pending |
| 62-06-01 | 06 | 3 | AB-07 | T-62-A | `_admin-directory.md` template exists with `<TENANT_FILL_IN>` placeholders + 4 backend types + tenant warning | structural | `check-phase-62.mjs` V-62-11 | ❌ W0 | ⬜ pending |
| 62-06-02 | 06 | 3 | AB-07 / T-62-A | T-62-A | `_admin-directory.md` STILL contains `<TENANT_FILL_IN>` placeholders (upstream-template-integrity check) | security | `check-phase-62.mjs` V-62-11-PII | ❌ W0 | ⬜ pending |
| 62-07-01 | 07 | 4 | AB-05 (callout sites #2 + #3) | T-62-C | `docs/admin-setup-macos/01-abm-configuration.md` intro has 3 tokens within first 50 lines | content | `v1.6-milestone-audit.mjs` C14 (site #2) | ❌ W0 | ⬜ pending |
| 62-07-02 | 07 | 4 | AB-05 (callout site #3) | T-62-C | `docs/admin-setup-ios/02-abm-token.md` intro has 3 tokens within first 50 lines | content | `v1.6-milestone-audit.mjs` C14 (site #3) | ❌ W0 | ⬜ pending |
| 62-07-03 | 07 | 4 | AB-06 (4 banner lines) | — | All 4 existing glossaries (Windows/macOS/Android/Linux) have reciprocal banner line pointing to `_glossary-apple-business.md` | structural | `check-phase-62.mjs` V-62-06..09 (one per glossary) | ❌ W0 | ⬜ pending |
| 62-07-04 | 07 | 4 | AB-06 (inline see-also) | — | `_glossary-macos.md` ABM entry gains inline `See also: [Apple Business]` line | structural | `check-phase-62.mjs` V-62-10 | ❌ W0 | ⬜ pending |
| 62-07-05 | 07 | 4 | (anchor stability) | — | `62-ANCHOR-INVENTORY.md` artifact present recording pre/post anchor lists per PITFALL-6 | structural | `check-phase-62.mjs` V-62-ANCHORS | ❌ W0 | ⬜ pending |
| 62-08-01 | 08 | 5 | AUDIT-09 | — | `scripts/validation/v1.6-milestone-audit.mjs` exists as Path-A copy of v1.5 with C1-C13 preserved | structural | `check-phase-62.mjs` V-62-HARNESS-EXISTS | ❌ W0 | ⬜ pending |
| 62-08-02 | 08 | 5 | AUDIT-10 | T-62-B | C14 blocking: harness exits non-zero if any of 3 tokens missing at any of 3 canonical sites within 50-line window | unit | `check-phase-62.mjs` V-62-C14-UNIT (synthetic missing-token content tests) | ❌ W0 | ⬜ pending |
| 62-08-03 | 08 | 5 | AUDIT-11 | T-62-B | C15 blocking: 8-regex banned-phrase guard passes against drafted v1.6 corpus; HTML-comment allowlist exemption pattern recognized | unit + integration | `check-phase-62.mjs` V-62-C15-UNIT + `v1.6-milestone-audit.mjs` C15 | ❌ W0 | ⬜ pending |
| 62-08-04 | 08 | 5 | AUDIT-12 | T-62-B | C16 blocking: 4-edge triangle algorithm + sidecar `c16_missing_endpoint_exemptions` recognized with `sunset_phase` field | unit + integration | `check-phase-62.mjs` V-62-C16-UNIT + `v1.6-milestone-audit.mjs` C16 | ❌ W0 | ⬜ pending |
| 62-08-05 | 08 | 5 | AUDIT-09 | — | `v1.6-audit-allowlist.json` sidecar exists with `c13_rotting_external` + `c16_missing_endpoint_exemptions` categories | structural | `check-phase-62.mjs` V-62-SIDECAR | ❌ W0 | ⬜ pending |
| 62-08-06 | 08 | 5 | (frontmatter parsing) | — | `+` separator parser implemented; backward-compat against existing platform: values | unit | `check-phase-62.mjs` V-62-FRONTMATTER-PARSE | ❌ W0 | ⬜ pending |
| 62-08-07 | 08 | 5 | AUDIT-13 | — | `scripts/validation/check-phase-62.mjs` exists, exits 0, and asserts all V-62-NN deliverables | self-reference | `check-phase-62.mjs` V-62-SELF | ❌ W0 | ⬜ pending |
| 62-08-08 | 08 | 5 | AUDIT-09 (atomic commit) | — | All 3 harness files committed in ONE atomic commit per v1.5 Plan 60-08 precedent | manual+structural | `git log --name-only -1 <commit_sha>` shows v1.6-milestone-audit.mjs + sidecar + check-phase-62.mjs together | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Threat references:**
- **T-62-A**: `_admin-directory.md` accidental PII exposure (RESEARCH §10 Threat A)
- **T-62-B**: C14/C15/C16 false-negative scenarios (RESEARCH §10 Threat B)
- **T-62-C**: Apple URL external dependency rot (RESEARCH §10 Threat C)

---

## Wave 0 Requirements

All deliverables are Wave 0 — Phase 62 is the v1.6 entry phase with NO pre-existing v1.6 content.

- [ ] Node.js runtime available (already present from v1.5 harness chain)
- [ ] `scripts/validation/v1.6-milestone-audit.mjs` — Path-A copy from v1.5; C1-C13 preserved + C14/C15/C16 + `+` separator parsing
- [ ] `scripts/validation/v1.6-audit-allowlist.json` — new sidecar with `c13_rotting_external` + `c16_missing_endpoint_exemptions` categories
- [ ] `scripts/validation/check-phase-62.mjs` — validator-as-deliverable; ~20+ V-62-NN assertions covering all 12 reqs
- [ ] `docs/_glossary-apple-business.md` — main AB-01 deliverable (at docs/ root, NOT inside cross-platform/apple-business/)
- [ ] `docs/cross-platform/apple-business/00-overview.md` — rebrand callout #1 (AB-05) + style-guide convention section
- [ ] `docs/cross-platform/apple-business/01-role-permission-model.md` — AB-02 + AB-03 + Account Holder callout + per-permission catalog
- [ ] `docs/cross-platform/apple-business/02-ous-architecture.md` — AB-04 + OU scoping table
- [ ] `docs/cross-platform/apple-business/_admin-directory.md` — AB-07 template
- [ ] `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md` — PITFALL-6 pre-edit artifact

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Per-permission catalog scrape from Apple's JS-rendered docs | AB-03 | Apple permission sub-pages JS-rendered, NOT WebFetch-extractable per research SUMMARY.md gaps | Open browser at `https://support.apple.com/guide/business/intro-to-roles-and-privileges-axm97dd59159/web`; navigate each of 7 in-scope subgroup sub-pages; transcribe permissions into 7-column row schema in `01-role-permission-model.md` |
| Atomic-harness-commit verification | AUDIT-09 / Plan 62-08 | Git workflow assertion; cannot be checked by harness itself | Inspect `git log --name-only -1 <commit_sha>` post-Phase 62 close; confirm 3 harness files + sidecar all appear in the single commit |
| Apple URL stability monitoring | T-62-C residual risk | Quarterly cycle; not feasible during phase execution | Initial Apple URL list captured in `_glossary-apple-business.md` rebrand-mapping table; `c13_rotting_external` sidecar quarterly audit (Phase 66 work to schedule) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter (after planner produces final task IDs + final 62-VERIFICATION.md path)

**Approval:** pending (planner will refine task IDs in Wave 2 of plan-checker iteration; this draft pre-populates V-62-NN structure for planner consumption)
