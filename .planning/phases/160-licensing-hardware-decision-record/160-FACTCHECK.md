# Phase 160 Plan 02 — Fact-Check Record

`dispatch_command`: `timeout 600 claude -p "$(cat 160-FACTCHECK-RUBRIC.md) ## Packet $(cat 160-FACTCHECK-PACKET.md)" --output-format text </dev/null > <outfile>`

Each process was a fresh `claude -p` operating-system process, stdin redirected from `/dev/null`,
`--output-format text`, no tool list beyond the implicit read of the two committed files passed in via
command substitution. No process was dispatched inside the context that produced the hunk.

`process_count`: 3 (Task 4). Task 5 adds a fourth, hand-built-packet process — see that task's entry
below for the combined total.

Source dates (from Task 2, repeated here as the third column per Area K1's TIEBREAK RULE):

| Page | `ms.date` (quoted in docs) | `updated_at` (recorded only, never written to `docs/`) |
|---|---|---|
| Windows IoT Enterprise licensing | `2026-06-24T00:00:00Z` | `2026-06-25T22:05:00Z` |
| AssignedAccess CSP | `2025-03-12T00:00:00Z` | `2025-03-12T22:44:00Z` |

## Summary

| Round | Process | Scope | Entries | Result |
|---|---|---|---|---|
| 1 | 1 | Full packet (as first committed at `ef32398f`) | 52 | 30 PRESERVED, 13 STRENGTHENED, 4 INVERTED, 5 FAIL — invalidated by a packet defect, not a content defect (see below) |
| 2 | 2 | Full packet, corrected (comparison table + pre-edit RE-237 citations added at `b40fa9a9`) | 38 | 34 PRESERVED, 4 non-PRESERVED (STRENGTHENED x3, INVERTED x1) |
| 3 | 3 | Fragment-only re-judge of the 3 RE-237 fixes from round 2 (4 clauses) | 4 | 4 PRESERVED, 0 non-PRESERVED |

**Round-1 invalidation, recorded rather than silently discarded:** round 1 judged a packet that omitted
(a) the licensing page's own OEM-vs-Volume comparison table — the only place on the fetched page naming
KMS and MAK as Volume License activation methods — and (b) every pre-edit line of this same document
that the new prose cites or restates (the Prerequisites edition/activation paragraph, the pre-existing
Shell Launcher table row, the MAK/KMS paragraph further down Step 4, and the Reversibility section's
MAK-permanence note). With those two source categories absent, most MAK-related sentences failed for
lack of any citable support in the round-1 packet, not because the underlying claims were inaccurate.
This is logged as a Rule 1 auto-fix (packet-construction bug), not as a content rewrite driven by a
genuine factual error; the round-1 output is preserved below in full rather than deleted, per the
no-unlogged-re-roll rule.

Two round-2 findings were genuine content tightenings, independent of the packet fix: the row-1
consequence cell's "[PILOT] ... kept failing" asserted a repetition the cited pre-edit line does not
support (fixed to "failed"), and P1's "because every pilot image observed to date has shown as
unactivated, never as activated" overgeneralized a single recorded pilot observation into a universal
claim with no `**[PILOT]**` marker (fixed to name the one recorded image and carry the marker). A third,
"long-term servicing wanted (IoT Enterprise LTSC, not the general availability channel)", named a
"general availability channel" contrast term absent from every packet extract (the parenthetical
contrast was dropped; "IoT Enterprise LTSC" itself is source-named and stays). All three fixes were
re-judged in round 3 and returned PRESERVED. No hedge was removed and no modal was strengthened by any
of these three fixes — each narrows an over-broad or unsupported claim, which is the opposite direction
from the fail-on-any-promotion rule's concern.

The `:42` remedy cell's round-2 finding (entry 35, STRENGTHENED — the intended post-edit text dropped the
hedge that row 1 and P1 both carry for the same MAK-produces-Windows-Enterprise claim) is out of scope
for Task 4 and is carried into Task 5, which owns that cell and re-judges it with its own hand-built
packet per D-32.

