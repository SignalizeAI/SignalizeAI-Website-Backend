# SignalizeAI Website Backend

SignalizeAI-Website-Backend is the small backend app used for website contact handling.

Current version: `5.4.1`

## Scope

This service is intentionally narrow.

It handles:

- `POST /api/contact`
- contact form validation
- allowed-origin checks
- Prisma persistence
- SMTP email forwarding

It does not handle:

- AI prospecting
- outreach generation
- follow-up generation
- pricing logic
- website prospect pages

## Tech stack

- Next.js
- Prisma
- PostgreSQL
- Nodemailer

## Local setup

1. Install dependencies

```bash
npm install
```

2. Create `.env.local`

```env
DATABASE_URL=your_database_url
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=your_smtp_port
EMAIL_SERVER_USER=your_smtp_user
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM=noreply@signalizeai.org
CONTACT_TO=support@signalizeai.org
CONTACT_ALLOWED_ORIGINS=http://localhost:3000,https://signalizeai.org,https://www.signalizeai.org
```

3. Generate Prisma client

```bash
npm run prisma:generate
```

4. Start the app

```bash
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run prisma:generate`
- `npm run prisma:studio`

## Source layout

```text
src/
├── app/api/contact/route.ts
└── utils/
    ├── auth.ts
    ├── email.ts
    ├── prismaDB.ts
    └── validateEmail.ts
```

## Notes

- contact requests are origin-checked
- messages are persisted before / during forwarding
- this repo stays separate so website contact handling remains isolated
