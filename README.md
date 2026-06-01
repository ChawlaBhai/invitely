# Invitely — Animated Wedding & Birthday Invitations

A free, open-source platform for creating beautiful animated, scrollytelling digital invitations. Share on WhatsApp in seconds.

**Live Demo:** [invitely.in](https://invitely.in)

---

## Features

- **18 handcrafted templates** — 10 wedding, 5 birthday, 3 premium designs
- **Scrollytelling** — every element animates as guests scroll
- **WhatsApp-first** — share a link, guests open instantly, no app needed
- **RSVP tracking** — built-in dashboard with conversion analytics
- **Photo gallery** — drag-and-drop upload, masonry layout
- **Countdown timer** — live countdown on every invite
- **Custom slug** — set a memorable URL like `/i/arjun-weds-priya`
- **QR code** — for physical invites and venue displays
- **Instagram Stories** — 9:16 image download
- **Password protection** — private invites
- **Email notifications** — RSVP alerts to the creator
- **PWA** — installable on Android home screen
- **Razorpay payments** — tier upgrades (Classic/Premium/Luxury)
- **Discount codes** — referral and promo system
- **Admin dashboard** — all invites, RSVPs, leads, subscribers

---

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **GSAP + ScrollTrigger** — all animations
- **Lenis** — smooth scroll
- **Tailwind CSS v4**
- **Supabase** (production) / local file store (development)
- **Razorpay** — payments
- **Resend** — email notifications
- **@vercel/og** — OG images, PWA icons

---

## Quick Start

```bash
# Clone
git clone https://github.com/yourusername/invitely.git
cd invitely

# Install
npm install

# Setup env
cp .env.example .env.local
# Edit .env.local — leave Supabase/Razorpay blank for local dev

# Run
npm run dev
# Open http://localhost:3000
```

---

## Deploy to Vercel (Free)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables from `.env.example`
4. Deploy — Vercel auto-detects Next.js

**Required env vars for production:**
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
ADMIN_PASSWORD=your-secure-password
```

**Optional (for full features):**
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Database Setup (Supabase)

Run `supabase-schema.sql` in your Supabase SQL editor. Without Supabase, the app uses local JSON files in `.data/` — perfect for development and small deployments.

---

## Templates

| Template | Category | Style |
|---|---|---|
| Sona | Wedding | Modern Indian Luxury — envelope opening, marigold garlands, diyas |
| Reel | Wedding | Cinematic dark — film poster energy |
| Petal | Wedding | Warm romantic — falling petals, cream palette |
| Cosmos | Wedding | Deep space — star field, constellation lines |
| Noir & Gold | Wedding | Dark luxury editorial |
| Shaadi Rang | Wedding | Traditional Indian — jewel tones, mandala |
| Written in Stars | Wedding | Celestial — deep navy |
| Above the Clouds | Wedding | Mountain — pine, mist |
| Salt & Sundown | Wedding | Beach — golden hour |
| Bloom | Wedding | Garden — wildflowers |
| Another Trip Around the Sun | Birthday | Cosmic tribute |
| The Edit | Birthday | Editorial magazine |
| Free Spirit | Birthday | Bohemian earthy |
| Summit | Birthday | Mountain adventure |
| Golden Hour | Birthday | Beach warm |

---

## Project Structure

```
src/
  app/              # Next.js App Router pages + API routes
  templates/        # 18 invite templates (each self-contained)
  components/       # Shared components (ShareBar, RsvpWidget, etc.)
  lib/              # Store, email, payments, discount codes
  hooks/            # useRecentInvites (localStorage)
  types/            # TypeScript types
```

---

## Contributing

PRs welcome. Each template is isolated in `src/templates/[id]/` — add new ones without touching existing code.

---

## License

MIT — free to use, modify, and deploy.

---

Made with love in India 🇮🇳
