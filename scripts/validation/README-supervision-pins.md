# regenerate-supervision-pins — Usage

Helper for maintaining `scripts/validation/v1.4-audit-allowlist.json` and `scripts/validation/v1.4.1-audit-allowlist.json` `supervision_exemptions[]` pins. Co-located with the v1.4/v1.4.1 audit harnesses and their sidecars per Phase 43 D-13.

## Why This Helper Exists

Phase 34 D-03 and Phase 42 D-12 established the writing rule that "supervision" is an iOS/iPadOS management-state concept. Android docs reference it only as cross-platform bridge prose (e.g., "Android's Fully Managed mode is the closest analog to iOS Supervision"). Bare `supervision` in an Android doc body that is NOT attributed to Apple is a content regression.

The v1.4 audit harness enforces this via `C2`: every `\bsupervis(ion|ed|ory)\b` occurrence in an Android-scoped doc must be exempted via an entry in the sidecar JSON's `supervision_exemptions[]` by `{file, line}`. As downstream phases (44 Knox, 45 per-OEM AOSP, 46 COPE) ship new content, they will add new bridge-prose references that need pin authoring.

This helper was introduced by Phase 43 (D-09..D-15) as a **seeded-template emitter** — NOT a full-auto regenerator and NOT a diff-reporter-only tool. Full-auto would violate the Phase 34 D-03 / Phase 42 D-12 writing rule by auto-pinning bare occurrences (which would mask real regressions). Diff-reporter-only would be equivalent labor to hand-editing, with no productivity gain.

The helper's two-tier discrimination (below) is the mechanism that lets it surface un-pinned occurrences to authors WITHOUT ever silently promoting a Tier-2 bare occurrence to a pin.

## Modes

Exactly one mode must be selected per invocation. All modes are file-reads-only on the Android doc corpus and the sidecar JSON; none of them write to the allow-list sidecars (see "Read-only invariant" below).

### `--report` (advisory)

Prints a one-screen summary of the pin ecosystem state:

```
=== supervision pin report ===
Pinned (in sidecar): N
Un-pinned Tier-1 (stub-eligible): M
Un-pinned Tier-2 (suspected regression): K
Stale pins (line now has no supervision hit): S
```

Followed by detail blocks for each category if counts are non-zero. Never writes. Always exits 0. Used by the CI `pin-helper-advisory` job (Phase 43 D-14/D-15) which posts the output as a PR comment without failing the build.

**When to run:** spot-check current pin state during content authoring.

### `--emit-stubs`

For each un-pinned Tier-1 occurrence, emits a JSON stub fragment to stdout:

```json
{"file": "docs/some-doc.md", "line": 42, "reason": "TODO: <first 80 chars of line>", "tier": 1, "context": "<line text, truncated>"}
```

The author fills in the `reason` field with a proper context citation (Phase 34 D-03 / Phase 42 D-12 / iOS-attributed / HTML-comment framing) and merges the entry into `supervision_exemptions[]`.

Un-pinned Tier-2 occurrences are appended (not overwritten — timestamp-separated block) to `scripts/validation/suspected-regressions.txt` as a side channel. They are **never** emitted to the stdout stubs. See "Why the Helper Never Auto-Pins" below.

**When to run:** after landing new Android content that references iOS Supervision.

### `--self-test`

Dogfood mode (Phase 43 D-12). The helper reads the current `scripts/validation/v1.4-audit-allowlist.json`, subtracts the pre-Phase-43 9-pin baseline (`BASELINE_9` hard-coded from commit `e5e45db`), and compares the remaining set against its own classifier's Tier-1 output (classifier Tier-1 minus baseline). Asserts:

1. Classifier Tier-1 NEW-pin set equals sidecar NEW-pin set (no false-negatives, no false-positives).
2. Classifier Tier-2 count equals 0 (Phase 43 hand-authored set covers all legitimate bridge prose).

Exits 0 on PASS, 1 on any divergence. Used as a CI gate to catch classifier regressions — if a future change to `classify()` starts mis-classifying Phase 43's hand-authored pins, the self-test fails before the helper's output becomes load-bearing for downstream phases.

**When to run:** after any edit to the classifier, the scope-filter, the HTML-comment state machine, or the Tier-1 regex.

## Two-Tier Discrimination (D-11)

- **Tier 1 (stub-eligible):** An occurrence qualifies as Tier 1 if **any** of the following hold:
  1. The occurrence line is inside an HTML-comment block (`<!-- ... -->`, possibly multi-line).
  2. The occurrence line OR the two preceding lines match `/\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b/i` (case-insensitive).
  3. The occurrence line contains a markdown anchor link to a `#supervision` anchor (e.g., `[Supervision](#supervision)` or `(_glossary-macos.md#supervision)`) — a navigational reference to the iOS-attributed disambiguation entry.
  4. The occurrence is inside an enclosing `## Alphabetical Index`, `## Version History`, or `## Changelog` H2 section — structurally navigational/historical references to the Phase 34 D-03 governance decision.

  Tier-1 occurrences are emitted as JSON stubs in `--emit-stubs` mode for **human reason-filling before merging into the sidecar**. The helper never fills the `reason` field with anything other than a `TODO: ...` placeholder.

