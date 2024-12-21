import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import ClientBorrowBookUseCase from './use-cases/client-borrow-book.use-case';
import ClientReturnBorrowedBookUseCase from './use-cases/client-return-borrowed-book.use-case';
import ClientDeleteUseCase from './use-cases/client-delete.use-case';
import ClientFindAllUseCase from './use-cases/client-find-all.use-case';
import ClientFindOneUseCase from './use-cases/client-find-one.use-case';
import ClientRegisterUseCase from './use-cases/client-register.use-case';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly registerClientUseCase: ClientRegisterUseCase,
    private readonly deleteClientUseCase: ClientDeleteUseCase,
    private readonly findAllClientsUseCase: ClientFindAllUseCase,
    private readonly findOneClientUseCase: ClientFindOneUseCase,
    private readonly returnClientBorrowedBookUseCase: ClientReturnBorrowedBookUseCase,
    private readonly borrowBookClientUseCase: ClientBorrowBookUseCase,
  ) {}

  @Post()
  register(@Body() createClientDto: CreateClientDto) {
    return this.registerClientUseCase.execute(createClientDto);
  }

  @Get()
  findAll() {
    return this.findAllClientsUseCase.execute();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.findOneClientUseCase.execute(cpf);
  }

  @Patch(':id/books/:bookId/borrow')
  borrowBook(@Param('id') id: string, @Param('bookId') bookId: string) {
    return this.borrowBookClientUseCase.execute(id, +bookId);
  }

  @Patch(':id/books/:bookId/return')
  returnBorrowedBook(@Param('id') id: string, @Param('bookId') bookId: string) {
    return this.returnClientBorrowedBookUseCase.execute(id, +bookId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteClientUseCase.execute(id);
  }
}
