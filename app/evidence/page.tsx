import { ArrowRight, BookOpenText, Buildings, Check, Lightbulb, Warning } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Evidence and Limits | Pramaan Relay",
  description: "Sources, confidence labels, and policy boundaries behind the Pramaan Relay prototype.",
};

export default function EvidencePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <main id="main">
        <section className="page-hero page-hero-grid shell">
          <div>
            <span className="eyebrow">Evidence and limits</span>
            <h1>Official facts stay separate from proposed safeguards.</h1>
            <p>This prototype uses official material to model the handoff, while labelling the seven-day hold as a proposal.</p>
            <Link className="button primary" href="/relay">See it in action <ArrowRight aria-hidden="true" /></Link>
          </div>
          <aside className="evidence-overview" aria-label="Evidence summary">
            <div><BookOpenText aria-hidden="true" /><span>Official FAQ</span><strong>Generation and acceptance are separate</strong><small>Supported</small></div>
            <div><Buildings aria-hidden="true" /><span>Department direction</span><strong>A visible T+1 outcome is expected</strong><small>Supported</small></div>
            <div><Lightbulb aria-hidden="true" /><span>Prototype policy</span><strong>Seven-day hold stays bounded</strong><small className="is-proposed">Proposed</small></div>
          </aside>
        </section>
        <section className="page-section shell source-register">
          <article>
            <div className="source-visual"><BookOpenText aria-hidden="true" /><div className="source-status supported"><Check aria-hidden="true" /> Supported</div></div>
            <div><span>Official FAQ</span><h2>Generation is not acceptance.</h2><p>A generated Digital Life Certificate becomes available to the Pension Disbursing Agency and is still subject to agency approval.</p><a href="https://jeevanpramaan.gov.in/v2.0/misc/faq" target="_blank" rel="noreferrer">Read the Jeevan Pramaan FAQ</a></div>
          </article>
          <article>
            <div className="source-visual"><Buildings aria-hidden="true" /><div className="source-status supported"><Check aria-hidden="true" /> Supported</div></div>
            <div><span>Department direction</span><h2>T+1 should have a visible outcome.</h2><p>The represented direction expects record updates and acceptance or rejection messaging on the following day.</p><a href="https://www.staffnews.in/wp-content/uploads/2025/02/SMS-to-pensioners-regarding-submission-of-Digital-Life-Certificate.pdf" target="_blank" rel="noreferrer">Read the signed memorandum mirror</a></div>
          </article>
          <article>
            <div className="source-visual"><Lightbulb aria-hidden="true" /><div className="source-status proposed"><Warning aria-hidden="true" /> Proposed</div></div>
            <div><span>Prototype policy</span><h2>A bounded seven-day hold.</h2><p>One request, seven days maximum, no renewal, and three exits: accept, reasoned rejection, or expiry. This is not presented as current law.</p></div>
          </article>
        </section>
        <section className="policy-band">
          <div className="shell split-heading"><h2>Full research notes are available.</h2><div><p>The source register includes confidence labels, implementation boundaries, and unresolved questions.</p><a className="text-link" href="/evidence.md">Open the detailed evidence register <ArrowRight aria-hidden="true" /></a></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
