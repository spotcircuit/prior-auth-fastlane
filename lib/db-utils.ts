import { Prisma } from '@prisma/client'
import { db } from './db'

/**
 * Tenant-scoped query helper
 * Automatically filters queries by tenant_id
 */
export function scopeToTenant<T extends { tenant_id?: string }>(tenantId: string, where?: T): T {
  return {
    ...where,
    tenant_id: tenantId,
  } as T
}

/**
 * Health check - verify database connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}

/**
 * Transaction wrapper with automatic rollback
 */
export async function transaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  return db.$transaction(fn)
}

/**
 * Get paginated results with metadata
 */
export async function paginate<T>(
  model: {
    findMany: (args: {
      where?: unknown
      orderBy?: unknown
      skip: number
      take: number
    }) => Promise<T[]>
    count: (args: { where?: unknown }) => Promise<number>
  },
  params: {
    where?: unknown
    orderBy?: unknown
    page?: number
    pageSize?: number
  }
): Promise<{
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}> {
  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 20
  const skip = (page - 1) * pageSize

  const [data, total] = await Promise.all([
    model.findMany({
      where: params.where,
      orderBy: params.orderBy,
      skip,
      take: pageSize,
    }),
    model.count({ where: params.where }),
  ])

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export default db
