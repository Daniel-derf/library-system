import { Book } from '../entities/book.entity';

import IBooksRepository from '../repositories/books.interface.repository';
import InMemoryBooksRepository from '../repositories/books.in-memory.repository';

import DecreaseAvailableExamplarsUseCase from './decrease-available-examplars.use-case';
import IncreaseAvailableExamplarsUseCase from './increase-available-examplars.use-case';
import RegisterNewBookUseCase from './register-new-book.use-case';
import { CreateBookDto } from '../dto/create-book.dto';

describe('Book Entity', () => {
  let booksRepository: IBooksRepository;
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

  it('should register a new book', async () => {
    const bookDto = createBookDto;

    const registerUseCase = new RegisterNewBookUseCase(booksRepository);

    await registerUseCase.execute(bookDto);

    const dbOutput = await booksRepository.findById(1);

    expect(dbOutput.id).toBeDefined();
  });

  it('should increase available books exemplars', async () => {
    const bookDto = createBookDto;
    let book = new Book(bookDto);

    await booksRepository.save(book);

    const increaseUseCase = new IncreaseAvailableExamplarsUseCase(
      booksRepository,
    );

    await increaseUseCase.execute({ bookId: 1, quantity: 1 });

    book = await booksRepository.findById(1);
    expect(book.availableExemplars).toBe(1);
  });

  it('should decrease available books exemplars', async () => {
    const bookDto = createBookDto;
    bookDto.availableExemplars = 2;
    let book = new Book(bookDto);

    await booksRepository.save(book);

    const decreaseUseCase = new DecreaseAvailableExamplarsUseCase(
      booksRepository,
    );

    await decreaseUseCase.execute({ bookId: 1, quantity: 1 });

    book = await booksRepository.findById(1);
    expect(book.availableExemplars).toBe(1);
  });
});
