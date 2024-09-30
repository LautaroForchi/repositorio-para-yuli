import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity({ name: 'products' })
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 50, unique: true })  // Agregado unique: true
    name: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column('int')
    stock: number;
  
    @Column({ default: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1311/tackgalichstudio131100080/23825388-signo-de-exclamaci%C3%B3n-de-peligro-sobre-fondo-gris.jpg' })
    imgUrl?: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'categoria_id' })
    category: Categories;
  
    @ManyToMany(() => OrderDetails, (OrderDetails) => OrderDetails.products)
    orderDetails: OrderDetails[];
}
