# تحرر (Ta7arrar) team configuration (config-as-code)

Portable copy of the pattern used in the Fikr project (`fikr/team/`), scoped down to
what this project actually needs. This folder is the source of truth for the agent
team: who does what, the rules they follow, the skills they load. Multica is a
mirror of this folder, never the other way round.

## The rules (same as Fikr's)

1. Change agents/skills here, by pull request — never edit them live in the Multica UI.
2. A merged change is pushed into Multica by a sync step (start manually with
   `multica agent update` / `multica skill update` per file until you set up an
   autopilot to do it, the way Fikr's `Daily Team Config Sync` does).
3. You (the project owner) merge `team/` PRs — the team doesn't rewrite its own rules.
4. No secrets in this folder. Secret *names* only; values live in agent environments
   or GitHub Actions secrets.

## Files

| File | What's in it | Applies to |
|---|---|---|
| `workspace-context.md` | Team charter: ownership, flow, the two non-negotiables (RGPD, chatbot scope) | Every agent |
| `skills/ta7arrar-team-communication/` | Comment formats (status, handoff, verdict) | Every agent |
| `skills/ta7arrar-review-checklist/` | Engineer pre-handoff + Reviewer procedure, incl. RGPD and payment/refund checks | Software Engineer, Reviewer |
| `agents/<name>.md` | Each agent's own short instructions | That agent |
| `manifest.tsv` | Multica ids (fill in once created), display names, skill bindings | Sync step |

## Roster (4 to start)

- **Product Delivery Lead** — turns `Requirements.md` into issues, keeps the backlog
  honest against it, routes work.
- **Software Engineer** — builds against the existing Next.js/NestJS/Prisma monorepo.
  One is enough to start; split frontend/backend only if the queue actually backs up.
- **Reviewer** — independent gate. The checklist has real teeth here Fikr's didn't
  need: RGPD/health-data handling and payment/refund correctness, checked on every PR.
- **UX Designer** — three real interfaces (Patient, Professional, Admin) plus the
  public success-story gallery; matches the project's own design-system section.

Deliberately not yet created:

- **Data/AI specialist** — the project's own roadmap stages AI in for later (risk
  scoring → chatbot → predictive dashboard). Create this agent when that phase
  actually starts, not before.
- **Research Analyst / Prototyper / Auditor** — add only if a real need shows up
  (competitor research, throwaway prototypes to compare, a standing governance
  check separate from the Reviewer). Fikr needed all three eventually; day one didn't.

## Before this goes live

1. Create each agent in Multica, then paste its Multica id into `manifest.tsv`.
2. Fill in `project.md` (repo URL, resources) the way Fikr's does — not included
   here since it's 1:1 with whatever you set up when you create the Multica project.
3. Point the Reviewer and Software Engineer at the real repo path once it's attached
   (`https://github.com/OussemaBA/liberation`).
