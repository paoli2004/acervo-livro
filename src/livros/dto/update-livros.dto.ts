import { PartialType } from '@nestjs/mapped-types';
import { CreateLivrosDto } from './create-livros.dto';

export class UpdateLivrosDto extends PartialType(CreateLivrosDto) {}
