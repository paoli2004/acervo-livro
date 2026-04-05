import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EditorasService } from './editoras.service';
import { CreateEditoraDto } from './dto/createEditora.dto';
import { UpdateEditoraDto } from './dto/updateEditora.dto';

import { Editoras } from './entities/editoras.entity';

@Controller('editoras')
export class EditorasController {
  constructor(private readonly editorasService: EditorasService) {}

  @Post()
  createEditora(@Body() createEditora: CreateEditoraDto) {
    return this.editorasService.createEditora(createEditora);
  }

  @Patch(':id')
  updateEditora(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEditora: UpdateEditoraDto,
  ): Promise<Editoras | null> {
    return this.editorasService.updateEditora(id, updateEditora);
  }

  @Get(':id')
  getEditoraById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Editoras | null> {
    return this.editorasService.getEditoraById(id);
  }

  @Get()
  getAllEditora(): Promise<Editoras[]> {
    return this.editorasService.getAllEditoras();
  }

  @Delete(':id')
  async removeAutor(@Param('id', ParseIntPipe) id: number) {
    await this.editorasService.removeEditora(id);

    return {
      message: 'Editora removida com sucesso',
    };
  }
}
