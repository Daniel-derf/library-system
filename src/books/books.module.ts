import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import DecreaseAvailableExamplarsUseCase from './use-cases/decrease-available-examplars.use-case';
import IncreaseAvailableExamplarsUseCase from './use-cases/increase-available-examplars.use-case';
import RegisterNewBookUseCase from './use-cases/register-new-book.use-case';
import InMemoryBooksRepository from './repositories/books.in-memory.repository';

@Module({
  controllers: [BooksController],
  providers: [
    {
      provide: 'BookRepository',
      useClass: InMemoryBooksRepository,
    },
    DecreaseAvailableExamplarsUseCase,
    IncreaseAvailableExamplarsUseCase,
    RegisterNewBookUseCase,
  ],
})
export class BooksModule {}
