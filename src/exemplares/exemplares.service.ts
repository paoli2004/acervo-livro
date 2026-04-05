import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exemplares } from './entities/exemplares.entity';
import { CreateExemplarDto } from './dto/createExemplar.dto';
import { UpdateExemplarDto } from './dto/updateExemplar.dto';

@Injectable()
export class ExemplaresService {
  constructor(
    @InjectRepository(Exemplares)
    private exemplaresRepository: Repository<Exemplares>,
  ) {}

  /**
   * Insere um novo exemplar.
   * @param createExemplar - Dados do exemplar.
   * @returns Exemplar criado.
   */
  async createExemplar(createExemplar: CreateExemplarDto): Promise<void> {
    await this.exemplaresRepository.save(createExemplar);
  }

  /**
   * Atualiza um exemplar existente.
   * @param id - ID do exemplar.
   * @param updateExemplar - Dados para atualização de exemplar.
   * @returns Exemplar atualizado.
   */
  async updateExemplar(
    id: number,
    updateExemplar: UpdateExemplarDto,
  ): Promise<void> {
    await this.getExemplarById(id);

    await this.exemplaresRepository.update(id, updateExemplar);
  }

  /**
   * Remove um exemplar.
   * @param id ID do exemplar.
   */
  async removeExemplar(id: number): Promise<void> {
    const exemplar = await this.getExemplarById(id);

    if (!exemplar) {
      throw new NotFoundException('Exemplar não encontrado');
    }

    await this.exemplaresRepository.remove(exemplar);
  }

  /**
   * Retorna um exemplar.
   * @param id - ID do exemplar.
   * @returns Exemplar encontrado.
   */
  async getExemplarById(id: number): Promise<Exemplares | null> {
    const exemplar = await this.exemplaresRepository.findOneBy({ id });

    if (!exemplar) {
      throw new NotFoundException('Exemplar não encontrado');
    }

    return exemplar;
  }

  /**
   * Retorna todos os exemplares registrados.
   * @returns Lista de exemplares.
   */
  async getAllExemplares(): Promise<Exemplares[]> {
    return this.exemplaresRepository.find({
      order: { id: 'ASC' },
    });
  }
}
