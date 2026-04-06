import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateLivroDto } from './dto/createLivro.dto';
import { Livros } from './entities/livros.entity';
import { Autores } from '../autores/entities/autores.entity';
import { AutoresService } from '../autores/autores.service';
import { EditorasService } from '../editoras/editoras.service';
import { CategoriasService } from '../categorias/categorias.service';
import { UpdateLivroDto } from './dto/updateLivro.dto';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livros)
    private readonly livrosRepository: Repository<Livros>,
    private readonly AutoresService: AutoresService,
    private readonly CategoriasService: CategoriasService,
  ) {}

  /**
   *Executa uma Promise que busca uma entidade e lança erro caso não encontre.
   *
   * @template T Tipo da entidade esperada
   * @param promise Promise que retorna a entidade ou null (ex: findOne do TypeORM)
   * @param message Mensagem de erro caso a entidade não seja encontrada
   * @returns A entidade encontrada (garantido que não é null)
   */
  private async findOrFail<T>(
    promise: Promise<T | null>,
    message: string,
  ): Promise<T> {
    const result = await promise;

    if (!result) {
      throw new NotFoundException(message);
    }

    return result;
  }

  /**
   * Insere um novo livro.
   * @param createLivro
   * @returns Livro criado.
   */
  async createLivro(createLivro: CreateLivroDto): Promise<void> {
    const isbnAlreadyExist = await this.livrosRepository.findOne({
      where: { isbn: createLivro.isbn },
    });

    if (isbnAlreadyExist) {
      throw new ConflictException(
        'Já existe um livro cadastrado com este ISBN.',
      );
    }

    const categoria = await this.findOrFail(
      this.CategoriasService.getCategoriaById(createLivro.categoria_id),
      'Categoria não encontrada',
    );
    let autor: Autores | null = null;

    if (createLivro.autor_id) {
      autor = await this.findOrFail(
        this.AutoresService.getAutorById(createLivro.autor_id),
        'Autor não encontrado',
      );
    }

    const livro = this.livrosRepository.create({
      titulo: createLivro.titulo,
      isbn: createLivro.isbn,
      autor: autor ? [autor] : [],
      categoria: [categoria],
    });

    await this.livrosRepository.save(livro);
  }

  async updateLivro(id: number, updateLivro: UpdateLivroDto): Promise<void> {
    const livro = await this.findOrFail(
      this.getLivroById(id),
      'Livro não encontrado',
    );

    // verifica se o ISBN já existe em outro livro
    if (updateLivro.isbn) {
      const isbnAlreadyExist = await this.livrosRepository.findOne({
        where: {
          isbn: updateLivro.isbn,
          id: Not(id), // ignora o contexto do id a ser atualizado para verificação
        },
      });

      if (isbnAlreadyExist) {
        throw new ConflictException(
          'Já existe um livro cadastrado com este ISBN.',
        );
      }
    }

    if (updateLivro.autor_id) {
      const autor = await this.findOrFail(
        this.AutoresService.getAutorById(updateLivro.autor_id),
        'Autor não encontrado',
      );
      livro.autor = [autor];
    }

    if (updateLivro.categoria_id) {
      const categoria = await this.findOrFail(
        this.CategoriasService.getCategoriaById(updateLivro.categoria_id),
        'Categoria não encontrada',
      );
      livro.categoria = [categoria];
    }

    Object.assign(livro, {
      titulo: updateLivro.titulo ?? livro.titulo,
      isbn: updateLivro.isbn ?? livro.isbn
    });

    await this.livrosRepository.save(livro);
  }

  /**
   * Remove um livro.
   * @param id ID do livro.
   * @returns Promise<void>.
   */
  async removeLivro(id: number): Promise<void> {
    const livro = await this.findOrFail(
      this.getLivroById(id),
      'Livro não encontrado',
    );

    await this.livrosRepository.remove(livro);
  }

  /**
   * Retorna todos os livros.
   * @returns Lista de livros.
   */
  async getAllLivros(): Promise<any[]> {
    const livros = await this.livrosRepository.find({
      order: { id: 'ASC' },
      relations: ['autor', 'categoria'],
    });

    return livros.map((livro) => ({
      ...livro,
      autor: livro.autor || null,
      categoria: livro.categoria,
    }));
  }

  /**
   * Retorna um livro.
   * @param id ID do livro.
   * @returns Livro encontrado.
   */
  async getLivroById(id: number): Promise<any> {
    const livro = await this.livrosRepository.findOne({
      where: { id },
      relations: ['autor', 'categoria'],
    });

    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }

    return {
      id: livro.id,
      titulo: livro.titulo,
      isbn: livro.isbn,
      autor: livro.autor || null,
      categoria: livro.categoria,
    };
  }
}
