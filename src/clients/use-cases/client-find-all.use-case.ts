import { Injectable, Inject } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';

@Injectable()
export default class ClientFindAllUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute() {
    const clients = await this.clientRepository.findAll();
    return clients;
  }
}
