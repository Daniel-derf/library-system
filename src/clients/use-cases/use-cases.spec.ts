// entities
import Client from '../entities/client.entity';
import { Book } from 'src/books/entities/book.entity';

// interfaces
import IBooksRepository from 'src/books/repositories/books.interface.repository';
import IClientRepository from '../repositories/client.interface.repository';

// repositories
import InMemoryBooksRepository from 'src/books/repositories/books.in-memory.repository';
import ClientInMemoryRepository from '../repositories/client.in-memory.repository';

// DTOs
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateClientDto } from '../dto/create-client.dto';

// use cases
import ClientBorrowBookUseCase from './client-borrow-book.use-case';
import ClientDeleteUseCase from './client-delete.use-case';
import ClientFindAllUseCase from './client-find-all.use-case';
import ClientFindOneUseCase from './client-find-one.use-case';

describe('Book Entity', () => {
  let booksRepository: IBooksRepository;
  let clientsRepository: IClientRepository;

  const createBookDto: CreateBookDto = {
    id: null,
    name: 'metafisica',
    author: 'aristoteles',
    pages: 350,
    category: 'filosofia',
    availableExemplars: 0,
  };

  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository();
  });

  it('should register a new client', async () => {});

  it('should find one client', async () => {});

  it('should get all clients', async () => {});

  it('should borrow a book to a client', async () => {});

  it('should return a client borrowed book', async () => {});

  it('should delete a client', async () => {});
});
