# Busizwe Burial Society — Product Roadmap

> A living document outlining the phased delivery plan from MVP to full-scale platform.
> Updated: May 2026

---

## Vision

Build the most trusted, accessible, and digitally-native burial society platform in South Africa —
serving every family regardless of income, location, or digital literacy. Not just insurance software,
but a compassionate companion for South African families navigating loss.

---

## Current State: Foundation ✅

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
| Claim submission (member) | ✅ Done |
| Claim review dashboard (admin) | ✅ Done |
| PDF policy certificate | ✅ Done |
| PWA — installable + offline | ✅ Done |

---

## Phase 1 — Production-Ready (Month 1–2)

> Goal: Get the platform live with real users, real data, and real money moving.

### Infrastructure
- [ ] Connect Supabase PostgreSQL (`DATABASE_URL`)
- [ ] Configure Clerk production keys
- [ ] Deploy to Vercel with all environment variables
- [ ] Set up Clerk webhook endpoint in production
- [ ] Run `db:push` and `db:seed` on production database
- [ ] Configure custom domain (`busizwe.co.za`)

### File Storage
- [ ] Integrate Supabase Storage for document uploads
- [ ] Enforce file type validation (PDF, JPG, PNG only)
- [ ] Enforce 10 MB file size limit server-side
- [ ] Generate signed URLs for secure document access
- [ ] Admin document viewer (approve / reject with notes)

### Transactional Emails
- [ ] Integrate Resend (or SendGrid)
- [ ] Welcome email on sign-up (warm, human tone — not corporate)
- [ ] Policy application confirmation email
- [ ] Policy approval / rejection email with next steps
- [ ] Payment due reminder (7 days before)
- [ ] Payment overdue alert (3-day, 7-day cadence)
- [ ] Claim received acknowledgement email within minutes of submission
- [ ] Claim status change emails at every stage

### Policy Application Flow
- [ ] Member selects product and pricing tier in-app
- [ ] Age validation against selected tier on submission
- [ ] Policy number auto-generated and shown instantly
- [ ] Admin notified of new pending applications via email

### Profile Completion
- [ ] Profile completion prompt on first dashboard visit
- [ ] Members can edit: name, phone, ID number, address
- [ ] Profile completeness percentage indicator
- [ ] Block policy application until profile is 100% complete

---

## Phase 2 — Payments & Communications (Month 3–4)

> Goal: Close the money loop and open real-time communication channels.

### Payment Integration
- [ ] **PayFast / Ozow** online EFT payment button on dashboard
- [ ] EFT proof-of-payment upload by member (manual fallback)
- [ ] Admin EFT verification flow (match reference → activate policy)
- [ ] Debit order mandate form (PDF generation + digital signature)
- [ ] Monthly premium schedule auto-generated on policy activation
- [ ] Automated overdue flagging via Vercel cron
- [ ] Branded payment receipts emailed on every payment recorded

### 🇿🇦 WhatsApp Integration *(innovative)*
- [ ] Integrate WhatsApp Business API (Twilio or Meta direct)
- [ ] Members receive claim status updates on WhatsApp
- [ ] Payment reminders via WhatsApp (open rates 5× higher than email in SA)
- [ ] Member can type "STATUS" to get their policy snapshot
- [ ] Member can type "CLAIM" to start a guided claim submission flow
- [ ] Admin broadcasts to member segments via WhatsApp

### 🇿🇦 USSD Support *(innovative — for feature phone users)*
- [ ] USSD menu via Africa's Talking (`*123#` shortcode)
- [ ] Check policy status without a smartphone
- [ ] View next payment due date
- [ ] Report a claim via USSD (basic intake — agent follows up)
- [ ] Register a new member via USSD with agent assistance
- > *Reaches the 30%+ of South Africans without smartphones*

### SMS Notifications
- [ ] Integrate Clickatell or BulkSMS
- [ ] SMS on policy activation
- [ ] SMS on payment due
- [ ] SMS on claim status change
- [ ] SMS on successful document upload

---

## Phase 3 — Human-Centred Claims Experience (Month 5–6)

> Goal: Make the most painful moment in a member's life as frictionless as possible.

### 🕊️ Guided Grief Claim Flow *(innovative)*
- [ ] Step-by-step wizard for claim submission (one question per screen)
- [ ] Plain language throughout — no insurance jargon
- [ ] Progress saved automatically (resume later on any device)
- [ ] "What you'll need" checklist sent to member before they start
- [ ] Estimated payout date shown immediately on claim submission
- [ ] Dedicated "Claim Support" phone number displayed throughout

