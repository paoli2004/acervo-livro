import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateExemplarDto } from './createExemplar.dto';

export class UpdateExemplarDto extends PartialType(
  PickType(CreateExemplarDto, [
    'livro_id',
    'codigo_patrimonio',
    'ano_publicacao',
    'editora_id',
  ] as const),
) {}
