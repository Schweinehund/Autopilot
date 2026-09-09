---
phase: "155"
slug: "rcp-walk-up-avd-kiosk-recipe-formalization"
status: verified
# threats_open = count of OPEN threats at or above workflow.security_block_on severity (the blocking gate)
threats_open: 0
asvs_level: 1
created: "2026-09-03"
---

# Phase 155 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

This phase is where third-party executable content and owner-supplied Intune payloads first entered
this repository, on a branch that `HARN-06` pushes to a **public** GitHub remote
(`github.com/Schweinehund/Autopilot.git`). The register below is the union of the six plan-time
`<threat_model>` blocks (155-01 through 155-06), reconciled against the implementation.

Plan 155-03's output section and `155-06-SUMMARY.md:291` both named `/gsd-secure-phase` as the
retroactive verification owed for this phase. This document discharges that debt.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| owner's pilot device → tracked tree | Ten RCP-09 artifacts authored against one live tenant crossed into a tree pushed to a public remote. | ConfigMgr CMG FQDN, site code, employer name, tenant/app GUIDs |
| upstream GitHub → tracked tree | Vendored PowerShell and XML from `Azure/WindowsAppKiosk`, a repository nothing here had validated. | Third-party executable content |
| committed script → a reader's fleet, as SYSTEM | Two scripts delete provisioned packages, registry launch points, scheduled tasks and user profiles, unattended and daily, on every enrolled kiosk. | Irreversible device state mutation |
| Draft document → published Approved corpus | The RE-237 flip makes the recipe a member of the `.docx` bundle and of the index that grounds an answer engine. | Published guidance a reader acts on |
| `.gitignore` → clone fidelity | `existsSync` reads the working tree; a gitignored asset passes every local gate and is absent from every clone. | Asset completeness |
| plan text → frozen predecessor validators | `check-phase-135.mjs` is a v1.19 frozen surface held byte-unchanged by D-00a and re-measured at close. | Validator integrity |
| working tree → public git remote | Anything committed is public and, for a secret, unrecoverable from HEAD alone. | All of the above |

---

## Threat Register

51 threats across six plans (38 `mitigate`, 13 `accept`); 27 at severity `high`, the
`workflow.security_block_on` threshold. Five high-severity threats could not be closed at grep depth
and were routed to `gsd-security-auditor` for a full-read audit; the remainder were closed by the
phase's own recorded gate evidence and by the mechanical checks re-run during this audit.

### Audited set — full-read verification by `gsd-security-auditor` (2026-09-03)

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-155-02-07 | Elevation of privilege | vendored PowerShell run as SYSTEM by a reader | high | mitigate | Per-file attribution at pinned SHA `17e1c09b4883ea2062bef801ae24bbc9722861d7` with SHA256 recorded per copy (`NOTICE:53-69,188-210`). Full read of both vendored `Deploy-WindowsApp.ps1` copies and `Detect-WindowsApp.ps1`: download target is a Microsoft-owned `go.microsoft.com` fwlink over HTTPS, no TLS bypass, no `Invoke-Expression` on fetched content, no credential handling; path construction confined to `$PSScriptRoot` and the script-scoped `SystemTemp` subfolder; the single `-Recurse -Force` delete targets only that subfolder. | closed |
| T-155-03-01 | Information disclosure | ConfigMgr package source | high | mitigate | `Install-ConfigMgrClient.ps1:17-21` verified live — all five value classes are angle-bracketed placeholders. GUID-shaped scan over `assets/` returns exactly the two values `NOTICE` documents. Independent greps for share paths, emails, secret/key patterns and non-Microsoft hostnames return zero. Employer name scrubbed to `<ORGANIZATION>` at `New-IntuneWindowsAppKiosk.ps1:37` and `KioskBaseline-Invoke-AppDeployToolkit-functions.ps1:19`. Full read of every remaining ConfigMgr/PSADT/build file found no further leakage. | closed |
| T-155-03-02 | Elevation of privilege | `Remove-KioskOemBloat.ps1`, `Remove-KioskRunTasks.ps1` | high | mitigate | Exhaustive verb enumeration across all three byte-identical deployment copies (`c7eb70c2…`, `8ebd33d4…`, matching `NOTICE`). Every destructive call gated: OemBloat `:36` (gate `:35`), `:43` (gate `:42`); RunTasks `:27`, `:34`, `:51-57`, `:59`, `:63`, `:70`, `:78`. The `kioskUser` regex guard is present at `:66` and `:76`, wraps both the orphan-profile-deletion loop and the OneDrive-payload removal, and fail-closes to `WARN` + skip at `:72-73`. | closed |
| T-155-03-03 | Tampering | vendored `RemoveBloat.ps1` | high | mitigate → **not applicable** | The component was never delivered and does not exist in the tree; no committed script invokes or downloads it. `docs/recipes/06-walk-up-avd-kiosk-autologon.md:204,225` and `NOTICE:332-342` describe it only as a still-open "Ask the admin" decision (D-34 deferred). Closed as an honest documented gap, not as an executed mitigation. | closed |
| T-155-03-06 | Denial of service | a reader's kiosk fleet | high | mitigate | The gate set above, plus the irreversibility disclosure confirmed intact at `docs/recipes/06-walk-up-avd-kiosk-autologon.md:273` — "The removal work they perform is not reversible: deprovisioned packages and deleted launchers return only with a reimage." (Line shifted from the plan's cited `:257` by later 155-05 edits; wording un-weakened.) | closed |

