/*
  Warnings:

  - You are about to drop the `Tarea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tarea";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Libro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "autor" TEXT NOT NULL,
    "editorial" TEXT NOT NULL,
    "reservado" BOOLEAN NOT NULL DEFAULT false
);
