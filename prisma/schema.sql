-- ============================================================
-- Busizwe Burial Society — Full Database Schema + Seed
-- Paste into Supabase SQL Editor and click Run
-- Safe to re-run: uses IF NOT EXISTS / ON CONFLICT guards
-- ============================================================

-- ── Enums ────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'ADMIN', 'SUPER_ADMIN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "PolicyStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'CANCELLED', 'LAPSED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'OVERDUE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "DocumentType" AS ENUM (
    'ID_DOCUMENT', 'PROOF_OF_RESIDENCE', 'BANK_STATEMENT',
    'DEATH_CERTIFICATE', 'BIRTH_CERTIFICATE', 'MARRIAGE_CERTIFICATE', 'OTHER'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "DependantRelationship" AS ENUM (
    'SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'GRANDPARENT', 'GRANDCHILD', 'OTHER'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "AgeGroup" AS ENUM ('AGE_16_64', 'AGE_65_75', 'AGE_75_84');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "ProductCategory" AS ENUM (
    'PRINCIPAL_MEMBER_SINGLE', 'IMMEDIATE_FAMILY',
    'SINGLE_PARENT_FAMILY', 'ADULT_DEPENDANT_ADDON'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "ClaimStatus" AS ENUM (
    'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PAID', 'REJECTED'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Tables ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id          TEXT        PRIMARY KEY,
  "clerkId"   TEXT        NOT NULL UNIQUE,
  email       TEXT        NOT NULL UNIQUE,
  role        "UserRole"  NOT NULL DEFAULT 'MEMBER',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deletedAt" TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS users_clerkid_idx ON users ("clerkId");
CREATE INDEX IF NOT EXISTS users_email_idx   ON users (email);

CREATE TABLE IF NOT EXISTS profiles (
  id            TEXT        PRIMARY KEY,
  "userId"      TEXT        NOT NULL UNIQUE,
  "firstName"   TEXT        NOT NULL,
  "lastName"    TEXT        NOT NULL,
  phone         TEXT,
  "dateOfBirth" TIMESTAMPTZ,
  "idNumber"    TEXT        UNIQUE,
  address       TEXT,
  city          TEXT,
  province      TEXT,
  "postalCode"  TEXT,
  "avatarUrl"   TEXT,
  gender        TEXT,
  "alternativePhone"      TEXT,
  "bankName"              TEXT,
  "bankAccount"           TEXT,
  "bankBranch"            TEXT,
  "nextOfKinName"         TEXT,
  "nextOfKinPhone"        TEXT,
  "nextOfKinRelationship" TEXT,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deletedAt"   TIMESTAMPTZ,
  CONSTRAINT fk_profiles_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS profiles_userid_idx ON profiles ("userId");

CREATE TABLE IF NOT EXISTS products (
  id          TEXT               PRIMARY KEY,
  name        TEXT               NOT NULL,
  description TEXT,
  category    "ProductCategory"  NOT NULL,
  "isActive"  BOOLEAN            NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ        NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ        NOT NULL DEFAULT now(),
  "deletedAt" TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);

CREATE TABLE IF NOT EXISTS pricing_tiers (
  id            TEXT        PRIMARY KEY,
  "productId"   TEXT        NOT NULL,
  "ageGroup"    "AgeGroup"  NOT NULL,
  "coverAmount" DECIMAL(10,2) NOT NULL,
  premium       DECIMAL(10,2) NOT NULL,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_pricing_tiers_product FOREIGN KEY ("productId") REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT uq_pricing_tiers UNIQUE ("productId", "ageGroup", "coverAmount")
);

CREATE INDEX IF NOT EXISTS pricing_tiers_productid_idx ON pricing_tiers ("productId");

CREATE TABLE IF NOT EXISTS policies (
  id              TEXT           PRIMARY KEY,
  "userId"        TEXT           NOT NULL,
  "productId"     TEXT           NOT NULL,
  "pricingTierId" TEXT           NOT NULL,
  "policyNumber"  TEXT           NOT NULL UNIQUE,
  status          "PolicyStatus" NOT NULL DEFAULT 'PENDING',
  "startDate"     TIMESTAMPTZ,
  "endDate"       TIMESTAMPTZ,
  "monthlyPremium" DECIMAL(10,2) NOT NULL,
  "coverAmount"   DECIMAL(10,2)  NOT NULL,
  notes           TEXT,
  "approvedAt"    TIMESTAMPTZ,
  "approvedBy"    TEXT,
  "createdAt"     TIMESTAMPTZ    NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ    NOT NULL DEFAULT now(),
  "deletedAt"     TIMESTAMPTZ,
  CONSTRAINT fk_policies_user        FOREIGN KEY ("userId")        REFERENCES users(id)         ON DELETE CASCADE,
  CONSTRAINT fk_policies_product     FOREIGN KEY ("productId")     REFERENCES products(id),
  CONSTRAINT fk_policies_pricingtier FOREIGN KEY ("pricingTierId") REFERENCES pricing_tiers(id)
);

CREATE INDEX IF NOT EXISTS policies_userid_idx       ON policies ("userId");
CREATE INDEX IF NOT EXISTS policies_status_idx       ON policies (status);
CREATE INDEX IF NOT EXISTS policies_policynumber_idx ON policies ("policyNumber");

CREATE TABLE IF NOT EXISTS dependants (
  id             TEXT                    PRIMARY KEY,
  "policyId"     TEXT                    NOT NULL,
  "firstName"    TEXT                    NOT NULL,
  "lastName"     TEXT                    NOT NULL,
  "dateOfBirth"  TIMESTAMPTZ             NOT NULL,
  "idNumber"     TEXT,
  relationship   "DependantRelationship" NOT NULL,
  phone          TEXT,
  "createdAt"    TIMESTAMPTZ             NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ             NOT NULL DEFAULT now(),
  "deletedAt"    TIMESTAMPTZ,
  CONSTRAINT fk_dependants_policy FOREIGN KEY ("policyId") REFERENCES policies(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS dependants_policyid_idx ON dependants ("policyId");

CREATE TABLE IF NOT EXISTS documents (
  id           TEXT             PRIMARY KEY,
  "userId"     TEXT             NOT NULL,
  type         "DocumentType"   NOT NULL,
  status       "DocumentStatus" NOT NULL DEFAULT 'PENDING',
  "fileName"   TEXT             NOT NULL,
  "fileUrl"    TEXT             NOT NULL,
  "fileSize"   INTEGER,
  "mimeType"   TEXT,
  notes        TEXT,
  "reviewedAt" TIMESTAMPTZ,
  "reviewedBy" TEXT,
  "createdAt"  TIMESTAMPTZ      NOT NULL DEFAULT now(),
  "updatedAt"  TIMESTAMPTZ      NOT NULL DEFAULT now(),
  "deletedAt"  TIMESTAMPTZ,
  CONSTRAINT fk_documents_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS documents_userid_idx ON documents ("userId");
CREATE INDEX IF NOT EXISTS documents_status_idx ON documents (status);

CREATE TABLE IF NOT EXISTS payments (
  id              TEXT            PRIMARY KEY,
  "userId"        TEXT            NOT NULL,
  "policyId"      TEXT            NOT NULL,
  amount          DECIMAL(10,2)   NOT NULL,
  status          "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "dueDate"       TIMESTAMPTZ     NOT NULL,
  "paidAt"        TIMESTAMPTZ,
  reference       TEXT            UNIQUE,
  "paymentMethod" TEXT,
  notes           TEXT,
  "recordedBy"    TEXT,
  "createdAt"     TIMESTAMPTZ     NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ     NOT NULL DEFAULT now(),
  CONSTRAINT fk_payments_user   FOREIGN KEY ("userId")   REFERENCES users(id)    ON DELETE CASCADE,
  CONSTRAINT fk_payments_policy FOREIGN KEY ("policyId") REFERENCES policies(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS payments_userid_idx  ON payments ("userId");
CREATE INDEX IF NOT EXISTS payments_policyid_idx ON payments ("policyId");
CREATE INDEX IF NOT EXISTS payments_status_idx  ON payments (status);
CREATE INDEX IF NOT EXISTS payments_duedate_idx ON payments ("dueDate");

CREATE TABLE IF NOT EXISTS claims (
  id                    TEXT          PRIMARY KEY,
  "userId"              TEXT          NOT NULL,
  "policyId"            TEXT          NOT NULL,
  "claimNumber"         TEXT          NOT NULL UNIQUE,
  status                "ClaimStatus" NOT NULL DEFAULT 'SUBMITTED',
  "deceasedFirstName"   TEXT          NOT NULL,
  "deceasedLastName"    TEXT          NOT NULL,
  "deceasedIdNumber"    TEXT,
  "deceasedDateOfDeath" TIMESTAMPTZ   NOT NULL,
  relationship          TEXT          NOT NULL,
  "funeralDate"         TIMESTAMPTZ,
  "funeralHome"         TEXT,
  "claimAmount"         DECIMAL(10,2) NOT NULL,
  notes                 TEXT,
  "adminNotes"          TEXT,
  "reviewedAt"          TIMESTAMPTZ,
  "reviewedBy"          TEXT,
  "approvedAt"          TIMESTAMPTZ,
  "paidAt"              TIMESTAMPTZ,
  "rejectedAt"          TIMESTAMPTZ,
  "rejectionReason"     TEXT,
  "deathCertUrl"        TEXT,
  "deceasedIdUrl"       TEXT,
  "createdAt"           TIMESTAMPTZ   NOT NULL DEFAULT now(),
  "updatedAt"           TIMESTAMPTZ   NOT NULL DEFAULT now(),
  CONSTRAINT fk_claims_user   FOREIGN KEY ("userId")   REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_claims_policy FOREIGN KEY ("policyId") REFERENCES policies(id)
);

CREATE INDEX IF NOT EXISTS claims_userid_idx   ON claims ("userId");
CREATE INDEX IF NOT EXISTS claims_policyid_idx ON claims ("policyId");
CREATE INDEX IF NOT EXISTS claims_status_idx   ON claims (status);

CREATE TABLE IF NOT EXISTS memorials (
  id           TEXT        PRIMARY KEY,
  token        TEXT        NOT NULL UNIQUE,
  "claimId"    TEXT        NOT NULL UNIQUE,
  "userId"     TEXT        NOT NULL,
  "firstName"  TEXT        NOT NULL,
  "lastName"   TEXT        NOT NULL,
  "birthYear"  INTEGER,
  "deathYear"  INTEGER     NOT NULL,
  tribute      TEXT,
  "photoUrl"   TEXT,
  "candleCount" INTEGER    NOT NULL DEFAULT 0,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_memorials_claim FOREIGN KEY ("claimId") REFERENCES claims(id) ON DELETE CASCADE,
  CONSTRAINT fk_memorials_user  FOREIGN KEY ("userId")  REFERENCES users(id)  ON DELETE CASCADE
);

-- ── Seed: Products ────────────────────────────────────────────

INSERT INTO products (id, name, description, category, "isActive", "createdAt", "updatedAt")
VALUES
  ('prod_single',       'Principal Member (Single)',          'Funeral cover for a single principal member.',                             'PRINCIPAL_MEMBER_SINGLE', true, now(), now()),
  ('prod_family',       'Immediate Family (Whole Household)', 'Comprehensive funeral cover for the entire immediate family household.',   'IMMEDIATE_FAMILY',         true, now(), now()),
  ('prod_singleparent', 'Single Parent Family',               'Funeral cover for single parent families.',                               'SINGLE_PARENT_FAMILY',     true, now(), now()),
  ('prod_addon',        'Adult Dependant (Add-On)',           'Add-on cover for adult dependants not included in the main policy.',      'ADULT_DEPENDANT_ADDON',    true, now(), now())
ON CONFLICT (id) DO UPDATE
  SET name        = EXCLUDED.name,
      description = EXCLUDED.description,
      "updatedAt" = now();

-- ── Seed: Pricing Tiers ───────────────────────────────────────

INSERT INTO pricing_tiers (id, "productId", "ageGroup", "coverAmount", premium, "createdAt", "updatedAt")
VALUES
  -- Principal Member (Single)
  ('tier_s_1664_5k',  'prod_single', 'AGE_16_64', 5000,  19.60, now(), now()),
  ('tier_s_1664_10k', 'prod_single', 'AGE_16_64', 10000, 36.75, now(), now()),
  ('tier_s_6575_5k',  'prod_single', 'AGE_65_75', 5000,  43.84, now(), now()),
  ('tier_s_6575_10k', 'prod_single', 'AGE_65_75', 10000, 82.20, now(), now()),
  ('tier_s_7584_5k',  'prod_single', 'AGE_75_84', 5000,  79.06, now(), now()),
  ('tier_s_7584_10k', 'prod_single', 'AGE_75_84', 10000, 148.20, now(), now()),

  -- Immediate Family (Whole Household)
  ('tier_f_1664_5k',  'prod_family', 'AGE_16_64', 5000,  31.60, now(), now()),
  ('tier_f_1664_10k', 'prod_family', 'AGE_16_64', 10000, 59.25, now(), now()),
  ('tier_f_6575_5k',  'prod_family', 'AGE_65_75', 5000,  79.04, now(), now()),
  ('tier_f_6575_10k', 'prod_family', 'AGE_65_75', 10000, 148.20, now(), now()),
  ('tier_f_7584_5k',  'prod_family', 'AGE_75_84', 5000,  125.12, now(), now()),
  ('tier_f_7584_10k', 'prod_family', 'AGE_75_84', 10000, 234.60, now(), now()),

  -- Single Parent Family
  ('tier_sp_1664_5k',  'prod_singleparent', 'AGE_16_64', 5000,  29.04, now(), now()),
  ('tier_sp_1664_10k', 'prod_singleparent', 'AGE_16_64', 10000, 54.45, now(), now()),
  ('tier_sp_6575_5k',  'prod_singleparent', 'AGE_65_75', 5000,  60.32, now(), now()),
  ('tier_sp_6575_10k', 'prod_singleparent', 'AGE_65_75', 10000, 113.10, now(), now()),
  ('tier_sp_7584_5k',  'prod_singleparent', 'AGE_75_84', 5000,  100.96, now(), now()),
  ('tier_sp_7584_10k', 'prod_singleparent', 'AGE_75_84', 10000, 189.30, now(), now()),

  -- Adult Dependant (Add-On)
  ('tier_a_1664_5k',  'prod_addon', 'AGE_16_64', 5000,  18.80, now(), now()),
  ('tier_a_1664_10k', 'prod_addon', 'AGE_16_64', 10000, 38.25, now(), now()),
  ('tier_a_6575_5k',  'prod_addon', 'AGE_65_75', 5000,  43.12, now(), now()),
  ('tier_a_6575_10k', 'prod_addon', 'AGE_65_75', 10000, 80.85, now(), now()),
  ('tier_a_7584_5k',  'prod_addon', 'AGE_75_84', 5000,  64.16, now(), now()),
  ('tier_a_7584_10k', 'prod_addon', 'AGE_75_84', 10000, 120.30, now(), now())
ON CONFLICT (id) DO UPDATE
  SET "coverAmount" = EXCLUDED."coverAmount",
      premium       = EXCLUDED.premium,
      "updatedAt"   = now();
