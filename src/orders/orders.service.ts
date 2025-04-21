import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Orders, IOrders } from "./schema/orders.schema";
import { ApiResponse } from "./orders.controller";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders.name) private ordersModel: Model<Orders>
    ) { }

    async findDayMonthAndYear(day: number, month: number, year: number): Promise<Orders | null> {
        return this.ordersModel.findOne({ day, month, year }).exec();
    }

    changeOrder(orderId: string, order: Orders) {
        return this.ordersModel.findOneAndUpdate({ _id: orderId }, order, { new: true });
    }

    getAll(): Promise<Orders[]> {
        return this.ordersModel.find().exec();
    }

    async getOne(day: number, month: number, year: number, department: string): Promise<IOrders[]> {
        try {
            const orders = await this.ordersModel.findOne({ department, month, year, day }).exec();
            return orders.orders;
        } catch (error) {
            return error;
        }
    }
    async getOrderById(day: number, month: number, year: number, department: string, _id: Types.ObjectId): Promise<IOrders | ApiResponse> {
        try {
            const orders = await this.ordersModel.findOne({ department, month, year, day }).exec();
            if (!orders || !orders.orders) {
                return {success: false, message: 'No orders found'};
            }
            const order = orders.orders.find(order => String(order._id) === String(_id));
            
            return order;
            
        } catch (error) {
            
            return {success: false, message: error};
        }
    }
    

    async createOrder(newOrder: Orders): Promise<ApiResponse> {
        const { day, month, year, department, orders } = newOrder;
        try {
            let findDay = await this.ordersModel.findOne({ day, month, year, department }).exec();           
            if (!findDay) {
                findDay = new this.ordersModel({
                    day,
                    month,
                    year,
                    department,
                    _id: new Types.ObjectId,
                    orders: orders.map(order => ({
                        ...order,
                        _id: new Types.ObjectId, })),
                });
            } else {
                findDay.orders.push(...orders.map(order => ({
                    ...order, _id: new Types.ObjectId,
                })));}
            await findDay.save();
            return { success: true, message: 'Successfully added new order' };
        } catch (error) {
            return { success: false, message: String(error) };
        }}

    removeOrder(orderId: string) {
        return this.ordersModel.findByIdAndDelete(orderId).exec();
    }
}
