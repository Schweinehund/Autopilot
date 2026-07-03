---
phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap
reviewed: 2026-06-30T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/admin-setup-8021x/07-linux.md
  - docs/admin-setup-8021x/00-overview.md
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---

# Phase 106: Code Review Report

**Reviewed:** 2026-06-30
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Both files are structurally sound. All locked conventions are satisfied: the lead gap callout uses the correct `WARNING --` house form; the EAP method scope note frames EAP-TLS as a documentation-scope limit (not a preference); Ubuntu targets are 24.04 LTS and 26.04 LTS only; PEAP-MSCHAPv2 and EAP-TTLS each get exactly one out-of-scope sentence; no `wpa_supplicant` variants appear in the verification trio; no `{#id}` anchor overrides are present; no inline PEM material is embedded; all relative links resolve to existing files; all anchors match their GitHub auto-slugs (`#canonical-scope-callout`, `#certificate-prerequisites-out-of-band`); the `## Wired` H2 uses `type ethernet` and keeps all `802-1x.*` properties; and `00-overview.md` item 7 links `07-linux.md` with an accurate description. The nmcli commands are technically correct for NetworkManager's `802-1x.*` settings.

Two warnings were found: an inline-passphrase guidance pattern that lacks a shell-history exposure warning, and an unexplained discrepancy between CLI alias names used in commands and canonical NM property names shown in the reference table. One info item flags a comment that overstates what `nmcli connection show` can confirm about EAP authentication state.

## Warnings

### WR-01: Inline private-key passphrase guidance lacks shell-history exposure warning

**File:** `docs/admin-setup-8021x/07-linux.md:93`

**Issue:** The note at line 93 instructs:

```
(also add 802-1x.private-key-password "passphrase")
```

This pattern teaches admins to embed the private-key passphrase directly in an `nmcli connection add` or `nmcli connection modify` command. When the placeholder `"passphrase"` is replaced with a real secret, it is exposed in shell history (`.bash_history`, `.zsh_history`) and in `/proc/<PID>/cmdline` while the command executes. For a fleet-deployment guide aimed at Intune admins scripting via Intune Bash policies, this is a meaningful risk: script output and execution logs may capture the passphrase. No warning is present; no alternative input method is offered.

**Fix:** Add a security note immediately after line 93:

```markdown
> **Security note:** Supplying `802-1x.private-key-password` inline records the
> passphrase in shell history and in `/proc/<PID>/cmdline`. Prefer one of:
> - Disable shell history before running: `unset HISTFILE && nmcli ...`
> - Create the connection profile *without* the password argument, then use
>   `nmcli --ask connection up "Corp-WiFi-EAP-TLS"` to supply it interactively.
> - Use `private-key-password-flags 4` (unencrypted key) where the deployment
>   security posture allows it, eliminating the passphrase entirely.
```

---

### WR-02: Reference table uses canonical NM property names; commands use CLI aliases — discrepancy unexplained

**File:** `docs/admin-setup-8021x/07-linux.md:80-88 and 114-115`

**Issue:** The Wi-Fi `nmcli connection add` command at lines 80-88 uses the CLI keyword alias `wifi-sec.key-mgmt` (short form for `802-11-wireless-security.key-mgmt`) and the positional shortcut `ssid "YourCorporateSSID"` (short form for `802-11-wireless.ssid`). The reference parameter table at lines 114-115 shows the *canonical* NM setting names:

```
| 802-11-wireless-security.key-mgmt | wpa-eap (Wi-Fi only; not used for wired) |
| 802-11-wireless.ssid              | YourCorporateSSID (Wi-Fi only)           |
```

The table header is "nmcli Property" with no footnote explaining that these are canonical NM property paths (valid in `nmcli connection show --fields`, connection files, and `nmcli connection add`), not the exact aliases shown in the commands above. An admin who tries to directly correlate the table to the command block will find two different strings for the same setting with no explanation. An admin who copies `802-11-wireless-security.key-mgmt` from the table into a new `nmcli connection add` invocation will get a valid (though longer) form, but will reasonably wonder why the guide uses both names.

**Fix:** Add a note below the table (after line 117):

```markdown
> **Property name note:** The table shows canonical NetworkManager setting names
> (as displayed by `nmcli connection show`). The `nmcli connection add` command
> accepts aliases: `wifi-sec` is an alias for `802-11-wireless-security`, and
> `ssid <value>` sets `802-11-wireless.ssid` directly. Both forms are functionally
> equivalent; the command examples use aliases for brevity.
```

---

## Info

### IN-01: First verification command comment overstates EAP authentication visibility

**File:** `docs/admin-setup-8021x/07-linux.md:124-125`

**Issue:** The comment preceding the first verification command reads:

```bash
# Show connection status and EAP-TLS authentication details
nmcli connection show "Corp-WiFi-EAP-TLS"
```

`nmcli connection show <name>` displays the stored connection profile — the property values written to the NM keyfile (EAP type, cert paths, flags, etc.). It does not show whether the 802.1X handshake succeeded; it does not show the live EAP negotiation state. EAP negotiation events — including success or failure messages — are only visible in `journalctl -u NetworkManager` (the third command in the trio). An admin who reads this comment as confirmation that the first command will show auth success may stop troubleshooting too early.

**Fix:** Change the comment to accurately describe what the command produces:

```bash
# Show stored connection profile (verify EAP-TLS property values are set correctly)
nmcli connection show "Corp-WiFi-EAP-TLS"
```

And update the inline description of the trio at line 122 from "confirm it succeeded" to something like: "Confirm profile properties, IP assignment, and EAP negotiation events, respectively."

---

_Reviewed: 2026-06-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
