import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Users } from "src/entities/users.entity";
import { Product } from "src/entities/products.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Orders,OrderDetails,Users,Product])],
    controllers:[OrdersController],
    providers: [OrdersService, OrdersRepository],
})
export class OrdersModule{}