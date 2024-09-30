import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OrderDetails } from "src/entities/orderDetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Product } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";


@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async addOrder(userId: string, product: any ){
        let total= 0;
        const user = await this.usersRepository.findOneBy({id:userId});
        if (!user) 
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

        const order = new Orders();
        order.date = new Date();
        order.user = user;
        
        const newOrder = await this.ordersRepository.save(order);
    
        const productArray = await Promise.all(
            product.map(async(element)=>{
                const product = await this.productRepository.findOneBy({
                    id: element.id,
                });
                if (!product) 
                    throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
                total += Number(product.price);
                await this.productRepository.update(
                    { id: element.id},
                    {stock: product.stock -1},
                );
                return product;
            }),
        );

        const orderDetail = new OrderDetails();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productArray;
        orderDetail.order = newOrder;

        await this.orderDetailRepository.save(orderDetail);
        return await this.ordersRepository.find({
            where: { id: newOrder.id},
            relations: {
                orderDetails: true,
            },
        });
    
    }

    async getOrder(id:string){
        const order= await this.ordersRepository.findOne({
            where: { id},
            relations: {
                orderDetails:{
                    products: true,
                },
            },
        });
        if(!order)
            throw new NotFoundException(`Orden con id ${id} no encontrada`);
        
        return order;
    }

    


}