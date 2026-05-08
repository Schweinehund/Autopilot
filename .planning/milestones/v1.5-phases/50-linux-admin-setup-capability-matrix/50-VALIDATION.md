---
phase: 50
slug: linux-admin-setup-capability-matrix
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-27
---

# Phase 50 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution. Phase 50 is documentation-content-only; the 8 validation dimensions map to structural integrity properties.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `check-phase-50.mjs` (Node.js ESM, file-reads-only pattern; mirrors check-phase-49.mjs) |
| **Config file** | none — standalone validator |
| **Quick run command** | `node scripts/validation/check-phase-50.mjs` |
| **Full suite command** | `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/check-phase-50.mjs` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/check-phase-50.mjs` (structural checks only)
- **After every plan wave:** Run `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/check-phase-50.mjs` (full suite)
- **Before pre-commit (D-20 8-step gate):** Full suite must be green; PLUS regenerate-supervision-pins --self-test, markdown-link-check, frontmatter probe, closed-set probe, LIN-05 anchor probe, cross-link literal probe
- **Max feedback latency:** 5 seconds for quick run; ~30 seconds for full suite

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 50-NN-01..N | 50-01 (admin guides) | A | LIN-03/04/05 | n/a — docs | PITFALL-1/2/3 callouts present | Content assertion | `node scripts/validation/check-phase-50.mjs` V-50-20/21/22 | ❌ Wave 0 | pending |
| 50-NN-02..N | 50-02 (end-user file) | A | LIN-06 | n/a | 5 H2s present + cross-link literal | Structural | V-50-11, V-50-13 | ❌ Wave 0 | pending |
| 50-NN-03..N | 50-03 (matrix) | B | LIN-13 | n/a | 6 domain H2s + Equivalences H2 + 3-status closed set | Structural + content | V-50-14 through V-50-17 | ❌ Wave 0 | pending |
| 50-NN-04..N | 50-04 (validator) | C | AUDIT-06 | n/a | check-phase-50.mjs exits 0; 26 V-50 checks pass | Execution | `node scripts/validation/check-phase-50.mjs` | ❌ Wave 0 | pending |
| 50-NN-05..N | 50-05 (metadata corrections) | C | n/a — Phase 49 D-17/D-18 precedent | n/a | ROADMAP + REQUIREMENTS edits per D-22 bundle | Diff inspection | `git diff --cached` | ❌ Wave 0 | pending |

---

## Validation Dimensions (Nyquist 8-Dimension Map)

### Dimension 1 — Doc Structural Integrity (H2 pinning)

H2 headings on each content file match locked decisions exactly. Renamed/missing H2s break Phase 51 + Phase 58 + Phase 59 cross-references.

| File | H2 Set Expected | Decision | Validator |
|------|-----------------|----------|-----------|
| `02-enrollment-profile.md` | Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also (5 H2s) | D-08 | V-50-09 |
| `linux-intune-portal-enrollment.md` | 5 H2s per D-09 | D-09 | V-50-11 |
| `linux-capability-matrix.md` | 10 H2s per D-06 (6 domain + Equivalences + Key Gaps + See Also + Version History) | D-06 | V-50-14 |
| `00-overview.md` through `05-conditional-access.md` | File exists + no forbidden H2s | D-24 | V-50-23, V-50-24 |

### Dimension 2 — Cross-Reference Correctness (cross-link literals)

Mandatory bidirectional cross-links between admin file and end-user file (D-10).

| Source | Required Literal | Decision | Validator |
|--------|------------------|----------|-----------|
| `02-enrollment-profile.md` | `../end-user-guides/linux-intune-portal-enrollment.md` | D-10 | V-50-12 |
| `linux-intune-portal-enrollment.md` | `../admin-setup-linux/02-enrollment-profile.md` | D-10 | V-50-13 |

### Dimension 3 — Frontmatter Compliance (C10 contract)

`platform: Linux` + correct `audience` per file role + 60-day `last_verified`/`review_by` cycle on all 8 content files. Required for v1.5-milestone-audit.mjs C10 blocking check.

Validator: V-50-25 + v1.5-milestone-audit.mjs C10

### Dimension 4 — Content Correctness (PITFALL callouts)

| File | Callout | Required Literal | Validator |
|------|---------|------------------|-----------|
| `04-app-delivery.md` | PITFALL-1 scope | "script-based only" or "no Win32" | V-50-20 |
| `03-compliance-policy.md` | PITFALL-2 CA constraint | `Require device to be marked as compliant` + ("not available"/"not supported") | V-50-21 |
| `01-intune-linux-agent.md` | PITFALL-3 deb-vs-Snap | "deprecated" or "preview" applied to Snap | V-50-22 |

### Dimension 5 — Linux Column Closed-Set (3-status contract)

Linux column cells in 6 domain H2 tables of `linux-capability-matrix.md` use only `Supported`, `Partial`, or `Not supported` (with optional `— qualifier` suffix). Inherited from Phase 49 DPO-02 / CDI-01.

Validator: V-50-16 (column-aware regex extending V-49-07 cell-indexing pattern; cell index 2 in `| Feature | Windows | Linux |`)

### Dimension 6 — CA Cell Literal (PITFALL-2 inheritance)

CA domain H2 Linux column row reads exactly `Not supported — web-app CA only` (Phase 49 V-49-08 precedent).

Validator: V-50-15

### Dimension 7 — Anti-Duplication Guards (DPO-03 + 2A/2B/2C drift)

- `00-overview.md` does NOT contain `## For Admins Familiar with Windows / macOS / Android` H2 (DPO-03 anti-duplication)
- `02-enrollment-profile.md` does NOT contain `## End-User Enrollment Steps`, `## Appendix:`, or `## Validate End-User Flow` H2s (regression guard against rejected 2A/2B/2C options)

