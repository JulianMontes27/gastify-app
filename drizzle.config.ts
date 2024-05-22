import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // "postgresql" | "mysql"
  schema: "./server/db/schemas/*",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
