import IBooksRepository from '../repositories/books.interface.repository';

export default class DecreaseAvailableExamplarsUseCase {
  constructor(private readonly booksRepository: IBooksRepository) {}
}
