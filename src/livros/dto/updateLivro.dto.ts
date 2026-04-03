import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateLivroDto } from './createLivro.dto';

export class UpdateLivroDto extends PartialType(
  PickType(CreateLivroDto, [
    'titulo',
    'isbn',
    'ano_publicacao',
    'nome',
  ] as const),
) {}
