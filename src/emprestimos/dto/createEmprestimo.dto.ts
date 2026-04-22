import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateEmprestimoDto {
  @IsNumber()
  @IsNotEmpty()
  usuario_id!: number;

  @IsNumber()
  @IsNotEmpty()
  exemplar_id!: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  data_emprestimo!: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  data_devolucao!: Date;

  @IsBoolean()
  @IsNotEmpty()
  ativo!: boolean;
}
