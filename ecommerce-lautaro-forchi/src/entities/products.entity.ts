import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        description: 'uuid generado por la base de datos'
      })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty({
        description: 'Nombre del producto debe tener maxi 50 caracteres y ser unico',
        example: 'motorola g8 power'
      })
    @Column({ length: 50, unique: true })  // Agregado unique: true
    name: string;
      
    @ApiProperty({
        description: 'Debe ingresar una cadena de texto'
      })
    @Column({ type: 'text' })
    description: string;
  
    @ApiProperty({
        description: 'debe ingresar un numero con coma con 2 decimales',
        example: '9.10'
      })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @ApiProperty({
        description: 'debe ser un numero que represente el stock',
        example: '10'
      })
    @Column('int')
    stock: number;
  
    @ApiProperty({
        description: 'debe ingresar el url de la imagen',
        example: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1311/tackgalichstudio131100080/23825388-signo-de-exclamaci%C3%B3n-de-peligro-sobre-fondo-gris.jpg'
      })
    @Column({ default: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1311/tackgalichstudio131100080/23825388-signo-de-exclamaci%C3%B3n-de-peligro-sobre-fondo-gris.jpg' })
    imgUrl?: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'categoria_id' })
    category: Categories;
  
    @ManyToMany(() => OrderDetails, (OrderDetails) => OrderDetails.products)
    orderDetails: OrderDetails[];
}
