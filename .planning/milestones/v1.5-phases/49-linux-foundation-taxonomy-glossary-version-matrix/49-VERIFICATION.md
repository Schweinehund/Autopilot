---
phase: 49-linux-foundation-taxonomy-glossary-version-matrix
status: verified
verified_date: 2026-04-26
verifier: gsd-executor (Phase 49 commit-2 post-execution)
---

# Phase 49 Verification

This document is the gate Phase 50 plan author reads BEFORE beginning Phase 50 (admin-setup-linux). It captures the literal content of the 3 Phase 49 deliverables in their post-commit state and summarizes the DPO-01 through DPO-05 downstream-phase obligations for the Phase 50 plan author.

## Whitelist H2 Literal Dump

Source: `docs/linux-lifecycle/00-enrollment-overview.md` `## Supported Management Surface` H2

## Supported Management Surface

The following table is the canonical Linux capability whitelist. Status cells use a closed 3-string set: **Supported**, **Partial**, or **Not supported**. Cells that warrant additional locked phrasing carry the qualifier inline (e.g., the Conditional Access row reads `Not supported — web-app CA only` per the PITFALL-2 architectural callout requirement).

| Capability | Linux Status |
|---|---|
| Device enrollment (user-initiated via `intune-portal`) | Supported |
| Compliance policies (4 settings-catalog categories) | Partial |
| Conditional Access — device-level | Not supported — web-app CA only |
| App delivery — Bash custom scripts | Supported |
| App delivery — binary packages (deb / snap / Win32 analog) | Not supported |
| Configuration profiles (settings catalog beyond compliance) | Not supported |
| Declarative Device Management (DDM) | Not supported |
| Zero-touch enrollment (Autopilot / ADE / ZTE analog) | Not supported |
| Hybrid Entra Join | Not supported |
| Certificate profiles (SCEP / PKCS) | Not supported |
| Per-app VPN | Not supported |
| OS update enforcement (DDM / WUfB analog) | Not supported |
| Hardware attestation (TPM / DeviceCheck analog) | Not supported |

**Status string contract:** This 3-status set (`Supported` / `Partial` / `Not supported`) is the canonical contract inherited by `docs/reference/linux-capability-matrix.md` (Phase 50 LIN-13). No additional status strings may be introduced downstream — `check-phase-49.mjs` enforces the closed set per CDI-01.

## Version Matrix Literal Dump

Source: `docs/linux-lifecycle/01-linux-prerequisites.md` `## Supported Ubuntu Versions` H2

## Supported Ubuntu Versions

The following matrix locks Ubuntu LTS support scope for Microsoft Intune Linux device management. Three rows are tracked: the two currently-supported versions (22.04 LTS / 24.04 LTS) and the dropped version (20.04 LTS) retained for visibility because admins searching the matrix for "20.04" need to find an explicit dropped-status row, not silence.

| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |
|---|---|---|---|---|
| Ubuntu 24.04 LTS (Noble) | 6.8 [verify-on-current-Ubuntu] | 6.11+ [verify-on-current-Ubuntu] | Supported — x86_64 only | April 2029 (standard) |
| Ubuntu 22.04 LTS (Jammy) | 5.15 [verify-on-current-Ubuntu] | 6.8 [verify-on-current-Ubuntu] | Supported — x86_64 only | April 2027 (standard) |
| Ubuntu 20.04 LTS (Focal) | 5.4 | 5.15 | Dropped — Intune 2508 [^1] | April 2025 (standard) |

