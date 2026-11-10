import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 
async function main() {
  const autor = await prisma.autor.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, nombre: "George Orwell" },
  });
  await prisma.libro.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, titulo: "1984", anio: 1949, autorId: autor.id },
  });
}
main().finally(() => prisma.$disconnect());
