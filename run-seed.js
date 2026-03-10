const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  const orgId = 'org_' + Date.now();
  const userId = 'usr_' + Date.now();

  await sql`INSERT INTO "Organization" (id, name, slug, plan, active, "createdAt") 
    VALUES (${orgId}, 'Anubis Tech Demo', 'anubis-demo', 'pro', true, NOW()) 
    ON CONFLICT (slug) DO NOTHING`;

  const org = await sql`SELECT id FROM "Organization" WHERE slug = 'anubis-demo' LIMIT 1`;

  await sql`INSERT INTO "User" (id, name, email, password, role, active, "organizationId", "createdAt") 
    VALUES (${userId}, 'Dr. Fernando', 'admin@anubis.com', '$2b$10$0b570QWnNskwfa0LxtVdGOU8GmhWe.ltGZCgreNKQuPFVtjXDVIHe', 'admin', true, ${org[0].id}, NOW()) 
    ON CONFLICT (email) DO NOTHING`;

  console.log('');
  console.log('✅ Seed concluído!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('URL:   /login?org=anubis-demo');
  console.log('Email: admin@anubis.com');
  console.log('Senha: admin123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

seed().catch(console.error);