import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Editoras } from '../../editoras/entities/editoras.entity';
import { Exemplares } from '../../exemplares/entities/exemplares.entity';
import { Autores } from '../../autores/entities/autores.entity';
import { Categorias } from '../../categorias/entities/categorias.entity';

@Entity({ name: 'livros' })
export class Livros {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  titulo!: string;

  @Column({ length: 20, unique: true })
  isbn!: string;

  @Column()
  ano_publicacao!: number;

  // uma editora pode ter muitos livros, mas um livro tem apenas uma editora
  @ManyToOne(() => Editoras, (editoras) => editoras.livros)
  @JoinColumn({ name: 'editora_id' })
  editora!: Editoras;

  // um livro pode ter muitos exemplares, mas um exemplar tem apenas um livro
  @OneToMany(() => Exemplares, (exemplares) => exemplares.livros)
  exemplares!: Exemplares[];

  @ManyToMany(() => Autores, (autor) => autor.livros)
  @JoinTable({
    name: 'livros_autores',
    joinColumn: { name: 'livro_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'autor_id', referencedColumnName: 'id' },
  })
  autor?: Autores[];

  @ManyToMany(() => Categorias, (categoria) => categoria.livros)
  @JoinTable({
    name: 'livros_categorias',
    joinColumn: { name: 'livro_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoria_id', referencedColumnName: 'id' },
  })
  categoria!: Categorias[];
}
