import { Book } from '../entities/book.entity';
import DecreaseAvailableExamplarsUseCase from './decrease-available-examplars.use-case';
import IncreaseAvailableExamplarsUseCase from './increase-available-examplars.use-case';

describe('Book Entity', () => {
  let book: Book;

  beforeEach(() => {});

  it('should be defined', () => {
    expect(book).toBeDefined();
  });
});
