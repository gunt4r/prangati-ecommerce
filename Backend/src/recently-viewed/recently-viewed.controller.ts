import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecentlyViewedService } from './recently-viewed.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('viewed-products')
export class ViewedProductsController {
  constructor(private readonly recentlyViewedService: RecentlyViewedService) {}

  @Post('add-or-update')
  async addOrUpdateViewedProduct(
    @Body() body: { userUuid: string; productId: string },
  ) {
    return this.recentlyViewedService.addOrUpdateViewedProduct(
      body.userUuid,
      body.productId,
    );
  }

  @Get('recent')
  async getRecentViewedProducts(@Query('userUuid') userUuid: string) {
    return this.recentlyViewedService.getRecentViewedProducts(userUuid);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.recentlyViewedService.getAll();
  }
  @Delete('deleteAllEntities')
  @UseGuards(JwtAuthGuard)
  removeAll() {
    return this.recentlyViewedService.removeAll();
  }
}
