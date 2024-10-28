import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'orders'})
export class Orders {
  @ApiProperty({
    description: 'uuid generado por la base de datos'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users)
  user: Users;
  @ApiProperty({
    description: 'Debe ingresar una fecha con formato dd/mm/yyyy',
    example: '22/12/2024'
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;
}