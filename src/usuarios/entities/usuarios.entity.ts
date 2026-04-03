import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservas } from '../../reservas/entities/reservas.entity';
import { Emprestimos } from '../../emprestimos/entities/emprestimos.entity';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 255 })
  senha!: string;

  @Column({ length: 20 })
  tipo!: string;

  @CreateDateColumn({ type: 'timestamp' })
  criado_em!: Date;

  // um usuário pode ter muitas reservas, mas uma reserva pertence a um usuário
  @OneToMany(() => Reservas, (reservas) => reservas.usuario)
  reservas!: Reservas[];

  // um usuário pode ter muitos empréstimos, mas um empréstimo pertence a um usuário
  @OneToMany(() => Emprestimos, (emprestimos) => emprestimos.usuario)
  emprestimos!: Emprestimos[];
}
