import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/createEmprestimo.dto';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  async createEmprestimo(@Body() createEmprestimoDto: CreateEmprestimoDto) {
    await this.emprestimosService.createEmprestimo(createEmprestimoDto);

    return {
      message: 'Empréstimo criado com sucesso',
    };
  }

  @Delete(':id')
  async removeEmprestimo(@Param('id', ParseIntPipe) id: number) {
    await this.emprestimosService.removeEmprestimo(id);

    return {
      message: 'Empréstimo removido com sucesso',
    };
  }

  @Get()
  async getAllEmprestimos() {
    return this.emprestimosService.getAllEmprestimos();
  }

  @Get(':id')
  async getEmprestimoById(id: number) {
    return this.emprestimosService.getEmprestimoById(id);
  }
}
