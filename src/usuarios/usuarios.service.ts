import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  /**
   * Retorna todos os usuários registrados.
   * @returns Lista de usuários.
   */
  async getAllUsuarios(): Promise<Usuarios[]> {
    return this.usuariosRepository.find();
  }
}
