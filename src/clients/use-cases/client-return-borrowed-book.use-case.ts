import { Injectable, Inject } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';

@Injectable()
export default class ClientReturnBorrowedBookUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(clientCPF: string, bookId: number) {
    const client = await this.clientRepository.findOne(clientCPF);

    client.returnBorrowedBook(bookId);

    await this.clientRepository.update(clientCPF, {
      books: client.books,
    });
  }
}
