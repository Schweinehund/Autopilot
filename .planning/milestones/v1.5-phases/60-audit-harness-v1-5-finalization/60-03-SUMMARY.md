---
phase: 60-audit-harness-v1-5-finalization
plan: 03
subsystem: docs
tags: [markdown, anchor-shims, broken-links, mlc-3.14.2, l1-runbooks, android-enterprise]

requires:
  - phase: 48-audit-harness-bootstrap-broken-link-sweep-first-pass
    provides: 48-VERIFICATION-broken-links.md baseline (51 Category A findings; rows 54-70 owned by this plan)
provides:
  - 17 GFM-honored `<a id="..."></a>` shims across 4 Android L1 runbooks (file 25=4, file 27=4, file 28=4, file 29=5)
  - 17 of 51 Category A baseline broken-anchor findings closed (pre-Plan-09 C13 promotion path)
  - Per-file commit cadence (D-25 progressive landing) -- 4 atomic `fix(60-03):` commits
affects:
  - Plan 60-08 (atomic harness commit / C13 informational->blocking promotion gate)
  - Plan 60-09 (pre-promotion second-pass mlc sweep -- these 17 findings now resolved)
  - Plan 60-10 (terminal re-audit close)

tech-stack:
  added: []
  patterns:
    - "D-08(b) HTML-shim cluster-edit pattern: <a id=\"...\"></a> on its own line immediately above existing H2 with intact {#explicit-id} attribute"
    - "Per-file atomic commit per D-25 (4 commits for 4 files; 17 shims total)"
    - "Per-commit harness regression-guard (node scripts/validation/v1.5-milestone-audit.mjs exit 0)"
    - "CRLF-preserving content insertion via Python (Edit-tool quirk on Windows worktree CRLF files)"

key-files:
  created: []
  modified:
    - "docs/l1-runbooks/25-android-compliance-blocked.md (+8 shim lines / 4 anchors: cause-a-play-integrity-verdict-failure, cause-b-os-version-policy-mismatch, cause-c-ca-timing-gap, cause-d-passcode-encryption-policy-mismatch)"
    - "docs/l1-runbooks/27-android-zte-enrollment-failed.md (+8 shim lines / 4 anchors: cause-a-device-not-uploaded-by-reseller, cause-b-configuration-not-assigned, cause-c-zt-intune-linking-broken, cause-d-kme-zt-mutual-exclusion-conflict)"
    - "docs/l1-runbooks/28-android-knox-enrollment-failed.md (+8 shim lines / 4 anchors: cause-a-b2b-account-pending, cause-b-device-not-in-kap, cause-c-profile-unassigned, cause-d-kme-zt-mutex-collision)"
    - "docs/l1-runbooks/29-android-aosp-enrollment-failed.md (+10 shim lines / 5 anchors: cause-a-realwear, cause-b-zebra, cause-c-pico, cause-d-htc, cause-e-meta-quest)"

key-decisions:
  - "Used D-08(b) HTML-shim approach (not D-08(a) link-text rewrite) for ALL 17 anchors -- preserves intentional cause-X-named anchors; mlc 3.14.2 doesn't honor existing {#explicit-id} attributes but does honor <a id> shims"
  - "Per-file commit cadence (4 commits) vs single bulk commit -- matches D-25 progressive-landing precedent established by sibling Plan 60-02 (10 shims / 4 files / 4 commits)"
  - "Heading text and {#explicit-id} attributes preserved verbatim (zero behavioral diff for non-mlc consumers including GFM auto-slug + GitHub UI); shim placed between separator '---' and H2 with surrounding blank lines"
  - "Switched from Edit tool to Python-based byte-level file I/O for content insertion (Rule 3 deviation): on this Windows worktree (core.autocrlf=true) the Edit tool's first attempt on file 25 reported success but did not persist to disk; a Python read/replace/write preserving CRLF terminators worked deterministically across all 4 files"

patterns-established:
  - "D-08(b) HTML-shim (carry-forward from Plan 60-02): `<a id=\"<anchor>\"></a>` on its own line followed by blank line above the heading; shim is GFM-honored AND mlc-honored AND adds zero visible content"
  - "Cluster-edit safety: each file committed atomically; harness regression-guard run after EACH commit (4 separate harness runs across this plan); halts immediately on any FAIL"
  - "CRLF-aware in-place insertion via Python on Windows worktrees: open(fp,'rb'), .decode('utf-8'), .replace(old_with_CRLF, new_with_CRLF, 1), open(fp,'wb').write(.encode('utf-8')); preserves both CRLF terminators and UTF-8 encoding"

requirements-completed: [AUDIT-05]

duration: ~3.5min
completed: 2026-05-06
---

# Phase 60 Plan 03: Broken-Anchor Cluster Edit (4 Android L1 Runbooks) Summary

**17 GFM-honored `<a id="..."></a>` anchor shims added across 4 Android L1 runbooks (files 25/27/28/29) via D-08(b) HTML-shim cluster-edit pattern; 17 of 51 Category A baseline broken-anchor findings closed; harness regression-guard exits 0 (12/12 PASS) after each of 4 atomic commits**

