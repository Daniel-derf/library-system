import IClientRepository from '../repositories/client.interface.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import Client from '../entities/client.entity';

@Injectable()
export default class ClientRegisterUseCase {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(createClientDto: CreateClientDto) {
    const clientExists = await this.clientRepository.findById(
      createClientDto.cpf,
    );

    if (clientExists) throw new ConflictException('Client already exists!');

    const client = new Client(createClientDto);

    await this.clientRepository.save(client);
  }
}
