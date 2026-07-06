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

## DEFER-119-C — Pandoc YAML-metadata alias trap on italic `*Previous:` / `*Next step:` nav footers (systemic conversion defect)

**Discovered during:** Plan 119-06 (PIPE-02 close representative-set conversion).

**Symptom:** Converting certain retrofitted `docs/` files through the locked pipeline (`scripts/pipeline/convert.ps1`, pandoc 3.7.0.2) fails with:

```
Error parsing YAML metadata at "<file>" (line NNN, column 1): Unknown alias `Previous`
pandoc conversion failed (exit 64)
```

**Root cause:** Pandoc's `markdown` reader enables the `yaml_metadata_block` extension, which treats **any** blank-line-preceded `---` … `---` fenced block *anywhere in the document* (not just at the top) as a YAML metadata block. The retrofitted nav-footer shape —

```
---
*Previous: [ABM/ADE Token](02-abm-token.md) | [Back to Overview](00-overview.md)*
---
```

— is parsed as YAML, where the leading `*Previous` / `*Next` is read as a YAML **alias reference** → `Unknown alias` → hard exit 64. Trigger = an italic nav line beginning `*Word` immediately inside a mid-document `---`…`---` pair. Files whose footer uses the plain EEE trailer (single trailing `---` before `## Version History`, no italic `*Previous/*Next` line — e.g. RE-129) convert cleanly.

**Blast radius (indicative):** All `docs/admin-setup-ios/*` guides tested (RE-107 / RE-108 / RE-109) fail; the `*Previous:` / `*Next step:` footer is present across the admin-setup guide class and likely other classes. Exact failing count requires a full corpus conversion sweep (not run this plan).

**Why NOT fixed here:**
- Editing the corpus footers = editing **frozen Phase-1 content docs** *after* the predecessor-byte-unchanged HARD gate already cleared in Plan 119-04, during a close where D-119-3 forbids frozen-surface edits.
- Editing the pandoc invocation (`--from=markdown-yaml_metadata_block`) = editing the **frozen PIPE-01 pipeline surface** (`convert.ps1`). Out of scope this plan.
- The PIPE-02 close pass only needs a *representative* clean-converting `.docx` set (SC5), assembled from clean-converting Approved docs — so this does not block 119-06.

**Recommended owner:** v1.16 (pipeline / descriptive-filename / structural pass — already the home of the PIPE-02 OQ1 citation-label rename work). Candidate fixes: (1) add `--from=markdown-yaml_metadata_block` to the canonical pandoc invocation so mid-document `---`…`---` blocks are thematic breaks, not YAML — **verify it does not regress the top-of-file frontmatter → Word custom-property promotion that OQ4 depends on** (test both); OR (2) normalize the retrofit nav-footer template to a non-alias-leading form (escape the leading `*`, or drop the enclosing `---` pair).

**Impact on 119-06 representative set:** the iOS admin-setup picks (RE-109 → RE-108) both hit this trap; the iOS platform leg was reassigned to RE-057 (`docs/l2-runbooks/15-ios-ade-token-profile.md`, iOS L2 runbook — converts + guards clean). No loss of platform/class coverage (admin-setup class stays represented by RE-129 Linux). See `PIPE-02-CLOSE-RUNBOOK.md` §1.
