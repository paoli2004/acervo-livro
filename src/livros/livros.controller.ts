// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { LivrosService } from './livros.service';
// import { CreateLivroDto } from './dto/createLivro.dto';
// import { UpdateLivroDto } from './dto/updateLivro.dto';

// @Controller('livros')
// export class LivrosController {
//   constructor(private readonly livrosService: LivrosService) {}

//   @Post()
//   create(@Body() createLivrosDto: CreateLivroDto) {
//     return this.livrosService.create(createLivrosDto);
//   }

//   @Get()
//   findAll() {
//     return this.livrosService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.livrosService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateLivrosDto: UpdateLivroDto) {
//     return this.livrosService.update(+id, updateLivrosDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.livrosService.remove(+id);
//   }
// }
