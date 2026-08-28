import { DownloadSimple, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image src="/pramaan-relay-logo.png" alt="" width={44} height={44} priority />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav">
        <Link className="brand" href="/" aria-label="Pramaan Relay home">
          <BrandMark />
          <span>Pramaan Relay</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/relay">Live relay</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/evidence">Evidence</Link>
          <Link className="nav-cta" href="/relay">Try the relay</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><BrandMark /><strong>Pramaan Relay</strong></div>
        <p>Independent research prototype. Not affiliated with MeitY, NIC, Jeevan Pramaan, EPFO, any bank, pension authority, or the Government of India.</p>
        <span><GlobeHemisphereWest aria-hidden="true" /> Free and synthetic</span>
      </div>
      <div className="shell footer-links">
        <Link href="/relay">Live relay</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/evidence">Evidence</Link>
        <a href="/mock-digital-life-certificate.pdf" download><DownloadSimple aria-hidden="true" /> Mock certificate PDF</a>
      </div>
    </footer>
  );
}
