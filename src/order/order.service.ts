import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, OrderItemDto } from 'src/common/dtos/order/create-order.dto';
import { OrderItem } from './order-item/order-item.entity';
import { OrderItemService } from './order-item/order-item.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>, @Inject() private readonly orderItemService: OrderItemService){}

    async insert(orderDto: CreateOrderDto): Promise<void> {
        const order = new Order();
        const user = new User();
        user.id = orderDto.userId;
        order.user = user;
        const createdOrder = await this.orderRepository.save(order);

        await this.orderItemService.insertMany(orderDto.orderItems, createdOrder.id)
    }

    async getByUserId(userId: number): Promise<Order[]> {
        return await this.orderRepository.find({
            where: {
                user: {
                    id: userId
                } 
            },
            relations: {
                orderItems: {
                    product: true
                } 
            }
        })
    }
}
