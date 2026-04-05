import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateAutorDto } from './createAutor.dto';

export class UpdateAutorDto extends PartialType(
  PickType(CreateAutorDto, ['nome', 'nacionalidade'] as const),
) {}
