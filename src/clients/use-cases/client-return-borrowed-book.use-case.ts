import IClientRepository from '../repositories/client.interface.repository';

export default class ClientBorrowBookUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(bookId: number, clientCPF: string) {
    const client = await this.clientRepository.findOne(clientCPF);

    client.returnBorrowedBook(bookId);

    await this.clientRepository.update(clientCPF, {
      books: client.books,
    });
  }
}
