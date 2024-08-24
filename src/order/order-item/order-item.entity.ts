import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Order } from '../order.entity'
import { Product } from 'src/product/product.entity'


@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: string

    @Column("decimal")
    total_price: number

    @Column("int")
    quantity: number

    @Column("int")
    productId: number

    @Column()
    orderId: string

    @ManyToOne(() => Order)
    order: Order

    @ManyToOne(() => Product)
    product: Product
}
