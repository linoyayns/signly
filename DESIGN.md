# Stripe-Inspired Design System — Signly

Source: github.com/VoltAgent/awesome-design-md

## Core Visual Identity

The signature feature is a **gradient mesh backdrop** in the hero section, blending indigo, lavender, and soft pink atmospherically. This provides instant brand recognition while supporting content below on clean white surfaces.

**Primary accent:** Indigo `#533afd` — used exclusively for filled buttons and key highlights.
**Body text:** Deep navy `#0d253d` / dark slate `#0F172A`.
**Background:** White `#FFFFFF` with atmospheric gradient overlays.

## Gradient Mesh (Hero)

```css
background:
  radial-gradient(ellipse at 20% 50%, rgba(83,58,253,0.18) 0%, transparent 55%),
  radial-gradient(ellipse at 85% 15%, rgba(236,72,153,0.12) 0%, transparent 45%),
  radial-gradient(ellipse at 65% 85%, rgba(99,102,241,0.1) 0%, transparent 50%),
  #FAFAFA;
```

## Typography

Heebo (Hebrew) with tight negative letter-spacing on display sizes:
- H1: `letter-spacing: -2px`, `font-weight: 900`
- H2: `letter-spacing: -1px`, `font-weight: 900`
- Numbers/currency: `font-variant-numeric: tabular-nums`

## Buttons

**Pill geometry:** `border-radius: 9999px`
**Primary:** `background: #533afd`, `color: white`
**Padding:** `8px 24px` (small), `14px 32px` (large)

## Cards

- `border-radius: 12px`
- `padding: 28px 24px`
- `border: 1px solid #E2E8F0`
- Hover: lift + soft indigo shadow

## Color Tokens

```
--indigo:   #533afd
--navy:     #0F172A  
--slate:    #64748B
--border:   #E2E8F0
--surface:  #F8FAFC
```
