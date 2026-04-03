import { IsNotEmpty, IsString } from "class-validator";

export class CreateExemplarDto {
    @IsString()
    @IsNotEmpty()
    livro_id!: string;

    @IsString()
    @IsNotEmpty()
    codigo_patrimonio!: string;
}