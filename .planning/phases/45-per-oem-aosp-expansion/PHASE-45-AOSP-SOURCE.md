# Phase 45 AOSP Per-OEM Input Artifact — RealWear Deep Content

**Source:** Extracted from `docs/admin-setup-android/06-aosp-stub.md` during Phase 43 trim (2026-04-24) per Phase 43 CONTEXT D-16 / D-17.
**Consumer:** Phase 45 per-OEM AOSP expansion (AEAOSPFULL-01 RealWear admin guide → `docs/admin-setup-android/09-aosp-realwear.md`).
**Lifecycle:** Phase 45 DELETES this file in its final commit per Phase 43 CONTEXT D-20. This is a planning-space input artifact — consumed and removed, not archived in-place. Do NOT link to it from shipped docs (Phase 43 D-19).

## RealWear Hardware Scope

RealWear **HMT-1** (firmware 11.2+), **HMT-1Z1** (11.2+), and **Navigator 500** (1.1+) are confirmed GA for AOSP management in Intune — AR/VR headsets deployed for hands-free frontline work (field service, maintenance, remote expert assistance).

### Verbatim Extract from Phase 39 AOSP Stub (lines 53-60)

The following two paragraphs were removed from `docs/admin-setup-android/06-aosp-stub.md` during the Phase 43 AEAUDIT-04 trim. Every sentence is preserved here verbatim per the lossless-extract contract (Phase 43 RESEARCH §6 line 666):

> RealWear **HMT-1** (firmware 11.2+), **HMT-1Z1** (11.2+), and **Navigator 500** (1.1+) are confirmed GA for AOSP management in Intune — AR/VR headsets deployed for hands-free frontline work (field service, maintenance, remote expert assistance).
>
> Enrollment is QR-only, one device at a time. **Wi-Fi credentials MUST be embedded in the QR enrollment payload** because RealWear devices cannot join Wi-Fi interactively during enrollment — the device must come up already network-connected to reach the Intune enrollment server on first boot.

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`

## Enrollment Mechanics

Enrollment is QR-only, one device at a time. **Wi-Fi credentials MUST be embedded in the QR enrollment payload** because RealWear devices cannot join Wi-Fi interactively during enrollment — the device must come up already network-connected to reach the Intune enrollment server on first boot.

### Per-Device Firmware Minimums

| Device | Minimum Firmware | Notes |
|---|---|---|
| RealWear HMT-1 | 11.2+ | Primary frontline AR headset; hands-free voice control |
| RealWear HMT-1Z1 | 11.2+ | ATEX/IECEx-certified hazardous-environment variant of HMT-1 |
| RealWear Navigator 500 | 1.1+ | Next-gen head-mounted tablet; high-res camera for remote expert |

All three carry the same AOSP QR enrollment constraints — one device per QR, Wi-Fi credentials MUST be embedded.

## Wi-Fi QR-Payload Embedding Walk-Through

[Placeholder — Phase 45 researcher will expand with actual Intune UI path for embedding Wi-Fi in the AOSP QR generator: SSID field, password field, EAP config for enterprise networks, etc. Reference: Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token > Wi-Fi.]

Suggested section outline for Phase 45 authoring:

1. **Why Wi-Fi must be embedded (not interactive).** RealWear devices have no text-input UI during enrollment; the enrollment app runs before the Wi-Fi picker is available.
2. **Where in the Intune admin center to configure the QR with Wi-Fi.** Step-by-step UI path with screenshots.
3. **Supported Wi-Fi auth types.** Open / WPA2-PSK / WPA2-Enterprise (EAP-PEAP, EAP-TLS). Certificate embedding for EAP-TLS — is that AOSP-supported at GA?
4. **Failure mode: Wi-Fi absent from QR.** Device hangs at "Connecting to Intune" — no error surface. Recovery: factory-reset, regenerate QR with Wi-Fi, re-scan.
5. **Failure mode: wrong Wi-Fi credentials in QR.** Silent timeout; no retry UI. Recovery: same as above.

## PITFALL-7 Invariant (Phase 39 D-17)

Every per-OEM "supported" assertion MUST pair with the AOSP baseline caveat: this hardware is supported *under AOSP mode* (not under Android Enterprise managed modes). Do NOT drop the "not supported under AOSP" framing from per-OEM content.

Concretely for RealWear: the `09-aosp-realwear.md` shipping doc MUST contain at least one sentence of the form "RealWear devices are supported under AOSP in Intune; they are not supported under Android Enterprise fully managed (COBO) because they lack Google Mobile Services." The v1.4.1 harness C6 check (informational-first) scans for this framing.

## Cross-Links for Phase 45 Author

- **Stub that trimmed this content:** `docs/admin-setup-android/06-aosp-stub.md` (Phase 43 AEAUDIT-04 trim landed 2026-04-24)
- **PITFALL-7 framing locked at:** Phase 39 §CONTEXT D-17 (reference via git history if phase-39 directory is torn down)
- **AOSP supported-devices source (authoritative):** https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices
- **Re-verify at execute time** — the MS Learn list evolves as OEMs add/remove firmware support.

## Phase 45 Deletion Checklist

When Phase 45 is ready to delete this file in its final commit:

- [ ] Confirm `docs/admin-setup-android/09-aosp-realwear.md` has shipped and carries the verbatim hardware scope (HMT-1 / HMT-1Z1 / Navigator 500 + firmware minimums)
- [ ] Confirm PITFALL-7 framing is present in the shipping doc (harness C6 should emit 2/2 pass after Phase 45)
- [ ] Confirm Wi-Fi QR-payload walk-through has been expanded from placeholder into actual Intune UI documentation
- [ ] `git rm .planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` in Phase 45's final commit
