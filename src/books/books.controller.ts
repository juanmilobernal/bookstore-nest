import { Controller, Post, Body, Res, HttpStatus, Get, Param, NotFoundException, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }
    
    @Post('/create')
    async create(@Res() res, @Body() createBookDTO: CreateBookDTO) {
        const book = await this.booksService.createBook(createBookDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Book created succesfully!',
            book
        });
    }

    @UseGuards(AuthorizationGuard)
    @Get('/')
    async getBooks(@Res() res){
        const books = await this.booksService.getBooks();
        return res.status(HttpStatus.OK).json({
            books
        });
    }

    @Get('/:bookId')
    async getBook(@Res() res, @Param('bookId')bookId){
        const book = await this.booksService.getBook(bookId);
        if (!book) throw new NotFoundException ('Book Does not exist');
        return res.status(HttpStatus.OK).json({
            book
        });
    }

    @Delete('/delete')
    async deleteBook(@Res() res, @Query('bookId') bookId){
        const bookDeleted = await this.booksService.deletBook(bookId);
        if (!bookDeleted) throw new NotFoundException('Book Does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Book deleted succesfully',
            bookDeleted
        });
    }

    @Put('/update')
    async updateBook(@Res() res, @Body() createBookDTO: CreateBookDTO, @Query('bookId') bookId){
        const updatedBook = await this.booksService.updateBook(bookId, createBookDTO);
        if (!updatedBook) throw new NotFoundException('Book Does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Book updated succesfully',
            updatedBook
        });
    }

}