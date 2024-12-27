import IBooksRepository from '../repositories/books.interface.repository';
import { CreateBookDto } from '../dto/create-book.dto';

export default class DecreaseAvailableExamplarsUseCase {
  constructor(private readonly booksRepository: IBooksRepository) {}

  execute(dto: CreateBookDto) {}
}
