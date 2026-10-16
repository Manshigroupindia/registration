---
name: Imperial Grandeur
colors:
  surface: '#17130f'
  surface-dim: '#17130f'
  surface-bright: '#3e3834'
  surface-container-lowest: '#110d0a'
  surface-container-low: '#1f1b17'
  surface-container: '#231f1b'
  surface-container-high: '#2e2925'
  surface-container-highest: '#393430'
  on-surface: '#ebe1da'
  on-surface-variant: '#d2c5af'
  inverse-surface: '#ebe1da'
  inverse-on-surface: '#352f2b'
  outline: '#9a8f7b'
  outline-variant: '#4e4635'
  surface-tint: '#f1c047'
  primary: '#f2c148'
  on-primary: '#3f2e00'
  primary-container: '#d4a62e'
  on-primary-container: '#533d00'
  inverse-primary: '#785a00'
  secondary: '#ffb4aa'
  on-secondary: '#690003'
  secondary-container: '#ad020c'
  on-secondary-container: '#ffb8af'
  tertiary: '#dfc684'
  on-tertiary: '#3d2f00'
  tertiary-container: '#c2ab6b'
  on-tertiary-container: '#4f3f09'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdf9b'
  primary-fixed-dim: '#f1c047'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4300'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930007'
  tertiary-fixed: '#fae09c'
  tertiary-fixed-dim: '#ddc482'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#55450f'
  background: '#17130f'
  on-background: '#ebe1da'
  surface-variant: '#393430'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: 0.04em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: 0.03em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: 0.03em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0.01em
  title-lg:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the electric prestige of high-fashion runways and gala awards. Rooted in cinematic drama and high-society couture, it balances regal Bollywood opulence with modern luxury editorial polish.

### Design Principles
- **Ceremonial Drama**: Interfaces evoke an evening red-carpet atmosphere, balancing deep black velvet canvases against sharp metallic accents and luminescent radial halos.
- **Sculpted Precision**: Every element combines razor-sharp editorial serifs with tactile, softly contoured containers and metallic gold borders.
- **Commanding Presence**: Visual elements celebrate royalty, pageantry, and high-fashion poise without crossing into clutter, relying on high-contrast text hierarchies, measured tracking, and deliberate golden glows.

## Colors

The palette reproduces the lighting of an exclusive gala stage: absolute obsidian darkness pierced by spotlights, metallic gold foil, and deep royal red accents.

### Palette Architecture
- **Primary Canvas (`#090604`)**: Deep obsidian velvet black used for the foundational root canvas.
- **Secondary Canvas (`#17100B`)**: Charcoal with warm undertones used for alternating content sections and table headers.
- **Surface & Cards (`#140E0A`)**: Rich obsidian onyx engineered to support warm gold hairline framing.
- **Primary Gold (`#D4A62E`)**: Metallic brushed gold for primary CTAs, active states, key icons, and crest badges.
- **Highlight Gold (`#FFE5A0`)**: Champagne luminescence used for gold shimmer accents, spotlight gradients, and active hover halos.
- **Royal Crimson (`#B70F12`)**: Couture red reserved for gala alerts, VIP statuses, voting highlights, and high-impact micro-accents.
- **Ivory (`#FFF9ED`)**: Primary text color, offering warmth and contrast against dark surfaces without the starkness of pure white.
- **Champagne Dust (`#CBB69D`)**: Secondary body, labels, metadata, and placeholder text.

## Typography

The pairing creates an immediate editorial hierarchy: high-fashion editorial display serifs for ceremonial grandeur, paired with clean humanist sans-serif type for functional clarity and legibility.

### Hierarchy & Treatment
- **Headlines & Titles**: Rendered in **Playfair Display**. Titles use widened letter-spacing (`0.02em` to `0.08em`) and sentence case or uppercase styling to reinforce a gala brochure and certificate aesthetic.
- **Body & Captions**: Rendered in **Plus Jakarta Sans**. Ensures contestant bios, scoring sheets, voting instructions, and criteria remain legible against deep obsidian backdrops.
- **Sub-caps & Kicker Labels**: Set in uppercase using `label-sm` or `label-md` with `0.1em` tracking to create royal badges, nominee categories, and jury titles.

## Layout & Spacing

Layouts use an editorial 12-column grid system framed with generous perimeter margins that mimic runway stages and gallery brochures.

### Breakpoints & Adaptive Rhythm
- **Desktop (1200px+)**: 12-column fluid grid, 48px canvas margin, 24px gutters. Editorial split layouts allow large portrait cards for contestants to sit next to judging criteria.
- **Tablet (768px – 1199px)**: 8-column grid, 32px margins, 20px gutters. Multi-column cards shift from 3-across to 2-across with preserved card proportions.
- **Mobile (< 768px)**: 4-column grid, 20px margins, 16px gutters. Hero banners convert to full-bleed stage portraits with bottom-anchored voting and detail ribbons.

