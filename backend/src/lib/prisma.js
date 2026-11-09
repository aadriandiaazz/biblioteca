import "dotenv/config"; // Carga el archivo .env obligatoriamente primero
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.js";

// Si por alguna razón process.env llega vacío, usamos la ruta absoluta del archivo
const databaseUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";

console.log("-> Conectando a la base de datos en:", databaseUrl);

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl
});

const prisma = new PrismaClient({ adapter });

export default prisma;