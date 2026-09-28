---
name: ta7arrar-team-communication
description: "Ta7arrar comment formats (status, handoff, verdict) and how to verify a link. Load before posting any comment or Oussema-facing message."
---

# Ta7arrar team communication

One goal: Oussema can read line 1 of any comment and know where things stand.

## Status words (the only ones allowed on line 1)

`DONE` | `IN PROGRESS` | `READY FOR REVIEW` | `BLOCKED` | `NEEDS YOU`

Reviewer uses a verdict line instead (see below).

## Format A — status comment (default, every agent)

```text
STATUS: <status word> — <one plain-language sentence: what happened>
- Evidence: <verified link>            (no link = not done)
- Next: <who acts next, by role name, or "Oussema">
- Need from Oussema: <link to the issue assigned to him, or "nothing">
```

Maximum 6 lines. No logs, code, run IDs, or CLI narration — link to evidence
instead of pasting it. An owner ask is always its own issue assigned to Oussema;
this line only points to it.

## Format B — handoff for review (Software Engineer)

```text
STATUS: READY FOR REVIEW — <one sentence: what now works>
PR: <link>
AC:  <one line per acceptance criterion: done / not verified + why>
CHECKS: RGPD/data handling — <pass/n-a + why>; payment/refund math — <pass/n-a + why>
LIMITS: <only real remaining gaps, or "none">
```

Maximum 12 lines. The two CHECKS lines are mandatory whenever the PR touches
patient/professional/session data or packs/payments/commission/refund logic;
write "n/a" only when the PR genuinely doesn't touch either.

## Format C — verdict (Reviewer)

```text
VERDICT: APPROVE | VERDICT: REWORK — <one sentence why>
AC: <one line per criterion: PASS / FAIL / NOT VERIFIED>
FINDINGS: <REWORK only: the minimum blocking fix, one line each>
NEXT: <one action — on APPROVE: "merged <PR link>">
```

## How to verify a link

Open it from the intended context (deployed environment, PR page, issue page) —
a repo path is never a URL. If you cannot verify it, do not post it: write
`NO VERIFIED PUBLIC URL AVAILABLE` and give the location separately. Post URLs
as clickable links, never inside backticks or a code span.
