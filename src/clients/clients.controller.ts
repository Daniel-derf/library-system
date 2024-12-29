import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
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
  @Inject(ClientRegisterUseCase)
  private readonly registerClientUseCase: ClientRegisterUseCase;

  @Inject(ClientDeleteUseCase)
  private readonly deleteClientUseCase: ClientDeleteUseCase;

  @Inject(ClientFindAllUseCase)
  private readonly findAllClientsUseCase: ClientFindAllUseCase;

  @Inject(ClientFindOneUseCase)
  private readonly findOneClientUseCase: ClientFindOneUseCase;

  @Inject(ClientReturnBorrowedBookUseCase)
  private readonly returnClientBorrowedBookUseCase: ClientReturnBorrowedBookUseCase;

  @Inject(ClientBorrowBookUseCase)
  private readonly borrowBookClientUseCase: ClientBorrowBookUseCase;

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

  @Post(':cpf/books/:bookId/borrow')
  borrowBook(@Param('cpf') cpf: string, @Param('bookId') bookId: string) {
    return this.borrowBookClientUseCase.execute(cpf, +bookId);
  }

  @Post(':cpf/books/:bookId/return')
  returnBorrowedBook(
    @Param('cpf') cpf: string,
    @Param('bookId') bookId: string,
  ) {
    return this.returnClientBorrowedBookUseCase.execute(cpf, +bookId);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.deleteClientUseCase.execute(cpf);
  }
}
