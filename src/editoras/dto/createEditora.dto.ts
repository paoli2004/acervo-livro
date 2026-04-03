import { IsNotEmpty, IsString } from "class-validator";

export class CreateEditoraDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsString()
    @IsNotEmpty()
    cidade!: string;
}