# Feature: Database Setup with Neon Postgres and Prisma

## Metadata
issue_number: 3
adw_id: 4e015645
issue_json: {"number":3,"title":"Feature: Database Setup with Neon Postgres and Prisma","body":"## Overview\nSet up Neon Serverless Postgres as the primary database with Prisma ORM. Implement the complete schema from plan.md to support the Prior-Auth MVP.\n\n## Requirements\n\n### Database Provider\n- Create Neon Postgres database (serverless)\n- Configure connection pooling\n- Enable encryption at rest\n- Set up environment variables for connection string\n\n### Prisma ORM Setup\n- Install Prisma CLI and client\n- Initialize Prisma schema\n- Configure for Neon Postgres (connection pooling support)\n- Set up migrations workflow\n\n### Schema Implementation\nImplement all tables from Section 7 of plan.md:\n\n**Core Tables:**\n- `tenants` - Multi-tenant isolation\n- `users` - User accounts with Neon Auth integration\n- `ingestions` - Email/PDF ingestion tracking\n- `cases` - Prior auth cases\n- `case_codes` - CPT/HCPCS codes per case\n- `tasks` - Action items per case\n- `rulesets` - Payer × procedure rules\n- `events` - System events log\n- `audit_logs` - Audit trail\n\n### Key Features\n- Per-tenant scoping (tenant_id on all domain tables)\n- Timestamps (created_at, updated_at where appropriate)\n- JSON fields for flexible data (confidence_json, metadata_json, etc.)\n- Foreign key constraints and indexes\n- Migration files for schema versioning\n\n## Acceptance Criteria\n- [ ] Neon Postgres database created and accessible\n- [ ] Prisma schema matches plan.md Section 7 exactly\n- [ ] Initial migration runs successfully\n- [ ] Database connection works from Next.js app\n- [ ] Can create/read records in all tables\n- [ ] Tenant isolation is enforced in schema\n- [ ] Environment variables properly configured (.env.local)\n- [ ] README updated with database setup instructions\n\n## Technical Details\n- Database: Neon Serverless Postgres\n- ORM: Prisma (latest version)\n- Connection pooling: Yes (Neon supports this natively)\n- Migration strategy: Prisma Migrate\n\n## Notes\n- Do NOT include any PHI fields in default mode\n- Use `member_id_hash` instead of storing actual member IDs\n- Ensure all JSON fields are properly typed in Prisma schema\n- Follow Neon best practices for serverless environments\n- Include seed data script for development (optional)\n\n## Reference\nSee plan.md Section 7 (Data Storage & Schema) for complete schema details."}

## Feature Description

Set up Neon Serverless Postgres as the production-grade database for the Prior-Auth Fastlane MVP with Prisma ORM as the type-safe database client. This feature implements a complete multi-tenant database schema including tenants, users, ingestion tracking, prior authorization cases, tasks, rules, events, and audit logs. The database is designed with strict tenant isolation, comprehensive foreign key relationships, optimized indexes, and JSON fields for flexible data storage. Neon's serverless architecture provides automatic scaling, connection pooling, and encryption at rest, while Prisma delivers type-safe database access with auto-generated TypeScript types and a migration workflow for schema versioning.

## User Story

As a developer building the Prior-Auth Fastlane MVP
I want a production-ready Neon Postgres database with Prisma ORM configured
So that I can store and query prior authorization data with type safety, tenant isolation, and automatic database migrations while leveraging serverless database infrastructure

## Problem Statement

The application currently has no data persistence layer. To build the Prior-Auth Fastlane MVP, we need a relational database to store multi-tenant data including users, cases, tasks, and audit logs. The database must support complex relationships between entities, enforce tenant isolation for security, handle flexible JSON data structures for LLM-extracted information, and provide type-safe database access in TypeScript. Additionally, the database needs to be serverless for automatic scaling and cost efficiency, with connection pooling to handle Next.js serverless function constraints.

## Solution Statement

Provision a Neon Serverless Postgres database which provides PostgreSQL compatibility with automatic scaling, connection pooling, and encryption at rest. Install and configure Prisma ORM to provide type-safe database access with auto-generated TypeScript types, schema migration capabilities, and an intuitive query API. Define a comprehensive Prisma schema with nine core tables: tenants (multi-tenant isolation), users (Neon Auth integration), ingestions (email/PDF tracking), cases (prior auth cases), case_codes (CPT/HCPCS codes), tasks (action items), rulesets (payer rules), events (system events), and audit_logs (compliance trail). Configure direct and pooled connection URLs for both Next.js serverless functions and local development. Generate and run the initial migration to create all tables with proper indexes, constraints, and relationships. Create database client utilities and helper functions for common operations like tenant filtering and transaction management.

## Relevant Files

