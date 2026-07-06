# Phase 119 — Deferred Items (out-of-scope discoveries during execution)

Logged per the executor SCOPE BOUNDARY rule. These are NOT fixed in the plan that discovered them.

## DEFER-119-A — `regenerate-supervision-pins.mjs --self-test` is pre-existing RED (frozen-fixture vs live-corpus divergence)

**Discovered during:** Plan 119-02 (Atom 1), Task 3.

**Symptom:** `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits **1** on the current tree.

**Root cause (NOT Atom 1):** The `--self-test` classifier (`scanSupervisionOccurrences()`) scans the **live** Android corpus and compares its Tier-1 new-pin set against the **frozen** `scripts/validation/v1.7-audit-allowlist.json` fixture (immutable Phase-43/v1.7 historical baseline, per Pitfall 5). The Phase-116/117/118 EEE retrofit shifted supervision line coordinates (e.g. `03-fully-managed-cobo.md` 36→52/54, `20-android-app-install-investigation.md` 21→33, `android-capability-matrix.md` 89..99→123..135), so the live classifier now emits different line numbers than the frozen fixture. The divergence also includes **non-Phase-1** glossary lines (`_glossary-android.md` 17↔18, 50↔51, 70↔71, 196↔197) that shifted +1 back at **Phase 62** — proving the drift predates v1.15.

**Proof it is pre-existing (not introduced by Atom 1):** Extracting the corpus + script at the **v1.14 close SHA `7d922a7`** and running `--self-test` there **also exits 1**. The CI job that runs this helper is named **`pin-helper-advisory`** (advisory, not a hard gate). The Atom-1 edit to this file is a **purely additive** BASELINE_19 audit-trail comment (9 comment lines; `BASELINE_9` array and the four `v1.7-audit-allowlist.json` refs byte-unchanged) — it cannot affect the `--self-test` pass/fail logic.

**Why it is NOT fixable inside Atom 1 (SC1 locks the commit to exactly 3 files):**
- Editing the `v1.7-audit-allowlist.json` fixture is the **forbidden anti-pattern** (Pitfall 5 — it is intentionally frozen).
- Relaxing the classifier helper is explicitly forbidden ("do NOT relax the helper to silence the diff").
- Editing `BASELINE_9` cannot make it green: `BASELINE_9` is subtracted from **both** sides of the diff, so repointing the two shifted entries only swaps a false-positive for a false-negative (net still RED), and it does not touch the dominant non-Phase-1 glossary/matrix divergence. The plan acceptance criterion also mandates `BASELINE_9` stay unchanged.
- Making the classifier **frozen-aware** (read the corpus at the v1.7 close SHA via `readAtClose`) is a real code change to a predecessor helper — exactly the kind of edit the **D-119-3 pre-authorized remediation slot** exists for.

**Disposition:** DEFER to the **119-05 emergent chain-health remediation slot** (D-119-3). If the authoritative Axis-2 GHA apex comes back RED on this surface, remediate there under the D-119-3 constraints (predecessor validators only, no value-masking, `CHAIN_SKIP` stays ∅, honest record). It may alternatively be judged an accepted advisory-RED (as it was at the v1.14 close) and recorded as such in `v1.15-DEFERRED-CLEANUP.md`.

## DEFER-119-B — C15 residual FAIL in `v1.15-milestone-audit.mjs --verbose` (EEE `## Summary` Intune-admin↔Apple-Business collision)

**Discovered during:** Plan 119-02 (Atom 1), Task 2 (reconfirming the 119-01 diagnostic).

**Symptom:** `v1.15-milestone-audit.mjs --verbose` shows **15 PASS / 1 FAIL**; the lone FAIL is **C15** at `docs/admin-setup-ios/02-abm-token.md:19` (the Phase-117 EEE `## Summary` block prose "…Apple Business Manager (ABM) … Intune admin…" trips regex #8 `/\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|…)/i`). Same latent pattern exists at `04-configuration-profiles.md:19` and `06-compliance-policy.md:19` (outside the current C15 `appleBusinessDocPaths()` scope).

**Why it is NOT fixable inside Atom 1:** C15 has **no `{file,line}` sidecar mechanism** — its only exemption path is an inline `<!-- ABAUDIT-## -->` HTML comment in the doc body, or a reword of the Summary. Either fix edits a **Phase-1 docs surface** (`02-abm-token.md`), which is a **4th file** outside Atom-1's locked 3-file scope (SC1). Masking it in the sidecar is impossible and forbidden.

**Disposition:** DEFER to the **119-05 remediation slot**. Options (per 119-01 SUMMARY): (a) insert `<!-- ABAUDIT-## -->` immediately before the Summary line — permitted this milestone since Phase-1 surfaces are deliberately re-baselined; or (b) reword the Summary to break the Intune-admin↔Apple-Business proximity. Note `--self-test` (the Atom-1 harness acceptance gate) is unaffected — it runs the 9 synthetic C14/C15/C16 tests, which pass, and exits 0.
