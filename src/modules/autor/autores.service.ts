import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prima.service';
import { dataResponseError, dataResponseSuccess,  IResponse } from 'src/dto/response.dto';
import { Prisma } from '@prisma/client';
import { AutoresDto, FilterAutoresDto } from './autores.dto';

@Injectable()
export class AutoresService {
  constructor(private dataBase:PrismaService){}

  async getAutor(id:number):Promise<IResponse> {
    try {
      const autor = await this.dataBase.autores.findUnique({where:{id}});
      return dataResponseSuccess({data: autor});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async createAutor (params: AutoresDto):Promise<IResponse> {
    try {
      const tiposRes = await this.dataBase.autores.findFirst({
        where:{nombre: params.nombre.toLocaleUpperCase()},
      });
      if ( tiposRes?.id !== undefined) {
        return dataResponseError('Ya existe el Nombre de este autor.');
      }
      const tipo = await this.dataBase.autores.create({
        data: {
          nombre:params.nombre.toLocaleUpperCase(),
        }
      })

      return dataResponseSuccess({data: tipo});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async updateAutor (params: AutoresDto, id:number):Promise<IResponse> {
    try {

      const find = await this.dataBase.autores.findMany({
        where: { nombre: params.nombre.toUpperCase(), id: { not: id } },
        select: {
          id: true,
          nombre: true,
        },
      });

      if (find.length > 0 && id !== null) {
        return dataResponseError('Ya existe el Nombre de este autor');
      }

      const update = await this.dataBase.autores.update({
        where:{id: id},
        data:{
          nombre: params.nombre.toUpperCase(),
        }
      })

        return dataResponseSuccess({data: update});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async deleteAutor (id:number):Promise<IResponse> {
    try {
      const del = await this.dataBase.autores.delete({where:{id:id}})
      return dataResponseSuccess({data: del},{message:'eliminado Correctamente'});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async listAutor (filter:FilterAutoresDto):Promise<IResponse> {
    try {
      const { size, page, where, orderDirection } = filter;
      let where1:Prisma.autoresWhereInput = {};
      const order: { [key: string]: string } = {};
      if (filter.orderBy) order[filter.orderBy] = orderDirection;

      if (where?.nombre) {
        where1 = {...where1, ...{nombre:{contains: where.nombre}}};
      }

      const listUser = await this.dataBase.autores.findMany({
        where: where1,
        select:{
          id: true,
          nombre: true,
        },
        orderBy: Object.keys(filter.orderBy ?? {}).length
          ? { [filter.orderBy]: filter.orderDirection }
          : { id: 'desc' },
        skip: size ? (page > 0 ? (filter.page - 1) * size : 0) : undefined,
        take: size,
      })

      return dataResponseSuccess({data: listUser,pagination: filter?.size
        ? {
            size: filter?.size,
            page: filter.page || 1,
            total: Number(await this.dataBase.autores.count({ where:where1 })),
          }
        : undefined});

    } catch (error) {
      console.log(error)
      return dataResponseError(error.message);
    }
  }

}