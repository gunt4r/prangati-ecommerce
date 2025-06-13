import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @Get('all/:userId')
  findAllUserOrders(@Param('userId') userId: string) {
    return this.orderService.findAllUserOrders(userId);
  }

  @Get(':userId/:orderId')
  findOne(@Param('userId') id: string, @Param('orderId') orderId: string) {
    return this.orderService.getOrder(id, orderId);
  }

  @Patch(':userId')
  update(@Param('userId') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':userId/:orderId')
  remove(@Param('userId') id: string, @Param('orderId') orderId: string) {
    return this.orderService.removeOrder(id, orderId);
  }
  @Delete('all/:userId')
  removeAllUserOrders(@Param('userId') id: string) {
    return this.orderService.removeAllUserOrders(id);
  }
}
