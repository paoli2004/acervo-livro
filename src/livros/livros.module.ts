import { Module } from '@nestjs/common';
import { Livros } from './entities/livros.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Livros])],
})
export class LivrosModule {}
