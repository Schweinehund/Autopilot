# Phase 146 — External API Coverage Declaration

No external API integration: this phase edits markdown prose and one requirements-table row; Microsoft Learn URLs appear only as citations.

**Reasoning.** Phase 146's deliverables are (a) one new operations guide at
`docs/operations/patch-management/06-windows-driver-firmware-updates.md`, (b) a stub-and-move
excision plus two in-place repairs in `docs/operations/patch-management/01-windows-wufb-rings.md`,
(c) three routing edits in `docs/operations/patch-management/00-overview.md`, and (d) a single
corrected table row at `.planning/REQUIREMENTS.md:128`. Nothing in the phase issues a network request
at build, test or run time. The roughly thirty `https://learn.microsoft.com/...` URLs that appear in
the diff are **markdown link targets inside `**Source:**` evidence lines and `## External
References` bullets** (D-53, 145 D-01/D-02) — prose citations a human reader clicks, not endpoints
any code in this repository calls. There is no client, no SDK, no auth flow, no request/response
contract and therefore no surface for a coverage matrix to cover.

The eight Microsoft Learn pages recorded in `146-RESEARCH.md` §1 were fetched **by the researcher, at
research time**, to obtain verbatim quotes. That fetch is a one-off authoring activity already
completed and recorded; it is not an integration this phase ships. The same is true of the
verification-time re-fetch D-53 mandates — the verifier re-fetches the named pages and diffs the
quoted strings, which is a human-directed correctness check, not a runtime dependency of any
artifact this phase produces.

**Confirmed by measurement at plan time:** `scripts/validation/` and `scripts/pipeline/` contain no
HTTP client and this phase adds none — the phase modifies no script at all, and its seven named gates
(`check-phase-144`, `check-phase-54`, `v1.20-milestone-audit`, `c17-eee-contract`,
`check-nav-hub-links`, `build-filename-map --self-test`, `build-publish-bundle --self-test`) all read
the local filesystem only. `check-nav-hub-links.mjs:242`'s `resolveLinkTarget` returns **null** for
`http(s)` targets, so not even the corpus link checker makes a network call. `146-RESEARCH.md`
records "there are **no external packages** in this phase", so the Package Legitimacy Audit is
likewise not applicable and no package-manager install task exists in any plan.
