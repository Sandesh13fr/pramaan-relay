"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock,
  DownloadSimple,
  FileText,
  IdentificationCard,
  Info,
  LockKey,
  Path,
  Receipt,
  ShieldCheck,
  Warning,
  X,
} from "@phosphor-icons/react";
import { useReducer, useRef, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

type Stage =
  | "DRAFT"
  | "CAPTURE_FAILED"
  | "DOORSTEP_BOOKED"
  | "AVAILABLE_TO_PDA"
  | "STALE_HANDOFF"
  | "SUPPORT_ROUTED"
  | "HOLD_EXPIRED"
  | "PDA_FETCHED"
  | "REJECTED"
  | "CORRECTED"
  | "ACCEPTED";

type ActionType =
  | "GENERATE"
  | "AGE"
  | "ROUTE"
  | "FETCH"
  | "ACCEPT"
  | "REJECT"
  | "CORRECT"
  | "RESEND"
  | "DOORSTEP"
  | "FACE"
  | "RESET";

type Tone = "ok" | "warn" | "danger" | "info";

type RelayEvent = {
  code: string;
  title: string;
  detail: string;
  at: string;
  tone: Tone;
};

type RelayState = {
  scenario: ScenarioKey;
  stage: Stage;
  certificateGenerated: boolean;
  generatedBeforeDueDate: boolean;
  biometric: string;
  pramaanId: string | null;
  receiptId: string;
  payloadHash: string;
  ageHours: number;
  holdRemainingHours: number | null;
  attempts: number;
  owner: string;
  reasonCode: string | null;
  safeguard: string;
  guideIndex: number;
  events: RelayEvent[];
};

type GuideStep = { action: ActionType; label: string; help: string };
type ScenarioKey = "breach" | "mismatch" | "fallback" | "happy";
type Scenario = {
  short: string;
  tab: string;
  title: string;
  description: string;
  guide: GuideStep[];
  initial: () => RelayState;
};

const event = (code: string, title: string, detail: string, at: string, tone: Tone = "ok"): RelayEvent => ({
  code,
  title,
  detail,
  at,
  tone,
});

const scenarios: Record<ScenarioKey, Scenario> = {
  breach: {
    short: "T+1 breach",
    tab: "Agency is silent after the target",
    title: "Shanti's proof is waiting on the agency.",
    description: "Her synthetic certificate was generated before the due date. The T+1 update target has passed without an agency response.",
    initial: () => ({
      scenario: "breach",
      stage: "STALE_HANDOFF",
      certificateGenerated: true,
      generatedBeforeDueDate: true,
      biometric: "FACE_AUTH_SUCCESS",
      pramaanId: "JP-26-0713-8842",
      receiptId: "RLY-6F2A-8842",
      payloadHash: "sha256:9b1e...28c4",
      ageHours: 25,
      holdRemainingHours: null,
      attempts: 6,
      owner: "Pension office",
      reasonCode: null,
      safeguard: "PROPOSED_HOLD_ELIGIBLE",
      guideIndex: 0,
      events: [
        event("GENERATED", "Certificate generated", "Synthetic face authentication succeeded before the due date.", "13 Jul, 09:12"),
        event("AVAILABLE", "Handoff sealed", "A stable receipt and payload hash were created.", "13 Jul, 09:13", "info"),
        event("STALE", "T+1 acknowledgement overdue", "The same handoff was retried without creating a duplicate.", "14 Jul, 10:13", "warn"),
      ],
    }),
    guide: [
      { action: "ROUTE", label: "Request hold and route", help: "Open one exception case and request the proposed seven-day hold." },
      { action: "FETCH", label: "Record agency fetch", help: "Make receipt of the exact sealed payload visible." },
      { action: "ACCEPT", label: "Accept and close", help: "Return the decision and close the relay with a receipt." },
    ],
  },
  mismatch: {
    short: "PPO mismatch",
    tab: "Reason, repair, same history",
    title: "One field is wrong. The proof still survives.",
    description: "The agency fetched the synthetic certificate and returned a field-scoped PPO mismatch instead of a generic failure.",
    initial: () => ({
      scenario: "mismatch",
      stage: "PDA_FETCHED",
      certificateGenerated: true,
      generatedBeforeDueDate: true,
      biometric: "FACE_AUTH_SUCCESS",
      pramaanId: "JP-26-0814-8842",
      receiptId: "RLY-3DB9-8842",
      payloadHash: "sha256:17a6...b901",
      ageHours: 8,
      holdRemainingHours: null,
      attempts: 1,
      owner: "Pension office decision queue",
      reasonCode: null,
      safeguard: "AGENCY_DECISION_PENDING",
      guideIndex: 0,
      events: [
        event("GENERATED", "Certificate generated", "Synthetic biometric proof succeeded.", "14 Aug, 10:06"),
        event("FETCHED", "Agency fetched proof", "Receipt of the exact payload is visible.", "14 Aug, 12:31", "info"),
      ],
    }),
    guide: [
      { action: "REJECT", label: "Return PPO reason", help: "Reject with a field-scoped reason while preserving the original proof." },
      { action: "CORRECT", label: "Correct PPO field", help: "Create payload version 2 from one synthetic correction." },
      { action: "RESEND", label: "Retry same handoff", help: "Keep the receipt family and audit trail intact." },
      { action: "FETCH", label: "Record agency fetch", help: "Acknowledge receipt of the corrected payload." },
      { action: "ACCEPT", label: "Accept and close", help: "Return the final agency decision." },
    ],
  },
  fallback: {
    short: "Biometric fallback",
    tab: "Help first, never invent proof",
    title: "A failed capture is not a submitted certificate.",
    description: "The prototype keeps hold eligibility off until an assisted face capture actually generates a certificate.",
    initial: () => ({
      scenario: "fallback",
      stage: "CAPTURE_FAILED",
      certificateGenerated: false,
      generatedBeforeDueDate: false,
      biometric: "FINGERPRINT_FAILED",
      pramaanId: null,
      receiptId: "RLY-PENDING-8842",
      payloadHash: "not-sealed",
      ageHours: 0,
      holdRemainingHours: null,
      attempts: 0,
      owner: "Pensioner support",
      reasonCode: null,
      safeguard: "NOT_ELIGIBLE_NO_CERTIFICATE",
      guideIndex: 0,
      events: [event("CAPTURE_FAILED", "Fingerprint capture failed", "No certificate was generated or marked submitted.", "28 Nov, 09:02", "danger")],
    }),
    guide: [
      { action: "DOORSTEP", label: "Book assisted route", help: "Reserve a synthetic doorstep appointment without claiming submission." },
      { action: "FACE", label: "Complete face capture", help: "Generate proof only after assisted authentication succeeds." },
      { action: "FETCH", label: "Record agency fetch", help: "Make agency receipt visible." },
      { action: "ACCEPT", label: "Accept and close", help: "Complete the handoff." },
    ],
  },
  happy: {
    short: "Happy path",
    tab: "Generate, fetch, accept",
    title: "Ordinary success still earns a receipt.",
    description: "Start from draft and walk through generation, agency fetch, and acceptance without an exception.",
    initial: () => ({
      scenario: "happy",
      stage: "DRAFT",
      certificateGenerated: false,
      generatedBeforeDueDate: false,
      biometric: "NOT_STARTED",
      pramaanId: null,
      receiptId: "RLY-DRAFT-8842",
      payloadHash: "not-sealed",
      ageHours: 0,
      holdRemainingHours: null,
      attempts: 0,
      owner: "Pensioner",
      reasonCode: null,
      safeguard: "NOT_ELIGIBLE_NO_CERTIFICATE",
      guideIndex: 0,
      events: [event("DRAFT", "Synthetic journey ready", "No personal information is collected or stored.", "Now", "info")],
    }),
    guide: [
      { action: "GENERATE", label: "Generate mock certificate", help: "Simulate successful face authentication and seal the handoff." },
      { action: "FETCH", label: "Record agency fetch", help: "Make agency receipt visible." },
      { action: "ACCEPT", label: "Accept and close", help: "Return the decision and complete the relay." },
    ],
  },
};

function relayReducer(state: RelayState, action: { type: ActionType }): RelayState {
  if (action.type === "RESET") return scenarios[state.scenario].initial();
  const next = { ...state, events: [...state.events] };
  const add = (item: RelayEvent) => next.events.push(item);
  const stamp = "Demo, now";

  switch (action.type) {
    case "GENERATE":
      if (state.stage !== "DRAFT") return state;
      Object.assign(next, {
        stage: "AVAILABLE_TO_PDA",
        certificateGenerated: true,
        generatedBeforeDueDate: true,
        biometric: "FACE_AUTH_SUCCESS",
        pramaanId: "JP-26-1128-8842",
        receiptId: "RLY-8C4D-8842",
        payloadHash: "sha256:4c2a...b801",
        attempts: 1,
        owner: "Pension office",
        safeguard: "ON_TIME_WAITING",
      });
      add(event("GENERATED", "Certificate generated", "Synthetic face authentication succeeded before the due date.", stamp));
      add(event("AVAILABLE", "Handoff sealed", "A stable receipt and payload hash were created.", stamp, "info"));
      break;
    case "AGE":
      if (!["AVAILABLE_TO_PDA", "STALE_HANDOFF", "SUPPORT_ROUTED"].includes(state.stage)) return state;
      next.ageHours += 24;
      next.attempts += 1;
      if (state.stage === "SUPPORT_ROUTED") {
        next.holdRemainingHours = Math.max(0, (state.holdRemainingHours ?? 168) - 24);
        if (next.holdRemainingHours === 0) {
          next.stage = "HOLD_EXPIRED";
          next.safeguard = "HOLD_EXPIRED";
          add(event("HOLD_EXPIRED", "Proposed hold expired", "The limit was reached without renewal. The agency case remains open.", stamp, "danger"));
        } else add(event("HOLD_TICK", "Hold window advanced", `${Math.ceil(next.holdRemainingHours / 24)} days remain.`, stamp, "warn"));
      } else {
        next.stage = "STALE_HANDOFF";
        next.safeguard = "PROPOSED_HOLD_ELIGIBLE";
        add(event("RETRY", "T+1 update target reached", "The same handoff was retried without a duplicate.", stamp, "warn"));
      }
      break;
    case "ROUTE":
      if (state.stage !== "STALE_HANDOFF") return state;
      Object.assign(next, { stage: "SUPPORT_ROUTED", owner: "PDA exception desk", safeguard: "PROPOSED_CONTINUITY_HOLD", holdRemainingHours: 168 });
      add(event("ROUTED", "Hold requested and case routed", "One non-renewable administrative hold was requested with the original receipt.", stamp, "warn"));
      break;
    case "FETCH":
      if (!["AVAILABLE_TO_PDA", "STALE_HANDOFF", "SUPPORT_ROUTED", "HOLD_EXPIRED"].includes(state.stage)) return state;
      next.stage = "PDA_FETCHED";
      next.owner = "Pension office decision queue";
      if (state.safeguard !== "PROPOSED_CONTINUITY_HOLD") next.safeguard = "AGENCY_DECISION_PENDING";
      add(event("FETCHED", "Agency acknowledged fetch", "The exact sealed payload is in the agency decision queue.", stamp, "info"));
      break;
    case "ACCEPT":
      if (state.stage !== "PDA_FETCHED") return state;
      Object.assign(next, { stage: "ACCEPTED", owner: "Closed", safeguard: "VERIFIED", holdRemainingHours: 0, reasonCode: null });
      add(event("ACCEPTED", "Certificate accepted", "The agency decision returned to the citizen and closed the relay.", stamp));
      break;
    case "REJECT":
      if (state.stage !== "PDA_FETCHED") return state;
      Object.assign(next, { stage: "REJECTED", owner: "Pensioner, one field", reasonCode: "PPO_NUMBER_MISMATCH", safeguard: "ACTION_REQUIRED", holdRemainingHours: 0 });
      add(event("REJECTED", "Agency returned a reason code", "PPO_NUMBER_MISMATCH. The original proof and history remain intact.", stamp, "danger"));
      break;
    case "CORRECT":
      if (state.stage !== "REJECTED") return state;
      Object.assign(next, { stage: "CORRECTED", owner: "Relay outbox", reasonCode: null, payloadHash: "sha256:7a30...c921" });
      add(event("CORRECTED", "PPO field corrected", "One synthetic field created payload version 2.", stamp, "info"));
      break;
    case "RESEND":
      if (state.stage !== "CORRECTED") return state;
      Object.assign(next, { stage: "AVAILABLE_TO_PDA", owner: "Pension office", ageHours: 0, attempts: state.attempts + 1, safeguard: "ON_TIME_WAITING" });
      add(event("RESENT", "Corrected handoff retried", "The receipt family and audit trail were preserved.", stamp, "info"));
      break;
    case "DOORSTEP":
      if (state.stage !== "CAPTURE_FAILED") return state;
      Object.assign(next, { stage: "DOORSTEP_BOOKED", owner: "Assisted service channel" });
      add(event("ASSISTED_ROUTE", "Assisted route booked", "A synthetic slot is reserved. No certificate exists yet.", stamp, "info"));
      break;
    case "FACE":
      if (state.stage !== "DOORSTEP_BOOKED") return state;
      Object.assign(next, {
        stage: "AVAILABLE_TO_PDA",
        certificateGenerated: true,
        generatedBeforeDueDate: true,
        biometric: "ASSISTED_FACE_SUCCESS",
        pramaanId: "JP-26-1129-8842",
        receiptId: "RLY-FA19-8842",
        payloadHash: "sha256:b830...10f2",
        attempts: 1,
        owner: "Pension office",
        safeguard: "ON_TIME_WAITING",
      });
      add(event("GENERATED", "Certificate generated after assisted capture", "Only now does the relay seal a handoff.", stamp));
      break;
  }

  const guide = scenarios[state.scenario].guide[state.guideIndex];
  if (guide?.action === action.type) next.guideIndex = state.guideIndex + 1;
  return next;
}

const stageCopy: Record<Stage, { label: string; detail: string; tone: Tone }> = {
  DRAFT: { label: "Ready to begin", detail: "No certificate or handoff exists yet.", tone: "info" },
  CAPTURE_FAILED: { label: "No certificate generated", detail: "Choose an assisted route. Nothing is falsely marked submitted.", tone: "danger" },
  DOORSTEP_BOOKED: { label: "Assisted route booked", detail: "No certificate exists yet.", tone: "info" },
  AVAILABLE_TO_PDA: { label: "Available to agency", detail: "The pension office must fetch the sealed proof.", tone: "info" },
  STALE_HANDOFF: { label: "T+1 update overdue", detail: "The original proof remains preserved.", tone: "warn" },
  SUPPORT_ROUTED: { label: "Hold requested, case routed", detail: "A proposed hold and agency case are active.", tone: "warn" },
  HOLD_EXPIRED: { label: "Proposed hold expired", detail: "The case remains open without renewal.", tone: "danger" },
  PDA_FETCHED: { label: "Agency fetched proof", detail: "A clear decision is now due.", tone: "info" },
  REJECTED: { label: "One field needs attention", detail: "Repair the field without restarting.", tone: "danger" },
  CORRECTED: { label: "Correction ready", detail: "Retry the same handoff.", tone: "info" },
  ACCEPTED: { label: "Accepted", detail: "The agency decision is recorded.", tone: "ok" },
};

const safeguardCopy: Record<string, { title: string; body: string; tone: Tone }> = {
  ON_TIME_WAITING: { title: "No hold needed", body: "The agency is inside the synthetic 24-hour update window.", tone: "info" },
  AGENCY_DECISION_PENDING: { title: "Agency decision pending", body: "The sealed proof was fetched. Acceptance or a reason-coded rejection is still required.", tone: "info" },
  PROPOSED_HOLD_ELIGIBLE: { title: "Eligible for proposed hold", body: "An on-time certificate exists and the T+1 target is overdue.", tone: "warn" },
  PROPOSED_CONTINUITY_HOLD: { title: "Proposed seven-day hold active", body: "One non-renewable request is active. This is not current law or a payment guarantee.", tone: "warn" },
  HOLD_EXPIRED: { title: "Proposed hold expired", body: "The limit was reached and the unresolved agency case remains visible.", tone: "danger" },
  VERIFIED: { title: "Relay complete", body: "The pension agency accepted the certificate and returned the decision.", tone: "ok" },
  ACTION_REQUIRED: { title: "Action required", body: "The agency returned a reasoned mismatch. The original evidence remains preserved.", tone: "danger" },
  NOT_ELIGIBLE_NO_CERTIFICATE: { title: "No continuity claim", body: "No certificate has been generated. The prototype routes help but does not invent proof.", tone: "danger" },
};

const actionLabels: Record<ActionType, string> = {
  GENERATE: "Generate mock certificate",
  AGE: "Advance 24 hours",
  ROUTE: "Route support case",
  FETCH: "Agency fetches proof",
  ACCEPT: "Agency accepts",
  REJECT: "Reject with PPO reason",
  CORRECT: "Correct PPO field",
  RESEND: "Retry same handoff",
  DOORSTEP: "Book assisted visit",
  FACE: "Complete face capture",
  RESET: "Reset scenario",
};

function isEligible(stage: Stage, action: ActionType) {
  return {
    GENERATE: stage === "DRAFT",
    AGE: ["AVAILABLE_TO_PDA", "STALE_HANDOFF", "SUPPORT_ROUTED"].includes(stage),
    ROUTE: stage === "STALE_HANDOFF",
    FETCH: ["AVAILABLE_TO_PDA", "STALE_HANDOFF", "SUPPORT_ROUTED", "HOLD_EXPIRED"].includes(stage),
    ACCEPT: stage === "PDA_FETCHED",
    REJECT: stage === "PDA_FETCHED",
    CORRECT: stage === "REJECTED",
    RESEND: stage === "CORRECTED",
    DOORSTEP: stage === "CAPTURE_FAILED",
    FACE: stage === "DOORSTEP_BOOKED",
    RESET: true,
  }[action];
}

export function RelayApp({ messageVariant }: { messageVariant: "story" | "direct" }) {
  const [state, dispatch] = useReducer(relayReducer, undefined, scenarios.breach.initial);
  const [hindi, setHindi] = useState(false);
  const [answer, setAnswer] = useState<"correct" | "incorrect" | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function chooseScenario(key: ScenarioKey) {
    const next = scenarios[key].initial();
    dispatch({ type: "RESET" });
    if (key !== state.scenario) {
      // A scenario switch is a complete state replacement without persistence.
      window.history.replaceState(null, "", `#prototype`);
      setScenarioOverride(next);
    }
  }

  const [scenarioOverride, setScenarioOverride] = useState<RelayState | null>(null);
  const activeState = scenarioOverride ?? state;
  const activeScenario = scenarios[activeState.scenario];
  const activeStage = stageCopy[activeState.stage];
  const activeSafeguard = safeguardCopy[activeState.safeguard];
  const activeGuide = activeScenario.guide[activeState.guideIndex];
  const agencyResponse = activeState.stage === "ACCEPTED"
    ? "Accepted"
    : activeState.stage === "REJECTED"
      ? "Correction requested"
      : activeState.stage === "PDA_FETCHED"
        ? "Under review"
        : ["DRAFT", "CAPTURE_FAILED", "DOORSTEP_BOOKED"].includes(activeState.stage)
          ? "Not sent yet"
          : "Waiting for agency";

  function act(type: ActionType) {
    if (scenarioOverride) {
      setScenarioOverride(relayReducer(scenarioOverride, { type }));
    } else dispatch({ type });
  }

  return (
    <>
      <a className="skip-link" href="#prototype">Skip to prototype</a>
      <SiteHeader />

      <main id="top">
        <section className="hero relay-hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              {messageVariant === "direct"
                ? "Generated is not accepted. The handoff still needs an owner."
                : "A life certificate should not die between systems."}
            </h1>
            <p className="hero-deck">Pramaan Relay makes delivery to a pension agency traceable, retryable, and accountable.</p>
            <div className="hero-actions">
              <a className="button primary" href="#prototype">Run the T+1 journey <ArrowDown aria-hidden="true" /></a>
              <button className="button text-button" type="button" onClick={() => dialogRef.current?.showModal()}>
                See a proof receipt
              </button>
            </div>
            <p className="hero-boundary"><ShieldCheck aria-hidden="true" /> Independent prototype. Synthetic data only. No real Aadhaar, PPO, bank, OTP, biometric, or government API.</p>
          </div>
          <figure className="hero-visual">
            <Image
              src="/hero-pensioner.png"
              alt="Fictional elderly Indian woman holding a blank receipt and a smartphone in a home setting"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <figcaption>
              <span>One proof</span>
              <ArrowRight aria-hidden="true" />
              <span>One accountable handoff</span>
            </figcaption>
          </figure>
        </section>

        <section className="scenario-section shell" id="prototype" aria-labelledby="scenario-heading">
          <div className="section-intro">
            <div>
              <h2 id="scenario-heading">Four real-world situations. One clear next step.</h2>
              <p>Choose a situation, take the suggested action, and see who is responsible next.</p>
            </div>
            <span className="synthetic-note"><LockKey aria-hidden="true" /> Resets on refresh</span>
          </div>
          <div className="scenario-tabs" role="tablist" aria-label="Prototype scenarios">
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
              const item = scenarios[key];
              const selected = activeState.scenario === key;
              return (
                <button
                  key={key}
                  className="scenario-tab"
                  role="tab"
                  aria-selected={selected}
                  type="button"
                  onClick={() => chooseScenario(key)}
                >
                  <strong>{item.short}</strong>
                  <span>{item.tab}</span>
                </button>
              );
            })}
          </div>

          <div className="workspace">
            <article className="case-panel" aria-labelledby="case-title">
              <div className="case-heading">
                <div>
                  <span className={`status status-${activeStage.tone}`}>{activeStage.label}</span>
                  <h2 id="case-title">{activeScenario.title}</h2>
                  <p>{activeScenario.description}</p>
                </div>
                <button className="language-button" type="button" aria-pressed={hindi} onClick={() => setHindi((value) => !value)}>
                  {hindi ? "Hide Hindi" : "हिन्दी summary"}
                </button>
              </div>

              <div className="citizen-message" aria-live="polite">
                <Info weight="fill" aria-hidden="true" />
                <div>
                  <strong>{activeStage.detail}</strong>
                  <p>{activeSafeguard.body}</p>
                  {hindi ? <p lang="hi">प्रमाण पत्र बनना और पेंशन कार्यालय की स्वीकृति अलग चरण हैं। अगला जिम्मेदार पक्ष ऊपर दिखाया गया है।</p> : null}
                </div>
              </div>

              <dl className="case-facts">
                <div><dt><IdentificationCard aria-hidden="true" /> Pramaan ID</dt><dd>{activeState.pramaanId ?? "Not generated"}</dd></div>
                <div><dt><Receipt aria-hidden="true" /> Receipt</dt><dd>{activeState.receiptId}</dd></div>
                <div><dt><Clock aria-hidden="true" /> Handoff age</dt><dd>{activeState.ageHours ? `${activeState.ageHours} hours` : "Not started"}</dd></div>
                <div><dt><Path aria-hidden="true" /> Action owner</dt><dd>{activeState.owner}</dd></div>
              </dl>

              <section className="journey-runner" aria-labelledby="journey-title">
                <div className="runner-heading">
                  <div>
                    <h3 id="journey-title">See what happens next</h3>
                    <p>{activeGuide ? `Step ${activeState.guideIndex + 1} of ${activeScenario.guide.length}` : "Journey complete"}</p>
                  </div>
                  <span>{Math.round((activeState.guideIndex / activeScenario.guide.length) * 100)}%</span>
                </div>
                <div className="progress" aria-hidden="true"><span style={{ transform: `scaleX(${activeState.guideIndex / activeScenario.guide.length})` }} /></div>
                {activeGuide ? (
                  <div className="next-action">
                    <button className="button primary" type="button" onClick={() => act(activeGuide.action)}>
                      {activeGuide.label} <ArrowRight aria-hidden="true" />
                    </button>
                    <p>{activeGuide.help}</p>
                  </div>
                ) : (
                  <div className="complete-message"><Check weight="bold" aria-hidden="true" /> Journey complete. View the proof receipt or reset this situation.</div>
                )}
                <details className="free-play">
                  <summary>Explore other outcomes</summary>
                  <div className="action-grid">
                    {(Object.keys(actionLabels) as ActionType[]).map((type) => (
                      <button key={type} type="button" onClick={() => act(type)} disabled={!isEligible(activeState.stage, type)}>
                        {actionLabels[type]}
                      </button>
                    ))}
                  </div>
                </details>
              </section>

              <section className="timeline-wrap" aria-labelledby="timeline-title">
                <h3 id="timeline-title">What happened</h3>
                <ol className="timeline">
                  {activeState.events.map((item, index) => (
                    <li key={`${item.code}-${index}`} className={`event event-${item.tone}`}>
                      <span className="event-symbol" aria-hidden="true">{item.tone === "danger" ? <Warning /> : item.tone === "warn" ? <Clock /> : <Check />}</span>
                      <div><strong>{item.title}</strong><p>{item.detail}</p></div>
                      <time>{item.at}</time>
                    </li>
                  ))}
                </ol>
              </section>
            </article>

            <aside className="receipt-panel" aria-labelledby="receipt-heading">
              <div className={`safeguard safeguard-${activeSafeguard.tone}`}>
                <span>Citizen safeguard</span>
                <h3>{activeSafeguard.title}</h3>
                <p>{activeSafeguard.body}</p>
                {activeState.holdRemainingHours ? <strong>{Math.ceil(activeState.holdRemainingHours / 24)} days remain in this simulation</strong> : null}
              </div>
              <div className="receipt-heading">
                <div>
                  <span>Your proof receipt</span>
                  <h3 id="receipt-heading">{activeState.receiptId}</h3>
                </div>
                <Receipt aria-hidden="true" />
              </div>
              <dl className="receipt-fields">
                <div><dt>Current status</dt><dd>{activeStage.label}</dd></div>
                <div><dt>Agency response</dt><dd>{agencyResponse}</dd></div>
                <div><dt>Proof reference</dt><dd>{activeState.receiptId}</dd></div>
                <div><dt>Handoff age</dt><dd>{activeState.ageHours ? `${activeState.ageHours} hours` : "Not started"}</dd></div>
                <div><dt>Generated on time</dt><dd>{activeState.generatedBeforeDueDate ? "Yes" : "Not yet"}</dd></div>
                <div><dt>Next owner</dt><dd>{activeState.owner}</dd></div>
              </dl>
              <div className="receipt-actions">
                <button className="button secondary" type="button" onClick={() => dialogRef.current?.showModal()}><FileText aria-hidden="true" /> View receipt</button>
                <a className="button secondary" href="/mock-digital-life-certificate.pdf" download><DownloadSimple aria-hidden="true" /> Save as PDF</a>
              </div>
              <div className="receipt-explainer">
                <strong>Why this receipt matters</strong>
                <p>It keeps one stable reference across retries, records the agency response separately, and contains synthetic data only.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="understanding" aria-labelledby="understanding-title">
          <div className="shell understanding-grid">
            <div>
              <h2 id="understanding-title">One-minute understanding check</h2>
              <p>If a Digital Life Certificate is generated, has the pension agency necessarily accepted it?</p>
            </div>
            <div className="answer-buttons">
              <button type="button" onClick={() => setAnswer("incorrect")}>Yes, generation is enough</button>
              <button type="button" onClick={() => setAnswer("correct")}>No, agency acceptance is separate</button>
              <div className="answer-feedback" aria-live="polite">
                {answer === "correct" ? <><Check weight="bold" /> Correct. Generated, fetched, and accepted remain separate states.</> : null}
                {answer === "incorrect" ? <><X weight="bold" /> Not quite. The agency still needs to fetch and decide.</> : null}
              </div>
            </div>
          </div>
        </section>

        <section className="evidence shell" id="evidence" aria-labelledby="evidence-title">
          <div className="evidence-lead">
            <h2 id="evidence-title">Evidence before features.</h2>
            <p>Official sources establish the handoff. The seven-day safeguard remains a clearly labelled policy proposal.</p>
            <a href="/evidence">Read the source and confidence register <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="evidence-list">
            <article>
              <span>Official FAQ</span>
              <h3>Generation is not acceptance.</h3>
              <p>A generated certificate becomes available to the PDA but remains subject to agency approval.</p>
              <a href="https://jeevanpramaan.gov.in/v2.0/misc/faq" target="_blank" rel="noreferrer">Jeevan Pramaan FAQ</a>
            </article>
            <article>
              <span>DoPPW direction</span>
              <h3>T+1 needs a visible outcome.</h3>
              <p>The represented direction expects record updates and acceptance or rejection messaging on T+1.</p>
              <a href="https://www.staffnews.in/wp-content/uploads/2025/02/SMS-to-pensioners-regarding-submission-of-Digital-Life-Certificate.pdf" target="_blank" rel="noreferrer">Signed memorandum mirror</a>
            </article>
            <article>
              <span>Proposed policy</span>
              <h3>The hold is bounded by design.</h3>
              <p>One request, seven days maximum, no renewal, and three exits: accept, reasoned reject, or expire.</p>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />

      <dialog className="receipt-dialog" ref={dialogRef} onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="dialog-card">
          <div className="dialog-heading">
            <div><span>Proof receipt</span><h2>{activeState.receiptId}</h2></div>
            <button type="button" aria-label="Close receipt" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button>
          </div>
          <p className="dialog-summary">This paper-style receipt shows what happened and who needs to act next.</p>
          <dl className="dialog-fields">
            <div><dt>Current status</dt><dd>{activeStage.label}</dd></div>
            <div><dt>Pramaan ID</dt><dd>{activeState.pramaanId ?? "Not generated"}</dd></div>
            <div><dt>Agency response</dt><dd>{agencyResponse}</dd></div>
            <div><dt>Next action owner</dt><dd>{activeState.owner}</dd></div>
            <div><dt>Generated on time</dt><dd>{activeState.generatedBeforeDueDate ? "Yes" : "Not yet"}</dd></div>
            <div><dt>Last known update</dt><dd>{activeState.events.at(-1)?.title ?? "No update yet"}</dd></div>
          </dl>
          <div className="dialog-actions">
            <a className="button primary" href="/mock-digital-life-certificate.pdf" download><DownloadSimple aria-hidden="true" /> Download mock certificate PDF</a>
          </div>
        </div>
      </dialog>
    </>
  );
}