[^1]: Ubuntu 20.04 LTS support was removed in the Intune 2508 service release (August 2025). Devices running Ubuntu 20.04 cannot enroll or maintain Intune enrollment. See [Ubuntu 20.04 — End-of-Support](#ubuntu-2004--end-of-support) below for the upgrade path.

**Source confidence:** Ubuntu version supportability HIGH (Microsoft Learn enroll-linux page, last verified 2026-04). GA / HWE kernel-version cells MEDIUM (Ubuntu wiki kernel-version inventory; specific intune-portal kernel minima are not explicitly documented by Microsoft). Cells marked `[verify-on-current-Ubuntu]` carry an inline freshness marker — re-validate on a current Ubuntu install at execution time.

**EOS Date column uses pinned-event labels** ("Intune 2508 — August 2025") rather than bare dates to prevent date-drift surface in admin reading. Bare dates ("August 2025") have lower information density than pinned-event references that name the Intune service release.

## Collision Audit Results

Source: `node scripts/validation/check-phase-49.mjs` V-49-19 PITFALL-5 collision audit

**Linux-native terms scanned (21 terms in topical categories — Distro & Lifecycle, Agent & Service, Compliance & Encryption, Operations & Diagnostics):**

The collision check asserts: for each Linux-native H3 term, if the term heading appears in any sibling glossary as an H3, the Linux glossary entry MUST carry a `> **Cross-platform note:**` blockquote within 5 lines. V-49-19 PASSED (exit 0) — all Linux-native terms either do not collide OR carry the required blockquote.

- APT repository — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- deb (package format) — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- dm-crypt — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for BitLocker/FileVault disambiguation)
- dpkg — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- GA kernel — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` per D-16 GA/HWE disambiguation pair)
- GNOME desktop — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- HWE kernel — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- Identity Broker — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for macOS/Windows/Android broker disambiguation)
- intune-agent.timer — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for cross-platform check-in cycle comparison)
- intune-portal (package) — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for Company Portal naming-convention disambiguation)
- journalctl — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for platform-specific log surface comparison)
- Linux compliance settings — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for cross-platform compliance-settings-breadth comparison)
- LUKS — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for BitLocker/FileVault key-storage disambiguation)
- microsoft-identity-broker — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- MS Edge for Linux — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- packages.microsoft.com — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- systemd — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- Ubuntu LTS — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- /var/log/dpkg.log — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- /var/log/intune-update.log — NO-COLLISION (term does not appear as H3 in any sibling glossary)
- Web-app CA — NO-COLLISION (term does not appear as H3 in any sibling glossary; carries `> **Cross-platform note:**` for device-level CA disambiguation across all 4 other platforms)

**Sibling glossaries scanned for collisions:**
- `docs/_glossary.md` (Windows Autopilot Glossary) — 38 H3 terms enumerated
- `docs/_glossary-macos.md` (Apple Provisioning Glossary) — 11 H3 terms enumerated
- `docs/_glossary-android.md` (Android Enterprise Provisioning Glossary) — 24 H3 terms enumerated

**Collision audit verdict:** PASS (V-49-19 returned exit 0; all collision-risk Linux-native terms carry a `> **Cross-platform note:**` blockquote within 5 lines of their H3).

## Reciprocal Append Verification

V-49-20, V-49-21, V-49-22 PASS confirmation — each glossary's top platform-coverage blockquote contains the literal reciprocal sentence `For Linux terminology, see [Linux Provisioning Glossary](_glossary-linux.md).`:

- `docs/_glossary.md` — V-49-20: PASS (sentence appended to top blockquote per task 49-05-01)
- `docs/_glossary-android.md` — V-49-21: PASS (sentence appended to line 12 blockquote per task 49-05-02)
- `docs/_glossary-macos.md` — V-49-22: PASS (sentence appended to line 10 blockquote per task 49-05-03)

## Atomic Commit Verification

- Commit-1: `docs(49): foundation gate - whitelist + matrix + glossary + validator (commit-1/2)` — commit hash: 6ff8e1c
- Commit-2: `docs(49): reciprocal Linux see-also appends + pin refresh (commit-2/2)` — commit hash: 513d07d

Both commits landed atomically per D-22 + D-27. Pin coordinate refresh: `regenerate-supervision-pins.mjs --report` confirmed no pin shifts after commit-2 edits (all 3 blockquote appends were within-existing-line; line counts preserved; `--self-test` exits 0 pre- and post-commit).

## Validator Run Output

Captured from `node scripts/validation/check-phase-49.mjs` (post-commit-2, no --skip-reciprocal flag). All 22 checks PASS:

```
[1/22] V-49-01: 00-enrollment-overview.md exists ................ PASS
[2/22] V-49-02: H2 ## Supported Management Surface .............. PASS
[3/22] V-49-03: H2 ## Out of Scope for Linux via Intune (peer to whitelist) PASS
[4/22] V-49-04: H2 ## For Admins Familiar with Windows / macOS / Android PASS
[5/22] V-49-05: H2 ## Enrollment Constraints .................... PASS
[6/22] V-49-06: H3 BYOD vs Corporate-Owned Caveat with Known caveat blockquote PASS
[7/22] V-49-07: Capability table 3-status closed set (D-02) ..... PASS
[8/22] V-49-08: CA row reads 'Not supported — web-app CA only' (PITFALL-2 line 48) PASS
[9/22] V-49-09: 01-linux-prerequisites.md matrix header literal match (D-07) PASS
[10/22] V-49-10: Matrix has exactly 3 distro rows (Ubuntu 20.04 / 22.04 / 24.04) PASS
[11/22] V-49-11: H3 ### Ubuntu 20.04 — End-of-Support (D-08) .... PASS
[12/22] V-49-12: H3 ### Non-version Breakpoints (D-09; Phase 50 LIN-05 anchor target) PASS
[13/22] V-49-13: _glossary-linux.md exists with 5 content category H2s (D-11) PASS
[14/22] V-49-14: H2 ## Alphabetical Index present ............... PASS
[15/22] V-49-15: At least 20 native term H3s in topical categories (D-14) PASS
[16/22] V-49-16: H2 ## Cross-Platform Collisions (CDI-02 pinned) PASS
[17/22] V-49-17: H2 ## Version History + at least 9 Linux note absent-concept callouts (D-13) PASS
[18/22] V-49-18: C10 frontmatter — platform: Linux + 60d last_verified/review_by on all 3 new docs PASS
[19/22] V-49-19: PITFALL-5 collision audit — Linux-native terms colliding with sibling glossaries carry Cross-platform note within 5 lines (D-21, D-23) PASS
[20/22] V-49-20: docs/_glossary.md contains reciprocal Linux glossary link PASS
[21/22] V-49-21: docs/_glossary-android.md contains reciprocal Linux glossary link PASS
[22/22] V-49-22: docs/_glossary-macos.md contains reciprocal Linux glossary link PASS

