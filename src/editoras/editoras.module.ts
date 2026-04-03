import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editoras } from './entities/editoras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Editoras])],
})
export class EditorasModule {}
