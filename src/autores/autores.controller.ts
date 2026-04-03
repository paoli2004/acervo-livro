import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/createAutor.dto';
import { Autores } from './entities/autores.entity';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  createAutor(@Body() createAutor: CreateAutorDto) {
    return this.autoresService.createAutor(createAutor);
  }

  @Put(':id')
  updateAutor(
    @Param('id') id: number,
    @Body() updateAutor: CreateAutorDto,
  ): Promise<Autores> {
    return this.autoresService.updateAutor(id, updateAutor);
  }

  @Get(':id')
  getAutorById(@Param('id') id: number): Promise<Autores | null> {
    return this.autoresService.getAutorById(id);
  }

  @Get()
  getAllAutores(): Promise<Autores[]> {
    return this.autoresService.getAllAutores();
  }
}
