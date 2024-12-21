import { Injectable } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';

@Injectable()
export default class ClientReturnBorrowedBookUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientCPF: string, bookId: number) {
    const client = await this.clientRepository.findOne(clientCPF);

    client.returnBorrowedBook(bookId);

    await this.clientRepository.update(clientCPF, {
      books: client.books,
    });
  }
}
