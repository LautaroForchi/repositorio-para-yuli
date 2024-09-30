import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from 'uuid'
import { Orders } from "./orders.entity";



@Entity({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;
  
    @Column({type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;
  
    @Column({ length: 128 })
    password: string;
  
    @Column({type :'int', nullable: true })
    phone: number;
  
    @Column({type: 'varchar', 'length': 50, nullable: true })
    country: string;
  
    @Column({ type: 'text', nullable: true })
    address: string;
  
    @Column({ type: 'varchar',length: 50, nullable: true })
    city: string;
  
    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn()
    orders: Orders[];
  }