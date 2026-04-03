import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateAutorDto } from "./createAutor.dto";

export class updateAutorDto extends PartialType(
    PickType(CreateAutorDto, ['nome', 'nacionalidade'] as const),
) {}