### Density & Whitespace
Vertical rhythm relies on extended rhythmic bands (`space-xl` and higher) to separate competition categories, award titles, and pageant sponsors, giving each section ceremony-grade presentation.

## Elevation & Depth

Visual hierarchy uses ambient gold lighting and tinted glass planes rather than standard dark dropshadows.

### Lighting & Shadow Rules
- **Base Level (Canvas)**: `#090604` enriched with soft radial spotlights (`radial-gradient(ellipse at center, rgba(212, 166, 46, 0.08) 0%, rgba(9, 6, 4, 0) 70%)`).
- **Elevated Surfaces (Cards, Panels)**: `#140E0A` paired with a delicate hairline gold border (`border: 1px solid rgba(212, 166, 46, 0.25)`).
- **Floating Modals & Gala Overlays**: Layered backdrops using `backdrop-filter: blur(16px)` over `rgba(20, 14, 10, 0.85)` framed by an inner double border (`box-shadow: inset 0 0 0 1px rgba(212, 166, 46, 0.4), inset 0 0 0 4px rgba(9, 6, 4, 0.8)`).
- **Gilded Shadows**: Raised components cast diffused gold glows:
  - Low Elevation: `0 4px 20px rgba(0, 0, 0, 0.8), 0 0 12px rgba(212, 166, 46, 0.08)`
  - High Elevation (Active Modals, Crowns, Badges): `0 12px 40px rgba(0, 0, 0, 0.9), 0 0 28px rgba(212, 166, 46, 0.22)`

## Shapes

The geometry balances soft, approachable corners with royal structural discipline. Roundedness is keyed to level `2`, giving core cards and inputs 8px (`0.5rem`) base radii, while category badges, voting pills, and CTAs transition into pill-shaped profiles.

### Edge Details
- **Card Containers**: 8px corner radii (`rounded`) with subtle 1px metallic framing.
- **VIP Badges, Seals, & Buttons**: Fully rounded pill profiles (`9999px`) provide contrast to the sharp serif headlines.
- **Award Frame Double Outlines**: Premium contestant showcases incorporate dual nesting outlines—an outer hairline gold rim, a 3px dark negative buffer, and an interior hairline accent.

## Components

### Buttons & Action Controls
- **Primary Gala CTA**: Pill-shaped button featuring a brushed metallic linear gradient from `#FFE5A0` to `#D4A62E`, styled with bold dark obsidian text (`#090604`), and elevated by a soft champagne outer glow.
- **Secondary Royal Action**: Pill-shaped with dark charcoal background (`#17100B`), a 1px border of `#D4A62E`, and ivory text. On hover, the border shifts to `#FFE5A0` with an inset metallic glow.
- **Crimson VIP Action**: Pill-shaped CTA in royal crimson (`#B70F12`) with white ivory typography, reserved for high-priority voting submissions and coronation triggers.

### Badges, Seals & Category Pills
- **Nominee Category Pills**: Compact pill indicators rendered in semi-transparent `#140E0A` with `rgba(212, 166, 46, 0.35)` borders, tracking uppercase text (`label-sm`).
- **Royal Verification Checkmark**: A circular metallic gold medallion containing an obsidian checkmark or crown glyph, applied beside certified contestants, sponsors, and jury leaders.

### Cards & Contestant Portfolios
- **Showcase Cards**: `#140E0A` background with 8px radius, framed by a 1px warm gold outline (`rgba(212, 166, 46, 0.2)`). The image container sits flush at the top with a gradient scrim overlay running upward from the card body to support ivory nameplates and vote counts.

### Form Inputs & Selectors
- **Text Fields**: Subtle charcoal background (`#17100B`) with 8px corner radius, inset padding of `12px 16px`, and an idle border of `rgba(212, 166, 46, 0.25)`. Focus transitions border to `#FFE5A0` with an outer `0 0 8px rgba(212, 166, 46, 0.3)` aura.
- **Selection Controls (Checkboxes & Radios)**: Circular or square frames outlined in `#D4A62E`. Selected states fill with gold gradient and feature deep black icons.

### Lists & Leaderboards
- **Ranking Rows**: Alternating rows styled with `#140E0A` on dark backgrounds, separated by golden hairline dividers (`rgba(212, 166, 46, 0.1)`). Top 3 ranks display custom metallic crown badges (Gold, Silver, Bronze) with Playfair numeral typography.