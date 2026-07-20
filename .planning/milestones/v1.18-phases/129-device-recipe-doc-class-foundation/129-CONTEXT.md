# Phase 129: Device Recipe Doc-Class Foundation - Context

**Gathered:** 2026-07-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 129 delivers the Device Recipe doc-class foundation — and ONLY the foundation:

1. **CLASS-01** — `docs/_standards/EEE-SOP-standard.md` gains (a) a slim D-02 edge-case ruling row classifying `docs/recipes/*` as `doc_type: Guide` (the closed 4-value enum is NOT extended), and (b) a new top-level **STD-05** policy section carrying the full written spec for the admin decision-point block format.
2. **CLASS-02** — a canonical `docs/_templates/recipe-template.md` exists: EEE-conformant (frontmatter → rendered header block → `## Summary`-first), C17-green, TEMPLATE-SENTINEL'd, with worked decision-point block examples.

Recipe content (Phases 130/131), registry rows / filename-map / nav wiring (Phase 132), and any validator work (Phases 133/134) are OUT of this phase. The one sanctioned out-of-corpus edit: a one-line factual correction to `.planning/research/ARCHITECTURE.md:61` (see D-14).

All 8 gray areas below were resolved via two full `/adversarial-review` rounds (Finder/Adversary/Referee, 4 parallel Finders per round) and each verdict was explicitly ratified by the user. These decisions are LOCKED — do not re-litigate.

</domain>

<decisions>
## Implementation Decisions

