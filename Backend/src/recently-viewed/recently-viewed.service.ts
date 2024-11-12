// src/recently-viewed/recently-viewed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewedProducts } from '../models/ViewedProducts.entity';

@Injectable()
export class RecentlyViewedService {
  constructor(
    @InjectRepository(ViewedProducts)
    private readonly viewedProductsRepository: Repository<ViewedProducts>,
  ) {}

  async addOrUpdateViewedProduct(
    userUuid: string,
    productId: string,
  ): Promise<ViewedProducts> {
    const existingProduct = await this.viewedProductsRepository.findOne({
      where: { userUuid, productId },
    });

    if (existingProduct) {
      await this.viewedProductsRepository.delete(existingProduct.id);
    }

    const viewedProduct = this.viewedProductsRepository.create({
      userUuid,
      productId,
    });
    return this.viewedProductsRepository.save(viewedProduct);
  }

  async getRecentViewedProducts(
    userUuid: string,
    limit: number = 3,
  ): Promise<ViewedProducts[]> {
    return this.viewedProductsRepository.find({
      where: { userUuid },
      order: { viewedAt: 'DESC' },
      take: limit,
    });
  }
  async getAll() {
    return await this.viewedProductsRepository.find();
  }
  async removeAll() {
    await this.viewedProductsRepository.query(
      `TRUNCATE viewed_products RESTART IDENTITY CASCADE;`,
    );
    return 'All viewed products are deleted';
  }
}
