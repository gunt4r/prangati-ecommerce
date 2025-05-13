import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UseInterceptors(ClassSerializerInterceptor)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Param('userId') userId: string) {
    return this.cartService.createCart(userId);
  }
  @Post('add-product')
  addProduct(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addProductToCart(createCartDto);
  }
  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.cartService.getCart(id);
  }

  @Patch()
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCartItem(updateCartDto);
  }

  @Delete('remove-item')
  remove(@Body() deleteFromCart: CreateCartDto) {
    return this.cartService.removeItemFromCart(
      deleteFromCart.userId,
      deleteFromCart.productId,
    );
  }
  @Delete('remove-items')
  removeItems(@Param('userId') userId: string) {
    return this.cartService.removeItemsCart(userId);
  }
  // @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('deleteAllEntities')
  removeAll() {
    return this.cartService.removeAll();
  }
}
