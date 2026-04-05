import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exemplares } from './entities/exemplares.entity';
import { ExemplaresController } from './exemplares.controller';
import { ExemplaresService } from './exemplares.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exemplares])],
  controllers: [ExemplaresController],
  providers: [ExemplaresService],
  exports: [ExemplaresService],
})
export class ExemplaresModule {}
