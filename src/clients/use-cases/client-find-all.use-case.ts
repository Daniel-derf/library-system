import IClientRepository from '../repositories/client.interface.repository';

export default class ClientFindAllUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute() {
    const clients = await this.clientRepository.findAll();
    return clients;
  }
}
