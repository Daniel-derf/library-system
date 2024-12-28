import IClientRepository from '../repositories/client.interface.repository';
import { CreateClientDto } from '../dto/create-client.dto';
import { Injectable, Inject, ConflictException } from '@nestjs/common';

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

    // return await this.clientRepository.create(createClientDto);
  }
}
