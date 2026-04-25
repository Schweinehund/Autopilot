---
phase: 46
slug: cope-full-admin
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-25
---

# Phase 46 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node `node:fs` mechanical checks via `scripts/validation/v1.4.1-milestone-audit.mjs` (declarative file-content checks; no Jest/Mocha) |
| **Config file** | `scripts/validation/v1.4.1-audit-allowlist.json` (sidecar JSON, line-pinned exemptions) |
| **Quick run command** | `node scripts/validation/v1.4.1-milestone-audit.mjs` |
| **Full suite command** | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| **Helper command** | `node scripts/validation/regenerate-supervision-pins.mjs --report` (advisory) |
| **Pre-commit hook** | `scripts/hooks/pre-commit.sh` (Phase 43 Plan 08; auto-enforced at every git commit) |
| **Estimated runtime** | ~10 seconds per full audit run |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validation/v1.4.1-milestone-audit.mjs` (~10s; expects 8/8 PASS)
- **After every plan wave:** Run quick command + `node scripts/validation/regenerate-supervision-pins.mjs --report` (confirms zero allow-list line-shifts)
- **Before `/gsd-verify-work`:** Full suite must be green; pre-commit hook auto-enforces at every commit
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 46-01-* | 01 | 1 | AECOPE-01 | T-46-01 (banned-phrase prose injection) | New file `08-cope-full-admin.md` ships with 11 H2s; C1+C2+C5+C9 PASS; banned-phrase grep returns zero hits applied to COPE | C1 SafetyNet + C2 supervision + C5 freshness + C9 banned-phrase | `node scripts/validation/v1.4.1-milestone-audit.mjs` | ✅ harness exists | ⬜ pending |
| 46-01-* | 01 | 1 | AECOPE-01 | — | Source-confidence markers regex compliance for MEDIUM/LOW assertions | grep regex check | `grep -E '\[(HIGH\|MEDIUM\|LOW)(: [A-Za-z ]+)?(, last_verified \d{4}-\d{2}-\d{2})?\]' docs/admin-setup-android/08-cope-full-admin.md` | ✅ grep available | ⬜ pending |
| 46-02-* | 02 | 2 | AECOPE-02 | T-46-02 (Cross-Platform Equivalences row drift) | Capability matrix retains 5 H2 sub-tables; COPE column inserted at index 1; Cross-Platform Equivalences UNCHANGED structure (line count + row count preserved) | C2 supervision + manual diff | `node scripts/validation/v1.4.1-milestone-audit.mjs` + `git diff docs/reference/android-capability-matrix.md` | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | AECOPE-02 | — | Allow-list line-shifts surfaced if any new pins needed | helper advisory | `node scripts/validation/regenerate-supervision-pins.mjs --report` | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | AECOPE-03 | T-46-03 (over-trim of COBO source-attribution HTML comment) | COBO line 64 sentence-scoped trim; lines 58-63 + 65-66 PRESERVED including `<!-- MEDIUM confidence ... last_verified: 2026-04-21 -->` HTML comment | Visual diff scope check | `git diff docs/admin-setup-android/03-fully-managed-cobo.md` (verify only line 64 changed; comment block at line 66 untouched) | ✅ git available | ⬜ pending |
| 46-02-* | 02 | 2 | AECOPE-04 | — | Glossary `### Private Space` H3 added alphabetical between Fully Managed and Supervision; line 15 alphabetical index updated; COPE/WPCO see-also forward-links to new admin doc | C5 freshness on glossary; manual H3-presence check | `node scripts/validation/v1.4.1-milestone-audit.mjs` + `grep -n '### Private Space' docs/_glossary-android.md` | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | D-10 | T-46-04 (BYOD line 167 retrofit shifts other content) | BYOD line 167 sentence-scoped retrofit (replace standalone Private Space sentence with forward-link); zero collateral changes elsewhere in BYOD doc | Visual diff scope check | `git diff docs/admin-setup-android/04-byod-work-profile.md` | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | D-11 | — | Version-matrix `### Android 15 — Private Space (Personal-Side, Unmanageable)` H3 added in Version Breakpoint Details; line 30 anchor-link updated to `#android-15-private-space-breakpoint` | C5 freshness + manual H3 + anchor check | `node scripts/validation/v1.4.1-milestone-audit.mjs` + `grep -n 'Private Space' docs/android-lifecycle/03-android-version-matrix.md` | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | D-23 | — | All Wave-2 surfaces ship in single atomic commit (capability matrix + COBO trim + glossary + BYOD line 167 + version-matrix breakpoint H3) | git log inspection | `git log -1 --stat <commit-sha>` shows ≥5 files | ✅ git available | ⬜ pending |
| 46-01-* | 01 | 1 | D-25 | — | RESEARCH gate ran BEFORE authoring with PASS verdict on all 4 authoritative sources | RESEARCH.md existence + content check | Existence of `46-RESEARCH.md` with "Gate Outcome: ALL FOUR sources unanimous" or equivalent PASS marker | ✅ done 2026-04-25 | ✅ green |
| 46-01-*, 46-02-* | 01+02 | 1+2 | D-31 | T-46-01 (banned-phrase prose injection) | Zero banned phrases (`deprecated`, `end of life`, `removed`, `EOL`, `no longer supported`, `obsolete`, `sunset`, `retired`) applied to COPE across any new or edited Phase 46 file | C9 banned-phrase informational-first + author-time grep | `node scripts/validation/v1.4.1-milestone-audit.mjs` + `grep -nE '\b(deprecated\|end of life\|removed\|EOL\|no longer supported\|obsolete\|sunset\|retired)\b' docs/admin-setup-android/08-cope-full-admin.md docs/reference/android-capability-matrix.md docs/_glossary-android.md docs/android-lifecycle/03-android-version-matrix.md docs/admin-setup-android/03-fully-managed-cobo.md docs/admin-setup-android/04-byod-work-profile.md` (verify zero hits in COPE-relevant context) | ✅ | ⬜ pending |
| 46-01-* | 01 | 1 | SC#1 | — | New file ships with parallel-structure 11 H2s mirroring COBO sibling line-by-line | manual H2 count + diff | `grep -c '^## ' docs/admin-setup-android/08-cope-full-admin.md` returns 11 | ✅ | ⬜ pending |
| 46-01-* | 01 | 1 | SC#2 | — | Android 15 Private space `> ⚠️` callout present in `## Key Concepts` H2 of new file | grep + visual check | `grep -A2 'Private space\|Private Space' docs/admin-setup-android/08-cope-full-admin.md \| grep '⚠'` returns at least one match | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | SC#3 | — | COBO migration-note line 64 sentence-scoped trim with forward-link to new file (atomic same-commit with Wave 1 file creation) | git log + grep | `git log -1 --stat` shows both `03-fully-managed-cobo.md` and `08-cope-full-admin.md` in same commit; `grep -c '08-cope-full-admin.md' docs/admin-setup-android/03-fully-managed-cobo.md` returns ≥1 | ✅ | ⬜ pending |
| 46-02-* | 02 | 2 | SC#4 | — | Capability matrix has COPE column at index 1 (between COBO and BYOD); Cross-Platform Equivalences section LINE-COUNT and ROW-COUNT identical to before retrofit; glossary COPE/WPCO entries forward-link to `08-cope-full-admin.md` | manual structure diff + grep | `git diff --stat docs/reference/android-capability-matrix.md` (Cross-Platform Equivalences section H2 untouched); `grep -c '08-cope-full-admin.md' docs/_glossary-android.md` returns ≥2 (COPE entry + WPCO entry both back-link) | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — existing audit infrastructure (Phase 43 Plan 02 v1.4.1 harness + Phase 43 Plan 04 regenerate-supervision-pins helper + Phase 43 Plan 08 pre-commit hook) covers all Phase 46 verification requirements without extension.

