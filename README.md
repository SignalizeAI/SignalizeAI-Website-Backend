# SignalizeAI Backend API

Standalone backend API for SignalizeAI project with Next.js API routes.

## Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your credentials:
   - Database URL (PostgreSQL)
   - OAuth credentials (GitHub, Google)
   - Email SMTP configuration
   - Stripe keys

3. Install dependencies:
   ```bash
   npm install
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

## API Routes

- `/api/auth/` - Authentication endpoints (NextAuth)
- `/api/register/` - User registration
- `/api/forgot-password/` - Password reset functionality
- `/api/payment/` - Payment processing (Stripe)

## Database

Uses PostgreSQL with Prisma ORM. Schema includes:
- Users
- Accounts (OAuth)
- Sessions
- Verification Tokens

## Development

View database:
```bash
npm run prisma:studio
```

Lint code:
```bash
npm run lint
```

## Build

```bash
npm run build
npm start
```
