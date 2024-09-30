import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Product } from './products.entity';

@Entity({ name: 'order_details' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn()
  order: Orders;

  // Aquí está la tabla de unión manualmente definida
  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orderdetails_products', // El nombre correcto de la tabla de unión
    joinColumn: {
      name: 'product_id', // El nombre de la columna en la tabla de unión que hace referencia a OrderDetails
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id', // El nombre de la columna en la tabla de unión que hace referencia a Products
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}