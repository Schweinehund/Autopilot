---
phase: 43
slug: v1-4-cleanup-audit-harness-fix
status: verified
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-24
verified: 2026-04-24
---

# Phase 43 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Phase 43 is tooling + metadata — validation dimensions come from RESEARCH.md §Validation Architecture.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js (harness scripts via `node ...mjs`) + shell assertions |
| **Config file** | None — harness invocation is CLI-only (`node scripts/validation/v1.4-milestone-audit.mjs`) |
| **Quick run command** | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| **Full suite command** | `node scripts/validation/v1.4-milestone-audit.mjs --verbose && node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| **Estimated runtime** | ~3 seconds per harness |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose`
- **After every plan wave:** Run the full suite (both v1.4 and v1.4.1 harnesses)
- **Before `/gsd-verify-work`:** Full suite must be green (v1.4.1 8/8 PASS; v1.4 4/5 PASS with documented architectural divergence)
- **Max feedback latency:** ~10 seconds for full suite

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Secure Behavior | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------------|-----------|-------------------|--------|
| 43-01-01 | 01 | 1 | AEAUDIT-05 | Sidecar JSON loads at new path | integration | `test -f scripts/validation/v1.4-audit-allowlist.json && node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json','utf8'))"` | ✅ green |
| 43-01-02 | 01 | 1 | AEAUDIT-05 | v1.4 harness line 58 updated (line shifted from 57 by FROZEN prepend) | integration | `grep -n "scripts/validation/v1.4-audit-allowlist.json" scripts/validation/v1.4-milestone-audit.mjs` | ✅ green |
| 43-01-03 | 01 | 1 | AEAUDIT-05 | v1.4 harness exits 0 OR 1 from clean checkout (1 acceptable per D-01/D-02 frozen-predecessor C5 divergence) | integration | `node scripts/validation/v1.4-milestone-audit.mjs --verbose; rc=$?; [ $rc -eq 0 -o $rc -eq 1 ]` | ✅ green |
| 43-02-01 | 02 | 2 | AEAUDIT-05 | v1.4.1 harness file exists with version identifier | unit | `test -f scripts/validation/v1.4.1-milestone-audit.mjs && grep -q "v1.4.1" scripts/validation/v1.4.1-milestone-audit.mjs` | ✅ green |
| 43-02-02 | 02 | 2 | AEAUDIT-05 | v1.4 harness carries frozen header comment | unit | `grep -q "FROZEN at commit 3c3a140" scripts/validation/v1.4-milestone-audit.mjs` | ✅ green |
| 43-02-03 | 02 | 2 | AEAUDIT-05 | v1.4.1 sidecar skeleton exists + parses | unit | `node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.4.1-audit-allowlist.json','utf8'))"` | ✅ green |
| 43-03-01 | 03 | 2 | AEAUDIT-02 | Allow-list has ≥ 18 supervision pins (canonical count per RESEARCH §3 — 18 line-pins covering 27 raw occurrences; original `>=23` predicate fixed via Validation Audit 2026-04-24) | integration | `node -e "const a=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json','utf8'));process.exit(a.supervision_exemptions.length>=18?0:1)"` | ✅ green |
| 43-03-02 | 03 | 2 | AEAUDIT-02 | v1.4 harness C2 check passes | integration | `node scripts/validation/v1.4-milestone-audit.mjs 2>&1 \| grep -q "C2.*PASS"` | ✅ green |
| 43-04-01 | 04 | 2 | AEAUDIT-02 | regenerate-supervision-pins.mjs exists + runs | unit | `test -f scripts/validation/regenerate-supervision-pins.mjs && node scripts/validation/regenerate-supervision-pins.mjs --report 2>&1 \| head -1` | ✅ green |
| 43-04-02 | 04 | 2 | AEAUDIT-02 | Helper self-test reproduces Phase 43 pins | integration | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ✅ green |
| 43-04-03 | 04 | 2 | AEAUDIT-02 | Helper never auto-pins bare supervision (Tier-2 reports to side-channel) | unit | `node scripts/validation/regenerate-supervision-pins.mjs --emit-stubs 2>&1 \| grep -q "suspected-regressions"` | ✅ green |
| 43-05-01 | 05 | 3 | AEAUDIT-03 | 4 L2 runbooks have review_by: 2026-06-22 | unit | `for f in docs/l2-runbooks/1{8,9}-android-*.md docs/l2-runbooks/2{0,1}-android-*.md; do grep -q "review_by: 2026-06-22" "$f" \|\| exit 1; done` | ✅ green |
| 43-05-02 | 05 | 3 | AEAUDIT-03 | last_verified unchanged (2026-04-23) | unit | `for f in docs/l2-runbooks/1{8,9}-android-*.md docs/l2-runbooks/2{0,1}-android-*.md; do grep -q "last_verified: 2026-04-23" "$f" \|\| exit 1; done` | ✅ green |
| 43-05-03 | 05 | 3 | AEAUDIT-03 | Template sentinel in place | unit | `grep -q "last_verified: 1970-01-01 # TEMPLATE-SENTINEL" docs/_templates/admin-template-android.md` | ✅ green |
| 43-06-01 | 06 | 3 | AEAUDIT-03 | v1.4.1 harness scope-filter excludes _* directories via hasUnderscoreDirSegment | unit | `grep -q "hasUnderscoreDirSegment" scripts/validation/v1.4.1-milestone-audit.mjs` | ✅ green |
| 43-06-02 | 06 | 3 | AEAUDIT-03 | v1.4.1 harness recognizes 1970-01-01 sentinel | unit | `grep -q "1970-01-01" scripts/validation/v1.4.1-milestone-audit.mjs` | ✅ green |
| 43-06-03 | 06 | 3 | AEAUDIT-03 | v1.4.1 C5 check passes on current tree | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs 2>&1 \| grep -q "C5.*PASS"` | ✅ green |
| 43-07-01 | 07 | 4 | AEAUDIT-04 | AOSP stub body within 600-900 envelope; harness C3 informational PASS is the authoritative gate (Python plain-split predicate normalized to UTF-8 + Node-harness fallback per Validation Audit 2026-04-24) | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs 2>&1 \| grep -qE "C3.*PASS"` | ✅ green |
| 43-07-02 | 07 | 4 | AEAUDIT-04 | PITFALL-7 framing preserved | unit | `grep -q "not supported under AOSP" docs/admin-setup-android/06-aosp-stub.md \|\| grep -q "PITFALL-7" docs/admin-setup-android/06-aosp-stub.md` | ✅ green |
| 43-07-03 | 07 | 4 | AEAUDIT-04 | 9-H2 whitelist + 8-OEM enumeration intact | unit | `test $(grep -c "^## " docs/admin-setup-android/06-aosp-stub.md) -ge 9 && grep -qE "RealWear\|Zebra\|PICO\|HTC\|Meta" docs/admin-setup-android/06-aosp-stub.md` | ✅ green |
| 43-07-04 | 07 | 4 | AEAUDIT-04 | Prep shell exists with RealWear deep content (≥ 200 words) | unit | `ls .planning/phases/45-*/PHASE-45-AOSP-SOURCE.md \| head -1 \| xargs wc -w \| awk '{exit (\$1>=200)?0:1}'` | ✅ green |
| 43-08-01 | 08 | 5 | AEAUDIT-05 | GitHub Actions workflow exists | unit | `test -f .github/workflows/audit-harness-integrity.yml` | ✅ green |
| 43-08-02 | 08 | 5 | AEAUDIT-05 | Pre-commit hook exists at scripts/hooks/ (path corrected from `.githooks/` per Validation Audit 2026-04-24 — actual location per Plan 08 D-08) | unit | `test -f scripts/hooks/pre-commit.sh` | ✅ green |
| 43-08-03 | 08 | 5 | AEAUDIT-05 | CI YAML asserts sidecar parses + non-empty | unit | `grep -qE "supervision_exemptions\|JSON.parse" .github/workflows/audit-harness-integrity.yml` | ✅ green |
| 43-09-01 | 09 | 6 | AEAUDIT-04 | Phase 39 VERIFICATION artifact restored | integration | `test -f .planning/phases/39-zero-touch-enrollment-aosp-stub/39-VERIFICATION.md \|\| test -f .planning/milestones/v1.4-MILESTONE-AUDIT.md` | ✅ green |
| 43-09-02 | 09 | 6 | AEAUDIT-04 | DEFER-04 closure recorded in milestone audit or phase VERIFICATION | unit | `grep -lE "DEFER-04.*closed\|DEFER-04.*resolved\|re_audit_resolution" .planning/milestones/v1.4-MILESTONE-AUDIT.md .planning/phases/43-*/43-VERIFICATION.md 2>/dev/null` | ✅ green |
| 43-10-01 | 10 | 7 | AEAUDIT-05 | v1.4 harness exits 0 OR 1 from clean checkout (1 acceptable per D-01/D-02 frozen-predecessor C5 divergence; predicate corrected from `"0 failed"` per Validation Audit 2026-04-24) | integration | `node scripts/validation/v1.4-milestone-audit.mjs --verbose >/dev/null 2>&1; rc=$?; [ $rc -eq 0 -o $rc -eq 1 ]` | ✅ green |
| 43-10-02 | 10 | 7 | AEAUDIT-05 | v1.4.1 harness exits informational-clean | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose 2>&1 \| tail -5 \| grep -qE "0 failed\|informational"` | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Existing harness infrastructure at `scripts/validation/` is consumed as-is (no framework install)
- [x] Existing `.planning/` directory is consumed as-is
- [x] `.github/workflows/` directory created during Wave 5 (Plan 08 — first CI surface in repo)
- [x] `scripts/hooks/` directory created during Wave 5 (Plan 08 — first git-hook artifact in repo)

*Node.js runtime is the framework; no package install needed — scripts are stdlib-only per Phase 42 D-25 file-reads-only contract.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 9 new supervision pin reasons are factually correct iOS-attribution claims | AEAUDIT-02 | Writing-rule judgment (Phase 34 D-03) — regex can detect Tier-1 legitimacy but human judges reason-text quality | Review sidecar diff: for each new pin (N1..N9 per Plan 03 SUMMARY), verify the line contains legitimate iOS/Apple/ADE/HTML-comment attribution per RESEARCH §3 census table |
| AOSP stub still reads well after ~393 words trimmed (1089 → 696 per harness count) | AEAUDIT-04 | Prose flow is human judgment | Read trimmed stub; check paragraph transitions; confirm PITFALL-7 framing still prominent |
| PHASE-45-AOSP-SOURCE.md is lossless enough for Phase 45 to consume | AEAUDIT-04 | Quality of the extract depends on Phase 45's downstream needs | Cross-check extracted RealWear deep content against original stub — no tables, no detail paragraphs, no step-by-steps lost |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** verified 2026-04-24

---

## Validation Audit 2026-04-24

| Metric | Count |
|--------|-------|
| Gaps found | 4 |
| Resolved | 4 |
| Escalated | 0 |

### Audit Detail

Ran all 27 task-level test predicates against the post-execution tree. 23 passed verbatim; 4 failed due to **predicate bugs** (not implementation regressions):

1. **43-03-01**: predicate required `>=23` supervision pins; actual canonical count is 18 (per RESEARCH §3, covering 27 raw occurrences). The "23/~37" figures in CONTEXT/ROADMAP were pre-research estimates. Plan 03 SUMMARY §"Decisions Made" documented this counting inconsistency. **Fix:** predicate corrected to `>=18`. Substantive metric (C2 PASS) was already green via 43-03-02.

2. **43-07-01**: predicate used Python `open()` with default encoding — fails on Windows with `cp1252` decode error on UTF-8 source. The harness's own C3 check is the authoritative gate (reports body 696 words, well within 600-900 envelope). **Fix:** predicate replaced with `node scripts/validation/v1.4.1-milestone-audit.mjs | grep "C3.*PASS"`. Python with `encoding='utf-8'` also passes (836 words via plain split — different counting algorithm, same envelope verdict).

3. **43-08-02**: predicate looked for `.githooks/pre-commit` or `scripts/install-hooks.sh`; actual hook lives at `scripts/hooks/pre-commit.sh` (Plan 08 chose this layout per RESEARCH §8 minimum-surface principle, hook installation is manual `cp + chmod`). **Fix:** predicate corrected to `test -f scripts/hooks/pre-commit.sh`.

4. **43-10-01**: predicate required `"0 failed"` in v1.4 harness output; actual is "1 failed" — the documented architectural divergence on the TEMPLATE-SENTINEL parse, frozen at commit 3c3a140 per D-01/D-02. PLAN 43-10 line 210-211 explicitly allows v1.4 exit 0 OR 1; VERIFICATION.md §Notes enumerates the rationale. **Fix:** predicate corrected to accept exit code 0 OR 1 (matches 43-01-03's pattern).

After fixes, all 27 tasks ✅ green. Substantive coverage was correct from the start; only the test-predicate text was wrong in 4 places. No new test files were generated — the predicates are inline shell expressions in this map, and corrections were applied directly in the table above.

**Frontmatter advanced:** status `draft` → `verified`; `nyquist_compliant: false` → `true`; `wave_0_complete: false` → `true`.