### 📸 AI-Assisted Document Verification *(innovative)*
- [ ] OCR extraction from uploaded death certificates (Azure Document Intelligence / AWS Textract)
- [ ] Auto-populate deceased name, ID, date of death from scanned document
- [ ] Flag illegible or mismatched documents before admin review
- [ ] Reduces claim processing time from days to hours

### 🔔 Real-Time Claim Tracking
- [ ] Live claim status page with visual timeline (no need to call in)
- [ ] Push notification (PWA + WhatsApp) at every stage change
- [ ] "Your claim is approved — payout within 24 hours" instant notification
- [ ] Admin response SLA timer visible to both admin and member

### Beneficiary Management
- [ ] Members can designate beneficiaries separate from dependants
- [ ] Beneficiary: name, relationship, ID number, bank account details
- [ ] Admin can view beneficiaries per policy for claim processing
- [ ] Beneficiary receives claim payout confirmation via SMS/email

### 🌹 Memorial Page *(innovative — compassionate differentiator)*
- [ ] On claim approval, member can create a private digital memorial
- [ ] Upload a photo of the deceased, write a tribute
- [ ] Share link with family (privately, no public indexing)
- [ ] Busizwe sends a sympathy message with the page link
- > *Builds emotional connection and word-of-mouth referrals*

---

## Phase 4 — Member Loyalty & Self-Service (Month 7–9)

> Goal: Make members feel valued and reduce admin burden on BBS staff.

### 🎖️ Loyalty & Rewards Programme *(innovative)*
- [ ] Points earned per month of on-time premium payment
- [ ] Milestone badges: "1 Year Loyal", "5 Years with Busizwe"
- [ ] Points redeemable for: 1 month premium credit, partner vouchers
- [ ] Streak counter: consecutive on-time payments (gamified)
- [ ] Birthday message + bonus points each year
- > *Reduces lapse rate by rewarding consistent behaviour*

### 💡 Financial Wellness Hub *(innovative)*
- [ ] In-dashboard articles: "How to plan a dignified funeral on any budget"
- [ ] Premium affordability calculator (what can I cover at R150/month?)
- [ ] Funeral cost estimator by province (sourced from real parlour data)
- [ ] Links to reputable grief counselling resources (SADAG, FAMSA)
- [ ] "Review your cover" annual prompt with upgrade suggestions

### Member Self-Service
- [ ] Member can request policy cancellation (admin confirms)
- [ ] Member can request cover upgrade (admin approves)
- [ ] Member can update dependant details with effective date
- [ ] Member can replace documents (upload new version, old version archived)
- [ ] Member can download all their documents and claim history as a ZIP

### 🔗 Referral Programme *(innovative)*
- [ ] Unique referral link per member (shareable via WhatsApp in one tap)
- [ ] Referral tracking with leaderboard
- [ ] Reward: 1 month premium credit after referee activates
- [ ] WhatsApp-friendly referral card (pre-written message + link)
- [ ] Agent bonus: 2% of referred member's first year of premiums

### Voice-Guided Navigation *(innovative — for low-literacy users)*
- [ ] Text-to-speech on key dashboard actions (opt-in)
- [ ] Support for isiZulu, isiXhosa, Sesotho, Afrikaans alongside English
- [ ] Simplified "Easy Mode" toggle: larger text, fewer options, step-by-step prompts

---

## Phase 5 — Operations at Scale (Month 10–12)

> Goal: Give the BBS team the tools to run the business efficiently at scale.

### Agent / Broker Portal
- [ ] New role: `AGENT`
- [ ] Agents register members on their behalf (in-person onboarding)
- [ ] Agent dashboard: their member list, commission earned
- [ ] Commission calculation: flat rate per activation + renewal bonus
- [ ] Agent leaderboard and performance reports (admin view)
- [ ] QR code per agent — member scans to link to agent on sign-up

### Advanced Admin Analytics
- [ ] Revenue dashboard: monthly premiums collected, projected, outstanding
- [ ] Lapse rate tracking and trend charts
- [ ] Geographic heatmap — province and township breakdown of members
- [ ] Claims payout tracking vs premiums collected (loss ratio)
- [ ] Document backlog tracker with SLA warnings
- [ ] Member growth and churn charts

### 🤖 AI Admin Assistant *(innovative)*
- [ ] Natural language query: "Show me all lapsed members in Gauteng with 3+ dependants"
- [ ] Auto-draft rejection or approval emails from claim notes
- [ ] Anomaly detection: flag unusual claim patterns for fraud review
- [ ] Predictive lapse alert: "these 12 members are likely to lapse next month"

