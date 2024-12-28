import { Injectable, Inject } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';
import IBooksRepository from 'src/books/repositories/books.interface.repository';

@Injectable()
export default class ClientReturnBorrowedBookUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
    private readonly booksRepository: IBooksRepository,
  ) {}

  async execute(clientCPF: string, bookId: number) {
    const client = await this.clientRepository.findById(clientCPF);

    client.returnBorrowedBook(bookId);

    const book = await this.booksRepository.findById(bookId);
    book.increaseAvailableExemplarsBy(1);

    await this.clientRepository.save(client);
    await this.booksRepository.save(book);
  }
}
