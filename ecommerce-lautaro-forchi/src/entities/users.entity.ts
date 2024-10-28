import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from 'uuid'
import { Orders } from "./orders.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: 'users'})
export class Users {
    @ApiProperty({
    description: 'uuid generado por la BD',
    
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ApiProperty({
      description: 'nombre del producto maximo 50 caracteres no puede ser nulo',
      example:'a15'
      
    })
    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;
  
    @ApiProperty({
      description: 'debe ser ub mail valido de max 50 caractres, unico y no debe ser un valor nulo',
      example: 'yoyo@yahoo.com'
      
    })
    @Column({type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;
  

    @ApiProperty({
      description: 'password no debe ser mayor a 128 caracters',
      
    })
    @Column({ length: 128 })
    password: string;
  
    @ApiProperty({
      description: 'numero de lefono',
      example: '11223345'
      
    })
    @Column({type :'int', nullable: true })
    phone: number;
  
    @ApiProperty({
      description: 'debe ser un string de 50 caracteres, no puede ser nulo',
      example: 'argetina'
      
    })
    @Column({type: 'varchar', 'length': 50, nullable: true })
    country: string;
  
    @ApiProperty({
      description: 'debe ser un string, no debe ser nulo',
      example: 'avenida siempre viva'
      
    })
    @Column({ type: 'text', nullable: true })
    address: string;
  
    @ApiProperty({
      description: 'debe ser un string de max 50 caracteres, no puede ser nulo',
      
    })
    @Column({ type: 'varchar',length: 50, nullable: true })
    city: string;
    @ApiProperty({
      description: 'es un boolean',
      
    })
    @Column({default:false,})
    isAdmin: boolean
    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn()
    orders: Orders[];
  }