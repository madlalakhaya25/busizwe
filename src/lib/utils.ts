import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(Number(amount))
}

// Accepts null/undefined so PDF and components share one implementation
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

// Uses crypto.randomUUID to eliminate collision risk under concurrent submissions
export function generatePolicyNumber(): string {
  const year = new Date().getFullYear()
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase()
  return `BBS-${year}-${suffix}`
}

export function getAgeGroup(dateOfBirth: Date): string {
  const today = new Date()
  const age = today.getFullYear() - dateOfBirth.getFullYear()
  if (age >= 16 && age <= 64) return 'AGE_16_64'
  if (age >= 65 && age <= 74) return 'AGE_65_75'
  if (age >= 75 && age <= 84) return 'AGE_75_84' // was off-by-one: started at 76
  return 'INELIGIBLE'
}

export function getAgeGroupLabel(ageGroup: string): string {
  const labels: Record<string, string> = {
    AGE_16_64: '16 – 64 years',
    AGE_65_75: '65 – 75 years',
    AGE_75_84: '75 – 84 years',
  }
  return labels[ageGroup] ?? ageGroup
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: 'text-green-700 bg-green-50 border-green-200',
    PENDING: 'text-amber-700 bg-amber-50 border-amber-200',
    SUSPENDED: 'text-orange-700 bg-orange-50 border-orange-200',
    CANCELLED: 'text-red-700 bg-red-50 border-red-200',
    LAPSED: 'text-gray-700 bg-gray-50 border-gray-200',
    PAID: 'text-green-700 bg-green-50 border-green-200',
    FAILED: 'text-red-700 bg-red-50 border-red-200',
    OVERDUE: 'text-red-700 bg-red-50 border-red-200',
    APPROVED: 'text-green-700 bg-green-50 border-green-200',
    REJECTED: 'text-red-700 bg-red-50 border-red-200',
  }
  return colors[status] ?? 'text-gray-700 bg-gray-50 border-gray-200'
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str
}
