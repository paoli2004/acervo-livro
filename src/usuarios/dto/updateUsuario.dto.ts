import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './createUsuario.dto';

// classe de update
// PartialType é uma função que recebe um tipo e retorna um novo tipo com todas as propriedades opcionais
// PickType é uma função que recebe um tipo e um array de chaves e retorna um novo tipo com apenas as propriedades selecionadas
export class UpdateUsuarioDto extends PartialType(
  PickType(CreateUsuarioDto, ['nome', 'email', 'senha'] as const),
) {}
