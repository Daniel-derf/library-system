import IClientRepository from '../repositories/client.interface.repository';
import { Inject, Injectable } from '@nestjs/common';

Injectable();
export default class ClientBorrowBookUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(clientCPF: string, bookId: number) {
    const client = await this.clientRepository.findOne(clientCPF);

    if (!client) {
      throw new Error(`Client with CPF ${clientCPF} not found.`);
    }

    client.borrowBook(bookId);

    return await this.clientRepository.update(clientCPF, {
      books: client.books,
    });
  }
}
