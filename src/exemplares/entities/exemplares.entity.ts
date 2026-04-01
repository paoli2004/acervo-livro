import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Livros } from "../../livros/entities/livros.entity";
import { Emprestimos } from "../../emprestimos/entities/emprestimos.entity";

@Entity({ name: 'exemplares' })
export class Exemplares {
    @PrimaryGeneratedColumn()
    id!: number;

    // um exemplar pertence a um livro, mas um livro pode ter muitos exemplares
    @ManyToOne(() => Livros, (livros) => livros.exemplares)
    @JoinColumn({ name: 'livro_id' })
    livro!: Livros;

    @Column({ length: 50, unique: true })
    codigo_patrimonio!: string;

    @Column({ length: 20 })
    status!: string;

    // um exemplar pode ter muitos empréstimos, mas um empréstimo pertence a um exemplar
    @OneToMany(() => Emprestimos, (emprestimos) => emprestimos.exemplar)
    emprestimos!: Emprestimos[];

}