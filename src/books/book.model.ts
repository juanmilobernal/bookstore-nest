import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: {type: String, require: true},
  description: {type: String, require: true},
  author: {type: String, require: true},
});

export interface Book {

    id: string;
    title: string;
    description: string;
    author: string;
}

