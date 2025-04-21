// employee.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class WorkTime {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  time: string;

  @Prop()
  day: number;
}

@Schema()
export class Employee extends Document {
  @Prop()
  name: string;
  @Prop()
  position: string; 
  @Prop()
  hours_worked: number;
  @Prop({type: [WorkTime], default: []})
  work_time: WorkTime[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

