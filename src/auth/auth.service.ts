import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { UsersService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    async validateUser(username: string, pass: string) {
      const user = await this.usersService.findOne(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }


    async login(user: IUser) {
        
        return{
            id: user.id,
            username: user.username,  
            token: this.jwtService.sign({username: user.username, id: user.id }),
        };
      }
}