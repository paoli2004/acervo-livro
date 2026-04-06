import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExemplarDto {
  @IsNumber()
  @IsNotEmpty()
  livro_id!: number;

  @IsNotEmpty()
  @IsInt()
  ano_publicacao!: number;

  @IsInt()
  @IsNotEmpty()
  codigo_patrimonio!: number;

  @IsNotEmpty()
  @IsInt()
  editora_id!: number;
}
