import IClientRepository from './client.interface.repository';
import Client from '../entities/client.entity';
import { UpdateClientDto } from '../dto/update-client.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ClientInMemoryRepository implements IClientRepository {
  private clients: Client[] = [];

  constructor() {
    // Inicialize o array dentro da classe
    this.clients = [];
  }

  findOne(clientCPF: string): Promise<Client> {
    return new Promise((resolve, reject) => {
      const client = this.clients.find((c) => c.cpf === clientCPF);

      if (client) resolve(client);
      else return reject(new Error('Client not found'));
    });
  }

  findAll(): Promise<Client[]> {
    return new Promise((resolve) => {
      resolve(this.clients);
    });
  }

  create(createClientDto: CreateClientDto): Promise<Client> {
    return new Promise((resolve, reject) => {
      const clientAlreadyExists = this.clients.find(
        (c) => c.cpf === createClientDto.cpf,
      );

      if (clientAlreadyExists)
        return reject(new Error('Client already exists'));

      const newClient = new Client(createClientDto.cpf, createClientDto.name);

      this.clients.push(newClient);
    });
  }

  update(clientCPF: string, updateClientDto: UpdateClientDto): Promise<Client> {
    return new Promise((resolve, reject) => {
      const clientIdx = this.clients.findIndex((c) => c.cpf === clientCPF);

      if (clientIdx == -1) return reject(new Error('Client does not exist'));

      const client = this.clients[clientIdx];

      if (updateClientDto.name !== undefined) {
        client.name = updateClientDto.name;
      }
      if (updateClientDto.books !== undefined) {
        client.books = updateClientDto.books;
      }

      this.clients[clientIdx] = client;

      resolve(client);
    });
  }

  delete(clientCPF: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const clientIdx = this.clients.findIndex((c) => c.cpf === clientCPF);

      if (clientIdx == -1) return reject(new Error('Client does not exist'));

      this.clients = this.clients.filter((c) => c.cpf !== clientCPF);

      resolve(null);
    });
  }
}
