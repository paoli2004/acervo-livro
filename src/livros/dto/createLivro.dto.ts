import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateLivroDto {
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsString()
  isbn!: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  autor_id?: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  categoria_id!: number[];
}
