import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExemplarDto {
  @IsNumber()
  @IsNotEmpty()
  livro_id!: number;

  @IsNumber()
  @IsNotEmpty()
  codigo_patrimonio!: number;
}
