import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprestimos } from './entities/emprestimos.entity';
import { Repository } from 'typeorm';
import { CreateEmprestimoDto } from './dto/createEmprestimo.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ExemplaresService } from '../exemplares/exemplares.service';

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(Emprestimos)
    private readonly emprestimosRepository: Repository<Emprestimos>,
    private readonly usuariosService: UsuariosService,
    private readonly exemplaresService: ExemplaresService,
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
   * Cria um novo emprestimo.
   * @param createEmprestimo Dados para criação do emprestimo.
   * @returns Promise que resolve quando o emprestimo é criado.
   */
  async createEmprestimo(createEmprestimo: CreateEmprestimoDto): Promise<void> {
    const usuario = await this.findOrFail(
      this.usuariosService.getUsuarioById(createEmprestimo.usuario_id),
      'Usuário não encontrado',
    );

    const exemplar = await this.findOrFail(
      this.exemplaresService.getExemplarById(createEmprestimo.exemplar_id),
      'Exemplar não encontrado',
    );

    const emprestimo = this.emprestimosRepository.create({
      usuario: usuario,
      exemplar: exemplar,
      data_emprestimo: createEmprestimo.data_emprestimo, // formato "2026-05-10"
      data_devolucao: createEmprestimo.data_devolucao, // formato "2026-05-20"
    });

    await this.emprestimosRepository.save(emprestimo);
  }

  async removeEmprestimo(id: number): Promise<void> {
    const emprestimo = await this.findOrFail(
      this.getEmprestimoById(id),
      'Emprestimo não encontrado',
    );

    await this.emprestimosRepository.remove(emprestimo);
  }

  /**
   * Retorna todos os emprestimos.
   * @returns Lista de emprestimos.
   */
  async getAllEmprestimos(): Promise<any[]> {
    const emprestimo = await this.emprestimosRepository.find({
      order: { id: 'ASC' },
      relations: ['usuario', 'exemplar.livro'],
    });

    return emprestimo.map((emprestimo) => ({
      ...emprestimo,
      usuario: emprestimo.usuario.nome,
      exemplar: emprestimo.exemplar.livro?.titulo,
    }));
  }

  /**
   * Retorna um emprestimo.
   * @param id ID do emprestimo.
   * @returns Emprestimo encontrado.
   */
  async getEmprestimoById(id: number): Promise<any> {
    const emprestimo = await this.emprestimosRepository.findOne({
      where: { id },
      relations: ['usuario', 'exemplar.livro'],
    });

    if (!emprestimo) {
      throw new NotFoundException('Emprestimo não encontrado');
    }

    return {
      id: emprestimo.id,
      usuario: emprestimo.usuario.nome,
      exemplar: emprestimo.exemplar.livro?.titulo,
      data_emprestimo: emprestimo.data_emprestimo,
      data_devolucao: emprestimo.data_devolucao,
    };
  }
}
