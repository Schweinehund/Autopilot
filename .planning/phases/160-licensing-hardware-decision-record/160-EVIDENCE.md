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

## Task 6: Post-insert measurements, deliberate keeps, instrument limits, and the Phase 167 hand-off

### Post-insert `>` run measurements (re-measured at the landing commit)

| Measurement | Command | Pre-edit (`160-GATE-BASELINE.json`) | Post-edit |
|---|---|---|---|
| Total `>` runs | `c17-eee-contract.mjs` internal count, cross-checked with a script that groups consecutive `>`-prefixed lines and joins them per assertion 12's own logic | 25 | 27 |
| Max joined-run length (chars) | same | 197 | 197 |
| Runs over 200 chars | same | 0 | 0 |
| `Ask the admin` lead-ins | `grep -oE '^> \*\*Ask the admin:\*\*'` | 4 | 5 |
| `What breaks if misconfigured` callouts | `grep -oE '^> \*\*What breaks if misconfigured:\*\*'` | 8 | 9 |
| `administrator` (lowercase, case-sensitive) on RE-237 | `grep -oE 'administrator'` | 10 | 10 (unchanged — no new lowercase "administrator" token; the plan's own new prose uses "admin"/"Admin", a distinct word-list token) |
| `administrator` on `docs/reference/licensing-matrix.md` | `grep -oiE 'administrator'` | 1 | 1 (file untouched by this plan) |
| `reported as unactivated` | `grep -oE 'reported as unactivated'` | 6 | 6 (unchanged, per D-30/D-13) |
| `V-156-SIGNINTO` needle (`sign into`, corpus-wide) | `grep -rn 'sign into' docs/` | 0 | 0 |
| `#step-5-author-the-assignedaccessconfiguration-xml` anchor occurrences | `grep -oE` | 6 | 7 |

(The pre-edit `>`-run total of 25 is this file's own count before Task 3's insertion, computed with the
same script against `git show 71e91f82:docs/recipes/06-walk-up-avd-kiosk-autologon.md`; `160-GATE-
BASELINE.json` records the corpus-wide C17 summary, not a per-file run breakdown, so this row is
independently re-derived rather than copied.)

### The six deliberate `check.py` keeps (Area L)

Baseline candidate count for this file: 86 (`160-GATE-BASELINE.json`). Post-edit: 93. All 7 new
candidate rows/count-increments are accounted for below; none is silenced by changing a tooling file.

1. **The lowercase `admin` token inside the pinned lead-in** (E3, VERBATIM-LOCKED) — "Ask the admin:"
   is the file's established decision-block idiom (4 prior uses); this is its 5th, required by D-07's
   placement spec and D-09's paragraph-pair structure. Kept because rewording the locked lead-in would
   break the byte-exact lock.
2. **The role title "Intune Admin Lead"** (P1) — names the frontmatter-sourced ruling owner per D-05;
   the word-list flags "admin" generically, but this is a proper-noun role title, not a general
   audience reference. Kept for attribution accuracy.
   (Together, 1 and 2 account for the `admin` row's count rising from 14 to 16.)
3. **The two `under` uses that fall outside both of the word list's prohibitions** ("under the volume
   agreement" in P1; "Under either arm" opening P2) — the word-list rule targets version-range phrasing
   ("under version X"), not these uses. Kept because check.py's own rule scope does not cover this
   sense of the word, and rewording to avoid it would read as evasive.
4. **The `should` hedge that is the only modal in the hunk** (P2: "a MAK-activated image should clear
   the same gate") — this is the fact-check-required hedge (D-33) distinguishing a reasoning claim from
   an observation; promoting it to remove the word-list flag would strengthen an UNVERIFIED claim,
   which the fail-on-any-promotion rule forbids.
5. **Two new spaced em dashes** in the two new `## See Also` entries — matches this section's own
   established spaced-em-dash convention (8 pre-existing entries all use it); D-40 records spaced em
   dash as list furniture, out of scope for the tight-dash canon that governs new prose paragraphs.
   (Measured: baseline 24 spaced em dashes -> post-edit 26, a delta of 2, not the 3 anticipated at
   authoring time in 160-DRAFTS.md Area L — the actual new-content only introduces two, one per new
   entry. Reported as measured, not adjusted to match the earlier estimate.)
6. **Two new passive-voice/directional candidates that are reasoning-hedge phrasing, not addressable
   without weakening the hedge**: "per the licensing structure below" (row-1 cell, `directional:
   below`) and the three `is expected to` / one `is planned to` / one `is confirmed` passive-voice
   flags across the row-2 cell and P2 — each is the explicit hedge marker Task 4's fact check requires
   (class 3's PASS criterion). Converting to active voice ("expect Step 8 to still apply") would not
   change the underlying hedge, so these are kept as the minimal phrasing that satisfies both the
   fact-check rubric and readability.

One incidental improvement, not a new candidate: Task 5's remedy-cell rewrite replaced "MAK **via** an
Edition upgrade profile" with "delivered **through** an Intune Edition upgrade profile", which removed
one pre-existing `DON'T USE: via` flag. Net effect: 86 baseline + 8 new - 1 removed = 93.

### Style-instrument limits (report-only, stated as limits, not passes)

**`sweep3.py`** run over `docs/recipes` as a directory (`python scripts/docs-style/sweep3.py
docs/recipes scripts/docs-style/_CONTENT-PINS.txt`) reports `0 TOTAL edits`, with 291 table-row
em-dashes and 29 validator-pinned strings and 1 cited verbatim quotation registered as protected
(evidence the tool walked real content across the directory's 6 files, not a vacuous zero-file run;
the tool's own printed "0 files" figure is its touched-files counter, which is 0 by definition whenever
TOTAL edits is 0 — it is not a scanned-files counter). **This is not evidence that the new table cells
or the two new See Also em dashes are tight-dash compliant**: `sweep3.py` skips every line starting
with the pipe character (so it never inspects table cells, where four of this plan's five new
em-dash-relevant edits live) and its em-dash transform is set off unconditionally (so it never tests
em dashes at all, tight or spaced, anywhere). Tight-em-dash compliance for the new table cells (the
en-dash-adjacent list-separators inside the Step-4 table's Branch/Consequence cells, and the tight
em dash in Task 5's remedy cell, "worked here—see the licensing standard") is therefore a **hand
ruling with no instrument**: each was authored to the tight-dash form (no surrounding spaces) matching
D-47's canon for new prose, and verified by direct inspection of the diff, not by any tool. A green
`sweep3.py` run is not evidence for those spans.

**`check.py --no-headings`** is report-only per its own verify contract ("the candidate count itself is
recorded, never gated"); see the six-keep itemization above.

### Four-surface cross-check (D-22)

All four licensing surfaces agree on per-user entitlement and device-scoped activation for this device
class, after this plan:

1. **RE-237's own existing licensing paragraph** (pre-existing, unmodified, Step 4 line 124): "Per-user
   Windows Enterprise E3/E5 cannot license a device nobody signs into. Volume licensing offers three
   activation methods: KMS needs a routed path to the KMS host and expires in 180 days without it;
   Active Directory-Based Activation needs a domain-joined device; **MAK** activates once over the
   internet and is the only one that fits an Entra-only, internet-only kiosk."
2. **The matrix's kiosk blockquote run** (`docs/reference/licensing-matrix.md:70-74`, unmodified by
   this plan): "a per-user entitlement cannot license a device nobody signs into, so a self-deploying
   kiosk never triggers per-user Windows Subscription Activation. This needs a device-scoped activation
   path instead. A per-device volume key (MAK) is the reasoned option for an Entra-only, internet-only
   kiosk. Not pilot-tested—stated as reasoning from the licensing structure, not as an observation."
3. **The new Step-4 block** (this plan): P1/P2 extend the same per-user-cannot-license /
   device-scoped-MAK reasoning to the specific licensing/hardware ruling, adding the same
   "not pilot-tested, stated as reasoning" hedge idiom, and P2 restates "no first-party page names
   activation state as a second gate" — matching RE-224's identical framing (below).
4. **RE-224's `Pilot-observed, one tenant:` claim** (`docs/recipes/03-windows-11-multi-app-kiosk.md:29`,
   byte-unchanged by this plan): "Microsoft's own AssignedAccess CSP reference states the gate in
   edition-only terms—not supported on Pro—and no first-party page names activation status as a
   separate factor. **Pilot-observed, one tenant:** the node also failed with `Class is not licensed
   for use` on an installed Enterprise image that was reported as unactivated; that observation is not
   first-party-documented and is recorded here as what happened, not as why."

All four state the same two facts — a per-user entitlement cannot activate a userless device, and a
device-scoped MAK is the reasoned (not confirmed) path — and none contradicts another. RE-224 is
confirmed byte-unchanged: `git diff --name-only 71e91f82..HEAD` lists no path under
`docs/recipes/03-windows-11-multi-app-kiosk.md`, and `docs/reference/licensing-matrix.md` is likewise
absent (that file is 160-03's scope, not 160-02's).

## Needle list handed to Phase 167 (HARN-04)

Every count below is re-measured at this landing commit. No anchor pin, no date literal, and no
line-number or run-count pin is included — `check-nav-hub-links.mjs` already resolves every in-recipe
fragment corpus-wide and fails on a missing anchor, so pinning an anchor here would duplicate that
validator's own job; a run-count or line-number pin would break on the next unrelated edit to this
file.

| Needle | Value at landing | Note |
|---|---|---|
| `^> \*\*Ask the admin:\*\*` count | 5 | up from 4 |
| `^> \*\*What breaks if misconfigured:\*\*` count | 9 | up from 8 |
| E3 lead-in present verbatim | yes | byte-exact against 160-DRAFTS.md |
| `MAK-activated` present | yes (4 occurrences) | durable literal |
| `OEM-licensed` present | yes (4 occurrences) | durable literal |
| `IoT Enterprise LTSC` present | yes (1 occurrence) | durable literal |
| `iot-enterprise/commercialization/licensing` present | yes (2 occurrences) | durable literal (link target substring) |
| `mdm/assignedaccess-csp` present | yes (2 occurrences) | durable literal (link target substring) |
| `ruled 2026-09-10` present | yes (1 occurrence) | durable literal |
| `qualifying operating system` present | yes (3 occurrences) | durable literal |
| `#step-5-author-the-assignedaccessconfiguration-xml` anchor count | 7 | up from 6 |
| `V-156-SIGNINTO` needle (`sign into`, corpus-wide) | 0 | negative count, unchanged |
| `administrator` (lowercase) on RE-237 | 10 | negative-adjacent count, unchanged |
| `administrator` (case-insensitive) on the matrix | 1 | unchanged; matrix untouched by this plan |
| Two matrix literals 160-03 will land | not yet present | `docs/reference/licensing-matrix.md` is out of this plan's scope; 160-03 lands them |

This section carries no `#`-prefixed anchor fragment presented as a pin, no date literal presented as a
pin, and no line-number or run-count pin — every figure above is a plain count, re-measurable by
re-running the command in the "Post-insert `>` run measurements" table, never asserted as a fixed
constant Phase 167 should expect unconditionally.
