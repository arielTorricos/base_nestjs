import { Body, Controller, Delete, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuariosDto, FilterDto, UpdateUsuariosDto } from './usuarios.dto';
import { ApiTags } from '@nestjs/swagger';
import { BearerAuthToken, VersionDescription } from 'src/decorators/controller.decorator';

@ApiTags('[USUARIOS] USUARIOS'.toUpperCase())
@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly sevice: UsuariosService) {}

  @Post()
  @VersionDescription(
    '1',
    'Servico para crear de los Usuarios',
  )
  createUsuarios(@Body() body: CreateUsuariosDto) {
    return this.sevice.createUsuarios(body);
  }

  @Patch('/:id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para actualizar de los Usuarios',
  )
  updateUsuarios(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number,
  @Body() body:UpdateUsuariosDto) {

    return this.sevice.updateUsuarios(body, id);
  }

  @Delete('id')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para eliminar de los Usuarios',
  )
  deleteUsuarios(@Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  )
  id: number,) {
    return this.sevice.deleteUsuarios(id);
  }

  @Post('list')
  @BearerAuthToken()
  @VersionDescription(
    '1',
    'Servico para crear de los Usuarios',
  )
  listadoUsuarios(@Body() body: FilterDto) {
    return this.sevice.listUsuarios(body);
  }


}
