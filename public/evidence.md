# Pramaan Relay evidence register

Last reviewed: 27 August 2026 (IST)

## Direct answer

The evidence establishes a real handoff boundary: Jeevan Pramaan generates a Digital Life Certificate and makes it available to a Pension Disbursing Agency, but that certificate remains subject to agency approval. Pramaan Relay proposes a transaction contract around that gap. It does **not** claim that a generated certificate is already accepted or that the proposed continuity safeguard is current law or policy.

## Primary sources

| Claim | Evidence | Confidence |
|---|---|---|
| A generated DLC is made available electronically to the PDA but remains subject to PDA approval. | [Jeevan Pramaan FAQ](https://jeevanpramaan.gov.in/v2.0/misc/faq) | High |
| A pensioner is told to download the DLC to learn accepted/rejected status; after rejection, official guidance is to contact the PDA and generate a new Pramaan ID with corrected details. | [Jeevan Pramaan FAQ](https://jeevanpramaan.gov.in/v2.0/misc/faq) | High |
| The published process explicitly depicts “DLC is pushed to PDA” and “PDA pushes back to DLC status.” | [NIC/Jeevan Pramaan process flow](https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/09/202509011995166356.pdf) | High |
| PDAs should update pension records and send acceptance/rejection SMS on a T+1 basis. The memorandum also records representations that messages were not sent regularly and pensions were discontinued despite DLC submission. | DoPPW O.M. F. No. 1(2)/2023-P&PW(H), 13 January 2025, available in a [signed third-party PDF mirror](https://www.staffnews.in/wp-content/uploads/2025/02/SMS-to-pensioners-regarding-submission-of-Digital-Life-Certificate.pdf) | High for the signed document text; medium-high for source location because a stable official file URL was not found |
| PDAs were directed to process NIC DLC reports daily, send same-day acceptance/rejection SMS, state the rejection reason, distinguish wrong PDA and wrong account/PPO details, and report rejection causes. | DoPPW O.M. F. No. 1(3)/2022-P&PW(H), 20 February 2024, enclosed in the same [signed PDF mirror](https://www.staffnews.in/wp-content/uploads/2025/02/SMS-to-pensioners-regarding-submission-of-Digital-Life-Certificate.pdf) | High for the signed document text; medium-high for source location |
| For Central Bank of India’s Campaign 4.0, 79,905 DLCs were uploaded, 60,637 updated, and 19,268 rejected. Recorded causes included wrong pension accounts and migrated SPARSH/SAMPANN users selecting the bank as PDA. | [35th SCOVA minutes, 4 May 2026](https://www.doppw.gov.in/static/uploads/2026/05/50e06cc11615e760cbaaa63e88701369.pdf) | High; 24.1% is only this bank/campaign, not a national rejection rate |
| Banks should issue acknowledgements for submitted life certificates and consider immediate CBS entry and system-generated receipts. RBI separately recorded complaints that misplaced certificates deprived pensioners of regular payments. | [RBI pension-disbursement master circular, 2021](https://www.rbi.org.in/scripts/BS_CircularIndexDisplay.aspx?Id=12059) and [RBI acknowledgement circular, 2015](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9710&Mode=0) | High |
| Pension Disbursing Banks are directed to monitor non-submission and arrange submission, including doorstep support for aged, sick, incapacitated, and Divyang pensioners. | [PIB, 13 March 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2238863&lang=1&reg=1) | High |
| Jeevan Pramaan’s public counter displayed 12.33 crore certificates since 2014 during research. | [Jeevan Pramaan home](https://jeevanpramaan.gov.in/v2.0/) | High for the observed snapshot; counter changes over time |

## Current user signal

| Signal | Evidence | Confidence |
|---|---|---|
| A pensioner reported a DLC generated on 13 July 2026 still not reflected in EPFO pension records after 42 days during a migration/maintenance period. | [Reddit, 23 August 2026](https://www.reddit.com/r/EPFO/comments/1vwh6mg/epfo_jeevan_pramaan_dlc_still_not_updated_after/) | Medium for the existence of the report; low for prevalence |

This is one current public report, not a representative survey. It validates the failure mode, not its population frequency.

## Proposed-policy boundary

No standing cross-PDA rule for a “verification-pending” pension protection or grace period was found. The prototype’s seven-day administrative hold is therefore a **policy simulation**, not a current entitlement. It is modelled as eligible only when all synthetic guardrails pass:

1. a valid generation event exists;
2. it occurred before the scheme-specific deadline;
3. the pension was active immediately before that deadline;
4. the PDA/PSA is onboarded or a deterministic route is known;
5. no death, duplicate, fraud, or contradictory-life-event flag exists;
6. the hold lasts no more than seven days and cannot renew itself;
7. an agency escalation is created at the same time; and
8. acceptance, reasoned rejection, or expiry closes the hold with a receipt.

A real policy would still require government decisions on scheme differences, fraud controls, recovery, liability, and whether the safeguard pauses only automated suspension or also affects payment.

## Visible collision check

The research team screened current public Build What Moves India repositories and posts for direct overlap.

- [`thedhingrastudio/ChatGPT-hackathon_JeevanPramaan`](https://github.com/thedhingrastudio/ChatGPT-hackathon_JeevanPramaan) is a current Jeevan Pramaan entry/routing shell. Its public README did not describe PDA fetch acknowledgement, reason-coded decision obligations, idempotent outbox delivery, or a proposed continuity state.
- [`nikhilsaran18/Civicflow`](https://github.com/nikhilsaran18/Civicflow) mentions Jeevan Pramaan as one generic pension scenario rather than implementing this handoff protocol.
- Many current builds cover EPFO claim preflight, RTI drafting/appeals, RC transfer, IRCTC, cybercrime, grievance routing, and generic government-service navigation. Those ideas were rejected for this submission because closer collisions already exist.

No indexed result is proof that no private or unindexed build exists. The claim is limited: **no direct public collision was found in the searches run on 27 August 2026.**

## Hackathon sources

- [Official builder brief](https://buildwhatmovesindia.com/brief)
- [Official FAQ](https://buildwhatmovesindia.com/faq)
- [Official briefing video](https://www.youtube.com/watch?v=NjKwtdv9WPs)