### Supply chain and vendoring — plan 155-02

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-155-02-01 | Tampering | vendored upstream content | high | mitigate | Fetched only at full commit SHA `17e1c09b…`, confirmed to exist and contain the named paths before retrieval; SHA256 of every written file recorded in `NOTICE`. | closed |
| T-155-02-02 | Spoofing | `Azure/WindowsAppKiosk` path resolution | high | mitigate | The Shell Launcher variant of `WindowsApp_AutoLogon.xml` was resolved by listing the actual sub-path contents at the pinned ref, not by trusting the root README; the variant chosen is recorded in `NOTICE`. | closed |
| T-155-02-03 | Tampering | `.gitignore` traps | high | mitigate | `git check-ignore -v` run against every path before add, output quoted in `155-02-SUMMARY.md`; no silent force-add. | closed |
| T-155-02-04 | Repudiation | duplicated Assigned Access payload | medium | mitigate | Line-ending-normalized byte equality between RE-237's fenced block and `assigned-access/production.xml`, re-run in plan 155-05 after that plan's RE-237 edits. | closed |
| T-155-02-05 | Denial of service | corpus link graph | medium | mitigate | Break-and-restore experiment proved the link checker fails on a missing target; directory-target and backtick-label hazards asserted absent. | closed |
| T-155-02-06 | Information disclosure | vendored and pointer content | medium | mitigate | MSIX not committed; no tenant identifier, credential or endpoint written by this plan. | closed |
| T-155-02-SC | Tampering | package-manager installs | low | accept | Zero npm/pip/cargo installs; no Package Legitimacy Audit table applies. | closed — accepted |

### Payload delivery and provenance — plan 155-03

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-155-03-04 | Tampering | `.gitignore` traps | high | mitigate | `git check-ignore -v` over every path before add, matches recorded and dispositioned by tree-scoped negation; force-add prohibited. | closed |
| T-155-03-05 | Spoofing | fabricated payload | high | mitigate | Task 1 was an explicit human checkpoint; all ten RCP-09 items delivered. `debug.xml` is recorded in `NOTICE` as an owner-directed derivation carrying **less authority** than field-validated assets, not as pilot output. | closed |
| T-155-03-07 | Repudiation | `NOTICE` | medium | mitigate | One row per file with origin, date and SHA256, plus a named gap row for `RemoveBloat.ps1` and for the uncommitted VCLibs/MSIX binaries. | closed |
| T-155-03-SC | Tampering | package-manager installs | low | accept | Zero installs; supply-chain surface is vendored source, covered by T-155-02-01. | closed — accepted |

### Planning-surface integrity — plan 155-01

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-155-01-01 | Tampering | `check-phase-135.mjs` | high | mitigate | Edit bounded to the `RECIPE` check body and one constant; `git diff` hunk assertion, assertion count 7 unchanged, `git diff --exit-code` on `check-phase-136.mjs`; D-00a exception recorded in `.planning/STATE.md`. | closed |
| T-155-01-02 | Repudiation | `REQUIREMENTS.md`, `ROADMAP.md` | high | mitigate | Annotate-and-supersede only; zero-deletions `--numstat` assertion plus positive grep for the superseded clause. | closed |
| T-155-01-03 | Tampering | `check-phase-54.mjs` live reads | high | mitigate | 32/0/0 measured immediately before and after the edit in the same task, both summary lines quoted. | closed |
| T-155-01-04 | Spoofing | the retired assertion | high | mitigate | Replacement proven to fail on a deliberately emptied copy in a scratch root passed as `cwd`, closing the vacuous-pass trap. | closed |
| T-155-01-05 | Repudiation | `155-GATE-BASELINE.json` | medium | mitigate | Every number produced by a recorded command; `sweep3` entries carry a loaded-file count so a vacuous zero is detectable. | closed |
| T-155-01-06 | Information disclosure | `.planning/` prose | low | accept | No tenant identifier, credential or endpoint written; the real surface is the asset payload, covered by T-155-03-01. | closed — accepted |
| T-155-01-07 | Elevation of privilege | — | low | accept | No authentication, authorization, session or network surface in this plan. | closed — accepted |
| T-155-01-SC | Tampering | package-manager installs | low | accept | Zero installs. | closed — accepted |

