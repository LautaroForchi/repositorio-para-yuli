import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { CreateProductDto } from './products.dto';
import { UpdateProductsDto } from './products.dtoopcional';

@Injectable()
export class productsService {
     constructor(private readonly productosRepository: ProductsRepository){}



  async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.productosRepository.getProducts(page, limit); 
  }

  async getProductsById(id: string): Promise<Product> {
    const result = await this.productosRepository.getProductById(id);
    if (typeof result === 'string') {
        throw new Error(result); 
    }
    return result; 
}
 
async addProducts(){
    return await this.productosRepository.addProducts();
  }


async putProduct(id: string, updatedProduct:Product ) {
  return await this.productosRepository.putProduct(id, updatedProduct);
}


/*async deleteProduct(id: number): Promise<number> {
  return await this.productosRepository.deleteProduct(id);
} */


}