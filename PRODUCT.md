# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router with TypeScript, deployed to Vercel. The current Round 1 experience uses browser-only mock data and a deterministic reducer.

## Users

- Primary: pensioners and family helpers trying to understand what happens after a Digital Life Certificate is generated.
- Evaluation: hackathon judges, policy reviewers, and engineers testing whether the handoff contract is coherent, safe, and demonstrable.

## Product Purpose

Pramaan Relay makes the gap between Digital Life Certificate generation and Pension Disbursing Agency acceptance visible and accountable. Success means a first-time tester can explain within one minute that generated and agency-accepted are different states, then inspect the receipt and owner for the next action.

## Positioning

This is not a status tracker or chatbot. It models an operating contract with a stable handoff identity, idempotent delivery, receiver acknowledgement, reason-coded decisions, bounded recovery, and an exportable evidence trail.

## Operating Context

The Round 1 prototype is a public, no-login demonstration. Reviewers should be able to run four synthetic journeys on mobile or desktop: T+1 acknowledgement breach, PPO mismatch repair, biometric fallback, and happy path.

## Capabilities and Constraints

- Preserve distinct `GENERATED`, `AVAILABLE_TO_PDA`, `PDA_FETCHED`, `ACCEPTED`, and `REJECTED` states.
- Only a simulated PDA event may accept or reject.
- Rejections carry a field-scoped reason code.
- Retries preserve the handoff family and do not create a duplicate citizen journey.
- AI may explain information but may not change transaction, eligibility, deadline, or payment state.
- All identities, biometrics, agencies, balances, responses, and consequences are synthetic.
- No real government API, Aadhaar, PPO, UAN, bank, OTP, biometric, login, cookie, or persistence.
- The seven-day administrative hold is proposed policy, not current law or a payment guarantee.

## Brand Commitments

Keep the name Pramaan Relay, the independent-prototype disclaimer, the direct civic voice, and the existing deep-green/coral identity. Do not use government emblems, affiliation-like branding, or claims that generation equals acceptance.

## Evidence on Hand

- `pramaan-relay-hackathon-submission-pack.pdf`: product thesis, state contract, evidence limits, demo sequence, and deployment checklist.
- `evidence.md`: dated source and confidence register.
- `index.html`: working browser reducer, four journeys, receipt export, and existing visual system.
- `README.md`, `llms.txt`, and `pricing.md`: public explanation, boundaries, and free-tool terms.
- No real customer records, production integrations, legal approval, or national prevalence evidence exists and none may be fabricated.

## Product Principles

1. Responsibility moves downstream after successful generation; the citizen's proof is not silently erased.
2. Deterministic state and evidence outrank persuasive copy.
3. Real, mocked, and proposed layers remain visibly separated.
4. Recovery preserves history and asks for the least destructive correction.
5. The first minute stays citizen-first; architecture follows.

## Accessibility & Inclusion

The experience must work with keyboard navigation, visible focus, reduced motion, 320px-wide layouts, clear non-color status labels, and readable English with a short Hindi status summary. Controls use at least 44px touch targets.
