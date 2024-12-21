import IClientRepository from '../repositories/client.interface.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ClientRegisterUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(createClientDto: CreateClientDto) {
    await this.clientRepository.create(createClientDto);
  }
}
