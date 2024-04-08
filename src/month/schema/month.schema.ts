// month.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Employee } from './employees.schema';
import { Orders } from 'src/orders/schema/orders.schema';

@Schema()
export class Month extends Document {
  @Prop()
  month: string;

  @Prop()
  year: number;
  
  @Prop()
  department: string;
  
  @Prop([Employee])
  employees: Employee[];

  @Prop([Orders])
  orders: Orders[];
}

export const MonthSchema = SchemaFactory.createForClass(Month);
