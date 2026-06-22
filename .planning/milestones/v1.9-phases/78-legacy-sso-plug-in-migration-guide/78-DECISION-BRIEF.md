# Phase 78 — Gray-Area Decision Brief (for adversarial review)

**Deliverable:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` (NEW file) + atomic nav-wiring edits.
**Audience:** Intune admin managing a **mixed fleet** with existing Microsoft Enterprise SSO plug-in (SSO app extension) deployments.
**Requirements:** SSOMIG-01 (legacy plug-in explained + when-to-use-which decision matrix + product-name hierarchy), SSOMIG-02 (staged migration, Error 10002 avoidance, what breaks), SSOMIG-03 (mandatory rollback: destructive WPJ-key removal, CA-blocked window, compliance-script swap), SSOMIG-04 (Kerberos coexistence cross-reference note; deep-dive out of scope → PSSO-FUT-04).
**Success criteria:** ROADMAP §Phase 78 SC1–SC4.

## Locked constraints (do NOT re-litigate)
- **A3 hybrid skeleton** established in Phases 76/77: custom body + corpus tail (`## Configuration-Caused Failures` + `## See Also` + `| Date | Change | Author |` Version-History).
- **C13 BLOCKING broken-link gate** (frozen v1.8 harness, `scripts/validation/v1.8-milestone-audit.mjs`, 15-entry allowlist; v1.9 harness does not exist until Phase 82). Any internal link must land atomically with its target → so any code-span→live-link conversion of an EXISTING file must be in the guide-09 commit.
- **Anchor stability (PITFALL-6)** binds EDITED files (00-overview, guide 08) at body level only — touch no existing headings. Guide 09 is new → no internal anchor constraint.
- **Duplication-with-cross-reference / link-not-copy** (76/77 D-03 pattern): state each fact once canonically; cross-reference from point-of-use; do NOT restate guide-08 auth-method detail.
- **Disambiguation is the #1 documentation risk** (SUMMARY:16, PITFALLS AXIS-3 lines 451–463): 4-term hierarchy — "Microsoft Enterprise SSO plug-in" (umbrella) vs "Platform SSO" (Settings Catalog) vs "SSO app extension" (Device Features legacy) vs "Kerberos SSO extension" (separate Apple-native).
- **Existing code-span refs to guide 09:** `00-overview.md:49` ("9. `09-...md` (added in a later documentation phase)") and `08-auth-methods-deep-dive.md:327` ("...`09-...md` (Phase 78 — not yet authored)").

---

## AREA A — Document structure & section ordering
- **A1 (RECOMMENDED candidate):** Pure A3 hybrid. Body order: **(1) Opening disambiguation table** (4-term hierarchy, SC1) → **(2) When-to-use-which decision matrix** → **(3) Staged migration sequence** (pilot→validate→unassign; Error 10002 warning) → **(4) "What breaks during migration"** → **(5) Mandatory rollback** → **(6) Kerberos coexistence note** → corpus tail (`## Configuration-Caused Failures` + `## See Also` + Version-History). Direct analog of 76/77 referee-blessed A3.
- **A2:** A3 hybrid but **rollback placed before/adjacent to the migration sequence** (safety-first framing — admin reads the escape hatch before acting).
- **A3:** Clone guide 07's `## Steps` task-flow skeleton (migration as numbered Steps). Risk: 09 is a reference/decision guide for mixed-fleet admins, not a single linear setup task; disambiguation + decision matrix have no home in a `## Steps` flow (same defect that got A1 rejected for guides 07/08).
- **A4:** Minimal — drop the corpus tail; just disambiguation + matrix + migration + rollback. Risk: breaks `06-config-failures.md` reverse-lookup-hub compatibility and corpus convention (the latent-orphan defect 77 flagged for its A2).

## AREA B — Decision matrix shape (SSOMIG-01)
- **B1:** Scenario-row matrix (rows = fleet scenarios: macOS 10.15–12 legacy-only · hybrid Entra-join fleet · on-prem AD/Kerberos need · modern cloud-managed; columns = recommended path: keep legacy / migrate to PSSO / coexist). Decision-first, mirrors mixed-fleet admin's actual question.
- **B2:** Capability-comparison matrix (rows = capabilities; columns = SSO app extension vs Platform SSO). Risk: heavy overlap/duplication with guide 08's four-dimension auth-method selection table → violates link-not-copy.
- **B3:** Two-column "keep legacy when… / migrate when…" prose decision list (no grid).
- **B4 (RECOMMENDED candidate):** B1 scenario-row matrix **scoped to the migrate/keep/coexist decision only**, with an explicit **link to guide 08** for auth-method selection (link-not-copy boundary stated inline). Keeps SSOMIG-01's "when-to-use-which" intent while preventing guide-08 duplication.

## AREA C — Rollback treatment (SSOMIG-03 / SC3 — highest stakes, MG-3)
- **C1 (RECOMMENDED candidate):** Dedicated `## Rollback` section with a **hard-bordered destructive-action callout** carrying all three elements (WPJ-key removal from Secure Enclave is destructive · CA-blocked-until-re-registered impact window · `security find-certificate` → `app-sso platform -s` compliance-script swap), AND surface the **compliance-script update as a pre-migration prerequisite callout up front** (before the migration steps) — because a stale Keychain-based compliance check produces false negatives the moment migration starts (VR-3/MG-2), not only at rollback.
- **C2:** Rollback as an end-of-doc subsection, plain callout only, compliance-script note kept inside the rollback section.
- **C3:** Rollback folded inline into the migration sequence as a final "if it fails" step.
- **C4:** Dedicated rollback section + callout, with the compliance-script swap as a numbered migration prerequisite step (not a separate up-front callout).

## AREA D — Nav wiring & Kerberos coexistence note (SSOMIG-04 / SC4)
- **D1 (RECOMMENDED candidate):** Atomically convert **both** existing code-spans to live links in the guide-09 commit — `00-overview.md:49` and `08-auth-methods-deep-dive.md:327` (C13 mechanism, body-level edits, no heading touches) — add reciprocal `## See Also` entries in guide 09 back to guides 07 and 08 and the glossary `#enterprise-sso-plug-in` anchor; surface Kerberos as a **dedicated short `### Kerberos SSO Extension (Coexistence)` subsection** stating it is a distinct Apple-native extension with separate Extension Identifiers, coexists with PSSO, and a full deep-dive is **out of v1.9 scope** with an explicit cross-reference to the deferred item (PSSO-FUT-04).
- **D2:** Convert only guide 08:327; leave `00-overview.md:49` as plain text (defer to Phase 81 nav-hub).
- **D3:** Kerberos as a one-line `## See Also` entry / inline callout rather than a dedicated subsection.
- **D4:** Convert both code-spans; Kerberos as a hard-bordered callout box (vs a normal subsection).
