import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from "class-validator";

export class LibroDto {
  @Expose()
  @Transform(({ value }: TransformFnParams) => (value ? value.toString().trim() : value))
  @Type(() => String)
  @Length(2, 500, { message: 'el nombre debe ser de mas de 2 caracteres' })
  @IsString({ message: 'el nombre debe ser tipo string' })
  @IsOptional()
  @ApiProperty({ description: 'nombre del usuario.', required: false })
  nombre: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) => (value ? value.toString().trim() : value))
  @Type(() => String)
  @Length(2, 500, { message: 'el codigo debe ser de mas de 2 caracteres' })
  @IsString({ message: 'el codigo debe ser tipo string' })
  @IsOptional()
  @ApiProperty({ description: 'codigo del tipo de reserva.', required: false })
  codigo: string;

  @Expose()
  @Transform(({ value }: TransformFnParams) => (value ? value.toString().trim() : value))
  @Type(() => String)
  @Length(2, 500, { message: 'el autor debe ser de mas de 2 caracteres' })
  @IsString({ message: 'el autor debe ser tipo string' })
  @IsOptional()
  @ApiProperty({ description: 'autor del tipo de reserva.', required: false })
  autor: string;
}

export class FilterlibroDto {
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
    description: 'Filtros para el listado de ingresos',
    required: false,
    type: LibroDto,
  })
  where: LibroDto;
}

export class prestamoDto {
  @Expose()
  @IsDateString()
  @IsNotEmpty({ message: 'la Fecha no debe ser vacio.'  })
  @ApiProperty({
    type: Date,
    description: 'FECHA Nacimiento del usuario.',
    default: new Date(),
    required: true,
  })
  fecha: Date;

  @Expose()
  @Transform(({ value }: TransformFnParams) => (value ? value.toString().trim() : value))
  @Type(() => String)
  @Length(2, 500, { message: 'el lector debe ser de mas de 2 caracteres' })
  @IsString({ message: 'el lector debe ser tipo string' })
  @IsOptional()
  @ApiProperty({ description: 'lector del libro.', required: false })
  lector: string;

  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'El libro_id debe ser de tipo number'},
  )
  @IsNotEmpty({ message: 'El libro_id no debe ser vacio.'  })
  @ApiProperty({
    description: 'libro_id.',
    required: true,
  })
  libro_id: number;

}
