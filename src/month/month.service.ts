import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Month } from './schema/month.schema';
import { ApiResponse } from './month.controller';

@Injectable()
export class MonthService {
  constructor(@InjectModel(Month.name) private monthModel: Model<Month>) { }

  async createMonth(newMonth: Month): Promise<ApiResponse> {
    const duplicate = await this.findMonthByNameAndYear(newMonth.department, newMonth.month, newMonth.year);

    if (!duplicate) {
      try {
        const createdMonth = new this.monthModel(newMonth);
        const isValid = (str: string) => /^(\d{1,2})-(\d{1,2})$/.test(str);

        newMonth.employees.map(emplo => {
          let hours = 0;

          emplo.work_time.forEach((day) => {
            if (isValid(day.time)) {
              const [start, end] = day.time.split('-').map(Number);

              const adjustedEndTime = end < start ? end + 24 : end;

              hours += adjustedEndTime - start;
            }
          });
          emplo.hours_worked = hours;
        });
        await createdMonth.save();
        return { success: true, message: 'succefully add new month' };


      } catch (error) {
        return { success: false, message: String(error) };
      }


    } else {
      return { success: false, message: 'duplicate month' };
    }
  }

  async getAll(): Promise<Month[]> {
    return this.monthModel.find().exec();
  }

  async findMonthByNameAndYear(department: string, month: string, year: number): Promise<Month> {

    try {
      return this.monthModel.findOne({ department, month, year }).exec();
      
    } catch (error) {
      return error
    }
  }

  async checkIfMonthExists(department: string, month: string, year: number): Promise<boolean> {
    const existingMonth = await this.findMonthByNameAndYear(department, month, year);
    return !!existingMonth;
  }


}
