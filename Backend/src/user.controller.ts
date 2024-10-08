/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    getAll(): string {
       return "You got all the users"; 
    }
    @Post()
    create(): string {
       return "You created a user"; 
    }
}