import { Inject, Injectable } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';

@Injectable()
export default class ClientDeleteUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(clientCPF: string) {
    return await this.clientRepository.delete(clientCPF);
  }
}
