import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsEnum,
} from 'class-validator';
import { TipoUsuario } from '../entities/usuarios.entity';

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

  @IsEnum(TipoUsuario)
  @IsOptional()
  tipo?: TipoUsuario;
}
