import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Orders } from "./schema/orders.schema";
import { Types } from "mongoose";

export interface ApiResponse {
    success: boolean;
    message: string;
  }
  
  @Controller('orders')
  export class OrdersController {
    constructor(private readonly ordersModel: OrdersService) {}
  
    @Get()    
    getAll() {
      return this.ordersModel.getAll();
    }
    @Get(':day/:month/:year/:department')
    getOne(@Param('day') day: number, 
          @Param('month') month: number, 
          @Param('year') year: number,
          @Param('department') department: string) {
      return this.ordersModel.getOne(day, month, year, department);
    }
    @Get(':day/:month/:year/:department/:_id')
    getOrderById(@Param('day') day: number, 
          @Param('month') month: number, 
          @Param('year') year: number,
          @Param('department') department: string,
          @Param('_id') _id: Types.ObjectId,
        ) {
      return this.ordersModel.getOrderById(day, month, year, department, _id );
    } 
    @Post()
    async createOrder(@Body() orderdata: Orders ): Promise<ApiResponse> {
      try {
        const res = await this.ordersModel.createOrder(orderdata);
        if (!res.success ) {
          throw new NotFoundException(res.message);
        }
        return res
      } catch (error) {
        throw new BadRequestException(`Failed to add new order: ${error.message}`);
      }
    }
    // removeOrder(@Param('orderId') orderId: string) {
    //     return this.ordersModel.removeOrder(orderId);
    // }
    // @Patch('orderId')
    // changeOrder(@Param('orderId') orderId: string, @Body() order: Orders) {
    //     return this.ordersModel.changeOrder(orderId, order);
    // }
}