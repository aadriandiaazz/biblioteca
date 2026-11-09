-- CreateTable
CREATE TABLE "Tarea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "creadaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
