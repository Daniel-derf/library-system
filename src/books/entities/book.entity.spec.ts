import { Test, TestingModule } from '@nestjs/testing';
import { Book } from './book.entity';

describe('Book Entity', () => {
  let book: Book;

  beforeEach(async () => {
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

    expect(book.availableExemplars === 0);
    expect(book.isAvailable()).toBeFalsy();
  });

  it('should be available by increasing books amount', () => {
    book.decreaseAvailableExemplarsBy(2);
    book.increaseAvailableExemplarsBy(1);

    expect(book.availableExemplars === 1);
    expect(book.isAvailable()).toBeTruthy();
  });
});
