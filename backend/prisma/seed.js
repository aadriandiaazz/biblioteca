import pkg from '../generated/prisma/index.js';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const libro = await prisma.Libro.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: "Ejemplo de Libro",
      descripcion: "Una descripción opcional",
      autor: "Nombre del Autor Aquí",
      editorial: "Nombre Editorial",
      reservado: false,
      anioPublicacion: 2024
    },
  });

  console.log("Base de datos poblada con éxito:", libro);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });