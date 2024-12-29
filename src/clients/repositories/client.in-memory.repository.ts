import Client from '../entities/client.entity';
import IClientRepository from './client.interface.repository';

export default class InMemoryClientsRepository implements IClientRepository {
  private clients: Client[] = [];

  async save(client: Client): Promise<void> {
    const idx = this.clients.findIndex((b) => b.cpf === client.cpf);

    if (idx !== -1) {
      this.clients[idx] = client;
      return;
    }

    this.clients.push(client);
  }

  async findById(clientCpf: string): Promise<Client> {
    return this.clients.find((client) => client.cpf === clientCpf);
  }

  async findAll(): Promise<Client[]> {
    return this.clients;
  }

  async delete(clientCpf: string): Promise<void> {
    this.clients = this.clients.filter((c) => c.cpf !== clientCpf);
  }
}
