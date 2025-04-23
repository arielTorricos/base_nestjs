-- CreateTable
CREATE TABLE "Usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombres" TEXT NOT NULL,
    "primerApellido" TEXT NOT NULL,
    "segundoApellido" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "creadoEn" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME
);

-- CreateTable
CREATE TABLE "Libros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "creadoEn" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME
);

-- CreateTable
CREATE TABLE "Prestamos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "lector" TEXT NOT NULL,
    "libro_id" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "creadoEn" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME,
    CONSTRAINT "Prestamos_libro_id_fkey" FOREIGN KEY ("libro_id") REFERENCES "Libros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_userName_key" ON "Usuarios"("userName");
