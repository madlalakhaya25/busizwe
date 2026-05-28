# Busizwe Burial Society — Product Roadmap

> A living document outlining the phased delivery plan from MVP to full-scale platform.
> Updated: May 2026

---

## Vision

Build the most trusted, accessible, and digitally-native burial society platform in South Africa —
serving every family regardless of income, location, or digital literacy.

---

## Current State: MVP ✅

The MVP is live on `main`. It covers the foundational layer:

| Area | Status |
|---|---|
| Public landing page | ✅ Done |
| Products & pricing pages | ✅ Done |
| Clerk authentication | ✅ Done |
| Member dashboard | ✅ Done |
| Dependant management | ✅ Done |
| Document upload (UI) | ✅ Done |
| Payment history (UI) | ✅ Done |
| Admin dashboard | ✅ Done |
| Policy approval (admin) | ✅ Done |
| Prisma schema + seed | ✅ Done |
| Clerk webhook sync | ✅ Done |
| Vercel-ready deployment | ✅ Done |

---

## Phase 1 — Production-Ready (Month 1–2)

> Goal: Get the platform live with real users, real data, and real money tracking.

### Infrastructure
- [ ] Connect Supabase PostgreSQL (`DATABASE_URL`)
- [ ] Configure Clerk production keys
- [ ] Deploy to Vercel with all environment variables
- [ ] Set up Clerk webhook in production
- [ ] Run `db:push` and `db:seed` on production database
- [ ] Configure custom domain (`busizwe.co.za`)

### File Storage
- [ ] Integrate Supabase Storage for document uploads
- [ ] Enforce file type validation (PDF, JPG, PNG only)
- [ ] Enforce 10MB file size limit server-side
- [ ] Generate signed URLs for secure document access
- [ ] Admin document viewer (approve / reject with notes)

### Email Notifications
- [ ] Integrate Resend or SendGrid
- [ ] Welcome email on sign-up
- [ ] Policy application confirmation email
- [ ] Policy approval / rejection email
- [ ] Payment due reminder (7 days before)
- [ ] Payment overdue alert

### Policy Application Flow
- [ ] Member selects a product and pricing tier in-app
- [ ] In-app policy application form (age, DOB, cover selection)
- [ ] Age validation against selected tier on submission
- [ ] Policy number auto-generated and shown to member
- [ ] Admin notified of new pending application

### Profile Completion
- [ ] Profile completion prompt on first dashboard visit
- [ ] Members can edit: name, phone, ID number, address
- [ ] Profile completeness indicator (%)
- [ ] Block policy application until profile is complete

---

## Phase 2 — Payments & Claims (Month 3–4)

> Goal: Close the money loop. Enable real premium collection and formal claim submission.

### Payment Integration
- [ ] EFT payment confirmation upload by member
- [ ] Admin EFT verification flow (match reference to policy)
- [ ] Debit order mandate form (PDF generation)
- [ ] Monthly premium schedule auto-generated on policy activation
- [ ] Automated overdue flagging (cron job / Vercel cron)
- [ ] Payment receipts emailed to members

### Claims Management
- [ ] Claim submission form (upload death certificate, ID of deceased)
- [ ] Claim status tracking: Submitted → Under Review → Approved → Paid
- [ ] Admin claim review dashboard
- [ ] Claim approval / rejection with notes
- [ ] Member claim status page with timeline
- [ ] Claim email notifications at each stage

### SMS Notifications
- [ ] Integrate Clickatell or BulkSMS (South African providers)
- [ ] SMS on policy approval
- [ ] SMS on payment due
- [ ] SMS on claim status change
- [ ] SMS on successful document upload

### Reporting (Admin)
- [ ] Monthly premium collection report (CSV export)
- [ ] Active vs lapsed policies report
- [ ] Pending documents report
- [ ] Claims report with payout totals
- [ ] Member growth chart (dashboard widget)

---

## Phase 3 — Member Experience (Month 5–6)

> Goal: Make members feel valued and keep them engaged between interactions.

### Digital Policy Certificate
- [ ] Auto-generate PDF policy certificate on activation
- [ ] Certificate includes: policy number, member name, cover amount, start date, BBS branding
- [ ] Downloadable from member dashboard
- [ ] Re-issued on policy changes

### Beneficiary Management
- [ ] Members can designate beneficiaries separate from dependants
- [ ] Beneficiary: name, relationship, ID number, bank account
- [ ] Admin can view beneficiaries per policy for claim processing

