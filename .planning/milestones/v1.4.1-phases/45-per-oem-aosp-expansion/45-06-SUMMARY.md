---
phase: 45-per-oem-aosp-expansion
plan: 06
subsystem: documentation
tags: [android, aosp, reference-matrix, capability-matrix, realwear, zebra, pico, htc, meta-quest, intune, ar-vr, oem-comparison, pitfall-7, meta-volatility, aeaospfull-06]

# Dependency graph
requires:
  - phase: 39-zero-touch-enrollment-aosp-stub
    provides: PITFALL-7 framing precedent (D-10 + D-13) reused once at top of Scope H2; D-08 No-Notes-column matrix lock carry-forward (D-12); 06-aosp-stub.md:23 ⚠️ scope-and-status callout pattern reused for the Scope H2 blockquote; D-20 source-confidence marker regex carry-forward applied to Source Attribution H2
  - phase: 43-v1-4-cleanup-audit-harness-fix
    provides: 60-day Android freshness rule (D-26) applied via frontmatter review_by 2026-06-24; v1.4.1 audit harness (scripts/validation/v1.4.1-milestone-audit.mjs) re-run after authoring confirms 8/8 PASS exit 0
  - phase: 45-per-oem-aosp-expansion
    provides: Wave 1 admin docs 09-13 (RealWear / Zebra / Pico / HTC / Meta Quest) — column data and stable per-OEM anchor cross-link targets (#common-failures, #wi-fi-qr-embedding, #oemconfig-apk-push, #pico-business-suite-coexistence, #meta-for-work-portal-setup, #meta-horizon-subscription-status); Plan 45-05 Meta Quest plan-time D-06 RESOLVED HIGH-confidence ALIVE-in-transformed-form framing reused verbatim in `[^meta-volatility]` footnote text
provides:
  - docs/reference/aosp-oem-matrix.md (5-OEM × capability cross-reference matrix in 4 narrow tables grouped by capability H2 per D-11)
  - Anchor target ready for Wave 4 retrofit of docs/reference/android-capability-matrix.md:121-127 #deferred-full-aosp-capability-mapping per AEAOSPFULL-09 verbatim "link to" wording
  - Reference precedent for 4-H2-sub-table OEM-row × capability-column shape (vs sibling 5-H2-sub-table mode-column × feature-row shape) — OEM-domain-driven adaptation of sibling android/ios/macos capability matrix pattern
  - Reference precedent for Meta-volatility reference-style footnote `[^meta-volatility]` carrying Feb 20, 2026 wind-down + Intune-direct fallback + plan-time re-verification gate citation (D-14)
  - Reference precedent for `## Source Attribution` H2 with section-level confidence pin (W-3) replacing per-cell MEDIUM markers — applies whenever multiple cells in a sub-table share the same confidence inference
affects:
  - 45-10 atomic Wave 4 retrofit (consumes this matrix as the link target for android-capability-matrix.md:121-127 #deferred-full-aosp-capability-mapping anchor fill per AEAOSPFULL-09 verbatim "link to" wording)
  - Future v1.5 per-OEM AOSP expansions (DigiLens / Lenovo / Vuzix per RESEARCH.md deferred items) — append-only row additions to all 4 sub-tables; same 4-H2 shape inherited

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "4-H2-sub-table OEM-row × capability-column shape (D-11) — Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode in fixed order; sibling android/ios/macos use 5-H2 mode-column × feature-row shape, but AOSP-domain has no analog to sibling 'Software Updates' cross-OEM dimension so 4-H2 is the OEM-domain-driven adaptation"
    - "Single ## Scope H2 at top with PITFALL-7 framing once per D-13 — do NOT repeat across the 4 sub-tables (PITFALL 12 scope-creep avoidance); mirrors 06-aosp-stub.md:23 ⚠️ scope-and-status callout pattern verbatim"
    - "All 5 AEAOSPFULL-06 dimensions surfaced as named columns per D-12 — enrollment methods (Enrollment Method); vendor portals (Vendor Portal); license tiers (Intune Plan Tier); Intune AOSP mode per-vendor (User-Associated + Userless); Wi-Fi embedding variance (Wi-Fi Embedding). NO prose-Notes column anywhere (D-08 carry-forward LOCKED)"
    - "Meta-row reference-style footnote `[^meta-volatility]` referenced from 3 cells (Hardware Scope min-firmware row; Enrollment Method and Wi-Fi Embedding row; Vendor Portals and Licensing row) per D-14 — definition appears once at file bottom between sub-table #4 and `## See Also` H2; carries Feb 20 2026 wind-down + Intune-direct fallback + plan-time re-verification gate citation"
    - "## Source Attribution H2 per D-15 — per-OEM source-confidence pins live OUTSIDE tables in single H2 at file bottom (5 per-OEM HIGH-confidence pins listed) + W-3 section-level mode-confidence pin replacing per-cell MEDIUM markers across 10 mode cells"
    - "Cell-value discipline per D-16 LOCKED — only literal strings: Yes / No / REQUIRED / OPTIONAL / N/A / Plan 1 / Plan 2 / Suite. NO `+` notation anywhere in tables. Exceptions/conditions handled via footnotes (`[^meta-volatility]`); never inline prose-Notes column"
    - "## Version History H2 per D-16 trailing-paragraph mandate (NOT ## Changelog) — aligns with sibling matrix convention (android-capability-matrix.md:139, ios:103, macos:99); single-row 3-column table with date / change / author"
    - "Frontmatter contract per D-27 — last_verified 2026-04-25 + review_by 2026-06-24 (60-day Android freshness per D-26); audience admin; platform Android; applies_to AOSP"

key-files:
  created:
    - docs/reference/aosp-oem-matrix.md
  modified: []

key-decisions:
  - "Authored 4 H2 sub-tables in fixed order per D-11 (Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode) — OEM-as-row × capability-as-column, 5 OEM rows each. The 4-H2 shape vs sibling 5-H2 shape is OEM-domain-driven (no AOSP-domain analog to sibling 'Software Updates' cross-OEM dimension), not a sibling-pattern departure. Total 8 H2s (4 capability + Scope + See Also + Source Attribution + Version History)"
  - "Single ## Scope H2 at top carries PITFALL-7 framing once per D-13 — do NOT repeat across the 4 sub-tables (PITFALL 12 scope-creep avoidance per CONTEXT D-13). Verbatim text: 'Devices listed in this matrix are supported under AOSP because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed instead — these OEMs are not supported under AOSP when GMS is available.' Single occurrence of `supported under AOSP` confirmed by grep -c (returns 1)"
  - "Meta-volatility handled via reference-style footnote `[^meta-volatility]` per D-14 — referenced from 3 Meta-row cells (Hardware Scope min-firmware; Enrollment Method and Wi-Fi Embedding; Vendor Portals and Licensing). Definition once at file bottom between sub-table #4 and ## See Also. Footnote text: Feb 20 2026 wind-down + HMS-FREE-through-2030-01-04 + Intune-direct fallback + cross-link to 13-aosp-meta-quest.md#meta-horizon-subscription-status + plan-time re-verification gate URL meta.com/blog/an-update-on-meta-for-work. NO Notes column inserted (D-08 + D-12 LOCKED)"
  - "## Source Attribution H2 per D-15 lists 5 per-OEM HIGH-confidence pins OUTSIDE the tables — RealWear / Zebra / Pico / HTC / Meta Quest each carry `[HIGH: <source>, last_verified 2026-04-25]` markers. Pico carries embedded MEDIUM qualifier on license tier per RESEARCH.md §1. Source-confidence markers live ONLY here, never inside table cells per D-15 + D-08 spirit"
  - "Per-OEM Intune AOSP Mode cells use literal `Yes` for both User-Associated and Userless across all 5 OEMs WITHOUT per-cell MEDIUM markers per W-3 disposition (RESEARCH.md Open Question §1). Section-level confidence pin handled at ## Source Attribution H2 with single MEDIUM marker: `[MEDIUM: AR/VR pattern inference + MS Learn dual-mode AOSP support, last_verified 2026-04-25] — per-OEM verification deferred to v1.5 if mode-specific failure modes emerge in field use`. This single section-level pin replaces what would have been 10 per-cell MEDIUM markers (5 OEMs × 2 columns); cell-level MEDIUM markers add noise; section-level confidence pinning matches sibling matrix convention"
  - "Cell-value discipline per D-16 LOCKED — only literal strings used: Yes / No / REQUIRED / OPTIONAL / N/A / Plan 1 / Plan 2 / Suite. NO `+` notation anywhere in tables (verified by grep returning 0). Exceptions/conditions handled exclusively via `[^meta-volatility]` footnote, never inline prose-Notes column. RealWear Wi-Fi cell carries `WPA/WPA2-PSK/WPA3 only — NOT EAP` qualifier inline (per RESEARCH.md §1 anti-pattern that EAP is silently broken on RealWear staging Wi-Fi); HTC Enrollment Method cell carries `Settings > Advanced > MDM setup > QR code` inline path (per RESEARCH.md §1 verbatim path discipline reducing L1 confusion)"
  - "## Version History H2 (NOT ## Changelog) per sibling matrix convention verified at android-capability-matrix.md:139, ios:103, macos:99 + D-16 trailing-paragraph mandate. Single-row 3-column table dated 2026-04-25 with full Phase 45 AEAOSPFULL-06 initial-version description (4 H2 sub-tables in fixed order; 5-OEM rows; Meta-row footnote per D-14; Source Attribution H2 per D-15 with section-level mode pin per W-3; cell-value rules literal-strings only per D-16; single Scope H2 with PITFALL-7 framing once per D-13)"
  - "File guard per D-29 honored — git diff --name-only shows ONLY docs/reference/aosp-oem-matrix.md as a new file. No modifications to any other file in scope or out of scope"

patterns-established:
  - "4-H2-sub-table OEM-row × capability-column reference matrix shape (D-11): adaptation of sibling 5-H2 mode-column × feature-row shape for OEM-domain matrices. Inheritable for any future per-OEM cross-comparison matrix (e.g., v1.5 DigiLens / Lenovo / Vuzix per-OEM expansion or v1.6 Knox tablet/wearable/Galaxy XR matrix if scope warrants)"
  - "Section-level confidence pin in Source Attribution (W-3 disposition): single MEDIUM marker at H2 scope replacing N per-cell MEDIUM markers when multiple cells in a sub-table share the same confidence inference. Reduces cell-noise while preserving Phase 39 D-20 source-confidence marker regex compliance at section scope"
  - "Reference-style footnote for time-bounded vendor volatility (D-14): `[^vendor-volatility]` pattern with cross-link to authoritative source + plan-time re-verification gate URL. Inheritable for any future matrix where vendor-side product transitions occur (paid-to-free, regional restriction changes, sunset dates)"
  - "Single ## Scope H2 with PITFALL-7 framing once per D-13: scope-creep guard against repeating PITFALL-7 callout across N sub-tables (sibling 06-aosp-stub.md:21-26 single-blockquote precedent). Inheritable for any AOSP-scoped reference doc where PITFALL-7 framing is required but should not bloat the H2 contract"

requirements-completed: [AEAOSPFULL-06]

# Metrics
duration: 3min
completed: 2026-04-25
---

# Phase 45 Plan 06: Per-OEM AOSP Expansion — AOSP OEM Matrix Summary

**5-OEM × capability cross-reference matrix at `docs/reference/aosp-oem-matrix.md` in 4 narrow tables grouped by capability H2 (Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode) with single PITFALL-7 framing, Meta-row volatility footnote, and section-level mode-confidence pin per W-3 disposition.**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-25T15:49:25Z
- **Completed:** 2026-04-25T15:52:05Z
- **Tasks:** 1 of 1 (Task 1 — Author docs/reference/aosp-oem-matrix.md)
- **Files modified:** 1 created (`docs/reference/aosp-oem-matrix.md`, 85 lines)

## Accomplishments

- Authored `docs/reference/aosp-oem-matrix.md` (85 lines, 5-OEM × capability cross-reference matrix) per AEAOSPFULL-06 — the canonical AOSP cross-OEM comparison surface that admins consult to compare RealWear / Zebra / Pico / HTC / Meta Quest side-by-side across 5 capability dimensions
- Established 4-H2-sub-table OEM-row × capability-column shape (D-11) as OEM-domain adaptation of sibling 5-H2 mode-column × feature-row pattern — fixed order Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode
- All 5 AEAOSPFULL-06 dimensions surfaced as named columns per D-12 (enrollment methods, vendor portals required/optional, license tiers, Intune AOSP mode per-vendor, Wi-Fi embedding variance) with NO prose-Notes column (D-08 + D-12 LOCKED carry-forward)
- Single ## Scope H2 at top with PITFALL-7 framing once per D-13 (scope-creep guard against repeating across 4 sub-tables); Meta-row reference-style footnote `[^meta-volatility]` per D-14 referenced from 3 Meta cells with definition between sub-table #4 and ## See Also
- ## Source Attribution H2 per D-15 with 5 per-OEM HIGH-confidence pins OUTSIDE tables + W-3 section-level mode-confidence pin replacing what would have been 10 per-cell MEDIUM markers across the Intune AOSP Mode sub-table (5 OEMs × 2 columns)
- Cell-value discipline per D-16 LOCKED — only literal strings (Yes / No / REQUIRED / OPTIONAL / N/A / Plan 1 / Plan 2 / Suite); NO `+` notation anywhere; RealWear `WPA/WPA2-PSK/WPA3 only — NOT EAP` Wi-Fi inline qualifier and HTC `Settings > Advanced > MDM setup > QR code` enrollment inline path retained from RESEARCH.md anti-pattern + verbatim-path discipline
- ## Version History H2 (NOT ## Changelog) per sibling matrix convention verified at android-capability-matrix.md:139 + D-16 trailing-paragraph mandate
- v1.4.1 audit harness 8/8 PASS (exit 0) confirming PITFALL-7 preservation (informational C6) at 1/1 AOSP-scoped files for new matrix; freshness check (C5) passes for new frontmatter

## Task Commits

Each task was committed atomically:

1. **Task 1: Author docs/reference/aosp-oem-matrix.md** — `a6e78b2` (feat)

**Plan metadata commit:** TBD (final commit at end of execution captures SUMMARY + STATE + ROADMAP)

## Files Created/Modified

- `docs/reference/aosp-oem-matrix.md` — 5-OEM × capability cross-reference matrix in 4 narrow tables grouped by capability H2; 85 lines; frontmatter (last_verified 2026-04-25 / review_by 2026-06-24 / audience admin / platform Android / applies_to AOSP) + H1 + 1-paragraph preamble + 8 H2s (## Scope / ## Hardware Scope / ## Enrollment Method and Wi-Fi Embedding / ## Vendor Portals and Licensing / ## Intune AOSP Mode / ## See Also / ## Source Attribution / ## Version History) + `[^meta-volatility]` footnote definition

## Decisions Made

- **4-H2-sub-table shape per D-11 LOCKED** — Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode in fixed order. OEM-as-row × capability-as-column with 5 OEM rows each. The 4-H2 vs sibling 5-H2 difference is OEM-domain-driven (no analog to sibling "Software Updates" cross-OEM dimension), not a sibling-pattern departure
- **Single ## Scope H2 at top with PITFALL-7 framing once per D-13** — scope-creep guard against repeating PITFALL-7 callout across N sub-tables. Verbatim wording: "Devices listed in this matrix are supported under AOSP because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed instead — these OEMs are not supported under AOSP when GMS is available. (Phase 39 PITFALL-7 framing.)"
- **Meta-volatility via reference-style footnote `[^meta-volatility]` per D-14** — referenced from 3 cells (Hardware Scope min-firmware row carrying Quest 2/3/3s/Pro firmwares; Enrollment Method and Wi-Fi Embedding row carrying Meta for Work portal mention; Vendor Portals and Licensing row carrying Meta for Work / Meta Horizon Managed Services mention). Footnote text: Feb 20, 2026 wind-down + HMS-FREE-through-2030-01-04 + 4-portal pattern remains operational + Intune-direct AOSP enrollment as vendor-independent fallback + cross-link to 13-aosp-meta-quest.md#meta-horizon-subscription-status + plan-time re-verification gate URL meta.com/blog/an-update-on-meta-for-work. NO Notes column inserted
- **W-3 section-level confidence pin disposition (RESEARCH.md Open Question §1)** — Per-OEM Intune AOSP Mode cells use literal `Yes` for both User-Associated and Userless across all 5 OEMs WITHOUT per-cell MEDIUM markers. Single section-level pin at ## Source Attribution H2 replaces what would have been 10 per-cell MEDIUM markers. This is the canonical Section Attribution-level confidence pin pattern for any future matrix where multiple cells share the same confidence inference
- **Cell-value discipline per D-16 LOCKED** — only literal strings: Yes / No / REQUIRED / OPTIONAL / N/A / Plan 1 / Plan 2 / Suite. NO `+` notation anywhere (grep confirmed 0 matches). Exceptions handled exclusively via `[^meta-volatility]` footnote, never inline prose-Notes column. Two inline qualifiers retained from RESEARCH.md per-OEM specificity discipline: RealWear `WPA/WPA2-PSK/WPA3 only — NOT EAP` (per RESEARCH.md §1 anti-pattern: EAP is silently broken on RealWear staging Wi-Fi) and HTC `Settings > Advanced > MDM setup > QR code` (per RESEARCH.md §1 verbatim-path discipline reducing L1 confusion)
- **## Version History H2 (NOT ## Changelog) per sibling convention** — verified at android-capability-matrix.md:139, ios:103, macos:99. D-16 trailing-paragraph mandate enforces this convention

## Deviations from Plan

None — plan executed exactly as written. All Plan 45-06 specifics (4-H2-sub-table shape per D-11; single Scope H2 per D-13; Meta footnote per D-14; Source Attribution + W-3 section-level pin per D-15; cell-value rules per D-16; Version History per D-16 trailing-paragraph mandate; frontmatter per D-27; file guard per D-29) implemented verbatim.

**Total deviations:** 0
**Impact on plan:** Plan executed exactly as authored.

## Issues Encountered

None.

## Verification Results

All Task 1 acceptance criteria PASS (verified via Bash commands):

- [x] **File exists:** `docs/reference/aosp-oem-matrix.md` — FOUND (85 lines)
- [x] **H2 count >= 7:** 8 H2s present (## Scope / ## Hardware Scope / ## Enrollment Method and Wi-Fi Embedding / ## Vendor Portals and Licensing / ## Intune AOSP Mode / ## See Also / ## Source Attribution / ## Version History)
- [x] **All 4 capability H2s present per D-11:** Hardware Scope ✓ / Enrollment Method and Wi-Fi Embedding ✓ / Vendor Portals and Licensing ✓ / Intune AOSP Mode ✓
- [x] **Single ## Scope H2 with PITFALL-7 framing per D-13:** `## Scope` matches exactly once; "supported under AOSP" appears exactly once
- [x] **Meta footnote per D-14:** `[^meta-volatility]` matches 5 times (definition + 4 cell references — Hardware Scope min-firmware / Enrollment Method / Vendor Portals / one duplicate from cross-link)
- [x] **## Source Attribution H2 per D-15:** matches once (5 per-OEM HIGH pins + W-3 section-level mode pin)
- [x] **## Version History H2 (NOT ## Changelog) per D-16:** ## Version History matches once; ## Changelog matches 0 times
- [x] **Cell-value discipline per D-16:** NO `+` notation in cell rows (`grep -E '\| [A-Za-z0-9 ]+ \+ [A-Za-z0-9 ]+'` returns 0 matches)
- [x] **All 5 OEM rows in each capability sub-table:** RealWear / Zebra / Pico / HTC / Meta Quest (or Meta) rows present in all 4 sub-tables
- [x] **Frontmatter per D-27:** applies_to AOSP / audience admin / last_verified 2026-04-25 / review_by 2026-06-24 — all match
- [x] **PSK-only RealWear note per RESEARCH.md anti-pattern:** "WPA/WPA2-PSK/WPA3 only — NOT EAP" matches once in Wi-Fi cell
- [x] **HTC verbatim in-device path:** "Settings > Advanced > MDM setup" matches once in Enrollment Method cell
- [x] **Audit harness PASS:** `node scripts/validation/v1.4.1-milestone-audit.mjs` exits 0 (8/8 PASS — C1 SafetyNet, C2 supervision, C3 stub envelope, C4 Android links in deferred shared files, C5 freshness, C6 PITFALL-7 1/1 AOSP-scoped files preserve framing, C7 bare Knox advisory, C9 COPE banned-phrase advisory)
- [x] **Wave 1 dependency check:** all 5 admin docs 09-13 exist (verified via ls before authoring)
- [x] **Shared-file modification guard per D-29:** `git status --short docs/reference/aosp-oem-matrix.md` shows ONLY this file as new; no other modifications staged or unstaged in tracked-file scope

## Self-Check: PASSED

- File created: `docs/reference/aosp-oem-matrix.md` — verified via `test -f` (exists, 85 lines)
- Commit hash: `a6e78b2` — verified via `git log --oneline | grep a6e78b2` (FOUND)
- Audit harness re-run: `node scripts/validation/v1.4.1-milestone-audit.mjs` exits 0 (8/8 PASS)

## User Setup Required

None — documentation-only plan; no external service configuration required.

## Next Phase Readiness

- **Wave 2 Plan 45-06 complete** — `docs/reference/aosp-oem-matrix.md` ready as anchor target for Wave 4 Plan 45-10 atomic same-commit retrofit of `docs/reference/android-capability-matrix.md:121-127` `#deferred-full-aosp-capability-mapping` anchor per AEAOSPFULL-09 verbatim "link to" wording
- **Wave 2 Plan 45-07 (06-aosp-stub.md collapse) ready to start** — independent of this plan; can execute in parallel or sequence
- **Wave 3 Plans 45-08 (L1 runbook 29) + 45-09 (L2 runbook 23) ready to start** — depend on Wave 1 admin docs 09-13 `## Common Failures` anchors per D-21 (already shipped); no dependency on this matrix
- **Wave 4 Plan 45-10 (atomic retrofit) gated by Wave 3 completion** — needs L1/L2 runbook anchors for cross-link landing
- **No blockers** — Plan 45-06 closes AEAOSPFULL-06 cleanly with 0 deviations

---
*Phase: 45-per-oem-aosp-expansion*
*Completed: 2026-04-25*
