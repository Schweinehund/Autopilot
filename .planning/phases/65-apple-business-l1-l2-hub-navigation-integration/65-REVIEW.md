---
phase: 65-apple-business-l1-l2-hub-navigation-integration
reviewed: 2026-05-22T00:00:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - scripts/validation/check-phase-65.mjs
  - scripts/validation/check-phase-64.mjs
  - scripts/validation/check-phase-62.mjs
  - scripts/validation/v1.6-audit-allowlist.json
  - docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md
  - docs/l2-runbooks/26-apple-business-permission-denied.md
  - docs/l1-runbooks/00-index.md
  - docs/l2-runbooks/00-index.md
  - docs/common-issues.md
  - docs/quick-ref-l1.md
  - docs/quick-ref-l2.md
  - docs/operations/00-index.md
  - docs/index.md
  - docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
findings:
  critical: 0
  warning: 4
  info: 4
  total: 8
status: issues_found
---

# Phase 65: Code Review Report

**Reviewed:** 2026-05-22
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Phase 65 (Apple Business L1/L2 + Hub Navigation Integration) is the navigation-last phase that lights up the C16 4-edge integrity triangle with zero exemptions and adds the validator-as-deliverable `check-phase-65.mjs`. All 14 files were reviewed.

**End-to-end validator results (live execution):**
- `node scripts/validation/check-phase-65.mjs`: **28 PASS, 0 FAIL, 5 SKIPPED** (CHAIN_SKIP = {48,51,58,60,61} matches Phase 64 set as required by directive)
- `node scripts/validation/check-phase-64.mjs`: **24 PASS, 0 FAIL, 5 SKIPPED** (V-64-05 RECONCILED flip confirmed PASS)
- `node scripts/validation/check-phase-62.mjs`: passes V-62-SIDECAR RECONCILED (length === 0)
- `node scripts/validation/v1.6-milestone-audit.mjs`: **15/15 PASS, 0 FAIL** — C16 4-edge triangle fully lit

**Wave-4 atomic-trio commit (`8721a63`) integrity verified:** Single commit modifies exactly 4 files — `12-shared-ipad-passcode-reset.md` (+2 lines), `check-phase-62.mjs` (V-62-SIDECAR flip), `check-phase-64.mjs` (V-64-05 flip), `v1.6-audit-allowlist.json` (4 sunset-65 exemptions removed). Both flipped assertions carry explicit `[RECONCILED Phase 65]` labels for archeology.

**C16 substring contract verified:** All 4 load-bearing substrings appear at the harness-expected locations (verified by running the harness and reading `v1.6-milestone-audit.mjs:770-806`):
- `12-shared-ipad-passcode-reset` in L1 #34 (lines 15, 42, 52, 91, 99, 109, 139)
- `34-apple-business` in `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md:195`
- `#apple-business-quick-reference` in `common-issues.md:339`
- `34-apple-business` in `quick-ref-l1.md:236`

**PITFALL-6 anchor stability verified:** Each of the 5 hub files received exactly one new H2 placed BEFORE existing `## Version History`. The `12-` file received only a single new bullet inside the existing `## Cross-References` H2 (no new H2 added — confirmed via `git diff 260a96b HEAD -- docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md`).

**V-65-SELF guard verified:** `CHAIN_PHASES` includes 64 and does NOT include 65 (auditor-independence preserved).

No CRITICAL issues found. Four WARNING-class robustness gaps and four INFO items follow.

## Warnings

### WR-01: V-65-06 Mermaid-leaf assertion uses `>= 7` against a regex (`\(\[`) that matches outside the Mermaid block

**File:** `scripts/validation/check-phase-65.mjs:137-141`

**Issue:** The assertion counts every `(\[` occurrence in the file and asserts `count >= 7`. The L2 #26 file contains 8 matches because line 13 has a markdown link `([quick-ref-l2.md](...))` whose `([` happens to match the regex (the `(` belongs to the link target syntax and the `[` belongs to a subsequent inline image/link nesting). That inflates the count from the actual 7 Mermaid leaves (lines 33–39) to 8.

Result: V-65-06 currently PASSES against a 7-leaf Mermaid tree, but it would ALSO pass against a degraded 6-leaf tree if any unrelated prose elsewhere in the file contained 2+ extra `([` substrings (e.g., another markdown link, a regex code-block, etc.). DA-9 contract is "LOCKED 7-leaf set" — the threshold should encode equality at minimum, and should ideally scope the regex to inside the ```mermaid ... ``` fence.

