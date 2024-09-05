import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Order } from '../order.entity'
import { Product } from 'src/product/product.entity'


@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("decimal")
    total_price: number

    @Column("int")
    quantity: number

    @ManyToOne(() => Order)
    order: Order

    @ManyToOne(() => Product)
    product: Product
}
