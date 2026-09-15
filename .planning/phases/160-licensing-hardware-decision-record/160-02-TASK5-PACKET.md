# 160-02 Task 5 — hand-built meaning-preservation packet

This cell carries zero modals, so `scripts/docs-style/judge-packets.py`'s modal-survival filter
emits zero packets for it and a green automated run would prove nothing. This packet is built by
hand instead: `git show <pre-edit-sha>:docs/recipes/06-walk-up-avd-kiosk-autologon.md` with five
lines of context either side of the Shell Launcher row, paired with the post-edit text and the same
five lines either side (the surrounding rows are unchanged, so the "before" and "after" context is
identical — only the row's own third cell differs).

Pre-edit SHA: `0b456a3a27767f4a08bc4be8fac5e864d4ccccb9`

## Before (pre-edit, `git show 0b456a3a:docs/recipes/06-walk-up-avd-kiosk-autologon.md`, lines 37-47)

```

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Shell Launcher on an unactivated Enterprise image | `./Device/Vendor/MSFT/AssignedAccess/ShellLauncher` requires Windows Enterprise or Education by Microsoft's own edition table — not supported on Pro. **[PILOT]** the node also failed with `Class is not licensed for use` (Intune shows `-2016281112`) on an installed Enterprise image reported as unactivated; no first-party page names activation as a separate gating factor | Activate with a per-device volume key (MAK via an Edition upgrade profile), buy IoT Enterprise hardware, or take the multi-app branch worked here |
| Pre-escaping the Assigned Access XML before pasting it into the custom OMA-URI value | **[PILOT]** Intune escaped the SyncML itself; pre-escaped input arrived double-encoded and the CSP failed with `0xc00ce556` (XML invalid at root) | Paste raw XML. If a *raw* paste fails with `0xc00ce556`, and only then, escape it |
| Intune **Templates** > **Kiosk** > **Multi app kiosk** with a single Windows App entry | Windows App is not one process. Its sign-in and connection children (`windows365.exe`, `msedgewebview2.exe`, `msrdc.exe`) are blocked and, **[PILOT]**, the kiosk showed "This app has been blocked by your system administrator" | Author the custom OMA-URI configuration in Step 5 with the full allow-list |
| Two Assigned Access writers on one device (Kiosk template + custom profile, or `ShellLauncher` + `Configuration`) | Each writer fights the other; the device holds one Assigned Access configuration | Exactly one assigned profile per device. Unassign and sync before switching mechanisms |
| Hiding Fast User Switching (`Hide entry points for Fast User Switching`) in the kiosk lockdown | Hiding Fast User Switching removes the Switch-user entry point Microsoft documents the policy as controlling. **[PILOT]** on this recipe's build, Ctrl+Alt+Del > Switch user > LAPS admin is the only console entrance, so hiding it removes the technician's only way in while the kiosk user gains nothing | Leave it unconfigured. Remove Task Manager / Lock / Change Password remain safe |
```

## After (post-edit, working tree, same lines)

```

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Shell Launcher on an unactivated Enterprise image | `./Device/Vendor/MSFT/AssignedAccess/ShellLauncher` requires Windows Enterprise or Education by Microsoft's own edition table — not supported on Pro. **[PILOT]** the node also failed with `Class is not licensed for use` (Intune shows `-2016281112`) on an installed Enterprise image reported as unactivated; no first-party page names activation as a separate gating factor | Activate with a per-device volume key (a MAK, delivered through an Intune Edition upgrade profile, targeting volume-licensed Windows Enterprise; reaching IoT Enterprise needs OEM-licensed hardware or a confirmed qualifying-OS upgrade path), procure OEM-licensed IoT Enterprise hardware, or take the multi-app branch worked here—see the licensing standard in Step 4 |
| Pre-escaping the Assigned Access XML before pasting it into the custom OMA-URI value | **[PILOT]** Intune escaped the SyncML itself; pre-escaped input arrived double-encoded and the CSP failed with `0xc00ce556` (XML invalid at root) | Paste raw XML. If a *raw* paste fails with `0xc00ce556`, and only then, escape it |
| Intune **Templates** > **Kiosk** > **Multi app kiosk** with a single Windows App entry | Windows App is not one process. Its sign-in and connection children (`windows365.exe`, `msedgewebview2.exe`, `msrdc.exe`) are blocked and, **[PILOT]**, the kiosk showed "This app has been blocked by your system administrator" | Author the custom OMA-URI configuration in Step 5 with the full allow-list |
| Two Assigned Access writers on one device (Kiosk template + custom profile, or `ShellLauncher` + `Configuration`) | Each writer fights the other; the device holds one Assigned Access configuration | Exactly one assigned profile per device. Unassign and sync before switching mechanisms |
| Hiding Fast User Switching (`Hide entry points for Fast User Switching`) in the kiosk lockdown | Hiding Fast User Switching removes the Switch-user entry point Microsoft documents the policy as controlling. **[PILOT]** on this recipe's build, Ctrl+Alt+Del > Switch user > LAPS admin is the only console entrance, so hiding it removes the technician's only way in while the kiosk user gains nothing | Leave it unconfigured. Remove Task Manager / Lock / Change Password remain safe |
```

## Judge instructions

Judge only the third cell of the "Shell Launcher on an unactivated Enterprise image" row (the "Do
this instead" column). The first two cells and every other row are unchanged context, shown only so
you can judge the hunk with its surrounding lines rather than in isolation, per the protocol.

This is a documentation-formatting meaning-preservation check, not a licensing fact check: judge
whether the after-text still tells the reader to do the same three things the before-text told them
to do (activate with a per-device volume key via an Edition upgrade profile; obtain IoT Enterprise
hardware; or take the multi-app branch), and whether any claim the before-text actually made has been
reversed, contradicted, or had an existing hedge/modal removed or strengthened. Distinguish between
(a) a new claim added where the before-text was silent on that point, and (b) an existing claim from
the before-text whose certainty, direction, or hedge changed in the after-text — the rubric's four
verdicts (STRENGTHENED/INVERTED/WEAKENED as defects, PRESERVED otherwise) are about category (b).
State explicitly, for each clause in the cell, which of (a) or (b) it is, before giving the overall
verdict. Report one verdict — PRESERVED, STRENGTHENED, INVERTED, or WEAKENED — for the cell as a
whole, with a one-sentence reason.
