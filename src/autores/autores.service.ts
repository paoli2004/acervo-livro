import { Body, Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/createAutor.dto';
import { Autores } from './entities/autores.entity';

@Injectable()
export class AutoresService {
  private autor: Autores[] = [];

  async createAutor(@Body() createAutor: CreateAutorDto): Promise<Autores> {
    const newAutor: Autores = {
      id: this.autor.length + 1,
      ...createAutor,
    };
    this.autor.push(newAutor);
    return newAutor;
  }

  async getAllAutores(): Promise<Autores[]> {
    return this.autor;
  }
}