**Fix:**
```javascript
// === V-65-06 (tightened): scope ([ count to the Mermaid fence and require exactly 7
const fenceMatch = c.match(/```mermaid\n([\s\S]*?)\n```/);
if (!fenceMatch) return { pass: false, detail: 'L2 #26 has no ```mermaid fence' };
const mermaidBody = fenceMatch[1];
const matches = mermaidBody.match(/\(\[/g);
const count = matches ? matches.length : 0;
if (count !== 7) {
  return { pass: false, detail: 'L2 #26 mermaid fence has ' + count + ' leaf nodes; expected exactly 7 per DA-9 LOCKED' };
}
return { pass: true, detail: 'L2 #26 mermaid fence has exactly 7 leaf nodes (DA-9 LOCKED)' };
```

---

### WR-02: V-65-14 only detects the OLD NEGATIVE detail string; would silently PASS if V-64-05 were deleted instead of flipped

**File:** `scripts/validation/check-phase-65.mjs:262-272`

**Issue:** V-65-14 asserts that the old NEGATIVE failure-detail string is absent from `check-phase-64.mjs`. That string is absent in two structurally different scenarios:

1. (intended) V-64-05 was flipped from NEGATIVE to POSITIVE — current state, PASS is correct
2. (unintended) V-64-05 was deleted outright — V-65-14 still passes silently

The atomic-trio contract requires the POSITIVE flip, not a deletion. The current assertion cannot distinguish these states. Combined with the lack of a positive co-assertion (e.g., "V-64-05 detail contains the new RECONCILED string"), an accidental future deletion of V-64-05 leaves the V-65-14 guard ineffective.

**Fix:**
```javascript
// === V-65-14 (strengthened): also assert the NEW positive flip is present
const c = readFile(CHECK64);
if (c === null) return { pass: false, detail: CHECK64 + ' missing' };
const OLD_DETAIL = '12- contains 34-apple-business reference (C16 sunset Phase 65; must not appear in Phase 64)';
const NEW_LABEL  = "V-64-05 [RECONCILED Phase 65]";
const NEW_POS    = "MUST contain 34-apple-business";
if (c.includes(OLD_DETAIL)) {
  return { pass: false, detail: 'check-phase-64.mjs still contains old V-64-05 NEGATIVE assertion string' };
}
if (!c.includes(NEW_LABEL) || !c.includes(NEW_POS)) {
  return { pass: false, detail: 'check-phase-64.mjs missing V-64-05 RECONCILED positive flip — assertion was deleted, not flipped' };
}
return { pass: true, detail: 'V-64-05 flip confirmed: OLD absent + RECONCILED label and POSITIVE assertion both present' };
```

---

### WR-03: L2 #26 ABPDE1 scope-boundary callout contains an `Intune admin … Apple Business` phrase that matches a C15 banned-phrase regex (rxIntuneAdmin), and would fail C15 if the harness scope ever expands to L2 runbooks

**File:** `docs/l2-runbooks/26-apple-business-permission-denied.md:76`

**Issue:** Line 76 reads: `> **Scope boundary:** This path involves MDM commands (ClearPasscode / EraseDevice) that are issued from the Intune admin center, outside the Apple Business permission surface.`

This matches the C15 `rxIntuneAdmin` regex in `check-phase-64.mjs:239`:
`/\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i`

The reason it does NOT currently fail the v1.6 harness is that `appleBusinessDocPaths()` in `v1.6-milestone-audit.mjs:93-124` enumerates only `_glossary-apple-business.md`, files under `docs/cross-platform/apple-business/`, and the 2 admin-setup C14 sites — L1/L2 runbooks are out of C15 scope. But the brief explicitly flags L2 #26 as "highest-risk surface for C15 regex false-positives," and Phase 66 (or any future widening of `appleBusinessDocPaths()` to include L2 runbooks) would surface this as a C15 violation.

Two safe remediations (both preserve voice):

**Fix option A** — add an ABAUDIT comment above the line to allowlist it explicitly:
```markdown
<!-- ABAUDIT-25: scope-boundary callout intentionally contrasts Intune admin center with Apple Business permission surface; legitimate disambiguation, C15 rxIntuneAdmin exempted -->
> **Scope boundary:** This path involves MDM commands (ClearPasscode / EraseDevice) that are issued from the Intune admin center, outside the Apple Business permission surface. ...
```

**Fix option B** — reword to avoid the `Intune admin … Apple Business` collision while keeping meaning:
```markdown
> **Scope boundary:** This path involves MDM commands (ClearPasscode / EraseDevice) issued from the Intune admin center. These commands are dispatched outside the Apple Business permission surface; for the full responsibility split, see [18-cross-org-boundary-cheat-sheet.md](...).
```

(Rephrased so `Intune admin center.` is sentence-terminated, breaking the 60-character lookahead window before `Apple Business`.)

---

### WR-04: L2 #26 platform-gate banner only points readers to Windows and Android L2 indexes — omits iOS and macOS L2 sections despite `platform: ios+macos+shared-ipad`

**File:** `docs/l2-runbooks/26-apple-business-permission-denied.md:9`

**Issue:** The platform-gate banner reads:
`> **Platform gate:** ... For Windows Autopilot, see [L2 Runbooks](00-index.md). For Android Enterprise, see [Android L2 Runbooks](00-index.md#android-l2-runbooks).`

Yet the file's own frontmatter declares `platform: ios+macos+shared-ipad`, and `docs/l2-runbooks/00-index.md` contains both `## iOS L2 Runbooks` (line 99) and `## macOS ADE Runbooks` (line 71). A reader on an iOS or macOS ticket clicking this banner reaches the L2 index but is given no anchor — they must scroll. L1 #34's analogous banner correctly enumerates four platform-specific anchors (`apv1-runbooks`, `macos-ade-runbooks`, `ios-l1-runbooks`, `android-l1-runbooks`); L2 #26 is inconsistent.

**Fix:**
```markdown
> **Platform gate:** This guide covers Apple Business permission errors across the Apple Business delegated governance surface (iOS/macOS/Shared iPad/Apple TV scoped via Apple Business Organizational Units). For Windows Autopilot, see [L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks). For Android Enterprise, see [Android L2 Runbooks](00-index.md#android-l2-runbooks).
```

---

## Info

### IN-01: V-65-11 windowed-search uses substring matching that is fragile against future H2 additions that share the `## Operations` prefix

**File:** `scripts/validation/check-phase-65.mjs:204-216`

**Issue:** The check uses `c.indexOf('## Operations')` then `c.indexOf('\n## ', opsIdx + 4)`. If a future hub edit adds an H2 like `## Operations Advisory` ABOVE the existing `## Operations`, `indexOf('## Operations')` would match the Advisory heading instead, and the "Apple Business" search window would shift unexpectedly. Probability is low (single-author controlled file), but the assertion would silently report incorrect results.

**Fix:** Anchor on the start-of-line variant and require the exact heading:
```javascript
const opsHeading = '\n## Operations\n';
const opsIdx = c.indexOf(opsHeading);
if (opsIdx === -1) return { pass: false, detail: 'docs/index.md missing exact "## Operations" H2 (line-start match)' };
const searchFrom = opsIdx + opsHeading.length;
const afterOps = c.indexOf('\n## ', searchFrom);
const window = afterOps === -1 ? c.slice(searchFrom) : c.slice(searchFrom, afterOps);
if (!window.includes('Apple Business')) { /* ... */ }
```

---

### IN-02: V-65-02 substring match on `platform: ios+macos+shared-ipad` accepts longer compound platforms as supersets

**File:** `scripts/validation/check-phase-65.mjs:88`

**Issue:** `c.includes('platform: ios+macos+shared-ipad')` matches `platform: ios+macos+shared-ipad` AND would also match `platform: ios+macos+shared-ipad+apple-tv` (because the longer string contains the shorter one as a prefix). The Phase 62 V-62-FRONTMATTER-PARSE test uses a stronger `atoms.join(',')` equality check. V-65-02 could be tightened similarly to lock the exact 3-atom compound contract per D-A5.

**Fix:** Extract and parse the frontmatter `platform:` line, then assert atom set equality:
```javascript
const m = c.match(/^platform:\s*(.+?)$/m);
if (!m) return { pass: false, detail: 'L1 #34 missing platform: line' };
const atoms = m[1].trim().split('+').map(s => s.trim()).sort();
const expected = ['ios', 'macos', 'shared-ipad'].sort();
if (atoms.length !== expected.length || atoms.some((a, i) => a !== expected[i])) {
  return { pass: false, detail: 'L1 #34 platform atoms ' + JSON.stringify(atoms) + ' != ' + JSON.stringify(expected) };
}
```

---

### IN-03: Variable `CHECK64` is module-scoped but never used outside V-65-14; consider inlining or moving closer to use site

**File:** `scripts/validation/check-phase-65.mjs:35`

**Issue:** Constant `CHECK64 = 'scripts/validation/check-phase-64.mjs'` is declared at module scope alongside the path constants for files referenced in many assertions, but is only ever read inside V-65-14. The chain-runner uses an inline template literal `scripts/validation/check-phase-${phaseNum}.mjs`. Either inline `CHECK64` into V-65-14 or have the chain-runner use it for `phaseNum === 64` — the current split is mild dead code. Minor style/maintainability item.

---

### IN-04: Stale comment in `check-phase-62.mjs:44` contradicts the post-Phase-64 Phase-50 inclusion precedent

**File:** `scripts/validation/check-phase-62.mjs:44`

**Issue:** Comment reads: `// Phase 50 stub excluded per check-phase-61.mjs precedent (stub validator; not full check).` But `check-phase-64.mjs:52` records the corrected precedent: `// Phase 50 included: check-phase-50.mjs runs 26 checks and exits 0 (not a stub).` And `check-phase-65.mjs` correctly includes Phase 50 in CHAIN_PHASES. The 62 comment is now stale — it documents a precedent that was overturned in Phase 64. Phase 65 did not touch this comment, so it persists.

The check-phase-62 CHAIN_PHASES list at line 45 is `[48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61]` — missing 50 — which is intentional historical behavior. But future maintainers reading the comment will be misled. Suggest updating the comment to note the precedent was overturned downstream:

**Fix:**
```javascript
// Phase 50 excluded in Phase 62 history (then-current precedent: stub validator).
// NOTE: This precedent was overturned by Phase 64 (check-phase-50.mjs runs 26 checks and exits 0; not a stub).
// Phase 62's CHAIN_PHASES is preserved here for archeological accuracy of Phase 62 close-state.
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];
```

---

_Reviewed: 2026-05-22_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
