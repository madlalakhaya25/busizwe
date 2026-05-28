import { PrismaClient, ProductCategory, AgeGroup } from '@prisma/client'

const prisma = new PrismaClient()

const PRODUCTS = [
  {
    name: 'Principal Member (Single)',
    description: 'Funeral cover for a single principal member.',
    category: ProductCategory.PRINCIPAL_MEMBER_SINGLE,
    tiers: [
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 5000, premium: 19.60 },
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 10000, premium: 36.75 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 5000, premium: 43.84 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 10000, premium: 82.20 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 5000, premium: 79.06 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 10000, premium: 148.20 },
    ],
  },
  {
    name: 'Immediate Family (Whole Household)',
    description: 'Comprehensive funeral cover for the entire immediate family household.',
    category: ProductCategory.IMMEDIATE_FAMILY,
    tiers: [
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 5000, premium: 31.60 },
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 10000, premium: 59.25 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 5000, premium: 79.04 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 10000, premium: 148.20 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 5000, premium: 125.12 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 10000, premium: 234.60 },
    ],
  },
  {
    name: 'Single Parent Family',
    description: 'Funeral cover tailored for single parent families.',
    category: ProductCategory.SINGLE_PARENT_FAMILY,
    tiers: [
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 5000, premium: 29.04 },
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 10000, premium: 54.45 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 5000, premium: 60.32 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 10000, premium: 113.10 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 5000, premium: 100.96 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 10000, premium: 189.30 },
    ],
  },
  {
    name: 'Adult Dependant (Add-On)',
    description: 'Add-on cover for adult dependants not included in the main policy.',
    category: ProductCategory.ADULT_DEPENDANT_ADDON,
    tiers: [
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 5000, premium: 18.80 },
      { ageGroup: AgeGroup.AGE_16_64, coverAmount: 10000, premium: 38.25 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 5000, premium: 43.12 },
      { ageGroup: AgeGroup.AGE_65_75, coverAmount: 10000, premium: 80.85 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 5000, premium: 64.16 },
      { ageGroup: AgeGroup.AGE_75_84, coverAmount: 10000, premium: 120.30 },
    ],
  },
]

async function main() {
  console.log('Seeding Busizwe Burial Society database...')

  for (const productData of PRODUCTS) {
    const { tiers, ...product } = productData

    const created = await prisma.product.upsert({
      where: { id: product.name },
      create: {
        name: product.name,
        description: product.description,
        category: product.category,
        pricingTiers: {
          create: tiers.map((t) => ({
            ageGroup: t.ageGroup,
            coverAmount: t.coverAmount,
            premium: t.premium,
          })),
        },
      },
      update: {
        description: product.description,
      },
    })

    console.log(`  ✓ Product: ${created.name}`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
