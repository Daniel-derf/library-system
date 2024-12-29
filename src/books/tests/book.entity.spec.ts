import { Book } from '../entities/book.entity';

describe('Book Entity', () => {
  let book: Book;

  beforeEach(() => {
    const bookDto = {
      id: 1,
      name: 'metafisica',
      author: 'aristoteles',
      pages: 350,
      category: 'filosofia',
      availableExemplars: 2,
    };

    book = new Book(bookDto);
  });

  it('should be defined', () => {
    expect(book).toBeDefined();
  });

  it('should be available', () => {
    const isAvailable = book.isAvailable();

    expect(isAvailable).toBeTruthy();
  });

  it('should be unavailable', () => {
    book.decreaseAvailableExemplarsBy(2);

    expect(book.availableExemplars).toBe(0);
    expect(book.isAvailable()).toBeFalsy();
  });

  it('should be available by increasing books amount', () => {
    book.decreaseAvailableExemplarsBy(2);
    book.increaseAvailableExemplarsBy(1);

    expect(book.availableExemplars).toBe(1);
    expect(book.isAvailable()).toBeTruthy();
  });

  it('error for attempting to decrease from a zero amount of books', () => {
    book.decreaseAvailableExemplarsBy(2);

    expect(() => book.decreaseAvailableExemplarsBy(1)).toThrow(
      'Cannot decrease by more than available exemplars',
    );
  });

  it('error for attempting to increase by zero the amount of books', () => {
    expect(() => book.increaseAvailableExemplarsBy(0)).toThrow(
      'Quantity to increase must be greater than zero',
    );
  });

  it('error for attempting to create a book with zero pages', () => {
    expect(
      () =>
        new Book({
          id: 2,
          name: 'empty book',
          author: 'unknown',
          pages: 0,
          category: 'fiction',
          availableExemplars: 1,
        }),
    ).toThrow('The number of pages must be at least 1');
  });

  it('error for attempting to create a book with negative exemplars', () => {
    expect(
      () =>
        new Book({
          id: 3,
          name: 'error book',
          author: 'unknown',
          pages: 100,
          category: 'fiction',
          availableExemplars: -1,
        }),
    ).toThrow('Available exemplars cannot be negative');
  });

  it('error for attempting to decrease a quantity bigger than the books amount', () => {
    expect(() => book.decreaseAvailableExemplarsBy(3)).toThrow(
      'Cannot decrease by more than available exemplars',
    );
  });
});
