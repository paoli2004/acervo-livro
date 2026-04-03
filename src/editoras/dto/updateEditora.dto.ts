import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateEditoraDto } from './createEditora.dto';

export class UpdateEditoraDto extends PartialType(
  PickType(CreateEditoraDto, ['nome', 'cidade'] as const),
) {}
