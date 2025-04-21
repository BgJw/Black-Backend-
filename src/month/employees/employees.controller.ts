import { Controller, Param, Body, Post, Patch, Get, NotFoundException, BadRequestException, Delete } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { Employee } from '../schema/employees.schema';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }


  @Get(':monthId/:employeeId')
  async getEmployeeById(
    @Param('monthId') monthId: string, 
    @Param('employeeId') employeeId: string) {
    try {
      const employee = await this.employeeService.findEmployeeById(monthId, employeeId);
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new BadRequestException(`Failed to retrieve employee: ${error.message}`);
    }
  }

  @Post(':monthId')
  async addNewEmployee(
    @Param('monthId') monthId: string,
    @Body() newEmployee: Employee) {
      try {
        const result = await this.employeeService.addNewEmployee(monthId, newEmployee);
        if (!result) {
          throw new NotFoundException('Month or employee Not found');
        }
        return { success: true, message: 'add new Employee successfully' };
      } catch (error) {
        throw new BadRequestException(`Failed to add new employee: ${error.message}`);
      }
  }

  @Patch(':monthId')
  async changeMonthWorkTime(
    @Param('monthId') monthId: string,
    @Body() employees: Employee[]) {
      try {
        const result = await this.employeeService.changeMonthWorkTime(monthId, employees);
        if (!result) {
          throw new NotFoundException('Month or employee Not found');
        }
        return { success: true, message: 'add new Employee successfully' };
      } catch (error) {
        throw new BadRequestException(`Failed to add new employee: ${error.message}`);
      }
  }
  @Delete(':monthId/:employeeId')
  async removeEmployee( @Param('monthId') monthId: string, @Param('employeeId') employeeId: string,) {
    try {
      const result = await this.employeeService.removeEmployee(monthId, employeeId); 
      if (!result) {
        throw new NotFoundException('Employee not found');
      }
      return { success: true, message: 'Employee removed successfully' };
    } catch (error) {
      throw new BadRequestException(`Failed to remove employee: ${error.message}`);
    }
  }  

  // тут порабоатть 
  
  
  @Post(':monthId/:employeeId')
  async addWorkDay(
    @Param('monthId') monthId: string,
    @Param('employeeId') employeeId: string,
    @Body() newDay: { time: string, day: number }) {

    try {
      const result = await this.employeeService.addWorkDay(monthId, employeeId, newDay);
      if (!result) {
        throw new NotFoundException('Employee or work time not found');
      }
      return { success: true, message: 'add new work day successfully' };
    } catch (error) {
      throw new BadRequestException(`Failed to add new day: ${error.message}`);
    }
  }

  @Post(':monthId/:employeeId/:workTimeId')
  async changeWorkTimeEmployee(
    @Param('monthId') monthId: string,
    @Param('employeeId') employeeId: string,
    @Param('workTimeId') workTimeId: string,
    @Body() newTime: { time: string },
  ) {
    try {
      const result = await this.employeeService.changeWorkTimeEmployee(monthId, employeeId, workTimeId, newTime);
      if (!result) {
        throw new NotFoundException('Employee or work time not found');
      }
      return { success: true, message: 'Work time changed successfully' };
    } catch (error) {
      throw new BadRequestException(`Failed to change work time: ${error.message}`);
    }
  }
}
