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

@Entity({ name: 'exemplares' })
export class Exemplares {
  @PrimaryGeneratedColumn()
  id!: number;

  // um exemplar pertence a um livro, mas um livro pode ter muitos exemplares
  @ManyToOne(() => Livros, (livro) => livro.exemplares)
  @JoinColumn({ name: 'livro_id' })
  livros!: Livros;

  @Column({ unique: true, type: 'int' })
  codigo_patrimonio!: number;

  // DESCOMENTAR SOMENTE QUANDO EMPRESTIMOS FOR FEITO
  // // um exemplar pode ter muitos empréstimos, mas um empréstimo pertence a um exemplar
  // @OneToMany(() => Emprestimos, (emprestimos) => emprestimos.exemplar)
  // emprestimos!: Emprestimos[];
}
