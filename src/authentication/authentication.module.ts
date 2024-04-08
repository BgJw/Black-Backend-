/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IAuth, login } from './loginData';

@Injectable()
export class AuthenticationService {
  getData(isAuth: IAuth): boolean {
    return login.some( (value) =>  value.name === isAuth.name && value.password === isAuth.password);
    
  }
}
