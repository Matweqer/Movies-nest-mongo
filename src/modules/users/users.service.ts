import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  // todo create wrap class for similar operations with mongo like findOne, findAll, etc
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user)
      throw new HttpException('No user in database', HttpStatus.NOT_FOUND);

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndRemove(id).exec();
    if (!user)
      throw new HttpException('No user in database', HttpStatus.NOT_FOUND);

    return user;
  }
}
