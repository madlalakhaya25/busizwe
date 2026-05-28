export type UserRole = 'MEMBER' | 'ADMIN' | 'SUPER_ADMIN'
export type PolicyStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'LAPSED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'OVERDUE'
export type DocumentType =
  | 'ID_DOCUMENT'
  | 'PROOF_OF_RESIDENCE'
  | 'BANK_STATEMENT'
  | 'DEATH_CERTIFICATE'
  | 'BIRTH_CERTIFICATE'
  | 'MARRIAGE_CERTIFICATE'
  | 'OTHER'
export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type DependantRelationship =
  | 'SPOUSE'
  | 'CHILD'
  | 'PARENT'
  | 'SIBLING'
  | 'GRANDPARENT'
  | 'GRANDCHILD'
  | 'OTHER'
export type AgeGroup = 'AGE_16_64' | 'AGE_65_75' | 'AGE_75_84'
export type ProductCategory =
  | 'PRINCIPAL_MEMBER_SINGLE'
  | 'IMMEDIATE_FAMILY'
  | 'SINGLE_PARENT_FAMILY'
  | 'ADULT_DEPENDANT_ADDON'

export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface PricingTierData {
  id: string
  ageGroup: AgeGroup
  coverAmount: number
  premium: number
}

export interface ProductData {
  id: string
  name: string
  description: string | null
  category: ProductCategory
  isActive: boolean
  pricingTiers: PricingTierData[]
}

export interface PolicyData {
  id: string
  policyNumber: string
  status: PolicyStatus
  monthlyPremium: number
  coverAmount: number
  startDate: string | null
  endDate: string | null
  createdAt: string
  product: {
    id: string
    name: string
    category: ProductCategory
  }
}

export interface DependantData {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  idNumber: string | null
  relationship: DependantRelationship
  phone: string | null
  policyId: string
}

export interface DocumentData {
  id: string
  type: DocumentType
  status: DocumentStatus
  fileName: string
  fileUrl: string
  fileSize: number | null
  createdAt: string
}

export interface PaymentData {
  id: string
  amount: number
  status: PaymentStatus
  dueDate: string
  paidAt: string | null
  reference: string | null
  policyId: string
  policy?: {
    policyNumber: string
  }
}

export interface MemberData {
  id: string
  email: string
  role: UserRole
  createdAt: string
  profile: {
    firstName: string
    lastName: string
    phone: string | null
    idNumber: string | null
  } | null
  policies: { id: string; status: PolicyStatus }[]
}

export interface DashboardStats {
  totalMembers: number
  activePolices: number
  pendingPolicies: number
  totalPremiums: number
  pendingDocuments: number
  overduePayments: number
}
