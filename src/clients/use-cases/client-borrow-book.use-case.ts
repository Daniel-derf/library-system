import IClientRepository from '../repositories/client.interface.repository';

export default class ClientBorrowBookUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientCpf: string, bookId: number) {
    const client = await this.clientRepository.findOne(clientCpf);

    if (!client) {
      throw new Error(`Client with CPF ${clientCpf} not found.`);
    }

    client.borrowBook(bookId);

    await this.clientRepository.update(clientCpf, {
      name: client.name,
      books: client.books,
    });
  }
}
