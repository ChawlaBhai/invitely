# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
./node_modules/.bin/next dev --port 3001   # Dev server
./node_modules/.bin/next build             # Build
cp .env.example .env.local                 # Setup env
```

## Project Vision

Animated, scrollytelling wedding and birthday invitation cards. The invitation IS the celebration beginning — not a static card, but an immersive one-page experience. India-first, WhatsApp-first, B2B cross-sell to wedding planners.

## Design North Star

**If you removed all the text, would this still feel like something?** If yes, the template is working.

## Stack

Next.js 16 · GSAP + ScrollTrigger · Lenis smooth scroll · @vercel/og (OG/Story/PWA images) · Resend (email) · Supabase (prod store) · Razorpay (payments) · qrcode · nanoid · Tailwind v4

**Font rule**: always inline `style={{ fontFamily: "'Playfair Display', serif" }}` — Tailwind font classes don't work for Google Fonts.

## Environment Variables (see `.env.example`)

| Var | Purpose |
|---|---|
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Activates Supabase store (blank = local file store) |
| `RESEND_API_KEY` | RSVP email notifications |
| `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` | Payment processing |
| `ADMIN_PASSWORD` | Basic Auth for /admin (default: `invitely2025`) |
| `NEXT_PUBLIC_BASE_URL` | Used in OG images and share links |

## Tier System

| Tier | Price | Validity | Key Features |
|---|---|---|---|
| Classic | ₹999 | 90 days | All templates, RSVP, QR, watermark |
| Premium | ₹2,499 | 1 year | No watermark, custom slug/color/fonts, password, music, photos, RSVP emails |
| Luxury | ₹4,999 | 2 years | White-label, priority support |
| Planner | ₹14,999/mo | Unlimited | Unlimited invites, client dashboard |

`isPremium = tier === 'premium' || tier === 'luxury'` — gated in `/i/[slug]/page.tsx`.

## All Routes

**Pages**: `/` · `/builder` · `/for-planners` · `/pricing` · `/my-invites` · `/terms` · `/privacy` · `/payment-success` · `/preview/[templateId]` · `/i/[slug]` · `/edit/[slug]` · `/dashboard/[slug]` · `/admin` · `/wedding-invitation-maker` · `/birthday-invitation-maker` · `/whatsapp-wedding-invitation`

**APIs**: `/api/invites` (POST) · `/api/invites/[slug]` (PUT) · `/api/invites/[slug]/duplicate` (POST) · `/api/invites/[slug]/extend` (PUT) · `/api/rsvp` (POST, rate-limited) · `/api/rsvp/[slug]` (GET CSV) · `/api/og/[slug]` (PNG 1200×630) · `/api/story/[slug]` (PNG 1080×1920) · `/api/upload` (POST, rate-limited, 5MB limit) · `/api/slug-check` (GET) · `/api/slug-rename` (POST) · `/api/contact` (POST) · `/api/invite-auth` (POST) · `/api/payment/create-order` (POST, discount codes) · `/api/payment/verify` (POST) · `/api/stats` (GET) · `/api/qr` (GET SVG) · `/api/subscribe` (POST) · `/api/discount/validate` (GET)

**Dynamic**: `/icon-192.png` · `/icon-512.png` · `/manifest.webmanifest` · `/robots.txt` · `/sitemap.xml`

## 18 Templates

| ID | Name | Category | Accent |
|---|---|---|---|
| `wedding-modern-elegant` | Noir & Gold | Wedding | `#A16207` |
| `wedding-traditional-indian` | Shaadi Rang | Wedding | `#DC2626` |
| `wedding-celestial` | Written in Stars | Wedding | `#7C3AED` |
| `wedding-mountain` | Above the Clouds | Wedding | `#4A5568` |
| `wedding-beach` | Salt & Sundown | Wedding | `#0891B2` |
| `wedding-garden` | Bloom | Wedding | `#16A34A` |
| `wedding-royal` | The Grand Affair | Wedding | `#B45309` |
| `wedding-bohemian` | Wild & Free | Wedding | `#D97706` |
| `wedding-retro-bollywood` | Filmi Shaadi | Wedding | `#C8860A` |
| `wedding-minimalist` | The Quiet Luxury | Wedding | `#1A1A1A` |
| `birthday-celestial` | Another Trip Around the Sun | Birthday | `#7C3AED` |
| `birthday-modern-elegant` | The Edit | Birthday | `#A16207` |
| `birthday-bohemian` | Free Spirit | Birthday | `#D97706` |
| `birthday-mountain` | Summit | Birthday | `#4A5568` |
| `birthday-beach` | Golden Hour | Birthday | `#F59E0B` |
| `birthday-traditional-indian` | Jashn | Birthday | `#DC2626` |
| `birthday-midnight` | Midnight | Birthday | `#7C3AED` |
| `birthday-neon-nights` | Neon Nights | Birthday | `#FF006E` |