### Published-claim integrity — plans 155-04 and 155-05

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-155-04-01 | Spoofing | the two RCP-10 claims | high | mitigate | Both re-fetched with retrieval timestamps and served-revision identifiers recorded in `155-RCP10-CLAIMS.json`; corroboration checked at root cause, not symptom string. | closed |
| T-155-04-02 | Tampering | pinned validator needles | high | mitigate | Four frozen heading literals asserted by exact-count grep and `git diff` hunk; anti-feature row count re-run; `countTableDataRows` first-match hazard asserted absent. | closed |
| T-155-04-03 | Tampering | `licensing-matrix.md` final byte | medium | mitigate | Version History row inserted above the existing one; final byte asserted to be a pipe with no trailing newline. | closed |
| T-155-04-04 | Repudiation | completed style requirements | high | mitigate | `sweep3.py` scratch instrument with mandatory non-zero loaded-file count over all three edited files; `_CONTENT-PINS.txt` asserted byte-unchanged. | closed |
| T-155-04-05 | Information disclosure | published prose | low | accept | No tenant identifier written; the corpus-wide internal-reference leak class is HYG-02's scope in Phase 157. | closed — accepted |
| T-155-04-06 | Denial of service | a reader's licensing decision | medium | mitigate | Remedy clause stated as reasoning attributable to licensing structure, not as a tested outcome. | closed |
| T-155-04-07 | Elevation of privilege | — | low | accept | No such surface in this plan. | closed — accepted |
| T-155-04-SC | Tampering | package-manager installs | low | accept | Zero installs. | closed — accepted |
| T-155-05-01 | Spoofing | pilot observations as documentation | high | mitigate | Exhaustive enumeration with a stated stopping rule and a positive occurrence floor; per-row adjudication recorded in `155-05-SUMMARY.md`. | closed |
| T-155-05-02 | Tampering | the label, by Phase 156's tooling | high | mitigate | Label added to the `google-style-verify` protected-signal list in the same phase that introduced it. | closed |
| T-155-05-03 | Tampering | C17 assertion 12 blockquote cap | high | mitigate | Bare twelve-character form chosen by measurement; verified by reading C17's per-assertion count for 12, not by computing line lengths. | closed |
| T-155-05-04 | Tampering | the link graph | high | mitigate | Positive assertions that every asset link resolves to a file, carries no fragment and is not backtick-preceded; negative assertion that the label never appears in link syntax. | closed |
| T-155-05-05 | Repudiation | duplicated Assigned Access payload | medium | mitigate | Byte-equality re-run after every task in 155-05 that edited RE-237. | closed |
| T-155-05-06 | Information disclosure | internal planning tree | medium | mitigate | Zero-count assertion on planning-tree citations in RE-237. | closed |
| T-155-05-07 | Denial of service | a reader's kiosk fleet | high | mitigate | Positive assertion that the irreversibility disclosure survives; independently re-confirmed by this audit at RE-237 `:273`. | closed |
| T-155-05-08 | Elevation of privilege | — | low | accept | No such surface in this plan. | closed — accepted |
| T-155-05-SC | Tampering | package-manager installs | low | accept | Zero installs. | closed — accepted |

