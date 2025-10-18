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