### Existing Files
- `README.md` - Will be updated with database setup instructions
- `.env.example` - Will be updated with Neon database connection variables
- `package.json` - Will be updated with Prisma dependencies
- `lib/` - Will contain database client and utilities

### New Files

**Prisma Configuration:**
- `prisma/schema.prisma` - Complete database schema definition with all 9 tables
- `prisma/migrations/` - Directory for migration files (auto-generated)
- `prisma/migrations/XXXXXX_init/migration.sql` - Initial migration SQL

**Database Utilities:**
- `lib/db.ts` - Prisma client singleton for connection management
- `lib/db-utils.ts` - Database helper functions (tenant filtering, transactions, etc.)
- `lib/seed.ts` - Optional seed data for development/testing

**Type Definitions:**
- `types/database.ts` - Extended database types and helper types

**Documentation:**
- `docs/database-schema.md` - Database schema documentation with ER diagram

## Implementation Plan

### Phase 1: Foundation

**Neon Database Provisioning:**
Create a new Neon Serverless Postgres project via the Neon console (neon.tech). Select a region close to the Vercel deployment region for low latency. Enable connection pooling (built-in feature). Copy both the direct connection URL (for migrations) and pooled connection URL (for application queries). Configure encryption at rest (enabled by default). Create a development branch in Neon for isolated development work.

**Prisma Installation:**
Install Prisma CLI as a dev dependency and Prisma Client as a runtime dependency using Bun. Initialize the Prisma directory structure with `prisma init` which creates the `prisma/` directory with `schema.prisma` file. Configure the Prisma schema to use PostgreSQL as the provider and set up connection pooling support with the appropriate connection URL format.

### Phase 2: Core Implementation

**Schema Definition:**
Define all 9 core tables in `prisma/schema.prisma` with complete field definitions, proper data types, relationships, indexes, and constraints. Implement the tenant isolation pattern by adding `tenant_id` as a foreign key to all domain tables. Use `@db.Uuid` for all ID fields, `@db.Text` for long strings, `@db.Timestamptz` for timestamps with timezone support, and `@db.JsonB` for JSON fields. Define all relations using Prisma's `@relation` directive with proper cascade behaviors. Add unique constraints for natural keys (e.g., `tenant.slug`, `user.email + tenant_id`). Create indexes for frequently queried fields (tenant_id, status fields, foreign keys, created_at for time-series queries).

**Migration Generation:**
Run `prisma migrate dev --name init` to generate the initial migration SQL. Review the generated SQL to ensure all tables, constraints, indexes, and relationships are correctly defined. Test the migration in development mode. Document the migration strategy for production deployments.

**Prisma Client Setup:**
Create `lib/db.ts` with a Prisma Client singleton pattern that reuses the same client instance across hot-reloads in development (important for Next.js). Configure Prisma Client with logging for development (query, error, warn logs) but minimal logging for production. Export the client instance for use throughout the application.

**Database Utilities:**
Create `lib/db-utils.ts` with helper functions for common patterns like tenant-scoped queries, transaction wrappers, error handling, connection health checks, and pagination utilities. Implement type-safe filters using Prisma's generated types.

### Phase 3: Integration

**Environment Configuration:**
Update `.env.example` with comprehensive database variable documentation including both direct and pooled connection URLs, explanations of when to use each, and example formats. Create `.env.local` for local development with actual connection strings (gitignored). Ensure environment variables are properly typed using Next.js type declarations.

**Next.js Integration:**
Verify database connection works from Next.js API routes and Server Components. Test that connection pooling properly handles serverless function lifecycle. Ensure Prisma Client is properly tree-shaken in the client bundle (only server-side usage).

**Documentation:**
Update README.md with complete database setup instructions including Neon account creation, database provisioning, environment variable configuration, migration commands, and common troubleshooting. Create database schema documentation with table descriptions, field explanations, relationship diagrams, and query examples. Document the migration workflow for both development and production.

**Seed Data (Optional):**
Create `lib/seed.ts` with sample data for development including test tenants, users, cases, and tasks. Provide a `bun run seed` script for easy database population.

## Step by Step Tasks

IMPORTANT: Execute every step in order, top to bottom.

### Task 1: Install Prisma Dependencies

- Install Prisma CLI: `bun add -d prisma`
- Install Prisma Client: `bun add @prisma/client`
- Verify installations in package.json
- Check Prisma version: `bunx prisma --version`

### Task 2: Initialize Prisma

- Run: `bunx prisma init`
- Verify `prisma/` directory is created
- Verify `prisma/schema.prisma` file exists
- Verify `.env` file is created with `DATABASE_URL` placeholder

### Task 3: Provision Neon Database

