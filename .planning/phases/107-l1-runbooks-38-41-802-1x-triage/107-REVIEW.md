---
phase: 107-l1-runbooks-38-41-802-1x-triage
reviewed: 2026-06-30T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - docs/l1-runbooks/38-8021x-certificate-failure.md
  - docs/l1-runbooks/39-8021x-radius-reject.md
  - docs/l1-runbooks/40-8021x-server-trust-failure.md
  - docs/l1-runbooks/41-8021x-eap-negotiation-failure.md
  - docs/decision-trees/10-8021x-triage.md
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues
---

# Phase 107: Code Review Report

**Reviewed:** 2026-06-30
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Five new documents were reviewed against the locked decisions in 107-CONTEXT.md and the verified signal strings in 107-RESEARCH.md. The overall quality is high: all five-platform diagnostic signals are accurate (no Dot3Svc/Operational channel name error, correct `Microsoft-Windows-Wired-AutoConfig/Operational`, correct `com.apple.eapol` predicate, correct `journalctl -u NetworkManager`), D-07 routing is correct in all four runbooks, no live links to non-existent L2 files, navigation-last rule followed, callout vocabulary clean (NOTE only; no IMPORTANT), 90-day freshness math correct (2026-06-30 + 90 = 2026-09-28), compound platform token correctly formatted, and all `click` paths in the decision tree resolve to existing files.

Two Warnings require fixes before the phase closes: authoring directives leaked verbatim into L1-visible prose across all four runbooks, and the MEDIUM-confidence callout explicitly required by RESEARCH.md for the macOS eapolclient command is absent from all four runbooks (both were flagged as required by the resolved open question in RESEARCH.md). Two Info items are also noted.

---

## Narrative Findings (AI reviewer)

## Warnings

### WR-01: Authoring directives appear verbatim in L1-visible prose across all four runbooks

**Files:**
- `docs/l1-runbooks/38-8021x-certificate-failure.md:35` — `— link-not-copy`
- `docs/l1-runbooks/38-8021x-certificate-failure.md:66` — `(read-only link; do not reproduce the check or the WARNING block inline)`
- `docs/l1-runbooks/39-8021x-radius-reject.md:77` — `(read-only link; do not reproduce the service check inline)`
- `docs/l1-runbooks/40-8021x-server-trust-failure.md:76` — `(read-only link; do not reproduce the service check inline)`
- `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md:56` — `— do not restate the method details inline`
- `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md:86` — `(read-only link; do not reproduce the service check inline)`

**Issue:** Implementation-phase authoring instructions were included verbatim in the published runbook text rather than being stripped at authoring time. An L1 technician following runbook #38 reads "for the full explanation — link-not-copy)" as body text, which is meaningless and erodes trust in the document. The "(read-only link; do not reproduce...)" parentheticals are similarly authoring-process reminders, not user-facing instructions. These directives appear in the middle of sentences that L1 is expected to read and act on.

**Fix (representative for all six occurrences):**

`38-8021x-certificate-failure.md` line 35 — change:
```
(deployment order matters; see the [Certificate Delivery Ordering Constraint](../admin-setup-8021x/02-cert-delivery-foundation.md) for the full explanation — link-not-copy):
```
to:
```
(deployment order matters; see [Certificate Delivery Ordering Constraint](../admin-setup-8021x/02-cert-delivery-foundation.md) for the full explanation):
```

`38-8021x-certificate-failure.md` line 66 — change:
```
See [Windows 802.1X Admin Setup — Wired Service Dependency](../admin-setup-8021x/03-windows.md) for the service dependency check (read-only link; do not reproduce the check or the WARNING block inline).
```
to:
```
See [Windows 802.1X Admin Setup — Wired Service Dependency](../admin-setup-8021x/03-windows.md) to confirm whether the Wired AutoConfig service is running.
```

Apply the same pattern to the remaining four occurrences in runbooks #39, #40, and #41: strip the parenthetical authoring directives and replace with a brief description of what the link provides to the reader.

---

### WR-02: macOS MEDIUM-confidence callout is missing from all four runbooks

**Files:**
- `docs/l1-runbooks/38-8021x-certificate-failure.md:55`
- `docs/l1-runbooks/39-8021x-radius-reject.md:66`
- `docs/l1-runbooks/40-8021x-server-trust-failure.md:65`
- `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md:75`

**Issue:** RESEARCH.md Open Question 1 was resolved with an explicit instruction: "Plan 107-01/107-02 pin the exact predicate `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` with the `--last 2h` fallback and **a MEDIUM-confidence callout**; flagged for independent Phase-108 re-verification when authoring L2 #31." The `--last 2h` fallback is present in all four runbooks. The MEDIUM-confidence callout is absent from all four.

The confidence callout serves two purposes: (a) it tells the L1 tech that if the command returns no output at all (not just an empty time window), there may be a predicate-name issue rather than an absence of events, and (b) it is the handoff signal for Phase 108's independent re-verification task when authoring L2 #31. Without the callout, Phase 108 has no marker to find and re-verify the command.

