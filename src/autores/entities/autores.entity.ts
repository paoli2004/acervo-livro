import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'autores' })
export class Autores {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    nome!: string;

    @Column({ length: 50 })
    nacionalidade!: string;
}
