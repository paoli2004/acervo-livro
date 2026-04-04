import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateLivroDto } from './createLivro.dto';

export class UpdateLivroDto extends PartialType(
  PickType(CreateLivroDto, [
    'titulo',
    'isbn',
    'ano_publicacao',
    'editora_id',
    'autor_id',
    'categoria_id',
  ] as const),
) {}
