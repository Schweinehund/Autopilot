# Phase 79 — Gray-Area Decision Brief (for adversarial review)

**Deliverables:** edit `docs/reference/macos-capability-matrix.md` (append `## Authentication`) + edit `docs/reference/4-platform-capability-comparison.md` (wire the macOS PSSO cell) + a committed pre-edit anchor inventory artifact.
**Requirement:** SSOREF-02. **Depends on:** Phases 77 (guide 08) + 78 (guide 09), both verified complete.
**Success criteria:** ROADMAP §Phase 79 SC1 (matrix Authentication section, specific rows) + SC2 (comparison cell, link-not-copy, pre-edit anchor inventory).

## Verified current state (do NOT re-derive)
- `macos-capability-matrix.md` is a **2-column `Feature | Windows | macOS`** doc with **prose** cells. Sections: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, Key Gaps Summary, See Also, then a Version-History table. **No `## Authentication` section exists.** This file is NOT subject to C12's link-not-copy rule (C12 binds only the comparison doc); cells may be prose.
- `4-platform-capability-comparison.md` is a **6-column `Feature | Windows | macOS | iOS | Android | Linux`** doc. Sections: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, See Also, Version-History. **No SSO/Authentication row or section exists** — SC2's "update the macOS Platform SSO cell from its current stub" is a misnomer; there is nothing to update, the cell must be ADDED.
- **No `windows-capability-matrix.md` exists**; the comparison's Windows column "sources from the linux matrix per architecture deferral" (See Also note).
- Sibling matrices (`ios/android/linux-capability-matrix.md`) have **no `## Authentication` H2** — no template to clone, and no `#authentication` anchor to link to.
- **No prior anchor-inventory artifact precedent** exists in `.planning/phases/`.

## Locked constraints (do NOT re-litigate)
- **C12 (BLOCKING)** on the comparison doc: all 5 platform names present; the 6 named H2s (`## Enrollment … ## Conditional Access`) must all remain present; **every non-empty data cell in a canonical 6-col table (cols 1–5) must contain a markdown hyperlink `[text](link)`** — EXCEPT cells equal to `—` (em-dash) or `N/A`, which are exempt. Adding a 7th H2 is allowed (C12 only checks the 6 are present).
- **C13 (BLOCKING)** broken-link gate (frozen v1.8 harness, 15-entry allowlist; v1.9 harness not until Phase 82). No broken internal links.
- **Anchor stability / append-only:** no existing heading renamed/removed; existing anchor slugs preserved. The pre-edit anchor inventory is the proof mechanism (SC2 hard prerequisite).
- **link-not-copy:** comparison cell links to the matrix `#authentication` anchor; matrix Authentication cells summarize and link to guides 08/09 as canonical source rather than duplicating guide-08 tables.
- **Milestone scope:** v1.9 is a macOS-authentication content milestone; Windows/iOS/Android/Linux SSO are NOT in scope to document this milestone.

---

## AREA A — macOS-matrix `## Authentication` table shape
SC1 dimensions: 3 auth methods (Secure Enclave key / Password sync / Smart card), hardware gate (T2 / Apple Silicon for SE), macOS version gate (14.0 floor), Entra licensing (no P1/P2 for PSSO), NUAL (macOS 14+), Passkey/FIDO2 (SE only), hybrid Entra join (NOT SUPPORTED).
- **A1 (RECOMMENDED):** One **row-per-dimension** in the existing `Feature | Windows | macOS` shape — rows: Auth methods · Hardware gate (Secure Enclave) · macOS version floor · Entra ID licensing · NUAL · Passkey/FIDO2 · Hybrid Entra join (NOT SUPPORTED). macOS cell = concise prose summary + link to guide 08/09; matches the matrix's uniform row-per-feature convention (Enrollment etc.).
- **A2:** One **row-per-auth-method** (Feature = Secure Enclave key / Password sync / Smart card) with the gates packed into the macOS prose cell. Fewer rows but collapses the discrete SC1 dimensions (hardware/version/NUAL/passkey/hybrid) that SC1 enumerates as distinct facts.
- **A3:** A **nested 4-col method-comparison sub-table** (method × passwordless/phishing-resistant/hardware/version) breaking the matrix's uniform 3-col shape. Diverges from corpus convention; risks C12-style structural expectations and duplicates guide 08's selection table.
- **A4:** **Hybrid** — a short method-selection sub-table PLUS dimension rows for cross-cutting gates. Richest but duplicates guide 08's four-dimension selection table (link-not-copy violation risk).

