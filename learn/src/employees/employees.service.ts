import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {
        this.employeesRepository = employeesRepository;
    }

    findAll(): Promise<Employee[]> {
        return this.employeesRepository.find();
    }

    findOne(id: number): Promise<Employee | null> {
        return this.employeesRepository.findOneBy({ id });
    }

    create(employee: Employee): Promise<Employee> {
        return this.employeesRepository.save(employee);
    }

    async update(id: number, employee: Employee): Promise<Employee> {
        const existingEmployee = await this.findOne(id);
        if (!existingEmployee) {
            throw new Error('Employee not found');
        }
        const updated = Object.assign(existingEmployee, employee);
        return this.employeesRepository.save(updated);
    }

    remove(id: number): Promise<void> {
        return this.employeesRepository.delete(id).then(() => { });
    }
}
