-- Busizwe Burial Society — Product Seed
-- Paste into Supabase SQL Editor and click Run

-- ── Products ──────────────────────────────────────────────────────────────────

INSERT INTO products (id, name, description, category, "isActive", "createdAt", "updatedAt")
VALUES
  ('prod_single',       'Principal Member (Single)',           'Funeral cover for a single principal member.',                              'PRINCIPAL_MEMBER_SINGLE',  true, now(), now()),
  ('prod_family',       'Immediate Family (Whole Household)',  'Comprehensive funeral cover for the entire immediate family household.',    'IMMEDIATE_FAMILY',          true, now(), now()),
  ('prod_singleparent', 'Single Parent Family',                'Funeral cover tailored for single parent families.',                        'SINGLE_PARENT_FAMILY',      true, now(), now()),
  ('prod_addon',        'Adult Dependant (Add-On)',            'Add-on cover for adult dependants not included in the main policy.',        'ADULT_DEPENDANT_ADDON',     true, now(), now())
ON CONFLICT (id) DO UPDATE
  SET name        = EXCLUDED.name,
      description = EXCLUDED.description,
      "updatedAt" = now();

-- ── Pricing Tiers ─────────────────────────────────────────────────────────────

INSERT INTO pricing_tiers (id, "productId", "ageGroup", "coverAmount", premium, "createdAt", "updatedAt")
VALUES
  -- Principal Member (Single)
  ('tier_s_1664_5k',  'prod_single',        'AGE_16_64', 5000,  19.60, now(), now()),
  ('tier_s_1664_10k', 'prod_single',        'AGE_16_64', 10000, 36.75, now(), now()),
  ('tier_s_6575_5k',  'prod_single',        'AGE_65_75', 5000,  43.84, now(), now()),
  ('tier_s_6575_10k', 'prod_single',        'AGE_65_75', 10000, 82.20, now(), now()),
  ('tier_s_7584_5k',  'prod_single',        'AGE_75_84', 5000,  79.06, now(), now()),
  ('tier_s_7584_10k', 'prod_single',        'AGE_75_84', 10000, 148.20, now(), now()),

  -- Immediate Family (Whole Household)
  ('tier_f_1664_5k',  'prod_family',        'AGE_16_64', 5000,  31.60, now(), now()),
  ('tier_f_1664_10k', 'prod_family',        'AGE_16_64', 10000, 59.25, now(), now()),
  ('tier_f_6575_5k',  'prod_family',        'AGE_65_75', 5000,  79.04, now(), now()),
  ('tier_f_6575_10k', 'prod_family',        'AGE_65_75', 10000, 148.20, now(), now()),
  ('tier_f_7584_5k',  'prod_family',        'AGE_75_84', 5000,  125.12, now(), now()),
  ('tier_f_7584_10k', 'prod_family',        'AGE_75_84', 10000, 234.60, now(), now()),

  -- Single Parent Family
  ('tier_sp_1664_5k',  'prod_singleparent', 'AGE_16_64', 5000,  29.04, now(), now()),
  ('tier_sp_1664_10k', 'prod_singleparent', 'AGE_16_64', 10000, 54.45, now(), now()),
  ('tier_sp_6575_5k',  'prod_singleparent', 'AGE_65_75', 5000,  60.32, now(), now()),
  ('tier_sp_6575_10k', 'prod_singleparent', 'AGE_65_75', 10000, 113.10, now(), now()),
  ('tier_sp_7584_5k',  'prod_singleparent', 'AGE_75_84', 5000,  100.96, now(), now()),
  ('tier_sp_7584_10k', 'prod_singleparent', 'AGE_75_84', 10000, 189.30, now(), now()),

  -- Adult Dependant (Add-On)
  ('tier_a_1664_5k',  'prod_addon',         'AGE_16_64', 5000,  18.80, now(), now()),
  ('tier_a_1664_10k', 'prod_addon',         'AGE_16_64', 10000, 38.25, now(), now()),
  ('tier_a_6575_5k',  'prod_addon',         'AGE_65_75', 5000,  43.12, now(), now()),
  ('tier_a_6575_10k', 'prod_addon',         'AGE_65_75', 10000, 80.85, now(), now()),
  ('tier_a_7584_5k',  'prod_addon',         'AGE_75_84', 5000,  64.16, now(), now()),
  ('tier_a_7584_10k', 'prod_addon',         'AGE_75_84', 10000, 120.30, now(), now())
ON CONFLICT (id) DO UPDATE
  SET "coverAmount" = EXCLUDED."coverAmount",
      premium       = EXCLUDED.premium,
      "updatedAt"   = now();
