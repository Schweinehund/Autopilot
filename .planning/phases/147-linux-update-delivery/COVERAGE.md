# Phase 147 — External API Coverage Declaration

No external API integration: this phase authors one Markdown guide, edits one Markdown hub and two planning artifacts; Microsoft Learn and Canonical URLs appear only as prose citations.

**Reasoning.** Phase 147's deliverables are (a) one new operations guide at
`docs/operations/patch-management/05-linux-update-delivery.md`, (b) eleven string-replace edit sites
in `docs/operations/patch-management/00-overview.md`, (c) three `**[OWNER-RULED IN SCOPE
2026-08-20]**` markers in `.planning/REQUIREMENTS.md`, and (d) one corrected citation in
`.planning/research/PITFALLS.md`. Nothing in the phase issues a network request at build, test or run
time. The `https://learn.microsoft.com/...`, `https://ubuntu.com/...` and
`https://documentation.ubuntu.com/...` URLs that appear in the diff are **markdown link targets
inside `**Source:**` evidence lines and `## External References` bullets** — prose citations a human
reader clicks, not endpoints any code in this repository calls. There is no client, no SDK, no auth
flow, no request/response contract and therefore no surface for a coverage matrix to cover.

The deterministic `api-coverage.cjs` scan over the Phase 147 ROADMAP section returned
`{"detected": false, "signals": []}`. This declaration exists because the seal-time re-run at
`verify:pre` widens its scope to include the PLAN.md bodies, which carry those same citation URLs —
the identical situation Phase 146 hit and answered the same way.

The nine external pages recorded in `147-RESEARCH.md` `## External Sources — Verified` were fetched
**by the researcher, at research time**, to obtain verbatim quotes: six as raw source bytes via
`gh api` against `canonical/ubuntu-server-documentation` or via `curl` plus tag-stripped extraction,
per CONTEXT D-07's guardrail that a summarizing fetcher is not trustworthy for a load-bearing quote.
That fetch is a one-off authoring activity already completed and recorded; it is not an integration
this phase ships. The same is true of the verification-time re-fetch D-20 mandates — the verifier
re-fetches the named pages and diffs the quoted strings, which is a human-directed correctness check,
not a runtime dependency of any artifact this phase produces.

**Confirmed by measurement at plan time:** `scripts/validation/` and `scripts/pipeline/` contain no
HTTP client and this phase adds none — the phase modifies no script at all, and its eight named gates
(`check-phase-144`, `check-phase-54`, `check-phase-50`, `v1.20-milestone-audit`, `c17-eee-contract`,
`check-nav-hub-links`, `build-filename-map --self-test`, `build-publish-bundle --self-test`) all read
the local filesystem only. `check-nav-hub-links.mjs`'s `resolveLinkTarget` returns **null** for
`http(s)` targets, so not even the corpus link checker makes a network call — which is precisely why
threat register rows `T-147-04` and `T-147-09` accept external-URL correctness as a human-verified
control rather than an automated one. `147-RESEARCH.md` records no external packages in this phase,
so the Package Legitimacy Audit is likewise not applicable and no package-manager install task exists
in either plan.
