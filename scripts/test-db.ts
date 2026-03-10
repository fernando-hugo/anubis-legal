import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log("✅ Banco Neon conectado com sucesso!");

    const clients = await prisma.client.findMany({ take: 1 });
    console.log("Clientes:", clients);
  } catch (error) {
    console.error("❌ Erro ao conectar:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();