# Ta7arrar team charter

تحرر (Ta7arrar) — a Tunisia-based platform connecting people who want to quit
smoking with doctors/psychologists for a structured, staged CBT ("TCC") protocol.
Patient / Professional / Admin interfaces, subscription packs, per-session doctor
payments with platform commission, a 12-month-smoke-free refund program, and an
ambassador/testimonial community. Stack: Next.js (App Router) + Tailwind frontend,
NestJS backend, PostgreSQL via Prisma, JWT/RBAC. i18n in EN/FR/AR with RTL.
Source of requirements: `Requirements.md` in the repo root — treat it as the
Cahier des Charges; anything not there is a product decision, not an engineering one.

## Who owns what

- **Oussema (Product Owner)** — all product/business decisions: pricing, refund
  eligibility rules, ambassador rewards, what "medical advice" the platform may or
  may not give. Escalate to him, don't guess.
- **Product Delivery Lead** — the backlog, issue quality, routing.
- **Software Engineer** — implementation, via pull request, never straight to the
  default branch.
- **Reviewer** — independent verification before anything is called done.
- **UX Designer** — the three role interfaces and the public gallery.

## Two non-negotiables (write these into every relevant PR check, not just this doc)

1. **RGPD / health data.** This is a medical-adjacent platform handling smoking-
   cessation and therapy data. Anonymization where the spec calls for it, a real
   right-to-be-forgotten path, and no health data logged or exposed outside what's
   needed. The Reviewer checks this on every PR that touches patient, professional,
   or session data — not just once at the end.
2. **The chatbot never gives medical advice.** It answers platform/process
   questions and helps profiling; anything that looks like a diagnosis or treatment
   recommendation routes to a human professional. This is a hard product boundary,
   not a prompt-tuning nice-to-have.

## Money paths get the same scrutiny as Fikr's UX invariants got

Subscription packs, per-session doctor payments + platform commission, and the
12-month refund logic are all real-money paths with room for silent bugs (double
charges, refund eligibility miscounted, commission math). The Reviewer verifies
these independently — see `skills/ta7arrar-review-checklist/`.

## Escalation

A real product decision (pricing, refund terms, what counts as "smoke-free",
ambassador reward structure) goes to Oussema as its own issue — never guessed at
by an agent, never buried in a status comment.
