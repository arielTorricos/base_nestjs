import { Injectable } from '@nestjs/common';
import { dataResponseError, dataResponseSuccess, IResponse } from 'src/dto/response.dto';
import { loginDto } from './auth.dto';
import { PrismaService } from 'src/database/prima.service';
import { compare } from 'bcrypt';
import { ApiUnauthorizedError, IToken } from './token-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { decode } from 'jsonwebtoken';

export interface tokenPayload {
  id: number;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  userName: string;
  celular: string;
  email:string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly dataBase:PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(params:loginDto):Promise<IResponse>{
    try {

      const usuario = await this.dataBase.usuarios.findFirst({
        where: {email: params.email},
      });

      if (!usuario) return dataResponseError('El usuariuo no existe');

      const comparePassword:boolean = await compare(params.password, String(usuario.password));

      if (!comparePassword) return dataResponseError('La contraseña es incorrecta.',{status:401});

      return await this.dataToken({
        id: usuario.id,
        nombres: usuario.nombres,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
        celular: usuario.celular,
        userName: usuario.userName,
        email: usuario.email,
      });

      ;
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async dataToken (payload:tokenPayload):Promise<IResponse> {
    try {

      const [token, tokenRefresh] = await Promise.all([
        this.jwtService.sign(payload, {
          expiresIn: `3600S`,
          secret: process.env.JWT_SECRET, //RECODE verficar el secret_key
        }),
        this.jwtService.sign(payload, { expiresIn: `3600S` }),
      ]);
      return dataResponseSuccess({data: {token, tokenRefresh, userName: payload.userName, email: payload.email}});

    } catch (error) {
      return dataResponseError(error.message);
    }
  }

}
