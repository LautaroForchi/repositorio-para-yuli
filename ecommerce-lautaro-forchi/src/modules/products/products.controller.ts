import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { productsService } from "./products.service";
import { Product } from "src/entities/products.entity";
import { CreateProductDto } from "./products.dto";
import { UpdateProductsDto } from "./products.dtoopcional";
import { AuthGuard } from "../auth/auth.guard";

@Controller('products')
export class productsControllers {
    constructor(
        private readonly productsService: productsService,
        
    ) {}

    @Get()
    async getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<Product[]> {
        return await this.productsService.getProducts(page, limit);
    }

    @Get('seeder')
    async addProducts(){
        return  await  this.productsService.addProducts();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK) // Estado HTTP 200
    async getProductById(@Param('id') id: string): Promise<Product> {
        return await this.productsService.getProductsById(id);
    }

    

    /*@UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<{ id: string }> {
        const product: Product = await this.productsService.postProduct(createProductDto);
        return { id: product.id };  // Devuelve solo el ID del producto
    }*/

    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK) // Especifica que el estado HTTP es 200
    @UsePipes(new ValidationPipe({ whitelist: true })) // Aplica ValidationPipe con whitelist para filtrar propiedades no permitidas
    async putProduct(@Param('id') id: string, @Body() updatedProduct: Product) {
        return this.productsService.putProduct(id, updatedProduct)
    }

    /*@UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK) // Especifica que el estado HTTP es 200
    async deleteProduct(@Param('id') id: string): Promise<{ id: number }> {
        const deletedId = await this.productsService.deleteProduct(Number(id));
        return { id: deletedId }; // Devuelve el ID del producto eliminado
    }*/

    // Nuevo endpoint para pre-cargar productos
   
}
