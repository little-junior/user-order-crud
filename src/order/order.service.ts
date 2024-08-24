import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, OrderItemDto } from 'src/common/dtos/order/create-order.dto';
import { OrderItem } from './order-item/order-item.entity';
import { OrderItemService } from './order-item/order-item.service';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>, @Inject() private readonly orderItemService: OrderItemService){}

    async insert(orderDto: CreateOrderDto): Promise<void> {
        const order = new Order();
        order.user_id = orderDto.userId;
        const createdOrder = await this.orderRepository.save(order);

        await this.orderItemService.insertMany(orderDto.orderItems, createdOrder.id)
    }

    async getByUserId(userId: number): Promise<Order[]> {
        return await this.orderRepository.findBy({
            user_id: userId
        });
    }
}
