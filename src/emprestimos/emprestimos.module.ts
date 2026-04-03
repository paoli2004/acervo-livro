import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimos } from './entities/emprestimos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimos])],
})
export class EmprestimosModule {}
