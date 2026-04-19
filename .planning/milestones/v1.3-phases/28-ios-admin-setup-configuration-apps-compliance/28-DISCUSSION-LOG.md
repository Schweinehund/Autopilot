# Phase 28: iOS Admin Setup — Configuration, Apps, Compliance - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-16
**Phase:** 28-ios-admin-setup-configuration-apps-compliance
**Areas discussed:** Device restrictions coverage depth, App deployment structure, Compliance-to-CA timing gap, File numbering and cross-references
**Method:** Adversarial review (Finder/Adversary/Referee pattern) per user request

---

## Device Restrictions Coverage Depth

**Method:** 3-agent adversarial review (Finder → Adversary → Referee)

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: Mirror macOS depth | ~15-20 key settings with full treatment, category summary for rest | |
| Option B: Comprehensive coverage | Every supervised-only setting individually documented with full callouts | |
| Modified Option C: Category-based with supervision matrix | All supervised-only settings get one-liner 🔒 callouts + ~15 key settings detailed | ✓ |

**User's choice:** Modified Option C
**Adversarial findings:**
- Option A had CRITICAL surviving issue: SC #1 failure for omitted supervised-only settings
- Option B had CRITICAL surviving issue: maintainability burden (100+ entries, annual iOS changes)
- Option C had MEDIUM surviving issue (callout format conflict with D-03), resolved by using exact 🔒 blockquote format as one-liners instead of table column shorthand
**Notes:** Referee recommended the hybrid: one-liner callouts satisfy D-03 literally while keeping the guide maintainable. Two-tier pattern already established in 03-ade-enrollment-profile.md.

---

## App Deployment Structure

**Method:** 3-agent adversarial review (Finder → Adversary → Referee)

| Option | Description | Selected |
|--------|-------------|----------|
| Option A adapted: Mirror macOS table | Comparison table + per-type sections with Key Concepts intro | ✓ |
| Option B: Licensing-model-first | VPP concepts lead, then deployment methods | |
| Option C: Workflow-based | Organize by admin task | |

**User's choice:** Option A adapted
**Adversarial findings:**
- Options B and C both had CRITICAL surviving issues: break locked "mirror macOS structure" decision
- Option A had only 1 LOW surviving issue after adversary disproved 4 of 5 findings
- Adversary successfully argued VPP device/user ARE distinct deployment types in Intune, comparison table columns are valid
- Adversary successfully argued "managed vs unmanaged" maps naturally to deployment types
**Notes:** Adaptations: intro paragraph, "Key Concepts Before You Begin" for VPP licensing distinction, 4-column comparison table.

---

## Compliance-to-CA Timing Gap

**Method:** 3-agent adversarial review (Finder → Adversary → Referee)

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: Inline callout | Prominent "What breaks" style callout within compliance section | |
| Option B hybrid: Dedicated section | `## Compliance Evaluation Timing and Conditional Access` with key facts + cross-references | ✓ |
| Option C: Scenario walkthrough | "New Device Day 1" step-by-step timeline | |

**User's choice:** Option B hybrid
**Adversarial findings:**
- Option C had 2 CRITICAL surviving issues: timing values contradict existing reference docs (T+8h vs 15-30 min actual), two-path branching breaks linear walkthrough
- Option A had 3 MEDIUM surviving issues: no anchor for linking, format strains with content weight, macOS framing was incorrect
- Option B had lowest surviving issues; Adversary disproved "authority conflict" as implementation concern, not inherent flaw
- Finder discovered existing reference docs (compliance-timing.md, ca-enrollment-timing.md) that already cover timing comprehensively
**Notes:** Hybrid resolves duplication (reference docs stay canonical) while satisfying SC #4 "from the guide alone" with a linkable section.

---

## File Numbering and Cross-References

**Method:** 3-agent adversarial review (Finder → Adversary → Referee)

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: 04-06, update overview | Simple sequential, defer config-failures consolidation | ✓ |
| Option B: 04-07 with config-failures | Includes consolidation file now | |
| Option C: 04-06 with cross-ref matrix | Novel See Also pattern | |

**User's choice:** Option A
**Adversarial findings:**
- Adversary disproved Option A's top 2 findings: individual guides already have inline Config-Caused Failures tables (consolidation is convenience, not source of truth), macOS created consolidation AFTER all guides existed
- Option B's MEDIUM surviving issue: premature — runbook column would be all "Phase 30" placeholders
- Option C had 3 MEDIUM surviving issues: no precedent, asymmetric cross-refs, staleness
**Notes:** Path from A to B is cheap — consolidation can happen in Phase 30/32 when runbook links exist.

---

## Claude's Discretion

- Selection of ~15 key device restriction settings for full treatment
- Comparison table row attributes for app deployment
- Compliance settings depth beyond required OS version, jailbreak, passcode
- Exact word counts and Mermaid diagram styling

## Deferred Ideas

- Config-failures consolidation file (07-config-failures.md) — deferred to Phase 30/32
