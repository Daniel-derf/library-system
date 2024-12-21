import IClientRepository from '../repositories/client.interface.repository';
import { CreateClientDto } from '../dto/create-client.dto';

export default class ClientBorrowBookUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(createClientDto: CreateClientDto) {
    await this.clientRepository.create(createClientDto);
  }
}
