# Requirements: v1.7 Deferred Backlog Closure + Validator Chain Hardening

**Defined:** 2026-05-26
**Core Value:** Validator chain green on Windows AND Linux for the first time. v1.6's deferred backlog (CI-1 ABM URL surgical sweep + CI-2 VPP-location-token rename) closed. CHAIN_SKIP {48, 51, 58, 60, 61} root causes resolved. v1.7 audit harness lineage bumped from v1.6 with C14/C15/C16 inherited. CI-3 (Managed Apple ID corpus rename) deferred to v1.8+ pending Intune portal rebrand adoption.

## v1.7 Requirements (Active)

Requirements for v1.7 release. Each maps to one phase. Phases 67-70 continue from v1.6 close at Phase 66.

### Pillar A — Corpus Surgical Sweeps

- [x] **SWEEP-01**: 4 `business.apple.com` URL refs (per `v1.6-DEFERRED-CLEANUP.md` CI-1 calibrated enumeration at HEAD `ad5c9c9`) are verified against live Apple URL state. Either confirmed-current (no edits required; quarterly cron continues monitoring) OR surgically updated if Apple has issued redirects/sunsets. Each of the 4 files (`admin-setup-ios/05-app-deployment.md:92`, `admin-setup-macos/01-abm-configuration.md:52`, `admin-setup-macos/04-app-deployment.md:105`, `_glossary-macos.md:64`) carries a Version History row if edited; sidecar `c13_rotting_external.ci_1_abm_urls` updated to reflect new state.

- [x] **SWEEP-02**: 6 "VPP location token" / "VPP (Apps and Books) location token" occurrences across 2 files (`admin-setup-ios/05-app-deployment.md:71,201` + `admin-setup-macos/04-app-deployment.md:45,46,113,148`) are surgically renamed to use the new canonical term ("content token" or compound "content token (formerly VPP location token; still labeled 'Apple VPP token' in Intune portal)" per PITFALLS:657 first-mention-per-H2 convention). Each of the 2 files gains a Version History row. Sidecar `c13_rotting_external.ci_2_vpp_location_token` updated to reflect new state (entries removed or marked complete). Harness C11/C15 re-run shows no false positives from the rename.

### Pillar B — CHAIN_SKIP Root-Cause Resolution

- [ ] **CHAIN-01**: CRLF regex mismatch resolved in `check-phase-51.mjs` (Mermaid regex `\n` → `\r?\n` per the documented root cause at `check-phase-64.mjs:65-73`) and `check-phase-58.mjs` (frontmatter parse `\n` → `\r?\n`). Both validators exit 0 on Windows host without CHAIN_SKIP suppression. No false positives introduced (verify against existing PASS state on the other phases the regex touches).

- [ ] **CHAIN-02**: Archive-path detection added to `check-phase-48.mjs` (handle both pre-archival path `.planning/phases/48-...` and post-archival `.planning/milestones/v1.5-phases/48-.../48-VERIFICATION-broken-links.md`); `regenerate-supervision-pins.mjs --self-test` line-number drift fixed via either `v1.5-audit-allowlist.json` line-number rebase OR self-test tolerance for ±1 line drift. Both fixes verified by running validator on existing archived v1.5 directory layout.

- [ ] **CHAIN-03**: Cascade fixes applied to `check-phase-60.mjs` + `check-phase-61.mjs` (downstream of CHAIN-01 + CHAIN-02 root causes); CHAIN_SKIP arrays in `check-phase-62.mjs` through `check-phase-66.mjs` have entries {48, 51, 58, 60, 61} removed; full chain `check-phase-{48..66}.mjs` exits 0 on the local Windows host (no SKIPPED entries). Removal commit is atomic across all 5 v1.6 validator files to preserve indivisibility of the chain-validator topology.

### Pillar C — CI-Linux Hardening

- [ ] **CILINUX-01**: A new `ubuntu-latest` runner job is added to the v1.7 CI workflow (or extended into v1.6 if scope permits) that runs the full validator chain `check-phase-{48..70}.mjs` + `v1.x-milestone-audit.mjs` on Linux LF line endings. Job is PR-blocking (`continue-on-error: false`) per D-A9 inheritance. Catches CRLF-style regressions before they hit Windows local. Coexists with existing per-version workflows (`audit-harness-integrity.yml` v1.4 + `audit-harness-v1.5-integrity.yml` + `audit-harness-v1.6-integrity.yml`) — no modifications to older workflow files.

