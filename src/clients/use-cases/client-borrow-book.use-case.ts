import IClientRepository from '../repositories/client.interface.repository';
import { Book } from 'src/books/entities/book.entity';
import IBooksRepository from 'src/books/repositories/books.interface.repository';
import InMemoryBooksRepository from 'src/books/repositories/books.in-memory.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

Injectable();
export default class ClientBorrowBookUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
    private readonly booksRepository: IBooksRepository,
  ) {}

  async execute(clientCPF: string, bookId: number) {
    const client = await this.clientRepository.findById(clientCPF);

    if (!client) {
      throw new NotFoundException(`Client with CPF ${clientCPF} not found`);
    }

    const book = await this.booksRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (book.availableExemplars === 0) {
      throw new NotFoundException(
        `Book with ID ${bookId} is not available to be borrowed now`,
      );
    }

    book.decreaseAvailableExemplarsBy(1);
    client.borrowBook(bookId);

    this.booksRepository.save(book);
    this.clientRepository.save(client);
  }
}