The harness handles:
- C1 SafetyNet zero-tolerance with allow-list pin OR nearby deprecation prose exemption
- C2 supervision zero-tolerance with allow-list pin by {file, line}
- C5 60-day freshness on all Android docs (D-26 inheritance)
- C9 banned-phrase informational-first per D-29 (Phase 47 owns blocking promotion)
- `_*-prefix` scope filter excludes templates and drafts (Phase 43 D-24)

Phase 46 deliverables MUST use the Phase 34 `admin-template-android.md` frontmatter discipline:
```yaml
---
audience: admin
platform: Android
applies_to: COPE
last_verified: <execute-time-date>
review_by: <last_verified + 60d>
---
```

so C5 freshness passes on first run.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 11 H2s mirror COBO sibling 1:1 in fixed order | SC#1 / D-01 | H2 ordering is structural; harness counts but doesn't enforce sequence | Compare `grep -n '^## ' docs/admin-setup-android/08-cope-full-admin.md` against `grep -n '^## ' docs/admin-setup-android/03-fully-managed-cobo.md` — same 11 names in same order (with `## COPE Migration Note` repurposed per D-03) |
| Decision matrix 5-row × 3-col shape with positive-framing cells | D-13 / D-15 / D-17 | Cell content correctness requires read-through against banned-phrase guard rules (D-17 positive-framing rule) | Read `## Provisioning method choice` (or H2 `#cope-vs-cobo-decision`) section; confirm 3 columns (Decision factor / COBO / COPE-WPCO), 5 rows in fixed order; verify "Recommended for net-new in 2026" row uses "Yes — provision as WPCO per current Google guidance" wording (NOT "deprecated" / "replacement" framing) |
| Samsung-admins callout in `### Zero-Touch` H3 includes WPCO-equivalence clarification | D-19 | Wording precision matters; sibling callout at COBO line 162 is template baseline | Read callout block; verify "WPCO is Google's modern terminology for the same deployment shape this guide calls COPE" sentence is present verbatim; verify ≥4 forward-links (Knox doc / ZT mutex anchor / WPCO glossary / Zero-Touch glossary) |
| Cross-Platform Equivalences section preserved verbatim | SC#4 / D-22 | AECOPE-02 verbatim "preserve Cross-Platform Equivalences Section structure" requires zero changes to lines 72-88 of capability matrix | `git diff docs/reference/android-capability-matrix.md` filtered to line range 72-88 returns no diff |
| RESEARCH.md gate captures unanimous PASS on 4 authoritative sources | D-25 / SC#5 | Plan-time research gate is procedural; existence of RESEARCH.md alone is insufficient — content must show PASS verdict | Read `46-RESEARCH.md` `## Mandatory Research Gate` section; verify 4 sources cited (Google AE Help / Android Developers / Bayton FAQ / MS Learn); verify "Path A LOCKED" or equivalent PASS marker |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (none required — existing harness covers all)
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s (~10s actual)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
