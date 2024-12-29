// interfaces
import IClientRepository from '../repositories/client.interface.repository';

// repositories
import InMemoryClientsRepository from '../repositories/client.in-memory.repository';

// DTOs
import { CreateClientDto } from '../dto/create-client.dto';

describe('Book Entity', () => {
  let clientsRepository: IClientRepository;

  const createClientDto: CreateClientDto = {
    name: 'Daniel',
    books: [],
    cpf: '54657948873',
  };

  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository();
  });

  it('should register a new client', async () => {});
});
