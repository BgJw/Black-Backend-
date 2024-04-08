/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.module';
import { IAuth } from './loginData';

@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post()
  getData(@Body() isAuth: IAuth): boolean {
    return this.authService.getData(isAuth);
  }
}
