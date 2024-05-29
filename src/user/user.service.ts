import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Zaspa',
      password: 'password',
    },
    {
      userId: 2,
      username: 'Metropolia',
      password: 'password',
    },
  ];

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}