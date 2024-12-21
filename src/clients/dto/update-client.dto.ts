import { PartialType } from '@nestjs/mapped-types';

class _UpdateClientDto {
  name: string;
  books: number[];
}

export class UpdateClientDto extends PartialType(_UpdateClientDto) {}
