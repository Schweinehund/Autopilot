# Requirements: v1.18 Device Configuration Recipes (AVD Shared Windows + Shared iPad) & Chain-Validator Debt Closure

**Defined:** 2026-07-16
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Intune without escalating to engineering — v1.18 adds reproducible device-configuration *recipes* (step-by-step provisioning with embedded admin decision points) and clears the chain-validator tooling debt.

## v1.18 Requirements

Requirements for this milestone. Each maps to roadmap phases (Phase 129+).

### Device Recipe Doc Class (CLASS)

- [x] **CLASS-01**: The Device Recipe doc class is formally defined — `docs/_standards/EEE-SOP-standard.md` gains a D-02 edge-case ruling row (recipe → `doc_type: Guide`; the closed 4-value enum is NOT extended) plus a written spec for the **admin decision-point block** format. The block format itself (decision table vs. `> **Ask the admin:**` blockquote vs. composite — grounded option space in `.planning/research/ARCHITECTURE.md`) is a **discuss-phase gray area resolved via `/adversarial-review`**, constrained by C17 #12 (200-char top-level blockquote cap) and the no-key-info-in-code-fences rule.
- [x] **CLASS-02**: A canonical recipe template exists in `docs/_templates/` — EEE-conformant (frontmatter → rendered header block → `## Summary`-first), C17-green, containing a worked decision-point block example and the TEMPLATE-SENTINEL convention.
- [ ] **CLASS-03**: Both recipes live in a new top-level `docs/recipes/` directory, carry RE-NNN registry rows in `docs/_registry/RE-index.md`, flip to `Status: Approved` when done, and enter the publish set via a regenerated (never hand-edited) `filename-map.md` — zero pipeline code changes.
- [ ] **CLASS-04**: Recipes are reachable from `docs/index.md` via a new recipes section (navigation-last discipline; troubleshooting hubs `common-issues.md`/`quick-ref-l1/l2.md` are NOT wired — recipes are provisioning Guides, not troubleshooting docs).

### Recipe #1 — Shared Windows AVD-Client Device (AVD)

- [ ] **AVD-01**: An Intune admin can follow a linear happy-path recipe from zero to a working self-deploying Entra-joined shared AVD-client device: APv1 self-deploying deployment profile (Entra-join only) → device-phase-only ESP → dynamic device group → Windows App deployed as Microsoft Store app, Required to a device group → AVD feed/workspace subscription URL configured device-context → verification steps. Link-not-copy to existing RE-084 (self-deploying), ESP policy, dynamic groups, and RE-177 (apv1-vs-apv2) docs. Plan-time verification flags: `RemoteDesktop/AutoSubscription` device-vs-user CSP scope (research conflict), MSRDC retirement date first-party citation.
- [ ] **AVD-02**: The recipe's dominant fork — **Assigned Access kiosk lockdown vs. Shared PC mode shared desktop** — is an embedded admin decision-point block, and BOTH paths are worked fully as step-by-step branches: the kiosk path (Assigned Access packaging for Windows App, autologon — MEDIUM-confidence `Azure/WindowsAppKiosk` sourcing needs plan-time verification) and the Shared PC path (SharedPC CSP: `EnableSharedPCMode`, `AccountModel`, `DeletionPolicy`, `RestrictLocalStorage`, cleanup exemptions, guest sign-in decision points). The Shell-Launcher/Assigned-Access mutual-exclusion constraint is stated.
- [ ] **AVD-03**: The recipe carries explicit anti-feature callouts for the four highest-cost mistakes: hybrid Entra join (fails self-deploying), APv2/Device Preparation (no self-deploying support), Wi-Fi at OOBE (pending plan-time verification of current behavior), and the retired legacy Remote Desktop client (MSRDC, retired 2026-03-27 — Windows-App-only guidance).
- [ ] **AVD-04**: Session hygiene and patch cadence are covered as admin decision points: Windows App session-reset behaviors (`ResetAppOnCloseOnly`/`ResetAppAfterConnection`/`ResetAppOnIdle`), Shared PC `InactiveThreshold` idle handling, and a kiosk-tuned update ring / maintenance window aligned with `MaintenanceStartTime`.
- [ ] **AVD-05**: The wired-vs-Wi-Fi-post-enrollment decision point conditionally routes to the existing v1.14 802.1X corpus (`docs/admin-setup-8021x/*`) as an if-then cross-link branch — 802.1X content is linked, never inlined.

### Recipe #2 — Shared iPad (IPAD)

