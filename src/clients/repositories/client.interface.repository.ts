import Client from '../entities/client.entity';

export default interface IClientRepository {
  save(client: Client): Promise<void>;
  findById(clientId: number): Promise<Client>;
  findAll(): Promise<Client[]>;
}
