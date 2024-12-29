import Client from '../entities/client.entity';

export default interface IClientRepository {
  save(client: Client): Promise<void>;
  findById(clientCpf: string): Promise<Client>;
  findAll(): Promise<Client[]>;
  delete(clientCpf: string): Promise<void>;
}
