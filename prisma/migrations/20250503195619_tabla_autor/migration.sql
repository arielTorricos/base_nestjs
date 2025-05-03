/*
  Warnings:

  - Added the required column `autor_id` to the `Libros` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "autores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "creadoEn" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Libros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "autor_id" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "creadoEn" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME,
    CONSTRAINT "Libros_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "autores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Libros" ("actualizadoEn", "autor", "codigo", "creadoEn", "estado", "id", "nombre") SELECT "actualizadoEn", "autor", "codigo", "creadoEn", "estado", "id", "nombre" FROM "Libros";
DROP TABLE "Libros";
ALTER TABLE "new_Libros" RENAME TO "Libros";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
