import IBooksRepository from '../repositories/books.interface.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class DecreaseAvailableExamplarsUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly booksRepository: IBooksRepository,
  ) {}

  async execute({ bookId, quantity }: { bookId: number; quantity: number }) {
    const book = await this.booksRepository.findById(bookId);

    book.decreaseAvailableExemplarsBy(quantity);

    this.booksRepository.save(book);
  }
}