The Callout (E6) is VERBATIM-LOCKED per D-16 and was never a rewrite candidate in this fact check,
regardless of verdict. Round 1 flagged its MAK clause as STRENGTHENED/INVERTED (entry 42/44); round 2's
corrected packet — which includes the licensing page's Activation-methods row naming MAK as a Volume
License method, and this document's own pre-edit Reversibility line stating MAK permanence and count —
substantially closes that gap in practice even though the locked callout text itself was not re-judged
as a standalone entry in round 2 (it is presented as context only, not judged, per the packet's own
"not eligible for rewrite" label). No edit was made to the callout in this plan, consistent with the
lock.

## Round 1 — full packet, as first committed (INVALIDATED — see Summary)

Captured verbatim from the round-1 output file:

```
# 160-02 Fact-Check Verdicts

Two facts about the packet govern most verdicts below. Neither source extract mentions MAK, KMS, or activation. Extract 1 says a volume license "is available ... to upgrade existing systems with a qualifying operating system to a new version"; it states no prohibition and no exclusivity.

## Step-4 intro and prompt

1. "The licensing standard for this device class decides..." — class 3 (structural) — PRESERVED — a cross-reference inside the document; asserts nothing against either extract.
2. "Ask the admin: Does the kiosk fleet standardize..." — class 2 — PRESERVED — a question restating the two arms of the cited 2026-09-10 ruling; no assertion.

## Table, row 1 (MAK arm)

3. "MAK-activated Windows Enterprise on the current HP hardware" (Option) — class 5→2 — PRESERVED — label for the arm named in the cited ruling.
4. "Existing fleet" — class 5 — PRESERVED — a condition, no factual claim.
5. "the volume agreement carries a confirmed MAK entitlement" — class 5 — PRESERVED — a precondition on the admin's own agreement, not a claim about Microsoft.
6. "Shell Launcher wanted only after `slmgr /xpr` reports..." — class 5, unmarked — FAIL — no extract mentions slmgr or its output string, and the cell carries no **[PILOT]** or RE-237 citation; if this is carried over from pre-edit Prerequisites, cite that line and it reclassifies to class 2.
   **When-to-choose cell: FAIL** by aggregation on 6.
7. "A MAK activates volume-licensed Windows Enterprise." — class 5, judged as class 1 — INVERTED (unsupported) — no extract mentions MAK; unhedged and unmarked, so it reads as sourced.
8. "Volume Licensing reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system" — class 1 — STRENGTHENED — extract 1 says a volume license "is available ... to upgrade existing systems ... to a new version"; "only" adds an exclusivity the extract does not state, and "to a new version" is dropped.
9. "and nobody has confirmed whether this class's image qualifies" — class 4 — PRESERVED — carries the explicit "nobody has confirmed" marker.
10. "an OEM licenses a device into IoT Enterprise at manufacture" — class 1 — PRESERVED — extract 1: an OEM license is required for device makers that preinstall the OS on new devices.
11. "Each MAK activation is permanent and consumes one count" — class 5, unmarked — INVERTED (unsupported) — no extract mentions activation permanence or counts; unhedged, reads as sourced.
12. "**[PILOT]** an image showing as unactivated kept failing the ShellLauncher node" — class 2 — PRESERVED — marked, and the same observation is attributed to the pilot in P2; the Prerequisites line is cited but not reproduced in the packet.
   **Consequence cell, row 1: FAIL** by aggregation on 7, 8, 11.
13. "Standard, ruled 2026-09-10—continue with the multi-app branch at Step 5" — class 2 — PRESERVED — cites the ruling; remainder is navigation.

## Table, row 2 (OEM IoT arm)

14. "OEM-licensed Windows IoT Enterprise hardware" (Option) — class 1 — PRESERVED — extract 1 OEM paragraph.
15. "Purpose-built procurement of further hardware" — class 5 — PRESERVED — a condition.
16. "long-term servicing wanted (IoT Enterprise LTSC, not the general availability channel)" — class 5 — PRESERVED, with a note — extract 1 names Windows IoT Enterprise LTSC; the GAC contrast appears in no extract but states the admin's wish rather than a licensing fact.
17. "Procurement spend" — class 5 — PRESERVED — trivial consequence.
18. "the factory image can still ship OEM utilities, so Step 8 still applies" — class 3 — FAIL (class-3 criterion) — no extract covers factory images; "can" is a possibility modal and there is no must/will, but no explicit hedge marker is present. Low severity.
19. "a device reaches IoT Enterprise through an OEM license at manufacture" — class 1 — PRESERVED — extract 1.
20. "and through Volume Licensing only as an upgrade to a qualifying operating system" — class 1 — STRENGTHENED — same "only" promotion as 8.
   **Consequence cell, row 2: FAIL** by aggregation on 18, 20.
21. "Alternative—not worked here" — class 5 — PRESERVED — navigation.
22. "after procurement the Shell Launcher row opens with WindowsApp_AutoLogon.xml" — class 5, unmarked — FAIL — asserts Shell Launcher is available on IoT Enterprise; extract 2 names only Windows Enterprise and Windows Education, and P2 itself concedes the cited page does not name IoT Enterprise. The cell carries no hedge.
   **Branch cell, row 2: FAIL** by aggregation on 22.

## P1

23. "The Intune Admin Lead ruled on 2026-09-10 that..." — class 2 — PRESERVED — attributed to a dated checkpoint ruling; the record is cited, not reproduced.
24. "The ruling carries one prerequisite: confirm a MAK entitlement..." — class 2 — PRESERVED — stated as part of the ruling.
25. "because the pilot never activated a device" — class 2 — STRENGTHENED — an unmarked pilot claim broader than the one attributed elsewhere in the packet ("an image showing as unactivated"); passes only if the checkpoint record states this rationale.
26. "Microsoft's Windows IoT Enterprise licensing page sets the split out as a requirement matrix" — class 1 — INVERTED (unsupported) — extract 1 is two prose paragraphs; no matrix appears in it.
27. "an OEM licenses a device into IoT Enterprise at manufacture" — class 1 — PRESERVED — extract 1.
28. "Volume Licensing cannot license a device into IoT Enterprise at first licensing" — class 1 — STRENGTHENED — extract 1 describes what a volume license is available for; it states no prohibition, and the draft attributes "cannot" to the page.
29. "Volume Licensing (KMS or MAK) reaches IoT Enterprise only by upgrading..." — class 1 — STRENGTHENED on "only" (as in 8) and INVERTED (unsupported) on "(KMS or MAK)" — neither term appears in extract 1.
30. "Whether this class's Windows 11 Enterprise image counts as qualifying stays UNVERIFIED" — class 4 — PRESERVED — carries UNVERIFIED.
31. "so plan the MAK arm as producing volume-licensed Windows Enterprise until someone confirms otherwise" — class 3 — PRESERVED — "until someone confirms otherwise" is an explicit hedge; no must/will.

## P2

32. "The MAK arm clears the ShellLauncher node's edition gate" — class 3 — STRENGTHENED — a flat assertion of what the same paragraph's next sentence hedges as "should clear ... not pilot-tested"; the MAK-produces-Enterprise premise has no extract support.
33. "Microsoft's AssignedAccess CSP reference states that Shell Launcher and the ShellLauncher node both require Windows Enterprise or Windows Education" — class 1 — PRESERVED — extract 2 verbatim.
34. "and that the ShellLauncher node is not supported in Windows 10 Pro" — class 1 — PRESERVED — extract 2.
35. "That page names no further edition" — class 1 — PRESERVED — extract 2 names Enterprise, Education, and Pro only.
36. "so the IoT Enterprise arm rests on this recipe's own Prerequisites list, not on the cited page" — class 4 equivalent — PRESERVED — explicitly disclaims source support.
37. "a MAK-activated image should clear the same gate—not pilot-tested, stated as reasoning..." — class 3 — PRESERVED — explicit hedge, "should", no must/will.
38. "No first-party page names activation state as a second gate" — class 1 — STRENGTHENED — a universal over all first-party pages; the packet supports only that the cited CSP extract does not mention activation state.
39. "the **[PILOT]** failure on an image showing as unactivated stands as recorded in Prerequisites" — class 2 — PRESERVED — marked and cited.
40. "Under either arm the OEM-cleanup work in Step 8 stays, because it addresses the factory image rather than the license" — class 3 — FAIL (class-3 criterion) — unhedged reasoning; no must/will; no extract covers factory images. Low severity.
41. "an IoT Enterprise device narrows that work only when its specific SKU ships a clean image, which procurement verifies" — class 3 — FAIL (class-3 criterion) — same as 40. Low severity.

## Callout

42. "a MAK bought to reach the IoT arm activates volume-licensed Windows Enterprise" — class 1 — STRENGTHENED — P1 states this outcome only as a planning assumption "until someone confirms otherwise"; the callout flattens it into a fact, and no extract mentions MAK.
43. "OEMs license IoT Enterprise at manufacture" — class 1 — PRESERVED — extract 1.
44. "Volume Licensing only as an upgrade" — class 1 — STRENGTHENED — "only" as in 8.

## `:42` remedy cell, pre-edit (baseline, not a rewrite)

45. "Activate with a per-device volume key (MAK via an Edition upgrade profile)" — baseline — no extract mentions MAK or Edition upgrade profiles; describes delivery only, makes no outcome claim.
46. "buy IoT Enterprise hardware" — baseline — extract 1 OEM paragraph.
47. "or take the multi-app branch worked here" — baseline — navigation.

## `:42` remedy cell, intended post-edit

48. "Activate with a per-device volume key" — class 5 — PRESERVED — unchanged from pre-edit.
49. "a MAK, delivered through an Intune Edition upgrade profile, activates volume-licensed Windows Enterprise" — class 5, unmarked — STRENGTHENED — pre-edit described delivery only; the rewrite adds an unhedged outcome claim that P1 keeps hedged, with no extract support, and adds "Intune", absent from the pre-edit text and both extracts.
50. "reaching IoT Enterprise needs OEM-licensed hardware or a confirmed qualifying-OS upgrade path" — class 1 — STRENGTHENED — "needs X or Y" asserts these are the only two paths; extract 1 lists the two license types without stating exclusivity. The "confirmed" hedge on the upgrade path is correct and should stay.
51. "procure OEM-licensed IoT Enterprise hardware" — class 1 — PRESERVED — extract 1; "OEM-licensed" is a supported tightening of pre-edit "buy".
52. "or take the multi-app branch worked here—see the licensing standard in Step 4" — class 5 — PRESERVED — navigation.
   **`:42` post-edit cell: FAIL** by aggregation on 49, 50.

## Triage

- **Systemic, unsupported MAK claims (7, 11, 29, 32, 42, 49).** No extract names MAK or KMS. Each of these needs a hedge in the sentence itself, an UNVERIFIED marker, or a third source extract that names MAK/KMS. The P1 form at entry 31 is the model that passes.
- **Systemic, "only"/"cannot" promotion (8, 20, 28, 29, 44, 50).** The extract says volume licensing "is available ... to upgrade ... to a new version". The rewrite turned availability into exclusivity and dropped "to a new version". This is the rubric's named largest defect class. Restate as what the page offers, without "only" or "cannot", or source the exclusivity.
- **Intra-paragraph contradiction (32 vs 37).** P2 asserts the gate is cleared, then hedges the same claim one sentence later. Drop the assertion in 32 or hedge it identically.
- **Cells missing in-cell markers (6, 22).** Both may be legitimate carry-overs from pre-edit Prerequisites, but the packet gives no line to trace them to.
- **Class-2 traceability (12, 23, 24, 25, 39).** The ruling and the Prerequisites line are cited but never reproduced in the packet. Entry 25 in particular is broader than the attributed pilot observation and needs the record to pass.
- **Low-severity formal misses (16, 18, 26, 38, 40, 41).** Unhedged document-internal reasoning and one over-generalization. None changes a licensing fact.

Totals across 52 entries: 30 PRESERVED, 13 STRENGTHENED, 4 INVERTED, 5 FAIL. Five of six judged table cells FAIL by aggregation; only the row-1 Option and Branch cells and the row-2 Option cell pass.
```

