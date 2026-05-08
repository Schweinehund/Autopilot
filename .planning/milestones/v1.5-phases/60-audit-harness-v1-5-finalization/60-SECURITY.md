---
phase: 60
slug: audit-harness-v1-5-finalization
status: verified
threats_open: 0
asvs_level: 1
created: 2026-05-07
---

# Phase 60 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.
> Phase 60 finalizes the v1.5 audit harness across 10 plans (calibration corpus,
> Cat A/B doc fixes, atomic glossary edit, harness regex hardening, chain
> validator, milestone close-out). All edits are file-content / config / harness
> code; no privilege boundaries or external trust crossings.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| repo → planning artifact | Calibration runs on local docs corpus; output is markdown in `.planning/`. Read-only. | doc text already in repo |
| markdown content → harness scope | docs/**/*.md fixes within `walkMd('docs')` scope; must not introduce C1-C13 violations | doc content edits |
| markdown edit → sidecar pin-coord state | `_glossary-android.md` edit shifts pin coordinates pinned in sidecar; uncoordinated edit breaks atomicity-contract | line-coord integers |
| sidecar JSON parse → harness load | Pin-coord update must preserve valid JSON; parse failure cascades to harness FAIL | JSON shape |
| harness JS code edit → CI runtime | Changed regex `g`-flag introduces line-iteration; runtime cost grows from O(file-count) to O(file-count × occurrence-count); must remain bounded | regex execution |
| BASELINE_9 array edit → `--self-test` pass-criteria | Hand-edit must align with current sidecar coords; mismatch → false FAIL or false PASS | line-coord integers |
| 48-VERIFICATION-broken-links.md Triage edit → Phase 48 audit-trail | Frontmatter `total_findings` + Summary table MUST be byte-identical (Phase 48 D-11); only Triage Decision column populated | Triage text cells |
| validator subprocess invocation → external process exit codes | `execFileSync` gates on exit code; argv-array form prevents shell-string interpolation | argv strings, stderr |
| validator file read → harness/sidecar state | File-reads-only contract (Phase 42 D-25); no module-level state mutation | file content |
| close-gate edits → milestone state | STATE.md + REQUIREMENTS.md + ROADMAP.md updates change milestone close-state machine; partial edits leave milestone inconsistent | checkbox + line text |

---

## Threat Register

