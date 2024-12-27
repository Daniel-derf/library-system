import IBooksRepository from '../repositories/books.interface.repository';

export default class IncreaseAvailableExamplarsUseCase {
  constructor(private readonly booksRepository: IBooksRepository) {}

  async execute({ bookId, quantity }: { bookId: number; quantity: number }) {}
}
