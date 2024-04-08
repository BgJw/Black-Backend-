import { Module } from "@nestjs/common";
import { MonthController } from "./month.controller";
import { MonthService } from "./month.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Month, MonthSchema } from "./schema/month.schema";
import { EmployeeController } from "./employees/employees.controller";
import { EmployeeService } from "./employees/employees.service";


@Module({
    imports: [ MongooseModule.forFeature([{ name: Month.name, schema: MonthSchema }])],
    controllers: [MonthController, EmployeeController],
    providers: [MonthService, EmployeeService],

})

export class MonthModule {}