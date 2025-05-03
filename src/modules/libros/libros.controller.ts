import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BearerAuthToken, VersionDescription } from 'src/decorators/controller.decorator';
import { FilterlibroDto, LibroDto, prestamoDto } from './libros.dto';
import { LibrosService } from './libros.service';

@ApiTags('Libros'.toUpperCase())
@Controller('libros')
export class LibrosController {
  constructor(private readonly sevice: LibrosService) {}

  @Get('/:id')
  @BearerAuthToken()
  @VersionDescription('1', `servicio GET PARA OBTENER UN LIBRO`)
  findLibro(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: number,
  ) {
    return this.sevice.getLibros(id);
  }

  @Post()
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para crear un LIBRO',
  )
  createLibro(@Body() body: LibroDto) {
    return this.sevice.createLibro(body);
  }

  @Patch('/:id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para actualizar un Libro',
  )
  updateLibro(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number,
  @Body() body:LibroDto) {
    return this.sevice.updateLibro(body, id);
  }

  @Delete('/:id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para eliminar un libro',
  )
  deleteLibro(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number,) {
    return this.sevice.deletelibro(id);
  }

  @Post('list')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para listar los libros',
  )
  listadoUsuarios(@Body() body: FilterlibroDto) {
    return this.sevice.listlibros(body);
  }

  @Post('registrar/prestamo')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para crear un Prestamo de un libro',
  )
  createPrestamo(@Body() body: prestamoDto) {
    return this.sevice.createPrestamo(body);
  }

  @Delete('Eliminar/prestamo/:id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para Eliminar el Prestamo de un libro',
  )
  eliminarPrestamo(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number) {
    return this.sevice.eliminarPrestamo(id);
  }

}