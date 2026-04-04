import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/createCategoria.dto';
import { Categorias } from './entities/categorias.entity';
import { UpdateCategoriaDto } from './dto/updateCategoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  createCategoria(@Body() createCategoria: CreateCategoriaDto) {
    return this.categoriasService.createCategoria(createCategoria);
  }

  @Put(':id')
  updateCategoria(
    @Param('id') id: number,
    @Body() updateCategoria: UpdateCategoriaDto,
  ): Promise<Categorias> {
    return this.categoriasService.updateCategoria(id, updateCategoria);
  }

  @Get(':id')
  getCategoriaById(@Param('id') id: number): Promise<Categorias | null> {
    return this.categoriasService.getCategoriaById(id);
  }

  @Get()
  getAllCategorias(): Promise<Categorias[]> {
    return this.categoriasService.getAllCategorias();
  }
}
