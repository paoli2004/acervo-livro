import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateLivroDto } from './createLivro.dto';

export class UpdateLivroDto extends PartialType(
  PickType(CreateLivroDto, [
    'titulo',
    'isbn',
    'autor_id',
    'categoria_id',
  ] as const),
) {}
