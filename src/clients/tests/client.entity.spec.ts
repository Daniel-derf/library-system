// interfaces
import IClientRepository from '../repositories/client.interface.repository';

// repositories
import InMemoryClientsRepository from '../repositories/client.in-memory.repository';

// DTOs
import { CreateClientDto } from '../dto/create-client.dto';

// entities
import Client from '../entities/client.entity';

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

  it('should borrow a book to the client', () => {
    const client = new Client(createClientDto);

    client.borrowBook(1);

    expect(client.books).toEqual([1]);
  });

  it('should get an error by trying to borrow a borrowed book', () => {
    const client = new Client(createClientDto);

    client.borrowBook(1);

    expect(() => client.borrowBook(1)).toThrow(
      `Book with ID 1 is already borrowed by this client`,
    );
  });

  it('should return a borrowed book', () => {
    const client = new Client(createClientDto);

    client.borrowBook(1);
    client.returnBorrowedBook(1);

    expect(client.books).toEqual([]);
  });

  it('should get an error by trying to return a non borrowed book', () => {
    const client = new Client(createClientDto);

    expect(() => client.returnBorrowedBook(1)).toThrow(
      `Book with ID 1 was not borrowed by this client`,
    );
  });
});
