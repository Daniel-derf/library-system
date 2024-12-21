import IClientRepository from '../repositories/client.interface.repository';

export default class ClientFindOneUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientCPF: string) {
    const client = await this.clientRepository.findOne(clientCPF);
    return client;
  }
}
