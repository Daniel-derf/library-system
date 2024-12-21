import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

interface IUseCase {
  execute(arg?);
}

@Controller('clients')
export class ClientsController {
  private readonly registerClientUseCase: IUseCase;
  private readonly findAllClientsUseCase: IUseCase;
  private readonly borrowBookUseCase: IUseCase;
  private readonly findOneClientUseCase: IUseCase;
  private readonly returnBorrowedBookUseCase: IUseCase;
  private readonly deleteClientUseCase: IUseCase;

  @Post()
  register(@Body() createClientDto: CreateClientDto) {
    return this.registerClientUseCase.execute(createClientDto);
  }

  @Get()
  findAll() {
    return this.findAllClientsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneClientUseCase.execute();
  }

  @Patch(':id/books')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
