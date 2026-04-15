# replit.md

## Overview

ApexWhips is a Next.js e-commerce and SEO lead generation platform for a UK-based supplier specialising in rapid delivery of culinary cream chargers (SmartWhip, FastGas, Cream Deluxe). The app generates programmatic landing pages for hundreds of UK towns to capture local search traffic.

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Structure

```
app/                        # Next.js App Router pages
  layout.tsx                # Root layout (fonts, metadata, analytics, global components)
  page.tsx                  # Home page with town grid and search
  not-found.tsx             # 404 page
  globals.css               # Global styles
  sitemap.ts                # Dynamic sitemap for all town routes
  shop/page.tsx             # Paginated shop with search
  towns/[town]/
    layout.tsx              # SEO layer: generateMetadata + JSON-LD structured data scripts
    page.tsx                # UI only: generateStaticParams + page render

components/
  ui/                       # shadcn/ui primitives (button, card, input, etc.)
  layout/                   # Shared layout components
    Logo.tsx                # ApexWhips logo (Zap icon + name)
    Footer.tsx              # Footer with full / compact / town variants
  common/                   # Reusable domain components
    BottomSheet.tsx         # Scroll-triggered town search overlay
    FloatingActionButtons.tsx # Fixed WhatsApp / Telegram buttons

services/                   # Business logic and external API clients
  town.service.ts           # All town data access (getAllTowns, getTownById, search, etc.)
  payment.service.ts        # Stripe client instance

lib/                        # Core utilities and infrastructure
  auth.ts                   # Password hashing / comparison (bcryptjs)
  postcode.ts               # UK postcode utilities: detection, slug conversion, postcodes.io lookup
  seo.ts                    # JSON-LD builders and metadata helpers (buildTownMetadata, buildTownProductJsonLd, buildTownFaqJsonLd)
  utils.ts                  # Tailwind class merger (cn)
  db/
    drizzle.ts              # Drizzle ORM client (postgres.js)
    schema.ts               # Database tables: users, teams, teamMembers, activityLogs, invitations
    seed.ts                 # Database seed script
    setup.ts                # Interactive environment setup script
    migrations/             # Drizzle SQL migration files

types/
  index.ts                  # Shared TypeScript interfaces (Town, TownDetail, Product) + DB type re-exports

constants/
  index.ts                  # Static values: PRICES, TOWNS_PER_PAGE, SITE_NAME, BASE_URL

hooks/                      # Custom React hooks (empty — add hooks here as needed)

data/
  gb.json                   # Full UK town dataset (city, admin, lat, lng, population, iso2)
  towns.json                # Simplified towns list for BottomSheet search

public/                     # Static assets (logo, OG image, favicons)

middleware.ts               # Security headers for all routes
```

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router, experimental PPR enabled
- **Styling**: Tailwind CSS v4 with shadcn/ui (new-york style)
- **Font**: Manrope (Google Fonts)
- **Icons**: Lucide React

### SEO Strategy
- `generateStaticParams` in `towns/[town]/page.tsx` pre-renders a page per UK town
- Each town page has dynamic `generateMetadata`, JSON-LD Product + FAQ schema
- `app/sitemap.ts` generates the full sitemap automatically (static towns only)
- Postcode-based pages are dynamically server-rendered via postcodes.io API and are NOT included in the sitemap

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Schema**: `lib/db/schema.ts`
- **Migrations**: `lib/db/migrations/`

### Authentication
- Password hashing: bcryptjs (`lib/auth.ts`)
- JWTs: jose library
- Sessions: HTTP-only cookies

### Ordering Flow
- No traditional checkout — "Order Now" buttons link to WhatsApp / Telegram
- URLs supplied via `NEXT_PUBLIC_WHATSAPP_URL` and `NEXT_PUBLIC_TELEGRAM_URL` env vars

## Environment Variables Required
- `NEXT_PUBLIC_WHATSAPP_URL`: WhatsApp order link
- `NEXT_PUBLIC_TELEGRAM_URL`: Telegram order link
- `BASE_URL`: Canonical base URL (default: https://www.apexwhips.com)
- `POSTGRES_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `AUTH_SECRET`: JWT signing secret

## NPM Scripts
- `npm run dev`: Start development server (Turbopack, port 5000)
- `pnpm db:seed`: Seed database with test user and Stripe products
- `pnpm db:generate`: Generate Drizzle migrations
- `pnpm db:migrate`: Run database migrations
