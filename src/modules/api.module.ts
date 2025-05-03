

import { Module } from "@nestjs/common";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { RouterModule } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { LibrosModule } from "./libros/libros.module";
import { AutoresModule } from "./autor/autores.module";

const modules = [
  AuthModule,
  UsuariosModule,
  LibrosModule,
  AutoresModule,
];

@Module({
  imports: [
    ...modules,
    RouterModule.register(
      modules.map((module) => ({
        path: 'api', // Path to modules
        module,
      })),
    ),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}