import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.service';
import { AuthenticationService } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthModule } from './month/month.module';
import { OrdersModules } from './orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://black:N7lQpIZawYsZxBFU@primary.fvcttue.mongodb.net/?retryWrites=true&w=majority'),
    MonthModule,
    OrdersModules 
  ],
  controllers: [AuthenticationController ],
  providers: [AuthenticationService],
  
})
export class AppModule {}
