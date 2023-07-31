import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    AuthorizationModule,
    ConfigModule.forRoot(),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
