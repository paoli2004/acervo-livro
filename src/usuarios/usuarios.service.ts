import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async createUsuario(createUsuario: CreateUsuarioDto): Promise<void> {
    const usuario = this.usuariosRepository.create(createUsuario);
    await this.usuariosRepository.save(usuario);
  }

  /**
   * Atualiza um usuário existente.
   * @param id ID do usuário.
   * @param updateUsuario
   * @returns Usuário atualizado.
   */
  async updateUsuario(
    id: number,
    updateUsuario: UpdateUsuarioDto,
  ): Promise<void> {
    const usuario = await this.getUsuarioById(id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    Object.assign(usuario, updateUsuario);

    await this.usuariosRepository.save(usuario);
  }

  /**
   * Retorna um usuário.
   * @param id ID do usuário.
   * @returns Usuário encontrado.
   */
  async getUsuarioById(id: number): Promise<Usuarios | null> {
    if (!id) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.usuariosRepository.findOne({ where: { id } });
  }

  /**
   * Remove um usuário.
   * @param id ID do usuário.
   */
  async removeUsuario(id: number): Promise<void> {
    const usuario = await this.getUsuarioById(id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    } else if (usuario.tipo === 'ADMIN') {
      throw new ForbiddenException('Não é permitido remover um usuário ADMIN');
    }

    await this.usuariosRepository.remove(usuario);
  }

  /**
   * Retorna todos os usuários registrados.
   * @returns Lista de usuários.
   */
  async getAllUsuarios(): Promise<Usuarios[]> {
    return this.usuariosRepository.find({
      order: { id: 'ASC' },
      select: ['id', 'nome', 'email'],
    });
  }
}
