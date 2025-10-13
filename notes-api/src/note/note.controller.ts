import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('note')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    console.log(req.user);

    return this.noteService.create(createNoteDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req, @Query("take", ParseIntPipe) take?: number, @Query("skip", ParseIntPipe) skip?: number) {
    return this.noteService.findAll(req.user.sub, { take: take || 10, skip: skip || 0 });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.noteService.findOne(+id, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Request() req) {
    return this.noteService.update(+id, updateNoteDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.noteService.remove(+id, req.user.sub);
  }
}
