import { IsNotEmpty, IsString } from "class-validator";

export class CreateAutorDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsString()
    @IsNotEmpty()
    nacionalidade!: string;
}