import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autores } from './entities/autores.entity';
import { CreateAutorDto } from './dto/createAutor.dto';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autores)
    private autoresRepository: Repository<Autores>,
  ) {}

  /**
   * Insere um novo autor.
   * @param createAutor - Dados do autor.
   * @returns Autor criado.
   */
  async createAutor(createAutor: CreateAutorDto): Promise<Autores> {
    return this.autoresRepository.save(createAutor);
  }

  /**
   * Atualiza um autor existente.
   * @param id - ID do autor.
   * @param updateAutor - Dados para atualização de autor.
   * @returns Autor atualizado.
   */
  async updateAutor(id: number, updateAutor: CreateAutorDto): Promise<Autores> {
    const autor = await this.getAutorById(id);

    if (!autor) {
      throw new NotFoundException('Autor não encontrado');
    }

    Object.assign(autor, updateAutor);

    return this.autoresRepository.save(autor);
  }

  /**
   * Retorna um autor.
   * @param id - ID do autor.
   * @returns Autor encontrado.
   */
  async getAutorById(id: number): Promise<Autores | null> {
    if (!id) {
      throw new NotFoundException('Autor não encontrado');
    }
    return this.autoresRepository.findOne({ where: { id } });
  }

  /**
   * Retorna todos os autores registrados.
   * @returns Lista de autores.
   */
  async getAllAutores(): Promise<Autores[]> {
    return this.autoresRepository.find({
      order: { id: 'ASC' },
    });
  }
}
