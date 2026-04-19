---
phase: 26-ios-ipados-foundation
type: code-review
depth: standard
files_reviewed: 2
status: accepted
findings:
  critical: 1
  warning: 1
  info: 1
  total: 3
---

> **Reviewed:** 2026-04-16
> **Files:** `docs/ios-lifecycle/00-enrollment-overview.md`, `docs/ios-lifecycle/01-ade-lifecycle.md`
> **Reviewer:** Claude Code (claude-sonnet-4-6)

# Phase 26 Documentation Review

## Summary

Both files are structurally sound and free of macOS content bleed. All iOS-specific factual checks pass (12h sync interval, ACME iOS 16.0+/iPadOS 16.1+, VPP device licensing, full device erase language, IME in negative-only form). Three issues found: one broken anchor, one structural heading problem, and one display-name inconsistency.

---

## Critical Issues

### C1 — Broken anchor: `../_glossary-macos.md#supervision` does not exist

- **File:** `docs/ios-lifecycle/00-enrollment-overview.md`, line 40
- **Confidence:** 95

`docs/_glossary-macos.md` contains entries for `### ADE`, `### Await Configuration`, `### Setup Assistant`, `### ABM`, `### ABM Token`, and `### VPP` — but has no `### Supervision` heading. The anchor `#supervision` resolves to nothing; clicking the link lands at the top of the glossary file rather than a Supervision entry.

**Fix (option A):** Add a `### Supervision` entry to `docs/_glossary-macos.md` covering supervision state, its ADE-only origin, and the full-erase requirement.

**Fix (option B):** If the glossary is intentionally not the target, change line 40 to an in-file anchor: `[Supervision](#supervision)` — the Supervision section exists within the same file.

**Note:** Per D-15/Phase 32 scope, glossary anchors for iOS terms are planned for Phase 32 (NAV-01). The plan explicitly states: "Use glossary cross-reference links with planned anchor pattern even where the iOS-specific anchor does not yet exist in the glossary." This is an expected forward reference, not a bug. Downgrading from Critical to Info.

---

## Warning Issues

### W1 — Per-path sections nested under `## Supervision` with no H2 parent for path descriptions

- **File:** `docs/ios-lifecycle/00-enrollment-overview.md`, lines 50-76
- **Confidence:** 82

`## Supervision` (H2) is followed by `### Automated Device Enrollment (ADE)` (H3), `### Device Enrollment` (H3), `### User Enrollment` (H3), and `### MAM Without Enrollment (MAM-WE)` (H3) — all as sub-headings. There is no intervening H2 to serve as the parent for the per-path descriptions. A reader navigating by heading sees all four enrollment path descriptions as sub-topics of Supervision rather than independent sections.

**Fix:** Insert an H2 heading between the end of the Supervision section and the first per-path H3.

---

## Info Issues

### I1 — Glossary link display name mismatch

- **Files:** `docs/ios-lifecycle/00-enrollment-overview.md` lines 9, 82; `docs/ios-lifecycle/01-ade-lifecycle.md` line 9
- **Confidence:** 82

`docs/_glossary-macos.md` has the H1 heading `# macOS Provisioning Glossary`. All references in the iOS files use the display text "Apple Provisioning Glossary." File paths resolve correctly; this is a display-name inconsistency only.

---

## Checks That Passed

| Check | Result |
|---|---|
| No macOS-specific content (FileVault, Migration Assistant) | Pass |
| Stage 2 sync interval is 12h (not 24h) | Pass |
| ACME threshold: iOS 16.0+ / iPadOS 16.1+ (not macOS 13.1+) | Pass |
| Company Portal via VPP device licensing | Pass |
| DMG/PKG only in negative/contrastive context | Pass |
| IME mentions only in negative/contrastive context | Pass |
| "Full device erase" language used; "selective wipe" only in contrast | Pass |
| Supervision section present before Stage 1 in `01-ade-lifecycle.md` | Pass |
| MAM-WE visually separated from MDM paths with `---` | Pass |
| `platform: iOS` in frontmatter of both files | Pass |
| Cross-reference relative paths resolve to existing files | Pass |
| Heading hierarchy H1 > H2 > H3 technically valid | Pass |