Status legend: **closed** = mitigation verified by auditor evidence OR accepted-risk documented below. **open** = neither.
Disposition legend: **mitigate** (implementation required) · **accept** (documented risk) · **transfer** (third-party).

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-60-01-01 | I (Information Disclosure) | 60-CALIBRATION.md row content | accept | Hits cite `docs/**/*.md` line text already in repo; no new disclosure | closed |
| T-60-01-02 | T (Tampering) | grep-based scan output | mitigate | `60-CALIBRATION.md:18-19` uses exact `new RegExp(p, 'gi')` mirroring sidecar `cope_banned_phrases[]` (lines 33-42) and harness `c11_ops_patterns` literals; output enumerates raw hits without manual editing | closed |
| T-60-01-03 | D (DoS via regex) | C9 `[^.]*` greedy regex | accept | Risk LOW — corpus scan one-shot read-only; transient scanner deleted post-scan (60-01-SUMMARY.md:96) | closed |
| T-60-02-01 | T (Tampering) | docs/l1-runbooks/{11,12,13,14}-macos-*.md content | mitigate | Per-commit harness regression-guard ran 4× (commits `bc96b05`, `3d38e39`, `c4bb477`, `d7c4230`); live `node v1.5-milestone-audit.mjs` exits 0 (12/12 PASS); 10 shims confirmed | closed |
| T-60-02-02 | I (Information Disclosure) | runbook content visible to L1 ops | accept | Shims `<a id="..."></a>` are zero-content HTML elements; no information added | closed |
| T-60-03-01 | T (Tampering) | docs/l1-runbooks/{25,27,28,29}-android-*.md content | mitigate | Per-commit regression-guards ran 4× (`1f6860f`, `1ab2188`, `a4da17b`, `6faa2d1`); 17 cause shims confirmed (4+4+4+5) | closed |
| T-60-03-02 | T (Tampering) | sidecar pin coordinates | accept | Files 25/27/28/29 verified absent from sidecar pin lists (`v1.5-audit-allowlist.json`); line shifts safe per RESEARCH PITFALL-12 | closed |
| T-60-04-01 | T (Tampering) | docs/l1-runbooks/{02,21}.md content | mitigate | Per-commit regression-guards exit 0 (`a6f312e`, `b3a04f9`); 6 anchor shims present in `02-esp-stuck-or-failed.md` + `21-ios-compliance-blocked.md` | closed |
| T-60-05-01 | T (Tampering) | docs/l2-runbooks/{21,22,23}-android-*.md | mitigate | Per-commit regression-guards (`d3c49a2`, `dc86261`, `f1e4469`); 14 pattern/cause shims confirmed (4+5+5) | closed |
| T-60-05-02 | T (Tampering) | sidecar pin coordinates | accept | Files l2-runbooks/21/22/23 verified absent from sidecar pin lists | closed |
| T-60-06-01 | T (Tampering) | sidecar pin coordinates | mitigate | Atomic 3-file commit `62f345b` modifies exactly `docs/_glossary-android.md` + `scripts/validation/v1.5-audit-allowlist.json` + `scripts/validation/regenerate-supervision-pins.mjs` per Phase 48 D-14 | closed |
| T-60-06-02 | T (Tampering) | regenerate-supervision-pins.mjs BASELINE_9 array | mitigate | `regenerate-supervision-pins.mjs:393, :396` carry `BASELINE_9 refreshed 2026-05-06` comment block; entries 3-4 at lines 181/198 (post-Plan-06 shifts) | closed |
| T-60-06-03 | I (Information Disclosure) | PIN-PRE-EDIT.txt transient file | accept | `60-06-PIN-PRE-EDIT.txt` not present in repo; cleanup at Task 4 confirmed | closed |
| T-60-06-04 | D (DoS via parse failure) | v1.5-audit-allowlist.json | mitigate | Sidecar JSON parses cleanly (`node -e "JSON.parse(...)"` PASS); 10 expected keys present | closed |
| T-60-07-01 | T (Tampering) | Category B file-path content | mitigate | Per-commit harness regression-guard preserved Phase 49-59 V-NN-NN invariants | closed |
| T-60-07-02 | T (Tampering) | sidecar pin coordinates | accept | None of the 9 Plan 07 files in sidecar pin lists | closed |
| T-60-07-03 | I (Information Disclosure) | broken-link prose hides intended cross-references | accept | D-09 delete-ref preserved link text as prose (60-07-SUMMARY.md:111-112) | closed |
| T-60-08-01 | T (Tampering) | sidecar JSON shape | mitigate | Pre-commit JSON parse gate satisfied — file is valid JSON; phase=`60-audit-harness-v1-5-finalization`, c9=4, c11=0, c13=15 | closed |
| T-60-08-02 | T (Tampering) | harness JS regex flag | mitigate | `node --check scripts/validation/v1.5-milestone-audit.mjs` parses; harness exits 0 with 12/12 PASS | closed |
| T-60-08-03 | D (DoS via regex) | C11 4-pattern proximity-window scan with `g`-flag iteration | mitigate | C11 patterns sourced from sidecar (`v1.5-milestone-audit.mjs:504-511`) hardcoded fallback = 4 patterns; ±200-char window fixed (`:531-533`); bounded ~4000 iterations | closed |
| T-60-08-04 | D (DoS via regex) | C9 8-pattern cope_banned_phrases scan | mitigate | C9 patterns: 8 entries with greedy `[^.]*` bounded by `.` terminator (`v1.5-milestone-audit.mjs:427`); live corpus produces ≤4 hits at exemption time | closed |
| T-60-08-05 | T (Tampering) | BASELINE_9 array | mitigate | `--self-test` exits 0 with `Diff: identical`, `Self-test: PASS`; values match current sidecar `supervision_exemptions[]` lines 79/81/181/198 | closed |
| T-60-08-06 | I (Information Disclosure) | 48-VERIFICATION close-out audit-trail | accept | 48-VERIFICATION baseline preserved byte-identical (`total_findings: 75` + Summary table totals); column population intentional per CONTEXT D-11 | closed |
| T-60-08-07 | E (Elevation of Privilege) | none in scope | accept | All edits are file-content / config; no privilege boundaries crossed | closed |
| T-60-09-01 | T (Tampering) | check-phase-60.mjs subprocess invocations | mitigate | `check-phase-60.mjs:182-183, :225, :243` use `execFileSync('node', [PIN_HELPER, '--self-test'], { stdio: 'pipe', timeout: 30000, cwd: process.cwd() })` argv-array with explicit timeouts (30000ms self-test; 60000ms chain + harness) | closed |
| T-60-09-02 | D (DoS via subprocess) | 11 chain validator invocations | accept | Bounded by 60s timeout each (`check-phase-60.mjs:225` `timeout: 60000`); worst-case 660s; CI step timeout governs | closed |
| T-60-09-03 | I (Information Disclosure) | stderr passthrough on FAIL | accept | All 3 catch blocks truncate stderr to 200 chars (`:190`, `:232`, `:250`); no secrets in validator stderr | closed |
| T-60-10-01 | T (Tampering) | REQUIREMENTS.md AUDIT-NN checkboxes | mitigate | `REQUIREMENTS.md:84-88` show 5 lines starting with `- [x] **AUDIT-` for AUDIT-03/04/05/06/07; pre-commit grep gate satisfied | closed |
| T-60-10-02 | T (Tampering) | ROADMAP.md SC#5 wording | mitigate | `ROADMAP.md:401` contains correct `audit-harness-v1.5-integrity.yml`; pre-commit sed/line gate satisfied | closed |
| T-60-10-03 | I (Information Disclosure) | 60-VERIFICATION.md close-state record | accept | Verification artifact intentionally documents close-state for Phase 61 + audit trail | closed |

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-60-01 | T-60-01-01 | Calibration output cites repo doc text already public to anyone reading the corpus; no novel disclosure | Schweinehund (phase owner) | 2026-05-07 |
| AR-60-02 | T-60-01-03 | One-shot calibration scanner; transient script deleted post-scan; not present in v1.6 attack surface | Schweinehund | 2026-05-07 |
| AR-60-03 | T-60-02-02 | Anchor shims are zero-content HTML; cannot reveal additional information | Schweinehund | 2026-05-07 |
| AR-60-04 | T-60-03-02 | Files 25/27/28/29 confirmed absent from sidecar pin lists; PITFALL-12 surface watch passed pre-flight | Schweinehund | 2026-05-07 |
| AR-60-05 | T-60-05-02 | l2 files 21/22/23 confirmed absent from sidecar pin lists | Schweinehund | 2026-05-07 |
| AR-60-06 | T-60-06-03 | Pre-edit pin baseline file is intentionally transient and was cleaned up at Task 4 | Schweinehund | 2026-05-07 |
| AR-60-07 | T-60-07-02 | 9 Plan 07 files confirmed absent from sidecar pin lists | Schweinehund | 2026-05-07 |
| AR-60-08 | T-60-07-03 | D-09 delete-ref retains author-intent prose; future v1.6+ may author missing target docs | Schweinehund | 2026-05-07 |
| AR-60-09 | T-60-08-06 | Triage Decision column population is intentional close-out signal per Phase 48 D-11; baseline marker preserved byte-identical | Schweinehund | 2026-05-07 |
| AR-60-10 | T-60-08-07 | All Phase 60 edits are file-content / config; no privilege boundaries cross | Schweinehund | 2026-05-07 |
| AR-60-11 | T-60-09-02 | 11 × 60s timeout = 660s worst case; CI step timeout governs; expected wall-clock ~30s | Schweinehund | 2026-05-07 |
| AR-60-12 | T-60-09-03 | Validator stderr truncated to 200 chars; no secrets in stderr by design (file-reads-only validators) | Schweinehund | 2026-05-07 |
| AR-60-13 | T-60-10-03 | Verification artifact is the intended close-state record consumed by Phase 61 + audit trail | Schweinehund | 2026-05-07 |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-05-07 | 30 | 30 | 0 | gsd-security-auditor (sonnet) |

