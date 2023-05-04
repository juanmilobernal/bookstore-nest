import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BooksModule, MongooseModule.forRoot('mongodb+srv://juanmilobernal:TemFyHIdWMXWykur@cluster0.3cikcby.mongodb.net/bookstore?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
