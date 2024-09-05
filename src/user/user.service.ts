import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/common/dtos/user/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

    async getAll(): Promise<User[]>{
        return await this.usersRepository.find();
    }

    async getById(id: number): Promise<User | null>{
        return await this.usersRepository.findOneBy({id});
    }

    async deleteById(id: number): Promise<void> {
        await this.usersRepository.delete({id: id});
    }

    async insert(userDto: CreateUserDto): Promise<void>{
        const user = new User;
        user.name = userDto.name;
        
        await this.usersRepository.save(user);
    }

    async update(userId: number, userDto: CreateUserDto): Promise<void>{
        await this.usersRepository.update(userId, {name: userDto.name})
    }
}
