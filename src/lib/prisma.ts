import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Store both pool and client in global to prevent HMR from creating new Pool instances
const g = globalThis as unknown as {
  prismaPool: Pool | undefined
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) return new PrismaClient()

  if (!g.prismaPool) g.prismaPool = new Pool({ connectionString })
  const adapter = new PrismaPg(g.prismaPool)
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = g.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') g.prisma = prisma
