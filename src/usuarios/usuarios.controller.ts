import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async createUsuario(@Body() createUsuario: CreateUsuarioDto) {
    await this.usuariosService.createUsuario(createUsuario);

    return {
      message: 'Usuário criado com sucesso',
    };
  }

  @Patch(':id')
  async updateUsuario(
    @Param('id') id: number,
    @Body() updateUsuario: UpdateUsuarioDto,
  ) {
    await this.usuariosService.updateUsuario(id, updateUsuario);

    return {
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete(':id')
  async removeUsuario(@Param('id') id: number) {
    await this.usuariosService.removeUsuario(id);

    return {
      message: 'Usuário removido com sucesso',
    };
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: number) {
    return this.usuariosService.getUsuarioById(id);
  }

  @Get()
  async getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }
}
