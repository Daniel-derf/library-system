import { Injectable, Inject } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';

@Injectable()
export default class ClientFindOneUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(clientCPF: string) {
    const client = await this.clientRepository.findOne(clientCPF);
    return client;
  }
}
