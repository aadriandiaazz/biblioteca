-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tarea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "creadaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tarea" ("completada", "id", "titulo") SELECT "completada", "id", "titulo" FROM "Tarea";
DROP TABLE "Tarea";
ALTER TABLE "new_Tarea" RENAME TO "Tarea";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
