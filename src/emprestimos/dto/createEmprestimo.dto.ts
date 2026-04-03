import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmprestimoDto {
  @IsString()
  @IsNotEmpty()
  exemplar_id!: string;

  @IsDate()
  @IsNotEmpty()
  data_emprestimo!: Date;

  @IsDate()
  @IsNotEmpty()
  data_devolucao!: Date;
}
