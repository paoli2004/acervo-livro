import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Editoras } from '../../editoras/entities/editoras.entity';
import { Exemplares } from '../../exemplares/entities/exemplares.entity';
import { Reservas } from '../../reservas/entities/reservas.entity';

@Entity({ name: 'livros' })
export class Livros {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  titulo!: string;

  @Column({ length: 20, unique: true })
  isbn!: string;

  @Column()
  anoPublicacao!: number;

  // uma editora pode ter muitos livros, mas um livro tem apenas uma editora
  @ManyToOne(() => Editoras, (editoras) => editoras.livros)
  @JoinColumn({ name: 'editora_id' })
  editora!: Editoras;

  // um livro pode ter muitos exemplares, mas um exemplar tem apenas um livro
  @OneToMany(() => Exemplares, (exemplares) => exemplares.livro)
  exemplares!: Exemplares[];

  // um livro pode ter muitas reservas, mas uma reserva pertence a um livro
  @OneToMany(() => Reservas, (reservas) => reservas.livro)
  reservas!: Reservas[];
}
