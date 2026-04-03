import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './entities/categorias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])],
})
export class CategoriasModule {}