## Round 2 — full packet, corrected

Captured verbatim from the round-2 output file:

```
Judging the round-2 packet sentence by sentence against its own extracts only. One packet-level note first: the packet supplies fetched file names rather than URLs, so the "link target named in the sentence is the fetched URL" arm of class 1 is judged on page name only. No checkpoint record for the 2026-09-10 ruling is in the packet, so ruling-attributed clauses are judged as conditional on that record.

**Step 4 intro and callout**

1. "The licensing standard for this device class decides..." — class 3 (document-structural). PRESERVED. Asserts only how this document is organized, no external claim, no must/will.
2. "Does the kiosk fleet standardize on MAK-activated..." — question, no assertion. PRESERVED. Its two arms match extract 1b (MAK is a Volume License activation method) and extract 1 (OEM preinstall on new devices). "Current HP hardware" appears in no packet extract; it is a fleet identifier, not a licensing claim.

**Row 1 (MAK arm)**

3. "MAK-activated Windows Enterprise on the current HP hardware" — class 5 label. PRESERVED, same HP note as entry 2.
4. "Existing fleet" — class 5 clause. PRESERVED. Choice condition, no claim.
5. "the volume agreement carries a confirmed MAK entitlement" — class 1/5. PRESERVED. Extract 1b lists MAK under Volume License; pre-edit line says MAK keys are issued under the volume agreement.
6. "Shell Launcher wanted only after slmgr /xpr reports..." — class 2/5 (pre-edit trace). PRESERVED. Pre-edit Shell Launcher row already conditions on "`slmgr /xpr` also reports permanently activated".
7. "A MAK is planned to activate volume-licensed Windows Enterprise, per..." — class 3. PRESERVED. Carries "is planned to" and "until confirmed otherwise", no must/will, consistent with extract 1b.
8. "Volume Licensing reaches IoT Enterprise only by upgrading a device..." — class 1. PRESERVED. Extract 1 ("upgrade existing systems with a qualifying operating system") plus table row New Device = No / Upgrade = Yes supports "only by upgrading".
9. "nobody has confirmed whether this class's image qualifies" — class 4. PRESERVED. Explicit "nobody has confirmed" marker present.
10. "an OEM licenses a device into IoT Enterprise at manufacture" — class 1. PRESERVED. Extract 1: OEM license required for makers that preinstall on new devices.
11. "As with any MAK, the activation is permanent and consumes one count..." — class 2 (pre-edit trace). PRESERVED. Reversibility pre-edit line states permanence and one activation consumed, and the cell cites it.
12. "**[PILOT]** an image showing as unactivated kept failing the ShellLauncher node" — class 2. **STRENGTHENED.** Pre-edit records one observation ("failed ... on an installed Enterprise image ... that observation"). "Kept failing" asserts repetition no cited pre-edit line attributes to the pilot. Fix: "failed". Under the aggregation rule this one clause fails the whole consequence cell.
13. "Standard, ruled 2026-09-10—continue with the multi-app branch..." — class 2 (checkpoint). PRESERVED conditional on the ruling record, which the packet does not include.

**Row 2 (OEM arm)**

14. "OEM-licensed Windows IoT Enterprise hardware" — class 5 label. PRESERVED. Extract 1 OEM licensing.
15. "Purpose-built procurement of further hardware" — class 5 clause. PRESERVED. Choice condition matching extract 1b New Device = Yes for OEM.
16. "long-term servicing wanted (IoT Enterprise LTSC" — class 1. PRESERVED. Extract 1 names IoT Enterprise LTSC; 1b defines LTSC as Long-Term Servicing Channel.
17. "not the general availability channel)" — class 1. **INVERTED (unsupported, not contradicted).** No packet extract names a "general availability channel"; the contrast term rests on outside knowledge. Drop the contrast or add a source line. Under aggregation this fails the when-to-choose cell, though the defect is a clarifier, not a licensing claim.
18. "regardless of arm, the factory image can still ship OEM utilities, so Step 8 is expected to still apply" — class 3. PRESERVED. Hedged with "can still" and "is expected to", no must/will. Note the hedge is modal only, without the fuller "stated as reasoning" marker used in P2.
19. "a device reaches IoT Enterprise through an OEM license at manufacture, and through Volume Licensing only as an upgrade..." — class 1. PRESERVED. Extract 1 plus table 1b support both halves.
20. "Alternative—not worked here; after procurement the Shell Launcher row opens..." — class 2/3. PRESERVED with a note. Edition eligibility traces to the pre-edit Prerequisites list (IoT Enterprise named). The clause is unhedged, and the packet does not state that OEM hardware arrives activated, which the pre-edit Shell Launcher row also requires.

**P1**

21. "The Intune Admin Lead ruled on 2026-09-10 that..." — class 2 (checkpoint). PRESERVED conditional on the absent ruling record. Its licensing content matches extracts 1 and 1b.
22. "The ruling carries one prerequisite: confirm a MAK entitlement..." — class 2 (checkpoint). PRESERVED conditional on the same record.
23. "because every pilot image observed to date has shown as unactivated, never as activated" — class 2. **STRENGTHENED and FAIL (marker dropped).** The only cited pilot line reports one image "reported as unactivated"; "every ... never" is a universal pilot claim not attributed elsewhere in the packet, and it carries no **[PILOT]** marker. Fix: "because the one pilot image recorded in Prerequisites showed as unactivated" with the marker, or cite a record that covers every image.
24. "Microsoft's Windows IoT Enterprise licensing page sets the split out as a requirement matrix..." — class 1. PRESERVED. Table 1b has a Requirement column; New Device OEM Yes / VL No supports "cannot license ... at first licensing"; Activation methods KMS, MAK supports the parenthetical; extract 1 supports the qualifying-OS upgrade clause. Modal strength matches the table's yes/no.
25. "Whether this class's Windows 11 Enterprise image counts as qualifying stays UNVERIFIED, so plan the MAK arm..." — class 4 then class 3. PRESERVED. UNVERIFIED marker present; the plan clause is hedged with "until someone confirms otherwise".

**P2**

26. "Microsoft's AssignedAccess CSP reference states that Shell Launcher and the ShellLauncher node both require..." — class 1. PRESERVED. Extract 2 supports both clauses nearly verbatim.
27. "That page names no further edition" — class 1. PRESERVED. Extract 2 names only Enterprise, Education, and Pro (unsupported); pre-edit Prerequisites line makes the same edition-only reading.
28. "so the IoT Enterprise arm rests on this recipe's own Prerequisites list, not on the cited page" — class 2. PRESERVED. Pre-edit Prerequisites lists IoT Enterprise; extract 2 does not.
29. "a MAK-activated image should clear the same gate—not pilot-tested, stated as reasoning..." — class 3. PRESERVED. Explicit hedge present, "should" not promoted.
30. "No first-party page names activation state as a second gate" — class 2. PRESERVED. Pre-edit line: "no first-party page names activation status as a separate factor", same strength.
31. "the **[PILOT]** failure on an image showing as unactivated stands as recorded in Prerequisites" — class 2. PRESERVED. Marker present, singular image, matches the pre-edit line.
32. "Under either arm, the OEM-cleanup work in Step 8 is expected to stay in scope, because..." — class 3. PRESERVED. Hedged with "is expected to", no must/will.
33. "an IoT Enterprise device is expected to narrow that work once its specific SKU is confirmed..." — class 3. PRESERVED. Hedged and conditional on procurement confirmation.

**Callout** — verbatim-locked, not judged per the packet.

**`:42` remedy cell, intended post-edit**

34. "Activate with a per-device volume key" — class 2 (pre-edit retained). PRESERVED. Pre-edit cell carries it; pre-edit Step 4 line describes MAK as the per-device internet activation.
35. "a MAK, delivered through an Intune Edition upgrade profile, activates volume-licensed Windows Enterprise" — class 3 stated as class 1. **STRENGTHENED.** Row 1 (entry 7) and P1 (entry 25) hedge this same claim because the qualifying-OS question is UNVERIFIED; here it is flat. The packet supports MAK as a Volume License activation method, not which edition it lands on. The trailing "see the licensing standard in Step 4" is a cross-reference, not a hedge on the clause. Fix: "is planned to activate volume-licensed Windows Enterprise until confirmed otherwise". The "Intune" qualifier is new relative to the pre-edit cell but is a delivery mechanism, not a licensing claim.
36. "reaching IoT Enterprise needs OEM-licensed hardware or a confirmed qualifying-OS upgrade path" — class 1. PRESERVED. Table 1b New Device OEM Yes / VL No, Upgrade both Yes.
37. "procure OEM-licensed IoT Enterprise hardware" — class 2/1. PRESERVED. Pre-edit "buy IoT Enterprise hardware" plus the OEM qualifier from extract 1.
38. "or take the multi-app branch worked here—see the licensing standard in Step 4" — class 2. PRESERVED. Pre-edit retained plus an internal cross-reference.

**Summary of non-PRESERVED verdicts**

| Entry | Location | Verdict | Fix |
|---|---|---|---|
| 12 | Row 1 consequence cell, PILOT clause | STRENGTHENED | "kept failing" to "failed" |
| 17 | Row 2 when-to-choose cell | INVERTED (unsupported) | drop "not the general availability channel" or source it |
| 23 | P1 sentence 2 | STRENGTHENED + missing PILOT marker | scope to the one recorded image, add **[PILOT]** |
| 35 | `:42` post-edit cell | STRENGTHENED | restore the "planned to ... until confirmed otherwise" hedge |

Entries 13, 21 and 22 pass only conditionally. The packet still lacks the 2026-09-10 checkpoint record, so class-2 traceability for the ruling itself cannot be closed from the packet alone.
```

