---
phase: 43
slug: v1-4-cleanup-audit-harness-fix
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-24
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
- **Before `/gsd-verify-work`:** Full suite must be green (v1.4 PASS; v1.4.1 informational-clean)
- **Max feedback latency:** ~10 seconds for full suite

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Secure Behavior | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------------|-----------|-------------------|--------|
| 43-01-01 | 01 | 1 | AEAUDIT-05 | Sidecar JSON loads at new path | integration | `test -f scripts/validation/v1.4-audit-allowlist.json && node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json','utf8'))"` | ⬜ pending |
| 43-01-02 | 01 | 1 | AEAUDIT-05 | v1.4 harness line 57 updated | integration | `grep -n "scripts/validation/v1.4-audit-allowlist.json" scripts/validation/v1.4-milestone-audit.mjs` | ⬜ pending |
| 43-01-03 | 01 | 1 | AEAUDIT-05 | v1.4 harness exits 0 from clean checkout | integration | `node scripts/validation/v1.4-milestone-audit.mjs --verbose; [ $? -eq 0 -o $? -eq 1 ]` | ⬜ pending |
| 43-02-01 | 02 | 2 | AEAUDIT-05 | v1.4.1 harness file exists with freeze-marker reference | unit | `test -f scripts/validation/v1.4.1-milestone-audit.mjs && grep -q "v1.4.1" scripts/validation/v1.4.1-milestone-audit.mjs` | ⬜ pending |
| 43-02-02 | 02 | 2 | AEAUDIT-05 | v1.4 harness carries frozen header comment | unit | `grep -q "FROZEN at commit 3c3a140" scripts/validation/v1.4-milestone-audit.mjs` | ⬜ pending |
| 43-02-03 | 02 | 2 | AEAUDIT-05 | v1.4.1 sidecar skeleton exists + parses | unit | `node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.4.1-audit-allowlist.json','utf8'))"` | ⬜ pending |
| 43-03-01 | 03 | 2 | AEAUDIT-02 | Allow-list has ~37 supervision pins | integration | `node -e "const a=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json','utf8'));process.exit(a.supervision_exemptions.length>=23?0:1)"` | ⬜ pending |
| 43-03-02 | 03 | 2 | AEAUDIT-02 | v1.4 harness C2 check passes | integration | `node scripts/validation/v1.4-milestone-audit.mjs 2>&1 \| grep -q "C2.*PASS"` | ⬜ pending |
| 43-04-01 | 04 | 2 | AEAUDIT-02 | regenerate-supervision-pins.mjs exists + runs | unit | `test -x scripts/validation/regenerate-supervision-pins.mjs && node scripts/validation/regenerate-supervision-pins.mjs --report 2>&1 \| head -1` | ⬜ pending |
| 43-04-02 | 04 | 2 | AEAUDIT-02 | Helper self-test reproduces Phase 43 pins | integration | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ⬜ pending |
| 43-04-03 | 04 | 2 | AEAUDIT-02 | Helper never auto-pins bare supervision (tier-2 report exists as separate file) | unit | `node scripts/validation/regenerate-supervision-pins.mjs --emit-stubs /tmp/test-stubs.json 2>&1 \| grep -q "suspected-regressions"` | ⬜ pending |
| 43-05-01 | 05 | 3 | AEAUDIT-03 | 4 L2 runbooks have review_by: 2026-06-22 | unit | `for f in docs/l2-runbooks/1{8,9}-android-*.md docs/l2-runbooks/2{0,1}-android-*.md; do grep -q "review_by: 2026-06-22" "$f" \|\| exit 1; done` | ⬜ pending |
| 43-05-02 | 05 | 3 | AEAUDIT-03 | last_verified unchanged (2026-04-23) | unit | `for f in docs/l2-runbooks/1{8,9}-android-*.md docs/l2-runbooks/2{0,1}-android-*.md; do grep -q "last_verified: 2026-04-23" "$f" \|\| exit 1; done` | ⬜ pending |
| 43-05-03 | 05 | 3 | AEAUDIT-03 | Template sentinel in place | unit | `grep -q "last_verified: 1970-01-01 # TEMPLATE-SENTINEL" docs/_templates/admin-template-android.md` | ⬜ pending |
| 43-06-01 | 06 | 3 | AEAUDIT-03 | v1.4.1 harness scope-filter excludes _* dirs | unit | `grep -q "^_" scripts/validation/v1.4.1-milestone-audit.mjs \|\| grep -q "_.*exclude\\|startsWith.*_" scripts/validation/v1.4.1-milestone-audit.mjs` | ⬜ pending |
| 43-06-02 | 06 | 3 | AEAUDIT-03 | v1.4.1 harness recognizes 1970-01-01 sentinel | unit | `grep -q "1970-01-01" scripts/validation/v1.4.1-milestone-audit.mjs` | ⬜ pending |
| 43-06-03 | 06 | 3 | AEAUDIT-03 | v1.4.1 C5 check passes on current tree | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs 2>&1 \| grep -q "C5.*PASS"` | ⬜ pending |
| 43-07-01 | 07 | 4 | AEAUDIT-04 | AOSP stub body ≤ 900 words (target 700) | integration | `python3 -c "import re;t=open('docs/admin-setup-android/06-aosp-stub.md').read();body=re.sub(r'^---.*?---','',t,count=1,flags=re.DOTALL);words=len(body.split());print(words);exit(0 if words<=900 else 1)"` | ⬜ pending |
| 43-07-02 | 07 | 4 | AEAUDIT-04 | PITFALL-7 framing preserved | unit | `grep -q "not supported under AOSP\\|PITFALL-7" docs/admin-setup-android/06-aosp-stub.md` | ⬜ pending |
| 43-07-03 | 07 | 4 | AEAUDIT-04 | 9-H2 whitelist + 8-OEM enumeration intact | unit | `test $(grep -c "^## " docs/admin-setup-android/06-aosp-stub.md) -ge 9 && grep -q "RealWear\\|Zebra\\|PICO\\|HTC\\|Meta" docs/admin-setup-android/06-aosp-stub.md` | ⬜ pending |
| 43-07-04 | 07 | 4 | AEAUDIT-04 | Prep shell exists with RealWear deep content | unit | `test -f .planning/phases/45-*/PHASE-45-AOSP-SOURCE.md && wc -w .planning/phases/45-*/PHASE-45-AOSP-SOURCE.md \| awk '{exit ($1>=200)?0:1}'` | ⬜ pending |
| 43-08-01 | 08 | 5 | AEAUDIT-05 | GitHub Actions workflow exists | unit | `test -f .github/workflows/audit-harness-integrity.yml` | ⬜ pending |
| 43-08-02 | 08 | 5 | AEAUDIT-05 | Pre-commit hook installable | unit | `test -f .githooks/pre-commit -o -f scripts/install-hooks.sh` | ⬜ pending |
| 43-08-03 | 08 | 5 | AEAUDIT-05 | CI YAML asserts sidecar parses + non-empty | unit | `grep -q "supervision_exemptions\\|JSON.parse" .github/workflows/audit-harness-integrity.yml` | ⬜ pending |
| 43-09-01 | 09 | 6 | AEAUDIT-04 | /gsd-validate-phase 39 ran, produced VERIFICATION artifact | integration | `test -f .planning/phases/39-*/39-VERIFICATION.md -o -f .planning/milestones/v1.4-MILESTONE-AUDIT.md` | ⬜ pending |
| 43-09-02 | 09 | 6 | AEAUDIT-04 | DEFER-04 closure recorded in milestone audit or phase VERIFICATION | unit | `grep -l "DEFER-04.*closed\\|DEFER-04.*resolved\\|re_audit_resolution" .planning/milestones/v1.4-MILESTONE-AUDIT.md .planning/phases/43-*/43-VERIFICATION.md 2>/dev/null` | ⬜ pending |
| 43-10-01 | 10 | 7 | AEAUDIT-05 | v1.4 harness exits PASS from clean checkout | integration | `node scripts/validation/v1.4-milestone-audit.mjs --verbose 2>&1 \| tail -5 \| grep -q "0 failed"` | ⬜ pending |
| 43-10-02 | 10 | 7 | AEAUDIT-05 | v1.4.1 harness exits informational-clean | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose 2>&1 \| tail -5 \| grep -q "0 failed\\|informational"` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Existing harness infrastructure at `scripts/validation/` is consumed as-is (no framework install)
- [x] Existing `.planning/` directory is consumed as-is
- [ ] `.github/workflows/` directory may need creation (Wave 5) — flagged if missing at repo root
- [ ] `.githooks/` or pre-commit hook directory may need creation (Wave 5) — flagged if missing

*Node.js runtime is the framework; no package install needed — scripts are stdlib-only per Phase 42 D-25 file-reads-only contract.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 27 new supervision pin reasons are factually correct iOS-attribution claims | AEAUDIT-02 | Writing-rule judgment (Phase 34 D-03) — regex can detect Tier-1 legitimacy but human judges reason-text quality | Review sidecar diff: for each new pin, verify the line contains legitimate iOS/Apple/ADE/HTML-comment attribution per RESEARCH §3 census table |
| AOSP stub still reads well after ~500 words trimmed | AEAUDIT-04 | Prose flow is human judgment | Read trimmed stub; check paragraph transitions; confirm PITFALL-7 framing still prominent |
| PHASE-45-AOSP-SOURCE.md is lossless enough for Phase 45 to consume | AEAUDIT-04 | Quality of the extract depends on Phase 45's downstream needs | Cross-check extracted RealWear deep content against original stub — no tables, no detail paragraphs, no step-by-steps lost |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending (will be approved after planner aligns plan task IDs with this map + executor wave assignments)
