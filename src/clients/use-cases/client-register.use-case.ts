import IClientRepository from '../repositories/client.interface.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export default class ClientRegisterUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(createClientDto: CreateClientDto) {
    return await this.clientRepository.create(createClientDto);
  }
}
