import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../product.schema';
import { Model } from 'mongoose';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async execute(data: CreateProductDTO) {
    // Se existe um produto com esse codigo
    const productExists = await this.productModel.findOne({
      code: data.code,
    });

    // SIM - Mostra um erro
    if (productExists) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }

    // NÃO - Salva o produto
    const product = new this.productModel(data);
    await product.save();

    return product;
  }
}
