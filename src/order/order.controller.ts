import { Controller, Get, Inject, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller()
export class OrderController {
    constructor(@Inject() private readonly orderService: OrderService) {}

    @Get(':userId/orders')
    async getByUserId(@Param() params: any): Promise<Order[]>{
        return await this.orderService.getByUserId(params.userId);
    }

    // @Post()
    // async post(@Body() )
}
