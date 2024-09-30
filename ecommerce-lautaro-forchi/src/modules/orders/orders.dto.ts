import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/entities/products.entity";

export class CreateOrderDtop{
    @IsNotEmpty()
    @IsUUID()
    userId: string;


    @IsArray()
    @ArrayMinSize(1)
    product: Partial<Product[]>;
}