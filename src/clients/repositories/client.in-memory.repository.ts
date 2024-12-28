import Client from '../entities/client.entity';
import IClientRepository from './client.interface.repository';

export default class InMemoryClientsRepository implements IClientRepository {
  private clients: Client[] = [];

  async save(client: Client): Promise<void> {
    if (client.id) {
      const idx = this.clients.findIndex((b) => b.id === client.id);
      this.clients[idx] = client;
      return;
    }

    client.id = this.clients.length + 1;
    this.clients.push(client);
  }

  async findById(clientId: number): Promise<Client> {
    return this.clients.find((client) => client.id === clientId);
  }

  async findAll(): Promise<Client[]> {
    return this.clients;
  }
}
