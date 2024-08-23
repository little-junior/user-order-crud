import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item/order-item.service';

@Module({
  providers: [OrderItemService]
})
export class OrderModule {}
