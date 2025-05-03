import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BearerAuthToken, VersionDescription } from 'src/decorators/controller.decorator';
import { AutoresService } from './autores.service';
import { AutoresDto, FilterAutoresDto } from './autores.dto';

@ApiTags('autores'.toUpperCase())
@Controller('autores')
export class AutoresController {
  constructor(private readonly sevice: AutoresService) {}

  @Get('/:id')
  @BearerAuthToken()
  @VersionDescription('1', `servicio GET PARA OBTENER UN AUTOR`)
  finAutores(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: number,
  ) {
    return this.sevice.getAutor(id);
  }

  @Post()
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para crear un AUTOR',
  )
  creatAutor(@Body() body: AutoresDto) {
    return this.sevice.createAutor(body);
  }

  @Patch('/:id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para actualizar un Autor',
  )
  updateAutor(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number,
  @Body() body:AutoresDto) {
    return this.sevice.updateAutor(body, id);
  }

  @Delete('/:id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para eliminar un Autor',
  )
  deleteAutor(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number,) {
    return this.sevice.deleteAutor(id);
  }

  @Post('list')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para listar los Autores',
  )
  listadoAutores(@Body() body: FilterAutoresDto) {
    return this.sevice.listAutor(body);
  }


}