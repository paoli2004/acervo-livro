import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExemplarDto {
  @IsNumber()
  @IsNotEmpty()
  livro_id!: number;

  @IsString()
  @IsNotEmpty()
  codigo_patrimonio!: string;
}
