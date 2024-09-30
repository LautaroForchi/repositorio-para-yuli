import { Module } from '@nestjs/common';
import { productsControllers } from './products.controller';
import { productsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { CategoriesRepository } from '../categories/categories.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Categories])],
    controllers: [productsControllers],
    providers: [productsService, ProductsRepository,CategoriesRepository],
})
export class ProductsModule {}
