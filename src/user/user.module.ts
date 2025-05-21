import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { Users, UsersSchema } from './schema/users.schema';  

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
