import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateLivroDto {
    @IsNotEmpty()
    @IsString()
    titulo!: string;

    @IsNotEmpty()
    @IsString()
    isbn!: string;

    @IsNotEmpty()
    @IsInt()
    ano_publicacao!: number;

    @IsNotEmpty()
    @IsString()
    nome!: string;
}
