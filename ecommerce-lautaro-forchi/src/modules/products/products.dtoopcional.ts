import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './products.dto';

export class UpdateProductsDto extends PartialType(CreateProductDto) {}