### Audit 2026-05-07 — Notes

- All 17 mitigate-disposition threats verified by codebase evidence (Grep matches in cited files, live validator runs, atomic-commit inspection).
- All 13 accept-disposition threats reviewed against current code state; rationales remain valid; no new attack surface introduced.
- Live validator verdicts re-run during this audit:
  - `node scripts/validation/v1.5-milestone-audit.mjs` → exit 0; **12 passed, 0 failed, 0 skipped**.
  - `node scripts/validation/regenerate-supervision-pins.mjs --self-test` → exit 0; `Diff: identical`; `Self-test: PASS`.
  - `node scripts/validation/check-phase-60.mjs` → 24 PASS / 1 FAIL / 0 SKIPPED. The single FAIL is V-60-16 chain regression-guard surfacing a pre-existing Phase 53 V-53-22 violation in `docs/operations/00-index.md` (introduced by Phase 59-03 commit `d4217ea`). This is **not** a Phase 60 threat-mitigation gap — Phase 60 atomic commit `c2abdd4` did not modify `docs/operations/`. Recorded in `60-VERIFICATION.md` and `deferred-items.md` for Phase 61 triage.
- No unregistered threat flags. Each `## Threat Flags` section in 60-NN-SUMMARY.md plans either says "None" or maps to existing T-60-NN entries.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-05-07
