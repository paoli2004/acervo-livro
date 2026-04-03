import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'categorias' })
export class Categorias {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  nome!: string;
}