## Key Components

```
persona/ManPersona.tsx          SVG illustrated man
persona/WomanPersona.tsx        SVG illustrated woman
persona/CelebrantPersona.tsx    Gender-aware wrapper (man/woman/other)
persona/PersonaCustomiser.tsx   Live appearance picker
ShareBar.tsx                    WhatsApp + copy + Instagram Story + Create Yours (with ?ref= tracking)
RsvpWidget.tsx                  Floating RSVP modal
MusicPlayer.tsx                 Floating music toggle (premium only)
InvitelyWatermark.tsx           Watermark (classic tier only)
CountdownTimer.tsx              Live countdown (all 18 templates)
PhotoGallery.tsx                Masonry photo grid
PhotoUploader.tsx               Drag-and-drop + URL input (5MB limit)
FontPicker.tsx                  6 font pair options
FontWrapper.tsx                 Injects custom Google Fonts (premium only)
AccentColorWrapper.tsx          Sets --invite-accent CSS var (premium only)
DiscountCodeInput.tsx           Discount code validation UI
UpgradeButton.tsx               Razorpay upgrade flow with discount codes
InvitePasswordGate.tsx          Password gate for protected invites
CelebrationPassedPage.tsx       Shown when invite expired
TemplatePreviewOverlay.tsx      Full-screen iframe preview in builder
TemplateCompareOverlay.tsx      Side-by-side template comparison
EmailCaptureBanner.tsx          Email capture for subscriber list
GlobalFooter.tsx                Full footer with all links
GalleryNav.tsx                  Responsive nav with mobile hamburger
DuplicateButton.tsx             Duplicate invite
SmoothScrollProvider.tsx        Lenis + GSAP ScrollTrigger (global)
```

## Key Libraries

```
src/lib/store.ts                File store (auto-delegates to Supabase if env set)
src/lib/store.supabase.ts       Supabase implementation
src/lib/email.ts                Resend notifications
src/lib/rateLimit.ts            In-memory rate limiter
src/lib/discountCodes.ts        Discount code CRUD + validation
src/hooks/useRecentInvites.ts   localStorage recent invites
```

## Data Files (gitignored)

`.data/invites.json` · `.data/rsvps.json` · `.data/leads.json` · `.data/subscribers.json` · `.data/discount-codes.json`

Default discount codes seeded on first run: `INVITELY20` (20% off) · `PLANNER30` (30% off)

## Key Patterns

**GSAP**: always `gsap.context()` scoped to `containerRef`, return `ctx.revert()` from cleanup.

**Birthday templates**: use `CelebrantPersona` (not `WomanPersona`) — picks man/woman based on `data.gender`.

**Tier enforcement** in `/i/[slug]/page.tsx`: watermark on classic, music/fonts/accent/password only on premium+.

**Viral loop**: ShareBar "Create Yours" → `/builder?ref=[slug]` → stored as `referredBy` on new invite → tracked in admin.

**Discount codes**: validated at `/api/discount/validate`, applied in `/api/payment/create-order`, usage tracked in `.data/discount-codes.json`.

**Store switching**: `store.ts` auto-delegates to `store.supabase.ts` when `SUPABASE_URL` is set. Run `supabase-schema.sql` to set up tables.

## Production Deployment

1. Create Supabase project → run `supabase-schema.sql`
2. Set Vercel env vars (see `.env.example`)
3. Deploy — `vercel.json` targets `bom1` (Mumbai) region
