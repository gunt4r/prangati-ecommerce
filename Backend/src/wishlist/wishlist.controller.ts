import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }
  @Get('check/:productId/:userId')
  async checkInWishlist(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this.wishlistService.findOne({
      productID: productId,
      userID: userId,
    });
  }

  @Get('getAllWishlist/:userId')
  findAll(@Param('userId') userId: string) {
    if (!userId) throw new BadRequestException('User ID required');
    return this.wishlistService.findAll(userId);
  }

  @Delete()
  remove(@Body() deleteFromWishlist: CreateWishlistDto) {
    console.log('deleteFromWishlist', deleteFromWishlist);
    return this.wishlistService.remove(deleteFromWishlist);
  }
  @Delete('remove-all/:userId')
  removeAll(@Param('userId') userId: string) {
    if (!userId) throw new BadRequestException('User ID required');
    return this.wishlistService.removeAll(userId);
  }
}
