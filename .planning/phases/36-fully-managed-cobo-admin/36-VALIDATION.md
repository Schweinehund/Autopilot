---
phase: 36
slug: fully-managed-cobo-admin
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-04-21
---

# Phase 36 — Validation Strategy

> Per-phase validation contract for documentation-phase content-quality audit. Phase 36 is a pure-docs phase (single markdown file deliverable), so validation dimensions are grep-based, cross-reference-integrity-based, and frontmatter-schema-based — NOT unit/integration test based. Matches AEAUDIT-04 milestone-audit pattern.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell-based content audits (grep, wc, git diff) — no test framework needed for docs phase |
| **Config file** | None required — audit commands are ad-hoc inline in PLAN.md tasks and this file |
| **Quick run command** | `grep -ciE "safetynet\|COPE deprecated\|deprecated COPE" docs/admin-setup-android/03-fully-managed-cobo.md` (must return 0 for each) |
| **Full suite command** | See Dimensions 1-8 below — run all grep / wc audits sequentially |
| **Estimated runtime** | ~5 seconds (all audits are grep/wc on one file) |

---

## Sampling Rate

- **After every task commit:** Dimensions 2, 3, 6, 8 (fast grep-based audits — forbidden terms, COPE wording, frontmatter, shared-file guard)
- **After every plan wave:** Full 8-dimension audit
- **Before `/gsd-verify-work`:** Full 8-dimension audit clean
- **Max feedback latency:** <10 seconds
- **Phase 42 milestone re-audit:** Dimensions 2 + 8 will be re-run by AEAUDIT-04 across all v1.4 Android docs

---

## Phase Requirements → Audit Map

| Req ID | Behavior | Audit Type | Automated Command | File Exists? | Status |
|--------|----------|-----------|-------------------|-------------|--------|
| AECOBO-01 | Doc covers 4 provisioning methods + enrollment profile + token + Entra join | content + grep | `grep -c -iE "^## " docs/admin-setup-android/03-fully-managed-cobo.md` ≥ 10 sections per D-11; `grep -iE "QR code\|NFC\|afw#setup\|Zero.Touch" docs/admin-setup-android/03-fully-managed-cobo.md` matches all four | ❌ W0 | ⬜ pending |
| AECOBO-02 | COPE migration section uses "Google recommends WPCO"; avoids "COPE deprecated" | grep | `grep -c "recommends WPCO" docs/admin-setup-android/03-fully-managed-cobo.md` = 1 (per D-04); `grep -ciE "COPE deprecated\|deprecated COPE" docs/admin-setup-android/03-fully-managed-cobo.md` = 0 | ❌ W0 | ⬜ pending |
| AECOBO-03 | Android 15 FRP callout + EFRP configuration steps | grep | `grep -iE "Android 15.*FRP\|EFRP\|Factory Reset Protection" docs/admin-setup-android/03-fully-managed-cobo.md` matches; `grep -iE "Enterprise.Factory.Reset.Protection" docs/admin-setup-android/03-fully-managed-cobo.md` matches | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Content-Quality Audit Dimensions (8 total)

Each dimension has an automated command and a concrete pass criterion. These are the full-suite audits run at wave-merge and `/gsd-verify-work`.

### Dimension 1 — Stable anchor presence (D-10)

- **Audit:** Grep for each of the 12 anchors reserved in D-10.
- **Command:** `for anchor in key-concepts prerequisites cope-migration enrollment-profile enrollment-token provisioning-method-choice entra-join-prerequisite ca-exclusion-intune-app android-15-frp configure-efrp what-breaks renewal-maintenance; do grep -q "#$anchor\|id=\"$anchor\"" docs/admin-setup-android/03-fully-managed-cobo.md || echo "MISSING: $anchor"; done`
- **Pass:** Zero MISSING output. All 12 anchors present as markdown headings that slugify to these names, or as explicit `<a id="..."></a>` tags.

### Dimension 2 — No forbidden terminology (AEAUDIT-04)