**Fix:** In each runbook, add a NOTE callout immediately after the macOS `log show` row (or as a note below the per-platform table), for example:

```markdown
> **NOTE (macOS):** The `com.apple.eapol` subsystem predicate is verified from community
> sources (Jamf technical community; multiple independent web references) rather than from
> official Apple developer documentation. Confidence: MEDIUM. If the command returns no
> output even after extending to `--last 2h`, try the process-name fallback:
> `log show --predicate 'process == "eapolclient"' --info --last 2h`. This predicate will
> be independently re-verified in Phase 108 when authoring L2 #31.
```

This callout should appear consistently in all four runbooks' macOS Per-Platform Escalation Notes sections.

---

## Info

### IN-01: Decision tree "How to Use" section exposes planning-phase decision codes to L1 readers

**File:** `docs/decision-trees/10-8021x-triage.md:15-16`

**Issue:** Lines 15-16 read:

> "All terminal nodes are within 2 decision steps of the root (well under the 5-node budget). Per Phase 107 D-03, this tree uses a flat symptom-primary shape — per-platform diagnostic leaves live inside the runbooks, not this tree, so the tree stays compact. This tree is a Phase-107 deliverable per D-04."

The references to "Phase 107 D-03," "5-node budget," and "Phase-107 deliverable per D-04" are planning-context notes appropriate in CONTEXT.md/RESEARCH.md but not in the published tree an L1 technician will use. The sibling tree `09-linux-triage.md` contains similar notes (it references "Phase 51 D-01 + PITFALL-1 mitigation") which is a pre-existing pattern, but that does not make it correct here.

**Fix:** Remove or move the planning-decision references. The sentence about 2-decision-step depth is useful orientation for L1 users; keep it without the D-03/D-04 attribution. Suggested replacement:

```markdown
Start here when a user reports an 802.1X Wi-Fi or wired network authentication failure on
any platform. Identify the failure symptom, then follow the matching branch to the correct
L1 runbook. All terminal nodes are within 2 decision steps of the root. Per-platform
diagnostic detail lives inside each runbook, keeping this tree compact.
```

---

### IN-02: Link text in runbook #38 does not match the target section heading

**File:** `docs/l1-runbooks/38-8021x-certificate-failure.md:35`

**Issue:** The link text reads "Certificate Delivery Ordering Constraint" but the target section in `02-cert-delivery-foundation.md` is titled `## The Deployment Ordering Rule`. The link resolves correctly (it targets the file root, not a named anchor), so nothing is broken, but a reader who clicks through and searches the destination page for "Certificate Delivery Ordering Constraint" will not find that heading.

**Fix:** Align the link text with the destination section title:

```markdown
see the [Deployment Ordering Rule](../admin-setup-8021x/02-cert-delivery-foundation.md#the-deployment-ordering-rule) for the full explanation
```

Verify that the anchor `#the-deployment-ordering-rule` resolves against the current heading `## The Deployment Ordering Rule` (GitHub auto-slug: lowercase + hyphens = `the-deployment-ordering-rule`). If the anchor is unreliable, use the file root link (no anchor) with the corrected link text "Deployment Ordering Rule".

---

## Technical Accuracy Pass (No Findings)

The following were explicitly verified against RESEARCH.md and found correct in all five files:

- **Windows wired channel:** All four runbooks use `Microsoft-Windows-Wired-AutoConfig/Operational` — the RESEARCH-corrected string. No file uses the erroneous "Dot3Svc/Operational" pitfall.
- **Windows Wi-Fi channel:** `Microsoft-Windows-WLAN-AutoConfig/Operational` — correct in all four runbooks.
- **macOS predicate:** `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` with `--last 2h` fallback — present in all four runbooks.
- **iOS depth rule:** Portal-only inspection, no device command — consistently applied.
- **Android depth rule:** `adb logcat -s "wpa_supplicant"` named as escalation-collected; L1 does not run it — consistently applied in all four runbooks.
- **Linux command:** `journalctl -u NetworkManager` with `journalctl -u wpa_supplicant` supplement — present in all four runbooks.
- **D-07 routing map:** All four runbooks route correctly — #38→#32, #39→#33, #40→#33+#32, #41→#33, all via #31 as shared prerequisite.
- **No live L2 links:** All L2 references are prose-only with "(Live links wired in Phase 108.)" notation — D-06 rule followed.
- **Callout vocabulary:** NOTE is the only callout label used; no IMPORTANT, no DANGER, no CRITICAL, no WARNING — all within the allowed vocabulary.
- **90-day freshness:** `last_verified: 2026-06-30` + 90 days = `review_by: 2026-09-28` — correct in all five files.
- **Compound platform token:** `platform: windows+macos+ios+android+linux` in all five files.
- **`click` paths in decision tree:** All four click directives resolve to existing runbook files.
- **Decision tree node budget:** 1 root + 4 symptom branches + 1 escalation node = 6 total nodes; all terminal within 2 steps — within budget.
- **No `{#id}` anchor overrides** found in any file.
- **No edits to `00-index.md`** — D-08 navigation-last deferred correctly.

---

_Reviewed: 2026-06-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
