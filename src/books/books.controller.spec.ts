import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { ConfigModule } from '@nestjs/config';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dto/create-book.dto';
import { HttpStatus } from '@nestjs/common';

jest.mock('./books.service');
jest.mock('./dto/create-book.dto');

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;
  let response: any;
  let createBookDTO: CreateBookDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [BooksController],
      providers: [
        BooksService,
        AuthorizationGuard,
        {
          provide: getModelToken(Book.name),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);

    response = {
      status: jest.fn(() => response),
      json: jest.fn(),
    };

    createBookDTO = {
      id: '1',
      title: 'Sample Book',
      author: 'John Doe',
      description: 'Cualquiera'
    };

  });
  
  it('should create a book and return a response with status 200 and book information', async () => {
    const createdBook = { createBookDTO };
    jest.spyOn(booksService, 'createBook').mockResolvedValue(createBookDTO);

    await booksController.create(response, createBookDTO);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Book created succesfully!',
      book: {
        author: 'John Doe',
        description: 'Cualquiera',
        id: '1',
        title: 'Sample Book',
      },
    });
    expect(booksService.createBook).toHaveBeenCalledWith(createBookDTO);
  });

  it('should return books with status code 200', async () => {
    const createdBook = { createBookDTO };
    jest.spyOn(booksService, 'createBook').mockResolvedValue(createBookDTO);

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const res = responseMock;

    // Act
    await booksController.getBooks(res);

    // Assert
    expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
  });


});
