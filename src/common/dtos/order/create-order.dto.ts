export class CreateOrderDto {
    userId: number;
    orderItems: OrderItemDto[];
}

export class OrderItemDto{
    productId: number;
    quantity: number;
}