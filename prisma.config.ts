import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL!;

export default defineConfig({
  schema: "prisma/schema.prisma",

  // Configuração do cliente Prisma com Neon
  client: {
    adapter() {
      const sql = neon(connectionString);
      return new PrismaNeon(sql);
    },
  },

  // Seed automático (opcional)
  migrations: {
    seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  },
});