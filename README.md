# SignalizeAI Website Backend

Next.js backend service for the SignalizeAI website.

It currently provides:
- Contact form API handling
- Origin validation and CORS handling for contact submissions
- Contact message persistence via Prisma/PostgreSQL
- Contact email forwarding via SMTP

## Setup

1. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` values:
   - `DATABASE_URL`
   - OAuth/NextAuth secrets (if auth routes are enabled)
   - SMTP credentials (`EMAIL_SERVER_*`, `EMAIL_FROM`)
   - Contact settings (`CONTACT_TO`, `CONTACT_ALLOWED_ORIGINS`)
   - Stripe keys (if payment routes are added/used)

3. Install dependencies:
   ```bash
   npm install
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Run dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - start local development server
- `npm run build` - generate Prisma client and build Next.js app
- `npm run start` - run production server
- `npm run lint` - run lint checks
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:studio` - open Prisma Studio

## API Routes

- `POST /api/contact` - submit contact form message
- `OPTIONS /api/contact` - CORS preflight

## Environment Variables

See `.env.example` for the full list.

Important contact-related variables:
- `CONTACT_TO` (default target inbox)
- `CONTACT_ALLOWED_ORIGINS` (comma-separated allowlist)

## Project Structure

```text
src/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts
└── utils/
    ├── auth.ts
    ├── email.ts
    └── prismaDB.ts

prisma/
└── schema.prisma
```