Validator: V-50-10, V-50-23, V-50-24

### Dimension 8 — Audit Harness Compliance

Phase 50 commit passes v1.5-milestone-audit.mjs C1-C12 blocking checks with no new regressions. Integration gate before final commit.

Command: `node scripts/validation/v1.5-milestone-audit.mjs --verbose`

---

## Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists |
|--------|----------|-----------|-------------------|-------------|
| LIN-03 | Admin enrollment config guide (`02-enrollment-profile.md`) with 5 H2s + P1/P2 prereqs | Structural | V-50-09 | ❌ Wave 0 |
| LIN-04 | Compliance guide opens with PITFALL-2 callout; 4 categories covered | Content assertion | V-50-21 | ❌ Wave 0 |
| LIN-05 | Identity Broker pitfall callout in `01-intune-linux-agent.md` with DPO-01 back-link to Phase 49 H3 anchor | Content assertion | V-50-18, V-50-19 | ❌ Wave 0 |
| LIN-06 | End-user file exists with 5 H2s + cross-link to admin file | Structural | V-50-11, V-50-13 | ❌ Wave 0 |
| LIN-13 | Capability matrix bilateral Win\|Linux; 6 domain H2s incl. CA elevated; 3-status closed set; ≥3 Equivalences pairs; CA cell literal | Structural + content | V-50-14 through V-50-17 | ❌ Wave 0 |
| AUDIT-06 | `check-phase-50.mjs` validator ships with content; CI registered (lazy-skip pre-existing) | Execution | `node scripts/validation/check-phase-50.mjs` exits 0 | ❌ Wave 0 |

---

## Wave 0 Gaps

All Phase 50 content files are NEW. The validator (`check-phase-50.mjs`) is itself a Wave 0 deliverable. No pre-existing test infrastructure covers Phase 50.

- [ ] `scripts/validation/check-phase-50.mjs` — primary deliverable; 26 V-50-NN checks
- [ ] `docs/admin-setup-linux/00-overview.md` through `05-conditional-access.md` — 6 admin guides
- [ ] `docs/end-user-guides/linux-intune-portal-enrollment.md` — end-user guide (NEW file)
- [ ] `docs/reference/linux-capability-matrix.md` — bilateral matrix (NEW file)
- [ ] 4 metadata corrections: ROADMAP line 119 + ROADMAP line 188 (SC#4) + REQUIREMENTS line 148 (LIN-06) + REQUIREMENTS line 87 (AUDIT-06)

---

## Security Domain

Phase 50 is documentation-only. No application code, no auth flows, no data handling, no cryptographic operations. ASVS categories are not applicable.

Security-relevant content of Phase 50:
- PITFALL-2 callout (D-04 architectural) prevents admins from misconfiguring CA policies — security architecture guidance
- PITFALL-3 callout ensures deb-only delivery path from packages.microsoft.com — supply chain hygiene documentation

`workflow.security_enforcement` may be set to `false` for this phase, OR the `<threat_model>` in plans should explicitly note "documentation-only; no security threats applicable".

---

## Notes

- Phase 50 has NO pin-coord refresh need (zero existing-pinned-file modifications) — PITFALL-12 surface is null; `regenerate-supervision-pins.mjs --self-test` runs but should be no-op.
- D-20 pre-commit gate is the integration test surface; 8 steps run before `git commit`.
- Auto-advance pipeline: this VALIDATION.md is consumed by gsd-planner (informs task `acceptance_criteria`); gsd-plan-checker enforces Dimension 8 coverage; gsd-executor runs the validator at task-commit boundaries; gsd-verifier runs full suite at phase-close gate.
