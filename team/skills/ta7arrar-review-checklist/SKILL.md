---
name: ta7arrar-review-checklist
description: "Engineer pre-handoff and Reviewer verification procedure for Ta7arrar, including the RGPD and payment/refund checks. Load before handing off or reviewing a PR."
---

# Ta7arrar review checklist

## Before the Software Engineer hands off

1. Every acceptance criterion has been checked against a real run, not assumed.
2. If the PR touches patient, professional, or session data: anonymization and
   right-to-be-forgotten behavior match `Requirements.md`'s RGPD intent, and
   nothing sensitive is logged or exposed beyond what's needed.
3. If the PR touches subscription packs, per-session doctor payment, platform
   commission, or the 12-month smoke-free refund: the math is verified for the
   normal case AND at least one edge case (partial period, mid-cycle
   cancellation, a relapse resetting eligibility).
4. If the PR touches the chatbot: it still cannot produce diagnostic or
   treatment language — confirm with a real prompt, not by reading the code.
5. RTL/i18n: no physical Tailwind directional classes (`ml-`/`mr-`/`pl-`/`pr-`)
   introduced; Arabic still renders right-to-left.
6. Hand off using Format B from `ta7arrar-team-communication`.

## Reviewer procedure

1. Read the issue's acceptance criteria before opening the diff.
2. Check out the PR and run it — don't verify from the diff alone when the
   claim is behavioral.
3. Re-verify items 2–5 above independently; do not accept the Engineer's
   CHECKS line as proof.
4. Any REWORK finding states the minimum fix — no scope expansion.
5. On APPROVE, merge and post Format C with the merged PR link.

## What blocks APPROVE outright

- An unverified RGPD/data-handling claim on a PR that touches patient,
  professional, or session data.
- An unverified payment/commission/refund calculation on a PR that touches
  money.
- Any chatbot response that reads as medical advice.
