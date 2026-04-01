import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivrosDto } from './dto/create-livros.dto';
import { UpdateLivrosDto } from './dto/update-livros.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livros } from './entities/livros.entity';
import { Editoras } from '../editoras/entities/editoras.entity';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livros)
    private readonly livrosRepository : Repository<Livros>,

    @InjectRepository(Editoras)
    private EditorasRepository: Repository<Editoras>,
  ) {}

  async create(createLivrosDto: CreateLivrosDto) {
    const livro = this.livrosRepository.create(createLivrosDto);

    return await this.livrosRepository.save(livro);
  }

  async findAll() {
    return await this.livrosRepository.find();
  }

  async findOne(id: number) {
    return await this.livrosRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLivrosDto: UpdateLivrosDto) {
    const livro = await this.findOne(id);

    if(!livro) {
      throw new NotFoundException();
    }

    Object.assign(livro, updateLivrosDto);

    return await this.livrosRepository.save(livro);
  }

  async remove(id: number) {
    const livro = await this.findOne(id);

    if(!livro) {
      throw new NotFoundException();
    }

    return await this.livrosRepository.remove(livro);
  }
}
