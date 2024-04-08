import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


export enum payMetod {
  card = 'K',
  cash = 'G',
  toBePaid = 'Do zapłaty'
}

export interface IWhatReceived {
	price: string;
  name: string;
	numb: string;
};
export interface IOrders {
  dateReceived: number,
  whatReceived: IWhatReceived[],
  customerNumber: number,
  receivedBy: string,
  amountToPay: number,
  paid: boolean,
  cardOrCash: payMetod,
  weight: string,
  whoMadeIt: string,
  hour: number
}

@Schema()
export class Orders extends Document {
  @Prop()
  day: number;

  @Prop()
  month: number;

  @Prop()
  year: number;
  
  @Prop()
  department: string;

  @Prop()
  orders: IOrders[];    
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);

