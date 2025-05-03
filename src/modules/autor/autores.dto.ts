import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, IsString, Length } from "class-validator";

export class AutoresDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) => (value ? value.toString().trim() : value))
  @Type(() => String)
  @Length(2, 500, { message: 'el nombre debe ser de mas de 2 caracteres' })
  @IsString({ message: 'el nombre debe ser tipo string' })
  @IsOptional()
  @ApiProperty({ description: 'nombre del usuario.', required: false })
  nombre: string;
}

export class FilterAutoresDto {
  @Expose()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'el size debe ser tipo numero' },
  )
  @ApiProperty({
    description: 'tamaño de la lista.',
    example:5,
    required: true,
  })
  size: number;

  @Expose()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'la pagina debe ser numero' },
  )
  @IsOptional()
  @ApiProperty({
    description: 'pagina de la lista.',
    example:1,
    required: false,
  })
  page: number;

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: 'variable para ordenar.',
    example:'id',
    required: false,
  })
  orderBy: string;

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: 'direccion de ordenamiento.',
    example:'asc',
    required: false,
  })
  orderDirection: "asc" | "desc";

  @Expose()
  @IsObject({ message: 'where debe ser un objeto' })
  @IsOptional()
  @ApiProperty({
    description: 'Filtros para el listado de autores',
    required: false,
    type: AutoresDto,
  })
  where: AutoresDto;
}