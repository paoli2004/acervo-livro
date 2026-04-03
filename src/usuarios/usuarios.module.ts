import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './entities/usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