## Performance

- **Duration:** ~3.5 min (216 seconds wall-clock from plan start to final commit)
- **Started:** 2026-05-06T19:31:32Z
- **Completed:** 2026-05-06T19:35:08Z (approx, from final commit timestamp)
- **Tasks:** 2 (Task 1 = 2 files / 8 shims / 2 commits; Task 2 = 2 files / 9 shims / 2 commits)
- **Files modified:** 4
- **Total shims:** 17 (4 + 4 + 4 + 5)
- **Commits:** 4 (one per file)

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1a | Fix 25-android-compliance-blocked.md (4 shims) | `1f6860f` | docs/l1-runbooks/25-android-compliance-blocked.md |
| 1b | Fix 27-android-zte-enrollment-failed.md (4 shims) | `1ab2188` | docs/l1-runbooks/27-android-zte-enrollment-failed.md |
| 2a | Fix 28-android-knox-enrollment-failed.md (4 shims) | `a4da17b` | docs/l1-runbooks/28-android-knox-enrollment-failed.md |
| 2b | Fix 29-android-aosp-enrollment-failed.md (5 shims) | `6faa2d1` | docs/l1-runbooks/29-android-aosp-enrollment-failed.md |

## What Was Built

For each of the 4 Android L1 runbooks, an HTML `<a id="cause-X-..."></a>` shim was inserted immediately above each `## Cause X: ... {#cause-X-...}` H2 (separated by a blank line above and below). The shim provides an mlc-tool-3.14.2-recognizable anchor target while the existing `{#explicit-id}` attribute remains untouched (preserving GFM auto-slug behavior + GitHub UI rendering byte-identically).

Per file:

- **25-android-compliance-blocked.md** (4 shims, lines 35-40 quick-nav TOC bullets resolved):
  - `cause-a-play-integrity-verdict-failure`
  - `cause-b-os-version-policy-mismatch`
  - `cause-c-ca-timing-gap`
  - `cause-d-passcode-encryption-policy-mismatch`

- **27-android-zte-enrollment-failed.md** (4 shims):
  - `cause-a-device-not-uploaded-by-reseller`
  - `cause-b-configuration-not-assigned`
  - `cause-c-zt-intune-linking-broken`
  - `cause-d-kme-zt-mutual-exclusion-conflict`

- **28-android-knox-enrollment-failed.md** (4 shims):
  - `cause-a-b2b-account-pending`
  - `cause-b-device-not-in-kap`
  - `cause-c-profile-unassigned`
  - `cause-d-kme-zt-mutex-collision`

- **29-android-aosp-enrollment-failed.md** (5 shims, per-OEM):
  - `cause-a-realwear`
  - `cause-b-zebra`
  - `cause-c-pico`
  - `cause-d-htc`
  - `cause-e-meta-quest`

## Decisions Made

- **D-08(b) HTML-shim (not D-08(a) link rewrite)** -- Same rationale as sibling Plan 60-02: preserves intentional cause-X anchor naming and is the minimum-surface fix; the 17 quick-nav TOC bullets at lines 35-40 of each file remain byte-identical (zero TOC text changes).
- **Per-file atomic commits (4)** -- Matches Plan 60-02's 4-commit cadence; D-25 progressive-landing precedent. Each commit independently regression-guarded against `v1.5-milestone-audit.mjs`.
- **CRLF preservation via Python I/O** -- See Deviations below. The Edit tool initially silently dropped changes on file 25 (likely interaction between core.autocrlf=true and the tool normalization); switched to byte-level Python I/O which deterministically preserved CRLF and persisted across all 4 files.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Edit tool silently dropped changes on file 25 (CRLF interaction)**
- **Found during:** Task 1, file 25 first attempt
- **Issue:** Four sequential `Edit` tool calls all returned success but `git status` reported "working tree clean" and `cat -A` confirmed no shims were present in the file. The file has CRLF terminators on a worktree with `core.autocrlf=true`. The `Read` tool returned a stale (post-Edit, in-memory) view, hiding the discard.
- **Fix:** Switched to Python-based byte-level read/replace/write (`open('rb')` -> `decode('utf-8')` -> `str.replace(old_with_CRLF, new_with_CRLF, 1)` -> `encode('utf-8')` -> `open('wb').write()`). Preserves CRLF terminators and UTF-8 encoding deterministically.
- **Files modified:** docs/l1-runbooks/{25,27,28,29}-android-*.md (Python path used uniformly across all 4 files for consistency, even though only file 25 had directly observed Edit-tool failure)
- **Verification:** Per-file post-edit `git diff --stat` shows expected `+N insertions(+)` (file 25/27/28: +8 each; file 29: +10); `file <path>` shows `with CRLF line terminators` preserved; `grep -c <a id="cause-` returns expected count (4/4/4/5).
- **Commits:** All 4 task commits (`1f6860f` / `1ab2188` / `a4da17b` / `6faa2d1`)

