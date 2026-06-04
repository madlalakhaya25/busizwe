import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/getOrCreateUser'

export async function PUT(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const {
    firstName, lastName, phone, idNumber, dateOfBirth,
    address, city, province, postalCode,
    gender, alternativePhone,
    bankName, bankAccount, bankBranch,
    nextOfKinName, nextOfKinPhone, nextOfKinRelationship,
  } = body

  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json({ error: 'First and last name are required' }, { status: 400 })
  }

  try {
    const user = await getOrCreateUser(userId)

    const data = {
      firstName:   firstName.trim(),
      lastName:    lastName.trim(),
      phone:       phone?.trim()              || null,
      idNumber:    idNumber?.trim()           || null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      address:     address?.trim()            || null,
      city:        city?.trim()               || null,
      province:    province?.trim()           || null,
      postalCode:  postalCode?.trim()         || null,
      gender:      gender?.trim()             || null,
      alternativePhone:      alternativePhone?.trim()      || null,
      bankName:              bankName?.trim()              || null,
      bankAccount:           bankAccount?.trim()           || null,
      bankBranch:            bankBranch?.trim()            || null,
      nextOfKinName:         nextOfKinName?.trim()         || null,
      nextOfKinPhone:        nextOfKinPhone?.trim()        || null,
      nextOfKinRelationship: nextOfKinRelationship?.trim() || null,
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
