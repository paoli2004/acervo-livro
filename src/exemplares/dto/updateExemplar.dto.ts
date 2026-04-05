import { IsOptional, IsNumber } from 'class-validator';

export class UpdateExemplarDto {
  @IsNumber()
  @IsOptional()
  livro_id?: number;

  @IsNumber()
  @IsOptional()
  codigo_patrimonio?: number;
}
