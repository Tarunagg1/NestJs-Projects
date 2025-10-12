import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { get } from 'http';

@Controller('employees')
export class EmployeesController {

    constructor(private employeesService: EmployeesService) {

    }

    @Post()
    create(@Body() employeeData: Employee) {
        console.log(employeeData);
        return this.employeesService.create(employeeData);
    }

    @Get()
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }


    @Put('/:id')
    update(@Body() employeeData: Employee): Promise<Employee> {
        return this.employeesService.update(employeeData.id, employeeData);
    }

    @Get('/search')
    search(@Query() filters: { name: string, department: string }) {
        // return this.employeesService.findOne(id);
        console.log(filters);
    }
}
