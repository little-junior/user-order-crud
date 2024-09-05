import { User } from 'src/user/user.entity';
import {Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, Column} from 'typeorm'
import { OrderItem } from './order-item/order-item.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    user: User

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[]
}