import { Book } from '../entities/book.entity';
import IBooksRepository from './books.interface.repository';

export default class InMemoryBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  async findById(bookId: number): Promise<Book> {
    return this.books.find((book) => book.id === bookId);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }
}
