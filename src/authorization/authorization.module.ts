import { Module } from '@nestjs/common';
import { BooksController } from 'src/books/books.controller';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';

@Module({
    imports: [BooksModule],
    providers: [BooksService],
    controllers: [BooksController],
    exports: [AuthorizationModule]
})
export class AuthorizationModule {}
