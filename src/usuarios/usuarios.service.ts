import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  /**
   * Insere um novo usuário.
   * @param createUsuario
   * @returns Usuario criado.
   */
  async createUsuario(createUsuario: CreateUsuarioDto): Promise<Usuarios> {
    return this.usuariosRepository.save(createUsuario);
  }

  async updateUsuario(
    id: number,
    updateUsuario: UpdateUsuarioDto,
  ): Promise<Usuarios> {
    const usuario = await this.getUsuarioById(id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    Object.assign(usuario, updateUsuario);

    return this.usuariosRepository.save(usuario);
  }

  /**
   * Retorna um usuário.
   * @param id
   * @returns Usuário encontrado.
   */
  async getUsuarioById(id: number): Promise<Usuarios | null> {
    if (!id) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.usuariosRepository.findOne({ where: { id } });
  }

  /**
   * Retorna todos os usuários registrados.
   * @returns Lista de usuários.
   */
  async getAllUsuarios(): Promise<Usuarios[]> {
    return this.usuariosRepository.find();
  }
}
