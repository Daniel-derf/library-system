import { Book } from '../entities/book.entity';
import IBooksRepository from './books.interface.repository';

export default class InMemoryBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  constructor() {
    this.books = [];
  }

  async save(book: Book): Promise<void> {
    if (book.id) {
      const idx = this.books.findIndex((b) => b.id === book.id);
      this.books[idx] = book;
      return;
    }

    book.id = this.books.length + 1;
    this.books.push(book);
  }

  async findById(bookId: number): Promise<Book> {
    return this.books.find((book) => book.id === bookId);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }
}
