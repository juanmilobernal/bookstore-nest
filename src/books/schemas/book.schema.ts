import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Book {
    title: string;
    description: string;
    author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);