**Manual step - Document for user:**
- Sign up or log in to Neon (https://neon.tech)
- Create a new project named "prior-auth-fastlane"
- Select region (e.g., US East - Ohio for AWS us-east-2)
- Enable connection pooling (default)
- Copy the connection string from "Connection Details"
- Copy both URLs:
  - Direct URL (for migrations): `postgresql://user:password@host/db`
  - Pooled URL (for app queries): `postgresql://user:password@host/db?pgbouncer=true`
- Store these securely

### Task 4: Configure Environment Variables

- Create `.env.local` file (gitignored)
- Add to `.env.local`:
  ```
  # Neon Postgres - Pooled connection (for app queries)
  DATABASE_URL="postgresql://user:password@host/db?pgbouncer=true&connection_limit=10"

  # Neon Postgres - Direct connection (for migrations)
  DIRECT_DATABASE_URL="postgresql://user:password@host/db"
  ```
- Update `.env.example` with:
  ```
  # Database - Neon Serverless Postgres
  # Pooled connection URL for application queries (use with Prisma Client)
  DATABASE_URL=postgresql://user:password@host/db?pgbouncer=true&connection_limit=10

  # Direct connection URL for migrations and schema operations
  DIRECT_DATABASE_URL=postgresql://user:password@host/db
  ```

### Task 5: Define Prisma Schema - Core Configuration

- Open `prisma/schema.prisma`
- Replace with core configuration:
  ```prisma
  generator client {
    provider = "prisma-client-js"
    previewFeatures = ["jsonProtocol"]
  }

  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    directUrl = env("DIRECT_DATABASE_URL")
  }
  ```

### Task 6: Define Tenants Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model Tenant {
    id         String   @id @default(uuid()) @db.Uuid
    slug       String   @unique @db.VarChar(100)
    name       String   @db.VarChar(255)
    created_at DateTime @default(now()) @db.Timestamptz(6)
    updated_at DateTime @updatedAt @db.Timestamptz(6)

    // Relations
    users       User[]
    ingestions  Ingestion[]
    cases       Case[]
    rulesets    Ruleset[]
    events      Event[]
    audit_logs  AuditLog[]

    @@map("tenants")
  }
  ```

### Task 7: Define Users Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model User {
    id         String   @id @default(uuid()) @db.Uuid
    tenant_id  String   @db.Uuid
    email      String   @db.VarChar(255)
    name       String?  @db.VarChar(255)
    role       String   @db.VarChar(50) // e.g., 'admin', 'clinician', 'staff'
    auth_id    String?  @unique @db.VarChar(255) // Neon Auth user ID
    created_at DateTime @default(now()) @db.Timestamptz(6)
    updated_at DateTime @updatedAt @db.Timestamptz(6)

    // Relations
    tenant           Tenant      @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
    created_cases    Case[]      @relation("CaseCreator")
    assigned_tasks   Task[]
    created_events   Event[]
    created_audits   AuditLog[]

    @@unique([email, tenant_id])
    @@index([tenant_id])
    @@index([auth_id])
    @@map("users")
  }
  ```

### Task 8: Define Ingestions Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model Ingestion {
    id              String   @id @default(uuid()) @db.Uuid
    tenant_id       String   @db.Uuid
    source_type     String   @db.VarChar(50) // 'email' or 'pdf'
    source_metadata Json     @db.JsonB // email metadata or PDF metadata
    storage_path    String?  @db.Text // R2 path to stored file
    status          String   @db.VarChar(50) // 'pending', 'processing', 'completed', 'failed'
    error_message   String?  @db.Text
    created_at      DateTime @default(now()) @db.Timestamptz(6)
    updated_at      DateTime @updatedAt @db.Timestamptz(6)

    // Relations
    tenant Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
    cases  Case[]

    @@index([tenant_id])
    @@index([status])
    @@index([created_at])
    @@map("ingestions")
  }
  ```

### Task 9: Define Cases Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model Case {
    id                String    @id @default(uuid()) @db.Uuid
    tenant_id         String    @db.Uuid
    ingestion_id      String?   @db.Uuid
    created_by        String    @db.Uuid
    member_id_hash    String    @db.VarChar(255) // Hashed member ID (no PHI)
    payer             String    @db.VarChar(255)
    status            String    @db.VarChar(50) // 'pending', 'approved', 'denied', 'more_info_needed'
    priority          String    @default("normal") @db.VarChar(50) // 'low', 'normal', 'high', 'urgent'
    diagnosis_codes   String[]  @db.VarChar(20)
    confidence_json   Json      @db.JsonB // LLM confidence scores
    extracted_data    Json      @db.JsonB // Raw extracted data from PDF/email
    metadata_json     Json?     @db.JsonB // Additional metadata
    created_at        DateTime  @default(now()) @db.Timestamptz(6)
    updated_at        DateTime  @updatedAt @db.Timestamptz(6)

    // Relations
    tenant      Tenant      @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
    ingestion   Ingestion?  @relation(fields: [ingestion_id], references: [id], onDelete: SetNull)
    creator     User        @relation("CaseCreator", fields: [created_by], references: [id], onDelete: Cascade)
    codes       CaseCode[]
    tasks       Task[]

    @@index([tenant_id])
    @@index([member_id_hash])
    @@index([status])
    @@index([priority])
    @@index([payer])
    @@index([created_at])
    @@map("cases")
  }
  ```

