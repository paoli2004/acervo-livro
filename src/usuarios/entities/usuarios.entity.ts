import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Emprestimos } from '../../emprestimos/entities/emprestimos.entity';

export enum TipoUsuario {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
}

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

  @Column({
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.CLIENTE,
  })      
  tipo!: TipoUsuario;

  @CreateDateColumn({ type: 'timestamp' })
  criado_em!: Date;

  // um usuário pode ter muitos empréstimos, mas um empréstimo pertence a um usuário
  @OneToMany(() => Emprestimos, (emprestimos) => emprestimos.usuario)
  emprestimos!: Emprestimos[];
}