- **Tier 2 (suspected regression):** Bare occurrences failing all four Tier 1 triggers above. Tier-2 occurrences are written to `scripts/validation/suspected-regressions.txt` for human review. **The human must explicitly promote a Tier-2 occurrence to a pin with written justification**, OR fix the underlying content regression. **The helper NEVER auto-pins Tier 2.**

Refinements (3) and (4) were added after Plan 43-04's self-test surfaced two legitimate Phase 43 hand-authored pins (`docs/_glossary-android.md:15` alphabetical-index entry, and `docs/_glossary-android.md:148` Version-History table row) that failed the strict D-11 (1)+(2) keyword test despite being structurally unambiguous bridge prose. Per D-11 "helper NEVER auto-pins Tier-2," the correct response was to tighten the classifier to recognize these structural patterns — not to relax the Tier-2 contract.

## Why the Helper Never Auto-Pins (D-11)

Auto-pinning bare (Tier-2) supervision occurrences masks real content regressions. In an Android Enterprise doc corpus where the Phase 34 D-03 writing rule forbids bare `supervision` as an Android management term, a silently-auto-pinned bare occurrence IS the regression — the pin hides it from `C2`.

A human-in-the-loop requirement for Tier-2 promotion ensures:

- The human author sees the occurrence and decides explicitly: "this is legitimate bridge prose I forgot to attribute" vs "this is a content bug that slipped through review."
- The written justification in the pin's `reason` field records the decision for future auditors.

The cost of occasional Tier-1 false-negatives (classifier missing a legitimate pin) is **far lower** than the cost of Tier-2 false-positives silently masking regressions over many commits. The self-test dogfood gate catches the former; there is no automated gate for the latter, which is why the Tier-2 never-auto-pin rule is absolute.

## Install-Time Invocation

From the repository root (Windows Git Bash, macOS, Linux):

```bash
node scripts/validation/regenerate-supervision-pins.mjs --report
node scripts/validation/regenerate-supervision-pins.mjs --emit-stubs
node scripts/validation/regenerate-supervision-pins.mjs --self-test
node scripts/validation/regenerate-supervision-pins.mjs --help
```

All modes are file-reads-only on the Android doc corpus; `--emit-stubs` is the only mode that writes (to `scripts/validation/suspected-regressions.txt` only, never to the allow-list sidecars).

## Read-Only Invariant

The helper NEVER writes to `scripts/validation/v1.4-audit-allowlist.json` or `scripts/validation/v1.4.1-audit-allowlist.json`. Verified by this protocol:

```bash
cp scripts/validation/v1.4-audit-allowlist.json /tmp/v14-before.json
cp scripts/validation/v1.4.1-audit-allowlist.json /tmp/v141-before.json
node scripts/validation/regenerate-supervision-pins.mjs --report > /dev/null
node scripts/validation/regenerate-supervision-pins.mjs --emit-stubs > /dev/null
node scripts/validation/regenerate-supervision-pins.mjs --self-test > /dev/null
diff scripts/validation/v1.4-audit-allowlist.json /tmp/v14-before.json   # must be empty
diff scripts/validation/v1.4.1-audit-allowlist.json /tmp/v141-before.json  # must be empty
```

Merging Tier-1 stubs into the sidecar is a manual, explicit JSON edit by the author.

## CI Integration

The CI workflow (`.github/workflows/audit-harness-integrity.yml`, added in Plan 43-08) includes a `pin-helper-advisory` job that runs `--report` and posts the output as a PR comment. The job uses `continue-on-error: true` per Phase 43 D-14/D-15 — it is advisory only and never fails the build. Hard CI blocking on pin drift is v1.5 backlog (see `43-CONTEXT.md` Deferred Ideas).

## Relation to `v1.4.1-audit-allowlist.json`

Both sidecars (v1.4 frozen at commit `3c3a140` reproducibility anchor, and v1.4.1 active) carry the same 18-pin `supervision_exemptions[]` baseline from Phase 43. The helper reads v1.4 sidecar as the authoritative source-of-truth for `--self-test` (dogfooding Phase 43's hand-authored set). Phases 44/45/46 add Knox/AOSP/COPE-specific pins to `v1.4.1-audit-allowlist.json` only; the v1.4 sidecar stays frozen.

## File-Reads-Only Contract (Pattern A from Phase 43 PATTERNS.md)

The helper imports only from `node:fs`, `node:path`, and `node:process`. It has:

- Zero `child_process` imports.
- Zero dynamic code-execution primitives (no `eval`, no dynamic `Function`, no dynamic `require`).
- Zero network I/O.
- Zero user-input path flow (all paths constructed via `join(process.cwd(), relPath)` with hard-coded `relPath` values from the harness scope).

This contract mirrors Phase 42 D-25's no-shared-module harness contract; Phase 42 D-25's rationale applies equally here (auditability, reproducibility across milestones, no supply-chain surface).
