import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Livros } from '../../livros/entities/livros.entity';
import { Usuarios } from '../../usuarios/entities/usuarios.entity';

export class Reservas {
  @PrimaryGeneratedColumn()
  id!: number;

  // uma reserva pertence a um usuário, mas um usuário pode ter muitas reservas
  @ManyToOne(() => Usuarios, (usuarios) => usuarios.reservas)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuarios;

  // uma reserva pertence a um livro, mas um livro pode ter muitas reservas
  @ManyToOne(() => Livros, (livros) => livros.exemplares)
  @JoinColumn({ name: 'livro_id' })
  livro!: Livros;

  @CreateDateColumn()
  data_reserva!: Date;

  @Column({ length: 20 })
  status!: string;
}