### Pillar D — v1.7 Audit Harness Lineage Bump

- [ ] **HARNESS-01**: `scripts/validation/v1.7-milestone-audit.mjs` ships as Path-A copy from `v1.6-milestone-audit.mjs` with C1-C13 + C14/C15/C16 preserved; lineage extends `v1.4-milestone-audit.mjs` → `v1.4.1-milestone-audit.mjs` → `v1.5-milestone-audit.mjs` → `v1.6-milestone-audit.mjs` → `v1.7-milestone-audit.mjs`. Harness exits 0 with all 15+ checks PASS in fully-blocking mode (C1-C13 inherited + C14/C15/C16 v1.6 new + any v1.7-specific additions if needed).

- [ ] **HARNESS-02**: `scripts/validation/v1.7-audit-allowlist.json` ships as Path-A copy from `v1.6-audit-allowlist.json` with `c13_rotting_external` reset for v1.7 (CI-1/CI-2 entries reflect post-SWEEP-01/SWEEP-02 state); `c16_missing_endpoint_exemptions: []`; sidecar shape preserved; `quarterly_audit` metadata carried forward (cadence `0 8 1 1,4,7,10 *`); BASELINE_11 freshness comment added to `regenerate-supervision-pins.mjs` closing BASELINE_10 v1.6 carry-over per per-milestone AUDIT-14-equivalent contract.

- [ ] **HARNESS-03**: Per-phase validators `check-phase-67.mjs..check-phase-70.mjs` ship as deliverables (validator-as-deliverable pattern from v1.3+); each is Path-A from `check-phase-66.mjs` with phase-specific V-NN-NN assertions for that phase's deliverables; CHAIN_PHASES does NOT include the validator's own phase (V-NN-SELF guard per `check-phase-65.mjs:151`).

- [ ] **HARNESS-04**: `.github/workflows/audit-harness-v1.7-integrity.yml` ships as Path-A copy from `audit-harness-v1.6-integrity.yml` with: (a) path-filter swapped to v1.7-scoped files (`scripts/validation/v1.7-*` + any v1.7 docs surface + workflow self-reference); (b) 2 crons preserved (weekly bitrot + quarterly `rotting-external-quarterly`); (c) v1.7 validator jobs `check-phase-67..70`; (d) PR-blocking per D-A9 (only `pin-helper-advisory` retains `continue-on-error: true`); (e) coexists with v1.4/v1.5/v1.6 workflows. **Composes with CILINUX-01:** the v1.7 workflow includes the new ubuntu-latest runner job.

