// month.controller.ts
import { Body, Controller, Post, Param, Get, NotFoundException, BadRequestException } from '@nestjs/common';
import { Month } from './schema/month.schema';
import { MonthService } from './month.service';
export interface ApiResponse {
  success: boolean;
  message: string;
}

@Controller('months')
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @Post()
  async createMonth(@Body() month: Month): Promise<Month | ApiResponse> {
    try {
      const res = await this.monthService.createMonth(month);
      
      if (!res.success ) {
        throw new NotFoundException(res.message);
      }
      return res;
    } catch (error) {
      throw new BadRequestException(`Failed to add new month: ${error.message}`);
    }
  }

  @Get()
  async getAll() {
    return this.monthService.getAll();
  }
  
  @Get(':department/:month/:year')
    async checkMonthExists(@Param('month') month: string, @Param('year') year: number, @Param('department') department: string): Promise<Month> {
      try {
        const res = await this.monthService.findMonthByNameAndYear(department, month, year);
        if (!res) {
          
          throw new NotFoundException("Month not found");
        } else {
          
          return res

        }
      } catch (error) {
        return error.message
      }

  }
    

}
