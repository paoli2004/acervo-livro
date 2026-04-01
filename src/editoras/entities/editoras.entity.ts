import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Livros } from "../../livros/entities/livros.entity";

@Entity({ name: 'editoras' })
export class Editoras {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    nome!: string;

    @Column({ length: 100 })
    cidade!: string;

    // um livro tem apenas uma editora, mas uma editora pode ter muitos livros
    @OneToMany(() => Livros, (livros) => livros.editora)
    livros!: Livros[];
}
