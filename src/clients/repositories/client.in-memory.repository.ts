import IClientRepository from './client.interface.repository';
import Client from '../entities/client.entity';
import { UpdateClientDto } from '../dto/update-client.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ClientInMemoryRepository implements IClientRepository {
  private clients: Client[] = [];

  constructor() {
    this.clients = [];
  }

  async findOne(clientCPF: string): Promise<Client> {
    const client = this.clients.find((c) => c.cpf === clientCPF);

    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.clients;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = new Client(createClientDto.cpf, createClientDto.name);
    this.clients.push(newClient);
    return newClient;
  }

  async update(
    clientCPF: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const clientIdx = this.clients.findIndex((c) => c.cpf === clientCPF);

    const client = this.clients[clientIdx];

    if (updateClientDto.name) {
      client.name = updateClientDto.name;
    }
    if (updateClientDto.books) {
      client.books = updateClientDto.books;
    }

    this.clients[clientIdx] = client;
    return client;
  }

  async delete(clientCPF: string): Promise<void> {
    this.clients = this.clients.filter((c) => c.cpf !== clientCPF);
  }
}
