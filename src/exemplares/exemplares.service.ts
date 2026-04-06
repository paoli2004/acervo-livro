import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exemplares } from './entities/exemplares.entity';
import { CreateExemplarDto } from './dto/createExemplar.dto';
import { UpdateExemplarDto } from './dto/updateExemplar.dto';
import { LivrosService } from '../livros/livros.service';
import { EditorasService } from '../editoras/editoras.service';

@Injectable()
export class ExemplaresService {
  constructor(
    @InjectRepository(Exemplares)
    private exemplaresRepository: Repository<Exemplares>,
    private readonly livrosService: LivrosService,
    private readonly EditorasService: EditorasService,
  ) {}

  /**
   * Insere um novo exemplar.
   * @param createExemplar - Dados do exemplar.
   * @returns Exemplar criado.
   */
  async createExemplar(createExemplar: CreateExemplarDto): Promise<void> {
    const codigoPatrimonioAlreadyExist =
      await this.exemplaresRepository.findOne({
        where: { codigo_patrimonio: createExemplar.codigo_patrimonio },
      });

    if (codigoPatrimonioAlreadyExist) {
      throw new ConflictException(
        'Já existe um exemplar cadastrado com este código de patrimônio.',
      );
    }

    const editora = await this.EditorasService.getEditoraById(
      createExemplar.editora_id,
    );
    if (!editora) {
      throw new NotFoundException('Editora não encontrada');
    }

    const livro = await this.livrosService.getLivroById(
      createExemplar.livro_id,
    );
    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }

    const exemplar = this.exemplaresRepository.create({
      livro: livro,
      codigo_patrimonio: createExemplar.codigo_patrimonio,
      ano_publicacao: createExemplar.ano_publicacao,
      editora: editora,
    });
    await this.exemplaresRepository.save(exemplar);
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
    const exemplar = await this.getExemplarById(id);

    if (!exemplar) {
      throw new NotFoundException('Exemplar não encontrado');
    }

    if (updateExemplar.livro_id) {
      const livro = await this.livrosService.getLivroById(
        updateExemplar.livro_id,
      );
      if (!livro) {
        throw new NotFoundException('Livro não encontrado');
      }
      exemplar.livro = livro;
    }

    if (updateExemplar.editora_id) {
      const editora = await this.EditorasService.getEditoraById(
        updateExemplar.editora_id,
      );
      if (!editora) {
        throw new NotFoundException('Editora não encontrada');
      }
      exemplar.editora = editora;
    }

    Object.assign(exemplar, updateExemplar);

    await this.exemplaresRepository.save(exemplar);
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
  async getExemplarById(id: number): Promise<any> {
    const exemplar = await this.exemplaresRepository.findOne({
      where: { id },
      relations: ['livro', 'editora'],
    });

    if (!exemplar) {
      throw new NotFoundException('Exemplar não encontrado');
    }

    return {
      id: exemplar.id,
      livro: exemplar.livro,
      codigo_patrimonio: exemplar.codigo_patrimonio,
      ano_publicacao: exemplar.ano_publicacao,
      editora: exemplar.editora,
    };
  }

  /**
   * Retorna todos os exemplares registrados.
   * @returns Lista de exemplares.
   */
  async getAllExemplares(): Promise<any[]> {
    const exemplares = await this.exemplaresRepository.find({
      order: { id: 'ASC' },
      relations: ['livro', 'editora'],
    });

    return exemplares.map((exemplar) => ({
      ...exemplar,
      livro: exemplar.livro,
      editora: exemplar.editora,
    }));
  }
}
