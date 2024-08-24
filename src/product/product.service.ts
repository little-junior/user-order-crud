import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from 'src/common/dtos/product/create-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}
    
    async getAll(): Promise<Product[]>{
        return await this.productRepository.find();
    }

    async getById(id: number): Promise<Product | null>{
        return await this.productRepository.findOneBy({id});
    }

    async deleteById(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

    async insert(productDto: CreateProductDto): Promise<void>{
        const product = new Product();
        product.name = productDto.name;
        product.price = productDto.price;

        await this.productRepository.save(product);
    }

    async update(productId: number, productDto: CreateProductDto): Promise<void>{
        const product = new Product;
        product.name = product.name;
        product.price = productDto.price;
        
        await this.productRepository.update(productId, product);
    }
}
