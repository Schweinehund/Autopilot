---
last_verified: 2026-04-27
review_by: 2026-06-26
audience: end-user
platform: Linux
applies_to: enrollment
---

> **For administrators:** If you administer Intune and are configuring Linux enrollment policy, see [admin-setup-linux/02-enrollment-profile.md](../admin-setup-linux/02-enrollment-profile.md).

# Linux Intune Portal Enrollment — User Guide

This guide shows you how to enroll your Ubuntu Linux laptop or workstation in your organization's Microsoft Intune so you can access work email, files, and apps. Allow about 15–20 minutes the first time.

## What is Linux Intune Enrollment?

Your organization uses Microsoft Intune to manage security and compliance on Linux laptops and workstations. When you enroll your Linux device, it registers with your organization's Intune service and checks that your machine meets your organization's security requirements — such as having a password set and disk encryption enabled.

Two pieces of software are installed on your machine as part of enrollment: **Microsoft Intune Portal** (the app you interact with) and a background service that checks in with Intune on a regular schedule. Together, they allow your IT department to verify that your laptop is compliant and to push software to it.

Enrollment does **not** give your IT team access to your personal files, browser history, or personal email. Intune reports whether your device meets compliance requirements — it does not read your documents or messages.

After enrollment you can sign into **Microsoft Edge** with your organization account to reach work resources like Outlook web, SharePoint, and Teams web without being blocked.

## Before you start

Before enrolling, make sure you have:

- **Ubuntu 22.04 LTS or 24.04 LTS** — older Ubuntu (20.04 and earlier) is no longer supported by Intune.
- **Microsoft Edge for Linux 102.x or higher** — needed for sign-in and to access org resources after enrollment. Install from [microsoft.com/edge](https://www.microsoft.com/edge) if not already on your machine.
- **Your organization email and password** — the same credentials you use for Outlook, Teams, and other work apps.
- **A stable internet connection** — sign-in needs to reach Microsoft and your organization's identity service.
- **Administrator (sudo) access on your laptop** — needed once during installation of the Intune Portal app.
- **Time:** about 15–20 minutes the first time.

## Enroll your device

Follow these five steps to enroll your Ubuntu Linux laptop.

1. **Install Microsoft Edge** (if not already installed). Open a browser and go to [microsoft.com/edge](https://www.microsoft.com/edge). Choose the **.deb** package for Ubuntu/Debian, download it, then open a terminal and run:

   ```
   sudo apt install ./<downloaded-edge-filename>.deb
   ```

   Replace `<downloaded-edge-filename>` with the actual filename shown in your Downloads folder. Once installed, confirm the version is 102 or higher by running `microsoft-edge --version` in the terminal.

2. **Install the Intune Portal app.** Your IT department will provide the exact terminal commands to add Microsoft's package source to apt and install `intune-portal`. Run those commands in a terminal. When the installation finishes, you should see **Microsoft Intune Portal** appear in your application launcher. If you have not received these commands from IT, contact them before continuing — the commands are specific to your organization's configuration.

3. **Open the Intune Portal app and sign in.** Search for **Microsoft Intune Portal** in your application launcher and open it. Click **Sign in** and enter your organization email address and password. If your organization uses multifactor authentication (MFA), approve the prompt promptly — for example, by tapping **Approve** in the Microsoft Authenticator app or entering the verification code you receive by SMS or email.

4. **Complete compliance remediation if prompted.** After signing in, **Microsoft Intune Portal** may show a list of items your laptop needs to fix before it is considered compliant — for example, "Set a screen lock password meeting policy requirements" or "Enable full-disk encryption". Follow each on-screen instruction. When you have addressed all items, click **Re-check** or **Refresh** in the app. Once all items show a green check or **Compliant** status, your device is enrolled and reporting compliant to your organization. If you cannot resolve an item on your own (for example, your hardware does not support disk encryption), contact IT for guidance.

5. **Sign into Microsoft Edge with your organization account.** Open **Microsoft Edge**. Click your profile icon in the top-right corner and choose **Sign in**. Enter your organization email address and password. Once signed in, you can open work resources such as Outlook web, SharePoint, and Teams web through **Microsoft Edge** without receiving "access blocked" messages.

## Verify enrollment

After completing the steps above, confirm that enrollment succeeded:

- **Microsoft Intune Portal** shows your device name with a green check or the word **Compliant** next to it.
- When you open Outlook web or Teams web in **Microsoft Edge**, you are not shown a "this device is blocked" or "your device does not meet requirements" message.
- Your IT department can see your device listed in their Intune admin portal (they can confirm this for you if you are unsure).

If you see a status other than **Compliant** in **Microsoft Intune Portal**, return to Step 4 and follow the remediation instructions shown in the app.

## Get help

**If something goes wrong during enrollment:**

- **"Sign-in failed" or the sign-in screen loops:** Double-check that you are using your organization email address (not a personal email). If multifactor authentication is required, make sure to approve the prompt in your authenticator app before it times out. If the problem continues, contact your IT helpdesk and describe which step failed.

- **"Your device is not compliant" after sign-in:** The **Microsoft Intune Portal** app shows a list of what needs to be fixed. Follow each instruction shown. If an item says something like "Disk encryption not available" or you cannot resolve it on your own, contact IT — your hardware or configuration may require admin assistance.

- **"Access blocked" in Microsoft Edge after enrollment:** Make sure you signed into **Microsoft Edge** with your organization account in Step 5. You can verify by clicking the profile icon in the top-right corner of Edge — it should show your work email address. If you are signed in but still blocked, confirm your Edge version is 102 or higher by running `microsoft-edge --version` in a terminal. If the version is correct and you are still blocked, contact IT.

- **"sudo: apt: command not found" or package install errors:** Confirm you are running Ubuntu 22.04 LTS or 24.04 LTS. Other Linux distributions (Fedora, Arch, openSUSE) are not supported by Intune at this time. Contact IT if you are unsure which Linux version you have — run `lsb_release -a` in a terminal and share the output with your helpdesk.

**For IT helpdesk agents:**

Quick reference for L1 service desk staff supporting Linux Intune Portal enrollment.

- The L1 enrollment-failed runbook will be published at `docs/l1-runbooks/30-linux-enrollment-failed.md` (Phase 51).
- The admin-side enrollment configuration guide is at [admin-setup-linux/02-enrollment-profile.md](../admin-setup-linux/02-enrollment-profile.md).
- When a user reports enrollment failure, ask for the output of `lsb_release -a` (confirms supported Ubuntu version) and `microsoft-edge --version` (confirms Edge 102+). These two data points resolve the majority of L1 Linux enrollment calls.

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Linux Intune Portal enrollment end-user walkthrough (LIN-06; Phase 50) | -- |
