import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import IClientRepository from '../repositories/client.interface.repository';

@Injectable()
export default class ClientDeleteUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(clientCPF: string) {
    const clientExists = await this.clientRepository.findById(clientCPF);

    if (!clientExists) throw new NotFoundException('Client does not exist');

    // return await this.clientRepository.delete(clientCPF);
  }
}
