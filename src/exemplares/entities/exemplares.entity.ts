import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Livros } from '../../livros/entities/livros.entity';
import { Emprestimos } from '../../emprestimos/entities/emprestimos.entity';

export enum statusExemplar {
  DISPONIVEL = 'DISPONIVEL',
  EMPRESTADO = 'EMPRESTADO',
  MANUTENCAO = 'MANUTENCAO',
}

@Entity({ name: 'exemplares' })
export class Exemplares {
  @PrimaryGeneratedColumn()
  id!: number;

  // um exemplar pertence a um livro, mas um livro pode ter muitos exemplares
  @ManyToOne(() => Livros, (livro) => livro.exemplares)
  @JoinColumn({ name: 'livro_id' })
  livros!: Livros;

  @Column({ length: 50, unique: true })
  codigo_patrimonio!: string;

  @Column({
    type: 'enum',
    enum: statusExemplar,
    default: statusExemplar.DISPONIVEL,
  })
  status!: statusExemplar;

  // DESCOMENTAR SOMENTE QUANDO EMPRESTIMOS FOR FEITO
  // // um exemplar pode ter muitos empréstimos, mas um empréstimo pertence a um exemplar
  // @OneToMany(() => Emprestimos, (emprestimos) => emprestimos.exemplar)
  // emprestimos!: Emprestimos[];
}