- [ ] **IPAD-01**: An Intune admin can follow a linear happy-path recipe from zero to a working Shared iPad: ADE enrollment profile (Shared iPad = Yes + Supervised + no user affinity, with the wipe-if-changed-post-enrollment warning) → device eligibility floors (32 GB min / 64 GB+ recommended, iPadOS 13.4+) → federated Managed Apple Account sign-in (cross-link OU-06, not re-authored) → device-licensed VPP apps Required to device groups → the device-vs-user profile-applicability split reproduced as a table → home screen layout → verification. Cross-references (does not duplicate) the OU-07 Shared iPad lifecycle doc.
- [ ] **IPAD-02**: The recipe leads with the **unsupported-feature callouts** — compliance policies, Conditional Access, app protection policies, email profiles, Company Portal, "Available" app intent, and user-licensed VPP are all explicitly unsupported on Shared iPad, documented with WHY (not silently omitted; the fixed 8-char passcode behavior noted, grace period as the only knob) — and embeds the **temporary/guest sessions on-or-off** admin decision-point block (enabled by default; the admin must explicitly decide).
- [ ] **IPAD-03**: A per-role layered-configuration worked example shows the device-group baseline + user-group overlay pattern (common Wi-Fi/apps on the device group; per-role home screen layout / allow-lists on user groups) including the never-set-the-same-setting-twice conflict warning.
- [ ] **IPAD-04**: Storage/session sizing is covered as admin decision points: per-user storage quota (`QuotaSize`, iPadOS 17+ — Settings Catalog exposure path is a plan-time verification flag), session idle timeout + offline grace period values, and cached-users-per-device planning guidance (framed as a planning decision, not a config field).

### Corpus Hygiene (HYG)

- [ ] **HYG-04**: The RE-084 (`docs/admin-setup-apv1/08-self-deploying.md`) "Wi-Fi unsupported for self-deploying" claim is verified against current Microsoft Learn at plan time; if confirmed stale, RE-084 is corrected (freshness-stamp rules per the v1.15 D2/META-04 reformat-only convention do NOT apply — this is a content correction, so `last_verified` updates). If confirmed still accurate, no edit is made and the verification result is recorded.

### Chain-Validator Tooling Debt (TOOL)

- [ ] **TOOL-04**: `FROZEN-AWARE-ADOPTION-SWEEP-01` is resolved — the 11 standalone-RED predecessor CI workflows (v1.4–v1.16 harness jobs + base harness-replay, HYG-02 −1 line-shift root cause) are made green or formally re-dispositioned. The approach — (a) targeted re-pin of the affected frozen `-audit-allowlist.json` sidecar `{file,line}` pins vs. (b) frozen-aware own-close-snapshot reads for `v1.4-v1.16-milestone-audit.mjs` + `regenerate-supervision-pins.mjs` — is a **discuss-phase gray area resolved via `/adversarial-review`** (a genuine D-00a frozen-surface-edit exception decision).
- [ ] **TOOL-05**: `O(n²)-CHAIN-RUNNER-REMEDIATION-01` is resolved — chain-validator subprocess results are cached within a single apex invocation so the deepening chain apex ([48..128] at this close) stops O(n²) cold-spawning; Windows cold-clone apex behavior verified post-fix (Linux GHA remains authoritative per D-03).
- [ ] **TOOL-06**: Smaller carried chain-validator retrospective nits are closed: `HELPER-SPAWN-STDERR-01` residual slice-budget tuning at the 3 helper-spawn stderr sites (`check-phase-{48,60,61}.mjs`), plus any `DEFER-119-A` advisory-RED resolution that falls out of the TOOL-04 approach decision.

### Harness Close (HARN)

