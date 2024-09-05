import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item/order-item.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item/order-item.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductModule],
  providers: [OrderItemService, OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
