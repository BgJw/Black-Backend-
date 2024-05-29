import { Module } from "@nestjs/common";
import { UsersService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService],
  })
  export class UserModule {}