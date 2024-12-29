import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import ClientInMemoryRepository from './repositories/client.in-memory.repository';
import ClientRegisterUseCase from './use-cases/client-register.use-case';
import ClientDeleteUseCase from './use-cases/client-delete.use-case';
import ClientFindAllUseCase from './use-cases/client-find-all.use-case';
import ClientBorrowBookUseCase from './use-cases/client-borrow-book.use-case';
import ClientReturnBorrowedBookUseCase from './use-cases/client-return-borrowed-book.use-case';
import ClientFindOneUseCase from './use-cases/client-find-one.use-case';
import InMemoryBooksRepository from 'src/books/repositories/books.in-memory.repository';

@Module({
  controllers: [ClientsController],
  providers: [
    // repositories
    {
      provide: 'ClientRepository',
      useClass: ClientInMemoryRepository,
    },
    { provide: 'BookRepository', useClass: InMemoryBooksRepository },

    ClientInMemoryRepository,
    InMemoryBooksRepository,

    // use cases
    ClientRegisterUseCase,
    ClientDeleteUseCase,
    ClientFindAllUseCase,
    ClientFindOneUseCase,
    ClientBorrowBookUseCase,
    ClientReturnBorrowedBookUseCase,
  ],
})
export class ClientsModule {}
