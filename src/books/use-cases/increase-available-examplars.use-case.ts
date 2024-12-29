import IBooksRepository from '../repositories/books.interface.repository';
import { Inject } from '@nestjs/common';

export default class IncreaseAvailableExamplarsUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly booksRepository: IBooksRepository,
  ) {}

  async execute({ bookId, quantity }: { bookId: number; quantity: number }) {
    const book = await this.booksRepository.findById(bookId);

    book.increaseAvailableExemplarsBy(quantity);

    this.booksRepository.save(book);
  }
}
