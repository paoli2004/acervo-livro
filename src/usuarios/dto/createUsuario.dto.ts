import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 30, { message: 'A senha deve ter entre 4 e 30 caracteres.' })
  senha!: string;
}
