import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/getOrCreateUser'

export async function PUT(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { firstName, lastName, phone, address, city, province, postalCode, idNumber, dateOfBirth } = body

  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json({ error: 'First and last name are required' }, { status: 400 })
  }

  try {
    const user = await getOrCreateUser(userId)

    const data = {
      firstName:   firstName.trim(),
      lastName:    lastName.trim(),
      phone:       phone?.trim()       || null,
      address:     address?.trim()     || null,
      city:        city?.trim()        || null,
      province:    province?.trim()    || null,
      postalCode:  postalCode?.trim()  || null,
      idNumber:    idNumber?.trim()    || null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    }

    await prisma.profile.upsert({
      where:  { userId: user.id },
      update: data,
      create: { userId: user.id, ...data },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
