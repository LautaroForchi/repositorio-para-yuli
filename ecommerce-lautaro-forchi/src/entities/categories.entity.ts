import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity({ name: 'categories' })
export class Categories {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
     * name, string de max 50 caracteres
     * 
     */
  @Column({ type: 'varchar' ,length: 50 , nullable: false, unique: true,})
  name: string;

  
  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];
}