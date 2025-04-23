import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prima.service';
import { dataResponseError, dataResponseSuccess,  IResponse } from 'src/dto/response.dto';
import { CreateUsuariosDto, FilterDto, UpdateUsuariosDto } from './usuarios.dto';
import { DateTime } from 'luxon';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private dataBase:PrismaService){}

  async createUsuarios (params: CreateUsuariosDto):Promise<IResponse> {
    try {
      const verifyPass = this.validatePassword(params.password);
      if (verifyPass) {

        const hashedPassword = await bcrypt.hash(String(params.password), 12);

        const insert = await this.dataBase.usuarios.create({data: {
          nombres: params.nombres,
          primerApellido: params.primerApellido,
          segundoApellido: params.segundoApellido,
          fechaNacimiento: DateTime.fromJSDate(params.fechaNacimiento).toISODate() ?? '' ,
          nacionalidad: 'BOLIVIANA',
          email: params.email,
          userName: params.userName,
          password: hashedPassword,
          celular: params.celular,
        }});
        return dataResponseSuccess({data: insert});
      } else {
        return dataResponseError('La contraseña no cumple con los requisitos mínimos de un caracter especial y una letra mayuscula')
      }
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async updateUsuarios (params: UpdateUsuariosDto, usuarioId: number):Promise<IResponse> {
    try {
      const userFind = await this.dataBase.usuarios.findUnique({where:{id: usuarioId}})
      if (!userFind) {
        return dataResponseError('no Existe el usuario.')
      }
      /* let hashedPassword = userFind.password;
      if (params.password) {
        hashedPassword = await bcrypt.hash(String(params.password), 12);
      } */
      const updateUsuarios = await this.dataBase.usuarios.update({
        where:{id: usuarioId},
        data:{
          nombres: params.nombres,
          primerApellido: params.primerApellido,
          segundoApellido: params.segundoApellido,
          celular: params.celular,
          actualizadoEn: DateTime.now().toISO(),
          email: params.email,
          fechaNacimiento: DateTime.fromJSDate(params.fechaNacimiento).toISODate() ?? '',
          nacionalidad: 'BOLIVIANA',
          //password: hashedPassword,
          //userName: params.userName,
        }
      })
      return dataResponseSuccess({data: updateUsuarios.id});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async deleteUsuarios (usuarioId: number):Promise<IResponse> {
    try {
      const deleteUser = await this.dataBase.usuarios.delete({where:{id:usuarioId}})
      return dataResponseSuccess({data: deleteUser},{message:'eliminado Correctamente'});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async listUsuarios (filter: FilterDto):Promise<IResponse> {
    try {
      const { size, page, where, orderDirection } = filter;
      let where1:Prisma.UsuariosWhereInput = {};
      const order: { [key: string]: string } = {};
      if (filter.orderBy) order[filter.orderBy] = orderDirection;

      if (where?.celular) {
        where1 = {...where1, ...{celular:{ contains: where.celular }}};
      }
      if (where?.nombres) {
        where1 = {...where1, ...{nombres:{ contains: where.nombres }}};
      }
      if (where?.primerApellido) {
        where1 = {...where1, ...{primerApellido:{ contains: where.primerApellido }}};
      }
      if (where?.segundoApellido) {
        where1 = {...where1, ...{segundoApellido:{ contains: where.segundoApellido }}};
      }
      if (where?.userName) {
        where1 = {...where1, ...{userName:{ contains: where.userName }}};
      }

      const listUser = await this.dataBase.usuarios.findMany({
        where: where1,
        select:{
          id: true,
          celular: true,
          email: true,
          nombres: true,
          userName: true,
          primerApellido: true,
          segundoApellido: true,
          nacionalidad: true,
          fechaNacimiento: true,
        },
        orderBy: Object.keys(filter.orderBy ?? {}).length
          ? { [filter.orderBy]: filter.orderDirection }
          : { id: 'desc' },
        skip: size ? (page > 0 ? (filter.page - 1) * size : 0) : undefined,
        take: size,
      })

      return dataResponseSuccess({
        data: listUser,
        pagination: filter?.size
            ? {
                size: filter?.size,
                page: filter.page || 1,
                total: Number(await this.dataBase.usuarios.count({ where:where1 })),
              }
            : undefined,
      })
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  validatePassword (pass: any): string {
    let response = pass;
    const reg =
      /(?=^.{8,15}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;
    response = reg.test(response);
  
    return response;
  };
}