### Task 10: Define CaseCodes Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model CaseCode {
    id           String   @id @default(uuid()) @db.Uuid
    case_id      String   @db.Uuid
    code_type    String   @db.VarChar(50) // 'CPT', 'HCPCS'
    code         String   @db.VarChar(20)
    description  String?  @db.Text
    confidence   Float?   @db.DoublePrecision // LLM confidence score
    created_at   DateTime @default(now()) @db.Timestamptz(6)

    // Relations
    case Case @relation(fields: [case_id], references: [id], onDelete: Cascade)

    @@index([case_id])
    @@index([code_type, code])
    @@map("case_codes")
  }
  ```

### Task 11: Define Tasks Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model Task {
    id          String    @id @default(uuid()) @db.Uuid
    case_id     String    @db.Uuid
    assigned_to String?   @db.Uuid
    title       String    @db.VarChar(255)
    description String?   @db.Text
    status      String    @default("pending") @db.VarChar(50) // 'pending', 'in_progress', 'completed', 'cancelled'
    priority    String    @default("normal") @db.VarChar(50) // 'low', 'normal', 'high', 'urgent'
    due_date    DateTime? @db.Timestamptz(6)
    completed_at DateTime? @db.Timestamptz(6)
    created_at  DateTime  @default(now()) @db.Timestamptz(6)
    updated_at  DateTime  @updatedAt @db.Timestamptz(6)

    // Relations
    case     Case  @relation(fields: [case_id], references: [id], onDelete: Cascade)
    assignee User? @relation(fields: [assigned_to], references: [id], onDelete: SetNull)

    @@index([case_id])
    @@index([assigned_to])
    @@index([status])
    @@index([due_date])
    @@map("tasks")
  }
  ```

### Task 12: Define Rulesets Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model Ruleset {
    id          String   @id @default(uuid()) @db.Uuid
    tenant_id   String   @db.Uuid
    payer       String   @db.VarChar(255)
    procedure   String   @db.VarChar(255)
    rules_json  Json     @db.JsonB // Structured rules data
    is_active   Boolean  @default(true)
    created_at  DateTime @default(now()) @db.Timestamptz(6)
    updated_at  DateTime @updatedAt @db.Timestamptz(6)

    // Relations
    tenant Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)

    @@index([tenant_id])
    @@index([payer])
    @@index([procedure])
    @@index([is_active])
    @@map("rulesets")
  }
  ```

### Task 13: Define Events Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model Event {
    id          String   @id @default(uuid()) @db.Uuid
    tenant_id   String   @db.Uuid
    user_id     String?  @db.Uuid
    event_type  String   @db.VarChar(100) // e.g., 'case_created', 'task_completed'
    entity_type String?  @db.VarChar(100) // 'case', 'task', 'user', etc.
    entity_id   String?  @db.Uuid
    metadata    Json?    @db.JsonB
    created_at  DateTime @default(now()) @db.Timestamptz(6)

    // Relations
    tenant Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
    user   User?  @relation(fields: [user_id], references: [id], onDelete: SetNull)

    @@index([tenant_id])
    @@index([event_type])
    @@index([entity_type, entity_id])
    @@index([created_at])
    @@map("events")
  }
  ```

### Task 14: Define AuditLogs Table

- Add to `prisma/schema.prisma`:
  ```prisma
  model AuditLog {
    id          String   @id @default(uuid()) @db.Uuid
    tenant_id   String   @db.Uuid
    user_id     String?  @db.Uuid
    action      String   @db.VarChar(100) // 'create', 'update', 'delete', 'view'
    entity_type String   @db.VarChar(100) // 'case', 'task', 'user', etc.
    entity_id   String   @db.Uuid
    changes     Json?    @db.JsonB // Before/after diff
    ip_address  String?  @db.VarChar(45) // IPv4 or IPv6
    user_agent  String?  @db.Text
    created_at  DateTime @default(now()) @db.Timestamptz(6)

    // Relations
    tenant Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
    user   User?  @relation(fields: [user_id], references: [id], onDelete: SetNull)

    @@index([tenant_id])
    @@index([user_id])
    @@index([action])
    @@index([entity_type, entity_id])
    @@index([created_at])
    @@map("audit_logs")
  }
  ```

### Task 15: Format and Validate Schema

- Run: `bunx prisma format` (formats schema.prisma)
- Run: `bunx prisma validate` (validates schema)
- Fix any validation errors reported
- Review entire schema for consistency

### Task 16: Generate Initial Migration