## Round 3 — fragment-only re-judge

Captured verbatim from the round-3 output file:

```
Round 3 verdicts, each fragment judged only against its own supporting extract.

1. **"[PILOT] an image showing as unactivated failed…"** — Class 2 — **PRESERVED**. The Prerequisites extract records the ShellLauncher node failing on an image "reported as unactivated"; the new text states one past failure, drops the "kept failing" repetition that round 2 flagged, carries the PILOT marker, and introduces no pilot claim beyond the extract. Dropping "installed Enterprise" narrows detail but does not add or strengthen anything.

2. **"long-term servicing wanted (IoT Enterprise LTSC)"** — Class 1 — **PRESERVED**. The licensing extract names Windows IoT Enterprise LTSC and defines LTSC as Long-Term Servicing Channel, which supports the mapping; the unsupported "not the general availability channel" claim from round 2 is gone; no modal, no link target in the clause.

3. **"because the [PILOT] image recorded in Prerequisites showed as unactivated"** — Class 2 — **PRESERVED**. Traceable to the same Prerequisites line ("reported as unactivated"); the marker is present, and the scope is narrowed from "every pilot image observed to date" to the single recorded image, which removes the promotion round 2 flagged. "Showed as" for "reported as" is a wording change, not a class change.

4. **"never confirmed as activated"** — Class 4 — **PRESERVED**. The clause is an explicit absence-of-confirmation construction (equivalent to "nobody has confirmed"), which is the class-4 marker itself; the extract reports the image only as unactivated and this clause asserts nothing beyond that.

Round 3 result: 4 of 4 clauses PRESERVED, no STRENGTHENED, INVERTED, WEAKENED, or FAIL. The `:42` remedy cell remains out of scope per the packet.
```

## Disposition

All RE-237 Step-4 block content (bridge, lead-in, table, P1, P2) that Task 4 owns is PRESERVED as of
round 3. The `:42` remedy cell (entry 35/49) is Task 5's responsibility and is re-judged there with its
own hand-built packet before that cell is edited. P2 still carries its one `should` hedge and the
reasoning-not-observation clause, unchanged and unpromoted throughout all three rounds.