- **Audit:** Grep for SafetyNet (must equal 0) and for "supervision" as Android management term (must equal 0 outside cross-platform callout blockquotes).
- **Command:** `grep -ciE "safetynet" docs/admin-setup-android/03-fully-managed-cobo.md` must equal 0; `grep -cE "^supervision\b\|\bsupervision mode\b\|\bsupervised Android\b" docs/admin-setup-android/03-fully-managed-cobo.md` must equal 0.
- **Pass:** Zero SafetyNet hits. "Supervision" only appears inside blockquotes framed as cross-platform contrast with iOS.

### Dimension 3 — COPE wording discipline (D-04)

- **Audit:** Grep counts for the two locked phrases.
- **Command:**
  - `grep -c "recommends WPCO" docs/admin-setup-android/03-fully-managed-cobo.md` — must equal **1**.
  - `grep -ciE "COPE deprecated\|deprecated COPE" docs/admin-setup-android/03-fully-managed-cobo.md` — must equal **0**.
- **Pass:** Exact counts met. "WPCO" may appear more than once but the verbatim "recommends WPCO" phrase lives in exactly one place (the COPE Migration Note per D-03).

### Dimension 4 — Version-tag presence on behavioral assertions (PITFALL 1)

- **Audit:** Manual read + grep for version assertions without adjacent version tag. Behavioral assertions mentioning NFC, QR, afw#setup, FRP, or Android version gates must carry inline version tags ("Android X+", "Changed in Android X") OR link to the Phase 34 version-matrix breakpoint.
- **Command (heuristic):** `grep -nE "(NFC|QR|afw#setup|FRP)" docs/admin-setup-android/03-fully-managed-cobo.md | grep -vE "Android [0-9]+\+?|version-matrix|03-android-version-matrix"` — output should be empty or only match non-behavioral references (glossary links, section headings).
- **Pass:** Reviewer confirms no unversioned behavioral assertions exist. Cross-links to version matrix count as version-tagged.

### Dimension 5 — Cross-reference integrity

- **Audit:** For each outbound cross-link in the doc, verify the target anchor exists in the target file.
- **Command:** Extract all markdown links matching `\[.*\]\(.*\.md#.*\)` from the doc, then for each `file#anchor`, verify `grep -q "#$anchor\|id=\"$anchor\"" $file`.
- **Pass:** Every outbound cross-link resolves. Specifically required targets include:
  - `../_glossary-android.md#fully-managed` (Phase 34)
  - `../_glossary-android.md#managed-google-play` (Phase 34)
  - `../_glossary-android.md#zero-touch-enrollment` (Phase 34)
  - `../_glossary-android.md#dpc` (Phase 34)
  - `../_glossary-android.md#afw-setup` (Phase 34)
  - `../android-lifecycle/02-provisioning-methods.md` (Phase 34)
  - `../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint` (Phase 34 — breakpoint verified at lines 67-78)
  - `01-managed-google-play.md#bind-mgp` (Phase 35)
  - `01-managed-google-play.md#account-types` (Phase 35)
  - `01-managed-google-play.md#disconnect-consequences` (Phase 35)
  - `02-zero-touch-portal.md#link-zt-to-intune` (Phase 35)
  - `02-zero-touch-portal.md#dpc-extras-json` (Phase 35)
  - `02-zero-touch-portal.md#kme-zt-mutual-exclusion` (Phase 35)

### Dimension 6 — Frontmatter schema compliance (D-13)

- **Audit:** Parse YAML frontmatter; verify keys and value types.
- **Command:** Extract YAML frontmatter between first two `---` delimiters and check:
  - `platform: Android`
  - `audience: admin`
  - `applies_to: COBO`
  - `last_verified: YYYY-MM-DD` (ISO date)
  - `review_by: YYYY-MM-DD` where date = `last_verified + 60 days`
- **Pass:** All 5 keys present; all values match spec.

### Dimension 7 — Length target (D-11)

- **Audit:** Word count.
- **Command:** `wc -w docs/admin-setup-android/03-fully-managed-cobo.md`
- **Pass:** Count is in 2800-3800 word range (excluding frontmatter). Warn at 2700-2799 or 3801-3900; fail below 2700 or above 3900.

