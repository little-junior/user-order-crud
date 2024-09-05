import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from 'src/common/dtos/order/create-order.dto';

@Controller()
export class OrderController {
    constructor(@Inject() private readonly orderService: OrderService) {}

    @Get('users/:userId/orders')
    async getByUserId(@Param() params: any): Promise<Order[]>{
        return await this.orderService.getByUserId(params.userId);
    }

    @Post('orders')
    async post(@Body() createOrderDto: CreateOrderDto): Promise<void> {
        await this.orderService.insert(createOrderDto);
    }
}