**2. [Rule 3 - Blocking] Write tool also affected by same CRLF/persistence quirk for SUMMARY**
- **Found during:** SUMMARY creation (post-task-2)
- **Issue:** Initial `Write` tool call to create `60-03-SUMMARY.md` reported success but `[ -f ... ]` and `ls -la` confirmed the file did not exist on disk. Same root cause as Edit-tool issue above.
- **Fix:** Used Python `open(fp, "w", newline="").write(content)` to author SUMMARY deterministically.
- **Files modified:** .planning/phases/60-audit-harness-v1-5-finalization/60-03-SUMMARY.md (this file)

### Other Adjustments

None. Heading text, `{#explicit-id}` attributes, frontmatter, and quick-nav TOC bullets all preserved verbatim per plan requirements.

## Verification Results

### Per-file shim counts (post-edit)

```
docs/l1-runbooks/25-android-compliance-blocked.md: 4
docs/l1-runbooks/27-android-zte-enrollment-failed.md: 4
docs/l1-runbooks/28-android-knox-enrollment-failed.md: 4
docs/l1-runbooks/29-android-aosp-enrollment-failed.md: 5
Total: 17
```

### Per-anchor presence (all 17 unique IDs found exactly once)

```
file25: cause-a-play-integrity-verdict-failure=1, cause-b-os-version-policy-mismatch=1,
        cause-c-ca-timing-gap=1, cause-d-passcode-encryption-policy-mismatch=1
file27: cause-a-device-not-uploaded-by-reseller=1, cause-b-configuration-not-assigned=1,
        cause-c-zt-intune-linking-broken=1, cause-d-kme-zt-mutual-exclusion-conflict=1
file28: cause-a-b2b-account-pending=1, cause-b-device-not-in-kap=1,
        cause-c-profile-unassigned=1, cause-d-kme-zt-mutex-collision=1
file29: cause-a-realwear=1, cause-b-zebra=1, cause-c-pico=1, cause-d-htc=1, cause-e-meta-quest=1
```

### Harness regression-guard (after each commit)

`node scripts/validation/v1.5-milestone-audit.mjs` exits **0** with **12/12 PASS** after:
- Commit `1f6860f` (post-file-25)
- Commit `1ab2188` (post-file-27)
- Commit `a4da17b` (post-file-28)
- Commit `6faa2d1` (post-file-29 / plan close)

No Phase 49-59 V-NN-NN structural invariant breaks.

### PITFALL-12 surface check

None of files 25 / 27 / 28 / 29 are listed in `scripts/validation/v1.5-audit-allowlist.json` `supervision_exemptions[]` / `safetynet_exemptions[]` / `c7_knox_allowlist[]`. The plan RESEARCH PITFALL-12 surface watch (PLAN.md line 154 / threat row T-60-03-02) confirmed pre-flight; line shifts from shim insertion are safe and do NOT require sidecar pin refresh in this plan.

## Success Criteria Met

- [x] 17 broken anchor refs in 48-VERIFICATION-broken-links.md baseline rows 54-70 are now resolvable in their host files
- [x] 4 commits land per D-25 progressive-landing (`fix(60-03):` prefix)
- [x] No PITFALL-12 trigger (none of these 4 files in sidecar pin lists)
- [x] Harness regression-guard GREEN (exits 0) after each commit
- [x] Each file follows D-08 HTML-shim cluster-edit pattern (4 commits = 1 per file)
- [x] Total 17 new `<a id="cause-..."></a>` shim lines across 4 files

## Cross-References

- **48-VERIFICATION-broken-links.md** rows 54-70 -- baseline broken-anchor findings closed by this plan
- **60-02-SUMMARY.md** -- sibling cluster-edit plan (10 shims / 4 macOS L1 runbooks); shares D-08(b) pattern + per-file commit cadence
- **Plan 60-09** (forthcoming) -- second-pass mlc sweep gate that confirms 0 NEW findings against 48-VERIFICATION baseline for these 4 files before C13 informational->blocking promotion

## Self-Check: PASSED

Verified files exist:
- FOUND: docs/l1-runbooks/25-android-compliance-blocked.md (with 4 cause shims)
- FOUND: docs/l1-runbooks/27-android-zte-enrollment-failed.md (with 4 cause shims)
- FOUND: docs/l1-runbooks/28-android-knox-enrollment-failed.md (with 4 cause shims)
- FOUND: docs/l1-runbooks/29-android-aosp-enrollment-failed.md (with 5 cause shims)

Verified commits exist (`git log --oneline --all`):
- FOUND: 1f6860f fix(60-03): repair 4 broken anchors in 25-android-compliance-blocked.md
- FOUND: 1ab2188 fix(60-03): repair 4 broken anchors in 27-android-zte-enrollment-failed.md
- FOUND: a4da17b fix(60-03): repair 4 broken anchors in 28-android-knox-enrollment-failed.md
- FOUND: 6faa2d1 fix(60-03): repair 5 broken anchors in 29-android-aosp-enrollment-failed.md

No stubs introduced. No new threat surface introduced (4 doc-content edits within harness scope; T-60-03-01 mitigation = per-commit harness regression-guard, all GREEN).