### Dimension 8 — Shared-file modification guard (D-14)

- **Audit:** Verify phase diff adds exactly one new file and touches zero shared/v1.0-v1.3 files.
- **Command:** `git diff --name-only HEAD~<N> HEAD` (N = Phase 36 commit count). Check:
  - Exactly one file added: `docs/admin-setup-android/03-fully-managed-cobo.md`
  - Zero modifications to: `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/index.md`, `docs/_glossary.md`, `docs/_glossary-macos.md`, any file under `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/l1-runbooks/`, `docs/l2-runbooks/`
- **Pass:** Both conditions satisfied.

---

## Wave 0 Requirements

- [ ] **`docs/admin-setup-android/03-fully-managed-cobo.md`** does not yet exist — will be created in Wave 1 task (this is expected W0 ❌)
- [x] **Cross-reference target verification** — Verified 2026-04-21 (plan-time re-check): 11 explicit `<a id>` anchors + 9 H2/H3 auto-slug targets all resolve via the resilient check pattern in PLAN Task 1 Step 1.1. Targets: `03-android-version-matrix.md#cobo`, `#android-15-breakpoint`; `02-provisioning-methods.md#cobo`, `#afw-setup`, `#zero-touch`, H3 `### NFC`, H3 `### QR`; `_glossary-android.md#afw-setup` + H3 auto-slugs for Fully Managed/COPE/WPCO/Managed Google Play/Zero-Touch Enrollment/DPC/Play Integrity; `01-managed-google-play.md#bind-mgp` + H2 Account Types + H2 Disconnect Consequences; `02-zero-touch-portal.md#link-zt-to-intune`, `#dpc-extras-json`, `#kme-zt-mutual-exclusion`, `#step-0-reseller`.
- [x] **Research-flag plan-time re-verification** — 2026-04-21: Flag 1 source `_glossary-android.md#cope` intact (H3 auto-slug confirmed); Flag 3 source `03-android-version-matrix.md#android-15-breakpoint` intact (line 67 explicit anchor confirmed); Flags 2/4 rely on MS Learn external sources already verified in RESEARCH.md 2026-04-21 (HIGH confidence). No drift detected in upstream repo sources.
- [x] No framework install needed — pure shell audits.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reading the COBO guide end-to-end, an admin can create a Fully Managed enrollment profile, choose a provisioning method, and configure EFRP without needing external sources | AECOBO-01 + AECOBO-03 | Holistic narrative flow cannot be grep-checked | Reviewer reads the doc start-to-finish and confirms: (a) no gaps in the admin task flow, (b) each what-breaks callout is at the correct decision point, (c) cross-references feel natural rather than forced |
| COPE migration note is factually current per Google's stance | AECOBO-02 | Language drift detection requires a reviewer who reads current Google AE Help | Compare the COBO doc's COPE migration section against the current Google Android Enterprise Help page at plan/execute time; flag any divergence |
| Android 15 FRP behavioral narrative matches current Intune admin-center UI | AECOBO-03 | Intune UI drift (portal redesigns) is detected only by someone who has logged into a recent Intune admin center | Executor or reviewer confirms at execute time that the EFRP Intune policy path matches current admin center navigation; apply MEDIUM confidence marker if UI has shifted since RESEARCH.md was written |

---

## Validation Sign-Off

- [ ] All 3 requirements (AECOBO-01/02/03) have automated audit commands in Phase Requirements → Audit Map
- [ ] Sampling continuity: audits run per-task-commit (dimensions 2/3/6/8) and per-wave (full 8 dimensions)
- [ ] Wave 0 covers all MISSING references (cross-reference verification pre-authoring)
- [ ] No watch-mode flags (n/a — no test framework)
- [ ] Feedback latency < 10s (all audits are grep/wc on one file)
- [ ] `nyquist_compliant: true` set in frontmatter after Wave 1 authoring passes Wave-0 gate

**Approval:** pending
