import type { Prisma } from '@prisma/client'

// Case with relations
export type CaseWithRelations = Prisma.CaseGetPayload<{
  include: {
    tenant: true
    ingestion: true
    creator: true
    codes: true
    tasks: true
  }
}>

// User with relations
export type UserWithTenant = Prisma.UserGetPayload<{
  include: {
    tenant: true
  }
}>

// Task with relations
export type TaskWithRelations = Prisma.TaskGetPayload<{
  include: {
    case: true
    assignee: true
  }
}>

// Confidence JSON structure
export interface ConfidenceScores {
  overall: number
  fields: {
    [key: string]: number
  }
}

// Case status enum
export type CaseStatus = 'pending' | 'approved' | 'denied' | 'more_info_needed'

// Task status enum
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

// Priority enum
export type Priority = 'low' | 'normal' | 'high' | 'urgent'

// User role enum
export type UserRole = 'admin' | 'clinician' | 'staff'