Summary: 22 passed, 0 failed, 0 skipped
```

## v1.5 Milestone Audit Output

Captured from `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (post-commit-2). C1-C10 blocking PASS + C11-C13 informational PASS or accepted-noise:

```
[1/12] C1: Zero SafetyNet as compliance mechanism ....... PASS
[2/12] C2: Zero supervision as Android mgmt term ........ PASS
[3/12] C3: AOSP stub word count within Phase 39 envelope PASS (informational -- Phase 39 self-certification; body 596 words vs envelope 600-900)
[4/12] C4: Zero Android links in deferred shared files .. PASS
[5/12] C5: last_verified frontmatter on all Android docs PASS
[6/12] C6: PITFALL-7 preservation in AOSP + per-OEM docs PASS
[7/12] C7: bare-"Knox" disambiguation check ............. PASS
[9/12] C9: COPE banned-phrase check ..................... PASS (informational)
[10/12] C10: Linux frontmatter (platform: Linux + 60d last_verified) PASS
[11/12] C11: Ops-domain anti-pattern regex .............. PASS (informational)
[12/12] C12: 4-platform comparison structural validation PASS (informational)
[13/12] C13: Broken-link automation (markdown-link-check) PASS (informational)

Summary: 12 passed, 0 failed, 0 skipped
```

## Downstream Phase Obligations (DPO-01 through DPO-05)

The following obligations propagate to downstream Phase 50-59 plan authors. Each obligation references a Phase 49 anchor that downstream content MUST consume rather than re-author.

### DPO-01 — Phase 50 LIN-05 back-link

Phase 50 LIN-05 (Identity Broker pitfall callout in `docs/admin-setup-linux/01-intune-linux-agent.md`) MUST back-link to:
`docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints` (Identity Broker H4 anchor)
Phase 49 owns the matrix-context anchor; Phase 50 owns the detailed `> ⚠️ Known admin pitfall` callout.

### DPO-02 — Phase 50 LIN-13 inherits 3-status canonical set

Phase 50 LIN-13 (`docs/reference/linux-capability-matrix.md`) MUST use the canonical 3-status string set: `Supported` / `Partial` / `Not supported`. NO 4th status string may be introduced. The Phase 49 validator V-49-07 enforces the closed set; Phase 50 plan author has no freedom to deviate.

### DPO-03 — Phase 50 admin-setup-linux/00-overview.md must NOT duplicate bridge subsection

Phase 50 `docs/admin-setup-linux/00-overview.md` MUST NOT duplicate the cross-platform bridge subsection from Phase 49 `docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android`. Phase 50 overview back-links to that anchor instead. Anti-Pattern 1 (single-canonical-doc) per Phase 34 D-26.

### DPO-04 — Phase 51-52 runbooks reference ~20 Linux-native glossary terms by anchor

Phase 51 (L1 runbooks 30-33) and Phase 52 (L2 runbooks 24-25) reference the Phase 49 ~20 Linux-native glossary terms via anchor (`_glossary-linux.md#term-anchor`). If a runbook needs an additional term not in the Phase 49 set, the runbook author APPENDS to `_glossary-linux.md` per the append-only contract — Phase 49 does not reserve term-coverage exclusivity.

### DPO-05 — Phase 59 CLEAN-08 builds on Phase 49 reciprocal appends

Phase 59 CLEAN-08 (5-platform glossary normalization across Windows + macOS + iOS + Android + Linux) builds on the Phase 49 commit-2 reciprocal appends already present in `docs/_glossary.md`, `docs/_glossary-android.md`, `docs/_glossary-macos.md`. Phase 59 plan author confirms these 3 reciprocal sentences are intact at v1.5 close and adds any additional cross-references identified during normalization.

## Phase 49 Closed

All 5 success criteria from ROADMAP §Phase 49 lines 168-173 satisfied. Both atomic commits landed per D-22 + D-27. Validator + harness exit 0. Phase 50 plan author may begin `/gsd-plan-phase 50`.
