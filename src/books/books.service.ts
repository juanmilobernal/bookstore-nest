import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async getBooks() {
    const books = await this.bookModel.find();
    return books;
  }

  async getBook(boookId: string): Promise<Book> {
    const book = await this.bookModel.findById(boookId);
    return book;
  }

  async createBook(createBookDTO: CreateBookDTO): Promise<Book> {
    const book = new this.bookModel(createBookDTO);
    return await book.save();
  }

  async deletBook(boookId: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(boookId);
    return deletedBook;
  }

  async updateBook(
    boookId: string,
    createBookDTO: CreateBookDTO,
  ): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      boookId,
      createBookDTO,
      { new: true },
    );
    return updatedBook;
  }
}
