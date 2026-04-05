import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EditorasService } from './editoras.service';
import { CreateEditoraDto } from './dto/createEditora.dto';
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
    @Param('id') id: number,
    @Body() updateEditora: CreateEditoraDto,
  ): Promise<Editoras> {
    return this.editorasService.updateEditora(id, updateEditora);
  }

  @Get(':id')
  getEditoraById(@Param('id') id: number): Promise<Editoras | null> {
    return this.editorasService.getEditoraById(id);
  }

  @Get()
  getAllEditora(): Promise<Editoras[]> {
    return this.editorasService.getAllEditoras();
  }
}
