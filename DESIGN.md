---
name: Pramaan Relay
description: A trust-first civic interface for accountable Digital Life Certificate handoffs.
colors:
  civic-ink: "oklch(0.25 0.035 165)"
  civic-ink-soft: "oklch(0.42 0.035 165)"
  page-ground: "oklch(0.975 0.008 80)"
  surface: "oklch(0.995 0.004 80)"
  deep-green: "oklch(0.34 0.075 162)"
  action-coral: "oklch(0.46 0.14 34)"
  evidence-line: "oklch(0.82 0.018 80)"
typography:
  display:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(3rem, 5.2vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  data:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.82rem"
    fontWeight: 600
rounded:
  sm: "9px"
  surface: "14px"
  pill: "999px"
spacing:
  control: "8px"
  group: "16px"
  section: "74px"
components:
  button-primary:
    backgroundColor: "{colors.action-coral}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 20px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.civic-ink}"
    rounded: "{rounded.surface}"
    padding: "34px"
---

# Design System: Pramaan Relay

## Overview

**Creative North Star: "The Accountable Receipt"**

Pramaan Relay combines the clarity of a public-service form with the evidence density of a transaction receipt. The visual system is calm and editorial at the top, then becomes more compact and operational as the reviewer enters the state machine.

The interface avoids government imitation. Trust comes from explicit owners, timestamps, reason codes, bounded claims, and a documentary image of a fictional citizen rather than seals or official-looking chrome.

**Key Characteristics:**

- Citizen language beside machine evidence.
- Deep green carries authority; coral is reserved for the next action.
- Flat surfaces, crisp rules, and restrained rounding.
- Monospace is limited to IDs, state, hashes, time, and evidence metadata.

## Colors

The palette preserves the incumbent deep-green/coral identity against a near-neutral ground. Status tints stay pale enough for large fields while their text uses a darker hue-matched value.

**The One Action Color Rule.** Coral identifies the primary next step. It does not decorate cards, headings, or status labels.

**The Evidence Contrast Rule.** Text on tinted status fields uses a darker shade of that status hue rather than generic gray.

## Typography

**Display Font:** IBM Plex Sans
**Body Font:** IBM Plex Sans
**Label/Mono Font:** IBM Plex Mono

IBM Plex gives the interface institutional clarity without borrowing an official government design system. The mono face distinguishes immutable evidence from explanatory prose.

### Hierarchy

- **Display** (700, fluid up to 5.5rem, 0.98): hero thesis only.
- **Headline** (700, fluid 2-3.6rem, 1.04-1.05): major sections and case state.
- **Title** (650-700, 1.1-1.35rem): panels and evidence entries.
- **Body** (400, 1rem, 1.55): explanation, capped near 65 characters where practical.
- **Data** (600, 0.68-0.82rem): receipt IDs, hashes, stage values, timestamps, and compact labels.

**The Evidence Type Rule.** Mono is functional, never atmospheric.

## Layout

The page uses a centered 1180px shell. The first viewport is an asymmetric copy/image split. The prototype uses a wide case panel plus a 360px sticky receipt. Below 760px, every multi-column region becomes a single column, the receipt loses stickiness, and scenario tabs become a horizontal scroll-snap strip.

Spacing follows an 8px rhythm inside controls and 16-32px grouping inside panels. Major sections use 64-96px vertical separation.

## Elevation & Depth

The system is flat by default. Hierarchy comes from tonal fields, borders, and sticky position rather than shadows. Backdrop blur is reserved for the sticky site header and modal scrim where separation has a functional purpose.

**The Flat Evidence Rule.** Receipts and case facts use one-pixel rules, not decorative drop shadows.

## Shapes

Primary surfaces use 14px corners, compact internal fields use 9px, and buttons/status controls may be full pills. These three roles do not mix.

## Components

### Buttons

- **Primary:** coral field, off-white text, full pill, 48px minimum height.
- **Secondary:** transparent with one-pixel neutral border.
- **Hover / Focus:** darker civic ink on hover; three-pixel blue focus ring outside the control.

### Cards / Containers

- **Corner Style:** restrained soft corners (14px).
- **Background:** off-white surface against a near-neutral page.
- **Shadow Strategy:** none at rest.
- **Border:** one-pixel evidence line.
- **Internal Padding:** 18-34px depending on viewport.

### Navigation

Desktop uses one line with two text links and one pill action. Mobile keeps the brand and primary journey action, hiding secondary links.

### Atomic Receipt

The receipt pairs a hue-coded safeguard field with monospaced transaction details. It remains visually separate from the citizen explanation but updates from the same reducer state.

## Do's and Don'ts

### Do:

- **Do** keep generated, fetched, accepted, and rejected visually and verbally distinct.
- **Do** pair every status color with explicit text and an icon where applicable.
- **Do** keep the independent-prototype and synthetic-data boundary visible.
- **Do** reserve documentary photography for human context, not proof of identity.

### Don't:

- **Don't** use government emblems, flag motifs, or affiliation-like navigation.
- **Don't** turn the experience into a generic dashboard or chatbot.
- **Don't** use gradient text, decorative glass, wide soft shadows, or oversized card radii.
- **Don't** use real identity, pension, bank, OTP, or biometric data.
