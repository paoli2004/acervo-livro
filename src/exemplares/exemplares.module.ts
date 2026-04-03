import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exemplares } from './entities/exemplares.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exemplares])],
})
export class ExemplaresModule {}