### Publication pipeline — plan 155-06

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-155-06-01 | Spoofing | an unreviewed promotion | high | mitigate | Blocking human review gate preceded both the flip and the registration, with findings dispositioned and a dated sign-off recorded in `155-06-SUMMARY.md:130-148`. | closed |
| T-155-06-02 | Tampering | the two status sites | high | mitigate | Two-site assertion, C17 frontmatter-and-byline equality at zero violations, diff-size assertion of exactly two insertions and two deletions. | closed |
| T-155-06-03 | Tampering | canary provenance ledgers | high | mitigate | Prior bump entries asserted present verbatim, exactly one line appended, comment-filtered count of the superseded value. | closed |
| T-155-06-04 | Tampering | the canary values | high | mitigate | Both computed from the registry after the row landed, never transcribed; all seven editable sites asserted. | closed |
| T-155-06-05 | Tampering | doubly-pinned quick-navigation bullet | high | mitigate | Appended to, never rewritten; all three validators reading that line run green; diff-shape asserted as a modified line. | closed |
| T-155-06-06 | Repudiation | `scripts/pipeline/filename-map.md` | medium | mitigate | Regenerated by the real generator, dry run read first, diff asserted to be a pure one-line addition. | closed |
| T-155-06-07 | Denial of service | the publish bundle | medium | mitigate | Flip preceded registration so the divergence guard was never positioned to fail closed; bundle deliberately not built here. | closed |
| T-155-06-08 | Information disclosure | the published corpus | medium | accept | RE-237 becomes public documentation by design; the tenant-identifier surface was mitigated in plan 155-03 before any of it reached the index, and this document is the named retroactive verification. | closed — accepted |
| T-155-06-09 | Elevation of privilege | — | low | accept | No such surface in this plan. | closed — accepted |
| T-155-06-SC | Tampering | package-manager installs | low | accept | Zero installs. | closed — accepted |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above `workflow.security_block_on` count toward `threats_open`*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-155-01 | T-155-03-01 | The ConfigMgr package source is committed **scrubbed** rather than omitted. The owner verified `origin` is public via `gh repo view`, resolving the manifest's conditional to SCRUB, and selected commit-scrubbed after the omit-entirely alternative was explicitly re-offered and declined. One-way consequence stated at the checkpoint: removal from HEAD is not removal from history. | Owner (`NOTICE` Ruling 1, verbatim) | 2026-09-03 |
| AR-155-02 | T-155-03-03 | `RemoveBloat.ps1` (Andrew Taylor's public De-Bloat) is **not vendored**. RE-237 `:196-201` frames it as a still-open "Ask the admin" decision, D-34 records SEED-002 §D listing it as deferred, and D-27 prohibits fabricating a substitute. Recorded as a `NOTICE` gap row. If the decision is later made in favor of vendoring, that is a future plan's scope under 155-02's pinned-SHA method. | Owner (D-34) | 2026-09-03 |
| AR-155-03 | T-155-03-05 | `assigned-access/debug.xml` is an owner-directed **derivation** (option C), not the field-validated pilot artifact, which was unavailable to deliver. `NOTICE` marks it as carrying less authority and never run in a live Assigned Access session. | Owner | 2026-09-03 |
| AR-155-04 | T-155-06-08 | RE-237 is promoted to Approved and becomes publicly published documentation grounding an answer engine, by design. | Owner (Phase 155 scope) | 2026-09-03 |
| AR-155-05 | T-155-02-06 | The Windows App MSIX and the two VCLibs `.appx` dependencies are **not committed** (size), and are instead pinned by filename, version, upstream URL and SHA256. A packager fetches them from the pinned SHA at build time. | Owner (`NOTICE` Ruling 2) | 2026-09-03 |
| AR-155-06 | T-155-01-06, T-155-04-05, T-155-04-07, T-155-05-08, T-155-06-09, all `-SC` | Low-severity dispositions recorded as **genuinely absent** rather than filled with a fabricated web threat: no authentication, authorization, session or network surface exists in this phase, and it performs zero npm/pip/cargo installs. | Phase 155 threat models | 2026-09-03 |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-09-03 | 51 | 51 | 0 | `gsd-security-auditor` (5 high-severity, full read) + orchestrator (46, grep depth) |

### Audit notes — 2026-09-03

Two non-blocking observations, neither a defect:

1. `Disable-ScheduledTask` (`Remove-KioskRunTasks.ps1:44`, both copies) sits outside the
   `ShouldProcess` gate set, deliberately and per the script's own header — disabled, not deleted, and
   therefore reversible. It falls outside `CLAUDE.md`'s delete/remove/deprovision/unregister verb
   scope. Worth a reviewer's awareness only if that verb scope is ever tightened.
2. A conflict-marker sweep broader than the phase's own gate (which was scoped to `docs/`) flags
   `NOTICE:2,107,363`. These are decorative section dividers, confirmed by inspection. No
   conflict-marker leakage exists in the asset tree.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-09-03
