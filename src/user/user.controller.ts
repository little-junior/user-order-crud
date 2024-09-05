import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/common/dtos/user/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(): Promise<User[]>{
        return await this.userService.getAll();
    }

    @Get(':id')
    async get(@Param() params: any): Promise<User>{
        return await this.userService.getById(params.id);
    }

    @Post()
    async post(@Body() body: CreateUserDto): Promise<void>{
        await this.userService.insert(body);
    }

    @Put(':id')
    async put(@Param() params: any, @Body() body: CreateUserDto): Promise<void>{
        await this.userService.update(params.id, body);
    }

    @Delete(':id')
    async delete(@Param() params: any): Promise<void> {
        await this.userService.deleteById(params.id);
    }
}
