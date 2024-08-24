import { Injectable } from '@nestjs/common';
import { OrderItem } from './order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemDto } from 'src/common/dtos/order/create-order.dto';

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>){}

    async insertMany(orderItemDtos: OrderItemDto[], orderId: string){
        const orderItems = orderItemDtos.map(x => this.ToOrderItem(x, orderId))

        await this.orderItemRepository.save(orderItems);
    }

    private ToOrderItem(dto: OrderItemDto, orderId: string){
        const orderItem = new OrderItem();
        orderItem.orderId = orderId;
        orderItem.productId = dto.productId;
        orderItem.quantity = dto.quantity;
        orderItem.total_price = 0;

        return orderItem;
    }
}
