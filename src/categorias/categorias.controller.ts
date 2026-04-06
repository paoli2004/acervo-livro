import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
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

  @Patch(':id')
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

  @Delete(':id')
  removeCategoria(@Param('id') id: number) {
    return this.categoriasService.removeCategoria(id);
  }
}
