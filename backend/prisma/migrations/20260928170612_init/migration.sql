/*
  Warnings:

  - You are about to drop the column `creadaEn` on the `Tarea` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Tarea` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tarea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "completada" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Tarea" ("completada", "id", "titulo") SELECT "completada", "id", "titulo" FROM "Tarea";
DROP TABLE "Tarea";
ALTER TABLE "new_Tarea" RENAME TO "Tarea";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
