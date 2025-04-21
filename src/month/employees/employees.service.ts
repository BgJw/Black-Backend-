/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Month } from 'src/month/schema/month.schema';
import { Employee } from '../schema/employees.schema';

@Injectable()
export class EmployeeService {
  static ERR_EMPLOYEE_NOT_FOUND = 'Employee not found';
  
  constructor(@InjectModel(Month.name) private monthModel: Model<Month>) {}

  async findEmployeesByMonth(monthId: string) {
    return (await this.monthModel.findOne({ _id: monthId })).employees;
  }

  async findEmployeeById(monthId: string, employeeId: string) {
    const month = await this.findEmployeesByMonth(monthId);
    return month.find(emplo => emplo._id.toString() === employeeId);
  }

  async changeWorkTimeEmployee(monthId: string, employeeId: string, workTimeId: string, newTime: {time: string}) {
    const employee = await this.findEmployeeById(monthId, employeeId);

    if (!employee) {
      throw new Error(EmployeeService.ERR_EMPLOYEE_NOT_FOUND);
    }

    const updatedWorkTime = employee.work_time.map(time => {
      if (time._id.toString() === workTimeId) {
        
        return { ...time, time: newTime.time };
      }
      return time;
    });

    employee.work_time = updatedWorkTime;
    
    try {
      await this.monthModel.updateOne(
        { _id: monthId, 'employees._id': employeeId },
        { $set: { 'employees.$': employee } }
      );
  
      return { success: true, message: 'Work time changed successfully' };
    } catch (error) {
      console.error('Failed to update work time:', error.message);
      return { success: false, message: 'Failed to update work time' };
    }
  }

  async addWorkDay(monthId: string, employeeId: string, newDay: {time: string, day: number}) {     
    const employee = await this.findEmployeeById(monthId, employeeId);
    
    if (!employee) {
      throw new Error(EmployeeService.ERR_EMPLOYEE_NOT_FOUND);
    }   
    try {
       await this.monthModel.updateOne(
        { _id: monthId, 'employees._id': employeeId }, 
        { $push: { 'employees.$.work_time': {...newDay, _id: new mongoose.Types.ObjectId()} } }
      );

      return { success: true, message: 'Work day added successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to add work day' };
    }
  }
  async addNewEmployee(monthId: string, newEmployee: Employee){
    const listEmployee = await this.findEmployeesByMonth(monthId);
    
    if (!listEmployee) {
      throw new Error(EmployeeService.ERR_EMPLOYEE_NOT_FOUND);
    }     
    
    try {
      listEmployee.push(newEmployee);
      
      await this.monthModel.updateOne(
        { _id: monthId },
        { $set: { employees: listEmployee } }
      );

      return { success: true, message: 'Employee added successfully' };
    } catch (error) {
      console.error('Failed to add new employee:', error.message);
      return { success: false, message: 'Failed to add new employee' };
    } 
  }
  async changeMonthWorkTime(monthId: string, newEmployees: Employee[]){
    const listEmployee = await this.findEmployeesByMonth(monthId);
    
    if (!listEmployee) {
      throw new Error(EmployeeService.ERR_EMPLOYEE_NOT_FOUND);
    }     
    
    try {    
      const employeesWithIds = newEmployees.map((employee) => {
        const newEmployee = { ...employee };
        newEmployee.work_time.forEach((hour) => {
          hour._id = new mongoose.Types.ObjectId;
        });
        return newEmployee;
      });  
      await this.monthModel.updateOne(
        { _id: monthId },
        { $set: { employees: employeesWithIds } }
      );

      return { success: true, message: 'Change work time from Month successfully' };
    } catch (error) {
      console.error('Failed to change work time:', error.message);
      return { success: false, message: 'Failed to change work time' };
    } 
  }
  async removeEmployee(monthId: string, employeeId: string) {
    try {
      const listEmployee = await this.findEmployeesByMonth(monthId);      
      if (!listEmployee) {
        throw new Error(EmployeeService.ERR_EMPLOYEE_NOT_FOUND);
      }
      const updatedEmployees = listEmployee.filter((employee) => !new Types.ObjectId(String(employee._id)).equals(new Types.ObjectId(employeeId)));
      await this.monthModel.updateOne(
        { _id: monthId },
        { $set: { employees: updatedEmployees }});
      return { success: true, message: 'Employee removed successfully' };
    } catch (error) {
      console.error('Failed to remove employee:', error.message);
      return { success: false, message: 'Failed to remove employee' };
    }}
  
}
