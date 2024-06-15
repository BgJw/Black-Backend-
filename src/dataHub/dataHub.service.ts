import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerNumber } from "./schema/customer.schema";
import { Model } from "mongoose";

@Injectable()
export class DataHubService {
    constructor(
        @InjectModel(CustomerNumber.name) private customerModel: Model<CustomerNumber>, ) { }

        async getCustomerNumber(): Promise<number> {
            const customerNumberDoc = await this.customerModel.findOne().exec();
            if (!customerNumberDoc) {
                throw new Error('Customer number not found');
            }
            return customerNumberDoc.customerNumber;
        }
    
        async incrementCustomerNumber(): Promise<number> {
            const customerNumberDoc = await this.customerModel.findOneAndUpdate(
                {},
                { $inc: { customerNumber: 1 } },
                { new: true, upsert: true }
            ).exec();
            return customerNumberDoc.customerNumber;
        }

        //end CustomerNumber 
}