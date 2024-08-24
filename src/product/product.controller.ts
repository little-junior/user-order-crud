import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from 'src/common/dtos/product/create-product.dto';

@Controller('products')
export class ProductController {
    constructor(@Inject() private readonly productService: ProductService) {}

    @Get()
    async getAll(): Promise<Product[]>{
        return await this.productService.getAll();
    }
    
    @Post()
    async post(@Body() body: CreateProductDto): Promise<void>{
        await this.productService.insert(body);
    }
    
    @Get(':id')
    async get(@Param() params: any): Promise<Product>{
        return await this.productService.getById(params.id);
    }

    @Put(':id')
    async put(@Param() params: any, @Body() body: CreateProductDto): Promise<void>{
        await this.productService.update(params.id, body);
    }

    @Delete(':id')
    async delete(@Param() params: any): Promise<void>{
        await this.productService.deleteById(params.id);
    }
}
