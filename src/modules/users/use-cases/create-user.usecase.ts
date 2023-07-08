import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDTO } from '../user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(userDTO: UserCreateDTO) {
    // Verificar se username existe
    const userExisted = await this.userModel
      .findOne({
        username: userDTO.username,
      })
      .exec();

    if (userExisted) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(userDTO.password, 10);

    const userCreated = new this.userModel({
      ...userDTO,
      id: randomUUID(),
      password,
    });
    const user = await userCreated.save();
    console.log({ user });
    return user;
  }
}
