import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",

  client: {
    adapter() {
      const sql = neon(process.env.DATABASE_URL!);
      return new PrismaNeon(sql);
    },
  },

  migrate: {
    url: process.env.DIRECT_URL!,
    adapter() {
      const sql = neon(process.env.DIRECT_URL!);
      return new PrismaNeon(sql);
    },
  },

  migrations: {
    seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  },
});