- [ ] **HARNESS-05**: Terminal re-audit at Phase 70 close runs `v1.7-milestone-audit.mjs` + full chain `check-phase-{48..70}.mjs` from a fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-<rand>` via fresh `gsd-executor` sub-agent (D-22 INTENT via D-03 mechanism — STRICTER physical isolation than worktree; reconciles with `.planning/config.json:7` `use_worktrees:false`). Harness + all chain validators exit 0 with NO CHAIN_SKIP entries (Pillar B resolved them). Auditor-independence verified at execution start: zero context-carryover from Plans 67-01..70-N author-agents.

- [ ] **HARNESS-06**: `.planning/milestones/v1.7-MILESTONE-AUDIT.md` authored (Path-A from `v1.6-MILESTONE-AUDIT.md` template) confirming all checks PASS, all v1.7 requirements closed, and 4-phase scope delivered with closing commit SHAs; `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` finalized carrying CI-3 (Managed Apple ID, 45 occurrences) + Multi-tenant Apple Business + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM forward to v1.8+. PROJECT.md traceability closure — all v1.7 reqs flipped Active→Validated with closing commit SHAs; ROADMAP.md Progress table reflects 4/4 phases Complete; STATE.md milestone close recorded.

## v1.8+ Requirements (Deferred)

Deferred to future release. Tracked but not in v1.7 roadmap.

### Carried forward from v1.6-DEFERRED-CLEANUP.md (now v1.7-DEFERRED-CLEANUP.md at v1.7 close)

- **CI-3**: Managed Apple ID → Managed Apple Account corpus-wide rename (45 occurrences across 16 files). Contingent on Microsoft Intune adopting the rebrand portal-side; until then, sweeping the corpus creates term-mismatch with admin's actual portal experience.
- **Multi-tenant Apple Business surfaces**: Q2 explicit scope-out for v1.6/v1.7; requires separate planning + new C16 cross-link surfaces. Deferred indefinitely unless multi-org-account scenarios surface.
- **Apple Business Device API documentation**: Apple has not yet published developer.apple.com landing for the Apple Business Device API; acknowledge-but-do-not-document-deeply in `01-role-permission-model.md`. Sweep when Apple publishes.
- **Per-OU Conference Room Display deep-dive**: Apple deployment guides thin on per-OU partitioning for CRD; tracker only — no acute customer demand.
- **Account Holder lockout dedicated recovery runbook**: Currently handled as a 7-leaf branch in L2 #26 decision tree per Phase 65 D-02 hybrid. Promote to standalone L1/L2 runbook IF customer support escalations surface.
- **Apple School Manager (ASM) education-specific surfaces**: Outside enterprise scope; defer to v1.8+ only if education-tenant scope explicitly opens.

### New deferrals if discovered during v1.7 execution

- **(reserved)**: Any v1.7 author-discovery items will be appended here and migrated to `v1.7-DEFERRED-CLEANUP.md` at Phase 70 close.

## Out of Scope

Explicitly excluded from v1.7. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CI-3 Managed Apple ID corpus rename | Trigger condition not met — Intune portal still shows "Managed Apple ID" as of 2026-04-30 tutorial refresh; sweeping would cause term-mismatch with admin's portal experience. Deferred to v1.8+. |
| Multi-tenant Apple Business workflows | v1.6 Q2 explicit scope-out; v1.7 inherits the boundary. Multi-tenant requires new architectural decisions, not cleanup. |
| New platform support (ChromeOS / iOS 27 / Android 16 / Windows 11 25H2) | v1.7 is a cleanup milestone; new platform support belongs in its own scoped milestone. |
| Backend integration / AI-assisted L1 triage / frontend wiring | v1.7 scope is harness + corpus cleanup only; integration work belongs in a dedicated milestone. |
| Adding new C-checks to harness beyond inheritance | v1.7 inherits C1-C16 from v1.6 Path-A; new C-checks belong in a milestone that drives the docs requiring them. |
| Worktree-lifecycle remediation on Windows | User's standing constraint `use_worktrees:false` is durable per memory `project_execphase_sequential.md` + `.planning/config.json:7`. Fresh-clone D-03 mechanism is the chosen permanent workaround. |
| 60-day re-verification of v1.5/v1.6 docs | Routine maintenance — handled as it comes due via individual doc edits, not bundled into a milestone. |

## Traceability

Which phases cover which requirements. Populated by `/gsd-roadmapper` during ROADMAP.md creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SWEEP-01 | Phase 67 | Complete |
| SWEEP-02 | Phase 67 | Complete |
| CHAIN-01 | Phase 68 | Pending |
| CHAIN-02 | Phase 68 | Pending |
| CHAIN-03 | Phase 68 | Pending |
| CILINUX-01 | Phase 69 | Pending |
| HARNESS-01 | Phase 70 | Pending |
| HARNESS-02 | Phase 70 | Pending |
| HARNESS-03 | Phase 70 | Pending |
| HARNESS-04 | Phase 70 | Pending |
| HARNESS-05 | Phase 70 | Pending |
| HARNESS-06 | Phase 70 | Pending |

**Coverage:**
- v1.7 requirements: 12 total
- Mapped to phases: 12 of 12 ✓ (100% — no orphans, no duplicates)
- Unmapped: 0
- Phase distribution:
  - Phase 67 (Pillar A — Corpus Surgical Sweeps): 2 reqs (SWEEP-01, SWEEP-02)
  - Phase 68 (Pillar B — CHAIN_SKIP Root-Cause Resolution): 3 reqs (CHAIN-01, CHAIN-02, CHAIN-03)
  - Phase 69 (Pillar C — CI-Linux Hardening): 1 req (CILINUX-01)
  - Phase 70 (Pillar D — v1.7 Harness Lineage Bump + Milestone Close): 6 reqs (HARNESS-01..06)

---
*Requirements defined: 2026-05-26*
*Last updated: 2026-05-26 — /gsd-roadmapper traceability mapping complete; 12/12 v1.7 requirements mapped to 4 phases (67-70); coverage 100%, no orphans, no duplicates*
