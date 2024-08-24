import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Product } from './product/product.entity';

@Module({
  imports: [UserModule, OrderModule, ProductModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'user-order-crud.db',
      autoLoadEntities: true,
      migrations: [/*...*/]
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
