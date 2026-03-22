# SignalizeAI Website Backend

Small Next.js backend service for the SignalizeAI website contact flow.

It currently handles:

- `POST /api/contact`
- contact form validation
- allowed-origin checks
- Prisma persistence
- email forwarding through SMTP

## Project Scope

This project is intentionally narrow. It is not the AI backend and it is not the main website app.

Use:

- `../SignalizeAI-Backend` for AI, quota, outreach, follow-ups, and billing webhooks
- `../SignalizeAI-Website` for the public website and prospect pages

## Tech Stack

- Next.js
- Prisma
- PostgreSQL
- Nodemailer

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` and add the required values:

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

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Start the app:

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

## Project Structure

```text
src/
├── app/api/contact/route.ts
└── utils/
    ├── auth.ts
    ├── email.ts
    ├── prismaDB.ts
    └── validateEmail.ts

prisma/
└── schema.prisma
```

## Notes

- The contact route uses origin allowlisting
- Messages are persisted before / during email forwarding
- This service is separate so the website can keep contact handling isolated from the AI backend
