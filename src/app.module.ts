import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LivrosModule } from './livros/livros.module';
import { AutoresModule } from './autores/autores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ExemplaresModule } from './exemplares/exemplares.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { EditorasModule } from './editoras/editoras.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: 5432,
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    LivrosModule,
    AutoresModule,
    UsuariosModule,
    EmprestimosModule,
    ExemplaresModule,
    EditorasModule,
    CategoriasModule,
  ],
})
export class AppModule {}