- Run: `bunx prisma migrate dev --name init`
- This will:
  - Connect to database using DIRECT_DATABASE_URL
  - Generate migration SQL in `prisma/migrations/XXXXXX_init/`
  - Apply migration to database
  - Generate Prisma Client
- Review generated migration SQL
- Verify all tables, indexes, and constraints are correct

### Task 17: Verify Database Tables

- Run: `bunx prisma studio` (opens Prisma Studio GUI)
- Verify all 9 tables exist:
  - tenants
  - users
  - ingestions
  - cases
  - case_codes
  - tasks
  - rulesets
  - events
  - audit_logs
- Check table structures in Prisma Studio
- Close Prisma Studio (Ctrl+C)

### Task 18: Create Database Client Singleton

- Create `lib/db.ts`:
  ```typescript
  import { PrismaClient } from '@prisma/client'

  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
  }

  export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
    })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

  export default db
  ```

### Task 19: Create Database Utilities

- Create `lib/db-utils.ts`:
  ```typescript
  import { Prisma } from '@prisma/client'
  import { db } from './db'

  /**
   * Tenant-scoped query helper
   * Automatically filters queries by tenant_id
   */
  export function scopeToTenant<T extends { tenant_id?: string }>(
    tenantId: string,
    where?: T
  ): T {
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
  export async function transaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return db.$transaction(fn)
  }

  /**
   * Get paginated results with metadata
   */
  export async function paginate<T>(
    model: any,
    params: {
      where?: any
      orderBy?: any
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
  ```

### Task 20: Create Extended Database Types

- Create `types/database.ts`:
  ```typescript
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
  ```

### Task 21: Test Database Connection

- Create test file `lib/__test-db-connection.ts`:
  ```typescript
  import { db } from './db'
  import { checkDatabaseHealth } from './db-utils'

  async function testConnection() {
    console.log('Testing database connection...')

    const isHealthy = await checkDatabaseHealth()
    console.log('Database health check:', isHealthy ? '✅ PASSED' : '❌ FAILED')

    if (isHealthy) {
      const tenantCount = await db.tenant.count()
      console.log(`Total tenants: ${tenantCount}`)
    }

    await db.$disconnect()
  }

  testConnection().catch(console.error)
  ```
- Run: `bun run lib/__test-db-connection.ts`
- Verify connection succeeds and returns tenant count (0)
- Delete test file after verification

### Task 22: Update Package.json Scripts

