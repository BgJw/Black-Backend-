import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Orders, OrdersSchema } from "./schema/orders.schema";
import { Month, MonthSchema } from "src/month/schema/month.schema";


@Module({
    imports: [ MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }, { name: Month.name, schema: MonthSchema }])],
    controllers: [OrdersController],
    providers: [OrdersService],

})

export class OrdersModules {}