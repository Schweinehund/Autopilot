---
last_verified: 2026-08-21
review_by: 2026-10-20
applies_to: all
audience: admin
platform: Linux
---

> **Platform applicability:** This guide is Linux-specific and covers update delivery on
> Intune-managed Ubuntu — what Intune can and cannot do for Linux updates, the Bash platform script
> that carries the work, `unattended-upgrades` configuration, reboot handling, Ubuntu Pro and
> Livepatch, and the compliance signal that gates Conditional Access. Every delivery mechanism
> documented here is apt-family. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For Linux enrollment, the Intune agent, compliance
> policy and Conditional Access, see
> [Linux Admin Setup Overview](../../admin-setup-linux/00-overview.md).

# Linux Update Delivery

This guide covers how operating-system and package updates actually reach an Intune-managed Linux
device — which parts of that flow Intune owns, which parts the distribution owns, and where the
boundary between them sits. It is written for an administrator who has to answer "is this fleet
patched, and what can I do about it from the tenant?" honestly.

For the cross-platform comparison of cadence, deferral, enforcement and attestation across all
managed platforms, see [Patch Management Overview](00-overview.md). For the Linux enrollment,
agent, compliance and Conditional Access tree, see
[Linux Admin Setup Overview](../../admin-setup-linux/00-overview.md).

**Scope: this guide is Ubuntu-scoped, and says so rather than implying otherwise.** Microsoft lists
RHEL 9 and RHEL 10 as Intune-supported Linux platforms alongside Ubuntu, but every delivery
mechanism documented in this guide is apt-family — `apt`, `unattended-upgrades`, and the Ubuntu Pro
entitlement model. The RHEL equivalents are deliberately out of scope here because no first-party
Intune source documents them. That silence is stated rather than papered over: an administrator
running RHEL should treat this guide as a model of the boundary, not as a configuration reference
for their estate.

The Intune-supported Linux platforms are:

> - Ubuntu Desktop 24.04 and 26.04 LTS with a GNOME graphical desktop environment
> - Ubuntu LTS, version 24.04 and 26.04
> - RedHat Enterprise Linux 9
> - RedHat Enterprise Linux 10

**Source:** [Operating systems and browsers supported by Microsoft Intune](https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms) (updated 2026-07-01)

Intune's custom-settings-for-Linux page still names RHEL 8 — an intra-Microsoft conflict, reproduced
here rather than flattened. This guide covers only the Ubuntu path.

**Source:** [Add custom settings to Linux devices](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux) (updated 2026-07-01)

<a id="what-intune-can-and-cannot-do"></a>
## What Intune Can and Cannot Do for Linux Updates

There is no native Intune Linux update policy. Not a partial one, not a preview one — the policy
surface does not exist. There is no update ring for Linux, no deferral setting, no deadline, no
grace period and no enforcement primitive of any kind. Nothing in the Intune admin center schedules,
delays, approves or forces an operating-system or package update on an Ubuntu device.

