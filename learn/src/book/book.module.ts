import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './resolvers/book.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookServicechema } from './model/book.model';
import { BookActionService } from './book-action.service';
import { PrismaBookActionService } from './prisma-book-action.service';
import { PrismaActionService } from './prisma-action.service';
@Module({
  providers: [BookService, BookResolver, BookActionService, PrismaBookActionService, PrismaActionService],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookServicechema }])
  ]
})
export class BookModule { }