### Member Self-Service
- [ ] Member can request policy cancellation (admin confirms)
- [ ] Member can request cover upgrade (admin approves)
- [ ] Member can update dependant details
- [ ] Member can replace documents (upload new version)

### Referral Programme
- [ ] Unique referral link per member
- [ ] Referral tracking (how many people signed up via link)
- [ ] Reward logic: 1 month premium discount after referee activates
- [ ] Referral leaderboard (admin view)

### Progressive Web App (PWA)
- [ ] Add `manifest.json` and service worker
- [ ] Installable on Android and iOS home screen
- [ ] Offline-capable dashboard (cached data)
- [ ] Push notifications for payment reminders

---

## Phase 4 — Operations & Scale (Month 7–9)

> Goal: Give the BBS team the tools to run the business efficiently at scale.

### Agent / Broker Portal
- [ ] New role: `AGENT`
- [ ] Agents can register members on their behalf
- [ ] Agent dashboard: their member list, commission tracker
- [ ] Commission calculation: % of first premium per new activation
- [ ] Agent performance reports (admin)

### Advanced Admin Analytics
- [ ] Revenue dashboard: monthly premiums, total collected, projected
- [ ] Lapse rate tracking and trend charts
- [ ] Geographic heatmap (province breakdown of members)
- [ ] Document backlog tracker
- [ ] Claims payout tracking vs premiums collected

### Audit Logging
- [ ] Every admin action logged (who, what, when)
- [ ] Policy approval audit trail
- [ ] Payment recording audit trail
- [ ] Document status change audit trail
- [ ] Admin-facing audit log viewer

### Bulk Operations (Admin)
- [ ] Bulk import members from CSV
- [ ] Bulk generate monthly payment schedules
- [ ] Bulk email / SMS to segments (e.g., all overdue members)
- [ ] Export any data table to CSV / Excel

### Multi-Branch Support
- [ ] Branch model in database (e.g., Johannesburg, Cape Town, Durban)
- [ ] Agents and members assigned to branches
- [ ] Branch-level reports for regional managers
- [ ] Super admin sees all branches; branch admin sees only theirs

---

## Phase 5 — Product Expansion (Month 10–12)

> Goal: Grow the product offering and open new revenue streams.

### Extended Product Types
- [ ] Tombstone cover add-on
- [ ] Repatriation cover (transport of remains)
- [ ] Group / employer scheme plans
- [ ] Child-only cover plans

### Automated Underwriting
- [ ] Age-based eligibility check on signup (enforce 16–84)
- [ ] Automated policy activation on first payment confirmed
- [ ] Waiting period enforcement (3 months for natural causes)
- [ ] Flag high-risk applications for manual review

### Member Mobile App
- [ ] React Native app (iOS + Android)
- [ ] Full parity with web dashboard
- [ ] Biometric login
- [ ] Push notifications
- [ ] In-app document camera capture

### Third-Party Integrations
- [ ] Accounting: Sage / Xero integration for premium income
- [ ] Banking: Ozow or PayFast for online EFT payments
- [ ] SASSA: partner integration for grant-linked debit orders
- [ ] Credit bureau: validate ID numbers at registration

### API & Partnerships
- [ ] Public REST API for partner integrations
- [ ] API key management per partner
- [ ] Webhook system for partners (policy events, claim events)
- [ ] White-label option for other societies

---

## Technical Debt & Quality (Ongoing)

These run in parallel across all phases:

- [ ] End-to-end test suite (Playwright)
- [ ] Unit tests for API routes and utility functions
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Error monitoring (Sentry)
- [ ] Uptime monitoring (Better Uptime)
- [ ] Rate limiting on all API routes
- [ ] POPIA compliance audit
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance audit (Core Web Vitals)
- [ ] Security penetration test before Phase 2 launch

---

## Milestones Summary

| Phase | Target | Key Deliverable |
|---|---|---|
| MVP | ✅ Done | Platform foundation |
| Phase 1 | Month 2 | First real member live |
| Phase 2 | Month 4 | First claim processed |
| Phase 3 | Month 6 | 500 active members |
| Phase 4 | Month 9 | Agent network active |
| Phase 5 | Month 12 | 2,000+ members, API partners |

---

## Prioritisation Principles

1. **Member trust first** — anything that builds confidence (receipts, certificates, status updates) takes priority over internal tools
2. **Admin efficiency second** — reduce manual work before automating member-facing features
3. **Revenue security third** — close payment loop before expanding product range
4. **Scale last** — only build multi-branch / API when the core is stable and tested

---

*Roadmap is reviewed monthly. Items may be reprioritised based on member feedback, regulatory requirements, and business needs.*
