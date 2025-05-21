import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Users, UsersDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>) {}

  async createUser(username: string, plainPassword: string): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const createdUser = new this.userModel({
      username,
      password: hashedPassword,
    });
    return createdUser.save();
  }

async findOne(username: string): Promise<UsersDocument | null> {
  return this.userModel.findOne({ username }).exec();
}

}
