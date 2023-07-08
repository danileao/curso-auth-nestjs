import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserAddRoleDTO } from '../user.dto';

@Injectable()
export class UpdateAddRoleUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(data: UpdateUserAddRoleDTO) {
    const user = await this.userModel.findById(data._id).exec();
    if (!user) throw new UnauthorizedException();

    user.roles = data.roles;
    user.save();

    return user;
  }
}
