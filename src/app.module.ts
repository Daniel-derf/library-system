import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ClientsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
