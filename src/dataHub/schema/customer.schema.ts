import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CustomerNumber extends Document {
  @Prop()
  customerNumber: number;

}

export const CustomerSchema = SchemaFactory.createForClass(CustomerNumber);

