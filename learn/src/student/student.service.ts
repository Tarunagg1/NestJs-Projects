import { Injectable } from '@nestjs/common';
import { StudentDTO } from './dto/student.dto';

@Injectable()
export class StudentService {
    private students: StudentDTO[] = [
        { id: 1, name: 'John Doe', age: '20' },
        { id: 2, name: 'Jane Smith', age: '22' },
        { id: 3, name: 'Jim Brown', age: '21' }
    ];

    findAll() {
        return this.students;
    }

    findOne(id: number) {
        return this.students.find(student => student.id === id);
    }

    create(student: StudentDTO) {
        // const newStudent = 
        this.students.push(student);
        return student;
    }

    update(id: number, student: Partial<StudentDTO>) {
        const existingStudent = this.findOne(id);
        if (existingStudent) {
            Object.assign(existingStudent, student);
            return existingStudent;
        }
        return null;
    }

    remove(id: number) {
        const index = this.students.findIndex(student => student.id === id);
        if (index !== -1) {
            return this.students.splice(index, 1)[0];
        }
        return null;
    }
}
