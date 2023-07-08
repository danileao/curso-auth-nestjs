import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserAddRoleDTO, UserCreateDTO } from './user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateAddRoleUserUseCase } from './use-cases/update-add-role-user.usecase';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private updateRolesUseCase: UpdateAddRoleUserUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: UserCreateDTO) {
    const result = await this.createUserUseCase.execute(data);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('/roles')
  async updateRoles(@Request() request, @Body() data: UpdateUserAddRoleDTO) {
    const result = await this.updateRolesUseCase.execute({
      _id: request.user.sub,
      roles: data.roles,
    });
    return result;
  }
}
