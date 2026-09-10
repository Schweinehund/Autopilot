#!/usr/bin/env bash
# Pre-push hook: rejects any push that would publish the v1.22 landing branch's
# archived local history, and rejects any push that directly targets a
# refs/archive/* ref on the remote.
# Install (manual, per-developer): cp scripts/hooks/pre-push.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push
# Rationale: Phase 159 D-08. v1.22/154-style-landing carried a since-scrubbed
# value in its local commit history (Phase 159 Task 1 scrub); the branch was
# squashed onto master via plumbing and archived at refs/archive/v1.22-landing,
# then deleted. That archived history must never reach a remote. This hook is
# an opt-in, per-clone mechanical guard against the archived history reaching
# a remote push -- it must be manually installed (see README.md "Install
# (one-time per clone)") and is bypassable via `git push --no-verify`; it is
# fast local feedback, not an enforced or CI-backed control.

set -e

# git invokes: pre-push <remote name> <remote url>, then feeds stdin lines of
# "<local ref> SP <local sha> SP <remote ref> SP <remote sha>" LF, one per ref
# being pushed.
remote_name="$1"

# Full 40-character object name of the scrub-source commit. Seven tracked
# planning files already name this commit, so recording it here discloses
# nothing new (159-CONTEXT.md D-08).
SCRUB_SOURCE_SHA="9a1148156e049bc4ff9cf208de869739a8ff5d43"

while read -r local_ref local_sha remote_ref remote_sha; do
  # 1. Deletion pushes: local SHA is all zeros. Nothing to scan. Allow.
  if [ "$local_sha" = "0000000000000000000000000000000000000000" ]; then
    continue
  fi

  # 4. Reject any refspec whose remote ref is under refs/archive/, regardless
  # of what it carries. The archive ref exists to be a local-only recovery
  # point; it is never a legitimate push target.
  case "$remote_ref" in
    refs/archive/*)
      echo "pre-push: REJECTED - '$remote_ref' is a refs/archive/* ref and must never be pushed" >&2
      exit 1
      ;;
  esac

  # 2. Compute the range of commits this push would introduce on the remote.
  if [ "$remote_sha" = "0000000000000000000000000000000000000000" ]; then
    # New ref on the remote: there is no remote tip to diff against, so the
    # range is everything reachable from the local ref that isn't already
    # reachable from any of this remote's tracking refs.
    range_commits="$(git rev-list "$local_sha" --not --remotes="$remote_name")"
  else
    range_commits="$(git rev-list "${remote_sha}..${local_sha}")"
  fi

  # 3. Reject if the range contains the scrub-source commit. Whole-line match
  # (git rev-list prints one full 40-character SHA per line); check the grep
  # exit status explicitly rather than relying on `set -e` to propagate it,
  # since grep's own non-match exit status inside a pipeline/subshell is easy
  # to lose.
  if printf '%s\n' "$range_commits" | grep -qx -- "$SCRUB_SOURCE_SHA"; then
    echo "pre-push: REJECTED - range for '$local_ref' -> '$remote_ref' contains the archived scrub-source commit ($SCRUB_SOURCE_SHA)" >&2
    exit 1
  fi
done

echo "pre-push: OK - no archived history and no refs/archive/* target detected"
exit 0
