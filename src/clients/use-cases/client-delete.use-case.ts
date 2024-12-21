import IClientRepository from '../repositories/client.interface.repository';

export default class ClientBorrowBookUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientCPF: string) {
    await this.clientRepository.delete(clientCPF);
  }
}