What Intune has instead is a Bash platform script. The organization authors the script; Intune
delivers it, runs it on a schedule and reports its exit code. Everything the script then does —
pulling package lists, resolving dependencies, installing updates, deciding which origins to trust —
is done by `apt` and `unattended-upgrades` on the device, under the distribution's rules rather than
the tenant's. See
[Delivering Updates with a Bash Platform Script](#bash-platform-script-delivery) for the execution
context and frequency detail, and
[Linux App Delivery](../../admin-setup-linux/04-app-delivery.md) for the delivery mechanism itself.

**Reconciling this guide with the capability matrices.** The corpus's reference layer states the same
fact in the negative, and the two statements are not in conflict.
[Linux Capability Matrix](../../reference/linux-capability-matrix.md) records update enforcement as
"Not supported — Intune does not orchestrate apt updates", and
[5-Platform Capability Comparison](../../reference/4-platform-capability-comparison.md) marks every
Linux update row "Not supported", including the update management mechanism row. This guide names a
Bash platform script as the mechanism anyway, because both things are true at the same time:
**Intune does not orchestrate Linux updates; it delivers a script that does.** Orchestration —
knowing which updates exist, deciding when they install, enforcing a deadline, reporting what landed
— stays with the distribution. Delivery, scheduling of the script itself, and exit-code reporting
are Intune's. A reader arriving from either matrix lands on the same boundary.

<a id="deferral-enforcement-attestation"></a>
## Deferral, Enforcement and Attestation for Linux

[Patch Management Overview](00-overview.md#deferral-vs-enforcement) defines three control
primitives — deferral, enforcement and attestation — and every managed platform maps onto them.
Linux maps onto exactly one of the three.

- **Deferral — none, tenant-side.** No Intune setting delays an update on a Linux device. The only
  deferral that exists is distro-native: which origins `unattended-upgrades` is permitted to install
  from, and when its timers fire. That deferral belongs to the distribution and to whoever
  configured the device, not to the tenant. See
  [Configuring unattended-upgrades](#configuring-unattended-upgrades).
- **Enforcement — no primitive exists at all.** This is an absence, not a gap in this guide. There
  is no Linux equivalent of a Windows Update client policy deadline, of a macOS declarative enforced
  update, or of an iOS target-version key. Nothing in the tenant can require that an Ubuntu device
  install an update by a date. A script can be scheduled, but a script is delivery and not
  enforcement: if it fails, or the device is powered off, or `apt` cannot take a lock, the update
  simply does not happen and there is no deadline to notice.
- **Attestation — the one primitive Linux has.** A compliance policy evaluates a custom script's
  output and marks the device compliant or non-compliant, and that compliance signal gates
  Conditional Access. This verifies a state; it never installs anything. See
  [Compliance and Conditional Access](#compliance-conditional-access).

The Conditional Access lever is narrower on Linux than on any other managed platform, and the
difference matters at planning time. It gates **web access to Entra-protected applications** through
Microsoft Edge for Linux 102.x and later, at sign-in time. It does not gate device access:
device-level Conditional Access grants — "Require device to be marked as compliant" applied to a
policy targeting all client apps — are not available for Linux at all. See
[Linux Glossary](../../_glossary-linux.md) and
[Linux Capability Matrix](../../reference/linux-capability-matrix.md) for the corpus's ratified
position, and [Linux Conditional Access](../../admin-setup-linux/05-conditional-access.md) for the
configuration path.

That narrowing makes the honest framing stronger rather than weaker. On Linux, a compliance policy
plus Conditional Access is attestation — and attestation only.

<a id="bash-platform-script-delivery"></a>
## Delivering Updates with a Bash Platform Script

The only mechanism Intune has for touching updates on a Linux device is a Bash platform script,
authored by the organization, delivered from the Intune admin center under Devices, and executed by
the Intune Linux client on a schedule Intune sets. The delivery mechanism itself — authoring,
upload, assignment, exit-code reporting — is already documented end to end in
[Linux App Delivery](../../admin-setup-linux/04-app-delivery.md) and is not re-authored here.

What this guide owns is the delta that decides whether an update script is safe to run at fleet
scale: the execution context the script runs in, the execution frequency it silently inherits, and
the `unattended-upgrades` configuration it is there to put in place. Intune documents three
execution defaults for a Linux platform script, and all three matter here:

> Execution context: Select the context the script is executed in. Your options: User (default):
> When a user signs in to the device, the script runs. If a user never signs into the device, or
> there isn't any user affinity, then the script doesn't run. Root: The script always runs (with or
> without users logged in) at the device level. The first time the script executes, the end user
> might have to consent. After they consent, it should continue to execute on its schedule.
> Execution frequency: Select how frequently the script is executed. The default is Every 15
> minutes. Execution retries: If the script fails, enter how many times Intune should retry running
> the script. The default is No retries.

**Source:** [Add custom settings to Linux devices](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux) (updated 2026-07-01)

**Root versus User, and the frequency that comes with Root.** These two settings are a pair, and
choosing one without the other is how the most expensive Linux update mistake gets made. The User
context is the default, and on a device with no signed-in user and no user affinity a User-context
script does not run at all — an update script targeted at unattended or shared Ubuntu machines will
appear healthy in the admin center while doing nothing. That empty case is precisely what drives an
author to Root, and Root is the correct choice for an update script: it always runs at the device
level, with or without users logged in. But switching the context does not touch the frequency, and
the frequency default is Every 15 minutes. Set an explicit, justified execution frequency in the
same edit that sets Root — every time, on every Root-context script. The No retries default
compounds the problem from the other direction: a script that genuinely fails is reported once and
never retried, so a real failure is invisible unless somebody reads the report.

**There is no documented run-time cap on this surface.** The platform-script article documents no
maximum run time, no timeout and no size limit for a Linux platform script at all. That absence is
stated here rather than filled: do not assume a cap exists, and do not borrow one from a different
Intune script surface. The fleet-wide consequence of the frequency default combined with that
cap-absence is treated in full under
[Unsupported and Anti-Feature Callouts](#unsupported-callouts).

Because a Bash script delivered this way runs elevated, the supply-chain callout in
[Linux App Delivery](../../admin-setup-linux/04-app-delivery.md) applies in full — the organization,
not Intune, is responsible for verifying script sources and signatures before upload. This guide
deliberately ships no runnable package-upgrade script body: a guide whose primary pitfall is that
people deploy exactly that, carelessly, should not hand out the artifact.

<a id="configuring-unattended-upgrades"></a>
## Configuring unattended-upgrades

`unattended-upgrades` is distro-native. Intune does not set it, does not read it and has no
knowledge of what it is configured to do. The platform script's entire job on this surface is to put
a configuration in place and leave it there; from that point the device updates itself according to
that configuration, whether or not Intune is reachable.

Everything in this section is documented by Canonical for Ubuntu 24.04, codename `noble`. The
Canonical page demonstrates every example and every log excerpt against `noble` and does not cover
26.04, even though 26.04 is on Intune's supported list. Treat the mechanics below as 24.04-documented
and confirm them on 26.04 before relying on them there.

The single setting that decides what actually gets installed is
`Unattended-Upgrade::Allowed-Origins`. Canonical introduces the following block with the words
"This is the default:":

> Unattended-Upgrade::Allowed-Origins {
>     "${distro_id}:${distro_codename}";
>     "${distro_id}:${distro_codename}-security";
>     // Extended Security Maintenance; doesn't necessarily exist for
>     // every release and this system may not have it installed, but if
>     // available, the policy for updates is such that unattended-upgrades
>     // should also install from here by default.
>     "${distro_id}ESMApps:${distro_codename}-apps-security";
>     "${distro_id}ESM:${distro_codename}-infra-security";
> //  "${distro_id}:${distro_codename}-updates";
> //  "${distro_id}:${distro_codename}-proposed";
> //  "${distro_id}:${distro_codename}-backports";
> };

**Source:** [Automatic updates](https://ubuntu.com/server/docs/how-to/software/automatic-updates/) (Canonical, updated 2026-07-15)

Read that block closely, because the usual assumption about it is the opposite of what it says.

**Four origins are enabled by default, not one.** They are the base release itself, the `-security`
pocket, the Expanded Security Maintenance apps-security pocket and the Expanded Security Maintenance
infra-security pocket. The default is therefore not security-only — the base release origin is
enabled, so a package can be upgraded from the release pocket with no security pocket involved at
all.

**Three entries are commented out by default**, and the two slashes in front of them are the whole
story: `-updates`, `-proposed` and `-backports`. The practical consequence is that a default Ubuntu
install running `unattended-upgrades` will not pick up ordinary bug-fix updates from the `-updates`
pocket on its own. An administrator who reasons "unattended upgrades are switched on, so we are
current" is wrong about the `-updates` pocket specifically — and that gap appears in no Intune
report, because Intune cannot see this file.

The two Expanded Security Maintenance entries deserve their own note. They are enabled in the
default configuration, but they resolve to something only on a machine that is actually attached to
an Ubuntu Pro subscription. On an unattached machine they are inert. See
[Ubuntu Pro and Livepatch](#ubuntu-pro-livepatch).

Do not make reporting or scheduling tidier by weakening this posture. Removing a security origin or
switching automatic security updates off buys nothing that is worth it. Widening the list beyond
what Canonical documents — uncommenting `-updates`, or adding a third-party origin — is a real
decision with a real blast radius, and it belongs to a change process rather than to a script edit.

The configuration surface most relevant to update delivery, with the defaults Canonical documents:

| Key | What it does | Documented default |
|-----|--------------|--------------------|
| `Unattended-Upgrade::Allowed-Origins` | The list of package origins `unattended-upgrades` is permitted to install from | Four entries enabled — release, `-security`, ESM apps-security, ESM infra-security; `-updates`, `-proposed` and `-backports` present but commented out |
| `Unattended-Upgrade::Automatic-Reboot` | Whether the system reboots without confirmation at the end of an upgrade run that requested a reboot | `false` — see [Reboot Handling](#reboot-handling) |
| `Unattended-Upgrade::Automatic-Reboot-WithUsers` | Whether that reboot proceeds even with users logged in; takes effect only when the key above is set to `true` | `true` — see [Reboot Handling](#reboot-handling) |

<a id="reboot-handling"></a>
## Reboot Handling

Installing a kernel or library update does not finish the job. Until the machine reboots the running
system is still the old one, and this is where a Linux fleet most often reports itself patched while
it is not. This section defines the signal; the consequence of ignoring it is set out under
[Unsupported and Anti-Feature Callouts](#unsupported-callouts).

**Ubuntu does not reboot itself by default.** Two Canonical keys govern this, and they are routinely
confused because their documented defaults point in opposite directions:

> `Unattended-Upgrade::Automatic-Reboot "false";`: If this option is set to `true`, the system will be rebooted ***without confirmation*** at the end of an upgrade run if a reboot was requested. The default value is `false`.
>
> `Unattended-Upgrade::Automatic-Reboot-WithUsers "true";`: Automatically reboot even if there are users currently logged in when `Unattended-Upgrade::Automatic-Reboot` (the option above) is set to `true`. The default value is `true`.

**Source:** [Automatic updates](https://ubuntu.com/server/docs/how-to/software/automatic-updates/) (Canonical, updated 2026-07-15)

These are two different keys and not two spellings of one. `Unattended-Upgrade::Automatic-Reboot` is
the gate, and Canonical documents its default as `false` — so out of the box, an unattended upgrade
that requests a reboot does not get one. `Unattended-Upgrade::Automatic-Reboot-WithUsers` is a
modifier whose own default is `true`, and it does nothing whatsoever until the gate above is turned
on. Reading that second default as "Ubuntu reboots by itself" is the error; what it actually means
is "when automatic reboots are enabled, a logged-in user will not stop one."

**The reboot-required marker is a state to read, not a log line to grep.** Canonical documents it as
a file whose existence is the answer:

> After applying all updates, it may be necessary to **reboot your system.** The release upgrade process will let you know if that's needed, but you can also check manually before: if the file `/run/reboot-required` exists, then you will need to reboot.

**Source:** [How to upgrade your Ubuntu release](https://ubuntu.com/server/docs/how-to/software/upgrade-your-release/) (Canonical, updated 2026-07-06)

The same signal surfaces in `unattended-upgrades` output during a routine run, written with a
different path spelling:

> 2025-03-13 20:43:40,201 WARNING Found /var/run/reboot-required, rebooting

**Source:** [Automatic updates](https://ubuntu.com/server/docs/how-to/software/automatic-updates/) (Canonical, updated 2026-07-15)

**Both spellings are stated here, and neither is asserted to be the other.** Canonical's
release-upgrade guidance writes `/run/reboot-required`; the `unattended-upgrades` log output writes
`/var/run/reboot-required`. No first-party page consulted for this guide documents the relationship
between the two paths, so this guide claims none. The actionable form is simply to check both: a
discovery script or custom attribute that tests for the marker at `/run/reboot-required` and at
`/var/run/reboot-required` returns the right answer whichever spelling a given device uses.

**Read the reboot marker, not the installed package version.** This is the compliance and
custom-attribute source for "is this device patched?". A package version tells you that a download
and an install happened; it does not tell you that the running system is the patched one. A rule
that reads package version and never reads the reboot marker is the mechanism behind the false green
described under [Unsupported and Anti-Feature Callouts](#unsupported-callouts).

**The prerequisite, and a documented silence beside it.** Enabling automatic reboots means setting
`Unattended-Upgrade::Automatic-Reboot` to `true`; Canonical documents the default as `false`, so
this is always an explicit, deliberate change rather than something that happens on its own. Beyond
that key, no first-party Canonical page fetched for this guide documents an `update-notifier-common`
package dependency for reboot-required behavior. That is recorded here as a silence rather than
stated as a requirement: the claim circulates widely, but the page usually cited for it does not
contain it, and this guide does not assert what it cannot source.

<a id="ubuntu-pro-livepatch"></a>
## Ubuntu Pro and Livepatch

Ubuntu Pro and Livepatch enter this corpus here for the first time, and the structural point matters
more than any figure attached to it. **Both are Canonical-side subscription entitlements that sit
entirely outside Intune's control plane.** Intune cannot enable Ubuntu Pro, cannot attach a device to
a subscription, cannot renew one, cannot see whether Livepatch is running, and carries no native
signal for entitlement status anywhere in the admin center. There is no policy for it, no report for
it and no inventory field for it. The only way a tenant learns whether a given device is attached is
a custom compliance script that asks the device and reports the answer back — the same mechanism,
carrying the same ceiling, described under
[Compliance and Conditional Access](#compliance-conditional-access).

Livepatch is the kernel live-patching service: it applies selected kernel fixes to a running system
without a reboot. Expanded Security Maintenance is the coverage extension. Both ride on the same
subscription, which is why "is this device attached?" is one question with two consequences.

Canonical documents the entitlement tiers as follows:

> Ubuntu Pro is and always will be free for personal use on up to 5 physical machines, or 50 machines for official Ubuntu Community members.
>
> Expanded Security Maintenance (ESM) provides 10 years of vulnerability fixes for critical, high and selected medium vulnerabilities across the whole Ubuntu archive.
>
> Ubuntu Pro extends the life of every Ubuntu LTS from 5 years of standard security maintenance for the Main repository to 10 years for the entire Ubuntu Archive (Main and Universe repositories). With the Legacy add-on, this is extended an additional 5 years, giving you a 15 year security maintenance and support commitment.

**Source:** [Ubuntu Pro](https://ubuntu.com/pro) (retrieved 2026-08-21) — the page carries no publication or update date; that absence is stated here rather than filled.

Each figure belongs to its own tier and does not travel between them. The personal-use allowance and
the larger allowance for official Ubuntu Community members are two distinct free entitlements; the
archive-wide coverage extension and the Legacy add-on are two distinct terms. A managed enterprise
fleet is on none of the free tiers at all — an Intune-managed Ubuntu estate is a commercial
subscription, and the free figures are context for the model rather than an option for the fleet.

Attaching a machine is a device-side action, never a tenant-side one. Canonical's tutorial documents
`sudo pro attach` followed by the subscription token, run on the device itself, and its sample run
shows the ESM infrastructure and Livepatch services enabling automatically once the token is
accepted. That is the whole of the integration story, and none of it passes through Intune.

**Source:** [Attach your Ubuntu Pro subscription](https://documentation.ubuntu.com/pro/attach-tutorial/) (retrieved 2026-08-21) — the documentation site exposes no publication or update date; that absence is stated here rather than filled.

<a id="compliance-conditional-access"></a>
## Compliance and Conditional Access

This section says **what signal to read** and **what the ceiling on the answer is**. It does not
teach discovery-script authoring and it does not state an evaluation cadence: both belong to
[Linux Compliance Policy](../../admin-setup-linux/03-compliance-policy.md), which is the single
source of truth for Bash discovery scripts, compliance categories and per-category remediation. For
how the resulting compliance signal reaches a Conditional Access policy, see
[Linux Conditional Access](../../admin-setup-linux/05-conditional-access.md).

The signal to read is the reboot-required marker defined under
[Reboot Handling](#reboot-handling) — not an installed package version.

**The discovery-script surface carries documented limits, and they are not the platform script's
limits.** These two Bash surfaces look alike, share the same tooling vocabulary and are constantly
confused with each other.

The limits quoted below belong to custom compliance discovery scripts, and not to platform scripts:

> Scripts can be no larger than 1 megabyte (MB) each. Output generated by each script can be no larger than 1 MB. Scripts must have a limited run time: On Linux, scripts must take five minutes or less to run.

**Source:** [Create discovery scripts for custom compliance policy](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script) (updated 2026-07-15)

Two separate 1-MB limits are documented there and they are not one limit stated twice: the first
caps the script itself, the second caps the output the script generates. Neither those size limits
nor that run-time limit reaches the platform script that delivers updates — the platform-script
article documents no run-time cap on that surface at all, as stated under
[Delivering Updates with a Bash Platform Script](#bash-platform-script-delivery). Two surfaces, two
limit sets, and no figure travels between them.

**The honest ceiling on "is this device patched?"** Microsoft documents a constraint that no
configuration removes:

> On Linux, discovery scripts run in the user's context. They can't check for system-level settings that require elevation. An example of this limitation is the state/hash of the /etc/sudoers file.

**Source:** [Create discovery scripts for custom compliance policy](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script) (updated 2026-07-15)

A discovery script therefore cannot read a root-owned state file, and a rule built on one will
simply fail to evaluate. A rule that quietly falls back to installed package version is worse than
one that fails outright: it returns a confident answer that is wrong every time an update is
installed and the machine has not yet rebooted. Read the reboot marker described under
[Reboot Handling](#reboot-handling) instead.

Livepatch and Expanded Security Maintenance attachment status reaches a tenant by exactly the same
route — a custom compliance script asking the device — and inherits exactly the same ceiling. There
is no second, privileged path to it.

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

**Root-context execution hazard.** This is the most consequential setting pair in Linux update
delivery, and the failure it produces is fleet-wide rather than per-device. Four facts combine, and
none of them is safe to read on its own:

- The **Root** execution context always runs the script at the device level, with or without users
  logged in. An update script needs exactly that, so an update script gets it.
- The **Every 15 minutes** execution frequency is the default, and switching the context to Root
  does not change it. Nobody chose that value; it was simply never edited.
- The platform-script documentation states **no documented run-time cap on that surface** — no
  maximum duration, no timeout, no size limit. Nothing bounds a long-running invocation.
- The three together produce a package-upgrade script running as root, on every assigned device, 96
  times a day. The arithmetic is exact: 1,440 minutes in a day divided by 15 minutes is 96 runs, per
  device, fleet-wide.

At that rate the consequence stops being theoretical. `dpkg` and `apt` take exclusive locks; a run
that begins while the previous one is still working contends for them, and the loser either fails or
blocks. Those failures are reported once and never retried, because **No retries** is also the
default — so a genuine, repeating failure is invisible unless somebody reads the report. Devices
drift into states where an upgrade is perpetually half-finished, and a device that installed a kernel
update but never rebooted reports itself patched while it is still running the old kernel.

**Set an explicit, justified execution frequency on every Root-context script.** Not only on update
scripts — on every script that runs as root. A default nobody chose is the wrong value for a
privileged, fleet-wide, repeating operation, and this single setting is the difference between a
maintenance job and an incident.

**Never present a package-upgrade script as idempotent by default.** It is not. Lock contention and
concurrent-run behavior are explicit design points the script author owns: the script has to decide
what it does when it finds a lock already held, when a previous invocation is still running, and when
a dependency resolution fails part way through. Treating "it just re-runs harmlessly" as given is how
the 96-runs-a-day figure turns into an outage.

The remedy for the reporting half of this is the reboot-required marker defined under
[Reboot Handling](#reboot-handling) — read that signal, do not redefine it here, and make it the
compliance source. The remedy for the configuration half is the Root-versus-User pair under
[Delivering Updates with a Bash Platform Script](#bash-platform-script-delivery), which is where the
error is prevented rather than merely detected afterwards.

**There is no native Intune Linux update policy.** No update ring, no policy type, no settings-catalog
surface for Linux updates. This is the absence every other item on this list follows from.

**There is no Intune-side deferral.** Nothing in the tenant delays a Linux update. The only deferral
that exists is distro-native and lives in `unattended-upgrades` configuration on the device.

**There is no enforcement primitive at all.** Not a weak one, not a partial one — none. No deadline,
no forced install, no grace period, no tenant-side mechanism that can require an Ubuntu device to
install anything by any date. Every Linux update decision available to a tenant is therefore an
attestation decision.

**There is no hard deadline.** Because there is no enforcement primitive, there is nothing for a
deadline to attach to. A schedule on a platform script is a schedule for the script, not a deadline
for the update.

**There is no Intune visibility into Livepatch or Expanded Security Maintenance entitlement.** These
are Canonical-side subscription state. Intune neither sets nor reads them, and the only route to the
answer is a custom compliance script — see [Ubuntu Pro and Livepatch](#ubuntu-pro-livepatch).

**The apt-family scope of this guide is an absence, not an oversight.** RHEL 9 and RHEL 10 are
Intune-supported, and every mechanism documented here is apt-family. No first-party Intune source
documents the RHEL equivalents, so this guide states the gap rather than implying coverage it does
not have.

The remaining items are binary — the capability either exists or it does not:

| Feature | Why it's unsupported | Do this instead |
|---------|----------------------|------------------|
| Intune update rings for Linux | The policy type does not exist for Linux; there is no ring, no deferral window and no deadline to configure | Configure `unattended-upgrades` on the device and deliver that configuration with a platform script — see [Configuring unattended-upgrades](#configuring-unattended-upgrades) |
| Forced install by a deadline | No enforcement primitive exists for Linux at any layer of the tenant | Treat the compliance signal as attestation and gate access on it — see [Compliance and Conditional Access](#compliance-conditional-access) |
| Device-level Conditional Access | "Require device to be marked as compliant" against all client apps is not available for Linux | Use web-app Conditional Access through Microsoft Edge for Linux 102.x and later |
| Intune reporting of installed packages or running kernel version | Intune collects no package inventory for Linux and exposes no update report for the platform | Report the reboot-required marker through a custom compliance script — see [Reboot Handling](#reboot-handling) |
| Tenant-side control of Ubuntu Pro, ESM or Livepatch | These are Canonical-side subscription entitlements, entirely outside Intune's control plane | Manage the subscription with Canonical's own tooling and surface attachment status via a custom compliance script — see [Ubuntu Pro and Livepatch](#ubuntu-pro-livepatch) |
| RHEL update delivery from this guide | Every mechanism documented here is apt-family, and no first-party Intune source documents the RHEL equivalents | Treat this guide as a model of the boundary only, and source RHEL guidance separately |

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison of cadence, deferral,
  enforcement and attestation, plus the Ring Terminology hub
- [Linux App Delivery](../../admin-setup-linux/04-app-delivery.md) — The Bash platform script
  mechanism itself: authoring, upload, assignment, exit-code reporting and the supply-chain callout
- [Linux Compliance Policy](../../admin-setup-linux/03-compliance-policy.md) — The single source of
  truth for Bash discovery-script authoring, compliance categories and evaluation cadence
- [Linux Conditional Access](../../admin-setup-linux/05-conditional-access.md) — Web-app Conditional
  Access for Linux endpoints through Microsoft Edge
- [Linux Capability Matrix](../../reference/linux-capability-matrix.md) — Feature-by-feature Windows
  versus Linux capability comparison, including software updates
- [5-Platform Capability Comparison](../../reference/4-platform-capability-comparison.md) —
  Cross-platform capability rows including the Linux update surface
- [Linux Glossary](../../_glossary-linux.md) — Linux-specific terminology used throughout this guide
- [Linux Triage Decision Tree](../../decision-trees/09-linux-triage.md) — Troubleshooting path for
  the Intune Linux client

## External References

- [Operating systems and browsers supported by Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/fundamentals/ref-supported-platforms)
- [Add custom settings to Linux devices (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux)
- [Create discovery scripts for custom compliance policy (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script)
- [Deployment guide: Manage Linux devices in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-platform-linux)
- [Automatic updates (Canonical)](https://ubuntu.com/server/docs/how-to/software/automatic-updates/)
- [How to upgrade your Ubuntu release (Canonical)](https://ubuntu.com/server/docs/how-to/software/upgrade-your-release/)
- [Ubuntu Pro (Canonical)](https://ubuntu.com/pro)
- [Attach your Ubuntu Pro subscription (Canonical)](https://documentation.ubuntu.com/pro/attach-tutorial/)
