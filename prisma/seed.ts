import { PrismaClient } from "@prisma/client"
import * as dotenv from "dotenv"

dotenv.config()

// Para o seed usamos a URL direta (sem pooler)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL!,
    },
  },
} as any)

async function main() {
  console.log("🌱 Criando dados iniciais...")

  const org = await (prisma as any).organization.upsert({
    where: { slug: "anubis-demo" },
    update: {},
    create: {
      name: "Anubis Tech Demo",
      slug: "anubis-demo",
      plan: "pro",
      active: true,
    },
  })

  console.log("✅ Organização criada:", org.slug)

  const user = await (prisma as any).user.upsert({
    where: { email: "admin@anubis.com" },
    update: {},
    create: {
      name: "Dr. Fernando",
      email: "admin@anubis.com",
      password: "$2b$10$0b570QWnNskwfa0LxtVdGOU8GmhWe.ltGZCgreNKQuPFVtjXDVIHe",
      role: "admin",
      organizationId: org.id,
    },
  })

  console.log("✅ Usuário admin criado:", user.email)

  const client1 = await (prisma as any).client.create({
    data: { name: "Maria Oliveira Silva", email: "maria@email.com", phone: "(11) 99999-1234", type: "PF", organizationId: org.id },
  })
  const client2 = await (prisma as any).client.create({
    data: { name: "TechBrasil Ltda", email: "juridico@techbrasil.com.br", phone: "(11) 3456-7890", type: "PJ", organizationId: org.id },
  })
  const client3 = await (prisma as any).client.create({
    data: { name: "João Carlos Mendes", email: "joao.mendes@email.com", phone: "(21) 98888-5678", type: "PF", organizationId: org.id },
  })

  console.log("✅ Clientes criados")

  const case1 = await (prisma as any).case.create({
    data: { number: "1234567-89.2025.8.26.0001", title: "Ação de Indenização por Danos Morais", status: "active", area: "civil", court: "2ª Vara Cível - SP", organizationId: org.id, clientId: client1.id, assignedToId: user.id },
  })
  const case2 = await (prisma as any).case.create({
    data: { number: "9876543-21.2025.5.02.0001", title: "Reclamatória Trabalhista", status: "active", area: "labor", court: "3ª Vara do Trabalho - RJ", organizationId: org.id, clientId: client3.id, assignedToId: user.id },
  })
  const case3 = await (prisma as any).case.create({
    data: { number: "5555555-00.2024.8.13.0001", title: "Execução Fiscal - ICMS", status: "waiting", area: "tax", court: "1ª Vara da Fazenda Pública - SP", organizationId: org.id, clientId: client2.id, assignedToId: user.id },
  })

  console.log("✅ Processos criados")

  await (prisma as any).deadline.createMany({
    data: [
      { title: "Réplica à Contestação", type: "ordinary", dueDate: new Date(), caseId: case1.id, organizationId: org.id, assignedToId: user.id },
      { title: "Juntada de Documentos", type: "diligence", dueDate: new Date(Date.now() + 1*24*60*60*1000), caseId: case2.id, organizationId: org.id, assignedToId: user.id },
      { title: "Contestação - Ação de Indenização", type: "fatal", dueDate: new Date(Date.now() + 2*24*60*60*1000), caseId: case1.id, organizationId: org.id, assignedToId: user.id },
      { title: "Audiência de Conciliação", type: "hearing", dueDate: new Date(Date.now() + 5*24*60*60*1000), caseId: case2.id, organizationId: org.id, assignedToId: user.id },
    ],
  })

  console.log("✅ Prazos criados")

  await (prisma as any).timeLog.createMany({
    data: [
      { description: "Elaboração de recurso", hours: 8, ratePerHour: 500, date: new Date("2026-03-08"), caseId: case3.id, organizationId: org.id, userId: user.id },
      { description: "Preparação para audiência", hours: 3, ratePerHour: 350, date: new Date("2026-03-07"), caseId: case2.id, organizationId: org.id, userId: user.id },
      { description: "Pesquisa jurisprudencial", hours: 5, ratePerHour: 400, date: new Date("2026-03-07"), caseId: case1.id, organizationId: org.id, userId: user.id },
      { description: "Análise documental", hours: 6, ratePerHour: 500, date: new Date("2026-03-06"), caseId: case3.id, organizationId: org.id, userId: user.id },
    ],
  })

  console.log("✅ Lançamentos financeiros criados")
  console.log("")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("🚀 Seed concluído! Acesse com:")
  console.log("   URL:   /login?org=anubis-demo")
  console.log("   Email: admin@anubis.com")
  console.log("   Senha: admin123")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())