## AREA B — Windows-column treatment + section placement
The matrix is comparative (Windows | macOS) but SC1 specifies only macOS PSSO content.
- **B1:** Windows cells carry **concise Windows-equivalent facts** (Windows Hello for Business / Web Account Manager / Entra Windows SSO) per dimension, preserving the matrix's comparative value.
- **B2 (RECOMMENDED):** Windows cells = **scope-boundary marker** — a short "N/A for this milestone — Windows SSO is out of v1.9 scope (macOS-authentication milestone)" (stated once at section top, cells `—` or a brief note). Honors milestone scope discipline; avoids researching/asserting Windows-SSO facts that could be wrong and aren't in scope. The Conditional Access section already shows Windows cells can be terse.
- **B3:** Windows cells = a single spanning intro note + per-row `—`. Similar to B2 but drops per-row clarity.
- Placement sub-decision: **P1 (RECOMMENDED)** insert `## Authentication` **before `## See Also`** (group content H2s; See Also stays last; no anchor slug changes). **P2:** append at the very end after Version-History (unconventional — content below See Also/Version-History).

## AREA C — 5-platform comparison: add the macOS PSSO cell under C12 (BLOCKING)
- **C1 (RECOMMENDED):** Add a new **`## Single Sign-On` H2 section** (7th section; C12 allows additions) with one feature row "OS-integrated SSO (Platform SSO)": **macOS = `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`** (hyperlinked, satisfies link-not-copy + SC2 verbatim); Windows/iOS/Android/Linux = **`N/A`** (C12-exempt, honestly reflects no auth content documented for them this milestone). Adds one anchor (`#single-sign-on`); preserves all 6 named H2s.
- **C2:** Add the SSO row **inside the existing `## Conditional Access` section** (PSSO ties to device-based / phishing-resistant CA). Keeps to 6 H2s but conflates SSO with CA semantically and pollutes the CA feature table.
- **C3:** Add a **full all-5-platform Authentication row with every cell hyperlinked** — requires creating `#authentication`/SSO anchors in all 5 platform matrices (iOS/Android/Linux/Windows). Massive scope creep beyond SSOREF-02 and the macOS milestone; touches 4 out-of-scope matrices.
- **C4:** Literal-minimal — only the single macOS cell with the exact SC2 string, non-macOS `—`. Functionally equals C1's cell values but without deciding the containing section; underspecified (where does the cell live?).
- Non-macOS cell treatment (cross-cutting): use **`N/A`** (C12-exempt) for Windows/iOS/Android/Linux — there is no auth anchor to link to and no in-scope content; a hyperlinked cell would force out-of-scope anchors (C3).

## AREA D — Pre-edit anchor inventory artifact (SC2 hard prerequisite; no precedent)
- **D1 (RECOMMENDED):** A committed **`79-ANCHOR-INVENTORY.md`** in the phase dir, generated BEFORE any content edit, capturing the ordered H2 anchor-slug list of **both** reference files PLUS the inbound cross-links that target those anchors (e.g., comparison cells linking `macos-capability-matrix.md#conditional-access`). Generated deterministically (`grep '^## ' → slug`). Committed in its own commit before the content commit. Post-edit verification: the new anchor set is a **superset** (every pre-existing slug still present; only additions) — proving no C12/C13 anchor drift.
- **D2:** A lighter **inline checklist in the PLAN** (no separate artifact file). Under-delivers SC2, which explicitly says "a pre-edit anchor inventory **artifact is committed**".
- **D3:** A **JSON inventory consumed by a new `check-phase-79.mjs` validator**. Heavier; introduces a validator deliverable SSOREF-02 doesn't require (validators are Phase-82 harness scope).
- **D4:** D1's content but **scoped to the comparison doc's 6 H2 anchors + all 5-platform cell link targets** in addition to both files' H2 slugs (full cross-link graph) — maximal C12 guard, at more artifact bulk.
