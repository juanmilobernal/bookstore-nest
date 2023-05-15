import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { ConfigModule } from '@nestjs/config';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [BooksController],
      providers: [BooksService, AuthorizationGuard,{
        provide: getModelToken(Book.name),
        useClass: jest.fn(),
      }],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
});
