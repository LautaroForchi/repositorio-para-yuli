import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDtop } from "./orders.dto";
import { AuthGuard } from "../auth/auth.guard";


@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDtop){
        const {userId, product} = order;
        
        console.log(product)
        console.log(order)
        return this.orderService.addOrder(userId, product);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.orderService.getOrder(id);
    }
}