import { Injectable } from '@nestjs/common';
import { PrismaBookActionService } from './prisma-book-action.service';
import { CreateBookInput } from './dto/create-book.input';

@Injectable()
export class PrismaActionService {
    constructor(private prisma: PrismaBookActionService) { }

    create(data: CreateBookInput) {
        return this.prisma.book.create({ data });
    }

    findAll() {
        return this.prisma.book.findMany();
    }


    findOne(id: number) {
        return this.prisma.book.findUnique({ where: { id } });
    }

    remove(id: number) {
        return this.prisma.book.delete({ where: { id } });
    }
}
