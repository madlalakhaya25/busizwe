# Busizwe Burial Society – MVP

A premium, production-ready funeral cover management platform for South African families.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Custom (Radix UI primitives) |
| Animations | Framer Motion |
| Auth | Clerk v7 |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma v7 |
| Validation | Zod |
| Storage | Supabase Storage |
| Deployment | Vercel |

## Features

### Public Website
- Home page with hero, stats, about, products preview, testimonials, CTA
- About page with company values and key facts
- Products & Pricing page with full pricing tables
- FAQ page with categorised accordion questions
- Contact page with form

### Authentication (Clerk)
- Sign up / Sign in / Forgot password
- Protected dashboard routes
- Webhook sync between Clerk and database

### Member Dashboard
- Overview with stats and quick actions
- Policy management (view, track status)
- Dependant management (add family members)
- Document upload (ID, proof of residence, etc.)
- Payment history and tracking

### Admin Dashboard
- Analytics overview with key metrics
- Member management with policy approval
- Product & pricing management
- Payment recording (mark as paid)

## Getting Started

### 1. Clone and install

```bash
git clone <repository>
cd busizwe
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `CLERK_WEBHOOK_SECRET` - Clerk webhook secret
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

### 3. Database setup

```bash
# Push schema to database
npm run db:push

# Seed with products and pricing
npm run db:seed
```

### 4. Clerk webhook setup

In your Clerk dashboard, create a webhook pointing to:
```
https://yourdomain.com/api/webhooks/clerk
```

Enable events: `user.created`, `user.updated`, `user.deleted`

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Commands

```bash
npm run db:push        # Push schema (no migrations)
npm run db:migrate     # Run migrations
npm run db:seed        # Seed products
npm run db:studio      # Open Prisma Studio
npm run db:generate    # Regenerate Prisma client
```

## Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/about` | About us |
| `/products` | Products & pricing |
| `/faq` | FAQ |
| `/contact` | Contact form |
| `/sign-in` | Sign in |
| `/sign-up` | Sign up / Apply |
| `/dashboard` | Member overview |
| `/dashboard/policies` | My policies |
| `/dashboard/dependants` | Add dependants |
| `/dashboard/documents` | Upload documents |
| `/dashboard/payments` | Payment history |
| `/admin` | Admin dashboard |
| `/admin/members` | Manage members |
| `/admin/products` | Manage products |
| `/admin/payments` | Record payments |

## Making a user an Admin

Run in Prisma Studio or directly in the database:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

## Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy

## Products and Pricing

| Product | Age 16-64 | Age 65-75 | Age 75-84 |
|---|---|---|---|
| Principal Member (R5k) | R19.60 | R43.84 | R79.06 |
| Principal Member (R10k) | R36.75 | R82.20 | R148.20 |
| Immediate Family (R5k) | R31.60 | R79.04 | R125.12 |
| Immediate Family (R10k) | R59.25 | R148.20 | R234.60 |
| Single Parent (R5k) | R29.04 | R60.32 | R100.96 |
| Single Parent (R10k) | R54.45 | R113.10 | R189.30 |
| Adult Dependant (R5k) | R18.80 | R43.12 | R64.16 |
| Adult Dependant (R10k) | R38.25 | R80.85 | R120.30 |

## Brand Colors

| Name | Hex |
|---|---|
| Deep Emerald Green | #014D4E |
| Gold | #C89B3C |
| White | #FFFFFF |
| Cream | #F7F3EA |
| Dark Text | #1C1C1C |

## Business Rules

- Joining ages: 16-84 years
- Monthly premium payments
- One member can hold multiple policies
- Dependants are linked to specific policies
- Admin manually approves policies
- Payments tracked manually (admin marks as paid)
- 3-month waiting period for natural causes
- Accidental death covered immediately