### Decision-point block format (CLASS-01 dominant gray area — adversarial-review round 1)
- **D-01 (LOCKED):** Composite three-case block. Invariant: every decision point opens with a **one-sentence** `> **Ask the admin:**` blockquote lead-in carrying the prompt ONLY — options and consequences NEVER go in the blockquote (C17 #12 caps contiguous top-level blockquote runs at 200 chars, markup counted; a faithful options+consequence blockquote measures ~228 chars and hard-fails). Then by case:
  - **Case 1 — branching decision** (each option is a fully-worked downstream path): lead-in + `| Option | When to choose | Consequence if wrong | Branch |` table, Branch cells linking to the branch sections.
  - **Case 2 — enumerable-value decision** (pick one of a fixed set, no procedure fork): lead-in + `| Option | When to choose | Recorded as |` table.
  - **Case 3 — free-value prompt** (open value, e.g. naming prefix): lead-in alone, NO table (a 1-row table tabulates nothing).
- **D-02 (LOCKED):** A **blank line between the lead-in blockquote and any table is MANDATORY** — GFM lazy continuation otherwise absorbs the pipe row into the blockquote (destroys the table AND inflates the #12 char count). The spec states this rule explicitly.
- **D-03 (LOCKED):** The spec states the explicit case-boundary rule (when a table is used vs. not) and frames the composite as a **documented combination of already-shipped corpus Patterns 2+3** (decision table + short blockquote callout), not a novel construct. Never a code fence for decision content in live recipes (STD-04 D-01 rationale / body-text-only indexing).

### Branch-encoding convention (adversarial-review round 1)
- **D-04 (LOCKED):** "C-plus" — a **thin NORMATIVE floor of exactly 3 rules** plus a RECOMMENDED idiom:
  1. Decision blocks use the D-01 composite shape; never code fences for decision content.
  2. Branch bodies are prose step sequences — not tables-as-procedure, not fenced pseudo-config.
  3. Branch headings live at H2/H3 only, never deeper; **boolean decisions (e.g. Shared iPad guest-sessions on/off) may skip branch headings entirely** via an if/then prose pair.
- **D-05 (LOCKED):** The branch idiom is labeled **RECOMMENDED** (not normative): the PSSO walkthrough shape — shared provisioning spine → decision block → sibling H3 branch sections (`### Branch A — …` / `### Branch B — …`), bold pseudo-headings inside branches, plain routing sentence. **The spec must NOT mandate a rejoin point** — non-converging forks are explicitly permitted (AVD-02's kiosk/SharedPC fork does not reconverge; `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md:65` precedent: "no reconvergence"). MUST/NORMATIVE language is reserved exclusively for the 3-rule floor.

### Template skeleton (adversarial-review round 1)
- **D-06 (LOCKED):** Hybrid — `docs/_templates/admin-template.md` is the base skeleton; ALL recipe-specific additions are **placement-locked AFTER `## Summary`** (C17 #4 fires on templates — TEMPLATE-SENTINEL skips ONLY #9 and #12; nothing may precede the Summary H2). Ordered skeleton: frontmatter (TEMPLATE-SENTINEL `last_verified: 1970-01-01`; generic `applies_to: [FILL-IN]`, not the APv1|APv2 pipe-list) → EEE header block → H1 → `## Summary` → post-Summary `> **Scope:**` blockquote (replaces admin-template's APv1/APv2 `> **Version gate:**`; ≤200 chars) → `## Prerequisites` → `## Unsupported and Anti-Feature Callouts` (`| Feature | Why it's unsupported / what breaks | Do this instead |` — hard-required container for AVD-03/IPAD-02) → `## Steps` with `### Step N: [action]` + per-step `> **What breaks if misconfigured:**` callouts → `## Verification` → `## Configuration-Caused Failures` → `## See Also`.
- **D-07 (LOCKED):** The **Decision Record ledger section is CUT** — it duplicates the per-step decision blocks and creates hand-sync drift for zero hard-required value. The "what you'll end up with" outcome statement is folded into `## Summary` prose (see D-13), not a separate section.
- **D-08 (LOCKED, round 2):** The template carries **THREE worked decision-point examples** — branching FIRST, then enumerable, then free-value as a one-line closer ("no table needed") — consolidated in **ONE HTML-comment-wrapped, delete-marked region** immediately after the `## Summary` placeholder area. Inside the region use `###`/bold labels only, NEVER `## ` (HTML comments are NOT inCodeFence-masked; a `## ` line would break C17 #4's Summary-first-H2). Every example lead-in is one sentence ≤200 chars so copied examples survive #12 in real recipes. The **enumerable example must be synthetic/non-colliding** — NOT `DeletionPolicy` or any field named in AVD-01..05/IPAD-01..04 (verify against ROADMAP Phase 130/131 field lists before choosing); flag it as illustrative inside the region.

### Spec placement & enforcement (adversarial-review rounds 1+2)
- **D-09 (LOCKED):** Placement = new top-level **STD-05** section in `docs/_standards/EEE-SOP-standard.md` (mirroring how STD-04 was added in v1.16) + a **slim one-line D-02 edge-case ruling row** (`docs/recipes/*` → `Guide`, directory-precedence, referencing STD-05). Do NOT fold the multi-paragraph spec into the D-02 bullet area.
- **D-10 (LOCKED):** Enforcement = **prose/template-only. NO new C17 assertion.** `scripts/validation/c17-eee-contract.mjs` is ONE shared live script subprocess-spawned by the v1.15/v1.16/v1.17 milestone audits — any assertion change retroactively mutates every predecessor audit and violates HARN-12's byte-unchanged predecessor-surface invariant. The only hard mechanical constraint (200-char blockquote) is already enforced by existing #12. This matches the accepted STD-04 D-04 posture (content-completeness is a human review obligation).
- **D-11 (LOCKED, round 2):** STD-05 content split: STD-05 carries the **full spec** (3-case rule + case-boundary rule + 3-rule branch floor + RECOMMENDED idiom description) **plus ONE compact FENCED worked branching mini-example** (D-05 house-style precedent: the standard specs unfenced live content via fenced samples; the inCodeFence mask makes fenced samples immune to #11/#12 on the enrolled, non-sentinel standard). Include the **one-line carve-out sentence**: a fenced spec sample in this index-excluded standard is NOT the same as fenced decision content in a live indexed recipe (which remains banned). The template carries the instantiated, unfenced copies (D-08).
- **D-12 (LOCKED):** Editing the Approved standard follows the STD-04 precedent: add a Version-History row (dated, naming STD-05 + the D-02 ruling row); do **NOT** bump the standard's `last_verified` frontmatter.

### Summary end-state element (adversarial-review round 2 — referee overturned finder)
- **D-13 (LOCKED):** The recipe Summary end-state element is **REQUIRED-review-enforced (D-08 style)**: STD-05 carries a normative sentence — every recipe's `## Summary` OPENS with a one-line concrete end-state statement — phrased per the standard's established pattern: "REQUIRED; enforced by registry review, not by the harness." The template's `## Summary` placeholder opens with: "Following this recipe yields [a concrete, named end-state], provisioned end-to-end from zero through Intune." The placeholder must keep total Summary ≥30 words — **C17 #5 fires on templates** (only #9/#12 are sentinel-skipped). Rationale: post-D-07 ledger cut, this sentence is the only surface stating what the recipe produces (the class-defining trait), and recipes uniquely have a policy home (STD-05) for the rule.

### recipes/ index doc (adversarial-review round 2)
- **D-14 (LOCKED):** **NO `docs/recipes/00-overview.md` index doc** — not in Phase 129 (scope creep + navigation-last violation), and no registered index at all at N=2. `docs/end-user-guides/` (2 registered Guides, no index) is the verified same-N precedent; `docs/index.md` (itself registered, RE-219) carries the recipes section into the indexed set at Phase 132. Recorded guidance for Phase 132+: if a landing page is ever wanted as the class grows, add an **UNREGISTERED** `00-overview.md` (zero registry rows — the `device-operations/`/`operations/` precedent), never a registered RE-NNN index at this scale.
- **D-15 (LOCKED):** Fix `.planning/research/ARCHITECTURE.md:61` **at source** before/during planning: the claim "every doc-class directory has an 00-* index" is FALSE (counterexamples: `end-user-guides/` has none; `device-operations/00-overview.md`, `operations/00-index.md` + 4 subdir overviews, `cross-platform/apple-business/00-overview.md` exist unregistered). One-line correction so the planner doesn't over-build a registered RE-224.

### Claude's Discretion
- Exact prose wording of STD-05 subsections, the D-02 ruling-row sentence, and the Version-History row text (within D-09..D-12 constraints).
- The synthetic enumerable example's subject (within D-08's non-collision constraint) and the branching example's subject in STD-05's fenced sample vs. the template's instantiated one (keep them different granularities: compact spec-sample vs. instantiated scaffold).
- STD-05 internal subsection numbering/naming (a suggested outline exists in the round-2 Area-C finder report; treat as reference, not mandate).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The standard & gate (the surfaces this phase edits/must stay green against)
- `docs/_standards/EEE-SOP-standard.md` — STD-001, single source of truth: frontmatter schema, D-05 visible-header-block spec (the fenced-sample house style D-11 mirrors), Doc Type Taxonomy + D-02 edge-case rulings (where the slim ruling row lands), D-08 "enforced by registry review, not by the harness" precedent (D-13's phrasing model), STD-04 section (the v1.16 precedent STD-05 mirrors, including Version-History handling), C17 needle-spec table.
- `scripts/validation/c17-eee-contract.mjs` — live C17 implementation (13 assertions). Load-bearing mechanics verified during discussion: #4 Summary-first-H2 fires on templates; #5 ≥30-word Summary fires on templates; TEMPLATE-SENTINEL (`last_verified: 1970-01-01`) skips ONLY #9 and #12; #12 measures each contiguous top-level `>`-run ≤200 chars (markup counted, blank line starts a new run); inCodeFence mask exempts fenced content from #11/#12; enrollment is opt-in by `doc_id` presence. **DO NOT EDIT THIS FILE** (D-10).
- `docs/_templates/admin-template.md` — the base skeleton D-06 inherits (Prerequisites → Step N → What-breaks callouts → Verification → Configuration-Caused Failures → See Also) and the TEMPLATE-SENTINEL convention.

### Corpus exemplars (the shipped patterns the spec ratifies)
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — closest live recipe analog: the RECOMMENDED branch idiom source (decision lead-in + path table + sibling branch sections, non-converging terminals at line ~65).
- `docs/l2-runbooks/26-apple-business-permission-denied.md` — live decision-table exemplar (Pattern 2).
- `docs/admin-setup-apv1/04-dynamic-groups.md` — live single-sentence blockquote-callout exemplar (Pattern 3).

### Planning inputs
- `.planning/research/ARCHITECTURE.md` — grounded option space, structure rationale, build order, anti-patterns. **Carries one known factual error at line 61** (D-15: correct at source).
- `.planning/REQUIREMENTS.md` — CLASS-01/CLASS-02 (this phase); AVD-01..05 / IPAD-01..04 (the consumers whose decision points the format must carry: kiosk-vs-SharedPC branching, guest-sessions boolean, QuotaSize values, naming prefixes).
- `.planning/ROADMAP.md` — Phase 129 success criteria (esp. SC3: "documented precisely enough that Phases 130/131 apply it without further design decisions").

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `admin-template.md` skeleton + `> **What breaks if misconfigured:**` per-step callout idiom + `## Configuration-Caused Failures` link-not-copy routing — inherited wholesale by D-06.
- D1 platform map already contains both recipes' platforms: `Windows` and `ios+shared-ipad → iOS + Shared iPad` — zero D1-map changes, zero C17 #10 risk.
- C17 self-test (`node scripts/validation/c17-eee-contract.mjs --self-test`) + full-corpus run (`--verbose`) — the verification harness for CLASS-02's C17-green criterion; must exit 0 with the new template present.

### Established Patterns
- Registry → filename-map → publish pipeline is data-driven off `docs/_registry/RE-index.md`; a new doc class integrates via registry rows only — **zero pipeline code changes** (Phase 132's concern, but constrains this phase to not invent any pipeline hooks).
- Templates are structurally checked but value-exempt (sentinel) — the worked examples are the ONLY thing teaching the composite shape mechanically unenforced by C17; that is why D-08 makes them load-bearing.
- Frozen-surface doctrine: predecessor harness/sidecar surfaces byte-unchanged (D-00a); C17 shared-script edit is the specific trap D-10 closes.

### Integration Points
- `EEE-SOP-standard.md` ↔ `recipe-template.md`: template cites the new D-02 ruling + STD-05; standard's fenced sample ↔ template's instantiated examples are deliberate two-tier copies (D-05-precedented).
- Phase 130/131 recipes will instantiate the template; Phase 132 wires `docs/index.md` only (recipes are provisioning Guides — `common-issues.md`/`quick-ref-*` are NOT wired).

</code_context>

<specifics>
## Specific Ideas

- Worked branching example shape (from the review, illustrative): `> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)? This choice selects the branch for every step below.` + blank line + the 4-column branching table with Branch cells linking `[Step 5a](#...)` / `[Step 5b](#...)`.
- Template Summary opener placeholder: "Following this recipe yields [a concrete, named end-state — e.g., a self-deploying Entra-joined shared Windows AVD-client device], provisioned end-to-end from zero through Intune."
- The round-2 Area-C finder report sketched a full STD-05 outline (intro + when-required + three-case spec + branch floor + C17 guardrails + fenced worked example) — usable as a starting shape at executor discretion.

</specifics>

<deferred>
## Deferred Ideas

- **Unregistered `docs/recipes/00-overview.md` landing page** — only if the class grows past ~4-5 recipes; unregistered (zero registry rows) per the `device-operations/` precedent; Phase 132+ at the earliest, never Phase 129 (D-14).
- **Optional back-reference-only Decision Record index** (decision name → link to the in-line block, no restated values) — the drift-free variant if a consolidated decision view is ever wanted; cut for now (D-07).
- **C17 assertion #14 (mechanical decision-block validation)** — rejected for v1.18 (D-10); reserve as a future harness-phase item only if recipe drift is observed in practice.

</deferred>

---

*Phase: 129-Device Recipe Doc-Class Foundation*
*Context gathered: 2026-07-17*
