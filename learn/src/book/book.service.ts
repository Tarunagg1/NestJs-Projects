import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UpdateBookInput } from './dto/update-book.input';
import { CreateBookInput } from './dto/create-book.input';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    async create(book: CreateBookInput): Promise<Book> {
        const newBook = new this.bookModel(book);
        return newBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    async update(book: UpdateBookInput): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(book.id, book, { new: true }).exec();
        if (!updatedBook) {
            throw new Error('Book not found');
        }
        return updatedBook;
    }

    async delete(id: string): Promise<Book> {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        if (!deletedBook) {
            throw new Error('Book not found');
        }
        return deletedBook;
    }
}