- Add Prisma scripts to package.json:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "db:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:seed": "bun run lib/seed.ts",
    "db:reset": "prisma migrate reset"
  }
  ```

### Task 23: Create Seed Data Script (Optional)

- Create `lib/seed.ts`:
  ```typescript
  import { db } from './db'

  async function seed() {
    console.log('🌱 Seeding database...')

    // Create test tenant
    const tenant = await db.tenant.upsert({
      where: { slug: 'test-clinic' },
      update: {},
      create: {
        slug: 'test-clinic',
        name: 'Test Clinic',
      },
    })
    console.log('✅ Created tenant:', tenant.slug)

    // Create test user
    const user = await db.user.upsert({
      where: {
        email_tenant_id: {
          email: 'admin@test-clinic.com',
          tenant_id: tenant.id
        }
      },
      update: {},
      create: {
        tenant_id: tenant.id,
        email: 'admin@test-clinic.com',
        name: 'Admin User',
        role: 'admin',
      },
    })
    console.log('✅ Created user:', user.email)

    // Create test case
    const testCase = await db.case.create({
      data: {
        tenant_id: tenant.id,
        created_by: user.id,
        member_id_hash: 'hash_test_member_001',
        payer: 'Blue Cross Blue Shield',
        status: 'pending',
        priority: 'normal',
        diagnosis_codes: ['M79.3', 'M25.561'],
        confidence_json: {
          overall: 0.92,
          fields: {
            member_id: 0.95,
            payer: 0.98,
            diagnosis: 0.89,
          },
        },
        extracted_data: {
          source: 'email',
          extracted_at: new Date().toISOString(),
        },
      },
    })
    console.log('✅ Created case:', testCase.id)

    // Create test task
    await db.task.create({
      data: {
        case_id: testCase.id,
        assigned_to: user.id,
        title: 'Review prior auth request',
        description: 'Review the extracted data and verify all required information is present.',
        status: 'pending',
        priority: 'normal',
      },
    })
    console.log('✅ Created task')

    console.log('✅ Seed completed successfully')
  }

  seed()
    .catch((e) => {
      console.error('❌ Seed failed:', e)
      process.exit(1)
    })
    .finally(async () => {
      await db.$disconnect()
    })
  ```

### Task 24: Update README with Database Setup

- Add section to README.md after "Environment Variables":
  ```markdown
  ## Database Setup

  This project uses [Neon Serverless Postgres](https://neon.tech) with [Prisma ORM](https://www.prisma.io).

  ### Prerequisites

  - Neon account (free tier available)
  - Database connection strings (see Environment Variables)

  ### Initial Setup

  1. **Create Neon Database:**
     - Sign up at https://neon.tech
     - Create a new project: "prior-auth-fastlane"
     - Copy the connection string from Connection Details
     - You need both:
       - **Pooled connection** (for app queries): ends with `?pgbouncer=true`
       - **Direct connection** (for migrations): standard PostgreSQL URL

  2. **Configure Environment Variables:**
     ```bash
     cp .env.example .env.local
     ```
     Add your Neon connection strings to `.env.local`:
     - `DATABASE_URL` = Pooled connection
     - `DIRECT_DATABASE_URL` = Direct connection

  3. **Run Migrations:**
     ```bash
     bun run db:migrate
     ```
     This creates all database tables and schema.

  4. **Verify Setup:**
     ```bash
     bun run db:studio
     ```
     Opens Prisma Studio to browse your database.

  ### Database Commands

  - `bun run db:migrate` - Create and apply new migrations
  - `bun run db:migrate:deploy` - Apply migrations in production
  - `bun run db:generate` - Generate Prisma Client (auto-runs after migrate)
  - `bun run db:studio` - Open Prisma Studio GUI
  - `bun run db:seed` - Populate database with test data
  - `bun run db:reset` - Reset database (WARNING: deletes all data)

  ### Schema Overview

  The database uses a multi-tenant architecture with the following core tables:

  - **tenants** - Organization/clinic isolation
  - **users** - User accounts with role-based access
  - **ingestions** - Email/PDF ingestion tracking
  - **cases** - Prior authorization cases
  - **case_codes** - CPT/HCPCS procedure codes
  - **tasks** - Action items assigned to users
  - **rulesets** - Payer-specific rules
  - **events** - System event log
  - **audit_logs** - Compliance audit trail

  All domain tables include `tenant_id` for data isolation.

  ### Prisma Client Usage

  Import the database client in your code:

  ```typescript
  import { db } from '@/lib/db'

  // Query examples
  const cases = await db.case.findMany({
    where: { tenant_id: tenantId, status: 'pending' },
    include: { codes: true, tasks: true }
  })
  ```

  See [Prisma Client documentation](https://www.prisma.io/docs/concepts/components/prisma-client) for query API.
  ```

### Task 25: Create Database Schema Documentation

- Create `docs/` directory if it doesn't exist
- Create `docs/database-schema.md`:
  ```markdown
  # Database Schema

  ## Overview

  Multi-tenant PostgreSQL database for Prior-Auth Fastlane MVP.

  ## Tables

  ### tenants
  Root table for multi-tenant isolation.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | slug | VARCHAR(100) | URL-safe identifier (unique) |
  | name | VARCHAR(255) | Display name |
  | created_at | TIMESTAMPTZ | Creation timestamp |
  | updated_at | TIMESTAMPTZ | Last update timestamp |

  ### users
  User accounts with role-based access control.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | tenant_id | UUID | Foreign key to tenants |
  | email | VARCHAR(255) | Email address |
  | name | VARCHAR(255) | Full name (nullable) |
  | role | VARCHAR(50) | admin/clinician/staff |
  | auth_id | VARCHAR(255) | Neon Auth user ID (unique) |
  | created_at | TIMESTAMPTZ | Creation timestamp |
  | updated_at | TIMESTAMPTZ | Last update timestamp |

  **Unique constraint:** (email, tenant_id)

  ### ingestions
  Tracks email/PDF ingestion pipeline.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | tenant_id | UUID | Foreign key to tenants |
  | source_type | VARCHAR(50) | 'email' or 'pdf' |
  | source_metadata | JSONB | Email/PDF metadata |
  | storage_path | TEXT | R2 storage path (nullable) |
  | status | VARCHAR(50) | pending/processing/completed/failed |
  | error_message | TEXT | Error details (nullable) |
  | created_at | TIMESTAMPTZ | Creation timestamp |
  | updated_at | TIMESTAMPTZ | Last update timestamp |

  ### cases
  Prior authorization cases.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | tenant_id | UUID | Foreign key to tenants |
  | ingestion_id | UUID | Foreign key to ingestions (nullable) |
  | created_by | UUID | Foreign key to users |
  | member_id_hash | VARCHAR(255) | Hashed member identifier |
  | payer | VARCHAR(255) | Insurance payer name |
  | status | VARCHAR(50) | pending/approved/denied/more_info_needed |
  | priority | VARCHAR(50) | low/normal/high/urgent |
  | diagnosis_codes | VARCHAR(20)[] | ICD-10 diagnosis codes |
  | confidence_json | JSONB | LLM confidence scores |
  | extracted_data | JSONB | Raw extracted data |
  | metadata_json | JSONB | Additional metadata (nullable) |
  | created_at | TIMESTAMPTZ | Creation timestamp |
  | updated_at | TIMESTAMPTZ | Last update timestamp |

  ### case_codes
  CPT/HCPCS procedure codes per case.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | case_id | UUID | Foreign key to cases |
  | code_type | VARCHAR(50) | 'CPT' or 'HCPCS' |
  | code | VARCHAR(20) | Procedure code |
  | description | TEXT | Code description (nullable) |
  | confidence | DOUBLE PRECISION | LLM confidence (nullable) |
  | created_at | TIMESTAMPTZ | Creation timestamp |

  ### tasks
  Action items assigned to users.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | case_id | UUID | Foreign key to cases |
  | assigned_to | UUID | Foreign key to users (nullable) |
  | title | VARCHAR(255) | Task title |
  | description | TEXT | Task details (nullable) |
  | status | VARCHAR(50) | pending/in_progress/completed/cancelled |
  | priority | VARCHAR(50) | low/normal/high/urgent |
  | due_date | TIMESTAMPTZ | Due date (nullable) |
  | completed_at | TIMESTAMPTZ | Completion timestamp (nullable) |
  | created_at | TIMESTAMPTZ | Creation timestamp |
  | updated_at | TIMESTAMPTZ | Last update timestamp |

  ### rulesets
  Payer-specific authorization rules.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | tenant_id | UUID | Foreign key to tenants |
  | payer | VARCHAR(255) | Payer name |
  | procedure | VARCHAR(255) | Procedure name/code |
  | rules_json | JSONB | Structured rules |
  | is_active | BOOLEAN | Active flag (default: true) |
  | created_at | TIMESTAMPTZ | Creation timestamp |
  | updated_at | TIMESTAMPTZ | Last update timestamp |

  ### events
  System event log for monitoring.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | tenant_id | UUID | Foreign key to tenants |
  | user_id | UUID | Foreign key to users (nullable) |
  | event_type | VARCHAR(100) | Event type identifier |
  | entity_type | VARCHAR(100) | Entity type (nullable) |
  | entity_id | UUID | Entity identifier (nullable) |
  | metadata | JSONB | Event metadata (nullable) |
  | created_at | TIMESTAMPTZ | Creation timestamp |

  ### audit_logs
  Compliance audit trail.

  | Column | Type | Description |
  |--------|------|-------------|
  | id | UUID | Primary key |
  | tenant_id | UUID | Foreign key to tenants |
  | user_id | UUID | Foreign key to users (nullable) |
  | action | VARCHAR(100) | create/update/delete/view |
  | entity_type | VARCHAR(100) | Entity type |
  | entity_id | UUID | Entity identifier |
  | changes | JSONB | Before/after diff (nullable) |
  | ip_address | VARCHAR(45) | Client IP (nullable) |
  | user_agent | TEXT | Client user agent (nullable) |
  | created_at | TIMESTAMPTZ | Creation timestamp |

  ## Indexes

  All tables include optimized indexes for:
  - Foreign keys (tenant_id, case_id, user_id, etc.)
  - Status fields
  - Time-series queries (created_at)
  - Frequently filtered fields (payer, member_id_hash, etc.)

  ## Relationships

  ```
  tenants (1) → (N) users
  tenants (1) → (N) ingestions
  tenants (1) → (N) cases
  tenants (1) → (N) rulesets
  tenants (1) → (N) events
  tenants (1) → (N) audit_logs

  users (1) → (N) cases [created_by]
  users (1) → (N) tasks [assigned_to]

  ingestions (1) → (N) cases

  cases (1) → (N) case_codes
  cases (1) → (N) tasks
  ```

  ## Security Considerations

  - **No PHI**: Uses `member_id_hash` instead of actual member IDs
  - **Tenant isolation**: All queries must filter by `tenant_id`
  - **Audit trail**: All mutations logged in `audit_logs`
  - **Encryption at rest**: Enabled by default in Neon
  - **Connection pooling**: Reduces connection overhead for serverless

  ## JSON Field Schemas

  ### confidence_json
  ```typescript
  {
    overall: number,      // 0.0 - 1.0
    fields: {
      [fieldName: string]: number  // 0.0 - 1.0
    }
  }
  ```

  ### source_metadata (ingestions)
  ```typescript
  {
    email?: {
      from: string,
      subject: string,
      received_at: string
    },
    pdf?: {
      filename: string,
      pages: number,
      size_bytes: number
    }
  }
  ```

  ### rules_json (rulesets)
  ```typescript
  {
    requirements: string[],
    documentation: string[],
    typical_turnaround: string,
    notes?: string
  }
  ```
  ```

### Task 26: Validation

- Run all validation commands below
- Verify zero errors in all checks
- Verify database connection works
- Verify Prisma Studio opens successfully
- Verify seed data populates database (if created)

## Testing Strategy

### Unit Tests

No unit tests required for initial database setup. Future features will add:
- Database utility function tests (using test database)
- Prisma Client mock tests for application logic
- Transaction rollback tests

### Integration Tests

Manual integration testing:

1. **Connection Test**: Verify database connection from Next.js API route
2. **CRUD Operations**: Test create, read, update, delete on each table
3. **Relationships**: Verify foreign key constraints and cascade behaviors
4. **Indexes**: Check query performance with EXPLAIN ANALYZE
5. **Tenant Isolation**: Verify queries properly filter by tenant_id
6. **Transaction Test**: Verify rollback on error
7. **Prisma Studio**: Browse all tables and verify schema

### Edge Cases

- **Connection Pooling**: Verify pooled connections work in serverless environment
- **Large JSON Fields**: Test with large confidence_json and extracted_data
- **Cascade Deletes**: Verify deleting tenant cascades to all related records
- **Unique Constraints**: Test email+tenant_id uniqueness enforcement
- **Null Handling**: Verify nullable fields accept and return null correctly
- **Timestamp Precision**: Verify timestamps with timezone work correctly
- **Array Fields**: Test diagnosis_codes array operations
- **UUID Generation**: Verify UUIDs are unique and properly formatted

## Acceptance Criteria

- Neon Postgres database is provisioned and accessible
- Prisma is installed and configured (CLI + Client)
- Environment variables are configured (.env.local and .env.example)
- Schema file includes all 9 tables with correct types and relationships
- Initial migration is generated and applied successfully
- All tables exist in database with correct structure
- All indexes are created properly
- Foreign key constraints are enforced
- Database client singleton (lib/db.ts) is created and working
- Database utilities (lib/db-utils.ts) provide helper functions
- Extended types (types/database.ts) are defined
- Connection test succeeds from TypeScript
- Prisma Studio opens and displays all tables
- README includes complete database setup documentation
- Database schema documentation is created
- Package.json includes all database scripts
- Seed script populates test data (optional but recommended)
- `bun run db:migrate` completes without errors
- `bun run db:generate` generates Prisma Client successfully
- `bun run db:studio` opens Prisma Studio
- `bun run type-check` passes with zero errors (Prisma types are valid)

## Validation Commands

Execute every command to validate the feature works correctly with zero regressions.

```bash
# 1. Verify Prisma is installed
bunx prisma --version

# 2. Validate schema file
bunx prisma validate

# 3. Format schema file
bunx prisma format

# 4. Check migration status
bunx prisma migrate status

# 5. Generate Prisma Client
bun run db:generate

# 6. Type check (verify Prisma types work)
bun run type-check

# 7. Open Prisma Studio (manual verification)
bun run db:studio
# Verify all 9 tables exist and have correct structure
# Close with Ctrl+C

# 8. Run seed script (if created)
bun run db:seed

# 9. Verify seed data in Prisma Studio
bun run db:studio
# Check that test data exists in tables
# Close with Ctrl+C

# 10. Build Next.js app (verify Prisma Client works in build)
bun run build

# 11. Lint (should pass)
bun run lint

# 12. Format check (should pass)
bun run format:check
```

## Notes

- **Neon Serverless Benefits**: Automatic scaling, connection pooling, branch databases for dev/staging, encryption at rest, point-in-time recovery
- **Connection URLs**: Use pooled URL for queries, direct URL for migrations (Prisma handles this automatically with `directUrl` in schema)
- **Prisma Client Generation**: Auto-runs after migrations, provides full TypeScript types for all tables and relationships
- **Migration Strategy**: Always use Prisma Migrate in development (`migrate dev`), use `migrate deploy` in production
- **Schema Changes**: Never edit migrations manually, always use `prisma migrate dev --name description` to create new migrations
- **Multi-Tenant Security**: Always filter by `tenant_id` in application code, consider row-level security (RLS) for additional protection
- **JSON Fields**: Use JSONB (not JSON) for better performance and indexing support
- **UUID vs Auto-Increment**: UUIDs prevent ID enumeration attacks and work better in distributed systems
- **Timestamp with Timezone**: Always use `timestamptz` not `timestamp` to avoid timezone issues
- **Prisma Studio**: Excellent for debugging and manual data operations, don't expose to production
- **Performance**: Add indexes for all frequently queried fields, use `EXPLAIN ANALYZE` to optimize slow queries
- **Future Enhancements**: Consider adding full-text search (PostgreSQL tsvector), soft deletes, versioning (temporal tables)
- **Backup Strategy**: Neon provides automatic backups, document recovery procedures
- **Development Workflow**: Use Neon branch databases for feature development (isolates schema changes)
- **Prisma Schema Organization**: Keep schema file organized by domain (authentication, cases, audit), use comments generously
- **No PHI Storage**: Critical requirement - never store actual member IDs, names, dates of birth, or other PHI without proper encryption and compliance review
