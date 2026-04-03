import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/createAutor.dto';
import { Autores } from './entities/autores.entity';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  async createAutor(@Body() createAutor: CreateAutorDto) {
    return await this.autoresService.createAutor(createAutor);
  }

  @Get()
  async getAllAutores(): Promise<Autores[]> {
    return await this.autoresService.getAllAutores();
  }
}
