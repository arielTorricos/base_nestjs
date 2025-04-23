import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prima.service';
import { dataResponseError, dataResponseSuccess,  IResponse } from 'src/dto/response.dto';
import { Prisma } from '@prisma/client';
import { FilterlibroDto, LibroDto, prestamoDto } from './libros.dto';

@Injectable()
export class LibrosService {
  constructor(private dataBase:PrismaService){}

  async getLibros(id:number):Promise<IResponse> {
    try {
      const libro = await this.dataBase.libros.findUnique({where:{id}});
      return dataResponseSuccess({data: libro});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async createLibro (params: LibroDto):Promise<IResponse> {
    try {
      const tiposRes = await this.dataBase.libros.findFirst({
        where:{nombre: params.nombre.toLocaleUpperCase()},
      });
      if ( tiposRes?.id !== undefined) {
        return dataResponseError('Ya existe el Nombre de este libro.');
      }
      const tipo = await this.dataBase.libros.create({
        data: {
          codigo:params.codigo,
          nombre:params.nombre.toLocaleUpperCase(),
          autor: params.autor.toLocaleUpperCase(),
        }
      })

      return dataResponseSuccess({data: tipo});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async updateLibro (params: LibroDto, id:number):Promise<IResponse> {
    try {

      const find = await this.dataBase.libros.findMany({
        where: { nombre: params.nombre.toUpperCase(), id: { not: id } },
        select: {
          id: true,
          nombre: true,
          codigo:true,
        },
      });

      if (find.length > 0 && id !== null) {
        return dataResponseError('Ya existe el Nombre de este Libro');
      }

      const update = await this.dataBase.libros.update({
        where:{id: id},
        data:{
          nombre: params.nombre.toUpperCase(),
          codigo: params.codigo,
          autor: params.autor.toUpperCase(),
        }
      })

        return dataResponseSuccess({data: update});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async deletelibro (id:number):Promise<IResponse> {
    try {
      const del = await this.dataBase.libros.delete({where:{id:id}})
      return dataResponseSuccess({data: del},{message:'eliminado Correctamente'});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }

  async listlibros (filter:FilterlibroDto):Promise<IResponse> {
    try {
      const { size, page, where, orderDirection } = filter;
      let where1:Prisma.LibrosWhereInput = {};
      const order: { [key: string]: string } = {};
      if (filter.orderBy) order[filter.orderBy] = orderDirection;

      if (where?.codigo) {
        where1 = {...where1, ...{codigo:{contains: where.codigo}}};
      }

      if (where?.nombre) {
        where1 = {...where1, ...{nombre:{contains: where.nombre}}};
      }

      if (where?.autor) {
        where1 = {...where1, ...{autor:{contains: where.autor}}};
      }
      console.log(where1)
      const listUser = await this.dataBase.libros.findMany({
        where: where1,
        select:{
          id: true,
          nombre: true,
          codigo: true,
          autor: true,
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
            total: Number(await this.dataBase.libros.count({ where:where1 })),
          }
        : undefined});
      
    } catch (error) {
      console.log(error)
      return dataResponseError(error.message);
    }
  }

  async createPrestamo (params: prestamoDto):Promise<IResponse> {
    try {
      const tipo = await this.dataBase.prestamos.create({
        data: {
          fecha: params.fecha,
          lector: params.lector,
          libro_id: params.libro_id,
        }
      })

      return dataResponseSuccess({data: tipo});
    } catch (error) {
      return dataResponseError(error.message);
    }
  }
}