### Bulk Operations
- [ ] Bulk import members from CSV (with validation report)
- [ ] Bulk generate monthly payment schedules
- [ ] Bulk email / SMS to segments (overdue, new, anniversary)
- [ ] Export any data table to CSV / Excel
- [ ] Scheduled automated reports emailed to admin weekly

### Audit Logging
- [ ] Every admin action logged (who, what, when)
- [ ] Policy, payment, document, and claim audit trails
- [ ] Immutable log — entries cannot be edited or deleted
- [ ] Admin-facing audit log viewer with filters

### Multi-Branch Support
- [ ] Branch model in database (e.g., Johannesburg, Cape Town, Durban)
- [ ] Agents and members assigned to branches
- [ ] Branch-level reports for regional managers
- [ ] Super admin sees all branches; branch admin sees only theirs

---

## Phase 6 — Product Expansion (Month 13–18)

> Goal: Grow the product offering and open new revenue and partnership streams.

### Extended Cover Types
- [ ] Tombstone cover add-on (uplift after 12 months)
- [ ] Repatriation cover (transport of remains — cross-border)
- [ ] Group / employer scheme plans (HR-managed)
- [ ] Child-only starter plan (R5/month, builds habits early)
- [ ] Senior-only plan (65+) with adjusted waiting periods

### 🏪 Funeral Services Marketplace *(innovative)*
- [ ] Directory of vetted funeral parlours by province
- [ ] Price comparison tool (caskets, cremation, embalming)
- [ ] Member can pre-book a preferred parlour tied to their policy
- [ ] Parlour sends confirmation on claim approval automatically
- [ ] Partner revenue: referral fee per parlour booking
- > *Removes the burden of finding a parlour during grief*

### Automated Underwriting
- [ ] Age-based eligibility check on sign-up (enforce 16–84)
- [ ] Automated policy activation on first payment confirmed
- [ ] Waiting period enforcement (3 months natural cause, 0 for accident)
- [ ] Flag high-risk applications for manual review

### 💳 Two-Pot Integration *(innovative — SA-specific)*
- [ ] Members can link SA pension two-pot savings to fund premiums
- [ ] One-click premium payment from savings component
- [ ] Automated deduction request via partner API on overdue status
- > *Solves the #1 reason members lapse — affordability shock*

### Third-Party Integrations
- [ ] **Ozow / PayFast** — instant EFT payment gateway
- [ ] **Sage / Xero** — accounting integration for premium income
- [ ] **Home Affairs API** — ID number validation at registration
- [ ] **Credit bureau** — verify ID numbers and check blacklisting

### Public API & White-Label
- [ ] Public REST API for partner integrations
- [ ] API key management per partner
- [ ] Webhook system (policy activated, claim paid, member lapsed)
- [ ] White-label option: other burial societies run on Busizwe infrastructure

---

## Technical Quality (Ongoing)

Runs in parallel across all phases:

- [ ] End-to-end test suite (Playwright)
- [ ] Unit tests for API routes and utility functions (Vitest)
- [ ] CI/CD pipeline (GitHub Actions — lint, test, build on every PR)
- [ ] Error monitoring (Sentry)
- [ ] Uptime monitoring (Better Uptime)
- [ ] Rate limiting on all public API routes
- [ ] **POPIA compliance audit** — data retention, consent, deletion rights
- [ ] Accessibility audit (WCAG 2.1 AA — screen readers, high contrast)
- [ ] Performance audit (Core Web Vitals — critical for low-end Android)
- [ ] Security penetration test before Phase 2 launch
- [ ] Offline-first data sync (IndexedDB + sync on reconnect)

---

## Milestones

| Phase | Target | Key Deliverable | Members |
|---|---|---|---|
| Foundation | ✅ Done | Platform live | — |
| Phase 1 | Month 2 | First real member onboarded | 10 |
| Phase 2 | Month 4 | First online payment + WhatsApp live | 100 |
| Phase 3 | Month 6 | First claim processed end-to-end | 500 |
| Phase 4 | Month 9 | Loyalty programme live | 1,500 |
| Phase 5 | Month 12 | Agent network + AI admin | 5,000 |
| Phase 6 | Month 18 | Marketplace + API partners | 15,000 |

---

## Prioritisation Principles

1. **Dignity first** — every feature must feel compassionate, not transactional
2. **Offline and low-data friendly** — many members are on prepaid mobile data
3. **South African first** — WhatsApp, USSD, SASSA, ZAR, all 11 official languages
4. **Member trust before scale** — build trust with 100 members before acquiring 10,000
5. **Admin efficiency** — one BBS staff member should be able to manage 500 members
6. **Revenue security** — close the payment loop before expanding the product range

---

*Roadmap is reviewed monthly. Items may be reprioritised based on member feedback, regulatory requirements, and business needs.*
