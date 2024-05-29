import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthModule } from './month/month.module';
import { OrdersModules } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://black:N7lQpIZawYsZxBFU@primary.fvcttue.mongodb.net/?retryWrites=true&w=majority'),
    MonthModule,
    OrdersModules,
    UserModule,
    AuthModule 
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
