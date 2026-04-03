import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';

@Controller('usuarios')
export class UsuariosController {
  @Post()
  async createUsuario(@Body() createUsuario: CreateUsuarioDto) {
    return createUsuario;
  }
}
