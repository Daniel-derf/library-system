import IClientRepository from '../repositories/client.interface.repository';

export default class ClientBorrowBookUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientCPF: string, bookId: number) {
    const client = await this.clientRepository.findOne(clientCPF);

    if (!client) {
      throw new Error(`Client with CPF ${clientCPF} not found.`);
    }

    client.borrowBook(bookId);

    await this.clientRepository.update(clientCPF, {
      books: client.books,
    });
  }
}
