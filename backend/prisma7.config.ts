import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Pon aquí la ruta de tu archivo dev.db
    url: 'file://./prisma/dev.db',
  },
});