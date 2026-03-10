import "dotenv/config";
import { defineConfig } from "prisma/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL!;

export default defineConfig({
  schema: "prisma/schema.prisma",
  client: {
    adapter() {
      const sql = neon(connectionString);
      return new PrismaNeon(sql);
    },
  },
});