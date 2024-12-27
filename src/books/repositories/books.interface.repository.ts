import { Book } from '../entities/book.entity';

export default interface IBooksRepository {
  save(book: Book): Promise<void>;
  findById(bookId: number): Promise<Book>;
  findAll(): Promise<Book[]>;
}
