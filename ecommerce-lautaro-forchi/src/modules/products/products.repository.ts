import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";
import * as data from '../../utilis/data.json';
import { UpdateProductsDto } from "./products.dtoopcional";

@Injectable()
export class ProductsRepository {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  // Obtener productos paginados
async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  // Obtener producto por ID
  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
        return `Producto con id ${id} no encontrado`;
    }
    return product;
}
    
    
  
    
  

  

  // Cargar productos desde archivo JSON
  async addProducts() {
    const categorias = await this.categoriesRepository.find()
    
    data?.map(async (element) => {
      const category = categorias.find(
        (category) => category.name === element.category,
      );
      const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
    });
    return 'Productos agregados';
  }

  // Actualizar producto
  async putProduct(id: string, product: Product) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });

    return updatedProduct;
  }

  // Eliminar producto
  /*async deleteProduct(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }*/
}
