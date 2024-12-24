import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import Client from '../entities/client.entity';

export default interface IClientRepository {
  findOne(clientCPF: string): Promise<Client | undefined>;
  findAll(): Promise<Client[]>;

  create(createClientDto: CreateClientDto): Promise<Client | undefined>;

  update(
    clientCPF: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client | undefined>;
  delete(clientCPF: string): Promise<void>;
}
