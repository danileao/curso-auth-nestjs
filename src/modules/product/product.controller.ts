import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorators';
import { Role } from '../../decorators/roles.decorators';
import { CreateProductDTO } from './product.dto';
import { CreateProductUseCase } from './use-cases/create-product.usecase';
import { ListProductUseCase } from './use-cases/list-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private listProductUseCase: ListProductUseCase,
  ) {}

  @Auth(Role.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductDTO) {
    const result = await this.createProductUseCase.execute(data);
    return result;
  }

  @Auth(Role.USER, Role.ADMIN)
  @Get('')
  async get() {
    const result = await this.listProductUseCase.execute();
    return result;
  }
}
