# Pramaan Relay

Pramaan Relay is a self-contained browser prototype for one process change:

> Once an on-time Digital Life Certificate has been successfully generated, its delivery to the Pension Disbursing Agency becomes an accountable transaction. A downstream sync delay must not be silently relabelled as citizen non-compliance.

This is an independent hackathon prototype. It is not affiliated with Jeevan Pramaan, NIC, MeitY, EPFO, any Pension Disbursing Agency, or the Government of India.

**Live website:** https://pramaan-relay.vercel.app

## Run it locally

No API key, login, database, or real identity data is required.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## What reviewers can test

Four scenario tabs expose the full state machine:

1. **T+1 acknowledgement breach:** request the proposed hold, route an overdue certificate, record agency fetch, then accept it.
2. **PPO mismatch:** return a reason code, repair one field, retry the same handoff, then accept it.
3. **Biometric fallback:** keep hold eligibility off until an assisted face capture actually generates a certificate.
4. **Happy path:** generate, fetch, and accept.

Every state can also be explored using the optional outcome controls. The public receipt is shown as a familiar paper-style document, and the mock certificate downloads as a synthetic PDF.

## Architecture demonstrated

- A typed React reducer owns every transition.
- A stable receipt ID and payload hash model an immutable handoff.
- Delivery attempts are idempotent and do not create a duplicate certificate.
- `GENERATED`, `AVAILABLE_TO_PDA`, `PDA_FETCHED`, `ACCEPTED`, and `REJECTED` remain distinct.
- Rejections carry a field-scoped reason code.
- AI is not allowed to change transaction state.
- All records are held in browser memory and disappear on refresh.

## Real, synthetic, proposed

- **Real in the prototype:** reducer, ageing/SLA logic, retry semantics, reason codes, event ledger, receipt export, responsive interface, and URL-based message variant.
- **Synthetic:** pensioner, biometric result, Pramaan ID, pension account, PDA adapters, decisions, notifications, and consequences.
- **Official direction represented:** the T+1 record update and acceptance/rejection SMS target described in the 13 January 2025 DoPPW memorandum. The stable copy found during research is a signed third-party mirror, disclosed in `evidence.md`.
- **Proposed policy:** a one-time, non-renewable seven-day administrative hold while an on-time certificate is decided, plus its eligibility guardrails and automatic routing. The prototype does not make these current law or a payment guarantee.

## Build and deployment

```powershell
npm run lint
npm run build
```

The Next.js site is configured for Vercel. For Round 1, verify that:

- the URL opens without a login;
- all four scenario tabs and guided journeys work on mobile;
- the mock certificate PDF downloads;
- the independent-prototype disclaimer remains visible;
- no real personal data or government integration is added.

## Main files

- `app/` - Next.js routes, metadata, and the visual system
- `components/relay-app.tsx` - working state flow, four journeys, paper receipt, and interaction UI
- `public/hero-pensioner.png` - generated synthetic documentary asset with embedded prompt provenance
- `PRODUCT.md` - durable product truth and safety boundaries
- `DESIGN.md` - extracted visual system
- `EXPERIMENT.md` - one-variable, no-cookie message experiment plan
- `evidence.md` — source and confidence register
- `llms.txt` — concise agent-readable product explanation
- `pricing.md` — free-tool terms and limits
- `index.html` - preserved original self-contained prototype
