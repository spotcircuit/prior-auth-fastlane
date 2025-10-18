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
        tenant_id: tenant.id,
      },
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
