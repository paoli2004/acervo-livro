import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/createLivro.dto';
import { UpdateLivroDto } from './dto/updateLivro.dto';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  async createLivro(@Body() createLivroDto: CreateLivroDto) {
    await this.livrosService.createLivro(createLivroDto);

    return {
      message: 'Livro criado com sucesso',
    };
  }

  @Patch(':id')
  async updateLivro(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLivroDto: UpdateLivroDto,
  ) {
    await this.livrosService.updateLivro(id, updateLivroDto);

    return {
      message: 'Livro atualizado com sucesso',
    };
  }

  @Delete(':id')
  async removeLivro(@Param('id', ParseIntPipe) id: number) {
    await this.livrosService.removeLivro(id);

    return {
      message: 'Livro removido com sucesso',
    };
  }

  @Get()
  async getAllLivros() {
    return this.livrosService.getAllLivros();
  }

  @Get(':id')
  async getLivroById(@Param('id') id: number) {
    return this.livrosService.getLivroById(id);
  }
}
