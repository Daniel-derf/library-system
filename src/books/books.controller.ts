import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

// DTOs
import { CreateBookDto } from './dto/create-book.dto';

// use cases
import DecreaseAvailableExamplarsUseCase from './use-cases/decrease-available-examplars.use-case';
import IncreaseAvailableExamplarsUseCase from './use-cases/increase-available-examplars.use-case';
import RegisterNewBookUseCase from './use-cases/register-new-book.use-case';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(DecreaseAvailableExamplarsUseCase)
    private readonly decreaseExemplarsUseCase: DecreaseAvailableExamplarsUseCase,

    @Inject(IncreaseAvailableExamplarsUseCase)
    private readonly increaseExemplarsUseCase: IncreaseAvailableExamplarsUseCase,

    @Inject(RegisterNewBookUseCase)
    private readonly registerNewBookUseCase: RegisterNewBookUseCase,
  ) {}

  @Post()
  registerNewBook(@Body() createBookDto: CreateBookDto) {
    this.registerNewBookUseCase.execute(createBookDto);
  }

  @Post(':id/add-exemplars/:qtt')
  increaseAvailableExemplars(
    @Param('id') bookId: number,
    @Param('qtt') quantity: number,
  ) {
    this.increaseExemplarsUseCase.execute({ bookId, quantity });
  }

  @Post(':id/remove-exemplars/:qtt')
  decreaseAvailableExemplars(
    @Param('id') bookId: number,
    @Param('qtt') quantity: number,
  ) {
    this.decreaseExemplarsUseCase.execute({ bookId, quantity });
  }
}