- [ ] **HARN-11**: `_lib/frozen-at-close.mjs` gains the **V117** entry (v1.17 close-gate SHA recovered via the dual-token positive-confirmation `git log --all --grep` method, verifying the returned commit's SUBJECT LINE carries both tokens per the v1.17 false-positive caveat) + `readAtV117Close` export — the mandatory back-anchor invariant freezing the v1.17 corpus per `V117-PIN-DEFERRAL`.
- [ ] **HARN-12**: 16th Path-A audit-harness lineage bump — `v1.18-milestone-audit.mjs` (Path-A from v1.17, C1-C17 inherited) + `v1.18-audit-allowlist.json` + BASELINE_22 + `check-phase-129..NN.mjs` validators (chain-apex continues the `[48..N-1]` invariant) + `audit-harness-v1.18-integrity.yml` (15th parallel CI coexistence workflow). Predecessor frozen surfaces byte-unchanged EXCEPT the explicitly-scoped TOOL-04 remediation (whichever approach wins at discuss-phase) — NO value-masking, `CHAIN_SKIP` empty. Full predecessor chain run BEFORE authoring the close-gate per `LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01`.
- [ ] **HARN-13**: Milestone closed via 3-axis terminal re-audit (fresh `git clone --no-hardlinks` + cross-OS Linux GHA authoritative for both chain validators per D-03 + fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH) + SINGLE close-gate commit flipping all v1.18 requirements to Validated across PROJECT/ROADMAP/STATE/REQUIREMENTS + `v1.18-MILESTONE-AUDIT.md` + `v1.18-DEFERRED-CLEANUP.md`.

## Future Requirements

Deferred to future milestones. Tracked but not in the current roadmap.

### Recipes (future)

- **RCPFUT-01**: Windows 365 Boot sibling recipe (Cloud PC boot-to-sign-in) — distinct product surface from AVD host pools; do not conflate.
- **RCPFUT-02**: Multi-host-pool / multi-workspace subscription scenarios for the AVD recipe.
- **RCPFUT-03**: Automation/scripting layer (Graph/PowerShell bulk configuration) beyond the manual admin-center walkthrough.

### Carried backlog (unchanged from v1.17-DEFERRED-CLEANUP.md)

- **MTPSSO-01/02/03 + PSSO-FUT-03** — multi-tenant Platform SSO (own architectural milestone)
- **KRBFUT-01/02** — on-prem-AD-only Kerberos deep-dive + Azure Files Cloud-Kerberos GA
- **CI-3** — Managed Apple ID → Managed Apple Account corpus rename (gated on Intune portal adoption)
- **AOSP-wired 802.1X + Cloud PKI / Certificate Connector deep-dive**
- **Deployment/infra:** SharePoint content-approval gating, Azure AI Search structured index, Graph-API auto-upload of the publish bundle

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| AVD infrastructure setup (host pools, session hosts, FSLogix, RDP host properties) | Scope guardrail — recipe is device/Intune config only; assumes AVD exists (mirrors v1.14 802.1X "assumes RADIUS exists") |
| Windows 365 Cloud PC / Windows 365 Boot | Different product surface than AVD host pools; deferred as RCPFUT-01 |
| Entra "Shared device mode" (SDM/Global Sign-Out) for the Windows recipe | iOS/Android-only feature — a name-collision trap; Windows uses SharedPC CSP (the recipe documents this explicitly as an anti-feature) |
| Compliance policy / Conditional Access / app protection configuration on Shared iPad | Unsupported by the platform per Microsoft Learn known limitations — the recipe documents the limitation and why, never configures it |
| Shared iPad SCIM/OIDC+JIT Managed Apple Account provisioning depth | Tenant-level ABM concern already covered at OU-06; recipe cross-links |
| `doc_type` enum extension (a 5th "Recipe" value) | Closed 4-value taxonomy locked by v1.15/v1.16 precedent; recipes are `doc_type: Guide` with a D-02 ruling row |
| Editing frozen predecessor harness/sidecar surfaces beyond the TOOL-04 scoped remediation | D-00a doctrine; any exception is exactly the TOOL-04 discuss-phase decision, nothing broader |
| V118 pin (freezing the v1.18 corpus) | Back-anchor circularity — the successor milestone's job (V118-PIN-DEFERRAL will be recorded at close) |

## Discuss-Phase Gray Areas (NOT resolved at roadmap — project convention)

1. **CLASS-01 decision-point block format** (DOMINANT for the content pillar): decision table vs. short blockquote vs. composite — resolve via `/adversarial-review` against the C17 #12 / no-code-fence constraints.
2. **TOOL-04 approach** (DOMINANT for the tooling pillar): (a) targeted frozen-sidecar re-pin vs. (b) frozen-aware own-snapshot reads — resolve via `/adversarial-review`; genuine D-00a exception decision.
3. AVD-02 kiosk-path depth: how far the Assigned Access packaging steps go given MEDIUM-confidence sourcing (verify `Azure/WindowsAppKiosk` guidance against first-party docs at plan time).
4. AVD-01 feed-subscription mechanism: device-context vs. user-context `AutoSubscription` + bootstrap-first-sign-in fallback design (plan-time verification feeds this).
5. HYG-04 disposition: fix-or-record decided by the plan-time verification result.

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CLASS-01 | 129 | Complete |
| CLASS-02 | 129 | Complete |
| CLASS-03 | 132 | Pending |
| CLASS-04 | 132 | Pending |
| AVD-01 | 130 | Pending |
| AVD-02 | 130 | Pending |
| AVD-03 | 130 | Pending |
| AVD-04 | 130 | Pending |
| AVD-05 | 130 | Pending |
| IPAD-01 | 131 | Pending |
| IPAD-02 | 131 | Pending |
| IPAD-03 | 131 | Pending |
| IPAD-04 | 131 | Pending |
| HYG-04 | 130 | Pending |
| TOOL-04 | 133 | Pending |
| TOOL-05 | 133 | Pending |
| TOOL-06 | 133 | Pending |
| HARN-11 | 134 | Pending |
| HARN-12 | 134 | Pending |
| HARN-13 | 134 | Pending |

**Coverage:**
- v1.18 requirements: 20 total
- Mapped to phases: 20/20 ✓
- Unmapped: 0

---
*Requirements defined: 2026-07-16*
*Last updated: 2026-07-16 after roadmap creation (Phases 129-134)*
