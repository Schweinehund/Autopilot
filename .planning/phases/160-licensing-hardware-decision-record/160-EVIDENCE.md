# Phase 160 Plan 02 — Evidence Record

## Task 1: Pilot device licensing reading

**Outcome: DECLINED 2026-09-14**

The owner declined to run the two read-only `slmgr.vbs` commands on the walk-up AVD kiosk pilot
device. Per D-30's decline path, this is a supported answer, not a failure: the plan continues to
completion and P2 (Task 3) is written WITHOUT the pilot-measurement sentence rather than hedging it.
No fifth value, and none of the five allowlist-excluded identifier fields named in the checkpoint's
own instructions is recorded anywhere in this file or in any other committed file. LIC-01 still
flips at this plan's boundary regardless of the checkpoint's outcome (D-30's third independent
reason: `requirements.mark-complete` runs from this plan's own frontmatter at its own boundary).

## Task 2: Source re-fetch

Both Learn pages were re-fetched as served HTML at execution time (2026-09-14) into the phase
directory, per Area K1's exact fetch loop.

**Commands used (loop shape, one iteration per URL):**

```bash
for u in https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing \
         https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp; do
  n=$(basename "$u")
  curl -sSL "$u" -o ".planning/phases/160-licensing-hardware-decision-record/160-src-$n.html"
  tr '\n\t' '  ' < ".planning/phases/160-licensing-hardware-decision-record/160-src-$n.html" \
    | grep -oE '<meta name="(ms\.date|updated_at)" content="[^"]*"|<local-time[^>]*datetime="[^"]*"'
done
```

The `tr '\n\t' '  '` flatten step is load-bearing: in the served HTML the `<local-time>` element's
attributes are split across newlines and tabs, so a grep against the raw bytes returns nothing.

**Per-page dates (all three recorded, per the TIEBREAK RULE only `ms.date` is quoted in prose or
in `## See Also`):**

| Page | Saved file | Byte count | `ms.date` | `updated_at` | `<local-time datetime>` |
|---|---|---|---|---|---|
| Windows IoT Enterprise licensing | `160-src-licensing.html` | 41,969 | `2026-06-24T00:00:00Z` | `2026-06-25T22:05:00Z` | `2026-06-24T08:00:00.000Z` |
| AssignedAccess CSP | `160-src-assignedaccess-csp.html` | 84,793 | `2025-03-12T00:00:00Z` | `2025-03-12T22:44:00Z` | `2025-03-12T08:00:00.000Z` |

Both `ms.date` values match the values already recorded elsewhere in the corpus
(`155-04-SUMMARY.md:134-139` = CSP at ms.date 2025-03-12; `.planning/research/PITFALLS.md:94-101` =
IoT at ms.date 2026-06-24) — neither page moved, so no re-verification of a dependent sentence was
triggered.

**TIEBREAK RULE applied:** `ms.date` is the value quoted in every sourced claim and in both new
`## See Also` gloss entries, because the page's own rendered "Last updated on" tracks `ms.date`
rather than `updated_at` (measured on both pages, this session and the prior research session).
`updated_at` is recorded above as a third column for the record and is never written into `docs/`.

**Literal presence confirmed in the fetched bytes:**
- `160-src-licensing.html` contains `qualifying operating system` — count 1.
- `160-src-assignedaccess-csp.html` contains `not supported in Windows 10 Pro` — count 1.

Both files are over 10,000 bytes (41,969 and 84,793), confirming served documents rather than error
pages.

## Excluded-identifier needle check (D-30 allowlist enforcement)

A needle for the five allowlist-excluded pilot-device identifier fields, derived in-process by
character-class split and counted only (never echoed, never pasted), returns 0 occurrences over
this file. This check re-runs after every subsequent write to this file in this plan.
