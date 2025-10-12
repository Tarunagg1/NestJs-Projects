import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDTO } from './dto/student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }


    @Get()
    findAll() {
        return this.studentService.findAll();
    }

    @Get(':id')
    findOne(@Param("id") id: number) {
        return this.studentService.findOne(id);
    }

    @Post()
    create(@Body() student: StudentDTO) {
        return this.studentService.create(student);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() student: Partial<StudentDTO>) {
        return this.studentService.update(id, student);
    }
}
