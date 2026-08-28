import { ArrowRight, Check, Clock, DownloadSimple, Path, Receipt } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "How It Works | Pramaan Relay",
  description: "A plain-language guide to accountable Digital Life Certificate handoffs.",
};

const steps = [
  { icon: Receipt, number: "01", title: "Certificate generated", body: "A fictional certificate receives a proof reference and becomes ready for the pension office." },
  { icon: Path, number: "02", title: "Handoff made visible", body: "The prototype shows whether the office can fetch it, how long it has waited, and who owns the next action." },
  { icon: Check, number: "03", title: "Decision recorded", body: "Acceptance or a reason for correction is recorded separately from generation." },
  { icon: Clock, number: "04", title: "Recovery stays bounded", body: "If the target is missed, support routing and a one-time seven-day hold are demonstrated as policy proposals." },
];

export default function HowItWorksPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <main id="main">
        <section className="page-hero page-hero-grid shell">
          <div>
            <span className="eyebrow">How it works</span>
            <h1>Proof moves in steps. Each step needs an owner.</h1>
            <p>Pramaan Relay separates certificate creation, agency pickup, and agency decision so people can understand what has actually happened.</p>
            <Link className="button primary" href="/relay">Try the relay <ArrowRight aria-hidden="true" /></Link>
          </div>
          <aside className="relay-map" aria-label="Certificate relay overview">
            <div><Receipt aria-hidden="true" /><span><small>Step 1</small><strong>Certificate generated</strong></span></div>
            <i aria-hidden="true" />
            <div><Path aria-hidden="true" /><span><small>Step 2</small><strong>Agency receives it</strong></span></div>
            <i aria-hidden="true" />
            <div><Check aria-hidden="true" /><span><small>Step 3</small><strong>Decision is visible</strong></span></div>
          </aside>
        </section>
        <section className="page-section shell process-list" aria-label="Relay steps">
          {steps.map(({ icon: Icon, number, title, body }) => (
            <article key={number}>
              <span>{number}</span><Icon aria-hidden="true" /><div><h2>{title}</h2><p>{body}</p></div>
            </article>
          ))}
        </section>
        <section className="policy-band">
          <div className="shell split-heading">
            <h2>What the prototype does not claim.</h2>
            <div className="plain-list">
              <p>No government affiliation or live integration.</p>
              <p>No legal guarantee that a pension payment will continue.</p>
              <p>No real Aadhaar, PPO, bank, OTP, or biometric information.</p>
              <p>The seven-day hold is a simulated policy proposal, not current law.</p>
            </div>
          </div>
        </section>
        <section className="page-section shell download-card">
          <div><span className="eyebrow">Take a closer look</span><h2>Download the mock certificate.</h2><p>A polished A4 PDF using fictional data and an unmistakable demonstration notice.</p></div>
          <a className="button primary" href="/mock-digital-life-certificate.pdf" download><DownloadSimple aria-hidden="true" /> Download PDF</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
