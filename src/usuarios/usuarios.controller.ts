import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  createUsuario(@Body() createUsuario: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(createUsuario);
  }

  @Put(':id')
  updateUsuario(
    @Param('id') id: number,
    @Body() updateUsuario: UpdateUsuarioDto,
  ) {
    return this.usuariosService.updateUsuario(id, updateUsuario);
  }

  @Get(':id')
  getUsuarioById(@Param('id') id: number) {
    return this.usuariosService.getUsuarioById(id);
  }

  @Get()
  getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }
}
