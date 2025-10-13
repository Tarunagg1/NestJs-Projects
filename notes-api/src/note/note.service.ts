import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class NoteService {

  constructor(private prisma: PrismaService) { }

  async create(createNoteDto: CreateNoteDto, userId: number) {
    const data = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        userId: userId
      }
    });

    return data;
  }

  findAll(userId: number, pagination: { take: number, skip: number }) {
    return this.prisma.note.findMany({
      where: { userId },
      take: pagination.take,
      skip: pagination.skip
    });
  }

  async findOne(id: number, userId: number) {
    const note = await this.prisma.note.findUnique({
      where: { id, userId }
    });

    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    const note = await this.prisma.note.findFirst({
      where: { id, userId }
    });

    if (!note) {
      throw new NotFoundError('Note not found');
    }

    return this.prisma.note.update({
      where: { id, userId },
      data: updateNoteDto
    });
  }

  async remove(id: number, userId: number) {
    const note = await this.prisma.note.findFirst({
      where: { id, userId }
    });
    if (!note) {
      throw new NotFoundError('Note not found');
    }

    await this.prisma.note.delete({
      where: { id, userId }
    });
    return { message: 'Note deleted successfully' };
  }
}
