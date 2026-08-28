import { ArrowRight, Check, DownloadSimple, Path, Receipt, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

type PageProps = { searchParams: Promise<{ variant?: string }> };

export default async function Home({ searchParams }: PageProps) {
  const { variant } = await searchParams;
  const direct = variant === "direct";

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader />
      <main id="main">
        <section className="home-hero shell">
          <div className="hero-copy">
            <span className="eyebrow">Independent public prototype</span>
            <h1>{direct ? "Know exactly where a life certificate is waiting." : "A life certificate should not disappear between systems."}</h1>
            <p className="hero-deck">Pramaan Relay gives every digital certificate handoff a visible status, a responsible owner, and a clear recovery path.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/relay">Try the live relay <ArrowRight aria-hidden="true" /></Link>
              <a className="button secondary" href="/mock-digital-life-certificate.pdf" download><DownloadSimple aria-hidden="true" /> Download mock certificate</a>
            </div>
            <p className="hero-boundary"><ShieldCheck aria-hidden="true" /> Synthetic data only. No real personal information, biometrics, or government systems.</p>
          </div>
          <figure className="hero-visual home-visual">
            <Image src="/hero-pensioner.png" alt="Fictional elderly Indian woman holding a blank receipt and smartphone at home" fill priority sizes="(max-width: 760px) 100vw, 50vw" />
            <figcaption><span>Certificate generated</span><ArrowRight aria-hidden="true" /><span>Agency decision visible</span></figcaption>
          </figure>
        </section>

        <section className="page-section shell" aria-labelledby="problem-title">
          <div className="section-kicker">The missing middle</div>
          <div className="split-heading">
            <h2 id="problem-title">Generated is not the same as accepted.</h2>
            <p>A certificate can be created successfully while the pension office has not fetched or accepted it. Pramaan Relay makes that gap understandable.</p>
          </div>
          <div className="feature-grid">
            <article><Receipt aria-hidden="true" /><h3>One proof reference</h3><p>The same receipt follows the handoff through retries, review, and the final decision.</p></article>
            <article><Path aria-hidden="true" /><h3>One next owner</h3><p>The page says whether the citizen, service point, or pension office needs to act.</p></article>
            <article><Check aria-hidden="true" /><h3>One visible outcome</h3><p>Acceptance, a reason for correction, or an expired safeguard is shown in plain language.</p></article>
          </div>
        </section>

        <section className="dark-band">
          <div className="shell callout-grid">
            <div><span>Try all four situations</span><h2>Silent agency, correction, biometric fallback, and a happy path.</h2></div>
            <Link className="button light" href="/relay">Open the live relay <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="page-section shell paper-showcase">
          <div>
            <span className="eyebrow">Visual proof, not raw data</span>
            <h2>A receipt people can actually read.</h2>
            <p>The public view looks like a familiar paper receipt. Status, response, and next owner stay visible without exposing technical payloads.</p>
            <a className="button primary" href="/mock-digital-life-certificate.pdf" download><DownloadSimple aria-hidden="true" /> Download the PDF</a>
          </div>
          <article className="paper-preview" aria-label="Preview of a synthetic proof receipt">
            <div className="paper-brand"><span className="paper-logo"><Receipt aria-hidden="true" /></span><div><strong>Pramaan Relay</strong><small>Synthetic proof receipt</small></div><b>DEMO</b></div>
            <div className="paper-title"><span>Status</span><strong>Waiting for agency</strong></div>
            <dl>
              <div><dt>Proof reference</dt><dd>RLY-6F2A-8842</dd></div>
              <div><dt>Certificate</dt><dd>Generated on time</dd></div>
              <div><dt>Agency response</dt><dd>Not received yet</dd></div>
              <div><dt>Next owner</dt><dd>Pension office</dd></div>
            </dl>
            <p><ShieldCheck aria-hidden="true" /> Fictional data for demonstration only</p>
          </article>
        </section>

        <section className="page-section shell compact-section">
          <div className="split-heading">
            <h2>Built for trust, with clear limits.</h2>
            <div className="plain-list">
              <p><Check aria-hidden="true" /> Public and usable without an account</p>
              <p><Check aria-hidden="true" /> Mobile-friendly and keyboard accessible</p>
              <p><Check aria-hidden="true" /> Mock certificate available as PDF</p>
              <p><Check aria-hidden="true" /> Seven-day hold clearly labelled as a proposal</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
