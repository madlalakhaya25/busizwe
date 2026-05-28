import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ALLOWED_TYPES = ['ID_DOCUMENT', 'PROOF_OF_RESIDENCE', 'BANK_STATEMENT', 'DEATH_CERTIFICATE', 'BIRTH_CERTIFICATE', 'MARRIAGE_CERTIFICATE', 'OTHER'] as const
type DocType = typeof ALLOWED_TYPES[number]

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const documents = await prisma.document.findMany({
    where: { userId: user.id, deletedAt: null },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(documents)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const type = formData.get('type') as string | null

  if (!file || !type) {
    return NextResponse.json({ error: 'File and type are required' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(type as DocType)) {
    return NextResponse.json({ error: 'Invalid document type' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
  }

  // In production, upload to Supabase Storage or AWS S3 here.
  // For MVP, we store a placeholder URL.
  const fileUrl = `/uploads/${Date.now()}-${file.name}`

  const document = await prisma.document.create({
    data: {
      userId: user.id,
      type: type as DocType,
      fileName: file.name,
      fileUrl,
      fileSize: file.size,
      mimeType: file.type,
      status: 'PENDING',
    },
  })

  return NextResponse.json(document, { status: 201 })
}
