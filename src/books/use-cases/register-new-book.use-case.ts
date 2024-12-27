import IBooksRepository from '../repositories/books.interface.repository';
import { CreateBookDto } from '../dto/create-book.dto';
import { Book } from '../entities/book.entity';

export default class RegisterNewBookUseCase {
  constructor(private readonly booksRepository: IBooksRepository) {}

  async execute(dto: CreateBookDto) {
    const book = new Book(dto);
    await this.booksRepository.save(book);
  }
}
