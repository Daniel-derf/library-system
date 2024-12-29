// interfaces
import IBooksRepository from '../../books/repositories/books.interface.repository';
import IClientRepository from '../repositories/client.interface.repository';

// repositories
import InMemoryBooksRepository from '../../books/repositories/books.in-memory.repository';
import InMemoryClientsRepository from '../repositories/client.in-memory.repository';

// DTOs
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateClientDto } from '../dto/create-client.dto';

// use cases
import ClientBorrowBookUseCase from './client-borrow-book.use-case';
import ClientDeleteUseCase from './client-delete.use-case';
import ClientFindAllUseCase from './client-find-all.use-case';
import ClientFindOneUseCase from './client-find-one.use-case';
import ClientRegisterUseCase from './client-register.use-case';
import RegisterNewBookUseCase from '../../books/use-cases/register-new-book.use-case';
import ClientReturnBorrowedBookUseCase from './client-return-borrowed-book.use-case';

describe('Book Entity', () => {
  let booksRepository: IBooksRepository;
  let clientsRepository: IClientRepository;

  const createBookDto: CreateBookDto = {
    id: null,
    name: 'metafisica',
    author: 'aristoteles',
    pages: 350,
    category: 'filosofia',
    availableExemplars: 1,
  };

  const createClientDto: CreateClientDto = {
    name: 'Daniel',
    books: [],
    cpf: '54657948873',
  };

  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository();
    clientsRepository = new InMemoryClientsRepository();
  });

  it('should register a new client', async () => {
    const useCase = new ClientRegisterUseCase(clientsRepository);

    await useCase.execute(createClientDto);

    const client = await clientsRepository.findById(createClientDto.cpf);

    expect(client.cpf).toBeDefined();
    expect(client.books).toEqual([]);
  });

  it('should find one client', async () => {
    const createUseCase = new ClientRegisterUseCase(clientsRepository);
    await createUseCase.execute(createClientDto);

    const findOneUseCase = new ClientFindOneUseCase(clientsRepository);
    const client = await findOneUseCase.execute(createClientDto.cpf);

    expect(client.cpf).toBeDefined();
  });

  it('should get all clients', async () => {
    const createUseCase = new ClientRegisterUseCase(clientsRepository);
    await createUseCase.execute(createClientDto);

    const findOneUseCase = new ClientFindAllUseCase(clientsRepository);
    const clients = await findOneUseCase.execute();

    expect(clients[0].cpf).toBeDefined();
  });

  it('should borrow a book to a client', async () => {
    const createClientUseCase = new ClientRegisterUseCase(clientsRepository);
    await createClientUseCase.execute(createClientDto);

    const createBookUseCase = new RegisterNewBookUseCase(booksRepository);
    await createBookUseCase.execute(createBookDto);

    const borrowBookUseCase = new ClientBorrowBookUseCase(
      clientsRepository,
      booksRepository,
    );

    await borrowBookUseCase.execute(createClientDto.cpf, 1);

    const book = await booksRepository.findById(1);
    const client = await clientsRepository.findById(createClientDto.cpf);

    expect(book.availableExemplars).toEqual(0);
    expect(client.books).toEqual([1]);
  });

  it('should return a client borrowed book', async () => {
    const createClientUseCase = new ClientRegisterUseCase(clientsRepository);
    await createClientUseCase.execute(createClientDto);

    const createBookUseCase = new RegisterNewBookUseCase(booksRepository);
    await createBookUseCase.execute(createBookDto);

    const book = await booksRepository.findById(1);
    const client = await clientsRepository.findById(createClientDto.cpf);

    console.log('book: ', book);
    console.log('client: ', client);

    const borrowBookUseCase = new ClientBorrowBookUseCase(
      clientsRepository,
      booksRepository,
    );

    await borrowBookUseCase.execute(createClientDto.cpf, 1);

    const returnBorrowedBookUseCase = new ClientReturnBorrowedBookUseCase(
      clientsRepository,
      booksRepository,
    );

    await returnBorrowedBookUseCase.execute(createClientDto.cpf, book.id);

    expect(book.availableExemplars).toEqual(1);
    expect(client.books).toEqual([]);
  });

  it('should delete a client', async () => {
    const createClientUseCase = new ClientRegisterUseCase(clientsRepository);
    await createClientUseCase.execute(createClientDto);

    const useCase = new ClientDeleteUseCase(clientsRepository);
    await useCase.execute(createClientDto.cpf);

    const client = await clientsRepository.findById(createClientDto.cpf);

    expect(client).toBeUndefined();
  });
});
