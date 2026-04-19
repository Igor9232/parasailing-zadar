# Parasailing Zadar

Next.js 16 landing page for parasailing experience in Zadar, Croatia. Mobile-first, 5 locales (EN/HR/DE/IT/SL), WhatsApp-powered booking. Deployed on Cloudflare Workers via OpenNext.

## Stack

- Next.js 16 (App Router) + React 19
- `next-intl` — 5-language i18n with proper hreflang
- Tailwind CSS v4, Framer Motion, GSAP
- `@opennextjs/cloudflare` — deploy to Cloudflare Workers

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Middleware redirects `/` → `/en`.

## Deploy to Cloudflare Workers

Prerequisites:

- Cloudflare account + `wrangler login` once
- (Optional) custom domain `parasailing-zadar.com` routed to the Worker via Cloudflare DNS

```bash
# Preview locally on the Workers runtime
npm run preview

# Deploy
npm run deploy
```

`npm run deploy` builds with OpenNext, uploads assets, and ships the Worker. Config in `wrangler.jsonc` and `open-next.config.ts`.

## SEO

- Per-locale metadata & OpenGraph via `generateMetadata` in `src/app/[locale]/layout.tsx`
- `hreflang` map with `x-default` → `/en`
- JSON-LD: `LocalBusiness`, `FAQPage`, `TouristAttraction`, `OfferCatalog`
- Dynamic `sitemap.xml` and `robots.txt` (see `src/app/sitemap.ts`, `src/app/robots.ts`)

## Booking flow

Form in `src/components/Booking.tsx` opens WhatsApp with a prefilled message (name, date, people, package). No backend required — works as pure static-on-edge.

## Content & translations

Edit `messages/{en,hr,de,it,slo}.json`. The `slo` URL segment maps to BCP-47 `sl` for hreflang / OpenGraph locale.

## Images

Source images in `public/` are already compressed (hero.jpg/webp, takeoff.jpg/webp, etc.). When adding new images, target ≤ 500KB each and provide `.webp` siblings for best Core Web Vitals.
