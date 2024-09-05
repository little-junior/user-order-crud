import { Inject, Injectable } from '@nestjs/common';
import { OrderItem } from './order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemDto } from 'src/common/dtos/order/create-order.dto';
import { Product } from 'src/product/product.entity';
import { Order } from '../order.entity';
import { OrderService } from '../order.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem) 
        private readonly orderItemRepository: Repository<OrderItem>, 
        @Inject() private readonly productService: ProductService)
    {}

    async insertMany(orderItemDtos: OrderItemDto[], orderId: string): Promise<void>{
        const orderItems = await Promise.all(
            orderItemDtos.map(async (x) =>  {
                return await this.toOrderItem(x, orderId)
        }));
        

        await this.orderItemRepository.save(orderItems);
    }

    private async toOrderItem(dto: OrderItemDto, orderId: string): Promise<OrderItem>{
        const orderItem = new OrderItem();
        
        const order = new Order();
        order.id = orderId;
        orderItem.order = order;

        
        const product = new Product();
        product.id = dto.productId;

        orderItem.product = product;
        orderItem.quantity = dto.quantity;
        orderItem.total_price = dto.quantity * await this.getProductPriceById(dto.productId);

        return orderItem;
    }


    private async getProductPriceById(productId: number): Promise<number> {
        const product = await this.productService.getById(productId);
        
        return product.price;
    }
}
