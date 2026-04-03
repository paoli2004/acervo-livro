import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReservaDto {
    @IsString()
    @IsNotEmpty()
    livro_id!: string;

    @IsDate()
    @IsNotEmpty()
    data_reserva!: Date;
}